#!/usr/bin/env node
// Generate index.html (dev entry, works from file://) from src/manifest.json, and optionally
// a single-file build: node tools/gen-index.js --dist  -> dist/jetsetwally2.html
'use strict';
const fs = require('fs');
const path = require('path');
const { scriptList, ROOT } = require('./load');

const scripts = scriptList({ browser: true });
const dist = process.argv.includes('--dist');

const head = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Jet Set Wally II</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; height: 100%; background: #000; overflow: hidden; }
  body { display: flex; align-items: center; justify-content: center; }
  canvas { image-rendering: pixelated; image-rendering: crisp-edges; display: block; }
</style>
</head>
<body>
<canvas id="screen" width="320" height="240"></canvas>
`;
const tail = `<script>JSW.boot();</script>
</body>
</html>
`;

if (dist) {
  let body = '';
  for (const s of scripts) body += `<script>/* ${s} */\n${fs.readFileSync(path.join(ROOT, s), 'utf8')}\n</script>\n`;
  fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
  const out = path.join(ROOT, 'dist', 'jetsetwally2.html');
  fs.writeFileSync(out, head + body + tail);
  console.log('wrote ' + path.relative(ROOT, out) + ' (' + scripts.length + ' scripts, ' + fs.statSync(out).size + ' bytes)');
} else {
  const body = scripts.map(s => `<script src="${s}"></script>`).join('\n') + '\n';
  fs.writeFileSync(path.join(ROOT, 'index.html'), head + body + tail);
  console.log('wrote index.html (' + scripts.length + ' scripts)');
}
