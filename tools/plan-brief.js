#!/usr/bin/env node
// Compact brief for a set of rooms: plan entries, every door/sealed edge/link touching them, and the neighbours' names.
//   node tools/plan-brief.js <room_id> [<room_id> ...]      (much smaller than reading docs/WORLD.md)
'use strict';
const fs = require('fs');
const path = require('path');
const plan = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'world_plan.json'), 'utf8'));
const R = {}; plan.rooms.forEach(r => { R[r.id] = r; });
const ids = process.argv.slice(2);
const set = new Set(ids);
const out = [];
for (const id of ids) {
  const r = R[id];
  if (!r) { out.push(`!! unknown room ${id}`); continue; }
  out.push(`## ${id} — "${r.name}" region=${r.region} pos=${r.pos ? '[' + r.pos + ']' : 'off-grid'} items=${r.items} difficulty=${r.difficulty}`);
  out.push(r.theme);
  if (r.special) out.push('SPECIAL: ' + (typeof r.special === 'string' ? r.special : JSON.stringify(r.special)));
  for (const d of plan.doors) {
    if (d.a !== id && d.b !== id) continue;
    const other = d.a === id ? d.b : d.a;
    const dir = d.a === id ? d.dir : ({ left: 'right', right: 'left', up: 'down', down: 'up' })[d.dir];
    const shape = d.kind === 'door' ? `open rows ${d.open[0]}-${d.open[1]}, floor ${d.floor}` : `cols ${d.cols[0]}-${d.cols[1]}${d.rise ? ', rise ' + d.rise : ''}`;
    out.push(`  - ${dir.toUpperCase()} edge -> ${other} ("${R[other].name}"${set.has(other) ? '' : ', other author'}): ${d.kind}, ${shape}${d.note ? ' — ' + d.note : ''}`);
  }
  for (const s of plan.sealed) if (s[0] === id || s[1] === id) {
    const other = s[0] === id ? s[1] : s[0];
    out.push(`  - SEALED against ${other} ("${R[other].name}") - whole shared edge is wall`);
  }
  for (const l of plan.links) {
    if (l.from === id) out.push(`  - LINK out: ${l.kind} -> ${l.to}: ${l.note || ''}`);
    if (l.to === id) out.push(`  - LINK in: ${l.kind} from ${l.from}: ${l.note || ''} (this room needs special.arrival)`);
  }
  out.push('');
}
console.log(out.join('\n'));
