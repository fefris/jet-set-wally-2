// Text drawing onto the Spectrum-style screen using the game's 8x8 font.
(function (JSW) {
  'use strict';

  // Print a string at character cell (cx, cy) with the given attribute (null = leave attributes alone).
  JSW.printAt = function (screen, text, cx, cy, attr) {
    var font = JSW.fonts.main;
    for (var i = 0; i < text.length; i++) {
      var x = cx + i;
      if (x < 0 || x > 31) continue;
      var g = font && (font.glyphs[text.charAt(i)] || font.glyphs['?']);
      screen.blit8(g || [0, 0, 0, 0, 0, 0, 0, 0], x * 8, cy * 8, 'set');
      if (attr != null) screen.setAttr(x, cy, attr);
    }
  };

  // Print at arbitrary pixel coordinates (used for the title scroller).
  JSW.printPx = function (screen, text, px, py) {
    var font = JSW.fonts.main;
    for (var i = 0; i < text.length; i++) {
      var g = font && (font.glyphs[text.charAt(i)] || font.glyphs['?']);
      screen.blit8(g || [0, 0, 0, 0, 0, 0, 0, 0], px + i * 8, py, 'set');
    }
  };

  JSW.centre = function (text, width) {
    width = width || 32;
    if (text.length >= width) return text.slice(0, width);
    var left = Math.floor((width - text.length) / 2);
    var s = new Array(left + 1).join(' ') + text;
    while (s.length < width) s += ' ';
    return s;
  };
})(globalThis.JSW = globalThis.JSW || {});
