// Title screen: block-letter logo made of flashing attribute cells, a moonlit mansion built from coloured cells
// and slope tiles, "Press ENTER to start", and a scrolling message with colour-cycling (JSW-style, original art).
(function (JSW) {
  'use strict';

  // 3x5 block letters (each '#' = one attribute cell)
  var BLOCK = {
    J: ['..#', '..#', '..#', '#.#', '###'], E: ['###', '#..', '##.', '#..', '###'], T: ['###', '.#.', '.#.', '.#.', '.#.'],
    S: ['###', '#..', '###', '..#', '###'], W: ['#.#', '#.#', '#.#', '###', '#.#'], A: ['###', '#.#', '###', '#.#', '#.#'],
    L: ['#..', '#..', '#..', '#..', '###'], Y: ['#.#', '#.#', '.#.', '.#.', '.#.'], I: ['###', '.#.', '.#.', '.#.', '###'],
    ' ': ['...', '...', '...', '...', '...'],
  };

  var SLASH = [0x01, 0x03, 0x07, 0x0F, 0x1F, 0x3F, 0x7F, 0xFF];   // '/' roof slope
  var BSLASH = [0x80, 0xC0, 0xE0, 0xF0, 0xF8, 0xFC, 0xFE, 0xFF];  // '\' roof slope
  var SOLID = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF];
  var WINDOW = [0xFF, 0x81, 0x81, 0xFF, 0x81, 0x81, 0xFF, 0x00];
  var STAR = [0, 0, 0x08, 0x1C, 0x08, 0, 0, 0];
  var MOON = [0x3C, 0x7E, 0xF8, 0xF0, 0xF0, 0xF8, 0x7E, 0x3C];

  // Mansion picture, rows 12..15 (legend: / \ roof slopes, R roof, W window, B brick, D door, T tree, * star, M moon)
  var PICTURE = [
    '  *      M        *      *   *  ',
    '      /RR\\    /RRRRRR\\    TT    ',
    '     /RRRR\\  /RRRRRRRR\\  TTTT   ',
    '     BWBBWB  BWBWBDBWBWB   TT    ',
  ];

  function Title() {
    this.t = 0;
    this.scrollPos = -1;
    this.message = '+++++ Press ENTER to Start +++++   JET SET WALLY II . . . . . Wally threw one party too many ' +
      'and Mrs Mop the housekeeper will not let him go to bed until the whole house - and everything the builders ' +
      'bolted on to it - is tidied up. Collect the flashing items in every corner of the estate. . . . . ' +
      'Keys: Q E T U O left, W R Y I P right, bottom row / SPACE jump, A-G pause, H-L music, ESC quit.  ' +
      'Cursor keys and gamepads work too. . . . . An original homage to the 1985 classic. . . . . ';
  }

  Title.prototype.update = function () { this.t++; };

  Title.prototype.render = function (screen) {
    screen.clear(0);
    screen.border = 0;
    var t = this.t;
    // logo
    this.word(screen, 'JET SET', 2, 1, t);
    this.word(screen, 'WALLY II', 0, 7, t + 4);
    // picture
    for (var r = 0; r < PICTURE.length; r++) {
      for (var c = 0; c < 32; c++) {
        var ch = PICTURE[r][c], y = 12 + r, a = null, bm = null;
        switch (ch) {
          case '/': bm = SLASH; a = 0x42; break;
          case '\\': bm = BSLASH; a = 0x42; break;
          case 'R': bm = SOLID; a = 0x42; break;
          case 'W': bm = WINDOW; a = ((t >> 3) + c) % 5 === 0 ? 0x70 : 0x46; break;
          case 'B': bm = SOLID; a = 0x02; break;
          case 'D': bm = [0x3C, 0x42, 0x42, 0x42, 0x4A, 0x42, 0x42, 0x42]; a = 0x16; break;
          case 'T': bm = [0x3C, 0x7E, 0xFF, 0xFF, 0x7E, 0x18, 0x18, 0x18]; a = 0x44; break;
          case '*': bm = STAR; a = ((t >> 2) + c) % 3 ? 0x47 : 0x07; break;
          case 'M': bm = MOON; a = 0x46; break;
        }
        if (bm) { screen.blit8(bm, c * 8, y * 8, 'set'); screen.setAttr(c, y, a); }
      }
    }
    // text rows
    if (this.scrollPos < 0) {
      JSW.printAt(screen, JSW.centre('Press ENTER to start'), 0, 19, 0x06);
      JSW.printAt(screen, JSW.centre('An original homage to JSW II'), 0, 21, 0x05);
    } else {
      var s = this.message, p = this.scrollPos, line = '';
      for (var i = 0; i < 32; i++) line += s.charAt((p + i) % s.length);
      JSW.printAt(screen, line, 0, 19, 0x4F);
      // colour cycle the whole top two-thirds like the original
      for (var k = 0; k < 512; k++) {
        var a2 = screen.attr[k];
        screen.attr[k] = (a2 & 0xC0) | ((((a2 >> 3) & 7) + p) % 8) << 3 | (((a2 & 7) + p) % 8);
      }
      screen.border = (p % 7) + 1;
    }
    JSW.printAt(screen, JSW.centre('(c) 2026 Wally Productions'), 0, 23, 0x01);
  };

  Title.prototype.word = function (screen, text, cx, cy, t) {
    for (var i = 0; i < text.length; i++) {
      var g = BLOCK[text[i]] || BLOCK[' '];
      for (var r = 0; r < 5; r++) for (var c = 0; c < 3; c++) {
        if (g[r][c] !== '#') continue;
        var x = cx + i * 4 + c, y = cy + r;
        // flashing yellow/magenta letters with a bright highlight wave
        var wave = ((t >> 1) + x + y) % 16 === 0;
        screen.setAttr(x, y, wave ? 0x7F : 0xF3 & 0xFF);
      }
    }
  };

  JSW.Title = Title;
})(globalThis.JSW = globalThis.JSW || {});
