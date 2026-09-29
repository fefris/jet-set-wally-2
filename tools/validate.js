#!/usr/bin/env node
// Static room & connection validator (fast; no physics search - see tools/solve.js for that).
//   node tools/validate.js [--region <name>] [--file src/data/rooms/<file>.js] [--room <id>]
// Checks: load/asset/compile errors, grid & exit reciprocity, per-room limits, guardian paths over solid tiles,
// specials, and EDGE ALIGNMENT between neighbouring rooms (the "rooms connect correctly" rule set, docs/PLAN.md §5),
// plus consistency with the door contracts in src/data/world_plan.json.
'use strict';
const fs = require('fs');
const path = require('path');
const { load, ROOT } = require('./load');

const args = process.argv.slice(2);
const onlyRegion = args.includes('--region') ? args[args.indexOf('--region') + 1] : null;
const onlyRoom = args.includes('--room') ? args[args.indexOf('--room') + 1] : null;
const onlyFile = args.includes('--file') ? args[args.indexOf('--file') + 1].split('\\').join('/').replace(/^\.\//, '') : null;

const JSW = load({ quiet: true });
const T = JSW.T;
const errors = [], warnings = [];
const E = (m) => errors.push(m), W = (m) => warnings.push(m);
JSW.loadErrors.forEach(e => E('load: ' + e));
(JSW.errors || []).forEach(e => E('asset: ' + e));
const world = JSW.buildWorld();
const rooms = world.rooms;
const inScope = (id) => (!onlyRegion || (rooms[id] && rooms[id].region === onlyRegion)) && (!onlyRoom || id === onlyRoom)
  && (!onlyFile || (rooms[id] && (rooms[id].def.__file || '').endsWith(onlyFile)));
world.problems.forEach(p => { const id = p.split(':')[0]; if (!rooms[id] || inScope(id)) E(p); });

const planFile = path.join(ROOT, 'src', 'data', 'world_plan.json');
const plan = fs.existsSync(planFile) ? JSON.parse(fs.readFileSync(planFile, 'utf8')) : null;
const planRoom = {};
if (plan) for (const r of plan.rooms) planRoom[r.id] = r;

const cell = (r, x, y) => (x < 0 || x > 31 || y < 0 || y > 15) ? -1 : r.type[y * 32 + x];
const solid = (t) => t === T.WALL;
const surface = (t) => t === T.FLOOR || t === T.WALL || t === T.RAMP || t === T.CONVEYOR;
const NAME = JSW.TYPE_NAMES;

for (const id of Object.keys(rooms)) {
  if (!inScope(id)) continue;
  const r = rooms[id], def = r.def, sp = def.special || {};
  // plan consistency
  if (plan) {
    const pr = planRoom[id];
    if (!pr) W(`${id}: not in world_plan.json`);
    else {
      if (pr.pos && r.pos && (pr.pos[0] !== r.pos[0] || pr.pos[1] !== r.pos[1])) E(`${id}: pos ${r.pos} differs from plan ${pr.pos}`);
      if (pr.name && pr.name !== r.name) W(`${id}: name "${r.name}" differs from plan "${pr.name}"`);
      if (pr.items != null && pr.items !== r.items.length) W(`${id}: ${r.items.length} items (plan says ${pr.items})`);
    }
  }
  // limits
  const nGuard = r.guardians.filter(g => g.type === 'h' || g.type === 'v' || g.type === 'd' || g.type === 'arrow' || g.type === 'lift').length;
  if (nGuard > 8) E(`${id}: ${nGuard} guardians/arrows/lifts (max 8)`);
  if (r.guardians.filter(g => g.type === 'rope').length > 1) E(`${id}: more than one rope`);
  if (r.items.length > 16) E(`${id}: ${r.items.length} items (max 16)`);
  const air = r.styles[r.airStyle];
  if (air.ink === air.paper && air.ink !== 0) W(`${id}: air ink equals paper - Wally will be invisible`);
  // guardian paths
  r.guardians.forEach((g, i) => {
    const tag = `${id}: guardian #${i} (${g.type}${g.sprite ? ' ' + g.sprite : ''})`;
    const boxCells = (px, py) => {
      const out = [];
      for (let cy = Math.floor(py / 8); cy <= Math.floor((py + 15) / 8); cy++) for (let cx = Math.floor(px / 8); cx <= Math.floor((px + 15) / 8); cx++) out.push([cx, cy]);
      return out;
    };
    let cellsHit = [];
    if (g.type === 'h') for (let x = g.min; x <= g.max; x++) cellsHit.push(...boxCells(x * 8, g.y));
    else if (g.type === 'v') for (let y = g.min; y <= g.max; y += 2) cellsHit.push(...boxCells(g.x * 8, y));
    else if (g.type === 'd') { let x = g.x, y = g.y; for (let n = 0; n <= g.count; n++) { cellsHit.push(...boxCells(x, y)); x += g.dx; y += g.dy; } }
    const bad = new Set();
    for (const [x, y] of cellsHit) {
      const t = cell(r, x, y);
      if (t === T.WALL || t === T.NASTY || t === T.FLOOR || t === T.CONVEYOR || t === T.RAMP) bad.add(`${NAME[t]}@${x},${y}`);
      if (t === -1 && (g.type === 'h' || g.type === 'v')) bad.add(`offscreen@${x},${y}`);
    }
    if (bad.size) W(`${tag} path overlaps ${[...bad].slice(0, 6).join(' ')}${bad.size > 6 ? ' ...' : ''}`);
    if (g.type === 'd') {
      const x1 = g.x + g.dx * g.count, y1 = g.y + g.dy * g.count;
      if (Math.min(g.x, x1) < 0 || Math.max(g.x, x1) > 240 || Math.min(g.y, y1) < 0 || Math.max(g.y, y1) > 112) E(`${tag}: diagonal path leaves the room`);
    }
    if (g.type === 'rope') {
      const top = cell(r, g.x, 0);
      if (top === T.WALL && !r.exits.up) { /* anchored in the ceiling - fine */ }
    }
  });
  // items on air, not inside guardian-only spots
  // specials
  if (sp.portals) sp.portals.forEach((p, i) => {
    const to = p.to && rooms[p.to];
    if (!p.to) E(`${id}: portal #${i} has no target`);
    else if (!to) W(`${id}: portal #${i} targets ${p.to} which does not exist yet`);
    else {
      const arr = (p.tx != null) ? { x: p.tx, y: p.ty } : (to.def.special && to.def.special.arrival);
      if (!arr) E(`${id}: portal #${i} -> ${p.to}: no tx/ty and target has no special.arrival`);
      else {
        const row = Math.floor(arr.y / 8);
        for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) if (cell(to, arr.x + dx, row + dy) === T.WALL) E(`${id}: portal #${i} arrival in ${p.to} is inside a wall`);
        if (arr.y % 8 === 0) {
          const f1 = cell(to, arr.x, row + 2), f2 = cell(to, arr.x + 1, row + 2);
          if (!surface(f1) && !surface(f2)) W(`${id}: portal #${i} arrival in ${p.to} is not standing on anything`);
        }
      }
    }
    if (p.x == null || p.y == null) E(`${id}: portal #${i} needs x, y (cell of Wally's feet row - 1)`);
  });
  if (sp.arrival) {
    const a = sp.arrival, row = Math.floor(a.y / 8);
    for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) if (cell(r, a.x + dx, row + dy) === T.WALL) E(`${id}: special.arrival is inside a wall`);
    if (!surface(cell(r, a.x, row + 2)) && !surface(cell(r, a.x + 1, row + 2))) E(`${id}: special.arrival must be standing on a surface (y = (surfaceRow-2)*8)`);
  }
  if (sp.portals) sp.portals.forEach((p, i) => (p.requiresRooms || []).forEach(q => { if (!rooms[q] && !(planRoom[q])) E(`${id}: portal #${i} requiresRooms unknown room ${q}`); }));
  if (sp.signs) sp.signs.forEach((s, i) => {
    if (!s.text || s.x == null || s.y == null) E(`${id}: sign #${i} needs x, y, text`);
    else {
      if (s.x + s.text.length > 32) E(`${id}: sign #${i} runs off the right edge`);
      for (let k = 0; k < s.text.length; k++) if (cell(r, s.x + k, s.y) !== T.AIR) { W(`${id}: sign #${i} "${s.text}" overlaps a non-air cell at (${s.x + k},${s.y})`); break; }
    }
  });
  if (sp.flagFlash) sp.flagFlash.forEach((f, i) => { if (!f.flag || f.x == null || f.y == null) E(`${id}: flagFlash #${i} needs flag, x, y`); });
  if (sp.switches) sp.switches.forEach((s, i) => { if (cell(r, s.x, s.y) !== T.AIR) E(`${id}: switch #${i} must be on an air cell`); if (!s.flag) E(`${id}: switch #${i} needs a flag name`); });
  if (sp.housekeeper && (sp.housekeeper.x == null || sp.housekeeper.y == null)) E(`${id}: housekeeper needs x (cell) and y (px)`);
  if (sp.toilet && (sp.toilet.x == null || sp.toilet.y == null)) E(`${id}: toilet needs x (cell) and y (px)`);
  if (sp.bed) {
    let found = false;
    for (let i = 0; i < 512; i++) if (r.type[i] === T.CONVEYOR && r.styles[r.style[i]].dir === 'right') found = true;
    if (!found) E(`${id}: special.bed requires a right-moving conveyor (the bed)`);
  }

  // edge alignment with neighbours
  for (const dir of ['right', 'down']) {
    const nid = r.exits[dir];
    if (!nid || !rooms[nid]) continue;
    const n = rooms[nid];
    if (dir === 'right') {
      for (let y = 0; y < 16; y++) {
        const a = cell(r, 31, y), b = cell(n, 0, y);
        if (solid(a) !== solid(b)) E(`${id}|${nid}: edge row ${y}: ${id} col 31 is ${NAME[a]} but ${nid} col 0 is ${NAME[b]} (walls must line up)`);
        const a2 = cell(r, 30, y), b2 = cell(n, 1, y);
        if (!solid(a) && !solid(b) && (solid(a2) !== solid(b2))) W(`${id}|${nid}: row ${y}: col 30 (${NAME[a2]}) vs neighbour col 1 (${NAME[b2]}) - Wally is 2 cells wide`);
        // walkway continuity: a standable surface with headroom on one side must continue on the other
        if (y >= 2) {
          const standA = surface(a) && !solid(cell(r, 31, y - 1)) && !solid(cell(r, 31, y - 2));
          const standB = surface(b) && !solid(cell(n, 0, y - 1)) && !solid(cell(n, 0, y - 2));
          if (standA !== standB) W(`${id}|${nid}: walkway at row ${y} (${NAME[a]} | ${NAME[b]}) does not continue across the edge`);
        }
      }
    } else {
      for (let x = 0; x < 31; x++) {
        // dropping: a 2-wide gap in the upper room's bottom row must fall into open space
        if (cell(r, x, 15) === T.AIR && cell(r, x + 1, 15) === T.AIR) {
          for (let yy = 0; yy < 2; yy++) for (let xx = 0; xx < 2; xx++) if (cell(n, x + xx, yy) === T.WALL) {
            E(`${id}|${nid}: gap in ${id} row 15 at cols ${x}-${x + 1} drops onto a wall in ${nid} at (${x + xx},${yy})`);
          }
        }
        // climbing: an opening in the lower room's top row must arrive in open space (rows 13-14 of the upper room)
        if (cell(n, x, 0) !== T.WALL && cell(n, x + 1, 0) !== T.WALL) {
          for (let yy = 13; yy <= 14; yy++) for (let xx = 0; xx < 2; xx++) if (cell(r, x + xx, yy) === T.WALL) {
            W(`${id}|${nid}: opening in ${nid} row 0 at cols ${x}-${x + 1} arrives inside a wall of ${id} at (${x + xx},${yy}) if Wally jumps up there`);
          }
        }
      }
    }
  }
  // edges without exits
  for (const dir of ['left', 'right', 'up', 'down']) {
    if (r.exits[dir]) continue;
    const open = [];
    for (let i = 0; i < (dir === 'left' || dir === 'right' ? 16 : 32); i++) {
      const t = dir === 'left' ? cell(r, 0, i) : dir === 'right' ? cell(r, 31, i) : dir === 'up' ? cell(r, i, 0) : cell(r, i, 15);
      if (dir === 'down' ? (t === T.AIR) : (t !== T.WALL)) open.push(i);
    }
    if (open.length) W(`${id}: ${dir} edge has no exit but is open at ${dir === 'left' || dir === 'right' ? 'rows' : 'cols'} ${open.join(',')} (the solver checks whether Wally can actually escape)`);
  }
}

