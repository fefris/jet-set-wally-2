The world plan passes the checker with PLAN OK: 134 rooms, 175 items (150 required), 144 doors, 51 sealed pairs and 8 one-way links. All room names are new (longest is 31 characters).

1. **Layout.** The map reads like a cross-section of a clifftop estate:
   - **Mansion:** a 4-floor block at cols 8-15, rows 9-12, 32 rooms.
   - **Attic, roof and towers:** attic at row 8, roof at row 7, three towers above. The rocket silo is at [15,5].
   - **Underground:** cellars along row 13 (cols 7-16), mines at rows 14-15, and the well hanging down col 13 to row 18.
   - **Grounds:** 20 rooms off the east wall (cols 16-22), including the Giant Tree column at col 18 with roots, foot, trunk, fork, boughs, canopy and rookery.
   - **Coast:** 7 rooms off the west cliff along row 12, from Cliff Hanger out to Desert Island Discs.
   - **Remote regions:** the sewers (bottom-left), the starship (rows 0-2, cols 8-17) and the planet (cols 20-25) touch nothing else. They are joined only by the drain, outfall, rocket, yacht and teleport links.
2. **Landmarks.** Col 12 is one continuous staircase through four floors: Landing on Your Feet, Neither Up Nor Down, The Great Hall, then Upstairs, Downstairs. The other landmarks are:
   - the Giant Tree;
   - Open All Hours (far east) and Desert Island Discs (far west);
   - the silo sitting directly below the starship's docking bay;
   - Flick of the Switch (the trip switch);
   - the transporter room.
3. **Act 1, the opening loop.** 12 rooms at difficulty 1-2 with 17 items: The Bathroom → the top floor, where the Master Bedroom shows Mrs Mop and the goal → back stairs down → first floor → grand staircase back up. It teaches walking, collecting, jumping a guardian, jumping up 1-2 cells, one-way floors, stairs and safe drops.
4. **Gate 1, the grounds.** Through the front door, Knock Knock, Who's There?, which has a butler timing test. There is a second route from Sun Lounge Lizard onto the terrace.
5. **Gate 2, below stairs, cellars and mines.** Down the servants' stairs. An ice wall splits the cellars, so the east half (with the trip switch) is reached from the mines by a one-way climb, or by the Boiling Point grate shortcut. It exits through a manhole into the Allotment and back via the coal chute. The well is an optional side trip down a bucket rope, with the funny fatal drop in Well Hard.
6. **Gate 3, the coast.** The back door is bricked up, so the coast is reached through the smugglers' tunnel, or the Dirty Laundry plughole into the sewers, whose outfall drops you on the beach. With the switch thrown and both yacht rooms cleared, the yacht sails one-way to the island. All at Sea is reachable only by wading out from the island.
7. **Gate 4, space.** Attic stairs → skylight climb onto the roof, which returns via the Flash Harry chimney drop → belfry, clock tower and silo. Taking the silo's 3 items launches the rocket. The island teleport is a second way into the ship. From the transporter room, the west pad goes to the planet (a one-direction run ending at the Don't Panic! pad back to the ship) and the east pad goes home to The Bathroom.
8. **Ending.** At 150 items Mrs Mop leaves; the bed starts the forced run right through two jump-free rooms to the toilet, then Nightmare on Wally Street (off-grid).
9. **Softlocks.** Every one-way link or drop leads somewhere you can walk back to the hub from. Difficulty rises with distance from The Bathroom. 47 items are in difficulty 1-2 rooms, 63 at difficulty 3 and 65 at 4-5.

The checker only confirms the graph (who connects to whom); the door heights, columns and ledge rows are paper contracts until the rooms are built against the real physics. I generated the plan from a script, so edit that and re-run it rather than hand-editing the JSON: every grid-adjacent pair without an explicit door is sealed automatically, and I reviewed all 51 of those.

Final check output tail:
```
rooms: 134  items: 175 (plan says total 175, required 150)
doors: 144  sealed: 51  links: 8

PLAN OK
```

Files are in C:\code\Jet Set Wally 2\out:
- world_design_A.json
- tmp\gen_world_A.js