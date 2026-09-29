// Jet Set Wally II - grounds: the conker tree (grid col 17-18, rows 6-11), from the roots to the crow's-eye view.
// Author file: src/data/rooms/grounds_tree.js  (region 'grounds')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.

// ---------------------------------------------------------------------------------------------------------
// Tangled Roots [17,11] - difficulty 3. A maze of roots under the tree. The burrow from Base Camp drops onto the
// root at row 4 (cols 20-23, also the jump-off ledge back up). The right half zigzags down root floors to the
// earth floor; a crack at cols 8-9 is the secret root shaft into the cellars (arrivals stand on cols 10-11).
// Hop the crack into the west pocket and climb the roots to the carrot at the top left. Moles, a slug and worms.
JSW.defineRoom({
  id: 'tangled_roots',
  name: 'Tangled Roots',
  region: 'grounds',
  pos: [17, 11],
  border: 'red',
  item: 'carrot',
  tiles: {
    '.': { type: 'air', ink: 'green', paper: 'black' },
    '#': { type: 'wall', tile: 'earth', ink: 'yellow', paper: 'red' },
    'R': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'branch', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '####################....########',
    '#RRRR.........RR...R....RR....R#',
    '#RR...........RR.............+.#',
    '#R.+..........RR...............#',
    '#R............RR....====.......#',
    '#R====........RR...............#',
    '#R............RR........======.#',
    '#R......====..RR...............#',
    '#R............RR..======.......#',
    '#RR====.......RR...............#',
    '#R............RR........======.#',
    '#R......=====.RR...............#',
    '#.............RR..=====........#',
    '#..====...................====.#',
    '#..............................#',
    '########..==####################',
  ],
  guardians: [
    // a mole snuffles along the earth floor between the crack and the lowest root
    { type: 'h', sprite: 'mole', ink: 'white', bright: true, x: 14, y: 104, min: 13, max: 24, dir: 'right' },
    // a slime creeps along the middle root - time the zigzag around it
    { type: 'h', sprite: 'slime', ink: 'green', bright: true, x: 19, y: 48, min: 18, max: 22, dir: 'left' },
    // a worm dangles across the leap from the upper root to the carrot shelf
    { type: 'v', sprite: 'worm', ink: 'magenta', x: 6, y: 8, min: 8, max: 24, dy: 1, anim: 'slow' },
    // a worm guards the pocket by the burrow
    { type: 'v', sprite: 'worm', ink: 'red', x: 26, y: 24, min: 8, max: 24, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Conker Tree Base Camp [17,10] - difficulty 3. The foot of a colossal conker tree; someone has pitched a pup tent
// under the canopy. Floor 15 runs door to door: walk up and over the tent, jump the campfire, dodge the squirrel,
// hop (or take) the burrow at cols 20-23 into the Tangled Roots. A root knuckle (row 13) and a landing (row 11) lead to the carved steps
// that climb up-left through the trunk and out of the ceiling at cols 15-16 into the Heart of Conker. The mug sits
// on the high knuckle (row 9) under a falling conker. Conkers drop from the canopy.
JSW.defineRoom({
  id: 'conker_tree_base_camp',
  name: 'Conker Tree Base Camp',
  region: 'grounds',
  pos: [17, 10],
  border: 'green',
  item: 'cup',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'p': { type: 'ramp', tile: 'slope_grass', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },  // the pup tent:
    'q': { type: 'ramp', tile: 'slope_grass', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },   // walk up and over it
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'red' },
    '#': { type: 'wall', tile: 'earth', ink: 'green', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    'L': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'left' },
    'F': { type: 'nasty', tile: 'flames', ink: 'yellow', paper: 'red', bright: true, flash: true },
  },
  map: [
    'HHHHHHHHHBBBBBBL...BBBBBHHHHHHHH',
    'HHHHHH.HHBBBBBBBL...BBBBHH..HHHH',
    'HHH......BBBBBBBBL...BBB......HH',
    'HH.......BBBBBBBBBL...BB......HH',
    'HH.......BBBBBBBBBBL...B......HH',
    'HH.......BBBBBBBBBBBL.........HH',
    'HH.......BBBBBBBBBBBBL........HH',
    'HH.......BBBBBBBBBBBBBL......+HH',
    'HH......BBBBBBBBBBBBBBBL......HH',
    'HH.....BBBBBBBBBBBBBBBBBL...==.H',
    'HH.......................L.....H',
    '.........................====...',
    '................................',
    '....pq.....................===..',
    '...p..q...FF....................',
    '####################..==########',
  ],
  guardians: [
    // a squirrel scampers between the campfire and the burrow
    { type: 'h', sprite: 'squirrel', ink: 'red', bright: true, x: 13, y: 104, min: 13, max: 18, dir: 'right' },
    // a conker drops out of the canopy onto the ridge of the tent
    { type: 'v', sprite: 'leaf', ink: 'yellow', x: 5, y: 16, min: 16, max: 80, dy: 2, anim: 'slow' },
    // another conker drops past the high knuckle beside the steps
    { type: 'v', sprite: 'leaf', ink: 'cyan', x: 26, y: 40, min: 16, max: 56, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Heart of Conker [17,9] - difficulty 3. Inside the hollow trunk: the carved steps arrive from Base Camp at cols
// 15-16 and wind up-left to a half-landing (row 9), switch back up-right to the upper landing (row 4), then it's
// a leap onto the woodland vine (rope, col 16) that climbs into the Great Fork. The knot shelf (row 4, cols 17-20)
// catches drops from the Fork; from it the knots step down the east side past two knotholes to the trunk floor,
// where the gap beside the steps (cols 17-18) drops you back into Base Camp. Woodworms and an owl.
JSW.defineRoom({
  id: 'heart_of_conker',
  name: 'Heart of Conker',
  region: 'grounds',
  pos: [17, 9],
  border: 'magenta',
  item: 'ring',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'red' },
    '=': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    'L': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'left' },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    '###############....#############',
    '#######........................#',
    '######.........................#',
    '#####...................+......#',
    '####.../=====....====..........#',
    '###.../........................#',
    '##.../.........................#',
    '#.../.................====...+.#',
    '#../...........................#',
    '#=========L....................#',
    '###########L..............====.#',
    '############L..................#',
    '#############L......=====......#',
    '##############L................#',
    '###############L...............#',
    '################L..#############',
  ],
  guardians: [
    // the vine: leap onto it from the upper landing and climb into the Great Fork
    { type: 'rope', x: 16, length: 20 },
    // the owl bobs by the east knotholes
    { type: 'v', sprite: 'owl', ink: 'white', x: 27, y: 8, min: 8, max: 48, dy: 1, anim: 'slow' },
    // a woodworm wriggles under the upper landing, over the half-landing
    { type: 'v', sprite: 'worm', ink: 'magenta', x: 10, y: 40, min: 40, max: 56, dy: 1, anim: 'slow' },
    // a woodworm dangles over the lowest knot
    { type: 'v', sprite: 'worm', ink: 'green', x: 21, y: 64, min: 64, max: 80, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Great Fork [17,8] - difficulty 4. The trunk splits into the west bough (top at row 13, door to the Squirrel's
// Larder) and the east bough (top at row 9, door to the Owl's Branch Office). The vine lands you on the trunk top
// (row 15, cols 15-16); the gap beside it (cols 17-18) drops back into the Heart. Knots zigzag up across the
// fork - west bough, knot (11), east bough, knot (7), knot (5) - to the knot ledge at row 3 under the hole in the
// leaves: jump straight up into the Leafy Canopy (one way). The teddy is stuck in the crotch under the east bough.
JSW.defineRoom({
  id: 'the_great_fork',
  name: 'The Great Fork',
  region: 'grounds',
  pos: [17, 8],
  border: 'yellow',
  item: 'teddy',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'red' },
    '=': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHH..HHHHHHHHHHHHHHHHHH',
    'HHHHHHHHHH......HHHHHHHHHHHHHHHH',
    'HHHHHHH............HHHHHHHHHHHHH',
    'HHHHH.......==........HHHHHHHHHH',
    'HHH........................HHHHH',
    'HH........====..................',
    'HH..............................',
    'HH..............====............',
    'HH..............................',
    '.....................BBBBBBBBBBB',
    '......................BBBBBBBBBB',
    '................====...........B',
    '...............................B',
    'BBBBBBBBBBBBBB.............+...B',
    'BBBBBBBBBBBBBB.................B',
    'BBBBBBBBBBBBBBB==..BBBBBBBBBBBBB',
  ],
  guardians: [
    // a caterpillar dangles from the east bough, guarding the teddy in the crotch
    { type: 'v', sprite: 'caterpillar', ink: 'green', x: 23, y: 88, min: 88, max: 104, dy: 1, anim: 'slow' },
    // a caterpillar hangs over the leap from the high knot to the top knot
    { type: 'v', sprite: 'caterpillar', ink: 'magenta', x: 15, y: 16, min: 16, max: 32, dy: 1, anim: 'slow' },
    // a bee zooms down across the middle of the fork
    { type: 'd', sprite: 'bee', ink: 'yellow', x: 40, y: 40, dx: 2, dy: 1, count: 36, anim: 'fast' },
    // a bee buzzes about the east doorway
    { type: 'v', sprite: 'bee', ink: 'cyan', x: 26, y: 40, min: 40, max: 56, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Squirrel's Larder [16,8] - difficulty 4. Dead end: the west bough comes in from the Great Fork at row 13 and
// thins to a branch the squirrel runs along, then to bare twigs over a bramble patch (touch it and you're jam).
// Hop twig to twig - up, up, down, up - to the squirrel's stash at the very tip: one cherry on the tip twig, one
// up in the leaves above it (jump). Rooks swoop down across the twigs and a bee guards the widest gap.
JSW.defineRoom({
  id: 'squirrels_larder',
  name: "Squirrel's Larder",
  region: 'grounds',
  pos: [16, 8],
  border: 'blue',
  item: 'cherry',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'red' },
    '=': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'branch', ink: 'green', paper: 'black', bright: true },
    '*': { type: 'nasty', tile: 'thorns', ink: 'red', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HHHHHH....HHHHHHHH....HHHHHHHHHH',
    'HHH........HHHH.........HHHHHHHH',
    'H............H...........HHHHHHH',
    'H.+......................HHHHHHH',
    'H.........................HHHHHH',
    'H.+........................HHHHH',
    'H...........................HHHH',
    'H--..........................HHH',
    'H........--.....................',
    'H...--..........................',
    'H............---................',
    'H...............................',
    'H.................=======BBBBBBB',
    'H************************BBBBBBB',
    'HHHHHHHHHHHHHHHHHHHHHHHHHBBBBBBB',
  ],
  guardians: [
    // the squirrel runs up and down the thin end of the bough
    { type: 'h', sprite: 'squirrel', ink: 'red', bright: true, x: 20, y: 88, min: 18, max: 22, dir: 'left' },
    // a rook swoops down over the middle twigs
    { type: 'd', sprite: 'bird', ink: 'cyan', x: 48, y: 24, dx: 1, dy: 1, count: 32, anim: 'fast' },
    // a second rook dives at the first leap off the bough
    { type: 'd', sprite: 'bird', ink: 'white', x: 160, y: 40, dx: -1, dy: 1, count: 32, anim: 'fast' },
    // a bee hovers in the widest gap, before the tip
    { type: 'v', sprite: 'bee', ink: 'yellow', x: 6, y: 56, min: 56, max: 88, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Owl's Branch Office [18,8] - difficulty 4. The east bough (top at row 9) runs from the Great Fork's door into a
// hollow the owl has fitted out as an office: desk (row 7), filing cabinet (top at row 5) and the in-tray on top of
// it. The Rookery drops in through the leaves at cols 20-21 onto the twig platform (row 4), which steps down via a
// twig (row 8) to the bough; hop west off the platform to the twig tip for the second letter. The owl glides
// down over the west end of the bough, a bee hovers under the platform and a caterpillar crawls up the office wall.
JSW.defineRoom({
  id: 'owls_branch_office',
  name: "Owl's Branch Office",
  region: 'grounds',
  pos: [18, 8],
  border: 'cyan',
  item: 'envelope',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'red' },
    'F': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'blue', bright: true },
    '-': { type: 'floor', tile: 'branch', ink: 'green', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHH..HHHHHHHHHH',
    'HHHHHHHHHHHHHHHHHH....HHBBBBBBBB',
    'H.........HHHHHH........B......B',
    'H..........+............B.....+B',
    'H.................------B......B',
    '...........----.............FFFB',
    '............................FFFB',
    '.........................___FFFB',
    '...............----.........FFFB',
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
  ],
  guardians: [
    // the owl glides down across the west end of the bough
    { type: 'd', sprite: 'owl', ink: 'white', x: 16, y: 16, dx: 1, dy: 1, count: 40, anim: 'slow' },
    // a caterpillar crawls up and down the office wall above the desk
    { type: 'v', sprite: 'caterpillar', ink: 'green', x: 25, y: 16, min: 16, max: 40, dy: 1, anim: 'slow' },
    // a bee hovers under the west end of the twig platform
    { type: 'v', sprite: 'bee', ink: 'yellow', x: 16, y: 40, min: 40, max: 48, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Leafy Canopy [17,7] - difficulty 4. A dense ceiling of leaves with one-way leaf floors at many heights. You
// pop up from the Great Fork onto the leaf at cols 12-13 (floor 15). Leaf floors zigzag up both sides of a bee's
// flight path (cols 19-20) to the high leaf (row 6), from which you leap onto the creeper (rope, col 11) and climb
// to A Crow's-Eye View. The leaf at row 4 (cols 6-9) catches drops from the Crow's-Eye View; the west leaves step
// down from it. The flower hides among the leaves at the east end (jump for it). Floor 15 runs east to the Rookery.
JSW.defineRoom({
  id: 'the_leafy_canopy',
  name: 'The Leafy Canopy',
  region: 'grounds',
  pos: [17, 7],
  border: 'blue',
  item: 'flower',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    '~': { type: 'floor', tile: 'grass_top', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHH....HHHHHHHHHHHHHHHHHHHH',
    'HHHHHH...........HHHHHHHHHHHHHHH',
    'HHHH...............HHHH..HHHHHHH',
    'HH............................HH',
    'H.....~~~~...................+.H',
    'H..............................H',
    'H.............~~~~.............H',
    'H....................~~~~..~~~~H',
    'H.~~~~.........................H',
    'H..............~~~~............H',
    'H..............................H',
    'H....~~~~............~~~~.......',
    'H...............................',
    'H..............~~~~.............',
    'H...............................',
    'HHHHHHHHHHHH~~HHHHHHHHHHHHHHHHHH',
  ],
  guardians: [
    // the creeper up to A Crow's-Eye View
    { type: 'rope', x: 11, length: 24 },
    // a bee patrols the gap between the two stacks of leaves
    { type: 'v', sprite: 'bee', ink: 'yellow', x: 19, y: 48, min: 48, max: 104, dy: 2, anim: 'fast' },
    // a butterfly flutters down towards the Rookery door
    { type: 'd', sprite: 'butterfly', ink: 'magenta', x: 200, y: 80, dx: 1, dy: 1, count: 16, anim: 'slow' },
    // a butterfly guards the flower
    { type: 'd', sprite: 'butterfly', ink: 'cyan', x: 192, y: 24, dx: 1, dy: 1, count: 16, anim: 'slow' },
    // a butterfly bobs beside the catch leaf
    { type: 'v', sprite: 'butterfly', ink: 'white', x: 3, y: 24, min: 24, max: 40, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Rookery [18,7] - difficulty 4. Rooks' nests on the eastern crown. From the Canopy door (floor 15) climb the
// nests - 13, 11, 10, 8, 6 - and leap to the highest nest (row 4) where the rooks have stashed a silver spoon.
// Walk off its east side and drop nest to nest back to the bough; the gap at cols 20-21 (DOWN ->) drops through
// the leaves onto the Owl's Branch Office twig platform (one way). A squirrel patrols the bough; rooks swoop.
JSW.defineRoom({
  id: 'the_rookery',
  name: 'The Rookery',
  region: 'grounds',
  pos: [18, 7],
  border: 'magenta',
  item: 'spoon',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    'B': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'red' },
    'n': { type: 'floor', tile: 'rope_bridge', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HHHHHHHHHHHHH.............HHHHHH',
    'HHHHHHH.................+...HHHH',
    'HHH...........................HH',
    'HH....................nnnn.....H',
    'H..............................H',
    'H..............nnnn............H',
    'H..............................H',
    'H........nnnn.............nnnn.H',
    'H..............................H',
    'H..nnnn........................H',
    '.........nnnn..................H',
    '......................nnnn.....H',
    '....nnnn.......................H',
    '...............................H',
    'BBBBBBBBBBBBBBBBBBBB..BBBBBBBBBB',
  ],
  guardians: [
    // a squirrel patrols the bough between the Canopy door and the drop
    { type: 'h', sprite: 'squirrel', ink: 'red', bright: true, x: 12, y: 104, min: 9, max: 17, dir: 'right' },
    // a rook swoops down to the bough by the drop
    { type: 'd', sprite: 'bird', ink: 'white', x: 104, y: 64, dx: 1, dy: 1, count: 40, anim: 'fast' },
    // a rook dives across the west nests
    { type: 'd', sprite: 'bird', ink: 'cyan', x: 24, y: 24, dx: 1, dy: 1, count: 32, anim: 'fast' },
    // a rook guards the leap to the highest nest
    { type: 'd', sprite: 'bird', ink: 'magenta', x: 160, y: 8, dx: -1, dy: 1, count: 16, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 13, y: 12, text: 'DOWN ->', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// A Crow's-Eye View [17,6] - difficulty 5, the hardest room of the grounds (two spare items). The very top of the
// tree, swaying in the wind: the creeper delivers you onto a twig at cols 10-11 (floor 15); the gap beside it
// (cols 8-9) drops back to the Canopy's catch leaf. Everything else below is thorny twig tips. Tiny perches every
// two rows zigzag up past a hovering bee to the two feathers at row 3 - mind the wind gusts (arrows, rows 6 and
// 10), the hawk and the crow. Walk off the top perches to come back down (4 rows onto the perch below).
JSW.defineRoom({
  id: 'crows_eye_view',
  name: "A Crow's-Eye View",
  region: 'grounds',
  pos: [17, 6],
  border: 'cyan',
  item: 'feather',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'C': { type: 'wall', tile: 'cloud_solid', ink: 'white', paper: 'cyan', bright: true },
    'H': { type: 'wall', tile: 'hedge', ink: 'green', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    'x': { type: 'nasty', tile: 'thorns', ink: 'red', paper: 'black', bright: true },
  },
  map: [
    'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    'C..............................C',
    'C..............................C',
    'C...........+..........+.......C',
    'C..............................C',
    'C...........--........--.......C',
    'C..............................C',
    'C................--............C',
    'C..............................C',
    'C............--......--........C',
    'C..............................C',
    'C................--............C',
    'C..............................C',
    'C............--................C',
    'Cxxxxxx......xxxxxxxxxxxxxxxxxxC',
    'HHHHHHHH..--HHHHHHHHHHHHHHHHHHHH',
  ],
  guardians: [
    // wind gusts
    { type: 'arrow', dir: 'right', y: 51 },
    { type: 'arrow', dir: 'left', y: 83 },
    // the hawk stoops across the western feather
    { type: 'd', sprite: 'bird', ink: 'yellow', x: 48, y: 8, dx: 2, dy: 1, count: 16, anim: 'fast' },
    // a crow glides down the east side past the eastern feather
    { type: 'd', sprite: 'bird', ink: 'white', x: 232, y: 8, dx: -1, dy: 1, count: 48, anim: 'fast' },
    // a bee hovers between the lower perches
    { type: 'v', sprite: 'bee', ink: 'magenta', x: 15, y: 72, min: 72, max: 96, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 1, y: 12, text: '<- MANSION', ink: 'cyan' }],
  },
});
