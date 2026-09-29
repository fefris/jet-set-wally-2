# Jet Set Wally II — World

Generated from `src/data/world_plan.json` by `tools/plan-doc.js`. The JSON is the binding source;
door contracts and sealed edges are enforced by `tools/validate.js` and proven by `tools/solve.js`.

Start: **The Bathroom** (the_bathroom). Items: 175 in total, 150 needed for Mrs Mop to go to bed.

## Map

```
Regions: A=mansion B=roof C=towers D=cellars E=mines F=well G=grounds H=coast I=sewers J=starship K=planet L=ending
 0 .........JJJJJJ....KKKK...
 1 ........JJJJJJJJ...KKKK...
 2 .........JJJJJJ...........
 3 ..........................
 4 ..........C...............
 5 .......C..C.C.............
 6 .......BBBBBB....G........
 7 ......BBBBBBBB...GG.......
 8 ......AAAAAAAA..GGG.......
 9 ......AAAAAAAAGG.G........
10 ......AAAAAAAAGGGGGGGGH...
11 ......AAAAAAAAG..GFGHHHH..
12 ........DDDDDDDDDDF.....HH
13 ...........EEEEE..F.......
14 ............EEE...........
15 ...I......................
16 IIIII.....................
17 ....I.....................
rooms: 134  items: 175 (plan says total 175, required 150)
doors: 144  sealed: 53  links: 9

PLAN OK
```

## One-way links

* The Turkish Bath (Drained) → Round the U-Bend (drain): Plughole grate in the drained plunge pool (cols 15-16). One-way; signposted NO RETURN - SEWERS. Lands on the pipe ledge at row 4.
* The Outfall → Sand in Your Sandwiches (outfall): Outfall grate (cols 4-6). One-way out of the cliff pipe onto the dune at row 5 of the Beach; signposted BEACH ->.
* The Sharp End → Desert Island Discs (yacht): Needs the trip switch thrown (fuse_box_of_doom) and all yacht items collected; sail raised + ALL ABOARD pennant = ready. One-way voyage; lands on the island sand (floor 15, cols 20-27).
* Desert Island Discs → The Molecule Shuffler (teleport): Crashed escape-pod pad (cols 4-7), one-way to the starship arrivals pad; the island has no other exit.
* Countdown Silo → Rocket Park (Pay and Display) (rocket): Launches once all 3 silo items are taken and Wally steps into the capsule; clock stops during the flight. One-way.
* The Molecule Shuffler → Welcome to Planet Zarg (teleport): Departures dais, one-way to the planet arrival pad.
* Duty-Free Departures → The Molecule Shuffler (teleport): Planet departures pad, one-way back to the starship arrivals pad (closes the planet loop).
* There's No Place Like Home → The Bathroom (teleport): Return pad, one-way home to the start room (floor 15, col 5). The only way back from space.
* The Molecule Shuffler → The Bathroom (teleport): HOME pad in the transporter room (second way home; removes the single point of failure on the grav-tube climb)

## Conventions

CHALLENGE-FIRST DESIGN. The Bathroom (10,8) is the hub: every room within two screens of it is difficulty 1-2, and difficulty ramps outward by distance and depth - mansion 1-3, attic/cellars/near grounds 2-4, roof/mines/coast/sewers 3-4, tower tops, tree tip, well, warp core and the far side of the planet 5. Each region has one signature mechanic so it feels distinct: mansion = staircases/ramps, roof = pitched ramps + wind arrows, towers = ropes, cellars = conveyors + crossbow arrows, mines = lifts + crushers, well = rope descent, grounds = diagonal guardians (tree = vines + spiral ramp), coast = arrows + bobbing lifts, sewers = conveyor currents, starship = turbo-lifts + force fields, planet = crater ramps + diagonals.

LAYOUT. One grid 23x18. Mansion 8x4 block in the middle (cols 6-13, rows 8-11) with attic and roof stacked above and the towers poking up at rows 4-5; the cellar corridor (row 12) runs east under the grounds, the mines hang below it and the well plunges to row 17. Grounds spread east at ground level (row 10) with the 9-room conker tree rising to row 6 and its roots touching the cellars. The coast strings west from the back door along row 11. Remote regions sit apart with no walkable contact: starship across the top (rows 0-2), planet top-right, sewers bottom-left.

CONNECTIVITY. The mansion floors join by two full staircases (servants back stairs at col 6, grand staircase at col 12) plus the servants stair (col 11, ground/lower). Region links: loft ladder and loft hatch (mansion->attic), skylight and loft-ladder hatch (attic<->roof), ropes and gantry stairs (roof->towers), scullery steps and coal chute (mansion->cellars), pit cage + escape hatch (cellars<->mines), ropes (mines<->well), front door, French windows and ha-ha (mansion<->grounds), root shaft (tree<->cellars), back door (mansion<->coast). Every grid-adjacent pair that is not a door is sealed.

VERTICAL CONTRACTS. shaft = 4-col span [c0,c1]: upper room row 15 has a 2-col drop gap at c0..c0+1 and a one-way floor at c0+2..c1 where climbers arrive (so arrivals never land over the gap); lower room rows 0-1 open across the span with a landing/jump-off ledge at row 3-4 spanning it, usually served by a lift beside it. rope = rope in the lower room reaching row 0 at cols; upper room has a floor-15 platform under those cols plus a 2-col drop-back gap beside it (given in each door note) and the lower room catches that drop at row <= 6. climb = ledge at row 3 in the lower room under a one-way floor in the upper room. drop = gap in the upper row 15 onto a landing at row 4-5 below.

ONE-WAY TRIPS (all signposted in-room): plughole drain (Turkish Bath -> sewers), outfall (sewers -> Beach), yacht (-> Desert Island Discs, gated by the Fuse Box of Doom trip switch; the lighthouse lamp flashes and the sail rises when ready), escape pod (island -> starship), rocket (Countdown Silo -> Rocket Park, gated by the silo items), Molecule Shuffler -> planet, planet departures -> starship, and There's No Place Like Home -> Bathroom. Every one-way chain ends back at the hub: sewers->beach->back door; island->ship->home pad; planet->ship->home pad. Local one-ways (box-room trapdoor, coal chute, ha-ha, murder hole, canopy climb, rookery drop, mine escape hatch, engine hatch, planet crater hole and geyser) always sit inside a loop.

