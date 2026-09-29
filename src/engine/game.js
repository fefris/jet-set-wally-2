// Game state machine: play loop (JSW main-loop order), death & respawn, specials, ending, HUD rendering.
// Headless-capable: update() needs no screen; render(screen) draws the current state.
(function (JSW) {
  'use strict';
  var T = JSW.T;

  var LIFE_ATTRS = [0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47];   // bright blue, red, magenta, green, cyan, yellow, white
  var INVULN_FRAMES = 40;                                           // 2 s at 20 fps after a respawn

  function Game(opts) {
    opts = opts || {};
    this.world = opts.world || JSW.buildWorld();
    this.rooms = this.world.rooms;
    this.required = opts.required || JSW.ITEMS_REQUIRED || Math.min(150, this.world.totalItems);
    this.layer = new Uint8Array(256 * 128);
    this.sfx = [];
    this.reset();
  }

  Game.prototype.reset = function () {
    var st = this.world.start || { room: JSW.roomOrder[0], x: 20, y: 104 };
    this.lives = 7;
    this.items = 0;
    this.frames = 0;           // elapsed logic frames (clock: 1 s per 10 frames)
    this.tick = 0;             // global frame counter (animation)
    this.collected = {};
    this.visited = {};
    this.flags = {};
    this.mode = 'play';
    this.modeTimer = 0;
    this.won = false;
    this.running = false;      // ending: forced run right
    this.invuln = 0;
    this.message = null;
    this.willy = JSW.newWilly(st.x, st.y, 0);
    this.enterRoom(st.room, null);
    this.saveRespawn();
  };

  Game.prototype.room = function () { return this.rooms[this.roomId]; };

  Game.prototype.enterRoom = function (id, dir) {
    var room = this.rooms[id];
    if (!room) throw new Error('no room ' + id);
    this.roomId = id;
    this.ents = JSW.initEntities(room);
    this.overlay = JSW.liftOverlay(this.ents);
    if (!this.collected[id]) this.collected[id] = new Uint8Array(room.items.length);
    if (!this.visited[id]) this.visited[id] = true;
    this.roomFrames = 0;
    if (dir) JSW.enterRoomState(this.willy, dir);
    this.entry = { room: id, willy: JSW.cloneWilly(this.willy) };
  };

  Game.prototype.env = function () {
    var env = JSW.makeEnv(this.room(), this.overlay);
    env.forceRight = this.running;
    env.noJump = this.running;
    return env;
  };

  Game.prototype.roomsVisited = function () { return Object.keys(this.visited).length; };

  Game.prototype.saveRespawn = function () {
    this.respawn = { room: this.roomId, willy: JSW.cloneWilly(this.willy) };
    this.respawn.willy.moving = false; this.respawn.willy.airborne = 0; this.respawn.willy.jc = 0;
    this.respawn.willy.rope = 0; this.respawn.willy.ropeCool = 0;
  };

  Game.prototype.kill = function (reason) {
    if (this.mode !== 'play') return;
    this.mode = 'dying'; this.modeTimer = 0; this.deathReason = reason;
    this.sfx.push({ type: 'die' });
  };

  Game.prototype.special = function () { return this.room().def.special || {}; };

  Game.prototype.roomCleared = function (id) {
    var c = this.collected[id || this.roomId];
    if (!c) return false;
    for (var i = 0; i < c.length; i++) if (!c[i]) return false;
    return true;
  };

  // ---- one logic frame --------------------------------------------------------------------------
  Game.prototype.update = function (input) {
    this.sfx.length = 0;
    this.tick++;
    input = input || {};
    switch (this.mode) {
      case 'play': this.updatePlay(input); break;
      case 'dying': this.updateDying(); break;
      case 'transport': this.updateTransport(); break;
      case 'gameover': this.updateGameOver(); break;
      case 'nightmare': this.updateNightmare(); break;
      case 'results': break;
    }
    return this.sfx;
  };

  Game.prototype.updatePlay = function (input) {
    var w = this.willy, sp = this.special();
    this.frames++; this.roomFrames++;
    if (this.invuln > 0) this.invuln--;
    if (this.message && --this.message.t <= 0) this.message = null;

    // 1. move rope, guardians, lifts
    var up = JSW.updateEntities(this.ents);
    for (var s = 0; s < up.sounds.length; s++) this.sfx.push({ type: up.sounds[s] });
    if (up.liftMoves.length) {
      for (var m = 0; m < up.liftMoves.length; m++) this.carryOnLift(up.liftMoves[m]);
      this.overlay = JSW.liftOverlay(this.ents);
    }

    // 2. move Willy
    var env = this.env();
    var wasAir = w.airborne;
    var ev = JSW.stepWilly(w, env, input);
    if (w.airborne === 1 && wasAir === 1) this.sfx.push({ type: 'jump', j: w.jc });
    else if (w.airborne === 1 && wasAir !== 1) this.sfx.push({ type: 'jump', j: 0 });
    else if (w.airborne > 2 && w.airborne !== 255) this.sfx.push({ type: 'fall', a: w.airborne });
    if (ev === 'fall') { this.kill('fall'); return; }
    if (!ev && w.y < 0) ev = 'up';
    if (ev === 'left' || ev === 'right' || ev === 'up' || ev === 'down') {
      if (!this.changeRoom(ev)) return;
      env = this.env();
    }

    // 3. nasties (attribute/cell based, 2x3 block)
    if (JSW.touchesNasty(w, env) && this.invuln === 0) { this.kill('nasty'); return; }

    // 4. Willy layer + guardians/arrows/rope
    JSW.drawWillyLayer(this.layer, w, env, JSW.sprites.wally);
    var col = JSW.entityCollisions(this.ents, this.layer, w, env, !!this.room().exits.up);
    if (col.dead && this.invuln === 0) { this.kill(col.dead); return; }
    if (w.rope && w.y < 0) { if (!this.changeRoom('up')) return; env = this.env(); }

    // 5. specials (housekeeper, bed, toilet, portals, switches)
    if (this.updateSpecials(sp, env)) return;

    // 6. items
    this.collectItems(env);

    // 7. respawn point: last static solid ground
    if (w.airborne === 0 && !w.rope && w.y % 8 === 0) {
      var r2 = w.y / 8 + 2;
      var a = env.cell(w.col, r2), b = env.cell(w.col + 1, r2);
      var onLift = this.overlay && (this.overlay[r2 * 32 + w.col] || this.overlay[r2 * 32 + w.col + 1]);
      if (a !== T.CONVEYOR && b !== T.CONVEYOR && !onLift && !this.running) this.saveRespawn();
    }

    // 8. music note (2 frames per note)
    if ((this.tick & 1) === 0) this.sfx.push({ type: 'note', idx: (this.tick >> 1) & 63, lives: this.lives });
  };

  Game.prototype.carryOnLift = function (mv) {
    var w = this.willy, e = mv.e;
    if (w.airborne !== 0 || w.rope || w.y % 8 !== 0) return;
    var feet = w.y / 8 + 2;
    if (feet !== mv.from) return;
    if (w.col + 1 < e.t.x || w.col > e.t.x + e.t.width - 1) return;
    w.y += (mv.to - mv.from) * 8;
  };

  // Returns false if the move ended play this frame (death).
  Game.prototype.changeRoom = function (dir) {
    var target = this.room().exits[dir];
    if (!target || !this.rooms[target]) {
      // No room that way: behave like a solid edge (should never happen - the validator forbids open edges without exits)
      var w = this.willy;
      if (dir === 'left') { w.col = 0; w.frame = 0; }
      else if (dir === 'right') { w.col = 30; w.frame = 3; }
      else if (dir === 'up') { w.y = 0; w.airborne = 2; w.moving = false; }
      else { this.kill('void'); return false; }
      return true;
    }
    this.enterRoom(target, dir);
    return true;
  };

  Game.prototype.collectItems = function (env) {
    var room = this.room(), c = this.collected[this.roomId];
    if (!room.items.length) return;
    var white = JSW.willyCells(this.willy, env).white;
    for (var i = 0; i < room.items.length; i++) {
      if (c[i]) continue;
      var p = room.items[i];
      for (var k = 0; k < white.length; k++) {
        if (white[k][0] === p[0] && white[k][1] === p[1]) {
          c[i] = 1; this.items++;
          this.sfx.push({ type: 'item' });
          if (this.items >= this.required && !this.won) {
            this.won = true;
            this.message = { text: 'Mrs Mop has gone to bed!', t: 80 };
          }
          break;
        }
      }
    }
  };

  // Special room behaviours (docs/PLAN.md §3). Returns true if play for this frame ended.
  Game.prototype.updateSpecials = function (sp, env) {
    var w = this.willy;
    // housekeeper guards the bed until enough items are collected
    if (sp.housekeeper && !this.won) {
      var hk = JSW.sprites.housekeeper;
      if (hk && JSW.spriteHitsLayer(this.layer, hk.frames[0], sp.housekeeper.x * 8, sp.housekeeper.y, false) && this.invuln === 0) {
        this.kill('housekeeper'); return true;
      }
    }
    // bed: once won, standing on a right conveyor starts the run to the toilet
    if (sp.bed && this.won && !this.running && w.airborne === 0) {
      var r2 = Math.floor(w.y / 8) + 2;
      if (env.conveyor(w.col, r2) === 'right' || env.conveyor(w.col + 1, r2) === 'right') {
        this.running = true;
        this.message = { text: 'Time for bed... but first!', t: 60 };
      }
    }
    // toilet: reaching it while running ends the game
    if (sp.toilet && this.running && w.col + 1 >= sp.toilet.x && Math.abs(w.y - sp.toilet.y) < 16) {
      this.startTransport('ending', null);
      return true;
    }
    // trip switches: touching the switch cell sets a persistent flag
    if (sp.switches) {
      var cells = JSW.willyCells(w, env).white;
      sp.switches.forEach(function (s) {
        if (this.flags[s.flag]) return;
        for (var k = 0; k < cells.length; k++) if (cells[k][0] === s.x && cells[k][1] === s.y) {
          this.flags[s.flag] = true;
          this.message = { text: s.message || 'Switch thrown!', t: 60 };
          this.sfx.push({ type: 'item' });
          break;
        }
      }, this);
    }
    // portals: teleport pads, drains, outfalls, rocket, yacht
    if (sp.portals && w.airborne === 0 && !w.rope) {
      for (var i = 0; i < sp.portals.length; i++) {
        var p = sp.portals[i];
        if (!this.portalReady(p)) continue;
        var feetRow = Math.floor(w.y / 8) + 2;
        var inX = w.col + 1 >= p.x && w.col <= p.x + (p.w || 2) - 1;
        var inY = feetRow - 1 >= p.y && feetRow - 1 <= p.y + (p.h || 1) - 1;
        if (inX && inY) { this.startTransport(p.kind || 'teleport', p); return true; }
      }
    }
    return false;
  };

  // A portal is live when its requirements are met: requires:'roomItems' (this room cleared),
  // requiresRooms:[ids] (those rooms cleared) and/or flag:'name' (a switch has set that flag).
  Game.prototype.portalReady = function (p) {
    if (p.requires === 'roomItems' && !this.roomCleared()) return false;
    if (p.requiresRooms) for (var i = 0; i < p.requiresRooms.length; i++) if (!this.roomCleared(p.requiresRooms[i]) && (this.rooms[p.requiresRooms[i]] || {}).items && this.rooms[p.requiresRooms[i]].items.length) return false;
    if (p.flag && !this.flags[p.flag]) return false;
    return true;
  };

  Game.prototype.startTransport = function (kind, portal) {
    this.mode = 'transport'; this.modeTimer = 0; this.transport = { kind: kind, portal: portal };
    this.sfx.push({ type: kind === 'ending' ? 'toilet' : kind });
  };

  Game.prototype.updateTransport = function () {
    var t = this.transport, dur = t.kind === 'rocket' || t.kind === 'yacht' ? 60 : t.kind === 'ending' ? 30 : 16;
    this.modeTimer++;
    if (t.kind === 'rocket' || t.kind === 'yacht') this.sfx.push({ type: 'rumble', t: this.modeTimer });
    if (this.modeTimer < dur) return;
    if (t.kind === 'ending') {
      this.mode = 'nightmare'; this.modeTimer = 0;
      var nm = null;
      for (var id in this.rooms) if ((this.rooms[id].def.special || {}).nightmare) nm = id;
      if (nm) {
        this.enterRoom(nm, null);
        var s = this.rooms[nm].def.special.nightmare;
        this.willy = JSW.newWilly(s.x || 15, s.y || 104, 0);
      }
      return;
    }
    var p = t.portal, arr = p.tx != null ? { x: p.tx, y: p.ty, facing: p.facing } : ((this.rooms[p.to].def.special || {}).arrival || { x: 15, y: 104 });
    this.willy = JSW.newWilly(arr.x, arr.y, arr.facing === 'left' ? 1 : 0);
    this.mode = 'play';
    this.enterRoom(p.to, null);
    this.saveRespawn();
  };

  // nightmare ending room: Wally jumps on the spot, then the results screen
  Game.prototype.updateNightmare = function () {
    this.modeTimer++;
    var w = this.willy, env = this.env();
    JSW.updateEntities(this.ents);
    JSW.stepWilly(w, env, { jump: true });
    if (w.airborne === 1) this.sfx.push({ type: 'jump', j: w.jc });
    if ((this.tick & 1) === 0) this.sfx.push({ type: 'note', idx: (this.tick >> 1) & 63, lives: 7 });
    if (this.modeTimer > 200) { this.mode = 'results'; this.modeTimer = 0; this.sfx.push({ type: 'win' }); }
  };

  Game.prototype.updateDying = function () {
    this.modeTimer++;
    if (this.modeTimer <= 16) { if (this.modeTimer % 2 === 0) this.sfx.push({ type: 'dieStep', step: this.modeTimer / 2 }); return; }
    this.lives--;
    if (this.lives < 0) { this.mode = 'gameover'; this.modeTimer = 0; return; }
    var r = this.respawn || this.entry;
    this.willy = JSW.cloneWilly(r.willy);
    this.enterRoom(r.room, null);
    this.mode = 'play';
    this.invuln = INVULN_FRAMES;
  };

  Game.prototype.updateGameOver = function () {
    this.modeTimer++;
    if (this.modeTimer <= 49) this.sfx.push({ type: 'gameoverStep', step: this.modeTimer });
    if (this.modeTimer > 49 + 40) this.mode = 'over';
  };

  // ---- rendering -------------------------------------------------------------------------------
  function pad(n, len) { var s = String(n); while (s.length < len) s = '0' + s; return s; }

  Game.prototype.clockText = function () {
    var secs = Math.floor(this.frames / 10);
    var h = Math.floor(secs / 3600), m = Math.floor(secs / 60) % 60, s = secs % 60;
    var colon = (this.frames % 20) < 10 || this.mode !== 'play' ? ':' : ' ';
    return pad(Math.min(h, 9999), 4) + colon + pad(m, 2) + colon + pad(s, 2);
  };

  Game.prototype.render = function (screen) {
    var room = this.room();
    screen.clear(0);
    screen.border = room.border;
    if (this.mode === 'gameover' || this.mode === 'over') { this.renderGameOver(screen); this.renderHud(screen); return; }
    if (this.mode === 'results') { this.renderResults(screen); return; }
    this.renderRoom(screen);
    this.renderHud(screen);
    if (this.mode === 'dying') {
      var ink = Math.max(0, 7 - Math.floor(this.modeTimer / 2));
      for (var i = 0; i < 512; i++) screen.attr[i] = 0x40 | ink;
    }
    if (this.mode === 'transport') this.renderTransport(screen);
  };

  Game.prototype.renderRoom = function (screen) {
    var room = this.room(), env = this.env(), w = this.willy, sp = this.special(), k;
    JSW.drawRoomTiles(screen, room, this.tick);
    if (sp.flashNasties) {
      for (k = 0; k < 512; k++) if (room.type[k] === T.NASTY) screen.attr[k] |= 0x80;
    }
    if (sp.cartography) JSW.drawCartography(screen, this);
    // flag cues: cells that start flashing once a switch flag is set (e.g. the lighthouse lamp)
    if (sp.flagFlash) sp.flagFlash.forEach(function (f) {
      if (!this.flags[f.flag]) return;
      for (var fy = f.y; fy < f.y + (f.h || 1); fy++) for (var fx = f.x; fx < f.x + (f.w || 1); fx++) {
        if (fx >= 0 && fx < 32 && fy >= 0 && fy < 16) screen.attr[fy * 32 + fx] |= 0x80;
      }
    }, this);
    // signposts: short text printed over the room (ink over the room's paper)
    if (sp.signs) sp.signs.forEach(function (s) {
      var air = room.styles[room.airStyle], ink = JSW.colourIndex(s.ink, 6);
      if (s.when && !this.flags[s.when]) return;
      JSW.printAt(screen, s.text, s.x, s.y, JSW.attr(ink, s.paper != null ? JSW.colourIndex(s.paper, 0) : air.paper, s.bright !== false, !!s.flash));
    }, this);
    // lifts drawn with the room's first floor style (or the style given)
    if (this.overlay) this.drawLifts(screen, room);
    // specials under Willy
    if (sp.toilet && JSW.sprites.toilet) {
      var tf = JSW.sprites.toilet.frames[this.running ? 1 : 0];
      screen.blit16(tf, sp.toilet.x * 8, sp.toilet.y, {});
      JSW.colourBox(screen, room, sp.toilet.x * 8, sp.toilet.y, 16, 16, 7, true);
    }
    if (sp.portals) this.drawPortals(screen, room, sp.portals);
    // Willy: recolour covered air cells white, then OR-draw (flicker while invulnerable)
    if (this.mode !== 'nightmare' || true) {
      var cells = JSW.willyCells(w, env).white;
      for (k = 0; k < cells.length; k++) {
        var cx = cells[k][0], cy = cells[k][1];
        if (cx < 0 || cx > 31 || cy < 0 || cy > 15) continue;
        if (room.type[cy * 32 + cx] === T.AIR && !(this.overlay && this.overlay[cy * 32 + cx])) {
          screen.setAttr(cx, cy, (screen.getAttr(cx, cy) & 0xF8) | 7);
        }
      }
      if (!(this.invuln > 0 && (this.tick & 2))) {
        var wy = w.y + JSW.rampOffset(w, env), pose = w.facing === 0 ? w.frame : 3 - w.frame;
        var ws = JSW.sprites.wally;
        if (ws) screen.blit16(ws.frames[pose % ws.frames.length], JSW.willyX(w), wy, { mirror10: w.facing === 1 });
      }
    }
    // housekeeper
    if (sp.housekeeper && !this.won && JSW.sprites.housekeeper) {
      var hk = JSW.sprites.housekeeper, hx = sp.housekeeper.x * 8, hy = sp.housekeeper.y;
      var hf = (w.y < hy - 8) ? 1 : ((this.tick >> 2) & 1);
      screen.blit16(hk.frames[hf % hk.frames.length], hx, hy, {});
      JSW.colourBox(screen, room, hx, hy, 16, 16, sp.housekeeper.ink == null ? 5 : JSW.colourIndex(sp.housekeeper.ink), true);
    }
    // guardians, arrows, ropes
    for (k = 0; k < this.ents.length; k++) {
      var e = this.ents[k];
      if (e.type === 'h' || e.type === 'v' || e.type === 'd') {
        var s = JSW.entitySprite(e);
        if (!s) continue;
        JSW.colourBox(screen, room, s.x, s.y, 16, 16, e.t.ink, e.t.bright);
        screen.blit16(s.rows, s.x, s.y, { mirror10: s.mirror });
      } else if (e.type === 'arrow' && e.x < 32) {
        var ax = e.x * 8, ay = e.t.y, pat = e.t.dir === 'right' ? 0x82 : 0x41;
        screen.blit8([pat, 0xFF, pat], ax, ay - 1, 'set');
        var cy2 = Math.floor(ay / 8);
        screen.setAttr(e.x, cy2, screen.getAttr(e.x, cy2) | 7);
      } else if (e.type === 'rope') {
        var segs = JSW.ropeSegments(e);
        for (var q = 0; q < segs.length; q++) screen.plot(segs[q][0], segs[q][1], 1);
      }
    }
    // items last (overwrite mode), ink cycling
    JSW.drawItems(screen, room, this.collected[this.roomId], this.tick);
  };

  Game.prototype.drawLifts = function (screen, room) {
    var floorStyle = null;
    for (var i = 0; i < room.styles.length; i++) if (room.styles[i].type === T.FLOOR) { floorStyle = room.styles[i]; break; }
    for (var k = 0; k < this.ents.length; k++) {
      var e = this.ents[k];
      if (e.type !== 'lift') continue;
      for (var c = 0; c < e.t.width; c++) {
        var x = e.t.x + c;
        screen.blit8(floorStyle ? floorStyle.rows : [0xFF, 0xFF, 0, 0, 0, 0, 0, 0], x * 8, e.row * 8, 'set');
        screen.setAttr(x, e.row, floorStyle ? floorStyle.attr : 0x47);
      }
    }
  };

  Game.prototype.drawPortals = function (screen, room, portals) {
    for (var i = 0; i < portals.length; i++) {
      var p = portals[i];
      if (p.hidden) continue;
      var ready = this.portalReady(p);
      for (var c = 0; c < (p.w || 2); c++) {
        var x = p.x + c, y = p.y + (p.h || 1) - 1;
        if (x < 0 || x > 31 || y < 0 || y > 15) continue;
        if (p.kind === 'teleport') {
          // shimmering pad: flashing when ready
          screen.setAttr(x, y, (screen.getAttr(x, y) & 0x78) | ((this.tick >> 1) % 7 + 1) | (ready ? 0x80 : 0));
        }
      }
    }
  };

  Game.prototype.renderTransport = function (screen) {
    var t = this.transport, i;
    if (t.kind === 'teleport' || t.kind === 'drain' || t.kind === 'outfall') {
      for (i = 0; i < 512; i++) screen.attr[i] = (screen.attr[i] & 0xC7) | (((this.modeTimer + i) % 7 + 1) << 3);
    } else if (t.kind === 'rocket' || t.kind === 'yacht') {
      var shake = this.modeTimer & 1;
      for (i = 0; i < 512; i++) if ((i >> 5) < 16) screen.attr[i] = (screen.attr[i] & 0xF8) | (shake ? 6 : 2) | 0x40;
      JSW.printAt(screen, JSW.centre(t.kind === 'rocket' ? 'LIFT OFF!' : 'ANCHORS AWEIGH!'), 0, 7, 0x46 | 0x80);
    } else if (t.kind === 'ending') {
      for (i = 0; i < 512; i++) screen.attr[i] = 0x40 | ((this.modeTimer + (i >> 5)) & 7) << 3;
    }
  };

  Game.prototype.renderHud = function (screen) {
    var room = this.room();
    JSW.printAt(screen, JSW.centre(room.name), 0, 16, 0x07);
    for (var x = 0; x < 32; x++) { screen.setAttr(x, 17, 0); screen.setAttr(x, 18, 0); screen.setAttr(x, 20, 0); screen.setAttr(x, 21, 0); screen.setAttr(x, 23, 0); }
    JSW.printAt(screen, 'Rooms ' + pad(this.roomsVisited(), 3) + '  TIME       ' + this.clockText(), 0, 19, 0x47);
    JSW.printAt(screen, 'Items : ' + pad(this.items, 3), 16, 22, 0x46);
    var n = Math.max(0, Math.min(7, this.lives)), ws = JSW.sprites.wally, pose = (this.tick >> 2) & 3;
    for (var i = 0; i < n; i++) {
      if (ws) screen.blit16(ws.frames[pose % ws.frames.length], i * 16, 22 * 8 - 8 + 8, {});
      screen.setAttr(i * 2, 22, LIFE_ATTRS[i]); screen.setAttr(i * 2 + 1, 22, LIFE_ATTRS[i]);
      screen.setAttr(i * 2, 23, LIFE_ATTRS[i]); screen.setAttr(i * 2 + 1, 23, LIFE_ATTRS[i]);
    }
    if (this.message) JSW.printAt(screen, JSW.centre(this.message.text), 0, 17, 0x46);
  };

  Game.prototype.renderGameOver = function (screen) {
    var t = Math.min(this.modeTimer, 49), dist = t * 4;
    screen.border = 0;
    var paper = (dist >> 2) & 3;
    for (var i = 0; i < 512; i++) screen.attr[i] = 0x47 | (paper << 3);
    var ws = JSW.sprites.wally, anvil = JSW.sprites.anvil, plinth = JSW.sprites.plinth;
    if (plinth) { screen.blit16(plinth.frames[0], 15 * 8, 112, {}); for (var c = 15; c <= 16; c++) { screen.setAttr(c, 14, 0x42 | (paper << 3)); screen.setAttr(c, 15, 0x42 | (paper << 3)); } }
    if (ws) screen.blit16(ws.frames[2], 15 * 8 + 2, 96, {});
    if (anvil) {
      var ay = Math.min(dist - 16, 80);
      for (var y = 0; y < ay; y++) screen.plot(15 * 8 + 7, y, 1), screen.plot(15 * 8 + 8, y, 1);  // lengthening chain
      screen.blit16(anvil.frames[0], 15 * 8, ay, {});
    }
    if (this.modeTimer > 49) {
      var g = 'GAME', o = 'OVER';
      for (var k = 0; k < 4; k++) {
        JSW.printAt(screen, g[k], 10 + k, 6, 0x40 | ((this.modeTimer + k) % 7 + 1));
        JSW.printAt(screen, o[k], 18 + k, 6, 0x40 | ((this.modeTimer + k + 4) % 7 + 1));
      }
    }
  };

  Game.prototype.renderResults = function (screen) {
    screen.border = 1;
    screen.clear(0x0F);
    var lines = [
      'CONGRATULATIONS!', '', 'Wally tidied the whole house', 'and got to bed at last...', '', '...or did he?', '',
      'Items   : ' + pad(this.items, 3), 'Rooms   : ' + pad(this.roomsVisited(), 3), 'Time    : ' + this.clockText(), '', 'Press ENTER',
    ];
    for (var i = 0; i < lines.length; i++) JSW.printAt(screen, JSW.centre(lines[i]), 0, 4 + i, i === 0 ? 0x4E | 0x80 : 0x4F);
  };

  JSW.Game = Game;
})(globalThis.JSW = globalThis.JSW || {});
