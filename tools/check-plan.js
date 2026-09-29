#!/usr/bin/env node
// Validate a world plan JSON (src/data/world_plan.json or a path argument) and print an ASCII map.
// Checks: unique ids/positions, every grid-adjacent pair is either a door or explicitly sealed,
// door contracts are well-formed and consistent with grid geometry, links reference real rooms,
// directed reachability from the start over doors + links, and every reachable room can return to the start.
'use strict';
const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'src', 'data', 'world_plan.json');
const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [], warnings = [];
const E = (m) => errors.push(m), W = (m) => warnings.push(m);

const rooms = {}, grid = {};
for (const r of plan.rooms || []) {
  if (!r.id || !/^[a-z][a-z0-9_]*$/.test(r.id)) E(`bad room id ${JSON.stringify(r.id)}`);
  if (rooms[r.id]) E(`duplicate room id ${r.id}`);
  rooms[r.id] = r;
  if (!r.name || r.name.length > 32) E(`${r.id}: name missing or > 32 chars`);
  if (r.offgrid) continue;
  if (!Array.isArray(r.pos) || r.pos.length !== 2) { E(`${r.id}: bad pos`); continue; }
  const k = r.pos.join(',');
  if (grid[k]) E(`${r.id}: pos ${k} already used by ${grid[k]}`); else grid[k] = r.id;
}

const DELTA = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
const OPP = { left: 'right', right: 'left', up: 'down', down: 'up' };
const pairKey = (a, b) => [a, b].sort().join('|');

// grid adjacency
const adjacent = new Map();
for (const id of Object.keys(rooms)) {
  const r = rooms[id]; if (r.offgrid) continue;
  for (const d of ['right', 'down']) {
    const n = grid[(r.pos[0] + DELTA[d][0]) + ',' + (r.pos[1] + DELTA[d][1])];
    if (n) adjacent.set(pairKey(id, n), { a: id, b: n, dir: d });
  }
}

const covered = new Set();
const edges = []; // directed traversal edges for reachability
for (const [i, d] of (plan.doors || []).entries()) {
  const tag = `door#${i} ${d.a}->${d.b}`;
  if (!rooms[d.a] || !rooms[d.b]) { E(`${tag}: unknown room`); continue; }
  const ra = rooms[d.a], rb = rooms[d.b];
  if (!DELTA[d.dir]) { E(`${tag}: bad dir ${d.dir}`); continue; }
  if (ra.offgrid || rb.offgrid || ra.pos[0] + DELTA[d.dir][0] !== rb.pos[0] || ra.pos[1] + DELTA[d.dir][1] !== rb.pos[1]) {
    E(`${tag}: rooms are not grid neighbours in direction ${d.dir}`);
  }
  covered.add(pairKey(d.a, d.b));
  const kind = d.kind;
  if (d.dir === 'left' || d.dir === 'right') {
    if (kind !== 'door') E(`${tag}: horizontal connections must be kind 'door'`);
    if (!Array.isArray(d.open) || d.open.length !== 2 || d.open[0] > d.open[1]) E(`${tag}: open must be [topRow, bottomRow]`);
    else {
      if (d.open[1] - d.open[0] + 1 < 2) E(`${tag}: opening shorter than 2 rows`);
      if (d.floor !== d.open[1] + 1) E(`${tag}: floor (${d.floor}) must be the row just below the opening (${d.open[1] + 1})`);
      if (d.floor > 15 || d.floor < 2) E(`${tag}: floor row ${d.floor} out of range 2..15`);
    }
    edges.push([d.a, d.b], [d.b, d.a]);
  } else {
    if (!['drop', 'climb', 'shaft', 'stairs', 'rope'].includes(kind)) E(`${tag}: vertical kind must be drop|climb|shaft|stairs|rope`);
    if (!Array.isArray(d.cols) || d.cols.length !== 2 || d.cols[0] > d.cols[1] || d.cols[0] < 0 || d.cols[1] > 31) E(`${tag}: cols must be [c0, c1] within 0..31`);
    else if (d.cols[1] - d.cols[0] + 1 < 2) E(`${tag}: span narrower than 2 columns`);
    const upper = d.dir === 'down' ? d.a : d.b, lower = d.dir === 'down' ? d.b : d.a;
    if (kind === 'drop') edges.push([upper, lower]);
    else if (kind === 'climb' || kind === 'rope') edges.push([lower, upper]);
    else edges.push([upper, lower], [lower, upper]); // shaft, stairs: both ways
    if (kind === 'rope') edges.push([upper, lower]); // can always drop back down past the rope
  }
}
for (const s of plan.sealed || []) {
  if (!rooms[s[0]] || !rooms[s[1]]) { E(`sealed ${s}: unknown room`); continue; }
  const k = pairKey(s[0], s[1]);
  if (!adjacent.has(k)) E(`sealed ${s}: rooms are not grid neighbours`);
  if (covered.has(k)) E(`sealed ${s}: pair also has a door`);
  covered.add(k);
}
for (const [k, v] of adjacent) if (!covered.has(k)) E(`grid neighbours ${v.a} (${v.dir}) ${v.b} have neither a door nor a sealed entry`);

