// Asset registry: every data file registers sprites, tiles, items, tunes and rooms here.
// Loaded first so data files can call JSW.defineXxx(). Works as a classic browser script
// and inside a Node vm context (tools/load.js).
(function (JSW) {
  'use strict';

  JSW.sprites = JSW.sprites || {};   // 16x16 multi-frame sprites (Wally, guardians)
  JSW.tiles = JSW.tiles || {};       // 8x8 tile patterns
  JSW.itemGfx = JSW.itemGfx || {};   // 8x8 item (collectable) graphics
  JSW.tunes = JSW.tunes || {};       // beeper tunes
  JSW.rooms = JSW.rooms || {};       // room definitions keyed by id
  JSW.roomOrder = JSW.roomOrder || [];
  JSW.errors = JSW.errors || [];

  function fail(msg) {
    JSW.errors.push(msg);
    if (typeof console !== 'undefined') console.error('[JSW] ' + msg);
  }

  // Parse rows of '.'/'#' (or ' '/'X') into an array of row bitmasks (MSB = leftmost pixel).
  function parseBitmap(rows, w, h, what) {
    if (!Array.isArray(rows) || rows.length !== h) {
      fail(what + ': expected ' + h + ' rows, got ' + (rows && rows.length));
      rows = (rows || []).slice(0, h);
      while (rows.length < h) rows.push('');
    }
    return rows.map(function (r, i) {
      if (typeof r !== 'string') r = '';
      if (r.length !== w) fail(what + ': row ' + i + ' has width ' + r.length + ' (expected ' + w + ')');
      var bits = 0;
      for (var x = 0; x < w; x++) {
        var c = r.charAt(x);
        bits = bits * 2 + ((c === '#' || c === 'X' || c === '1' || c === '@') ? 1 : 0);
      }
      return bits;
    });
  }
  JSW.parseBitmap = parseBitmap;

  // Sprite: { frames: [[16 rows x 16 chars], ...] (4 or 8 frames), mover: 'h'|'v'|'static', desc }
  // For horizontal movers (Wally & horizontal guardians) the art is authored FACING RIGHT and must fit
  // in columns 0..9 (10px wide); the engine shifts it 2px per animation frame and mirrors it for leftward motion.
  JSW.defineSprite = function (name, def) {
    if (JSW.sprites[name]) fail('duplicate sprite ' + name);
    var frames = (def.frames || []).map(function (f, i) { return parseBitmap(f, 16, 16, 'sprite ' + name + ' frame ' + i); });
    if (frames.length !== 4 && frames.length !== 8 && frames.length !== 2 && frames.length !== 1) {
      fail('sprite ' + name + ': frame count ' + frames.length + ' (expected 1, 2, 4 or 8)');
    }
    var sprite = { name: name, frames: frames, mover: def.mover || 'v', desc: def.desc || '', theme: def.theme || '' };
    if (sprite.mover === 'h') {
      frames.forEach(function (f, i) {
        f.forEach(function (row, y) {
          if (row & 0x3F) fail('sprite ' + name + ' frame ' + i + ' row ' + y + ': horizontal-mover art must fit in columns 0..9');
        });
      });
    }
    JSW.sprites[name] = sprite;
    return sprite;
  };

  // Tile pattern: { rows: [8 strings x 8 chars] , desc }
  JSW.defineTile = function (name, def) {
    if (JSW.tiles[name]) fail('duplicate tile ' + name);
    JSW.tiles[name] = { name: name, rows: parseBitmap(def.rows, 8, 8, 'tile ' + name), desc: def.desc || '', kind: def.kind || '' };
    return JSW.tiles[name];
  };

  // Item graphic: { rows: [8 strings x 8 chars], desc }
  JSW.defineItem = function (name, def) {
    if (JSW.itemGfx[name]) fail('duplicate item graphic ' + name);
    JSW.itemGfx[name] = { name: name, rows: parseBitmap(def.rows, 8, 8, 'item ' + name), desc: def.desc || '' };
    return JSW.itemGfx[name];
  };

  // Font: { glyphs: { 'A': [8 strings x 8 chars], ... } } covering printable ASCII 32..126
  JSW.fonts = JSW.fonts || {};
  JSW.defineFont = function (name, def) {
    var glyphs = {};
    Object.keys(def.glyphs || {}).forEach(function (ch) {
      glyphs[ch] = parseBitmap(def.glyphs[ch], 8, 8, 'font ' + name + " glyph '" + ch + "'");
    });
    for (var c = 32; c < 127; c++) {
      if (!glyphs[String.fromCharCode(c)]) fail('font ' + name + " missing glyph '" + String.fromCharCode(c) + "'");
    }
    JSW.fonts[name] = { name: name, glyphs: glyphs };
    return JSW.fonts[name];
  };

  JSW.defineTune = function (name, def) {
    if (JSW.tunes[name]) fail('duplicate tune ' + name);
    JSW.tunes[name] = def;
    return def;
  };

  JSW.defineRoom = function (def) {
    if (!def || !def.id) { fail('room without id'); return; }
    if (JSW.rooms[def.id]) fail('duplicate room id ' + def.id + (JSW.__file ? ' (in ' + JSW.__file + ')' : ''));
    if (JSW.__file) def.__file = JSW.__file;
    JSW.rooms[def.id] = def;
    JSW.roomOrder.push(def.id);
    return def;
  };
})(globalThis.JSW = globalThis.JSW || {});
