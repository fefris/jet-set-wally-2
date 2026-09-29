// Jet Set Wally II - mansion, first floor (grid row 9): Back Stairs Gossip .. The Stuffed Shirt Trophy Room.
// Author file: src/data/rooms/mansion_first.js  (region 'mansion')
// Door contracts: src/data/world_plan.json / docs/WORLD.md. All layouts, names and jokes original.
//
// First-floor conventions used below: east/west doors are open rows 11-14 over floor 15 (the library ->
// billiard-room door is open rows 7-10 over the row-11 gallery); every other edge cell is wall, including
// the door-floor cell itself. Stairs follow the cross-boundary recipe in docs/ROOMS.md.

// ---------------------------------------------------------------------------------------------------------
// Back Stairs Gossip [6,9] - difficulty 2.
// The Nursery flight comes down from the ceiling hatch (cols 3-6) onto the half-landing at row 9, where the
// maid sweeps under a lost love letter. The lower flight dives through the floor at cols 21-22 into the Back
// Hall: walk up it from the east-door corridor to the little landing (row 11), hop up-left onto the half-
// landing, or drop off the landing's end into the door alcove. The lobby under the stairs (rat!) has a bench
// and a shelf that climb back up to the half-landing.
JSW.defineRoom({
  id: 'servants_back_stairs',
  name: 'Back Stairs Gossip',
  region: 'mansion',
  pos: [6, 9],
  border: 'magenta',
  item: 'envelope',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'brick_small', ink: 'red', paper: 'yellow' },
    'W': { type: 'wall', tile: 'window', ink: 'cyan', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'green', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '###\\...#########################',
    '###.\\.........................##',
    '#####\\...................WWWW.##',
    '##....\\..................WWWW.##',
    '##.....\\.................WWWW.##',
    '##......\\................WWWW.##',
    '##.......\\......+.............##',
    '##........\\...................##',
    '##.........\\..................##',
    '##.........=============......##',
    '##............................##',
    '##.....---.............../==....',
    '##....................../.......',
    '##.---................./........',
    '##..................../.........',
    '##===================/========##',
  ],
  guardians: [
    // the maid sweeps the middle of the half-landing; both ends (stair foot, hop-up spot) stay clear
    { type: 'h', sprite: 'maid', ink: 'magenta', bright: true, x: 16, y: 56, min: 15, max: 19, dir: 'right' },
    // a rat scurries about the lobby under the stairs, between the bench and the stair foot
    { type: 'h', sprite: 'rat', ink: 'yellow', bright: true, x: 10, y: 104, min: 6, max: 15, dir: 'left' },
  ],
  special: {
    signs: [{ x: 12, y: 2, text: 'DID YOU HEAR?', ink: 'cyan' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// The Rogues' Gallery [7,9] - difficulty 2.
// A long gallery of glowering ancestors. Picture rails step up every 2 rows (13, 11, 9) at both ends to the
// long upper rail (row 7), where a ghost of some disgraced great-uncle glides; hop from the rail's ends onto the
// two portrait frames for the items. The longcase clock's pendulum swings low over the middle of the floor.
JSW.defineRoom({
  id: 'the_rogues_gallery',
  name: "The Rogues' Gallery",
  region: 'mansion',
  pos: [7, 9],
  border: 'green',
  item: 'spectacles',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'P': { type: 'wall', tile: 'stone_block', ink: 'yellow', paper: 'blue', bright: true },
    'C': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'blue', bright: true },
    'R': { type: 'wall', tile: 'stone_block', ink: 'magenta', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'cyan', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'carpet', ink: 'magenta', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##............................##',
    '##.....RRR....CCCC....RRR.....##',
    '##.+...RRR....CCCC....RRR...+.##',
    '##............CCCC............##',
    '##PPP......................PPP##',
    '##PPP......................PPP##',
    '##.....------------------.....##',
    '##............................##',
    '##----....................----##',
    '##............................##',
    '......----............----......',
    '................................',
    '..----....................----..',
    '................................',
    '##============================##',
  ],
  guardians: [
    // the clock's pendulum swings low over the middle of the floor: cross while it is up
    { type: 'v', sprite: 'pendulum', ink: 'yellow', x: 15, y: 64, min: 64, max: 96, dy: 2, anim: 'slow' },
    // a ghostly ancestor glides along the middle of the upper rail; both ends, where you land, stay clear
    { type: 'd', sprite: 'ghost', ink: 'white', x: 88, y: 40, dx: 2, dy: 0, count: 32, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Shhh! Bookworms at Work [8,9] - difficulty 3.
// A free-standing bookcase splits the reading room: climb its west face (footstool shelf 13 -> shelf 11 -> top 9),
// then down its east face (shelf 11 -> footstool 13) to the rolling ladder, which leans on the big east bookcase
// whose top (row 11) is the gallery to the billiard room. The two books worth stealing are on the high shelves
// (rows 7 and 5) above the west face. Flying books flap about and a spider abseils into the east aisle.
JSW.defineRoom({
  id: 'shhh_the_library',
  name: 'Shhh! Bookworms at Work',
  region: 'mansion',
  pos: [8, 9],
  border: 'red',
  item: 'book',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    'B': { type: 'wall', tile: 'bookshelf', ink: 'yellow', paper: 'blue' },
    '-': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'carpet', ink: 'red', paper: 'black', bright: true },
    '/': { type: 'ramp', tile: 'stairs_outline', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    'BB............................BB',
    'BB............................BB',
    'BB.........+..................BB',
    'BB............................BB',
    'BB.+....----..................BB',
    'BB............................BB',
    'BB.----.........................',
    'BB..............................',
    'BB.......BBBB...................',
    'BB.......BBBB...................',
    '......---BBBB--....../BBBBBBBBBB',
    '.........BBBB......./BBBBBBBBBBB',
    '..---....BBBB..--../BBBBBBBBBBBB',
    '.........BBBB...../BBBBBBBBBBBBB',
    'BB=======BBBB======BBBBBBBBBBBBB',
  ],
  guardians: [
    // a spider abseils into the east aisle over the footstool; wait for it to wind back up
    { type: 'v', sprite: 'spider', ink: 'white', x: 16, y: 16, min: 16, max: 80, dy: 2, anim: 'fast' },
    // a flying book flaps down from the rafters towards the gallery
    { type: 'd', sprite: 'flying_book', ink: 'cyan', x: 104, y: 16, dx: 2, dy: 1, count: 48, anim: 'fast' },
    // another flaps over the high shelves on the west side
    { type: 'd', sprite: 'flying_book', ink: 'magenta', x: 16, y: 8, dx: 2, dy: 1, count: 16, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 13, y: 1, text: 'SHHH!', ink: 'white' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Pot Black Billiard Room [9,9] - difficulty 3. Dead end off the library gallery.
// The library gallery runs straight onto the baize (row 11). Two snooker balls - one a speedy cue ball - roll
// the table under the lamp; jump them to pocket the coins hanging over the table. Walk off the east end to the
// floor (4 rows) and climb back via the stool (row 13). In the east corner the secret dumbwaiter hatch: a gap
// at cols 26-27 drops to the Servery, and the grating at cols 28-29 is where the dumbwaiter delivers you.
JSW.defineRoom({
  id: 'pot_black_billiard_room',
  name: 'Pot Black Billiard Room',
  region: 'mansion',
  pos: [9, 9],
  border: 'cyan',
  item: 'coin',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'green', paper: 'black' },
    'G': { type: 'wall', tile: 'dots_wallpaper', ink: 'green', paper: 'green', bright: true },
    'W': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'red' },
    'T': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'black', bright: true },
    'S': { type: 'wall', tile: 'metal_plate', ink: 'green', paper: 'black', bright: true },
    'l': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'black' },
    'Q': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'red' },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black' },
    '_': { type: 'floor', tile: 'grate', ink: 'white', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##........ll..................##',
    '##........ll..................##',
    '##........ll..................##',
    '##....SSSSSSSSSS...........QQQ##',
    '##.........................QQQ##',
    '##.........................QQQ##',
    '.......+........+..........QQQ##',
    '...........................QQQ##',
    '..............................##',
    '..............................##',
    '##GGGGGGGGGGGGGGGGGG..........##',
    '##WWWWWWWWWWWWWWWWWW..........##',
    '##.WW.....WW......WW...TT.....##',
    '##.WW.....WW......WW...TT.....##',
    '##========================..__##',
  ],
  guardians: [
    // a red rolls up and down the west half of the table
    { type: 'h', sprite: 'beach_ball', ink: 'red', bright: true, x: 5, y: 72, min: 4, max: 8, dir: 'right' },
    // the cue ball, twice as fast, on the east half; both table ends and the middle pocket (cols 10-11) stay clear
    { type: 'h', sprite: 'beach_ball', ink: 'white', bright: true, x: 15, y: 72, min: 13, max: 16, dir: 'left', speed: 2 },
  ],
  special: {
    signs: [{ x: 18, y: 2, text: 'BREAK: 147', ink: 'yellow' }],
  },
});

// ---------------------------------------------------------------------------------------------------------
// Drawing a Blank [10,9] - difficulty 2. Dead end off the Music Room.
// Four easels of rising height (canvas tops at rows 13, 11, 9, 7) climb west from the door; each blank canvas
// overhangs the one below, so stepping off an easel lands you safely on the next one down. The last easel
// stands beside the artist's unfinished portrait of Wally (hat, half a face, no chin). A disembodied hand
// sketches back and forth above the easels and a candle bobs between the middle two. Spilled crayons litter
// the floor under the easels, out of harm's way.
JSW.defineRoom({
  id: 'the_drawing_room',
  name: 'Drawing a Blank',
  region: 'mansion',
  pos: [10, 9],
  border: 'yellow',
  item: 'apple',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'brick', ink: 'white', paper: 'magenta' },
    'C': { type: 'wall', tile: 'stone_block', ink: 'black', paper: 'white', bright: true },
    'P': { type: 'wall', tile: 'blank', ink: 'black', paper: 'white', bright: true },
    'K': { type: 'wall', tile: 'blank', ink: 'black', paper: 'blue', bright: true },
    'F': { type: 'wall', tile: 'blank', ink: 'black', paper: 'yellow', bright: true },
    'E': { type: 'wall', tile: 'rivets', ink: 'black', paper: 'yellow', bright: true },
    'l': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black' },
    '^': { type: 'nasty', tile: 'spikes_up', ink: 'red', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'cyan', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##............................##',
    '##PPKPP.......................##',
    '##PKKKP.......................##',
    '##KKKKK..+....................##',
    '##PFFPP.......................##',
    '##PFEPP.......................##',
    '##PFFPPCCCCC..................##',
    '##PPPPPCCCCC..................##',
    '##.l.l.l....CCCCC.............##',
    '##.l.l.l....CCCCC.............##',
    '##.l.l.l....l....CCCCC..........',
    '##.l.l.l....l....CCCCC..........',
    '##.l.l.l....l....l....CCCC......',
    '##.l.l.l.^..l.^^.l^..^CCCC......',
    '##============================##',
  ],
  guardians: [
    // the disembodied hand sketches back and forth above the easels, itching to finish the portrait
    { type: 'd', sprite: 'hand', ink: 'white', x: 64, y: 16, dx: 2, dy: 0, count: 48, anim: 'slow' },
    // a candle bobs between the middle easels
    { type: 'v', sprite: 'candle', ink: 'yellow', x: 19, y: 24, min: 24, max: 64, dy: 1, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// Chopsticks Concerto [11,9] - difficulty 2.
// West to east: hop the piano stool (row 13) onto the grand piano's lid (row 11), dodge the ticking metronome for
// the bell on the lid, and walk off the far end to the floor. East to west: the harp's slanted pillar (a ramp
// rising left) carries you up to a little landing (row 9) that drops back onto the lid. From the landing,
// jump for the chandelier (row 7) and its bell - mind the bat flitting about the rafters.
JSW.defineRoom({
  id: 'the_music_room',
  name: 'Chopsticks Concerto',
  region: 'mansion',
  pos: [11, 9],
  border: 'blue',
  item: 'bell',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'marble', ink: 'cyan', paper: 'blue' },
    'K': { type: 'wall', tile: 'wood_panel', ink: 'white', paper: 'black' },
    'Y': { type: 'wall', tile: 'pipe_v', ink: 'black', paper: 'white', bright: true },
    'L': { type: 'wall', tile: 'wood_panel', ink: 'white', paper: 'black' },
    'T': { type: 'wall', tile: 'rivets', ink: 'red', paper: 'black', bright: true },
    'O': { type: 'wall', tile: 'pipe_v', ink: 'yellow', paper: 'black', bright: true },
    'l': { type: 'wall', tile: 'chain_h', ink: 'yellow', paper: 'black' },
    'H': { type: 'floor', tile: 'chain_h', ink: 'yellow', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'yellow', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'rug', ink: 'yellow', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'rope_ladder', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##...OO.........l.............##',
    '##..OOOO........l.............##',
    '##.OOOOOO.......l.............##',
    '##.OOOOOO.....................##',
    '##.OOOOOO......+..............##',
    '##.OOOOOO.....................##',
    '##............HHHHH...........##',
    '##............................##',
    '##..............+..--\\........##',
    '##....................\\.......##',
    '.......KKKKKKKKKKKK....\\........',
    '.......YYYYYYYYYYYY.....\\.......',
    '....TT.L..........L......\\......',
    '....TT.L..........L.......\\.....',
    '##============================##',
  ],
  guardians: [
    // the metronome ticks up and down on the piano lid, between the stool end and the bell
    { type: 'v', sprite: 'pendulum', ink: 'cyan', x: 12, y: 40, min: 40, max: 72, dy: 1, anim: 'fast' },
    // a bat flits diagonally through the rafters, past the harp's head and the landing
    { type: 'd', sprite: 'bat', ink: 'magenta', x: 136, y: 8, dx: 2, dy: 2, count: 32, anim: 'fast' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// A Landing Strip [12,9] - difficulty 2.
// The grand staircase crosses the room in one straight red flight rising left: it comes up through the floor
// at col 23 from the Great Hall and leaves through the ceiling at cols 8-9 for the Stair Head. The landing floor
// runs under the flight: walking east you are drawn down the stairwell at col 23, so hop over it to reach the
// Trophy Room (walking west from there carries you up the stairs; hop off them to carry on along the floor).
// Halfway up, jump right onto the balustraded gallery where a knight in armour guards the key.
JSW.defineRoom({
  id: 'the_galleried_landing',
  name: 'A Landing Strip',
  region: 'mansion',
  pos: [12, 9],
  border: 'green',
  item: 'key',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'stone_block', ink: 'cyan', paper: 'blue', bright: true },
    '=': { type: 'floor', tile: 'carpet', ink: 'red', paper: 'black', bright: true },
    '-': { type: 'floor', tile: 'girder', ink: 'yellow', paper: 'black', bright: true },
    '\\': { type: 'ramp', tile: 'stairs', ink: 'red', paper: 'black', bright: true },
  },
  map: [
    '########\\...####################',
    '########.\\....................##',
    '##########\\...................##',
    '##.........\\..................##',
    '##..........\\.................##',
    '##...........\\...........+....##',
    '##............\\...............##',
    '##.............\\..............##',
    '##..............\\...----------##',
    '##...............\\............##',
    '##................\\...........##',
    '...................\\............',
    '....................\\...........',
    '.....................\\..........',
    '......................\\.........',
    '##=====================\\======##',
  ],
  guardians: [
    // a knight in armour clanks up and down the gallery; the west end, where you land, stays clear
    { type: 'h', sprite: 'knight', ink: 'white', bright: true, x: 25, y: 48, min: 23, max: 27, dir: 'right' },
    // a ghost drifts up and down under the stairs, over the landing floor
    { type: 'v', sprite: 'ghost', ink: 'cyan', x: 13, y: 64, min: 64, max: 96, dy: 2, anim: 'slow' },
  ],
});

// ---------------------------------------------------------------------------------------------------------
// The Stuffed Shirt Trophy Room [13,9] - difficulty 3.
// A heap of steamer trunks round the gun cabinet makes a stepped pyramid (13, 11, 9, 11, 13) between the landing
// door and the French windows to the Rose Terrace. From the cabinet top, jump up to the picture rails (row 7)
// under the mounted antlers: walking beneath them is safe, jumping beneath them is not. One trophy waits between
// the antlers on each rail. A moth-eaten bat hangs over the cabinet, the cat patrols the tiger rug and the stuffed
// parrot swoops at anyone hopping over the cat.
JSW.defineRoom({
  id: 'the_trophy_room',
  name: 'The Stuffed Shirt Trophy Room',
  region: 'mansion',
  pos: [13, 9],
  border: 'red',
  item: 'trophy',
  tiles: {
    '.': { type: 'air', ink: 'blue', paper: 'black' },
    '#': { type: 'wall', tile: 'wood_panel', ink: 'yellow', paper: 'green' },
    'M': { type: 'wall', tile: 'window', ink: 'white', paper: 'cyan' },
    'p': { type: 'wall', tile: 'wood_panel', ink: 'red', paper: 'black', bright: true },
    '^': { type: 'nasty', tile: 'thorns', ink: 'white', paper: 'black', bright: true },
    'T': { type: 'wall', tile: 'crate', ink: 'yellow', paper: 'red' },
    'U': { type: 'wall', tile: 'rivets', ink: 'white', paper: 'blue' },
    'G': { type: 'wall', tile: 'pipe_v', ink: 'white', paper: 'red', bright: true },
    '-': { type: 'floor', tile: 'shelf', ink: 'white', paper: 'black', bright: true },
    '=': { type: 'floor', tile: 'plank', ink: 'yellow', paper: 'black' },
    'R': { type: 'floor', tile: 'rug', ink: 'yellow', paper: 'black', bright: true },
  },
  map: [
    '################################',
    '##pp...pp........pp...pp...pp.MM',
    '##^^...^^........^^...^^...^^.MM',
    '##^^...^^........^^...^^...^^.MM',
    '##............................MM',
    '##...+...................+....MM',
    '##............................MM',
    '##---------....---------------MM',
    '##............................MM',
    '##.........GGG................MM',
    '##.........GGG................MM',
    '........UUUGGGUUU...............',
    '........UUUGGGUUU...............',
    '.....TTTUUUGGGUUUTTT............',
    '.....TTTUUUGGGUUUTTT............',
    '##==================RRRRRRRRRR##',
  ],
  guardians: [
    // the cat stalks the tiger rug, never quite reaching the French windows
    { type: 'h', sprite: 'cat', ink: 'green', bright: true, x: 23, y: 104, min: 21, max: 26, dir: 'left' },
    // the stuffed parrot swoops low over the rug - it catches cat-hoppers mid-air
    { type: 'd', sprite: 'parrot', ink: 'red', x: 176, y: 64, dx: 2, dy: 1, count: 16, anim: 'slow' },
    // a moth-eaten bat hangs over the gun cabinet, bobbing into the jump to the rails
    { type: 'v', sprite: 'bat', ink: 'magenta', x: 12, y: 16, min: 16, max: 48, dy: 1, anim: 'fast' },
  ],
  special: {
    signs: [{ x: 21, y: 12, text: 'ROSES ->', ink: 'green' }],
  },
});
