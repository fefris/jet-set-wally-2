# Fact-check: "guardians" research report (JSW1 engine, with JSW2 notes)

I checked each claim directly against the SkoolKit JSW disassembly (build 20260428), the SkoolKit Manic Miner disassembly, John Elliott's JSW2 room-format page (seasip) and the TASVideos submissions. I also did three things myself:
- tallied the entity definitions at A000;
- simulated the rope swing tables from 8300 and the swing code in 90C0;
- measured the pixel extent of every guardian sprite in the AB00–BFFF sprite data.

## Verdicts

| # | Claim (as stated in the report) | Verdict | Source |
|---|---|---|---|
| 1 | **Frame pipeline.** The order is: copy the empty-room buffers, then move the rope and guardians (90C0, which skips arrows), then move Willy (8DD3, skipped in mode 3). If y ≥ 225 (0xE1) Willy goes to the room above. Then the nasty check and Willy draw (95C8/961E), the toilet check (9584), Maria/special rooms (9534), entity draw with collision (91BE, which also moves arrows), conveyor (94F9), items (93D1), copy to screen, and 85CB increments once per frame. A guardian or arrow kill jumps to 89F5 through 90B7; the death is handled next frame through 85D1 = 0xFF, then 8C01. | **VERIFIED**, with one addition: nasty deaths (90B6, from 961E) and fall deaths (90B7, from 8ED4) also jump straight to 89F5. A nasty death happens at step 5, so guardians, arrows, Maria and items are **not drawn** on the death frame. | https://skoolkid.github.io/jetsetwilly/asm/89AD.html, https://skoolkid.github.io/jetsetwilly/asm/90B6.html, https://skoolkid.github.io/jetsetwilly/asm/8B07.html |
| 2 | **Horizontal guardian motion.** Moving left: `b0=(b0-0x20)&0x7F`, and the x cell steps when the result is ≥ 0x60 (wrap 0→3). Moving right: `b0=(b0+0x20)\|0x80`, and x steps when the result is < 0xA0 (wrap 7→4). At the limit, b0 is set to 0x81 or 0x61. There is no speed flag. This gives **2 px per frame**, a 1-frame turn pause, and a **period of 8×(max−min+1)** frames. | **VERIFIED.** The code matches exactly (9133–917D). My hand trace of min 0, max 2 gives 24 frames. The **2-px pre-shift is confirmed by the sprite data**: for example, page 0xB1 frames 0–3 start at columns 0, 2, 4, 6, and page 0xBD frames 4–7 start at columns 0, 3, 5, 7. Byte 1 bit 4 is listed as "unused". | https://skoolkid.github.io/jetsetwilly/asm/90C0.html, https://skoolkid.github.io/jetsetwilly/asm/8100.html, https://skoolkid.github.io/jetsetwilly/asm/AB00.html |
| 3 | **Manic Miner had a slow flag.** It is bit 7 of the guardian's first byte, 0 = normal and 1 = slow, and a slow guardian moves on alternate passes. JSW dropped it. | **VERIFIED.** The alternation is driven by game-clock bit 2, which toggles every pass. | https://skoolkid.github.io/manicminer/asm/8D0F.html |
| 4 | **Vertical guardian motion.** Each frame `y2 += dy2`. If new y ≥ max, dy is negated with **no clamp**. Otherwise, if new y ≤ min, y is set to min and dy is negated. Start increments in JSW1 are +1×10, +2×17, +3×3, +4×4, +5×1, +6×2, −1×1, −2×4, −3×1, −4×2, −5×1, −6×1 and 0×1 (definition 0x59). | **VERIFIED.** My A000 tally matches exactly; 48 vertical definitions. Two additions: (a) byte 4 is stored ×2 (for example `$02` means 1 px per frame), which the report handles correctly. (b) The comparisons are **unsigned** (Z80 `CP`), so a y that underflows below 0 reads as ≥ max. It then reverses without a clamp. This is derived from the code; see "Missed facts". | https://skoolkid.github.io/jetsetwilly/asm/90C0.html, https://skoolkid.github.io/jetsetwilly/asm/A000.html |
| 5 | **Vertical animation flags.** Bit 3 of byte 0 toggles every frame, and the frame advances (+0x20) if bit 3 or bit 4 is set. Bit 4 set means every frame; clear means every second frame. There are 25 "every pass" and 19 "every second pass" definitions, plus 4 others. The mask tallies are 000×4, 001×21, 010×5, 011×40, 111×37. There are 59 horizontal, 48 vertical, 2 arrow and 1 rope definitions. | **VERIFIED.** All counts match my tally of A000. | https://skoolkid.github.io/jetsetwilly/asm/90C0.html, https://skoolkid.github.io/jetsetwilly/asm/A000.html |
| 6 | **Animation mask table.** The sprite index is `((b0 & b1mask) \| base) & 0xE0`, and 16×16 sprites of 32 bytes each sit 8 to a page. The mask table covers 000, 001, 010, 011 and 111. | **VERIFIED, but incomplete.** The Glossary also defines 100, 101 and 110 (for example `100 = B,B,B,B,B\|4,B\|4,B\|4,B\|4`), even though they are unused. It also says **no guardian has base frame 7**. | https://skoolkid.github.io/jetsetwilly/reference/glossary.html, https://skoolkid.github.io/jetsetwilly/asm/91BE.html |
| 7 | **Guardian colour.** `C = ((b1 & 0x0F) + 0x38) & 0x47` and `attr = (top-left cell attr & 0x38) XOR C`. This is written to 2×2 cells, or 2×3 when `(y2 & 0x0E) ≠ 0`. FLASH is cleared and the guardian's INK overwrites Willy's white. The "halo" bug affects 4 guardians. | **VERIFIED.** | https://skoolkid.github.io/jetsetwilly/asm/91BE.html, https://skoolkid.github.io/jetsetwilly/reference/bugs.html |
| 8 | **Guardian collision.** 9456 with C = 1 tests `sprite AND buffer` for each of the 32 bytes and returns NZ, which kills Willy. So guardians also "kill" on walls, nasties, floors or any earlier-drawn entity. An arrow listed before a guardian kills Willy when the guardian hits it. | **VERIFIED.** 16 rows × 2 bytes, blend mode, and the Trivia entry "Guardians need a clear path" confirms it. | https://skoolkid.github.io/jetsetwilly/asm/9456.html, https://skoolkid.github.io/jetsetwilly/reference/facts.html |
| 9 | **Entity limits and reset.** At most 8 entities per room; 8912 copies 8 definitions into buffers at 8100 with a 0xFF terminator at 8140. The buffers are rebuilt on room entry and after every death, since 8C01 jumps to 8912. The Forgotten Abbey has 8 guardians; The Attic has 6 vertical guardians and 2 arrows. | **VERIFIED.** Two details: 8912 does `RES 7` on spec byte 0, and it **writes spec byte 1 into the A000 definition itself** before copying. 8912 also resets the rope status 85D6 to 0. | https://skoolkid.github.io/jetsetwilly/asm/8912.html, https://skoolkid.github.io/jetsetwilly/asm/8C01.html, https://skoolkid.github.io/jetsetwilly/reference/facts.html |
| 10 | **Arrows.** Speed is 1 cell per frame, and x is 0–255 and wraps (256-frame lap, visible while x is 0–31). Starting x is 208 (L→R, pattern `%10000010`) or 28 (R→L, `%01000001`). The sound plays at x = 244 or 44, giving 12 or 13 frames of warning, and the arrow is not drawn on the sound frame. The rows are pattern / 0xFF / pattern, all overwrite. The arrow ORs INK 7 into its cell. Collision is enabled only if the cell INK was already 7, and only the shaft row is tested. | **VERIFIED.** One sound detail is **CORRECTED**: with B = 2 and C = 0x80 the loop gives **128 toggles with delays 2, then 128 down to 2** (not "128 to 1"). The rising pitch is correct. | https://skoolkid.github.io/jetsetwilly/asm/91BE.html, https://skoolkid.github.io/jetsetwilly/asm/A000.html |
| 11 | **Ropes.** 33 one-pixel segments from pixel y 0 with drawing byte 0x80; the X and Y table values; bottom offsets (0,96), (±24,95), (±54,84), (±67,67); swing step ±2, or ±4 below about 0x12–0x14; half swing 45 frames, **period 90**; grab = first segment overlapping a set pixel; Willy y = segment y − 8 px; the 4-row x/frame table; climb ±1 per frame (down when facing the swing direction); minimum segment 0x0C with no room above; drop off when index > 0x20 (y&0xF8, airborne 0); jump off sets 85D6 = 0xF0 with y&0xF0 and forces movement in the facing direction; **16-frame** re-grab cooldown. | **VERIFIED**, all from code and table. My simulation independently gives a period of 90 and the same four bottom offsets. The step-4 thresholds are frame < 0x12 when moving away from centre and < 0x14 when moving towards it. The on-rope value range is 0x03–0x20. | https://skoolkid.github.io/jetsetwilly/asm/90C0.html, https://skoolkid.github.io/jetsetwilly/asm/91BE.html, https://skoolkid.github.io/jetsetwilly/asm/8300.html, https://skoolkid.github.io/jetsetwilly/asm/8ED4.html, https://skoolkid.github.io/jetsetwilly/asm/85D6.html |
| 12 | **Items.** There are 83 items (A3FF = 0xAD). INK = `((85CB + index) & 3) + 3`, i.e. 3–6, changing every frame. An item is collected when its cell INK is 7. The item is drawn in overwrite mode. The collection sound is 64 toggles with delay `0x90 − C`, falling in pitch. Game mode becomes 1 when all are collected. | **VERIFIED.** | https://skoolkid.github.io/jetsetwilly/asm/93D1.html, https://skoolkid.github.io/jetsetwilly/asm/A3FF.html, https://skoolkid.github.io/jetsetwilly/asm/9691.html |

