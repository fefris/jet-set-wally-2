{
  "lens": "BUILDABILITY: can about 10 parallel authors build every room from the plan alone?",
  "scores": { "A": 5, "B": 6, "C": 8 },
  "winner": "C",
  "baseline": "All three print PLAN OK. Each has 134 rooms and 175 items (150 required). Region counts are exactly 32/14/4/10/8/3/20/7/7/20/8/1. No sewer, starship or planet room touches a walkable region. No door opening is only 2 rows. Every theme names at least one sprite from the art library. check-plan only proves the room graph, so the differences below come from the door notes and themes, checked against validate.js rules and the physics.",
  "metrics": {
    "A": "Themes average 160 chars and 52 are under 140. Only 16/134 themes give any row or col numbers. Guardian movement type (h/v/diagonal) is stated in 132/134. There is no contract-conventions section. 6 of 9 shafts are 3 cols wide with no gap/arrival split. 1 of 14 stairs gives a direction. Door openings: 85 are 3 rows, 16 are 4 rows. No room uses arrows.",
    "B": "Themes average 194 chars and 13 are short. 84/134 themes give geometry. Guardian movement type is stated in only 19/134. There is a CONTRACT CONVENTIONS paragraph. 13 of 14 shafts are 3 cols wide. All 9 ropes are 2 cols wide. All 96 door openings are exactly 3 rows. Stair direction is given in the themes for the back stairs and grand staircase only.",
    "C": "Themes average 293 chars and none are short. 127/134 themes give geometry. Guardian movement type is stated in 77/134. It has a vertical-contract paragraph, a physics-conventions paragraph and a per-region array. All 10 shafts are 4 cols wide with exact gap and arrival cells. All 9 rope notes give the drop-back gap columns, and most also give the catch-ledge row. 95 of 98 door openings are 4 rows. It uses the most engine features: 11 lift rooms, 10 arrow rooms, 14 flashing rooms. My gap-vs-span and corner scans found no contradictions."
  },
  "defects": {
    "A": [
      "just_desserts/bubble_and_squeak shaft cols [28,30]: the note and the theme both put the row-15 gap across all of cols 28-30. That leaves no arrival floor, which validate.js reports as 'needs a landing surface in row 15 within cols'. The gap at col 30 also clashes with the floor-15 door just_desserts->ballroom_blitz, which needs a walkable surface in the two outermost columns. In bubble_and_squeak, rows 0-1 at col 30 collide with its own right-edge door [12,14].",
      "swotting_up/people_in_glasshouses rope [15,17]: the rope reaches row 0 at col 16, but 'the study floor has a gap at cols 15-17'. Wally arrives over the gap and falls straight back down, so the way up is broken.",
      "ground_control_to_major_wal: the capsule trigger at 'cols 14-17, rows 12-14' sits exactly on the arrival point of shaft [14,17] (y=104, rows 13-14) and over its drop-back gap.",
      "Two drops land on moving lift cars, so whether you survive depends on where the car is. bubble_and_squeak says 'drop onto the lift car at row 5 or lower floor'. mind_the_doors_please has a 'hatch gap to drop back onto the car' while the car cycles rows 13<->3. When the car is low the fall is 11-13 rows, which is fatal.",
      "landing_on_your_feet (difficulty 1, next to the start, on the ending path): the drop from raising_the_rafters lands on row 5, then the chain ledge at row 9, then the floor at row 15. The last step is a 6-row fall, which is fatal (the limit is 4).",
      "The ending's forced run right crosses landing_on_your_feet over the grand-staircase crossing at cols 14-17, and that staircase has no rise direction. If it rises left, the no-jump run walks down into neither_up_nor_down.",
      "No global vertical rule. 6 shafts are 3 cols wide with no statement of which cols are gap and which are arrival floor: trees_a_crowd/grass_roots [22,24], bridge_over_the_river_wye/troll_booth [8,10], manhole_cover_story/spaghetti_junction [14,16], spaghetti_junction/sump_thing_nasty [20,22], mind_the_doors_please/going_down_haberdashery [22,24], and just_desserts [28,30]. The well ropes [15,17] never say where the drop-down gaps beside them are.",
      "Themes are thin. Examples: droid_rage, dont_panic and hot_springs_eternal are one line each. 17 of the 26 doors with a floor other than 15 are mentioned in neither room's theme, e.g. which_way_the_wind_blows>flash_harry [11,13]f14 and spaghetti_junction>effluent_society [11,13]f14.",
      "No arrow guardians anywhere, although arrows are a core JSW mechanic."
    ],
    "B": [
      "Possible soft-lock in two dead-end chains. The canary theme says 'gap at cols 15-16 beside the bucket rope', but the rope door canary/wishing_well is at cols [15,16]. great_stink says the same ('gap at cols 15-16 beside a rusty chain-rope', rope [15,16]). A rope climber arrives over the gap and falls back. The 3-room well and the sump are dead ends, so built as written you cannot get out. validate.js would also fail it for having no landing surface in row 15.",
      "Door notes contradict B's own shaft rule (2-col gap on the first two cols, floor on the rest, one ledge at row 4). hatches/top_back_stairs says 'gap ... cols 14-16'. just_desserts/too_many_cooks says 'gap ... cols 14-16', and the just_desserts theme says '3-col gap'. Neither leaves an arrival floor. Seven shafts (sky_is_the_limit/dormer_mouse, countdown/starry_starry_night, the_pits/rock_bottom, put_on_ice/ladder_of_success, root_canal/square_root, captains_log_fire/corridors_of_power, moonwalk/life_on_mars) give two different ledge rows (5 and 3/4).",
      "Lifts share columns with the landing ledges. In too_many_cooks the lift runs at cols 14-16 between rows 13 and 4, yet the drop 'lands on the kitchen lift/its stop ledge at row <= 6'. In being_served the lift is at cols 12-14 and the drop 'lands on the lift top/ledge at row 5'. A drop can be fatal depending on where the lift is, and the static ledge sits in the lift's path. being_served is directly below beam_ends, the transporter hub (its only way down).",
      "13 of 14 shafts are 3 cols wide, which leaves a 1-col arrival floor. An off-by-one by either author breaks the climb.",
      "Guardian movement type is stated in only 19/134 themes. The rest are prose like 'a ghost glides' or 'an hourglass bobs'.",
      "All 96 door openings are exactly 3 rows, so jumps through doorways get clipped by the wall above the opening.",
      "Stairs with no rise direction: cleared_for_landing/rogues_gallery, cliffhanger/wuthering_heights, wuthering_heights/the_beach, troubled_water/troll_booth."
    ],
    "C": [
      "13 of 15 stairs doors give cols but no rise direction; only the loft ladders say 'ramp rising right/left'. nursery/servants_back_stairs [2,5] is against the west world edge, so a rising-left continuation would run into the wall. Two authors must agree on '/' or '\\' at every crossing.",
      "The drop_me_a_line special promises a 'guaranteed safe respawn at the rim for every death further down'. The engine rule respawns Wally on the last static ground he stood on, which can be a ledge in well_beyond_help. Either add an engine special or reword it.",
      "Heavy on engine features. 11 lift rooms (the_servery, the_kitchen, the_pit_cage, seam_of_despair, glow_worm_grotto, turbo_lift_a/b/c, under_the_bridge, rocket_park, the_gloop_lagoon), 14 flashing and 10 arrow rooms all add solver state. Each lift, shelf and gap needs exact cells, e.g. the servery lift at cols 23-25 up to a row-4 shelf at cols 26-29 under the billiard-room floor at cols 28-29.",
      "Themes are long and prescriptive (max 547 chars, e.g. drop_me_a_line, the_leafy_canopy), so small numeric slips are likely. The notes' rule 'themes are indicative, door contracts are binding' limits the damage.",
      "Guardian movement type is explicit in only 77 of 134 themes.",
      "Minor naming points: 'Echo Chamber (Chamber)' is an odd name. 'Under the Bridge', 'The Yacht: Poop Deck/Sharp End', 'Say Aaah! Sickbay' and 'Shhh! The Library' contain words from JSW/JSW II room names. These are generic words and allowed, but worth flagging.",
      "The cross-region door the_coal_hole>ha_ha_the_sunken_garden has no note. Both room themes describe it, so this is trivial."
    ],
    "ALL": [
      "None of the three says what the rows outside 'open' at a shared edge must be. validate.js requires wall on one side to match wall on the other for all 16 rows. State the rule that everything outside the opening is wall in both edge columns on both sides.",
      "The stairs contract (cols only) needs the rise direction, the exact crossing cell, and the rule that the upper room's floor meets the top end of the ramp."
    ]
  },
  "bestIdeas": [
    "Global shaft rule, from C: 4-col span, drop gap at c0..c0+1, one-way arrival floor at c0+2..c1, jump/catch ledge at row 3-4 across the whole span. Lifts go BESIDE static shelves so nobody ever drops onto a moving car. Keep it and make it binding; it fixes all of A's and B's shaft and lift defects.",
    "Rope notes, from C: each note names the rope col, the drop-back gap cols and the catch-ledge row, and rope tops stay clear of walls. Shifting the well rope column in each room (14-15, then 20-21, then 8-9) keeps the comic plunge separate from the safe descent.",
    "Stair wording and conventions, from B: phrases like 'rises right, leaves the top at cols X' should become a required field on every stairs door (\"rise\":\"left|right\" plus the crossing col). Merge B's CONTRACT CONVENTIONS paragraph with C's and add the edge rule that everything outside the opening is wall.",
    "Guardian notation, from A: 'Guardians: sprite (h|v|diagonal)' appears in 132/134 of A's themes. Turn C's prose into this format, or add a per-room guardians array giving sprite, type and bounds.",
    "Per-author work packets: combine C's regions array (placement, signature mechanic, difficulty band), B's regionSummary (rooms and items per region), A's Act-1 lesson-per-room list and A's col-12 staircase landmark. Add C's exact special cells and in-room signposting (trip switch at row 4 cols 20-21, pad cols, start col 5 y 104, 'NO RETURN - SEWERS', furled/unfurled sail as the yacht-ready sign)."
  ],
  "winnerRationale": "C is the only plan where two authors on opposite sides of a vertical edge can build without talking to each other. Every shaft and rope note gives exact gap, arrival and ledge cells. Lifts never act as landing surfaces. 127 of 134 themes give checkable geometry, and the door openings leave jump headroom. My scans found no contract contradictions in C. A has 5 concrete contract or physics errors, including a fatal drop chain in a difficulty-1 room on the ending path. B has a possible soft-lock in the well and sump rope rooms, and its door notes contradict its own conventions. Before handing C to authors: add a rise direction to every stairs door, add the rule that the edge outside each opening is wall, fix the drop_me_a_line respawn wording, and add structured guardian fields.",
  "files": [
    "C:\\code\\Jet Set Wally 2\\out\\world_design_A.json",
    "C:\\code\\Jet Set Wally 2\\out\\world_design_B.json",
    "C:\\code\\Jet Set Wally 2\\out\\world_design_C.json",
    "C:\\code\\Jet Set Wally 2\\tools\\validate.js"
  ]
}