// door contracts from the plan
if (plan) {
  for (const d of plan.doors || []) {
    const A = rooms[d.a], B = rooms[d.b];
    if (!A || !B || (!inScope(d.a) && !inScope(d.b))) continue;
    const tag = `door ${d.a} -${d.dir}-> ${d.b} (${d.kind})`;
    if (d.dir === 'left' || d.dir === 'right') {
      const L = d.dir === 'right' ? A : B, R = d.dir === 'right' ? B : A;
      for (let y = d.open[0]; y <= d.open[1]; y++) {
        for (const x of [30, 31]) if (cell(L, x, y) === T.WALL) E(`${tag}: ${L.id} (${x},${y}) is wall inside the opening`);
        for (const x of [0, 1]) if (cell(R, x, y) === T.WALL) E(`${tag}: ${R.id} (${x},${y}) is wall inside the opening`);
      }
      if (!surface(cell(L, 31, d.floor)) || !surface(cell(R, 0, d.floor))) E(`${tag}: no walkable surface at row ${d.floor} on both sides of the edge`);
    } else {
      const U = d.dir === 'down' ? A : B, D = d.dir === 'down' ? B : A;
      const [c0, c1] = d.cols;
      if (d.kind === 'drop' || d.kind === 'shaft') {
        let gap = false;
        for (let x = c0; x < c1; x++) if (cell(U, x, 15) === T.AIR && cell(U, x + 1, 15) === T.AIR) gap = true;
        if (!gap) E(`${tag}: ${U.id} has no 2-wide air gap in row 15 within cols ${c0}-${c1}`);
      }
      if (d.kind === 'climb' || d.kind === 'shaft' || d.kind === 'rope') {
        let open = false;
        for (let x = c0; x < c1; x++) if (cell(D, x, 0) !== T.WALL && cell(D, x + 1, 0) !== T.WALL) open = true;
        if (!open) E(`${tag}: ${D.id} row 0 is walled over cols ${c0}-${c1}`);
        let land = false;
        for (let x = c0; x <= c1; x++) if (surface(cell(U, x, 15))) land = true;
        if (!land) E(`${tag}: ${U.id} needs a landing surface in row 15 within cols ${c0}-${c1}`);
      }
      if (d.kind === 'rope' && !D.guardians.some(g => g.type === 'rope')) E(`${tag}: ${D.id} has no rope`);
    }
  }
}

const scope = onlyRoom ? `room ${onlyRoom}` : onlyFile ? `file ${onlyFile}` : onlyRegion ? `region ${onlyRegion}` : 'world';
const n = Object.keys(rooms).filter(inScope).length;
console.log(`validated ${n} rooms (${scope})`);
if (warnings.length) console.log(`\nWARNINGS (${warnings.length}):\n  ` + warnings.join('\n  '));
if (errors.length) { console.log(`\nERRORS (${errors.length}):\n  ` + errors.join('\n  ')); process.exitCode = 1; }
else console.log('\nVALIDATE OK');