### Additional spot checks

| Claim | Verdict | Source |
|---|---|---|
| Death: 8 attribute fills 0x47→0x40, each with a note; 85CC starts at 7; Willy restored from 85D7, then 8912 | **VERIFIED.** Game over comes when a life is lost with 85CC = 0, so that is effectively 8 lives. | https://skoolkid.github.io/jetsetwilly/asm/8C01.html, https://skoolkid.github.io/jetsetwilly/asm/87CA.html |
| Maria: fixed at (x 14, y 11); pixel-perfect kill; foot frame on bit 1 of 85CB; arm frames by Willy height (y2 = 0xD0 on the floor, ≥ 0xC0 "raising"); attributes 0x45 / 0x07; bed trigger x < 6; toilet at x = 28 resets 85CB and sets mode 3 | **VERIFIED** | https://skoolkid.github.io/jetsetwilly/asm/9534.html, https://skoolkid.github.io/jetsetwilly/asm/9584.html |
| Frame rate: about 0.07 s per in-game frame for JSW1, about 0.04 s for JSW2; JSW2 does not control its framerate | **VERIFIED** | https://tasvideos.org/8012S, https://tasvideos.org/10021S |
| JSW2 guardian record: counter-based reversal (CG0/CG1); signed step CG3; limit of 8 guardians plus arrows; lifts use guardian slots | **VERIFIED** | https://www.seasip.info/Jsw/jsw2room.html |
| JSW2 guardian colours: "{0x87, 0xC6, 0xC5, 0xC4} = white, yellow, cyan, green, **all BRIGHT**" | **CORRECTED.** 0x87 is **non-BRIGHT** white (bit 6 = 0). 0xC6, 0xC5 and 0xC4 are BRIGHT yellow, cyan and green. All four have bit 7 (the FLASH position) set; seasip says its purpose is unknown. Arrows use 0x87. Unidirectional guardians get attribute **0x80**, although seasip says they are drawn white. | https://www.seasip.info/Jsw/jsw2room.html |
| JSW2 items: 175 total, 150 needed | **VERIFIED** | https://tasvideos.org/10021S |
| Attic bug: spec E9FC byte 0xD5 corrupts definitions 0x0D–0x11 and 0x2D–0x31 (13 rooms); fix is POKE 59901,82 (y 41) | **VERIFIED** | https://skoolkid.github.io/jetsetwilly/reference/bugs.html |

