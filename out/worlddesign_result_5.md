# Judge report: connectivity and physics

All three designs pass `tools/check-plan.js` (PLAN OK). That checker only looks at the room graph. The scores below come from checking the door contracts against the real engine code: `src/engine/willy.js`, `src/engine/game.js` and `src/engine/entities.js`, plus `tools/validate.js`.

**Engine facts the contracts have to respect:**
- **Fatal falls carry over between rooms.** On entering the room below, `enterRoomState('down')` only resets the fall counter if it is still below 11. So a drop gap is only safe if Wally reaches it by walking off a floor at row 12 or lower, or by jumping from row 14 or lower. Falling through a whole room is always fatal.
- **Climbing arrival must land on floor.** A climber arrives in the upper room at y=104, above the rope or ledge columns. If those cells are a gap, he falls straight back down.
- **Only one rope per room.** `w.rope` is a segment index shared by all ropes, and `validate.js` reports "more than one rope" as an error.
- **The ceiling is wall-only.** A jump from floor f reaches row f-5. So an opening needs 5 or more rows before a jump can pass under a walled lintel.
- **Lifts are not safe landings.** A drop onto a lift that happens to be at the bottom of its run is a fall of 10 or more rows, which kills.

To measure how fragile each design is, I removed every edge in turn and counted which rooms could no longer get back to the start. The "fragile" edges are the one-way-up physical ones (climb, rope-up, shaft-up):
- **A:** 8 fragile edges, stranding 23 rooms in total.
- **B:** 10 fragile edges, stranding 62 rooms in total.
- **C:** 5 fragile edges, stranding 31 rooms in total.

```json
{
  "scores": { "A": 6, "B": 5, "C": 8 },
  "winner": "C"
}
```

## A: 6/10
**Strengths:**
- The way home from space is the most robust of the three. The rocket dock `reverse_parking_in_orbit` is one stairway below the three-pad transporter `please_mind_your_molecules`, the planet pad lands there too, and the island arrival `airlock_stock_and_barrel` reaches it by doors only. No climb is needed anywhere on the way home.
- It has the lowest fragile stranding total (23).

**Defects:**
1. **`landing_on_your_feet` drop landing is fatal as written.** It lands on a "chandelier ledge row 5 → chain ledge row 9 → floor". The last step from row 9 to the row-15 floor is 6 rows, which kills.
2. **The ending run crosses a staircase.** The forced run right passes through `landing_on_your_feet`, which also holds the foot of the grand staircase: stairs to `neither_up_nor_down`, cols 14-17, on floor 15. A no-jump run right will be caught by the ramp and either climb it or go down the stairs. Put the ending path in rooms with no stairs.
3. **`just_desserts` dumb-waiter shaft.** The shaft at `cols [28,30]` overlaps the right door's floor-15 edge at cols 30-31. Anyone walking west from Ballroom Blitz drops straight into the shaft on the main ground-floor corridor. The landing below is described as "the lift car at row 5 or lower floor", but the lift runs rows 13↔3 in the same columns, so there is no fixed ledge to land on and a drop can be fatal.
4. **Turbolift shaft (`where_no_wally_has_gone_before`↔`mind_the_doors_please`, cols 14-17).** "Drop back onto the car", but the car runs rows 13↔3 under the hatch, so it has the same fatal-drop problem.
5. **`swotting_up` rope contract.** The rope top is at col 16, but the "gap at cols 15-17 beside it" is directly under the arrival point, so the climber falls straight back. `validate.js` will reject it (no landing within cols 15-17).
6. **Shaft notes never separate the drop gap from the arrival floor.** For example: `trees_a_crowd`↔`trunk_call` (14-17), `bridge_over_the_river_wye`↔`troll_booth` (8-10), and the sewer shafts. `everything_but_the_kitchen_sink` says both "a hole in the floor is where the climb arrives" and "junk-store floor solid above".
7. **`neither_up_nor_down` stairs.** The bottom crossing is cols 20-23 and the top is cols 14-17, only about 6 columns apart for a 14-row rise. It needs a switchback, which the plan doesn't describe.
8. **Door heights and signage.**
   - 85 of 101 doors are only 3 rows high.
   - The one-way links carry no signpost wording.
   - The island's only exit is a *hidden* pad in the hut.

