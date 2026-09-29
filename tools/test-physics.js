#!/usr/bin/env node
// Physics regression tests: checks the engine against the JSW numbers in docs/research.md.
'use strict';
const { load } = require('./load');
const JSW = load({ quiet: true });
if (JSW.loadErrors.length) { console.log(JSW.loadErrors.join('\n')); process.exit(1); }

let fails = 0, passes = 0;
function check(name, cond, detail) {
  if (cond) { passes++; console.log('  ok   ' + name); }
  else { fails++; console.log('  FAIL ' + name + (detail ? '  -> ' + detail : '')); }
}

// Build a test room from a map (16 rows x 32). Legend: . air, = floor, # wall, ^ nasty, / \ ramps, < > conveyors
function room(rows) {
  while (rows.length < 16) rows.unshift('.'.repeat(32));
  const def = {
    id: 'test', name: 'Test', pos: [0, 0], item: undefined,
    tiles: {
      '.': { type: 'air' }, '=': { type: 'floor' }, '#': { type: 'wall' }, '^': { type: 'nasty' },
      '/': { type: 'ramp', dir: 'right' }, '\\': { type: 'ramp', dir: 'left' }, '<': { type: 'conveyor', dir: 'left' }, '>': { type: 'conveyor', dir: 'right' },
    },
    map: rows.map(r => (r + '.'.repeat(32)).slice(0, 32)),
  };
  const res = JSW.compileRoom(def);
  return JSW.makeEnv(res.room);
}
function run(w, env, inputs, n) {
  const trace = [];
  for (let i = 0; i < n; i++) {
    const inp = typeof inputs === 'function' ? inputs(i) : inputs;
    const ev = JSW.stepWilly(w, env, inp);
    trace.push({ x: JSW.willyX(w), y: w.y, air: w.airborne, ev });
    if (ev) break;
  }
  return trace;
}
const FLOOR15 = [...Array(15).fill('.'.repeat(32)), '='.repeat(32)];

console.log('Walking');
{
  const env = room(FLOOR15.slice());
  const w = JSW.newWilly(4, 104, 0);
  const t = run(w, env, { right: true }, 8);
  check('walk right 2 px/frame', t.map(s => s.x).join(',') === '34,36,38,40,42,44,46,48', t.map(s => s.x).join(','));
  const w2 = JSW.newWilly(4, 104, 0);
  const t2 = run(w2, env, { left: true }, 3);
  check('turning costs one frame', t2[0].x === 32 && t2[1].x === 30, t2.map(s => s.x).join(','));
}

console.log('Jump on flat ground');
{
  const env = room(FLOOR15.slice());
  const w = JSW.newWilly(4, 104, 0); w.moving = true;
  const t = run(w, env, (i) => ({ right: true, jump: i === 0 }), 19);
  const ys = t.map(s => s.y);
  const minY = Math.min(...ys);
  check('peak 20 px', 104 - minY === 20, 'peak=' + (104 - minY));
  const landIdx = t.findIndex((s, i) => i > 0 && s.air === 0);
  check('jump lasts 18 frames', landIdx === 18, 'landed at frame ' + landIdx);
  check('horizontal span 36 px', t[17].x - 32 === 36, 'span=' + (t[17].x - 32));
}

console.log('Standing jump height profile');
{
  const env = room(FLOOR15.slice());
  const w = JSW.newWilly(4, 104, 0);
  const t = run(w, env, (i) => ({ jump: i === 0 }), 18);
  check('vertical jump no x drift', t.every(s => s.x === 32), t.map(s => s.x).join(','));
  check('dy table', t.slice(1, 9).map(s => 104 - s.y).join(',') === '4,8,11,14,16,18,19,20', t.slice(1, 9).map(s => 104 - s.y).join(','));
}

