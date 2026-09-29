// Public-domain music, transcribed for the 1-bit beeper.
//  ingame: Edvard Grieg, "In the Hall of the Mountain King" (Peer Gynt, 1875) - 64 slots, one slot = 2 logic frames.
//  title:  Ludwig van Beethoven, Piano Sonata No. 14 "Moonlight", 1st movement opening (1801) - pairs [upper, lower]
//          played as rapid two-note alternation, the classic beeper "chord" trick.
(function (JSW) {
  'use strict';

  var HALL =
    'B3 C#4 D4 E4 F#4 D4 F#4 F#4 ' +
    'F4 C#4 F4 F4 E4 C4 E4 E4 ' +
    'B3 C#4 D4 E4 F#4 D4 F#4 B4 ' +
    'A4 F#4 D4 F#4 A4 A4 A4 A4 ' +
    'F#4 G#4 A#4 B4 C#5 A#4 C#5 C#5 ' +
    'D5 A#4 D5 D5 C#5 A#4 C#5 C#5 ' +
    'F#4 G#4 A#4 B4 C#5 A#4 C#5 F#5 ' +
    'E5 C#5 A#4 C#5 E5 E5 E5 E5';

  JSW.defineTune('ingame', { slots: JSW.parseNotes(HALL).map(function (n) { return n.n; }) });

  // Moonlight Sonata: triplet arpeggios (upper) over the bass line (lower), one pair per beat.
  var M = [];
  function bar(bass, triad, times) { for (var i = 0; i < times; i++) for (var k = 0; k < 3; k++) M.push([triad[k], bass]); }
  var n = function (s) { return JSW.parseNotes(s)[0].n; };
  bar(n('C#3'), [n('G#3'), n('C#4'), n('E4')], 4);
  bar(n('B2'), [n('G#3'), n('C#4'), n('E4')], 4);
  bar(n('A2'), [n('A3'), n('C#4'), n('E4')], 2);
  bar(n('F#2'), [n('A3'), n('D4'), n('F#4')], 2);
  bar(n('G#2'), [n('G#3'), n('C4'), n('F#4')], 1);
  bar(n('G#2'), [n('G#3'), n('C#4'), n('E4')], 1);
  bar(n('G#2'), [n('G#3'), n('C#4'), n('D#4')], 1);
  bar(n('G#2'), [n('F#3'), n('C4'), n('D#4')], 1);
  bar(n('C#3'), [n('E3'), n('G#3'), n('C#4')], 4);
  // melody enters (G#4 over the arpeggio)
  bar(n('C#3'), [n('G#3'), n('C#4'), n('G#4')], 3);
  bar(n('C#3'), [n('G#3'), n('C#4'), n('G#4')], 1);
  bar(n('B2'), [n('A3'), n('D#4'), n('A4')], 2);
  bar(n('B2'), [n('G#3'), n('D#4'), n('G#4')], 2);
  bar(n('A2'), [n('A3'), n('C#4'), n('F#4')], 2);
  bar(n('F#2'), [n('A3'), n('D4'), n('B4')], 2);
  bar(n('G#2'), [n('G#3'), n('C4'), n('E4')], 2);
  bar(n('C#3'), [n('G#3'), n('C#4'), n('E4')], 4);

  JSW.defineTune('title', { pairs: M, beat: 0.16 });
})(globalThis.JSW = globalThis.JSW || {});
