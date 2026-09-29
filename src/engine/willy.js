// Wally's movement physics — a faithful re-implementation of the Jet Set Willy engine's state machine
// (routines 8DD3 "Move Willy (1)", 8ED4 "(2)", 8FBC "(3)") with the Jet Set Willy II changes adopted in docs/PLAN.md.
// Pure & headless: operates on a plain state object and an environment describing the room, so the Node solver
// runs exactly the same code as the browser game.
//
// State (all pixels):
//   col 0..30   left cell of the 2-cell-wide sprite box      frame 0..3  sub-cell step (pixel x = col*8 + frame*2)
//   y           top of the 16px sprite (stored cell-aligned on ramps; drawn lower by rampOffset)
//   facing 0=right 1=left   moving bool   airborne 0=ground 1=jumping 2..15=falling (>=12 fatal on landing)
//   jc 0..18 jump counter   rope 0=off, >0 held segment index   ropeCool frames until the rope can be grabbed again
(function (JSW) {
  'use strict';
  var T = JSW.T;

  // JSW flag table at 8421: newFlags = TABLE[flags + 4*left + 8*right], flags = facing | moving<<1
  var FLAG_TABLE = [0, 1, 0, 1, 1, 3, 1, 3, 2, 0, 2, 0, 0, 1, 2, 3];
  // Jump displacement per counter value: ((J & ~1) - 8) / 2 px
  var JUMP_DY = [];
  for (var j = 0; j < 18; j++) JUMP_DY.push(((j & ~1) - 8) / 2);
  JSW.JUMP_DY = JUMP_DY;

  JSW.newWilly = function (col, y, facing) {
    return { col: col | 0, frame: 0, y: y | 0, facing: facing | 0, moving: false, airborne: 0, jc: 0, rope: 0, ropeCool: 0 };
  };
  JSW.cloneWilly = function (w) {
    return { col: w.col, frame: w.frame, y: w.y, facing: w.facing, moving: w.moving, airborne: w.airborne, jc: w.jc, rope: w.rope, ropeCool: w.ropeCool };
  };
  JSW.willyX = function (w) { return w.col * 8 + w.frame * 2; };

  // Environment helpers. env = { room, cell(x,y) -> type (walls outside the room are reported as AIR),
  //                              ramp(x,y) -> 'left'|'right'|null, conveyor(x,y) -> 'left'|'right'|null,
  //                              forceRight, noJump, doubleSpeed }
  function isWall(env, x, y) { return env.cell(x, y) === T.WALL; }

  // Visual y offset while walking on a ramp (routine 95C8): JSW draws Willy lower than his stored, cell-aligned y.
  JSW.rampOffset = function (w, env) {
    if (w.airborne !== 0 || w.rope) return 0;
    var row = Math.floor(w.y / 8);
    if (env.ramp(w.col, row + 2) === 'left') return 2 * w.frame;
    if (env.ramp(w.col + 1, row + 2) === 'right') return 6 - 2 * w.frame;
    return 0;
  };

  // Horizontal step (8FBC). Returns 'left'/'right' when stepping off the room edge.
  function moveHoriz(w, env) {
    if (!w.moving || w.rope) return null;
    var row = Math.floor(w.y / 8), dy = 0, spans3 = (w.y % 8) !== 0, x, i;
    if (w.facing === 1) { // left
      if (w.frame > 0) { w.frame--; return null; }
      if (w.airborne === 0) {
        if (env.ramp(w.col - 1, row + 1) === 'left') dy = -1;
        else if (env.ramp(w.col + 1, row + 2) === 'right') dy = 1;
      }
      if (w.col === 0) return 'left';
      x = w.col - 1;
      for (i = 0; i < (spans3 ? 3 : 2); i++) if (isWall(env, x, row + dy + i)) return null;
      w.col--; w.y += dy * 8; w.frame = 3;
    } else {             // right
      if (w.frame < 3) { w.frame++; return null; }
      if (w.airborne === 0) {
        if (env.ramp(w.col + 2, row + 1) === 'right') dy = -1;
        else if (env.ramp(w.col, row + 2) === 'left') dy = 1;
      }
      if (w.col === 30) return 'right';
      x = w.col + 2;
      for (i = 0; i < (spans3 ? 3 : 2); i++) if (isWall(env, x, row + dy + i)) return null;
      w.col++; w.y += dy * 8; w.frame = 0;
    }
    return null;
  }

  // Ground control (8ED4): landing, conveyors, keys, jump. Returns an exit/death event or null.
  function groundControl(w, env, input) {
    var row = Math.floor(w.y / 8);
    if (!w.rope) {
      if (w.airborne >= 12) { w.airborne = 255; return 'fall'; }
      w.airborne = 0;
    }
    var left = !!input.left, right = !!input.right;
    if (!w.rope) {
      var conv = env.conveyor(w.col, row + 2) || env.conveyor(w.col + 1, row + 2);
      if (conv === 'left') left = true; else if (conv === 'right') right = true;
    }
    if (env.forceRight) { left = false; right = true; }
    var flags = w.facing | (w.moving ? 2 : 0);
    flags = FLAG_TABLE[flags + (left ? 4 : 0) + (right ? 8 : 0)];
    w.facing = flags & 1; w.moving = !!(flags & 2);

    if (input.jump && !env.noJump) {
      // JSW II: a jump pressed on a turning frame still carries Willy in the chosen direction.
      if (left !== right) { w.facing = left ? 1 : 0; w.moving = true; }
      w.jc = 0; w.airborne = 1;
      if (w.rope) {
        w.rope = 0; w.ropeCool = 16;
        w.y = Math.floor(w.y / 8) * 8;
        w.moving = true;
        return null;
      }
    }
    return moveHoriz(w, env);
  }

  // One logic frame of Willy movement (8DD3). input = {left, right, jump}.
  // Returns null or an event: 'left' | 'right' | 'up' | 'down' (room exits), 'fall' (fatal landing).
  JSW.stepWilly = function (w, env, input) {
    var ev;
    if (w.ropeCool > 0) w.ropeCool--;
    if (w.rope) return groundControl(w, env, input);

    if (w.airborne === 1) {
      w.y += JUMP_DY[w.jc];
      if (w.y < 0) return 'up';
      var top = Math.floor(w.y / 8);
      if (isWall(env, w.col, top) || isWall(env, w.col + 1, top)) {
        w.y = (top + 1) * 8;          // snap below the ceiling
        w.airborne = 2; w.moving = false;
        return null;
      }
      w.jc++;
      if (w.jc === 18) {
        w.airborne = 6;               // JSW II: no dead frame - fall through to the landing check now
      } else if (w.jc !== 13 && w.jc !== 16) {
        return moveHoriz(w, env);
      }
    }

    if (w.y % 8 === 0) {
      var r2 = w.y / 8 + 2;
      if (r2 > 15) return 'down';
      var L = env.cell(w.col, r2), R = env.cell(w.col + 1, r2);
      if (L !== T.NASTY && R !== T.NASTY && (L !== T.AIR || R !== T.AIR)) {
        return groundControl(w, env, input);
      }
    }
    if (w.airborne === 1) return moveHoriz(w, env);   // mid-jump landing check failed: keep flying
    w.moving = false;
    if (w.airborne === 0) { w.airborne = 2; return null; }
    w.airborne++;
    if (w.airborne === 16) w.airborne = 12;
    w.y += 4;
    return ev || null;
  };

  // Willy's cell block for nasty checks & item collection (95C8/961E): 2 wide x 3 tall from the drawn position.
  // Returns { cells: [[x,y],...6], white: [[x,y],...] } where white = cells Willy actually covers (top 2 rows always,
  // third row only when the drawn sprite spans 3 rows).
  JSW.willyCells = function (w, env) {
    var dy = w.y + JSW.rampOffset(w, env);
    var row = Math.floor(dy / 8), spans3 = (dy % 8) !== 0, cells = [], white = [];
    for (var r = 0; r < 3; r++) for (var c = 0; c < 2; c++) {
      var p = [w.col + c, row + r];
      cells.push(p);
      if (r < 2 || spans3) white.push(p);
    }
    return { cells: cells, white: white };
  };

  // Does any cell of Willy's 2x3 block contain a nasty?
  JSW.touchesNasty = function (w, env) {
    var b = JSW.willyCells(w, env).cells;
    for (var i = 0; i < b.length; i++) if (env.cell(b[i][0], b[i][1]) === T.NASTY) return true;
    return false;
  };

  // Apply a room transition to Willy's state (948A/949E/94B0/94D2).
  JSW.enterRoomState = function (w, dir) {
    if (dir === 'left') { w.col = 30; }
    else if (dir === 'right') { w.col = 0; }
    else if (dir === 'up') { w.y = 104; w.airborne = 0; w.jc = 0; if (w.rope) { w.rope = 0; } }
    else if (dir === 'down') { w.y = 0; if (w.airborne < 11) w.airborne = 2; }
  };

  // Build a movement environment for a compiled room (+ optional dynamic overlay for lifts).
  JSW.makeEnv = function (room, overlay) {
    var type = room.type, style = room.style, styles = room.styles;
    function cell(x, y) {
      if (x < 0 || x > 31 || y < 0 || y > 15) return T.AIR;
      if (overlay) { var o = overlay[y * 32 + x]; if (o) return o; }
      return type[y * 32 + x];
    }
    function dirOf(x, y, t) {
      if (x < 0 || x > 31 || y < 0 || y > 15) return null;
      if (type[y * 32 + x] !== t) return null;
      return styles[style[y * 32 + x]].dir;
    }
    return {
      room: room,
      cell: cell,
      ramp: function (x, y) { return dirOf(x, y, T.RAMP); },
      conveyor: function (x, y) { return dirOf(x, y, T.CONVEYOR); },
      forceRight: false, noJump: false,
    };
  };
})(globalThis.JSW = globalThis.JSW || {});
