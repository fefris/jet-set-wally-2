// Jet Set Wally II - the sewers (grid rows 15-17, cols 0-4): Round the U-Bend .. The Outfall.
// Author file: src/data/rooms/sewers.js  (region 'sewers')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.
// One-way excursion: in by the Turkish Bath plughole (-> Round the U-Bend), out by the outfall grate (-> the Beach).
// Signature mechanic: currents (left-moving conveyors). Every sewer room leads onward to the outfall.

// ---------------------------------------------------------------------------------------------------------
// Round the U-Bend [3,15] - difficulty 3. Arrival from the Turkish Bath plughole on the pipe ledge (row 4).
// The giant U-bend: ramps run down both arms into the trap water at the bottom, where the plughole (cols 14-15)
// drops one-way into the Spanish Drain. The ring hangs right over the plughole: grab it mid-leap across the hole
// (or with a hop from its rim) while the rubber duck bobs up and down in the trap.
JSW.defineRoom({
  id: 'round_the_u_bend',
  name: 'Round the U-Bend',
  region: 'sewers',
  pos: [3, 15],
  border: 'blue',
  item: 'ring',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'B': { type: 'wall', tile: 'brick', ink: 'red', paper: 'black' },
    '#': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'pipe_h', ink: 'cyan', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    'L': { type: 'ramp', tile: 'slope_rock', ink: 'cyan', paper: 'black', bright: true, dir: 'left' },   // rises left
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'cyan', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'B..............................B',
    'B..............................B',
    'B..............................B',
    'B===L..................../=====B',
    'B####L................../######B',
    'B#####L................/#######B',
    'BBBBB##L............../##BBBBBBB',
    'BBBBBB##L............/##BBBBBBBB',
    'BBBBBBB##L....+...../##BBBBBBBBB',
    'BBBBBBBB##L......../##BBBBBBBBBB',
    'BBBBBBBBB##L....../##BBBBBBBBBBB',
    'BBBBBBBBBB#___..___#BBBBBBBBBBBB',
    'BBBBBBBBBBB###..###BBBBBBBBBBBBB',
    'BBBBBBBBBBB###..###BBBBBBBBBBBBB',
    'BBBBBBBBBBBBBB..BBBBBBBBBBBBBBBB',
  ],
  guardians: [
    // the rubber duck bobbing in the trap water right over the plughole
    { type: 'v', sprite: 'rubber_duck', ink: 'yellow', x: 14, y: 40, min: 32, max: 80, dy: 1, anim: 'slow' },
    // a drip from the pipe crown over the left arm
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 7, y: 16, min: 16, max: 40, dy: 1, anim: 'fast' },
    // a soap bubble drifting over the right arm
    { type: 'v', sprite: 'bubble', ink: 'magenta', x: 22, y: 16, min: 16, max: 32, dy: 1, anim: 'slow' },
  ],
  special: {
    arrival: { x: 1, y: 16, facing: 'right' },
    signs: [{ x: 4, y: 1, text: 'THIS WAY OUT (EVENTUALLY)', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Spanish Drain [3,16] - difficulty 3. The main sewer under a red-and-yellow vault. Wally drops in from the
// U-Bend (cols 14-15) onto the top current (row 5); the currents (rows 5, 9, 13) all run west, so the ride down is a
// cascade: row 5 -> row 9 -> row 13 -> floor 15 by the west door. A slime slides on the row-9 current: jump it
// (hold right to wait for your moment) and snatch the doubloon hanging over it. Two rats patrol the floor between
// the doors (west = with the flow, east = against it).
JSW.defineRoom({
  id: 'the_spanish_drain',
  name: 'The Spanish Drain',
  region: 'sewers',
  pos: [3, 16],
  border: 'red',
  item: 'coin',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'B': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black', bright: true },
    '<': { type: 'conveyor', tile: 'walkway', ink: 'green', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'BBBBBBBBBBBBBB..BBBBBBBBBBBBBBBB',
    'BBBBBBBBBBB........BBBBBBBBBBBBB',
    'BBBBBBBBB............BBBBBBBBBBB',
    'BBBBBBB................BBBBBBBBB',
    'BBBBBB..................BBBBBBBB',
    'BBBBB.......<<<<<<<<<<...BBBBBBB',
    'BBBB...+..................BBBBBB',
    'BB..........................BBBB',
    'BB............................BB',
    'BB..<<<<<<<<<<<<<.............BB',
    'BB............................BB',
    '................................',
    '................................',
    '...<<<<<<<......................',
    '................................',
    '================================',
  ],
  guardians: [
    // a slime sliding on the row-9 current, under the doubloon
    { type: 'h', sprite: 'slime', ink: 'green', bright: true, x: 4, y: 56, min: 4, max: 8, dir: 'right' },
    // two rats on the towpath between the doors
    { type: 'h', sprite: 'rat', ink: 'yellow', bright: true, x: 12, y: 104, min: 11, max: 17, dir: 'left' },
    { type: 'h', sprite: 'rat', ink: 'white', bright: true, x: 24, y: 104, min: 20, max: 26, dir: 'right' },
  ],
  special: {
    signs: [{ x: 13, y: 11, text: 'THE RAIN IN SPAIN', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Flotsam Junction [4,16] - difficulty 4. A junction choked with floating junk over a channel of sewage. The
// currents run west, so heading east is a jumping puzzle against the flow: bank -> two crates -> walk onto the
// lower current (keep holding RIGHT or it carries you back) -> leap to the floating fridge -> walk on along the upper
// current -> drop to the landing, where the slimy ramp slides down through the floor (cols 21-22) to the Rat King. Heading back west, the flow helps. The shopping
// trolley rides the lower current, the rubber duck paddles the sewage; the teddies sit high on the junk.
JSW.defineRoom({
  id: 'flotsam_junction',
  name: 'Flotsam Junction',
  region: 'sewers',
  pos: [4, 16],
  border: 'green',
  item: 'teddy',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'B': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'red', bright: true },
    'F': { type: 'wall', tile: 'metal_plate', ink: 'cyan', paper: 'white', bright: true },
    '~': { type: 'nasty', tile: 'waves', ink: 'green', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'plank', ink: 'magenta', paper: 'black', bright: true },
    '<': { type: 'conveyor', tile: 'belt_arrows', ink: 'cyan', paper: 'black', bright: true, dir: 'left' },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'green', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BBPPPP..BB.......BBB......PPPPBB',
    'BBPPPP....................PPPPBB',
    'BBPPPP.....+..............PPPPBB',
    'BBPP.......................PPPBB',
    'BBPP..................+.......BB',
    'BB........----................BB',
    'BB............................BB',
    'BB..............FFF<<<<<<.....BB',
    'BB..............FFF...........BB',
    '......CC<<<<<<<.FFF....../====BB',
    '......CC........FFF...../BBBBBBB',
    '....CCCC........FFF..../BBBBBBBB',
    '....CCCC~~~~~~~~FFF.../BBBBBBBBB',
    '====CCCCBBBBBBBBFFF../BBBBBBBBBB',
  ],
  guardians: [
    // the shopping trolley riding the lower current (cols 9-13); the crate top and col 14 are safe
    { type: 'h', sprite: 'trolley', ink: 'white', bright: true, x: 12, y: 72, min: 9, max: 12, dir: 'left' },
    // the rubber duck paddling the sewage below the lower current
    { type: 'd', sprite: 'rubber_duck', ink: 'yellow', x: 64, y: 96, dx: 1, dy: 0, count: 48, anim: 'slow' },
    // a sewer bat flitting over the plank, at teddy-grabbing height
    { type: 'h', sprite: 'cave_bat', ink: 'magenta', bright: true, x: 8, y: 24, min: 8, max: 14, dir: 'right' },
    // a bubble of gas wobbling over the upper current
    { type: 'v', sprite: 'bubble', ink: 'green', x: 22, y: 16, min: 16, max: 40, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Rat King's Throne [4,17] - difficulty 4. Dead end. The slimy ramp from Flotsam Junction comes down from the
// ceiling (cols 20-23) onto a landing; bottle-top steps (2 rows apart) lead down the west wall to the cavern floor,
// where the Rat King paces before his junk dais. Bottle-top on the floor by the dais -> the carpeted dais (a
// courtier rat) -> bottle-top armrest -> bottle-top on a pole -> the canopy with the crowns (a spider keeps
// watch). Every step down is at most 4 rows, every step up 2, so the way back up the ramp is always open.
JSW.defineRoom({
  id: 'the_rat_kings_throne',
  name: "The Rat King's Throne",
  region: 'sewers',
  pos: [4, 17],
  border: 'magenta',
  item: 'crown',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'R': { type: 'wall', tile: 'rock', ink: 'yellow', paper: 'blue' },
    'J': { type: 'wall', tile: 'crate', ink: 'white', paper: 'magenta', bright: true },
    '=': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    'o': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'carpet', ink: 'red', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'green', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'RRRRRRRRRRRRRRRRRRR.../RRRRRRRRR',
    'RRRRRRRRRRRRRRR....../.........R',
    'RRRRR.............../..........R',
    'RRRRR............../..........+R',
    'RRR.............../........+...R',
    'RRR............../.........____R',
    'R.............../..............R',
    'R.......=========.......oo.....R',
    'R..............................R',
    'R...ooo......................ooR',
    'R..............................R',
    'Rooo.................__________R',
    'R....................JJJJJJJJJJR',
    'R....oo............ooJJJJJJJJJJR',
    'R....................JJJJJJJJJJR',
    'R==============================R',
  ],
  guardians: [
    // His Majesty the Rat King, pacing before the dais (col 19 by the bottle-top and cols 1-9 are safe)
    { type: 'h', sprite: 'rat', ink: 'yellow', bright: true, x: 12, y: 104, min: 10, max: 17, dir: 'right' },
    // a courtier rat on the carpeted dais
    { type: 'h', sprite: 'rat', ink: 'white', bright: true, x: 27, y: 72, min: 23, max: 27, dir: 'left' },
    // a drip falling past the leap from the floor bottle-top onto the dais
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 21, y: 24, min: 24, max: 72, dy: 2, anim: 'fast' },
    // a spider guarding the far crown
    { type: 'v', sprite: 'cave_spider', ink: 'magenta', x: 29, y: 8, min: 8, max: 24, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 4, y: 4, text: 'ALL HAIL', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Gravy Train Tunnel (fatberg_alley) [2,16] - difficulty 4. A monstrous fatberg of congealed gravy blocks the
// tunnel. Coming from the east: greasy conveyor ledges on its east face - the bottom one (row 13) and the top one
// (row 9) squash you against the fat, the middle one (row 11) tries to fling you off (hold LEFT, then hop straight
// up). From the top ledge hop left onto the summit, dodge the slime, hop onto the mound for the spoon, then take
// the lumpy steps down the west side. Falling off the greasy ledges just drops you back on the floor.
JSW.defineRoom({
  id: 'fatberg_alley',
  name: 'Gravy Train Tunnel',
  region: 'sewers',
  pos: [2, 16],
  border: 'yellow',
  item: 'spoon',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'B': { type: 'wall', tile: 'brick_small', ink: 'cyan', paper: 'blue' },
    'F': { type: 'wall', tile: 'rock', ink: 'white', paper: 'yellow', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'cyan', paper: 'black', bright: true },
    '<': { type: 'conveyor', tile: 'belt', ink: 'green', paper: 'black', bright: true, dir: 'left' },
    '>': { type: 'conveyor', tile: 'belt', ink: 'magenta', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BB............................BB',
    'BB.............+..............BB',
    'BB............................BB',
    'BB............................BB',
    'BB............FF..............BB',
    'BB..........FFFFFFFFFF........BB',
    'BB..........FFFFFFFFFF........BB',
    'BB........FFFFFFFFFFFF<<<.....BB',
    'BB........FFFFFFFFFFFF........BB',
    '........FFFFFFFFFFFFFF>>>>......',
    '........FFFFFFFFFFFFFF..........',
    '......FFFFFFFFFFFFFFFF<<<.......',
    '......FFFFFFFFFFFFFFFF..........',
    '======FFFFFFFFFFFFFFFF==========',
  ],
  guardians: [
    // a slime oozing over the summit (the mound and the west end are safe)
    { type: 'h', sprite: 'slime', ink: 'green', bright: true, x: 19, y: 40, min: 16, max: 19, dir: 'left' },
    // a slime on the east towpath under the greasy ledges
    { type: 'h', sprite: 'slime', ink: 'magenta', bright: true, x: 25, y: 104, min: 25, max: 27, dir: 'right' },
    // a gravy blob sagging from the roof over the west steps
    { type: 'v', sprite: 'blob', ink: 'yellow', x: 8, y: 24, min: 24, max: 64, dy: 1, anim: 'slow' },
    // a greasy drip over the top ledge
    { type: 'v', sprite: 'drip', ink: 'white', x: 22, y: 24, min: 24, max: 40, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 2, y: 2, text: 'MIND THE GRAVY', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Gunge Tank [1,16] - difficulty 4. A settling tank brimming with bright green gunge. From either rim, a hop
// onto the ladder rung (row 13) and another onto the gantry (row 11). The gantry is broken in the middle (cols
// 13-18): swing across on the hanging chain while bubbles of gas rise from the gunge. The key sits above the east
// gantry where a slime slides up and down.
JSW.defineRoom({
  id: 'the_gunge_tank',
  name: 'The Gunge Tank',
  region: 'sewers',
  pos: [1, 16],
  border: 'magenta',
  item: 'key',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'B': { type: 'wall', tile: 'brick', ink: 'green', paper: 'black', bright: true },
    'T': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'green' },
    'G': { type: 'nasty', tile: 'acid', ink: 'green', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'girder', ink: 'yellow', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'chain_h', ink: 'cyan', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BBBBBB....................BBBBBB',
    'BBBBBB....................BBBBBB',
    'BBBB........................BBBB',
    'BBBB........................BBBB',
    'BB............................BB',
    'BB............................BB',
    'BB............................BB',
    'BB.....................+......BB',
    'BB............................BB',
    'BB............................BB',
    '....=========......=========....',
    '................................',
    '...--T....................T--...',
    '.....TGGGGGGGGGGGGGGGGGGGGT.....',
    '_____TGGGGGGGGGGGGGGGGGGGGT_____',
  ],
  guardians: [
    // the hanging chain over the break in the gantry
    { type: 'rope', x: 15, length: 28 },
    // bubbles of gas rising from the gunge either side of the chain
    { type: 'v', sprite: 'bubble', ink: 'green', x: 13, y: 88, min: 32, max: 88, dy: -1, anim: 'slow' },
    { type: 'v', sprite: 'bubble', ink: 'cyan', x: 17, y: 40, min: 24, max: 88, dy: -1, anim: 'slow' },
    // a slime sliding along the east gantry under the key
    { type: 'h', sprite: 'slime', ink: 'magenta', bright: true, x: 22, y: 72, min: 22, max: 25, dir: 'right' },
  ],
  special: {
    signs: [{ x: 4, y: 4, text: 'NO DIVING', ink: 'red', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Outfall [0,16] - difficulty 3, no items (a breather). The end of the line: the last current carries
// everything west to the outfall grate (cols 4-6) at the mouth of the cliff pipe. A crab has wandered in from the
// beach; drips fall from the main pipe onto the current (hold RIGHT to wait). Step onto the grate and WHOOSH -
// out of the cliff pipe onto the dunes of the Beach (one way).
JSW.defineRoom({
  id: 'the_outfall',
  name: 'The Outfall',
  region: 'sewers',
  pos: [0, 16],
  border: 'cyan',
  item: 'shell',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'B': { type: 'wall', tile: 'brick', ink: 'blue', paper: 'cyan' },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'black', bright: true },
    'H': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'blue', bright: true },
    '#': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true, flash: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '<': { type: 'conveyor', tile: 'walkway', ink: 'green', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BBBBBBB.................P..BBBBB',
    'BBBBBBB.................P..BBBBB',
    'BBBBB...................P..BBBBB',
    'BBBB....................P.....BB',
    'BBBB....HHHHHHHHHHHHHHHHP.....BB',
    'BBBB....HHHHHHHHHHHHHHHHP.....BB',
    'BBBB..........................BB',
    'PPPP..........................BB',
    'PPPP..........................BB',
    'PPPP............................',
    'PPPP............................',
    'PPPP............................',
    'PPPP............................',
    'PPPP###<<<<<<<<<<<<<<===========',
  ],
  guardians: [
    // a crab that has wandered up the pipe from the beach
    { type: 'h', sprite: 'crab', ink: 'red', bright: true, x: 24, y: 104, min: 21, max: 26, dir: 'left' },
    // drips from the main pipe onto the current
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 11, y: 64, min: 64, max: 96, dy: 2, anim: 'fast' },
    { type: 'v', sprite: 'drip', ink: 'white', x: 17, y: 80, min: 64, max: 96, dy: 3, anim: 'fast' },
  ],
  special: {
    portals: [{ x: 5, y: 14, w: 2, h: 1, kind: 'outfall', to: 'the_beach' }],
    signs: [
      { x: 4, y: 10, text: 'BEACH', ink: 'yellow' },
      { x: 4, y: 12, text: 'VVV', ink: 'yellow', flash: true },
      { x: 9, y: 3, text: 'END OF THE LINE', ink: 'cyan' },
    ],
  },
});
