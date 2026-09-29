// Guardians, arrows, ropes and lifts (JSW routines 90C0 "move the rope and guardians" and 91BE "draw ...").
// Movement is pure/headless; drawing & collision work against a Screen plus a per-frame "Willy layer" bitmap
// (pixel-perfect collision against Wally's pixels only - JSW I also killed on tile overlap, a bug we fix).
(function (JSW) {
  'use strict';
  var T = JSW.T;

  // ---- rope geometry (tables at 8300 / 8380) ----
  var ROPE_X = [], ROPE_Y = [], i;
  for (i = 0; i < 32; i++) ROPE_X.push(0);
  for (i = 0; i < 12; i++) ROPE_X.push(1);
  for (i = 0; i < 20; i++) ROPE_X.push(2);
  ROPE_X.push(2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3);
  for (i = 0; i < 48; i++) ROPE_Y.push(6);
  ROPE_Y.push(4, 6, 6, 4, 6, 4, 6, 4, 6, 4, 4, 4, 6, 4, 4, 4);
  for (i = 0; i < 22; i++) ROPE_Y.push(4);
  var ROPE_MAX = 54; // 0x36 turn-around frame

  function colour(v, d) { return JSW.colourIndex(v, d); }

  // Normalise a guardian definition from room data (called by the room compiler). Reports problems via bad().
  JSW.normaliseGuardian = function (g, def, bad, idx) {
    var tag = 'guardian #' + idx + ' (' + (g && g.type) + ')';
    if (!g || !g.type) { bad(tag + ': missing type'); return { type: 'none' }; }
    var out = { type: g.type, ink: colour(g.ink, 7), bright: g.bright !== false };
    function needSprite(kind) {
      var sp = JSW.sprites[g.sprite];
      if (!sp) { bad(tag + ': unknown sprite ' + g.sprite); return; }
      if (kind === 'h' && sp.mover !== 'h') bad(tag + ': sprite ' + g.sprite + " is not a horizontal ('h') mover");
      out.sprite = g.sprite;
    }
    switch (g.type) {
      case 'h':
        needSprite('h');
        out.x = g.x | 0; out.y = g.y | 0; out.min = g.min | 0; out.max = g.max | 0;
        out.dir = g.dir === 'right' ? 'right' : 'left'; out.speed = g.speed === 2 ? 2 : 1;
        if (out.min > out.max || out.x < out.min || out.x > out.max) bad(tag + ': x must satisfy min <= x <= max');
        if (out.min < 0 || out.max > 30) bad(tag + ': min/max must be within 0..30');
        if (out.y < 0 || out.y > 112) bad(tag + ': y must be within 0..112');
        break;
      case 'v':
        needSprite('v');
        out.x = g.x | 0; out.y = g.y | 0; out.min = g.min | 0; out.max = g.max | 0;
        out.dy = g.dy == null ? 2 : g.dy | 0; out.anim = g.anim === 'slow' ? 'slow' : 'fast';
        if (out.x < 0 || out.x > 30) bad(tag + ': x cell must be within 0..30');
        if (out.min > out.max || out.y < out.min || out.y > out.max) bad(tag + ': y must satisfy min <= y <= max');
        if (out.min < 0 || out.max > 112) bad(tag + ': min/max must be within 0..112');
        if (Math.abs(out.dy) > 6) bad(tag + ': |dy| must be <= 6');
        break;
      case 'd':
        needSprite('v');
        out.x = g.x | 0; out.y = g.y | 0; out.dx = g.dx | 0; out.dy = g.dy | 0; out.count = Math.max(1, g.count | 0);
        out.anim = g.anim === 'slow' ? 'slow' : 'fast';
        break;
      case 'arrow':
        out.dir = g.dir === 'right' ? 'right' : 'left'; out.y = g.y | 0;
        if (out.y % 8 === 0 || out.y % 8 === 7 || out.y < 1 || out.y > 126) bad(tag + ': arrow y must have y%8 in 1..6');
        break;
      case 'rope':
        out.x = g.x | 0; out.length = g.length == null ? 32 : g.length | 0; out.ink = null;
        if (out.x < 2 || out.x > 29) bad(tag + ': rope x should be within 2..29');
        break;
      case 'lift':
        out.x = g.x | 0; out.width = Math.max(2, g.width | 0 || 3); out.top = g.top | 0; out.bottom = g.bottom | 0;
        out.period = Math.max(1, g.period | 0 || 4); out.start = g.start == null ? out.bottom : g.start | 0;
        out.dir = g.dir === 'down' ? 'down' : 'up';
        out.style = g.style || null;
        if (out.top > out.bottom || out.start < out.top || out.start > out.bottom) bad(tag + ': lift needs top <= start <= bottom');
        if (out.bottom > 15 || out.top < 2) bad(tag + ': lift rows must be within 2..15');
        break;
      default:
        bad(tag + ': unknown guardian type');
        out.type = 'none';
    }
    return out;
  };

  // Create runtime entity state for a room (on entry and after each death).
  JSW.initEntities = function (room) {
    return room.guardians.map(function (g) {
      var e = { t: g, type: g.type, anim: 0, tick: 0 };
      switch (g.type) {
        case 'h': e.x = g.x; e.o = g.dir === 'right' ? 0 : 3; e.dir = g.dir; break;
        case 'v': e.y = g.y; e.dy = g.dy; break;
        case 'd': e.x = g.x; e.y = g.y; e.dx = g.dx; e.dy = g.dy; e.n = g.count; break;
        case 'arrow': e.x = g.dir === 'right' ? 208 : 28; break;
        case 'rope': e.a = 34; e.v = -1; break;               // JSW start: frame 0x22, swinging right-to-left
        case 'lift': e.row = g.start; e.dir = g.dir; e.timer = g.period; break;
      }
      return e;
    });
  };

  // Advance all entities one frame. Returns { sounds: [...] , liftMoves: [{e, from, to}] }.
  JSW.updateEntities = function (ents) {
    var out = { sounds: [], liftMoves: [] };
    for (var k = 0; k < ents.length; k++) {
      var e = ents[k], g = e.t, s;
      switch (e.type) {
        case 'h':
          for (s = 0; s < g.speed; s++) {
            if (e.dir === 'right') {
              if (e.o < 3) e.o++;
              else if (e.x >= g.max) e.dir = 'left';          // 1-frame pause while the sprite flips
              else { e.x++; e.o = 0; }
            } else {
              if (e.o > 0) e.o--;
              else if (e.x <= g.min) e.dir = 'right';
              else { e.x--; e.o = 3; }
            }
          }
          e.anim = e.dir === 'right' ? e.o : 3 - e.o;
          break;
        case 'v':
          e.y += e.dy;
          if (e.y >= g.max) { e.y = g.max; e.dy = -e.dy; }
          else if (e.y <= g.min) { e.y = g.min; e.dy = -e.dy; }
          animate(e, g);
          break;
        case 'd':
          e.x += e.dx; e.y += e.dy;
          if (--e.n <= 0) { e.n = g.count; e.dx = -e.dx; e.dy = -e.dy; }
          animate(e, g);
          break;
        case 'arrow':
          e.x = (e.x + (g.dir === 'right' ? 1 : -1) + 256) & 255;
          if ((g.dir === 'right' && e.x === 244) || (g.dir === 'left' && e.x === 44)) out.sounds.push('arrow');
          break;
        case 'rope': {
          var m = Math.abs(e.a), away = (e.a === 0) ? true : ((e.a > 0) === (e.v > 0));
          var step = m < (away ? 18 : 20) ? 4 : 2;
          e.a += e.v * step;
          if (e.a >= ROPE_MAX) { e.a = ROPE_MAX; e.v = -1; }
          else if (e.a <= -ROPE_MAX) { e.a = -ROPE_MAX; e.v = 1; }
          break;
        }
        case 'lift':
          if (--e.timer <= 0) {
            e.timer = g.period;
            var from = e.row;
            if (e.dir === 'up') { if (e.row <= g.top) { e.dir = 'down'; e.row++; } else e.row--; }
            else { if (e.row >= g.bottom) { e.dir = 'up'; e.row--; } else e.row++; }
            out.liftMoves.push({ e: e, from: from, to: e.row });
          }
          break;
      }
    }
    return out;
  };

  function animate(e, g) {
    var sp = JSW.sprites[g.sprite], n = sp ? sp.frames.length : 1;
    e.tick ^= 1;
    if (g.anim === 'fast' || e.tick) e.anim = (e.anim + 1) % n;
  }

  // Rope segment pixel positions (33 segments). JSW: segment 0 at (x*8, 0); side from the sign of the swing angle.
  JSW.ropeSegments = function (e) {
    var g = e.t, m = Math.abs(e.a), side = e.a < 0 ? -1 : 1, x = g.x * 8, y = 0, segs = [[x, y]];
    for (var s = 0; s < g.length; s++) {
      var idx = Math.min(m + s, ROPE_X.length - 1);
      x += side * ROPE_X[idx];
      y += ROPE_Y[idx] / 2;
      segs.push([x, y]);
    }
    return segs;
  };

  // Lift cells overlay: Uint8Array(512) with FLOOR where lift platforms currently are.
  JSW.liftOverlay = function (ents) {
    var ov = null;
    for (var k = 0; k < ents.length; k++) {
      var e = ents[k];
      if (e.type !== 'lift') continue;
      ov = ov || new Uint8Array(512);
      for (var c = 0; c < e.t.width; c++) {
        var x = e.t.x + c;
        if (x >= 0 && x < 32) ov[e.row * 32 + x] = T.FLOOR;
      }
    }
    return ov;
  };

  // Horizontal-mover sprite frame & pixel position for an 'h' entity
  JSW.hGuardianPos = function (e) { return { x: e.x * 8 + e.o * 2, y: e.t.y, mirror: e.dir === 'left' }; };

  // ---- Willy layer: a 256x128 bitmap of Wally's pixels this frame, for pixel-perfect collisions ----
  JSW.drawWillyLayer = function (layer, w, env, sprite) {
    layer.fill(0);
    if (!sprite) return;
    var frames = sprite.frames, x = JSW.willyX(w), y = w.y + JSW.rampOffset(w, env);
    var pose = w.facing === 0 ? w.frame : 3 - w.frame;
    var rows = frames[pose % frames.length];
    for (var r = 0; r < 16; r++) {
      var bits = rows[r], py = y + r;
      if (py < 0 || py > 127) continue;
      if (w.facing === 1) bits = JSW.mirrorBits10(bits);
      for (var c = 0; c < 16; c++) {
        if (!((bits >> (15 - c)) & 1)) continue;
        var px = x + c;
        if (px >= 0 && px < 256) layer[py * 256 + px] = 1;
      }
    }
  };

  // Test a 16-row sprite (row masks) at pixel (x, y) against the Willy layer.
  JSW.spriteHitsLayer = function (layer, rows, x, y, mirror) {
    for (var r = 0; r < rows.length; r++) {
      var bits = rows[r], py = y + r;
      if (py < 0 || py > 127 || !bits) continue;
      if (mirror) bits = JSW.mirrorBits10(bits);
      for (var c = 0; c < 16; c++) {
        if (!((bits >> (15 - c)) & 1)) continue;
        var px = x + c;
        if (px >= 0 && px < 256 && layer[py * 256 + px]) return true;
      }
    }
    return false;
  };

  // Current frame rows + position of a sprite-based entity (h, v, d). Returns null for other types.
  JSW.entitySprite = function (e) {
    var g = e.t, sp = JSW.sprites[g.sprite];
    if (!sp) return null;
    if (e.type === 'h') {
      var p = JSW.hGuardianPos(e), n = sp.frames.length;
      var idx = (n === 8) ? (e.dir === 'left' ? 4 + (e.anim & 3) : (e.anim & 3)) : e.anim % n;
      return { rows: sp.frames[idx], x: p.x, y: p.y, mirror: n !== 8 && p.mirror };
    }
    if (e.type === 'v') return { rows: sp.frames[e.anim % sp.frames.length], x: g.x * 8, y: e.y, mirror: false };
    if (e.type === 'd') return { rows: sp.frames[e.anim % sp.frames.length], x: e.x, y: e.y, mirror: false };
    return null;
  };

  // Collision & rope interaction after Willy has moved. Returns { dead: reason|null }.
  // Mutates Willy when he grabs / holds / climbs a rope.
  JSW.entityCollisions = function (ents, layer, w, env, hasExitUp) {
    for (var k = 0; k < ents.length; k++) {
      var e = ents[k];
      if (e.type === 'h' || e.type === 'v' || e.type === 'd') {
        var s = JSW.entitySprite(e);
        if (s && JSW.spriteHitsLayer(layer, s.rows, s.x, s.y, s.mirror)) return { dead: 'guardian' };
      } else if (e.type === 'arrow') {
        if (e.x < 32) {
          var py = e.t.y, px0 = e.x * 8;
          for (var c = 0; c < 8; c++) if (layer[py * 256 + px0 + c]) return { dead: 'arrow' };
        }
      } else if (e.type === 'rope') {
        JSW.ropeInteract(e, function (x, y) { return layer[y * 256 + x]; }, w, env, hasExitUp);
      }
    }
    return { dead: null };
  };

  function placeOnRope(w, p) {
    w.y = p[1] - 8;
    var x = (p[0] & ~1) - 4;
    w.col = Math.floor(x / 8); w.frame = ((x % 8) + 8) % 8 / 2;
    if (w.col < 0) { w.col = 0; w.frame = 0; }
    if (w.col > 30) { w.col = 30; w.frame = 3; }
  }

  // Rope/Willy interaction. hit(x, y) tells whether Willy has a pixel at (x, y) this frame.
  JSW.ropeInteract = function (e, hit, w, env, hasExitUp) {
    var segs = e.segs || JSW.ropeSegments(e), g = e.t;
    if (w.rope) {
      if (w.moving) {
        var swingRight = e.v > 0, facingRight = w.facing === 0;
        w.rope += (swingRight === facingRight) ? 1 : -1;
      }
      if (!hasExitUp && w.rope < 12) w.rope = 12;
      if (w.rope < 1) w.rope = 1;
      if (w.rope > g.length) {           // dropped off the bottom
        w.rope = 0; w.ropeCool = 16; w.y = Math.floor(w.y / 4) * 4; w.airborne = 0; w.moving = false;
        return;
      }
      placeOnRope(w, segs[w.rope]);
      return;
    }
    if (w.ropeCool > 0 || w.airborne === 255) return;
    for (var s = 1; s < segs.length; s++) {
      var p = segs[s];
      if (p[1] >= 0 && p[1] < 128 && p[0] >= 0 && p[0] < 256 && hit(p[0], p[1])) {
        w.rope = s; w.airborne = 0; w.jc = 0;
        if (!hasExitUp && w.rope < 12) w.rope = 12;
        placeOnRope(w, segs[w.rope]);
        return;
      }
    }
  };

  // Fast pixel test for Willy's sprite at his current (drawn) position - used by the solver.
  JSW.willyHitTest = function (w, env, sprite) {
    var x0 = JSW.willyX(w), y0 = w.y + JSW.rampOffset(w, env);
    var pose = w.facing === 0 ? w.frame : 3 - w.frame, rows = sprite.frames[pose % sprite.frames.length];
    return function (x, y) {
      var c = x - x0, r = y - y0;
      if (c < 0 || c > 15 || r < 0 || r > 15) return false;
      var bits = rows[r];
      if (w.facing === 1) bits = JSW.mirrorBits10(bits);
      return !!((bits >> (15 - c)) & 1);
    };
  };
})(globalThis.JSW = globalThis.JSW || {});
