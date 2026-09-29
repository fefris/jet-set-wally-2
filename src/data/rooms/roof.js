// Jet Set Wally II - roof & attic (attic = grid row 7, roof = grid row 6).
// Author file: src/data/rooms/roof.js  (region 'roof')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.
// The west attic (Box Room .. Tank Top) is only reachable over the roof (skylight in the Sooty Chimney Stacks);
// the east attic (Rafters .. Pigeon Loft) hangs off the mansion by the loft ladder and the secret loft hatch.

// ---------------------------------------------------------------------------------------------------------
// Boxing Clever (the box room) [6,7] - difficulty 3. Far west gable of the attic. Enter at floor 15 from the east and
// hop the chalked trapdoor (cols 26-27: a one-way drop onto the Nursery toy chest - the quick way home). Tea chests
// are stacked to the rafters: low chest (13) -> middle chest (11) -> the long chest pile (9), where a clockwork mouse
// runs up and down -> the hat chest (7) -> a leap across the spider's gap onto the top chest (5) and the teacup.
// A jack-in-the-box bobs over the middle chest. Every missed jump lands on a chest one step down.
JSW.defineRoom({
  id: 'the_box_room',
  name: 'Boxing Clever',
  region: 'roof',
  pos: [6, 7],
  border: 'yellow',
  item: 'cup',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'W': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue', bright: true },
    'Y': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'black', bright: true },
    'R': { type: 'wall', tile: 'crate', ink: 'red', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'crate', ink: 'cyan', paper: 'black', bright: true },
    'G': { type: 'wall', tile: 'crate', ink: 'green', paper: 'black', bright: true },
    'M': { type: 'wall', tile: 'crate', ink: 'magenta', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black' },
  },
  map: [
    '################################',
    '#..............................#',
    '#.........................WWW..#',
    '#.+.......................WWW..#',
    '#..............................#',
    '#YYYY..........................#',
    '#YYYY..........................#',
    '#RRRR...CCCC...................#',
    '#RRRR...CCCC...................#',
    '#GGGGYYYYRRRRGGGGMMM...........#',
    '#GGGGYYYYRRRRGGGGMMM...........#',
    '#YYYYCCCCMMMMYYYYRRRGGG.........',
    '#YYYYCCCCMMMMYYYYRRRGGG.........',
    '#MMMMGGGGYYYYCCCCGGGYYYRRR......',
    '#MMMMGGGGYYYYCCCCGGGYYYRRR......',
    '#=========================..====',
  ],
  guardians: [
    // clockwork mouse whirring along the long chest pile - jump it on the way west
    { type: 'h', sprite: 'clockwork_mouse', ink: 'white', x: 13, y: 56, min: 12, max: 14, dir: 'right' },
    // spider on a thread in the gap between the hat chest and the top chest
    { type: 'v', sprite: 'spider', ink: 'magenta', x: 5, y: 8, min: 8, max: 40, dy: 1, anim: 'slow' },
    // jack-in-the-box springing up over the middle chest
    { type: 'v', sprite: 'jack_in_box', ink: 'green', x: 20, y: 32, min: 32, max: 64, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 23, y: 10, text: 'KIDS', ink: 'white' }, { x: 23, y: 11, text: 'KEEP OUT', ink: 'white' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Mothball Alley [7,7] - difficulty 3. Dust-sheeted junk under the skylight. Droppers from the Sooty Chimney Stacks
// land on the sheeted wardrobe (row 4, cols 12-15), which is also the jump-off back up through the skylight. A zigzag
// of dust-sheeted furniture (trunk 13, then sheets at 11, 9, 7, 5) links the wardrobe to the floor; the wardrobe
// stands on tall legs so the floor corridor runs beneath it between the two doors. Walk off the wardrobe's west side
// onto the rail of moth-eaten furs (a safe balcony). A rat patrols under the furs; moths flutter over the east end.
JSW.defineRoom({
  id: 'mothball_alley',
  name: 'Mothball Alley',
  region: 'roof',
  pos: [7, 7],
  border: 'magenta',
  item: 'sock',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'magenta', paper: 'black', bright: true },
    'S': { type: 'wall', tile: 'cloud_solid', ink: 'white', paper: 'black', bright: true },
    'W': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'F': { type: 'wall', tile: 'hedge', ink: 'yellow', paper: 'red' },
    'A': { type: 'wall', tile: 'cloud_solid', ink: 'white', paper: 'blue', bright: true },
    '-': { type: 'floor', tile: 'pipe_h', ink: 'white', paper: 'black', bright: true },
    'o': { type: 'floor', tile: 'cloud', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black' },
  },
  map: [
    '############....################',
    '#..............................#',
    '#..............................#',
    '#..............+...............#',
    '#...........SSSS...............#',
    '#.---------.WWWW.ooooo.........#',
    '#.FF.FF.FF..WWWW...............#',
    '#.FF.FF.FF..WWWW.......ooooo...#',
    '#.FF.FF.FF..WWWW...............#',
    '#.FF.FF.FF..WWWW.ooooo.........#',
    '#...........WWWW...............#',
    '............WWWW......ooooo.....',
    '................................',
    '..................AAAA..........',
    '..................AAAA..........',
    '================================',
  ],
  guardians: [
    // a rat scurrying under the fur coats
    { type: 'h', sprite: 'rat', ink: 'yellow', x: 6, y: 104, min: 4, max: 9, dir: 'right' },
    // a big moth fluttering up and down beside the east door
    { type: 'v', sprite: 'butterfly', ink: 'green', x: 28, y: 8, min: 8, max: 104, dy: 2, anim: 'fast' },
    // another moth zig-zagging over the top sheets
    { type: 'd', sprite: 'butterfly', ink: 'magenta', x: 176, y: 8, dx: 1, dy: 1, count: 24, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Dad's Model Railway [8,7] - difficulty 3. Trestle tables of model railway. The low table (row 13) by the west door
// is the way up onto the high table, whose running track (row 11) is a right-moving conveyor through a tunnel under
// a papier-mache hill - once you are on the rails you go where the trains go (step on already walking left to ride
// against them). A clockwork mouse runs the rails before the tunnel (jump it), the first item waits in the tunnel
// mouth, the signal-box roof (row 9) is the step up onto the hill shoulder (7), peak (6) and the second item. A toy
// soldier guards the floor under the tables; a runaway balloon drifts between the signal box and the hill.
JSW.defineRoom({
  id: 'dads_model_railway',
  name: "Dad's Model Railway",
  region: 'roof',
  pos: [8, 7],
  border: 'green',
  item: 'battery',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'green', paper: 'black', bright: true },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'S': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'red', bright: true },
    'L': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'C': { type: 'wall', tile: 'crate', ink: 'cyan', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'crate', ink: 'magenta', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black' },
    '>': { type: 'conveyor', tile: 'treadmill', ink: 'white', paper: 'black', bright: true, dir: 'right' },
    '_': { type: 'floor', tile: 'deck', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black' },
  },
  map: [
    '################################',
    '#..............................#',
    '#..CCC..BBB....................#',
    '#..CCC..BBB....................#',
    '#---------......+..............#',
    '#..............................#',
    '#...............HHHH...........#',
    '#.............HHHHHHHH.........#',
    '#.............HHHHHHHH.........#',
    '#.............+.........SSS....#',
    '#.......................SSS....#',
    '.......>>>>>>>>>>>>>>>>_____....',
    '................................',
    '...LLLL.........................',
    '...LLLL.........................',
    '================================',
  ],
  guardians: [
    // clockwork mouse riding the rails before the tunnel
    { type: 'h', sprite: 'clockwork_mouse', ink: 'cyan', x: 10, y: 72, min: 9, max: 12, dir: 'right' },
    // toy soldier guarding the floor under the high table
    { type: 'h', sprite: 'toy_soldier', ink: 'red', x: 12, y: 104, min: 9, max: 22, dir: 'left' },
    // runaway balloon drifting over the hilltop
    { type: 'd', sprite: 'balloon', ink: 'magenta', x: 176, y: 16, dx: -1, dy: 1, count: 16, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 13, y: 1, text: 'HANDS OFF! - DAD', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Tank Top (the cold water tank) [9,7] - difficulty 3. A huge galvanised tank fills the room against the chimney
// breast (east wall, solid). Climb the staggered ladder rungs (13, 11, 9, 7) beside its west side to the rim (row 6), then hop
// the cross-bars (3-cell gaps) over the water - falling in is fatal - past a rising bubble, and jump up onto the
// ballcock arm (row 4) for the item while a drip falls from the valve. A rubber duck paddles about below.
// Walk off the west end of the arm to drop back onto the last cross-bar.
JSW.defineRoom({
  id: 'the_cold_water_tank',
  name: 'Tank Top',
  region: 'roof',
  pos: [9, 7],
  border: 'cyan',
  item: 'tap',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'cyan', paper: 'blue' },
    'K': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'T': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'black', bright: true },
    'w': { type: 'wall', tile: 'bubbles_faint', ink: 'cyan', paper: 'blue' },
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    'a': { type: 'floor', tile: 'pipe_h', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'girder', ink: 'white', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black' },
  },
  map: [
    '#############################KKK',
    '#............................KKK',
    '#............................KKK',
    '#.........................+.PKKK',
    '#........................aaaPKKK',
    '#............................KKK',
    '#.....===...==...==...==.....KKK',
    '#...---T....................TKKK',
    '#......T....................TKKK',
    '#.---..T~~~~~~~~~~~~~~~~~~~~TKKK',
    '#......TwwwwwwwwwwwwwwwwwwwwTKKK',
    '....---TwwwwwwwwwwwwwwwwwwwwTKKK',
    '.......TwwwwwwwwwwwwwwwwwwwwTKKK',
    '..---..TwwwwwwwwwwwwwwwwwwwwTKKK',
    '.......TTTTTTTTTTTTTTTTTTTTTTKKK',
    '_____________________________KKK',
  ],
  guardians: [
    // rubber duck paddling on the water, under the cross-bars
    { type: 'd', sprite: 'rubber_duck', ink: 'yellow', x: 64, y: 56, dx: 1, dy: 0, count: 144, anim: 'slow' },
    // an air bubble wobbling up from the water between the second and third cross-bars
    { type: 'v', sprite: 'bubble', ink: 'white', x: 14, y: 32, min: 32, max: 56, dy: 1, anim: 'slow' },
    // the drip from the ballcock valve, under the arm
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 25, y: 40, min: 40, max: 56, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 8, y: 1, text: 'DRINKING WATER', ink: 'white' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Raising the Rafters [10,7] - difficulty 2. Right above the Bathroom; a dead end (the chimney breast is the west
// wall, the pitched roof slopes down in the north-east corner). From the east door two sloping rafters climb west:
// the lower one to the collar beam (row 9), the upper one to the top beam (row 5) and the item. A bat drops from the
// ridge onto the collar beam and a spider dangles over the upper rafter. Pink loft insulation between the joists.
JSW.defineRoom({
  id: 'the_rafters',
  name: 'Raising the Rafters',
  region: 'roof',
  pos: [10, 7],
  border: 'red',
  item: 'clock',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    'K': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    '#': { type: 'wall', tile: 'plank', ink: 'yellow', paper: 'red' },
    'L': { type: 'ramp', tile: 'stairs', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },   // rises left
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'i': { type: 'floor', tile: 'cloud', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    'KKK#############################',
    'KKK..................###########',
    'KKK....................#########',
    'KKK.+....................#######',
    'KKK........................#####',
    'KKK=====L....................###',
    'KKK......L.....................#',
    'KKK.......L....................#',
    'KKK........L...................#',
    'KKK.........=========L.........#',
    'KKK...................L........#',
    'KKK....................L........',
    'KKK.....................L.......',
    'KKK......................L......',
    'KKK.......................L.....',
    'KKKiiii=iiii=iiii=iiii=iiii=iiii',
  ],
  guardians: [
    // a bat drops from the ridge onto the collar beam
    { type: 'v', sprite: 'bat', ink: 'magenta', x: 15, y: 8, min: 8, max: 56, dy: 2, anim: 'fast' },
    // a spider dangles over the upper rafter
    { type: 'v', sprite: 'spider', ink: 'white', x: 9, y: 8, min: 8, max: 24, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Granny's Old Tat [11,7] - difficulty 2. The secret loft hatch from the Airing Cupboard is in the floor: a drop gap at
// cols 12-13 (hop it to cross the room) and the hatch board at cols 14-15 where climbers arrive. Knitting baskets sit
// in the corridor. Hop the west basket onto a zigzag of shelves (12, 10, 8, 6) past a yo-yo bobbing between them, then
// leap onto the brim of the dressmaker's dummy's best hat (row 4) for the item. Mind the stuffed owl - it isn't.
// A cat chases wool along the east end of the floor.
JSW.defineRoom({
  id: 'grannys_old_tat',
  name: "Granny's Old Tat",
  region: 'roof',
  pos: [11, 7],
  border: 'cyan',
  item: 'spoon',
  tiles: {
    '.': { type: 'air', ink: 'magenta', paper: 'black' },
    '#': { type: 'wall', tile: 'plank', ink: 'cyan', paper: 'black', bright: true },
    'K': { type: 'wall', tile: 'hedge', ink: 'magenta', paper: 'black', bright: true },
    'D': { type: 'wall', tile: 'marble', ink: 'yellow', paper: 'red' },
    'H': { type: 'wall', tile: 'cloud_solid', ink: 'yellow', paper: 'magenta', bright: true },
    'h': { type: 'floor', tile: 'carpet', ink: 'magenta', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    'o': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
    'P': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black' },
  },
  map: [
    '################################',
    '#..............................#',
    '#................+......PPPP...#',
    '#..................H....PPPP...#',
    '#..............hhhhH....PPPP...#',
    '#................D......PPPP...#',
    '#........-----..DDD............#',
    '#................D.............#',
    '#.-----.........DDD............#',
    '#..............................#',
    '#........-----.................#',
    '................................',
    '..-----.........................',
    '................................',
    '........KK......KK..............',
    '============..oo================',
  ],
  guardians: [
    // yo-yo bobbing between the two stacks of shelves
    { type: 'v', sprite: 'yoyo', ink: 'red', x: 7, y: 8, min: 8, max: 80, dy: 2, anim: 'fast' },
    // the stuffed owl on the top-left shelf (it never moves - but touch it and it bites)
    { type: 'v', sprite: 'owl', ink: 'yellow', x: 2, y: 48, min: 48, max: 48, dy: 0, anim: 'slow' },
    // Granny's cat chasing a ball of wool along the east end of the floor
    { type: 'h', sprite: 'cat', ink: 'white', x: 20, y: 104, min: 18, max: 27, dir: 'right' },
  ],
  special: {
    signs: [{ x: 16, y: 9, text: 'HOME SWEET HOME', ink: 'magenta' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Loft Conversion (top of the loft ladder) [12,7] - difficulty 2. The folding loft ladder comes up through the floor
// from the Stair Head Case (ramp cells (25,15),(26,14) ... top at (29,11)); walk west off its foot and you go back
// down the stairwell. West door at floor 15 (Granny's Old Tat), past a DIY saw. From the ladder top hop onto the long
// joist (row 9): west along it the second ladder climbs out of the roof hatch (cols 5-8) onto Weathercock Ridge;
// east, jump up to the high joist (row 7) and the Pigeon Loft door (rows 3-6). The item sits on the beam under the
// new velux window (row 5), guarded by a bat; a spider drops over the joist. A hatch ledge (row 3) catches anyone
// dropping in beside the hatch ladder.
JSW.defineRoom({
  id: 'top_of_the_loft_ladder',
  name: 'Loft Conversion',
  region: 'roof',
  pos: [12, 7],
  border: 'green',
  item: 'hammer',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'white', paper: 'blue' },
    'V': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    'U': { type: 'wall', tile: 'stripes_faint', ink: 'yellow', paper: 'black' },
    'L': { type: 'ramp', tile: 'rope_ladder', ink: 'white', paper: 'black', bright: true, dir: 'left' },    // rises left
    '/': { type: 'ramp', tile: 'rope_ladder', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },  // rises right
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'deck', ink: 'yellow', paper: 'black' },
  },
  map: [
    '#####L...#############VVVV######',
    '#.....L...............VVVV....##',
    '#......L......................##',
    '#..-----L..........+............',
    '#........L......................',
    '#.........L.......======........',
    '#..........L....................',
    '#...........L.............======',
    '#............L................##',
    '#.............============....##',
    '#.............................##',
    '............................./##',
    '............................/U##',
    '.........................../UU##',
    '........................../UUU##',
    '_________________________/UUUU##',
  ],
  guardians: [
    // a bat circling over the beam and the item
    { type: 'd', sprite: 'bat', ink: 'magenta', x: 136, y: 8, dx: 1, dy: 1, count: 16, anim: 'fast' },
    // a spider dropping over the long joist on the way to the hatch ladder
    { type: 'v', sprite: 'spider', ink: 'white', x: 15, y: 8, min: 8, max: 48, dy: 1, anim: 'slow' },
    // somebody left the saw running - it bobs over the floor by the west door
    { type: 'v', sprite: 'saw', ink: 'cyan', x: 10, y: 80, min: 80, max: 104, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 13, y: 11, text: 'MIND YOUR HEAD', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Pigeon Loft [13,7] - difficulty 3. Dead end, entered high from the west (floor 7). Racing-pigeon coops fill the
// east end. Hop down the perches in a zigzag (9, 11, 13) to the floor eight rows below the door, and back up the same
// way (every rise is 2 rows). From the first perch leap up to the landing board (row 7) of the top coop for one item;
// the other is at the back of the bottom coop on the floor. A pigeon swoops over the perches, one bobs above the
// landing board and another pops up and down outside the bottom coop - duck in while it is up.
JSW.defineRoom({
  id: 'the_pigeon_loft',
  name: 'The Pigeon Loft',
  region: 'roof',
  pos: [13, 7],
  border: 'yellow',
  item: 'envelope',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'plank', ink: 'white', paper: 'red' },
    'R': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'yellow' },
    'C': { type: 'wall', tile: 'grate', ink: 'white', paper: 'blue', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'sand_top', ink: 'white', paper: 'black' },
  },
  map: [
    '################################',
    '#..............................#',
    '#..............................#',
    '.....................RRRRRRRRRR#',
    '.....................RRRRRRRRRR#',
    '...........................+.CC#',
    '.............................CC#',
    '-------...........----CCCCCCCCC#',
    '##....................CCCCCCCCC#',
    '##.......--------.....CCCCCCCCC#',
    '##....................CCCCCCCCC#',
    '##.------.............CCCCCCCCC#',
    '##....................CCCCCCCCC#',
    '##........-------...........+.C#',
    '##............................C#',
    '##=============================#',
  ],
  guardians: [
    // a racing pigeon swooping over the first perches
    { type: 'd', sprite: 'bird', ink: 'cyan', x: 80, y: 16, dx: 1, dy: 1, count: 28, anim: 'fast' },
    // a pigeon flapping up and down above the top coop's landing board
    { type: 'v', sprite: 'bird', ink: 'magenta', x: 19, y: 8, min: 8, max: 40, dy: 1, anim: 'fast' },
    // a pigeon popping up and down outside the bottom coop
    { type: 'v', sprite: 'bird', ink: 'green', x: 20, y: 72, min: 72, max: 104, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 3, y: 2, text: 'PIGEON POST', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Sooty Chimney Stacks [7,6] - difficulty 3. West end of the roof, under the stars. A sooty stack with terracotta
// pots: climb the sooty slope onto the stack (11), then the short pot (9) and the tallest pot (7) for the item past a
// dangling spider. The skylight is in the roof: a drop gap (cols 12-13) into Mothball Alley beside the glass (14-15)
// where climbers arrive - jump the gap to get west. The observatory rope hangs from the sky at col 22 (climb it into
// the Stargazer's Dome); the one-way cowl ledge (row 5) on the big east stack catches anyone dropping back from the
// dome, and the pot caps at rows 9 and 13 step back down (mind the swinging rope). East door (rows 8-11) on top of
// the door stack (12), reached from the roof by the squat pot (14). A pigeon swoops over the sooty slope.
JSW.defineRoom({
  id: 'sooty_chimney_stacks',
  name: 'Sooty Chimney Stacks',
  region: 'roof',
  pos: [7, 6],
  border: 'red',
  item: 'pipe',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    'S': { type: 'wall', ink: 'yellow', paper: 'black' },          // the night sky above the roof (out of reach)
    'M': { type: 'wall', tile: 'cloud_solid', ink: 'yellow', paper: 'black', bright: true },   // the moon
    'B': { type: 'wall', tile: 'brick', ink: 'yellow', paper: 'red' },
    'K': { type: 'wall', tile: 'brick', ink: 'black', paper: 'red' },           // soot-blackened stack
    'P': { type: 'wall', tile: 'pipe_v', ink: 'red', paper: 'black', bright: true },
    'L': { type: 'ramp', tile: 'slope_rock', ink: 'white', paper: 'black', dir: 'left' },   // rises left
    '-': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black' },
    'g': { type: 'floor', tile: 'ice', ink: 'cyan', paper: 'blue', bright: true },
  },
  map: [
    'BSSSSSSSSSSSSSSSSSSSSS....SSSSBB',
    'B........MM...................BB',
    'B........MM...................BB',
    'B.............................BB',
    'B.............................BB',
    'B.+.....................------BB',
    'B.............................BB',
    'BPPP..........................BB',
    'BPPP............................',
    'BPPPPP..............----........',
    'BPPPPP..........................',
    'BKKKKKKL........................',
    'BKKKKKK.L....................BBB',
    'BKKKKKK..L.......---.........BBB',
    'BKKKKKK...L...............PP.BBB',
    'B===========..gg=============BBB',
  ],
  guardians: [
    // the observatory rope (climb it into the Stargazer's Dome)
    { type: 'rope', x: 22, length: 32 },
    // a spider dangling over the short pot
    { type: 'v', sprite: 'spider', ink: 'white', x: 4, y: 8, min: 8, max: 48, dy: 1, anim: 'slow' },
    // a pigeon swooping down over the sooty slope
    { type: 'd', sprite: 'bird', ink: 'magenta', x: 64, y: 40, dx: 1, dy: 1, count: 32, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Slippery Slates [8,6] - difficulty 4. A steep pitched roof between two chimney stacks. From the west door (floor
// 12) the slope climbs to the red ridge tiles (row 5), whose middle is slimy with moss (a left-moving conveyor - keep
// walking east or it slides you back), then falls away to the gutter door (floor 15). Loose slates skid down the roof
// (a left arrow at row 9, crossing both slopes) and the wind whips along the ridge (a right arrow at row 3): jump it.
// A seagull swoops over the west end of the ridge. One item needs a jump above the ridge, the other is on it.
JSW.defineRoom({
  id: 'slippery_slates',
  name: 'Slippery Slates',
  region: 'roof',
  pos: [8, 6],
  border: 'cyan',
  item: 'coin',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    'S': { type: 'wall', ink: 'cyan', paper: 'black' },          // the night sky (out of reach)
    'B': { type: 'wall', tile: 'brick', ink: 'yellow', paper: 'red' },
    'R': { type: 'wall', tile: 'brick_small', ink: 'white', paper: 'blue' },
    'W': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'white', paper: 'black', bright: true, dir: 'right' },
    'L': { type: 'ramp', tile: 'slope_rock', ink: 'white', paper: 'black', bright: true, dir: 'left' },    // rises left
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'red', paper: 'black', bright: true },
    '<': { type: 'conveyor', tile: 'walkway', ink: 'green', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'BBSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    'BB............................SS',
    'BB.........+..................SS',
    'BB................+...........SS',
    'BB............................SS',
    'BB....../===<<<<<===L.........SS',
    'BB...../RRRRRRRRRRRRRL........BB',
    'BB..../RRRRRRRRRRRRRRRL.......BB',
    '...../RRRRRRRWWWWRRRRRRL......BB',
    '..../RRRRRRRRWWWWRRRRRRRL.....BB',
    '.../RRRRRRRRRRRRRRRRRRRRRL....BB',
    '../RRRRRRRRRRRRRRRRRRRRRRRL.....',
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRL....',
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRL...',
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRL..',
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR==',
  ],
  guardians: [
    // loose slates skidding down the roof
    { type: 'arrow', dir: 'left', y: 76 },
    // a gust of wind along the ridge
    { type: 'arrow', dir: 'right', y: 26 },
    // a seagull swooping over the west end of the ridge
    { type: 'd', sprite: 'seagull', ink: 'white', x: 72, y: 8, dx: 2, dy: 1, count: 16, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Life in the Gutter [9,6] - difficulty 3. A long lead valley gutter (floor 15) under the stars, between the chimney
// stack on the west and the overhanging eaves of the bell-tower roof on the east. Rain puddles and a sodden heap of
// leaves are pits in the gutter (jump them); a snail patrols between the first two, a pigeon flaps up and down over
// the second puddle. A squat chimney pot (13) is the step up to the rainwater hopper (row 11) under the eaves, where
// the item has washed up. Walk off the hopper's west end to drop back onto the pot.
JSW.defineRoom({
  id: 'life_in_the_gutter',
  name: 'Life in the Gutter',
  region: 'roof',
  pos: [9, 6],
  border: 'blue',
  item: 'mushroom',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    'S': { type: 'wall', ink: 'cyan', paper: 'black' },          // the night sky (out of reach)
    'B': { type: 'wall', tile: 'brick', ink: 'yellow', paper: 'red' },
    'R': { type: 'wall', tile: 'brick_small', ink: 'white', paper: 'blue' },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'red', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'pipe_h', ink: 'white', paper: 'black' },
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
    '*': { type: 'nasty', tile: 'nettle', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    'SS...................RRRRRRRRRRR',
    'SS....................RRRRRRRRRR',
    'SS.....................RRRRRRRRR',
    'SS......................RRRRRRRR',
    'SS.......................RRRRRRR',
    'BB........................RRRRRR',
    'BB.........................RRRRR',
    'BB..........................RRRR',
    'BB.........................+.RRR',
    'BB............................RR',
    '..........................---...',
    '................................',
    '.......................PP.......',
    '....~~........**...~~..PP.......',
    '================================',
  ],
  guardians: [
    // a snail sliming along the gutter between the first puddle and the leaves
    { type: 'h', sprite: 'snail', ink: 'green', x: 8, y: 104, min: 8, max: 10, dir: 'right' },
    // a pigeon flapping up and down over the second puddle
    { type: 'v', sprite: 'bird', ink: 'white', x: 19, y: 48, min: 48, max: 96, dy: 2, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Bell Tower Buttress [10,6] - difficulty 3. Where the roof meets the stone bell tower. The bell rope drops through a
// hole in the tower floor (row 0, cols 10-13) to row 12: jump for it from the leads and climb into the Bell Ringers'
// Loft. Swing across and jump off onto the buttress ledge (row 4) for the item - it is also where anyone dropping
// back out of the loft lands; the corbels (8, 12) step back down to the leads. West door at floor 15 (a pigeon
// struts about by it); the buttress slope climbs to the east door (rows 5-8, floor 9), a bat swooping along it.
JSW.defineRoom({
  id: 'bell_tower_buttress',
  name: 'Bell Tower Buttress',
  region: 'roof',
  pos: [10, 6],
  border: 'yellow',
  item: 'bell',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'A': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'black', bright: true },
    'U': { type: 'wall', tile: 'stone_block', ink: 'yellow', paper: 'black' },
    'c': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '-': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'pipe_h', ink: 'white', paper: 'black' },
  },
  map: [
    '##########....##################',
    '##########....##################',
    '#........+............##########',
    '#.....................##AA######',
    '#.......----..........##########',
    '#...............................',
    '#...............................',
    '#...............................',
    '#....---........................',
    '#............................/==',
    '#.........................../UUU',
    '.........................../UUUU',
    '..ccc...................../UUUUU',
    '........................./UUUUUU',
    '......................../UUUUUUU',
    '========================UUUUUUUU',
  ],
  guardians: [
    // the bell rope (climb it into the Bell Ringers' Loft)
    { type: 'rope', x: 12, length: 32 },
    // a bat swooping up and down along the buttress slope
    { type: 'd', sprite: 'bat', ink: 'magenta', x: 176, y: 88, dx: 1, dy: -1, count: 32, anim: 'fast' },
    // a pigeon strutting about on the leads by the west door
    { type: 'h', sprite: 'bird', ink: 'cyan', x: 5, y: 104, min: 4, max: 8, dir: 'right' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Aerial Alley [11,6] - difficulty 4. A flat lead roof (row 9) bristling with 1980s TV aerials: thin masts that
// crackle at the tip, each hung on a lower crossbar (row 7) with an upper element (row 5). Nobody's picture works
// ("NO SIGNAL"). A valve glows at the end of the first aerial's upper element and another sits on the third.
// Hazards: a gust (right arrow, row 6) sweeps every lower crossbar, a gust at roof level (left arrow, row 8) must
// be jumped, a new-fangled satellite dish bobs between the first two aerials, and a crow dives at the third.
JSW.defineRoom({
  id: 'aerial_alley',
  name: 'Aerial Alley',
  region: 'roof',
  pos: [11, 6],
  border: 'blue',
  item: 'bulb',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'S': { type: 'wall', ink: 'white', paper: 'black' },                                         // night sky (out of reach)
    '|': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'black', bright: true },            // aerial masts
    'x': { type: 'nasty', tile: 'sparks', ink: 'yellow', paper: 'black', bright: true },         // crackling tips
    '-': { type: 'floor', tile: 'pipe_h', ink: 'cyan', paper: 'black', bright: true },            // crossbars
    '=': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },            // lead flat roof
    '#': { type: 'wall', tile: 'brick_small', ink: 'white', paper: 'red' },
  },
  map: [
    'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    'S...............x..............S',
    'S.....x.........|.........x....S',
    'S.....|.........|......+..|....S',
    'S.....|...+.....|.........|....S',
    '......|---...---|......---|.....',
    '......|.........|.........|.....',
    '...-------...-------..-------...',
    '................................',
    '================================',
    '################################',
    '################################',
    '################################',
    '################################',
    '################################',
    '################################',
  ],
  guardians: [
    // gust along the lower crossbars
    { type: 'arrow', dir: 'right', y: 51 },
    // gust along the roof - jump it
    { type: 'arrow', dir: 'left', y: 67 },
    // satellite dish bobbing between the first two aerials (crosses the roof walk)
    { type: 'v', sprite: 'satellite', ink: 'cyan', x: 11, y: 16, min: 16, max: 56, dy: 1, anim: 'slow' },
    // crow diving at the third aerial's crossbar (it likes shiny things)
    { type: 'd', sprite: 'bird', ink: 'magenta', x: 136, y: 8, dx: 1, dy: 1, count: 32, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 2, y: 1, text: 'NO SIGNAL', ink: 'cyan', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Weathercock Ridge [12,6] - difficulty 4. The east ridge. From the west door (parapet, row 9) drop onto the propped
// loft-hatch lid (row 10) and down to the ridge lead (row 12). The second loft ladder climbs up out of the hatch well
// (ramps (6,15),(5,14) .. top (3,12), landing (1-2,12)); from its top hop back onto the lid. The silo gantry stairs
// start at the ridge (11,11) and climb out of the ceiling at (21,1),(22,0) into the Countdown Silo - walk right along
// the ridge and you climb them; jump the foot to reach the giant weathercock: its plinth (row 10), the compass arms
// (row 8) and the spinning cockerel. The feather is by his tail - jump for it from the west arm, not under him.
// Gusts: a left arrow at ridge height (row 10) and a right arrow over the arms and stairs (row 6); a gull struts the
// ridge and a leaf blows about beside the hatch.
JSW.defineRoom({
  id: 'weathercock_ridge',
  name: 'Weathercock Ridge',
  region: 'roof',
  pos: [12, 6],
  border: 'magenta',
  item: 'feather',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'S': { type: 'wall', ink: 'white', paper: 'black' },                                          // night sky
    '#': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },       // ridge lead / parapet
    'h': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },              // hatch lid
    'L': { type: 'ramp', tile: 'rope_ladder', ink: 'white', paper: 'black', bright: true, dir: 'left' },   // loft ladder
    '/': { type: 'ramp', tile: 'stairs_outline', ink: 'cyan', paper: 'black', bright: true, dir: 'right' }, // gantry stairs
    '|': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },            // weathercock pole
    '-': { type: 'floor', tile: 'chain_h', ink: 'yellow', paper: 'black', bright: true },          // compass arms
    'B': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },                       // plinth
    'M': { type: 'wall', tile: 'cloud_solid', ink: 'yellow', paper: 'black', bright: true },       // the moon
  },
  map: [
    'SSSSSSSSSSSSSSSSSSS.../SSSSSSSSS',
    'S..................../.........S',
    'S...MM............../..........S',
    'S...MM............./.....+.....S',
    'S................./............S',
    '................./.........|...S',
    '................/..........|...S',
    '.............../...........|...S',
    '............../........----|---S',
    '====........./.............|...S',
    '#....hhh..../............BBBBB.S',
    '#........../.............BBBBB.S',
    '#==L....=======================#',
    '####L....#######################',
    '#####L...#######################',
    '######L..#######################',
  ],
  guardians: [
    // gust at ridge height, blowing west
    { type: 'arrow', dir: 'left', y: 83 },
    // gust over the compass arms and the middle of the stairs, blowing east
    { type: 'arrow', dir: 'right', y: 51 },
    // the cockerel, creaking round on top of the pole
    { type: 'v', sprite: 'bird', ink: 'yellow', x: 26, y: 16, min: 16, max: 24, dy: 1, anim: 'fast' },
    // a gull strutting along the ridge between the stair foot and the plinth
    { type: 'h', sprite: 'seagull', ink: 'white', x: 13, y: 80, min: 13, max: 22, dir: 'right' },
    // a leaf whirling up and down beside the hatch lid
    { type: 'v', sprite: 'leaf', ink: 'green', x: 9, y: 40, min: 40, max: 72, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 23, y: 7, text: 'W', ink: 'white' }, { x: 30, y: 7, text: 'E', ink: 'white' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Countdown Silo [12,5] - difficulty 4 (region towers). A round silo with a stubby red rocket on a flame-trench grate.
// The gantry stairs come up through the floor ((21,15),(22,14) .. top (23,13)) from Weathercock Ridge. East gantry:
// ledges 13, 11, 9 (a key at its far end, where a maintenance robot patrols - its west tip is safe) and 7, the
// crew-access arm to the capsule door. A fan whirrs up and down the gap between the east ledges. West gantry: jump
// off the stairs into the flame trench, walk under the rocket, climb the fuel tank (13) and ledges 11, 9 (a robo-dog
// guards the key at its far end - jump him) and 7 (jump for the key above it). A spring bounces in the west gap and
// down into the trench. With all three keys the capsule (rows 5-6, entered from the arm) launches Wally to the
// Starship - ONE WAY. Nothing above row 7 is reachable, so every ledge has full jumping headroom.
JSW.defineRoom({
  id: 'countdown_silo',
  name: 'Countdown Silo',
  region: 'towers',
  pos: [12, 5],
  border: 'cyan',
  item: 'key',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'W': { type: 'wall', tile: 'rivets', ink: 'cyan', paper: 'blue' },
    'N': { type: 'wall', tile: 'hull', ink: 'red', paper: 'white', bright: true },        // nose cone
    'R': { type: 'wall', tile: 'hull', ink: 'yellow', paper: 'red', bright: true },       // rocket body
    'o': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'red', bright: true },       // porthole
    'E': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'black' },             // engine bell
    'c': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },  // capsule floor
    '=': { type: 'floor', tile: 'girder', ink: 'yellow', paper: 'black', bright: true },  // gantry ledges
    'p': { type: 'floor', tile: 'grate', ink: 'red', paper: 'black', bright: true },      // launch pad
    'T': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'blue' },             // fuel tank
    'f': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black' },                  // silo floor / trench
    '/': { type: 'ramp', tile: 'stairs_outline', ink: 'cyan', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    'WW............................WW',
    'WW.............NN.............WW',
    'WW.........+..NNNN............WW',
    'WW...........RRRRRR...........WW',
    'WW...........R................WW',
    'WW...........R................WW',
    'WW+......====Rccccc====......+WW',
    'WW...........RRRRRR...........WW',
    'WW=====......RRooRR......=====WW',
    'WW...........RRRRRR...........WW',
    'WW.......====REEEER====.......WW',
    'WW...........pppppp...........WW',
    'WWTTTT................./======WW',
    'WWTTTT................/WWWWWWWWW',
    'WWfffffffffffffffffff/WWWWWWWWWW',
  ],
  guardians: [
    // a fan whirring up and down between the east ledges
    { type: 'v', sprite: 'fan', ink: 'white', x: 23, y: 24, min: 24, max: 80, dy: 2, anim: 'fast' },
    // a spring bouncing between the west ledges, right down into the trench
    { type: 'v', sprite: 'spring', ink: 'green', x: 7, y: 24, min: 24, max: 96, dy: 2, anim: 'fast' },
    // a robo-dog on west ledge 9 (its east tip is safe)
    { type: 'h', sprite: 'robo_dog', ink: 'cyan', x: 2, y: 56, min: 2, max: 4, dir: 'right' },
    // a maintenance robot on east ledge 9 (its west tip is safe)
    { type: 'h', sprite: 'robot', ink: 'yellow', x: 28, y: 56, min: 26, max: 28, dir: 'left' },
  ],
  special: {
    portals: [{ x: 15, y: 6, w: 2, h: 1, kind: 'rocket', to: 'rocket_park', requires: 'roomItems' }],
    signs: [
      { x: 20, y: 1, text: 'T-MINUS', ink: 'red', flash: true },
      { x: 20, y: 2, text: 'ONE WAY', ink: 'yellow' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Stargazer's Dome [7,5] - difficulty 4 (region towers). Dead end at the top of the observatory rope from the Sooty
// Chimney Stacks: arrive on the floor at cols 21-23; the slot at cols 24-25 drops straight back onto the chimney cowl.
// Walk west and you climb the great brass telescope (a ramp from (19,14) to its eyepiece end at (10,5)) onto the
// eyepiece platform (row 5) - spectacles left by the astronomer - while an owl glides down onto the middle of the tube.
// Step off the platform's west end past a twinkling star onto the star-chart shelf (row 9) for the other pair, then
// down via the desk (row 12) to the floor and back east under the telescope, timing the ringed planet that bobs there.
JSW.defineRoom({
  id: 'stargazers_dome',
  name: "Stargazer's Dome",
  region: 'towers',
  pos: [7, 5],
  border: 'magenta',
  item: 'spectacles',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'D': { type: 'wall', tile: 'wood_panel', ink: 'cyan', paper: 'blue' },               // slatted dome
    'K': { type: 'wall', tile: 'stars', ink: 'white', paper: 'black', bright: true },     // the open slit
    'G': { type: 'wall', tile: 'circuit', ink: 'green', paper: 'black', bright: true },   // clock drive
    '-': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'magenta', paper: 'black', bright: true },
    'T': { type: 'ramp', tile: 'stairs', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },  // telescope tube
  },
  map: [
    'DDDDKKKDDDDDDDDDDDDDDDDDDDDDDDDD',
    'DDDDKKK.....................DDDD',
    'DD............................DD',
    'DD.....+......................DD',
    'DD............................DD',
    'DD....----T...................DD',
    'DD.........T..................DD',
    'DD.+........T.................DD',
    'DD...........T................DD',
    'DD-----.......T...............DD',
    'DD.............T..............DD',
    'DD..............T.............DD',
    'DD.------........T........GGGGDD',
    'DD................T.......GGGGDD',
    'DD.................T......GGGGDD',
    'DD======================..DDDDDD',
  ],
  guardians: [
    // an owl gliding down onto the middle of the telescope tube
    { type: 'd', sprite: 'owl', ink: 'white', x: 160, y: 16, dx: -1, dy: 1, count: 40, anim: 'slow' },
    // a star twinkling beside the eyepiece platform and over the star chart
    { type: 'v', sprite: 'star', ink: 'yellow', x: 3, y: 16, min: 16, max: 48, dy: 1, anim: 'fast' },
    // a ringed planet bobbing under the telescope
    { type: 'v', sprite: 'ringed_planet', ink: 'magenta', x: 10, y: 56, min: 56, max: 104, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 12, y: 1, text: 'TWINKLE TWINKLE', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Bell Ringers' Loft [10,5] - difficulty 4 (region towers). Climb the bell rope up from the Bell Tower Buttress
// and you step off onto the ringing-chamber floor at cols 11-14 (the rope hole at cols 10-11 drops straight back onto
// the buttress ledge). Hop onto the ringers' bench (row 13) and catch the loft's own bell rope (col 18) to climb on
// into the belfry. Or leap from the bench past the first clapper onto the corbels up the east wall - 11, 9, 7 - timing
// the two swinging clappers (pendulums); the candle sits on corbel 7. Anyone dropping back from the belfry lands on
// the ledge at row 4 and steps down the corbels. A bat flaps up and down over the rope hole.
JSW.defineRoom({
  id: 'bell_ringers_loft',
  name: "The Bell Ringers' Loft",
  region: 'towers',
  pos: [10, 5],
  border: 'green',
  item: 'candle',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'W': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'red' },
    'P': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'blue', bright: true },  // peal board
    'B': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'yellow' },                 // ringers' bench
    'c': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true }, // corbels / ledge
    'f': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'WWWWWWWWWWWWWWWWWW....WWWWWWWWWW',
    'WWW..........................WWW',
    'WWW..........................WWW',
    'WWW.PPPP.....................WWW',
    'WWW.PPPP............cccc.....WWW',
    'WWW.PPPP...............+.....WWW',
    'WWW.PPPP.....................WWW',
    'WWW....................ccc...WWW',
    'WWW..........................WWW',
    'WWW........................ccWWW',
    'WWW..........................WWW',
    'WWW....................ccc...WWW',
    'WWW..........................WWW',
    'WWW............BBBBB.........WWW',
    'WWW............BBBBB.........WWW',
    'WWWWWWWWWW..fffffffffffffffffWWW',
  ],
  guardians: [
    // the loft's bell rope - climb it into the Ding Dong Belfry
    { type: 'rope', x: 18, length: 32 },
    // clapper swinging between the bench and corbel 11
    { type: 'v', sprite: 'pendulum', ink: 'yellow', x: 20, y: 48, min: 48, max: 80, dy: 1, anim: 'slow' },
    // clapper swinging beside corbels 9 and 7
    { type: 'v', sprite: 'pendulum', ink: 'cyan', x: 26, y: 48, min: 16, max: 48, dy: 1, anim: 'slow' },
    // a bat flapping over the rope hole
    { type: 'v', sprite: 'bat', ink: 'magenta', x: 10, y: 40, min: 40, max: 80, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 3, y: 9, text: 'LOOK TO', ink: 'cyan' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Ding Dong Belfry [10,4] - difficulty 5 (region towers). The top of the tower. Climb off the loft's bell rope onto the
// floor at cols 17-18 (the rope hole at cols 20-21 drops back onto the loft ledge). West: stone corbels every two rows
// (13, 11, 9) lead up to the open west arch (sill row 7 - jump for the crown in the arch, a spider drops past the
// corbels) and to the narrow bell beam (row 7) under the great headstock. The two bells swing down over the beam - walk
// under each while it is up - and a crown hangs from the headstock by the second bell; the beam simply ends in mid-air
// (walk off its far end and you fall to the floor). East: jump the rope hole and climb corbels 13, 11, 9 to the east
// arch for the third crown. Bats swoop over the rope hole and around the east arch.
JSW.defineRoom({
  id: 'ding_dong_belfry',
  name: 'Ding Dong Belfry',
  region: 'towers',
  pos: [10, 4],
  border: 'red',
  item: 'crown',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'W': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'black', bright: true },
    'K': { type: 'wall', tile: 'stars', ink: 'white', paper: 'black', bright: true },       // open arches
    'H': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },                 // bell headstock
    'b': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },     // bell beam
    'c': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true }, // corbels
    's': { type: 'floor', tile: 'stone_ledge', ink: 'cyan', paper: 'black', bright: true },  // arch sills
    'f': { type: 'floor', tile: 'deck', ink: 'yellow', paper: 'black' },
  },
  map: [
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    'WW............................WW',
    'WW....HHHHHHHHHHHHH...........WW',
    'K................+.............K',
    'K+............................+K',
    'K..............................K',
    'K..............................K',
    'WWss...bbbbbbbbbbbbbb.......ssWW',
    'WW............................WW',
    'WW.ccc....................ccc.WW',
    'WW............................WW',
    'WW.....ccc............ccc.....WW',
    'WW............................WW',
    'WW.........ccc.............cccWW',
    'WW............................WW',
    'WWffffffffffffffffff..ffffffffWW',
  ],
  guardians: [
    // the two great bells swinging down over the beam
    { type: 'v', sprite: 'pendulum', ink: 'yellow', x: 9, y: 24, min: 24, max: 40, dy: 1, anim: 'slow' },
    { type: 'v', sprite: 'pendulum', ink: 'yellow', x: 14, y: 40, min: 24, max: 40, dy: 1, anim: 'slow' },
    // a bat swooping over the rope hole and the first corbel
    { type: 'd', sprite: 'bat', ink: 'magenta', x: 120, y: 64, dx: 1, dy: 1, count: 16, anim: 'fast' },
    // a bat swooping round the east arch
    { type: 'd', sprite: 'bat', ink: 'green', x: 176, y: 8, dx: 1, dy: 1, count: 32, anim: 'fast' },
    // a spider dropping past the west corbels
    { type: 'v', sprite: 'spider', ink: 'white', x: 5, y: 24, min: 24, max: 48, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 7, y: 1, text: 'DING', ink: 'yellow', flash: true }, { x: 13, y: 1, text: 'DONG', ink: 'yellow', flash: true }],
  },
});
