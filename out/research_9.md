# Fact-check: "presentation" report (JSW / JSW2)

**Overall result:** 10 claims verified, 2 corrected, and several smaller nuances flagged. Nothing in the report is badly wrong. The two real errors are the game-over PAPER cycle rate and the extent of the nasty-collision check.

**Method:**
- I read the full SkoolKit JSW1 source (https://github.com/skoolkid/jetsetwilly/blob/master/sources/jsw.skool, plus `sound.ref` and `jsw.ref`). The page URLs below are the rendered SkoolKit pages for the same routines.
- I cross-checked against the Manic Miner source, John Elliott's (seasip) JSW2 format page, TASVideos submissions 8012 and 8625, the JSW2 instruction texts, and the WoS 48K reference.
- I measured JSW Central JSW2 screenshots pixel by pixel.

## A. The 12 most implementation-critical claims

| # | Claim in report | Status | Evidence / source |
|---|---|---|---|
| 1 | **Main-loop order** runs: lives → copy empty room → move rope/guardians → move Willy → Willy attributes + nasty check + draw → toilet/Maria → rope/arrows/guardians → conveyor → items → copy pixels, then attributes → print time and items → clock tick → BREAK/pause → death check → music → cheats | **VERIFIED** | Exact order at 35245–35607 and 35607–35838. Only the top two-thirds is block-copied (4096 pixel bytes + 512 attribute bytes). Lives are drawn straight to the display file at 20640 (0x50A0). https://skoolkid.github.io/jetsetwilly/asm/89AD.html, https://skoolkid.github.io/jetsetwilly/asm/8B07.html |
| 2 | **Lives:** start value 7 (8 lives in total); at most 7 icons, drawn in overwrite mode; frame = bits 2–3 of the music note index (`RLCA×3; AND 96`); icons freeze when music is off; slot attributes 45,06,04,41,05,43,44 | **VERIFIED** | `LD A,7` at 34784. The icon routine is at 35211. Row 21/22 attributes are `69,69,6,6,4,4,65,65,5,5,67,67,68,68`. The note index is only incremented inside the music-on branch (35648). https://skoolkid.github.io/jetsetwilly/asm/898B.html, https://skoolkid.github.io/jetsetwilly/asm/87CA.html, https://skoolkid.github.io/jetsetwilly/asm/9A00.html |
| 3 | **Status rows:** row 16 is attribute 0x46; row 19 gradient is 1..7, then 7 up to column 25, then 6..1; item count at (19,16); time at (19,25), 6 characters; template printed on room entry | **VERIFIED** | Table at 39424. Print calls at 35173/35185 and 35377/35389. https://skoolkid.github.io/jetsetwilly/asm/8912.html, https://skoolkid.github.io/jetsetwilly/asm/9A00.html |
| 4 | **In-game music:** index +1 per pass; entry = (index AND 0x7E)/2 from a 64-byte table; 2 passes per note; blip = 768 iterations (B=0, C=3); **D = note + 28 − 4·lives**; H/J/K/L/ENTER toggle is edge-triggered; the music-on branch resets the inactivity timer | **VERIFIED** | Code at 35644–35694: `RLCA;RLCA;SUB 28;NEG;ADD A,(HL)`. The ~40 T loop gives half-period 40·D+6 T, which matches SkoolKit's audio value 3446 T for D=86. Nuance: the very first note of a game plays on only 1 pass (bug "The missed note"). https://skoolkid.github.io/jetsetwilly/asm/8B07.html, https://skoolkid.github.io/jetsetwilly/reference/bugs.html |
| 5 | **Items:** INK = ((frame counter + item index) AND 3) + 3, i.e. magenta/green/cyan/yellow, changing every pass; an item is collected when its cell INK is white (7) | **VERIFIED** | Code at 37936–37949 and 37868–37873. The counter is the "minute counter" at 34251, which increments every pass. Minor nuance: the collect sound is 64 half-periods, C = 128 down to 2, delay 144−C. The report's "128→4" copies SkoolKit's audio macro; ≈19 ms is still correct. https://skoolkid.github.io/jetsetwilly/asm/93D1.html |
| 6 | **Willy's cells:** "2×2, or 2×3 when y is not a multiple of 8"; a nasty "in any of his cells" kills | **CORRECTED** | The nasty check **always covers 6 cells (3 rows × 2)**. When Willy is cell-aligned, that includes the row **directly under his feet**, so a nasty he stands above or walks onto kills him. Only the **white-INK recolouring** of the bottom row depends on y (`LD A,C; AND 15; JR Z` retains the INK). The check is done before drawing, on the attribute buffer. Bug "Long distance nasties" is a side effect. https://skoolkid.github.io/jetsetwilly/asm/95C8.html, https://skoolkid.github.io/jetsetwilly/asm/961E.html |
| 7 | **Guardians:** attribute = (PAPER of cell) + guardian INK/BRIGHT, FLASH cleared; applied to 2×2 or 2×3 cells; blend drawing kills on any pixel overlap (walls, floor, nasties, Willy) | **VERIFIED**, with nuance | The PAPER is read from the guardian's **top-left cell only**, and that one value C is written to all 4–6 cells. A third row is added only if `(y AND 14)≠0`. Pixel overlap with anything already drawn kills (facts: "Guardians need a clear path"). https://skoolkid.github.io/jetsetwilly/asm/91BE.html, https://skoolkid.github.io/jetsetwilly/reference/facts.html |
| 8 | **Arrows:** x changes by ±1 cell per pass over 0–255; drawn only when x is 0–31; warning sound at x=44 (moving left) or 244 (moving right); rows are top / 0xFF shaft / bottom; the shaft kills if the cell already had white INK | **VERIFIED** | Code at 37431–37536. The sound loop BC=640 gives a rising sweep of about 32 ms. https://skoolkid.github.io/jetsetwilly/asm/91BE.html |
| 9 | **Conveyor animation:** each pass, pixel rows 0 and 2 rotate 2 bits in opposite directions (left conveyor: row 0 rotates left, row 2 rotates right), in the empty-room buffer | **VERIFIED** | Routine at 38137. https://skoolkid.github.io/jetsetwilly/asm/94F9.html |
| 10 | **Lose a life:** top two-thirds filled with 0x47…0x40; per step D = 63−8·ink (7…63), C = 8+32·ink half-periods, black border; then lives−1 and room re-initialised from the entry snapshot, or game over if lives = 0 | **VERIFIED**, with nuance | Code at 35841–35911. "Notes get shorter" is true only as a half-period count. The actual durations rise and then fall: about 8, 13, 16, 17, 16, 13, 8.5 and 2 ms. https://skoolkid.github.io/jetsetwilly/asm/8C01.html |
| 11 | **Game over:** foot drops 2 px per step for 49 steps; Willy (frame 2) at (12,15) on the barrel at (14,15); "PAPER cycles black, blue, red, magenta (changes every 4 steps)"; barrel kept INK 2; "Game" at (6,10) and "Over" at (6,18) glisten for ~1.57 s | **CORRECTED** (PAPER rate only) | The distance goes up by 4 per step and PAPER = bits 2–3 of the distance, so **PAPER changes every step**. The full black→blue→red→magenta cycle repeats every 4 steps. Everything else is verified: distance runs 0..192 then stops at 196 (49 steps); sound delay E = 255−distance with 64 OUTs per step. https://skoolkid.github.io/jetsetwilly/asm/8C4A.html |
| 12 | **Pause, clock and auto-pause:** A–G pauses and any other key resumes; every 65,536 pause-loop iterations INK/PAPER +3 (BRIGHT cleared), border = INK of the top-left cell; 8-bit inactivity counter; clock +1 minute per 256 passes; 7am→1am = 276,480 passes; am/pm bug | **VERIFIED** | Code at 35499–35561 and 35563–35590 (`AND 184` clears BRIGHT), clock at 35401–35495. Inactivity is reset by left/right input (36685/36698/36762) and by music. The pause loop is 56 T per iteration, so a colour step every ≈1.05 s [derived]. https://skoolkid.github.io/jetsetwilly/asm/89AD.html, https://skoolkid.github.io/jetsetwilly/asm/8AEB.html, https://skoolkid.github.io/jetsetwilly/reference/bugs.html ("12:30am in the afternoon") |

## B. Additional spot checks

- **Jump and fall** (8DD3) — **VERIFIED.**
  - The jump lasts 18 passes. The y-step is `(J AND 0xFE) − 8` in half-pixels, which sums to a 20 px peak.
  - Jump sound D = 8·(1+|J−8|), 32 half-periods: about 2.0 kHz, then 12.8 kHz, then 1.5 kHz.
  - Falling moves 4 px per pass (`ADD A,8`). The airborne counter runs 2→3…15, then cycles 12–15. Fall sound D = 16·A.
  - Source: https://skoolkid.github.io/jetsetwilly/asm/8DD3.html
- **Title screen** (87CA, 96A2) — **VERIFIED**, with one nuance.
  - UDGs are skipped for attribute values 0, 211 (0xD3), 9, 45 and 36. Letters use 0xD3 (FLASH, BRIGHT, PAPER 2, INK 3). Row 19 is 0x46.
  - The scroll runs 224 steps with row 19 reset to 0x4F each step. The screech argument is 50–81.
  - Each tune byte gives 50 short notes at E, then 50 at 2E (≈0.29 s per byte). The tune has 99 bytes, so ≈29 s, with a black border.
  - Nuance: **during the scroll only ENTER or 0 are checked, not Kempston fire.** Fire is checked only between tune bytes.
  - Sources: https://skoolkid.github.io/jetsetwilly/asm/87CA.html, https://skoolkid.github.io/jetsetwilly/asm/96A2.html
- **Room format offsets** — **VERIFIED.** Tiles at 0xA0/A9/B2/BB/C4/CD; conveyor 0xD6–D9; ramp 0xDA–DD, drawn with steps of −33 or −31; border 0xDE; item graphic 0xE1; exits 0xE9–0xEC; entities 0xF0. Tile graphics are looked up with CPIR over 54 bytes, which causes the corrupted-conveyor bug. Source: https://skoolkid.github.io/jetsetwilly/asm/8D33.html
- **FLASH timing** — **VERIFIED.** Ink and paper swap every 16 frames; a full cycle is 32 frames ≈ 0.64 s. A 48K frame is 69,888 T at 50.08 Hz. Port 0xFE: bits 0–2 border, bit 3 MIC, bit 4 EAR. Source: https://worldofspectrum.org/faq/reference/48kreference.htm
- **JSW1 frame rate "≈12–12.5 fps"** — **CORRECTED (minor).**
  - SkoolKit's 280,000 / 290,000 T figures are the *silent gap between sounds*. They do not include the ~24–31k T music blip.
  - With music on, SkoolKit's model gives about 314–320k T per pass, i.e. **≈11 passes/s** on a 48K.
  - TAS 8012 gives a best case of ~0.07 s per pass (≈14/s) on a +2A with music off, and says the clock runs "about three times real-time speed" (≈12.8 passes/s).
  - So use ~11 fps (music on) to ~14 fps (music off, 128K).
  - Sources: https://github.com/skoolkid/jetsetwilly/blob/master/sources/jsw.ref (InGameTune), https://tasvideos.org/8012S
- **JSW1 has no frame sync** — **VERIFIED.** The code does `DI` at 33792, and there is no EI or HALT anywhere in the source.
- **JSW2 TAS facts** — **VERIFIED.** From https://tasvideos.org/8625S:
  - "one in-game frame every 0.04 seconds"
  - "ticks one second for every ten frames"
  - "only 24950 frames pass when Central Cavern is reached", with RTA 22:16.885, so ≈18.7 frames/s [derived]
  - "inputs are read only once per frame" (JSW1 reads twice per frame, per TAS 8012)
  - Respawn at "the last static solid ground"
  - 175 items, 150 required
- **JSW2 format facts** — **VERIFIED.** From https://www.seasip.info/Jsw/jsw2room.html:
  - Colour table at 70A9h = {87h, C6h, C5h, C4h}; unidirectional guardians are always white.
  - Cells are at 8C78h + 9n; attribute bit 7 means inverse; "All cells are drawn in bright colours".
  - RLE layout: values below 90h are type<<4 | (repeat−1); 90h and above are air runs of (value − 7Fh).
  - At most 16 items per room; border colour is `xname` bits 2–0.
  - Title data starts at x=18, y=2, and ink = paper = 6 means flashing magenta on yellow.
  - Title tune at FC69h–FCCCh (terminated by FFh); in-game tune is 64 bytes at FAF0h.
  - Maria is removed at 150 or more items.
  - Nuance: **87h has BRIGHT clear**, so white guardians and arrows are probably *non-bright* white while yellow, cyan and green are bright (bit 7's purpose is "unknown"). UNCONFIRMED visually.
- **JSW2 status bar and title** (my own pixel measurement of https://jswcentral.org/images/03-jsw2/01-jsw2/jsw2_001.png and `jsw2_title.png`) — **VERIFIED.**
  - Room name row 16 is #CECECE (non-bright white).
  - Row 19 "Rooms 046  TIME  0000:20:48" is #FFFFFF.
  - Lives are on rows 22–23 in bright blue, red, magenta, green, cyan, yellow and white.
  - "Items : 055" is bright yellow on row 22.
  - "Press ENTER to start" is on row 21, columns 6–25, in #CECE00.
  - JSW Central also gives: start time 0000:00:00, "Spare lives at the start: 7", no bonus lives, 134 rooms. Source: https://jswcentral.org/jsw2-01_jsw2.html
- **JSW2 keys and tunes** — **VERIFIED.** "H J K L <ENTER> – Music on/off", "A S D F G – Pause game". Lives are a shift-register byte FEh. Moonlight Sonata plays on the title and Grieg's "Hall of the Mountain King" in game. Source: https://worldofspectrum.net/pub/sinclair/games-info/j/JetSetWillyII_128.txt
- **Manic Miner in-game tune** — **VERIFIED.** It is 64 bytes at 34188 (0x858C), starting `128,114,102,96,86,102,86,86,81,96,81,81…`. MM plays E=(HL) with no lives offset. Whether JSW2's bytes are identical to MM's remains UNCONFIRMED. Source: https://skoolkid.github.io/manicminer/asm/858C.html
- **"Scale ≈40 cents flat"** — **UNCONFIRMED / imprecise.** With f = 3.5 MHz/(80D+12), 0x80 comes out about 39 cents flat of F4 but 0x56 about 52 cents flat of C5. The table is not exactly equal-tempered. This does not matter if the homage uses its own tuning.

## C. Important facts the report missed

1. **JSW2 conveyor animation is per-room and optional** (seasip, T4 byte).
   - Bit 6 turns animation on. Bit 5 chooses between only the top pixel row animating and rows 1 and 3 animating.
   - Only one contiguous strip is animated, starting at the first conveyor cell, so multiple conveyors don't animate correctly.
2. **JSW2 entity limits** (seasip):
   - At most 8 guardians plus arrows per room.
   - Lifts use guardian slots, so a room with lifts has at most 6 guardians.
   - A unidirectional guardian is **not drawn** while its X step is negative or its Y step is positive.
   - "Lift 6" also makes fire cells flash, not only First Landing.
3. **Fall-death rule (JSW1)**: landing with airborne counter ≥ 12 kills (`CP 12; JP NC` at 36577, https://skoolkid.github.io/jetsetwilly/asm/8ED4.html).
   - After a jump ends, the counter is set to 6 (36528). Walking off a ledge sets it to 2.
   - TAS figures: walking off is safe up to 4 cells (32 px) down; after a jump, up to 2 cells (16 px) below the take-off level. A walking jump covers 36 px on flat ground (https://tasvideos.org/8012S, https://tasvideos.org/8625S).
4. **Maria's animation and collision** (https://skoolkid.github.io/jetsetwilly/asm/9534.html):
   - She is drawn at (11,14) in blend mode, so touching her kills.
   - While Willy is on the floor (y=208), her frame is bit 1 of the per-pass counter (foot up/down every 2 passes).
   - When Willy is up to 8 px above the floor she shows the "raising arm" frame; higher than that, "arm raised".
   - In the Master Bedroom, reaching x < 6 after all items starts the toilet run (game mode 2).
5. **Toilet run mechanics** (89AD, 959A): the double speed during the run comes from forcing bit 0 of Willy's animation frame. Reaching x=28 in The Bathroom sets mode 3 and resets the minute counter.
6. **Start position (JSW1)**: The Bathroom (room 33), y=208 (pixel y 104), attribute buffer 23988, i.e. cell (13,20) (87CA).
7. **Auto-pause in real time**: 256 idle passes is about 18–23 s at 11–14 passes/s. The JSW2 instruction text's "paused after a minute" is loose.
8. **Arrow and item interplay** (facts page, "White-seeking missile" and "Items and whiteness"):
   - An arrow kills when its shaft hits set pixels in any cell that already had white INK, including a white rope.
   - Arrows and white guardians collect items they pass over.
   - Arrows listed before guardians in the entity list can "hit" the guardian and kill Willy.
9. **Title-screen UDG detail**: attribute 44 (0x2C) is rewritten to 37 (0x25) when its UDG is drawn. UDG choice depends on column parity and attribute class (87CA).
10. **Clock bug detail**: the clock also fails to switch pm→am at midnight, so midnight shows "12:00pm" (bugs page, "12:30am in the afternoon").
11. **JSW2 special-case room codes** that matter for presentation (seasip):
    - Central Cavern: Willy jumps on the spot repeatedly after winning.
    - Trip Switch: uses the left/right conveyor graphics as the off/on switch.
    - Foot Room: a foot drops once room 103 is cleared.
    - Rocket Room: the centre of the room takes off.
    - Teleporters work only in rooms with special-case ID 11 or 22.
    - Several rooms make Willy "run to the right if the game is won".