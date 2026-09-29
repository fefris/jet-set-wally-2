- tangled_roots | 2 items | 4 guardians (mole, slime, 2 worms) | root maze; burrow ledge row 4, secret shaft to cellars cols 8-11 | validate+solve OK
- conker_tree_base_camp | 1 item | 3 guardians (squirrel, 2 conkers) | tent+campfire, knuckles to carved trunk steps (stairs up cols 15-16), burrow cols 20-23 | validate+solve OK
- heart_of_conker | 2 items | 3 guardians + vine rope (owl, 2 woodworms) | switchback carved steps in hollow trunk, vine x=16 to the Fork, knot shelf row 4, east knots descend to drop-back gap | validate+solve OK
- the_great_fork | 1 item | 4 guardians (2 caterpillars, 2 bees) | zigzag knots across both boughs to knot ledge row 3 / climb cols 12-13; vine arrival cols 15-16, drop-back 17-18 | validate+solve OK
- squirrels_larder | 2 items | 4 guardians (squirrel, 2 rooks d, bee) | bough thins to twigs over bramble; stash at the tip | validate+solve OK
- owls_branch_office | 2 items | 3 guardians (owl d, caterpillar, bee) | bough + hollow office (desk, filing cabinet, in-tray); rookery drop onto twig platform row 4 | validate+solve OK
- the_leafy_canopy | 1 item | 4 guardians + creeper rope (bee v, 3 butterflies) | leaf floors zigzag up round a bee lane to the creeper x=11; catch leaf row 4 cols 6-9 | validate+solve OK
- the_rookery | 1 item | 4 guardians (squirrel, 3 rooks d) | nest chain 13-11-10-8-6-4 to the highest nest, drop gap cols 20-21 with DOWN -> sign | validate+solve OK
- crows_eye_view | 2 items | 5 guardians (2 wind arrows, hawk d, crow d, bee) | tiny twig perches over thorny tips, feathers at row 3; drop-back gap cols 8-9 | validate+solve OK (fixed base camp landing trap: col 30 opened rows 9-10)

## Summary - src/data/rooms/grounds_tree.js (9 rooms, 14 items, region 'grounds')
room id | items | guardians | note
crows_eye_view | 2 | 5 (2 wind arrows, hawk d, crow d, bee v) | diff 5: 2-wide twig perches every 2 rows over thorny tips; feathers at row 3; creeper arrival cols 10-11, drop-back gap 8-9
the_leafy_canopy | 1 | 4 + creeper rope x=11 (bee v, 3 butterflies) | leaf floors zigzag round a bee lane to the creeper; catch leaf row 4 cols 6-9; climb arrival cols 12-13; east door floor 15
the_rookery | 1 | 4 (squirrel h, 3 rooks d) | nest chain 13-11-10-8-6 to the highest nest (row 4, spoon); drop gap cols 20-21 signed DOWN ->
squirrels_larder | 2 | 4 (squirrel h, 2 rooks d, bee v) | dead end: bough thins to twigs over a bramble patch; cherries at the tip and in the leaves above it
the_great_fork | 1 | 4 (2 caterpillars v, bee d, bee v) | knots zigzag across both boughs to the knot ledge row 3 under the leaf hole (one-way climb); vine arrival 15-16, drop-back 17-18
owls_branch_office | 2 | 3 (owl d, caterpillar v, bee v) | bough + hollow office (desk, filing cabinet, in-tray); rookery drop onto twig platform row 4 -> twig row 8 -> bough row 9; twig-tip letter
heart_of_conker | 2 | 3 + vine rope x=16 (owl v, 2 woodworms v) | switchback carved steps in the hollow trunk (stairs from Base Camp at cols 15-16), leap to the vine; knot shelf row 4; east knots descend to the drop-back gap
conker_tree_base_camp | 1 | 3 (squirrel h, 2 conkers v) | walk-over pup tent, campfire, burrow shaft cols 20-23; knuckle/landing up to carved steps rising left through the trunk (cols 15-16)
tangled_roots | 2 | 4 (mole h, slime h, 2 worms v) | root maze; burrow ledge row 4 cols 20-23; secret shaft to the cellars cols 8-11 matches under_the_conker_roots

validate: "validated 9 rooms (file src/data/rooms/grounds_tree.js)" - VALIDATE OK (2 warnings: base camp left/right doors lead to unbuilt village green / riverbank)
solve: "states: 400345   rooms reached: 9/9   items reachable: 14/14" - SOLVE OK
