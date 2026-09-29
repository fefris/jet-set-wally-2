// Headless loader: evaluates the game's classic scripts (in manifest order) inside a Node vm context
// and returns the JSW namespace. Browser-only scripts are skipped unless opts.browser is true.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function listDataFiles() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.js')) out.push(path.relative(ROOT, p).split(path.sep).join('/'));
    }
  })(path.join(ROOT, 'src', 'data'));
  return out;
}

function scriptList(opts = {}) {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'manifest.json'), 'utf8'));
  const out = [];
  for (const entry of manifest.scripts) {
    if (entry === '@data') { out.push(...listDataFiles()); continue; }
    const file = typeof entry === 'string' ? entry : entry.file;
    const browser = typeof entry === 'object' && entry.browser;
    if (browser && !opts.browser) continue;
    out.push(file);
  }
  return out;
}

function load(opts = {}) {
  const errors = [];
  const ctx = { console: opts.quiet ? { log() {}, warn() {}, error() {} } : console };
  vm.createContext(ctx);
  for (const rel of scriptList(opts)) {
    const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    vm.runInContext('globalThis.JSW = globalThis.JSW || {}; JSW.__file = ' + JSON.stringify(rel) + ';', ctx);
    try {
      vm.runInContext(code, ctx, { filename: rel });
    } catch (e) {
      errors.push(`${rel}: ${e && e.stack ? e.stack.split('\n').slice(0, 3).join(' | ') : e}`);
    }
  }
  const JSW = ctx.JSW || {};
  JSW.loadErrors = errors;
  return JSW;
}

module.exports = { load, scriptList, ROOT };
