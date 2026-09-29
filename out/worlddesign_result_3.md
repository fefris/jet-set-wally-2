## Scores

All three designs pass `node tools/check-plan.js` with PLAN OK:

| | Doors | Sealed pairs | Links | Rooms | Items (required) |
|---|---|---|---|---|---|
| A | 144 | 51 | 8 | 134 | 175 (150) |
| B | 141 | 51 | 8 | 134 | 175 (150) |
| C | 143 | 49 | 8 | 134 | 175 (150) |

My own measurements over the door and link graph:

| Metric | A | B | C |
|---|---|---|---|
| Correlation of distance from start with difficulty | **0.73** | 0.61 | 0.68 |
| Rooms at difficulty 5 | 6 | 3 | 9 |
| Dead-end rooms (one door) | 21 | 33 | 31 |
| Local one-way drops and climbs | 12 | 9 | 11 |
| Rooms using arrows | **0** | **0** | 14 |
| Rooms using flashing nasties | 4 | 3 | 15 |
| Rooms using lifts | 4 | 8 | 11 |
| Rooms using diagonal guardians | 19 | 9 | 33 |
| Rooms holding exactly 1 item | 93 | 79 | 92 |
| Most items in one room | 3 | 3 | 3 |

- **A: 8/10.** It feels the most like JSW II.
  - **Names:** almost every name is a British-80s pun, including the hub: `haydn_seek`, `cistern_chapel`, `das_boot_room`, `parapet_shop_boys`, `going_down_haberdashery`, `blob_save_the_queen`, `porridge_in_orbit`. Only 3 mansion names are plain.
  - **Pacing:** the opening loop is designed as a teaching sequence. It runs `the_bathroom` → `dressed_to_kill` → `landing_on_your_feet` → `master_bedroom` (Mrs Mop and the goal) → back stairs → `neither_up_nor_down` → stairs back up. Within 4 steps of the start there are 13 rooms with 17 items, 10 of them at difficulty 1-2.
  - **Teleports:** `please_mind_your_molecules` is one transporter room with three pads (to the planet, home, and arrivals). That is the closest match to how JSW II's teleport room worked.
  - **Ending:** the forced run crosses two rooms (`landing_on_your_feet`, `dressed_to_kill`), like the original's run of several rooms.
  - **Trip switch:** it sits in a small puzzle pocket. An ice wall in `cold_comfort_cellar` cuts it off. You get in by the climb `hello_hello_hello`→`everything_but_the_kitchen_sink` or the drop `boiling_point`→`everything_but_the_kitchen_sink`, and out by the climb `tunnel_vision`→`allotment_of_trouble`.
  - **Roof:** it is a one-way loop, in by the climb `loft_conversion`→`tiles_and_tribulations` and out by the drop `flash_harry`→`signal_failure`.
  - **Well:** the names "Well I Never / Well Hard / All's Well…" nod to the original's "well, well, well" joke.
  - **Weaknesses:** the room mechanics are thin, and items are spread flat across rooms.
- **B: 7/10.** Best geography and a charming house, but the challenge curve is flat and it uses few mechanics.
  - **Giant tree:** it grows against the house, with window doors `nursery_crimes`↔`fork_handles` and `nuts_in_may`↔`barking_tree`, a drop from `branch_line` onto the car roof in `sunday_driver`, and roots into the cellar (`root_of_all_evil`↔`square_root`).
  - **Mrs Mop:** she gets her own room, `mrs_mops_parlour`.
  - **Names:** `being_served` "Are You Being Served?" for the lift lobby, `porridge` for the brig, `captains_log_fire`, `core_blimey`, `croquet_monsieur`, `seam_stress`.
  - **Ending:** "Back to Square One!" is the wittiest ending.
  - **Map room:** the live map is in the mansion (`lost_the_plot`), so players see it early.
  - **Item rhythm:** 0-item transit rooms (`top_back_stairs`, `cleared_for_landing`, `stair_wars`, `hatches`, `beam_ends`) give breathing space.
