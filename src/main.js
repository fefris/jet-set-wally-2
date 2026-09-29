// Browser boot: canvas scaling, keyboard/gamepad input, fixed-timestep loop, title/game/pause flow, sound mapping.
(function (JSW) {
  'use strict';

  var FPS = 20;                     // logic frames per second (JSW II ran ~18-25)
  var canvas, ctx, img, rgba, screen, beeper;
  var state = 'title', title, game, paused = false, lastTime = 0, acc = 0, flashClock = 0;
  var keys = {}, pressedOnce = {};
  var musicOn = true, blurPause = true;

  var LEFT = ['KeyQ', 'KeyE', 'KeyT', 'KeyU', 'KeyO', 'ArrowLeft', 'Digit5', 'Digit6'];
  var RIGHT = ['KeyW', 'KeyR', 'KeyY', 'KeyI', 'KeyP', 'ArrowRight', 'Digit7', 'Digit8'];
  var JUMP = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Space', 'ShiftLeft', 'ShiftRight', 'ArrowUp', 'Digit0'];
  var PAUSE = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG'];
  var MUSIC = ['KeyH', 'KeyJ', 'KeyK', 'KeyL'];

  function any(list) { for (var i = 0; i < list.length; i++) if (keys[list[i]]) return true; return false; }

  function gamepad() {
    var out = { left: false, right: false, jump: false, start: false };
    var pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (var i = 0; i < pads.length; i++) {
      var p = pads[i]; if (!p) continue;
      var ax = p.axes[0] || 0;
      if (ax < -0.4 || (p.buttons[14] && p.buttons[14].pressed)) out.left = true;
      if (ax > 0.4 || (p.buttons[15] && p.buttons[15].pressed)) out.right = true;
      if ((p.buttons[0] && p.buttons[0].pressed) || (p.buttons[1] && p.buttons[1].pressed) || (p.buttons[12] && p.buttons[12].pressed)) out.jump = true;
      if (p.buttons[9] && p.buttons[9].pressed) out.start = true;
    }
    return out;
  }

  function readInput() {
    var gp = gamepad();
    return { left: any(LEFT) || gp.left, right: any(RIGHT) || gp.right, jump: any(JUMP) || gp.jump, start: gp.start };
  }

  function resize() {
    var w = screen.outWidth(), h = screen.outHeight();
    var s = Math.max(1, Math.floor(Math.min(window.innerWidth / w, window.innerHeight / h)));
    canvas.style.width = (w * s) + 'px';
    canvas.style.height = (h * s) + 'px';
  }

  function startGame() {
    game = new JSW.Game();
    state = 'game'; paused = false;
    beeper.silence();
  }

  function toTitle() {
    state = 'title'; title = new JSW.Title(); titleMusic.start();
  }

  // ---- title music (Moonlight Sonata, two-note alternation) -------------------------------------
  var titleMusic = {
    idx: 0, next: 0, playing: false,
    start: function () { this.idx = 0; this.next = 0; this.playing = true; title.scrollPos = -1; },
    update: function (now) {
      if (!this.playing || !beeper.ctx) return;
      var tune = JSW.tunes.title;
      if (now < this.next) return;
      if (this.idx >= tune.pairs.length) {
        // tune finished: run the scroller, then restart
        this.playing = false; title.scrollPos = 0; return;
      }
      var p = tune.pairs[this.idx++], t0 = beeper.ctx.currentTime, beat = tune.beat;
      // alternate the two notes quickly to fake a chord
      for (var k = 0; k < 6; k++) beeper.tone(k & 1, JSW.noteHz(k & 1 ? p[1] : p[0]), beat / 6 * 0.9, t0 + k * beat / 6);
      this.next = now + beat * 1000;
    },
  };

  // ---- sound effects & in-game music -----------------------------------------------------------
  function playSfx(list) {
    if (!beeper.ctx) return;
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      switch (e.type) {
        case 'note':
          if (musicOn) {
            var slots = JSW.tunes.ingame.slots, n = slots[e.idx % slots.length];
            if (n != null) beeper.tone(0, JSW.noteHz(n + (e.lives - 7) * 0.5), 0.045);
          }
          break;
        case 'jump': beeper.sfx(300 + (8 - Math.abs(e.j - 8)) * 170, 0.03); break;
        case 'fall': beeper.sfx(1400 - e.a * 70, 0.03); break;
        case 'item': beeper.sweep(2600, 600, 0.03); break;
        case 'arrow': beeper.sweep(300, 3200, 0.05); break;
        case 'die': beeper.silence(); break;
        case 'dieStep': beeper.sfx(1100 - e.step * 110, 0.04); break;
        case 'gameoverStep': beeper.sfx(120 + e.step * 18, 0.03); break;
        case 'teleport': case 'drain': case 'outfall': beeper.sweep(200, 2400, 0.6); break;
        case 'rocket': case 'yacht': beeper.sweep(80, 400, 2.8); break;
        case 'rumble': break;
        case 'toilet': beeper.sweep(1500, 100, 1.2); break;
        case 'win': beeper.sweep(400, 1600, 0.8); break;
      }
    }
  }

  function logicFrame() {
    var input = readInput();
    if (state === 'title') {
      title.update();
      if (title.scrollPos >= 0 && (title.t & 1) === 0) {
        title.scrollPos++;
        if (beeper.ctx) beeper.sfx(200 + (title.scrollPos * 37) % 500, 0.02);
        if (title.scrollPos > title.message.length) titleMusic.start();
      }
      if (keys.Enter || pressedOnce.Enter || pressedOnce.NumpadEnter || input.start || pressedOnce.Digit0) { keys.Enter = false; startGame(); }
    } else if (state === 'game') {
      if (paused) return;
      var sfx = game.update(input);
      playSfx(sfx);
      if (game.mode === 'over') toTitle();
      if (game.mode === 'results' && (keys.Enter || pressedOnce.Enter || input.start)) { keys.Enter = false; toTitle(); }
    }
    pressedOnce = {};
  }

  function frame(now) {
    var dt = Math.min(250, now - (lastTime || now));
    lastTime = now; acc += dt; flashClock += dt;
    var step = 1000 / FPS;
    while (acc >= step) { logicFrame(); acc -= step; }
    if (state === 'title') titleMusic.update(now);
    // render
    if (state === 'title') title.render(screen);
    else {
      game.render(screen);
      if (paused) {
        // JSW-style pause: colours shift every second
        var shift = Math.floor(now / 1000) % 8;
        for (var i = 0; i < screen.attr.length; i++) {
          var a = screen.attr[i];
          screen.attr[i] = (a & 0x80) | ((((a >> 3) & 7) + shift * 3) % 8) << 3 | (((a & 7) + shift * 3) % 8);
        }
      }
    }
    screen.toRGBA(rgba, Math.floor(flashClock / 320) % 2 === 1);
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(frame);
  }

  function onKey(e, down) {
    if (down && !keys[e.code]) pressedOnce[e.code] = true;
    keys[e.code] = down;
    if (beeper) beeper.resume();
    if (!down) return;
    if (state === 'game') {
      if (PAUSE.indexOf(e.code) >= 0) { paused = true; beeper.silence(); }
      else if (paused) paused = false;
      if (MUSIC.indexOf(e.code) >= 0 || (e.code === 'Enter' && game.mode === 'play')) { musicOn = !musicOn; }
      if (e.code === 'Escape') { toTitle(); }
    }
    if (e.code.indexOf('Arrow') === 0 || e.code === 'Space') e.preventDefault();
  }

  JSW.boot = function () {
    canvas = document.getElementById('screen');
    screen = new JSW.Screen();
    canvas.width = screen.outWidth(); canvas.height = screen.outHeight();
    ctx = canvas.getContext('2d');
    img = ctx.createImageData(canvas.width, canvas.height);
    rgba = img.data;
    beeper = new JSW.Beeper();
    var world = JSW.buildWorld();
    if (world.problems.length) console.warn('World problems:\n' + world.problems.join('\n'));
    title = new JSW.Title();
    titleMusic.start();
    window.addEventListener('keydown', function (e) { onKey(e, true); });
    window.addEventListener('keyup', function (e) { onKey(e, false); });
    window.addEventListener('mousedown', function () { beeper.resume(); });
    window.addEventListener('resize', resize);
    window.addEventListener('blur', function () { if (!blurPause) return; keys = {}; if (state === 'game') { paused = true; if (beeper.ctx) beeper.silence(); } });
    resize();
    // debug hooks for automated testing
    JSW.debug = {
      get game() { return game; }, get state() { return state; }, get paused() { return paused; },
      startGame: startGame, resume: function () { paused = false; }, setKey: function (k, v) { keys[k] = v; },
      noBlurPause: function () { window.onblur = null; blurPause = false; },
    };
    requestAnimationFrame(frame);
  };
})(globalThis.JSW = globalThis.JSW || {});
