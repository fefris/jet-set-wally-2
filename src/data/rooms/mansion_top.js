// Jet Set Wally II - mansion, top floor (grid row 8): Nursery .. Spare Room.
// Author file: src/data/rooms/mansion_top.js  (region 'mansion')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.

// ---------------------------------------------------------------------------------------------------------
// The Bathroom [10,8] - START ROOM and hub. Difficulty 1.
// Floor 15 from the west door to the toilet is the ending run line: flat, no walls/nasties/guardians in rows 13-14.
// First practice jumps: bath rim (row 13) -> basin shelf (row 11) -> toothbrush above the basin.
JSW.defineRoom({
  id: 'the_bathroom',
  name: 'The Bathroom',
  region: 'mansion',
  pos: [10, 8],
  border: 'cyan',
  item: 'toothbrush',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'bathroom_tiles', ink: 'cyan', paper: 'blue', bright: true },
    'M': { type: 'wall', tile: 'window', ink: 'white', paper: 'blue', bright: true },
    'm': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    'K': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'red', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'plank', ink: 'white', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '#........K.....................#',
    '#........K.....................#',
    '#..MMMM..K.....................#',
    '#..MMMM..K......mmmm...........#',
    '#..MMMM..K......mmmm...........#',
    '#..MMMM..K......mmmm......KKK..#',
    '#........K................KKK..#',
    '#.......KKK.................K..#',
    '#................+..........K..#',
    '#...........................K..#',
    '.......K........____............',
    '.......K........................',
    '.......----------------.........',
    '................................',
    '================================',
  ],
  guardians: [
    // rubber duck paddling along the west half of the bath rim; the east half (under the basin) stays duck-free
    { type: 'd', sprite: 'rubber_duck', ink: 'yellow', x: 64, y: 88, dx: 1, dy: 0, count: 32, anim: 'slow' },
    // soap bubble bobbing beside the basin: only a threat if you jump about up there
    { type: 'v', sprite: 'bubble', ink: 'cyan', x: 21, y: 16, min: 16, max: 64, dy: 1, anim: 'slow' },
  ],
  start: [5, 104],
  special: { toilet: { x: 26, y: 104 }, arrival: { x: 5, y: 104, facing: 'right' } },
});

