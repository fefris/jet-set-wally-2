# Jet Set Wally II: Research & Authoritative Implementation Spec

Status: **authoritative**. Where this file and `docs/PLAN.md` disagree, this file wins for *numbers*, and PLAN.md wins for
*product decisions* (both were written to agree; report any conflict).

Scope: faithful Jet Set Willy / Jet Set Willy II (JSW1 = *Jet Set Willy*, 1984; JSW2 = *Jet Set Willy II*, ZX Spectrum,
1985) engine mechanics and ZX Spectrum presentation. Our game uses an **original** hero (Wally), original rooms, sprites,
names and text, and **public-domain music only**.

How to read this:

* **JSW1 numbers** come from Richard Dymond's SkoolKit disassembly (code-level, verified). **JSW2 numbers** come from
  John Elliott's partial disassembly (seasip), the TASVideos notes, and fan sources (no full disassembly exists).
* **[FC]** marks a value that the fact-check *corrected*; the corrected value is the one given.
* **UNCONFIRMED** means no primary source was found. Each one has a **Default:** that we implement.
* **Ours:** marks a deliberate homage decision, such as a bug fix or a browser adaptation.
* Units: the original stores Willy's y in **half-pixels**. Everything below is in **pixels** unless it says "half-px".
  Cells are 8×8 px. We write `(col,row)` for a cell and `y` for the pixel row of the **top** of a 16×16 sprite.
* "Frame" means one pass of the game's main loop (a **logic frame**), not a 50 Hz TV frame.

### Corrections applied from the fact-checks

| # | Topic | Corrected value used here |
|---|---|---|
| 1 | Willy's white-INK cells | Only cells whose attribute **equals the room background** are recoloured to white INK. Floor, ramp and other tiles keep their own colour, even in the top two rows. The bottom (3rd) row is recoloured only if `(y + B) mod 8 ≠ 0`. |
| 2 | Arrow warning sound | 128 speaker toggles with delays **2, then 128 down to 2**, not "128 to 1". |
| 3 | JSW2 guardian colours | 0x87 = **non-bright** white. 0xC6, 0xC5, 0xC4 = BRIGHT yellow, cyan, green. All four have bit 7 set (purpose unknown). Unidirectional guardians use attr 0x80, but seasip says they are drawn white. |
| 4 | JSW2 entity cap | **8 guardians *or* arrows in total** per room, not 8 + arrows. Lifts use guardian slots, so lift rooms have ≤ 6 guardians. A count > 8 is treated as 0. |
| 5 | JSW2 ceiling bump | The TAS says the jump is cancelled and **all motion stops**, and the fall at 4 px/frame starts the next frame. The forum's "moves forward one step" claim is contradicted. |
| 6 | JSW2 "step forward before jumping from standstill" | **Unproven** in code. Only the turning-frame jump carrying horizontal motion is verified. |
| 7 | POKE 31657 | This is "max monsters per room (1–15)". The "AND mask / 9" reading is unsupported. |
| 8 | JSW2 top-floor layout | The Master Bedroom is **4 columns west** of The Bathroom, with 3 rooms between (Top Landing, Macaroni Ted, Dumb Waiter). "2 rooms west" is the JSW1 layout. |
| 9 | JSW2 "run right if won" rooms | Special-case IDs **9** (Bathroom), **10** (Master Bedroom), **20** (labelled "First Landing"; almost certainly Top Landing, UNCONFIRMED), **23** (Macaroni Ted) and **24** (Dumb Waiter). |
| 10 | JSW2 lift special cases | **7** lift pairs, not 6 (IDs 2–5, 19, 21, 24). |
| 11 | JDW 100 % route | Visits **131** rooms (132 counting the Central Cavern), not 133. |
| 12 | Without A Limb death path | The order is Inside The Megatree → Without A Limb (die) → The Front Door → The Security Guard → Out On A Limb. |
| 13 | Game-over paper cycle | The paper changes on **every** step (black → blue → red → magenta, repeating every 4 steps). The barrel's INK is forced red. |
| 14 | JSW2 Bathroom handler | This handler **also** forces the rightward run once the game is won. |
| 15 | Rope swing | The step-4 zone is: magnitude after the first −2 is < 0x14 when moving *toward* the centre, or after the first +2 is < 0x12 when moving *away*. Re-verified from the code at 90D9 and simulated: the period is 90 frames. |

---

## 1. Summary of Jet Set Willy II

**What it is.** *Jet Set Willy II: The Final Frontier*, Software Projects, 1985, ZX Spectrum 48K, programmed by Derrick
P. Rowson.

* It began as the Amstrad CPC conversion of JSW1 by Rowson and Steve Wetherill. Their room data compression freed memory
  for 74 new rooms. That version shipped on the CPC as "Jet Set Willy – The Final Frontier" (April 1985). Rowson then
  ported it back to the Spectrum on his own (summer 1985).
* The engine is a **rewrite**, not a patch of Matthew Smith's code. The core feel is the same: speeds, jump arc and fall
  limits. The input, landing, respawn and room format differ.
* Reviewers called it "a deluxe version" rather than a true sequel.

**Story and objective.**

* Willy's builders have added rooms, including a rocket, sewers, a starship and an alien planet. Maria (the housekeeper)
  will not let him into bed until the mess is cleared.
* **Collect at least 150 of the 175 flashing items**, then return to the **Master Bedroom**.

**Ending.** These are the JSW2 special-case room codes (seasip):

1. In the Master Bedroom, Maria is removed once **≥ 150 items** are collected.
2. Standing on the bed (a **right-moving conveyor**) starts Willy **running right automatically**.
3. The rooms on the path also force the run once the game is won: Top Landing, Macaroni Ted, Dumb Waiter and The
   Bathroom. On the way he can grab the Bathroom tap (the 175th item).
4. Hitting the toilet in **The Bathroom** moves him to **room 133, "Oh $#!+! The Central Cavern!"**. That is an
   unplayable Manic-Miner-first-cavern replica where Willy **jumps on the spot repeatedly** (his "recurring nightmare").
5. JSW Central counts reaching this room as completion. What happens next is UNCONFIRMED.

**Headline numbers.**