## Important facts the report missed

1. **Game clock rate.** 85CB increments once per frame, and each wrap is one game minute, so **256 frames = 1 game minute**. The clock starts at **" 7:00a"** (8585, copied by 88FC). The game quits at 1am (8A88), which is 1080 game minutes or 276,480 frames. The same counter drives Maria's foot animation and the item colour phase.
   - https://skoolkid.github.io/jetsetwilly/asm/89AD.html
   - https://skoolkid.github.io/jetsetwilly/asm/88FC.html
   - https://skoolkid.github.io/jetsetwilly/asm/8585.html
2. **Arrow timing from room entry** (derived from 91BE and the A000 start values):
   - An L→R arrow sounds on frame 36 after entry and is visible on frames 48–79, then every 256 frames.
   - An R→L arrow is visible on frames 1–28 immediately, with **no warning**. It sounds on frame 240 and is visible again from frame 253.
3. **Arrow y constraint** (derived from 91BE). The top and bottom rows are drawn with `DEC H` / `INC H` in the Spectrum-layout buffer. That only lands on the adjacent pixel row when **y mod 8 is 1–6**. At y mod 8 = 0 or 7 the top or bottom row lands in a different screen third, or outside 6000–6FFF. The JSW1 arrow y values I checked (42, 66, 73, and the fixed Attic 41) all satisfy this.
   - https://skoolkid.github.io/jetsetwilly/asm/91BE.html
