// Jet Set Wally II - Planet Zarg (grid rows 0-1, cols 19-22): Welcome to Planet Zarg .. Duty-Free Departures.
// Author file: src/data/rooms/planet.js  (region 'planet')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.
// The planet is reached only by teleport (arrival pad in Welcome to Planet Zarg) and left only by the
// departures pad in Duty-Free Departures. Route: Welcome -> Crater Expectations -> Gloop Lagoon -> Tripod Hill
// -> (crater hole, one way) -> Here's Looking at You -> Spaghetti Junction -> Moon Buggy Motorway -> Departures.
// Spaghetti Junction's steam vent hops back up to the Gloop Lagoon, so no room is a dead end.

// ---------------------------------------------------------------------------------------------------------
// Welcome to Planet Zarg [19,0] - difficulty 4. Arrival pad at the foot of a purple cliff (cols 4-7, no guardians).
// A crater (rims at row 12) with a crystal-studded bowl lies between the pad and the east door; a UFO bobs over
// the far rim. The moonrock sits on a floating crag patrolled by a waving alien: rim -> ledge (row 10) -> crag.
JSW.defineRoom({
  id: 'welcome_to_zarg',
  name: 'Welcome to Planet Zarg',
  region: 'planet',
  pos: [19, 0],
  border: 'blue',
  item: 'moonrock',
  tiles: {
    '.': { type: 'air', tile: 'stars', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'black', paper: 'magenta', bright: true },
    'G': { type: 'wall', tile: 'rock', ink: 'yellow', paper: 'red', bright: true },
    'P': { type: 'wall', tile: 'metal_plate', ink: 'cyan', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'rock_ledge', ink: 'green', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '\\': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },
    'X': { type: 'nasty', tile: 'crystal', ink: 'cyan', paper: 'black', bright: true, flash: true },
  },
  map: [
    '###.............................',
    '##..............................',
    '##..............................',
    '###.............................',
    '####............................',
    '###.............................',
    '##..................+...........',
    '##..............................',
    '###...........#########.........',
    '##.............#######..........',
    '##.........===..................',
    '##..............................',
    '##........./==\\......../==\\.....',
    '##......../....\\....../....\\....',
    '##......./......\\.XX./......\\...',
    '##GGPPPPGGGGGGGGGGGGGGGGGGGGGGGG',
  ],
  guardians: [
    // a waving alien walks the whole top of the floating crag, over the moonrock
    { type: 'h', sprite: 'alien_walker', ink: 'green', bright: true, x: 18, y: 48, min: 14, max: 21, dir: 'right' },
    // a UFO bobs up and down over the far crater rim
    { type: 'v', sprite: 'ufo', ink: 'yellow', x: 24, y: 24, min: 8, max: 72, dy: 2, anim: 'fast' },
  ],
  special: {
    arrival: { x: 5, y: 104, facing: 'right' },
    signs: [{ x: 7, y: 1, text: 'FOLLOW THE CRATERS', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Crater Expectations [20,0] - difficulty 4. One great crater: the outer slope climbs from the west door (floor 15)
// to rim A (row 9), dips into a flat-bottomed bowl (row 12) and climbs to rim B before sliding down to the east
// door on the far crater lip (floor 13). A blob and a comet shoot out of the bowl in a V, sweeping the inner
// slopes and the air over both rims - the gems hang at row 6 above the rims and must be jumped for between passes.
JSW.defineRoom({
  id: 'crater_expectations',
  name: 'Crater Expectations',
  region: 'planet',
  pos: [20, 0],
  border: 'green',
  item: 'gem',
  tiles: {
    '.': { type: 'air', tile: 'stars', ink: 'blue', paper: 'black' },
    'G': { type: 'wall', tile: 'rock', ink: 'red', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'rock_ledge', ink: 'green', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '\\': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..........+............+........',
    '................................',
    '................................',
    '........./==\\......../==\\.......',
    '......../GGGG\\....../GGGG\\......',
    '......./GGGGGG\\..../GGGGGG\\.....',
    '....../GGGGGGGG====GGGGGGGG\\....',
    '...../GGGGGGGGGGGGGGGGGGGGGG====',
    '..../GGGGGGGGGGGGGGGGGGGGGGGGGGG',
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
  ],
  guardians: [
    // a blob and a comet leap out of the bowl in a V and fall back in, together
    { type: 'd', sprite: 'blob', ink: 'magenta', x: 128, y: 80, dx: -1, dy: -1, count: 48, anim: 'slow' },
    { type: 'd', sprite: 'comet', ink: 'cyan', x: 136, y: 72, dx: 1, dy: -1, count: 48, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Gloop Lagoon [21,0] - difficulty 5. A lagoon of bubbling gloop between the west beach (floor 13) and the
// east hillside (floor 11). Crossing: floating rock (lift) -> the lone rock (the crystal, jump for it) -> the vent
// island -> second floating rock -> east beach. A tentacle rises between the first rock and the lone rock, a
// gloop bubble between the island and the second rock. The steam vent from Spaghetti Junction pops Wally up onto
// the grating in the middle of the island (one-way: the grating is a floor). Works both ways across the lagoon.
JSW.defineRoom({
  id: 'the_gloop_lagoon',
  name: 'The Gloop Lagoon',
  region: 'planet',
  pos: [21, 0],
  border: 'yellow',
  item: 'crystal',
  tiles: {
    '.': { type: 'air', tile: 'stars', ink: 'blue', paper: 'black' },
    '=': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },
    'R': { type: 'wall', tile: 'rock', ink: 'magenta', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '~': { type: 'nasty', tile: 'acid', ink: 'green', paper: 'black', bright: true, flash: true },
  },
  map: [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '..........+.....................',
    '................................',
    '................................',
    '..........RR................./==',
    '..........RR................/RRR',
    '====......RR.RRR..RR......==RRRR',
    'RRRR~~~~~~RR~RRR..RR~~~~~~RRRRRR',
    'RRRR~~~~~~RR~RRR--RR~~~~~~RRRRRR',
  ],
  guardians: [
    // floating rocks
    { type: 'lift', x: 5, width: 3, top: 9, bottom: 13, start: 13, period: 8, dir: 'down' },
    { type: 'lift', x: 22, width: 3, top: 9, bottom: 13, start: 9, period: 8, dir: 'up' },
    // a tentacle rises out of the gloop between the first floating rock and the lone rock
    { type: 'v', sprite: 'tentacle', ink: 'magenta', x: 8, y: 96, min: 48, max: 96, dy: 1, anim: 'slow' },
    // a gloop bubble wobbles up and down between the island and the second floating rock
    { type: 'v', sprite: 'bubble', ink: 'cyan', x: 20, y: 56, min: 16, max: 96, dy: 2, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Ulla! Ulla! Tripod Hill [22,0] - difficulty 5. A red hill: up the west slope from the door (floor 11) to the
// hilltop (row 6), where a laser drone guards the two stars, then down the long east slope past the Martian tripod
// (it plants a foot on the slope top and strides off into the sky) and its heat ray (sweeping mid-slope).
// Safe spots: the hilltop west of the drone, and the slope between the tripod and the ray.
// The slope ends over the crater hole (cols 24-26): walk off the end and you drop, one way, into the canyon below.
JSW.defineRoom({
  id: 'ulla_ulla_tripod_hill',
  name: 'Ulla! Ulla! Tripod Hill',
  region: 'planet',
  pos: [22, 0],
  border: 'red',
  item: 'star',
  tiles: {
    '.': { type: 'air', tile: 'stars', ink: 'blue', paper: 'black' },
    'R': { type: 'wall', tile: 'rock', ink: 'black', paper: 'red', bright: true },
    '#': { type: 'wall', tile: 'rock', ink: 'white', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'rock_ledge', ink: 'cyan', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '\\': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    '...............................#',
    '...............................#',
    '............+..................#',
    '.........+.....................#',
    '...............................#',
    '...............................#',
    '......./=======\\...............#',
    '....../RRRRRRRRR\\..............#',
    '...../RRRRRRRRRRR\\.............#',
    '..../RRRRRRRRRRRRR\\............#',
    '.../RRRRRRRRRRRRRRR\\...........#',
    '===RRRRRRRRRRRRRRRRR\\..........#',
    'RRRRRRRRRRRRRRRRRRRRR\\........##',
    'RRRRRRRRRRRRRRRRRRRRRR\\.......##',
    'RRRRRRRRRRRRRRRRRRRRRRR\\......##',
    'RRRRRRRRRRRRRRRRRRRRRRRR...#####',
  ],
  guardians: [
    // laser drone hovering over the hilltop, guarding the higher star
    { type: 'v', sprite: 'laser_drone', ink: 'cyan', x: 11, y: 0, min: 0, max: 32, dy: 1, anim: 'fast' },
    // the Martian tripod plants a foot on the top of the east slope, then strides up into the sky and back
    { type: 'd', sprite: 'tripod', ink: 'white', x: 120, y: 32, dx: 1, dy: -1, count: 32, anim: 'slow' },
    // its heat ray sweeps up and down across the middle of the slope
    { type: 'v', sprite: 'beam', ink: 'yellow', x: 20, y: 24, min: 24, max: 72, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 22, y: 9, text: 'DOWN ONLY', ink: 'yellow', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Here's Looking at You [22,1] - difficulty 4. A yellow canyon with giant eyes set into its walls. The crater hole
// from Tripod Hill drops Wally onto a ledge at row 4 (one way: jumping back up just falls back down); the canyon
// steps down westward (row 8, row 12) to the floor and the west door. The spectacles rest on the eyelid over the
// big east eye - a jump across from the row-8 step. Four eyeballs bob in the way, keeping an eye on things.
JSW.defineRoom({
  id: 'heres_looking_at_you',
  name: "Here's Looking at You",
  region: 'planet',
  pos: [22, 1],
  border: 'cyan',
  item: 'spectacles',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'sandstone', ink: 'red', paper: 'yellow', bright: true },
    'W': { type: 'wall', tile: 'blank', ink: 'white', paper: 'white', bright: true },
    'O': { type: 'wall', tile: 'dots_wallpaper', ink: 'black', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'rock_ledge', ink: 'green', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'rug', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    '########################...#####',
    '########################...#####',
    '###########.................####',
    '###WWWW####.................####',
    '##WWOOWW###..........=======####',
    '###WWWW####.................####',
    '###########.................####',
    '##########...................+.#',
    '#..............======..........#',
    '#......................._______#',
    '#........................#WWWW##',
    '.........................WWOOWW#',
    '........=======..........#WWWW##',
    '...............................#',
    '...............................#',
    '################################',
  ],
  guardians: [
    // four eyeballs bob up and down along the way down
    { type: 'v', sprite: 'eyeball', ink: 'white', x: 17, y: 16, min: 16, max: 48, dy: 1, anim: 'slow' },
    { type: 'v', sprite: 'eyeball', ink: 'red', x: 22, y: 40, min: 40, max: 96, dy: 2, anim: 'slow' },
    { type: 'v', sprite: 'eyeball', ink: 'cyan', x: 11, y: 40, min: 16, max: 80, dy: 2, anim: 'slow' },
    { type: 'v', sprite: 'eyeball', ink: 'green', x: 4, y: 64, min: 64, max: 104, dy: 1, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Spaghetti Junction [21,1] - difficulty 5. Alien plumbing: a fat pipe blocks the floor between the two doors
// (both floor 15), so the way across is up and over the knot of pipe ledges: floor -> row 13 -> row 11 -> the
// junction (row 9) and down the other side. Above it, vent ledges every 2 rows (7, 5) climb to the steam-vent
// ledge at row 3 under the gap in the ceiling (cols 16-17): jump up there to hop, one way, into the Gloop Lagoon.
// The spoon is on the far-right pipe (row 7). Four tentacles twist diagonally through the knot.
JSW.defineRoom({
  id: 'spaghetti_junction',
  name: 'Spaghetti Junction',
  region: 'planet',
  pos: [21, 1],
  border: 'magenta',
  item: 'spoon',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '=': { type: 'floor', tile: 'pipe_h', ink: 'yellow', paper: 'black', bright: true },
    '#': { type: 'wall', tile: 'rivets', ink: 'cyan', paper: 'blue', bright: true },
    'I': { type: 'wall', tile: 'pipe_v', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    '################..##############',
    '#...II.........................#',
    '#...II.........................#',
    '#...II........======...........#',
    '#...II.........................#',
    '#...II........======.......+...#',
    '#..............................#',
    '#........====......====...===..#',
    '#..............................#',
    '#.............====.............#',
    '#..............II..............#',
    '.........====..II..====.........',
    '...............II...............',
    '....====.......II.......====....',
    '...............II...............',
    '################################',
  ],
  guardians: [
    // tentacles guarding the lowest ledges on each side
    { type: 'd', sprite: 'tentacle', ink: 'magenta', x: 32, y: 64, dx: 1, dy: 1, count: 24, anim: 'slow' },
    { type: 'd', sprite: 'tentacle', ink: 'green', x: 216, y: 64, dx: -1, dy: 1, count: 24, anim: 'slow' },
    // one sweeps the gap between the left vent ledge (row 7) and the vent stack
    { type: 'd', sprite: 'tentacle', ink: 'yellow', x: 64, y: 8, dx: 1, dy: 1, count: 32, anim: 'slow' },
    // one coils round the spoon
    { type: 'd', sprite: 'tentacle', ink: 'cyan', x: 200, y: 8, dx: 1, dy: 1, count: 24, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Moon Buggy Motorway [20,1] - difficulty 4. Two ways across between the doors (both floor 15): the road, where
// two moon buggies race up and down at double speed between acid potholes, or the overpass (row 11, ramps at both
// ends) with a gap in the middle and a hitch-hiking astronaut. The toll coin hangs over the overpass gap, right in
// the path of a drifting ringed planet. Road sign points the way to the spaceport.
JSW.defineRoom({
  id: 'moon_buggy_motorway',
  name: 'Moon Buggy Motorway',
  region: 'planet',
  pos: [20, 1],
  border: 'cyan',
  item: 'coin',
  tiles: {
    '.': { type: 'air', tile: 'stars', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'rock', ink: 'white', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'girder', ink: 'yellow', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs_outline', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
    '\\': { type: 'ramp', tile: 'stairs_outline', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },
    'R': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'black' },
    'X': { type: 'nasty', tile: 'acid', ink: 'magenta', paper: 'black', bright: true, flash: true },
  },
  map: [
    '################################',
    '###.........................####',
    '##...........................###',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#..............+...............#',
    '#..............................#',
    '#..............................#',
    '......./=======..=======\\.......',
    '....../..................\\......',
    '...../....................\\.....',
    '..../......................\\....',
    'RRRRRRRRRRRXXRRRRRRRXXRRRRRRRRRR',
  ],
  guardians: [
    // two moon buggies race along the road (double speed), one in each half
    { type: 'h', sprite: 'moon_buggy', ink: 'yellow', bright: true, x: 6, y: 104, min: 6, max: 14, dir: 'right', speed: 2 },
    { type: 'h', sprite: 'moon_buggy', ink: 'green', bright: true, x: 24, y: 104, min: 16, max: 24, dir: 'left', speed: 2 },
    // a hitch-hiking astronaut paces the east half of the overpass
    { type: 'h', sprite: 'astronaut', ink: 'white', bright: true, x: 20, y: 72, min: 17, max: 22, dir: 'left' },
    // a ringed planet drifts up and down through the overpass gap
    { type: 'v', sprite: 'ringed_planet', ink: 'magenta', x: 15, y: 8, min: 8, max: 72, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [{ x: 3, y: 2, text: '<< SPACEPORT', ink: 'green' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Duty-Free Departures [19,1] - difficulty 3. The alien spaceport. From the east door (floor 15) past a porter,
// hop onto the duty-free counter (top at row 13) for the bottle - a star wanders down over the counter - then drop
// off the west end past a second porter to the departures pad (row 15, cols 4-7): standing on it beams Wally,
// one way, back to the starship's Molecule Shuffler. A third porter tidies the shelves (row 11).
JSW.defineRoom({
  id: 'duty_free_departures',
  name: 'Duty-Free Departures',
  region: 'planet',
  pos: [19, 1],
  border: 'green',
  item: 'bottle',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    '#': { type: 'wall', tile: 'hull', ink: 'white', paper: 'blue', bright: true },
    'P': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'magenta', bright: true, flash: true },
    'T': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
    'C': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red', bright: true },
    '_': { type: 'floor', tile: 'shelf', ink: 'cyan', paper: 'black', bright: true },
    'O': { type: 'wall', tile: 'circuit', ink: 'green', paper: 'black', bright: true },
    'W': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue', bright: true },
  },
  map: [
    '################################',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#.OOOOOOOOO...........WWWWWWWW.#',
    '#.OOOOOOOOO...........WWWWWWWW.#',
    '#.OOOOOOOOO...........WWWWWWWW.#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#..............................#',
    '#.....................______....',
    '#...............+...............',
    '#...........TTTTTTTT............',
    '#...........CCCCCCCC............',
    '####PPPP########################',
  ],
  guardians: [
    // porters: one by the east door, one by the departures pad, one on the shelves
    { type: 'h', sprite: 'alien_walker', ink: 'green', bright: true, x: 24, y: 104, min: 20, max: 27, dir: 'left' },
    { type: 'h', sprite: 'alien_walker', ink: 'magenta', bright: true, x: 9, y: 104, min: 8, max: 10, dir: 'right' },
    { type: 'h', sprite: 'alien_walker', ink: 'cyan', bright: true, x: 24, y: 72, min: 22, max: 26, dir: 'right' },
    // a star wanders down over the counter
    { type: 'd', sprite: 'star', ink: 'yellow', x: 152, y: 24, dx: -1, dy: 1, count: 64, anim: 'slow' },
  ],
  special: {
    portals: [{ x: 5, y: 14, w: 2, h: 1, kind: 'teleport', to: 'molecule_shuffler' }],
    signs: [
      { x: 2, y: 2, text: 'DEPARTURES: STARSHIP', ink: 'cyan' },
      { x: 21, y: 8, text: 'DUTY FREE', ink: 'yellow' },
    ],
  },
});
