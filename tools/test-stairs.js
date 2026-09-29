#!/usr/bin/env node
// Stairs across a room boundary: derives/verifies the exact geometry recipe documented in docs/ROOMS.md.
'use strict';
const { load } = require('./load');
const J = load({ quiet: true });
const BS = String.fromCharCode(92); // backslash
function room(id, pos, rows) {
  const tiles = { '.': { type: 'air' }, '=': { type: 'floor' }, '#': { type: 'wall' }, '/': { type: 'ramp', dir: 'right' } };
  tiles[BS] = { type: 'ramp', dir: 'left' };
  return J.compileRoom({ id, name: id, pos, tiles, map: rows }).room;
}
const E = '.'.repeat(32);
const put = (r, x, y, c) => { r[y] = r[y].slice(0, x) + c + r[y].slice(x + 1); };
let fails = 0;

for (const dir of ['right', 'left']) {
  const ch = dir === 'right' ? '/' : BS;
  // lower room: diagonal from the floor (bottom cell at row 14) up to row 0
  const lowerRows = Array(16).fill(E); lowerRows[15] = '='.repeat(32);
  for (let i = 0; i <= 14; i++) put(lowerRows, dir === 'right' ? 6 + i : 25 - i, 14 - i, ch);
  const topX = dir === 'right' ? 20 : 11;         // column of the ramp cell at row 0
  // upper room: rows 15 and 14 REPEAT the lower room's ramp cells of rows 1 and 0 (same columns), then the diagonal
  // continues upwards (Wally re-enters a room from below at y=104, two rows above the geometric continuation)
  const upperRows = Array(16).fill(E);
  const r1X = dir === 'right' ? topX - 1 : topX + 1;       // lower room's ramp column at row 1
  for (let i = 0; i < 5; i++) put(upperRows, dir === 'right' ? r1X + i : r1X - i, 15 - i, ch);
  const landX = dir === 'right' ? r1X + 5 : r1X - 5;      // landing floor at row 11, right after the top ramp cell (row 11)
  for (let x = 0; x < 32; x++) if (dir === 'right' ? x >= landX : x <= landX) put(upperRows, x, 11, '=');
  const lower = room('lo', [0, 1], lowerRows), upper = room('up', [0, 0], upperRows);
  const envL = J.makeEnv(lower), envU = J.makeEnv(upper);
  let w = J.newWilly(dir === 'right' ? 1 : 29, 104, dir === 'right' ? 0 : 1), env = envL, where = 'lower';
  const log = [];
  const go = (key, until) => {
    for (let n = 0; n < 500; n++) {
      const ev = J.stepWilly(w, env, key);
      if (ev === 'up' || (!ev && w.y < 0)) { J.enterRoomState(w, 'up'); env = envU; where = 'upper'; log.push(`up@${w.col}`); }
      else if (ev === 'down') { J.enterRoomState(w, 'down'); env = envL; where = 'lower'; log.push(`down@${w.col}/air${w.airborne}`); }
      else if (ev === 'fall') { log.push('DEATH'); return false; }
      else if (ev) { log.push(ev); return false; }
      if (until()) return true;
    }
    return false;
  };
  const upOk = go(dir === 'right' ? { right: true } : { left: true }, () => where === 'upper' && w.airborne === 0 && w.y === 72 && (dir === 'right' ? w.col >= landX : w.col <= landX - 1));
  if (process.argv.includes('--show')) console.log(['lower:'].concat(lowerRows, ['upper:'], upperRows).join('\n'));
  const downOk = go(dir === 'right' ? { left: true } : { right: true }, () => where === 'lower' && w.y === 104 && w.airborne === 0);
  console.log(`stairs rising ${dir}: lower ramp cells (${r1X},1),(${topX},0); upper ramp cells (${r1X},15),(${topX},14)...: up ${upOk ? 'OK' : 'FAIL'}, down ${downOk ? 'OK' : 'FAIL'}  [${log.join(' ')}]`);
  if (!upOk || !downOk) fails++;
}
process.exit(fails ? 1 : 0);
