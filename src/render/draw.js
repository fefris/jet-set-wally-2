// Room / sprite / status drawing onto the Spectrum-style Screen.
(function (JSW) {
  'use strict';
  var T = JSW.T;

  // Draw the static room background (tiles + attributes) into rows 0-15.
  JSW.drawRoomTiles = function (screen, room, frame) {
    for (var y = 0; y < 16; y++) {
      for (var x = 0; x < 32; x++) {
        var st = room.styles[room.style[y * 32 + x]];
        var rows = st.rows;
        if (st.type === T.CONVEYOR && frame != null) rows = conveyorRows(rows, st.dir, frame);
        screen.blit8(rows, x * 8, y * 8, 'set');
        screen.setAttr(x, y, st.attr);
      }
    }
  };

  // Conveyors animate by rotating rows 0 and 2 two bits per frame (opposite directions, like a belt loop).
  function rot8(b, n) { n = ((n % 8) + 8) % 8; return ((b << n) | (b >> (8 - n))) & 0xFF; }
  function conveyorRows(rows, dir, frame) {
    var s = (frame * 2) % 8, out = rows.slice();
    if (dir === 'left') { out[0] = rot8(rows[0], s); out[2] = rot8(rows[2], -s); }
    else { out[0] = rot8(rows[0], -s); out[2] = rot8(rows[2], s); }
    return out;
  }

  // Items: 8x8 graphic, ink cycles through colours each frame (paper = room background paper).
  JSW.drawItems = function (screen, room, collected, frame) {
    var air = room.styles[room.airStyle];
    for (var i = 0; i < room.items.length; i++) {
      if (collected && collected[i]) continue;
      var p = room.items[i];
      var ink = 3 + ((frame + i) & 3);      // magenta, green, cyan, yellow
      screen.blit8(room.itemRows, p[0] * 8, p[1] * 8, 'set');
      screen.setAttr(p[0], p[1], JSW.attr(ink, air.paper, true));
    }
  };

  // Decorative live map of visited rooms (a special room): each visited room is one cell, green when cleared,
  // red while items remain, flashing white for the current room. Drawn only over the room's air cells.
  JSW.drawCartography = function (screen, game) {
    var room = game.room(), map = room.def.special.cartography, ox = map.x || 2, oy = map.y || 1;
    var minC = Infinity, minR = Infinity;
    for (var id in game.rooms) { var p = game.rooms[id].pos; if (p) { minC = Math.min(minC, p[0]); minR = Math.min(minR, p[1]); } }
    for (var id2 in game.visited) {
      var r = game.rooms[id2], pos = r.pos;
      if (!pos) continue;
      var x = ox + pos[0] - minC, y = oy + pos[1] - minR;
      if (x < 0 || x > 31 || y < 0 || y > 15 || room.type[y * 32 + x] !== T.AIR) continue;
      screen.blit8([0x00, 0x7E, 0x7E, 0x7E, 0x7E, 0x7E, 0x7E, 0x00], x * 8, y * 8, 'set');
      var cur = id2 === game.roomId, cleared = game.roomCleared(id2);
      screen.setAttr(x, y, cur ? 0xC7 : (cleared ? 0x44 : 0x42));
    }
  };

  // Colour the attribute cells covered by a sprite box with ink over the room's background paper.
  JSW.colourBox = function (screen, room, px, py, w, h, ink, bright) {
    var air = room.styles[room.airStyle];
    var x0 = Math.floor(px / 8), x1 = Math.floor((px + w - 1) / 8);
    var y0 = Math.floor(py / 8), y1 = Math.floor((py + h - 1) / 8);
    for (var cy = y0; cy <= y1; cy++) {
      if (cy < 0 || cy > 15) continue;
      for (var cx = x0; cx <= x1; cx++) {
        if (cx < 0 || cx > 31) continue;
        var t = room.type[cy * 32 + cx];
        // keep paper of whatever the sprite overlaps, but only recolour air/ramp/floor cells' ink
        var cur = screen.getAttr(cx, cy);
        var paper = (t === T.AIR) ? air.paper : ((cur >> 3) & 7);
        screen.setAttr(cx, cy, JSW.attr(ink, paper, bright == null ? !!(cur & 0x40) : bright));
      }
    }
  };
})(globalThis.JSW = globalThis.JSW || {});
