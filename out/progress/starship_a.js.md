# starship_a.js - summary (region starship, decks A/B)
room id | items | guardians | note
captains_log_cabin | 1 (book) | 3 | timber cabin in the hull; log pile 13/11/9 to the moose head, dead end east hatch
where_no_wally | 1 (spectacles) | 4 | star-chart room, cartography wall map, chart tables 13/11/9
turbo_lift_a | 1 (battery) | 3 | top of the grav tube: drop gap cols 14-15, one-way grating 16-17; battery mid-leap over the gap
the_captains_chair | 1 (cup) | 4 | bridge: step 13 / dais 11 / chair seat, consoles 9, alien glaring off the viewscreen
red_shirt_lockers | 1 (sock) | 3 | low road under the lockers vs high road over booby-trapped locker tops (fixed an old soft-lock)
no_place_like_home | 1 (gem = ruby slippers) | 4 | teleport pad cols 18-21 -> the_bathroom (portal x19 y14 w2), HOME signs, rainbow, Toto, tin man
the_brig | 1 (spanner) | 5 | three cells behind force fields (pulsing beams under flashing emitter bars), alien prisoner, robot guard
say_aaah_sickbay | 1 (key) | 3 | biobeds 13/11, instrument shelf 9, medicine cabinet 7; skeleton, hypospray drone, medibot, eye chart
for_mash_get_smash | 1 (spoon) | 4 | mess: table 13 -> right belt 11 -> shelf 9 -> dispenser top 7; mash blob drips, chuckling Martians
turbo_lift_b | 1 (bottle) | 4 (lift + 3) | Deck B lift cols 10-12 to platform row 4 under the A shaft; C shaft gap 20-21 + grating 22-23

validated 10 rooms (file src/data/rooms/starship_a.js) - VALIDATE OK (no errors, no warnings)
region (file src/data/rooms/starship_a.js): states: 123278   rooms reached: 10/10   items reachable: 10/10 - SOLVE OK
Notes: the Deck B rooms use a floor-type row 15, matching hydroponic_spud_farm's deck at the turbo_lift_b edge. The turbo_lift_b lift uses
start 15 / dir 'down' so its cycle repeats for the solver.
