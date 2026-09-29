// Jet Set Wally II - the coast (region 'coast'): beach, pier, lighthouse, the millionaire's yacht and the
// desert island reached by it. Author file: src/data/rooms/coast.js
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts original.

// ---------------------------------------------------------------------------------------------------------
// Sand in Your Sandwiches [20,11] - difficulty 2. The towpath comes in under the red cliff (west, floor 13) and
// steps down onto the sand. The sewer outfall pipe pokes out of the cliff: outfall arrivals land on the dune
// (row 5) and slide down the dune slope to the cliff-foot ledge, which runs straight onto the sandcastle towers.
// A beach ball rolls about under the cliff (hop onto the windbreak), a crab scuttles east of the stepped castle,
// and the shell hangs over the towers while a gull wheels down at it.
JSW.defineRoom({
  id: 'the_beach',
  name: 'Sand in Your Sandwiches',
  region: 'coast',
  pos: [20, 11],
  border: 'cyan',
  item: 'shell',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'R': { type: 'wall', tile: 'rock', ink: 'white', paper: 'red' },                               // the cliff
    'P': { type: 'wall', tile: 'pipe_v', ink: 'green', paper: 'black', bright: true },             // outfall pipe
    's': { type: 'wall', tile: 'sandstone', ink: 'yellow', paper: 'black' },                       // dune body
    'C': { type: 'wall', tile: 'sandstone', ink: 'black', paper: 'yellow', bright: true },         // sandcastle
    'W': { type: 'wall', tile: 'wood_panel', ink: 'white', paper: 'red', bright: true },           // windbreak
    'w': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'white', bright: true },
    'd': { type: 'floor', tile: 'sand_top', ink: 'yellow', paper: 'black', bright: true },
    '_': { type: 'floor', tile: 'stone_ledge', ink: 'yellow', paper: 'black', bright: true },      // towpath
    '-': { type: 'floor', tile: 'rock_ledge', ink: 'white', paper: 'black', bright: true },        // cliff foot
    '\\': { type: 'ramp', tile: 'slope_rock', ink: 'yellow', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
    'RRRR............................',
    'RRRR............................',
    'RRRRPP..........................',
    'RRRRPP..........................',
    'RRRRRRdddddd\\...................',
    'RRRRRsssssssR\\..................',
    'RRRRRRssssssRR\\......+..........',
    'RRRRRRRRsssRRRR\\................',
    'RRRRRRRRRRRRRRRR\\...............',
    '................----............',
    '....................CCC.........',
    '...................CCCCC........',
    '___...........Ww..CCCCCCC.......',
    'RRR...........Ww..CCCCCCC.......',
    'RRRddddddddddddddddddddddddddddd',
  ],
  guardians: [
    // a beach ball rolling to and fro on the sand under the cliff (the windbreak is a safe perch)
    { type: 'h', sprite: 'beach_ball', ink: 'magenta', bright: true, x: 5, y: 104, min: 5, max: 12, dir: 'right' },
    // a crab scuttling between the sandcastle and the pier (two clear cells short of the doorway)
    { type: 'h', sprite: 'crab', ink: 'red', bright: true, x: 26, y: 104, min: 25, max: 26, dir: 'left' },
    // a gull wheeling down towards the shell over the castle towers
    { type: 'd', sprite: 'seagull', ink: 'white', x: 128, y: 8, dx: 1, dy: 1, count: 40, anim: 'fast' },
  ],
  special: {
    arrival: { x: 6, y: 24, facing: 'right' },
    signs: [
      { x: 6, y: 1, text: 'BEACH ->', ink: 'yellow' },
      { x: 14, y: 3, text: 'BLUE FLAG PENDING', ink: 'cyan' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Kiss-Me-Quick Pier [21,11] - difficulty 3. The promenade steps come down from the corner shop (ramp cells (8,0),
// (9,1)...) to the pier landing (row 10). Parallel to them the helter-skelter slide runs up to the striped tower's
// roof and the heart. Walking west along the landing always takes the promenade steps, so jump west off the
// landing's east half to reach the foot of the slide. The fortune-teller's booth (13) and its awning (11) are the
// way up from the boards - mind the flying fish that zip across at landing height. A unicycling clown patrols the
// boards under the steps; gulls skim the promenade and the booth. East: the gangplank up to the yacht (floor 14).
JSW.defineRoom({
  id: 'kiss_me_quick_pier',
  name: 'Kiss-Me-Quick Pier',
  region: 'coast',
  pos: [21, 11],
  border: 'magenta',
  item: 'heart',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'X': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },                      // sea wall
    'F': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'black', bright: true },            // flagpole
    'T': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'red', bright: true },        // tower roof
    'H': { type: 'wall', tile: 'metal_plate', ink: 'red', paper: 'white', bright: true },         // helter-skelter
    'h': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'red', bright: true },
    'B': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'magenta', bright: true },         // fortune booth
    'l': { type: 'floor', tile: 'pipe_v', ink: 'white', paper: 'black' },                          // tower legs
    '=': { type: 'floor', tile: 'deck', ink: 'cyan', paper: 'black', bright: true },               // pier landing
    '-': { type: 'floor', tile: 'shelf', ink: 'magenta', paper: 'black', bright: true },           // awning
    'D': { type: 'floor', tile: 'deck', ink: 'yellow', paper: 'black', bright: true },             // the boards
    '_': { type: 'floor', tile: 'plank', ink: 'white', paper: 'black', bright: true },             // gangplank
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'left' }, // promenade steps
    'z': { type: 'ramp', tile: 'escalator', ink: 'yellow', paper: 'black', bright: true, dir: 'left' }, // the slide
    '/': { type: 'ramp', tile: 'stairs_outline', ink: 'white', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'XXXXXXXX\\...XXXXXXXXXXXXXXXXXXXX',
    '..F.+....\\......................',
    '..F.......\\.....................',
    '..TTTTz....\\....................',
    '..HHHH.z....\\...................',
    '..hhhh..z....\\..................',
    '..HHHH...z....\\.................',
    '..hhhh....z....\\................',
    '..HHHH.....z....\\...............',
    '..hhhh......z....\\..............',
    '..HHHH......==========..........',
    '..hhhh................------....',
    '..l..l..........................',
    '..l..l................BBBB......',
    '..l..l................BBBB./____',
    'DDDDDDDDDDDDDDDDDDDDDDDDDDDD~~~~',
  ],
  guardians: [
    // a clown on a unicycle wobbling along the boards under the steps
    { type: 'h', sprite: 'unicycle', ink: 'green', bright: true, x: 9, y: 104, min: 9, max: 14, dir: 'right' },
    // a gull skimming the top of the promenade steps
    { type: 'd', sprite: 'seagull', ink: 'white', x: 104, y: 8, dx: 1, dy: 0, count: 48, anim: 'fast' },
    // a gull swooping down on the landing's east end and the awning
    { type: 'd', sprite: 'seagull', ink: 'cyan', x: 232, y: 8, dx: -1, dy: 1, count: 48, anim: 'fast' },
    // flying fish zipping across at landing height
    { type: 'arrow', dir: 'left', y: 84 },
  ],
  special: {
    signs: [
      { x: 19, y: 4, text: 'KISS ME QUICK', ink: 'magenta', flash: true },
      { x: 22, y: 12, text: 'FORTUNES', ink: 'yellow' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Poop Deck Posers [22,11] - difficulty 3. The stern of a millionaire's yacht moored at the pier. The gangplank
// (west, floor 14) lands on the sun deck by the flagstaff: shin up the flagstaff (hop from notch to notch) for the
// bottle at its top (row 4), dodging the lifebuoy swinging off the stern rail; walk out along the ensign and drop
// onto the flybridge (8) to come down. The deckchairs (12) lead onto the cabin roof (10), where a champagne cork
// keeps popping; the locker (12) steps down to the fore deck, paced by a sailor, and the east door to the bow.
// The headland above is sealed.
JSW.defineRoom({
  id: 'yacht_poop_deck',
  name: 'Poop Deck Posers',
  region: 'coast',
  pos: [22, 11],
  border: 'blue',
  item: 'bottle',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'K': { type: 'wall', tile: 'rock', ink: 'green', paper: 'black', bright: true },              // headland above
    'p': { type: 'floor', tile: 'pipe_v', ink: 'white', paper: 'black', bright: true },            // flagstaff
    'f': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'red', bright: true },          // ensign
    '=': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },              // flybridge
    'R': { type: 'wall', tile: 'hull', ink: 'white', paper: 'blue', bright: true },                // cabin roof
    'W': { type: 'wall', tile: 'hull', ink: 'white', paper: 'blue' },                              // cabin
    'o': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue', bright: true },               // portholes
    'c': { type: 'floor', tile: 'rug', ink: 'red', paper: 'black', bright: true },                 // deckchairs
    'L': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'red' },                             // deck locker
    '_': { type: 'floor', tile: 'plank', ink: 'white', paper: 'black', bright: true },             // gangplank
    'd': { type: 'floor', tile: 'deck', ink: 'yellow', paper: 'black', bright: true },             // sun deck
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
    'U': { type: 'wall', tile: 'hull', ink: 'blue', paper: 'white', bright: true },                // white hull
  },
  map: [
    'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
    '................................',
    '................................',
    '................................',
    '....+...........................',
    '....pfff........................',
    '....pfff........................',
    '....p...........................',
    '....p...=====...................',
    '....p...........................',
    '....p........RRRRRRR............',
    '....p........WoWWWoW............',
    '....p....ccccWWWWWWWLL..........',
    '....p........WWWWWWWLL..........',
    '___ddddddddddddddddddddddddddddd',
    '~~UUUUUUUUUUUUUUUUUUUUUUUUUUUUUU',
  ],
  guardians: [
    // the lifebuoy swinging off the stern rail
    { type: 'v', sprite: 'lifebuoy', ink: 'red', x: 6, y: 56, min: 56, max: 96, dy: 1, anim: 'slow' },
    // a champagne cork popping over the cabin roof
    { type: 'v', sprite: 'champagne', ink: 'yellow', x: 13, y: 16, min: 16, max: 64, dy: 2, anim: 'fast' },
    // a sailor pacing the fore deck
    { type: 'h', sprite: 'sailor', ink: 'white', bright: true, x: 23, y: 96, min: 22, max: 26, dir: 'right' },
  ],
  special: {
    signs: [{ x: 14, y: 2, text: 'MV SHOWING OFF', ink: 'cyan' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Sharp End [23,11] - difficulty 4. The bow. From the poop deck (west, floor 14) past the ship's wheel (the
// yacht portal) and under the ratlines: hop up the zig-zag ratlines (12, 10, 8, 6) to the crow's nest (4) and its
// bell - a flying fish skims the nest. Past the mast a seal flops about at the foot of the raked foredeck, where a
// parrot swoops; the ramp climbs to the bowsprit (7), whose bell hangs under a swinging anchor. East rail and sky
// sealed. Once the trip switch is thrown and both yacht rooms are cleared, the furled sail flashes, the pennant
// reads ALL ABOARD and standing at the wheel sails the yacht (one way) to Desert Island Discs.
JSW.defineRoom({
  id: 'yacht_sharp_end',
  name: 'The Sharp End',
  region: 'coast',
  pos: [23, 11],
  border: 'green',
  item: 'bell',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'C': { type: 'wall', tile: 'cloud_solid', ink: 'white', paper: 'black' },                      // sky / sea spray
    'U': { type: 'wall', tile: 'hull', ink: 'blue', paper: 'white', bright: true },               // white hull
    'd': { type: 'floor', tile: 'deck', ink: 'yellow', paper: 'black', bright: true },             // deck
    'M': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },            // mast
    'm': { type: 'floor', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },           // mast foot
    'r': { type: 'floor', tile: 'rope_bridge', ink: 'white', paper: 'black', bright: true },       // ratlines
    'n': { type: 'floor', tile: 'plank', ink: 'red', paper: 'black', bright: true },               // crow's nest
    'Y': { type: 'wall', tile: 'hull', ink: 'white', paper: 'red', bright: true },                 // furled sail
    'b': { type: 'floor', tile: 'pipe_h', ink: 'yellow', paper: 'black', bright: true },           // bowsprit
    '/': { type: 'ramp', tile: 'stairs_outline', ink: 'yellow', paper: 'black', bright: true, dir: 'right' },
  },
  map: [
    'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    '...............................C',
    '................+..............C',
    '..................YYYYYYY......C',
    '..........nnnnnnnn.............C',
    '..............M...............+C',
    '.......rrr....M................C',
    '..............M.........../bbbbU',
    '..........rrr.M........../UUUUUU',
    '..............M........./UUUUUUU',
    '.......rrr....M......../UUUUUUUU',
    '..............M......./UUUUUUUUU',
    '..........rrr.m....../UUUUUUUUUU',
    '..............m...../UUUUUUUUUUU',
    'ddddddddddddddddddddUUUUUUUUUUUU',
    'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU',
  ],
  guardians: [
    // a seal flopping about between the mast and the foot of the foredeck
    { type: 'h', sprite: 'seal', ink: 'cyan', bright: true, x: 15, y: 96, min: 15, max: 17, dir: 'right' },
    // the ship's parrot swooping down on the foot of the foredeck
    { type: 'd', sprite: 'parrot', ink: 'green', x: 128, y: 48, dx: 1, dy: 1, count: 32, anim: 'fast' },
    // the anchor swinging over the bowsprit
    { type: 'v', sprite: 'anchor', ink: 'magenta', x: 28, y: 8, min: 8, max: 40, dy: 1, anim: 'slow' },
    // a flying fish skimming the crow's nest
    { type: 'arrow', dir: 'right', y: 20 },
  ],
  special: {
    portals: [{ x: 6, y: 13, w: 2, h: 1, kind: 'yacht', to: 'desert_island_discs', flag: 'trip',
      requiresRooms: ['yacht_poop_deck', 'yacht_sharp_end'] }],
    flagFlash: [{ flag: 'trip', x: 18, y: 3, w: 7, h: 1 }],
    signs: [
      { x: 5, y: 11, text: 'HELM', ink: 'cyan' },
      { x: 19, y: 1, text: 'NOT YET', ink: 'red', flash: true },
      { x: 19, y: 1, text: 'ALL ABOARD', ink: 'green', flash: true, when: 'trip' },
    ],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Beacon and Eggs [22,10] - difficulty 3. The lighthouse on the headland, behind the corner shop (west door,
// floor 15). A gull swoops down on the tower door. Inside, the stairs (/) climb to the first landing (9), where a crab
// guards the way to the upper flight (\) - walk past its foot and turn back to climb to the lamp room (5). A second
// gull flies in through the gallery window over the lamp room's bulb. Coming down, the landing's east end drops to
// a ledge (13) and the floor, where the keeper's lunch tin (with a bulb on it) is guarded by his teapot. The lamp
// flashes once the trip switch has been thrown. Walls north, east and south: a dead end.
JSW.defineRoom({
  id: 'lighthouse_keepers_lunch',
  name: 'Beacon and Eggs',
  region: 'coast',
  pos: [22, 10],
  border: 'yellow',
  item: 'bulb',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'X': { type: 'wall', tile: 'brick', ink: 'red', paper: 'yellow' },                            // shop wall
    'C': { type: 'wall', tile: 'cloud_solid', ink: 'white', paper: 'black' },                      // sky
    'W': { type: 'wall', tile: 'brick_small', ink: 'red', paper: 'white', bright: true },          // tower stripes
    'w': { type: 'wall', tile: 'brick_small', ink: 'white', paper: 'red', bright: true },
    'L': { type: 'wall', tile: 'window', ink: 'yellow', paper: 'black', bright: true },            // the lamp
    'r': { type: 'wall', tile: 'metal_plate', ink: 'white', paper: 'black' },                      // gallery rail
    'g': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },             // gallery
    '=': { type: 'floor', tile: 'stone_ledge', ink: 'cyan', paper: 'black', bright: true },        // landings
    'l': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },             // ledge
    'T': { type: 'wall', tile: 'metal_plate', ink: 'blue', paper: 'cyan', bright: true },          // lunch tin
    'G': { type: 'floor', tile: 'grass_top', ink: 'green', paper: 'black', bright: true },         // doorstep
    'E': { type: 'wall', tile: 'earth', ink: 'green', paper: 'black', bright: true },              // headland
    'S': { type: 'wall', tile: 'stone_block', ink: 'white', paper: 'blue' },                       // tower floor
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'right' },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true, dir: 'left' },
  },
  map: [
    'XCCCCCCCCWWWWWWWWWWWWWWWWWWWWWWW',
    'X........W.....LLLLL....WWWWWWWW',
    'X........w.....LLLLL....wwwwwwww',
    'X.r........+...................W',
    'X.r............................w',
    'X.gggggggW.============\\.......W',
    'X........w..............\\......w',
    'X........W...............\\.....W',
    'X........w................\\....w',
    'X........W......./===========..W',
    'X........w....../..............w',
    '.............../....+..........W',
    '............../................w',
    '............./......TT......lllW',
    '............/.......TT.........w',
    'GGEEEEEEEESSSSSSSSSSSSSSSSSSSSSW',
  ],
  guardians: [
    // a gull swooping down on the tower door
    { type: 'd', sprite: 'seagull', ink: 'white', x: 16, y: 56, dx: 1, dy: 1, count: 40, anim: 'fast' },
    // a gull flying in and out of the gallery window, over the lamp room's bulb
    { type: 'd', sprite: 'seagull', ink: 'cyan', x: 24, y: 24, dx: 1, dy: 0, count: 80, anim: 'fast' },
    // the crab guarding the first landing
    { type: 'h', sprite: 'crab', ink: 'red', bright: true, x: 19, y: 56, min: 18, max: 23, dir: 'right' },
    // the keeper's teapot, bobbing beside his lunch tin
    { type: 'v', sprite: 'teapot', ink: 'magenta', x: 23, y: 80, min: 80, max: 104, dy: 1, anim: 'slow' },
  ],
  special: {
    flagFlash: [{ flag: 'trip', x: 15, y: 1, w: 5, h: 2 }],
    signs: [{ x: 15, y: 12, text: 'EGGS: KEEP OFF', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Shark-Infested Shallows [24,12] - difficulty 4. West of the island: a sandbar ends and a line of rocky stepping
// stones (tops 13, 12, 11, 10 - one row higher each hop) crosses the churning sea to the big rock with the pearl.
// A shark fin cruises the second gap, a jellyfish drifts up and down the third and a gull dives at the last hop.
// The only way out is back east to the island (floor 15); every other edge is sealed.
JSW.defineRoom({
  id: 'shark_infested_shallows',
  name: 'Shark-Infested Shallows',
  region: 'coast',
  pos: [24, 12],
  border: 'blue',
  item: 'pearl',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'C': { type: 'wall', tile: 'cloud_solid', ink: 'white', paper: 'black' },                      // sea mist
    'R': { type: 'wall', tile: 'rock', ink: 'yellow', paper: 'black', bright: true },              // stepping stones
    '~': { type: 'nasty', tile: 'waves', ink: 'cyan', paper: 'blue', bright: true },
    's': { type: 'floor', tile: 'sand_top', ink: 'yellow', paper: 'black', bright: true },         // sandbar
  },
  map: [
    'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    'C...............................',
    'C...............................',
    'C...............................',
    'C...............................',
    'C...............................',
    'C...............................',
    'C.+.............................',
    'C...............................',
    'C...............................',
    'RRRRRR..........................',
    'RRRRRR..RRR.....................',
    'RRRRRR..RRR...RRR...............',
    'RRRRRR..RRR...RRR...RRR.........',
    'RRRRRR~~RRR~~~RRR~~~RRR~~.......',
    'RRRRRR~~RRR~~~RRR~~~RRR~~sssssss',
  ],
  guardians: [
    // a shark fin cruising the gap between the first and second stones
    { type: 'h', sprite: 'shark', ink: 'white', bright: true, x: 17, y: 96, min: 17, max: 18, dir: 'left' },
    // a jellyfish drifting up and down the next gap
    { type: 'v', sprite: 'jellyfish', ink: 'magenta', x: 12, y: 16, min: 16, max: 88, dy: 1, anim: 'slow' },
    // a gull diving at the last hop to the pearl rock
    { type: 'd', sprite: 'seagull', ink: 'white', x: 24, y: 16, dx: 1, dy: 1, count: 32, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 14, y: 5, text: 'LIFEGUARD ON LUNCH', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Desert Island Discs [25,12] - difficulty 3. The yacht drops Wally on the sand under the palm (arrival cols
// 20-21). The palm trunk rises from a rock (13) - step past its foot and turn back to climb it to the fronds (5)
// and the record spinning above them, where a parrot flutters. The wind-up gramophone (12, horn 10) holds the
// other disc; a starfish bobs in front of it and a crab scuttles along the sand. West, the crashed escape pod: walk
// in under its roof (12) onto the glowing pad (floor 15, cols 4-7) to beam one way to the starship's Molecule
// Shuffler - the only exit from the island. To reach the shallows door without boarding the pod, hop over its roof
// via the wreckage fin (13) and the stepped nose.
JSW.defineRoom({
  id: 'desert_island_discs',
  name: 'Desert Island Discs',
  region: 'coast',
  pos: [25, 12],
  border: 'yellow',
  item: 'disk',
  tiles: {
    '.': { type: 'air', ink: 'white', paper: 'black' },
    'C': { type: 'wall', tile: 'cloud_solid', ink: 'white', paper: 'black' },                      // sea mist
    'f': { type: 'floor', tile: 'branch', ink: 'green', paper: 'black', bright: true },            // palm fronds
    '\\': { type: 'ramp', tile: 'bark', ink: 'yellow', paper: 'black', bright: true, dir: 'left' }, // palm trunk
    'P': { type: 'wall', tile: 'metal_plate', ink: 'cyan', paper: 'black', bright: true },         // pod hull
    'p': { type: 'floor', tile: 'grate', ink: 'cyan', paper: 'black', bright: true },              // pod roof
    'k': { type: 'floor', tile: 'girder', ink: 'white', paper: 'black' },                          // wreckage fin
    'R': { type: 'wall', tile: 'rock', ink: 'yellow', paper: 'black' },                            // rock
    'G': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },                        // gramophone
    'H': { type: 'wall', tile: 'metal_plate', ink: 'yellow', paper: 'black', bright: true },       // brass horn
    's': { type: 'floor', tile: 'sand_top', ink: 'yellow', paper: 'black', bright: true },         // sand
    'o': { type: 'floor', tile: 'grate', ink: 'magenta', paper: 'black', bright: true, flash: true }, // the pad
  },
  map: [
    'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    '...............................C',
    '..........+....................C',
    '...............................C',
    '...............................C',
    '.........ffffff\\...............C',
    '................\\..............C',
    '.................\\.............C',
    '..................\\..........+.C',
    '...................\\...........C',
    '....................\\.......HHHC',
    '.....................\\......HHHC',
    '...Ppppppp............\\...GGGGGC',
    '..PP......kk..........RRRRGGGGGC',
    '..PP..................RRRRGGGGGC',
    'ssssoooosssssssssssssssssssssssC',
  ],
  guardians: [
    // a crab scuttling along the sand between the pod and the palm
    { type: 'h', sprite: 'crab', ink: 'red', bright: true, x: 13, y: 104, min: 12, max: 17, dir: 'left' },
    // the parrot fluttering over the fronds
    { type: 'd', sprite: 'parrot', ink: 'green', x: 72, y: 8, dx: 1, dy: 0, count: 56, anim: 'fast' },
    // a starfish bobbing in front of the gramophone
    { type: 'v', sprite: 'starfish', ink: 'magenta', x: 25, y: 40, min: 40, max: 80, dy: 1, anim: 'slow' },
  ],
  special: {
    arrival: { x: 20, y: 104, facing: 'left' },
    portals: [{ x: 4, y: 14, w: 4, h: 1, kind: 'teleport', to: 'molecule_shuffler' }],
    signs: [
      { x: 1, y: 10, text: 'ONE-WAY TICKET', ink: 'cyan', flash: true },
      { x: 19, y: 3, text: 'NOW PLAYING', ink: 'yellow' },
    ],
  },
});
