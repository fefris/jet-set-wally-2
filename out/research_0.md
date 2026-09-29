# Willy's movement physics in the Jet Set Willy engine (JSW1 disassembly, with the JSW2 differences marked)

## 0. Sources and confidence

- **Primary source:** Richard Dymond's SkoolKit disassembly of Spectrum JSW1 at https://skoolkid.github.io/jetsetwilly/ . Addresses below are hex, and each page is at `/asm/XXXX.html`. Every JSW1 number in this report comes from that code.
- **No JSW2 disassembly is public.** The JSW2 notes come from:
  - TASVideos submission 8625S, a JSW2 run: https://tasvideos.org/8625S
  - TASVideos submission 8012S, the matching JSW1 run, used as a cross-check: https://tasvideos.org/8012S
  - JSW Central: https://jswcentral.org/jsw2-01_jsw2.html
  - Wikipedia: https://en.wikipedia.org/wiki/Jet_Set_Willy_II
  - John Elliott's JSW2 room-format notes: https://www.seasip.info/Jsw/jsw2room.html
  - JSWMM forum thread "Undocumented quirky features of JSW2": https://jswmm.co.uk/topic/401-undocumented-quirky-features-of-jsw2/
  - World of Spectrum info file: https://worldofspectrum.net/pub/sinclair/games-info/j/JetSetWillyII_128.txt
- **Background:** JSW2 started as Derrick Rowson's Amstrad CPC conversion of JSW and was then ported back to the Spectrum (Wikipedia, JSW Central). Its engine is a rewrite, so it is *not* the JSW1 code with patches. The core numbers seem to be the same: speeds, jump arc, fall limits. The input and landing details differ.
- **Labels:**
  - **DERIVED** means I worked the value out from the disassembled code rather than finding it stated anywhere.
  - **UNCONFIRMED** means I could not verify it.

---

## 1. Main loop and timing

