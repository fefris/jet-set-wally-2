#!/usr/bin/env node
// Guardian fairness check (the solver ignores guardians). Simulates every room's entities over their cycle and flags:
//  * items whose cell is overlapped by guardian pixels in (almost) every frame      -> uncollectable in practice
//  * door arrival boxes / special.arrival / start spots guarded in most frames        -> likely death on entry
//  * guardians that never leave an arrival box                                        -> entry death loops
//   node tools/guardcheck.js [--room <id>] [--threshold 0.6]
'use strict';
const fs = require('fs');
const path = require('path');
const { load, ROOT } = require('./load');
const JSW = load({ quiet: true });
const world = JSW.buildWorld();
const args = process.argv.slice(2);
const only = args.includes('--room') ? args[args.indexOf('--room') + 1] : null;
const TH = args.includes('--threshold') ? +args[args.indexOf('--threshold') + 1] : 0.6;
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'world_plan.json'), 'utf8'));
const FRAMES = 720;

function guardianMask(ents) {
  const m = new Uint8Array(256 * 128);
  for (const e of ents) {
    if (e.type === 'h' || e.type === 'v' || e.type === 'd') {
      const s = JSW.entitySprite(e);
      if (!s) continue;
      for (let r = 0; r < 16; r++) {
        let bits = s.rows[r];
        if (s.mirror) bits = JSW.mirrorBits10(bits);
        const py = s.y + r;
        if (py < 0 || py > 127 || !bits) continue;
        for (let c = 0; c < 16; c++) if ((bits >> (15 - c)) & 1) { const px = s.x + c; if (px >= 0 && px < 256) m[py * 256 + px] = 1; }
      }
    } else if (e.type === 'arrow' && e.x < 32) {
      for (let c = 0; c < 8; c++) m[e.t.y * 256 + e.x * 8 + c] = 1;
    }
  }
  return m;
}
const boxHit = (m, x0, y0, w, h) => {
  for (let y = Math.max(0, y0); y < Math.min(128, y0 + h); y++) for (let x = Math.max(0, x0); x < Math.min(256, x0 + w); x++) if (m[y * 256 + x]) return true;
  return false;
};

const issues = [], top = [];
for (const id of Object.keys(world.rooms)) {
  if (only && id !== only) continue;
  const room = world.rooms[id], sp = room.def.special || {};
  if (sp.nightmare) continue;
  const ents = JSW.initEntities(room);
  // spots to test: items (8x8), door arrivals (Wally box 16x16), special arrival / start
  const spots = [];
  room.items.forEach((p, i) => spots.push({ kind: 'item', label: `item #${i} (${p})`, x: p[0] * 8, y: p[1] * 8, w: 8, h: 8, th: 0.95 }));
  for (const d of plan.doors) {
    if ((d.dir === 'left' || d.dir === 'right') && (d.a === id || d.b === id)) {
      const enterFromLeft = (d.b === id && d.dir === 'right') || (d.a === id && d.dir === 'left');
      const y = (d.floor - 2) * 8;
      spots.push({ kind: 'door', label: `arrival from ${d.a === id ? d.b : d.a} (${enterFromLeft ? 'left' : 'right'} edge, floor ${d.floor})`, x: enterFromLeft ? 0 : 240, y, w: 16, h: 16, th: TH });
    }
  }
  if (sp.arrival) spots.push({ kind: 'arrival', label: 'special.arrival', x: sp.arrival.x * 8, y: sp.arrival.y, w: 16, h: 16, th: 0.3 });
  if (room.start) spots.push({ kind: 'start', label: 'start', x: room.start[0] * 8, y: room.start[1], w: 16, h: 16, th: 0.01 });
  if (!spots.length || !ents.some(e => e.type === 'h' || e.type === 'v' || e.type === 'd' || e.type === 'arrow')) continue;
  const counts = spots.map(() => 0);
  const entryHits = spots.map(() => 0);
  for (let f = 0; f < FRAMES; f++) {
    JSW.updateEntities(ents);
    const m = guardianMask(ents);
    spots.forEach((s, i) => { if (boxHit(m, s.x, s.y, s.w, s.h)) { counts[i]++; if (f < 8) entryHits[i]++; } });
  }
  spots.forEach((s, i) => {
    const frac = counts[i] / FRAMES; top.push([frac, id + ': ' + s.label]);
    if (frac >= s.th) issues.push(`${id}: ${s.label} is guarded ${(frac * 100).toFixed(0)}% of the time`);
    else if ((s.kind === 'door' || s.kind === 'arrival' || s.kind === 'start') && entryHits[i] >= 6) issues.push(`${id}: ${s.label} is hit in ${entryHits[i]}/8 of the first frames after entry (entry death)`);
  });
}
if (args.includes('--top')) { console.log('most guarded spots:'); top.sort((a, b) => b[0] - a[0]).slice(0, 12).forEach(t => console.log('  ' + (t[0] * 100).toFixed(0) + '%  ' + t[1])); }
console.log(`guardian check: ${issues.length} issue(s)`);
issues.forEach(i => console.log('  ' + i));
process.exitCode = issues.length ? 1 : 0;