console.log('Fall damage');
{
  for (const [drop, fatal] of [[4, false], [5, true]]) {
    const rows = Array(16).fill('.'.repeat(32));
    const ledgeRow = 15 - drop;                            // ledge surface row, landing floor row 15
    rows[ledgeRow] = '=====' + '.'.repeat(27);
    rows[15] = '='.repeat(32);
    const env = room(rows);
    const w = JSW.newWilly(3, (ledgeRow - 2) * 8, 0);
    const t = run(w, env, { right: true }, 60);
    const died = t.some(s => s.ev === 'fall');
    check(`walk-off drop of ${drop} cells is ${fatal ? 'fatal' : 'safe'}`, died === fatal, JSON.stringify(t[t.length - 1]));
  }
  for (const [below, fatal] of [[2, false], [3, true]]) {
    const rows = Array(16).fill('.'.repeat(32));
    rows[10] = '======' + '.'.repeat(26);                   // take-off ledge at row 10 (Willy y=64)
    rows[10 + below] = '.'.repeat(8) + '='.repeat(24);      // landing floor below, away from the ledge
    const env = room(rows);
    const w = JSW.newWilly(3, 64, 0); w.moving = true;
    const t = run(w, env, (i) => ({ right: true, jump: i === 0 }), 60);
    const died = t.some(s => s.ev === 'fall');
    check(`jump landing ${below} cells below take-off is ${fatal ? 'fatal' : 'safe'}`, died === fatal, JSON.stringify(t.slice(-2)));
  }
}

console.log('One-way floors & ceilings');
{
  const rows = Array(16).fill('.'.repeat(32));
  rows[13] = '.'.repeat(4) + '====' + '.'.repeat(24);       // floor 2 cells above the ground (row 15)
  rows[15] = '='.repeat(32);
  const env = room(rows);
  const w = JSW.newWilly(4, 104, 0);
  run(w, env, (i) => ({ jump: i === 0 }), 20);
  check('jump up through a floor and land on it', w.y === 88 && w.airborne === 0, `y=${w.y} air=${w.airborne}`);
  const rows2 = Array(16).fill('.'.repeat(32));
  rows2[11] = '.'.repeat(4) + '####' + '.'.repeat(24);
  rows2[15] = '='.repeat(32);
  const env2 = room(rows2);
  const w2 = JSW.newWilly(4, 104, 0);
  const t = run(w2, env2, (i) => ({ jump: i === 0 }), 30);
  check('wall ceiling stops the jump', Math.min(...t.map(s => s.y)) >= 96 && w2.y === 104, 'min y ' + Math.min(...t.map(s => s.y)));
}

console.log('Ramps');
{
  const rows = Array(16).fill('.'.repeat(32));
  rows[15] = '='.repeat(32);
  // '/' staircase rising right: bottom cell at (10,14), then (11,13) ... (15,9); landing floor at row 9 from col 16
  for (let i = 0; i < 6; i++) rows[14 - i] = rows[14 - i].slice(0, 10 + i) + '/' + rows[14 - i].slice(11 + i);
  rows[9] = rows[9].slice(0, 16) + '='.repeat(16);
  const env = room(rows);
  const w = JSW.newWilly(6, 104, 0);
  const t = run(w, env, { right: true }, 60);
  const drawn = [];
  const w3 = JSW.newWilly(6, 104, 0);
  for (let i = 0; i < 40; i++) { JSW.stepWilly(w3, env, { right: true }); drawn.push(w3.y + JSW.rampOffset(w3, env)); }
  check('walk up a / ramp to the landing', w.y === 56 && w.airborne === 0, `y=${w.y} col=${w.col} air=${w.airborne}`);
  let smooth = true;
  for (let i = 1; i < drawn.length; i++) if (Math.abs(drawn[i] - drawn[i - 1]) > 2) smooth = false;
  check('ramp motion is smooth (<=2 px/frame)', smooth, drawn.join(','));
  const t2 = run(w, env, { left: true }, 80);
  check('walk back down the ramp', w.y === 104 && w.airborne === 0 && !t2.some(s => s.ev === 'fall'), `y=${w.y} air=${w.airborne}`);
}

