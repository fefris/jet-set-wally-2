# coast.js - progress / summary (region 'coast', src/data/rooms/coast.js)

- the_beach: done (1 item, 3 guardians) - validate OK, solve OK
- kiss_me_quick_pier: done (1 item, 3 guardians + arrow) - validate OK, solve OK
- yacht_poop_deck: done (1 item, 3 guardians) - validate OK, solve OK
- yacht_sharp_end: done (2 items, 3 guardians + arrow, yacht portal) - validate OK, solve OK
- lighthouse_keepers_lunch: done (2 items, 4 guardians, lamp flagFlash) - validate OK, solve OK
- shark_infested_shallows: done (1 item, 3 guardians) - validate OK, solve OK
- desert_island_discs: done (2 items, 3 guardians, arrival + teleport pad) - validate OK, solve OK

## Summary
room id | items | guardians | note
the_beach | 1 | 3 (beach ball, crab, gull) | Outfall arrival on the dune (6,24) slides down a ramp to the cliff-foot ledge, which runs onto the stepped sandcastle; the shell is over the towers; the towpath comes in under the red cliff.
kiss_me_quick_pier | 1 | 4 (unicycle clown, 2 gulls, flying-fish arrow row 10) | Promenade steps ((8,0),(9,1)... down to the landing at row 10) run parallel to the helter-skelter slide (heart on the tower roof); a booth and awning lead up from the boards; a gangplank ramp leads to the yacht.
yacht_poop_deck | 1 | 3 (lifebuoy, champagne cork, sailor) | Shin up the flagstaff for the bottle, walk out along the ensign onto the flybridge; deckchairs, cabin roof and locker take you over the cabin.
yacht_sharp_end | 2 | 4 (seal, parrot, anchor, flying-fish arrow row 2) | Zig-zag ratlines up to the crow's nest, a raked foredeck ramp up to the bowsprit; yacht portal at the wheel (6,13) with flag 'trip' + requiresRooms; the furled sail flashes and NOT YET turns into ALL ABOARD.
lighthouse_keepers_lunch | 2 | 4 (2 gulls, crab, teapot) | A stair flight to the first landing, then a second flight to the lamp room (turn back at its foot); a gallery window; the east end drops down to the lunch tin; the lamp flashes on 'trip' (flagFlash 15,1 5x2).
shark_infested_shallows | 1 | 3 (shark, jellyfish, gull) | Rock stepping stones (tops 13/12/11/10) over the waves to the pearl rock; dead end back to the island.
desert_island_discs | 2 | 3 (crab, parrot, starfish) | Yacht arrival (20,104) under a leaning palm (ramp trunk to the fronds); gramophone with a horn; the escape-pod pad (4..7, floor 15, flashing) teleports to molecule_shuffler; you reach the shallows by climbing over the pod roof, so it can't be boarded by accident.

Final checks:
- validate --file src/data/rooms/coast.js: VALIDATE OK (1 warning: portal target molecule_shuffler not built yet)
- solve --file src/data/rooms/coast.js: rooms reached 7/7, items reachable 10/10 - SOLVE OK
