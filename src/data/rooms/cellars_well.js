// Jet Set Wally II - the cellars (grid row 12, cols 8-17) and the garden well (col 18, rows 11-13).
// Author file: src/data/rooms/cellars_well.js  (regions 'cellars' and 'well')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts, names and jokes original.
//
// Cellar conventions used below: the corridor doors are open rows 11-14 over a floor at row 15 (the Fuse Box ->
// Conker Roots door is open rows 8-11 over a floor at row 12); every other edge cell is wall. Cellar signature:
// conveyors and crossbow arrows. Well signature: rope descent - the only way back up is by rope, and overshooting
// the catch ledges is a (comic) fatal plunge, but every careful route is survivable.

// ---------------------------------------------------------------------------------------------------------
// The Vintage Whine Cellar [8,12] - difficulty 3.
// Dead end at the west of the cellar corridor. Racks of dusty bottles zig-zag up the room (rows 13, 11, 9, 7);
// more bottles are racked in the vaulted ceiling. A barrel trundles along the flagstones and two champagne
// bottles keep popping their corks between the racks. Item: a glass of something vintage on the top rack.
JSW.defineRoom({
  id: 'the_wine_cellar',
  name: 'The Vintage Whine Cellar',
  region: 'cellars',
  pos: [8, 12],
  border: 'red',
  item: 'glass',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'yellow', paper: 'red' },
    'B': { type: 'wall', tile: 'bookshelf', ink: 'green', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black' },
    'R': { type: 'floor', tile: 'bookshelf', ink: 'green', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##BBBBB####BBBBBB####BBBBB######',
    '##BBBBB....BBBBBB....BBBBB....##',
    '##............................##',
    '##............................##',
    '##..........+.................##',
    '##............................##',
    '##........RRRRRR..............##',
    '##............................##',
    '##.................RRRRR......##',
    '##............................##',
    '##CCCC.....RRRRRR...............',
    '##CCCC..........................',
    '##CCCC.............RRRRRR.......',
    '##CCCC..........................',
    '##______________________________',
  ],
  guardians: [
    // a barrel trundling along the flagstones (never reaches the doorway)
    { type: 'h', sprite: 'barrel', ink: 'yellow', bright: true, x: 12, y: 104, min: 6, max: 16, dir: 'left' },
    // champagne popping up between the lower racks
    { type: 'v', sprite: 'champagne', ink: 'green', x: 17, y: 40, min: 32, max: 96, dy: 2, anim: 'slow' },
    // champagne bouncing on the rack under the top rack
    { type: 'v', sprite: 'champagne', ink: 'magenta', x: 21, y: 24, min: 24, max: 56, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Bottleneck [9,12] - difficulty 3.
// The cellar signature room: the Fizz-o-Matic bottling machine. The whole middle of the floor is a belt running
// WEST (keep walking east or it carries you back), and the filling belt at row 9 runs EAST. Climb the crates
// (rows 13, 11) at the west end to hop onto the filling belt; a barrel rides it to and fro (jump it - you cannot
// stop on the belt). The belt tips you off its east end onto the crates at rows 11 and 13. A champagne bottle
// bounces on the floor belt. Items: bottles at both ends of the filling belt.
JSW.defineRoom({
  id: 'the_bottling_line',
  name: 'Bottleneck',
  region: 'cellars',
  pos: [9, 12],
  border: 'cyan',
  item: 'bottle',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'brick_small', ink: 'yellow', paper: 'blue' },
    'M': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'black', bright: true },
    '|': { type: 'wall', tile: 'pipe_v', ink: 'cyan', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'cyan', paper: 'black', bright: true },
    'K': { type: 'floor', tile: 'crate', ink: 'yellow', paper: 'black', bright: true },
    '<': { type: 'conveyor', tile: 'belt_arrows', ink: 'magenta', paper: 'black', bright: true, dir: 'left' },
    '>': { type: 'conveyor', tile: 'rollers', ink: 'green', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    '################################',
    '##########MMMMMMMMMMMM##########',
    '##........MMMMMMMMMMMM........##',
    '##..........|...|...|.........##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##........+............+......##',
    '##............................##',
    '##........>>>>>>>>>>>>>>......##',
    '##............................##',
    '......KKK...............KKK.....',
    '................................',
    '..KKK......................KKK..',
    '................................',
    '======<<<<<<<<<<<<<<<<<<<<======',
  ],
  guardians: [
    // a barrel riding the filling belt
    { type: 'h', sprite: 'barrel', ink: 'yellow', bright: true, x: 15, y: 56, min: 12, max: 18, dir: 'right' },
    // a champagne bottle bouncing on the floor belt
    { type: 'v', sprite: 'champagne', ink: 'white', x: 16, y: 80, min: 80, max: 104, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 8, y: 4, text: 'FIZZ-O-MATIC 2000', ink: 'magenta' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Steps in the Dark [10,12] - difficulty 2.
// The cellar steps come down from the Scullery through the ceiling (ramp cells (21,1),(22,0) continue the
// scullery flight), cross a half-landing at row 3 and run down-left onto a dais at row 13 - the stair foot sits
// on the dais so walking along the corridor floor never drags you up the steps. An easy junction: a rat on the
// floor, a candle guttering beside the bracket, and chalked arrows to the wine and the crypt. Item: a candle
// on the wall bracket (row 11).
JSW.defineRoom({
  id: 'cellar_steps',
  name: 'Steps in the Dark',
  region: 'cellars',
  pos: [10, 12],
  border: 'blue',
  item: 'candle',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'blue' },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black' },
    'K': { type: 'floor', tile: 'crate', ink: 'red', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    '###################.../#########',
    '##.................../...#######',
    '##................../....#######',
    '##.............../=======#######',
    '##............../.............##',
    '##............./..............##',
    '##............/...............##',
    '##.........../................##',
    '##........../.................##',
    '##........./..............+...##',
    '##......../...................##',
    '........./...............---....',
    '......../.......................',
    '....=====............KKK........',
    '................................',
    '________________________________',
  ],
  guardians: [
    // a rat scurrying along the corridor floor under the stairs
    { type: 'h', sprite: 'rat', ink: 'magenta', bright: true, x: 15, y: 104, min: 10, max: 19, dir: 'left' },
    // a candle guttering over the barrel step
    { type: 'v', sprite: 'candle', ink: 'yellow', x: 28, y: 56, min: 48, max: 72, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [
      { x: 2, y: 10, text: '<- WINE', ink: 'white' },
      { x: 19, y: 6, text: 'CRYPT &', ink: 'white' },
      { x: 19, y: 7, text: 'SWITCH ->', ink: 'white' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Say Cheese! [11,12] - difficulty 3.
// The cheese store: slatted shelves (rows 13, 11, 9, 7, 5) with wheels of blue-veined Stilton to hop onto, and a
// green stink cloud (flashing) hanging at rows 6-7 - do not jump up into it from the middle shelf, and do not
// walk off the west end of the top shelf. A rat patrols the floor and a clockwork mouse the middle shelf. The mine
// escape hatch comes up through the grating at cols 22-23. Item: a slice of the prize cheese, on top of the big
// wheel on the top shelf.
JSW.defineRoom({
  id: 'the_stilton_store',
  name: 'Say Cheese!',
  region: 'cellars',
  pos: [11, 12],
  border: 'yellow',
  item: 'cheese',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'white', paper: 'red' },
    'C': { type: 'wall', tile: 'marble', ink: 'blue', paper: 'yellow' },
    '-': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black' },
    'g': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },
    '%': { type: 'nasty', tile: 'acid', ink: 'green', paper: 'black', bright: true, flash: true },
  },
  map: [
    '################################',
    '##...CC..........+.......CC...##',
    '##............................##',
    '##...............CC...........##',
    '##...............CC...........##',
    '##..............--------......##',
    '##......%%%%%%%...............##',
    '##......%%%%%%%..........-----##',
    '##............................##',
    '##...................-------..##',
    '##...............CC...........##',
    '............-------.............',
    '.......CC.......................',
    '..--------......................',
    '................................',
    '______________________gg________',
  ],
  guardians: [
    // a rat on the flagstones (clear of both doorways and the hatch)
    { type: 'h', sprite: 'rat', ink: 'white', bright: true, x: 14, y: 104, min: 10, max: 19, dir: 'right' },
    // a clockwork mouse on the middle shelf, after the cheese
    { type: 'h', sprite: 'clockwork_mouse', ink: 'cyan', bright: true, x: 13, y: 72, min: 12, max: 15, dir: 'left' },
  ],
  special: {
    signs: [{ x: 4, y: 3, text: 'DO NOT SNIFF', ink: 'green' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Dead Relatives [12,12] - difficulty 4.
// The family crypt: the corridor is blocked by stone tombs (tops at row 13) and a raised sarcophagus (row 11)
// that must be hopped in turn. Crossbow traps fire along the room: one bolt flies LEFT at row 13 (only the
// flagstones are in its line - stand on a tomb) and one flies RIGHT at row 9 (only the sarcophagus top is in its
// line). Great-uncle's skeleton keeps sitting up in the east tomb and a ghost drifts over the west tombs.
// Item: an heirloom ring in the arched niche (row 8) above the sarcophagus - jump for it between bolts.
JSW.defineRoom({
  id: 'the_family_crypt',
  name: 'Dead Relatives',
  region: 'cellars',
  pos: [12, 12],
  border: 'magenta',
  item: 'ring',
  tiles: {
    '.': { type: 'air', ink: 'magenta', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'white', paper: 'blue' },
    'T': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'black', bright: true },
    'S': { type: 'wall', tile: 'marble', ink: 'yellow', paper: 'magenta' },
    'A': { type: 'wall', tile: 'brick_small', ink: 'cyan', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black' },
  },
  map: [
    '################################',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##...........AAAAAAA..........##',
    '##...........A.....A..........##',
    '##...........A.....A..........##',
    '##...........A..+..A..........##',
    '##............................##',
    '##............................##',
    '..............SSSSS.............',
    '..............SSSSS.............',
    '...TTTT...TTTTSSSSSTTTT..TTTT...',
    '...TTTT...TTTTSSSSSTTTT..TTTT...',
    '________________________________',
  ],
  guardians: [
    // crossbow bolts: right along row 9 (sarcophagus top), left along row 13 (the flagstones)
    { type: 'arrow', dir: 'right', y: 76 },
    { type: 'arrow', dir: 'left', y: 108 },
    // great-uncle sits up in the east tomb and lies down again
    { type: 'v', sprite: 'skeleton', ink: 'white', x: 26, y: 88, min: 32, max: 88, dy: 1, anim: 'slow' },
    // a ghost drifting over the west tombs
    { type: 'd', sprite: 'ghost', ink: 'cyan', x: 32, y: 24, dx: 1, dy: 1, count: 56, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 9, y: 2, text: 'REST IN PIECES', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Cellar Dwellers [13,12] - difficulty 3.
// The coal cellar. The coal chute (cols 6-7) drops in from the Coal Hole onto the summit of the coal heap
// (row 5 - deep enough that you cannot jump back up the chute). The heap slopes down eastwards (a half-landing
// at row 9) to the flagstones; its foot at (21,14) will carry an unwary westbound walker up the heap. Its west
// face is two coal ledges (rows 9, 13) to drop down. In the floor: the pit-cage shaft (gap cols 16-17 - jump it
// or ride down to the mines) and the grating (cols 18-19) where the cage delivers climbers. A mole snuffles
// along the floor, a coal boulder rolls by the east door and a lantern swings beside the heap.
// Item: a lump of treasure on the summit.
JSW.defineRoom({
  id: 'the_coal_cellar',
  name: 'Cellar Dwellers',
  region: 'cellars',
  pos: [13, 12],
  border: 'red',
  item: 'diamond',
  tiles: {
    '.': { type: 'air', ink: 'red', paper: 'black' },
    '#': { type: 'wall', tile: 'brick_small', ink: 'red', paper: 'yellow' },
    'o': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    'L': { type: 'ramp', tile: 'slope_rock', ink: 'white', paper: 'black', bright: true, dir: 'left' },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black' },
    'g': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },
  },
  map: [
    '######..########################',
    '##...#..#.....................##',
    '##...#..#.....................##',
    '##............................##',
    '##...+........................##',
    '##...ooooL....................##',
    '##........L...................##',
    '##.........L..................##',
    '##..........L.................##',
    '##ooo.......ooooL.............##',
    '##...............L............##',
    '..................L.............',
    '...................L............',
    '...oooo.............L...........',
    '.....................L..........',
    '________________..gg____________',
  ],
  guardians: [
    // a mole snuffling along the flagstones west of the pit
    { type: 'h', sprite: 'mole', ink: 'magenta', bright: true, x: 10, y: 104, min: 8, max: 14, dir: 'right' },
    // a coal boulder rolling to and fro across the flagstones by the east door
    { type: 'h', sprite: 'boulder', ink: 'white', bright: true, x: 24, y: 104, min: 22, max: 27, dir: 'left' },
    // a miner's lantern swinging beside the upper slope of the heap
    { type: 'v', sprite: 'lantern', ink: 'yellow', x: 13, y: 16, min: 16, max: 40, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 12, y: 1, text: 'BEST NUTTY SLACK', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Knuckle Bone Alley [14,12] - difficulty 3.
// An ossuary passage walled with stacked skulls. Bone shelves climb west to east (rows 13, 11, 9, 7); the top
// shelf runs into a niche in the skull wall (cols 28-29). A skeleton strolls the floor and a skull bobs over the
// top shelf. Item: a knuckle bone in the niche (row 5).
JSW.defineRoom({
  id: 'knuckle_bone_alley',
  name: 'Knuckle Bone Alley',
  region: 'cellars',
  pos: [14, 12],
  border: 'green',
  item: 'bone',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'skull_nasty', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'pipe_h', ink: 'white', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black' },
  },
  map: [
    '################################',
    '################################',
    '##....##..........##......######',
    '##........................######',
    '##........................######',
    '##..........................+.##',
    '##............................##',
    '##......................======##',
    '##........................######',
    '##...............======...######',
    '##........................######',
    '...........======...............',
    '................................',
    '...======.......................',
    '................................',
    '________________________________',
  ],
  guardians: [
    // a skeleton strolling the flagstones
    { type: 'h', sprite: 'skeleton', ink: 'white', bright: true, x: 14, y: 104, min: 11, max: 25, dir: 'right' },
    // a skull bouncing over the long bone shelf
    { type: 'v', sprite: 'skull', ink: 'yellow', x: 23, y: 16, min: 16, max: 40, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 3, y: 4, text: 'ALAS, POOR WALLY', ink: 'cyan' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Drip, Drip, Drip [15,12] - difficulty 3.
// A leaking passage under the lawns. A cracked pipe along the ceiling drips into three puddles on the floor
// (nasty); a stepping stone at row 13 stands in each puddle. Bank -> stone -> bank, timing each hop past the drip
// beside the stone - the drips get faster from west to east. Item: a coin behind the heaviest drip, above the
// last stone (jump for it).
JSW.defineRoom({
  id: 'drip_drip_drip',
  name: 'Drip, Drip, Drip',
  region: 'cellars',
  pos: [15, 12],
  border: 'blue',
  item: 'coin',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'cyan', paper: 'blue' },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'rock_ledge', ink: 'green', paper: 'black', bright: true },
    'o': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##PPPPPPPPPPPPPPPPPPPPPPPPPPPP##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##........................+...##',
    '................................',
    '................................',
    '........oo......oo......oo......',
    '................................',
    '______~~~~~___~~~~~___~~~~~~____',
  ],
  guardians: [
    // three drips, each faster than the last
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 10, y: 16, min: 16, max: 104, dy: 2, anim: 'fast' },
    { type: 'v', sprite: 'drip', ink: 'white', x: 18, y: 60, min: 16, max: 104, dy: 3, anim: 'fast' },
    { type: 'v', sprite: 'drip', ink: 'yellow', x: 26, y: 100, min: 16, max: 104, dy: 4, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 11, y: 5, text: 'CAUTION: WET FLOOR', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Fuse Box of Doom [16,12] - difficulty 4.
// The estate's electrical heart. The big TRIP SWITCH lever (the air cell at (20,4)) sticks out of the humming
// fuse box; touch it from the lever ledge (row 5) to throw it - the lighthouse lamp starts flashing and the yacht
// can sail. Getting there: junction-box ledges (rows 13, 9, 7) and the conduit (row 11) zig-zag up the west half;
// the sparking caps (flashing) on the upper boxes are deadly - do not walk into them. A saw runs along the conduit,
// a fan whirrs under the lever ledge. The east door is up on the junction-box step (floor 12).
// Item: a battery beside the lever.
JSW.defineRoom({
  id: 'fuse_box_of_doom',
  name: 'Fuse Box of Doom',
  region: 'cellars',
  pos: [16, 12],
  border: 'yellow',
  item: 'battery',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    '#': { type: 'wall', tile: 'brick_small', ink: 'white', paper: 'red' },
    'F': { type: 'wall', tile: 'circuit', ink: 'green', paper: 'black', bright: true },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'metal_plate', ink: 'cyan', paper: 'blue' },
    'j': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    'c': { type: 'floor', tile: 'pipe_h', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'girder', ink: 'magenta', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'tiled_floor', ink: 'yellow', paper: 'black' },
    'x': { type: 'nasty', tile: 'sparks', ink: 'cyan', paper: 'black', bright: true, flash: true },
  },
  map: [
    '################################',
    '##...................FFFFFFFFF##',
    '##...................FFFFFFFFF##',
    '##...................FFFFFFFFF##',
    '##...............+...FFFFFFFFF##',
    '##..............======.PP.....##',
    '##.....................PP.....##',
    '##.......jjjjjjjx......PP.....##',
    '##.....................PP.......',
    '##xjjjj.........................',
    '##..............................',
    '.........cccccccccccc...........',
    '..........................BBBBBB',
    '....jjjj..................BBBBBB',
    '.......................BBBBBBBBB',
    '_______________________BBBBBBBBB',
  ],
  guardians: [
    // a saw running along the conduit
    { type: 'd', sprite: 'saw', ink: 'white', x: 88, y: 72, dx: 2, dy: 0, count: 32, anim: 'fast' },
    // a fan whirring under the lever ledge, right where you land from the top junction box
    { type: 'v', sprite: 'fan', ink: 'cyan', x: 17, y: 48, min: 48, max: 72, dy: 1, anim: 'fast' },
  ],
  special: {
    switches: [{ x: 20, y: 4, flag: 'trip', message: 'TRIP SWITCH THROWN!' }],
    signs: [
      { x: 4, y: 2, text: 'TRIP SWITCH ->', ink: 'red', flash: true },
      { x: 20, y: 4, text: '/', ink: 'white' },
      { x: 20, y: 4, text: '_', ink: 'white', when: 'trip' },
      { x: 19, y: 10, text: 'DANGER 240V', ink: 'red' },
      { x: 2, y: 6, text: 'YACHT READY TO SAIL', ink: 'green', when: 'trip' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Under the Conker Roots [17,12] - difficulty 4.
// East end of the cellars: the roots of the great conker tree have burst through the ceiling. From the west door
// (up on the earth step, floor 12) root ledges climb rows 11, 9, 7, 5 to the root shelf at row 3 under the crack
// in the ceiling (cols 8-11) - the secret shaft up into the Tangled Roots (drop back down the same way). A long
// root (row 7) runs east under the root mass; drop off its end onto the root overhang and down to the floor,
// where a mole guards the pocket under the overhang. Worms dangle from the roots.
// Items: a conker tangled at the end of the long root, and another in the pocket under the overhang.
JSW.defineRoom({
  id: 'under_the_conker_roots',
  name: 'Under the Conker Roots',
  region: 'cellars',
  pos: [17, 12],
  border: 'green',
  item: 'apple',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'earth', ink: 'yellow', paper: 'red' },
    'R': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'sand_top', ink: 'yellow', paper: 'black' },
  },
  map: [
    '########....####################',
    '##.RR.RR.........RR...RRRRRRRR##',
    '##.RR.RR.........RR...RRRRRRRR##',
    '##.RR.RR====...........RRRRRRR##',
    '##....RR.................RRRRR##',
    '##.........===.............+..##',
    '##............................##',
    '##.............=============..##',
    '..............................##',
    '..........====................##',
    '..........................RRRR##',
    '.....====.................RRRR##',
    '####.................====.RRRR##',
    '####.===......................##',
    '####.......................+..##',
    '####__________________________##',
  ],
  guardians: [
    // a mole snuffling along the floor, guarding the pocket under the overhang
    { type: 'h', sprite: 'mole', ink: 'white', bright: true, x: 16, y: 104, min: 9, max: 24, dir: 'right' },
    // a worm dangling under the second root ledge
    { type: 'v', sprite: 'worm', ink: 'magenta', x: 9, y: 80, min: 80, max: 96, dy: 1, anim: 'slow' },
    // a worm dangling over the long root
    { type: 'v', sprite: 'worm', ink: 'red', x: 19, y: 8, min: 8, max: 32, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Drop Me a Line [18,11] - difficulty 4. (region 'well')
// The well head, under the riverbank. Dropping in through the well mouth up in the Riverbank (cols 16-17) lands
// you on the mossy ledge at row 4; mossy stones on the east lining (rows 7, 10) step down to the stone kerb
// (row 13) and the rim (floor 15). The winch rope (col 15) is the only way back up to the Riverbank - catch it
// from the kerb or the stones as it swings. The shaft rope from Well Beyond Help comes up at cols 20-21; step
// off the rim at col 22 to drop down the shaft onto its catch ledge. A spider dangles over the upper stone and a
// drip falls onto the kerb. Item: a key hanging from the winch handle - climb the rope and let it swing you in.
JSW.defineRoom({
  id: 'drop_me_a_line',
  name: 'Drop Me a Line',
  region: 'well',
  pos: [18, 11],
  border: 'cyan',
  item: 'key',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'cyan', paper: 'blue' },
    'R': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'blue' },
    'W': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'K': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'grass_top', ink: 'green', paper: 'black', bright: true },
    's': { type: 'floor', tile: 'stone_ledge', ink: 'green', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '##############....##############',
    '##RRRR##.WWW................####',
    '###RRR##.WWW+...............####',
    '####RR##....................####',
    '####R###........======......####',
    '########....................####',
    '#####RR#....................####',
    '####RR##..............ssssss####',
    '###RR###....................####',
    '########....................####',
    '########..........ssssssssss####',
    '##RR####....................####',
    '###RRR##....................####',
    '#####RR#....KKKKKK..........####',
    '########....KKKKKK..........####',
    '########______________......####',
  ],
  guardians: [
    // the winch rope: climb it to get back up to the Riverbank
    { type: 'rope', x: 15, length: 24 },
    // a spider dangling over the upper mossy stone
    { type: 'v', sprite: 'spider', ink: 'white', x: 24, y: 8, min: 8, max: 32, dy: 1, anim: 'slow' },
    // a drip falling onto the kerb
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 12, y: 24, min: 24, max: 88, dy: 3, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 10, y: 11, text: 'WELL, WELL, WELL', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Well Beyond Help [18,12] - difficulty 5. (region 'well')
// A sheer shaft. Step off the rim of the well head at col 22 and you land on the mossy ledge (row 4, cols 22-25);
// leap off its east side and there is nothing but air until the bottom - the comic fatal plunge. The shaft rope
// (col 21) hangs to row 12 and is the only way back up. Ledges step down the west side (rows 7, 10, 13 - three
// rows apart, so down only) to the bottom, where the Deep Joy rope arrives (cols 8-9) and a hole (cols 10-15)
// drops onto the Deep Joy shelf; a stone at row 13 over the hole catches anyone walking off the row-10 ledge.
// A bat swoops over the west ledges, a cave spider drops beside them and a drip falls on the top ledge.
// Items: two lost buckets' worth of treasure on the west ledges (rows 10 and 13).
JSW.defineRoom({
  id: 'well_beyond_help',
  name: 'Well Beyond Help',
  region: 'well',
  pos: [18, 12],
  border: 'blue',
  item: 'ring',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'blue', paper: 'cyan' },
    '=': { type: 'floor', tile: 'grass_top', ink: 'green', paper: 'black', bright: true },
    'm': { type: 'floor', tile: 'stone_ledge', ink: 'green', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black' },
  },
  map: [
    '####################........####',
    '##............................##',
    '##............................##',
    '##............................##',
    '##....................====....##',
    '##............................##',
    '##............................##',
    '##............mmmmmmm.........##',
    '##.......+....................##',
    '##............................##',
    '##......mmmmmm................##',
    '##..+.........................##',
    '##............................##',
    '##.mmmmm....mmmmm.............##',
    '##............................##',
    '##________......______________##',
  ],
  guardians: [
    // the shaft rope: the only way back up to the well head
    { type: 'rope', x: 21, length: 28 },
    // a bat swooping down over the west ledges
    { type: 'd', sprite: 'bat', ink: 'magenta', x: 96, y: 16, dx: -1, dy: 1, count: 48, anim: 'fast' },
    // a cave spider dropping beside the bottom-west ledge
    { type: 'v', sprite: 'cave_spider', ink: 'white', x: 5, y: 24, min: 24, max: 80, dy: 2, anim: 'slow' },
    // a drip falling onto the top west ledge
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 16, y: 8, min: 8, max: 40, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 15, y: 9, text: 'MIND THE DROP', ink: 'red' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Deep Joy [18,13] - difficulty 5. (region 'well')
// The bottom of the well: black water (nasty) wall to wall. The hole above drops you onto the rock shelf (row 5,
// cols 8-15); the rope (col 9) is the way back up. Stepping stones go down three rows at a time - east, west,
// then back under the rope (rows 8, 11, 14) - to the bones of a previous adventurer, still clutching his prize.
// There is no stepping back up: from the bottom stone catch the rope as it swings by. A frog hops on the middle
// stone and drips fall on the upper and bottom stones. Three items - the reward for braving the well.
JSW.defineRoom({
  id: 'deep_joy',
  name: 'Deep Joy',
  region: 'well',
  pos: [18, 13],
  border: 'magenta',
  item: 'crown',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'cyan', paper: 'blue' },
    'k': { type: 'wall', tile: 'skull_nasty', ink: 'white', paper: 'black', bright: true },
    'b': { type: 'wall', tile: 'pipe_h', ink: 'white', paper: 'black', bright: true },
    'r': { type: 'wall', tile: 'rock', ink: 'cyan', paper: 'blue' },
    'S': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black', bright: true },
    'o': { type: 'floor', tile: 'stone_ledge', ink: 'green', paper: 'black', bright: true },
    '~': { type: 'nasty', tile: 'waves', ink: 'blue', paper: 'black', bright: true },
  },
  map: [
    '########........################',
    '##....................rr..rr..##',
    '##....................r....r..##',
    '##............................##',
    '##............................##',
    '##......SSSSSSSS..............##',
    '##...............+............##',
    '##............................##',
    '##..............oooo..........##',
    '##.........+..................##',
    '##............................##',
    '##........oooooo..............##',
    '##..k+........................##',
    '##..b.........................##',
    '##..oooooo....................##',
    '##~~~~~~~~~~~~~~~~~~~~~~~~~~~~##',
  ],
  guardians: [
    // the rope back up to Well Beyond Help
    { type: 'rope', x: 9, length: 26 },
    // a frog on the middle stone
    { type: 'h', sprite: 'frog', ink: 'green', bright: true, x: 11, y: 72, min: 10, max: 12, dir: 'right' },
    // drips on the upper and the bottom stones
    { type: 'v', sprite: 'drip', ink: 'white', x: 18, y: 8, min: 8, max: 40, dy: 2, anim: 'fast' },
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 6, y: 48, min: 48, max: 88, dy: 3, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 11, y: 12, text: 'HE WENT DOWN WELL', ink: 'yellow' }],
  },
});
