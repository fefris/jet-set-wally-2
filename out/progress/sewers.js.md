- round_the_u_bend: done (1 item, 3 guardians) - VALIDATE OK / SOLVE OK standalone
- the_spanish_drain: done (1 item, 3 guardians) - VALIDATE OK / SOLVE OK standalone
- flotsam_junction: done (2 items, 4 guardians) - VALIDATE OK / SOLVE OK standalone
- the_rat_kings_throne: done (2 items, 4 guardians); flotsam reworked (static crates so solver can go east) - VALIDATE OK / SOLVE OK (4 rooms)
- fatberg_alley (Gravy Train Tunnel): done (1 item, 4 guardians) - VALIDATE OK / SOLVE OK (5 rooms; coast.js load error is another author's)
- the_gunge_tank: done (1 item, 3 guardians + chain rope) - VALIDATE OK / SOLVE OK (6 rooms)
- the_outfall: done (0 items, 3 guardians, outfall portal -> the_beach) - VALIDATE OK / SOLVE OK (7 rooms, 8/8 items)

## SUMMARY - src/data/rooms/sewers.js (region 'sewers', 7 rooms, 8 items)
room id | items | guardians | note
round_the_u_bend | 1 | 3 (duck, drip, bubble) | drain arrival on pipe ledge row 4 (special.arrival 1,16); V-shaped U-bend, ramps both arms; ring hangs over the plughole (cols 14-15), which drops one-way into the Spanish Drain; sign THIS WAY OUT (EVENTUALLY)
the_spanish_drain | 1 | 3 (slime, 2 rats) | red/yellow vault; west-running currents on rows 5/9/13 cascade down to floor 15; slime and doubloon on the row-9 current; rats on the floor between the doors
flotsam_junction | 2 | 4 (trolley, duck, cave_bat, bubble) | heading east against the current: crates -> lower current -> fridge -> upper current -> landing; slimy ramp (stairs, cols 21-22) down to the Rat King; teddies on the junk
the_rat_kings_throne | 2 | 4 (Rat King, courtier rat, drip, spider) | dead end: ramp in from the ceiling, bottle-top steps down the west wall, Rat King on the floor, dais -> armrest -> pole -> canopy with the crowns; every way back is <=2-row steps
fatberg_alley | 1 | 4 (2 slimes, blob, drip) | "Gravy Train Tunnel": greasy conveyor ledges (squash/fling/squash) up the fatberg's east face, spoon above the summit mound, lumpy steps down the west side
the_gunge_tank | 1 | 3 + chain rope (2 bubbles, slime) | rims -> rung (row 13) -> gantry (row 11); swing across the 6-cell gantry break on the chain; key over the east gantry
the_outfall | 0 | 3 (crab, 2 drips) | a breather room: the last current carries you to the outfall grate (cols 4-6), portal {x:5,y:14,w:2,kind:'outfall',to:'the_beach'}; signs BEACH + flashing VVV
validate: "validated 7 rooms (file src/data/rooms/sewers.js) ... VALIDATE OK" (0 warnings, 0 errors)
solve:    "states: 95091  rooms reached: 7/7  items reachable: 8/8 ... SOLVE OK"
Note: the solver does not branch on the landing frame, so after landing on a current it gets turned round. The eastbound routes therefore never ask you to land on a current and then walk against it; you walk onto the currents from static junk instead.
