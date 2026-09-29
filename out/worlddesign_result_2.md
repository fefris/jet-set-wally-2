World design C is written to `C:\code\Jet Set Wally 2\out\world_design_C.json` and `node tools/check-plan.js out/world_design_C.json` prints PLAN OK. That checker only covers the room graph; the room themes have not been run through `validate.js` or `solve.js`, so the physics of each room is still unproven. The generator is `C:\code\Jet Set Wally 2\out\worldgen_C\gen_world_C.js`: it writes the JSON and seals every grid-adjacent pair that has no door.

1. **Scale:** 134 rooms (mansion 32, roof and attic 14, towers 4, cellars 10, mines 8, well 3, grounds 20, coast 7, sewers 7, starship 20, planet 8, one off-grid ending) and 175 items, 150 required, at most 3 per room. There are 143 doors, 49 sealed pairs and 8 one-way links.
2. **Layout on a 23x18 grid:** the mansion is an 8x4 block in the middle (columns 6-13, rows 8-11), with the attic (row 7) and roof (row 6) above and the towers poking up at rows 4-5. The cellar corridor runs east along row 12, the mines hang below it, and the well drops to row 17. The grounds spread east from the front door, the coast runs west from the back door, and the starship (top), planet (top right) and sewers (bottom left) sit apart.
3. **Start and ending:** you start in The Bathroom (10,8). The Master Bedroom is two rooms west, through The Walk-in Wardrobe, and Mrs Mop guards the bed. After 150 items, the forced run right goes along a flat floor with no hazards to the Bathroom toilet, which leads to "Oh Heck! It's Monday Morning!".
4. **One mechanic per region:** mansion staircases, roof ramps with wind arrows, tower ropes, cellar conveyors with crossbow arrows, mine lifts and crushers, a rope descent down the well, diagonal guardians in the grounds (vines and a spiral ramp in the tree), arrows and bobbing platforms on the coast, currents in the sewers, turbo-lifts and force fields on the starship, crater ramps on the planet.
5. **Difficulty rises with distance from the hub:** rooms around the Bathroom and Great Hall are 1. The belfry, the top of the tree, Deep Joy, Stalactite Street, the Warp Core and Tripod Hill are 5, and most of the 25 spare items are in those hard dead ends.
6. **One-way loops, each with a sign in the room:**
   - Turkish Bath plughole → sewers → outfall onto The Beach.
   - The Fuse Box of Doom trip switch lights the lighthouse and raises the yacht's sail → yacht to Desert Island Discs → escape-pod teleport to the starship.
   - Countdown Silo rocket (after its 3 items) → Rocket Park.
   - Molecule Shuffler ⇄ Planet Zarg, a loop closed by a one-way crater drop.
   - "There's No Place Like Home" pad → The Bathroom.
7. **Secret shortcuts:** the dumbwaiter lifts (Kitchen ↔ Servery ↔ Billiard Room), the loft hatch next to the start, the Box Room trapdoor, the Trophy Room's French windows, the ha-ha drop, the coal chute, the conker-root shaft joining the tree to the cellars, and the Canary Corner escape hatch.
8. **Set-pieces:** a 9-room conker tree (roots, trunk, fork, two branches, canopy, rookery, crow's-eye top). The west attic can only be reached over the roof. The humpback bridge has a missing plank that leads to Under the Bridge. The well's comic fatal plunge happens only if you overshoot the rope, and you respawn on the well-head rim.
9. **Changes this pass:** an earlier run of this task had already left a passing design and generator. I fixed about 90 room themes that described climbs of more than 2 rows or drops of more than 4. The most serious was the dead-end Pigeon Loft, whose 3-row tiers would have trapped you. Every ledge you drop onto now has a way down and back up, and the ending run line has no ramps or walls. I renamed three rooms whose names were too close to the originals (now Rocket Park (Pay and Display), Heart of Conker and A Crow's-Eye View), and added a physics-conventions paragraph to the notes.
10. **Critical path:** mansion sweep → grounds and tree → cellars (throw the trip switch) → mines and well → attic, roof and towers → rocket → starship and planet → home pad → coast, yacht and island → optional sewers → bed.

check-plan output tail:
```
13 ...........EEEEE.......
14 ............EEE........
15 ...I..........F........
16 IIIII.........F........
17 ....I.........F........
rooms: 134  items: 175 (plan says total 175, required 150)
doors: 143  sealed: 49  links: 8

PLAN OK
```