| Item | JSW1 (1984) | JSW2 (1985, Spectrum) | Ours |
|---|---|---|---|
| Room slots / playable | 61 / 60 (0x2F "[" unused) | **134 entries / 133 reachable** ("cheat" is unreachable). The Central Cavern (#133) is reached only via the ending | ≈134 (PLAN §6) |
| Rooms needed | all | ≤ 100 for the minimum; 126 for 100 % items | solver-verified |
| Items | 83 (indices 0xAD–0xFF) | **175**, of which **150** are needed; ≤ 16 per room | ≈175 / 150 needed |
| Lives | 7 spare = **8 total**, no bonus | **7 spare = 8 total**, no bonus. Stored as bitmask 0xFE rotated through carry | 7 spare, 8 total |
| Clock | Starts " 7:00am". 1 game minute = 256 frames. **Quits at 1:00am** (1080 min = 276,480 frames) | **Elapsed timer `HHHH:MM:SS` from 0000:00:00. 1 s = 10 frames. No deadline.** It stops while the rocket flies | JSW2 timer |
| Start | The Bathroom, cell (20,13), y = 104 | The Bathroom (exact coordinates UNCONFIRMED) | our Bathroom |
| Frame rate (real HW) | ≈ 12–14 fps, unsynced | ≈ 25 fps best case, ≈ 18.7 fps average in the TAS, unsynced | fixed 20 Hz logic |
| Record times | — | 0000:42:42 (minimum items), 0001:08:11 (all items) | — |

**JSW2 map composition** (count from Wiseman's map): 60 JSW1 rooms (several renamed) + 33 new mansion and grounds rooms
+ 7 sewer rooms + 23 starship rooms + 10 planet ("Teleport Zone") rooms + 1 Central Cavern = **134**. In the 33 space
rooms Willy wears a spacesuit.

---

## 2. Screen & graphics system

### 2.1 Display fundamentals

* The screen is **256 × 192 px**, laid out as 32 × 24 character cells of 8 × 8 px each.
* Storage is a 1-bit bitmap (6144 bytes) plus **one attribute byte per cell** (768 bytes).
* **Attribute byte:** `FLASH<<7 | BRIGHT<<6 | PAPER<<3 | INK` (PAPER and INK are each 0–7).
* Each cell has exactly **two colours**: INK for set pixels and PAPER for clear pixels. BRIGHT and FLASH apply to the
  whole cell. This is the source of colour clash, and we reproduce it.
* **FLASH** swaps INK and PAPER every **16 TV frames = 320 ms** (a full cycle is 640 ms). Ours: toggle on a real-time
  320 ms clock that does not depend on logic speed.
* **Border:** 8 non-bright colours only. There is no border graphics. Ours: draw a border of **32 px left/right and 24 px
  top/bottom**, giving a 320 × 240 logical canvas, integer-scaled with nearest-neighbour. (Border size: UNCONFIRMED.
  Default as stated.)
* **Hardware timing, for reference:**
  * 48K: 3.5 MHz, 69,888 T-states per TV frame, 50.08 Hz.
  * 128K: 3.5469 MHz, 70,908 T-states, 50.01 Hz.
  * Port 0xFE: bits 0–2 = border, bit 3 = MIC, bit 4 = speaker. The game toggles with `XOR $18`.

### 2.2 Palette (15 distinct colours; BRIGHT black = black)

Colour index bits are G R B. **Default levels: normal 0xD7 (215), bright 0xFF (255).**

| # | Name | Normal hex | Normal RGB | Bright hex | Bright RGB |
|---|---|---|---|---|---|
| 0 | black | #000000 | 0,0,0 | #000000 | 0,0,0 |
| 1 | blue | #0000D7 | 0,0,215 | #0000FF | 0,0,255 |
| 2 | red | #D70000 | 215,0,0 | #FF0000 | 255,0,0 |
| 3 | magenta | #D700D7 | 215,0,215 | #FF00FF | 255,0,255 |
| 4 | green | #00D700 | 0,215,0 | #00FF00 | 0,255,0 |
| 5 | cyan | #00D7D7 | 0,215,215 | #00FFFF | 0,255,255 |
| 6 | yellow | #D7D700 | 215,215,0 | #FFFF00 | 255,255,0 |
| 7 | white | #D7D7D7 | 215,215,215 | #FFFFFF | 255,255,255 |

Other normal levels seen in the wild, which could be offered as a palette option:
* 0xC0 (Fuse)
* 0xC5/0xC6/0xCD (SkoolKit defaults)
* 0xCE (JSW Central screenshots)
* 0xBD with bright 0xDE (Spectrum Computing GIF)

### 2.3 Screen layout

The playfield is character rows 0–15 (y 0–127): **32 × 16 cells = 256 × 128 px**. The status area is rows 16–23.

**JSW1 status area (reference):**

| Row | Content | Attributes |
|---|---|---|
| 16 | Room name, 32 chars, centred by hand with spaces | 0x46 (bright yellow on black) for the whole row |
| 17–18 | blank | 0x00 |
| 19 | `Items collected 000 Time  7:00am`. Items at (col 16, 3 digits); time at col 25, 6 chars (e.g. `" 7:00a"`); the trailing `m` comes from the template at col 31 | non-bright on black: cols 0–6 = INK 1,2,3,4,5,6,7; cols 7–25 = 7; cols 26–31 = 6,5,4,3,2,1 |
| 20 | blank | |
| 21–22 | Lives: up to 7 Willy sprites from (21,0), 2 cols apart, overwrite-drawn | slot attrs 0x45, 0x06, 0x04, 0x41, 0x05, 0x43, 0x44 |
| 23 | blank | |

**JSW2 status area** (measured from screenshots). **This is what we copy:**

| Row | Content | Colour |
|---|---|---|
| 16 | Room name, **centred**. The room record stores the count of leading spaces | **non-bright white** on black (0x07) |
| 17–18 | blank | |
| 19 | `Rooms` in cols 0–4; 3-digit count in cols 6–8; `TIME` in cols 11–14; clock `HHHH:MM:SS` in cols 22–31 (colons at cols 26 and 29) | **bright white** on black (0x47) |
| 20–21 | blank | |
| 22–23 | **7 life icons** (16 × 16 each) in cols 0–13, 2 cols apart, coloured **blue, red, magenta, green, cyan, yellow, white** (left to right) | BRIGHT (UNCONFIRMED; JSW2 draws its cells bright). Default: BRIGHT |
| 22 | `Items` in cols 16–20, `:` in col 22, 3 digits in cols 24–26 | **bright yellow** on black (0x46) |

Notes on the JSW2 status area:

* The **colons blink**: some screenshots show "0000 20 41". The rate is UNCONFIRMED. **Default:** colons are visible when
  `(frame mod 10) < 5`, i.e. tied to the game second.
* **"Rooms"** reads 001 in the start room. It most likely counts distinct rooms visited (UNCONFIRMED). **Default:** count
  distinct rooms visited, including the start room.
* **Life icons:** the number of icons equals the spare lives, and the current life is not shown. All icons dance in sync.
  * JSW1 takes the icon frame from bits 2–3 of the music note index, so the frame changes every 4 frames and **freezes
    when music is off**.
  * **Default:** the same as JSW1 (UNCONFIRMED for JSW2).
* **HUD redraw:** JSW1 showed "000"/"00:00" template values for one frame on room entry (the "flickering clock" quirk).
  Ours: always print the real values. The quirk is dropped.

### 2.4 Text

* The originals print with the Spectrum ROM 8 × 8 font straight into the display file.
* **Ours:** an **original** 8 × 8 font in a similar style. Do not copy the ROM font.

### 2.5 How colour is produced per frame (render pipeline and draw order)

The draw order matters for colour clash. This is the JSW1 pipeline; JSW2's result is the same (one XOR copy screen).
Ours reproduces the visual result:

1. **Empty room** (tile bitmaps and attributes, with the conveyor animation applied) is copied to the work buffers.
2. **Willy's attribute pass** covers Willy's cell block: 2 wide × 2 tall, or 3 tall when `(y + B) mod 8 ≠ 0`.
   * **[FC]** A cell whose attribute **equals the room background attribute** becomes `bg | 7` (white INK, keeping
     PAPER, BRIGHT and FLASH).
   * Floor, wall, ramp and conveyor cells keep their own attribute, so Willy's pixels there show in that tile's INK.
3. **Willy** is OR-drawn (16 × 16, no collision test in the original).
4. **Special fixed sprites:** Maria (top half 0x45 bright cyan, bottom half 0x07 white) and the toilet (0x07).
5. **Rope, arrows and guardians**, in entity-list order:
   * **Rope:** OR-drawn pixels, **no attribute writes**. It shows in the INK of the cells it crosses.
   * **Arrow:** its cell's INK is OR'd to white (7), keeping PAPER. It is drawn as 3 **overwritten** pixel rows.
   * **Guardian:** the attribute of every cell in its 2 × 2 block (2 × 3 when `y mod 8 ≠ 0`) becomes
     `(top-left cell attr AND 0x38) | INK | BRIGHT<<6`. So it takes the **top-left cell's PAPER**, its own INK and
     BRIGHT, with **FLASH cleared**. It overwrites Willy's white (colour clash). The sprite is OR-drawn.
6. **Conveyor pixels** are rotated for the next frame (§3.5).
7. **Items** are drawn as 8 × 8 overwrites with cycling INK (§5.6). Collected items are not drawn.
8. The buffers are copied to the screen and the HUD is printed.

Ours:
* Keep this visual order and every attribute rule above.
* Compute collisions **logically**, not from the pixel buffer (§5.8).
* Willy's third-row whitening and the guardian block attribute behave as above.

### 2.6 Colour usage stats (for authoring flavour)

* **JSW1 borders** over 60 rooms: red 21, blue 15, cyan 10, green 7, magenta 4, yellow 3. Never black or white.
* **JSW1 background attribute:** 0x00 (black) in 46 rooms, 0x08 (blue paper) in 7, others in the rest.
* **JSW1 guardian INKs:** yellow 25, magenta 20, green 19, red 18, cyan 18, white 7, blue 2 (both BRIGHT), black 0.
* **JSW2:**
  * All room cells are drawn BRIGHT. In JSW2 cell patterns, attribute bit 7 means "invert bitmap", not FLASH.
  * Guardians have only **4 colours**: white 0x87 (non-bright), bright yellow 0xC6, bright cyan 0xC5, bright green 0xC4.
  * Arrows use 0x87.
* **Ours:**
  * Tiles use any colours, with BRIGHT per tile style.
  * Guardians default to the JSW2 four (white, bright yellow, bright cyan, bright green), but any INK is allowed (JSW1
    variety).
  * Background INK is **never white** (validator rule; §9).

### 2.7 Title screen

**JSW1:**
1. The top two-thirds are drawn as coloured cells plus 4 half-cell diagonal UDGs (slope pieces), forming a Penrose
   triangle.
2. "JET SET WILLY" is in block letters made of cells with attr 0xD3 (FLASH, BRIGHT, red paper, magenta INK).
3. Row 19 shows `+++++ Press ENTER to Start +++++` in 0x46. The border is black.
4. The **Moonlight Sonata** plays. ENTER, 0 or fire starts the game; this is checked after every tune byte (≈ 0.29 s).
5. Then row 19 turns 0x4F (bright white on blue) and a message scrolls **one character per step for 224 steps**.
   * Each step, the whole attribute file gets INK +3 and PAPER +3 (mod 8, BRIGHT cleared).
   * The border follows the top-left INK.
   * A "screech" plays each step (value 0x32–0x51).
6. The title then repeats.

**JSW2:**
* Large yellow block letters "JET SET WILLY II" over a red/green/blue Penrose triangle.
* `Press ENTER to start` on row 21, cols 6–25, non-bright yellow.
* Title data: one byte per cell starting at (x = 18, y = 2).
  * Bit 7 = slope UDG, and bit 6 picks `/` or `\`.
  * Bits 5–3 = PAPER, bits 2–0 = INK. BRIGHT is always on.
  * ink = paper = 6 is a special case meaning **flashing magenta on yellow** (the letters).
* The title tune is 99 bytes + 0xFF in JSW1 format (Moonlight Sonata).
* After the tune, a "repeating squealing noise as the scrolling message zips across". Rowson removed the flashing border
  and the screech in JSW2+.
* One research report calls the JSW2 title picture a "mansion"; the screenshot shows the triangle. Treat it as cell and
  slope art.
* JSW2 also has an **idle attract "tour"** that previews each room in turn.

**Ours:**
* An original big block-letter logo "JET SET WALLY II" with FLASH letters.
* An original cell and slope-UDG picture.
* `Press ENTER to start`, then a scrolling message with the +3/+3 attribute cycling.
* PD Moonlight Sonata in the same two-note octave style.
* An optional attract tour (UNCONFIRMED timing; **Default:** after one full tune + scroll cycle, show each visited room,
  or all rooms if none, for 1.5 s; any key returns).
* Skip the copy-protection code-card screen.

---

## 3. Room data model

### 3.1 Original formats (reference)

**JSW1 room: 256 bytes.**

| Offset | Content |
|---|---|
| 0x00–0x7F | Layout, 2 bits per cell × 512 cells: 0 background, 1 floor, 2 wall, 3 nasty |
| 0x80–0x9F | Name, 32 characters |
| 0xA0–0xD5 | 6 tiles × 9 bytes (1 attr + 8 bitmap rows): background, floor, wall, nasty, ramp, conveyor |
| 0xD6–0xD9 | Conveyor: direction (0 left, 1 right), start cell, length. **One horizontal run per room** |
| 0xDA–0xDD | Ramp: direction (0 = rises left `\`, 1 = rises right `/`), bottom cell, length. **One 45° run per room**, drawn with attr step −33 / −31 |
| 0xDE | Border colour |
| 0xE1–0xE8 | The room's single 8 × 8 item graphic |
| 0xE9–0xEC | Exits: **left, right, up, down** (room numbers; "none" = self or 0) |
| 0xF0–0xFF | 8 entity specs (guardians, arrows, rope) |

In JSW1, **tile type is decided by comparing whole attribute bytes**. Two tile types with the same attribute behave the
same ("Slippery slopes", "Floor ramps"). Graphics lookup by CPIR causes the "corrupted conveyor/nasty" bugs. **Ours:**
tile types are explicit, so none of this applies.

**JSW2 room** (seasip):
* **Cell types:** 0 air, 1 water (= stand-on floor), 2 earth (= wall), 3 fire (= nasty), 4 `/` ramp, 5 left conveyor,
  6 **item**, 7 `\` ramp, 8 right conveyor.
* **Layout:** RLE-compressed. Byte = `type<<4 | (repeat−1)`; bytes ≥ 0x90 are air runs of (value − 0x7F). Decoding stops
  at 512 cells.
* **Graphics:** each room picks 8 patterns (water, earth, fire, `/`, conv-L, item, `\`, conv-R) from a global cell bank
  of 9 bytes each (1 attr + 8 bitmap), using 9-bit indices.
* **Header:**
  * Exits in the order **left, up, right, down**.
  * `xname`: bits 2–0 = border colour; the rest gives the name-centring spaces.
  * Dictionary-compressed name.
  * T4 byte: bit 7 = rope flag; bit 6 = animate conveyor; bit 5 = animate top row only vs top + third row; bits 0–3 =
    guardian count (> 8 is treated as 0).
  * Special-case ID (table at 8361h: init routine and per-frame routine).
  * Arrow flag.
* **Limits:** **8 guardians + arrows combined**. Lifts use guardian slots. **≤ 16 items per room**, tracked by a 16-bit
  "untaken" mask per room (no global item table). Several ramps and conveyors per room are allowed. **Only one contiguous
  conveyor strip animates.**

### 3.2 Our room model

See PLAN.md §4 for the `JSW.defineRoom` syntax.

| Field | Rule |
|---|---|
| Grid | 32 × 16 cells. `map` = 16 strings of 32 chars, mapped through a per-room legend |
| Tile types | `air`, `floor` (one-way platform = JSW "water"), `wall` (solid on all sides = "earth"), `nasty` (kills on contact = "fire"), `ramp` with `/` (rises to the right) or `\` (rises to the left), `conveyor` with `dir: left/right`. **Items** are `+` placed on air cells. Any number of ramps and conveyors, both directions allowed |
| Tile style | 8 × 8 bitmap (original art) + INK, PAPER, BRIGHT, FLASH. Exactly **one** air style (the background attribute). Background INK **must not be white** |
| Item graphic | One 8 × 8 graphic per room, shared by all its items (JSW1/JSW2 convention). ≤ 16 items per room |
| Border | One of the 8 non-bright colours. Avoid black and white (JSW1 convention) |
| Name | ≤ 32 chars, auto-centred on row 16 |
| Exits | Derived from world-grid neighbours (left, right, up, down), with explicit overrides. `null` = no exit; the edge must then be sealed (PLAN §5). One-way links go in `special` |
| Entities | ≤ **8 guardians + arrows** (lifts count toward the 8), plus ≤ 1 rope |
| Specials | Data-driven per-room behaviours (§6.8) |

**Ramps** (drawn as 45° diagonal runs, one cell across per cell up):
* A **`/` ramp** occupies cells (c, r), (c+1, r−1), (c+2, r−2), …
* A **`\` ramp** occupies cells (c, r), (c−1, r−1), …
* Ramps behave like floor for support: Willy can stand on them, walk sideways through them, and jump up through them.
  The step logic in §4.8 is what makes him climb.

**Conveyors** push by faking a keypress (§4.9).
* Animation: every frame, pixel rows **0 and 2** of the conveyor tile rotate 2 bits in opposite directions.
  * Left-moving: row 0 rotates left, row 2 rotates right. Right-moving is the reverse.
  * The movement report's "rows 1 and 3" is the same pair, counted from 1.
* Ours: every conveyor strip animates. (JSW2 animated only one contiguous strip; JSW1 had one strip per room.)
* A conveyor may look static if its pattern is symmetric (the JSW bed used 0x55).

---

## 4. Willy movement physics (exact)

### 4.0 Constants at a glance

```
WALK            2 px per frame; 4 frames per 8-px cell; x = 8*col + 2*frame (col 0..30, frame 0..3)
JUMP_DY[j]      [-4,-4,-3,-3,-2,-2,-1,-1,0,0,+1,+1,+2,+2,+3,+3,+4,+4] px, j = 0..17
JUMP            18 frames, peak 20 px, 36 px horizontal on flat ground (take-off step + 17 steps)
LANDING CHECKS  mid-jump only when the new counter is 13 (16 px above take-off) or 16 (8 px above), then after 18
FALL            4 px per frame; airborne counter 2..15, 16 wraps to 12; landing with counter >= 12 = death
SAFE DROPS      walk-off: <= 4 cells (32 px); after a jump: <= 2 cells (16 px) below take-off; after a ceiling bump: <= 4 cells
REACH           land on ledges <= 2 cells (16 px) above the feet; collect items up to 5 cells above the floor
SPRITE          16 x 16, 2 cells wide; 2 rows tall when y mod 8 == 0, else 3
ROOM EDGES      left: col 0 frame 0 -> col 30 (frame kept); right: col 30 frame 3 -> col 0 (frame kept)
                up: y := 104, airborne := 0; down: y := 0, airborne := (airborne < 11 ? 2 : airborne)
```

### 4.1 State

| Field | Meaning |
|---|---|
| `col` | 0..30, left cell of the 2-cell-wide sprite |
| `frame` | 0..3. Sub-cell x **and** animation frame. Pixel x = 8·col + 2·frame |
| `y` | Pixel row of the sprite top, normally 0..112. `row = y >> 3`. On a ramp, y stays cell-aligned and the sprite is **drawn** at y + B (§4.8) |
| `facing` | 0 = right, 1 = left |
| `moving` | bool. Original flags byte = `facing | moving<<1` (values 0..3) |
| `airborne` | 0 = on the ground; 1 = jumping; 2..11 = falling, safe to land; 12..15 = falling, fatal to land; DEAD |
| `jc` | Jump counter 0..18 |
| `rope` | 0 = off; 1..32 = holding that segment; cooldown −16..−1, counting up to 0 (original 0xF0..0xFF) |

### 4.2 Animation frames and sprite

* There are **8 frames** of 16 × 16. Sprite index = `frame + 4·facing`.
* Right-facing frames 0→3 show the figure **shifted +2 px per frame** inside the 16-px box. In JSW1 the first rows are
  $3C00 → $0F00 → $03C0 → $00F0.
* Left-facing frame k = **mirror of right-facing frame (3−k)**.
* Walking right, frame goes 0,1,2,3, then col+1 and frame 0. Walking left, frame goes 3,2,1,0, then col−1 and frame 3.
* Ours: design the figure to fit a ~10-px-wide band so frames 0–3 can shift it by 0/2/4/6 px. Wally's walk poses can
  differ per frame. Keep the mirror rule so turning is positionally continuous.
* JSW1 swaps in a flying-pig sprite in The Nightmare Room. **Ours:** optional per-room `playerSprite` override (e.g. the
  spacesuit in space rooms, as JSW2 did).

### 4.3 Input model

**JSW1 flag table** (at 8421). Rows are the current flags; columns are the keys held:

| flags | none | left | right | both |
|---|---|---|---|---|
| 0 (right, still) | 0 | **1** (turn, no move) | 2 (move) | 0 |
| 1 (left, still) | 1 | 3 (move) | **0** (turn, no move) | 1 |
| 2 (right, moving) | 0 (stop) | **1** (turn + stop) | 2 | 2 |
| 3 (left, moving) | 1 (stop) | 3 | **0** (turn + stop) | 3 |

`FLAG_TABLE = [0,1,0,1, 1,3,1,3, 2,0,2,0, 0,1,2,3]`, index = `flags + 4·left + 8·right`.

* **Turning costs one frame with no movement.** There is no acceleration or deceleration.
* **Both directions held = keep doing what you were doing.**
* **Jump:** checked on **every** grounded frame, with no edge detection, so **holding jump re-jumps on landing**.
  * Take-off sets `jc = 0` and `airborne = 1`.
  * Willy takes his 2-px step **on the take-off frame** (if moving).
* **JSW1:** the flags update before the jump, so jumping on a turning frame gives a **vertical** jump.
* **JSW2 (adopted):** a jump pressed on the turning frame **moves horizontally** in the new direction.
  * Ours: if jump is pressed and exactly one of left/right is held (after conveyor forcing), set `moving = true`.
  * JSW2 lets you "jump in the opposite direction immediately upon landing, without releasing jump". This falls out of
    the above together with §4.4's no-dead-frame landing.
* **"Step forward before jumping from standstill"** (Wikipedia/JSW Central): **UNCONFIRMED [FC]**. **Default:** not
  implemented beyond the turning-frame rule. A jump with no direction key is vertical.
* JSW2 reads input **once per frame**; while airborne only pause, music and quit are checked. There is **no air control**.
  Facing and moving are fixed at take-off.

**Keys:**
* JSW1: left = Q E T U O, 5, 6; right = W R Y I P, 7, 8; jump = the whole bottom row plus 0; pause = A S D F G;
  music = H J K L ENTER; quit = CAPS + SPACE; Kempston.
* JSW2: the same letter keys plus Kempston (joystick and number keys UNCONFIRMED).
* **Ours:**
  * left = Q E T U O and ←; right = W R Y I P and →.
  * jump = Z X C V B N M, Space, Shift and ↑.
  * pause = A S D F G (plus P); music = H J K L Enter; quit to title = Esc.
  * Gamepad = Kempston.

### 4.4 Jump (per frame while `airborne == 1`)

1. `y += JUMP_DY[jc]`.
2. If `y < 0`: **exit up** (§4.10). Return.
3. **Ceiling:** if `wall(col, row)` or `wall(col+1, row)` (row = y >> 3, the sprite's top row):
   * `y = (y + 8) & ~7` (snap the top to just below the wall);
   * `airborne = 2`; `moving = false`; return.
   * **Only WALL is a ceiling.** Willy jumps up through floor, ramp and conveyor cells.
   * Derived ceiling heights, with the head's top row at r: a wall at r−1 stops the jump on its first frame; at r−2 after
     11 px of rise; at r−3 after 18 px; at r−4 or higher it never interferes.
   * **[FC]** JSW2: all motion stops and the fall starts next frame. This matches the above.
4. `jc += 1`. Play the jump SFX with `D = 8·(1 + |jc − 8|)` (§7.3).
5. Then, depending on `jc`:
   * `jc == 18`: `airborne = 6`.
     * **JSW1:** return. This is the one "dead" frame with no horizontal step when landing at the take-off level.
     * **JSW2 / ours:** if Willy is supported at this aligned y (§4.5 test), fall through to ground control **this frame**
       (land and keep walking with no pause). Otherwise return, keeping JSW1 fall timing.
   * `jc == 13` or `jc == 16`: run the support check (§4.5). If supported → ground control (lands, airborne → 0).
     Otherwise take the 2-px horizontal step.
   * Otherwise: take the horizontal step (§4.7).

**Vertical profile.** ✓ marks a landing check.

| jc (before ++) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Δy px | −4 | −4 | −3 | −3 | −2 | −2 | −1 | −1 | 0 | 0 | +1 | +1 | +2 | +2 | +3 | +3 | +4 | +4 |
| height above take-off | 4 | 8 | 11 | 14 | 16 | 18 | 19 | 20 | 20 | 20 | 19 | 18 | 16✓ | 14 | 11 | 8✓ | 4 | 0 (end) |

**Consequences:**
* Willy can land on a surface **1 or 2 cells above** his take-off floor, but not 3.
* The head reaches 20 px up, so items up to **5 cells above** the floor can be touched.
* **Horizontal distance 36 px** = take-off step + 17 jump-frame steps.
* A side wall during a jump blocks only the horizontal step. The jump continues, because `moving` stays set.
* A take-off from a ramp gains 0–6 px, because the draw offset B vanishes when airborne ("High jump": 20/22/24/26 px).
  This is kept as authentic.

### 4.5 Support check, falling and landing

**Support check.** It runs only when `y mod 8 == 0`:
* If `row + 2 > 15`: **exit down** (§4.10).
* Otherwise let L = cell(col, row+2) and R = cell(col+1, row+2).
* **Supported** ⇔ `L != NASTY && R != NASTY && (L != AIR || R != AIR)`.
  * Any floor, wall, ramp or conveyor cell supports Willy. **One** of the two feet cells is enough.
  * **A nasty under either foot means "unsupported"**, so Willy falls into it and the nasty check kills him.
  * Items and guardians never support.
* **Floors are one-way platforms.** They are solid only when landing from above at an aligned y.

**Unsupported and not jumping.** Also used for mid-jump frames 13/16 when unsupported; those instead take the horizontal
step and continue the jump.
1. `moving = false`. **Falls are straight down** with no momentum, including walking off a ledge.
2. If `airborne == 0`: set `airborne = 2` and return. This is the **walk-off hover frame**, with no descent.
3. Otherwise: `airborne += 1`; if `airborne == 16` set it to 12 (it cycles 12..15 and stays fatal). Play the fall SFX
   with `D = 16·airborne`. `y += 4`.

**Ground control / landing** (`8ED4`):
* If `airborne >= 12` → **death (fatal fall)**. Otherwise `airborne = 0`.
* Willy lands **standing still**, because `moving` was cleared. Keys and any conveyor apply on the same frame.

**Fatal-fall table** (landing only happens at aligned y, where airborne is even):

| Situation | Airborne on landing | Safe | Fatal |
|---|---|---|---|
| Walk off a ledge, drop d cells | 2 + 2d | d ≤ 4 (32 px) | d ≥ 5 (40 px) |
| Jump ends, then falls d cells below take-off | 6 + 2d | d ≤ 2 (16 px) | d ≥ 3 (24 px) |
| Ceiling bump, fall d cells below the snap point | 2 + 2d | d ≤ 4 | d ≥ 5 |
| Drop off the bottom of a rope | starts at 0 → 2 | 4 cells | 5 cells |

### 4.6 Cells Willy occupies; nasty and item tests

* **Width:** always 2 columns (col, col+1).
* **Height:** 2 rows when `(y + B) mod 8 == 0`, otherwise 3 rows.
* **Nasty test:** every frame, after movement, check **all 6 cells** (col..col+1) × (row..row+2). **Any nasty = death.**
  * Because this includes the row under his feet when aligned, **standing on or stepping onto a nasty kills**.
  * Ours **[bug fix]:** cells outside the room (row ≥ 16) are ignored ("Long distance nasties").
* **Item test:** an item is collected when its cell is one of Willy's **whitened** cells. These are the 2 × 2 block, plus
  the third row only when he spans 3 rows. The row under his feet does **not** collect.
  * Ours: an explicit cell-overlap test, not an INK test (§5.6).
* The JSW2 claim that you can jump over a head-height fire cell from exactly the right spot is UNCONFIRMED. **Default:**
  the JSW1 rule.

### 4.7 Horizontal movement and walls (`8FBC`)

This runs on ground frames and on jump frames (not while falling). It returns at once if `!moving` or Willy is on a rope.

```
moveHoriz():
  if (!moving || onRope) return
  row = y >> 3 ; spans3 = (y & 7) != 0
  if facing == LEFT:
     if frame > 0: frame -= 1; return          // inside the cell: no wall check at all
     dy = 0
     if airborne == 0:                          // ramp step (see 4.8)
        if cell(col-1,row+1) == RAMP_UL: dy = -1        // '\' ahead: step up
        elif cell(col+1,row+2) == RAMP_UR: dy = +1      // on a '/': step down
     if col == 0: exitLeft(); return            // EDGE BEFORE WALL: edge walls never block a transition
     r = row + dy
     if wall(col-1,r+1) || (spans3 && wall(col-1,r+2)) || wall(col-1,r) /*head: OURS - JSW1 omits it*/ : return
     col -= 1; y += 8*dy; frame = 3
  else:
     if frame < 3: frame += 1; return
     dy = 0
     if airborne == 0:
        if cell(col+2,row+1) == RAMP_UR: dy = -1        // '/' ahead: step up
        elif cell(col,row+2) == RAMP_UL: dy = +1        // on a '\': step down
     if col == 30: exitRight(); return
     r = row + dy
     if wall(col+2,r+1) || (spans3 && wall(col+2,r+2)) || wall(col+2,r): return
     col += 1; y += 8*dy; frame = 0
```

* Only **wall** blocks sideways movement. Floor, ramp, conveyor and nasty cells do not.
* When blocked, Willy stays at frame 3 (or 0), pressed against the wall.
* JSW1 never checks the **left head cell** (bug "Don't mind your head": Willy can walk right-to-left through a wall at
  head height). **Ours: checked in both directions.** JSW2 fixed at least the Forgotten Abbey clip.
* JSW1 had one ramp direction per room. With both types in one room, the precedence is **ours**: the up-step test comes
  first.

### 4.8 Ramps (stairs)

**Step rule.** It applies only when grounded and crossing a cell boundary. See the code in §4.7.

| Moving | `\` (rises left) | `/` (rises right) |
|---|---|---|
| Left | cell (col−1, row+1) is `\` → **up one row** | cell (col+1, row+2) is `/` → **down one row** |
| Right | cell (col, row+2) is `\` → **down one row** | cell (col+2, row+1) is `/` → **up one row** |

**Smooth draw offset B.** The stored y stays cell-aligned; only the drawn sprite moves. B applies only when `airborne == 0`:
* If cell (col, row+2) is `\`: B = **2·frame** px.
* Else if cell (col+1, row+2) is `/`: B = **6 − 2·frame** px.
* Otherwise B = 0.
* Result: a 1:1 slope at 2 px/frame.
* B affects drawing, pixel collision with guardians, arrows and the housekeeper, and the third-row whitening. Guardian
  collision uses the drawn position.

**Other ramp behaviour:**
* Ramps do not block sideways and can be jumped up through.
* A jump that lands on a stair after moving part-way into the next cell does **not** warp Willy up; he can walk through
  the staircase. This is an intended mechanic (TAS), so keep it.
* Walking up past the top (y < 0) → **exit up** (y = 104).
* "Ramps v. walls": because of the offset, Willy can sometimes pass walls on ramps. The validator should keep walls clear
  of ramp paths.

### 4.9 Conveyors

When Willy lands or stands and **either** feet cell is a conveyor, the game fakes a keypress in its direction:
`left |= conv==LEFT`, `right |= conv==RIGHT`.

* **Ours:** if the two feet cells are opposite-direction conveyors, use the left-foot cell.
* The push happens at walking speed, 2 px/frame. Normal turning rules apply (landing facing the "wrong" way costs a turn
  frame).
* **Walking against a belt:**
  * If Willy walked or jumped onto it already moving against it, the opposite key gives "both", so he keeps walking
    against the belt.
  * If he **fell** onto it (moving cleared), holding the opposite key only **stalls** him.
* Jumping off a belt takes its direction from the combined input.
* JSW2 edge quirk: with only one feet cell on a conveyor, Willy can jump any direction; on a left belt, holding jump
  inches him along. **Ours: not reproduced** (the JSW1 rule is used).

### 4.10 Room transitions

| Exit | Trigger | New state |
|---|---|---|
| Left | col 0, frame 0, stepping left | col = **30**, frame kept (**0**, so pixel x 240). y, airborne, jc, moving and facing kept, so **a jump continues** into the next room |
| Right | col 30, frame 3, stepping right | col = **0**, frame kept (**3**, so pixel x 6). Everything else kept |
| Up | a jump makes y < 0, or a ramp/rope makes y < 0 | **y = 104** (top row 13, standing on row 15). col kept. **airborne = 0** (the jump ends; if row 15 is air he walk-off-falls next frame) |
| Down | aligned and `row + 2 > 15` (y = 112) | **y = 0**. col kept. **airborne = 2 if airborne < 11, else kept** ("double descent": each room gets a fresh 4-cell allowance, but fatal falls stay fatal) |

* The left/right asymmetry of 6 px is authentic. Keep it.
* The new room's tiles are **not** checked on entry, which caused JSW1's "Stuck in the wall" bug. **Ours:** the validator
  enforces door contracts (PLAN §5). In dev builds the engine asserts that Willy's entry cells are not walls.
* **Ours [bug fix]:** if a room has **no up exit** and y would go < 0, set `y = 0`, cancel the jump (`airborne = 2`,
  `moving = false`), and treat it as a ceiling. JSW1 used to wrap Willy to the same room's floor ("From top to bottom").
* No up exit and climbing a rope: see §5.5.

### 4.11 Death and respawn

**JSW1:**
* Willy's 7-byte state is copied on **every room entry**.
* On death, that state is restored **exactly**, including a mid-jump or mid-fall state. This causes infinite death loops.
* The room is re-initialised: guardians go back to their start positions and the rope status to 0. **Items stay
  collected.**

**JSW2:**
* Willy "returns to the **last static solid ground he was standing on**. If this was in a different room, that room will
  be loaded."
* The room resets; items stay collected.
* Loops still happened: the TAS calls them "very, very common"; Your Spectrum says "if that just happens to be a sprite
  start position, tough luck".
* Fixes: McKay's 128K fix added **3 s invulnerability**; JSW2+ (2016) added an anti-repeat-death routine.

**Ours:**
* **Snapshot rule.** At the end of each frame, if Willy is alive and all of the following hold:
  * `airborne == 0`, not on a rope or lift, and not in the forced ending run;
  * at least one feet cell is floor, wall or ramp (a **conveyor-only** footing does not count, since it is not "static");
  * none of his 6 cells is a nasty;
  
  then store `{room, col, frame, y, facing}`. The exact "static solid ground" rule is UNCONFIRMED; **Default:** as stated.
* **Respawn:**
  * Restore the snapshot with `moving = false`, `airborne = 0`, `jc = 0`, `rope = 0`.
  * Load or re-initialise that room (entities reset).
  * Grant **2 s (40 frames at 20 Hz) of invulnerability** to guardians, arrows and the housekeeper. Willy flickers,
    drawn on alternate frames.
  * McKay used 3 s. **Default:** 2 s, configurable.

### 4.12 Special movement modes

* **Forced ending run.** JSW1 mode 2, JSW2 "start him running to the right":
  * Input is forced to right only, and **jump is disabled**.
  * Each frame, `frame |= 1` before moving, giving **4 px/frame** (double speed).
  * The JSW2 speed is UNCONFIRMED. **Default:** 4 px/frame.
  * JSW1 bug "Sticky bed": jumping onto the bed (a right conveyor) after winning froze Willy. Ours: JSW2 rule. Standing on
    the bed conveyor with ≥ 150 items starts the run.
* **Toilet:** see §6.6.

### 4.13 Reference step function (our engine; JSW1 semantics plus marked changes)

```
FLAG_TABLE = [0,1,0,1, 1,3,1,3, 2,0,2,0, 0,1,2,3]      // index = flags + 4*left + 8*right
JUMP_DY    = [-4,-4,-3,-3,-2,-2,-1,-1,0,0,1,1,2,2,3,3,4,4]

stepWilly(in):
  if onRope(): groundControl(in); return                 // no gravity, no fatal-fall check
  if airborne == 1:
     y += JUMP_DY[jc]
     if y < 0: exitUp(); return                          // OURS: if no up exit -> y=0, airborne=2, moving=false
     r = y >> 3
     if wall(col,r) || wall(col+1,r): y = (y+8) & ~7; airborne = 2; moving = false; return
     jc += 1; sfxJump(8*(1+abs(jc-8)))
     if jc == 18:
        airborne = 6
        if !supportedAligned(): return                   // JSW1 returns unconditionally (dead frame)
     elif jc != 13 && jc != 16: moveHoriz(); return
  if (y & 7) == 0:
     if (y>>3) + 2 > 15: exitDown(); return
     if supported(): groundControl(in); return
  if airborne == 1: moveHoriz(); return                  // jc 13/16 with nothing to land on
  moving = false
  if airborne == 0: airborne = 2; return                 // hover frame
  airborne += 1; if airborne == 16: airborne = 12
  sfxFall(16*airborne); y += 4

groundControl(in):
  if !onRope():
     if airborne >= 12: kill(FALL); return
     airborne = 0
     c = conveyorUnderFeet(); left = in.left || c==LEFT; right = in.right || c==RIGHT
  else: left = in.left; right = in.right
  if forcedRun: left = false; right = true
  flags = FLAG_TABLE[facing + 2*moving + 4*left + 8*right]    // updates facing & moving
  if in.jump && !forcedRun:
     if left != right: moving = true                     // JSW2: jump on a turning frame keeps horizontal motion
     jc = 0; airborne = 1
     if onRope(): rope = -16; y &= ~7; moving = true; return   // leap in the facing direction; no step this frame
  moveHoriz()

afterStep():                                             // same frame, in this order
  if y < 0: exitUp()
  B = rampOffset()                                       // 0 unless grounded on a ramp
  if any nasty in 2x3 cells from (col, y>>3) [in-room cells only]: kill(NASTY)
  entities: move (order per §5.1), then pixel collisions against Willy drawn at (8*col+2*frame, y+B)
  items: collect those in Willy's whitened cells
  snapshot respawn point (4.11)
```

---

## 5. Guardians, arrows, ropes, items, collision (exact)

### 5.1 Frame order (JSW1; ours keeps the same logical order)

1. Copy the empty room.
2. **Move the rope and guardians.** Arrows are not moved here.
3. **Move Willy.** Skipped in toilet mode 3.
4. If y < 0, go to the room above.
5. Willy's attribute pass and **nasty check**, then draw Willy.
6. Toilet reached? (mode 2)
7. Maria / toilet specials.
8. **Draw the rope, arrows and guardians in list order, with collisions.** Arrows are **moved** here.
9. Conveyor animation.
10. **Items: draw and collect.**
11. Copy to screen, print the HUD, clock += 1 frame.
12. Keys (pause, music, quit), one music note.
13. If dead: lose-a-life sequence.

Death handling: a nasty death at step 5 skips steps 6–10 for that frame; a guardian or arrow death skips the rest of step
8 onward. **Ours:** finish drawing the frame fully, then start the death sequence.

### 5.2 Entity limits and reset

* JSW1: ≤ 8 entities per room (guardians + arrows + rope). JSW2: ≤ **8 guardians + arrows** [FC]; the rope is a room flag;
  lifts use guardian slots.
* **Every room entry and every death re-initialises all entities from their definitions.** Guardians always restart from
  their defined start state.
* **Ours:** ≤ 8 guardians/arrows/lifts, plus ≤ 1 rope.
* **JSW2 exception:** moving-floor rooms (Tribbles, Highway to Hell) keep their state across deaths and even new games.
  **Ours:** reset on room initialisation (and always on a new game).
* JSW2 also says every room starts in a fixed state and guardians are never affected by Willy, except in special-case
  rooms.

### 5.3 Horizontal guardians (JSW1 `90C0`)

* **Speed: 2 px per frame**, every frame. JSW1 has no slow flag; Manic Miner had one (moving on alternate frames).
* **State:** cell x, sub-cell phase p (0..3), direction. Drawn at pixel x = **8·x + 2·p**. JSW1 does this with 4
  pre-shifted frames (right-facing frames 4–7 at offsets 0/2/4/6; left-facing frames 3..0 at 6/4/2/0).
* **Per-frame update:**
  ```
  if dir == RIGHT: if p < 3: p++ elif x == max: dir = LEFT          else: x++, p = 0
  else:            if p > 0: p-- elif x == min: dir = RIGHT         else: x--, p = 3
  ```
  * At each end the sprite **stays in place for one frame while it flips** (the 1-frame turn pause).
  * **Period = 8 × (max − min + 1) frames.** For example, min 0 / max 2 gives 24 frames.
  * The sprite box covers pixels 8·min to 8·max + 15. Validate the actual art pixels over air.
* **Animation:** JSW1 animation mask `111` gives 8 frames (4 per facing, bidirectional art). Mask `011` gives 4 frames
  that ignore direction, i.e. a "one-way" sprite such as the monk or saw.
  * Ours: 4 poses indexed by p; the art faces right and is **mirrored** when moving left. `oneway: true` keeps it
    unmirrored.
* **y is fixed.** Start direction and x come from the room.
* **Ours:** `speed: 2` is an optional 2 sub-steps per frame. JSW2 guardians had per-guardian steps.

### 5.4 Vertical guardians (JSW1)

* **Movement:** `y += dy` every frame. JSW1 used dy of **±1..6 px/frame**, and one static guardian with dy = 0.
  * `if y >= max: dy = -dy`. JSW1 does **not clamp**, so y may overshoot by up to |dy|−1.
  * `elif y <= min: y = min; dy = -dy`.
  * JSW1 compares unsigned, so y underflowing below 0 wraps and reverses without a clamp (a bug).
  * **Ours:** clamp at both bounds. The validator requires `(max − min) mod |dy| == 0` so the motion matches the original.
* **Animation:** independent of movement. A tick bit toggles every frame. The frame advances **every frame** (`fast`,
  JSW1 byte-0 bit 4) or **every other frame** (`slow`). 1, 2 or 4 frames (JSW1 masks 000/001/011; 010 = B,B,B|2,B|2).
  * Stats: JSW1 had 25 fast and 19 slow definitions.
* x is fixed. y can be any pixel row, so the guardian spans 3 cell rows when `y mod 8 ≠ 0`, which affects the colour
  block.

### 5.5 Ropes (JSW1 `90C0`/`91BE`/`8300`, re-verified from code)

**Geometry:**
* 33 one-pixel segments s = 0..32. Length is 32.
* Segment 0 is at pixel (8·ropeCellX, 0): the leftmost pixel of the rope's cell, at the top of the room.
* For each s, draw segment s, then find the next one:
  ```
  i  = s + m                 // m = swing magnitude (0..54), i = 0..86
  yy += Y[i] / 2             // 3 or 2 px
  xx += (side == LEFT ? -X[i] : +X[i])
  ```
* **Tables** (86 entries, i = 0..85; verified):
  ```
  X: 32×0, 12×1, 20×2, 2,2,1,2,2,1,1,2, 1,1,2,2,3,2,3,2, 3,3,3,3,3,3
  Y: 48×6, 4,6,6,4,6,4,6,4, 6,4,4,4,6,4,4,4, 22×4           (Y values are half-px → divide by 2)
  ```
* Bottom-end offsets from the top (simulated): m = 0 → (0, 96); 0x12 → (±24, 95); 0x22 → (±54, 84);
  0x36 → (±67, 67), about 45°.

**Swing** (per frame; state = side ∈ {L, R}, magnitude m, swing direction). Verified from 90D9–9130:
```
towardCentre = (side == L && swing == L_TO_R) || (side == R && swing == R_TO_L)
if towardCentre: m -= 2; if m < 20: m -= 2; if m == 0: side = other side (m stays 0)
else:            m += 2; if m < 18: m += 2
if m == 54: swing = reverse
```
* Initial state: side R, m = 34 (0x22), swinging R→L, i.e. moving toward the centre.
* **Period: 90 frames.** A half swing is 45 frames. The steps are 2 px, or 4 near the centre (pendulum speed-up).
* Magnitude sequence from an extreme: 52, 50 … 22, 20, 16, 12, 8, 4, 0 | 4, 8, 12, 16, 18, 20 … 54.

**Colour:** no attribute writes. The rope shows in the INK of the cells it crosses, which is normally the background INK.

**Grab:**
* Only when `rope == 0`.
* Segments are tested in draw order. The **first** segment pixel that overlaps a set pixel grabs.
* JSW1 tested against anything already drawn (tiles, Willy, earlier entities). **Ours:** only against Willy's drawn
  pixels.

**While holding segment s:**
* Willy's **y = segY(s) − 8**.
* From rope pixel x: `px = segX(s) & ~1`, then `col = (px − 4) >> 3` and `frame = ((px − 4) & 7) >> 1`. So the rope
  passes through columns 4–5 of Willy's box.
* Gravity and walking are skipped. Ground control still runs, for the flag table and jump.

**Climbing:**
* When `moving` is set, `s += (facing == swing direction) ? +1 (down) : −1 (up)` each frame.
* If the room has **no up exit**, `s` is clamped to ≥ **12** (only while climbing).
* With an up exit, climbing until y < 0 → **exit up** (arrive at y = 104, off the rope).

**Leaving the rope:**
* **Off the bottom:** when s > 32: `rope = −16` (cooldown), `y &= ~3` (a multiple of 4 px), `airborne = 0`. A fresh fall
  follows.
* **Jump off:** `rope = −16`, `y &= ~7`, `moving = true`, `airborne = 1`, `jc = 0`. He always leaps in the **facing**
  direction, with no horizontal step on the take-off frame.
* **Cooldown:** 16 frames before the rope can grab again. Room entry resets rope status to 0.

**JSW2 ropes:**
* A room flag (T4 bit 7); position and length are not in the format (UNCONFIRMED; possibly fixed). Some ropes allow
  climbing into the room above and others do not.
* Belfry: ropes are drawn above vertical guardians (a bell-ringer).
* The TAS notes that "JSW2 ignores enemy collisions in some circumstances involving ropes".
* **Ours:** a rope entity with `x`, `length` (default 32) and optional start phase. Guardian collisions still apply on the
  rope.

### 5.6 Items

* **JSW1:** a global table of 83 items (room + cell). One 8 × 8 graphic per room, drawn in **overwrite** mode.
* **JSW2:** items are a cell type, ≤ 16 per room, with a per-room 16-bit untaken mask.
* **Colour (JSW1):** INK = `((frameCounter + itemIndex) AND 3) + 3`, i.e. magenta → green → cyan → yellow. It changes
  **every frame**, and neighbouring items are one phase apart. The cell's PAPER, BRIGHT and FLASH are kept.
  * JSW2's rule is UNCONFIRMED. One screenshot shows 12 bottles in a row with INKs 1..7 by column. **Default:** the JSW1
    rule.
* **Collection (JSW1):** at item-draw time, if the item cell's INK == 7 (white), the item is collected. So anything that
  whitens the cell collects it.
  * Willy's whitened background cells collect.
  * So do **arrows**, **white guardians**, and a **white-INK room background** (the self-collecting Swimming Pool item).
  * A non-white guardian sharing the cell **blocks** collection (colour clash).
* **Ours:** collected when the item cell is one of Willy's whitened cells (§4.6). Only Willy collects.
* **On collection:**
  * The item count increments (3 digits) and a falling chirp plays (§7.3).
  * The collected flag is **permanent**, surviving death.
  * At ≥ 150 the game is "won" (the housekeeper leaves). JSW1 used all 83.

### 5.7 Arrows (JSW1)

* **Two kinds:**
  * L→R: start x = **208**, pattern `%10000010`.
  * R→L: start x = **28**, pattern `%01000001`.
  * The room supplies y (pixels).
* **Motion:** x is a **cell** position 0..255 that moves **±1 cell (8 px) per frame** and wraps. The arrow is visible only
  while x is 0..31, so the lap is **256 frames** with 32 visible.
* **Warning:** plays once per lap at x = **244** (L→R, visible 12 frames later) or **44** (R→L, visible 13 frames later).
  The arrow is not drawn on the sound frame.
* **Timing from room entry** (x moves before the test):
  * L→R: sound on frame 36; visible on frames 48–79; then every 256 frames.
  * R→L: visible on frames **1–28 immediately, with no warning**; sound on frame 240; visible again from frame 253.
* **Shape:** 8 px wide, 3 rows. Row y−1 is the pattern, row y is the shaft (0xFF), row y+1 is the pattern. All three are
  **overwrite** writes, and the arrow **flies through walls**.
* **Rule:** `y mod 8 ∈ 1..6`, so all 3 rows fall in one cell row. The Attic bug came from an invalid y.
* **Colour:** INK white is OR'd into the arrow's cell.
* **Kill (JSW1):** only if the cell's INK was **already white** before drawing (Willy's whitened cells, a white rope, a
  white guardian) **and** any **shaft-row** pixel overlaps a set pixel.
* **Ours:** kill if the shaft row overlaps Willy's drawn pixels. There is no INK gate, and arrows do not interact with
  ropes, guardians or items.
* **JSW2 arrows:** a 2-byte record (X, then direction bit + Y), X step ±1, attr 0x87. Speed units and warning sound are
  UNCONFIRMED. **Default:** the JSW1 behaviour.

### 5.8 Collision summary

| Pair | JSW1 method | Ours |
|---|---|---|
| Willy vs nasty | Attribute match on 6 cells (2 × 3 incl. under feet) | Cell type on 6 cells, in-room only |
| Willy vs guardian | Pixel-perfect: guardian sprite AND buffer, where the buffer already holds tiles + Willy + earlier entities. So a guardian touching a **tile** or an earlier entity also "kills Willy" | **Pixel-perfect vs Willy's drawn pixels only** (at x, y + B) |
| Willy vs arrow | White-INK gate + shaft-row pixel overlap | Shaft-row pixels vs Willy's pixels |
| Willy vs Maria / housekeeper | Pixel-perfect | Pixel-perfect vs Willy |
| Willy vs item | Item cell INK == white | Item cell ∈ Willy's whitened cells |
| Willy grabs rope | Any rope pixel on any set pixel, when rope == 0 | Rope pixel on Willy's pixels, when rope == 0 |
| Fall | Airborne ≥ 12 on landing | Same |

Guardian visual colour clash is unchanged: the guardian's INK takes over Willy's cells.

### 5.9 JSW2 guardian model (reference) and our extensions

* **JSW2 record** (7 bytes compressed, 17 expanded):
  * Movement is **counter-based**: a counter starts at CG0 and is decremented every frame; at 0 it reloads from CG1 and
    the direction reverses.
  * Signed primary step CG3. On horizontal guardians it also sets the animation step; doubling it doubles both speed and
    range.
  * Secondary step CG6 bits 4–5 gives **diagonal** motion at 45°, ≈ 22° and ≈ 18° (exact ratios UNCONFIRMED).
  * X and Y are 7-bit (0–127); X units are probably 2 px (UNCONFIRMED).
  * Animation: none, frames 1–2, frames 1 and 3, or frames 1–4. CG6 bit 6 swaps frame sets 0–3 / 4–7 on reversal.
* **Unidirectional guardians** (CG5 bit 7, e.g. Megaron) are **not drawn** while the X step is negative or the Y step is
  positive, i.e. on the return leg. They look like they wrap around.
  * **Ours:** `oneway: true` on d/h/v guardians hides them **and disables their collision** on the return leg (UNCONFIRMED
    whether JSW2 collides; **Default:** no).
* **Ours `d` (diagonal):** `x += dx`, `y += dy` per frame for `count` frames, then negate both. With `bounceY: true`,
  also reverse dy at the room top and bottom (JSW2 "Eggoids").
* **Lifts (JSW2):** moving platforms defined in **pairs** (7 pair definitions). Details UNCONFIRMED.
  * **Ours:** a lift is a run of `width` floor cells moving one cell every `period` frames between rows `top` and
    `bottom`, carrying Willy.

### 5.10 Maria / the housekeeper (JSW1 `9534`)

* Master Bedroom only, while items are still needed.
* At a **fixed cell (14, 11)**; a 16 × 16 sprite with a pixel-perfect kill. Top half attr 0x45, bottom half 0x07.
* **Animation depends on Willy's height, not distance:**
  * Willy on the floor (y = 104): feet alternate on bit 1 of the frame counter, i.e. every 2 frames.
  * Willy within 8 px above the floor (y ≥ 96): "raising arm".
  * Higher: "arm raised".
  * She reacts even when Willy jumps at the room entrance ("dodgy depth perception"); this is kept as charm.
* **Removed** once ≥ 150 items are collected (JSW2 threshold).
* **Ours:** an original "housekeeper" sprite with the same rules.

---

## 6. Game rules & flow

### 6.1 States

```
TITLE --(Enter/fire)--> PLAY <--> PAUSE
PLAY --death--> DYING --lives left--> RESPAWN (4.11) --> PLAY
                      \--no lives--> GAME_OVER --> TITLE
PLAY --(>=150 items, stand on bed)--> ENDING_RUN --(touch toilet)--> NIGHTMARE --> RESULTS --> TITLE
PLAY --Esc--> TITLE
```

### 6.2 Lives

* **7 spare lives (8 total), no bonus lives** in both JSW1 and JSW2.
* Game over comes when Willy dies with 0 spare lives.
* The display: §2.3.
* In the original, more lives made the game run slower (the icons are redrawn every frame). **Ours:** no slowdown.

### 6.3 Clock

* **JSW2 (adopted):** elapsed `HHHH:MM:SS`, starting at 0000:00:00. **+1 s per 10 logic frames.** Four hour digits
  (overflow undefined; ours clamps at 9999:59:59).
* It keeps running while paused? UNCONFIRMED. **Default:** stopped while paused and during death, game-over and ending
  sequences.
* It **stops while the rocket flies**.
* There is **no deadline**.
* At 20 Hz logic the displayed clock runs at 2× real time. This is authentic in spirit (JSW2 was ~2.5× at best).
* JSW1 reference: " 7:00am", +1 game minute per 256 frames, quits at 1:00am. It has an am/pm bug (the display shows
  "12:30am" in the afternoon). None of this is used.

### 6.4 Pause, music toggle, quit, auto-pause

* **Pause:** A/S/D/F/G (ours also P). Any other key resumes.
  * JSW1 while paused: every ~1.05 s the whole screen gets INK +3 and PAPER +3 (mod 8), BRIGHT cleared, FLASH kept, and
    the border follows the top-left INK (read before that cell cycles).
  * On resume, the bottom-third attributes and the border are restored.
  * JSW2's pause visuals are UNCONFIRMED. **Default:** the JSW1 colour cycling, with music silenced.
* **Music toggle:** H/J/K/L/Enter, **edge-triggered** (a key-held latch).
* **Quit:** JSW1 used CAPS + SPACE. Ours: Esc → title.
* **Auto-pause (JSW1):** an 8-bit idle counter (+1 per frame, reset by movement or jump keys) pauses the game when it
  overflows (256 idle frames ≈ 20 s). This happens **only with music off**, because music resets the counter every frame.
  * **Ours:** replaced by pausing when the browser tab or window loses focus.

### 6.5 Death sequence (JSW1 `8C01`)

1. The death frame is shown once.
2. The top two-thirds' attributes are filled with **0x47, 0x46, … 0x40** in turn: BRIGHT INK white, yellow, cyan,
   green, magenta, red, blue, black, on black paper. So the frozen room fades to black.
3. Each of the 8 steps plays a note (border black). Durations are in §7.3; the total is ≈ 94 ms of tone, ≈ 0.12 s overall.
4. Lose a life, then respawn.

JSW2's death visuals are UNCONFIRMED. **Default:** the JSW1 sequence. Ours may hold each step for at least one display
frame so it is visible.

### 6.6 Game over (JSW1 `8C4A`; JSW2 is the same concept)

1. Clear the top two-thirds. Willy (right-facing frame 2) stands at col 15, rows 12–13, on a **barrel** at col 15, rows
   14–15.
2. A **foot** descends from the top, **2 px per step for 49 steps**. It is drawn without erasing, so it looks like a
   lengthening leg.
3. Top-two-thirds attr = `0x47 | paper<<3`, with paper = `(dist AND 12) >> 2`, where dist += 4 per step (0..196).
   **[FC]** The paper changes **every step**: black → blue → red → magenta, repeating.
4. The barrel cells keep INK **red** (`AND 250 | 2`) while their PAPER and BRIGHT cycle.
5. Each step plays a rising tone, `E = 255 − dist`, 64 half-periods, border black. The whole descent takes ≈ **2.06 s**
   (≈ 42 ms per step).
6. "Game" is printed at (row 6, col 10) and "Over" at (row 6, col 18). Each letter's INK cycles through the 8 colours,
   offset by one per letter, bright on black, for ≈ **1.57 s**.
7. Return to the title.

JSW2 screenshot: white foot and leg, red barrel, "GAME OVER" in upper case (cyan in that frame) at about row 4, cols 9
and 18. The room name and status rows stay visible.

**Ours (PLAN):** Wally on a plinth; an **anvil** lowers on a lengthening chain. Same timings, paper cycle, red plinth
INK, tone and glitter text.

### 6.7 Ending (JSW2 specifics; ours mirrors them)

1. **Threshold:** at **≥ 150 items**, Maria / the housekeeper disappears from the Master Bedroom. JSW1 needed all items.
2. **Bed trigger:** standing on the bed (a right-moving conveyor) starts the **forced run right**.
   * Input is forced right, with no jumping, at 4 px/frame.
   * Rooms on the path (between the Master Bedroom and The Bathroom, 3 rooms apart) also force the run while won. Their
     layouts must let a right-running Willy through without jumping.
3. **The Bathroom:** the toilet is drawn (JSW1 attr 0x07, animating every frame).
   * Touching it after winning → move to the **nightmare room** (JSW2 room 133, a Manic Miner cavern replica).
   * There, Willy (Wally) **jumps on the spot repeatedly** and the room is not playable.
   * JSW1 instead animated the toilet with his head down it (mode 3) and just waited for the 1am quit.
4. **Toilet before winning:** Your Spectrum #18 says it is **fatal** in JSW2; this is UNCONFIRMED in code.
   **Default (PLAN):** harmless decor.
5. **After the nightmare:** UNCONFIRMED. **Default:** after 10 s (or any key after 5 s), show a results screen (time,
   rooms, items, deaths), then return to the title.
6. **Ours:** the nightmare room is an **original** "old workplace" homage (not the Central Cavern layout), with the
   in-game tune played faster.

### 6.8 JSW2 special-case rooms (IDs; table at 8361h) → our `special` equivalents

| ID | Room | Behaviour | Ours |
|---|---|---|---|
| 1 | Central Cavern (#133) | If won, jump on the spot repeatedly | nightmare room |
| 2–5, 19, 21, 24 | Lift rooms | Lift pairs 1–7. Dumb Waiter = pair 5; 19 = "Lift 5" (pair 6); 21 = "Lift 6" (pair 7) + flashing fire | `lift` entities |
| 6, 25 | Tribbles, Highway to Hell | Moving floor segments (state persists: a bug) | moving-floor special, reset on init |
| 7, 26 | — | Unused on the Spectrum (7 = the CPC cheat) | — |
| 8 | Rocket Room | At set coordinates, once the room's items are collected, the centre section lifts off and Willy goes to the room above (Docking Bay). **The clock stops during the flight.** One-way | `rocket` |
| 9 | The Bathroom | Draws the toilet; if won, touching it → room 133; forces the run right if won | toilet / ending |
| 10 | Master Bedroom | Removes Maria at ≥ 150; bed conveyor starts the run | housekeeper / bed |
| 11 | Beam me Up / Down Spotty | Teleporters active | `teleport` |
| 12 | Belfry | Ropes drawn above vertical guardians | rope attached to a v-guardian |
| 13 | Eggoids | Diagonal guardians reverse at the room top and bottom | `bounceY` |
| 14 | The Yacht | The yacht sails away (to Deserted Isle) once the trip switch is on and the items in the yacht and bow are collected | `voyage` |
| 15 | Trip Switch | Jump at the switch → "Trip Switch On". The left-conveyor graphic shows "off" and the right-conveyor graphic "on". Persistence across death conflicts between sources. **Default:** persistent | `switch` |
| 16 | Rigor Mortis | When the room is cleared, its first two guardians get X steps −1/+1 and counter 28 (they start moving) | `wakeOnClear` |
| 17 | Crypt | A switch changes the first guardian's step and counter (lengthens its path) | `switch` → guardian |
| 18 | Foot Room | When the room is cleared, a foot drops. The floor is also a hidden left conveyor | `dropOnClear` |
| 20 | "First Landing" (probably Top Landing) | Fire cells flash; run right if won | `flashNasty`, `forceRunIfWon` |
| 22 | Deserted Isle | "All the complicated behaviours": item → a "Time to rescue 999" countdown (≈ 30 s forced wait) → the tree lowers → a hidden teleporter (walk east, then west without jumping) → Beam me Down Spotty | island special |
| 23 | Macaroni Ted | Run right if won | `forceRunIfWon` |

**Teleporters (JSW2):** exactly **4**, each a 6-byte record `(fromRoom, x, y, toRoom+1, x, y)`. They work only in rooms
with special ID 11 or 22.
* Beam-me-Down (top-west) → Teleport (planet).
* Beam-me-Down (top-east) → The Bathroom (the **only** way back from space).
* Beam-me-Up (upper-east) → Beam-me-Down (lower-west).
* Deserted Isle (hidden) → Beam-me-Down (lower-east).
* The two lower Beam-me-Down pads are arrival-only.
* The trigger condition is UNCONFIRMED. **Default:** triggers when Willy is grounded with both feet cells on the pad;
  plays a sparkle SFX; he arrives standing on the destination pad, and arrival pads are inert.

**Cartography Room (#108):** a live map. Water cells map to rooms via a table at 0FBE8h.
* When a room is entered its block turns green; if it is exited with items left, the block turns red.
* **Red blocks are solid**, so you can softlock. Some rooms have no block.
* **Ours:** a decorative live map (colour only, never solid).

---

## 7. Audio

### 7.1 Beeper model

* **1-bit square wave, one channel, CPU-timed.** In the original, **game logic stops while a sound plays**; there is no
  mixing.
* Sounds are sequences of speaker toggles. The half-period is set by a delay count D.
* Formulas at 3.5 MHz:
  * **DJNZ-delay routines** (SFX): half-period ≈ `13·D + 33` T-states → **f = 3,500,000 / (2·(13·D + 33)) Hz**.
  * **In-game music** loop: half-period ≈ `40·D + 6` T → **f ≈ 3,500,000 / (80·D + 12) Hz** (D = 86 → 508 Hz).
    * For a target frequency, D = (3.5e6/f − 12)/80: 440 Hz ≈ 99.3, 220 Hz ≈ 198.7, 880 Hz ≈ 49.6.
    * JSW's note table (0x80, 0x72, 0x66, 0x60, 0x56, 0x51, 0x4C, 0x48, 0x44, 0x40, 0x3C, 0x39, 0x36, 0x33, 0x2D, 0x28 …)
      is equal-tempered but ≈ 40 cents flat.
* **Ours:**
  * A WebAudio beeper that synthesises square waves from (frequency, duration) lists.
  * SFX are non-blocking but scheduled on the logic tick.
  * A gentle low-pass filter (~6 kHz) and output gain of ~0.15 give the speaker character.
  * Frequencies above ~12 kHz are clamped.
  * The music and SFX channels are mixed. The original could not do this, but it is acceptable.

### 7.2 Music

**Original data (for format reference only — do not copy these bytes):**
* **In-game (JSW1 format; JSW2 uses 64 bytes at 0xFAF0):**
  * 64-entry table. The note index increments every frame while music is on; entry = `(idx AND 0x7E)/2`.
  * So **each note plays on 2 consecutive frames**, and a loop is 128 frames.
  * Each frame plays **one blip of ≈ 8.8 ms** (768 loop iterations), then silence. This gives a staccato tune whose tempo
    is the frame rate.
  * **"Music of life":** D = note + 28 − 4·spareLives. Each lost life lowers the pitch by ≈ 79 cents (4 D steps at
    ~500 Hz).
* **Title (JSW1/JSW2):**
  * 99 bytes + 0xFF. Each byte plays ≈ 0.145 s at pitch E, then ≈ 0.145 s at 2E (an octave lower), ≈ 0.29 s per note.
  * The whole tune is ≈ 29 s. Keys are checked after each note.
* **Tunes used by the originals:**
  * JSW1 in-game: "If I Were a Rich Man" (Bock, *Fiddler on the Roof*). **Copyrighted; never use it.**
  * JSW1/JSW2 title: Beethoven, *Moonlight Sonata* (PD).
  * **JSW2 in-game:** Grieg, *In the Hall of the Mountain King* (PD). This is the Manic Miner tune, and it foreshadows
    the Central Cavern ending.
  * CPC in-game: different (UNCONFIRMED).

**Our public-domain choices.** All the composers died more than 100 years ago. **Transcribe our own arrangements from PD
scores (e.g. IMSLP); never copy game data or modern arrangements.**

| Use | Piece | Style |
|---|---|---|
| Title | **Beethoven**, Piano Sonata No. 14 "Moonlight", Op. 27 No. 2, mvt 1 (1801) | JSW title style: melody note then octave below, ≈ 0.29 s per note, ~99 notes |
| In game (default) | **Grieg**, "In the Hall of the Mountain King", *Peer Gynt* Op. 23/46 (1875) | 64-note loop, 2 ticks per note, 8.8 ms blip per tick, music-of-life pitch drop |
| In game (options / regions) | **Bach**, Invention No. 1 in C, BWV 772 (1723); **Mozart**, "Rondo alla Turca", K. 331 (1783); **Offenbach**, "Galop infernal" (1858); **Rimsky-Korsakov**, "Flight of the Bumblebee" (1900) | same engine |
| Space region (optional) | **Johann Strauss II**, "The Blue Danube", Op. 314 (1866) | same engine |
| Game over | **Chopin**, Funeral March (Piano Sonata No. 2, Op. 35, mvt 3, 1837), opening phrase | plays after the anvil sequence |
| Nightmare ending | Mountain King loop at **double tempo** | nod to JSW2's ending |
| Results screen | **Handel**, "See, the Conqu'ring Hero Comes" (*Judas Maccabaeus*, 1747) | short fanfare |

Avoid anything still under copyright: film or TV themes (e.g. Star Trek), 20th-century pieces with uncertain status
(e.g. Holst), and "If I Were a Rich Man".

### 7.3 Sound effects (JSW1 parameters; JSW2 SFX detail UNCONFIRMED → **Default:** use these)

| SFX | Parameters | Resulting sound |
|---|---|---|
| **Jump** (every jump frame) | 32 half-periods, D = 8·(1 + \|jc − 8\|), jc = 1..18 | jc 1: 2023 Hz, 7.9 ms; jc 4: 3165 Hz; jc 8: 12.8 kHz, 1.3 ms (apex); jc 18: 1487 Hz, 10.8 ms. Pitch rises with Willy and falls as he falls |
| **Fall** (every falling frame) | 32 half-periods, D = 16·airborne (3..15, then 12..15) | A3: 2664 Hz, 6 ms; A6: 1366 Hz; A10: 828 Hz; A12: 692 Hz, 23 ms; A15: 555 Hz, 29 ms. Descending |
| **Item collect** | 64 toggles, D = 0x90 − C for C = 128, 126 … 2 (D 16 → 142) | 7.26 kHz → 931 Hz falling chirp, ≈ 19 ms |
| **Arrow warning** [FC] | 128 toggles: D = 2, then D = 128 down to 2 | ≈ 1.03 kHz rising to inaudible (clamp), ≈ 32 ms "zip" |
| **Death** (8 steps, border black) | ink k = 7..0: D = 63 − 8k, C = 8 + 32k half-periods | 14.1 kHz / 8.2 ms, 7.7 kHz / 13 ms, 5.3 kHz / 15.9 ms, 4.0 kHz / 16.9 ms, 3.2 kHz / 16 ms, 2.7 kHz / 13.2 ms, 2.3 kHz / 8.5 ms, 2.05 kHz / 1.9 ms. Total ≈ 94 ms |
| **Game over** | per step: tone E = 255 − dist (dist 0..196 step 4), 64 half-periods | rising pitch over ≈ 2.06 s |
| **Title screech** | noisy sweep, value 0x32–0x51 by scroll position; border flicker | optional; JSW2+ removed it |
| **New (ours)** | teleport sparkle, rocket rumble, lift hum, switch click, yacht horn | original beeper designs in the same style |

---

## 8. World map structure (JSW2; **inspiration only**, do not reuse room names or layouts)

### 8.1 Scale and grid

* **134 rooms** on a schematic grid of **24 columns × 19 rows** (Wiseman's overview mimics the in-game Cartography Room).
  * Rows 0–13 hold everything. Rows 14–18 are only the well shaft.
  * 133 placed rooms occupy 135 cells, because the Well is drawn 3 times.
* **Occupied cells per row:** r0: 4, r1: 9, r2: 3, r3: 7, r4: 1, r5: 11, r6: 14, r7: 9, r8: 10, r9: 13, r10: 15,
  **r11: 23**, r12: 8, r13: 3, r14–18: 1 each.
* **Spine:** row 11 is an unbroken **23-room ground-level corridor**. It runs from the island in the far west, via the
  beach, the cellar corridor under the house and the drive, to the corner shop in the far east.
* Remote zones (sewers, starship, planet) sit where the map schematic puts them, **not** physically adjacent. They are
  reached by warps.

### 8.2 Regions (JSW2)

| Region | Rooms (JSW1 / new) | Grid area | Notes |
|---|---|---|---|
| Towers / rocket | 3 (1 / 2) | r4–5, c11–13 | Rocket Room directly above the Watch Tower; Belfry above Rescue Esmerelda |
| Roof + attic | 15 (13 / 2) | r6 c8–14, r7 c7–14 | JSW2 widened the attic to match the roof |
| Mansion: 3 floors × 10 | 30 (24 / 6) | r8–10, c5–14 | Top floor: … Master Bedroom, Top Landing, *Macaroni Ted*, *Dumb Waiter*, **The Bathroom (start)**, East Wall |
| Cellar corridor | 10 (3 / 7) | r11, c5–14 | Replaced JSW1's Abbey ↔ Wine Cellar "wormhole" |
| Mines | 7 (0 / 7) | r12–13, c9–14 | |
| Well shaft | 3 (0 / 3) | r14–18, c14 | A one-way fatal drop (the Well screen repeats 3×: "well, well, well") |
| East grounds (drive, Megatree, far east) | 20 (16 / 4) | r9–13, c15–22 | The Megatree takes 9 rooms |
| West coast (beach, yacht, island) | 5 (3 / 2) | r11, c0–4 | "cheat" room separates the bow from the island |
| Sewers | 7 (0 / 7) | r5–7, c0–4 | 5-room corridor + 3-room vertical branch |
| Starship | 23 (0 / 23) | r0–3, c5–17 | lift column (MAIN LIFT 1–3), Cartography Room, Docking Bay above the Rocket Room |
| Planet ("Teleport Zone") | 10 (0 / 10) | r5–6, c16–23 | 8-room strip + 2-room side branch; Loony Jet Set wraps vertically |
| Central Cavern | 1 (0 / 1) | off-grid | ending only |
| **Total** | **134 (60 / 74)** | | |

### 8.3 Warps, one-ways and non-Euclidean links (JSW2)

**Scripted or teleport links:**
1. Rocket Room → Docking Bay (rocket; one-way; needs the room's items).
2. The Yacht → Deserted Isle (voyage; needs the Trip Switch, which sits in the cellar corridor far away).
3. Deserted Isle → Beam me Down Spotty (hidden teleporter).
4. Beam me Down Spotty → Teleport (the planet).
5. Beam me Up Spotty → Beam me Down Spotty.
6. Beam me Down Spotty → **The Bathroom** (the only way home from space).

**Ordinary-exit warps:**
* Cold Store rope top → Sewer entrance (off-grid; reverse UNCONFIRMED).
* The Outlet → The Beach (sewer outfall).
* Secret passage ↔ Hole with No Name (horizontal wrap loop).

**Fatal one-way paths:**
* Down T' Pit → Water Supply → Well ×3 → Dinking Vater (death).
* Inside The Megatree → Without A Limb (a death jump; the room "contains no data") → Front Door → Security Guard → Out On
  A Limb **[FC order]**.
* Highway to Hell → Entrance To Hades.

**Overall shape:**
* The **mansion is the hub**. Grounds, cellars, mines and towers connect to it two-way.
* The themed zones form **one big one-way loop:** house → (rope) sewers → (outfall) beach → yacht → island → (teleport)
  starship ⇄ planet → (teleport) Bathroom.
* The rocket is a second one-way entry to space. Space has 2 ways in and 1 way out.

**Gates:** 150 items (Maria), the rocket (its room's items), the Trip Switch (the yacht), and item-triggered guardians
(Rigor Mortis, Foot Room).

**Geometry one-way:** Nomen Luni cannot be crossed east→west (an unsafe drop).

### 8.4 Exit statistics (for sizing our world)

* **JSW1 (60 rooms):**
  * 172 exits: L 53, R 52, U 35, D 32 (≈ 1.6 horizontal per vertical).
  * Exits per room: 1 → 3 rooms, 2 → 18, 3 → 23, 4 → 16.
  * 152 reciprocal (76 two-way links), 20 one-way or non-reciprocal.
  * There were non-Euclidean links: the roof row is wider than the attic row, and the Abbey ↔ Wine Cellar wormhole.
* **JSW2 grid:**
  * 105 horizontally adjacent pairs and 81 vertically adjacent pairs.
  * Rooms by grid neighbours: 1 → 13 rooms, 2 → 44, 3 → 33, 4 → 43.
  * The Wiseman 100 % route (131 rooms **[FC]**) confirms **145** traversals: 91 horizontal (87 % of adjacencies), 43
    vertical (53 %), 11 special (4 teleports, rocket, yacht, rope-to-sewer, outfall, 3 death steps).
  * Takeaway: **most side-by-side rooms connect; only about half of stacked rooms do.**
  * JSW2 made the mansion, grounds and underground a **consistent flat grid**; all non-Euclidean links are deliberate
    warps. This is our rule too (PLAN §5).
* **Typical patterns:**
  * Each house floor is a 10-room left–right corridor.
  * Vertical links tend to be special: ropes, lifts, falls, stairwells.
  * Dead ends (13 cells have a single neighbour) hold items or hazards.
  * Rooms with a single access point (Well, Dinking Vater, Without A Limb, Secret passage) had no Cartography block.

---

## 9. Known original bugs → what we do

| # | Bug (source game) | What happened | Ours |
|---|---|---|---|
| 1 | **The Attic bug** (JSW1) | Arrow y byte 0xD5 (odd, off-table) made the arrow "draw" over guardian definitions 0x0D–0x11 and 0x2D–0x31, corrupting about 13 rooms. Official fix: POKE 59901,82 | Validator: arrow y in 1..126 with `y mod 8 ∈ 1..6`; entity data is immutable at run time |
| 2 | **Don't mind your head** (JSW1) | The left-moving wall check skips the head cell | Check the head both ways (§4.7) |
| 3 | **Stuck in the wall** (JSW1 Wine Cellar; JSW2 Watch Tower) | Entry cells are not checked; a conveyor pushes Willy into a wall | Door contracts in the validator + dev assert |
| 4 | **Infinite death loops / Dangerous connections** (both) | Respawn replays a doomed state, or respawns onto a guardian start | Last-safe-ground respawn + 2 s invulnerability; the solver checks fatal entry points |
| 5 | **Self-collecting item** (JSW1 Swimming Pool) | White-INK background "collects" items | Explicit Willy-overlap collection; background INK never white |
| 6 | Arrows and white guardians collect items; guardian colour blocks collection | INK-based collection | Only Willy collects; a guardian's colour never blocks |
| 7 | **Guardians need a clear path** (JSW1) | A guardian touching a tile or an earlier entity "kills Willy" | Guardian collision vs Willy's pixels only; the validator still keeps paths over air |
| 8 | **White-seeking missile / Ropes before arrows** (JSW1) | An arrow kills via a white rope or guardian; an arrow can snap Willy onto a rope | Arrows and ropes interact only with Willy |
| 9 | **Encroaching rope** / rope in the 8th slot (JSW1) | The rope borrows the next slot's bytes; can teleport Willy after death | N/A: separate objects; the rope resets on room init |
| 10 | **From top to bottom** (JSW1) | Jumping off the top of a rope passes through the top of a room with no up exit and wraps to its floor | A room with no up exit has a solid top (§4.10) |
| 11 | **Long distance nasties** (JSW1) | The nasty check below the floor reads the top of the room | Ignore out-of-room cells |
| 12 | Vertical guardian unsigned underflow (JSW1) | y < 0 wraps and no clamp is applied | Clamp both bounds; the validator requires the path to fit |
| 13 | **Sticky bed** (JSW1) | Jumping onto the bed conveyor after winning freezes Willy | JSW2 rule: standing on the bed starts the run |
| 14 | **12:30am in the afternoon** / 1am cutoff (JSW1) | am/pm flips at 1 o'clock | N/A (elapsed timer) |
| 15 | **Flickering clock** (JSW1) | Template digits shown for 1 frame on room entry | Always print real values |
| 16 | **Corrupted conveyors/nasties, Slippery slopes, Floor ramps** (JSW1) | Tile identity by attribute byte / CPIR | Explicit tile types |
| 17 | **Invisible item, inaccessible/uncollectable items, stacked items** (JSW1) | Data errors | Validator: no duplicates, item cells must be air; the solver proves every item reachable |
| 18 | **Guardian halos** (JSW1) | A BRIGHT guardian on non-bright coloured paper shows a bright box | Authentic clash kept; the validator **warns** on BRIGHT guardians over non-black, non-bright paper |
| 19 | One-way monk/saw (JSW1 mask 011) | A sprite faces one way in both directions | Default mirror when moving left; `oneway` art only on purpose |
| 20 | Game slows with more lives, music on, long falls (both) | Unsynced loop + blocking beeper | Fixed-timestep logic; no slowdowns |
| 21 | Auto-pause only when music is off (JSW1) | Inconsistent | Pause on focus loss instead |
| 22 | **Cartography softlock** (JSW2) | Red blocks are solid | Decorative map |
| 23 | Moving floors persist across deaths and new games (JSW2) | State never reset | Reset on room init / new game |
| 24 | Nomen Luni one-way; Secret passage top unreachable (JSW2) | Level design | The solver flags unintended one-ways and unreachable areas |
| 25 | Rope ignores enemy collisions sometimes (JSW2) | Inconsistent | Guardians always collide, on the rope too |
| 26 | Worse attribute clash (JSW2) | XOR single-screen draw | Our deterministic pipeline (§2.5) |

**Kept on purpose** (authentic mechanics, not bugs): double descent; the high jump from ramps; walking through stairs
after a mid-cell landing; ramps letting you slip by walls (the validator avoids it in design); the 6-px left/right entry
asymmetry; the housekeeper's "dodgy depth perception"; one-frame turns; the no-air-control jump.

---

## 10. Open questions / UNCONFIRMED items and our defaults

| # | Question | Evidence | **Default** |
|---|---|---|---|
| 1 | Logic frame rate | JSW1 ≈ 12–14 fps; JSW2 ≈ 25 fps best, 18.7 avg | **20 Hz** fixed timestep (options 14/20/25) |
| 2 | JSW2 jump-from-standstill "step forward" | Wikipedia vs code/TAS | Only the turning-frame jump carries motion |
| 3 | JSW2 landing at jump end | TAS: "continue walking without stopping" | Land on the jc = 18 frame if supported (§4.4) |
| 4 | JSW2 ceiling-bump fall allowance ("can't fall as far") | Forum only | JSW1: airborne = 2 (4 safe cells) |
| 5 | JSW2 underfoot check before moving down | Forum theory | JSW1 order |
| 6 | JSW2 conveyor-edge any-direction jump | TAS | Not reproduced |
| 7 | JSW2 head-height fire jump-over | Forum | JSW1 2 × 3 nasty block |
| 8 | JSW2 left-head wall check | Unknown | Checked (fix) |
| 9 | JSW2 start coordinates | Unknown | Our own start in our Bathroom |
| 10 | "Static solid ground" exact rule | TAS wording | §4.11 snapshot rule |
| 11 | Post-respawn invulnerability | McKay 3 s; JSW2+ routine | **2 s**, configurable |
| 12 | JSW2 guardian collision method | Seasip implies sprite overlap | Pixel-perfect vs Willy |
| 13 | Unidirectional guardian: collides when hidden? | Unknown | No |
| 14 | JSW2 diagonal angle ratios; X units | "45°, ≈22°, ≈18°"; X probably 2 px | Free integer (dx, dy) |
| 15 | JSW2 rope position/length | Not in the format | Per-room `x`, `length` = 32 |
| 16 | JSW2 lift mechanics | Pairs only | PLAN lift model |
| 17 | JSW2 item colour rule | Screenshot suggests INK 1..7 by column | JSW1 3..6 per-frame cycle |
| 18 | JSW2 arrow speed / warning | Unknown | JSW1 values |
| 19 | JSW2 death visuals and SFX | Unknown | JSW1 sequence |
| 20 | JSW2 pause visuals | Unknown | JSW1 colour cycling, music silenced |
| 21 | Life-icon animation with music off | JSW1 freezes; JSW2 unknown | Freeze (JSW1) |
| 22 | "Rooms" counter meaning | 001 at start | Distinct rooms visited |
| 23 | Colon blink rate | Screenshots | Visible when `frame mod 10 < 5` |
| 24 | Clock while paused or in sequences | Unknown | Stopped |
| 25 | JSW2 toilet before winning | Your Spectrum: fatal | Harmless (PLAN) |
| 26 | What follows the nightmare room | Unknown | Results screen after 10 s / key after 5 s → title |
| 27 | Forced run speed in JSW2 | Unknown | 4 px/frame (JSW1) |
| 28 | Teleporter trigger | "walk east then west without jumping" (island) | Grounded with both feet on the pad |
| 29 | Trip Switch reset on death | Sources conflict | Persistent |
| 30 | Idle attract tour timing | "if idle" | After one title cycle; 1.5 s per room |
| 31 | Palette levels | Various emulators | 0xD7 / 0xFF |
| 32 | Border size | Hardware varies | 32 px sides, 24 px top/bottom (320 × 240) |
| 33 | Life icons BRIGHT? | JSW2 draws its cells bright | BRIGHT |
| 34 | JSW2 quit key | Probably CAPS + SPACE | Esc |
| 35 | Ramp precedence with both ramp types adjacent | JSW1 had one type per room | Up-step test first; `\` before `/` for B |
| 36 | Opposite conveyors under both feet | N/A in the originals | Left-foot cell wins |
| 37 | CPC/JSW2 room counts (131/132/137 claims) | Disassembly says 134 | 134 |

---

## 11. Sources

**JSW1 disassembly (SkoolKit, Richard Dymond)**

* Index: https://skoolkid.github.io/jetsetwilly/
* Routines: https://skoolkid.github.io/jetsetwilly/asm/8DD3.html (move Willy 1), /asm/8ED4.html (2), /asm/8FBC.html (3),
  /asm/8421.html (flag table), /asm/85CF.html, /asm/85D1.html, /asm/85D6.html, /asm/85E0.html, /asm/85E2.html,
  /asm/87CA.html, /asm/88FC.html, /asm/8585.html, /asm/8912.html, /asm/898B.html, /asm/89AD.html, /asm/8B07.html,
  /asm/8C01.html, /asm/8C4A.html, /asm/90B6.html, /asm/90C0.html, /asm/91BE.html, /asm/9456.html, /asm/93D1.html,
  /asm/948A.html, /asm/949E.html, /asm/94B0.html, /asm/94D2.html, /asm/94F9.html, /asm/9534.html, /asm/9584.html,
  /asm/959A.html, /asm/95C8.html, /asm/961E.html, /asm/9637.html, /asm/9691.html, /asm/96A2.html, /asm/96DE.html,
  /asm/8AEB.html, /asm/8300.html, /asm/8100.html, /asm/80A0.html, /asm/80D6.html, /asm/80DA.html, /asm/80DE.html,
  /asm/80F0.html, /asm/8554.html, /asm/9800.html, /asm/9A00.html, /asm/9D00.html, /asm/A000.html, /asm/A3FF.html,
  /asm/A400.html, /asm/AB00.html, /asm/C000.html, /asm/E100.html, /asm/E300.html, /asm/D000.html, /asm/FA00.html
* Reference: https://skoolkid.github.io/jetsetwilly/reference/bugs.html,
  https://skoolkid.github.io/jetsetwilly/reference/facts.html,
  https://skoolkid.github.io/jetsetwilly/reference/glossary.html,
  https://skoolkid.github.io/jetsetwilly/tables/rooms.html,
  https://skoolkid.github.io/jetsetwilly/buffers/gbuffer.html,
  https://skoolkid.github.io/jetsetwilly/maps/all.html,
  https://skoolkid.github.io/jetsetwilly/sound/sound.html
* Sources: https://github.com/skoolkid/jetsetwilly/tree/master/sources (jsw.skool, sound.ref, jsw.ref)
* Manic Miner comparison: https://skoolkid.github.io/manicminer/asm/8D0F.html, /asm/8DAA.html, /asm/8BDD.html,
  /asm/858C.html

**JSW2**

* John Elliott, JSW2 room format: https://www.seasip.info/Jsw/jsw2room.html
* TASVideos: https://tasvideos.org/8625S (JSW2 any %), https://tasvideos.org/10021S (JSW2 100 %),
  https://tasvideos.org/8012S (JSW1)
* JSW Central: https://jswcentral.org/jsw2-01_jsw2.html, https://jswcentral.org/jsw2-02_jsw2plus.html
* J. D. A. Wiseman's JSW2 pages: https://www.jdawiseman.com/papers/games/jsw2/jsw2_index.html (plus jsw2_overview,
  jsw2_central, jsw2_east, jsw2_west, jsw2_sewers, jsw2_space, jsw2_teleport, jsw2_cartography, jsw2_route,
  jsw2_programmer_comments, jsw2_updated, bbc/jsw2_bbc .html in the same folder)
* Wikipedia: https://en.wikipedia.org/wiki/Jet_Set_Willy_II, https://en.wikipedia.org/wiki/Jet_Set_Willy
* World of Spectrum: https://worldofspectrum.org/archive/software/games/jet-set-willy-ii-software-projects-ltd,
  https://www.worldofspectrum.org/pub/sinclair/games-info/j/JetSetWillyII.txt,
  https://worldofspectrum.net/pub/sinclair/games-info/j/JetSetWillyII_128.txt,
  https://www.worldofspectrum.org/pub/sinclair/screens/in-game/j/JetSetWillyII.gif
* Spectrum Computing: https://spectrumcomputing.co.uk/entry/2595/ZX-Spectrum/Jet_Set_Willy_II,
  https://spectrumcomputing.co.uk/zxsr.php?id=2595
* JSWMM forum: https://jswmm.co.uk/topic/401-undocumented-quirky-features-of-jsw2/,
  https://jswmm.co.uk/topic/470-cheat-table-in-cpc-amstrad-version-of-jsw2/
* CPC-Power: https://www.cpc-power.com/index.php?page=detail&num=1204
* Mastertronic review: https://mastertronic.co.uk/game-review-jet-set-willy-the-final-frontier-zx-spectrum-ricochet/
* Seamless map: https://maps.speccy.cz/map.php?id=JetSetWilly2

**Hardware and palette**

* https://worldofspectrum.org/faq/reference/48kreference.htm, https://worldofspectrum.org/faq/reference/128kreference.htm
* https://en.wikipedia.org/wiki/ZX_Spectrum_graphic_modes
* Fuse emulator palette: https://github.com/speccytools/fuse
* SkoolKit palette defaults: https://skoolkit.ca/docs/skoolkit/ref-files.html

**Public-domain scores (for our own transcriptions):** https://imslp.org/ (Beethoven Op. 27/2, Grieg Op. 46, Bach
BWV 772, Mozart K. 331, Offenbach, Rimsky-Korsakov, J. Strauss II Op. 314, Chopin Op. 35, Handel HWV 63)