// ---------------------------------------------------------------------------------------------------------
// Coats of Many Colours (walk-in wardrobe) [9,8] - difficulty 1. On the ending run: floor 15 is flat and clear
// from door to door (hat boxes are one-way shelves). Jackets hang from two rails; hat boxes (row 13) and the hat
// shelf (row 11) lead to the umbrella; every jump off the hat shelf lands safely on the wide hat-box row.
JSW.defineRoom({
  id: 'walk_in_wardrobe',
  name: 'Coats of Many Colours',
  region: 'mansion',
  pos: [9, 8],
  border: 'blue',
  item: 'umbrella',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'R': { type: 'wall', tile: 'hedge', ink: 'red', paper: 'black', bright: true },
    'G': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'Y': { type: 'wall', tile: 'hedge', ink: 'yellow', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'hedge', ink: 'cyan', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'deck', ink: 'yellow', paper: 'black' },
    '-': { type: 'floor', tile: 'pipe_h', ink: 'white', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'crate', ink: 'magenta', paper: 'black', bright: true },
    'h': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '#..............................#',
    '#.-----------......----------..#',
    '#.RR.GG.YY.CC......CC.RR.GG.Y..#',
    '#.RR.GG.YY.CC......CC.RR.GG.Y..#',
    '#.RR.GG.YY.CC......CC.RR.GG.Y..#',
    '#.RR.GG.YY.CC......CC.RR.GG....#',
    '#.RR.GG....CC.........RR.GG....#',
    '#....GG...............RR.......#',
    '#...............+..............#',
    '#..............................#',
    '..............hhhhh.............',
    '................................',
    '..........______________........',
    '................................',
    '================================',
  ],
  guardians: [
    // electric shaver buzzing up and down in the far corner, rows 2-8 only
    { type: 'v', sprite: 'shaver', ink: 'white', x: 29, y: 16, min: 16, max: 56, dy: 2, anim: 'fast' },
    // a clothes moth fluttering between the rails, high above the hat shelf
    { type: 'v', sprite: 'bat', ink: 'magenta', x: 16, y: 8, min: 8, max: 36, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Master Bedroom [8,8] - difficulty 2. Mrs Mop (special.housekeeper, static at cells 12-13 on floor 15) guards the
// four-poster bed (right conveyor, row 14 cols 2-11). Enter at floor 15 from the east; chest of drawers (row 13),
// tallboy shelf (row 11) and tallboy top (row 9) climb to the wardrobe-top shelf (row 7), which runs west to the high
// boudoir door - far too high to drop onto the bed. Floor 15 from the bed to the east door is the flat ending run line.
JSW.defineRoom({
  id: 'master_bedroom',
  name: 'Master Bedroom',
  region: 'mansion',
  pos: [8, 8],
  border: 'red',
  item: 'ring',
  tiles: {
    '.': { type: 'air', ink: 'magenta', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'H': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red', bright: true },
    'K': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'carpet', ink: 'magenta', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'plank', ink: 'cyan', paper: 'black', bright: true },
    'c': { type: 'floor', tile: 'rug', ink: 'red', paper: 'black', bright: true },
    '>': { type: 'conveyor', tile: 'rollers', ink: 'white', paper: 'red', bright: true, dir: 'right' },
  },
  map: [
    '################################',
    '#.........................KKKK.#',
    '#.........................KKKK.#',
    '#.........................K..K.#',
    '..........................K..K.#',
    '.........+................KKKK.#',
    '...............................#',
    '#-------------------...........#',
    '#..............................#',
    '#....................._____....#',
    '#ccccccccccc...................#',
    '#H................_____.........',
    '#H..............................',
    '#H.....................______...',
    '#H>>>>>>>>>>....................',
    '#===============================',
  ],
  guardians: [
    // the cat prowls the wardrobe top - jump it to reach the ring; the door end and the east end stay clear
    { type: 'h', sprite: 'cat', ink: 'white', x: 6, y: 40, min: 5, max: 14, dir: 'right' },
    // bedtime story: a book swoops from the ceiling down to just above the tallboy top
    { type: 'd', sprite: 'flying_book', ink: 'green', x: 136, y: 16, dx: 1, dy: 1, count: 40, anim: 'slow' },
    // the wall clock's pendulum (decorative - it swings inside the clock case)
    { type: 'v', sprite: 'pendulum', ink: 'yellow', x: 27, y: 24, min: 24, max: 24, dy: 0, anim: 'slow' },
  ],
  special: { housekeeper: { x: 12, y: 104 }, bed: true },
});

// ---------------------------------------------------------------------------------------------------------
// Hot Water Bottle Heaven (airing cupboard) [11,8] - difficulty 1. The first climb: a slatted bench (row 14) and
// full-width slatted shelves (rows 12, 10, 8, 6) inside the cupboard frame, each with a drop gap on alternate sides, so
// every jump lands safely on a shelf. The top shelf (row 4, cols 12-15) sits under the secret loft hatch (shaft to
// Granny's Old Tat). A toilet roll trundles along shelf 10, a spider dangles over shelf 6; hot water bottle on shelf 6.
JSW.defineRoom({
  id: 'the_airing_cupboard',
  name: 'Hot Water Bottle Heaven',
  region: 'mansion',
  pos: [11, 8],
  border: 'yellow',
  item: 'bottle',
  tiles: {
    '.': { type: 'air', ink: 'red', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'yellow' },
    'T': { type: 'wall', tile: 'rivets', ink: 'yellow', paper: 'red', bright: true },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    'A': { type: 'wall', tile: 'cloud_solid', ink: 'magenta', paper: 'white', bright: true },
    'B': { type: 'wall', tile: 'cloud_solid', ink: 'cyan', paper: 'white', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black' },
    '-': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    '############....################',
    '#.....#..................#..P..#',
    '#.....#..................#..P..#',
    '#.....#..................#.TTT.#',
    '#.....#.....----.........#.TTT.#',
    '#.....#..+...............#.TTT.#',
    '#.AAA.#----------------..#.TTT.#',
    '#.AAA.#..................#.TTT.#',
    '#.BBB.#........----------#.TTT.#',
    '#.BBB.#..................#.TTT.#',
    '#.....#----------------..#.....#',
    '......#..................#......',
    '.........----------------.......',
    '................................',
    '........----------------........',
    '================================',
  ],
  guardians: [
    // toilet roll trundling along the west half of shelf 10 (the shelf above is cut away there)
    { type: 'd', sprite: 'toilet_roll', ink: 'white', x: 56, y: 64, dx: 1, dy: 0, count: 48, anim: 'slow' },
    // spider dangling over shelf 6 between you and the item / the top shelf
    { type: 'v', sprite: 'spider', ink: 'magenta', x: 18, y: 8, min: 8, max: 28, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Stair Head Case (top of the grand staircase) [12,8] - difficulty 2. Floor 15 from the west door; the grand
// staircase sinks through the floor at cols 8-9 (walk right off the top step to go down to the Galleried Landing,
// jump the stairwell to carry on east). The folding loft ladder stops short of the floor: hop onto the step stool
// (row 13) and climb it through the ceiling at cols 25-26 into the attic. A butler patrols the landing, a ghost glides
// beneath the ladder; the item hangs above the newel post (row 10) - one good jump from the floor.
JSW.defineRoom({
  id: 'top_of_the_stairs',
  name: 'Stair Head Case',
  region: 'mansion',
  pos: [12, 8],
  border: 'magenta',
  item: 'candle',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'blue', bright: true },
    'P': { type: 'wall', tile: 'marble', ink: 'yellow', paper: 'magenta' },
    '|': { type: 'wall', tile: 'stripes_faint', ink: 'white', paper: 'black' },
    'C': { type: 'wall', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'carpet', ink: 'red', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'L': { type: 'ramp', tile: 'stairs', ink: 'red', paper: 'black', bright: true, dir: 'left' },   // rises left
    '/': { type: 'ramp', tile: 'rope_ladder', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    '#######################.../#####',
    '#......|................./.....#',
    '#......|................/......#',
    '#....CCCCC............./_____..#',
    '#.PPP................./........#',
    '#.PPP................/.........#',
    '#.PPP.............../..........#',
    '#.PPP............../...........#',
    '#................./............#',
    '#................/.............#',
    '#......+......../..............#',
    '.............../................',
    '............../.................',
    '..........____..................',
    '........L.......................',
    '=========L======================',
  ],
  guardians: [
    // the butler patrols the landing between the step stool and the east door
    { type: 'h', sprite: 'butler', ink: 'cyan', x: 20, y: 104, min: 15, max: 25, dir: 'left' },
    // a ghost glides along beneath the loft ladder - mind it when jumping the butler
    { type: 'd', sprite: 'ghost', ink: 'white', x: 192, y: 40, dx: -1, dy: 1, count: 40, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Spare Room? Spare Me! [13,8] - difficulty 2. Dead end east of the landing (west door at floor 15, every other edge
// solid). Junk nobody wants is piled against a wobbly wardrobe: steamer trunk (row 13), suitcase (11), tea chest (9)
// and hat box (7) make a five-step climb to the wardrobe top (row 5) where both items hide - one on top, one up
// by the ceiling (jump for it). The ghost of a forgotten guest hovers over the suitcase; a clockwork mouse runs the floor.
// Every step is solid, so a jump off any of them lands on the step below.
JSW.defineRoom({
  id: 'the_spare_room',
  name: 'Spare Room? Spare Me!',
  region: 'mansion',
  pos: [13, 8],
  border: 'green',
  item: 'spectacles',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'yellow', paper: 'blue' },
    'T': { type: 'wall', tile: 'rivets', ink: 'yellow', paper: 'red', bright: true },
    'S': { type: 'wall', tile: 'stone_block', ink: 'blue', paper: 'cyan', bright: true },
    'B': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'black', bright: true },
    'H': { type: 'wall', tile: 'metal_plate', ink: 'magenta', paper: 'white', bright: true },
    'W': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'yellow' },
    'L': { type: 'wall', tile: 'hedge', ink: 'white', paper: 'magenta' },
    'M': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    '|': { type: 'wall', tile: 'stripes_faint', ink: 'white', paper: 'black' },
    '=': { type: 'floor', tile: 'plank', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '#........|.....................#',
    '#.......LLL..................+.#',
    '#.......LLL....................#',
    '#.MMMM....................+....#',
    '#.MMMM...................WWWWWW#',
    '#.MMMM...................WWWWWW#',
    '#.MMMM................HHHWWWWWW#',
    '#.....................HHHWWWWWW#',
    '#..................BBBBBBWWWWWW#',
    '#..................BBBBBBWWWWWW#',
    '................SSSSSSSSSWWWWWW#',
    '................SSSSSSSSSWWWWWW#',
    '.............TTTTTTTTTTTTWWWWWW#',
    '.............TTTTTTTTTTTTWWWWWW#',
    '===============================#',
  ],
  guardians: [
    // clockwork mouse whirring along the floor between the door and the trunk
    { type: 'h', sprite: 'clockwork_mouse', ink: 'yellow', x: 6, y: 104, min: 4, max: 10, dir: 'right' },
    // the ghost of a forgotten guest hovering over the suitcase
    { type: 'v', sprite: 'ghost', ink: 'white', x: 17, y: 16, min: 16, max: 64, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Aunt Maud's Boudoir [7,8] - difficulty 2. West door at floor 15 (from the Nursery); a staircase rises right along the
// east wall to a row-7 landing and the high door (rows 4-6) into the Master Bedroom. The feather boa lies at the foot
// of the dressing-table mirror (row 11) while a candle flickers up and down in front of it; a ghost drifts diagonally
// down onto the middle of the stairs and Aunt Maud's pink poodle guards the foot of the staircase.
JSW.defineRoom({
  id: 'aunt_mauds_boudoir',
  name: "Aunt Maud's Boudoir",
  region: 'mansion',
  pos: [7, 8],
  border: 'green',
  item: 'feather',
  tiles: {
    '.': { type: 'air', ink: 'magenta', paper: 'black' },
    '#': { type: 'wall', tile: 'marble', ink: 'white', paper: 'magenta' },
    'U': { type: 'wall', tile: 'wood_panel', ink: 'magenta', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'hedge', ink: 'white', paper: 'black', bright: true },
    'M': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'carpet', ink: 'magenta', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    '################################',
    '#..............................#',
    '#.CCCCC........................#',
    '#.CCCCC........................#',
    '#.CCCCC.........................',
    '#.CCCCC.........................',
    '#...............................',
    '#.........................../==#',
    '#......MMMM................/UUU#',
    '#......MMMM.............../UUUU#',
    '#......MMMM............../UUUUU#',
    '............+.........../UUUUUU#',
    '......................./UUUUUUU#',
    '......_________......./UUUUUUUU#',
    '...................../UUUUUUUUU#',
    '======================UUUUUUUUU#',
  ],
  guardians: [
    // candle flickering in front of the mirror - wait until it rises to grab the feather
    { type: 'v', sprite: 'candle', ink: 'yellow', x: 12, y: 40, min: 40, max: 80, dy: 1, anim: 'fast' },
    // a ghost drifting diagonally down onto the middle of the staircase
    { type: 'd', sprite: 'ghost', ink: 'cyan', x: 120, y: 8, dx: 1, dy: 1, count: 56, anim: 'slow' },
    // Aunt Maud's pink poodle at the foot of the stairs
    { type: 'h', sprite: 'dog', ink: 'magenta', x: 17, y: 104, min: 15, max: 19, dir: 'left' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Rock-a-Bye Nursery [6,8] - difficulty 2. Floor 15 runs to the east door. In the west the servants' back stairs sink
// through the floor (cols 3-4): walk west and you climb the top two steps onto the little stair-head landing; walk
// east from there and down you go (jump the stairwell to stay in the nursery). A pyramid of building blocks (rows 13,
// 11, 9, 7) climbs to the toy-chest lid (row 5), which catches anyone dropping through the box-room trapdoor
// (cols 26-27); the same blocks lead safely back down, and every block juts out far enough to catch a jump from the
// one above. The teddy hangs from the ceiling mobile - jump for it from the yellow blocks. A toy soldier marches under
// the chest, a jack-in-the-box bobs beside the blocks and a balloon drifts about the middle.
JSW.defineRoom({
  id: 'nursery',
  name: 'Rock-a-Bye Nursery',
  region: 'mansion',
  pos: [6, 8],
  border: 'magenta',
  item: 'teddy',
  tiles: {
    '.': { type: 'air', tile: 'dots_wallpaper', ink: 'magenta', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'magenta', paper: 'white' },
    'M': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'blue', bright: true },
    'B': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red', bright: true },
    '|': { type: 'wall', tile: 'stripes_faint', ink: 'white', paper: 'black' },
    '=': { type: 'floor', tile: 'rug', ink: 'green', paper: 'black', bright: true },
    'T': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'red', bright: true },
    'R': { type: 'floor', tile: 'crate', ink: 'red', paper: 'black', bright: true },
    'G': { type: 'floor', tile: 'crate', ink: 'green', paper: 'black', bright: true },
    'Y': { type: 'floor', tile: 'crate', ink: 'yellow', paper: 'black', bright: true },
    'C': { type: 'floor', tile: 'crate', ink: 'cyan', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'chain_h', ink: 'white', paper: 'black', bright: true },
    'L': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'left' },   // rises left
  },
  map: [
    '##########################..####',
    '#................|.............#',
    '#.............-------..........#',
    '#.MMMM...........|.............#',
    '#.MMMM...........+.............#',
    '#.MMMM.................TTTTTTTT#',
    '#.MMMM..................BBBBBBB#',
    '#..................CCCCCBBBBBBB#',
    '#.......................BBBBBBB#',
    '#..............YYYYYYYYYBBBBBBB#',
    '#..............................#',
    '#..........GGGGGGGGGGGGG........',
    '#...............................',
    '#......RRRRRRRRRRRRRRRRR........',
    '#==L............................',
    '####L===========================',
  ],
  guardians: [
    // toy soldier marching on the floor under the toy chest (clear of the east door)
    { type: 'h', sprite: 'toy_soldier', ink: 'red', x: 25, y: 104, min: 24, max: 26, dir: 'right' },
    // jack-in-the-box bobbing beside the blocks: time your walk past it on the red blocks
    { type: 'v', sprite: 'jack_in_box', ink: 'yellow', x: 8, y: 40, min: 40, max: 80, dy: 2, anim: 'fast' },
    // a runaway balloon drifting up towards the mobile, across the green blocks
    { type: 'd', sprite: 'balloon', ink: 'cyan', x: 64, y: 72, dx: 1, dy: -1, count: 40, anim: 'slow' },
  ],
});
