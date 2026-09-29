# Jet Set Willy / Jet Set Willy II: presentation research (screen, graphics, text, audio, timing)

Most of what follows comes from Richard Dymond's SkoolKit disassembly of **JSW1**: https://skoolkid.github.io/jetsetwilly/ (release 20260428). **JSW2** has no full disassembly. Its facts come from four places:
- John Elliott's JSW2 format notes: https://www.seasip.info/Jsw/jsw2room.html
- TASVideos run notes
- instruction and database texts
- JSW Central and Spectrum Computing screenshots, which I analysed cell by cell

Anything marked **[derived]** is my own arithmetic from the disassembly's instruction timings. **UNCONFIRMED** means no primary source was found.

---

## 1. ZX Spectrum display fundamentals

### 1.1 Palette (15 colours)
Colour index bits are G R B (bit 2 = green, bit 1 = red, bit 0 = blue). BRIGHT has no effect on black, so there are 15 distinct colours. The border can only use the 8 non-bright colours. Sources: https://en.wikipedia.org/wiki/ZX_Spectrum_graphic_modes and https://worldofspectrum.org/faq/reference/48kreference.htm

| # | Name | Normal (0xD7 convention) | Bright |
|---|---|---|---|
| 0 | black | #000000 | #000000 |
| 1 | blue | #0000D7 | #0000FF |
| 2 | red | #D70000 | #FF0000 |
| 3 | magenta | #D700D7 | #FF00FF |
| 4 | green | #00D700 | #00FF00 |
| 5 | cyan | #00D7D7 | #00FFFF |
| 6 | yellow | #D7D700 | #FFFF00 |
| 7 | white | #D7D7D7 | #FFFFFF |

