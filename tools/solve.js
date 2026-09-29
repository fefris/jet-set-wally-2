#!/usr/bin/env node
// Physics-exact reachability solver. Runs the REAL engine step (JSW.stepWilly + rope/lift/portal logic) in a
// breadth-first search over every input combination, from the start position, across the whole world.
// Guardians are ignored (static geometry). Airborne phases are deterministic, so they are fast-forwarded:
// the search graph only contains "decision" states (the next frame reads the keyboard).
//
// Reports: unreachable rooms & items, escapes through edges without an exit, arrivals inside walls,
// planned doors (src/data/world_plan.json) that are not physically traversable in their intended direction,
// sealed pairs that are actually open, soft-locks (standing states that can never return to the start),
// and the ending run (bed -> toilet with forced right & no jumping).
//
//   node tools/solve.js [--region <name> | --file src/data/rooms/<file>.js] [--verbose] [--json out/solve.json]
'use strict';
const fs = require('fs');
const path = require('path');
const { load, ROOT } = require('./load');

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const onlyRoom = args.includes('--room') ? args[args.indexOf('--room') + 1] : null;
let REGION = args.includes('--region') ? args[args.indexOf('--region') + 1] : null;
const FILE = args.includes('--file') ? args[args.indexOf('--file') + 1].split('\\').join('/') : null;
if (FILE && !REGION) REGION = '(file ' + FILE + ')';

const JSW = load({ quiet: true });
if (JSW.loadErrors.length) { console.log('LOAD ERRORS:\n' + JSW.loadErrors.join('\n')); }
const world = JSW.buildWorld();
const T = JSW.T;
const rooms = world.rooms;
const roomIds = Object.keys(rooms);
const roomIndex = {}; roomIds.forEach((id, i) => { roomIndex[id] = i; });
const WALLY = JSW.sprites.wally;

const errors = [], warnings = [];
const E = (m) => errors.push(m), W = (m) => warnings.push(m);
if (world.problems.length) world.problems.forEach(p => E('world: ' + p));

