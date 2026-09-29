- canary_corner: 1 item (feather), 4 guardians (canary, ghost_miner, cave_bat, drip); pit-prop climb to hatch cols 22-23
- seam_of_despair: 2 items (gem), 3 guardians (minecart, pickaxe, drill); shaft gap 4-5 + grating 6-7 to grotto
- the_pit_cage: 1 item (battery), 2 guardians + cage lift (lantern, mole); headframe landing row 4 under cellar shaft
- dynamite_depot: 2 items (clock), 3 guardians (miner_bot, 2 dynamite) + 2 flashing fuses; crate steps to east door, ramp cols 27-28
- stalactite_street: 2 items (crystal), 5 guardians (3 stalactites, cave_spider, cave_bat d); dead end, ledges row 11 over acid pool
- glow_worm_grotto: 2 items (bulb), 4 guardians + lift (3 glowworms d, cave_spider); shelf row 4 cols 4-7, lift cols 8-10
- echo_chamber: 1 item (bell), 4 guardians (2 slimes, 2 cave_bats d, mirrored); stalagmite steps 13/11/9
- ee_by_gum_coal_face: 1 item (cup), 3 guardians (crusher, miner_bot, cave_spider); 15-cell ramp from (28,0) to (14,14), caved-in rock beneath
- the_nightmare: 0 items, 8 guardians (butler, knight, shark, alien_walker, lawnmower, penny_farthing, ghost, bat); ending, nightmare {x:15,y:104}

## Summary (src/data/rooms/mines_ending.js)
room id | items | guardians | note
canary_corner | 1 | 4 | caged canary (bird v), ghost_miner, cave_bat, drip; pit-prop zig-zag to prop ledge row 3 under hatch cols 22-23 (WAY OUT); feather on the cage roof
seam_of_despair | 2 | 3 | minecart on rails, pickaxe, drill; MIND THE GAP at shaft gap 4-5, grating 6-7; items above rails and over the coal ledges
the_pit_cage | 1 | 2 + lift | cage lift cols 12-14 floor<->headframe landing row 4 (cols 15-23) under cellar shaft 16-19; one-way east brackets down; lantern, mole; MAX LOAD 1 WALLY
dynamite_depot | 2 | 3 | TNT crate steps 13/11/9/11 to high east door (floor 11), 2 flashing fuses, miner_bot, 2 hopping dynamite; plank ramp (27,15)/(28,14)/(29,13) + landing; NO SMOKING
stalactite_street | 2 | 5 | dead end: 6 ledges row 11 on stems over flashing acid pool; 3 fast stalactites, cave_spider, swooping cave_bat
glow_worm_grotto | 2 | 4 + lift | green star-speckled cavern; lift cols 8-10 to shelf row 4 (cols 4-7); 3 glowworms crawling ledges 13/11/9, cave_spider
echo_chamber | 1 | 4 | mirrored dome: slime pair, crossing cave_bat pair, HELLO?/?OLLEH signs; stalagmite steps 13/11/9, bell on tip
ee_by_gum_coal_face | 1 | 3 | one 15-cell flight (28,0)->(14,14) over caved-in winze rock; crusher over coal truck, miner_bot, cave_spider; LUXURY!
the_nightmare | 0 | 8 | ending room, region 'ending', no pos, nightmare {x:15,y:104}; guardians from every region on ledges, paths clear of cols 14-17 below row 8

validate --file: validated 9 rooms - VALIDATE OK (0 warnings)
solve --file: states: 239997  rooms reached: 8/9 (nightmare exempt)  items reachable: 12/12 - SOLVE OK
Full-world solve: no errors naming these rooms (86/88 rooms, 112/114 items world-wide).
Note for other author: full-world validate reports drip_drip_drip|stalactite_street "gap drops onto a wall" because
drip_drip_drip's row 15 puddle nasties count as gaps over the planned SEALED edge; stalactite_street row 0 is wall per contract.