SECRET SHORTCUTS: dumbwaiter lift (Kitchen <-> Servery <-> Pot Black Billiard Room), loft hatch (Airing Cupboard <-> Granny's Old Tat, right next to the start), box-room trapdoor back to the Nursery, French windows (Trophy Room <-> Rose Terrace), the ha-ha drop from the drive into the lower halls, the coal chute, the conker-root shaft (Tangled Roots <-> Under the Conker Roots, joining grounds and cellars) and the Canary Corner escape hatch out of the mines.

CRITICAL PATH (150 of 175 items). 1) Mansion sweep from the Bathroom: top floor, grand staircase down, ground floor, lower halls (~38 items, difficulty 1-3). 2) Grounds via the front door: drive, gatehouse, village green, conker tree (trunk spiral -> vine -> fork -> canopy -> crow's-eye view), river, bridge, corner shop (~26). 3) Cellars via the scullery steps east to the Fuse Box of Doom (throw the trip switch), back through the pit cage into the mines and down the well; out by the Canary Corner hatch or the root shaft (~30). 4) Attic via the loft ladder, over the roof ramps to the bell tower ropes and observatory, then clear the Countdown Silo and ride the rocket (~27). 5) Starship: turbo-lifts, force fields, warp core; the Molecule Shuffler loop through Planet Zarg; home pad to the Bathroom (~34). 6) Back door -> beach -> pier -> lighthouse -> yacht (items + trip switch) -> island -> escape pod -> starship -> home pad (~10). 7) Optional: Turkish Bath plughole through the sewers to the outfall (8). 8) Master Bedroom: Mrs Mop has gone, touch the bed, forced run right through the Walk-in Wardrobe to the Bathroom toilet -> Oh Heck! It's Monday Morning!

PACING. Each excursion is a loop that returns to the mansion, so the player is never far from a known safe route; the 25 spare items live mostly in the hardest dead ends (Ding Dong Belfry, A Crow's-Eye View, Deep Joy, Warp Core, Stalactite Street, the Rat King, the Brig) so completionists get the toughest challenges while the 150 target stays fair. The well gag is fatal only when you overshoot the rope into the open shaft; respawn is always on the well-head rim (JSW II last-safe-ground rule + 2 s invulnerability).

PHYSICS CONVENTIONS used in every theme: ledge chains rise at most 2 rows per step (jump reach), walk-off descents are at most 4 rows, items sit on a surface or no more than 5 rows above one, every catch ledge under a drop/rope/shaft has both a safe way down (<= 4-row steps) and a way back up (<= 2-row steps), arrivals from below always land on a row-15 floor with rows 13-14 clear, and rope tops stay clear of walls (catch ledges near ropes are one-way floors). Row numbers in themes are indicative; the edge contracts in "doors" are binding.

ENDING PATH: Master Bedroom -> Walk-in Wardrobe -> Bathroom along a flat floor 15 with no pits, nasties or guardian paths on the run line; the bed is a right conveyor. The nightmare room is off-grid (unreachableOk) and entered only via the toilet after winning.

FINAL-PLAN CONVENTIONS (binding):
- Edges: at every shared edge, everything outside the listed opening(s) is WALL in both edge columns on both sides (validate checks col 31 vs col 0 row by row).
- Stairs doors: "cols" is a 2-column overlap span and "rise" gives the direction the stairs climb. Rise right: the LOWER room's ramp cells at (c0,1) and (c1,0), the UPPER room's at (c0,15) and (c1,14); rise left: lower (c1,1),(c0,0), upper (c1,15),(c0,14). The upper room repeats the lower room's top two ramp cells (Wally re-enters from below two rows above the geometric continuation). Verified by tools/test-stairs.js.
- Rope doors: the rope hangs in the LOWER room from row 0 inside the span; the upper room has a floor-15 arrival spot above the rope columns and (optionally) a separate drop-back gap beside it.
- Shafts: 4-col span, drop gap at c0..c0+1, one-way arrival floor at c0+2..c1, catch ledge at row 3-4 in the lower room. Lifts go beside static shelves, never under a drop.
- Vary ledge spacing between rooms (not always every 2 rows).
- Guardians: write them as sprite (h|v|d) with bounds; paths only over air; never parked on an arrival spot, pad or the only route.
- One rope per room (engine limit). Housekeeper is static. Yacht portal requires the 'trip' flag and both yacht rooms cleared.
- Layout note: the coast lies EAST of the grounds (reached down the river under the bridge, or via the corner shop's promenade steps); the well is a garden well beneath the riverbank.

## Region: mansion (32 rooms, 40 items)

*Placement:* cols 6-13, rows 8-11 (top floor r8, first floor r9, ground floor r10, lower halls r11)  
*Signature:* staircases and ramps; the dumbwaiter lift and the loft hatch are secret shortcuts  
*Difficulty:* 1-3 (1 around the Bathroom and Great Hall)

### Rock-a-Bye Nursery — `nursery` [6,8]

Items: 1, difficulty 2. Pastel wallpaper, rocking horses and a big toy chest. Floor 15 runs to the east door; in the west a staircase sinks through the floor (cols 2-5) to the back stairs. Building blocks step up every 2 rows (13, 11, 9, 7, 5) to the toy-chest lid at row 4 (cols 24-29), where the box-room trapdoor above drops Wally - the same blocks lead safely back down. Guardians: toy_soldier marching the floor, jack_in_box bouncing (v) beside the blocks; item on the ceiling mobile (row 6), reached from the top block.

* nursery **right** aunt_mauds_boudoir: door, open rows 11-14, floor 15
* nursery **down** servants_back_stairs: stairs, cols 3-4, rise left — back stairs, top flight
* the_box_room **down** nursery: drop, cols 26-27 — trapdoor, one-way down onto the toy-chest lid (row 4)

### Aunt Maud's Boudoir — `aunt_mauds_boudoir` [7,8]

Items: 1, difficulty 2. Lace, perfume bottles and a dressing table. West door at floor 15; a staircase rising right along the east wall climbs to a row-7 landing and the high door (open 4-6) into the Master Bedroom. A ghost drifts diagonally across the stairs, a candle flickers (v) by the mirror; item on the dressing-table mirror (row 11).

* nursery **right** aunt_mauds_boudoir: door, open rows 11-14, floor 15
* aunt_mauds_boudoir **right** master_bedroom: door, open rows 4-6, floor 7 — high door: row-7 landing in the boudoir, wardrobe-top shelf in the bedroom
* sealed against: the_rogues_gallery, mothball_alley

### Master Bedroom — `master_bedroom` [8,8]

Items: 1, difficulty 2. The four-poster bed (right conveyor, row 14, cols 2-11) fills the west floor. Mrs Mop (special.housekeeper, static at cell x 12, y 104, standing on floor 15 just east of the bed) guards it. Enter at floor 15 from the east; a tallboy and a chest of drawers form one-way shelves (rows 13, 11, 9) in mid-room leading to a wardrobe-top shelf at row 7 that runs west to the high boudoir door, safely above Mrs Mop (too high to drop onto the bed); one item on the wardrobe top. No ramps or walls on the floor-15 run line from the bed to the east door; no guardian paths or nasties on it.

*Special:* housekeeper: Mrs Mop (special.housekeeper {x:12, y:104}) - touching her is fatal until 150 items are held, then she leaves. bed: true - standing on the bed conveyor afterwards starts the forced run right (4 px/frame, no jumping) along floor 15 through walk_in_wardrobe into the_bathroom.

* aunt_mauds_boudoir **right** master_bedroom: door, open rows 4-6, floor 7 — high door: row-7 landing in the boudoir, wardrobe-top shelf in the bedroom
* master_bedroom **right** walk_in_wardrobe: door, open rows 11-14, floor 15 — ending run line (floor 15, flat)
* sealed against: shhh_the_library, dads_model_railway

### Coats of Many Colours — `walk_in_wardrobe` [9,8]

Items: 1, difficulty 1. Rails of tweed jackets over a perfectly flat floor 15 (part of the ending run: no pits or nasties on the run line). One-way hat-box shelves (rows 13 and 11) lead to a hat-shelf item at row 9; a shaver buzzes (v) in the far corner between rows 2 and 8 only, never reaching the run line or the item.

*Special:* ending path: forced run right passes straight through on floor 15.

* master_bedroom **right** walk_in_wardrobe: door, open rows 11-14, floor 15 — ending run line (floor 15, flat)
* walk_in_wardrobe **right** the_bathroom: door, open rows 11-14, floor 15 — ending run line (floor 15, flat)
* sealed against: pot_black_billiard_room, the_cold_water_tank

### The Bathroom — `the_bathroom` [10,8]

Items: 1, difficulty 1. START ROOM and hub. Chequered lino at floor 15 with doors both sides; a claw-foot bath (one-way rim at row 13) and a basin shelf at row 11 give the first practice jumps; nothing solid stands on the floor-15 run line from the west door to the toilet. A rubber_duck paddles along the bath rim; item just above the basin shelf (row 9). The toilet stands on the east side (cols 22-24) as harmless decor.

*Special:* start: Wally at col 5, y=104, facing right. After winning, the forced run right ends at the toilet, which flushes Wally to the_nightmare (off-grid ending). Arrival point for the starship return teleport (col 5, floor 15).

* walk_in_wardrobe **right** the_bathroom: door, open rows 11-14, floor 15 — ending run line (floor 15, flat)
* the_bathroom **right** the_airing_cupboard: door, open rows 11-14, floor 15
* sealed against: the_drawing_room, the_rafters

### Hot Water Bottle Heaven — `the_airing_cupboard` [11,8]

Items: 1, difficulty 1. Warm slatted shelves stepping up like a ladder every 2 rows (14, 12, 10, 8, 6) to a top shelf at row 4 (cols 12-15) right under a loft hatch: the first climb the player meets and a secret two-way shortcut into the attic. Floor-15 doors both sides. A toilet_roll trundles along shelf 10; item on shelf 6.

* the_bathroom **right** the_airing_cupboard: door, open rows 11-14, floor 15
* the_airing_cupboard **right** top_of_the_stairs: door, open rows 11-14, floor 15
* grannys_old_tat **down** the_airing_cupboard: shaft, cols 12-15 — loft hatch (secret): upper room row 15 = gap at cols 12-13 (drop) + one-way floor at cols 14-15 (arrival); lower room rows 0-1 open over cols 12-15 with the top airing shelf at row 4 (cols 12-15)
* sealed against: the_music_room

### Stair Head Case — `top_of_the_stairs` [12,8]

Items: 1, difficulty 2. The grand landing. Floor 15 from the west door; the main staircase descends through the floor at cols 8-11 to the Galleried Landing, and a folding loft ladder (ramp rising right) leaves through the ceiling at cols 24-27 into the attic. East door to the Spare Room at floor 15. A butler patrols the landing; item above the newel post (row 10).

* the_airing_cupboard **right** top_of_the_stairs: door, open rows 11-14, floor 15
* top_of_the_stairs **right** the_spare_room: door, open rows 11-14, floor 15
* top_of_the_stairs **down** the_galleried_landing: stairs, cols 8-9, rise left — grand staircase, upper flight
* top_of_the_loft_ladder **down** top_of_the_stairs: stairs, cols 25-26, rise right — folding loft ladder

### Spare Room? Spare Me! — `the_spare_room` [13,8]

Items: 2, difficulty 2. A guest room stuffed with junk nobody wants; dead end east of the landing (west door at floor 15, other walls solid). Leaning suitcases and a wobbly wardrobe make a five-step climb (rows 13, 11, 9, 7, 5) to the wardrobe top where the items hide; a ghost of a forgotten guest floats (v) and a clockwork_mouse runs the floor.

* top_of_the_stairs **right** the_spare_room: door, open rows 11-14, floor 15
* sealed against: the_trophy_room, the_pigeon_loft

### Back Stairs Gossip — `servants_back_stairs` [6,9]

Items: 1, difficulty 2. A narrow zig-zag stairwell: the flight from the Nursery arrives at cols 2-5 and runs down onto a half-landing at row 8, then a second flight descends through the floor at cols 20-23 to the Back Hall. East door at floor 15 to the gallery. A maid sweeps the half-landing, a rat scurries on the bottom floor; item on the half-landing.

* servants_back_stairs **right** the_rogues_gallery: door, open rows 11-14, floor 15
* nursery **down** servants_back_stairs: stairs, cols 3-4, rise left — back stairs, top flight
* servants_back_stairs **down** the_back_hall: stairs, cols 21-22, rise right — back stairs, middle flight

### The Rogues' Gallery — `the_rogues_gallery` [7,9]

Items: 2, difficulty 2. Long gallery of scowling ancestral portraits; picture rails stepped every 2 rows (13, 11, 9, 7) act as ledges. Floor-15 doors at both ends; a clock pendulum swings (v) mid-room and a ghost glides along the upper rail; items on top of two portrait frames.

* servants_back_stairs **right** the_rogues_gallery: door, open rows 11-14, floor 15
* the_rogues_gallery **right** shhh_the_library: door, open rows 11-14, floor 15
* sealed against: aunt_mauds_boudoir, the_conservatory

### Shhh! Bookworms at Work — `shhh_the_library` [8,9]

Items: 2, difficulty 3. Towering bookcases with shelves every 2 rows and a rolling ladder. West door floor 15; the east door (open 7-10) leaves from the shelf at row 11 into the billiard-room gallery. flying_books flap diagonally between the stacks and a spider drops on its thread; items on the top shelves (rows 5 and 7).

* the_rogues_gallery **right** shhh_the_library: door, open rows 11-14, floor 15
* shhh_the_library **right** pot_black_billiard_room: door, open rows 7-10, floor 11 — bookshelf at row 11 leads onto the billiard-room gallery
* sealed against: master_bedroom, the_dining_room

### Pot Black Billiard Room — `pot_black_billiard_room` [9,9]

Items: 2, difficulty 3. A giant green baize table (top at row 11, continuing the gallery floor from the library door) under a hanging lamp; walk off it to the floor (4 rows) and climb back via the cue-rack stool (row 13); a dead end off the library (west door on the row-11 gallery, east wall solid). In the east corner the dumbwaiter hatch: a gap in the floor at cols 26-27 beside a one-way grating at cols 28-29 where the dumbwaiter delivers Wally from the Servery. Two snooker balls (beach_ball, h) roll the table; items above the pockets.

* shhh_the_library **right** pot_black_billiard_room: door, open rows 7-10, floor 11 — bookshelf at row 11 leads onto the billiard-room gallery
* pot_black_billiard_room **down** the_servery: shaft, cols 26-29 — dumbwaiter, upper (secret): upper room row 15 = gap at cols 26-27 (drop) + one-way floor at cols 28-29 (arrival); lower room rows 0-1 open over cols 26-29 with the serving shelf at row 4 (cols 26-29), reached by the servery lift at cols 23-25
* sealed against: walk_in_wardrobe, the_drawing_room

### Drawing a Blank — `the_drawing_room` [10,9]

Items: 1, difficulty 2. Easels, crayons and an unfinished portrait of Wally; a dead end reached only from the Music Room (east door floor 15, west wall solid). A disembodied hand sketches back and forth (h) and a candle bobs (v); easels of rising height (tops at rows 13, 11, 9, 7) lead to the item on the tallest one.

* the_drawing_room **right** the_music_room: door, open rows 11-14, floor 15
* sealed against: the_bathroom, pot_black_billiard_room, gentlemens_smoking_room

### Chopsticks Concerto — `the_music_room` [11,9]

Items: 2, difficulty 2. A grand piano (stool at row 13, lid at row 11), a harp (row 9) and a chandelier hanging at row 7. A metronome pendulum ticks (v) and a bat flits diagonally under the chandelier; floor-15 doors both sides; items on the piano lid and the chandelier.

* the_drawing_room **right** the_music_room: door, open rows 11-14, floor 15
* the_music_room **right** the_galleried_landing: door, open rows 11-14, floor 15
* sealed against: the_airing_cupboard, the_cloakroom

### A Landing Strip — `the_galleried_landing` [12,9]

Items: 1, difficulty 2. Balustraded landing: one straight grand staircase rising LEFT crosses the room - it arrives from the Great Hall below with ramp cells (23,15) and (22,14) and climbs up-left to (9,1) and (8,0) into Top of the Stairs. Floor-15 doors west (Music Room) and east (Trophy Room); the floor passes under the stairs. A knight clanks along the landing (h); item on the balustrade rail.

* the_music_room **right** the_galleried_landing: door, open rows 11-14, floor 15
* the_galleried_landing **right** the_trophy_room: door, open rows 11-14, floor 15
* top_of_the_stairs **down** the_galleried_landing: stairs, cols 8-9, rise left — grand staircase, upper flight
* the_galleried_landing **down** the_great_hall: stairs, cols 22-23, rise left — grand staircase, lower flight

### The Stuffed Shirt Trophy Room — `the_trophy_room` [13,9]

Items: 2, difficulty 3. Stuffed stags' heads and a moth-eaten tiger rug; mounted antlers are nasty spikes along the upper wall. Floor-15 doors west (landing) and east through the French windows onto the Rose Terrace (a shortcut to the grounds). A cat stalks the floor and a stuffed parrot swoops diagonally; a gun cabinet and trunks step up every 2 rows to the items between the antlers (row 5).

* the_galleried_landing **right** the_trophy_room: door, open rows 11-14, floor 15
* the_trophy_room **right** the_rose_terrace: door, open rows 11-14, floor 15 — French windows onto the terrace
* sealed against: the_spare_room, the_front_porch

### Back Hall Bedlam — `the_back_hall` [6,10]

Items: 1, difficulty 2. Coat pegs and umbrella stands. The back stairs come down at cols 20-23 onto floor 15; a second flight in the west corner descends through the floor at cols 4-7 to the Boot Room. East door floor 15 to the conservatory. A vacuum cleaner roars along the floor; item on a hat peg (row 9) above the boot bench (row 13) and hat shelf (row 11).

* the_back_hall **right** the_conservatory: door, open rows 11-14, floor 15
* servants_back_stairs **down** the_back_hall: stairs, cols 21-22, rise right — back stairs, middle flight
* the_back_hall **down** the_boot_room: stairs, cols 5-6, rise left — back stairs, bottom flight

### Hothouse Flowers — `the_conservatory` [7,10]

Items: 1, difficulty 2. Glass roof, potted palms and hanging baskets as ledges every 2 rows (13, 11, 9, 7). A flytrap snaps (v) in the big pot and a butterfly drifts diagonally; floor-15 doors both sides; item in the top hanging basket.

* the_back_hall **right** the_conservatory: door, open rows 11-14, floor 15
* the_conservatory **right** the_dining_room: door, open rows 11-14, floor 15
* sealed against: the_rogues_gallery, the_laundry

### Soup of the Day — `the_dining_room` [8,10]

Items: 2, difficulty 2. A long banquet table (top at row 11, chairs at row 13) and a chandelier hanging at row 9 above it. Plates spin along the table (plate, h) and a champagne cork pops (v); floor-15 doors both sides; items on the table end and the chandelier.

* the_conservatory **right** the_dining_room: door, open rows 11-14, floor 15
* the_dining_room **right** the_servery: door, open rows 11-14, floor 15
* sealed against: shhh_the_library, the_turkish_bath

### Service With a Smirk — `the_servery` [9,10]

Items: 1, difficulty 2. Hot plates and serving hatches: the dumbwaiter lift (cols 23-25) rides between floor 15 and a serving shelf at row 4 (cols 26-29) under the billiard-room hatch; a hatch in the floor (gap cols 18-19, one-way grating cols 20-21) leads down to the Kitchen. Floor-15 doors west and east. A teapot waddles on the counter; item on the serving shelf.

* the_dining_room **right** the_servery: door, open rows 11-14, floor 15
* the_servery **right** gentlemens_smoking_room: door, open rows 11-14, floor 15
* pot_black_billiard_room **down** the_servery: shaft, cols 26-29 — dumbwaiter, upper (secret): upper room row 15 = gap at cols 26-27 (drop) + one-way floor at cols 28-29 (arrival); lower room rows 0-1 open over cols 26-29 with the serving shelf at row 4 (cols 26-29), reached by the servery lift at cols 23-25
* the_servery **down** the_kitchen: shaft, cols 18-21 — dumbwaiter, lower (secret): upper room row 15 = gap at cols 18-19 (drop) + one-way floor at cols 20-21 (arrival); lower room rows 0-1 open over cols 18-21 with the pass shelf at row 4 (cols 18-21), reached by the kitchen lift at cols 22-24

### Pipe Dreams — `gentlemens_smoking_room` [10,10]

Items: 1, difficulty 2. Leather armchairs (tops at row 13), a sideboard (row 11), a mantelpiece at row 9 and a fug of pipe smoke. Smoke rings (bubble) rise (v) and a butler with a cigar tray paces; floor-15 doors both sides; item on the mantelpiece.

* the_servery **right** gentlemens_smoking_room: door, open rows 11-14, floor 15
* gentlemens_smoking_room **right** the_cloakroom: door, open rows 11-14, floor 15
* sealed against: the_drawing_room, the_scullery

### Cloak and Dagger Room — `the_cloakroom` [11,10]

Items: 1, difficulty 2. Coats, galoshes and the servants' stair: a flight descends through the floor at cols 24-27 to the Servants' Hall. Floor-15 doors west and east. A roller_skate rolls the floor; item in the hat rack (row 9) above a bench (row 13) and a shelf (row 11).

* gentlemens_smoking_room **right** the_cloakroom: door, open rows 11-14, floor 15
* the_cloakroom **right** the_great_hall: door, open rows 11-14, floor 15
* the_cloakroom **down** servants_hall: stairs, cols 25-26, rise right — servants' stair
* sealed against: the_music_room

### The Not-So-Great Hall — `the_great_hall` [12,10]

Items: 1, difficulty 1. Double-height entrance hall: the grand staircase sweeps in from above at cols 22-23. Wide doors west (floor 15) and east to the porch (open 10-14). A slow knight patrols; item on the mantel. Deliberately easy: the junction to the grounds. The grand staircase leaves through the ceiling rising LEFT with top ramp cells (23,1) and (22,0): from the floor it climbs right to a half-landing at the east wall, then turns back up-left (switchback).

* the_cloakroom **right** the_great_hall: door, open rows 11-14, floor 15
* the_great_hall **right** the_front_porch: door, open rows 10-14, floor 15
* the_galleried_landing **down** the_great_hall: stairs, cols 22-23, rise left — grand staircase, lower flight
* sealed against: the_boiler_room

### Mind the Doorstep — `the_front_porch` [13,10]

Items: 1, difficulty 1. Pillared porch with a boot scraper and milk bottles; tall doorways west and east (open 10-14). A cat pads about; item on top of a milk-crate stack (steps at rows 13 and 11). Signpost: a painted board THE GROUNDS ->.

* the_great_hall **right** the_front_porch: door, open rows 10-14, floor 15
* the_front_porch **right** the_gravel_drive: door, open rows 10-14, floor 15 — front door
* sealed against: the_trophy_room, the_coal_hole

### Boots and All — `the_boot_room` [6,11]

Items: 1, difficulty 2. Wellies, fishing rods and a bricked-up back door (the builders again - note the sign WAS: TO THE BEACH). The back stairs arrive from above; floor-15 door east (Laundry); the west edge is solid wall. A wet dog pads the floor (h); item on a shelf above the rods (row 9), reached from the boot bench (row 13) and the rod rack (row 11).

* the_boot_room **right** the_laundry: door, open rows 11-14, floor 15
* the_back_hall **down** the_boot_room: stairs, cols 5-6, rise left — back stairs, bottom flight

### Mangle Tangle — `the_laundry` [7,11]

Items: 1, difficulty 3. Steam, a mangle and washing lines strung every 2 rows (13, 11, 9, 7; one-way ledges). A drip falls from the sheets (v, fast) and the mangle rollers pound (crusher, v); floor-15 doors both sides; item pegged on the top washing line.

* the_boot_room **right** the_laundry: door, open rows 11-14, floor 15
* the_laundry **right** the_turkish_bath: door, open rows 11-14, floor 15
* sealed against: the_conservatory

### The Turkish Bath (Drained) — `the_turkish_bath` [8,11]

Items: 1, difficulty 3. Tiled steam room with tiered wooden benches (rows 13, 11, 9, 7) along the west wall and a drained plunge pool (cols 10-21) fenced by a low tiled kerb (wall, row 14) that must be hopped on purpose; the giant brass plughole grate sits in the pool floor at cols 15-16. East wall solid (kitchen behind); west door floor 15. Steam bubbles rise (v); item on the top bench.

*Special:* drain: stepping onto the plughole grate sucks Wally one-way into the sewers (round_the_u_bend). Signposted: a flashing NO RETURN - SEWERS notice and a whirlpool animation on the grate.

* the_laundry **right** the_turkish_bath: door, open rows 11-14, floor 15
* sealed against: the_dining_room, the_kitchen, the_wine_cellar

### Too Many Cooks — `the_kitchen` [9,11]

Items: 2, difficulty 3. Range cooker, copper pans and a meat-hook rail. The chef chops back and forth along the worktop (row 11, stool at row 13), a rat raids the floor; the dumbwaiter lift (cols 22-24) rises from floor 15 to a pass shelf at row 4 (cols 18-21) right under the Servery hatch - the secret shortcut to the first floor. West wall solid, floor-15 door east; items on the pass shelf and on top of the range (row 12).

* the_kitchen **right** the_scullery: door, open rows 11-14, floor 15
* the_servery **down** the_kitchen: shaft, cols 18-21 — dumbwaiter, lower (secret): upper room row 15 = gap at cols 18-19 (drop) + one-way floor at cols 20-21 (arrival); lower room rows 0-1 open over cols 18-21 with the pass shelf at row 4 (cols 18-21), reached by the kitchen lift at cols 22-24
* sealed against: the_turkish_bath, the_bottling_line

### Scrub-a-Dub Scullery — `the_scullery` [10,11]

Items: 1, difficulty 2. Stone sinks, a pump and the cellar steps: a flight descends through the floor at cols 20-23 into the cellars. Floor-15 doors both sides. A plate skids along the draining board (h) and a drip falls from the pump; item on the plate rack. Signpost: chalked CELLARS arrow.

* the_kitchen **right** the_scullery: door, open rows 11-14, floor 15
* the_scullery **right** servants_hall: door, open rows 11-14, floor 15
* the_scullery **down** cellar_steps: stairs, cols 21-22, rise right — cellar steps
* sealed against: gentlemens_smoking_room

### Servants' Knees-Up — `servants_hall` [11,11]

Items: 1, difficulty 2. Long refectory table (row 13) and a board of service bells. The servants' stair arrives from the Cloakroom at cols 24-27. Floor-15 doors both sides. A butler walks the floor and a maid walks the table top; item hanging from the bell board (row 9) above the table.

* the_scullery **right** servants_hall: door, open rows 11-14, floor 15
* servants_hall **right** the_boiler_room: door, open rows 11-14, floor 15
* the_cloakroom **down** servants_hall: stairs, cols 25-26, rise right — servants' stair
* sealed against: the_stilton_store

### Boiling Point — `the_boiler_room` [12,11]

Items: 1, difficulty 3. A clanking boiler with pipe runs as ledges every 2 rows (13, 11, 9, 7, 5) and hissing valves (flashing nasties) on the pipes. A fan whirrs (v) and a clockwork_mouse runs the floor; floor-15 doors both sides; item behind the boiler on the top pipe.

* servants_hall **right** the_boiler_room: door, open rows 11-14, floor 15
* the_boiler_room **right** the_coal_hole: door, open rows 11-14, floor 15
* sealed against: the_great_hall, the_family_crypt

### Coal Hole Rigmarole — `the_coal_hole` [13,11]

Items: 1, difficulty 3. Coal heaps as ramps and the coal chute: a gap in the floor at cols 6-7 drops one-way into the Coal Cellar (stencilled COAL - DOWN ONLY). Floor-15 doors west (Boiler Room) and east (the sunken garden). A rat and a rolling coal lump (boulder, h); item atop the heap.

* the_boiler_room **right** the_coal_hole: door, open rows 11-14, floor 15
* the_coal_hole **right** ha_ha_the_sunken_garden: door, open rows 11-14, floor 15
* the_coal_hole **down** the_coal_cellar: drop, cols 6-7 — coal chute, one-way down; lands on the coal heap at row 4
* sealed against: the_front_porch

## Region: roof (14 rooms, 18 items)

*Placement:* attic r7 cols 6-13, roof r6 cols 7-12  
*Signature:* pitched-roof ramps and wind/slate arrows; the west attic is only reachable over the roof (skylight)  
*Difficulty:* 2-4

### Sooty Chimney Stacks — `sooty_chimney_stacks` [7,6]

Items: 1, difficulty 3. West end of the roof: a cluster of chimney pots (walls) with sooty ramps between them. The skylight is in the floor (gap cols 12-13 drops to Mothball Alley, one-way glass at cols 14-15 where climbers arrive); the observatory rope hangs here from row 0 at cols 22-23 up into the Stargazer's Dome, with a one-way chimney-pot cap at row 5 (cols 24-27) catching anyone dropping back and shorter pots (rows 9, 13) stepping back down. East door (open 8-11) onto the slates. A pigeon swoops, a spider dangles; item atop the tallest pot.

* sooty_chimney_stacks **right** slippery_slates: door, open rows 8-11, floor 12
* sooty_chimney_stacks **down** mothball_alley: shaft, cols 12-15 — skylight: upper room row 15 = gap at cols 12-13 (drop) + one-way floor at cols 14-15 (arrival); lower room rows 0-1 open over cols 12-15 with the sheeted wardrobe top at row 4 (cols 12-15)
* stargazers_dome **down** sooty_chimney_stacks: rope, cols 22-23 — observatory rope; drop-back gap in the dome at cols 24-25 onto the chimney-pot top at row 5

### Slippery Slates — `slippery_slates` [8,6]

Items: 2, difficulty 4. A steep pitched roof: a ramp rises from the west door (floor 12) to the ridge at row 4, then falls to the gutter door at floor 15 on the east. Loose slates slide down as arrows (left, row 9) and a seagull swoops diagonally; items on the ridge tiles.

* sooty_chimney_stacks **right** slippery_slates: door, open rows 8-11, floor 12
* slippery_slates **right** life_in_the_gutter: door, open rows 11-14, floor 15
* sealed against: dads_model_railway

### Life in the Gutter — `life_in_the_gutter` [9,6]

Items: 1, difficulty 3. A long lead gutter (floor 15) full of leaves and rain puddles (nasties) between two roof pitches. Floor-15 doors both sides; a snail crawls along and a pigeon flaps (v); item in the downpipe hopper (row 10).

* slippery_slates **right** life_in_the_gutter: door, open rows 11-14, floor 15
* life_in_the_gutter **right** bell_tower_buttress: door, open rows 11-14, floor 15
* sealed against: the_cold_water_tank

### Bell Tower Buttress — `bell_tower_buttress` [10,6]

Items: 1, difficulty 3. Where the roof meets the stone bell tower. A bell rope hangs from row 0 to row 12 at cols 12-13: grab it to climb into the Bell Ringers' Loft; a buttress ledge at row 4 (cols 8-11) catches anyone dropping back, with corbels (rows 8, 12) stepping down. West door floor 15; a buttress ramp rises to the east door (open 5-8). A bat patrols; item on the buttress top.

* life_in_the_gutter **right** bell_tower_buttress: door, open rows 11-14, floor 15
* bell_tower_buttress **right** aerial_alley: door, open rows 5-8, floor 9
* bell_ringers_loft **down** bell_tower_buttress: rope, cols 12-13 — bell rope; drop-back gap in the loft at cols 10-11 onto the buttress ledge at row 4
* sealed against: the_rafters

### Aerial Alley — `aerial_alley` [11,6]

Items: 2, difficulty 4. A forest of 1980s TV aerials (thin wall stalks with nasty tips) on a flat roof at row 9; doors both at open 5-8. A crow (bird) swoops diagonally and a gust (arrow, right, row 6) sweeps across; items balanced on aerial crossbars (row 5), reached from lower crossbars (row 7).

* bell_tower_buttress **right** aerial_alley: door, open rows 5-8, floor 9
* aerial_alley **right** weathercock_ridge: door, open rows 5-8, floor 9
* sealed against: grannys_old_tat

### Weathercock Ridge — `weathercock_ridge` [12,6]

Items: 1, difficulty 4. The east ridge with a giant weathercock. The loft ladder comes up through the floor at cols 4-7; the silo gantry stairs climb out of the ceiling at cols 20-23. West door open 5-8. Gusts (arrows, rows 6 and 10, opposite directions) and the spinning weathercock (bird, v); item on the weathercock.

* aerial_alley **right** weathercock_ridge: door, open rows 5-8, floor 9
* weathercock_ridge **down** top_of_the_loft_ladder: stairs, cols 5-6, rise left — second loft ladder out through a roof hatch
* countdown_silo **down** weathercock_ridge: stairs, cols 21-22, rise right — silo gantry stairs

### Boxing Clever — `the_box_room` [6,7]

Items: 1, difficulty 3. Tea chests stacked to the rafters at the far west of the attic. East door floor 15; a trapdoor at cols 26-27 drops one-way into the Nursery (chalked KIDS KEEP OUT - a quick way home). A spider on a thread (v) and a clockwork_mouse; tea chests stepped every 2 rows lead to the item on the top chest (row 5).

* the_box_room **down** nursery: drop, cols 26-27 — trapdoor, one-way down onto the toy-chest lid (row 4)
* the_box_room **right** mothball_alley: door, open rows 11-14, floor 15

### Mothball Alley — `mothball_alley` [7,7]

Items: 1, difficulty 3. Dust-sheeted furniture and a rail of moth-eaten furs. The skylight above (cols 12-15) links to the Sooty Chimney Stacks: a sheeted wardrobe at row 4 (cols 12-15) catches droppers and is the jump-off ledge back up; dust-sheeted furniture steps (every 2 rows) link it to the floor. Floor-15 doors both sides; moths (butterfly) flutter diagonally; item on the wardrobe.

* the_box_room **right** mothball_alley: door, open rows 11-14, floor 15
* mothball_alley **right** dads_model_railway: door, open rows 11-14, floor 15
* sooty_chimney_stacks **down** mothball_alley: shaft, cols 12-15 — skylight: upper room row 15 = gap at cols 12-13 (drop) + one-way floor at cols 14-15 (arrival); lower room rows 0-1 open over cols 12-15 with the sheeted wardrobe top at row 4 (cols 12-15)
* sealed against: aunt_mauds_boudoir

### Dad's Model Railway — `dads_model_railway` [8,7]

Items: 2, difficulty 3. Trestle tables of model railway at rows 13 and 11 with a running track (right conveyor, row 11) and a signal-box roof at row 9 and tiny level crossings. A clockwork_mouse rides the track and a toy_soldier guards the station; floor-15 doors both sides; items in the tunnel mouths.

* mothball_alley **right** dads_model_railway: door, open rows 11-14, floor 15
* dads_model_railway **right** the_cold_water_tank: door, open rows 11-14, floor 15
* sealed against: master_bedroom, slippery_slates

### Tank Top — `the_cold_water_tank` [9,7]

Items: 1, difficulty 3. A huge galvanised tank (wall sides from row 7 down, water surface nasty) climbed by one-way rungs every 2 rows up its west side and crossed by hopping along its rim at row 6. West door floor 15; east wall solid (chimney breast). A drip falls from the ballcock (v) and a rubber_duck floats (h); item on the ballcock arm.

* dads_model_railway **right** the_cold_water_tank: door, open rows 11-14, floor 15
* sealed against: the_rafters, walk_in_wardrobe, life_in_the_gutter

### Raising the Rafters — `the_rafters` [10,7]

Items: 1, difficulty 2. Joists and loft insulation right above the Bathroom; dead end (west wall is the chimney breast, floor-15 door east). Sloping rafters (ramps) lead to beams at rows 5 and 9; a bat hangs and drops (v); item on the highest beam.

* the_rafters **right** grannys_old_tat: door, open rows 11-14, floor 15
* sealed against: the_cold_water_tank, the_bathroom, bell_tower_buttress

### Granny's Old Tat — `grannys_old_tat` [11,7]

Items: 1, difficulty 2. Knitting baskets, a stuffed owl and a dressmaker's dummy. The loft hatch from the Airing Cupboard is in the floor: a gap at cols 12-13 to drop back down and a one-way board at cols 14-15 where climbers arrive. Floor-15 doors both sides; a yoyo bobs (v) and a cat chases wool (h); item on the dummy's hat.

* grannys_old_tat **down** the_airing_cupboard: shaft, cols 12-15 — loft hatch (secret): upper room row 15 = gap at cols 12-13 (drop) + one-way floor at cols 14-15 (arrival); lower room rows 0-1 open over cols 12-15 with the top airing shelf at row 4 (cols 12-15)
* the_rafters **right** grannys_old_tat: door, open rows 11-14, floor 15
* grannys_old_tat **right** top_of_the_loft_ladder: door, open rows 11-14, floor 15
* sealed against: aerial_alley

### Loft Conversion — `top_of_the_loft_ladder` [12,7]

Items: 1, difficulty 2. The loft ladder arrives through the floor at cols 24-27; a second ladder (ramp rising left) climbs out of a roof hatch at cols 4-7 onto Weathercock Ridge. West door floor 15; the loft ladder tops out at row 11 and joists (rows 9 and 7) lead to the high east door (open 3-6) into the Pigeon Loft. A bat circles; item on the beam.

* top_of_the_loft_ladder **down** top_of_the_stairs: stairs, cols 25-26, rise right — folding loft ladder
* grannys_old_tat **right** top_of_the_loft_ladder: door, open rows 11-14, floor 15
* top_of_the_loft_ladder **right** the_pigeon_loft: door, open rows 3-6, floor 7 — high beam door
* weathercock_ridge **down** top_of_the_loft_ladder: stairs, cols 5-6, rise left — second loft ladder out through a roof hatch

### The Pigeon Loft — `the_pigeon_loft` [13,7]

Items: 2, difficulty 3. Racing-pigeon coops in tiers (one-way ledges at rows 9, 11, 13). Entered high from the west (floor 7); step down tier by tier to the floor 8 rows below the door and hop back up the same tiers (2-row rises) to leave. Pigeons (bird) swoop diagonally between coops; items in the top and bottom coops. Dead end.

* top_of_the_loft_ladder **right** the_pigeon_loft: door, open rows 3-6, floor 7 — high beam door
* sealed against: the_spare_room

## Region: towers (4 rooms, 9 items)

*Placement:* observatory (7,5), bell tower (10,5)-(10,4), rocket silo (12,5)  
*Signature:* ropes (bell ropes, observatory rope); rocket launch  
*Difficulty:* 4-5

### Ding Dong Belfry — `ding_dong_belfry` [10,4]

Items: 3, difficulty 5. Top of the tower: arrive by rope from the loft at cols 18-19 (floor 15 there, drop-back gap at cols 20-21), then climb stone corbels every 2 rows to a narrow beam at row 7 under two great swinging bells (pendulum, v); open arches, and slipping off the far end of the beam is a fatal fall. Bats swoop diagonally; three items on the bell headstock (row 4) and in the arches.

* ding_dong_belfry **down** bell_ringers_loft: rope, cols 18-19 — bell rope; drop-back gap in the belfry at cols 20-21 onto the loft ledge at row 4

### Stargazer's Dome — `stargazers_dome` [7,5]

Items: 2, difficulty 4. A brass telescope under a slatted dome; reached only by the rope from the chimney stacks (arrive on floor 15 at cols 22-23, a gap beside it at cols 24-25 drops back). The telescope tube is a ramp up to a row-5 eyepiece platform. An owl glides diagonally and a star twinkles (v); items on the eyepiece and a star-chart shelf. Dead end.

* stargazers_dome **down** sooty_chimney_stacks: rope, cols 22-23 — observatory rope; drop-back gap in the dome at cols 24-25 onto the chimney-pot top at row 5

### The Bell Ringers' Loft — `bell_ringers_loft` [10,5]

Items: 1, difficulty 4. Under the bells. Arrival from the roof below is by the roof room's rope (arrive on floor 15 at cols 12-13, drop back through the gap at cols 10-11). This room's ONE rope hangs at cols 18-19 and climbs on into the belfry above (a ledge at row 4, cols 20-23, catches drops from above and steps down by corbels at rows 7 and 10). Two pendulum guardians (v, 'pendulum') swing as the clappers; timing jumps between the corbels is the test. A bat flies (v); item between the corbels at row 7.

* bell_ringers_loft **down** bell_tower_buttress: rope, cols 12-13 — bell rope; drop-back gap in the loft at cols 10-11 onto the buttress ledge at row 4
* ding_dong_belfry **down** bell_ringers_loft: rope, cols 18-19 — bell rope; drop-back gap in the belfry at cols 20-21 onto the loft ledge at row 4

### Countdown Silo — `countdown_silo` [12,5]

Items: 3, difficulty 4. A round silo with a stubby red rocket in the middle. Gantry stairs come up through the floor at cols 20-23; gantry ledges every 2 rows (13, 11, 9, 7, 5) ring the rocket with three items. A spring bounces (v) and a fan whirrs (v) on the gantries. Once all three items are taken the capsule door (cols 14-17, row 11) opens.

*Special:* rocket: when all items in this room are collected, the rocket flashes and the capsule opens; stepping into it launches Wally one-way to rocket_park (clock stops during the flight). Signposted by a flashing T-MINUS / ONE WAY panel; until Wally steps in he can still leave down the gantry stairs.

* countdown_silo **down** weathercock_ridge: stairs, cols 21-22, rise right — silo gantry stairs

## Region: cellars (10 rooms, 12 items)

*Placement:* r12 cols 8-17, running east under the grounds  
*Signature:* conveyors (bottling line) and crossbow arrows; the trip switch at the far east end  
*Difficulty:* 2-4

### The Vintage Whine Cellar — `the_wine_cellar` [8,12]

Items: 1, difficulty 3. Racks of dusty bottles form tiered ledges every 2 rows (13, 11, 9, 7); dead end at the west of the cellar corridor (floor-15 east door). Champagne bottles pop (v) and a barrel rolls the floor; item on the top rack.

* the_wine_cellar **right** the_bottling_line: door, open rows 11-14, floor 15
* sealed against: the_turkish_bath

### Bottleneck — `the_bottling_line` [9,12]

Items: 2, difficulty 3. The cellar signature room: a bottling machine of conveyor belts - the floor is a left conveyor for cols 6-25 and an upper belt at row 9 runs right, reached by crates at rows 13 and 11. Floor-15 doors both sides. A barrel rides the top belt and a champagne bottle bounces (v); items at the ends of the upper belt.

* the_wine_cellar **right** the_bottling_line: door, open rows 11-14, floor 15
* the_bottling_line **right** cellar_steps: door, open rows 11-14, floor 15
* sealed against: the_kitchen

### Steps in the Dark — `cellar_steps` [10,12]

Items: 1, difficulty 2. The scullery flight arrives through the ceiling at cols 20-23 onto floor 15. Floor-15 doors both sides. Easy junction: a rat scurries and a candle flickers (v); item on a candle bracket. Chalked arrows: WINE <-  -> CRYPT & SWITCH.

* the_scullery **down** cellar_steps: stairs, cols 21-22, rise right — cellar steps
* the_bottling_line **right** cellar_steps: door, open rows 11-14, floor 15
* cellar_steps **right** the_stilton_store: door, open rows 11-14, floor 15

### Say Cheese! — `the_stilton_store` [11,12]

Items: 1, difficulty 3. Wheels of ripening cheese on slatted shelves; a green stink cloud (flashing nasties) hangs at rows 6-7. The mine escape hatch comes up through a one-way floor at cols 22-23. Floor-15 doors both sides; a rat and a clockwork_mouse; item on the top cheese.

* cellar_steps **right** the_stilton_store: door, open rows 11-14, floor 15
* the_stilton_store **right** the_family_crypt: door, open rows 11-14, floor 15
* the_stilton_store **down** canary_corner: climb, cols 22-23 — escape hatch, one-way up through a one-way floor; prop ledge at row 3 in Canary Corner
* sealed against: servants_hall

### Dead Relatives — `the_family_crypt` [12,12]

Items: 1, difficulty 4. Stone tombs of Wally's ancestors (tops at row 13) and a raised sarcophagus (row 11) and crossbow traps: arrows sweep right at row 9 and left at row 13. A skeleton rises from a tomb (v) and a ghost drifts; floor-15 doors both sides; item in a high niche (row 8) above the sarcophagus.

* the_stilton_store **right** the_family_crypt: door, open rows 11-14, floor 15
* the_family_crypt **right** the_coal_cellar: door, open rows 11-14, floor 15
* sealed against: the_boiler_room, seam_of_despair

### Cellar Dwellers — `the_coal_cellar` [13,12]

Items: 1, difficulty 3. The coal chute drops in at cols 6-7 onto a coal heap at row 4 (safe landing) that slopes down as ramps to floor 15. The pit-cage shaft is in the floor (gap cols 16-17, one-way grating cols 18-19 where the cage delivers climbers). Floor-15 doors both sides. A mole and a rolling boulder; item on the heap summit.

* the_coal_hole **down** the_coal_cellar: drop, cols 6-7 — coal chute, one-way down; lands on the coal heap at row 4
* the_family_crypt **right** the_coal_cellar: door, open rows 11-14, floor 15
* the_coal_cellar **right** knuckle_bone_alley: door, open rows 11-14, floor 15
* the_coal_cellar **down** the_pit_cage: shaft, cols 16-19 — pit cage: upper room row 15 = gap at cols 16-17 (drop) + one-way floor at cols 18-19 (arrival); lower room rows 0-1 open over cols 16-19 with the headframe landing at row 4 (cols 16-19), reached by the cage lift at cols 12-14

### Knuckle Bone Alley — `knuckle_bone_alley` [14,12]

Items: 1, difficulty 3. An ossuary passage with walls of stacked skulls; bone shelves every 2 rows (13, 11, 9, 7). A skeleton walks the floor and a skull bounces (v); floor-15 doors both sides; item in a skull niche (row 5).

* the_coal_cellar **right** knuckle_bone_alley: door, open rows 11-14, floor 15
* knuckle_bone_alley **right** drip_drip_drip: door, open rows 11-14, floor 15
* sealed against: dynamite_depot, ha_ha_the_sunken_garden

### Drip, Drip, Drip — `drip_drip_drip` [15,12]

Items: 1, difficulty 3. A leaking passage under the grounds: three drips fall (v, fast) onto puddle nasties along floor 15; stepping stones at row 13 avoid the puddles. Floor-15 doors both sides; item behind the heaviest drip.

* knuckle_bone_alley **right** drip_drip_drip: door, open rows 11-14, floor 15
* drip_drip_drip **right** fuse_box_of_doom: door, open rows 11-14, floor 15
* sealed against: stalactite_street

### Fuse Box of Doom — `fuse_box_of_doom` [16,12]

Items: 1, difficulty 4. The estate's electrical heart: a humming fuse box with the big TRIP SWITCH lever on a row-5 ledge, reached by jumping up junction-box ledges every 2 rows (13, 11, 9, 7) whose sparking caps are flashing nasties. West door floor 15; east door open 8-11. A fan whirrs (v) and a saw spins (h) along the row-11 conduit; item beside the lever.

*Special:* trip_switch: touching the lever (row 4, cols 20-21) throws it; it stays thrown after death. Effects (signposts): the lighthouse lamp starts flashing and the yacht raises its sail - the yacht can now sail to the island.

* drip_drip_drip **right** fuse_box_of_doom: door, open rows 11-14, floor 15
* fuse_box_of_doom **right** under_the_conker_roots: door, open rows 8-11, floor 12

### Under the Conker Roots — `under_the_conker_roots` [17,12]

Items: 2, difficulty 4. East end of the cellars: gnarled roots burst through the ceiling. West door open 8-11; root ledges every 2 rows climb to a root shelf at row 3 (cols 8-11) under a crack in the ceiling - a secret shaft up into the Tangled Roots of the conker tree (drop back the same way onto the shelf). Worms and a mole; items tangled in the roots.

* fuse_box_of_doom **right** under_the_conker_roots: door, open rows 8-11, floor 12
* tangled_roots **down** under_the_conker_roots: shaft, cols 8-11 — secret root shaft: upper room row 15 = gap at cols 8-9 (drop) + one-way floor at cols 10-11 (arrival); lower room rows 0-1 open over cols 8-11 with the root shelf at row 3 (cols 8-11)
* sealed against: well_beyond_help

## Region: mines (8 rooms, 12 items)

*Placement:* r13 cols 11-15, r14 cols 12-14  
*Signature:* lifts (pit cage, grotto lift) and crushers  
*Difficulty:* 3-5

### Canary Corner — `canary_corner` [11,13]

Items: 1, difficulty 4. A miners' refuge with a caged canary. Pit props stepped every 2 rows lead to a prop ledge at row 3 under a hatch at cols 22-23 is the one-way escape climb up into the Stilton Store (signposted WAY OUT). Floor-15 door east only. The canary (bird) flaps in its cage (v) and a ghost_miner walks; item on the cage.

* the_stilton_store **down** canary_corner: climb, cols 22-23 — escape hatch, one-way up through a one-way floor; prop ledge at row 3 in Canary Corner
* canary_corner **right** seam_of_despair: door, open rows 11-14, floor 15

### Seam of Despair — `seam_of_despair` [12,13]

Items: 2, difficulty 4. A coal-seam tunnel. In the west the grotto lift shaft opens in the floor (gap cols 4-5, one-way grating cols 6-7 where the grotto lift delivers climbers). Floor-15 doors both sides; a pickaxe swings (v) and a minecart rattles along rails at floor 15; items above the rails.

* canary_corner **right** seam_of_despair: door, open rows 11-14, floor 15
* seam_of_despair **right** the_pit_cage: door, open rows 11-14, floor 15
* seam_of_despair **down** glow_worm_grotto: shaft, cols 4-7 — grotto lift: upper room row 15 = gap at cols 4-5 (drop) + one-way floor at cols 6-7 (arrival); lower room rows 0-1 open over cols 4-7 with the rock shelf at row 4 (cols 4-7), reached by the grotto lift at cols 8-10
* sealed against: the_family_crypt

### The Pit Cage — `the_pit_cage` [13,13]

Items: 1, difficulty 3. Mines signature: the miners' cage lift (lift, cols 12-14) shuttles between floor 15 and a headframe landing at row 4 (cols 16-19) that sits under the Coal Cellar shaft - droppers land on it, climbers jump up from it. Floor-15 doors both sides; a lantern bobs (v); item on the headframe.

* the_coal_cellar **down** the_pit_cage: shaft, cols 16-19 — pit cage: upper room row 15 = gap at cols 16-17 (drop) + one-way floor at cols 18-19 (arrival); lower room rows 0-1 open over cols 16-19 with the headframe landing at row 4 (cols 16-19), reached by the cage lift at cols 12-14
* seam_of_despair **right** the_pit_cage: door, open rows 11-14, floor 15
* the_pit_cage **right** dynamite_depot: door, open rows 11-14, floor 15
* sealed against: echo_chamber

### Dynamite Depot — `dynamite_depot` [14,13]

Items: 2, difficulty 4. Crates of TNT stacked in 2-row steps up to the high east door; lit fuses are flashing nasties. A plank ramp descends through the floor at cols 26-29 to the Coal Face. West door floor 15; east door open 7-10 to Stalactite Street. Dynamite sticks hop (v) and a miner_bot trundles; items on the crates.

* the_pit_cage **right** dynamite_depot: door, open rows 11-14, floor 15
* dynamite_depot **right** stalactite_street: door, open rows 7-10, floor 11
* dynamite_depot **down** ee_by_gum_coal_face: stairs, cols 27-28, rise right — plank ramp
* sealed against: knuckle_bone_alley

### Stalactite Street — `stalactite_street` [15,13]

Items: 2, difficulty 5. Dead-end cavern entered at floor 11 from the west: narrow ledges at row 11 over a glowing pool (nasty, row 15), stalactites falling (stalactite, v, fast) and a cave_bat swooping diagonally; items on the ledges between the drops.

* dynamite_depot **right** stalactite_street: door, open rows 7-10, floor 11
* sealed against: drip_drip_drip

### Glow-Worm Grotto — `glow_worm_grotto` [12,14]

Items: 2, difficulty 4. Dark cavern lit by glowworms; a lift (cols 8-10) rides from floor 15 to a rock shelf at row 4 (cols 4-7) under the Seam of Despair shaft. Floor-15 door east; west is rock. Glowworms crawl along rock ledges (rows 13, 11, 9), a cave_spider drops; items on the glowing ledges.

* glow_worm_grotto **right** echo_chamber: door, open rows 11-14, floor 15
* seam_of_despair **down** glow_worm_grotto: shaft, cols 4-7 — grotto lift: upper room row 15 = gap at cols 4-5 (drop) + one-way floor at cols 6-7 (arrival); lower room rows 0-1 open over cols 4-7 with the rock shelf at row 4 (cols 4-7), reached by the grotto lift at cols 8-10

### Hello? Hello? Hello? — `echo_chamber` [13,14]

Items: 1, difficulty 3. A domed cave built as two mirrored halves; doors both at floor 15. Guardians come in mirrored pairs: two cave_bats crossing diagonally; stalagmite steps (rows 13, 11, 9) lead to the item on its tip (row 7).

* glow_worm_grotto **right** echo_chamber: door, open rows 11-14, floor 15
* echo_chamber **right** ee_by_gum_coal_face: door, open rows 11-14, floor 15
* sealed against: the_pit_cage

### Ee By Gum Coal Face — `ee_by_gum_coal_face` [14,14]

Items: 1, difficulty 4. The deepest working: the plank ramp from Dynamite Depot comes down through the ceiling (stairs rising right, ramp cells (27,15)/(28,14) continuing the flight). A crusher pounds (v) at the coal face and a miner_bot trundles (h); the old winze at the far end has caved in (solid rock). West door floor 15; item on a coal truck.

* echo_chamber **right** ee_by_gum_coal_face: door, open rows 11-14, floor 15
* dynamite_depot **down** ee_by_gum_coal_face: stairs, cols 27-28, rise right — plank ramp

## Region: well (3 rooms, 6 items)

*Placement:* a garden well under the riverbank: col 18, rows 11-13 (well head, shaft, bottom)  
*Signature:* rope descent; overshooting the rope = comic fatal plunge with a guaranteed safe respawn at the well head  
*Difficulty:* 4-5

### Drop Me a Line — `drop_me_a_line` [18,11]

Items: 1, difficulty 4. The well head beneath the reeds. Dropping in from the riverbank (gap cols 16-17) lands on a row-4 ledge (cols 16-21) that steps down by mossy stones (rows 7, 10) to the rim (floor 13-15). The winch rope (cols 14-15) hangs from row 0 to row 11 for the climb back up to the riverbank. The rim (floor 15, cols 8-21) surrounds the well mouth (gap cols 22-27): drop in beside the shaft rope top (cols 20-21), which climbs back from Well Beyond Help. Sealed west (tree roots) and east (river). A spider dangles (v) and a drip falls (v); item on the winch.

* the_riverbank **down** drop_me_a_line: rope, cols 14-17 — winch rope at cols 14-15 (arrive back on the riverbank floor there); the well mouth beside it (gap cols 16-17 in the riverbank floor) drops onto the well-head ledge at row 4
* drop_me_a_line **down** well_beyond_help: rope, cols 20-27 — shaft rope at cols 20-21 (arrival floor 15 there); the well mouth beside it (gap cols 22-27) drops onto the row-4 ledge (cols 22-25)
* sealed against: tangled_roots, under_the_bridge

### Well Beyond Help — `well_beyond_help` [18,12]

Items: 2, difficulty 5. A sheer shaft. The shaft rope (cols 20-21) hangs from row 0 to row 12 and climbs back to the well head; a mossy ledge at row 4 (cols 22-25) catches careful droppers from the well mouth, and west-wall ledges (rows 7, 10, 13; never more than 3 rows apart) lead down and back up; the items sit on them. At the bottom, a floor-15 ledge (cols 4-9) is where the Deep Joy rope arrives; beside it a hole (cols 10-15) drops onto the Deep Joy shelf. Nothing but air below the east side of the row-4 ledge - leaping off it is the comic fatal plunge. Sealed west (cellars) and east.

* drop_me_a_line **down** well_beyond_help: rope, cols 20-27 — shaft rope at cols 20-21 (arrival floor 15 there); the well mouth beside it (gap cols 22-27) drops onto the row-4 ledge (cols 22-25)
* well_beyond_help **down** deep_joy: rope, cols 8-15 — bottom rope at cols 8-9 (arrival floor 15 there); the hole beside it (gap cols 10-15) drops onto the Deep Joy shelf at row 5 (cols 8-15)
* sealed against: under_the_conker_roots

### Deep Joy — `deep_joy` [18,13]

Items: 3, difficulty 5. The well bottom: black water (nasty, row 15) with a rock shelf at row 5 (cols 8-15) that catches a drop from the hole above; stepping stones every 3 rows (rows 8, 11, 14) lead down to a skeleton of a previous adventurer clutching an item. A rope (cols 8-9) climbs from the shelf back up to Well Beyond Help. A frog (h) and drips (v) guard the stones. Three items - the reward for braving the well.

* well_beyond_help **down** deep_joy: rope, cols 8-15 — bottom rope at cols 8-9 (arrival floor 15 there); the hole beside it (gap cols 10-15) drops onto the Deep Joy shelf at row 5 (cols 8-15)

## Region: grounds (20 rooms, 26 items)

*Placement:* cols 14-21, rows 6-11; the conker tree is a 9-room cluster at cols 16-18 (crown r6-7, fork/branches r8, trunk r9-10, roots r11)  
*Signature:* diagonal guardians (bees, birds, owls); the tree adds vines (ropes) and a spiral ramp  
*Difficulty:* 2-5 (drive 2, crow's-eye view 5)

### A Crow's-Eye View — `crows_eye_view` [17,6]

Items: 2, difficulty 5. The very top, swaying in the wind: tiny twig perches over nothing. Arrive by the creeper at cols 10-11 on a floor-15 twig with a gap beside it (cols 8-9) to drop back. Wind gusts (arrows, rows 6 and 10) and a hawk (bird, fast diagonal); twig perches every 2 rows lead to two items at the very top (row 3) with a view of the mansion roof. Hardest room of the grounds.

* crows_eye_view **down** the_leafy_canopy: rope, cols 10-11 — creeper; drop-back gap in the crow's-eye view at cols 8-9 onto the leaf floor at row 4

### The Leafy Canopy — `the_leafy_canopy` [17,7]

Items: 1, difficulty 4. A dense ceiling of leaves with one-way leaf floors at many heights. Arrive from the fork at cols 12-13 (floor 15); east door floor 15 to the Rookery; a creeper (rope, cols 10-11) climbs to A Crow's-Eye View, with a leaf floor at row 4 (cols 6-9) catching drops from above; leaf floors step down (<= 4 rows) and back up (2 rows). Butterflies and bees cross diagonally; item among the leaves at row 4.

* the_leafy_canopy **right** the_rookery: door, open rows 11-14, floor 15
* the_leafy_canopy **down** the_great_fork: climb, cols 12-13 — one-way jump up through the leaves from the knot ledge at row 3
* crows_eye_view **down** the_leafy_canopy: rope, cols 10-11 — creeper; drop-back gap in the crow's-eye view at cols 8-9 onto the leaf floor at row 4

### The Rookery — `the_rookery` [18,7]

Items: 1, difficulty 4. Noisy rooks' nests on the eastern crown. West door floor 15; a gap in the floor at cols 20-21 drops one-way to the Owl's Branch Office - the way back down (sign: DOWN ->). Rooks (bird) swoop diagonally and a squirrel patrols; item in the highest nest.

* the_leafy_canopy **right** the_rookery: door, open rows 11-14, floor 15
* the_rookery **down** owls_branch_office: drop, cols 20-21 — one-way drop through the leaves onto the twig platform at row 4

### Squirrel's Larder — `squirrels_larder` [16,8]

Items: 2, difficulty 4. The west branch tapering to twigs over a long fatal drop: step along thin twig ledges to the squirrel's conker stash at the tip. East door open 9-12 only (dead end). A squirrel runs the branch (h), a bird swoops diagonally; items at the branch tip.

* squirrels_larder **right** the_great_fork: door, open rows 9-12, floor 13

### The Great Fork — `the_great_fork` [17,8]

Items: 1, difficulty 4. Where the trunk splits: the vine from the hollow arrives on floor 15 at cols 15-16 with a gap beside it (cols 17-18) to drop back. Branch doors west (open 9-12) and east (open 5-8). Knots stepped every 2 rows lead to a knot ledge at row 3 under a gap in the leaves (cols 12-13) is a one-way jump up into the canopy. Caterpillars and bees; item in the crotch.

* squirrels_larder **right** the_great_fork: door, open rows 9-12, floor 13
* the_great_fork **right** owls_branch_office: door, open rows 5-8, floor 9
* the_great_fork **down** heart_of_conker: rope, cols 15-16 — vine; drop-back gap in the fork at cols 17-18 onto the knot shelf at row 4
* the_leafy_canopy **down** the_great_fork: climb, cols 12-13 — one-way jump up through the leaves from the knot ledge at row 3

### Owl's Branch Office — `owls_branch_office` [18,8]

Items: 2, difficulty 4. The east branch with an owl's hollow fitted out like an office (filing cabinet!). West door open 5-8; the Rookery drops in through the leaves at cols 20-21 onto a twig platform at row 4 that steps down (row 8) to the branch floor (row 9). An owl glides diagonally and a caterpillar crawls; items in the in-tray and on the twig tip.

* the_great_fork **right** owls_branch_office: door, open rows 5-8, floor 9
* the_rookery **down** owls_branch_office: drop, cols 20-21 — one-way drop through the leaves onto the twig platform at row 4

### Roses Are Red — `the_rose_terrace` [14,9]

Items: 1, difficulty 2. Formal rose garden on a raised terrace: thorny rose bushes are nasties, trellis arches (rows 13, 11, 9) are ledges. West door floor 15 from the Trophy Room French windows; east door open 8-11 to the battlements; stone steps descend through the floor at cols 24-27 to the drive. Bees buzz diagonally; item on a trellis.

* the_trophy_room **right** the_rose_terrace: door, open rows 11-14, floor 15 — French windows onto the terrace
* the_rose_terrace **right** gatehouse_battlements: door, open rows 8-11, floor 12
* the_rose_terrace **down** the_gravel_drive: stairs, cols 25-26, rise right — terrace steps

### Gatehouse Battlements — `gatehouse_battlements` [15,9]

Items: 1, difficulty 3. Along the top of the gatehouse wall: arrive from the murder hole at cols 4-7 (floor 15, one-way floor). A ramp of steps rises to the west door (open 8-11) onto the Rose Terrace. A pigeon swoops diagonally and a toy_soldier sentry marches; item on the flagpole pennant (row 10) above the parapet walk.

* the_rose_terrace **right** gatehouse_battlements: door, open rows 8-11, floor 12
* gatehouse_battlements **down** the_gatehouse: climb, cols 4-7 — murder hole: one-way up; lookout ledge at row 3 in the gatehouse, one-way floor in the battlements

### Heart of Conker — `heart_of_conker` [17,9]

Items: 2, difficulty 3. A spiral of ramps winding up the inside of the trunk (arriving at cols 14-17); at the top a woodland vine (rope, cols 15-16) reaches row 0 into the Great Fork, and a knot shelf at row 4 (cols 17-20) catches drops from above. Solid bark walls both sides. Woodworm and an owl; items in knotholes.

* heart_of_conker **down** conker_tree_base_camp: stairs, cols 15-16, rise left — spiral ramp into the trunk
* the_great_fork **down** heart_of_conker: rope, cols 15-16 — vine; drop-back gap in the fork at cols 17-18 onto the knot shelf at row 4

### Gravel Rash Drive — `the_gravel_drive` [14,10]

Items: 1, difficulty 2. A crunchy gravel drive with a parked Rolls (bonnet at row 13, roof at row 11 as ledges). West door from the porch (open 10-14), east door floor 15 to the gatehouse. Terrace steps climb out of the ceiling at cols 24-27; a jumpable gap at cols 18-19 is the ha-ha edge - fall in and it is one-way down (sign: MIND THE HA-HA). A lawnmower and a gardener patrol; item on the car roof.

* the_front_porch **right** the_gravel_drive: door, open rows 10-14, floor 15 — front door
* the_gravel_drive **right** the_gatehouse: door, open rows 11-14, floor 15
* the_rose_terrace **down** the_gravel_drive: stairs, cols 25-26, rise right — terrace steps
* the_gravel_drive **down** ha_ha_the_sunken_garden: drop, cols 18-19 — the ha-ha: one-way down onto the hedge at row 4

### Who Goes There? — `the_gatehouse` [15,10]

Items: 1, difficulty 2. A crenellated arch with the gatekeeper's hut. Floor-15 doors both sides; inside the hut a ladder of ledges every 2 rows climbs to a row-3 lookout under a murder hole (cols 4-7): a one-way climb to the battlements. A guard dog patrols; item above the keystone.

* the_gravel_drive **right** the_gatehouse: door, open rows 11-14, floor 15
* the_gatehouse **right** the_village_green: door, open rows 11-14, floor 15
* gatehouse_battlements **down** the_gatehouse: climb, cols 4-7 — murder hole: one-way up; lookout ledge at row 3 in the gatehouse, one-way floor in the battlements

### Howzat! The Village Green — `the_village_green` [16,10]

Items: 1, difficulty 2. Cricket pitch and a duck pond just outside the gates. Floor-15 doors both sides; the pond (nasty) mid-room is jumped or crossed via the scoreboard ledges; a cricket ball (beach_ball) rolls and a dog chases it; item on top of the scoreboard (ledges at rows 13, 11, 9; item at row 7).

* the_gatehouse **right** the_village_green: door, open rows 11-14, floor 15
* the_village_green **right** conker_tree_base_camp: door, open rows 11-14, floor 15

### Conker Tree Base Camp — `conker_tree_base_camp` [17,10]

Items: 1, difficulty 3. The foot of a colossal conker tree: huge buttress roots form ramps. Floor-15 doors west and east. A spiral ramp climbs into the hollow trunk through the ceiling at cols 14-17; a burrow between the roots (gap cols 20-21, one-way root cols 22-23) leads down into the Tangled Roots and back. A squirrel scampers, conkers (leaf) fall (v); item on a root knuckle.

* the_village_green **right** conker_tree_base_camp: door, open rows 11-14, floor 15
* conker_tree_base_camp **right** the_riverbank: door, open rows 11-14, floor 15
* heart_of_conker **down** conker_tree_base_camp: stairs, cols 15-16, rise left — spiral ramp into the trunk
* conker_tree_base_camp **down** tangled_roots: shaft, cols 20-23 — burrow: upper room row 15 = gap at cols 20-21 (drop) + one-way floor at cols 22-23 (arrival); lower room rows 0-1 open over cols 20-23 with the root at row 4 (cols 20-23)

### Reedy Steady Go — `the_riverbank` [18,10]

Items: 1, difficulty 3. Reeds and a weeping willow at the river's source. West door floor 15, grassy steps up to the east door (open 10-13, floor 14) onto the bridge approach. Among the reeds an old garden well: the well mouth is a gap in floor 15 at cols 16-17 (sign: DANGER - WELL) and the winch rope comes up from the well head at cols 14-15, where the floor-15 arrival spot is. A frog hops (h) and a heron (bird, d) stabs; item on the willow branch (row 9), reached from its roots (rows 13, 11).

* conker_tree_base_camp **right** the_riverbank: door, open rows 11-14, floor 15
* the_riverbank **right** humpback_bridge: door, open rows 10-13, floor 14
* the_riverbank **down** drop_me_a_line: rope, cols 14-17 — winch rope at cols 14-15 (arrive back on the riverbank floor there); the well mouth beside it (gap cols 16-17 in the riverbank floor) drops onto the well-head ledge at row 4

### Humpback Bridge — `humpback_bridge` [19,10]

Items: 1, difficulty 3. A stone humpback bridge: ramps rise from both stone abutments (floor 14, doors both at open 10-13) to a flat crown deck at row 9 with one missing plank (cols 12-13). Fall through it (4 rows) onto a towpath ledge under the arch (row 13), then step down to the towpath (floor 15, cols 14-15) where the bargee's rope from Under the Bridge arrives; beside it a gap (cols 16-17) drops onto the ledge below. Towpath ledges (rows 13, 11) lead back up through the plank gap. A penny_farthing rider crosses the deck and a seagull swoops; item on the crown.

* the_riverbank **right** humpback_bridge: door, open rows 10-13, floor 14
* humpback_bridge **right** the_far_bank: door, open rows 10-13, floor 14
* humpback_bridge **down** under_the_bridge: rope, cols 14-15 — bargee's rope; towpath arrival under the arch at cols 14-15, drop-back gap at cols 16-17 onto the ledge at row 4 (cols 16-19)

### Allotment of Trouble — `the_far_bank` [20,10]

Items: 1, difficulty 3. Allotments and a scarecrow on the far side of the river. West door open 10-13, east door floor 15 to the shop. A hedgehog and a bobbing watering_can; item on the shed roof (row 9), reached via a water butt (row 13) and the shed eaves (row 11).

* humpback_bridge **right** the_far_bank: door, open rows 10-13, floor 14
* the_far_bank **right** open_all_hours: door, open rows 11-14, floor 15
* sealed against: the_beach

### Open All Hours (Mostly) — `open_all_hours` [21,10]

Items: 1, difficulty 2. The corner shop at the east end of the village: shelves of penny-sweet jars and a till that springs open. West door floor 15 from the far bank; back door east (floor 15) out onto the lighthouse headland. Promenade steps lead down through the floor to the pier below: the staircase rises LEFT, its bottom ramp cells are (9,15) and (8,14) and it continues up-left to a stockroom shelf. A runaway trolley (h) and a spring-loaded till drawer (spring, v); item in the sweet jar on the top shelf.

* the_far_bank **right** open_all_hours: door, open rows 11-14, floor 15
* open_all_hours **right** lighthouse_keepers_lunch: door, open rows 11-14, floor 15 — shop back door onto the headland
* open_all_hours **down** kiss_me_quick_pier: stairs, cols 8-9, rise left — promenade steps from the shop down to the pier

### Ha-Ha! The Sunken Garden — `ha_ha_the_sunken_garden` [14,11]

Items: 1, difficulty 2. A sunken garden behind a hidden ditch wall: fall in from the drive at cols 18-19 onto a clipped hedge at row 4, then down steps to floor 15. West door floor 15 into the Coal Hole (the way out); the east side is the sheer ha-ha wall. Garden gnomes and a hedgehog; item in the fountain basin.

* the_coal_hole **right** ha_ha_the_sunken_garden: door, open rows 11-14, floor 15
* the_gravel_drive **down** ha_ha_the_sunken_garden: drop, cols 18-19 — the ha-ha: one-way down onto the hedge at row 4
* sealed against: knuckle_bone_alley

### Tangled Roots — `tangled_roots` [17,11]

Items: 2, difficulty 3. Under the tree: a maze of roots (walls and one-way root floors). The burrow from the base lands on a root at row 4 (cols 20-23, also the jump-off ledge back up); a crack in the floor (gap cols 8-9, one-way root cols 10-11) leads down into the cellars - the secret shaft. Moles and worms; items in root pockets.

* tangled_roots **down** under_the_conker_roots: shaft, cols 8-11 — secret root shaft: upper room row 15 = gap at cols 8-9 (drop) + one-way floor at cols 10-11 (arrival); lower room rows 0-1 open over cols 8-11 with the root shelf at row 3 (cols 8-11)
* conker_tree_base_camp **down** tangled_roots: shaft, cols 20-23 — burrow: upper room row 15 = gap at cols 20-21 (drop) + one-way floor at cols 22-23 (arrival); lower room rows 0-1 open over cols 20-23 with the root at row 4 (cols 20-23)
* sealed against: drop_me_a_line

### Troll Toll Towpath — `under_the_bridge` [19,11]

Items: 2, difficulty 4. Beneath the humpback arch: the river (nasty, rows 14-15) with bobbing stepping stones (lifts beside, never under, the drop). The bargee's rope hangs to row 0 at cols 14-15 (climb back up to the bridge); drop in beside it (the missing plank, cols 16-17) onto a ledge at row 4 (cols 16-19) that steps down (rows 7, 10) to the towpath. The towpath (floor 13, south bank) runs to the east door (open 10-12, floor 13): the river mouth and the beach. West edge sealed (the well). A fish leaps (v) and a trolley drifts (h); items under the arch.

* humpback_bridge **down** under_the_bridge: rope, cols 14-15 — bargee's rope; towpath arrival under the arch at cols 14-15, drop-back gap at cols 16-17 onto the ledge at row 4 (cols 16-19)
* under_the_bridge **right** the_beach: door, open rows 10-12, floor 13 — towpath along the river mouth down to the beach
* sealed against: drop_me_a_line

## Region: coast (7 rooms, 10 items)

*Placement:* east of the grounds, rows 10-12, cols 20-25: river mouth -> beach -> pier -> yacht (stern, bow); headland lighthouse above the yacht behind the corner shop; island pocket (shallows + island) out to sea, reached only by the yacht  
*Signature:* arrows (flying fish) and bobbing lifts; yacht voyage gated by the trip switch  
*Difficulty:* 2-4

### Beacon and Eggs — `lighthouse_keepers_lunch` [22,10]

Items: 2, difficulty 3. The lighthouse on the headland, entered through the corner shop's back door (west, floor 15). Spiral stairs (switchback ramps) wind up to the lamp room at row 2; walls on the north, east and south. The lamp flashes once the trip switch is thrown - the sign that the yacht can sail. Seagulls swoop (d) through the windows and a crab guards the stairs; items in the lamp room and on the keeper's lunch tin. Dead end.

* open_all_hours **right** lighthouse_keepers_lunch: door, open rows 11-14, floor 15 — shop back door onto the headland
* sealed against: yacht_poop_deck

### Sand in Your Sandwiches — `the_beach` [20,11]

Items: 1, difficulty 2. Where the river meets the sea: golden sand, a striped windbreak and a sandcastle. West door (open 10-12, floor 13) is the towpath from under the bridge, stepping down to the sand (floor 15); east door floor 15 onto the pier. The sewer outfall pipe pokes out of the cliff: outfall arrivals (special.arrival) land on a sand dune at row 5 (cols 6-11) that slopes down (ramp) to the sand - signposted BEACH. The cliff above is sealed. Crabs scuttle (h) and a beach_ball rolls (h); item on top of the sandcastle.

* under_the_bridge **right** the_beach: door, open rows 10-12, floor 13 — towpath along the river mouth down to the beach
* the_beach **right** kiss_me_quick_pier: door, open rows 11-14, floor 15
* sealed against: the_far_bank

### Kiss-Me-Quick Pier — `kiss_me_quick_pier` [21,11]

Items: 1, difficulty 3. A seaside pier with a helter-skelter and a fortune-teller's booth. West door floor 15 from the beach; the east gangplank rises to the yacht door (open 10-13, floor 14). The promenade steps climb out through the ceiling to the corner shop above: a staircase rising LEFT whose top ramp cells are (9,1) and (8,0), coming up from the lower right. Seagulls swoop (d) and flying fish zip across (arrow, row 10); item on the helter-skelter top.

* the_beach **right** kiss_me_quick_pier: door, open rows 11-14, floor 15
* kiss_me_quick_pier **right** yacht_poop_deck: door, open rows 10-13, floor 14 — gangplank
* open_all_hours **down** kiss_me_quick_pier: stairs, cols 8-9, rise left — promenade steps from the shop down to the pier

### Poop Deck Posers — `yacht_poop_deck` [22,11]

Items: 1, difficulty 3. The stern of a millionaire's yacht moored at the pier: gangplank door west (open 10-13, floor 14), a sun deck (floor 14) with deckchairs (row 12), a cabin roof at row 10 and a flybridge at row 8. East door (open 10-13, floor 14) to the bow; the headland above is sealed. A sailor paces (h) and a lifebuoy bobs (v); item on the flagstaff (row 4).

* kiss_me_quick_pier **right** yacht_poop_deck: door, open rows 10-13, floor 14 — gangplank
* yacht_poop_deck **right** yacht_sharp_end: door, open rows 10-13, floor 14
* sealed against: lighthouse_keepers_lunch

### The Sharp End — `yacht_sharp_end` [23,11]

Items: 2, difficulty 4. The bow: a raked foredeck ramp up to the bowsprit, the anchor windlass and the mast. West door (open 10-13, floor 14) from the poop deck; the east rail is sealed (open sea). A swinging anchor (v) and a parrot (d); ratline ledges climb the mast to a crow's nest at row 4; items on the bowsprit and in the crow's nest.

*Special:* yacht portal (kind yacht): once the trip switch flag 'trip' is set AND every item in yacht_poop_deck and yacht_sharp_end is collected, standing at the ship's wheel (floor 14, cols 6-7) sails the yacht one-way to desert_island_discs. Before that a furled sail and a flashing NOT YET pennant; after, the sail unfurls.

* yacht_poop_deck **right** yacht_sharp_end: door, open rows 10-13, floor 14

### Shark-Infested Shallows — `shark_infested_shallows` [24,12]

Items: 1, difficulty 4. A sandbar of stepping stones over the sea (waves nasty, row 15) just west of the island. East door floor 15 to the island; every other edge is sealed. A shark fin glides (h) and a jellyfish bobs (v); item on a rock. Dead end.

* shark_infested_shallows **right** desert_island_discs: door, open rows 11-14, floor 15

### Desert Island Discs — `desert_island_discs` [25,12]

Items: 2, difficulty 3. A tiny palm island far out to sea. The yacht drops Wally on the sand (special.arrival: floor 15, cols 20-21). A palm tree with notch ledges climbs to a frond at row 4 with an item; a wind-up gramophone plays; west door floor 15 to the shallows. A crab and a parrot. In a clearing a crashed escape pod glows.

*Special:* teleport: the escape-pod pad (floor 15, cols 4-7) beams Wally one-way to molecule_shuffler on the starship - signposted by a flashing ONE-WAY TICKET beacon. This is the only exit from the island.

* shark_infested_shallows **right** desert_island_discs: door, open rows 11-14, floor 15

## Region: sewers (7 rooms, 8 items)

*Placement:* bottom-left, rows 15-17 cols 0-4 (isolated; drain in, outfall out)  
*Signature:* conveyor currents flowing west to the outfall; the side branch east fights the current  
*Difficulty:* 3-4

### Round the U-Bend — `round_the_u_bend` [3,15]

Items: 1, difficulty 3. Arrival from the Turkish Bath plughole: Wally splashes down onto a pipe ledge at row 4 in a giant U-shaped pipe; ramps down both arms to the bottom of the U, where a gap at cols 14-15 drops one-way into the Spanish Drain. Walls all round. A rubber_duck floats along the U; item at the bottom. Sign: THIS WAY OUT (EVENTUALLY).

* round_the_u_bend **down** the_spanish_drain: drop, cols 14-15 — bottom of the U: one-way drop onto the walkway at row 5

### The Outfall — `the_outfall` [0,16]

Items: 0, difficulty 3. The end of the line: the sewer spills into a grating. East door floor 15; the outfall grate (cols 4-6, floor 15) whooshes Wally one-way out of the cliff pipe onto the Beach - signposted BEACH -> with a flashing arrow. A crab and drips; no items (a breather room).

*Special:* outfall: stepping onto the grate transports Wally one-way to the_beach (lands on the dune at row 5).

* the_outfall **right** the_gunge_tank: door, open rows 11-14, floor 15

### The Gunge Tank — `the_gunge_tank` [1,16]

Items: 1, difficulty 4. A settling tank of bright green gunge (nasty) crossed on a gantry at row 11 (ladder rungs at row 13) and a hanging chain (rope guardian). Doors both at floor 15 on the tank rims. Bubbles rise (v) and a slime slides; item on the gantry.

* the_gunge_tank **right** fatberg_alley: door, open rows 11-14, floor 15
* the_outfall **right** the_gunge_tank: door, open rows 11-14, floor 15

### Gravy Train Tunnel — `fatberg_alley` [2,16]

Items: 1, difficulty 4. A tunnel half-blocked by a monstrous fatberg (wall mass) climbed via greasy conveyor ledges. Doors both floor 15. Blobs ooze (h); item on top of the fatberg.

* fatberg_alley **right** the_spanish_drain: door, open rows 11-14, floor 15
* the_gunge_tank **right** fatberg_alley: door, open rows 11-14, floor 15

### The Spanish Drain — `the_spanish_drain` [3,16]

Items: 1, difficulty 3. The main sewer: currents (left conveyors) along walkways at rows 5, 9 and 13 above floor 15. Arrive from the U-Bend at cols 14-15 onto the row-5 walkway. Doors west (with the flow) and east (against the flow) at floor 15. Rats and a slime; item above the current.

* the_spanish_drain **right** flotsam_junction: door, open rows 11-14, floor 15
* fatberg_alley **right** the_spanish_drain: door, open rows 11-14, floor 15
* round_the_u_bend **down** the_spanish_drain: drop, cols 14-15 — bottom of the U: one-way drop onto the walkway at row 5

### Flotsam Junction — `flotsam_junction` [4,16]

Items: 2, difficulty 4. A junction choked with floating junk; the current (left conveyors) fights anyone heading east, making it a jumping puzzle. West door floor 15; a slimy ramp descends through the floor at cols 20-23 to the Rat King. A shopping trolley and a rubber_duck ride the current; items on junk ledges.

* the_spanish_drain **right** flotsam_junction: door, open rows 11-14, floor 15
* flotsam_junction **down** the_rat_kings_throne: stairs, cols 21-22, rise right — slimy ramp

### The Rat King's Throne — `the_rat_kings_throne` [4,17]

Items: 2, difficulty 4. A cavern throne room built of junk: the Rat King (rat, bright) paces before his bottle-top throne and courtier rats run a lower ledge. The ramp from Flotsam Junction arrives at cols 20-23. Dead end: items on the throne canopy (row 5), climbed via bottle-top steps every 2 rows.

* flotsam_junction **down** the_rat_kings_throne: stairs, cols 21-22, rise right — slimy ramp

## Region: starship (20 rooms, 24 items)

*Placement:* top, rows 0-2 cols 8-15 (isolated; rocket / island pod in, home pad out)  
*Signature:* turbo-lifts, flashing force fields, laser drones  
*Difficulty:* 3-5

### Captain's Log Cabin — `captains_log_cabin` [9,0]

Items: 1, difficulty 3. A timber log cabin inside a starship (the captain is homesick): rocking chair, fire and a moose head at row 7 over a log pile (rows 13, 11, 9). Dead end (east door floor 15). An astronaut dozes (v) and an alien_walker tidies; item on the moose head.

* captains_log_cabin **right** where_no_wally: door, open rows 11-14, floor 15
* sealed against: say_aaah_sickbay

### Where No Wally Has Gone Before — `where_no_wally` [10,0]

Items: 1, difficulty 3. The star-chart room: a huge live map of every visited room covers the back wall. Doors both at floor 15; chart tables at rows 13, 11 and 9. Stars drift diagonally across the map; item on the chart table.

*Special:* cartography: the wall screen draws a live map of visited rooms (green = cleared, red = items left).

* captains_log_cabin **right** where_no_wally: door, open rows 11-14, floor 15
* where_no_wally **right** turbo_lift_a: door, open rows 11-14, floor 15
* sealed against: for_mash_get_smash

### Grav Tube: Going Up — `turbo_lift_a` [11,0]

Items: 1, difficulty 4. Top of the turbo-lift column: the shaft opens in the floor (gap cols 14-15, one-way grating cols 16-17 where the Deck B lift delivers climbers). Doors west and east at floor 15. A laser_drone sweeps diagonally; item above the shaft.

* where_no_wally **right** turbo_lift_a: door, open rows 11-14, floor 15
* turbo_lift_a **right** the_captains_chair: door, open rows 11-14, floor 15
* turbo_lift_a **down** turbo_lift_b: shaft, cols 14-17 — turbo-lift A/B: upper room row 15 = gap at cols 14-15 (drop) + one-way floor at cols 16-17 (arrival); lower room rows 0-1 open over cols 14-17 with the Deck B platform at row 4 (cols 14-17), reached by the Deck B lift at cols 10-12

### The Captain's Chair — `the_captains_chair` [12,0]

Items: 1, difficulty 4. The bridge: a big viewscreen (a comet streaks past), the captain's swivel chair on a raised dais (step at row 13, dais at row 11), consoles as ledges (row 9). Doors both at floor 15. An alien_head glares from the viewscreen (v) and an astronaut helmsman paces; item on the chair.

* turbo_lift_a **right** the_captains_chair: door, open rows 11-14, floor 15
* the_captains_chair **right** red_shirt_lockers: door, open rows 11-14, floor 15
* sealed against: hydroponic_spud_farm

### Red Shirt Locker Room — `red_shirt_lockers` [13,0]

Items: 1, difficulty 4. Lockers of doomed crewmen's red shirts; locker tops are ledges and several are booby-trapped (flashing nasties). Doors both at floor 15. A laser_drone and a robot; item in a locker at row 5.

* the_captains_chair **right** red_shirt_lockers: door, open rows 11-14, floor 15
* red_shirt_lockers **right** no_place_like_home: door, open rows 11-14, floor 15
* sealed against: robo_kennels

### There's No Place Like Home — `no_place_like_home` [14,0]

Items: 1, difficulty 3. The return pad room: a glowing pad on floor 15 (cols 18-21) and a pair of ruby slippers on a plinth. West door floor 15. Guardians keep well away from the pad (a satellite bobs, v, in the far corner); item on the plinth (row 9).

*Special:* teleport: standing on the pad beams Wally one-way home to the_bathroom (arrives on floor 15 at col 5). Signposted HOME: THE BATHROOM in flashing letters. This is the way back from space.

* red_shirt_lockers **right** no_place_like_home: door, open rows 11-14, floor 15
* sealed against: molecule_shuffler

### The Brig — `the_brig` [8,1]

Items: 1, difficulty 4. Force-field cells (flashing nasties switching every 2 s) along the west end of the deck; dead end, east door floor 15. An alien prisoner (alien_head) bobs behind bars and a robot guard patrols; item inside the far cell - time the force fields.

* the_brig **right** say_aaah_sickbay: door, open rows 11-14, floor 15

### Say Aaah! — `say_aaah_sickbay` [9,1]

Items: 1, difficulty 3. Biobeds as platforms (rows 13, 11), a shelf at row 9 and a medicine cabinet on top at row 7 and a skeleton on a stand (v). A laser_drone (hypospray) sweeps diagonally. Doors both at floor 15; item on the medicine cabinet.

* the_brig **right** say_aaah_sickbay: door, open rows 11-14, floor 15
* say_aaah_sickbay **right** for_mash_get_smash: door, open rows 11-14, floor 15
* sealed against: captains_log_cabin, torpedo_bay

### For Mash Get Smash — `for_mash_get_smash` [10,1]

Items: 1, difficulty 3. The crew mess: a food-hatch conveyor (right, row 11, reached from the table at row 13) serves instant mash; robots chuckle at the table. Doors both at floor 15. A robot waiter (h) and a blob of mash (v); item on the mash dispenser.

* say_aaah_sickbay **right** for_mash_get_smash: door, open rows 11-14, floor 15
* for_mash_get_smash **right** turbo_lift_b: door, open rows 11-14, floor 15
* sealed against: where_no_wally, hold_everything

### Grav Tube: Stopping — `turbo_lift_b` [11,1]

Items: 1, difficulty 4. Middle of the turbo-lift column: a lift (cols 10-12) runs from floor 15 to a platform at row 4 (cols 14-17) under the Deck A shaft; the Deck C shaft opens in the floor (gap cols 20-21, one-way grating cols 22-23). Doors west and east at floor 15. A laser_drone; item on the row-4 platform.

* for_mash_get_smash **right** turbo_lift_b: door, open rows 11-14, floor 15
* turbo_lift_b **right** hydroponic_spud_farm: door, open rows 11-14, floor 15
* turbo_lift_a **down** turbo_lift_b: shaft, cols 14-17 — turbo-lift A/B: upper room row 15 = gap at cols 14-15 (drop) + one-way floor at cols 16-17 (arrival); lower room rows 0-1 open over cols 14-17 with the Deck B platform at row 4 (cols 14-17), reached by the Deck B lift at cols 10-12
* turbo_lift_b **down** turbo_lift_c: shaft, cols 20-23 — turbo-lift B/C: upper room row 15 = gap at cols 20-21 (drop) + one-way floor at cols 22-23 (arrival); lower room rows 0-1 open over cols 20-23 with the Deck C platform at row 4 (cols 20-23), reached by the Deck C lift at cols 16-18

### Hydroponic Spud Farm — `hydroponic_spud_farm` [12,1]

Items: 1, difficulty 3. Rows of space potatoes in hydroponic trays (ledges every 2 rows: 13, 11, 9, 7) with sprinkler drips. Doors both at floor 15. space_slugs crawl the trays and a blob bobs; item on the top tray.

* turbo_lift_b **right** hydroponic_spud_farm: door, open rows 11-14, floor 15
* hydroponic_spud_farm **right** robo_kennels: door, open rows 11-14, floor 15
* sealed against: the_captains_chair, rocket_park

### Robo-Kennels — `robo_kennels` [13,1]

Items: 1, difficulty 4. Kennels for the ship's robot dogs (robo_dog, h, fast). The engine-room hatch opens in the floor at cols 6-7 (arrive on a one-way floor-15 grating there). Doors west and east at floor 15. Item on the kennel roof.

* hydroponic_spud_farm **right** robo_kennels: door, open rows 11-14, floor 15
* robo_kennels **right** molecule_shuffler: door, open rows 11-14, floor 15
* robo_kennels **down** she_cannae_take_it: climb, cols 6-7 — engine-room maintenance hatch, one-way up (one-way floor grating in the kennels)
* sealed against: red_shirt_lockers

### The Molecule Shuffler — `molecule_shuffler` [14,1]

Items: 2, difficulty 4. The transporter room: an ARRIVALS pad (floor 15, cols 4-7) where island and planet beams land (special.arrival), a HOME pad (floor 15, cols 12-15) that beams one-way to the Bathroom, and a DEPARTURES dais (row 9, cols 20-23, up console steps at rows 13 and 11) that beams one-way to the alien planet. Doors west and east at floor 15. A robot operator paces the console (h, away from the pads) and a satellite bobs (v); items on the console (row 10) and the dais.

*Special:* arrival pad for island and planet teleports; portals: HOME pad -> the_bathroom (teleport, signposted HOME in flashing letters), departures dais -> welcome_to_zarg (teleport, signposted PLANET ZARG: ONE WAY). No guardian path over any pad.

* robo_kennels **right** molecule_shuffler: door, open rows 11-14, floor 15
* molecule_shuffler **right** space_laundrette: door, open rows 11-14, floor 15
* sealed against: no_place_like_home, the_warp_core

### Space Laundrette — `space_laundrette` [15,1]

Items: 1, difficulty 3. Space washing machines spin (fan, v) and lost socks float (bubble, diagonal); dead end at the east of the mid deck, west door floor 15. Item in the lost-sock basket.

* molecule_shuffler **right** space_laundrette: door, open rows 11-14, floor 15

### Torpedo Bay (Loaded) — `torpedo_bay` [9,2]

Items: 2, difficulty 4. Torpedo tubes along the walls; torpedoes streak across as arrows (rows 8 and 12, alternating directions). Dead end west of the hold (east door floor 15). A laser_drone sweeps; items in the tubes.

* torpedo_bay **right** hold_everything: door, open rows 11-14, floor 15
* sealed against: say_aaah_sickbay

### Hold Everything! — `hold_everything` [10,2]

Items: 1, difficulty 3. The cargo hold: crates stacked in 2-row steps as platforms and a loader conveyor (right, row 11). Doors both at floor 15. A robot forklift (h) and a ufo drone (v); item on the tallest crate stack.

* torpedo_bay **right** hold_everything: door, open rows 11-14, floor 15
* hold_everything **right** turbo_lift_c: door, open rows 11-14, floor 15
* sealed against: for_mash_get_smash

### Grav Tube: Going Down — `turbo_lift_c` [11,2]

Items: 1, difficulty 3. Starship signature: the turbo-lift - a lift (cols 16-18) rises from floor 15 to a platform at row 4 (cols 20-23) under the Deck B shaft; jump up from it into Deck B, or drop down onto it. Doors west (hold) and east (Rocket Park) at floor 15. A laser_drone sweeps diagonally; item on the platform.

* hold_everything **right** turbo_lift_c: door, open rows 11-14, floor 15
* turbo_lift_c **right** rocket_park: door, open rows 11-14, floor 15
* turbo_lift_b **down** turbo_lift_c: shaft, cols 20-23 — turbo-lift B/C: upper room row 15 = gap at cols 20-21 (drop) + one-way floor at cols 22-23 (arrival); lower room rows 0-1 open over cols 20-23 with the Deck C platform at row 4 (cols 20-23), reached by the Deck C lift at cols 16-18

### Rocket Park (Pay and Display) — `rocket_park` [12,2]

Items: 1, difficulty 3. Arrival from the rocket: the rocket parks on a pad mid-floor (floor 15, cols 12-19; no guardian path over it). Doors west (turbo-lift) and east (engine room) at floor 15. A robot and an astronaut patrol the gantries; item on the gantry (row 7; gantry steps every 2 rows).

* turbo_lift_c **right** rocket_park: door, open rows 11-14, floor 15
* rocket_park **right** she_cannae_take_it: door, open rows 11-14, floor 15
* sealed against: hydroponic_spud_farm

### She Cannae Take It, Captain! — `she_cannae_take_it` [13,2]

Items: 2, difficulty 4. The engine room: pistons (crusher, v) pound between catwalks every 2 rows (13, 11, 9, 7, 5); a maintenance hatch in the ceiling at cols 6-7 (ledge at row 3) is a one-way climb up to the Robo-Kennels. Doors west and east at floor 15; items on the catwalks.

* rocket_park **right** she_cannae_take_it: door, open rows 11-14, floor 15
* she_cannae_take_it **right** the_warp_core: door, open rows 11-14, floor 15
* robo_kennels **down** she_cannae_take_it: climb, cols 6-7 — engine-room maintenance hatch, one-way up (one-way floor grating in the kennels)

### The Warp Core (Do Not Lick) — `the_warp_core` [14,2]

Items: 2, difficulty 5. A pulsing warp-core column (flashing nasty cells switching on and off) wrapped by a narrow catwalk spiral. West door floor 15; dead end. Beams sweep (v) and a comet whizzes diagonally; two items at the top of the core (row 3).

* she_cannae_take_it **right** the_warp_core: door, open rows 11-14, floor 15
* sealed against: molecule_shuffler

## Region: planet (8 rooms, 10 items)

*Placement:* top-right, rows 0-1 cols 19-22 (isolated; teleport loop)  
*Signature:* crater ramps and diagonal guardians; a one-way crater hole makes the loop  
*Difficulty:* 3-5

### Welcome to Planet Zarg — `welcome_to_zarg` [19,0]

Items: 1, difficulty 4. Arrival pad on a purple crag (floor 15, cols 4-7, guardian-free). Crater slopes (ramps) roll east to the door (floor 15); the west is a cliff. An alien_walker waves (h) and a ufo hovers (v); item on a crag. Sign: FOLLOW THE CRATERS.

* welcome_to_zarg **right** crater_expectations: door, open rows 11-14, floor 15
* sealed against: duty_free_departures

### Crater Expectations — `crater_expectations` [20,0]

Items: 2, difficulty 4. Bowl-shaped craters built from ramps; west door floor 15, east door open 9-12 on a crater rim. Diagonal guardians (comet, blob) criss-cross the bowls; items on the crater rims (row 6).

* welcome_to_zarg **right** crater_expectations: door, open rows 11-14, floor 15
* crater_expectations **right** the_gloop_lagoon: door, open rows 9-12, floor 13
* sealed against: moon_buggy_motorway

### The Gloop Lagoon — `the_gloop_lagoon` [21,0]

Items: 1, difficulty 5. A lagoon of bubbling gloop (nasty) crossed on floating rocks (lifts). West door open 9-12, east door open 7-10 up the hillside. A tentacle rises (v) from the gloop and bubbles pop; the geyser vent from Spaghetti Junction pushes up through a one-way floor at cols 16-17; item on a lone rock.

* crater_expectations **right** the_gloop_lagoon: door, open rows 9-12, floor 13
* the_gloop_lagoon **right** ulla_ulla_tripod_hill: door, open rows 7-10, floor 11
* the_gloop_lagoon **down** spaghetti_junction: climb, cols 16-17 — geyser vent, one-way up through a one-way floor

### Ulla! Ulla! Tripod Hill — `ulla_ulla_tripod_hill` [22,0]

Items: 2, difficulty 5. A hill patrolled by a Martian tripod (tripod, diagonal) sweeping a heat ray (beam, v). West door open 7-10; the east is a cliff. On the far side a crater hole (gap at cols 24-26) drops one-way into the canyon below (sign: DOWN ONLY). Items on the hilltop.

* the_gloop_lagoon **right** ulla_ulla_tripod_hill: door, open rows 7-10, floor 11
* ulla_ulla_tripod_hill **down** heres_looking_at_you: drop, cols 24-26 — crater hole, one-way down onto a ledge at row 4

### Duty-Free Departures — `duty_free_departures` [19,1]

Items: 1, difficulty 3. The alien spaceport: a departures pad (floor 15, cols 4-7) and a duty-free counter (row 13) and shelves (row 11). East door floor 15; west wall solid. alien_walker porters (h) and a star (diagonal); item on the counter.

*Special:* teleport: the pad beams Wally one-way back to molecule_shuffler (arrivals pad) - signposted DEPARTURES: STARSHIP.

* duty_free_departures **right** moon_buggy_motorway: door, open rows 11-14, floor 15
* sealed against: welcome_to_zarg

### Moon Buggy Motorway — `moon_buggy_motorway` [20,1]

Items: 1, difficulty 4. A cratered highway: moon_buggies race along the flat road (floor 15, h, speed 2) under an overpass (row 11, ramps up at both ends); a ringed_planet drifts in the sky. Doors both at floor 15; item on the overpass.

* moon_buggy_motorway **right** spaghetti_junction: door, open rows 11-14, floor 15
* duty_free_departures **right** moon_buggy_motorway: door, open rows 11-14, floor 15
* sealed against: crater_expectations

### Spaghetti Junction — `spaghetti_junction` [21,1]

Items: 1, difficulty 5. Alien tentacles (tentacle) twist diagonally across a knot of ledges; vent ledges every 2 rows lead to a steam-vent ledge at row 3 under a gap (cols 16-17) is a one-way hop back up to the Gloop Lagoon. Doors both at floor 15. Item in the tangle.

* spaghetti_junction **right** heres_looking_at_you: door, open rows 11-14, floor 15
* moon_buggy_motorway **right** spaghetti_junction: door, open rows 11-14, floor 15
* the_gloop_lagoon **down** spaghetti_junction: climb, cols 16-17 — geyser vent, one-way up through a one-way floor

### Here's Looking at You — `heres_looking_at_you` [22,1]

Items: 1, difficulty 4. A canyon of giant eyeballs (eyeball, v) that follow Wally; the hole from Tripod Hill drops in at cols 24-26 onto a ledge at row 4 that steps down (rows 8, 12) to the canyon floor. West door floor 15; east is canyon wall. Item on an eyelid ledge.

* spaghetti_junction **right** heres_looking_at_you: door, open rows 11-14, floor 15
* ulla_ulla_tripod_hill **down** heres_looking_at_you: drop, cols 24-26 — crater hole, one-way down onto a ledge at row 4

## Region: ending (1 rooms, 0 items)

*Placement:* off-grid  
*Signature:* non-playable nightmare scene  
*Difficulty:* -

### Back to Square One! — `the_nightmare` (off-grid)

Items: 0, difficulty 1. The ending: Wally wakes up at the bottom of a mine he has never seen, every guardian he ever dodged patrolling above him, and jumps on the spot in despair while the results roll. Not playable (special.nightmare {x, y}).

*Special:* ending: entered only via the_bathroom toilet after winning; Wally jumps on the spot, then the results screen (time, rooms, items).

