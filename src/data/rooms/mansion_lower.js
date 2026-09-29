// Jet Set Wally II - mansion, lower ground floor (grid row 11): Boot Room .. Coal Hole.
// Author file: src/data/rooms/mansion_lower.js  (region 'mansion')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts, names and jokes original.
//
// Lower-floor conventions used below: every east/west door is open rows 11-14 over a floor at row 15; all
// other edge cells are wall. Sealed ceilings are solid wall in row 0 (only the planned stair / shaft spans are
// open). Stair flights that arrive from the floor above keep their foot on a bench/dais at row 13, so walking
// along floor 15 never gets "grabbed" by the stairs.

// ---------------------------------------------------------------------------------------------------------
// Boots and All [6,11] - difficulty 2.
// The back stairs come down from Back Hall Bedlam in one long flight (ramp cells (5,0),(6,1) ... (17,12)) onto
// the boot bench (row 13). Under the stairs: the old back door, bricked up by the builders, still signposted
// WAS: TO THE BEACH. A wet dog pads the floor between the bench and the Laundry door; the dog's bone is on the top
// shelf, via the bench -> rod rack (row 11) -> shelf (row 9), past the one that didn't get away (a fish on a
// line bobbing between rack and shelf).
JSW.defineRoom({
  id: 'the_boot_room',
  name: 'Boots and All',
  region: 'mansion',
  pos: [6, 11],
  border: 'magenta',
  item: 'bone',
  tiles: {
    '.': { type: 'air', ink: 'magenta', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'white', paper: 'red' },
    'D': { type: 'wall', tile: 'brick_small', ink: 'red', paper: 'white', bright: true },
    'W': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue' },
    'g': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'R': { type: 'wall', tile: 'hedge', ink: 'red', paper: 'black', bright: true },
    'y': { type: 'wall', tile: 'hedge', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    'b': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'r': { type: 'floor', tile: 'rope_bridge', ink: 'green', paper: 'black', bright: true },
    's': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    '#####\\...#######################',
    '#####.\\.......................##',
    '#######\\.......WWWW...........##',
    '##......\\......WWWW...........##',
    '##.......\\.....WWWW...........##',
    '##........\\...................##',
    '##.........\\..................##',
    '##..........\\...............+.##',
    '##...........\\................##',
    '##............\\............sss##',
    '##.............\\..............##',
    'DD..............\\.....rrrr......',
    'DD...............\\..............',
    'DD..g...R...y....bbb............',
    'DD..gg..RR..yy..................',
    '##==============================',
  ],
  guardians: [
    // the wet dog pads between the boot bench and the Laundry door (never reaches the doorway itself)
    { type: 'h', sprite: 'dog', ink: 'yellow', bright: true, x: 23, y: 104, min: 20, max: 26, dir: 'left' },
    // the one that didn't get away: a fish on a line bobbing between the rod rack and the top shelf
    { type: 'v', sprite: 'fish', ink: 'cyan', x: 25, y: 24, min: 24, max: 56, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [
      { x: 2, y: 9, text: 'WAS:', ink: 'yellow' },
      { x: 2, y: 10, text: 'TO THE BEACH', ink: 'yellow' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Mangle Tangle [7,11] - difficulty 3.
// The great cast-iron mangle squats in the middle of the floor (3 rows high) with its rollers pounding the top:
// hop onto a washing line (row 13) either side, jump onto the mangle while the rollers are up and get off the
// far side. West: washing lines zig-zag up (rows 13, 11, 9, 7) to the odd sock pegged over the top line, while a
// drip falls from the sheet onto the middle line where the jumps land. East: a rubber glove waves over the
// washing basket. Every line overlaps the one below, so walking off any of them is a safe short drop.
JSW.defineRoom({
  id: 'the_laundry',
  name: 'Mangle Tangle',
  region: 'mansion',
  pos: [7, 11],
  border: 'cyan',
  item: 'sock',
  tiles: {
    '.': { type: 'air', tile: 'bubbles_faint', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'bathroom_tiles', ink: 'blue', paper: 'white' },
    'H': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'red' },
    'M': { type: 'wall', tile: 'rivets', ink: 'red', paper: 'black', bright: true },
    'S': { type: 'wall', tile: 'marble', ink: 'white', paper: 'magenta', bright: true },
    'P': { type: 'wall', tile: 'marble', ink: 'white', paper: 'blue', bright: true },
    'b': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'red' },
    '-': { type: 'floor', tile: 'chain_h', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'cyan', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##.....SSSS...HHHH............##',
    '##............HHHH............##',
    '##..................---------.##',
    '##...................SSS.PPP..##',
    '##.+.................SSS.PPP..##',
    '##............................##',
    '##------......................##',
    '##............................##',
    '##......-----.................##',
    '##............................##',
    '...------.......................',
    '..............MMMM..............',
    '.........-----MMMM.-----.bbb....',
    '..............MMMM.......bbb....',
    '================================',
  ],
  guardians: [
    // the mangle rollers pounding the top of the mangle: cross while they are up
    { type: 'v', sprite: 'crusher', ink: 'white', x: 15, y: 24, min: 24, max: 80, dy: 2, anim: 'fast' },
    // a drip falling from the sheet onto the middle line, right where the zig-zag jumps land
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 8, y: 16, min: 16, max: 56, dy: 2, anim: 'fast' },
    // a rubber glove waving over the washing basket by the Turkish Bath door
    { type: 'v', sprite: 'hand', ink: 'magenta', x: 26, y: 56, min: 56, max: 88, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Turkish Bath (Drained) [8,11] - difficulty 3. A dead end - apart from the plughole.
// Solid pine tiers rise against the west wall above the doorway (tops at rows 11, 9, 7) with a loose bench
// (row 13) in front; every step is exactly one Wally wide and a steam bubble rises in front of each riser, so
// land each step while its bubble is high. The towel (item) waits on the top tier. The drained plunge pool
// (kerbs at cols 10 and 21, row 14) has a giant brass plughole at cols 15-16 with the resident rubber duck
// circling it: step on the grate and you are sucked one-way down to the sewers (Round the U-Bend).
JSW.defineRoom({
  id: 'the_turkish_bath',
  name: 'The Turkish Bath (Drained)',
  region: 'mansion',
  pos: [8, 11],
  border: 'yellow',
  item: 'tap',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'marble', ink: 'white', paper: 'red' },
    'W': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'blue', bright: true },
    'T': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'yellow' },
    'k': { type: 'wall', tile: 'bathroom_tiles', ink: 'white', paper: 'cyan', bright: true },
    'm': { type: 'wall', tile: 'marble', ink: 'white', paper: 'blue', bright: true },
    'b': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
    'p': { type: 'floor', tile: 'tiled_floor', ink: 'cyan', paper: 'black', bright: true },
    'g': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true, flash: true },
  },
  map: [
    '################################',
    '##......W...W...W...W...W.....##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##+...........................##',
    '##............................##',
    '##TT..........................##',
    '##TT..........................##',
    '##TTTT........................##',
    '##TTTT........................##',
    '..TTTTTT.................mmm..##',
    '..TTTTTT.................mmm..##',
    '........bb...........kkkkkkkkk##',
    '..........k..........kkkkkkkkk##',
    '===========ppppggpppp=========##',
  ],
  guardians: [
    // steam bubbles rising in front of each riser of the tiers
    { type: 'v', sprite: 'bubble', ink: 'cyan', x: 8, y: 80, min: 24, max: 80, dy: 2, anim: 'fast' },
    { type: 'v', sprite: 'bubble', ink: 'white', x: 6, y: 40, min: 8, max: 72, dy: 2, anim: 'slow' },
    { type: 'v', sprite: 'bubble', ink: 'green', x: 4, y: 8, min: 8, max: 56, dy: 1, anim: 'slow' },
    // the rubber duck bobbing round and round the plughole
    { type: 'v', sprite: 'rubber_duck', ink: 'yellow', x: 15, y: 80, min: 80, max: 96, dy: 1, anim: 'slow' },
  ],
  special: {
    portals: [{ x: 15, y: 14, w: 2, h: 1, kind: 'drain', to: 'round_the_u_bend' }],
    signs: [{ x: 10, y: 8, text: 'NO RETURN - SEWERS', ink: 'red', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Too Many Cooks [9,11] - difficulty 3.
// The range cooker fills the west end (top row 12, hot plates at cols 4-5); the carrot sits beyond the hot plates.
// To reach the range, climb the stool (row 13) onto the long worktop (row 11), jump over the chef as he chops
// towards you, and step off the worktop's west end onto the range. The rat raids the floor under the worktop.
// The dumbwaiter lift (cols 22-24) runs from the floor to the pass shelf (row 4) under the Servery hatch (rows
// 0-1 open over cols 18-21): the secret way up. A saucepan lid flies diagonally through the lift shaft.
JSW.defineRoom({
  id: 'the_kitchen',
  name: 'Too Many Cooks',
  region: 'mansion',
  pos: [9, 11],
  border: 'red',
  item: 'carrot',
  tiles: {
    '.': { type: 'air', ink: 'red', paper: 'black' },
    's': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },
    '#': { type: 'wall', tile: 'brick_small', ink: 'white', paper: 'red' },
    'C': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'P': { type: 'wall', tile: 'rivets', ink: 'yellow', paper: 'red', bright: true },
    'R': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'blue', bright: true },
    'F': { type: 'nasty', tile: 'fire_grate', ink: 'red', paper: 'black', bright: true },
    'w': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    't': { type: 'floor', tile: 'plank', ink: 'magenta', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '##################....##########',
    '##################....##########',
    '##CCCCCC.P.P.P.P.#.......#....##',
    '##CCCCCC.........#...+...#....##',
    '##CCCCCC.........#ssss...#....##',
    '##CCCCCC.................#....##',
    '##CCCCCC.................#....##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##+...........................##',
    '##.......wwwwwwwwwww............',
    '##RRFFRRR.......................',
    '##RRRRRRR.........tt............',
    '##RRRRRRR.......................',
    '##==============================',
  ],
  guardians: [
    // the dumbwaiter: floor 15 <-> pass shelf (row 4)
    { type: 'lift', x: 22, width: 3, top: 4, bottom: 15, start: 15, period: 4, dir: 'down' },
    // the chef chopping to and fro along the worktop (the east end by the stool is safe)
    { type: 'h', sprite: 'chef', ink: 'white', bright: true, x: 12, y: 72, min: 10, max: 15, dir: 'left' },
    // the rat raiding the floor under the worktop
    { type: 'h', sprite: 'rat', ink: 'magenta', bright: true, x: 12, y: 104, min: 9, max: 15, dir: 'right' },
    // a saucepan lid flying diagonally down through the lift shaft
    { type: 'd', sprite: 'plate', ink: 'cyan', x: 224, y: 40, dx: -2, dy: 2, count: 32, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 8, y: 6, text: 'MENU: STEW AGAIN', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Scrub-a-Dub Scullery [10,11] - difficulty 2.
// A green iron pump drips into the stone sink; a plate skids up and down the draining board (row 11). Up the
// upturned bucket (row 13) onto the board, then hop up onto the plate rack (row 9) for the cup. The cellar steps
// come up through the floor at cols 21-22 ((21,15),(22,14)) onto a stone stair-head: walking west over it takes
// you down to the cellars (chalked <- CELLARS), so hop it to carry on west.
JSW.defineRoom({
  id: 'the_scullery',
  name: 'Scrub-a-Dub Scullery',
  region: 'mansion',
  pos: [10, 11],
  border: 'blue',
  item: 'cup',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'blue' },
    'W': { type: 'wall', tile: 'window', ink: 'white', paper: 'cyan', bright: true },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'green', paper: 'black', bright: true },
    'p': { type: 'wall', tile: 'pipe_h', ink: 'green', paper: 'black', bright: true },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'black', bright: true },
    'F': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'black', bright: true },
    'K': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'cyan', paper: 'black', bright: true },
    'd': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    'b': { type: 'floor', tile: 'plank', ink: 'magenta', paper: 'black', bright: true },
    'r': { type: 'floor', tile: 'rope_bridge', ink: 'white', paper: 'black', bright: true },
    'l': { type: 'floor', tile: 'pipe_v', ink: 'white', paper: 'black' },
    'h': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    'J': { type: 'wall', tile: 'rivets', ink: 'magenta', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##............................##',
    '##..........WWWW..............##',
    '##PP........WWWW.......J.JJ.J.##',
    '##PP........WWWW.......hhhhhh.##',
    '##PPpp........................##',
    '##PP.................F........##',
    '##PP................+F........##',
    '##PP.................F........##',
    '##PP.............rrrrF........##',
    '##PP..........................##',
    '....SSSSSdddddddd...............',
    '....SSSSS.......................',
    '....l...l...bb..................',
    '....l...l............./KK.......',
    '=====================/KKK=======',
  ],
  guardians: [
    // a plate skidding up and down the draining board
    { type: 'd', sprite: 'plate', ink: 'white', x: 72, y: 72, dx: 1, dy: 0, count: 48, anim: 'fast' },
    // the pump drips into the sink
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 4, y: 48, min: 48, max: 72, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 20, y: 11, text: '<- CELLARS', ink: 'white' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Servants' Knees-Up [11,11] - difficulty 2.
// The servants' stair comes down from the Cloakroom (ramp cells (26,0),(25,1) ... (14,12)) straight onto the east
// end of the long refectory table (row 13). A maid dances along the west half of the table under the board of
// service bells; the housekeeper's key hangs from a bell-pull at (7,8) - take a running jump for it from the safe
// east end of the table. The butler paces the floor under the stairs between the table and the Boiler Room door.
JSW.defineRoom({
  id: 'servants_hall',
  name: "Servants' Knees-Up",
  region: 'mansion',
  pos: [11, 11],
  border: 'green',
  item: 'key',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'yellow', paper: 'green' },
    'B': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'o': { type: 'wall', tile: 'rivets', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    'T': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'l': { type: 'floor', tile: 'pipe_v', ink: 'yellow', paper: 'black' },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '#######################.../#####',
    '##......................./.#####',
    '##....................../#######',
    '##.BBBBBBBB............/########',
    '##.BBBBBBBB.........../.......##',
    '##.BBBBBBBB........../........##',
    '##.o.o.o.o........../.........##',
    '##.....l.........../..........##',
    '##.....+........../...........##',
    '##.............../............##',
    '##............../.............##',
    '.............../................',
    '............../.................',
    '...TTTTTTTTTTTT.................',
    '....l....l...l..................',
    '================================',
  ],
  guardians: [
    // the maid dancing along the west half of the table (the east end, where the stairs land, stays clear)
    { type: 'h', sprite: 'maid', ink: 'magenta', bright: true, x: 5, y: 88, min: 3, max: 7, dir: 'right' },
    // the butler pacing the floor under the stairs (never reaches the Boiler Room doorway)
    { type: 'h', sprite: 'butler', ink: 'white', bright: true, x: 20, y: 104, min: 16, max: 26, dir: 'left' },
  ],
  special: {
    signs: [
      { x: 3, y: 2, text: 'WHO RANG?', ink: 'yellow' },
      { x: 21, y: 9, text: 'KNEES-UP!', ink: 'magenta', flash: true },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Boiling Point [12,11] - difficulty 3.
// The copper boiler squats in the middle (cols 12-19, rows 7-12) over its ash-pit tunnel; the floor route runs
// under it. Pipe runs step up the west side (rows 13, 11, 9) to the steam main along the top of the boiler (row 7,
// with a hissing valve to hop at col 16) and the hot-water pipe behind the boiler (row 5), where the spanner is.
// Time the jump from the row-9 pipe onto the boiler past the whirring fan; every ledge drops safely onto the one
// below. A clockwork mouse runs the floor between the tunnel and the Coal Hole door - jump it in the open.
JSW.defineRoom({
  id: 'the_boiler_room',
  name: 'Boiling Point',
  region: 'mansion',
  pos: [12, 11],
  border: 'yellow',
  item: 'spanner',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    '#': { type: 'wall', tile: 'brick_small', ink: 'black', paper: 'red' },
    'B': { type: 'wall', tile: 'rivets', ink: 'yellow', paper: 'red', bright: true },
    'b': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'black', bright: true },
    'm': { type: 'wall', tile: 'pipe_h', ink: 'white', paper: 'blue', bright: true },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'cyan', paper: 'black', bright: true },
    'F': { type: 'nasty', tile: 'fire_grate', ink: 'yellow', paper: 'red', bright: true, flash: true },
    'v': { type: 'nasty', tile: 'sparks', ink: 'white', paper: 'black', bright: true, flash: true },
    'p': { type: 'floor', tile: 'pipe_h', ink: 'cyan', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##........................PP..##',
    '##........................PP..##',
    '##mmmmmmmm...............+PP..##',
    '##........................PP..##',
    '##..................ppppppPP..##',
    '##..................PP....PP..##',
    '##..........mmmmvmmmPP....PP..##',
    '##..........BBBBBBBBPP....PP..##',
    '##.....pppppBbbbbbbBPP....PP..##',
    '##..........BBFFFFBBPP........##',
    '...pppp.....BBFFFFBBPP..........',
    '............BBBBBBBBPP..........',
    '.......ppp......................',
    '................................',
    '================================',
  ],
  guardians: [
    // the fan whirring up and down beside the boiler: time the jump from the row-9 pipe onto the boiler
    { type: 'v', sprite: 'fan', ink: 'cyan', x: 10, y: 8, min: 8, max: 56, dy: 2, anim: 'fast' },
    // the clockwork mouse running the floor between the ash-pit tunnel and the Coal Hole door
    { type: 'h', sprite: 'clockwork_mouse', ink: 'white', bright: true, x: 24, y: 104, min: 22, max: 26, dir: 'left' },
  ],
  special: {
    signs: [{ x: 12, y: 1, text: 'PRESSURE: HIGH', ink: 'red', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Coal Hole Rigmarole [13,11] - difficulty 3.
// Coal from the street hopper has piled into one great heap (coal-slope ramps up to a plateau at row 11) that
// the floor route has to climb over. A coal lump rolls to and fro on the plateau; the diamond (well, it IS coal
// under pressure) sits above it. At the heap's west foot the coal chute (cols 6-7) drops one-way into the Coal
// Cellar - hop it on the way to the Boiler Room. A rat scurries between the heap and the sunken-garden door.
JSW.defineRoom({
  id: 'the_coal_hole',
  name: 'Coal Hole Rigmarole',
  region: 'mansion',
  pos: [13, 11],
  border: 'magenta',
  item: 'diamond',
  tiles: {
    '.': { type: 'air', ink: 'magenta', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'magenta', paper: 'black', bright: true },
    'H': { type: 'wall', tile: 'rivets', ink: 'cyan', paper: 'black', bright: true },
    'c': { type: 'wall', tile: 'rock', ink: 'blue', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'blue', paper: 'black', bright: true, dir: 'right' },
    'L': { type: 'ramp', tile: 'slope_rock', ink: 'blue', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    '################################',
    '##...........HHHHH............##',
    '##...........HHHHH............##',
    '##............HHH.............##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##.............+..............##',
    '##............................##',
    '##............................##',
    '##............................##',
    '............/cccccL.............',
    '.........../cccccccL............',
    '........../cccccccccL...........',
    '........./cccccccccccL..........',
    '======..========================',
  ],
  guardians: [
    // a lump of coal rolling to and fro on top of the heap
    { type: 'h', sprite: 'boulder', ink: 'white', bright: true, x: 14, y: 72, min: 13, max: 16, dir: 'right' },
    // the rat scurrying between the heap and the sunken-garden door
    { type: 'h', sprite: 'rat', ink: 'yellow', bright: true, x: 25, y: 104, min: 23, max: 27, dir: 'left' },
  ],
  special: {
    signs: [
      { x: 3, y: 10, text: 'COAL -', ink: 'white' },
      { x: 2, y: 11, text: 'DOWN ONLY', ink: 'white' },
    ],
  },
});
