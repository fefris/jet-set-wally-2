#!/usr/bin/env node
// Generate docs/WORLD.md (human-readable world plan) from src/data/world_plan.json.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'world_plan.json'), 'utf8'));
const mapText = execFileSync(process.execPath, [path.join(__dirname, 'check-plan.js')], { encoding: 'utf8' });

const byRegion = {};
plan.rooms.forEach(r => { (byRegion[r.region] = byRegion[r.region] || []).push(r); });
const R = {}; plan.rooms.forEach(r => { R[r.id] = r; });
const fmtDoor = (d) => {
  if (d.dir === 'left' || d.dir === 'right') return `${d.a} **${d.dir}** ${d.b}: door, open rows ${d.open[0]}-${d.open[1]}, floor ${d.floor}${d.note ? ' — ' + d.note : ''}`;
  return `${d.a} **${d.dir}** ${d.b}: ${d.kind}, cols ${d.cols[0]}-${d.cols[1]}${d.rise ? ', rise ' + d.rise : ''}${d.note ? ' — ' + d.note : ''}`;
};

let md = `# Jet Set Wally II — World\n\nGenerated from \`src/data/world_plan.json\` by \`tools/plan-doc.js\`. The JSON is the binding source;\n` +
  `door contracts and sealed edges are enforced by \`tools/validate.js\` and proven by \`tools/solve.js\`.\n\n` +
  `Start: **${R[plan.start.room].name}** (${plan.start.room}). Items: ${plan.itemsTotal} in total, ${plan.itemsRequired} needed for Mrs Mop to go to bed.\n\n` +
  '## Map\n\n```\n' + mapText.trim() + '\n```\n\n';

md += '## One-way links\n\n' + plan.links.map(l => `* ${R[l.from].name} → ${R[l.to].name} (${l.kind})${l.note ? ': ' + l.note : ''}`).join('\n') + '\n\n';
md += '## Conventions\n\n' + (plan.notes || '').trim() + '\n\n';

for (const region of Object.keys(byRegion)) {
  const rooms = byRegion[region].slice().sort((a, b) => (a.pos ? a.pos[1] * 100 + a.pos[0] : 1e9) - (b.pos ? b.pos[1] * 100 + b.pos[0] : 1e9));
  const info = (plan.regions || []).find(x => x.region === region);
  md += `## Region: ${region} (${rooms.length} rooms, ${rooms.reduce((n, r) => n + (r.items || 0), 0)} items)\n\n`;
  if (info) md += `${info.placement ? '*Placement:* ' + info.placement + '  \n' : ''}${info.signature ? '*Signature:* ' + info.signature + '  \n' : ''}${info.difficulty ? '*Difficulty:* ' + info.difficulty + '\n' : ''}\n`;
  for (const r of rooms) {
    md += `### ${r.name} — \`${r.id}\` ${r.pos ? '[' + r.pos.join(',') + ']' : '(off-grid)'}\n\n`;
    md += `Items: ${r.items}, difficulty ${r.difficulty}. ${r.theme}\n`;
    if (r.special) md += `\n*Special:* ${typeof r.special === 'string' ? r.special : JSON.stringify(r.special)}\n`;
    const doors = plan.doors.filter(d => d.a === r.id || d.b === r.id);
    const sealed = plan.sealed.filter(s => s[0] === r.id || s[1] === r.id).map(s => s[0] === r.id ? s[1] : s[0]);
    if (doors.length) md += '\n' + doors.map(d => '* ' + fmtDoor(d)).join('\n') + '\n';
    if (sealed.length) md += `* sealed against: ${sealed.join(', ')}\n`;
    md += '\n';
  }
}
fs.writeFileSync(path.join(ROOT, 'docs', 'WORLD.md'), md);
console.log('wrote docs/WORLD.md (' + md.length + ' chars)');
