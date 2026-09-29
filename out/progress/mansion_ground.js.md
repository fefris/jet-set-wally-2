- the_back_hall: done (1 item umbrella, 3 guardians: vacuum h, spider v, bat v; back stairs + boot-room stairs; SOLVE OK)
- the_conservatory: done (1 item flower, 3 guardians: flytrap v, butterfly d, bee v; glass roof, pot crossing, basket zig-zag; SOLVE OK)
- the_dining_room: done (2 items spoon, 3 guardians: penguin h, champagne v, plate d; table + chandelier; SOLVE OK)
- the_servery: done (1 item bell, lift + 2 guardians: teapot d, plate v; dumbwaiter lift floor15<->shelf row4 under billiard hatch, floor hatch to kitchen; SOLVE OK)
- gentlemens_smoking_room: done (1 item pipe, 3 guardians: butler h, 2 bubble v; armchairs, sideboard, mantel; SOLVE OK)
- the_cloakroom: done (1 item spectacles, 2 guardians: roller_skate h, bat v; servants' stair-head through the floor, dagger rack; SOLVE OK)
- the_great_hall: done (1 item clock, 2 guardians: knight h, ghost v; grand staircase switchback via gallery + half-landing + dais; SOLVE OK)
- the_front_porch: done (1 item bottle, 2 guardians: cat h, bird h; milk-crate steps, doorstep, sign THE GROUNDS ->; SOLVE OK)

## Summary - src/data/rooms/mansion_ground.js (region mansion, ground floor, grid row 10)

| room id | items | guardians | notes |
|---|---|---|---|
| the_back_hall | 1 (umbrella) | vacuum h, spider v, bat v | back stairs from Back Stairs Gossip: one long flight (8,12)-(22,0) with a half-landing at row 3 over the boot bench; boot-room flight through the floor in the west corner ((4,13),(5,14),(6,15)); item route boot bench -> hat shelf -> hat peg; west edge solid |
| the_conservatory | 1 (flower) | flytrap v, butterfly d, bee v | glass roof/walls, big pot to hop in mid-floor, hanging baskets zig-zag rows 13/11/9/7 to the top-basket bloom; sealed up/down |
| the_dining_room | 2 (spoon) | penguin waiter h, champagne v, plate d | banquet table row 11 (open underneath), chairs row 13, chandelier row 9 between two candle flames; items on the table end and the chandelier |
| the_servery | 1 (bell) | dumbwaiter lift (cols 23-25, floor 15 <-> row 4), teapot d, plate v | shaft up: rows 0-1 open cols 26-29 over the serving shelf (row 4); shaft down: gap cols 18-19 + grating cols 20-21; counter with hot plate blocks the west end; sign RING FOR SERVICE |
| gentlemens_smoking_room | 1 (pipe) | butler h, 2 smoke-ring bubbles v | hazy "fug" background, two leather armchairs to hop, sideboard row 11 -> mantelpiece row 9 under a portrait |
| the_cloakroom | 1 (spectacles) | roller skate h, bat v | servants' stair-head (25,15),(26,14) in the east: walking west over it goes down to the Servants' Hall (hop it to continue west); bench/shelf/hat rack with daggers underneath |
| the_great_hall | 1 (clock) | knight h, ghost v | difficulty 1; grand staircase (22,0)-(26,4) onto the minstrels' gallery (row 5, catches drop-ins), step down to the half-landing (row 7), lower flight to the dais (row 13); floor-15 walk west door -> porch passes under it; mantel item via log basket |
| the_front_porch | 1 (bottle) | cat h, blue tit (bird) h | difficulty 1; tall doorways rows 10-14 both sides, pilasters + roof, milk-crate steps rows 13/11, boot-scraper doorstep at the front door, sign THE GROUNDS -> |

Final checks:
- `node tools/validate.js --file src/data/rooms/mansion_ground.js` -> validated 8 rooms, VALIDATE OK (2 warnings only: servery down edge / porch right edge open towards the not-yet-built Kitchen and Gravel Drive, as planned)
- `node tools/solve.js --file src/data/rooms/mansion_ground.js` -> states: 125454, rooms reached: 8/8, items reachable: 9/9, SOLVE OK
- `node tools/solve.js --region mansion` (with top + first floors built) -> rooms reached: 24/24, items reachable: 31/31, SOLVE OK