- **C: 6.5/10.** Best gameplay variety and set-piece feedback, but it breaks the originality rule and the hub names are plain.
  - **Mechanics:** each region has one signature mechanic. Examples:
    - arrows: `slippery_slates` sliding slates, `the_family_crypt` crossbows, `torpedo_bay` torpedoes, `crows_eye_view` wind gusts;
    - lifts and moving platforms: `the_pit_cage`, the bobbing stones in `under_the_bridge`;
    - sewer currents: `the_spanish_drain`.
  - **Feedback and signposting:** throwing the switch in `fuse_box_of_doom` makes the lamp in `lighthouse_keepers_lunch` flash and raises the yacht's sail. Every one-way link has an in-room sign.
  - **Secrets:** a two-way loft hatch next to the start (`the_airing_cupboard`↔`grannys_old_tat`), a dumbwaiter through three rooms, and a missing plank on the humpback bridge.
  - **Rewards:** 3-item prize rooms sit in the hardest dead ends (`deep_joy`, `ding_dong_belfry`).
  - **Gags:** "Rocket Park (Pay and Display)", ruby slippers on the home pad (`no_place_like_home`), `duty_free_departures`, "Echo Chamber (Chamber)".

## Defects

### A
1. **No arrows anywhere** in 134 rooms, even though they are a staple of JSW. Flashing nasties appear in only 4 rooms, lifts in 4 and conveyors in 7.
2. **Items are spread flat.** 93 of 134 rooms hold exactly 1 item and none holds more than 3, so there are no big-reward dead ends. The starship has 20 rooms and 22 items (18 rooms with one item each), so the finale is the least rewarding part of the game.
3. **Two names look truncated.**
   - `ground_control_to_major_wal` is "Ground Control to Major Wal"; the full "…Major Wally" is 29 characters and fits.
   - `alls_well_that_ends` is "All's Well That Ends"; the full proverb is 25 characters.
4. **Ending-run risk.** The forced run crosses `landing_on_your_feet`, whose stairs door to `neither_up_nor_down` crosses the bottom edge at cols [14,17]. The door data says nothing about which way the ramp slopes. If it descends eastward, the forced run walks down into `neither_up_nor_down` and never reaches the toilet.
5. **The coast is hard to reach.** The back door is deliberately bricked up (sealed pair `cliff_hanger`|`das_boot_room`). The only ways in are the stairs `cliff_hanger`↔`brandy_for_the_parson` and the sewer outfall, so the iconic beach and yacht are tucked away late.
6. **Few reward cul-de-sacs.** There are only 21 dead-end rooms, and 79 rooms are two-door corridors, so exploration is fairly linear.
7. **`countdown_conundrum` "Countdown Conundrum" is the mission-control room, not the silo**, so the name points players at the wrong room.
8. **The layout is the original's shifted by one.**
   - Attic row 8, roof row 7 and towers rows 5-6 are the original's rows 7, 6 and 4-5 plus one.
   - The coast strip, island [1,12], sea [2,12], bow [3,12] and stern [4,12], is the original's Deserted Isle, cheat, Bow and Yacht shifted by (+1,+1).
   - This is a minor originality risk.
9. **The generator is missing.** The summary names `out\tmp\gen_world_A.js`, but only `judge_build.js` is in `out\tmp`.

### B
1. **The challenge curve is the flattest.** The distance-difficulty correlation is 0.61. Its only three difficulty-5 rooms (`life_on_mars`, `hole_in_one`, `alien_nation`) are all on the planet, so the tree, towers, well and cellars never rise above 4. Three difficulty-3 rooms sit within 3 steps of the start, and the opening is not built as a teaching loop.
2. **No arrows.** Flashing nasties appear in 3 rooms, diagonal guardians in 9 and conveyors in 4.
3. **The yacht payoff is muted, and the empty cell copies the original's gap.**
   - The yacht link `take_a_bow`→`all_at_sea` lands you in the sea room, and you then wade to the island.
   - The empty cell [3,13] between bow and sea copies the job of the original's "cheat" separator room.
4. **Echoes of original names and positions.**
   - `dock_of_the_bay` and `shuttle_diplomacy` are both on row 3, as the original's Docking Bay and Shuttle Bay are.
   - `take_a_bow` plays on "The Bow".
   - The 18-room row-11 spine openly copies the original's row-11 spine.
5. **A single way from the house into the attic:** the shaft between `hatches` and `top_back_stairs`, plus the tree. The whole attic, roof and tower quarter, including the rocket, hangs off one 0-item room.
6. **Items are still flat outside the transit rooms:** 79 rooms hold one item and none holds more than 3.
7. **The start is on the first floor with one real exit.** Its only exit that isn't a dead end is `rogues_gallery`; the other side leads to the dead-end master suite.
8. **The generator is missing.** `out\tmp\gen_world_B.js` is not there.

