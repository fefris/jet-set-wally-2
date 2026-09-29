- the_rose_terrace: done (1 item flower, 3 guardians: 2 bees d, snail h; trellis 13/11/9 with climbing rose on top, rose bushes on the paving, bench over the stairwell, terrace steps (25,15)/(26,14) up to the east door landing r12; SOLVE OK)
- gatehouse_battlements: done (1 item bell, 3 guardians: toy_soldier h, owl v, pigeon d; murder-hole trapdoor r15 cols 4-7, flight rising west to door r12, merlons, pennant r10 by the flagpole; SOLVE OK)
- the_gravel_drive: done (1 item spanner, 3 guardians: lawnmower h, gardener h, butterfly v; Rolls boot13/roof11/bonnet13, landing r9 + terrace steps (18,8)-(26,0), ha-ha gap 18-19; SOLVE OK)
- the_gatehouse: done (1 item key, 2 guardians: dog h, spider v; hut ledges 13..3 to the murder hole cols 4-7, stepped arch to the keystone; SOLVE OK)
- the_village_green: done (1 item trophy, 3 guardians: beach_ball h, dog h, butterfly v; pond cols 12-19 crossed via scoreboard beams 13/11/9 + 13, item r7; east edge hedge matches conker camp; SOLVE OK)
- the_riverbank: done (1 item feather, 3 guardians: frog h, heron bird d, leaf v; willow roots 13/11 -> branch 9, well arrival 14-15 + mouth 16-17, reeds, grassy ramp to the abutment floor 14; west hedge matches conker camp; SOLVE OK)
- humpback_bridge: done (1 item umbrella, 3 guardians: penny_farthing h, seagull d, balloon v; stone ramps 14->9, deck walls with plank gap 12-13, hollow ledges 11/13, towpath 14-15 + drop 16-17; SOLVE OK)
- the_far_bank: done (1 item carrot, 3 guardians: hedgehog h, watering_can v, bee d; butt 13 -> eaves 11 -> shed roof 9, scarecrow blocks the roof end, walk-through shed, nettles; row 15 sealed; SOLVE OK)
- open_all_hours: done (1 item cherry, 2 guardians: spring v (till), trolley h; pier stairs (9,15),(8,14)..(5,11) rising left to the stockroom shelf r11 cols 3-4, counter 13, sweet shelves 11/9/7, item r5; SOLVE OK)
- ha_ha_the_sunken_garden: done (1 item ring, 3 guardians: 2 gnomes v, hedgehog h; hedge r4 under the drop 18-19 with topiary stop, steps 8/11 down, fountain rim/water/plinth r14, row 15 solid; SOLVE OK)
- under_the_bridge: done (2 items coin, 7 guardians + rope: 3 lifts (cycles divide the rope's 90 frames - a lift under the rope blew up the solver, so the mooring stone there is static), 2 fish v, trolley h, gull d; rope x=15, drop ledge r4 16-19, steps 7/10, towpath r13 to the east door; SOLVE OK)

## Summary (grounds_village.js - 11 rooms, 12 items)
room id | items | guardians | note
the_rose_terrace | 1 flower | 3 (2 bee d, snail h) | trellis 13/11/9 past a climbing rose; bench over the stairwell onto the terrace steps (stairs cols 25-26 rise right) to the battlements door r12
gatehouse_battlements | 1 bell | 3 (toy_soldier h, owl v, pigeon d) | murder-hole trapdoor r15 cols 4-7 (one-way), flight up west to door r12, merlon hops, pennant at half mast r10
the_gravel_drive | 1 spanner | 3 (lawnmower h, gardener h, butterfly v) | Rolls boot13/roof11/bonnet13, landing r9 + terrace steps out of the ceiling, ha-ha gap 18-19 (one-way drop)
the_gatehouse | 1 key | 2 (dog h, spider v) | hut ledges every 2 rows to the r3 lookout under the murder hole; stepped arch to the keystone
the_village_green | 1 trophy | 3 (beach_ball h, dog h, butterfly v) | 8-wide duck pond crossed on the scoreboard beams 13/11/9; east hedge edge matches conker camp
the_riverbank | 1 feather | 3 (frog h, heron bird d, caterpillar v) | willow roots 13/11 -> branch 9; well rope arrival 14-15 + mouth 16-17 as planned; reeds; grassy step to floor 14
humpback_bridge | 1 umbrella | 3 (penny_farthing h, seagull d, balloon v) | stone ramps 14->9, plank gap 12-13 into the arch hollow (ledges 11/13), towpath 14-15, drop 16-17
the_far_bank | 1 carrot | 3 (hedgehog h, watering_can v, bee d) | water butt 13 -> eaves 11 -> shed roof 9; scarecrow stops the roof end; walk-through shed; floor sealed
open_all_hours | 1 cherry | 2 (spring v, trolley h) | pier stairs (9,15),(8,14).. rising left to stockroom shelf r11; counter 13; sweet shelves 11/9/7
ha_ha_the_sunken_garden | 1 ring | 3 (2 gnome v, hedgehog h) | drop onto hedge r4 (topiary stop), steps 8/11, fountain jump rim->plinth; exit west to the Coal Hole; floor sealed
under_the_bridge | 2 coin | 7 + rope (3 lifts, 2 fish v, trolley h, gull d) | drop ledge r4 by the rope x=15, steps 7/10 to towpath r13/east door; lifts on cycles dividing the rope's 90 frames (a lift under the rope made the solver explode, so the mooring stone there is static)

validate: validated 11 rooms (file src/data/rooms/grounds_village.js) - VALIDATE OK (8 warnings: open sky tops with no up neighbour; right edges of open_all_hours / under_the_bridge wait for unbuilt coast rooms)
solve: states: 253578   rooms reached: 11/11   items reachable: 12/12   (32.0s) - SOLVE OK