console.log('Ramps rising left');
{
  const rows = Array(16).fill('.'.repeat(32));
  rows[15] = '='.repeat(32);
  // '\' staircase rising left: bottom cell at (21,14), then (20,13) ... (16,9); landing floor at row 9 up to col 15
  for (let i = 0; i < 6; i++) rows[14 - i] = rows[14 - i].slice(0, 21 - i) + '\\' + rows[14 - i].slice(22 - i);
  rows[9] = '='.repeat(16) + rows[9].slice(16);
  const env = room(rows);
  const w = JSW.newWilly(25, 104, 1);
  const drawn = [];
  for (let i = 0; i < 60; i++) { JSW.stepWilly(w, env, { left: true }); drawn.push(w.y + JSW.rampOffset(w, env)); }
  check('walk up a \\ ramp to the landing', w.y === 56 && w.airborne === 0, `y=${w.y} col=${w.col} air=${w.airborne}`);
  let smooth = true;
  for (let i = 1; i < drawn.length; i++) if (Math.abs(drawn[i] - drawn[i - 1]) > 2) smooth = false;
  check('\\ ramp motion is smooth', smooth, drawn.join(','));
  for (let i = 0; i < 80; i++) JSW.stepWilly(w, env, { right: true });
  check('walk back down the \\ ramp', w.y === 104 && w.airborne === 0, `y=${w.y} air=${w.airborne}`);
}

console.log('Conveyors');
{
  const rows = Array(16).fill('.'.repeat(32));
  rows[15] = '<'.repeat(32);
  const env = room(rows);
  const w = JSW.newWilly(20, 104, 0);
  run(w, env, {}, 12);
  check('left conveyor carries Wally left', JSW.willyX(w) < 160, 'x=' + JSW.willyX(w));
  const w2 = JSW.newWilly(20, 104, 1); w2.moving = true;
  run(w2, env, { right: true }, 2);
  const x0 = JSW.willyX(w2);
  run(w2, env, { right: true }, 8);
  check('holding against the belt from a standstill only stalls/turns', JSW.willyX(w2) <= x0, `x0=${x0} x=${JSW.willyX(w2)}`);
}

console.log('Nasties');
{
  const rows = Array(16).fill('.'.repeat(32));
  rows[15] = '='.repeat(10) + '^^' + '='.repeat(20);
  const env = room(rows);
  const w = JSW.newWilly(6, 104, 0);
  let died = false;
  for (let i = 0; i < 40 && !died; i++) { JSW.stepWilly(w, env, { right: true }); if (JSW.touchesNasty(w, env)) died = true; }
  check('walking onto a floor nasty kills', died);
}

console.log('Room edges');
{
  const env = room(FLOOR15.slice());
  const w = JSW.newWilly(30, 104, 0);
  const t = run(w, env, { right: true }, 10);
  check('exit right at col 30 frame 3', t[t.length - 1].ev === 'right', JSON.stringify(t[t.length - 1]));
  const w2 = JSW.newWilly(0, 104, 1);
  const t2 = run(w2, env, { left: true }, 10);
  check('exit left at col 0', t2[t2.length - 1].ev === 'left');
  const rows = Array(16).fill('.'.repeat(32)); rows[2] = '='.repeat(32);
  const env3 = room(rows);
  const w3 = JSW.newWilly(10, 0, 0);
  const t3 = run(w3, env3, (i) => ({ jump: i === 0 }), 5);
  check('jump off the top -> up', t3[t3.length - 1].ev === 'up');
  const env4 = room(Array(16).fill('.'.repeat(32)));
  const w4 = JSW.newWilly(10, 96, 0);
  const t4 = run(w4, env4, {}, 20);
  check('fall off the bottom -> down', t4[t4.length - 1].ev === 'down');
}

console.log(`\n${passes} passed, ${fails} failed`);
process.exit(fails ? 1 : 0);