## B: 5/10
**Strengths:**
- Stairs geometry is the cleanest. Every stacked stair room's bottom and top crossings are 14-18 columns apart, so each flight is one simple diagonal.
- The cross-section is coherent: beach at the foot of the cliff, and the coast reachable two ways (cliff path and smugglers' tunnel).
- The ending path uses dedicated flat rooms.
- A written CONTRACT CONVENTIONS paragraph defines shaft cells exactly.

**Defects:**
1. **Several themes put a floor hole exactly where a rope arrives, contradicting B's own convention.** Built as written, the climber arrives over the hole and falls back:
   - `canary`: "gap at cols 15-16 beside the bucket rope" (the rope is at cols 15-16).
   - `old_king_coal`: "pit-rope hole at cols 16-17" (the rope is at cols 16-17).
   - `great_stink`: "gap at cols 15-16 beside a chain-rope".
   - `bats_in_the_belfry`: "rope drops through the floor at cols 15-16".
   - `warp_factor`: the "rope hangs down to the exhausts".

   The consequences are serious:
   - `sump` and `exhaust_pipe_dream` can only be left by their rope, so they become soft-locks.
   - `the_pits`→`old_king_coal` is the **only exit for 17 rooms**: the east cellars, all the mines, the well and the tree roots.
   - `top_of_conkers` specifies no drop-back gap at all, and it is a dead end reachable only by rope.
2. **Everything in space depends on shaft climbs.**
   - Both one-way arrivals, `dock_of_the_bay` (rocket) and `shuttle_diplomacy` (island), can only be left by a shaft climb.
   - All 27 rooms of ship, planet and island get home only through the climb from `corridors_of_power` to `captains_log_fire`.
3. **Lifts under drop gaps.**
   - `too_many_cooks`: the lift runs cols 14-16, rows 13↔4, exactly under the dining-room hatch.
   - `being_served`: the lift runs cols 12-14 exactly under the Beam Ends gap.

   Drops can land on a lift at the bottom of its run, which is fatal, and this contradicts B's own rule of a fixed ledge at row 4 across the shaft.
4. **Door notes and convention disagree.**
   - The door notes give 3-column gaps (for example `hatches` at 14-16) and "land row 5 / ledge row 3-4".
   - The convention says a 2-column gap plus a single ledge at row 4.
5. **Door heights.** All 96 horizontal doors are only 3 rows high.

## C: 8/10
**Strengths:**
- It is the most physically literate plan.
- **Shafts:**
  - Every shaft is 4 columns wide.
  - Each has an explicit 2-column drop gap next to a 2-column one-way arrival floor.
  - The lower room has a fixed catch shelf at row 3-4.
  - Lifts sit *beside* the shaft, not under it (for example `the_servery` at 23-25 next to the shelf at 26-29).
- **Ropes:** every rope has explicit arrival columns, a separate drop-back gap and a catch ledge no lower than row 5 (for example `stargazers_dome`: rope 22-23, gap 24-25, pot cap row 5).
- **Doors:** 95 doors are 4 rows high and the porch/drive doors are 5.
- **Physics conventions match the engine exactly:**
  - 2-row ledge steps.
  - Walk-off drops of 4 rows or less.
  - Items at most 5 rows above a surface, which is exactly the jump-peak reach.
- **One-way links and arrivals:**
  - Every one-way link is signposted.
  - Arrival pads have no guardian paths over them.
  - The planet loop returns through doors after its drop.
- **Ending run:** the ending run line is flat and free of guardians.

**Defects:**
1. **`bell_ringers_loft` has "three swinging bell ropes".** The engine allows only one rope per room and `validate.js` reports "more than one rope" as an error. It needs one rope plus pendulum guardians instead.
2. **The way home from space has a single fragile point.** Home depends on one lift-assisted shaft climb, `turbo_lift_b`→`turbo_lift_a` (cols 14-17), which strands 24 rooms (lower decks, planet and island) if it fails. Since row 0 is only reached through it, add a second route up or move the home pad.
3. **Mrs Mop and the bed.** Mrs Mop is described as an "h-patrol cols 1-13 on floor 15", but the engine's housekeeper is a static special (`sp.housekeeper` x,y). Her path would also overlap the bed conveyor at row 14 (cols 2-11), and guardian paths must be over air.
4. **`the_galleried_landing` stairs.** The bottom crossing is cols 18-21 and the top is cols 8-11, which is 10-13 columns for a 14-row rise. It needs a short jog.
5. **Unsafe ledges in `well_beyond_help`.** "East-wall ledges (rows 8, 12) drop safely down", but below them is the hole at cols 10-27. A drop there lands in `deep_joy` at around col 26, where there is only nasty water (the shelf is at cols 8-13), so it kills.
6. **Main-route traps.** Walking across the 2-column ha-ha gap on `the_gravel_drive` (18-19), or the chute gap between the doors of `the_coal_hole` (6-7), forces a one-way detour. Both are signposted and loop back, so they are not soft-locks.
7. **Heavy use of lifts.** The pit cage, grotto, Deck B/C, stepping stones and gloop rocks all rely on lifts. Several catch shelves can only be left by lift, which means more timing and more solver phases.

**Missing engine feature (A, B and C):** the yacht requires the items in *two* rooms, but `portalReady` only supports "this room cleared" plus one flag. C's flag-driven visuals (lighthouse lamp, raised sail) also need new engine support.

## Five ideas to graft into C
1. **From A: a three-pad transporter.** Put the arrival, planet and HOME pads in one door-connected transporter room, with the rocket dock one stairway away. Put the home pad in `molecule_shuffler`. This removes C's `turbo_lift_b`→`turbo_lift_a` single point of failure, so no space arrival or return depends on a climb.
2. **From B: tree↔house windows at several heights.** B has the nursery sill at floor 10 to `fork_handles`, and the loft gable at floor 13 to `barking_tree`, besides the front door and root cellar. This gives C's tree crown redundant exits (today the `heart_of_conker` stairs strand 7 rooms).
3. **From B: two independent routes to the coast.** Add a cliff-top path from the garden and a smugglers' tunnel from the cellars to the beach, so the coast forms a loop instead of hanging off one back door.
4. **From B: single-flight stair geometry.** Keep each stacked stair room's bottom and top crossings 14-18 columns apart. Use this to fix C's `the_galleried_landing` (18-21 → 8-11).
5. **From A: the opening loop teaches physics in order.** Walk and collect, jump a slow guardian, 1-2-cell jumps, one-way floors, stairs across an edge, then a safe walk-off drop. Pair it with A's explicit walk-back list for every one-way step, and make that list binding in C's notes.

**Recommended winner: C.** Before handing it to room authors, fix the multi-rope loft, add a second route home from space (idea 1), change the housekeeper to static, and correct the galleried-landing stair columns and the `well_beyond_help` east ledges.