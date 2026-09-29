# Room authoring guide — Jet Set Wally II

Read `docs/PLAN.md` §3–§5 first (engine rules, room format, connection rules). This guide is the practical
cookbook. Your region's rooms, names, grid positions, items and door contracts come from
`src/data/world_plan.json` (human version: `docs/WORLD.md`). Build exactly what the plan says at the edges;
be creative inside.

## 0. Workflow (do this for every room)

```
node tools/validate.js --region <region>     # format, limits, guardian paths, edge alignment, door contracts
node tools/solve.js --region <region>        # physics proof: every room/item reachable, doors traversable, no soft-locks
node tools/render.js region <region>         # out/rooms/<id>.png  -> LOOK at every PNG with the Read tool
```
Iterate until validate has **no errors** (warnings reviewed), the solver prints **SOLVE OK**, and every PNG looks
good. The solver runs the real game physics, so if it says an item is unreachable, it is.
Use `--file src/data/rooms/<yourfile>.js` instead of `--region` when several authors share a region.

**Save as you go:** write your room file after finishing EACH room (never hold many rooms only in memory) and append a
line per finished room to `out/progress/<yourfile-name>.md` — sessions can be cut off at any moment.

## 1. File format

One file per region: `src/data/rooms/<region>.js`, containing `JSW.defineRoom({...})` calls (see PLAN §4).
Map rows are exactly 32 characters, exactly 16 rows. `+` marks an item (on air). The legend maps each
other character to a tile style. Tips:
* One `air` style (usually black paper, white ink). Wally is drawn white over air cells.
* 1–3 floor styles, 1–2 wall styles, 0–2 nasties, ramps `/` `\`, conveyors `<` `>` as needed.
  Each style has its own pattern (`tile`), `ink`, `paper`, optional `bright`/`flash`.
* Classic look: black background; bright, contrasting tile colours; the wall colour often uses a coloured
  paper (e.g. red brick = `ink:'red', paper:'yellow'` or `ink:'yellow', paper:'red'`); floors bright on black.
* Choose a `border` colour per room (never black/white is the JSW habit; vary between neighbours).
* `item`: one item graphic per room, thematically chosen from the items library.

## 2. Physics cheat-sheet (Wally = 2 cells wide, 2 cells tall)

Let a **surface** be a floor/wall/ramp/conveyor cell Wally stands on. Standing on a surface at row `f`,
Wally's body occupies rows `f-2` and `f-1` and his `y = (f-2)*8`.

| Move | Rule |
|---|---|
| Walk | 2 px/frame. Only **walls** block sideways. Floors are one-way: you walk and jump through them from below/side. |
| Headroom | a corridor must have ≥ 2 air rows above the floor; ≥ 5 rows to jump freely (wall ceilings stop jumps). |
| Jump up | land on surfaces **1 or 2 rows higher** (`f-1`, `f-2`). 3 rows up is impossible. |
| Jump across | ~4.5 cells on flat ground; gaps of **≤ 3 cells** are comfortable, 4 is tight. |
| Drop (walk off) | safe if the landing surface is **≤ 4 rows lower**; 5+ kills. |
| Drop (after a jump) | landing ≤ 2 rows below the take-off surface is safe; 3+ kills. |
| Items | collectible when inside Wally's body block: standing at `f` reaches rows `f-2..f-1`; jumping reaches up to ~5 rows above `f`. |
| Nasties | kill if any of Wally's 2×3 block touches one (incl. the row under his feet). A nasty in a floor line is a pit you must jump. |
| Room edges | left/right: walk off the side. Up: jump/stairs/rope past row 0 (arrive at `y=104`, standing on the upper room's row 15). Down: fall through a gap in row 15 (arrive at `y=0`, still falling). |

**Stairs (`/` rises to the right):** a diagonal of ramp cells, one row up per column. The bottom ramp cell sits
**one row above the floor** it starts from (i.e. on top of the floor line), and the top ramp cell is **in the
same row as the upper landing floor**, directly left of it:
```
row 9  .....====        <- landing floor starts right of the top ramp cell
row 10 ..../....
row 11 .../.....
row 12 ../......
row 13 ./.......
row 14 /........        <- bottom ramp cell, one row above the floor
row 15 =========        <- floor
```
`\` is the mirror image (rises to the left). Walls above a staircase must leave 2 rows of headroom.

**Stairs across a room boundary** (plan door `kind:'stairs'`, `cols:[c0,c1]` = 2 columns, `rise:'right'|'left'`) —
verified by `node tools/test-stairs.js`. Wally re-enters a room from below at `y=104`, two rows higher than the
geometric continuation, so **the upper room repeats the lower room's top two ramp cells**:
* rise right: LOWER room ramp cells at `(c0,1)` and `(c1,0)`; UPPER room ramp cells at `(c0,15)` and `(c1,14)`, then the flight continues up-right.
* rise left: LOWER room ramp cells at `(c1,1)` and `(c0,0)`; UPPER room ramp cells at `(c1,15)` and `(c0,14)`, then up-left.
A full-height flight needs ~15 columns; use a half-landing and a switchback (`/` then `\`) when space is short.
Keep 2 rows of air above every ramp cell. **Headroom at the top of the stairs:** walking down, Wally drops into the
lower room two columns before the top ramp cell, so in the LOWER room rows 0–1 must be air at `c0-2..c0-1` (rise right)
or `c1+1..c1+2` (rise left) — no ceiling wall there.

**Head clearance (common trap):** anywhere Wally can stand, the two rows above the surface must be free of walls in the
columns he will walk into, otherwise he is pinned (walls stop him at head height). A ledge tucked 1 row under a wall
ceiling is a trap. Likewise every high perch needs a safe way down (a walk-off ≤ 4 rows, or ledges): floors are solid
from above, so you cannot drop back through the ledges you jumped up through.

**Conveyors:** `<` pushes left, `>` pushes right (as if the key were held). Walking against a belt is only
possible if you step onto it already walking that way. Great for pushing Wally towards nasties.

**Ropes:** `{ type:'rope', x: <cell>, length: 32 }` hangs from row 0 at column `x` and swings ±67 px at the
bottom (period 90 frames, reaches y≈96 at rest). Wally grabs it on touch, climbs with left/right, jumps off in the
facing direction. Climbing off the top enters the room above (only if there is an up exit), arriving at `y=104`
around columns `x-1..x` — the room above needs a row-15 floor there and air in rows 13–14. Keep the rope's
swept area (a fan below row 0, ±9 cells at the bottom) free of walls.

**Lifts:** `{ type:'lift', x, width, top, bottom, start, period, dir }` — a floor strip that moves one row every
`period` frames between rows `top..bottom`, carrying Wally.

## 3. Guardians (≤ 8 per room incl. arrows & lifts; + at most 1 rope)

* `h` horizontal: `{type:'h', sprite, ink, bright, x, y, min, max, dir}` — `y` in **pixels** (top of the 16px box);
  a walker on a floor at row `f` has `y=(f-2)*8`; `x/min/max` in **cells** (box = 2 cells). Must use an `'h'` sprite.
* `v` vertical: `{type:'v', sprite, ink, x, y, min, max, dy, anim}` — `x` cell; `y/min/max` pixels (0..112);
  `dy` 1..4 px/frame (±); `anim: 'fast'|'slow'`. Use `'v'` sprites.
* `d` diagonal: `{type:'d', sprite, ink, x, y, dx, dy, count}` — pixels; moves (dx,dy) for `count` frames then reverses.
* `arrow`: `{type:'arrow', dir:'left'|'right', y}` — y pixel row with `y%8` in 1..6; flies every 256 frames with a warning zip.
* Paths must stay over air (validate warns otherwise) and inside the room.
* Colours: bright yellow/cyan/green/magenta/white/red read best on black. Guardians of different colours per room.
* **Fairness:** leave safe standing spots; don't park a guardian on an entry point or an item permanently; every
  guardian must be passable with timing. Difficulty follows the plan's 1–5 rating.

Sprite library (`h` = horizontal movers, `v` = vertical/animators) — run `node tools/preview.js sprites <name>` to see one:
* mansion — h: butler maid knight vacuum cat rat chef toy_soldier · v: ghost candle flying_book spider bat teapot toilet_roll shaver rubber_duck pendulum plate champagne
* nature — h: bird hedgehog snail lawnmower dog squirrel frog gardener fox · v: bee butterfly owl flytrap caterpillar toadstool watering_can gnome leaf worm
* sea — h: crab fish shark seagull sailor beach_ball turtle parrot seal · v: jellyfish octopus anchor lifebuoy bubble seahorse clam starfish buoy
* underground — h: minecart mole skeleton miner_bot slime boulder cave_bat ghost_miner · v: drip pickaxe lantern crusher glowworm drill stalactite dynamite cave_spider
* space — h: alien_walker robot astronaut moon_buggy ufo tripod space_slug robo_dog · v: eyeball satellite blob comet laser_drone star tentacle ringed_planet beam alien_head
* misc — h: barrel clockwork_mouse penny_farthing roller_skate trolley unicycle cartwheel penguin · v: saw dice coin spring fan yoyo hand skull pogo jack_in_box hourglass balloon

Tiles (`node tools/preview.js tiles`): background: blank stars dots_wallpaper stripes_faint rain_faint bubbles_faint ·
floor: plank stone_ledge grass_top sand_top cloud girder rope_bridge carpet branch rock_ledge ice grate shelf tiled_floor pipe_h chain_h rug deck ·
wall: brick brick_small stone_block rock wood_panel hedge metal_plate rivets bark window marble earth sandstone ice_block circuit hull bathroom_tiles bookshelf crate pipe_v coral cloud_solid ·
nasty: spikes_up spikes_down flames thorns sparks urchin crystal skull_nasty acid cactus nettle fire_grate glass_shards barbed_wire lava toadstool_nasty waves laser_grid ·
ramp: stairs stairs_outline slope_grass slope_rock escalator rope_ladder · conveyor: belt belt_arrows rollers treadmill walkway

Items: tap glass key coin gem bottle bone shell cup candle feather spanner battery apple fish book sock spoon ring crown star
diamond heart bell umbrella spectacles pipe toothbrush hammer bulb clock envelope flower mushroom crystal anchor starfish pearl
rocket planet moonrock chip disk cheese carrot cherry teddy trophy

## 4. Edges — the connection contract (non-negotiable)

For every grid neighbour the plan lists either a **door** or **sealed**:
* **door (left/right)** `{open:[t,b], floor:f}`: rows `t..b` are non-wall in your two edge columns (cols 30–31 on a
  right edge, 0–1 on a left edge) and row `f` is a surface there. Keep your edge column's **wall pattern identical**
  to the neighbour's (validate checks col 31 vs col 0 row by row). Outside the opening, make the edge wall
  (indoors) — or, outdoors, match the neighbour's open sky exactly as the plan describes.
* **drop** (down) `{cols:[c0,c1]}`: the upper room's row 15 is air across the span; the lower room's rows 0–1 are air
  across it, with a landing within 4 rows below (or a continuing shaft).
* **climb** (up): the lower room has a ledge at row ≤ 4 under a non-wall row 0 in the span; the upper room has a
  row-15 floor in the span with air in rows 13–14.
* **shaft**: both of the above side by side (a drop gap and a climb ledge).
* **stairs**: the diagonal continues across the edge (row 0 of the lower room ↔ row 15 of the upper room).
* **rope**: the lower room hangs a rope inside the span that reaches row 0; the upper room has the landing floor.
* **sealed**: the whole shared edge is wall on both sides.
* Edges with no neighbour must be sealed (wall) wherever Wally could reach.

## 5. Specials (`special: {...}`)

* `arrival: {x, y, facing}` — where Wally appears when arriving by a link (teleport, drain, rocket, yacht) into this room.
  Must be standing on a surface (`y = (f-2)*8`).
* `portals: [{x, y, w, h, to, kind, requires, flag, hidden}]` — standing with Wally's lower body in the cell box
  (`x..x+w-1`, rows `y..y+h-1`) triggers transport to room `to` (arriving at its `special.arrival`).
  `kind`: teleport | drain | outfall | rocket | yacht. `requires:'roomItems'` = only after this room's items are
  collected; `flag:'name'` = only after a switch set that flag.
  `requiresRooms:['id',...]` = only after those rooms are cleared (e.g. the yacht needs both yacht rooms + `flag:'trip'`).
* `switches: [{x, y, flag, message}]` — touching the air cell sets a persistent flag.
* `signs: [{x, y, text, ink, flash, when}]` — short signpost text printed over air cells (e.g. `NO RETURN - SEWERS`);
  `when:'flag'` shows it only once that flag is set.
* `flagFlash: [{flag, x, y, w, h}]` — those cells start flashing once the flag is set (e.g. the lighthouse lamp).
* `housekeeper: {x, y}` (Master Bedroom) · `bed: true` (the room containing the right-moving conveyor bed) ·
  `toilet: {x, y}` (The Bathroom) · `nightmare: {x, y}` (ending room) · `flashNasties: true` · `cartography: {x, y}`.