const planFile = path.join(ROOT, 'src', 'data', 'world_plan.json');
const plan = fs.existsSync(planFile) ? JSON.parse(fs.readFileSync(planFile, 'utf8')) : null;
const planRooms = {}, planGrid = {};
if (plan) for (const r of plan.rooms) { planRooms[r.id] = r; if (r.pos) planGrid[r.pos.join(',')] = r.id; }
const DELTA = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
function planNeighbour(id, dir) {
  const r = planRooms[id]; if (!r || !r.pos) return null;
  return planGrid[(r.pos[0] + DELTA[dir][0]) + ',' + (r.pos[1] + DELTA[dir][1])] || null;
}
function planDoorBetween(a, b) {
  if (!plan) return null;
  return (plan.doors || []).find(d => (d.a === a && d.b === b) || (d.a === b && d.b === a)) || null;
}
// region mode: rooms of the region (as built so far)
const regionSet = FILE ? new Set(roomIds.filter(id => (rooms[id].def.__file || '').endsWith(FILE.replace(/^\.\//, ''))))
  : REGION ? new Set(roomIds.filter(id => rooms[id].region === REGION)) : null;
if (REGION && !regionSet.size) { console.log('no built rooms in region ' + REGION); process.exit(1); }
function portalArrival(p) {
  if (p.tx != null) return { x: p.tx, y: p.ty, facing: p.facing };
  const t = rooms[p.to];
  return t && t.def.special && t.def.special.arrival ? t.def.special.arrival : null;
}

// ---------------------------------------------------------------- per-room timing tables (ropes, lifts)
const roomInfo = {};
function info(id) {
  if (roomInfo[id]) return roomInfo[id];
  const room = rooms[id];
  const timed = room.guardians.filter(g => g.type === 'rope' || g.type === 'lift');
  let P = 1;
  const phases = [];
  if (timed.length) {
    const ents = JSW.initEntities(room).filter(e => e.type === 'rope' || e.type === 'lift');
    const snap = () => ents.map(e => e.type === 'rope' ? e.a + ':' + e.v : e.row + ':' + e.dir + ':' + e.timer).join('|');
    const first = snap();
    const seq = [];
    for (let n = 0; n < 1990; n++) {
      const moves = JSW.updateEntities(ents).liftMoves.map(m => ({ x: m.e.t.x, w: m.e.t.width, from: m.from, to: m.to }));
      const ropes = ents.filter(e => e.type === 'rope').map(e => ({ t: e.t, a: e.a, v: e.v }));
      ropes.forEach(r => { r.segs = JSW.ropeSegments(r); });
      seq.push({ ropes, overlay: JSW.liftOverlay(ents), moves });
      if (snap() === first) { P = n + 1; break; }
      if (n === 1989) { E(`${id}: timed entities never repeat within 1990 frames`); P = 1990; }
    }
    // phase k = entity state after k updates since entry; phase 0 = entry state
    const ents0 = JSW.initEntities(room).filter(e => e.type === 'rope' || e.type === 'lift');
    const ropes0 = ents0.filter(e => e.type === 'rope').map(e => ({ t: e.t, a: e.a, v: e.v }));
    ropes0.forEach(r => { r.segs = JSW.ropeSegments(r); });
    phases.push({ ropes: ropes0, overlay: JSW.liftOverlay(ents0), moves: seq[P - 1].moves });
    for (let k = 1; k < P; k++) phases.push(seq[k - 1]);
  }
  const envs = [];
  for (let k = 0; k < Math.max(1, phases.length); k++) envs.push(JSW.makeEnv(room, phases.length ? phases[k].overlay : null));
  const sp = room.def.special || {};
  return (roomInfo[id] = { room, P, phases, envs, staticEnv: JSW.makeEnv(room, null), portals: sp.portals || [], hasUp: !!room.exits.up || !!(regionSet && planDoorBetween(id, planNeighbour(id, 'up'))) });
}

// ---------------------------------------------------------------- frame simulation (mirrors Game.updatePlay)
// sim = { id, w, phase }.  free = phase-agnostic simulation (timed entities ignored).
function frameStep(sim, input, reach, free) {
  let inf = info(sim.id);
  const w = sim.w;
  // 1. timed entities advance
  if (inf.P > 1 && !free) {
    sim.phase = (sim.phase + 1) % inf.P;
    const ph = inf.phases[sim.phase];
    for (const m of ph.moves) {       // lift carry
      if (w.airborne === 0 && !w.rope && w.y % 8 === 0 && w.y / 8 + 2 === m.from && w.col + 1 >= m.x && w.col <= m.x + m.w - 1) w.y += (m.to - m.from) * 8;
    }
  }
  let env = free ? inf.staticEnv : inf.envs[inf.P > 1 ? sim.phase : 0];
  // 2. Willy
  let ev = JSW.stepWilly(w, env, input);
  if (ev === 'fall') return { dead: 'fall' };
  if (!ev && w.y < 0) ev = 'up';
  if (ev === 'left' || ev === 'right' || ev === 'up' || ev === 'down') {
    const r = enter(sim, ev, reach);
    if (r) return r;
    inf = info(sim.id); env = inf.envs[0]; free = false;
  }
  // 3. nasties
  if (JSW.touchesNasty(w, env)) return { dead: 'nasty' };
  // 4. ropes
  if (inf.P > 1 && !free && inf.phases[sim.phase].ropes.length) {
    for (const r of inf.phases[sim.phase].ropes) {
      const e = { type: 'rope', t: r.t, a: r.a, v: r.v, segs: r.segs };
      JSW.ropeInteract(e, JSW.willyHitTest(w, env, WALLY), w, env, inf.hasUp);
    }
    if (w.rope && w.y < 0) {
      const r = enter(sim, 'up', reach);
      if (r) return r;
      inf = info(sim.id); env = inf.envs[0];
    }
  }
  // 5. portals
  if (inf.portals.length && w.airborne === 0 && !w.rope) {
    const feetRow = Math.floor(w.y / 8) + 2;
    for (const p of inf.portals) {
      const inX = w.col + 1 >= p.x && w.col <= p.x + (p.w || 2) - 1;
      const inY = feetRow - 1 >= p.y && feetRow - 1 <= p.y + (p.h || 1) - 1;
      if (inX && inY) {
        if (regionSet && !regionSet.has(p.to)) { reach.edge(sim.id, p.to, 'portal:' + (p.kind || 'teleport')); return { exit: true }; }
        if (!rooms[p.to]) { reach.err(`${sim.id}: portal to unknown room ${p.to}`); return { dead: 'portal' }; }
        const arr = portalArrival(p);
        if (!arr) { reach.err(`${sim.id}: portal to ${p.to} has no tx/ty and ${p.to} has no special.arrival`); return { dead: 'portal' }; }
        reach.edge(sim.id, p.to, 'portal:' + (p.kind || 'teleport'));
        sim.id = p.to; sim.phase = 0;
        sim.w = JSW.newWilly(arr.x, arr.y, arr.facing === 'left' ? 1 : 0);
        const bad = wallOverlap(sim);
        if (bad) { reach.err(`portal ${p.kind || 'teleport'} into ${p.to} lands inside a wall at col ${p.tx} y ${p.ty}`); return { dead: 'wall' }; }
        return { portal: true };
      }
    }
  }
  // 6. items
  reach.items(sim, env);
  return null;
}

function wallOverlap(sim) {
  const env = info(sim.id).envs[0], w = sim.w;
  const b = JSW.willyCells(w, env).white;
  for (const [x, y] of b) if (x >= 0 && x < 32 && y >= 0 && y < 16 && env.cell(x, y) === T.WALL) return [x, y];
  return null;
}

function enter(sim, dir, reach) {
  const from = sim.id, target = rooms[from].exits[dir];
  if (regionSet && (!target || !regionSet.has(target))) {
    const nb = target || planNeighbour(from, dir);
    if (nb && planDoorBetween(from, nb)) { reach.edge(from, nb, dir, sim.w); return { exit: true }; }
  }
  if (!target || !rooms[target]) {
    reach.err(`${from}: Wally can leave through the ${dir} edge (no exit) at col ${sim.w.col} y ${sim.w.y}`);
    return { dead: 'escape' };
  }
  JSW.enterRoomState(sim.w, dir);
  sim.id = target; sim.phase = 0;
  reach.edge(from, target, dir, sim.w);
  const bad = wallOverlap(sim);
  if (bad) {
    reach.err(`${from} -> ${target} (${dir}): Wally arrives inside a wall at cell ${bad} (col ${sim.w.col} y ${sim.w.y})`);
    return { dead: 'wall' };
  }
  return null;
}

// ---------------------------------------------------------------- search
// Decision states ("nodes") are states whose next frame reads the keyboard. In rooms with timed entities
// (ropes/lifts) a node carries the entity phase - except "free" standing nodes: Wally can simply wait there,
// so every phase is available and the node is stored phase-less. Moves from a free node are simulated once
// without the timed entities; only if the move enters the area swept by a rope/lift is it re-simulated for
// every starting phase. This keeps rope rooms tractable.
function makeProbe() {
  const p = { used: false };
  Object.defineProperty(p, 'left', { get() { p.used = true; return false; } });
  Object.defineProperty(p, 'right', { get() { p.used = true; return false; } });
  Object.defineProperty(p, 'jump', { get() { p.used = true; return false; } });
  return p;
}
const INPUTS = [{}, { left: true }, { right: true }, { jump: true }, { left: true, jump: true }, { right: true, jump: true }];
const FREE = 1999;   // phase value used for phase-less standing nodes
const NO_INPUT = {};

// cells swept by timed entities at any phase, dilated by one cell (and 2 rows above lifts, where Wally rides)
function swept(id) {
  const inf = info(id);
  if (inf.swept !== undefined) return inf.swept;
  if (inf.P <= 1) return (inf.swept = null);
  const m = new Uint8Array(512);
  const mark = (cx, cy) => { for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const x = cx + dx, y = cy + dy; if (x >= 0 && x < 32 && y >= 0 && y < 16) m[y * 32 + x] = 1; } };
  for (const ph of inf.phases) {
    for (const r of ph.ropes) for (const [x, y] of r.segs) mark(x >> 3, y >> 3);
    if (ph.overlay) for (let i = 0; i < 512; i++) if (ph.overlay[i]) { mark(i & 31, i >> 5); mark(i & 31, (i >> 5) - 2); }
  }
  return (inf.swept = m);
}
function touchesSwept(sim) {
  const m = swept(sim.id);
  if (!m) return false;
  const w = sim.w, row = Math.floor(w.y / 8), rows = (w.y % 8) ? 3 : 2;
  for (let r = 0; r <= rows; r++) for (let c = 0; c < 2; c++) {
    const x = w.col + c, y = row + r;
    if (x >= 0 && x < 32 && y >= 0 && y < 16 && m[y * 32 + x]) return true;
  }
  return false;
}
function isFree(sim) {
  const inf = info(sim.id), w = sim.w;
  if (inf.P <= 1 || w.airborne !== 0 || w.rope || w.ropeCool || w.y % 8) return false;
  const r2 = w.y / 8 + 2, env = inf.staticEnv;
  if (env.conveyor(w.col, r2) || env.conveyor(w.col + 1, r2)) return false;
  if (env.cell(w.col, r2) === T.AIR && env.cell(w.col + 1, r2) === T.AIR) return false; // standing on a lift
  return !touchesSwept(sim);
}

function keyOf(sim) {
  const w = sim.w;
  return (((((((((roomIndex[sim.id] * 2000 + sim.phase) * 34 + w.rope) * 17 + w.ropeCool) * 31 + w.col) * 4 + w.frame) * 136 + (w.y + 8)) * 2 + w.facing) * 2 + (w.moving ? 1 : 0)) * 16 + (w.airborne & 15)) * 19 + w.jc;
}
function clone(sim) { return { id: sim.id, phase: sim.phase, w: JSW.cloneWilly(sim.w) }; }

// Advance from a decision state with one input, fast-forwarding deterministic frames, to the next decision state.
// opts.free: simulate phase-agnostically (no ropes/lifts); abort with {touched:true} if Wally enters swept cells.
function advance(node, input, reach, opts) {
  const free = !!(opts && opts.free);
  let sim = clone(node);
  if (free) sim.phase = 0;
  let out = frameStep(sim, input, reach, free);
  let crossed = sim.id !== node.id;
  for (let n = 0; n < 3000; n++) {
    if (out && out.dead) return { dead: out.dead };
    if (out && out.exit) return { exit: true };
    if (free && !crossed && touchesSwept(sim)) return { touched: true };
    // Airborne frames are treated as input-free: the landing frame of a jump/fall reads the keys in the real game,
    // but landing with no key held reaches the same places (Wally can act on the very next frame), so we do not
    // branch there. Standing and rope-holding states are decision states.
    const airborne = sim.w.airborne !== 0 && !sim.w.rope;
    const probe = airborne ? null : makeProbe();
    const nxt = clone(sim);
    const reachProbe = reach.deferred();
    const o2 = frameStep(nxt, probe || NO_INPUT, reachProbe, free && !crossed);
    if (probe && probe.used) return { sim, crossed };
    if (free && !crossed && nxt.id === node.id && touchesSwept(nxt)) return { touched: true };
    reachProbe.commit();
    sim = nxt; out = o2;
    if (sim.id !== node.id) crossed = true;
  }
  reach.err(`${node.id}: deterministic motion did not settle after 3000 frames (col ${node.w.col} y ${node.w.y})`);
  return { dead: 'loop' };
}

function solve(starts) {
  const nodes = [];              // id -> sim
  const idOf = new Map();
  const succ = [];               // id -> Set(ids)
  const reachedRooms = new Set();
  const itemsHit = {};           // roomId -> Set(itemIndex)
  const edgeSeen = new Map();    // "from|to|dir" -> sample
  const errSeen = new Set();

  const reach = {
    items(sim, env) {
      const room = rooms[sim.id];
      if (!room.items.length) return;
      const cells = JSW.willyCells(sim.w, env).white;
      for (let i = 0; i < room.items.length; i++) {
        const p = room.items[i];
        for (const c of cells) if (c[0] === p[0] && c[1] === p[1]) { (itemsHit[sim.id] || (itemsHit[sim.id] = new Set())).add(i); break; }
      }
    },
    edge(from, to, dir, w) {
      reachedRooms.add(to);
      const k = from + '|' + to + '|' + dir;
      if (!edgeSeen.has(k)) edgeSeen.set(k, w ? { col: w.col, y: w.y } : {});
    },
    err(m) { if (!errSeen.has(m)) { errSeen.add(m); E(m); } },
    deferred() {
      const queued = [];
      return {
        items: (sim, env) => { if (rooms[sim.id].items.length) queued.push(['items', { id: sim.id, w: JSW.cloneWilly(sim.w) }, env]); },
        edge: (a, b, c, w) => queued.push(['edge', a, b, c, w && { col: w.col, y: w.y }]),
        err: (m) => queued.push(['err', m]),
        commit() { for (const q of queued) { if (q[0] === 'items') reach.items(q[1], q[2]); else if (q[0] === 'edge') reach.edge(q[1], q[2], q[3], q[4]); else reach.err(q[1]); } },
      };
    },
  };

  const queue = [];
  function addNode(sim) {
    if (isFree(sim)) { sim = clone(sim); sim.phase = FREE; }
    const k = keyOf(sim);
    let id = idOf.get(k);
    if (id === undefined) { id = nodes.length; idOf.set(k, id); nodes.push(sim); succ.push(null); queue.push(id); reachedRooms.add(sim.id); }
    return id;
  }
  // result of a phase-agnostic move within a timed room: phase-less if free, otherwise any phase is possible
  function addAnyPhase(r, set) {
    const P = info(r.sim.id).P;
    if (r.crossed || P <= 1 || isFree(r.sim)) { set.add(addNode(r.sim)); return; }
    for (let p = 0; p < P; p++) { const s = clone(r.sim); s.phase = p; set.add(addNode(s)); }
  }

  // node 0 is the EXIT pseudo-node (leaving the region through a planned boundary)
  nodes.push({ id: '__exit__', phase: 0, w: JSW.newWilly(0, 0, 0) }); succ.push(new Set()); idOf.set(-1, 0);
  const EXIT = 0;
  const startIds = [];
  for (const st of starts) {
    reachedRooms.add(st.sim.id);
    const s0 = advance(st.sim, makeProbe(), reach);
    if (s0.dead) { E(`${st.label}: entry position is not safe (${s0.dead}) in ${st.sim.id} at col ${st.sim.w.col} y ${st.sim.w.y}`); continue; }
    if (s0.exit) continue;
    startIds.push(addNode(s0.sim));
  }
  const startId = startIds.length ? startIds[0] : 0;

  for (let qi = 0; qi < queue.length; qi++) {
    const id = queue[qi], node = nodes[id];
    const set = new Set();
    for (const inp of INPUTS) {
      if (id === EXIT) break;
      if (node.phase === FREE) {
        const r = advance(node, inp, reach, { free: true });
        if (r.dead) continue;
        if (r.exit) { set.add(EXIT); continue; }
        if (!r.touched) { addAnyPhase(r, set); continue; }
        const P = info(node.id).P;
        for (let p = 0; p < P; p++) {
          const n2 = clone(node); n2.phase = p;
          const r2 = advance(n2, inp, reach);
          if (r2.exit) set.add(EXIT);
          else if (!r2.dead) set.add(addNode(r2.sim));
        }
      } else {
        const r = advance(node, inp, reach);
        if (r.exit) set.add(EXIT);
        else if (!r.dead) set.add(addNode(r.sim));
      }
    }
    succ[id] = set;
    if (VERBOSE && qi % 20000 === 0 && qi) console.log(`  ... ${qi} states, ${reachedRooms.size} rooms`);
  }
  return { nodes, succ, startId, startIds, EXIT, reachedRooms, itemsHit, edgeSeen };
}

// ---------------------------------------------------------------- run
const t0 = Date.now();
const starts = [];
function entryStates() {
  // synthesize arrivals into the region from planned boundary doors and links
  if (!plan) { console.log('--region needs src/data/world_plan.json'); process.exit(1); }
  const out = [];
  const inR = (id) => regionSet.has(id);
  for (const d of plan.doors || []) {
    const aIn = inR(d.a), bIn = inR(d.b);
    if (aIn === bIn) continue;
    const X = aIn ? d.a : d.b, other = aIn ? d.b : d.a;
    // direction from X towards the other room
    const dirToOther = aIn ? d.dir : ({ left: 'right', right: 'left', up: 'down', down: 'up' })[d.dir];
    const label = `entry from ${other} (${d.kind})`;
    const mk = (col, y, facing, air) => { const w = JSW.newWilly(col, y, facing); w.airborne = air; if (air === 0 && facing !== undefined) w.moving = true; return { label, sim: { id: X, phase: 0, w } }; };
    if (d.kind === 'door') {
      const y = (d.floor - 2) * 8;
      if (dirToOther === 'left') { const e = mk(0, y, 0, 0); e.sim.w.frame = 3; out.push(e); }
      else { const e = mk(30, y, 1, 0); e.sim.w.frame = 0; out.push(e); }
    } else {
      const cols = [];
      for (let c = d.cols[0]; c < d.cols[1]; c++) cols.push(c);
      const upper = dirToOther === 'down';   // X is the upper room
      const canEnterFromBelow = ['climb', 'shaft', 'stairs', 'rope'].includes(d.kind);
      const canEnterFromAbove = ['drop', 'shaft', 'stairs', 'rope'].includes(d.kind);
      for (const c of cols) {
        if (upper && canEnterFromBelow) { const e = mk(c, 104, 0, 0); e.sim.w.moving = false; out.push(e); }
        if (!upper && canEnterFromAbove) { const e = mk(c, 0, 0, 2); e.sim.w.moving = false; out.push(e); }
      }
    }
  }
  for (const l of plan.links || []) {
    if (!inR(l.to) || inR(l.from)) continue;
    const t = rooms[l.to], arr = t && t.def.special && t.def.special.arrival;
    if (!arr) { E(`link ${l.kind} ${l.from} -> ${l.to}: ${l.to} needs special.arrival {x, y}`); continue; }
    out.push({ label: `arrival by ${l.kind} from ${l.from}`, sim: { id: l.to, phase: 0, w: JSW.newWilly(arr.x, arr.y, arr.facing === 'left' ? 1 : 0) } });
  }
  if (world.start && inR(world.start.room)) out.push({ label: 'start', sim: { id: world.start.room, phase: 0, w: JSW.newWilly(world.start.x, world.start.y, 0) } });
  return out;
}
const START_ARG = args.includes('--start') ? args[args.indexOf('--start') + 1].split(',') : null;   // room,col,y
if (START_ARG) {
  starts.push({ label: 'custom start', sim: { id: START_ARG[0], phase: 0, w: JSW.newWilly(+START_ARG[1], +START_ARG[2], 0) } });
} else if (REGION) {
  starts.push(...entryStates());
  if (!starts.length) { console.log('region ' + REGION + ' has no entries (no boundary doors/links/start)'); process.exit(1); }
} else if (onlyRoom) {
  const r = rooms[onlyRoom];
  if (!r) { console.log('no room ' + onlyRoom); process.exit(1); }
  const st = r.start || (world.start && world.start.room === onlyRoom ? [world.start.x, world.start.y] : null);
  if (!st) { console.log('--room needs the start room'); process.exit(1); }
  starts.push({ label: 'start', sim: { id: onlyRoom, phase: 0, w: JSW.newWilly(st[0], st[1], 0) } });
} else {
  if (!world.start) { console.log('no start room'); process.exit(1); }
  starts.push({ label: 'start', sim: { id: world.start.room, phase: 0, w: JSW.newWilly(world.start.x, world.start.y, 0) } });
}
const res = solve(starts);
if (!res) { console.log(errors.join('\n')); process.exit(1); }
const { nodes, succ, startId, startIds, EXIT, reachedRooms, itemsHit, edgeSeen } = res;
if (args.includes('--dump')) {
  const room = args[args.indexOf('--dump') + 1], rows = {};
  nodes.forEach(n => { if (n.id === room && !n.w.rope) (rows[n.w.y] = rows[n.w.y] || new Set()).add(n.w.col); });
  for (const y of Object.keys(rows).map(Number).sort((a, b) => a - b)) console.log(`dump ${room} y=${y} (feet row ${y / 8 + 2}): cols ${[...rows[y]].sort((a, b) => a - b).join(',')}`);
}
if (VERBOSE) { const c = {}; nodes.forEach(n => { const k = n.id + (n.phase === 1999 ? " free" : n.w.rope ? " rope" : n.w.airborne ? " air" : " ground"); c[k] = (c[k] || 0) + 1; }); console.log(c); }

// soft-locks: decision states from which the start state cannot be reached
const pred = nodes.map(() => []);
succ.forEach((set, a) => { if (set) for (const b of set) pred[b].push(a); });
const back = new Uint8Array(nodes.length);
const stack = [];
const targets = REGION ? [EXIT].concat(world.start && regionSet.has(world.start.room) ? startIds.slice(-1) : []) : [startId];
for (const t of targets) { back[t] = 1; stack.push(t); }
while (stack.length) { const x = stack.pop(); for (const y of pred[x]) if (!back[y]) { back[y] = 1; stack.push(y); } }
const trapped = {};
nodes.forEach((n, i) => {
  if (back[i] || i === EXIT) return;
  const sp = rooms[n.id].def.special || {};
  if (sp.nightmare) return;
  (trapped[n.id] || (trapped[n.id] = [])).push(n);
});
for (const id of Object.keys(trapped)) {
  const s = trapped[id][0].w;
  E(`soft-lock: ${trapped[id].length} states in ${id} can never ${REGION ? 'leave the region' : 'return to the start'} (e.g. col ${s.col} y ${s.y}${trapped[id][0].w.rope ? ' on rope' : ''})`);
}

// reachability of rooms & items
let itemsTotal = 0, itemsReached = 0;
const unreachedRooms = [], missingItems = [];
for (const id of roomIds) {
  if (regionSet && !regionSet.has(id)) continue;
  const r = rooms[id], sp = r.def.special || {};
  itemsTotal += r.items.length;
  const hit = itemsHit[id] || new Set();
  itemsReached += hit.size;
  if (!reachedRooms.has(id) && !sp.nightmare) unreachedRooms.push(id);
  for (let i = 0; i < r.items.length; i++) if (!hit.has(i) && reachedRooms.has(id)) missingItems.push(`${id} item #${i} at (${r.items[i]})`);
}
unreachedRooms.forEach(id => E(`room ${id} is unreachable from the ${REGION ? 'region entries' : 'start'}`));
missingItems.forEach(m => E(`unreachable item: ${m}`));

// planned connections vs physical traversals
const traversed = new Set();
for (const k of edgeSeen.keys()) { const [a, b] = k.split('|'); traversed.add(a + '>' + b); }
if (!onlyRoom && plan) {
  const inWorld = (id) => REGION ? (regionSet.has(id) || !!planRooms[id]) : !!rooms[id];
  const relevant = (a, b) => !REGION || regionSet.has(a);
  for (const d of plan.doors || []) {
    if (!inWorld(d.a) || !inWorld(d.b)) continue;
    const upper = d.dir === 'down' ? d.a : d.b, lower = d.dir === 'down' ? d.b : d.a;
    let need = [];
    if (d.kind === 'door' || d.kind === 'shaft' || d.kind === 'stairs') need = [[d.a, d.b], [d.b, d.a]];
    else if (d.kind === 'drop') need = [[upper, lower]];
    else if (d.kind === 'climb' || d.kind === 'rope') need = [[lower, upper]];
    for (const [a, b] of need) {
      if (relevant(a, b) && reachedRooms.has(a) && !traversed.has(a + '>' + b)) E(`planned ${d.kind} ${a} -> ${b} is not physically traversable`);
    }
  }
  for (const s of plan.sealed || []) {
    if (traversed.has(s[0] + '>' + s[1]) || traversed.has(s[1] + '>' + s[0])) E(`sealed pair ${s[0]} / ${s[1]} is actually open`);
  }
  for (const l of plan.links || []) {
    if (inWorld(l.from) && inWorld(l.to) && relevant(l.from, l.to) && reachedRooms.has(l.from) && !traversed.has(l.from + '>' + l.to)) E(`planned link ${l.kind} ${l.from} -> ${l.to} never triggers`);
  }
}

// ending run: from the bed with forced right & no jumping to the toilet
function checkEnding() {
  const bedRoom = roomIds.find(id => (rooms[id].def.special || {}).bed);
  const toiletRoom = roomIds.find(id => (rooms[id].def.special || {}).toilet);
  if (!bedRoom || !toiletRoom) { W('ending: no bed or toilet special defined yet'); return; }
  const env = JSW.makeEnv(rooms[bedRoom]);
  let spot = null;
  for (let y = 2; y < 16 && !spot; y++) for (let x = 0; x < 31 && !spot; x++) if (env.conveyor(x, y) === 'right') spot = [x, (y - 2) * 8];
  if (!spot) { E('ending: the bed room has no right-moving conveyor (bed)'); return; }
  const sim = { id: bedRoom, phase: 0, w: JSW.newWilly(spot[0], spot[1], 0) };
  const sink = { items() {}, edge() {}, err(m) { E('ending: ' + m); }, deferred() { return { items() {}, edge() {}, err: (m) => E('ending: ' + m), commit() {} }; } };
  const toilet = rooms[toiletRoom].def.special.toilet;
  for (let n = 0; n < 20000; n++) {
    const inf = info(sim.id);
    inf.envs.forEach(e => { e.forceRight = true; e.noJump = true; });
    const out = frameStep(sim, { right: true }, sink);
    inf.envs.forEach(e => { e.forceRight = false; e.noJump = false; });
    if (out && out.dead) { E(`ending: the forced run to the toilet dies (${out.dead}) in ${sim.id} at col ${sim.w.col} y ${sim.w.y}`); return; }
    if (sim.id === toiletRoom && sim.w.col + 1 >= toilet.x && Math.abs(sim.w.y - toilet.y) < 16) { console.log(`ending run OK: bed -> toilet in ${n} frames`); return; }
  }
  E(`ending: the forced run never reaches the toilet (stuck in ${sim.id} at col ${sim.w.col} y ${sim.w.y})`);
}
if (!onlyRoom && !REGION) checkEnding();

// ---------------------------------------------------------------- report
const secs = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`${REGION ? 'region ' + REGION + ': ' : ''}states: ${nodes.length}   rooms reached: ${[...reachedRooms].filter(id => !regionSet || regionSet.has(id)).length}/${regionSet ? regionSet.size : roomIds.length}   items reachable: ${itemsReached}/${itemsTotal}   (${secs}s)`);
if (VERBOSE) {
  const byRoom = {};
  for (const k of edgeSeen.keys()) { const [a, b, d] = k.split('|'); (byRoom[a] || (byRoom[a] = [])).push(`${d}->${b}`); }
  for (const id of roomIds) if (byRoom[id]) console.log(`  ${id}: ${byRoom[id].join(', ')}`);
}
if (warnings.length) console.log(`\nWARNINGS (${warnings.length}):\n  ` + warnings.join('\n  '));
if (errors.length) console.log(`\nERRORS (${errors.length}):\n  ` + errors.join('\n  '));
else console.log('\nSOLVE OK');
if (jsonOut) fs.writeFileSync(path.join(ROOT, jsonOut), JSON.stringify({ errors, warnings, rooms: [...reachedRooms], itemsReached, itemsTotal, states: nodes.length, edges: [...edgeSeen.keys()] }, null, 1));
process.exitCode = errors.length ? 1 : 0;