4. **The arrow's collision gate depends on attribute order** (derived). An arrow drawn after a *white* guardian kills Willy if its shaft overlaps that guardian. An arrow in a cell where an earlier guardian recoloured Willy's INK will **not** detect Willy.
5. **Vertical guardian unsigned wrap** (derived from 919C–91A6). If `y2 + dy2` goes below 0 (a small min and a large |dy| that doesn't land exactly on min), the value wraps to about 0xF0+. The guardian then reverses without clamping and is drawn off-table. The homage should clamp both bounds, or require that the path lands exactly on min.
6. **Items are drawn last in overwrite mode**, so each frame they erase any Willy or guardian pixels in their 8×8 cell.
   - https://skoolkid.github.io/jetsetwilly/asm/9691.html
7. **Room initialisation (8912)**:
   - It writes spec byte 1 into the A000 definition in place.
   - It ignores bit 7 of spec byte 0, so 0xFF maps to definition 0x7F, which is the terminator.
   - It resets the rope status 85D6 to 0, so the rope cooldown never carries over after a death or room change.
   - https://skoolkid.github.io/jetsetwilly/asm/8912.html
8. **Glossary rules.** Masks 100, 101 and 110 are defined but unused, and no guardian uses base frame 7.
   - https://skoolkid.github.io/jetsetwilly/reference/glossary.html
9. **Maria and entities.** Maria is drawn before 91BE, so an entity overlapping her pixels would also trigger a "kill Willy" (derived).
10. **JSW2 limits missing from the report:**
    - A guardian count above 8 is treated as 0.
    - Rooms with lifts allow at most 6 guardians.
    - Only one conveyor per room animates, and only if it is contiguous.
    - Arrow records have bit 7 set for "going left" (X step 0xFF).
    - https://www.seasip.info/Jsw/jsw2room.html
11. **JSW2 Willy and room numbers** from https://tasvideos.org/10021S (Willy topic, but they affect guardian timing):
    - Movement is 2 px per frame on the ground and in the air.
    - A jump lasts 18 frames with a 20 px peak.
    - Safe fall is 32 px when walking off and 16 px below the jump start.
    - Input is read once per frame.
    - Collision with guardians uses Willy's *visual* position on stairs.
    - Every room starts in a fixed state and guardians are never affected by Willy, except in the special-case rooms.