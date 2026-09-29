// Jet Set Wally II - mansion, ground floor (grid row 10): Back Hall .. Front Porch.
// Author file: src/data/rooms/mansion_ground.js  (region 'mansion')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts, names and jokes original.
//
// Ground-floor conventions used below: every east/west door is open rows 11-14 over a floor at row 15
// (10-14 between the Great Hall, the Porch and the Drive); everything else on an edge is wall. Stair feet
// that must not "grab" Wally while he walks along floor 15 start from a bench/dais at row 13.

// ---------------------------------------------------------------------------------------------------------
// Back Hall Bedlam [6,10] - difficulty 2.
// The back stairs come down from Back Stairs Gossip in one long flight (half-landing at row 3) onto the boot
// bench; in the west corner a second flight drops through the floor to the Boot Room. East door to the
// conservatory. Item: an umbrella hooked on the hat peg, reached boot bench -> hat shelf -> peg.
JSW.defineRoom({
  id: 'the_back_hall',
  name: 'Back Hall Bedlam',
  region: 'mansion',
  pos: [6, 10],
  border: 'blue',
  item: 'umbrella',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'W': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue' },
    'C': { type: 'wall', tile: 'bark', ink: 'green', paper: 'black', bright: true },
    'D': { type: 'wall', tile: 'bark', ink: 'magenta', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'cyan', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'magenta', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    '###################.../#########',
    '##.................../..#.CCDD##',
    '##.WWWW............./...#.CCDD##',
    '##.WWWW........../======#.CCDD##',
    '##.WWWW........./.........CCDD##',
    '##.WWWW......../..............##',
    '##............/...............##',
    '##.........../................##',
    '##........../.........+.......##',
    '##........./.........---......##',
    '##......../...................##',
    '##......./...............----...',
    '##....../.......................',
    '####\\.---...........----........',
    '#####\\..........................',
    '######\\=========================',
  ],
  guardians: [
    // the vacuum cleaner roars up and down the hall floor (never reaches the stair foot or the east door)
    { type: 'h', sprite: 'vacuum', ink: 'green', bright: true, x: 14, y: 104, min: 10, max: 18, dir: 'left' },
    // a spider on its thread between the hat peg and the hat shelf
    { type: 'v', sprite: 'spider', ink: 'white', x: 24, y: 40, min: 32, max: 72, dy: 1, anim: 'slow' },
    // a bat swooping at the stairs from the gloom above the lower flight
    { type: 'v', sprite: 'bat', ink: 'yellow', x: 11, y: 16, min: 16, max: 48, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Hothouse Flowers [7,10] - difficulty 2.
// Glass roof and walls. The big terracotta pot in the middle of the floor has a flytrap snapping up out of
// it - hop across its rim while the jaws are up. Hanging baskets zig-zag up the east side (rows 13, 11, 9, 7)
// to the prize bloom in the top basket; a butterfly flutters down onto that basket now and then.
JSW.defineRoom({
  id: 'the_conservatory',
  name: 'Hothouse Flowers',
  region: 'mansion',
  pos: [7, 10],
  border: 'green',
  item: 'flower',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    'G': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue', bright: true },
    'L': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'P': { type: 'wall', tile: 'brick_small', ink: 'red', paper: 'yellow' },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'yellow', paper: 'black', bright: true },
    'B': { type: 'floor', tile: 'rope_bridge', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
    'GGGGGGGG................GGGGGGGG',
    'GGGGLL....................LLGGGG',
    'GG..LL.....LLL............LL..GG',
    'GG.........PPP................GG',
    'GG......................+.....GG',
    'GG............................GG',
    'GG.....................BBB....GG',
    'GG............................GG',
    'GG.................BBB........GG',
    'GG............................GG',
    '........................BBB.....',
    '................................',
    '..............PPPP..BBB.........',
    '..............PPPP..............',
    '================================',
  ],
  guardians: [
    // the flytrap snaps up out of the big pot: cross the rim while it is up
    { type: 'v', sprite: 'flytrap', ink: 'green', x: 15, y: 56, min: 56, max: 88, dy: 1, anim: 'slow' },
    // a butterfly flutters down to the top basket and back up under the glass
    { type: 'd', sprite: 'butterfly', ink: 'magenta', x: 136, y: 12, dx: 2, dy: 1, count: 24, anim: 'slow' },
    // a bee bumbles up and down over the floor by the west door
    { type: 'v', sprite: 'bee', ink: 'yellow', x: 7, y: 64, min: 64, max: 104, dy: 2, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Soup of the Day [8,10] - difficulty 2.
// A long banquet table (top row 11) with a chair at each end (seats row 13) and a brass chandelier (row 9)
// hanging above the middle, candles burning at both ends of it. The penguin waiter shuffles along the floor;
// on the table a champagne bottle pops up and down at the west end and a plate skims to and fro at the east
// end. Items: a spoon at the east end of the table, another on the chandelier between the candles.
JSW.defineRoom({
  id: 'the_dining_room',
  name: 'Soup of the Day',
  region: 'mansion',
  pos: [8, 10],
  border: 'red',
  item: 'spoon',
  tiles: {
    '.': { type: 'air', ink: 'red', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'yellow', paper: 'magenta' },
    '|': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'carpet', ink: 'red', paper: 'black', bright: true },
    'T': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'l': { type: 'floor', tile: 'pipe_v', ink: 'yellow', paper: 'black' },
    'S': { type: 'floor', tile: 'rug', ink: 'magenta', paper: 'black', bright: true },
    'k': { type: 'floor', tile: 'pipe_v', ink: 'magenta', paper: 'black', bright: true },
    'C': { type: 'floor', tile: 'girder', ink: 'yellow', paper: 'black', bright: true },
    '^': { type: 'nasty', tile: 'flames', ink: 'red', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##............||..............##',
    '##............||..............##',
    '##............||..............##',
    '##............................##',
    '##............................##',
    '##............................##',
    '##............+...............##',
    '##..........^....^............##',
    '##..........CCCCCC............##',
    '##..k...................+..k..##',
    '....k..TTTTTTTTTTTTTTTTTT..k....',
    '....k...l..............l...k....',
    '....kSS.l..............l.SSk....',
    '....l.l.l..............l.l.l....',
    '================================',
  ],
  guardians: [
    // the penguin waiter shuffles to and fro under the table, between its legs
    { type: 'h', sprite: 'penguin', ink: 'white', bright: true, x: 12, y: 104, min: 9, max: 21, dir: 'right' },
    // champagne bottle popping up and down over the west end of the table
    { type: 'v', sprite: 'champagne', ink: 'green', x: 9, y: 32, min: 32, max: 72, dy: 2, anim: 'slow' },
    // a plate skimming along the east end of the table
    { type: 'd', sprite: 'plate', ink: 'cyan', x: 144, y: 72, dx: 2, dy: 0, count: 16, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Service With a Smirk [9,10] - difficulty 2.
// The dumbwaiter: a lift (cols 23-25) rides from the floor up to the serving shelf (row 4, cols 26-29) right
// under the billiard-room hatch (rows 0-1 open over cols 26-29) - hop up through it to reach the first floor.
// In the floor a second hatch (gap cols 18-19, grating cols 20-21) drops to the Kitchen's pass shelf; the
// kitchen dumbwaiter pops you back up onto the grating. A steel counter with a hot plate blocks the west end,
// patrolled by a waddling teapot; a plate keeps popping up out of the floor hatch. Item: the service bell.
JSW.defineRoom({
  id: 'the_servery',
  name: 'Service With a Smirk',
  region: 'mansion',
  pos: [9, 10],
  border: 'cyan',
  item: 'bell',
  tiles: {
    '.': { type: 'air', ink: 'cyan', paper: 'black' },
    '#': { type: 'wall', tile: 'brick_small', ink: 'cyan', paper: 'blue' },
    'H': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'black', bright: true },
    'S': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'cyan', paper: 'black', bright: true },
    'g': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'black', bright: true },
    'K': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'yellow' },
    'R': { type: 'wall', tile: 'bookshelf', ink: 'white', paper: 'blue', bright: true },
    '^': { type: 'nasty', tile: 'fire_grate', ink: 'red', paper: 'black', bright: true },
  },
  map: [
    '##########################....##',
    '##....................HHHH....##',
    '##...........................+##',
    '##............................##',
    '##........................SSSS##',
    '##..RRRRRR....................##',
    '##..RRRRRR....................##',
    '##..RRRRRR....................##',
    '##............................##',
    '##............................##',
    '##............................##',
    '................................',
    '................................',
    '....CCC^CCCCCCC.................',
    '....KKKKKKKKKKK.................',
    '==================..gg==========',
  ],
  guardians: [
    // the dumbwaiter: floor 15 <-> serving shelf (row 4)
    { type: 'lift', x: 23, width: 3, top: 4, bottom: 15, start: 15, period: 4, dir: 'down' },
    // a teapot waddling along the east half of the counter
    { type: 'd', sprite: 'teapot', ink: 'magenta', x: 80, y: 88, dx: 1, dy: 0, count: 24, anim: 'slow' },
    // a plate popping up out of the kitchen hatch and dropping back
    { type: 'v', sprite: 'plate', ink: 'white', x: 18, y: 40, min: 40, max: 80, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 4, y: 3, text: 'RING FOR SERVICE', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Pipe Dreams [10,10] - difficulty 2.
// A fug of pipe smoke (the whole room is hazy). Two buttoned-leather armchairs squat on the floor - hop over
// them - while the butler paces the rug between them with his cigar tray. Climb armchair -> sideboard (row 11)
// -> mantelpiece (row 9, under the ancestral portrait) for the pipe; smoke rings drift across both jumps.
JSW.defineRoom({
  id: 'gentlemens_smoking_room',
  name: 'Pipe Dreams',
  region: 'mansion',
  pos: [10, 10],
  border: 'magenta',
  item: 'pipe',
  tiles: {
    '.': { type: 'air', tile: 'bubbles_faint', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },
    'B': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'red' },
    'P': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'magenta', bright: true },
    'A': { type: 'wall', tile: 'rivets', ink: 'red', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'rug', ink: 'green', paper: 'black', bright: true },
    'S': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'M': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##.................BBBB.......##',
    '##.................BPPB.......##',
    '##.................BPPB.......##',
    '##.................BBBB.......##',
    '##.................BBBB.......##',
    '##............................##',
    '##............................##',
    '##...................+........##',
    '##................MMMMMM......##',
    '##............................##',
    '...........SSSSSSS..............',
    '................................',
    '......AAA.............AAA.......',
    '......AAA.............AAA.......',
    '================================',
  ],
  guardians: [
    // the butler with his cigar tray paces the rug between the armchairs
    { type: 'h', sprite: 'butler', ink: 'white', bright: true, x: 14, y: 104, min: 11, max: 18, dir: 'right' },
    // smoke rings drifting up and down across the armchair -> sideboard jump
    { type: 'v', sprite: 'bubble', ink: 'cyan', x: 9, y: 40, min: 40, max: 88, dy: 1, anim: 'slow' },
    // ... and across the sideboard -> mantelpiece jump
    { type: 'v', sprite: 'bubble', ink: 'white', x: 17, y: 56, min: 16, max: 56, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Cloak and Dagger Room [11,10] - difficulty 2.
// Coats on the west wall, a boot bench (row 13), a parcel shelf (row 11) and the hat rack (row 9) with a
// rack of daggers hanging underneath it - so land on the rack from the side, never jump up into it.
// In the east the servants' stair comes up through the floor onto a little stair-head: walking west over it
// takes you straight down to the Servants' Hall, so hop from the stair-head to go on west.
JSW.defineRoom({
  id: 'the_cloakroom',
  name: 'Cloak and Dagger Room',
  region: 'mansion',
  pos: [11, 10],
  border: 'yellow',
  item: 'spectacles',
  tiles: {
    '.': { type: 'air', ink: 'yellow', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'yellow', paper: 'blue' },
    'C': { type: 'wall', tile: 'bark', ink: 'red', paper: 'black', bright: true },
    'D': { type: 'wall', tile: 'bark', ink: 'cyan', paper: 'black', bright: true },
    'E': { type: 'wall', tile: 'bark', ink: 'green', paper: 'black', bright: true },
    'X': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    'b': { type: 'floor', tile: 'plank', ink: 'green', paper: 'black', bright: true },
    's': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },
    'h': { type: 'floor', tile: 'chain_h', ink: 'magenta', paper: 'black', bright: true },
    'v': { type: 'nasty', tile: 'spikes_down', ink: 'white', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##CCDD...........CCDDEECC.....##',
    '##CCDD...........CCDDEECC.....##',
    '##CCDD...........CCDDEECC.....##',
    '##CCDD...........CCDD..CC.....##',
    '##............................##',
    '##............................##',
    '##............+.X.............##',
    '##..............X.............##',
    '##..........hhhhX.............##',
    '##...........vv...............##',
    '.........ssss...................',
    '................................',
    '....bbbb..........bbbb..........',
    '........................../XX...',
    '=========================/XXX===',
  ],
  guardians: [
    // a runaway roller skate between the boot bench and the galosh rack
    { type: 'h', sprite: 'roller_skate', ink: 'cyan', bright: true, x: 12, y: 104, min: 8, max: 16, dir: 'left' },
    // a bat (somebody's opera cloak?) flapping over the stair-head
    { type: 'v', sprite: 'bat', ink: 'magenta', x: 26, y: 40, min: 40, max: 80, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Not-So-Great Hall [12,10] - difficulty 1 (the easy junction to the grounds).
// The grand staircase comes down from A Landing Strip through the ceiling (ramp cells (22,0),(23,1)) onto
// the minstrels' gallery (row 5); step off its east end onto the half-landing (row 7), then the lower
// flight runs down-left onto the dais (row 13). Going up: dais -> flight -> half-landing -> hop up to the
// gallery -> walk left up the stairs. The floor-15 walk from the west door to the porch passes under it all.
// Item: the mantel clock, via the log basket (row 13) and the mantelpiece (row 11).
JSW.defineRoom({
  id: 'the_great_hall',
  name: 'The Not-So-Great Hall',
  region: 'mansion',
  pos: [12, 10],
  border: 'red',
  item: 'clock',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'red' },
    'F': { type: 'wall', tile: 'brick_small', ink: 'red', paper: 'yellow' },
    'P': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'blue', bright: true },
    'W': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue' },
    'X': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
    'G': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    'd': { type: 'floor', tile: 'carpet', ink: 'red', paper: 'black', bright: true },
    'M': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
    'l': { type: 'floor', tile: 'bark', ink: 'yellow', paper: 'black' },
    '/': { type: 'ramp', tile: 'stairs', ink: 'red', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'red', paper: 'black', bright: true },
  },
  map: [
    '######################\\...######',
    '##...........WWWWW.....\\......##',
    '##...FFFFF...WWWWW......\\.....##',
    '##...FPPPF...WWWWW..X....\\....##',
    '##...FPPPF..........X.....\\...##',
    '##...FFFFF..........XGGGGGGG..##',
    '##...FFFFF....................##',
    '##...FFFFF................/GGG##',
    '##...FFFFF.............../....##',
    '##....................../.....##',
    '##.....+.............../........',
    '....MMMMMMM.........../.........',
    '...................../..........',
    '............ll...ddddd..........',
    '................................',
    '================================',
  ],
  guardians: [
    // the suit of armour stomping to and fro in front of the porch door
    { type: 'h', sprite: 'knight', ink: 'cyan', bright: true, x: 24, y: 104, min: 22, max: 26, dir: 'left' },
    // the resident ghost drifting up and down beside the log basket
    { type: 'v', sprite: 'ghost', ink: 'white', x: 11, y: 40, min: 40, max: 80, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Mind the Doorstep [13,10] - difficulty 1.
// The pillared porch: a stone roof over classical pilasters framing the two tall doorways (open rows 10-14).
// A stack of milk crates (steps at rows 13 and 11) stands in the way with the milk bottle on top; the cat
// prowls the doormat side and a blue tit swoops under the roof after the foil tops. At the front door a
// boot-scraper doorstep (row 14) trips the unwary. Sign: THE GROUNDS ->.
JSW.defineRoom({
  id: 'the_front_porch',
  name: 'Mind the Doorstep',
  region: 'mansion',
  pos: [13, 10],
  border: 'green',
  item: 'bottle',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },
    'R': { type: 'wall', tile: 'brick', ink: 'red', paper: 'white', bright: true },
    'E': { type: 'wall', tile: 'marble', ink: 'white', paper: 'cyan' },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'blue', bright: true },
    'K': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'red' },
    'S': { type: 'wall', tile: 'grate', ink: 'black', paper: 'yellow' },
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
    'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
    '##EE........................EE##',
    '##PP........................PP##',
    '##PP........................PP##',
    '##PP........................PP##',
    '##PP........................PP##',
    '##PP........................PP##',
    '##PP...........+............PP##',
    '................................',
    '..............KK................',
    '..............KK................',
    '............KKKKKK..............',
    '............KKKKKK.......SSSSS..',
    '================================',
  ],
  guardians: [
    // the cat prowling the doormat side of the crates
    { type: 'h', sprite: 'cat', ink: 'magenta', bright: true, x: 6, y: 104, min: 4, max: 8, dir: 'right' },
    // a blue tit swooping under the porch roof, after the milk-bottle tops
    { type: 'h', sprite: 'bird', ink: 'cyan', bright: true, x: 10, y: 32, min: 5, max: 24, dir: 'right' },
  ],
  special: {
    signs: [{ x: 13, y: 7, text: 'THE GROUNDS ->', ink: 'yellow' }],
  },
});
