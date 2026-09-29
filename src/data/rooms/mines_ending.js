// Jet Set Wally II - the deep mines (grid rows 13-14): Canary Corner .. Ee By Gum Coal Face, plus the ending room.
// Author file: src/data/rooms/mines_ending.js  (region 'mines'; the_nightmare is region 'ending')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.

// ---------------------------------------------------------------------------------------------------------
// Canary Corner [11,13] - difficulty 4. The miners' refuge.
// East half: pit-prop ledges zig-zag up every 2 rows (13, 11, 9, 7, 5) to the prop ledge (row 3) under the
// escape hatch (cols 22-23) - a one-way jump up into the Stilton Store. A drip falls down the middle of the room
// and a cave bat flits between the props and the cage bracket. West half: the canary's cage hangs on its chain;
// from the row-7 prop jump west to the bracket (row 7), then up onto the cage roof where a feather has fallen.
// The canary flaps inside the bars and a ghostly miner still walks his shift along the floor.
JSW.defineRoom({
  id: 'canary_corner',
  name: 'Canary Corner',
  region: 'mines',
  pos: [11, 13],
  border: 'green',
  item: 'feather',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    '#': { type: 'wall', tile: 'earth', ink: 'yellow', paper: 'red' },
    'I': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'c': { type: 'floor', tile: 'chain_h', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '######################..########',
    '##......I.....................##',
    '##......I.....................##',
    '##......I.+.........=====.....##',
    '##......I.....................##',
    '##....cccccc............=====.##',
    '##....I....I..................##',
    '##....I....I===...====........##',
    '##....I....I..................##',
    '##....I....I............=====.##',
    '##....cccccc..................##',
    '##.................====.........',
    '##..............................',
    '##===.....................====..',
    '##..............................',
    '##______________________________',
  ],
  guardians: [
    // the canary, flapping up and down inside its cage
    { type: 'v', sprite: 'bird', ink: 'yellow', x: 8, y: 48, min: 48, max: 64, dy: 1, anim: 'fast' },
    // the ghost of a miner still walking his shift along the floor
    { type: 'h', sprite: 'ghost_miner', ink: 'cyan', bright: true, x: 12, y: 104, min: 5, max: 20, dir: 'left' },
    // a cave bat flitting between the cage bracket and the props
    { type: 'h', sprite: 'cave_bat', ink: 'magenta', bright: true, x: 17, y: 40, min: 13, max: 20, dir: 'right' },
    // a drip falling from the roof across the jump from the props to the cage bracket
    { type: 'v', sprite: 'drip', ink: 'white', x: 15, y: 16, min: 16, max: 104, dy: 3, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 13, y: 1, text: 'WAY OUT', ink: 'green' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Seam of Despair [12,13] - difficulty 4. A worked-out coal seam over the rails.
// West end: the grotto lift shaft opens in the floor (gap cols 4-5 - MIND THE GAP, or ride it down) with the
// grating (cols 6-7) where climbers from the Glow-Worm Grotto arrive. A minecart rattles along the rails and a
// pickaxe and a drill hack down from the seam. Items: one above the rails (jump the cart for it), one high in the
// seam reached from the coal ledges by the east door.
JSW.defineRoom({
  id: 'seam_of_despair',
  name: 'Seam of Despair',
  region: 'mines',
  pos: [12, 13],
  border: 'blue',
  item: 'gem',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'red', paper: 'yellow' },
    'K': { type: 'wall', tile: 'rock', ink: 'blue', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'pipe_h', ink: 'white', paper: 'black', bright: true },
    'g': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'rock_ledge', ink: 'cyan', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '################################',
    '#####KKKK######KKKKK#####KKK####',
    '##KKKKK#KKKK#####KKKKKKKKK######',
    '##.......KKKKKKKK...KKKKKKK#####',
    '##.........KKKK...........KK..##',
    '##............................##',
    '##............................##',
    '##........................+...##',
    '##............................##',
    '##............................##',
    '.............+...........-----..',
    '................................',
    '...........................---..',
    '................................',
    '____..gg________________________',
  ],
  guardians: [
    // a runaway minecart rattling along the rails (clear of the shaft and the grating)
    { type: 'h', sprite: 'minecart', ink: 'yellow', bright: true, x: 18, y: 104, min: 11, max: 23, dir: 'left' },
    // a pickaxe hacking down from the seam onto the rails
    { type: 'v', sprite: 'pickaxe', ink: 'white', x: 17, y: 40, min: 40, max: 104, dy: 2, anim: 'slow' },
    // a drill boring down onto the east end of the coal ledge
    { type: 'v', sprite: 'drill', ink: 'magenta', x: 28, y: 40, min: 40, max: 64, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 2, y: 9, text: 'MIND THE GAP', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Pit Cage [13,13] - difficulty 3. The mines' signature: the miners' cage lift (cols 12-14) shuttles between
// the floor and the headframe landing (row 4) under the Coal Cellar shaft - climbers jump up from the landing at
// cols 18-19, droppers from the cellar land on it. The only way back down is by cage, or by the east brackets
// (rows 8 and 12 - each a 4-row drop; you cannot climb them). A lantern bobs under the headframe and a mole
// snuffles by the west door. Item: a lamp battery left on the far end of the headframe.
JSW.defineRoom({
  id: 'the_pit_cage',
  name: 'The Pit Cage',
  region: 'mines',
  pos: [13, 13],
  border: 'magenta',
  item: 'battery',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'red' },
    'W': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'blue', bright: true },
    'H': { type: 'wall', tile: 'metal_plate', ink: 'cyan', paper: 'black', bright: true },
    'G': { type: 'floor', tile: 'girder', ink: 'cyan', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    '################....############',
    '##........WWWWWW..............##',
    '##.....................+......##',
    '##............................##',
    '##.............GGGGGGGGG......##',
    '##........H.....H.............##',
    '##........H.....H.............##',
    '##........H.....H.............##',
    '##........H.....H.......====..##',
    '##........H.....H.............##',
    '##........H.....H.............##',
    '..........H.....H...............',
    '..........H.....H...........==..',
    '................................',
    '................................',
    '________________________________',
  ],
  guardians: [
    // the miners' cage: floor 15 <-> headframe landing (row 4)
    { type: 'lift', x: 12, width: 3, top: 4, bottom: 15, start: 15, period: 4, dir: 'down' },
    // a miner's lantern bobbing under the headframe
    { type: 'v', sprite: 'lantern', ink: 'yellow', x: 19, y: 72, min: 40, max: 104, dy: 2, anim: 'slow' },
    // a mole snuffling about by the west door
    { type: 'h', sprite: 'mole', ink: 'magenta', bright: true, x: 6, y: 104, min: 5, max: 8, dir: 'right' },
  ],
  special: {
    signs: [{ x: 2, y: 2, text: 'MAX LOAD', ink: 'yellow' }, { x: 2, y: 3, text: '1 WALLY', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Dynamite Depot [14,13] - difficulty 4. NO SMOKING.
// Crates of TNT stacked in 2-row steps (rows 13, 11, 9, 11) climb from the west door to the stockpile (row 11)
// and the plank bridge; hop the gap (cols 28-29) to the high east door (floor 11). Lit fuses (flashing) stick out
// of two crates - jump them. A miner-bot trundles the stockpile, sticks of dynamite hop over the second crate and
// in the gap. The plank ramp rises from the Coal Face through the floor (cols 27-28, rising right) to a landing
// (30,13) under the east door; drop into the gap to go down it. Items: a clock on top of the tall crate (jump for
// it) and another over the stockpile.
JSW.defineRoom({
  id: 'dynamite_depot',
  name: 'Dynamite Depot',
  region: 'mines',
  pos: [14, 13],
  border: 'red',
  item: 'clock',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'white', paper: 'blue' },
    'X': { type: 'wall', tile: 'crate', ink: 'red', paper: 'yellow' },
    '_': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '*': { type: 'nasty', tile: 'sparks', ink: 'yellow', paper: 'black', bright: true, flash: true },
  },
  map: [
    '################################',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##...........+................##',
    '##............................##',
    '##....................+.........',
    '##..............................',
    '##..........XXX.................',
    '##..........XXX*...*............',
    '.........XXXXXXXXXXXXXXXX===..==',
    '.........XXXXXXXXXXXXXXXX......#',
    '......XXXXXXXXXXXXXXXXXXX..../=#',
    '......XXXXXXXXXXXXXXXXXXX.../###',
    '_________________________../####',
  ],
  guardians: [
    // a miner-bot trundling along the stockpile
    { type: 'h', sprite: 'miner_bot', ink: 'cyan', bright: true, x: 23, y: 72, min: 20, max: 25, dir: 'left' },
    // a stick of dynamite hopping over the second crate
    { type: 'v', sprite: 'dynamite', ink: 'red', x: 10, y: 40, min: 40, max: 72, dy: 2, anim: 'fast' },
    // another hopping in the gap before the east door
    { type: 'v', sprite: 'dynamite', ink: 'magenta', x: 28, y: 80, min: 56, max: 80, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 10, y: 2, text: 'NO SMOKING', ink: 'red' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Stalactite Street [15,13] - difficulty 5. A dead-end cavern: entered from the Dynamite Depot at floor 11.
// Six narrow rock ledges (row 11) on thin stalagmite stems over a glowing pool. Stalactites drop fast through
// three of the gaps, a cave spider guards the middle ledge and a cave bat swoops across the eastern ledges.
// Items: a crystal hanging over the second gap (grab it in mid-leap) and one above the last ledge. Then come back.
JSW.defineRoom({
  id: 'stalactite_street',
  name: 'Stalactite Street',
  region: 'mines',
  pos: [15, 13],
  border: 'cyan',
  item: 'crystal',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'cyan', paper: 'blue' },
    'P': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    '~': { type: 'nasty', tile: 'acid', ink: 'green', paper: 'black', bright: true, flash: true },
  },
  map: [
    '################################',
    '################################',
    '#####..####..#..####....#..#####',
    '##......##.................#####',
    '##......##....................##',
    '##............................##',
    '##............................##',
    '..........+...................##',
    '............................+.##',
    '..............................##',
    '..............................##',
    '_____..___..___..___..___..___##',
    '##.P....P....P....P....P....P.##',
    '##.P....P....P....P....P....P.##',
    '##.P....P....P....P....P....P.##',
    '##~P~~~~P~~~~P~~~~P~~~~P~~~~P~##',
  ],
  guardians: [
    // stalactites breaking off and dropping through the gaps (fast)
    { type: 'v', sprite: 'stalactite', ink: 'white', x: 5, y: 24, min: 24, max: 96, dy: 3, anim: 'fast' },
    { type: 'v', sprite: 'stalactite', ink: 'cyan', x: 15, y: 60, min: 24, max: 96, dy: 4, anim: 'fast' },
    { type: 'v', sprite: 'stalactite', ink: 'yellow', x: 25, y: 96, min: 24, max: 96, dy: 3, anim: 'fast' },
    // a cave spider lowering itself onto the middle ledge
    { type: 'v', sprite: 'cave_spider', ink: 'magenta', x: 12, y: 24, min: 24, max: 64, dy: 1, anim: 'slow' },
    // a cave bat swooping down across the eastern ledges
    { type: 'd', sprite: 'cave_bat', ink: 'red', x: 128, y: 24, dx: 1, dy: 1, count: 40, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Glow-Worm Grotto [12,14] - difficulty 4. A dark cavern twinkling with glowworms; the west is solid rock.
// The grotto lift (cols 8-10) rides between the floor and the rock shelf (row 4, cols 4-7) under the Seam of
// Despair shaft: jump up from the shelf at cols 6-7 to reach the grating above; droppers from the seam land on
// the shelf and must wait for the lift. Glowworms crawl along the glowing ledges (rows 13, 11, 9) - hop over
// them - and a cave spider lowers itself over the middle ledge. Items: light bulbs at the ends of the ledges.
JSW.defineRoom({
  id: 'glow_worm_grotto',
  name: 'Glow-Worm Grotto',
  region: 'mines',
  pos: [12, 14],
  border: 'green',
  item: 'bulb',
  tiles: {
    '.': { type: 'air', tile: 'stars', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'magenta', paper: 'blue' },
    'L': { type: 'floor', tile: 'girder', ink: 'yellow', paper: 'black', bright: true },
    'S': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    'g': { type: 'floor', tile: 'rock_ledge', ink: 'green', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'cyan', paper: 'black', bright: true },
  },
  map: [
    '####....########################',
    '####....######......###.....####',
    '####.......##.................##',
    '####..........................##',
    '####SSSS......................##',
    '########......................##',
    '########......................##',
    '########......+...............##',
    '########......................##',
    '########.....ggggggg.......+..##',
    '########......................##',
    '########.............ggggggg....',
    '########........................',
    '########......gggggg............',
    '########........................',
    '########________________________',
  ],
  guardians: [
    // the grotto lift: floor 15 <-> the rock shelf (row 4)
    { type: 'lift', x: 8, width: 3, top: 4, bottom: 15, start: 15, period: 4, dir: 'down' },
    // glowworms crawling along the glowing ledges
    { type: 'd', sprite: 'glowworm', ink: 'green', x: 112, y: 88, dx: 1, dy: 0, count: 32, anim: 'slow' },
    { type: 'd', sprite: 'glowworm', ink: 'yellow', x: 208, y: 72, dx: -1, dy: 0, count: 40, anim: 'slow' },
    { type: 'd', sprite: 'glowworm', ink: 'cyan', x: 104, y: 56, dx: 1, dy: 0, count: 40, anim: 'slow' },
    // a cave spider lowering itself over the middle ledge
    { type: 'v', sprite: 'cave_spider', ink: 'magenta', x: 24, y: 16, min: 16, max: 64, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Hello? Hello? Hello? [13,14] - difficulty 3. The echo chamber: a domed cave built as two mirrored halves.
// Everything comes in mirrored pairs - two slimes by the doors, two cave bats crossing diagonally under the
// dome, even the writing on the walls. A great stalagmite in the middle must be climbed (steps at rows 13, 11,
// 9) and crossed; the item (a bell, naturally) sits on its tip.
JSW.defineRoom({
  id: 'echo_chamber',
  name: 'Hello? Hello? Hello?',
  region: 'mines',
  pos: [13, 14],
  border: 'yellow',
  item: 'bell',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'white', paper: 'magenta' },
    'M': { type: 'wall', tile: 'rock', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##########............##########',
    '#######..................#######',
    '#####......................#####',
    '####........................####',
    '###..........................###',
    '##............................##',
    '##.............+..............##',
    '##............................##',
    '##............MMMM............##',
    '##............MMMM............##',
    '............MMMMMMMM............',
    '............MMMMMMMM............',
    '..........MMMMMMMMMMMM..........',
    '..........MMMMMMMMMMMM..........',
    '________________________________',
  ],
  guardians: [
    // a pair of slimes, one by each door
    { type: 'h', sprite: 'slime', ink: 'green', bright: true, x: 4, y: 104, min: 4, max: 7, dir: 'right' },
    { type: 'h', sprite: 'slime', ink: 'green', bright: true, x: 26, y: 104, min: 23, max: 26, dir: 'left' },
    // a pair of cave bats crossing under the dome
    { type: 'd', sprite: 'cave_bat', ink: 'cyan', x: 72, y: 16, dx: 2, dy: 1, count: 48, anim: 'fast' },
    { type: 'd', sprite: 'cave_bat', ink: 'magenta', x: 168, y: 16, dx: -2, dy: 1, count: 48, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 5, y: 4, text: 'HELLO?', ink: 'cyan' }, { x: 21, y: 4, text: '?OLLEH', ink: 'magenta' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Ee By Gum Coal Face [14,14] - difficulty 4. The deepest working ("LUXURY!").
// The plank ramp from the Dynamite Depot comes down through the roof (rising right: ramp cells (28,0), (27,1) ...)
// in one long flight to the floor; beneath it the old winze has caved in - solid rock. At the west end a crusher
// pounds down out of its housing onto the coal truck, a miner-bot trundles between the truck and the foot of the
// ramp, and a cave spider dangles over the middle of the flight. Item: a cup of tea left above the coal truck.
JSW.defineRoom({
  id: 'ee_by_gum_coal_face',
  name: 'Ee By Gum Coal Face',
  region: 'mines',
  pos: [14, 14],
  border: 'magenta',
  item: 'cup',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'yellow', paper: 'red' },
    'K': { type: 'wall', tile: 'rock', ink: 'blue', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'blue', bright: true },
    'T': { type: 'wall', tile: 'rivets', ink: 'cyan', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    '#########################.../###',
    '##KKKCCCCKKKKKKKK........../####',
    '##KK.CCCCKKK............../#####',
    '##KK...................../######',
    '##KK..................../#######',
    '##KK.................../########',
    '##KK................../#########',
    '##KK................./##########',
    '##KK................/###########',
    '##KK..+............/############',
    '##................/#############',
    '................./##############',
    '................/###############',
    '.....TTTT....../################',
    '.....TTTT...../#################',
    '_______________#################',
  ],
  guardians: [
    // the crusher pounding down out of its housing onto the coal truck
    { type: 'v', sprite: 'crusher', ink: 'white', x: 6, y: 24, min: 24, max: 80, dy: 2, anim: 'slow' },
    // a miner-bot trundling between the truck and the foot of the ramp
    { type: 'h', sprite: 'miner_bot', ink: 'green', bright: true, x: 10, y: 104, min: 9, max: 12, dir: 'right' },
    // a cave spider dangling over the middle of the flight
    { type: 'v', sprite: 'cave_spider', ink: 'magenta', x: 20, y: 8, min: 8, max: 40, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 9, y: 4, text: 'LUXURY!', ink: 'cyan' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Back to Square One! - the ENDING room (off-grid, not playable). Wally wakes at the bottom of a mine he has
// never seen, standing on the floor under cols 15-16, and jumps on the spot in despair while the results roll.
// Above him every guardian he ever dodged is back on patrol (all paths clear of cols 14-17 below row 8).
JSW.defineRoom({
  id: 'the_nightmare',
  name: 'Back to Square One!',
  region: 'ending',
  border: 'red',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'skull_nasty', ink: 'red', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'girder', ink: 'magenta', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##............................##',
    '##............................##',
    '##............................##',
    '##==========........==========##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##.=======............=======.##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##=====..................=====##',
    '##............................##',
    '##............................##',
    '##____________________________##',
  ],
  guardians: [
    { type: 'h', sprite: 'butler', ink: 'white', bright: true, x: 4, y: 16, min: 2, max: 10, dir: 'right' },
    { type: 'h', sprite: 'knight', ink: 'yellow', bright: true, x: 26, y: 16, min: 20, max: 28, dir: 'left' },
    { type: 'h', sprite: 'shark', ink: 'cyan', bright: true, x: 5, y: 48, min: 3, max: 8, dir: 'left' },
    { type: 'h', sprite: 'alien_walker', ink: 'green', bright: true, x: 24, y: 48, min: 22, max: 27, dir: 'right' },
    { type: 'h', sprite: 'lawnmower', ink: 'red', bright: true, x: 3, y: 80, min: 2, max: 5, dir: 'right' },
    { type: 'h', sprite: 'penny_farthing', ink: 'magenta', bright: true, x: 27, y: 80, min: 25, max: 28, dir: 'left' },
    // hovering right over Wally's head (never below row 7)
    { type: 'v', sprite: 'ghost', ink: 'white', x: 15, y: 24, min: 8, max: 40, dy: 1, anim: 'slow' },
    { type: 'd', sprite: 'bat', ink: 'magenta', x: 24, y: 8, dx: 2, dy: 0, count: 92, anim: 'fast' },
  ],
  special: { nightmare: { x: 15, y: 104 } },
});
