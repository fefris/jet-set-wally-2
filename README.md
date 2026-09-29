# Jet Set Wally II

An original browser homage to the 1985 ZX Spectrum classic **Jet Set Willy II**: the same engine mechanics
(2-pixel walking, the 18-frame jump, fatal falls, one-way floors, stairs, conveyors, swinging ropes, arrows,
guardians, flashing items, 7 spare lives, the elapsed-time clock) and the same Spectrum look (256×192, 8×8
attribute colour cells, bright/flash, colour clash) — with an original hero, **Wally**, original rooms and art,
and public-domain music (Beethoven's *Moonlight Sonata*, Grieg's *In the Hall of the Mountain King*).

Mrs Mop the housekeeper won't let Wally go to bed until the whole estate is tidied: collect 150 of the flashing
items scattered around the mansion, its grounds, the cellars and mines, the coast — and further afield.

## Play

Open `index.html` in a browser (no server or build needed), or the single-file build `dist/jetsetwally2.html`.

| Action | Keys |
|---|---|
| Left | Q E T U O, ← |
| Right | W R Y I P, → |
| Jump | Z X C V B N M, Space, Shift, ↑ |
| Pause | A S D F G (any key resumes) |
| Music on/off | H J K L |
| Quit to title | Esc |
| Start | Enter (gamepad: Start; d-pad/stick + A to play) |

## Development

Plain JavaScript classic scripts on a global `JSW` namespace; `src/manifest.json` lists the load order. The Node tools
load the very same scripts, so the verification runs the real game engine.

```
node tools/test-physics.js          # engine physics vs the original's numbers (26 tests)
node tools/test-stairs.js           # stairs crossing a room boundary, both directions
node tools/validate.js              # static checks: formats, limits, edge alignment, door contracts
node tools/solve.js                 # physics BFS: every room & item reachable, doors traversable, no soft-locks, ending run
node tools/guardcheck.js [--top]    # guardian fairness: no guarded arrivals, items collectable between patrols
node tools/render.js map            # out/map.png - the whole world
node tools/render.js room <id>      # out/rooms/<id>.png
node tools/plan-brief.js <ids...>   # compact plan brief for rooms (contracts, links)
node tools/preview.js sprites|tiles|items|font
node tools/gen-index.js [--dist]    # regenerate index.html / build dist/jetsetwally2.html
node tools/serve.js                 # optional local server on :8123
```

### Verification status

| Check | Result |
|---|---|
| Physics tests | 26/26 pass; cross-room stairs pass both ways |
| Validator (134 rooms) | 0 errors |
| Whole-world solver (3.0 M states, real engine) | **SOLVE OK** — 133/134 rooms reached (the 134th is the off-map ending room), 175/175 items, every planned door and one-way link traversable, no soft-locks |
| Ending run | bed → wardrobe → Bathroom → toilet → ending room → results (solver + headless Game) |
| Guardian check | 0 issues (no guarded arrivals/start; every item has a timing window) |

The world plan (`src/data/world_plan.json`, human version `docs/WORLD.md`) came from a judged three-way design
panel and was reworked by `tools/rework-plan.js`.

Docs: `docs/PLAN.md` (plan & engine rules), `docs/research.md` (research spec with sources), `docs/WORLD.md` (the map),
`docs/ROOMS.md` (room authoring cookbook), `docs/ASSETS.md` (art formats).
