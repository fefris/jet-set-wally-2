// World builder: compiles every registered room and derives exits from the world grid.
// Rooms sit on an integer grid (def.pos = [col, row]); a room's left/right/up/down exit is the room in the
// neighbouring grid cell. def.exits can override a direction with another room id (non-Euclidean link) or
// null (explicitly no exit); overrides must be reciprocal - the validator checks this.
(function (JSW) {
  'use strict';

  JSW.buildWorld = function () {
    var problems = [], rooms = {}, grid = {};
    JSW.roomOrder.forEach(function (id) {
      var res = JSW.compileRoom(JSW.rooms[id]);
      problems.push.apply(problems, res.problems);
      rooms[id] = res.room;
      var p = res.room.pos;
      var offgrid = !p && (JSW.rooms[id].special || {}).nightmare;   // the ending room lives off the map
      if (offgrid) return;
      if (!p || p.length !== 2) { problems.push(id + ': missing pos [col,row]'); return; }
      var key = p[0] + ',' + p[1];
      if (grid[key]) problems.push(id + ': grid position ' + key + ' already used by ' + grid[key]);
      else grid[key] = id;
    });

    Object.keys(rooms).forEach(function (id) {
      var r = rooms[id], p = r.pos, ov = r.def.exits || {};
      JSW.DIRS.forEach(function (d) {
        var target = null;
        if (Object.prototype.hasOwnProperty.call(ov, d)) {
          target = ov[d];
          if (target != null && !rooms[target] && !JSW.rooms[target]) problems.push(id + ': exit ' + d + ' -> unknown room ' + target);
        } else if (p) {
          var dx = JSW.DELTA[d];
          target = grid[(p[0] + dx[0]) + ',' + (p[1] + dx[1])] || null;
        }
        r.exits[d] = target;
      });
    });

    // reciprocity
    Object.keys(rooms).forEach(function (id) {
      var r = rooms[id];
      JSW.DIRS.forEach(function (d) {
        var t = r.exits[d];
        if (!t || !rooms[t]) return;
        var back = rooms[t].exits[JSW.OPPOSITE[d]];
        if (back !== id) problems.push(id + ': exit ' + d + ' -> ' + t + ' but ' + t + ' exit ' + JSW.OPPOSITE[d] + ' -> ' + back + ' (not reciprocal)');
      });
    });

    var start = null;
    Object.keys(rooms).forEach(function (id) {
      if (rooms[id].start) {
        if (start) problems.push(id + ': second start room (first was ' + start.room + ')');
        else start = { room: id, x: rooms[id].start[0], y: rooms[id].start[1] };
      }
    });
    if (!start && Object.keys(rooms).length) problems.push('no room defines start: [x, y]');

    var totalItems = 0;
    Object.keys(rooms).forEach(function (id) { totalItems += rooms[id].items.length; });

    return { rooms: rooms, grid: grid, start: start, totalItems: totalItems, problems: problems };
  };
})(globalThis.JSW = globalThis.JSW || {});
