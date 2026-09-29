// ZX Spectrum style display: 256x192 1-bit bitmap + 32x24 attribute cells (ink/paper/bright/flash)
// + border colour. Pure JS so it runs in the browser (canvas) and in Node (PNG previews).
(function (JSW) {
  'use strict';

  var N = 0xD7, B = 0xFF;
  // index 0-7 normal, 8-15 bright
  JSW.PALETTE = [
    [0, 0, 0], [0, 0, N], [N, 0, 0], [N, 0, N], [0, N, 0], [0, N, N], [N, N, 0], [N, N, N],
    [0, 0, 0], [0, 0, B], [B, 0, 0], [B, 0, B], [0, B, 0], [0, B, B], [B, B, 0], [B, B, B],
  ];
  JSW.COLOUR = { black: 0, blue: 1, red: 2, magenta: 3, green: 4, cyan: 5, yellow: 6, white: 7 };

  // Build an attribute byte. colour args accept names or numbers.
  JSW.attr = function (ink, paper, bright, flash) {
    function c(v) { return typeof v === 'string' ? JSW.COLOUR[v] : (v | 0); }
    return (flash ? 0x80 : 0) | (bright ? 0x40 : 0) | ((c(paper) & 7) << 3) | (c(ink) & 7);
  };

  var W = 256, H = 192;
  JSW.SCREEN_W = W; JSW.SCREEN_H = H;
  JSW.BORDER_X = 32; JSW.BORDER_Y = 24;

  function Screen() {
    this.px = new Uint8Array(W * H);
    this.attr = new Uint8Array(32 * 24);
    this.border = 0;
  }
  Screen.prototype.clear = function (attr) {
    this.px.fill(0);
    this.attr.fill(attr == null ? 0x38 : attr);
  };
  Screen.prototype.setAttr = function (cx, cy, a) {
    if (cx >= 0 && cx < 32 && cy >= 0 && cy < 24) this.attr[cy * 32 + cx] = a;
  };
  Screen.prototype.getAttr = function (cx, cy) { return this.attr[cy * 32 + cx]; };
  Screen.prototype.plot = function (x, y, on) {
    if (x >= 0 && x < W && y >= 0 && y < H) this.px[y * W + x] = on ? 1 : 0;
  };
  // Draw an 8-pixel-wide row-bitmap glyph (array of 8 bytes) at pixel x,y. mode: 'set'|'or'|'xor'
  Screen.prototype.blit8 = function (rows, x, y, mode) {
    for (var r = 0; r < rows.length; r++) {
      var bits = rows[r], py = y + r;
      if (py < 0 || py >= H) continue;
      for (var c = 0; c < 8; c++) {
        var px = x + c; if (px < 0 || px >= W) continue;
        var on = (bits >> (7 - c)) & 1, i = py * W + px;
        if (mode === 'or') { if (on) this.px[i] = 1; }
        else if (mode === 'xor') { if (on) this.px[i] ^= 1; }
        else this.px[i] = on;
      }
    }
  };
  // Draw a 16-wide sprite frame (array of 16 row masks) with optional horizontal pixel shift & mirror.
  // Returns true if any drawn pixel landed on an already-set pixel (collision), like the original engine.
  Screen.prototype.blit16 = function (rows, x, y, opts) {
    var hit = false, mirror10 = opts && opts.mirror10, mode = (opts && opts.mode) || 'or';
    for (var r = 0; r < rows.length; r++) {
      var bits = rows[r], py = y + r;
      if (py < 0 || py >= H) continue;
      if (mirror10) bits = mirrorBits10(bits);
      for (var c = 0; c < 16; c++) {
        if (!((bits >> (15 - c)) & 1)) continue;
        var px = x + c; if (px < 0 || px >= W) continue;
        var i = py * W + px;
        if (this.px[i]) hit = true;
        if (mode === 'xor') this.px[i] ^= 1; else this.px[i] = 1;
      }
    }
    return hit;
  };
  function mirrorBits10(bits) {
    // art lives in columns 0..9 (bits 15..6); mirror within that 10px field
    var out = 0;
    for (var c = 0; c < 10; c++) if ((bits >> (15 - c)) & 1) out |= 1 << (15 - (9 - c));
    return out;
  }
  JSW.mirrorBits10 = mirrorBits10;

  // Render to an RGBA byte array of size (W+2*BX) x (H+2*BY). flashOn swaps ink/paper on FLASH cells.
  Screen.prototype.toRGBA = function (out, flashOn) {
    var BX = JSW.BORDER_X, BY = JSW.BORDER_Y, OW = W + 2 * BX, OH = H + 2 * BY;
    var pal = JSW.PALETTE, bc = pal[this.border & 7], i, x, y;
    for (y = 0; y < OH; y++) {
      for (x = 0; x < OW; x++) {
        var sx = x - BX, sy = y - BY, col;
        if (sx < 0 || sy < 0 || sx >= W || sy >= H) col = bc;
        else {
          var a = this.attr[(sy >> 3) * 32 + (sx >> 3)];
          var bright = (a & 0x40) ? 8 : 0, ink = (a & 7) + bright, paper = ((a >> 3) & 7) + bright;
          var on = this.px[sy * W + sx];
          if ((a & 0x80) && flashOn) on = !on;
          col = pal[on ? ink : paper];
        }
        i = (y * OW + x) * 4;
        out[i] = col[0]; out[i + 1] = col[1]; out[i + 2] = col[2]; out[i + 3] = 255;
      }
    }
    return out;
  };
  Screen.prototype.outWidth = function () { return W + 2 * JSW.BORDER_X; };
  Screen.prototype.outHeight = function () { return H + 2 * JSW.BORDER_Y; };

  JSW.Screen = Screen;
})(globalThis.JSW = globalThis.JSW || {});
