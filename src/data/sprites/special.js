// Special sprites: Wally (our hero), Mrs Mop the housekeeper, and the props used by the
// ending / game-over sequences. All original designs.

// Wally: slouchy woolly bobble hat (the pompom wobbles back/forward as he walks), an eye under the
// hat rim, a big round nose over a little mouth, a scarf whose loose end flicks level/up/level/down
// behind him, and chunky boots (contact / passing / contact / passing walk).
// Horizontal mover: faces RIGHT, art in columns 0-9, feet on row 15. Frame 0 doubles as the lives icon.
JSW.defineSprite('wally', {
  mover: 'h',
  theme: 'hero',
  desc: 'Wally in his bobble hat and long scarf, striding right; scarf end flicks up and down behind',
  frames: [
    [
      '.....##.........',
      '....####........',
      '.....##.........',
      '..#####.........',
      '.#######........',
      '.########.......',
      '..###.#.........',
      '..#######.......',
      '..########......',
      '..####.##.......',
      '########........',
      '##.####.........',
      '..######........',
      '..##..##........',
      '.###..###.......',
      '.####.####......'
    ],
    [
      '....##..........',
      '...####.........',
      '....##..........',
      '..#####.........',
      '.#######........',
      '.########.......',
      '..###.#.........',
      '..#######.......',
      '..########......',
      '#.####.##.......',
      '########........',
      '...####.........',
      '..######........',
      '..#####.........',
      '.##..##.........',
      '....####........'
    ],
    [
      '.....##.........',
      '....####........',
      '.....##.........',
      '..#####.........',
      '.#######........',
      '.########.......',
      '..###.#.........',
      '..#######.......',
      '..########......',
      '..####.##.......',
      '########........',
      '##.####.........',
      '..######........',
      '..##..##........',
      '.###..###.......',
      '.####.####......'
    ],
    [
      '......##........',
      '.....####.......',
      '.....##.........',
      '..#####.........',
      '.#######........',
      '.########.......',
      '..###.#.........',
      '..#######.......',
      '..########......',
      '..####.##.......',
      '.#######........',
      '##.####.........',
      '#.######........',
      '..#####.........',
      '.##..##.........',
      '....####........'
    ]
  ]
});

// Mrs Mop, the stern housekeeper who guards the bedroom. Hair in a bun on the back of her head,
// pointed nose, apron (bow tied at the back, hem split from the skirt), sturdy shoes; faces LEFT.
// Frame 0: arms folded. Frame 1: wagging a raised finger, other hand on her hip.
JSW.defineSprite('housekeeper', {
  mover: 'v',
  theme: 'special',
  desc: 'Mrs Mop the housekeeper: hair bun, apron, sturdy shoes; arms folded, then wagging a finger',
  frames: [
    [
      '...........##...',
      '.......###.###..',
      '......#######...',
      '.....########...',
      '.....#.######...',
      '....#######.....',
      '......#####.....',
      '......####......',
      '.......##.......',
      '.....######.....',
      '...#########....',
      '...#########.#..',
      '.....######.##..',
      '...##########...',
      '..#####.######..',
      '...####..####...'
    ],
    [
      '...........##...',
      '.#.....###.###..',
      '.#....#######...',
      '.#...########...',
      '###..#.######...',
      '###.#######.....',
      '.##...#####.....',
      '..##..####......',
      '...##..##.......',
      '....########....',
      '.....######.#...',
      '.....######..#..',
      '.....########...',
      '...##########...',
      '..#####.######..',
      '...####..####...'
    ]
  ]
});

// Toilet seen from the side (facing left): cistern with flush lever, seat and bowl on a pedestal.
// Frame 0: lid down. Frame 1: lid raised against the cistern.
JSW.defineSprite('toilet', {
  mover: 'v',
  theme: 'special',
  desc: 'side-on toilet with cistern; lid down, then lid up',
  frames: [
    [
      '................',
      '..........######',
      '...........####.',
      '.........######.',
      '...........####.',
      '...........####.',
      '...........####.',
      '..#########.##..',
      '.############...',
      '.############...',
      '..###########...',
      '....#########...',
      '.....#######....',
      '......#####.....',
      '......#####.....',
      '.....#######....'
    ],
    [
      '................',
      '..........######',
      '.........#.####.',
      '........##.####.',
      '........##.####.',
      '........##.####.',
      '........##.####.',
      '........##..##..',
      '.############...',
      '.############...',
      '..###########...',
      '....#########...',
      '.....#######....',
      '......#####.....',
      '......#####.....',
      '.....#######....'
    ]
  ]
});

// Blacksmith's anvil for the game-over drop: lifting ring on top (cols 6-9, where the engine's chain
// at cols 7-8 meets it), tapered horn to the left, square heel, waisted body, split foot on row 15.
JSW.defineSprite('anvil', {
  mover: 'v',
  theme: 'special',
  desc: 'heavy blacksmith anvil with lifting ring for the chain (game-over sequence)',
  frames: [
    [
      '......####......',
      '......#..#......',
      '......####......',
      '.......##.......',
      '...#############',
      '################',
      '...#############',
      '......#########.',
      '........######..',
      '........#####...',
      '........#####...',
      '.......#######..',
      '......#########.',
      '.....##########.',
      '.....####..####.',
      '....#####..#####'
    ]
  ]
});

// Stone plinth for the game-over sequence: flat 2-row top slab (Wally stands on row 0), a column
// with two flutes, stepped base.
JSW.defineSprite('plinth', {
  mover: 'v',
  theme: 'special',
  desc: 'fluted stone pedestal with slab top and stepped base (game-over sequence)',
  frames: [
    [
      '################',
      '################',
      '.##############.',
      '...##########...',
      '...###.##.###...',
      '...###.##.###...',
      '...###.##.###...',
      '...###.##.###...',
      '...###.##.###...',
      '...###.##.###...',
      '...###.##.###...',
      '...##########...',
      '..############..',
      '.##############.',
      '################',
      '################'
    ]
  ]
});

// Wally tucked up in bed for the ending, propped up and fast asleep: same bobble-hat profile as the
// walking sprite but with the eye closed to a slit, blanket to his chin (knees make a bump), line-drawn
// bed with head post and footboard. A small 'z' by his nose (frame 0) becomes a big 'Z' higher up (frame 1).
JSW.defineSprite('wally_sleep', {
  mover: 'v',
  theme: 'hero',
  desc: 'Wally asleep, tucked up in bed in his bobble hat; z / Z floating up',
  frames: [
    [
      '....##..........',
      '...####.........',
      '....##..........',
      '..#####.........',
      '.#######........',
      '.########..####.',
      '..##..#.......#.',
      '..#######....#..',
      '..########..####',
      '..####.##.......',
      '#..######.###.##',
      '################',
      '#..............#',
      '################',
      '##............##',
      '##............##'
    ],
    [
      '....##.....#####',
      '...####.......#.',
      '....##.......#..',
      '..#####.....#...',
      '.#######...#####',
      '.########.......',
      '..##..#.........',
      '..#######.......',
      '..########......',
      '..####.##.......',
      '#..######.###.##',
      '################',
      '#..............#',
      '################',
      '##............##',
      '##............##'
    ]
  ]
});