**No frame sync.** The game runs `DI` at load (https://skoolkid.github.io/jetsetwilly/asm/8400.html) and has no `HALT` in the loop. Each pass of the main loop is one game "frame", and the game runs as fast as the CPU allows.
- TAS 8012S (JSW1): "Jet Set Willy does not attempt to control its framerate… In best conditions, the game runs at approximately one in-game frame every 0.07 seconds." That is about 14 fps on a +2A with the music off.
- TAS 8625S (JSW2): "JSW2 does not attempt to control its framerate… In best conditions… approximately one in-game frame every 0.04 seconds." That is about 25 fps on a +2A.
- Both TAS write-ups say the game is slower with the in-game music on, with more lives left (the lives display is redrawn every frame), and while Willy is in the air.
- **DERIVED:**
  - The loop does about 9.2 KB of `LDIR` copies each frame (4 KB screen buffer 7000→6000, 4 KB 6000→display, 2 × 512 bytes of attributes). That is roughly 194k T-states, about 55 ms at 3.5 MHz, which matches the ~0.07 s figure.
  - The jump and fall sounds are blocking beeper loops (§6, §7). The fall-sound delay is 16 × the airborne value, so long falls visibly slow the game.

**Order of events in one frame.** From Main loop (1) at https://skoolkid.github.io/jetsetwilly/asm/89AD.html and Main loop (2) at https://skoolkid.github.io/jetsetwilly/asm/8B07.html:
1. Draw the remaining lives. Copy the empty-room attributes (5E00) and pixels (7000) into the work buffers (5C00 and 6000).
2. `90C0`: move the rope and guardians.
3. `8DD3`: move Willy (jump, fall and ground-control logic, §5–§7).
4. If Willy's y ≥ 0xE1 (he went past the top via a ramp or rope), move him to the room above.
5. `95C8`: set Willy's cell attributes and **kill him if any of his six cells is a nasty**. Then draw Willy.
6. Toilet and Maria special cases (`9534`).
7. `91BE`: draw the rope, arrows and guardians. **Guardian collision is pixel overlap.** Willy grabs the rope here.
8. Animate the conveyor. Draw the items and collect any on white-INK cells.
9. Copy the buffers to the screen. Update the clock.
10. Check BREAK (CAPS SHIFT + SPACE) and pause (A–G).
11. `8B07`: if the airborne value is 0xFF, lose a life. Then the music toggle, one note of music, and the cheat keys.

**Game clock.**
- JSW1: the minute counter at 85CB goes up by one each frame, so one game minute passes every 256 frames. The game starts at 7:00am and ends at 1am (Trivia page).
- JSW2: "it ticks one second for every ten frames" (TAS 8625S).

**Inputs per frame.**
- JSW1 reads the movement keys once per frame, in `8ED4`, and the other keys once more (TAS 8012S).
- JSW2: "Unlike Manic Miner and the original Jet Set Willy, inputs are read only once per frame" (TAS 8625S).

---

## 2. Coordinate system and state variables

These are from the game status buffer pages (https://skoolkid.github.io/jetsetwilly/asm/85CF.html and the entries after it).

| Addr | Name | Meaning |
|---|---|---|
| 85CF | y | **2 × Willy's pixel y** (top of the 16×16 sprite). It is the index into the screen-address table at 8200, which has 2 bytes per pixel row. Range 0..224 (pixel 0..112). The room is 16 rows × 8 px = 128 px tall. Row = (y AND 0xF0)/16. "When Willy is standing on a ramp, this holds his y-coordinate rounded down to the nearest multiple of 16." |
| 85D0 | flags | Bit 0 is facing (0 = right, 1 = left). Bit 1 is "moving". So the values are 0 = facing right and still, 1 = facing left and still, 2 = facing right and moving, 3 = facing left and moving. |
| 85D1 | airborne | 0x00 = on the ground. 0x01 = jumping. 0x02–0x0B = falling, safe to land. 0x0C–0x0F = falling, fatal on landing. 0xFF = dead (nasty, arrow, guardian, Maria or fatal fall). (https://skoolkid.github.io/jetsetwilly/asm/85D1.html) |
| 85D2 | frame | Animation frame 0–3. This is also the **sub-cell x position**: pixel x = 8 × column + 2 × frame. |
| 85D3/4 | attr addr | 0x5C00 + 32 × row + column. **Only the cell x is stored.** The column is 0–30, because Willy is always 2 cells wide. |
| 85D5 | jump counter | 0–18 during a jump. |
| 85D6 | rope | 0 = not on the rope. 0x03–0x20 = holding this segment. 0xF0–0xFF = just left the rope; it counts up to 0 over 16 frames, and the rope cannot be re-grabbed until then. |
| 85D7–85DD | entry state | A copy of 85CF–85D5 taken when Willy enters the room. It is used for respawn (§13). |

- **Room grid:** 32 × 16 cells, which is the 512-byte attribute buffer.
- **Tile identity comes from the attribute (colour) byte.** The code compares the cell's attribute byte with the room's background, floor, wall, nasty, ramp and conveyor tile attributes (80A0–80CD, https://skoolkid.github.io/jetsetwilly/asm/80A0.html). If two tile types share an attribute, they behave the same. For example, the "Slippery slopes" and "Floor ramps" entries on the Trivia page (https://skoolkid.github.io/jetsetwilly/reference/facts.html) come from this.
- **Room layout format (JSW1):** 2 bits per cell (background, floor, wall or nasty). There is at most one conveyor, which is a horizontal run, and one ramp, which is a 45° diagonal run of cells at −33 or −31 attribute steps. (https://skoolkid.github.io/jetsetwilly/asm/C000.html, https://skoolkid.github.io/jetsetwilly/asm/8D6B.html)
- **JSW2 layout:** the cell types are Air, Water (floor), Earth (wall), Fire (nasty), "/" ramp, left conveyor, item, "\" ramp and right conveyor. So one JSW2 room can hold both ramp directions and both conveyor directions, and items are cells in the layout (up to 16 per room). JSW2 also adds lifts, which use guardian slots, and teleporters. (seasip jsw2room)

---

## 3. Sprite, animation frames and horizontal sub-cell position

Willy's sprite data is at https://skoolkid.github.io/jetsetwilly/asm/9D00.html. The draw routine is https://skoolkid.github.io/jetsetwilly/asm/9637.html.

- There are 8 frames of 16×16 pixels (32 bytes each).
  - Sprite index = frame + 4 × facing.
  - Right-facing frames 0→3 are the same figure pre-shifted **+2 px per frame**. The first rows are `$3C,$00` → `$0F,$00` → `$03,$C0` → `$00,$F0`.
  - Left-facing frame k is the mirror image of right-facing frame 3−k.
- **Walking right:** the frame goes 0,1,2,3. From frame 3 the column goes up by 1 and the frame becomes 0.
- **Walking left:** the frame goes 3,2,1,0. From frame 0 the column goes down by 1 and the frame becomes 3.
- The result is a constant **2 px per frame**, or 4 frames per cell. Confirmed: "Willy moves horizontally at two pixels per frame, whether on the ground or in the air" (TAS 8012S and 8625S).
- The pixel y is drawn directly. On a ramp, an extra offset B is added (§9).
- The Nightmare Room swaps in the flying-pig sprite (`9656`).

---

## 4. Input model

This is from `8ED4` (https://skoolkid.github.io/jetsetwilly/asm/8ED4.html).

**JSW1 keys:**

| Action | Keys |
|---|---|
| Left | **Q, E, T, O, U, 5, 6**, Kempston left |
| Right | **W, R, Y, I, P, 7, 8**, Kempston right |
| Jump | **any key on the bottom row** (CAPS SHIFT, Z, X, C, V, B, N, M, SYMBOL SHIFT, SPACE), **0**, Kempston fire |
| Pause | A, S, D, F, G |
| Music toggle | H, J, K, L, ENTER |
| Quit | CAPS SHIFT + SPACE (BREAK) |

- On the top letter row the keys alternate: Q = left, W = right, E = left, R = right, T = left, and Y = right, U = left, I = right, O = left, P = right.
- Keys 5/6/7/8/0 cover both the cursor-key and Sinclair joystick layouts.
- The Kempston joystick is detected at the title screen: 256 reads of port 0x1F, looking for bit 5 (https://skoolkid.github.io/jetsetwilly/asm/87CA.html).

**JSW2 keys:** "Q E T U O – Left, W R Y I P – Right, Caps–Space – Jump, H J K L ENTER – Music on/off, A S D F G – Pause" (WoS info file).
- Joystick and number-key support in JSW2 is **UNCONFIRMED**. The WoS archive page lists "Redefinable Keys", which conflicts with the info file.

**How input is resolved (JSW1):**
1. Build a left/right request from the keys. A conveyor under Willy adds a forced keypress (§10). While Willy is running to the toilet, bit 0 is flipped so he is forced right.
2. Work out C:
   - +4 if any left key is pressed
   - +8 if any right key is pressed
   - both pressed gives C = 12
3. Look up the new flags as `flags = TABLE[flags + C]`, using the table at 8421 (https://skoolkid.github.io/jetsetwilly/asm/8421.html):

| current flags (V) | no key | left | right | both |
|---|---|---|---|---|
| 0 (facing right, still) | 0 | **1 (turn, no move)** | 2 (move) | 0 |
| 1 (facing left, still) | 1 | 3 (move) | **0 (turn, no move)** | 1 |
| 2 (facing right, moving) | 0 (stop) | **1 (turn, stop)** | 2 | 2 |
| 3 (facing left, moving) | 1 (stop) | 3 | **0 (turn, stop)** | 3 |

- **Turning around takes one frame with no movement.** A key in the facing direction moves Willy on the same frame. There is no acceleration or deceleration.
- **Both directions held means "keep doing what you were doing".**

4. Then the jump keys are checked. If one is held, the jump counter is set to 0 and airborne is set to 1. Execution then falls straight into the horizontal-move routine `8FBC`, so **Willy also takes his 2 px step on the take-off frame.**
5. Because the flags are updated before the jump starts, pressing jump on a turning frame gives a **vertical jump** in JSW1. TAS 8012S: "a jump performed that frame will result in a stationary jump."
6. **JSW2 differs here:** "unlike in past games a jump performed that frame will result in Willy moving horizontally while jumping" (TAS 8625S).
   - Wikipedia and JSW Central describe it this way: "Willy now takes a step forward before jumping from a standstill", and the player "can jump in the opposite direction immediately after landing, without releasing the jump button."
   - A JSWMM forum post says JSW2 processes left/right before jump. As a result, standing at a ledge edge, holding jump and then pressing a direction makes Willy "just move forward and fall" instead of jumping.
7. **Holding jump re-jumps immediately** on the first grounded frame, because the jump key is checked on every ground frame.

---

## 5. Horizontal walking, walls and screen edges

This is `8FBC`, "Move Willy (3)" (https://skoolkid.github.io/jetsetwilly/asm/8FBC.html).

**When the routine runs.** It returns at once if flags bit 1 (moving) is clear or Willy is on the rope. It runs:
- on every ground frame, and
- on most jump frames.

It does **not** run while falling, because the movement bit is cleared when a fall starts.

**Moving within a cell.** When the frame is not at the boundary (frame > 0 going left, frame < 3 going right), only the frame changes. **There is no wall check.**

**Crossing a cell boundary.** (x, y) below is Willy's top-left cell.
1. If Willy is on the ground (airborne = 0), work out a ramp step dy (§9). Otherwise dy = 0.
2. **Edge check first:**
   - Going left with column = 0: go to the room on the left.
   - Going right with column = 30: go to the room on the right.
   - Because this comes before the wall check, walls in the edge column never block a room transition.
3. **Wall checks.** Only the *wall* tile type blocks. Floor, ramp, conveyor and nasty cells do not block sideways movement.
   - **Right:** checks (x+2, y+1+dy), then (x+2, y+2) if the sprite spans 3 rows, then **(x+2, y+dy), the head**.
   - **Left:** checks (x−1, y+1+dy), then (x−1, y+2) if the sprite spans 3 rows. **The head cell (x−1, y+dy) is never checked.**
     - This is the bug "Don't mind your head": "Willy can move right to left through a wall tile at that position" (https://skoolkid.github.io/jetsetwilly/reference/bugs.html).
     - Manic Miner's equivalent routine does check the head (https://skoolkid.github.io/manicminer/asm/8BDD.html).
     - Behaviour in JSW2 is UNCONFIRMED.
4. If any checked cell is a wall, **return without moving**. The frame stays at 3 (or 0), so Willy stands pressed against the wall.
5. Otherwise update the column, the row (by dy) and y (by ±16 units, i.e. ±8 px), and set the frame to 0 (going right) or 3 (going left).

**Walking off a ledge.**
- The support check runs on the next frame (§7). Willy drops only when **both** cells under his 2-cell footprint are empty.
- When he starts to fall, the "moving" bit is cleared. So **walking off a ledge gives a straight vertical drop with no forward momentum**.

**Walls are solid from all sides:**
- from the side, via the checks above (with the left-head exception),
- from below, via the ceiling check (§6),
- from above, because they count as support (§8).

---

## 6. The jump

This is `8DD3`, "Move Willy (1)" (https://skoolkid.github.io/jetsetwilly/asm/8DD3.html).

**Per jump frame** (airborne = 1, current counter J = 0..17):
1. `y += (J AND 0xFE) − 8`. The units are half-pixels, so the change is ((J AND ~1) − 8)/2 px.
2. If the new y is negative (≥ 0xF0 as a byte), go to the room above.
3. **Ceiling check.** If either top cell of the sprite, (x, top row) or (x+1, top row), is a **wall**:
   - set `y = (y + 16) AND 0xF0`, which snaps the top row to just below the wall,
   - set airborne = 2 (falling),
   - clear the moving bit,
   - return.
   - Only wall tiles are ceilings, so **Willy jumps up through floor, ramp and conveyor cells**.
4. Add 1 to J. Play the jump beep, with pitch value 8 × (1 + |J−8|).
5. What happens next depends on J:
   - J = 18: the jump is over. Set airborne = 6 and return. **There is no horizontal step on this frame.** TAS 8012S: "If he lands on completing the jump, there is a single frame in which he cannot move." JSW2 has no such pause frame (TAS 8625S).
   - J = 13 or 16: go to the landing check (§7). If it succeeds, Willy lands and moves on to ground control on that frame (airborne → 0). Otherwise he still makes his horizontal step.
   - Any other J: make the horizontal step (`8FBC`).

**Vertical profile (DERIVED; matches "A jump lasts 18 frames, reaching a peak of 20 pixels", TAS):**

| J | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Δy (px) | −4 | −4 | −3 | −3 | −2 | −2 | −1 | −1 | 0 | 0 | +1 | +1 | +2 | +2 | +3 | +3 | +4 | +4 |
| height above start (px) | 4 | 8 | 11 | 14 | 16 | 18 | 19 | 20 | 20 | 20 | 19 | 18 | **16✓** | 14 | 11 | **8✓** | 4 | **0 (end)** |

✓ marks the landing checks, which happen at counter 13 and 16. The code comments say these are "exactly two cell-heights" and "exactly one cell-height above where he started the jump".

**What the numbers mean in play:**
- Willy can land on a platform whose surface is **1 or 2 cells above** his take-off floor. He cannot land 3 cells up.
- **Items up to 5 cells above** the floor can be collected (TAS).
- The jump rises by 20 px (bugs page: "the maximum height Willy can jump is 20 pixels").
- **Horizontal reach (DERIVED, confirmed by the TAS):** there are 2 px steps on the take-off frame and 17 of the 18 jump frames. That is 36 px, and the TAS says "landing him 36 pixels away on flat ground".
- **Direction can't be changed mid-jump.** Ground control (`8ED4`) is not called while airborne. The facing and moving flags are fixed at take-off. TAS: "Willy cannot be controlled while airborne" (JSW1 and JSW2).
- **Side walls during a jump:** "If his horizontal movement is impeded during the jump, the jump will continue as normal without the horizontal movement until either the wall is no longer in the way or the jump ends" (TAS). This works because the moving bit stays set.
- **Ceiling rows (DERIVED).** With Willy's top row at r:
  - a wall at row r−1 stops the jump on its first frame,
  - a wall at row r−2 stops it at 11 px of rise,
  - a wall at row r−3 stops it at 18 px of rise,
  - a wall at row r−4 or higher never interferes.
- **Jumping from a ramp:** the stored y is cell-aligned, and the drawn offset B (0–6 px) drops to 0 once Willy is airborne. So Willy "can cause him to instantly shoot upwards six pixels before even starting the jump" (TAS), which gives 20–26 px effective jumps ("High jump" entry on the Trivia page).
- **JSW2 ceiling-hit differences (forum report, UNCONFIRMED in code):**
  - Willy moves forward one step during the first two frames after the hit.
  - He then falls with a different airborne value, so the safe fall is shorter.
  - JSW2 also checks the floor under Willy *before* moving him down on each frame, where JSW1 moves him first. This changes some edge-of-pillar outcomes.

---

## 7. Falling, the airborne counter and landing

This is the same routine (`8DD3`, the section from 8E36 onward), plus `8ED4`.

**Support check.**
- It runs only when Willy's y is cell-aligned (`y AND 0x0E == 0`).
- If Willy's row + 2 is off the bottom of the room (below row 15), go to the room below.
- Otherwise look at the two cells under him, L = (x, y+2) and R = (x+1, y+2):
  - If either is a **nasty**, treat Willy as unsupported. The nasty check in §8 will kill him anyway.
  - Otherwise, if at least one of L and R is **not background**, Willy is supported and goes to `8ED4` (ground control).

**Unsupported and not jumping:**
- Clear the moving bit.
- If airborne = 0, set it to 2 and return. So the **first frame of a walk-off has no downward motion**.
- Otherwise:
  - add 1 to airborne,
  - if it reaches 16, set it back to 12, so it cycles 12..15,
  - play the fall beep (pitch value 16 × airborne),
  - `y += 8`, which is **4 px per frame**.

**Landing (`8ED4`).**
- If airborne ≥ 0x0C, **kill Willy** (fatal fall).
- Otherwise set airborne = 0.
- The movement flags were cleared when the fall began, so **Willy lands standing still**. The keys (and any conveyor) take effect on that same frame.

**Fatal fall thresholds (DERIVED; confirmed by both TAS write-ups):**

| Situation | Airborne on landing | Result |
|---|---|---|
| Walk off a ledge, fall d cells | 2 + 2d | **d ≤ 4 (32 px) safe; d ≥ 5 (40 px) fatal**. TAS: "Willy can safely walk off a floor and land up to four cells (32 pixels) below" |
| Fall after a jump ends, d cells below the take-off level | 6 + 2d | **d ≤ 2 (16 px) safe; d ≥ 3 fatal**. TAS: "when jumping he can land up to two cells (16 pixels) below the starting point of the jump" |
| Fall after a ceiling hit | starts at 2 from the snapped position | 4 cells below that point are safe |

- **Moving into the room below:** if airborne is less than 11, it is reset to 2. If it is already 11 or more, it is kept. This is the "Double descent" entry on the Trivia page. TAS: "the fall counter is reset between rooms". The longest survivable fall is 4 cells, then the room change, then 4 more cells.
- **Grabbing a rope** also cancels the fall. Dropping off the bottom of a rope sets airborne = 0 and rounds y down to a multiple of 4 px.

---

## 8. Standing, one-way floors, nasties and the cells Willy occupies

**Standing.** Any non-background, non-nasty cell supports Willy: floor, wall, ramp or conveyor.
- Items and guardians are drawn *after* Willy moves, so they never support him.
- Willy stands as long as **one** of the two cells under him is solid.

**Floors are one-way platforms.**
- The floor tile type is never tested in the movement code. It only matters as "not background".
- So Willy walks through floor cells sideways and jumps up through them.
- He can land on them only when falling or descending, at aligned positions: counter 13 and 16 during a jump, and every 8 px while falling.
- **DERIVED:** every aligned position on a normal jump's way down is checked, so Willy does not fall through floors during ordinary play.
- seasip's description of JSW1 and JSW2 agrees: "Water: As Air, but Willy can also stand on it. Earth: Willy can stand on it, but not walk or jump through it."

**Cells occupied.**
- Willy is always **2 columns** wide (x, x+1).
- He is **2 rows** tall if his pixel y is a multiple of 8 and **3 rows** otherwise, which is most of the time during jumps and on every other frame of a fall.

**Nasty hitbox.** `95C8` and `961E` (https://skoolkid.github.io/jetsetwilly/asm/95C8.html, https://skoolkid.github.io/jetsetwilly/asm/961E.html) check **six cells, 2 wide × 3 tall**, starting at Willy's top-left cell. Willy dies if any of them is a nasty. When he is aligned, the third row is the row under his feet, so **stepping onto a nasty set into the floor kills him**.
- JSW2 may differ: forum reports say Willy can jump over a head-height Fire cell from exactly the right position. UNCONFIRMED.

**Guardians and arrows** use pixel collision (`91BE`):
- A guardian kills Willy if it overlaps any pixel already drawn.
- An arrow kills if it hits anything with white INK, and Willy's cells are made white.
- Collision uses Willy's *drawn* position, including the ramp offset (TAS).

**Items** are collected when they sit on a cell with white INK.
- Willy's top two rows are always made white.
- The third row is made white only when he spans 3 rows.

---

## 9. Ramps (stairs)

This covers `8FBC` and `95C8`, with the ramp definition at https://skoolkid.github.io/jetsetwilly/asm/80DA.html.

**JSW1 ramp layout.** One ramp per room.
- Direction byte: 0 = rises to the **left** ("\"), 1 = rises to the **right** ("/").
- The cells run diagonally at exactly 45°, one cell across per cell up.

**Step logic.** This only runs when airborne = 0 and Willy is crossing a cell boundary.

| Moving | Ramp rises to the left | Ramp rises to the right |
|---|---|---|
| Left | cell (x−1, y+1) is ramp → **up one row** | cell (x+1, y+2) is ramp → **down one row** |
| Right | cell (x, y+2) is ramp → **down one row** | cell (x+2, y+1) is ramp → **up one row** |

The row change is applied at the same time as the column step. The wall check is done at the new row, and only for the cells listed in §5.

**Smooth drawing.**
- If Willy is not airborne and the ramp cell is under his left column (ramp rising left) or right column (ramp rising right), the sprite is drawn lower by:
  - B = 2 × frame px (ramp rising left), or
  - 6 − 2 × frame px (ramp rising right).
- This gives a 1:1 slope at 2 px per frame.
- The stored y stays cell-aligned.

**Ramps and other tiles:**
- Ramps don't block sideways movement.
- Willy can jump up through them.
- He can land on them like floor.
- TAS: "If jumping onto a staircase means he lands on a cell having already moved partway into the next cell, he won't be warped upwards but instead will be able to walk through the staircase (this is an intended mechanic)."

**Ramps and walls.** Only the listed cells are wall-checked, and on the ramp the drawn position is lower than the logical one. So "if he's on a ramp, he can sometimes walk straight through" walls ("Ramps v. walls" on the Trivia page).

**Going up past the top.** If a ramp or rope takes y to 0xE1 or more, Willy moves to the room above (`89D4`).

**JSW2:** both "/" and "\" ramp cells can appear anywhere in a room (seasip). The JSW2 TAS describes the same "teleport up/down a cell plus visual offset" behaviour.

---

## 10. Conveyors

This is in `8ED4`, with the conveyor definition at https://skoolkid.github.io/jetsetwilly/asm/80D6.html.

**How it works.** When Willy has landed or is standing, and **either** cell under him is a conveyor tile, the game **fakes a left or right keypress** in the conveyor's direction (0 = left, 1 = right). So:
- The conveyor moves Willy at walking speed, 2 px per frame.
- Normal turning rules apply. For example, landing facing the other way costs one turning frame.

**Walking against a conveyor.** Holding the opposite key gives "both directions" in the table, which means "keep doing what you were doing":
- If Willy walked onto or jumped onto the conveyor already moving against it, he keeps walking against it.
- If he fell onto it (the moving bit is cleared by the fall), holding the opposite key **only stalls him**. TAS 8012S: "if he walks onto a conveyor, or jumps onto it from below, he can walk against the direction… if he falls onto it from above, he can only stall movement."

**Jumping off a conveyor.** The take-off flags come from the same combined input, so the conveyor also drives the jump direction.

**JSW2 edge quirk:** "if only one of the two cells Willy is standing on is a conveyor, Willy can jump in any direction, even directly opposite" (TAS 8625S). A forum report adds that on a *left* conveyor, holding only jump moves Willy "one increment at a time" between vertical jumps (Spectrum JSW2 only).

**Conveyor animation (JSW1).** Pixel rows 1 and 3 of the tile are rotated 2 bits each frame, in opposite directions (`94F9`). This is cosmetic only.

---

## 11. Ropes

This is `91BE`, from 92A4 onward.

- **Grabbing:** Willy grabs the rope when a rope pixel overlaps anything already drawn and 85D6 = 0.
- **While hanging:**
  - Willy's pixel y is the segment's y − 8.
  - His column and animation frame come from the segment's sub-cell pixel position.
  - Gravity does not apply.
- **Climbing:** holding a direction moves Willy one segment per frame. Moving the *same* way the rope is swinging goes down; moving the opposite way goes up.
  - If the room above is the room itself, Willy can climb no higher than segment 12.
- **Leaving the rope:**
  - **Jump off:** 85D6 is set to 0xF0, y is rounded down to a multiple of 8 px, and the moving bit is **forced on**. Willy always leaps in the direction he faces.
  - **Drop off the bottom:** 85D6 is set to 0xF0, y is rounded down to a multiple of 4 px, and airborne is set to 0, so he starts a fresh fall.
  - Either way, the rope can't be re-grabbed for 16 frames.

---

## 12. Room edges and transitions

These are routines `948A`, `949E`, `94B0` and `94D2` (https://skoolkid.github.io/jetsetwilly/asm/948A.html and the three that follow). Each loads the new room through `8912`.

| Exit | Trigger | New state |
|---|---|---|
| Left | column 0, frame 0, stepping left | column set to **30**. y, frame, airborne and jump counter are kept, **so a jump continues** into the new room. |
| Right | column 30, frame 3, stepping right | column set to **0**. Everything else is kept. |
| Up | jump takes y below 0, or a ramp or rope takes y to 0xE1 or more | **y set to 208 (pixel 104, row 13, feet on the bottom row 15)**. Column kept. **Airborne set to 0, so the jump ends.** |
| Down | Willy is aligned and the row under his feet would be row 16 | **y set to 0 (top row)**. Column kept. Airborne set to 2 if it was less than 11, otherwise kept. |

- The edge check comes before the wall check, and the new room's tiles are not checked. So **Willy can arrive inside walls** ("Stuck in the wall" on the bugs page).
- JSW2 edge coordinates are **UNCONFIRMED**. They are presumably the same, and the TAS confirms the fall-counter reset between rooms.

---

## 13. Death and respawn

**JSW1:**
- `8912` copies Willy's 7-byte state (y, flags, airborne, frame, cell address, jump counter) to 85D7 **every time a room is entered**.
- On death, airborne is set to 0xFF. `8C01` then:
  - flashes the room, filling the attributes with 0x47 down to 0x40, with a falling note for each step,
  - takes a life,
  - **restores the saved entry state exactly**, including mid-jump or mid-fall states,
  - reinitialises the room (guardians back to their start positions, rope status 0).
- Items stay collected.
- This is the cause of the classic **infinite death loops**, for example entering a room already falling from too high ("Dangerous connections" on the Trivia page). (https://skoolkid.github.io/jetsetwilly/asm/8C01.html, https://skoolkid.github.io/jetsetwilly/asm/8912.html)
- The game starts in The Bathroom at column 20, row 13 (y = 208). The facing and frame are not reset between games (`87CA`).

**JSW2:**
- "Willy himself… returns to the last static solid ground he was standing on. If this was in a different room, that room will be loaded" (TAS 8625S).
- JSW Central says: "Infinite death scenarios have been eliminated thanks to providing safe restart positions."
- **Conflicting evidence:**
  - The same TAS author calls infinite death loops "very, very common" in JSW2.
  - James McKay's 128K fix adds 3 seconds of invulnerability after death to stop loops (WoS info file).
  - Rowson's 2016 JSW2+ lists "A routine to stop reoccurring death on re-spawn" (https://www.jdawiseman.com/papers/games/jsw2/jsw2_updated.html).

---

## 14. JSW1 vs JSW2 (Spectrum) summary

| Mechanic | JSW1 (code) | JSW2 |
|---|---|---|
| Walk speed | 2 px per frame, 4 frames per cell | same (TAS) |
| Jump | 18 frames, 20 px peak, 36 px across | same (TAS) |
| Fall | 4 px per frame; 4 cells safe from a walk-off, 2 cells below take-off after a jump | same (TAS). Ceiling-hit falls are shorter (forum, UNCONFIRMED) |
| Turning frame + jump | vertical jump | jump includes a horizontal step (TAS, Wikipedia) |
| Landing at the end of the jump | 1 frame with no movement | no pause (TAS) |
| Input reads per frame | movement once, other keys again | once (TAS) |
| Order of the floor check | move down, then check | check, then move (forum, UNCONFIRMED) |
| Conveyor edge | normal | Willy can jump against it if only one cell is conveyor (TAS) |
| Respawn | exact room-entry state replayed | last static solid ground (TAS) |
| Frame time (+2A, best case) | ~0.07 s | ~0.04 s |
| Tiles per room | 1 ramp and 1 conveyor per room | both ramp and both conveyor directions, item cells, lifts, teleporters (seasip) |
| Attic bug | present | absent (WoS info file) |

---

## 15. Reference pseudocode (JSW1 semantics)

y is in half-pixels (as in the original), col is 0..30, row = y >> 4.

```
update_willy():                                  // 8DD3
  if on_rope: ground_control(); return
  if airborne == 1:                              // jumping
     y += (jc & ~1) - 8
     if y < 0: enter_room_above(); return
     if WALL(col,row) or WALL(col+1,row):        // ceiling
        y = (y+16) & 0xF0; airborne = 2; moving = false; return
     jc += 1; beep(8*(1+abs(jc-8)))
     if jc == 18: airborne = 6; return
     if jc != 13 and jc != 16: move_horiz(); return
  if (y & 0x0E) == 0:                            // aligned: support check
     if row+2 > 15: enter_room_below(); return
     L = cell(col,row+2); R = cell(col+1,row+2)
     if L != NASTY and R != NASTY and (L != BG or R != BG):
        ground_control(); return
  if airborne == 1: move_horiz(); return         // mid-jump, nothing to land on
  moving = false
  if airborne == 0: airborne = 2; return
  airborne += 1; if airborne == 16: airborne = 12
  beep(16*airborne); y += 8                      // 4 px

ground_control():                                // 8ED4
  if not on_rope:
     if airborne >= 12: kill(); return
     airborne = 0
     if L or R is CONVEYOR: press(conveyor_dir)
  flags = TABLE[flags + 4*left + 8*right]        // §4
  if jump_pressed:
     jc = 0; airborne = 1
     if on_rope: leave_rope_jump(); return
  move_horiz()

move_horiz():                                    // 8FBC; see §5 and §9
```

After `update_willy()` each frame (§1):
- if y ≥ 0xE1, go to the room above;
- check the 2×3 cells for nasties;
- draw Willy with the ramp offset B;
- draw the guardians with pixel collision.