### C
1. **Hub names are plain.** About 26 of the 32 mansion names read like an estate agent's floor plan: `the_dining_room`, `the_servery`, `the_cloakroom`, `the_scullery`, `the_laundry`, `the_kitchen`, `the_boot_room`, `the_back_hall`, `the_boiler_room` and so on. The grounds have more plain names (`the_gravel_drive`, `the_gatehouse`, `the_riverbank`). The region seen first and most often is the least witty.
2. **It copies the original's grid coordinates, which breaks a hard rule.**
   - The coast cells `desert_island_discs` [0,11], `shark_infested_shallows` [1,11], `yacht_sharp_end` [2,11] and `yacht_poop_deck` [3,11] are exactly the original's Deserted Isle, cheat, The Bow and The Yacht at columns 0-3, row 11.
   - Attic row 7, roof row 6, towers rows 4-5 and top floor row 8 are identical to the original.
   - The well is in column 14, as in the original.
3. **`turbo_lift_a/b/c` ("Turbo-Lift: Deck A/B/C")** is a three-room vertical lift column that mirrors JSW II's MAIN LIFT 1/2/3.
4. **Room geometry is formulaic.** 31 themes specify ledges "every 2 rows (13, 11, 9, 7)", so many rooms will play the same.
5. **The ending name "Oh Heck! It's Monday Morning!"** copies the pattern of the original's "Oh $#!+! The Central Cavern!", and uses the same office joke as A.
6. **The forced-run finale is only one intermediate room** (`walk_in_wardrobe`).
7. **"Fatberg Alley" is an anachronism** (a 2010s word) in an 80s pastiche.

## The 5 best ideas to graft into the winner
1. **[C] One signature mechanic per region, with real arrows, flashing nasties, lifts and conveyors.** In A's rooms, for example:
   - slipping-slate arrows in `walking_on_thin_slate`;
   - crossbow arrows in `skeleton_staff`;
   - current conveyors in `effluent_society`;
   - laser arrows in `droid_rage`;
   - a pit-cage lift in `pit_stop`;
   - wind-gust arrows in `leaf_it_out`.
2. **[B] A tree that touches the house.** Move A's west bough `bough_wow_wow` to [16,9] and give it a window door into `tank_top` [15,9]. Add a canopy branch at [16,8] to `hatch_match_and_dispatch` [15,8]. Add a drop from a bough onto the car in `driveway_to_distraction`. The tree then becomes a shortcut into the house and attic.
3. **[C] Visible feedback for game state.** When the switch is thrown in `flick_of_the_switch`, light the harbour or lighthouse lamp and raise the sail on `the_pointy_end`. Give the silo capsule a T-MINUS panel, and put one-way signs at the plughole, outfall and chimney drop. A's switch is in a hidden pocket far from the yacht, so the cue is essential.
4. **[B+C] Item rhythm.**
   - Put 0 items in A's stair and landing rooms (`neither_up_nor_down`, `upstairs_downstairs`, `backstairs_gossip`, `mind_the_step`).
   - Use the spare items for 4-6 item prize rooms in the hardest dead ends: `alls_well_that_ends`, `leaf_it_out`, `droid_rage`, `hot_springs_eternal`, `for_whom_the_bell_tolls`, `all_at_sea`.
   - In the well, reward the safe rope descent as C's `deep_joy` does.
5. **[B] Ending and map room.**
   - Replace "Nightmare on Wally Street" with "Back to Square One!", a cavern packed with every guardian; it is a better and more original nod to the Central Cavern.
   - Move the live map room into the mansion (B's `lost_the_plot` idea), because A's `are_we_there_yet` in the starship is found too late to be useful.

Worth a mention: C's two-way loft hatch next to the start and three-room dumbwaiter; C's missing bridge plank leading to the troll; B's well, where you time a drop onto the swinging bucket rope; C's ruby-slipper home pad.

## Recommended winner: A
It has the strongest JSW II feel: the wittiest names across every region, a deliberately paced opening loop and gates, the best difficulty ramp, a three-pad transporter room, and a forced run across several rooms. Its layout is the original's shifted by a row rather than copied (unlike C).

Fixes needed before building rooms:
1. Restore the full names "Ground Control to Major Wally" and "All's Well That Ends Well". Rename `countdown_conundrum` so it doesn't suggest the silo.
2. Pin down the stairs door between `landing_on_your_feet` and `neither_up_nor_down`: either make it rise eastward (so it is a hump on the run line) or move it off the forced-run line.
3. Apply grafts 1-5 above.
4. Optionally give the coast a second way in on foot. Also optionally move or reorder the island/sea/bow/stern strip so it is no longer the original's coast shifted by (+1,+1).
5. Because `gen_world_A.js` is missing, the edits must be made by hand in the JSON, or the generator recovered, and then `check-plan` re-run.