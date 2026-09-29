// Jet Set Wally II - the grounds: terrace, drive, gatehouse, village green, riverbank, bridge, far bank, corner shop,
// the sunken garden and the towpath under the bridge.
// Author file: src/data/rooms/grounds_village.js  (region 'grounds')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.

// ---------------------------------------------------------------------------------------------------------
// Roses Are Red [14,9] - difficulty 2. West: French windows from the Trophy Room (floor 15). East: a doorway in the
// gatehouse flank (rows 8-11, floor 12) onto the battlements. The terrace steps (stairs rising right, cols 25-26)
// climb out of the Gravel Rash Drive below; the stairwell beside them (cols 23-24) drops back down onto those steps,
// and a garden bench straddles it so you can walk onto the flight from the terrace. Trellis arches 13 / 11 / 9 lead
// up to the flower, past a climbing rose on the top trellis. Two bees and a snail.
JSW.defineRoom({
  id: 'the_rose_terrace',
  name: 'Roses Are Red',
  region: 'grounds',
  pos: [14, 9],
  border: 'red',
  item: 'flower',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    'M': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black', bright: true },
    'T': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true },
    'b': { type: 'floor', tile: 'plank', ink: 'cyan', paper: 'black', bright: true },
    '^': { type: 'nasty', tile: 'thorns', ink: 'red', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'MM............................SS',
    'MM............................SS',
    'MM............................SS',
    'MM............................SS',
    'MM............................SS',
    'MM............................SS',
    'MM............................SS',
    'MM................+...........SS',
    'MM............^.................',
    'MM.........TTTTTTTTT............',
    'MM..............................',
    '.......TTTTT....................',
    '............................/===',
    '...TTTTT.............bbbb../..SS',
    '..............^^...^^...../...SS',
    'M======================../.SSSSS',
  ],
  guardians: [
    // a bee patrolling the top trellis: it dives at the flower just as you hop the climbing rose
    { type: 'd', sprite: 'bee', ink: 'yellow', x: 160, y: 8, dx: -1, dy: 1, count: 40, anim: 'fast' },
    // a second bee over the bench and the terrace steps
    { type: 'd', sprite: 'bee', ink: 'cyan', x: 176, y: 16, dx: 1, dy: 1, count: 40, anim: 'fast' },
    // a snail sliding between the trellis foot and the first rose bush
    { type: 'h', sprite: 'snail', ink: 'magenta', bright: true, x: 9, y: 104, min: 8, max: 11, dir: 'right' },
  ],
  special: {
    signs: [{ x: 5, y: 2, text: 'DO NOT PICK THE ROSES', ink: 'red' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Gatehouse Battlements [15,9] - difficulty 3. The murder hole (cols 4-7) opens onto a one-way trapdoor in the
// roof walk; a short flight rises west to the turret door (rows 8-11, floor 12) back to the Rose Terrace.
// Merlons to hop, a toy-soldier sentry marching between them, an owl above the first merlon, and a pigeon
// swooping at the pennant, which flies at half mast (row 10) beside the flagpole: jump for it from the walk.
JSW.defineRoom({
  id: 'gatehouse_battlements',
  name: 'Gatehouse Battlements',
  region: 'grounds',
  pos: [15, 9],
  border: 'blue',
  item: 'bell',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'm': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'blue', bright: true },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'SSS.........................S.SS',
    'SSS.........................S.SS',
    'SSS.........................SSSS',
    'SSS.........................SSSS',
    'SSS........................PSSSS',
    'SSS........................PSSSS',
    'SSS........................PSSSS',
    'SSS........................PSSSS',
    '...........................PSSSS',
    '...........................PSSSS',
    '.........................+.PSSSS',
    '...........................PSSSS',
    '=\\.........................PSSSS',
    'S.\\.......mm........mm.....PSSSS',
    'S..\\......mm........mm.....PSSSS',
    'SSSS----SSSSSSSSSSSSSSSSSSSSSSSS',
  ],
  guardians: [
    // the sentry: marches the walk between the two merlons
    { type: 'h', sprite: 'toy_soldier', ink: 'red', bright: true, x: 15, y: 104, min: 12, max: 18, dir: 'right' },
    // an owl bobbing over the first merlon
    { type: 'v', sprite: 'owl', ink: 'cyan', x: 10, y: 24, min: 24, max: 72, dy: 1, anim: 'slow' },
    // the pigeon: swoops down onto the pennant and back up
    { type: 'd', sprite: 'bird', ink: 'magenta', x: 152, y: 24, dx: 1, dy: 1, count: 48, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 16, y: 2, text: 'HALF-MAST', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Gravel Rash Drive [14,10] - difficulty 2. The front door (west, rows 10-14) opens onto the gravel; a gold Rolls
// is parked across the drive (boot 13, roof 11, bonnet 13) with the spanner on its roof. From the roof, jump to
// the landing (row 9) at the foot of the terrace steps, which climb out of the ceiling at cols 25-26. Right in
// front of the bonnet is the ha-ha (cols 18-19): jump it, or fall into the Sunken Garden (one way). A lawnmower
// by the house, a gardener raking the gravel by the gatehouse, and a butterfly over the car roof.
JSW.defineRoom({
  id: 'the_gravel_drive',
  name: 'Gravel Rash Drive',
  region: 'grounds',
  pos: [14, 10],
  border: 'yellow',
  item: 'spanner',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    'R': { type: 'wall', tile: 'brick', ink: 'red', paper: 'white', bright: true },
    'E': { type: 'wall', tile: 'marble', ink: 'white', paper: 'cyan' },
    'H': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'G': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'T': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'C': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'black', bright: true },
    'w': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue', bright: true },
    'o': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'black', bright: true },
    'L': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'sand_top', ink: 'yellow', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'RRTTTTTTTTTTTTTTTTTTTTT.../TTTGG',
    'RR......................./....GG',
    'EE....................../.....GG',
    'HH...................../......GG',
    'HH..................../.......GG',
    'HH.................../........GG',
    'HH................../.........GG',
    'HH................./..........GG',
    'HH................/...........GG',
    'HH............+.LLL...........GG',
    '..............................GG',
    '............CCCC................',
    '............CwwC................',
    '..........CCCCCCCC..............',
    '..........CoCCCCoC..............',
    '==================..============',
  ],
  guardians: [
    // the lawnmower, trundling up and down by the front door
    { type: 'h', sprite: 'lawnmower', ink: 'green', bright: true, x: 5, y: 104, min: 4, max: 6, dir: 'right' },
    // the gardener, raking the gravel in front of the gatehouse
    { type: 'h', sprite: 'gardener', ink: 'cyan', bright: true, x: 25, y: 104, min: 23, max: 27, dir: 'left' },
    // a butterfly fluttering over the car roof and the spanner
    { type: 'v', sprite: 'butterfly', ink: 'magenta', x: 14, y: 16, min: 16, max: 64, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 16, y: 11, text: 'MIND THE HA-HA', ink: 'white' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Who Goes There? [15,10] - difficulty 2. The road runs through the gatehouse (floor 15, doors both sides). West:
// the gatekeeper's hut - a ladder of plank ledges every 2 rows up to the lookout (row 3) under the murder hole
// (cols 4-7): jump up through it onto the battlements (one way). East: the great arch, whose stepped back climbs
// to the keystone with the key above it. A guard dog patrols under the arch; a spider dangles over the arch steps.
JSW.defineRoom({
  id: 'the_gatehouse',
  name: 'Who Goes There?',
  region: 'grounds',
  pos: [15, 10],
  border: 'magenta',
  item: 'key',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'G': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'A': { type: 'wall', tile: 'stone_block', ink: 'yellow', paper: 'red' },
    'K': { type: 'wall', tile: 'marble', ink: 'white', paper: 'magenta', bright: true },
    '-': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'GGGG....GGGGGGGGGGGGGGGGGGGGGGGG',
    'G..............................G',
    'G...................+..........G',
    'G..------......................G',
    'G.............../AAKKAA\\.......G',
    'G.------......./AAAAAAAA\\......G',
    'G............./AA......AA\\.....G',
    'G....------../AA........AA\\....G',
    'G.........../AA..........AA\\...G',
    'G.------...AAA............AAAAAA',
    'G..............................G',
    '.....------.....................',
    '................................',
    '..------........................',
    '................................',
    '================================',
  ],
  guardians: [
    // the guard dog, pacing under the arch
    { type: 'h', sprite: 'dog', ink: 'yellow', bright: true, x: 19, y: 104, min: 15, max: 22, dir: 'left' },
    // a spider dangling over the arch steps
    { type: 'v', sprite: 'spider', ink: 'white', x: 14, y: 8, min: 8, max: 24, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 16, y: 1, text: 'WHO GOES THERE?', ink: 'cyan' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Howzat! The Village Green [16,10] - difficulty 2. Just outside the gates: cricket on the west half, a duck pond
// (cols 12-19) too wide to jump in the middle. Cross it on the scoreboard: bottom beams (row 13) either side, the
// middle beam (row 11) and the top (row 9) with the trophy above it (row 7). A cricket ball rolls about the
// wicket, the village dog runs up and down the east bank, and a butterfly flits by the east end of the board.
JSW.defineRoom({
  id: 'the_village_green',
  name: 'Howzat! The Village Green',
  region: 'grounds',
  pos: [16, 10],
  border: 'green',
  item: 'trophy',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    'G': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    '=': { type: 'floor', tile: 'grass_top', ink: 'green', paper: 'black', bright: true },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    '#': { type: 'wall', tile: 'earth', ink: 'green', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'plank', ink: 'white', paper: 'black', bright: true },
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
  },
  map: [
    'G.............................HH',
    'G.............................HH',
    'G.............................HH',
    'G.............................HH',
    'G.............................HH',
    'G.............................HH',
    'G.............................HH',
    'G...............+.............HH',
    'G.............................HH',
    'G.............----............HH',
    'G.............................HH',
    '.............------.............',
    '................................',
    '..........----....----..........',
    '................................',
    '============~~~~~~~~==========##',
  ],
  guardians: [
    // the cricket ball, rolling about the wicket
    { type: 'h', sprite: 'beach_ball', ink: 'red', bright: true, x: 5, y: 104, min: 3, max: 7, dir: 'right' },
    // the village dog, charging up and down the east bank after it
    { type: 'h', sprite: 'dog', ink: 'white', bright: true, x: 26, y: 104, min: 24, max: 27, dir: 'left' },
    // a butterfly by the east end of the scoreboard
    { type: 'v', sprite: 'butterfly', ink: 'yellow', x: 18, y: 16, min: 16, max: 64, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [
      { x: 3, y: 3, text: 'HOWZAT!', ink: 'yellow' },
      { x: 14, y: 10, text: 'WALLY 0', ink: 'white' },
      { x: 14, y: 12, text: 'NOT OUT', ink: 'white' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Reedy Steady Go [18,10] - difficulty 3. A weeping willow by the river's source: roots (13, 11) lead up to the
// branch (9) with the feather at its tip. Among the grass the old garden well: winch-rope arrival on floor 15 at
// cols 14-15, the well mouth a gap at cols 16-17 (drops onto the well-head ledge in Drop Me a Line). East: reeds
// to jump, then a grassy step up onto the bridge abutment (floor 14) and the door onto Humpback Bridge.
// A frog hops under the willow, a heron stabs down at the reeds, and a caterpillar dangles over the branch.
JSW.defineRoom({
  id: 'the_riverbank',
  name: 'Reedy Steady Go',
  region: 'grounds',
  pos: [18, 10],
  border: 'cyan',
  item: 'feather',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    'L': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'black' },
    '-': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'grass_top', ink: 'green', paper: 'black', bright: true },
    'r': { type: 'nasty', tile: 'nettle', ink: 'green', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_grass', ink: 'green', paper: 'black', bright: true, dir: 'right' },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'E': { type: 'wall', tile: 'earth', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    'LL..............................',
    'LL.LLLLLLL......................',
    'LLLLLLLLLLLL....................',
    'LLLLLLLLLLLL....................',
    'LLL.LBB.........................',
    'LL...BB.........................',
    'LL...BB.........................',
    'LL...BB.....+...................',
    'LL...BB.........................',
    'LL...BB------...................',
    'LL...BB.........................',
    '.....BB..------.................',
    '.....BB.........................',
    '.......----.....................',
    '.......................rr../SSSS',
    'EE==============..==========SSSS',
  ],
  guardians: [
    // a frog hopping about under the willow
    { type: 'h', sprite: 'frog', ink: 'green', bright: true, x: 4, y: 104, min: 3, max: 5, dir: 'right' },
    // the heron: stabs down past the reeds onto the grassy step
    { type: 'd', sprite: 'bird', ink: 'white', x: 176, y: 32, dx: 1, dy: 2, count: 32, anim: 'slow' },
    // a caterpillar dangling from the willow past the branch
    { type: 'v', sprite: 'caterpillar', ink: 'white', x: 10, y: 32, min: 32, max: 56, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 13, y: 12, text: 'DANGER - WELL', ink: 'red' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Humpback Bridge [19,10] - difficulty 3. Stone ramps climb from both abutments (floor 14) to the crown deck
// (row 9) with one plank missing (cols 12-13). Jump the gap and then jump the penny-farthing to grab the umbrella
// floating over the crown. Fall through the gap onto the towpath ledges under the arch (11, 13), step down to the
// towpath (floor 15, cols 14-15) where the bargee's rope arrives; beside it the drop (cols 16-17) to the water
// below. Back up: ledge 13 -> ledge 11 -> a sideways leap through the plank gap onto the deck. A seagull swoops
// at the gap and a balloon bobs over the west ramp.
JSW.defineRoom({
  id: 'humpback_bridge',
  name: 'Humpback Bridge',
  region: 'grounds',
  pos: [19, 10],
  border: 'magenta',
  item: 'umbrella',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'D': { type: 'wall', tile: 'deck', ink: 'yellow', paper: 'red' },
    '-': { type: 'floor', tile: 'rock_ledge', ink: 'cyan', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'white', paper: 'black', bright: true, dir: 'right' },
    '\\': { type: 'ramp', tile: 'slope_rock', ink: 'white', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..................+.............',
    '................................',
    '................................',
    '................................',
    '......../DDD..DDDDDDDDD\\........',
    '......./SSS......SSSSSSS\\.......',
    '....../SSS........SSSSSSS\\......',
    '...../SSSS........SSSSSSSS\\.....',
    '..../SSSSS----....SSSSSSSSS\\....',
    'SSSSSSSSSS........SSSSSSSSSSSSSS',
    'SSSSSSSSSSSSSS==..SSSSSSSSSSSSSS',
  ],
  guardians: [
    // the penny-farthing rider, pedalling to and fro across the crown
    { type: 'h', sprite: 'penny_farthing', ink: 'cyan', bright: true, x: 19, y: 56, min: 17, max: 20, dir: 'left' },
    // a seagull swooping down at the far side of the plank gap
    { type: 'd', sprite: 'seagull', ink: 'white', x: 72, y: 16, dx: 1, dy: 1, count: 40, anim: 'fast' },
    // a runaway balloon bobbing over the west ramp
    { type: 'v', sprite: 'balloon', ink: 'red', x: 5, y: 16, min: 16, max: 72, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Allotment of Trouble [20,10] - difficulty 3. Off the bridge abutment (floor 14) onto the allotment; a hedgehog
// guards the patch in front of the water butt. Over the butt (13), up the shed eaves (11) and a sideways hop onto
// the tin roof (9) for the carrot - a bee circles it and a watering can bobs by the eaves. The scarecrow on the roof
// stops you stepping off the east end. The path runs through the open shed, over the nettles and into the shop.
JSW.defineRoom({
  id: 'the_far_bank',
  name: 'Allotment of Trouble',
  region: 'grounds',
  pos: [20, 10],
  border: 'yellow',
  item: 'carrot',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'E': { type: 'wall', tile: 'earth', ink: 'yellow', paper: 'red' },
    'X': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'R': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'red', bright: true },
    'H': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'black', bright: true },
    'U': { type: 'wall', tile: 'rivets', ink: 'green', paper: 'black', bright: true },
    'h': { type: 'wall', tile: 'sandstone', ink: 'yellow', paper: 'black', bright: true },
    'p': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'black' },
    'a': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'n': { type: 'nasty', tile: 'nettle', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    '..............................XX',
    '..............................XX',
    '..............................XX',
    '..............................XX',
    '..............................XX',
    '........................h.....XX',
    '.......................apa....XX',
    '....................+...p.....XX',
    '........................p.....XX',
    '...............RRRRRRRRRR.....XX',
    '................HHHHHHHH......XX',
    '............---.H......H........',
    '................H......H........',
    '...........UU...................',
    'SSSS.......UU.............nn....',
    'SSSSEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
  ],
  guardians: [
    // the hedgehog, snuffling about in front of the water butt
    { type: 'h', sprite: 'hedgehog', ink: 'yellow', bright: true, x: 6, y: 104, min: 5, max: 7, dir: 'right' },
    // a watering can bobbing beside the eaves
    { type: 'v', sprite: 'watering_can', ink: 'cyan', x: 13, y: 16, min: 16, max: 72, dy: 2, anim: 'slow' },
    // a bee circling the carrot on the shed roof
    { type: 'd', sprite: 'bee', ink: 'yellow', x: 128, y: 16, dx: 1, dy: 1, count: 32, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 3, y: 2, text: 'PLOT 13', ink: 'white' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Open All Hours (Mostly) [21,10] - difficulty 2. The corner shop. The promenade steps come up through the floor
// from the pier (rising left: ramp cells (9,15), (8,14), ...) to the stockroom shelf (row 11, cols 3-4) over the
// front door; step off its west end to drop back to the doormat. From the doormat, jump the stairwell (or walk
// into it and down to the pier). The counter (13) with its spring-loaded till drawer, then the sweet-jar shelves
// (11, 9, 7) with the cherry in the top jar; a runaway trolley rattles about in front of the back door.
JSW.defineRoom({
  id: 'open_all_hours',
  name: 'Open All Hours (Mostly)',
  region: 'grounds',
  pos: [21, 10],
  border: 'red',
  item: 'cherry',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    'X': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'C': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'cyan', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    'X..............................X',
    'X..............................X',
    'X..............................X',
    'X..............................X',
    'X...........................+..X',
    'X..............................X',
    'X.........................----.X',
    'X..............................X',
    'X.......................-----..X',
    'X..............................X',
    '...--\\...............-----......',
    '......\\.........................',
    '.......\\........CCCC............',
    '........\\.......CCCC............',
    'X========\\======================',
  ],
  guardians: [
    // the till drawer, springing open and shut over the counter
    { type: 'v', sprite: 'spring', ink: 'magenta', x: 17, y: 56, min: 56, max: 88, dy: 2, anim: 'fast' },
    // a runaway trolley in front of the back door
    { type: 'h', sprite: 'trolley', ink: 'white', bright: true, x: 24, y: 104, min: 22, max: 27, dir: 'right' },
  ],
  special: {
    signs: [
      { x: 17, y: 3, text: 'PENNY SWEETS', ink: 'magenta' },
      { x: 7, y: 10, text: 'PIER STEPS', ink: 'cyan' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Ha-Ha! The Sunken Garden [14,11] - difficulty 2. Fall in from the drive (cols 18-19) onto the clipped hedge
// (row 4) - a topiary peacock stops you walking off its east end - then down the stone steps (8, 11) to the lawn.
// A lost ring glints over the fountain basin: jump the water from the west rim to the stone plinth east of it
// while a gnome bobs over the spout. A hedgehog patrols the lawn and a second gnome guards the way out: the west door into
// the Coal Hole. The east side is the sheer ha-ha wall; the floor is solid (sealed against Knuckle Bone Alley).
JSW.defineRoom({
  id: 'ha_ha_the_sunken_garden',
  name: 'Ha-Ha! The Sunken Garden',
  region: 'grounds',
  pos: [14, 11],
  border: 'green',
  item: 'ring',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    'E': { type: 'wall', tile: 'earth', ink: 'yellow', paper: 'red' },
    'W': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'grass_top', ink: 'green', paper: 'black', bright: true },
    'R': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'blue', bright: true },
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
  },
  map: [
    'EEEEEEEEEEEEEEEEEE..EEEEEEEEEEEE',
    'W.....................HH......WW',
    'W.....................HH......WW',
    'W.....................H.......WW',
    'W................HHHHH........WW',
    'W................HHHHH........WW',
    'W................HHHHH........WW',
    'W................HHHHH........WW',
    'W...........-----HHHHH........WW',
    'W.............................WW',
    'W.............................WW',
    '.......----...................WW',
    '.......................+......WW',
    '..............................WW',
    '......................R~~RRRRRWW',
    '==============================WW',
  ],
  guardians: [
    // a gnome bobbing over the fountain like a spout
    { type: 'v', sprite: 'gnome', ink: 'red', x: 23, y: 48, min: 48, max: 80, dy: 1, anim: 'slow' },
    // a second gnome guarding the way out to the Coal Hole
    { type: 'v', sprite: 'gnome', ink: 'cyan', x: 2, y: 72, min: 72, max: 104, dy: 1, anim: 'slow' },
    // a hedgehog on the lawn
    { type: 'h', sprite: 'hedgehog', ink: 'yellow', bright: true, x: 12, y: 104, min: 9, max: 15, dir: 'right' },
  ],
  special: {
    signs: [{ x: 3, y: 2, text: 'HA-HA!', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Troll Toll Towpath [19,11] - difficulty 4. Beneath the humpback arch. Drop in through the missing plank onto
// the ledge at row 4 (cols 16-19) beside the bargee's rope (x=15), then step down (7, 10) to the towpath (floor
// 13) and the east door to the beach. The river (rows 14-15) runs under the arch: three bobbing stepping stones
// (lifts, cycles locked to the rope's 90-frame swing, none under the drop) and the bargee's mooring stone under
// the rope (row 11) lead west to the two coins of the toll, past two leaping fish and a gull. Grab the rope from
// the mooring stone (or swing to it from the towpath end) to climb back up to the bridge. A trolley drifts along
// the towpath. West wall sealed (the well is behind it).
JSW.defineRoom({
  id: 'under_the_bridge',
  name: 'Troll Toll Towpath',
  region: 'grounds',
  pos: [19, 11],
  border: 'blue',
  item: 'coin',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    '-': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black', bright: true },
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
    'o': { type: 'floor', tile: 'rock_ledge', ink: 'green', paper: 'black', bright: true },   // mooring stone
  },
  map: [
    'SSSSSSSSSSSSSS....SSSSSSSSSSSSSS',
    'SSSSS.....................SSSSSS',
    'SSS.........................SSSS',
    'SS............................SS',
    'S...............----..........SS',
    'S.............................SS',
    'S.............................SS',
    'S.+.................----......SS',
    'S.......+.....................SS',
    'S.............................SS',
    'S.......................----....',
    'S............ooo................',
    'S...............................',
    'S......................=========',
    'S~~~~~~~~~~~~~~~~~~~~~~SSSSSSSSS',
    'S~~~~~~~~~~~~~~~~~~~~~~SSSSSSSSS',
  ],
  guardians: [
    { type: 'rope', x: 15, length: 32 },
    // stepping stones bobbing in the river (never under the drop at cols 16-17; cycles divide the rope's 90 frames)
    { type: 'lift', x: 19, width: 3, top: 10, bottom: 13, start: 12, period: 15, dir: 'up' },
    { type: 'lift', x: 7, width: 3, top: 10, bottom: 13, start: 11, period: 5, dir: 'down' },
    { type: 'lift', x: 1, width: 3, top: 9, bottom: 12, start: 11, period: 5, dir: 'down' },
    // two fish leaping between the stones
    { type: 'v', sprite: 'fish', ink: 'red', x: 11, y: 96, min: 64, max: 96, dy: 2, anim: 'fast' },
    { type: 'v', sprite: 'fish', ink: 'yellow', x: 4, y: 72, min: 64, max: 96, dy: 3, anim: 'fast' },
    // a shopping trolley drifting along the towpath
    { type: 'h', sprite: 'trolley', ink: 'white', bright: true, x: 24, y: 88, min: 23, max: 26, dir: 'left' },
    // a gull wheeling under the arch
    { type: 'd', sprite: 'seagull', ink: 'magenta', x: 32, y: 24, dx: 1, dy: 1, count: 32, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 6, y: 2, text: 'TOLL: 2 COINS', ink: 'yellow' }],
  },
});
