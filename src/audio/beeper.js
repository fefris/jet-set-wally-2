// 1-bit "beeper" sound emulation with WebAudio: a single square-wave voice (like the Spectrum's speaker)
// plus a second voice used only for two-note title music. Browser only; headless tools use a no-op stub.
(function (JSW) {
  'use strict';

  function Beeper() {
    this.ctx = null;
    this.master = null;
    this.voices = [];
    this.musicOn = true;
    this.sfxOn = true;
    this.volume = 0.12;
  }

  Beeper.prototype.init = function () {
    if (this.ctx) return true;
    var AC = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return false;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);
    for (var i = 0; i < 3; i++) {
      var osc = this.ctx.createOscillator();
      osc.type = 'square';
      var g = this.ctx.createGain();
      g.gain.value = 0;
      osc.connect(g); g.connect(this.master);
      osc.start();
      this.voices.push({ osc: osc, gain: g });
    }
    return true;
  };

  Beeper.prototype.resume = function () {
    if (!this.init()) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
  };

  // Play a tone on a voice: v 0/1 = music voices, 2 = sound effects.
  Beeper.prototype.tone = function (v, freq, dur, when) {
    if (!this.ctx || !freq) return;
    var voice = this.voices[v], t = (when == null ? this.ctx.currentTime : when);
    voice.osc.frequency.setValueAtTime(freq, t);
    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.setValueAtTime(1, t);
    voice.gain.gain.setValueAtTime(0, t + dur);
  };

  // Pitch sweep for sound effects (jump, death, item).
  Beeper.prototype.sweep = function (f0, f1, dur) {
    if (!this.ctx || !this.sfxOn) return;
    var voice = this.voices[2], t = this.ctx.currentTime;
    voice.osc.frequency.cancelScheduledValues(t);
    voice.osc.frequency.setValueAtTime(f0, t);
    voice.osc.frequency.linearRampToValueAtTime(f1, t + dur);
    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.setValueAtTime(1, t);
    voice.gain.gain.setValueAtTime(0, t + dur);
  };

  Beeper.prototype.sfx = function (freq, dur) {
    if (!this.sfxOn) return;
    this.tone(2, freq, dur);
  };

  Beeper.prototype.silence = function () {
    if (!this.ctx) return;
    var t = this.ctx.currentTime;
    this.voices.forEach(function (v) { v.gain.gain.cancelScheduledValues(t); v.gain.gain.setValueAtTime(0, t); });
  };

  // MIDI note number -> Hz
  JSW.noteHz = function (n) { return 440 * Math.pow(2, (n - 69) / 12); };

  // Parse a compact note string: "C4 D4 E4/2 R G#4*2" -> [{n: midi|null, len: units}]
  // '/2' halves, '*2' doubles the base length (1 unit). 'R' is a rest.
  JSW.parseNotes = function (str) {
    var NAMES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    return str.trim().split(/\s+/).map(function (tok) {
      var len = 1, m;
      if ((m = tok.match(/\*(\d+(?:\.\d+)?)$/))) { len = parseFloat(m[1]); tok = tok.slice(0, -m[0].length); }
      if ((m = tok.match(/\/(\d+)$/))) { len = 1 / parseInt(m[1], 10); tok = tok.slice(0, -m[0].length); }
      if (tok === 'R' || tok === '-') return { n: null, len: len };
      m = tok.match(/^([A-G])(#|b)?(-?\d)$/);
      if (!m) throw new Error('bad note ' + tok);
      var n = NAMES[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + (parseInt(m[3], 10) + 1) * 12;
      return { n: n, len: len };
    });
  };

  JSW.Beeper = Beeper;
})(globalThis.JSW = globalThis.JSW || {});
