// Jet Set Wally II - starship, mid deck (grid row 1, east) and lower deck (grid row 2).
// Author file: src/data/rooms/starship_b.js  (region 'starship')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.
// Space is entered only by one-way links; every room here leads back (via doors) to the Molecule Shuffler's
// HOME pad, so there is no soft-lock anywhere on the ship.

// ---------------------------------------------------------------------------------------------------------
// Hydroponic Spud Farm [12,1] - difficulty 3.
// Hydroponic trays zig-zag up the room (13 -> 11 -> 9 -> 7): no tray sits directly over the next, so every
// climb is a sideways hop. Prize-winning space potatoes pile up at the tray ends (walls). Slugs crawl the middle
// and top trays; a blob bobs in the west gap, the sprinkler drips over the east gap - pick your side.
JSW.defineRoom({
  id: 'hydroponic_spud_farm',
  name: 'Hydroponic Spud Farm',
  region: 'starship',
  pos: [12, 1],
  border: 'green',
  item: 'carrot',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'hull', ink: 'white', paper: 'blue', bright: true },
    'P': { type: 'wall', tile: 'rock', ink: 'yellow', paper: 'black', bright: true },      // space spuds
    'T': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true },     // hydroponic trays
    '-': { type: 'floor', tile: 'pipe_h', ink: 'cyan', paper: 'black', bright: true },     // sprinkler main
    '=': { type: 'floor', tile: 'girder', ink: 'white', paper: 'black', bright: true },    // deck
  },
  map: [
    '################################',
    '#..--------------------------..#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#...............+..............#',
    '#..............................#',
    '#..PP.......TTTTTTTT.......PP..#',
    '#..PP......................PP..#',
    '#..TTTTTTT............TTTTTTT..#',
    '#..............................#',
    '.....PP....TTTTTTTTTT....PP.....',
    '.....PP..................PP.....',
    '.....TTTTTTT........TTTTTTT.....',
    '................................',
    '================================',
  ],
  guardians: [
    // slugs crawling the middle and top trays
    { type: 'h', sprite: 'space_slug', ink: 'green', bright: true, x: 12, y: 72, min: 11, max: 19, dir: 'right' },
    { type: 'h', sprite: 'space_slug', ink: 'magenta', bright: true, x: 17, y: 40, min: 12, max: 18, dir: 'left' },
    // a blob bobbing in the west gap between the trays
    { type: 'v', sprite: 'blob', ink: 'yellow', x: 10, y: 24, min: 24, max: 72, dy: 1, anim: 'slow' },
    // the sprinkler dripping over the east gap
    { type: 'v', sprite: 'drip', ink: 'cyan', x: 20, y: 24, min: 24, max: 72, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 9, y: 2, text: 'GROW YOUR OWN', ink: 'green' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Robo-Kennels [13,1] - difficulty 4.
// An old robo-hound (normal speed) trots the deck between the hatch and the east steps; a young one (fast) races
// in and out of the big kennel along the gantry (11). Climb a step (13), the gantry and a perch (9) to the kennel
// roof (7) for the bone - the east route passes the patrol drone. The engine-room hatch (cols 6-7) is a one-way
// grating in the deck: Wally pops up through it from She Cannae Take It, clear of both dogs.
JSW.defineRoom({
  id: 'robo_kennels',
  name: 'Robo-Kennels',
  region: 'starship',
  pos: [13, 1],
  border: 'magenta',
  item: 'bone',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'rivets', ink: 'cyan', paper: 'blue', bright: true },
    'R': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red', bright: true },    // the kennel
    'p': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },      // perches
    's': { type: 'floor', tile: 'girder', ink: 'magenta', paper: 'black', bright: true },    // steps
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true }, // deck & gantry
    'g': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true, flash: true }, // hatch grating
  },
  map: [
    '################################',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#..............+...............#',
    '#..............................#',
    '#........RRRRRRRRRRRRR.........#',
    '#...................RR.........#',
    '#....ppp............RR..pppp...#',
    '#...................RR.........#',
    '........=================.......',
    '................................',
    '..ssss...................sssss..',
    '................................',
    '======gg========================',
  ],
  guardians: [
    // the young hound racing out of the kennel along the gantry (fast)
    { type: 'h', sprite: 'robo_dog', ink: 'cyan', bright: true, x: 14, y: 72, min: 8, max: 18, dir: 'left', speed: 2 },
    // the old hound trotting the deck, well clear of the hatch
    { type: 'h', sprite: 'robo_dog', ink: 'white', bright: true, x: 20, y: 104, min: 10, max: 22, dir: 'left' },
    // a patrol drone guarding the east approach to the roof
    { type: 'v', sprite: 'laser_drone', ink: 'red', x: 22, y: 16, min: 16, max: 56, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 3, y: 2, text: 'BEWARE OF THE DOGS', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Molecule Shuffler [14,1] - difficulty 4. The transporter room.
// Beams from the island and the planet land on the ARRIVALS pad (floor 15, cols 4-7). The HOME pad (cols 12-15)
// sits in a pit between two emitter housings, so nobody walks onto it by accident: hop onto a housing and cross
// the bridge (11), or step down into the pit to beam home to the Bathroom. East, the console steps (13, 11) lead
// to the operator's desk and the DEPARTURES dais (row 9, cols 20-23): one way to Planet Zarg. The robot operator
// paces his desk, a satellite bobs over the east end of the bridge and a scanner eye watches the arrivals lane.
JSW.defineRoom({
  id: 'molecule_shuffler',
  name: 'The Molecule Shuffler',
  region: 'starship',
  pos: [14, 1],
  border: 'cyan',
  item: 'chip',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'hull', ink: 'cyan', paper: 'blue', bright: true },
    'M': { type: 'wall', tile: 'circuit', ink: 'green', paper: 'black', bright: true },      // beam emitters
    'E': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'magenta', bright: true }, // pad housings
    '-': { type: 'floor', tile: 'girder', ink: 'white', paper: 'black', bright: true },      // bridge
    'c': { type: 'floor', tile: 'tiled_floor', ink: 'cyan', paper: 'black', bright: true },  // console desk
    's': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },      // console step
    '=': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black' },                     // deck
    'a': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },      // ARRIVALS pad
    'h': { type: 'floor', tile: 'grate', ink: 'magenta', paper: 'black', bright: true },     // HOME pad
    'D': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true },       // departures dais
  },
  map: [
    '################################',
    '#..............................#',
    '#..............................#',
    '#..MMMMMM..MMMMMM...MMMM.......#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#.......................+......#',
    '#..............................#',
    '#...................DDDD.......#',
    '#............................+.#',
    '..........--------......cccccc..',
    '................................',
    '..........EE....EE.......ssss...',
    '..........EE....EE..............',
    '====aaaa====hhhh================',
  ],
  guardians: [
    // the robot operator pacing his desk (well away from the pads)
    { type: 'h', sprite: 'robot', ink: 'yellow', bright: true, x: 27, y: 72, min: 26, max: 28, dir: 'left' },
    // a satellite bobbing over the east end of the bridge
    { type: 'v', sprite: 'satellite', ink: 'cyan', x: 18, y: 16, min: 16, max: 72, dy: 1, anim: 'slow' },
    // a scanner eye watching the arrivals lane
    { type: 'v', sprite: 'eyeball', ink: 'red', x: 8, y: 48, min: 48, max: 96, dy: 1, anim: 'slow' },
  ],
  special: {
    arrival: { x: 5, y: 104, facing: 'right' },
    portals: [
      { x: 12, y: 14, w: 4, h: 1, kind: 'teleport', to: 'the_bathroom' },
      { x: 20, y: 8, w: 4, h: 1, kind: 'teleport', to: 'welcome_to_zarg' },
    ],
    signs: [
      { x: 12, y: 5, text: 'HOME', ink: 'magenta', flash: true },
      { x: 2, y: 5, text: 'ARRIVALS', ink: 'yellow' },
      { x: 20, y: 5, text: 'PLANET ZARG', ink: 'green' },
      { x: 22, y: 6, text: 'ONE WAY', ink: 'green', flash: true },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Space Laundrette [15,1] - difficulty 3. Dead end at the east of the mid deck.
// Porthole washers (13) line the floor with ironing boards (11) and shelves (9, 7) above them, climbing east to
// the lost-sock basket (5) under the ceiling. One drum spins down on the floor between the washers, another spins
// over the gap to the top shelf; escaped socks drift about the upper air. An east ledge (9) gives a second way up.
JSW.defineRoom({
  id: 'space_laundrette',
  name: 'Space Laundrette',
  region: 'starship',
  pos: [15, 1],
  border: 'yellow',
  item: 'sock',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'bathroom_tiles', ink: 'white', paper: 'cyan' },
    'W': { type: 'wall', tile: 'window', ink: 'white', paper: 'blue', bright: true },       // washers
    '-': { type: 'floor', tile: 'shelf', ink: 'cyan', paper: 'black', bright: true },       // boards & shelves
    'k': { type: 'floor', tile: 'rope_bridge', ink: 'yellow', paper: 'black', bright: true }, // sock basket
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '#..............................#',
    '#..............................#',
    '#..........................+...#',
    '#........................k....k#',
    '#........................kkkkkk#',
    '#..............................#',
    '#....................----......#',
    '#..............................#',
    '#............-------.......----#',
    '#..............................#',
    '.........---.............----..#',
    '...............................#',
    '.....WWW.....WWW.....WWW.......#',
    '.....WWW.....WWW.....WWW.......#',
    '===============================#',
  ],
  guardians: [
    // a drum spinning up and down on the floor between the washers
    { type: 'v', sprite: 'fan', ink: 'cyan', x: 17, y: 80, min: 80, max: 104, dy: 1, anim: 'fast' },
    // another spinning over the gap to the top shelf
    { type: 'v', sprite: 'fan', ink: 'magenta', x: 19, y: 16, min: 16, max: 48, dy: 1, anim: 'fast' },
    // escaped socks drifting diagonally
    { type: 'd', sprite: 'bubble', ink: 'white', x: 56, y: 40, dx: 1, dy: 1, count: 24, anim: 'slow' },
    { type: 'd', sprite: 'bubble', ink: 'green', x: 112, y: 8, dx: 1, dy: 1, count: 24, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 2, y: 2, text: 'SERVICE WASH', ink: 'cyan' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Torpedo Bay (Loaded) [9,2] - difficulty 4. Dead end west of the hold.
// Three torpedo tubes open into the bay: two in the west bulkhead (7-8 and 11-12) and one in the east (7-8).
// Torpedoes streak the length of the bay along rows 8 and 12 - straight through the tubes - so grab the two
// warheads (in tubes A and C) between shots. Racks (11) are the safe level between the two firing lines. A laser
// drone sweeps the middle from ceiling to deck and a tripod loader stomps along the east rack.
JSW.defineRoom({
  id: 'torpedo_bay',
  name: 'Torpedo Bay (Loaded)',
  region: 'starship',
  pos: [9, 2],
  border: 'red',
  item: 'rocket',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'T': { type: 'wall', tile: 'hull', ink: 'yellow', paper: 'red', bright: true },
    '-': { type: 'floor', tile: 'girder', ink: 'cyan', paper: 'black', bright: true },
    'r': { type: 'floor', tile: 'pipe_h', ink: 'red', paper: 'black', bright: true },      // torpedo racks
    '=': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    'TTTT........................TTTT',
    'TTTT........................TTTT',
    'TTTT........................TTTT',
    'TTTT........................TTTT',
    'TTTT........................TTTT',
    'TTTT........................TTTT',
    'T..............................T',
    'T+............................+T',
    'TTTT-----...............----TTTT',
    'TTTT........................TTTT',
    'T.......rrrrrr....rrrrrr........',
    'T...............................',
    'TTTT----...............----.....',
    'TTTT............................',
    'TTTT============================',
  ],
  guardians: [
    // torpedoes: row 8 fired west, row 12 fired east
    { type: 'arrow', dir: 'left', y: 67 },
    { type: 'arrow', dir: 'right', y: 99 },
    // a laser drone sweeping the middle of the bay, ceiling to deck
    { type: 'v', sprite: 'laser_drone', ink: 'magenta', x: 15, y: 16, min: 16, max: 104, dy: 1, anim: 'fast' },
    // a tripod loader stomping along the east rack
    { type: 'h', sprite: 'tripod', ink: 'green', bright: true, x: 18, y: 72, min: 18, max: 22, dir: 'right' },
  ],
  special: {
    signs: [{ x: 5, y: 3, text: 'NO SMOKING', ink: 'red', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Hold Everything! [10,2] - difficulty 3. The cargo hold.
// The deck (15) runs door to door under a mezzanine (11); pallets (13) are the steps up. Halfway along, the
// loader belt (row 11, pushing east) delivers Wally to the foot of the crate mountain: crates stacked in 2-row
// steps (9, 7) with the flashing prize on the tallest stack. A ufo drone bobs over the belt, the robot forklift
// and a cargo buggy share the deck below. Two crates dangle from the ceiling hoists, just for show.
JSW.defineRoom({
  id: 'hold_everything',
  name: 'Hold Everything!',
  region: 'starship',
  pos: [10, 2],
  border: 'blue',
  item: 'teddy',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'blue' },
    'C': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'red', bright: true },       // cargo crates
    'H': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'black' },                    // hoist chains
    '-': { type: 'floor', tile: 'girder', ink: 'cyan', paper: 'black', bright: true },      // mezzanine
    '>': { type: 'conveyor', tile: 'belt_arrows', ink: 'green', paper: 'black', bright: true, dir: 'right' }, // loader
    'k': { type: 'floor', tile: 'shelf', ink: 'magenta', paper: 'black', bright: true },    // pallets
    '=': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },      // deck
  },
  map: [
    '################################',
    '#....H.....................H...#',
    '#....H.....................H...#',
    '#...CCC...................CCC..#',
    '#...CCC...................CCC..#',
    '#..................+...........#',
    '#..............................#',
    '#.................CCCC.........#',
    '#.................CCCC.........#',
    '#...............CCCCCCCC.......#',
    '#...............CCCCCCCC.......#',
    '.....----->>>>>>-----------.....',
    '................................',
    '..kkk......................kkk..',
    '................................',
    '================================',
  ],
  guardians: [
    // the robot forklift trundling the west deck
    { type: 'h', sprite: 'robot', ink: 'yellow', bright: true, x: 8, y: 104, min: 5, max: 13, dir: 'right' },
    // a cargo buggy on the east deck
    { type: 'h', sprite: 'moon_buggy', ink: 'cyan', bright: true, x: 22, y: 104, min: 17, max: 25, dir: 'left' },
    // the ufo drone bobbing over the loader belt
    { type: 'v', sprite: 'ufo', ink: 'magenta', x: 12, y: 16, min: 16, max: 72, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 14, y: 2, text: 'THIS SIDE UP', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Grav Tube: Going Down [11,2] - difficulty 3. Bottom of the turbo-lift column.
// Inside the glass tube the Deck C lift (cols 16-18) shuttles between the deck (15) and the platform (row 4)
// under the Deck B shaft: ride up, step across for the bell and jump up into Deck B - or drop down from Deck B,
// grab the bell and time your step back onto the lift (the tube is far too tall to jump down). A laser drone
// swoops across the west deck, the lift attendant paces beside it and a grav beam pumps by the east hatch.
JSW.defineRoom({
  id: 'turbo_lift_c',
  name: 'Grav Tube: Going Down',
  region: 'starship',
  pos: [11, 2],
  border: 'green',
  item: 'bell',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'hull', ink: 'magenta', paper: 'black', bright: true },
    'K': { type: 'wall', tile: 'circuit', ink: 'yellow', paper: 'blue', bright: true },    // lift call console
    'G': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },      // glass tube casing
    'P': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },    // Deck C platform
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '####################....########',
    '#.............GG........GG.....#',
    '#.............GG........GG.....#',
    '#.............GG......+.GG.....#',
    '#.............GG....PPPPGG.....#',
    '#.............GG........GG.....#',
    '#.............GG........GG.....#',
    '#.............GG........GG.....#',
    '#KKK..........GG........GG.....#',
    '#KKK...........................#',
    '#KKK...........................#',
    '................................',
    '................................',
    '................................',
    '................................',
    '================================',
  ],
  guardians: [
    // the Deck C lift: deck (15) <-> platform level (4)
    { type: 'lift', x: 16, width: 3, top: 4, bottom: 15, start: 15, period: 4, dir: 'down' },
    // the lift attendant pacing the west deck
    { type: 'h', sprite: 'robot', ink: 'green', bright: true, x: 6, y: 104, min: 4, max: 11, dir: 'right' },
    // a laser drone swooping diagonally across the west of the room
    { type: 'd', sprite: 'laser_drone', ink: 'red', x: 24, y: 16, dx: 1, dy: 1, count: 72, anim: 'fast' },
    // a grav beam pumping up and down by the east hatch
    { type: 'v', sprite: 'beam', ink: 'yellow', x: 27, y: 40, min: 40, max: 104, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [
      { x: 2, y: 1, text: 'GOING DOWN', ink: 'magenta', flash: true },
      { x: 19, y: 10, text: 'DECK C', ink: 'cyan' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Rocket Park (Pay and Display) [12,2] - difficulty 3. Where the silo rocket lands (through the roof hatch).
// Wally steps out onto the flashing pad mid-floor (no patrol ever crosses it). The west gantry climbs in 2-row
// steps (13, 11, 9, 7), zig-zagging so each level is a short hop: the parking warden clanks along level 11 and
// an astronaut hunting for change bounces along the top level - the coin for the meter waits at its west end.
// East, a spare coin bounces in front of the giant ticket machine by the engine-room hatch.
JSW.defineRoom({
  id: 'rocket_park',
  name: 'Rocket Park (Pay and Display)',
  region: 'starship',
  pos: [12, 2],
  border: 'cyan',
  item: 'coin',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'hull', ink: 'cyan', paper: 'blue', bright: true },
    'H': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'black', bright: true }, // roof hatch
    'T': { type: 'wall', tile: 'circuit', ink: 'white', paper: 'red', bright: true },       // ticket machine
    'g': { type: 'floor', tile: 'girder', ink: 'yellow', paper: 'black', bright: true },    // gantry
    'R': { type: 'wall', tile: 'hull', ink: 'white', paper: 'red', bright: true },          // a parked rocket
    'F': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'black', bright: true }, // ...wheel-clamped
    'b': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },       // parking bay
    'P': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true, flash: true }, // rocket pad
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '############HHHHHHHH############',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#.+..................RR........#',
    '#....................RR....TTTT#',
    '#ggggggggg...........RR....TTTT#',
    '#....................RR....TTTT#',
    '#.......ggggg........RR....TTTT#',
    '#...................FRRF...TTTT#',
    '..gggggg............bbbb........',
    '................................',
    '.......ggggg....................',
    '................................',
    '============PPPPPPPP============',
  ],
  guardians: [
    // the parking warden on gantry level 11
    { type: 'h', sprite: 'robot', ink: 'red', bright: true, x: 4, y: 72, min: 2, max: 5, dir: 'left' },
    // an astronaut bouncing along the top level, looking for change
    { type: 'h', sprite: 'astronaut', ink: 'white', bright: true, x: 6, y: 40, min: 3, max: 8, dir: 'right' },
    // a coin bouncing in front of the ticket machine
    { type: 'v', sprite: 'coin', ink: 'yellow', x: 24, y: 104, min: 48, max: 104, dy: 2, anim: 'fast' },
  ],
  special: {
    arrival: { x: 15, y: 104, facing: 'left' },
    signs: [
      { x: 9, y: 2, text: 'PAY AND DISPLAY', ink: 'yellow' },
      { x: 12, y: 4, text: 'MAX STAY 1 AEON', ink: 'cyan', flash: true },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// She Cannae Take It, Captain! [13,2] - difficulty 4. The engine room.
// Catwalks zig-zag up the room in 2-row steps (13, 11, 9, 7, 5) and every hop crosses a piston shaft: two
// crushers pound the deck itself (so even walking through needs timing), the middle one hammers high between the
// upper catwalks. The chief engineer droid paces catwalk 11 past the first spanner; the second waits on the top
// catwalk. From there, the ledge (row 3) under the maintenance hatch (cols 6-7) is a one-way climb up into the
// Robo-Kennels. Don't jump under the overheating engine - it sparks.
JSW.defineRoom({
  id: 'she_cannae_take_it',
  name: 'She Cannae Take It, Captain!',
  region: 'starship',
  pos: [13, 2],
  border: 'red',
  item: 'spanner',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'metal_plate', ink: 'cyan', paper: 'black', bright: true },
    'E': { type: 'wall', tile: 'circuit', ink: 'yellow', paper: 'red', bright: true },      // the engine
    'x': { type: 'nasty', tile: 'sparks', ink: 'cyan', paper: 'black', bright: true, flash: true },
    '-': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },     // catwalks
    'h': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true },      // hatch ledge
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '######..########################',
    '#..........................EEEE#',
    '#..........................EEEE#',
    '#....hhhh...+..............EEEE#',
    '#..........................EEEE#',
    '#........-----.............EEEE#',
    '#..........................EEEE#',
    '#.-----....................EEEE#',
    '#..........................xxxx#',
    '#........------...+............#',
    '#..............................#',
    '.................------.........',
    '................................',
    '.........................-----..',
    '................................',
    '================================',
  ],
  guardians: [
    // east piston: pounds the deck and the first hop (catwalk 13 -> 11)
    { type: 'v', sprite: 'crusher', ink: 'white', x: 23, y: 104, min: 56, max: 104, dy: 2, anim: 'fast' },
    // middle piston: hammers high between the upper catwalks, slowly
    { type: 'v', sprite: 'crusher', ink: 'magenta', x: 15, y: 24, min: 24, max: 80, dy: 1, anim: 'slow' },
    // west piston: pounds the deck under the top catwalks
    { type: 'v', sprite: 'crusher', ink: 'green', x: 7, y: 48, min: 48, max: 104, dy: 2, anim: 'fast' },
    // the chief engineer droid pacing catwalk 11
    { type: 'h', sprite: 'miner_bot', ink: 'yellow', bright: true, x: 20, y: 72, min: 17, max: 20, dir: 'left' },
  ],
  special: {
    signs: [
      { x: 1, y: 1, text: 'HATCH', ink: 'green' },
      { x: 13, y: 1, text: 'MORE POWER!', ink: 'red', flash: true },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Warp Core (Do Not Lick) [14,2] - difficulty 5. Dead end at the east of the lower deck.
// The pulsing core (flashing, deadly) stands in a glass sleeve under a cap at row 5; a crawlway runs under it on
// the deck - walk it, don't jump in it. The catwalk spiral goes UP the east side in 2-row hops (13, 11, 9, 7), each
// across a grav-beam shaft, with an alien pacing catwalk 11; the two dilithium crystals sit on the cap. The way
// back is DOWN the west side in 4-row drops (9, 13) - straight through the path of a whizzing comet.
JSW.defineRoom({
  id: 'the_warp_core',
  name: 'The Warp Core (Do Not Lick)',
  region: 'starship',
  pos: [14, 2],
  border: 'blue',
  item: 'crystal',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'hull', ink: 'magenta', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'black', bright: true },  // core cap
    'G': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue', bright: true },         // glass sleeve
    'X': { type: 'nasty', tile: 'laser_grid', ink: 'yellow', paper: 'magenta', bright: true, flash: true }, // the core
    '-': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true },       // catwalks
    '=': { type: 'floor', tile: 'girder', ink: 'cyan', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '#..............................#',
    '#..............................#',
    '#............+....+............#',
    '#..............................#',
    '#............CCCCCC............#',
    '#.............GXXG.............#',
    '#.............GXXG..----.......#',
    '#.............GXXG.............#',
    '#......------.GXXG........----.#',
    '#.............GXXG.............#',
    '..............GXXG..----.......#',
    '..............GXXG.............#',
    '...----...................----.#',
    '...............................#',
    '===============================#',
  ],
  guardians: [
    // grav beam in the shaft beside the core (also crosses the crawlway exit)
    { type: 'v', sprite: 'beam', ink: 'white', x: 18, y: 48, min: 48, max: 104, dy: 2, anim: 'fast' },
    // grav beam in the shaft between the east catwalks
    { type: 'v', sprite: 'beam', ink: 'yellow', x: 24, y: 104, min: 16, max: 104, dy: 2, anim: 'fast' },
    // a comet whizzing diagonally across the west drop
    { type: 'd', sprite: 'comet', ink: 'magenta', x: 8, y: 8, dx: 2, dy: 1, count: 40, anim: 'fast' },
    // an alien technician pacing catwalk 11
    { type: 'h', sprite: 'alien_walker', ink: 'green', bright: true, x: 20, y: 72, min: 20, max: 22, dir: 'right' },
  ],
  special: {
    signs: [
      { x: 19, y: 1, text: 'DO NOT LICK', ink: 'yellow', flash: true },
      { x: 2, y: 11, text: 'DANGER', ink: 'red' },
    ],
  },
});
