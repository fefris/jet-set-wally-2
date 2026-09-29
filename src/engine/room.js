// Room compiler: turns a JSW.defineRoom() definition into the runtime form used by the engine,
// the renderer and the Node validation/solver tools.
(function (JSW) {
  'use strict';

  var T = JSW.T = { AIR: 0, FLOOR: 1, WALL: 2, NASTY: 3, RAMP: 4, CONVEYOR: 5 };
  var TYPE_BY_NAME = { air: 0, background: 0, floor: 1, wall: 2, nasty: 3, ramp: 4, conveyor: 5 };
  JSW.TYPE_NAMES = ['air', 'floor', 'wall', 'nasty', 'ramp', 'conveyor'];
  JSW.ROOM_W = 32; JSW.ROOM_H = 16;
  var DIRS = JSW.DIRS = ['left', 'right', 'up', 'down'];
  JSW.OPPOSITE = { left: 'right', right: 'left', up: 'down', down: 'up' };
  JSW.DELTA = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };

  function colour(v, dflt) {
    if (v == null) return dflt;
    if (typeof v === 'number') return v & 7;
    var c = JSW.COLOUR[String(v).toLowerCase()];
    return c == null ? dflt : c;
  }
  JSW.colourIndex = colour;

  var BLANK = [0, 0, 0, 0, 0, 0, 0, 0];

  function mirror8(b) {
    var o = 0;
    for (var i = 0; i < 8; i++) if ((b >> i) & 1) o |= 1 << (7 - i);
    return o;
  }

  // Compile a room. Returns { room, problems[] } - problems are human-readable format errors.
  JSW.compileRoom = function (def) {
    var problems = [];
    function bad(msg) { problems.push(def.id + ': ' + msg); }
    var legend = def.tiles || {};
    var styles = [], styleBySym = {}, airStyle = -1;

    Object.keys(legend).forEach(function (sym) {
      var t = legend[sym];
      if (sym.length !== 1) { bad('legend symbol "' + sym + '" must be one character'); return; }
      if (sym === '+' || sym === '@') { bad('legend symbol "' + sym + '" is reserved'); return; }
      var type = TYPE_BY_NAME[t.type];
      if (type == null) { bad('legend "' + sym + '" has unknown type ' + t.type); type = 0; }
      var pat = t.tile ? JSW.tiles[t.tile] : null;
      if (t.tile && !pat) bad('legend "' + sym + '" uses unknown tile pattern ' + t.tile);
      var rows = pat ? pat.rows.slice() : BLANK.slice();
      var dir = t.dir;
      if (type === T.RAMP) {
        dir = dir || (sym === '\\' ? 'left' : 'right');   // direction the ramp RISES towards
        if (dir !== 'left' && dir !== 'right') bad('ramp "' + sym + '" dir must be left|right');
        if (dir === 'left') rows = rows.map(mirror8);
      }
      if (type === T.CONVEYOR) {
        dir = dir || (sym === '<' ? 'left' : 'right');
        if (dir !== 'left' && dir !== 'right') bad('conveyor "' + sym + '" dir must be left|right');
      }
      var paper = colour(t.paper, 0), ink = colour(t.ink, 7);
      var style = {
        sym: sym, type: type, rows: rows, dir: dir || null,
        attr: JSW.attr(ink, paper, !!t.bright, !!t.flash), ink: ink, paper: paper, bright: !!t.bright,
      };
      styleBySym[sym] = styles.length;
      if (type === T.AIR) {
        if (airStyle >= 0) bad('more than one air/background symbol');
        airStyle = styles.length;
      }
      styles.push(style);
    });
    if (airStyle < 0) {
      bad('no air/background symbol in legend');
      styles.push({ sym: ' ', type: 0, rows: BLANK.slice(), attr: 0x07, ink: 7, paper: 0, bright: false });
      airStyle = styles.length - 1;
    }

    var map = def.map || [];
    if (map.length !== 16) bad('map has ' + map.length + ' rows (expected 16)');
    var type = new Uint8Array(512), style = new Uint8Array(512), items = [];
    for (var y = 0; y < 16; y++) {
      var row = map[y] || '';
      if (row.length !== 32) bad('map row ' + y + ' has length ' + row.length + ' (expected 32)');
      for (var x = 0; x < 32; x++) {
        var ch = row.charAt(x) || ' ';
        var si = airStyle;
        if (ch === '+') { items.push([x, y]); }
        else if (ch === '@') { /* start marker, air */ }
        else if (styleBySym[ch] != null) si = styleBySym[ch];
        else bad('map row ' + y + ' col ' + x + ' uses undefined symbol "' + ch + '"');
        style[y * 32 + x] = si;
        type[y * 32 + x] = styles[si].type;
      }
    }
    (def.items || []).forEach(function (p) {
      if (!Array.isArray(p) || p.length !== 2) { bad('bad item entry ' + JSON.stringify(p)); return; }
      items.push([p[0] | 0, p[1] | 0]);
    });
    items.forEach(function (p) {
      if (p[0] < 0 || p[0] > 31 || p[1] < 0 || p[1] > 15) bad('item out of room at ' + p);
      else if (type[p[1] * 32 + p[0]] !== T.AIR) bad('item at ' + p + ' is not on an air cell');
    });

    var itemName = def.item || 'key';
    if (!JSW.itemGfx[itemName]) { bad('unknown item graphic ' + itemName); }

    var guardians = (def.guardians || []).map(function (g, i) {
      var gg = JSW.normaliseGuardian ? JSW.normaliseGuardian(g, def, bad, i) : g;
      return gg;
    });

    var room = {
      id: def.id,
      name: def.name || def.id,
      region: def.region || '',
      pos: def.pos || null,
      border: colour(def.border, 0),
      styles: styles, airStyle: airStyle,
      type: type, style: style,
      items: items,
      itemRows: (JSW.itemGfx[itemName] || { rows: BLANK }).rows,
      guardians: guardians,
      exits: { left: null, right: null, up: null, down: null },
      start: def.start || null,
      def: def,
    };
    return { room: room, problems: problems };
  };

  JSW.cellType = function (room, x, y) {
    if (x < 0 || x > 31 || y < 0 || y > 15) return -1;
    return room.type[y * 32 + x];
  };
})(globalThis.JSW = globalThis.JSW || {});
