- hydroponic_spud_farm: done (1 item, 4 guardians) validate+solve OK
- robo_kennels: done (1 item, 3 guardians) validate+solve OK
- molecule_shuffler: done (2 items, 3 guardians, arrival+HOME/ZARG portals) validate+solve OK
- space_laundrette: done (1 item, 4 guardians) validate+solve OK
- torpedo_bay: done (2 items, 4 guardians incl. 2 arrows) validate+solve OK
- hold_everything: done (1 item teddy, 3 guardians) validate+solve OK
- turbo_lift_c: done (1 item bell, 3 guardians + lift; lift must start dir 'down' at bottom or the solver's phase cycle never repeats) validate+solve OK
- rocket_park: done (1 item coin, 3 guardians, arrival on pad) validate+solve OK
- she_cannae_take_it: done (2 items spanner, 4 guardians: 3 crushers + droid; hatch climb cols 6-7) validate+solve OK
- the_warp_core: done (2 items crystal, 4 guardians: 2 beams, comet, alien) validate+solve OK

## Summary (src/data/rooms/starship_b.js, 10 rooms, 14 items)
room id | items | guardians | note
hydroponic_spud_farm | 1 carrot | 4 | zig-zag hydroponic trays, slugs + blob + sprinkler drip
robo_kennels | 1 bone | 3 | robo-dogs on deck & gantry, hatch grating (cols 6-7) from the engine room
molecule_shuffler | 2 chip | 3 | ARRIVALS pad arrival; HOME pad -> the_bathroom, departures dais -> welcome_to_zarg (signs HOME / PLANET ZARG)
space_laundrette | 1 sock | 4 | washers, ironing boards, lost-sock basket; dead end east
torpedo_bay | 2 rocket | 4 (2 arrows) | torpedoes fired through the tubes on rows 8/12; dead end west
hold_everything | 1 teddy | 3 | pallets, mezzanine, loader belt (row 11 right) to a stepped crate mountain
turbo_lift_c | 1 bell | 3 + lift | Deck C lift (cols 16-18, rows 4-15) to the platform under the Deck B shaft (cols 20-23)
rocket_park | 1 coin | 3 | rocket pad arrival (floor 15, cols 12-19), zig-zag gantry, clamped parked rocket, ticket machine
she_cannae_take_it | 2 spanner | 4 | crushers pound between catwalks 13/11/9/7/5; hatch ledge row 3 climbs to robo_kennels
the_warp_core | 2 crystal | 4 | flashing core in a glass sleeve; spiral up the east (2-row hops), drop down the west

Note: a lift that starts at its bottom row must have dir:'down' there, or its phase cycle never repeats (solver P=1990 blow-up).
Final: VALIDATE OK (1 warning: welcome_to_zarg does not exist yet) | SOLVE OK - states 136814, rooms 10/10, items 14/14
