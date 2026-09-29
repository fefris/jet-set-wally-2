# Asset formats & art rules — Jet Set Wally II

All art is **original**. It must evoke the 1984–85 ZX Spectrum look (1‑bit sprites, 8×8 attribute colour cells,
chunky readable silhouettes) but must **not** reproduce sprites, rooms or characters from Jet Set Willy, Manic
Miner, JSW II or any other commercial game or franchise. Our hero is **Wally**, a new character.

Every data file is a classic script: it simply calls the registry functions on the global `JSW` object
(defined in `src/core/registry.js`). No `import`/`export`, no modules. One file per asset group.

Bitmaps are arrays of strings: `#` = ink pixel, `.` = paper pixel. Widths/heights are exact — the registry
reports any row with the wrong length.

## Sprites (16×16, multi-frame) — `JSW.defineSprite(name, def)`

```js
JSW.defineSprite('crab', {
  mover: 'h',            // 'h' = horizontal mover, 'v' = vertical mover / stationary animator
  theme: 'beach',
  desc: 'sideways-scuttling crab, claws open/close',
  frames: [ [ /* 16 strings of 16 chars */ ], ... ]   // 'h': 4 frames (or 8)   'v': 4 frames (or 2)
});
```

### Horizontal movers (`mover: 'h'`) — Wally and horizontally patrolling guardians
* Draw the character **facing / travelling RIGHT**.
* All ink must lie in **columns 0‑9** (a 10‑pixel‑wide field); columns 10‑15 must be `.` in every row.
  The engine moves the sprite 2 px per frame by drawing frame *f* shifted right by *2f* pixels inside its
  16‑px box, and **mirrors** the 10‑px field for leftward travel. (This reproduces how the original engine
  pre‑shifted its sprites, giving smooth 2‑pixel movement with cell‑based collision.)
* 4 frames = one walk/flap cycle (frame 0 → 1 → 2 → 3 → 0 …). Keep the body's horizontal position
  **identical** in all 4 frames — the shift is added by the engine. Animate legs/wings/wheels.
* Optionally 8 frames: 0‑3 travelling right, 4‑7 travelling left (then no auto‑mirroring). Prefer 4.
* Keep the feet on row 15 for walkers (they stand on the floor directly below the sprite box).

### Vertical movers / animators (`mover: 'v'`)
* Full 16×16 box, 4 frames looped continuously (2 frames also allowed). Used for things that bob up and down,
  hang, fly vertically, spin, flicker, etc.

### Style rules
* Solid, chunky 1‑bit art. Avoid single isolated pixels and checkerboard dithering; the whole sprite takes a
  single ink colour on the room's paper.
* Silhouette must read at a glance at 1× (16 px). Leave at least a 1‑px transparent margin where sensible.
* Animations should be smooth and clearly cyclic (no jarring jumps).
* Run `node tools/preview.js sprites <name> ...` and **look at** `out/preview/sprites/<name>.png`
  (Read tool shows PNGs). For 'h' movers the preview shows the raw frames (red guide line at column 10) and
  the in‑game walking strips (right, then mirrored left).

## Tiles (8×8 patterns) — `JSW.defineTile(name, def)`

```js
JSW.defineTile('brick_red', { kind: 'wall', desc: 'classic offset brickwork', rows: [ /* 8 strings of 8 */ ] });
```
`kind` is a hint: `background`, `floor`, `wall`, `nasty`, `ramp`, `conveyor`. Colours are chosen per room,
so a pattern is just its bitmap.
* **floor** tiles are thin walkable ledges: usually ink in the top 1‑4 rows (the player stands on top).
* **wall** tiles are solid blocks — patterned fully (bricks, stone, bark, hedge, metal plate…).
* **nasty** tiles kill on touch (spikes, flames, thorn bushes, electric sparks, urchins…). Must look dangerous.
* **ramp** tiles form a diagonal staircase; author them for a ramp rising to the **right** (`/`);
  the engine mirrors them for `\`. Typical ramp art: a filled lower‑right triangle or a stair step.
* **conveyor** tiles: the engine animates rows 0 and 2 by rotating them 2 bits per frame, so make rows 0/2
  a repeating stripe (e.g. `##..##..`) and the rest a belt/roller look.
* **background** tiles: mostly empty; subtle ones allowed (sparse stars, faint wallpaper dots).

## Items (8×8 collectables) — `JSW.defineItem(name, def)`
Small, instantly recognisable objects (tap, glass, key, coin, shell, gem, bottle, bone…). Drawn with cycling
ink colours by the engine. `rows`: 8 strings of 8.

## Font — `JSW.defineFont('main', { glyphs: { 'A': [8 strings of 8], ... } })`
All printable ASCII 32‑126. Classic 8×8 home‑computer proportions: glyphs use columns 1‑6 / rows 0‑6 with
the baseline on row 6 (descenders g j p q y may use row 7), column 7 and column 0 blank for spacing.
Must be an **original** design (do not copy the Sinclair ROM font bit‑for‑bit).

## Preview tools
```
node tools/preview.js sprites [names...]   # out/preview/sprites/*.png
node tools/preview.js tiles                # out/preview/tiles.png (+ index list in console)
node tools/preview.js items                # out/preview/items.png
node tools/preview.js font                 # out/preview/font.png
```
The loader prints `ASSET ERRORS` for malformed bitmaps (wrong sizes, 'h' art outside columns 0‑9, duplicates).
Fix every error before finishing.