Other "normal" levels in common use:
- **0xD7**: the Wikipedia attribute tables use it (`#0000d7` etc.). The same article's main table uses gamma-corrected ~#EE values and says non-bright is about 85% voltage.
- **0xC0**: the Fuse emulator (`rgb_colours[16][3] = {0,0,192}…{255,255,255}` in `ui/gtk/gtkdisplay.c` and `ui/sdl/sdldisplay.c`, https://github.com/speccytools/fuse).
- **0xC5/0xC6/0xCD**: SkoolKit's defaults (BLUE 0,0,197; GREEN 0,198,0; WHITE 205,198,205; bright = 255). See https://skoolkit.ca/docs/skoolkit/ref-files.html
- **0xCE**: the JSW Central JSW2 screenshots (measured).
- **0xBD / 0xDE** (normal / bright): the Spectrum Computing JSW1 GIF (measured).

The recommended default is 0xD7 / 0xFF.

### 1.2 Attribute system
- Screen is 256×192 px: 6144-byte bitmap plus 768 attribute bytes, one per 8×8 cell (32×24 cells).
- Attribute byte: bit 7 FLASH, bit 6 BRIGHT, bits 5–3 PAPER, bits 2–0 INK.
- **FLASH**: "Every 16 frames, the ink and paper of all flashing bytes is swapped; ie a normal to inverted to normal cycle takes 32 frames … 0.64 seconds" (WoS 48K reference). That is a swap every 0.32 s at 50 Hz.
- **Frame timing**:
  - 48K: 3.5 MHz, 69,888 T-states per frame, 50.08 Hz.
  - 128K/+2: 3.54690 MHz, 70,908 T per frame, 50.01 Hz (https://worldofspectrum.org/faq/reference/128kreference.htm).
- **Port 0xFE output**: bits 0–2 are the border colour, bit 3 is MIC, bit 4 is EAR/speaker. The beeper is toggled with `XOR $18`, which flips MIC and EAR together. Every JSW sound routine writes the border colour in the same OUT.

---

## 2. JSW1 engine rendering model (the basis JSW2 extends)

### 2.1 Buffers and redraw
- Everything is redrawn every main-loop pass through off-screen buffers, so there is no flicker (memory map: https://skoolkid.github.io/jetsetwilly/maps/all.html):
  - 0x7000: empty-room pixels
  - 0x5E00: empty-room attributes
  - 0x6000 / 0x5C00: working copies that the room is copied into, and that Willy, entities and items are drawn onto
  - The working copies are then block-copied to the display file 0x4000 / 0x5800.
- Main loop order ([89AD](https://skoolkid.github.io/jetsetwilly/asm/89AD.html), [8B07](https://skoolkid.github.io/jetsetwilly/asm/8B07.html)):
  1. Draw lives, straight to the display file.
  2. Copy the empty room into the working buffers.
  3. Move rope and guardians.
  4. Move Willy.
  5. Set Willy's cell attributes (includes the nasty check) and OR-draw Willy.
  6. Handle special rooms (Maria, toilet).
  7. Draw rope, arrows and guardians. Guardians use collision-checked drawing.
  8. Animate the conveyor pixels in the empty-room buffer.
  9. Draw or collect items.
  10. Copy pixels, then attributes, to the screen.
  11. Print the time and item count; advance the clock.
  12. Check BREAK, then pause.
  13. If Willy died, run lose-a-life.
  14. Check the music toggle and play one music note.
  15. Check cheat keys (teleport, WRITETYPER).
  16. Loop.

### 2.2 Screen layout (JSW1)
Sources: [8912](https://skoolkid.github.io/jetsetwilly/asm/8912.html), [898B](https://skoolkid.github.io/jetsetwilly/asm/898B.html), [9A00](https://skoolkid.github.io/jetsetwilly/asm/9A00.html), [89AD](https://skoolkid.github.io/jetsetwilly/asm/89AD.html)

| Char rows | Content |
|---|---|
| 0–15 (y 0–127) | Room: 32×16 cells = 256×128 px |
| 16 | Room name, 32 characters, printed at (16,0). Names are centred by hand with spaces. Attribute 0x46 on the whole row = **bright yellow on black** |
| 17–18 | Blank (attribute 0x00) |
| 19 | `Items collected 000 Time  7:00am`. Colour gradient (see below) |
| 20 | Blank |
| 21–22 | Lives: remaining-life Willy sprites at display address 0x50A0 = (21,0), each 2 columns further right |
| 23 | Blank |

Row 19 details:
- Template [8554](https://skoolkid.github.io/jetsetwilly/asm/8554.html) is printed at (19,0).
- The item count goes at (19,16), 3 digits.
- The time goes at (19,25), 6 characters, e.g. `" 7:00a"`. The template supplies the trailing `m` at column 31.
- Row 19 attributes (all non-bright, black paper): 01,02,03,04,05,06,07 for columns 0–6, then 07 up to column 25, then 06,05,04,03,02,01 for columns 26–31.
  - "Items" reads blue, red, magenta, green, cyan; the rest is white.
  - The clock digits run yellow, cyan, green, magenta, red, blue.
  - This matches the Spectrum Computing JSW1 screenshot.

Lives:
- Up to **7** sprites are visible. Slot attributes on rows 21–22, 2 columns each:
  - 0x45 bright cyan
  - 0x06 yellow
  - 0x04 green
  - 0x41 bright blue
  - 0x05 cyan
  - 0x43 bright magenta
  - 0x44 bright green
- Lives remaining start at 7, so the player has 8 lives in total.
- Sprites are drawn in overwrite mode.
- Animation frame = bits 2–3 of the in-game music note index (`RLCA×3; AND $60`), giving right-facing frames 0–3. All icons dance in sync, changing frame every 4 game frames.
- The note index only advances while music is on, so **with music off the lives freeze** (8B40 and 898B).

"Flickering clock" quirk: on room entry the template's `000` and `00:00 m` show for one frame before the real values are printed ([facts](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

### 2.3 Border
- One byte per room at offset 0xDE of the room definition, sent to port 0xFE on room entry ([80DE](https://skoolkid.github.io/jetsetwilly/asm/80DE.html), [8912](https://skoolkid.github.io/jetsetwilly/asm/8912.html)).
- Across the 60 used rooms (from all 61 room pages [derived]): red 21, blue 15, cyan 10, green 7, magenta 4, yellow 3. Never black or white.
- Music, jump/fall, arrow and item sounds all output the room border colour, so the border stays steady.
- The lose-a-life and game-over sounds set the border **black** (A=0).

### 2.4 Room tile graphics (JSW1 format)
Example room: [C000](https://skoolkid.github.io/jetsetwilly/asm/C000.html). Each room is 256 bytes:

| Offset | Content |
|---|---|
| 0x00–0x7F | Layout: 2 bits per cell, 512 cells (0 background, 1 floor, 2 wall, 3 nasty) |
| 0x80–0x9F | Name, 32 characters |
| 0xA0–0xD5 | 6 tiles × 9 bytes (1 attribute byte + 8 bitmap rows): background, floor, wall, nasty, ramp, conveyor |
| 0xD6–0xD9 | Conveyor: direction, start address, length |
| 0xDA–0xDD | Ramp: direction (up-left or up-right), bottom address, length. Drawn diagonally with step −33 or −31 |
| 0xDE | Border colour |
| 0xE1–0xE8 | **One 8×8 item graphic per room** |
| 0xE9–0xEC | Exits: left, right, up, down |
| 0xF0–0xFF | 8 entity specifications |

- **Tile type is identified by attribute byte equality** at run time (collision, drawing, Willy colour).
  - Two tile types with the same attribute behave identically. Example: "Slippery slopes", where ramps behave as conveyors ([facts](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
  - Graphics lookup uses CPIR on the attribute. This causes the "Corrupted conveyors/nasties" bug when a bitmap byte equals a tile's attribute ([bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html), [8D33](https://skoolkid.github.io/jetsetwilly/asm/8D33.html)).
- Background attribute: 0x00 (black) in 46 of 60 rooms, 0x08 (blue paper) in 7, other values in the rest [derived].
- Tile attributes can carry FLASH, e.g. floor 0xA3 in Entrance to Hades, nasty 0xD6 in First Landing.
- **Conveyor animation** ([94F9](https://skoolkid.github.io/jetsetwilly/asm/94F9.html)): every frame, pixel rows 0 and 2 of the conveyor strip are rotated 2 bits in opposite directions (left-moving: row 0 rotates left, row 2 rotates right; right-moving is the reverse). Rows 1 and 3–7 are static.

### 2.5 How sprites and entities get their colour
- **Willy** ([95C8](https://skoolkid.github.io/jetsetwilly/asm/95C8.html), [961E](https://skoolkid.github.io/jetsetwilly/asm/961E.html), [9637](https://skoolkid.github.io/jetsetwilly/asm/9637.html)):
  - Occupies 2×2 cells, or 2×3 when his pixel y is not a multiple of 8.
  - A cell whose attribute equals the background attribute becomes `background_attr OR 7`: **white INK over that cell's paper**, keeping its PAPER, BRIGHT and FLASH.
  - Cells holding floor, wall, ramp or conveyor keep their own attribute, so Willy's pixels there show in that tile's INK.
  - A nasty attribute in any of his cells kills him.
  - He is 16×16, drawn with OR onto the buffer, no collision test. Frames 0–3 face right, 4–7 face left.
  - In The Nightmare Room he is drawn as a flying pig instead.
- **Guardians** ([91BE](https://skoolkid.github.io/jetsetwilly/asm/91BE.html)):
  - Cell attribute = (cell attribute AND 0x38, i.e. the room's PAPER only) OR guardian INK OR guardian BRIGHT. FLASH is cleared. Applied to 2×2 or 2×3 cells.
  - Drawn in "blend" mode: any set pixel landing on an already-set pixel (Willy, walls, floor, earlier guardians…) kills Willy. This is pixel-perfect collision ([9456](https://skoolkid.github.io/jetsetwilly/asm/9456.html)).
  - "Halo" bug: a BRIGHT guardian on a non-black, non-bright background shows a bright paper box around it ([bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).
  - JSW1 guardian colour counts: yellow 25, magenta 20, green 19, red 18, cyan 18, white 7, blue 2. No black.
- **Arrows**:
  - The cell's INK is forced to white (`OR 7`).
  - Drawn as 3 pixel rows: top, a solid 0xFF shaft, bottom.
  - If the arrow's cell already had white INK (e.g. Willy's cells), any set pixel under the shaft kills Willy.
- **Rope**:
  - Drawn one pixel per segment, 33 segments.
  - **No attribute change**, so it takes the INK of whatever cells it crosses (usually the background INK).
- **Maria**: fixed attributes, 0x45 (bright cyan) top and 0x07 (white) bottom ([9534](https://skoolkid.github.io/jetsetwilly/asm/9534.html)).
- **Toilet**: 0x07 ([959A](https://skoolkid.github.io/jetsetwilly/asm/959A.html)). Animation frame = bit 0 of the per-frame counter.

### 2.6 Items ([93D1](https://skoolkid.github.io/jetsetwilly/asm/93D1.html))
- Each item is one 8×8 cell using the room's single item graphic, copied in overwrite mode.
- INK = `((frame_counter + item_index) AND 3) + 3`, i.e. magenta, green, cyan, yellow. It changes **every frame**, and neighbouring items are out of phase. PAPER and BRIGHT come from the cell.
- An item is **collected when its cell's INK is white**. That happens when Willy overlaps it, or when a white guardian or an arrow crosses it.
- Side effect: a room whose background INK is white (Swimming Pool) self-collects its item.
- The counter is 3 ASCII digits.

### 2.7 Text
- Printed with the **Spectrum ROM font** (bitmaps at 0x3D00, [9691](https://skoolkid.github.io/jetsetwilly/asm/9691.html)), 8×8, straight into the display file.
- JSW2 also uses the ROM-style font (screenshots).
- For the homage: use an original 8×8 font in a similar style.

---

## 3. JSW2 differences (screen and graphics)

- **Status area** (measured from https://jswcentral.org/jsw2-01_jsw2.html screenshots and https://spectrumcomputing.co.uk/entry/2595/ZX-Spectrum/Jet_Set_Willy_II):

| Rows | Content |
|---|---|
| 16 | Room name, centred (the room record's `xname` byte gives the number of leading spaces), **non-bright white** on black |
| 19 | `Rooms 048  TIME          0000:20:40` in **bright white**. "Rooms" cols 0–4, count cols 6–8, "TIME" cols 11–14, clock cols 22–31 as HHHH:MM:SS, colons at cols 26 and 29 |
| 22–23 | Lives: 7 icons in cols 0–13, 2 columns apart, in order **bright blue, red, magenta, green, cyan, yellow, white** |
| 22 | `Items : 057` in **bright yellow**. "Items" cols 16–20, ":" col 22, digits cols 24–26 |

- The "Rooms" count reads 001 in the starting room, so it most likely counts distinct rooms visited (UNCONFIRMED).
- The **colons are missing** in some screenshots (e.g. "0000 20 41", "0000 00 30"), so they appear to **blink**. The blink rate is UNCONFIRMED.
- The clock starts at 0000:00:00 (JSW Central). It "ticks one second for every ten frames", and 4 hour digits allow about 360 million frames. There is no 1 am time limit (https://tasvideos.org/8625S).
- The life icons show the same animation frame in any one screenshot, but different frames in different screenshots. So they are animated in sync; whether that is tied to the music is UNCONFIRMED.
- "Player has in the beginning 8 lives", stored as a shift-register bitmask 0xFE ([instructions text](https://worldofspectrum.net/pub/sinclair/games-info/j/JetSetWillyII_128.txt)).
- **Cells** (seasip, https://www.seasip.info/Jsw/jsw2room.html):
  - A global pool of 9-bit-numbered cells, each 1 attribute byte + 8 bitmap bytes, at 0x8C78 + 9n.
  - Each room chooses 8 patterns: water (walkable, "floor"), earth (wall), fire (nasty), ramp "/", conveyor-left, **item**, ramp "\", conveyor-right. Air is the 9th type.
  - Layout is RLE-compressed. Each byte is type<<4 | (repeat−1); bytes ≥0x90 are air runs of (value−0x7F). Decoding stops at 512 cells.
  - Attribute bit 7 means **inverse** (the bitmap is inverted at start-up), not flash. "All cells are drawn in bright colours."
  - At most 16 items per room; each room keeps a 16-bit mask of untaken items.
  - The border colour is bits 2–0 of `xname`. Room names are dictionary-compressed.
- **Items**: collected items are a cell type drawn with the room's item pattern. In one screenshot, 12 bottles in a row show inks 1→7→1… by column (B R M G C Y W B R M G C). So items appear to cycle through all 7 bright inks with a positional offset. The exact rule is UNCONFIRMED. The instructions call them "flashing objects".
- **Guardian colours**: only 4, from a table at 0x70A9 = {87h, C6h, C5h, C4h}: white, yellow, cyan, green. Arrows use 87h. "Unidirectional guardians are always drawn in white" (seasip). Screenshots agree: yellow, cyan and green guardians, white Willy, red/white bricks.
- **Special effects**: "First Landing: make 'fire' cells flash", done by room code (seasip). There are also "Trip Switch On" and "Time to rescue 999" messages (instructions text).

---

## 4. Title screens

### JSW1 ([87CA](https://skoolkid.github.io/jetsetwilly/asm/87CA.html), [9800](https://skoolkid.github.io/jetsetwilly/asm/9800.html), [8431](https://skoolkid.github.io/jetsetwilly/asm/8431.html), [8454](https://skoolkid.github.io/jetsetwilly/asm/8454.html))
1. The screen is cleared and the attributes for the top two-thirds are copied from 9800.
2. A **Penrose (impossible) triangle** in cyan, green and blue is built from 4 triangle UDGs (8×8 diagonal half-cells). A UDG is drawn wherever the attribute is not 00, D3, 09, 2D or 24. I rendered this from the data to check it.
3. **"JET SET WILLY"** in big block letters is made of empty cells with attribute **0xD3** (FLASH, BRIGHT, PAPER red, INK magenta), so the letters flash bright red and bright magenta every 0.32 s.
4. Row 19 shows `+++++ Press ENTER to Start +++++` in 0x46 (bright yellow on black). The border is black.
5. The **Moonlight Sonata** plays ([96A2](https://skoolkid.github.io/jetsetwilly/asm/96A2.html)). ENTER, 0 or Kempston fire starts the game; this is checked after every tune byte, roughly every 0.3 s.
6. If nothing is pressed, row 19 changes to 0x4F (bright white on blue). The message scrolls one character per step for 224 steps: "+++++ Press ENTER to Start +++++ JET-SET WILLY by Matthew Smith © 1984 SOFTWARE PROJECTS Ltd . . . . .Guide Willy to collect all the items around the house before Midnight so Maria will let you get to your bed. . . . . . . +++++ Press ENTER to Start +++++".
   - Each step, the **whole attribute file** has INK+3 and PAPER+3 (mod 8, BRIGHT cleared, [8AEB](https://skoolkid.github.io/jetsetwilly/asm/8AEB.html)).
   - The border takes the INK of the top-left cell.
   - A "screech" plays each step ([96DE](https://skoolkid.github.io/jetsetwilly/asm/96DE.html)).
7. After the scroll the title is redrawn and the tune replays.

A copy-protection code screen ("Enter Code at grid location") appears before the title. The homage can skip it.

### JSW2 (screenshot https://jswcentral.org/images/03-jsw2/01-jsw2/jsw2_title.png; seasip §9)
- Large **yellow block letters "JET SET WILLY II"** over a **red/green/blue Penrose triangle**.
- `Press ENTER to start` on row 21, cols 6–25, in non-bright yellow.
- Title data: one byte per cell starting at (x=18, y=2).
  - Bit 7 = draw a slope UDG (bit 6 picks / or \).
  - Bits 2–0 = ink, bits 5–3 = paper.
  - BRIGHT is always on.
  - ink = paper = 6 is a special case meaning **flashing magenta on yellow** (the letters).
- The title tune is 99 bytes plus 0xFF, the same format and length as JSW1's, and is **Moonlight Sonata** ([instructions text](https://spectrumcomputing.co.uk/pub/sinclair/games-info/j/JetSetWillyII.txt)).
- After the tune: "a repeating squealing noise as the scrolling message zips across the screen" ([Mastertronic review](https://mastertronic.co.uk/game-review-jet-set-willy-the-final-frontier-zx-spectrum-ricochet/)).
- Before the title: "PRESS ENTER TO CONTINUE", then a colour-code screen with a multicolour square border.

---

## 5. Death, game over, pause, ending

- **Lose a life (JSW1, [8C01](https://skoolkid.github.io/jetsetwilly/asm/8C01.html))**:
  - The death frame is shown once.
  - The top two-thirds attributes are then filled with 0x47, 0x46 … 0x40 in turn: bright INK white, yellow, cyan, green, magenta, red, blue, black, on black paper. The frozen room pixels fade through these colours to black.
  - Each step plays a short note, border black: half-period 13·D+33 T with D=7,15,…,63 (pitch falling); length 8+32·ink half-periods (notes get shorter).
  - Total is about 0.115 s of sound ([sound.ref](https://github.com/skoolkid/jetsetwilly/blob/master/sources/sound.ref)).
  - The room is then re-initialised from the state stored on room entry.
  - JSW2's death visuals: UNCONFIRMED.
  - JSW2 respawns at "the last static solid ground he was standing on" ([TAS 8625](https://tasvideos.org/8625S)).
- **Game over (JSW1, [8C4A](https://skoolkid.github.io/jetsetwilly/asm/8C4A.html))**:
  1. The top two-thirds are cleared. Willy (right-facing frame 2) is drawn at (12,15) on a **barrel** at (14,15).
  2. A **foot** descends from the top, 2 px per step for 49 steps. It is drawn without erasing, so it looks like an extending leg.
  3. The top-two-thirds attribute is 0x47 | paper<<3, paper cycling black, blue, red, magenta (changes every 4 steps). The barrel cells are kept red (INK 2).
  4. Sound: per step, a short burst with pitch rising (delay E = 255 − dist), border black. About 2.06 s in total.
  5. "Game" is printed at (6,10) and "Over" at (6,18). Each letter's INK cycles through the 8 colours, bright on black, offset by one per letter, for about 1.57 s.
  6. Back to the title.
  - Lineage: Manic Miner's boot/plinth.
  - JSW2 is the same concept. Screenshot: white foot and leg, red barrel, "GAME OVER" in uppercase (cyan in that frame) at about row 4, cols 9 and 18; the room name and status row stay visible. Mastertronic review: "a large foot squashes Willy onto a barrel", with an "impending dropping type noise".
- **Pause (JSW1, [89AD](https://skoolkid.github.io/jetsetwilly/asm/89AD.html))**:
  - Any of **A, S, D, F, G** pauses.
  - Any other key resumes. On resume the bottom-third attributes and the border are restored.
  - While paused, every 65,536 loop iterations the whole screen's INK and PAPER shift by +3 and the border follows. [derived] At about 56 T per iteration this is roughly once every ~1.05 s. It does not happen if WRITETYPER is active.
  - **Auto-pause**: an 8-bit inactivity counter (+1 per frame) triggers pause when it overflows, i.e. after about 256 idle frames. Movement and jump keys reset it, and so does playing music every frame, so auto-pause **only happens with music off** ([facts](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
  - CAPS SHIFT + SPACE (BREAK) quits to the title.
  - JSW2 keys per the instructions text: "A S D F G – Pause game", "H J K L <ENTER> – Music on/off". Its colour-cycling behaviour is UNCONFIRMED.
- **Endings**:
  - JSW1: Maria is removed from the Master Bedroom; Willy runs at double speed to the toilet; the toilet animates with his head down it ([9534](https://skoolkid.github.io/jetsetwilly/asm/9534.html), [9584](https://skoolkid.github.io/jetsetwilly/asm/9584.html)).
  - JSW1 clock: runs from " 7:00am" and quits at 1 am. am/pm only flips at 12→1, so noon shows as "12:00am" ([bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).
  - JSW2: 150 of 175 items remove Maria; the toilet then takes Willy to "Central Cavern (from Manic Miner) but in different colours, jumping up and down constantly" (Mastertronic review; seasip special-case IDs).

---

## 6. Audio (1-bit beeper, one channel, blocking)

- All sound is **CPU-timed square wave** on port 0xFE (`XOR $18`). The game logic stops while sound plays; there is no concurrency.
- Pitch = delay-loop count. Frequency formula [derived, cross-checked against SkoolKit's audio T-state values]:
  - Music loops take 40 T per iteration, so the half-period is 40·D+6 T and **f ≈ 3,500,000 / (80·D + 12) Hz**. Example: D=0x56 → 508 Hz.
  - The table values follow an equal-tempered scale with delay ∝ 1/f: 0x80, 0x72, 0x66, 0x60, 0x56, 0x51, 0x4C, 0x48, 0x44, 0x40, 0x3C, 0x39, 0x36, 0x33, 0x2D, 0x28… On this formula the whole scale sits about 40 cents flat.

### 6.1 In-game music ([8B07](https://skoolkid.github.io/jetsetwilly/asm/8B07.html))
- 64-byte note table.
- Each main-loop pass increments the note index. Table entry = (index AND 0x7E)/2, so **each note plays on 2 consecutive frames** and one loop is 128 frames.
- Each frame plays a single blip of 768 loop iterations, about 30,700 T ≈ **8.8 ms**, followed by silence for the rest of the frame. The effect is a staccato, tempo-by-frame-rate tune. SkoolKit's render of the whole loop runs 11.5 s.
- Pitch offset: D = note + 28 − 4·lives. The fewer lives, the lower the pitch ("The music of life", [facts](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
- Toggle: **H, J, K, L or ENTER**, edge-triggered (bit 0 of 85E2 is a "key held" flag, bit 1 is music off) ([85E2](https://skoolkid.github.io/jetsetwilly/asm/85E2.html)).
- Tunes:
  - JSW1: *If I Were a Rich Man* (copyrighted, avoid).
  - JSW2: Grieg's ***In the Hall of the Mountain King*** (public domain). Sources: the instructions text, the Mastertronic review ("the same tune that was in Manic Miner"), and seasip (64 bytes at 0xFAF0 in MM/JSW1 format).
  - MM's version of that tune is at https://skoolkid.github.io/manicminer/asm/858C.html. Whether JSW2's bytes are identical is UNCONFIRMED.
- Turning music off gives "a considerable speed boost" (both TAS pages).

### 6.2 Title tune ([96A2](https://skoolkid.github.io/jetsetwilly/asm/96A2.html), [85FB](https://skoolkid.github.io/jetsetwilly/asm/85FB.html))
- 99 bytes. Each byte plays about 0.15 s at pitch E, then about 0.15 s an octave lower (E doubled). About 29 s in total. Border black.

### 6.3 Sound effects
Half-period ≈ 13·D+33 T for the DJNZ-delay routines ([sound.ref](https://github.com/skoolkid/jetsetwilly/blob/master/sources/sound.ref)). Recordings of each effect: https://skoolkid.github.io/jetsetwilly/sound/sound.html

| Effect | Implementation |
|---|---|
| Jump ([8DD3](https://skoolkid.github.io/jetsetwilly/asm/8DD3.html)) | Every frame of the 18-frame jump, 32 half-periods with D = 8·(1+\|J−8\|). Pitch rises as Willy rises and falls as he falls (about 2 kHz at start, about 12.8 kHz at the apex, about 1.5 kHz at the end) |
| Fall | Every falling frame, D = 16·A (airborne counter; runs 3…15, then cycles 12–15), 32 half-periods. Descending pitch |
| Item collect ([93D1](https://skoolkid.github.io/jetsetwilly/asm/93D1.html)) | C runs 128→4 in steps of −2, delay 0x90−C. A fast descending chirp of about 19 ms |
| Arrow warning ([91BE](https://skoolkid.github.io/jetsetwilly/asm/91BE.html)) | Rising sweep (delay C: 128→1), about 32 ms. Plays once per pass while the arrow is **off-screen**, at x=44 when moving left (it appears at x=31, 13 frames later) or x=244 when moving right (it appears at x=0, 12 frames later). Arrows move 1 cell per frame on a 256-position wraparound |
| Death / game-over | See section 5 |
| Title screech ([96DE](https://skoolkid.github.io/jetsetwilly/asm/96DE.html)) | Noisy sweep with value 0x32–0x51 depending on scroll position; also flickers the border |

JSW2 sound effects are UNCONFIRMED in detail. The Mastertronic review lists sounds for item collection, collisions, falling too far, and game over.

---

## 7. Timing and frame rate

- **JSW1 has no frame sync**: interrupts are disabled and there is no HALT, so the loop runs as fast as the CPU allows.
- SkoolKit's audio renders model the gap between main-loop passes as **280,000–290,000 T-states** ([sound.ref](https://github.com/skoolkid/jetsetwilly/blob/master/sources/sound.ref), [jsw.ref](https://github.com/skoolkid/jetsetwilly/blob/master/sources/jsw.ref)). That gives **≈12–12.5 game frames per second on a 48K**, about one game frame per 4 TV frames.
- [derived] The four block copies alone cost 193,536 T per frame before contention (512 + 4096 + 4096 + 512 bytes × 21 T), and all buffers sit in contended RAM. Music adds about 30,700 T.
- TASVideos ([8012](https://tasvideos.org/8012S)): "In best conditions, the game runs at approximately one in-game frame every 0.07 seconds" (+2A, music off, about 14 fps). It is slower with music on, with more lives, and while airborne. A "9–13 fps" figure appeared only in a search summary: UNCONFIRMED.
- JSW1 clock: +1 game minute per 256 main-loop passes. 7 am to 1 am is 276,480 frames, "about six hours real-time".
- **JSW2 runs faster**: "approximately one in-game frame every 0.04 seconds" in best conditions (about 25 fps, +2A). Inputs are read once per frame. The clock adds 1 s per 10 frames. A TAS reached the ending in 24,950 game frames over 22:17 real time, about 18.7 fps on average ([8625](https://tasvideos.org/8625S)).
- Movement speeds, for reference: 2 px per frame horizontally; a jump lasts 18 frames and peaks 20 px up; falling is 4 px per frame (both TAS pages).

**Homage suggestion (a design choice, not source data):** run logic on a fixed timestep of about 50–80 ms (≈12.5 Hz for JSW1 feel, ≈20–25 Hz for JSW2). Render at display rate, and toggle FLASH attributes every 320 ms of real time. Play the in-game music as one short blip per logic tick, with each note held for 2 ticks.