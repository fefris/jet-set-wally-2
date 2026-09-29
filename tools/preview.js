#!/usr/bin/env node
// Render asset previews to PNG so art can be eyeballed (the Read tool can display PNGs).
//   node tools/preview.js sprites [name ...]   -> out/preview/sprites/<name>.png
//   node tools/preview.js tiles                -> out/preview/tiles.png   (all tiles, labelled by index order in the log)
//   node tools/preview.js items                -> out/preview/items.png
'use strict';
const fs = require('fs');
const path = require('path');
const { load, ROOT } = require('./load');
const { encodePNG, scaleRGBA } = require('./png');

const JSW = load();
if (JSW.loadErrors.length) console.log('LOAD ERRORS:\n' + JSW.loadErrors.join('\n'));
if (JSW.errors && JSW.errors.length) console.log('ASSET ERRORS:\n' + JSW.errors.join('\n'));

const outDir = path.join(ROOT, 'out', 'preview');
fs.mkdirSync(path.join(outDir, 'sprites'), { recursive: true });

function canvas(w, h, bg) {
  const buf = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) { buf[i * 4] = bg[0]; buf[i * 4 + 1] = bg[1]; buf[i * 4 + 2] = bg[2]; buf[i * 4 + 3] = 255; }
  return { w, h, buf, set(x, y, c) { if (x < 0 || y < 0 || x >= w || y >= h) return; const i = (y * w + x) * 4; buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; } };
}
function save(file, cv, scale) {
  const s = scaleRGBA(cv.w, cv.h, cv.buf, scale);
  fs.writeFileSync(file, encodePNG(cv.w * scale, cv.h * scale, s));
}

const INK = [255, 255, 255], PAPER = [0, 0, 0], GRID = [40, 40, 90], GUIDE = [110, 30, 30];

function drawRows16(cv, rows, ox, oy, shift, mirror) {
  for (let y = 0; y < 16; y++) {
    let bits = rows[y];
    if (mirror) bits = JSW.mirrorBits10(bits);
    for (let x = 0; x < 16; x++) if ((bits >> (15 - x)) & 1) cv.set(ox + x + shift, oy + y, INK);
  }
}

const mode = process.argv[2] || 'sprites';
if (mode === 'sprites') {
  const names = process.argv.slice(3).length ? process.argv.slice(3) : Object.keys(JSW.sprites);
  for (const name of names) {
    const sp = JSW.sprites[name];
    if (!sp) { console.log('no sprite ' + name); continue; }
    const n = sp.frames.length;
    // Row 1: raw frames (16x16 boxes). Row 2 (h movers): in-game view, frames shifted 2px/frame moving right, then mirrored moving left.
    const cellW = 24, rows = sp.mover === 'h' ? 3 : 1;
    const cv = canvas(Math.max(n, 4) * cellW + 4, rows * 22 + 4, GRID);
    for (let f = 0; f < n; f++) {
      const ox = 2 + f * cellW, oy = 2;
      for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) cv.set(ox + x, oy + y, PAPER);
      if (sp.mover === 'h') for (let y = 0; y < 16; y++) cv.set(ox + 10, oy + y, GUIDE);
      drawRows16(cv, sp.frames[f], ox, oy, 0, false);
    }
    if (sp.mover === 'h') {
      // walking strip: 4 frames right then 4 frames left, drawn on a continuous background
      for (let dir = 0; dir < 2; dir++) {
        const oy = 2 + 22 * (1 + dir);
        for (let y = 0; y < 16; y++) for (let x = 0; x < n * cellW; x++) cv.set(2 + x, oy + y, PAPER);
        for (let f = 0; f < Math.min(n, 4); f++) {
          const frame = sp.frames[f];
          const shift = dir === 0 ? f * 2 : (3 - f) * 2;
          drawRows16(cv, frame, 2 + f * cellW, oy, shift, dir === 1);
        }
      }
    }
    const file = path.join(outDir, 'sprites', name + '.png');
    save(file, cv, 6);
    console.log('wrote ' + path.relative(ROOT, file) + '  (' + n + ' frames, mover=' + sp.mover + ')');
  }
} else if (mode === 'tiles' || mode === 'items') {
  const set = mode === 'tiles' ? JSW.tiles : JSW.itemGfx;
  const names = Object.keys(set);
  const perRow = 8, cell = 14;
  const cv = canvas(perRow * cell + 4, Math.ceil(names.length / perRow) * cell + 4, GRID);
  names.forEach((name, i) => {
    const ox = 2 + (i % perRow) * cell, oy = 2 + Math.floor(i / perRow) * cell;
    // draw each 8x8 pattern tiled 1.5x so repetition is visible: 12x12 area
    for (let y = 0; y < 12; y++) for (let x = 0; x < 12; x++) {
      const on = (set[name].rows[y % 8] >> (7 - (x % 8))) & 1;
      cv.set(ox + x, oy + y, on ? INK : PAPER);
    }
    console.log(String(i).padStart(3) + '  ' + name + (set[name].desc ? '  - ' + set[name].desc : ''));
  });
  const file = path.join(outDir, mode + '.png');
  save(file, cv, 6);
  console.log('wrote ' + path.relative(ROOT, file));
} else if (mode === 'font') {
  const font = JSW.fonts[process.argv[3] || 'main'];
  if (!font) { console.log('no font'); process.exit(1); }
  const lines = [
    ' !"#$%&\'()*+,-./0123456789:;<=>?',
    '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_',
    '`abcdefghijklmnopqrstuvwxyz{|}~',
    '',
    'Items collected 017 Time 7:00am',
    'The Wine Cellar    Up the Chimney',
    'JET SET WALLY II   Press ENTER',
  ];
  const cv = canvas(32 * 8 + 8, lines.length * 10 + 8, GRID);
  lines.forEach((line, li) => {
    for (let i = 0; i < 32; i++) {
      const ch = line[i] || ' ';
      const g = font.glyphs[ch];
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
        const on = g && ((g[y] >> (7 - x)) & 1);
        cv.set(4 + i * 8 + x, 4 + li * 10 + y, on ? INK : PAPER);
      }
    }
  });
  const file = path.join(outDir, 'font.png');
  save(file, cv, 4);
  console.log('wrote ' + path.relative(ROOT, file));
} else {
  console.log('unknown mode ' + mode);
}