for (const [i, l] of (plan.links || []).entries()) {
  if (!rooms[l.from] || !rooms[l.to]) { E(`link#${i}: unknown room ${l.from} -> ${l.to}`); continue; }
  edges.push([l.from, l.to]);
  if (l.twoWay) edges.push([l.to, l.from]);
}

const start = plan.start && plan.start.room;
if (!rooms[start]) E(`start room ${start} unknown`);

// reachability
function reach(from, adj) {
  const seen = new Set([from]), q = [from];
  while (q.length) { const x = q.shift(); for (const y of adj.get(x) || []) if (!seen.has(y)) { seen.add(y); q.push(y); } }
  return seen;
}
const fwd = new Map(), bwd = new Map();
for (const [a, b] of edges) {
  if (!fwd.has(a)) fwd.set(a, []); fwd.get(a).push(b);
  if (!bwd.has(b)) bwd.set(b, []); bwd.get(b).push(a);
}
if (rooms[start]) {
  const R = reach(start, fwd), B = reach(start, bwd);
  for (const id of Object.keys(rooms)) {
    const r = rooms[id];
    if (!R.has(id) && !r.unreachableOk) E(`${id}: not reachable from start`);
    if (R.has(id) && !B.has(id) && !r.deadEndOk) E(`${id}: reachable but cannot return to start (soft-lock)`);
  }
}

// items
let items = 0;
for (const r of Object.values(rooms)) {
  if (r.items == null) W(`${r.id}: no item count`);
  else { if (r.items > 16) E(`${r.id}: more than 16 items`); items += r.items; }
}

// ASCII map
const cols = Math.max(...Object.values(rooms).filter(r => !r.offgrid).map(r => r.pos[0])) + 1;
const rowsN = Math.max(...Object.values(rooms).filter(r => !r.offgrid).map(r => r.pos[1])) + 1;
const letters = {};
const regions = [...new Set(Object.values(rooms).map(r => r.region))];
regions.forEach((rg, i) => { letters[rg] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]; });
console.log('Regions: ' + regions.map(r => `${letters[r]}=${r}`).join(' '));
for (let y = 0; y < rowsN; y++) {
  let line = String(y).padStart(2) + ' ';
  for (let x = 0; x < cols; x++) { const id = grid[x + ',' + y]; line += id ? letters[rooms[id].region] : '.'; }
  console.log(line);
}
console.log(`rooms: ${Object.keys(rooms).length}  items: ${items} (plan says total ${plan.itemsTotal}, required ${plan.itemsRequired})`);
console.log(`doors: ${(plan.doors || []).length}  sealed: ${(plan.sealed || []).length}  links: ${(plan.links || []).length}`);
if (warnings.length) console.log(`\nWARNINGS (${warnings.length}):\n` + warnings.slice(0, 60).join('\n'));
if (errors.length) { console.log(`\nERRORS (${errors.length}):\n` + errors.join('\n')); process.exit(1); }
console.log('\nPLAN OK');
