// Jet Set Wally II - starship, decks A and B (grid rows 0-1): Captain's Log Cabin .. Grav Tube: Stopping.
// Author file: src/data/rooms/starship_a.js  (region 'starship')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.
// Every deck door is the standard ship hatch: edge columns wall in rows 0-10, open rows 11-14, surface row 15.

// ---------------------------------------------------------------------------------------------------------
// Captain's Log Cabin [9,0] - difficulty 3. Dead end (east hatch only).
// The homesick captain has built a timber cabin inside the hull. A tidy-minded alien sweeps the floorboards,
// a zero-g astronaut dozes above the rocking chair and the cuckoo clock's pendulum swings over the log pile.
// Climb the firewood (rows 13, 11, 9) and hop east onto the moose head (row 7) for the captain's log.
JSW.defineRoom({
  id: 'captains_log_cabin',
  name: "Captain's Log Cabin",
  region: 'starship',
  pos: [9, 0],
  border: 'yellow',
  item: 'book',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hull', ink: 'cyan', paper: 'blue', bright: true },
    'W': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'B': { type: 'wall', tile: 'bark', ink: 'red', paper: 'yellow' },
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'black' },
    'o': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    'm': { type: 'wall', tile: 'bark', ink: 'yellow', paper: 'black' },
    'C': { type: 'wall', tile: 'wood_panel', ink: 'magenta', paper: 'black', bright: true },
    'L': { type: 'floor', tile: 'branch', ink: 'yellow', paper: 'black', bright: true },
    'A': { type: 'floor', tile: 'branch', ink: 'white', paper: 'black', bright: true },
    'c': { type: 'floor', tile: 'plank', ink: 'magenta', paper: 'black', bright: true },
    'F': { type: 'nasty', tile: 'flames', ink: 'yellow', paper: 'red', bright: true, flash: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH............................HH',
    'HHB.....................ooo...HH',
    'HHB.....................ooo...HH',
    'HHB.....................ooo...HH',
    'HHB...........+...............HH',
    'HHB...........................HH',
    'HHB.........AAAAA.............HH',
    'HHB..........mmm..............HH',
    'HHB...LLLLLL.............C....HH',
    'HHB......................C....HH',
    'HHB.LLLLLL...............C......',
    'HHB..................ccccc......',
    'HHLLLLLLL.......................',
    'HHFFS...........................',
    'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
  ],
  guardians: [
    // the alien housekeeper sweeping the floorboards between the woodpile and the hatch
    { type: 'h', sprite: 'alien_walker', ink: 'green', bright: true, x: 20, y: 104, min: 10, max: 26, dir: 'left' },
    // the off-duty astronaut, dozing and drifting in zero-g above the rocking chair
    { type: 'v', sprite: 'astronaut', ink: 'white', x: 22, y: 40, min: 24, max: 72, dy: 1, anim: 'slow' },
    // the cuckoo clock pendulum swinging above the top of the log pile
    { type: 'v', sprite: 'pendulum', ink: 'magenta', x: 9, y: 16, min: 8, max: 40, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 14, y: 1, text: 'HOME SWEET HULL', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Where No Wally Has Gone Before [10,0] - difficulty 3. The star-chart room.
// The whole back wall is a live chart of every room visited (cartography, green = cleared, red = items left);
// the flashing dot under the sign is you. The chart tables (rows 13, 11, 9) huddle in the west so they hide
// nothing but deep space. A surveyor's tripod stalks the deck, a ringed planet bobs mid-room and two stars
// drift diagonally over the tables. Somebody left their reading glasses on the top table.
JSW.defineRoom({
  id: 'where_no_wally',
  name: 'Where No Wally Has Gone Before',
  region: 'starship',
  pos: [10, 0],
  border: 'blue',
  item: 'spectacles',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'blue', bright: true },
    '=': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'black', bright: true },
    'T': { type: 'floor', tile: 'tiled_floor', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH............................HH',
    'HH............................HH',
    'HH............................HH',
    'HH............................HH',
    'HH............................HH',
    'HH............................HH',
    'HH...+........................HH',
    'HH............................HH',
    'HH.TTTTTT.....................HH',
    'HH............................HH',
    '.......TTTTT....................',
    '................................',
    '..TTTT..........................',
    '................................',
    '================================',
  ],
  guardians: [
    // a surveyor's tripod stalking the deck between the tables and the east hatch
    { type: 'h', sprite: 'tripod', ink: 'yellow', bright: true, x: 16, y: 104, min: 7, max: 26, dir: 'right' },
    // a ringed planet bobbing gently in mid-room
    { type: 'v', sprite: 'ringed_planet', ink: 'magenta', x: 20, y: 40, min: 24, max: 80, dy: 1, anim: 'slow' },
    // two stars drifting diagonally over the chart tables
    { type: 'd', sprite: 'star', ink: 'cyan', x: 16, y: 8, dx: 1, dy: 1, count: 40, anim: 'fast' },
    { type: 'd', sprite: 'star', ink: 'white', x: 112, y: 16, dx: -1, dy: 1, count: 32, anim: 'slow' },
  ],
  special: {
    cartography: { x: 6, y: 2 },
    signs: [{ x: 4, y: 1, text: 'YOU ARE HERE', ink: 'yellow', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Grav Tube: Going Up [11,0] - difficulty 4. Top of the turbo-lift column, where the only way is down.
// The tube opens in the deck: gap cols 14-15 (drop to Deck B), one-way grating cols 16-17 (where climbers
// from the Deck B lift pop up). A grav beam pulses up and down inside the glass casing right over the gap and
// the battery hangs in it: grab it mid-leap across the gap. A laser drone swoops down across the west deck
// and a robot porter guards the east hatch.
JSW.defineRoom({
  id: 'turbo_lift_a',
  name: 'Grav Tube: Going Up',
  region: 'starship',
  pos: [11, 0],
  border: 'magenta',
  item: 'battery',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hull', ink: 'magenta', paper: 'black', bright: true },
    '=': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'blue', bright: true },
    'G': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    'g': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH..........GG....GG..........HH',
    'HH..........GG....GG..........HH',
    'HH..........GG....GG..........HH',
    'HH..........GG....GG..........HH',
    'HH..........GG....GG..........HH',
    'HH..........GG....GG..........HH',
    'HH..........GG....GG..........HH',
    'HH..........GG....GG..........HH',
    'HH............................HH',
    'HH............................HH',
    '...............+................',
    '................................',
    '................................',
    '................................',
    '==============..gg==============',
  ],
  guardians: [
    // the grav beam pulsing inside the casing, right over the gap
    { type: 'v', sprite: 'beam', ink: 'cyan', x: 14, y: 24, min: 16, max: 72, dy: 2, anim: 'fast' },
    // a laser drone swooping from the upper west down to the deck and back
    { type: 'd', sprite: 'laser_drone', ink: 'red', x: 16, y: 40, dx: 1, dy: 1, count: 64, anim: 'fast' },
    // the robot porter pacing the east deck
    { type: 'h', sprite: 'robot', ink: 'green', bright: true, x: 22, y: 104, min: 19, max: 26, dir: 'right' },
  ],
  special: {
    signs: [
      { x: 21, y: 2, text: 'GOING UP', ink: 'magenta', flash: true },
      { x: 2, y: 12, text: 'MIND THE GAP', ink: 'yellow' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Captain's Chair [12,0] - difficulty 4. The bridge.
// A solid dais splits the deck: step (row 13) and dais (row 11) must be climbed to cross, and the captain's red
// swivel chair (seat top row 10) blocks the dais - hop onto the seat (the cup of tea is waiting on it) while
// the alien on the viewscreen leans out to glare at you. Helm consoles (row 9) flank the dais; a comet streaks
// across the viewscreen, the helmsman paces the west deck and the ship's computer eye bobs by the east hatch.
JSW.defineRoom({
  id: 'the_captains_chair',
  name: "The Captain's Chair",
  region: 'starship',
  pos: [12, 0],
  border: 'cyan',
  item: 'cup',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'rivets', ink: 'cyan', paper: 'blue', bright: true },
    'F': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'black', bright: true },
    'X': { type: 'wall', tile: 'metal_plate', ink: 'red', paper: 'black', bright: true },
    'D': { type: 'wall', tile: 'marble', ink: 'yellow', paper: 'red' },
    'S': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'blue' },
    '=': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'blue', bright: true },
    'c': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH....FFFFFFFFFFFFFFFFFFFF....HH',
    'HH....F..................F....HH',
    'HH....F..................F....HH',
    'HH....F..................F....HH',
    'HH....F..................F....HH',
    'HH....F..................F....HH',
    'HH............................HH',
    'HH............................HH',
    'HH........ccc...+..ccc........HH',
    'HH.............XX.............HH',
    '...........DDDDDDDDDD...........',
    '...........DDDDDDDDDD...........',
    '........SSSSSSSSSSSSSSSS........',
    '........SSSSSSSSSSSSSSSS........',
    '================================',
  ],
  guardians: [
    // the alien on the viewscreen, leaning out to glare at whoever sits in the chair
    { type: 'v', sprite: 'alien_head', ink: 'green', x: 15, y: 24, min: 24, max: 64, dy: 1, anim: 'slow' },
    // a comet streaking across the viewscreen
    { type: 'd', sprite: 'comet', ink: 'yellow', x: 56, y: 24, dx: 2, dy: 0, count: 56, anim: 'fast' },
    // the helmsman pacing the west deck
    { type: 'h', sprite: 'astronaut', ink: 'white', x: 4, y: 104, min: 3, max: 6, dir: 'right' },
    // the ship's computer eye bobbing by the east hatch
    { type: 'v', sprite: 'eyeball', ink: 'magenta', x: 26, y: 40, min: 40, max: 96, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 8, y: 2, text: 'WE COME IN PEAS', ink: 'green', flash: true }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Red Shirt Locker Room [13,0] - difficulty 4.
// Two ways across. Low road: the changing-room corridor under the wall-mounted lockers, patrolled by a robot
// (6 rows of headroom, so it can be jumped). High road: benches (rows 13, 11, 9) up to the locker tops (row 7),
// hopping two booby-trapped lockers (flashing sparks), through the open locker (rows 5-6) where the sock waits.
// A laser drone swoops over the first trap; a doomed red-shirt floats up and down by the east benches.
// Careful: walking off the east end of the locker tops is a long fall - jump across to the shelf.
JSW.defineRoom({
  id: 'red_shirt_lockers',
  name: 'Red Shirt Locker Room',
  region: 'starship',
  pos: [13, 0],
  border: 'red',
  item: 'sock',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'black', bright: true },
    'R': { type: 'wall', tile: 'wood_panel', ink: 'white', paper: 'red', bright: true },
    '^': { type: 'nasty', tile: 'sparks', ink: 'yellow', paper: 'red', bright: true, flash: true },
    'b': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'wall', tile: 'metal_plate', ink: 'cyan', paper: 'blue', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH.............RRRR...........HH',
    'HH.............RRRR...........HH',
    'HH.............RRRR...........HH',
    'HH.............RRRR...........HH',
    'HH...............+............HH',
    'HH............................HH',
    'HH.....RRR^^RRRRRRRRR^^RR.....HH',
    'HH.....RRRRRRRRRRRRRRRRRR.....HH',
    'HHbbb......................bbbHH',
    'HH............................HH',
    '..bbbb....................bbbb..',
    '................................',
    '..bbbb....................bbbb..',
    '................................',
    '================================',
  ],
  guardians: [
    // the robot quartermaster pacing the changing-room corridor
    { type: 'h', sprite: 'robot', ink: 'green', bright: true, x: 12, y: 104, min: 6, max: 21, dir: 'right' },
    // a laser drone swooping over the first booby-trapped locker
    { type: 'd', sprite: 'laser_drone', ink: 'cyan', x: 56, y: 8, dx: 1, dy: 1, count: 24, anim: 'fast' },
    // a doomed red-shirt drifting up and down at the east end of the corridor
    { type: 'v', sprite: 'astronaut', ink: 'red', x: 23, y: 80, min: 80, max: 100, dy: 1, anim: 'slow' },
  ],
  special: {
    signs: [
      { x: 3, y: 2, text: 'AWAY TEAM', ink: 'yellow' },
      { x: 19, y: 2, text: 'RETURNS: 0', ink: 'red', flash: true },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// There's No Place Like Home [14,0] - difficulty 3. The return pad: the way back from space.
// Follow the yellow brick road east to the flashing pad (cols 18-21) and you are beamed one-way home to the
// bathroom. The ruby slippers sit on a hovering plinth in the far west under a rainbow: climb the emerald step
// (13) to the ledge (11), dodge Toto the robo-dog, then leap the gap past the Wizard's balloon. The tin man clanks
// along the road; a satellite hangs over the plinth, so don't jump for joy. A farmhouse has landed in the east.
JSW.defineRoom({
  id: 'no_place_like_home',
  name: "There's No Place Like Home",
  region: 'starship',
  pos: [14, 0],
  border: 'green',
  item: 'gem',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'metal_plate', ink: 'green', paper: 'black', bright: true },
    'R': { type: 'wall', tile: 'cloud_solid', ink: 'red', paper: 'black', bright: true },
    'Y': { type: 'wall', tile: 'cloud_solid', ink: 'yellow', paper: 'black', bright: true },
    'G': { type: 'wall', tile: 'cloud_solid', ink: 'green', paper: 'black', bright: true },
    '=': { type: 'wall', tile: 'brick', ink: 'yellow', paper: 'black', bright: true },
    '#': { type: 'wall', tile: 'circuit', ink: 'magenta', paper: 'black', bright: true, flash: true },
    'r': { type: 'wall', tile: 'brick_small', ink: 'white', paper: 'red' },
    'w': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'black' },
    'o': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    'P': { type: 'floor', tile: 'tiled_floor', ink: 'red', paper: 'black', bright: true },
    'e': { type: 'floor', tile: 'grate', ink: 'green', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH..........RRRRRRRR..........HH',
    'HH.........RYYYYYYYYR.........HH',
    'HH........RYGGGGGGGGYR........HH',
    'HH........RYG......GYR........HH',
    'HH........RYG......GYR........HH',
    'HH............................HH',
    'HH............................HH',
    'HH............................HH',
    'HH...+........................HH',
    'HH........................rr..HH',
    '...PPPPP...eeeeeeeee.....rrrr.HH',
    '........................rrrrrrHH',
    '...............ee.......wowwowHH',
    '........................wwwwwwHH',
    '==================####==========',
  ],
  guardians: [
    // the tin man clanking along the yellow brick road (well short of the pad)
    { type: 'h', sprite: 'robot', ink: 'white', bright: true, x: 10, y: 104, min: 7, max: 12, dir: 'left' },
    // Toto the robo-dog guarding the emerald ledge
    { type: 'h', sprite: 'robo_dog', ink: 'cyan', bright: true, x: 16, y: 72, min: 14, max: 17, dir: 'left' },
    // the Wizard's balloon bobbing in the gap between the ledge and the plinth
    { type: 'v', sprite: 'balloon', ink: 'magenta', x: 8, y: 40, min: 32, max: 80, dy: 1, anim: 'slow' },
    // a satellite hanging in the far corner over the plinth - no jumping for joy
    { type: 'v', sprite: 'satellite', ink: 'yellow', x: 3, y: 8, min: 8, max: 56, dy: 1, anim: 'slow' },
  ],
  special: {
    portals: [{ x: 19, y: 14, w: 2, h: 1, kind: 'teleport', to: 'the_bathroom' }],
    signs: [
      { x: 7, y: 7, text: 'HOME: THE BATHROOM', ink: 'magenta', flash: true },
      { x: 18, y: 12, text: 'HOME', ink: 'yellow', flash: true },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Grav Tube: Stopping [11,1] - difficulty 4. Middle of the turbo-lift column.
// Inside the glass tube the Deck B lift (cols 10-12) shuttles between the deck (15) and the platform (row 4)
// under the Deck A shaft: ride up, step across for the battery... no, the flask - and jump up into Deck A, or drop in
// from Deck A and time your step back onto the lift (far too tall to jump down). The Deck C shaft opens in the
// floor: gap cols 20-21 (drop) and one-way grating cols 22-23 (Deck C climbers pop up here) - jump the gap to go
// east. A laser drone swoops down to the west deck, a porter robot paces between the lift and the gap and a
// grav beam pumps by the east hatch.
JSW.defineRoom({
  id: 'turbo_lift_b',
  name: 'Grav Tube: Stopping',
  region: 'starship',
  pos: [11, 1],
  border: 'cyan',
  item: 'bottle',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hull', ink: 'magenta', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'metal_plate', ink: 'yellow', paper: 'blue', bright: true },
    'G': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'black', bright: true },
    'p': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
    'g': { type: 'floor', tile: 'grate', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHH....HHHHHHHHHHHHHH',
    'HH......GG........GG..........HH',
    'HH......GG.......+GG..........HH',
    'HH......GG........GG..........HH',
    'HH......GG....ppppGG..........HH',
    'HH......GG........GG..........HH',
    'HH......GG........GG..........HH',
    'HH......GG........GG..........HH',
    'HH......GG........GG..........HH',
    'HH............................HH',
    'HH............................HH',
    '................................',
    '................................',
    '................................',
    '................................',
    '====================..gg========',
  ],
  guardians: [
    // the Deck B lift: deck (15) <-> platform level (4)
    { type: 'lift', x: 10, width: 3, top: 4, bottom: 15, start: 15, period: 4, dir: 'down' },
    // a laser drone swooping from the upper west down to the deck by the lift
    { type: 'd', sprite: 'laser_drone', ink: 'red', x: 16, y: 56, dx: 1, dy: 1, count: 48, anim: 'fast' },
    // the porter robot pacing between the lift and the Deck C gap
    { type: 'h', sprite: 'robot', ink: 'green', bright: true, x: 14, y: 104, min: 13, max: 16, dir: 'right' },
    // a grav beam pumping up and down by the east hatch
    { type: 'v', sprite: 'beam', ink: 'yellow', x: 26, y: 56, min: 56, max: 104, dy: 2, anim: 'fast' },
  ],
  special: {
    signs: [
      { x: 21, y: 2, text: 'STOPPING', ink: 'magenta', flash: true },
      { x: 21, y: 4, text: 'DECK B', ink: 'cyan' },
      { x: 2, y: 2, text: 'ALL', ink: 'yellow' },
      { x: 2, y: 3, text: 'CHANGE', ink: 'yellow' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// For Mash Get Smash [10,1] - difficulty 3. The crew mess.
// Two tin Martians chuckle over the mess table (13). From the table hop onto the food-hatch belt (11), which
// rattles east and tips diners off its end beside the mash dispenser - where a blob of instant mash plops down
// to the deck and back. Hop off the belt onto the plate shelf (9) and jump the drip for the spoon on top of the
// dispenser (7). A robot waiter patrols the deck between the table and the dispenser.
JSW.defineRoom({
  id: 'for_mash_get_smash',
  name: 'For Mash Get Smash',
  region: 'starship',
  pos: [10, 1],
  border: 'yellow',
  item: 'spoon',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'bathroom_tiles', ink: 'white', paper: 'blue', bright: true },
    'D': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'red', bright: true },
    'P': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'yellow', paper: 'black', bright: true },
    't': { type: 'floor', tile: 'plank', ink: 'magenta', paper: 'black', bright: true },
    's': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },
    '>': { type: 'conveyor', tile: 'belt_arrows', ink: 'cyan', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH..........................PPHH',
    'HH..........................PPHH',
    'HH..........................PPHH',
    'HH..........................PPHH',
    'HH........................+.PPHH',
    'HH..........................PPHH',
    'HH.......................DDDDDHH',
    'HH.......................DDDDDHH',
    'HH.................ssss..DDDDDHH',
    'HH.......................DDDDDHH',
    '............>>>>>>>>>>>.........',
    '................................',
    '.....tttttttt...................',
    '................................',
    '================================',
  ],
  guardians: [
    // the robot waiter patrolling the deck between the table and the dispenser
    { type: 'h', sprite: 'robot', ink: 'white', bright: true, x: 16, y: 104, min: 13, max: 20, dir: 'left' },
    // a blob of instant mash plopping from the dispenser down to the deck and back
    { type: 'v', sprite: 'blob', ink: 'yellow', x: 23, y: 16, min: 16, max: 104, dy: 2, anim: 'slow' },
    // two tin Martians chuckling over the mess table, out of step
    { type: 'v', sprite: 'alien_head', ink: 'green', x: 6, y: 48, min: 48, max: 80, dy: 1, anim: 'fast' },
    { type: 'v', sprite: 'alien_head', ink: 'cyan', x: 10, y: 80, min: 48, max: 80, dy: -1, anim: 'fast' },
  ],
  special: {
    signs: [
      { x: 3, y: 2, text: 'FOR MASH GET SMASH', ink: 'yellow', flash: true },
      { x: 4, y: 4, text: 'HA HA HA', ink: 'green' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Say Aaah! [9,1] - difficulty 3. The sickbay.
// Climb the biobeds (13, 11) past the skeleton rattling on its stand, dodge the hypospray drone over the
// instrument shelf (9), then vault onto the medicine cabinet (7) for the key to the drugs
// locker. A medibot trundles the ward floor. Read the eye chart from the door if you can.
JSW.defineRoom({
  id: 'say_aaah_sickbay',
  name: 'Say Aaah!',
  region: 'starship',
  pos: [9, 1],
  border: 'red',
  item: 'key',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'hull', ink: 'white', paper: 'cyan' },
    'C': { type: 'wall', tile: 'metal_plate', ink: 'red', paper: 'white', bright: true },
    'R': { type: 'wall', tile: 'cloud_solid', ink: 'red', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'white', paper: 'black', bright: true },
    'b': { type: 'floor', tile: 'rug', ink: 'cyan', paper: 'black', bright: true },
    's': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH............................HH',
    'HH..........................R.HH',
    'HH.........................RRRHH',
    'HH..........................R.HH',
    'HH......................+.....HH',
    'HH............................HH',
    'HH....................CCCC....HH',
    'HH....................CCCC....HH',
    'HH...............ssss.CCCC....HH',
    'HH............................HH',
    '...........bbbbbb...............',
    '................................',
    '.....bbbbbb.....................',
    '................................',
    '================================',
  ],
  guardians: [
    // the skeleton rattling up and down on its stand over the first biobed
    { type: 'v', sprite: 'skull', ink: 'white', x: 8, y: 40, min: 40, max: 88, dy: 1, anim: 'fast' },
    // the hypospray drone sweeping diagonally down to the instrument shelf
    { type: 'd', sprite: 'laser_drone', ink: 'cyan', x: 96, y: 16, dx: 1, dy: 1, count: 40, anim: 'fast' },
    // the medibot trundling the ward floor
    { type: 'h', sprite: 'robot', ink: 'green', bright: true, x: 18, y: 104, min: 12, max: 24, dir: 'right' },
  ],
  special: {
    signs: [
      { x: 16, y: 1, text: 'SAY AAAH!', ink: 'red', flash: true },
      { x: 4, y: 2, text: 'E', ink: 'white' },
      { x: 4, y: 3, text: 'FP', ink: 'white' },
      { x: 4, y: 4, text: 'TOZ', ink: 'white' },
      { x: 4, y: 5, text: 'LPED', ink: 'white' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Brig [8,1] - difficulty 4. Dead end (east door only).
// Three cells line the west end of the deck, each fronted by a force field: a grav beam pulsing up and down in the
// doorway under the crackling emitter bars. Time each field to slip through. A robot guard paces the corridor, the
// alien prisoner in the middle cell bobs up and down behind the bars, and the escape spanner lies in the far cell
// above the bunk - jump for it.
JSW.defineRoom({
  id: 'the_brig',
  name: 'The Brig',
  region: 'starship',
  pos: [8, 1],
  border: 'magenta',
  item: 'spanner',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'H': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'red' },
    'B': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'black', bright: true },
    'X': { type: 'nasty', tile: 'laser_grid', ink: 'cyan', paper: 'black', bright: true, flash: true },
    '=': { type: 'floor', tile: 'tiled_floor', ink: 'cyan', paper: 'black', bright: true },
    'k': { type: 'floor', tile: 'plank', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
    'HH....B.....B.....B...........HH',
    'HH....B.....B.....B...........HH',
    'HH....B.....B.....B...........HH',
    'HH....B.....B.....B...........HH',
    'HH....B.....B.....B...........HH',
    'HH....B.....B.....B...........HH',
    'HH....X.....X.....X...........HH',
    'HH....X.....X.....X...........HH',
    'HH............................HH',
    'HH.+..........................HH',
    'HH..............................',
    'HH..............................',
    'HHkkk...........................',
    'HH..............................',
    'HH==============================',
  ],
  guardians: [
    // three force fields: grav beams pulsing in the cell doorways, out of step
    { type: 'v', sprite: 'beam', ink: 'cyan', x: 18, y: 72, min: 72, max: 104, dy: 1, anim: 'fast' },
    { type: 'v', sprite: 'beam', ink: 'magenta', x: 12, y: 104, min: 72, max: 104, dy: -1, anim: 'fast' },
    { type: 'v', sprite: 'beam', ink: 'yellow', x: 6, y: 88, min: 72, max: 104, dy: 1, anim: 'fast' },
    // the alien prisoner bobbing behind the bars of the middle cell
    { type: 'v', sprite: 'alien_head', ink: 'green', x: 9, y: 40, min: 40, max: 96, dy: 1, anim: 'slow' },
    // the robot guard pacing the corridor
    { type: 'h', sprite: 'robot', ink: 'white', bright: true, x: 24, y: 104, min: 21, max: 26, dir: 'left' },
  ],
  special: {
    signs: [
      { x: 21, y: 2, text: 'THE BRIG', ink: 'red', flash: true },
      { x: 20, y: 4, text: 'NO VISITS', ink: 'yellow' },
      { x: 2, y: 3, text: 'IIII', ink: 'white' },
    ],
  },
});
