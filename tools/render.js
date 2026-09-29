#!/usr/bin/env node
// Render rooms to PNG exactly as the game draws them (frame 0), plus guardian path overlays.
//   node tools/render.js room <id> [<id> ...]   -> out/rooms/<id>.png  (3x, with path overlay + exit markers)
//   node tools/render.js region <region>        -> every room in a region
//   node tools/render.js file <path>            -> every room defined in one data file
//   node tools/render.js map                    -> out/map.png (whole world on the grid, 1/2 scale)
'use strict';
const fs = require('fs');
const path = require('path');
const { load, ROOT } = require('./load');
const { encodePNG, scaleRGBA } = require('./png');

const JSW = load({ quiet: true });
if (JSW.loadErrors.length) console.log('LOAD ERRORS:\n' + JSW.loadErrors.join('\n'));
const world = JSW.buildWorld();

function renderRoomRGBA(id, opts) {
  opts = opts || {};
  const game = Object.create(JSW.Game.prototype);
  game.world = world; game.rooms = world.rooms; game.required = 150; game.layer = new Uint8Array(256 * 128); game.sfx = [];
  game.lives = 7; game.items = 0; game.frames = 0; game.tick = 0; game.collected = {}; game.visited = {}; game.flags = {};
  game.mode = 'play'; game.won = false; game.running = false; game.invuln = 0; game.message = null;
  const room = world.rooms[id];
  const st = room.start ? room.start : [15, 104];
  game.willy = JSW.newWilly(st[0], st[1], 0);
  game.enterRoom(id, null);
  const screen = new JSW.Screen();
  if (!opts.withWally) game.willy.col = -10;  // park Wally off-screen unless this is the start room
  game.render(screen);
  const W = screen.outWidth(), H = screen.outHeight();
  const rgba = new Uint8Array(W * H * 4);
  screen.toRGBA(rgba, false);
  return { rgba, W, H, room, game };
}

function overlayPaths(img, room) {
  const { rgba, W } = img, BX = JSW.BORDER_X, BY = JSW.BORDER_Y;
  function px(x, y, c) {
    if (x < 0 || y < 0 || x >= 256 || y >= 128) return;
    const i = ((y + BY) * W + x + BX) * 4;
    rgba[i] = (rgba[i] + c[0]) >> 1; rgba[i + 1] = (rgba[i + 1] + c[1]) >> 1; rgba[i + 2] = (rgba[i + 2] + c[2]) >> 1;
  }
  function rect(x0, y0, x1, y1, c) {
    for (let x = x0; x <= x1; x++) { px(x, y0, c); px(x, y1, c); }
    for (let y = y0; y <= y1; y++) { px(x0, y, c); px(x1, y, c); }
  }
  for (const g of room.guardians) {
    if (g.type === 'h') rect(g.min * 8, g.y, g.max * 8 + 15, g.y + 15, [255, 80, 255]);
    else if (g.type === 'v') rect(g.x * 8, g.min, g.x * 8 + 15, g.max + 15, [80, 255, 255]);
    else if (g.type === 'd') { const x1 = g.x + g.dx * g.count, y1 = g.y + g.dy * g.count; rect(Math.min(g.x, x1), Math.min(g.y, y1), Math.max(g.x, x1) + 15, Math.max(g.y, y1) + 15, [255, 255, 80]); }
    else if (g.type === 'arrow') for (let x = 0; x < 256; x += 2) px(x, g.y, [255, 60, 60]);
    else if (g.type === 'lift') rect(g.x * 8, g.top * 8, (g.x + g.width) * 8 - 1, g.bottom * 8 + 7, [120, 255, 120]);
  }
  // exit markers in the border: green bar where an exit exists
  const mark = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = (y * W + x) * 4; rgba[i] = 60; rgba[i + 1] = 220; rgba[i + 2] = 60; } };
  if (room.exits.left) mark(4, BY + 40, 8, BY + 88);
  if (room.exits.right) mark(W - 9, BY + 40, W - 5, BY + 88);
  if (room.exits.up) mark(BX + 100, 4, BX + 156, 8);
  if (room.exits.down) mark(BX + 100, img.H - 9, BX + 156, img.H - 5);
}

function saveRoom(id) {
  const img = renderRoomRGBA(id, { withWally: !!world.rooms[id].start });
  overlayPaths(img, img.room);
  const dir = path.join(ROOT, 'out', 'rooms');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, id + '.png');
  fs.writeFileSync(file, encodePNG(img.W * 3, img.H * 3, scaleRGBA(img.W, img.H, img.rgba, 3)));
  return path.relative(ROOT, file);
}

const mode = process.argv[2];
if (world.problems.length) console.log('WORLD PROBLEMS (' + world.problems.length + '):\n  ' + world.problems.slice(0, 40).join('\n  '));
if (mode === 'room') {
  for (const id of process.argv.slice(3)) {
    if (!world.rooms[id]) { console.log('no room ' + id); continue; }
    console.log('wrote ' + saveRoom(id));
  }
} else if (mode === 'region') {
  const region = process.argv[3];
  for (const id of Object.keys(world.rooms)) if (world.rooms[id].region === region) console.log('wrote ' + saveRoom(id));
} else if (mode === 'file') {
  const f = process.argv[3].split('\\').join('/').replace(/^\.\//, '');
  for (const id of Object.keys(world.rooms)) if ((world.rooms[id].def.__file || '').endsWith(f)) console.log('wrote ' + saveRoom(id));
} else if (mode === 'map') {
  const ids = Object.keys(world.rooms).filter(id => world.rooms[id].pos);
  const minC = Math.min(...ids.map(id => world.rooms[id].pos[0])), minR = Math.min(...ids.map(id => world.rooms[id].pos[1]));
  const maxC = Math.max(...ids.map(id => world.rooms[id].pos[0])), maxR = Math.max(...ids.map(id => world.rooms[id].pos[1]));
  const CW = 128, CH = 64, gap = 2;
  const MW = (maxC - minC + 1) * (CW + gap), MH = (maxR - minR + 1) * (CH + gap);
  const out = new Uint8Array(MW * MH * 4);
  for (let i = 0; i < MW * MH; i++) { out[i * 4] = 30; out[i * 4 + 1] = 30; out[i * 4 + 2] = 40; out[i * 4 + 3] = 255; }
  for (const id of ids) {
    const img = renderRoomRGBA(id, { withWally: false });
    const ox = (world.rooms[id].pos[0] - minC) * (CW + gap), oy = (world.rooms[id].pos[1] - minR) * (CH + gap);
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
      const si = ((y * 2 + JSW.BORDER_Y) * img.W + x * 2 + JSW.BORDER_X) * 4, di = ((oy + y) * MW + ox + x) * 4;
      out[di] = img.rgba[si]; out[di + 1] = img.rgba[si + 1]; out[di + 2] = img.rgba[si + 2];
    }
  }
  const file = path.join(ROOT, 'out', 'map.png');
  fs.writeFileSync(file, encodePNG(MW, MH, out));
  console.log('wrote ' + path.relative(ROOT, file) + ` (${MW}x${MH}, ${ids.length} rooms)`);
} else {
  console.log('usage: node tools/render.js room <id...> | region <name> | map');
}
