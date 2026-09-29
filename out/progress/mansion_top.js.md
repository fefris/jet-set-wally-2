- the_bathroom: done (1 item, 2 guardians: rubber_duck d, bubble v; start + toilet + arrival; SOLVE OK)
- walk_in_wardrobe: done (1 item, 2 guardians: shaver v, moth(bat) v; run line flat; SOLVE OK)
- master_bedroom: done (1 item, 3 guardians: cat h, flying_book d, pendulum v (decor); housekeeper+bed; SOLVE OK)
- the_airing_cupboard: done (1 item, 2 guardians: toilet_roll d, spider v; loft-hatch shaft cols 12-15 top shelf row 4; SOLVE OK)
- top_of_the_stairs: done (1 item, 2 guardians: butler h, ghost d; grand stairs (8,14),(9,15) rise left; loft ladder (14,12)->(26,0) rise right + hatch ledge row 3; SOLVE OK)
- the_spare_room: done (2 items, 2 guardians: clockwork_mouse h, ghost v; dead end, solid junk-pile steps 13/11/9/7 -> wardrobe top 5; SOLVE OK)
- aunt_mauds_boudoir: done (1 item, 3 guardians: candle v, ghost d, poodle(dog) h; stairs (21,14)->(28,7) rise right to high door rows 4-6 floor 7; SOLVE OK)
- nursery: done (1 item, 3 guardians: toy_soldier h, jack_in_box v, balloon d; back-stairs top (3,14),(4,15) rise left; trapdoor drop onto lid row 5; SOLVE OK)

## Summary - src/data/rooms/mansion_top.js (region mansion, top floor, grid row 8)

| room id | items | guardians | notes |
|---|---|---|---|
| nursery | 1 (teddy) | 3: toy_soldier h, jack_in_box v, balloon d | Back-stairs top steps (3,14),(4,15) rise left + stair-head landing; toy-block pyramid rows 13/11/9/7 (jump-safe) -> toy-chest lid row 5 under box-room trapdoor cols 26-27 (row 5 makes the drop truly one-way); teddy on the ceiling mobile (17,4) |
| aunt_mauds_boudoir | 1 (feather) | 3: candle v, ghost d, poodle(dog) h | Stairs (21,14)->(28,7) rise right with solid underside to the high door rows 4-6 / floor 7; item at the mirror (12,11) timed against the candle |
| master_bedroom | 1 (ring) | 3: cat h, flying_book d, pendulum v (decor in clock case) | Mrs Mop housekeeper {12,104}, bed = right conveyor row 14 cols 2-11, bed:true; chest 13 -> tallboy 11 -> tallboy top 9 -> wardrobe top 7 to the high door; run line flat and clear |
| walk_in_wardrobe | 1 (umbrella) | 2: shaver v (rows 2-8, corner), moth(bat) v | Ending run line flat and clear; coats of many colours on two rails; hat boxes 13 -> hat shelf 11 -> item row 9; every jump lands on the hat boxes |
| the_bathroom | 1 (toothbrush) | 2: rubber_duck d (bath rim, west half), bubble v | START [5,104]; toilet {26,104}; arrival {5,104,right}; bath rim 13 -> basin 11 -> item (17,9); run line west door -> toilet clear |
| the_airing_cupboard | 1 (bottle) | 2: toilet_roll d (shelf 10), spider v (over shelf 6) | Bench 14 + full-width slatted shelves 12/10/8/6 with alternating drop gaps inside the cupboard frame (jump-safe); top shelf row 4 cols 12-15 under the loft-hatch shaft |
| top_of_the_stairs | 1 (candle) | 2: butler h (floor 15, cols 15-25), ghost d (under the ladder) | Grand staircase top steps (8,14),(9,15) rise left through the floor; loft ladder (14,12)->(26,0) rise right from a step stool (row 13) + hatch ledge row 3; item above the newel post (7,10) |
| the_spare_room | 2 (spectacles) | 2: clockwork_mouse h, ghost v | Dead end; solid junk pile trunk 13 / suitcase 11 / tea chest 9 / hat box 7 -> wardrobe top 5; items (26,4) walk, (29,2) jump |

Extra checks: back stairs simulated both ways against the real servants_back_stairs; grand staircase and loft ladder simulated both ways against contract-built neighbour rooms; world-mode solver "ending run OK: bed -> toilet in 336 frames".

Final:
- validate: `validated 8 rooms (file src/data/rooms/mansion_top.js)` ... `VALIDATE OK` (3 warnings: open edges toward not-yet-built attic rooms - planned hatch/ladder/trapdoor doors)
- solve: `region (file src/data/rooms/mansion_top.js): states: 39707   rooms reached: 8/8   items reachable: 9/9` ... `SOLVE OK`
