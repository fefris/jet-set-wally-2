# Jet Set Willy engine research: everything except Willy (guardians, arrows, ropes, items, collision, Maria, end game, bugs), JSW1 compared with JSW2

**Scope and sources.** The JSW1 figures come mainly from Richard Dymond's SkoolKit annotated disassembly of the original 48K *Jet Set Willy* (build 20260428). I read the raw instruction-level comments of each routine directly. JSW2 (*Jet Set Willy II: The Final Frontier*, Spectrum, 1985) is **not** covered by SkoolKit. Its engine was rewritten from scratch (see §11), so JSW2 facts come from John Elliott's reverse-engineered JSW2 room format, the programmers' own comments, TASVideos submissions and fan sites. Anything I could not confirm is marked **UNCONFIRMED**.

Notation:
- **Cell** means an 8×8 attribute cell.
- The playfield is 32 × 16 cells (256 × 128 px). It is the top two-thirds of the Spectrum screen.
- Addresses such as `90C0` are JSW1 routine or data addresses. The page for each is `https://skoolkid.github.io/jetsetwilly/asm/<ADDR>.html`.
- **"Frame"** means one pass of the game's main loop, not a 50 Hz TV frame.

---

## 0. Frame pipeline (JSW1): order matters for every collision rule

Main loop `89AD` / `8B07` ([89AD](https://skoolkid.github.io/jetsetwilly/asm/89AD.html), [8B07](https://skoolkid.github.io/jetsetwilly/asm/8B07.html)):

1. Copy the "empty room" attributes (5E00→5C00) and pixels (7000→6000) into the off-screen work buffers.
2. **Move the rope and guardians** (`90C0`). Arrows are *not* moved here.
3. Move Willy (`8DD3`). This is skipped when the game mode is 3, i.e. head down the toilet.
4. If Willy's y ≥ 225 (in 2×y units), move him into the room above.
5. **Check and set Willy's attributes, which is also the nasty check** (`95C8` / `961E`). Then **draw Willy** with OR-blending and no collision test.
6. If the mode is 2 (running to the toilet), check whether he has reached the toilet (`9584`).
7. Special rooms: Maria in Master Bedroom, the toilet in The Bathroom (`9534`).
8. **Draw the rope, arrows and guardians in entity-list order, with collision tests** (`91BE`). Arrows are *moved* here too.
9. Move the conveyor (`94F9`).
10. **Draw the items and collect any on white-INK cells** (`93D1`).
11. Copy the buffers to the screen. Print the time and item count, and increment the "minute counter" `85CB` (one tick per frame).
12. Read the keys and play one in-game music note.
13. If the airborne status `85D1` = 0xFF, run **lose a life** (`8C01`).

Consequences:
- Willy is already in the pixel buffer when guardians, arrows, the rope and Maria are drawn. Their collision tests are therefore "does my pixel land on an already-set pixel?"
- Entities drawn earlier in the list also count as obstacles for later ones.
- A guardian or arrow kill jumps straight to step 11 (`90B7` → `89F5`). The rest of that frame's entities and items are skipped, the frame is still shown, and the death is then processed ([90B6](https://skoolkid.github.io/jetsetwilly/asm/90B6.html)).

**Frame rate.** JSW does not lock to 50 Hz.
- JSW1: "In best conditions, the game runs at approximately one in-game frame every 0.07 seconds". It runs slower with more lives left and with music on ([TASVideos 8012S](https://tasvideos.org/8012S)). That is roughly 14 fps.
- JSW2: "does not attempt to control its framerate… approximately one in-game frame every 0.04 seconds" in best conditions (music off) ([TASVideos 10021S](https://tasvideos.org/10021S)). That is roughly 25 fps. **So JSW2 runs noticeably faster in real time than JSW1 with the same per-frame steps.**

---

## 1. Entity system (JSW1)

### 1.1 Room entity specifications → entity definitions → entity buffers

- **Maximum 8 entities per room** (guardians, arrows and the rope combined).
  - Room definition bytes `xxF0–xxFF` hold 8 two-byte "entity specifications", copied to `80F0` ([80F0](https://skoolkid.github.io/jetsetwilly/asm/80F0.html)).
  - The Forgotten Abbey is the only room with 8 guardians. The Attic has 8 entities: 6 vertical guardians and 2 arrows ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
- **Spec byte 0** is an index into 128 eight-byte **entity definitions** at `A000` ([A000](https://skoolkid.github.io/jetsetwilly/asm/A000.html)).
  - 0x00 means empty.
  - 0x7F or 0xFF means terminator. Definition 0x7F starts with 0xFF, which terminates the buffer list.
- **Spec byte 1** depends on the entity type:
  - Guardian: bits 5–7 are the base sprite index and bits 0–4 the x cell (0–31).
  - Arrow: pixel y ×2.
  - Rope: the x cell of the rope's top.
- On room entry, `8912` copies each definition into an 8-byte **entity buffer** at `8100`. The spec's second byte replaces the definition's byte 2. A 0xFF terminator follows at `8140` ([8912](https://skoolkid.github.io/jetsetwilly/asm/8912.html), [8100](https://skoolkid.github.io/jetsetwilly/asm/8100.html)).
- Buffers are re-initialised from the definitions every time the room is entered **and after every death**. Guardians therefore always restart from their defined start state.
- Definitions in JSW1: 59 horizontal, 48 vertical, 2 arrows (one per direction) and 1 rope. All ropes share definition 0x01. Tallied from [A000](https://skoolkid.github.io/jetsetwilly/asm/A000.html).

### 1.2 Buffer layouts ([8100](https://skoolkid.github.io/jetsetwilly/asm/8100.html))

The entity type is held in byte 0, bits 0–2: 001 horizontal, 010 vertical, 011 rope, 100 arrow, 000 unused.

**Horizontal guardian**

| Byte | Contents |
|---|---|
| 0 | b7: direction (0 = left, 1 = right); b5–6: animation frame index; b0–2 = 001 |
| 1 | b5–7: animation frame index **mask**; b3: BRIGHT; b0–2: INK |
| 2 | b5–7: base sprite index; b0–4: x cell |
| 3 | pixel y ×2 (fixed) |
| 4 | unused |
| 5 | sprite graphics page (high byte) |
| 6 | min x cell |
| 7 | max x cell |

**Vertical guardian**

| Byte | Contents |
|---|---|
| 0 | b5–7: animation frame index; b3–4: animation update flags; b0–2 = 010 |
| 1 | mask, BRIGHT and INK, as for horizontal guardians |
| 2 | base sprite and x cell (fixed) |
| 3 | pixel y ×2 |
| 4 | y increment ×2 (signed) |
| 5 | sprite page |
| 6 | min y ×2 |
| 7 | max y ×2 |

**Arrow**

| Byte | Contents |
|---|---|
| 0 | b7: direction (1 = left→right); type 100 |
| 2 | pixel y ×2 |
| 4 | x (0–255, in *cells*) |
| 5 | collision-enable byte (0x00 or 0xFF) |
| 6 | top/bottom pixel-row pattern |

**Rope**

| Byte | Contents |
|---|---|
| 0 | b7: direction (1 = swinging left→right); type 011 |
| 1 | animation frame index |
| 2 | x cell of the rope's top |
| 3 | x cell of the segment being drawn |
| 4 | length = 0x20 |
| 5 | segment drawing byte |
| 7 | turn-around frame = 0x36 |

The rope also borrows bytes 9 and 11 of the *next* slot:
- Byte 9 is the segment counter.
- Bit 0 of byte 11 is set while Willy is on the rope.

Because of this, **a rope must be followed in the list by an arrow or by nothing** ("The encroaching rope", [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

### 1.3 Guardian sprites and animation masks

- **Sprite format:** each guardian sprite is **16×16 px, 1 bit per pixel, 32 bytes**, stored 2 bytes per row. There are **8 sprites per 256-byte page**.
- **Sprite address:** page = byte 5, offset = sprite index × 32, where sprite index = `((byte0 AND byte1_mask) OR base) AND 0xE0` ([91BE @9211](https://skoolkid.github.io/jetsetwilly/asm/91BE.html), [AB00](https://skoolkid.github.io/jetsetwilly/asm/AB00.html)).
- **Animation mask table** ([Glossary](https://skoolkid.github.io/jetsetwilly/reference/glossary.html)). B is the base frame and `|` is bitwise OR:

| Mask | Frames cycled |
|---|---|
| 000 | B (1 frame) |
| 001 | B, B\|1 |
| 010 | B, B, B\|2, B\|2 |
| 011 | B, B\|1, B\|2, B\|3 |
| 111 | B … B\|7 (8 frames) |

  - Masks 100, 101 and 110 are unused in JSW1. JSW1 uses mask 000 ×4, 001 ×21, 010 ×5, 011 ×40 and 111 ×37 (tallied from A000).
- **Bidirectional sprites (4 frames vs 8):** for a horizontal guardian, bit 7 of byte 0 (direction) *is* bit 7 of the frame index.
  - With mask 111, moving left uses sprites 0–3 (left-facing) and moving right uses sprites 4–7 (right-facing). That gives 8 frames and a bidirectional sprite.
  - With mask 011 the direction bit is masked out, so both directions show frames 0–3 and the guardian always faces one way. Examples are "the one-way saw" in Cuckoo's Nest and "the disrespectful monk" in The Chapel. They are the only horizontal guardians using 4 of 8 frames. "Every horizontal guardian has either 4 or 8 animation frames" ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
- Vertical guardians in JSW1 use at most 4 frames. Some have only 1 frame (Ballroom East, Top Landing, Out on a limb, The Nightmare Room) ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

---

## 2. Horizontal guardians (JSW1), from [90C0 @9133](https://skoolkid.github.io/jetsetwilly/asm/90C0.html)

They run **every frame** with **no fast/slow flag**. Manic Miner had one: bit 7 of the MM guardian attribute, "0 = normal, 1 = slow", moved the guardian only on alternate frames ([MM 8D0F](https://skoolkid.github.io/manicminer/asm/8D0F.html)). JSW dropped it; byte 1 bit 4 is "unused".

**Moving right** (byte 0 b7 = 1):
- `b0 = (b0 + 0x20) OR 0x80`, so the frame goes 4→5→6→7→4.
- On the wrap 7→4 (result < 0xA0):
  - if x = max, set `b0 = 0x61`, meaning moving left at frame 3;
  - otherwise x += 1.

**Moving left** (b7 = 0):
- `b0 = (b0 − 0x20) AND 0x7F`, so the frame goes 3→2→1→0→3.
- On the wrap 0→3 (result ≥ 0x60):
  - if x = min, set `b0 = 0x81`, meaning moving right at frame 4;
  - otherwise x −= 1.

The sprite frames are **pre-shifted by 2 px each**:
- right-facing frames 4, 5, 6, 7 put the figure at offsets 0, 2, 4, 6 px in the 16-px box;
- left-facing frames 3, 2, 1, 0 put it at 6, 4, 2, 0.

The result:
- **Speed: 2 px per frame.** The cell x changes once every 4 frames, and the art supplies the sub-cell motion.
- **Turning:**
  - At max, frame 7 → 3: same offset, new facing, and the x cell does not change on that frame.
  - At min, frame 0 → 4 in the same way.
  - So each end shows a **1-frame pause while the sprite flips**.
- **Sprite box extent:** from pixel `min×8` to `max×8 + 15`.
- **Full cycle period = 8 × (max − min + 1) frames.** I verified this by simulating the code: for min 0, max 2 the period is 24 frames.
- Initial state comes from the definition. Most start moving left at frame 0 (byte 0 = 0x01). Some start right (0x81). The starting x cell comes from the room spec.
- y is fixed (byte 3). Examples: 56, 32, 80, 88, 64, 40, 104 px ([A000](https://skoolkid.github.io/jetsetwilly/asm/A000.html)).
- Example definition 0x0C (The Off Licence): y 56, min x 19, max x 29, INK 4, mask 011.

---

## 3. Vertical guardians (JSW1), from [90C0 @917F](https://skoolkid.github.io/jetsetwilly/asm/90C0.html)

**Animation** runs independently of movement:
- Every frame, bit 3 of byte 0 is toggled.
- If (bit 3 or bit 4) is then set, the frame index (bits 5–7) advances by 1 (+0x20).
- So **bit 4 set means the animation advances every frame** ("fast"), and **bit 4 clear means every second frame** ("slow"). This is JSW's only fast/slow flag, and it controls animation, not movement.
- JSW1 has 25 fast-animating and 19 slow-animating vertical definitions, plus a few with mask 000 (tallied from A000).

**Movement:**
- `y2 += dy2` every frame. Both are stored ×2.
- JSW1 speeds range over **±1…6 px per frame**. The start increments used are: +1 ×10, +2 ×17, +3 ×3, +4 ×4, +5, +6 ×2, −1, −2 ×4, −3, −4 ×2, −5, −6 and 0 ×1. The zero-speed one is the "Guardian or fixture?" definition 0x59, the only guardian that never moves ([A000](https://skoolkid.github.io/jetsetwilly/asm/A000.html), [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

**Bounds (asymmetric):**
- If the new y ≥ max: negate dy. **There is no clamp**, so y can overshoot max by up to |dy|−1.
- Else if the new y ≤ min: set **y = min** (clamped) and negate dy.

x is fixed. The sprite is drawn at pixel x = 8 × cell and pixel y = y (any pixel row).

Example: definition 0x0E (The Bridge) starts at y 24, dy = +6 px, range 0–96, 1 frame of animation per frame.

---

## 4. Guardian drawing, colour and collision (JSW1), from [91BE @91D6](https://skoolkid.github.io/jetsetwilly/asm/91BE.html) and [9456](https://skoolkid.github.io/jetsetwilly/asm/9456.html)

### Colour ("ink over room paper")

- `C = (INK | BRIGHT<<6)` is taken from byte 1: `AND 0x0F; ADD 0x38; AND 0x47`.
- `attr = (current 5C00 attribute of the guardian's top-left cell AND 0x38) XOR C`. This keeps only the PAPER.
- The *same* attribute is written to the 2×2 block, or the **2×3 block when y is not a multiple of 8** (`byte3 AND 0x0E ≠ 0`).
- FLASH is always cleared.
- The whole block takes the top-left cell's PAPER.
- The guardian's INK overwrites whatever was in those cells, including Willy's white. This is classic Spectrum colour clash. It has a gameplay effect: "when Willy and a guardian share a cell, Willy will have the guardian's colour in that cell… not able to collect the item" ([TASVideos 8012S](https://tasvideos.org/8012S)).
- **"Guardian halos" bug:** a BRIGHT guardian on a non-black, non-BRIGHT room paper shows a BRIGHT box. It affects 4 guardians ([Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).
- Colour stats: yellow 25, magenta 20, green 19, red 18, cyan 18, white 7, blue 2 (both BRIGHT), black 0 ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

### Collision: pixel-perfect against everything already drawn

- `9456` is called with C = 1 (blend mode). For each of the 32 sprite bytes: `if (sprite AND screen) ≠ 0 → return NZ`, which kills Willy. Otherwise it ORs the byte in.
- The buffer already holds room tiles, Willy and earlier entities. So **a guardian kills Willy if it touches Willy's pixels, and also if its path hits a wall, floor, nasty or any previously drawn entity** ("Guardians need a clear path", [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
- An arrow listed before a guardian will "kill Willy" when it hits the guardian.
- Room designers keep guardian paths over empty background.
- Cells can be shared with no death as long as no set pixels overlap.
- In Manic Miner the same sprite routine is used for horizontal guardians ([MM 8DAA](https://skoolkid.github.io/manicminer/asm/8DAA.html)).

---

## 5. Arrows (JSW1), from [91BE @9237](https://skoolkid.github.io/jetsetwilly/asm/91BE.html) and [A000](https://skoolkid.github.io/jetsetwilly/asm/A000.html)

- **Two definitions:**
  - 0x3C flies left→right. Start x = 208 (0xD0), pattern `%10000010`.
  - 0x45 flies right→left. Start x = 28 (0x1C), pattern `%01000001`.
  - The room spec supplies the pixel y (×2). Examples: The Beach y = 42 px, Quirkafleeg y = 66 px ([rooms FA00](https://skoolkid.github.io/jetsetwilly/asm/FA00.html), [D000](https://skoolkid.github.io/jetsetwilly/asm/D000.html)).
- **Speed: 1 cell (8 px) per frame.** x is a byte from 0 to 255 in cell units and wraps.
- **Looping and visibility:**
  - The arrow is drawn only while x is 0–31.
  - Loop period is **256 frames**, of which 32 are visible. The arrow is effectively flying "off-screen" for 224 frames.
  - An R→L arrow is already on screen when the room is entered (starting at x 28).
- **Warning sound:**
  - Plays once per lap, when x = **244** (L→R) or **44** (R→L).
  - That gives **12 frames** (L→R) or **13 frames** (R→L) of warning before the arrow appears.
  - The sound is 128 speaker toggles with the delay falling from 128 to 1, which is a rising-pitch "zip". The border colour is preserved.
  - The arrow is not drawn on the sound frame.
- **Shape:** 8 px wide and 3 px tall.
  - Row y−1: the pattern.
  - Row y: the shaft, 0xFF.
  - Row y+1: the pattern.
  - All three are *overwrite* writes, not OR. The arrow flies through walls and ignores tiles.
- **Colour:** the arrow ORs INK 7 (white) into its cell and keeps the PAPER.
- **Collision (attribute gate plus pixel test):**
  - Before drawing, if the cell's INK is **already white**, collision is enabled. A cell is white when Willy's attribute pass made it white, or when the background INK is white.
  - The kill happens if **any pixel of the shaft row** is already set. The top and bottom rows are not tested.
  - "White-seeking missile": an arrow also kills Willy if it hits a white rope. Rooms that have both a rope and an arrow use non-white ropes ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
- **Side effects:**
  - Arrows (and white guardians) *collect items* they pass over, because of the white-INK rule (see §7).
  - An arrow drawn before a rope drags Willy onto the rope ("Ropes before arrows", [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

---

## 6. Ropes (JSW1), from [90C0 @90D9](https://skoolkid.github.io/jetsetwilly/asm/90C0.html), [91BE @92A4](https://skoolkid.github.io/jetsetwilly/asm/91BE.html), [8300](https://skoolkid.github.io/jetsetwilly/asm/8300.html), [8DD3](https://skoolkid.github.io/jetsetwilly/asm/8DD3.html), [8ED4](https://skoolkid.github.io/jetsetwilly/asm/8ED4.html), [8FBC](https://skoolkid.github.io/jetsetwilly/asm/8FBC.html)

**Rooms and definition:**
- Used in Quirkafleeg, On the Roof, Cold Store and Swimming Pool (x cell 16) and The Beach (x cell 14).
- One definition for all ropes: start frame 0x22, swinging right→left, length 0x20, turn frame 0x36 ([A000](https://skoolkid.github.io/jetsetwilly/asm/A000.html)).

**Geometry:**
- **33 segments** (index 0…32). Each segment is **one pixel** OR'd into the buffer.
- Segment 0 is always at pixel **y = 0** (top of the room), at the **leftmost pixel of cell x** (drawing byte 0x80).
- For the swing frame F (0–0x36), segment s+1 is offset from segment s by table entries `[F+s]`:
  - **x shift:** 0–3 px (first half of `8300`), applied left or right depending on the side of centre;
  - **y step:** 6 or 4 in ×2 units, i.e. **3 or 2 px** (second half).

Table values:
```
X (0x8300+F): 32×0, 12×1, 20×2, 2,2,1,2,2,1,1,2, 1,1,2,2,3,2,3,2, 3,3,3,3,3,3
Y (0x8380+F): 48×6, 4,6,6,4,6,4,6,4, 6,4,4,4,6,4,4,4, 22×4
```
- My simulation of these tables gives these rope-bottom positions relative to the top:

| Frame F | Bottom position (dx, dy px) |
|---|---|
| 0 (at rest) | (0, 96) |
| 0x12 | (±24, 95) |
| 0x22 | (±54, 84) |
| 0x36 (extreme) | (±67, 67), i.e. about 45° |

**Swing:**
- Frame bit 7 = 1 means left of centre. Byte 0 bit 7 is the swing direction.
- The frame index moves **±2 per frame**, or **±4 near the centre** (index below about 0x12–0x14), which imitates pendulum speed-up at the bottom.
- The direction flips when `frame AND 0x7F = 0x36`.
- By simulation: **half swing = 45 frames, full period = 90 frames.**

**Colour:** no attribute writes, so the rope shows in the **INK of the cells it crosses**, which is the room background INK. Example: POKE 57248,5 turns the Swimming Pool background INK from white to cyan, and the rope turns cyan too ([Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).

**Grabbing** (rope status `85D6`, [gbuffer](https://skoolkid.github.io/jetsetwilly/buffers/gbuffer.html)):
- Segments are drawn top to bottom. If `85D6 = 0` and a segment pixel lands on an already-set pixel, then `85D6 = segment index` and "Willy on rope" is set.
- The collision is pixel-based against *anything* drawn so far: Willy, tiles or earlier entities. The topmost touching segment wins.
- Values: 0 = off, 0x03–0x20 = holding that segment, 0xF0–0xFF = recently left.

**While holding:**
- Willy is repositioned **every frame** to follow the rope.
- **Willy y = segment y − 8 px.** The held segment sits at the vertical centre of his 16-px sprite.
- Willy's x cell and walk frame come from the pixel's position in its cell, so the rope passes the same point on his figure at 2-px granularity:

| Rope pixel bits | Willy's x | Willy's frame |
|---|---|---|
| 0–1 | cell | 1 |
| 2–3 | cell | 0 |
| 4–5 | cell − 1 | 3 |
| 6–7 | cell − 1 | 2 |

- Gravity and left/right walking are skipped while on the rope (`8DD3` → `8ED4`; `8FBC` returns).

**Climbing:**
- If a direction key is held, the segment index changes by 1 per frame:
  - **+1 (down)** if Willy faces the same way the rope is swinging;
  - **−1 (up)** otherwise.
- This is "Rope climbing for beginners" in the [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html).

**Top limit:**
- If the room has no exit above (the room-above field equals the current room), the index cannot go below **12**.
- Otherwise Willy can climb high enough that his y goes negative (≥225 in 2y units) and he **moves into the room above**, appearing on its bottom floor at y 104 ([94B0](https://skoolkid.github.io/jetsetwilly/asm/94B0.html)).

**Dropping off the bottom:**
- Happens when the index exceeds the length (32).
- `85D6 = 0xF0`, y is rounded down to a multiple of 4 px, and the airborne status is cleared, so he falls.

**Jumping off:**
- Pressing jump while on the rope sets airborne = 1 (jumping) and `85D6 = 0xF0`.
- y is rounded down to a multiple of 8 px (cell-aligned).
- The movement flag is forced, so **the jump always carries him in the direction he faces**.

**Re-grab cooldown:** `85D6` increments each frame from 0xF0 to 0x00. That is **16 frames** before the rope can catch him again.

**Rope bugs:**
- "From top to bottom" (On the Roof, The Beach): jumping off the top of the swing goes through the room top and wraps him to the floor.
- A rope in the 8th slot leaves bit 0 of byte 11 set after a death, which can teleport Willy to the room above ([Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html), [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

---

## 7. Items (JSW1), from [93D1](https://skoolkid.github.io/jetsetwilly/asm/93D1.html), [A400](https://skoolkid.github.io/jetsetwilly/asm/A400.html), [A3FF](https://skoolkid.github.io/jetsetwilly/asm/A3FF.html) and [87CA](https://skoolkid.github.io/jetsetwilly/asm/87CA.html)

**Table layout:**
- A global item table holds **items 0xAD–0xFF, which is 83 items**. The "items remaining" counter is initialised to 0xAD, and 256 − 0xAD = 83.
- Two bytes per item:
  - **Page A4:** b7 = y MSB, **b6 = uncollected flag**, b0–5 = room number.
  - **Page A5:** y low bits in b5–7 and x in b0–4, i.e. an attribute-cell address.
- Items sit on cell positions. The maximum in one room is 12 (The Off Licence).
- **One 8×8 item graphic per room** (room bytes `E1–E8`) is shared by all items in that room. It is drawn in **overwrite** mode ([9691 @969B](https://skoolkid.github.io/jetsetwilly/asm/9691.html)).

**Colour cycling:**
- `INK = ((minute_counter + item_index) AND 3) + 3`, i.e. **3 magenta → 4 green → 5 cyan → 6 yellow**.
- It changes **every frame**. Neighbouring table entries are one phase apart. PAPER, BRIGHT and FLASH of the cell are kept.

**Collection is attribute-based:**
- If the item's cell INK **= 7 (white)** at item-draw time, the item is collected. Items are drawn last each frame.
- Willy's attribute pass (`961E`) makes every *background* cell under his sprite white. So any overlap between his 2×2 cell block (2×3 when mid-cell) and the item cell collects it.
- Consequences:
  - Arrows and white guardians collect items.
  - A guardian sharing the cell turns the INK non-white and blocks collection.
  - A white-INK room background self-collects its items. This is the Swimming Pool bug ([Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).

**On collection:**
- The 3-digit counter increments.
- A 64-toggle chirp plays, falling in pitch (delay `0x90 − C`, C from 0x80 down by 2).
- The uncollected flag is cleared, which is permanent and survives death.
- When the counter reaches all 83, the game mode `85DF` becomes **1**.

**Item bugs:**
- An invisible item in First Landing.
- Inaccessible and uncollectable items in Conservatory Roof.
- Two items stacked in one place on The Beach.
- Sources: [Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html), [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html).

**JSW2:**
- **175 items, of which 150 are needed to finish** ([TASVideos 10021S](https://tasvideos.org/10021S), [JSWcentral](https://jswcentral.org/jsw2-01_jsw2.html)).
- There is no global table. Items are a **cell type (6) in the compressed room shape**, with **at most 16 per room**. Each room has a 16-bit word of "untaken" bits, and a per-room item cell pattern (U5) ([seasip JSW2 room format](https://www.seasip.info/Jsw/jsw2room.html)).
- JSW2 Swimming Pool has **no item**, and The Beach has a single item ([Wiseman route](https://www.jdawiseman.com/papers/games/jsw2/jsw2_route.html), [TASVideos 10021S](https://tasvideos.org/10021S)).
- The JSW2 collection mechanism and colour-cycling rule are **UNCONFIRMED**. The WoS docs call the items "flashing objects" ([WoS](https://worldofspectrum.net/pub/sinclair/games-info/j/JetSetWillyII_128.txt)).

---

## 8. Nasties and Willy's attribute cells (JSW1), from [95C8](https://skoolkid.github.io/jetsetwilly/asm/95C8.html), [961E](https://skoolkid.github.io/jetsetwilly/asm/961E.html) and [8DD3](https://skoolkid.github.io/jetsetwilly/asm/8DD3.html)

**Six cells checked every frame:** the 2×2 cells of Willy's sprite plus the row below. This is his sprite's third row when mid-cell, or the two cells under his feet when he is cell-aligned. On a ramp the y offset is applied.

For each of the 6 cells:
- If the cell attribute equals the room's **background** attribute, set its INK to white. The bottom-row cells only turn white if the sprite really spans 3 rows.
- **If the cell attribute byte equals the room's nasty-tile attribute byte, kill Willy.**

This means:
- **Nasty collision is attribute-based at cell granularity**, not pixel-based.
- Standing directly above a nasty is fatal.
- The ground check treats nasty cells as not solid, so Willy falls into them (`8E49–8E54`).
- Tile type is identified by the **whole attribute byte**. Each tile type in a room must have a unique attribute. Several bugs come from this: floor tiles acting as ramps, ramps acting as conveyors, and the corrupted nasty and conveyor graphics ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html), [Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).

**"Long distance nasties" bug:** when Willy falls below the floor, the check reads the buffer at 5E00 and can hit a nasty at the *top* of the same room. This affects Under the Roof ([Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).

**Willy's own sprite:**
- Drawn with OR and no collision. Guardians and Maria test against *his* pixels.
- In The Nightmare Room Willy's sprite is swapped for a **flying pig** ([9637](https://skoolkid.github.io/jetsetwilly/asm/9637.html)).

---

## 9. Collision summary (JSW1)

| Pair | Method | Where |
|---|---|---|
| Willy vs guardian | Pixel-perfect (sprite AND buffer) when the guardian is drawn; also triggers on tiles or earlier entities | `91D6`/`9456` |
| Willy vs arrow | Gate: the arrow's cell INK was already white. Test: any set pixel under the 8-px shaft row | `9237` |
| Willy vs Maria | Pixel-perfect, same as guardians | `9534` |
| Willy vs nasty | Attribute byte equality on 6 cells (2×3) | `961E` |
| Willy vs item | Item cell INK = white (attribute) | `93D1` |
| Willy vs rope (grab) | Pixel overlap of any rope segment with anything drawn earlier | `92C6` |
| Guardian vs walls, other guardians, arrow pixels | Counts as a kill (design constraint) | `9456` |
| Fall | Airborne counter ≥ 0x0C on landing → death (Willy topic) | `8ED4` |

**Death handling** ([8C01](https://skoolkid.github.io/jetsetwilly/asm/8C01.html)):
- The top two-thirds of the screen is filled with attribute 0x47, then 0x46 … 0x40 (BRIGHT, black paper, INK 7→0). Each step plays a short note.
- The lives counter is decremented. There are 7 spare lives, initialised at 85CC ([gbuffer](https://skoolkid.github.io/jetsetwilly/buffers/gbuffer.html)).
- Willy's state is restored to how it was **on room entry** (`85D7`) and the room is re-initialised: guardians reset, items stay collected.
- In JSW1 this can produce **infinite death loops** ("Dangerous connections", [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

---

## 10. Maria, the toilet run and game over (JSW1)

### Maria ([9534](https://skoolkid.github.io/jetsetwilly/asm/9534.html))

- Only in Master Bedroom (room 0x23), and only while the game mode is 0 (items still outstanding).
- Drawn at a **fixed cell (x 14, y 11)**, a 16×16 sprite at 9C80–9CE0.
- **Pixel-perfect kill.**
- Attributes: top half INK 5 BRIGHT (0x45), bottom half INK 7 (0x07), black paper.
- Frame selection:
  - Willy on the floor (y 104): foot down or up, alternating on bit 1 of the frame counter, i.e. every 2 frames.
  - Willy ≤ 8 px above the floor: "raising arm".
  - Higher than that: "arm raised".
  - The choice depends on Willy's *height*, not his distance. "Maria's dodgy depth perception": she reacts to a jump at the room entrance too ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

### All items collected (mode 1)

- Maria is not drawn.
- When Willy's x < 6 (the bed at x 5), the mode becomes **2**.

### Toilet run (mode 2)

- Willy's input is forced right. Jumping is disabled (`8F8F`).
- Every frame his walk frame is ORed with 1, so he moves at **double speed (4 px per frame)** ([89AD @8A00](https://skoolkid.github.io/jetsetwilly/asm/89AD.html), [8ED4 @8F05](https://skoolkid.github.io/jetsetwilly/asm/8ED4.html)).
- **"Sticky bed" bug:** jumping onto the bed, which is a right-moving conveyor, freezes him ([Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)).

### Head down the toilet (mode 3)

- In The Bathroom (0x21), when Willy reaches x = 28 (the toilet), the mode becomes **3** and the frame counter is reset ([9584](https://skoolkid.github.io/jetsetwilly/asm/9584.html)).
- The toilet sits at (x 28, y 13), INK 7, and animates every frame. In mode 3 it uses the "head down" sprites A640/A660 ([959A](https://skoolkid.github.io/jetsetwilly/asm/959A.html)).
- Willy is no longer moved or drawn.
- There is no win screen. The game carries on until the clock reaches **1am**, when it quits to the title screen, or until BREAK is pressed ("Game over at 1am", [Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).

### Game-over sequence ([8C4A](https://skoolkid.github.io/jetsetwilly/asm/8C4A.html))

- Willy is drawn standing on a **barrel** at (15, 12–14).
- A **foot** descends 2 px per step. It is drawn without erasing, which looks like a lengthening leg. Each step plays a rising note and cycles the paper colour 0–3; the barrel stays red.
- Then "Game Over" glitters for about 1.57 s and the title screen returns.
- This is the Manic Miner homage. In JSW2 the "Foot Room" also homages it ([Wiseman, programmer comments](https://www.jdawiseman.com/papers/games/jsw2/jsw2_programmer_comments.html)).

### JSW2 end game ([seasip special-case table](https://www.seasip.info/Jsw/jsw2room.html), [Wiseman route](https://www.jdawiseman.com/papers/games/jsw2/jsw2_route.html), [JSWcentral](https://jswcentral.org/jsw2-01_jsw2.html))

- Master Bedroom removes Maria once **≥150 items** are collected.
- **Standing on a right-moving conveyor (the bed)** starts the auto-run right.
- The Bathroom draws the toilet. When Willy hits it with the game won, he is moved to **room 133, "Oh $#!+! The Central Cavern!"**. That room is unplayable: "If Willy has won, jump on the spot repeatedly." Wetherill describes it as Willy's "recurring nightmare".
- Several rooms (First Landing, Macaroni Ted, Dumb Waiter) contain "make Willy run right if the game is won" code for the route.
- JSW2+ (2016) made this ending room playable ([Wiseman JSW2 updated](http://www.jdawiseman.com/papers/games/jsw2/jsw2_updated.html)).

---

## 11. Other special cases (JSW1)

- **Monk and saw:** one-way sprites caused by mask 011 (§1.3). Fixes: POKE 41785,227 for the monk and POKE 41849,227 for the saw ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
- **Barrel and foot:** game-over only (§10).
- **Flying pig:** replaces Willy in The Nightmare Room ([9637](https://skoolkid.github.io/jetsetwilly/asm/9637.html)).
- **Quadridirectional guardian:** the same sprite moves vertically in On a Branch Over the Drive and horizontally elsewhere ([Trivia](https://skoolkid.github.io/jetsetwilly/reference/facts.html)).
- **Demonic face:** built from 3 guardian entities (Entrance to Hades, Chapel, Priests' Hole). A multi-sprite "big guardian" technique.

---

## 12. Famous bugs (JSW1) and their status in JSW2

**The Attic bug** ([Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html), [Wikipedia JSW](https://en.wikipedia.org/wiki/Jet_Set_Willy)):
- The Attic's R→L arrow spec (E9FC) has y byte **0xD5**. That value is odd and past the 128-entry y table.
- The arrow therefore "draws" at 9F6A–9F89, A06A–A089 and A16A–A189. These writes overwrite entity *definitions* 0x0D–0x11 and 0x2D–0x31.
- After a visit to The Attic, guardians in about 13 rooms become corrupt or lethal.
- The official fix is **POKE 59901,82**, which moves the arrow to y 41. Software Projects first claimed it was intentional, then issued POKEs.

**Other JSW1 bugs** (all in [Bugs](https://skoolkid.github.io/jetsetwilly/reference/bugs.html)):
- Sticky bed.
- Self-collecting item (Swimming Pool).
- Invisible item and inaccessible items.
- Guardian halos.
- From top to bottom (rope).
- Long distance nasties.
- "Don't mind your head": Willy can walk right-to-left through a wall at head height.
- Corrupted conveyors and nasties.
- 12:30am in the afternoon, the pause bug and others.

**JSW2 status:**
- JSW2 needed no bug-fix after release ("Bugfix needed after the original release? NO", [JSWcentral](https://jswcentral.org/jsw2-01_jsw2.html)).
- TASVideos passes "through the no longer bugged Attic".
- "We can no longer clip through the platform" in The Forgotten Abbey, so the head-height clip is no longer possible there.
- JSW1 "wrongwarps" were replaced with new rooms: Belfry above Rescue Esmerelda, Rocket Room above The Watch Tower ([TASVideos 10021S](https://tasvideos.org/10021S)).
- Rowson: "At the outset of writing JSW I had decided to change its layout in order to fix the known bugs in the mapping of the game" ([programmer comments](https://www.jdawiseman.com/papers/games/jsw2/jsw2_programmer_comments.html)).
- **Infinite death:** "eliminated thanks to providing safe restart positions" ([JSWcentral](https://jswcentral.org/jsw2-01_jsw2.html)). After a death Willy "returns to the last static solid ground he was standing on" ([TASVideos 10021S](https://tasvideos.org/10021S)).
  - However, a later "fixed 128K" JSW2 added 3 s of post-death invulnerability to prevent "no-win infinite loops" ([WoS](https://worldofspectrum.net/pub/sinclair/games-info/j/JetSetWillyII_128.txt)).
  - JSW2+ added "a routine to stop reoccurring death on re-spawn" ([Wiseman JSW2 updated](http://www.jdawiseman.com/papers/games/jsw2/jsw2_updated.html)).
  - So respawn deaths were reduced in JSW2 but not fully eliminated.
- **New hazards:** "Some previous 'safe spots'… are now hazardous… the tall candle in 'The Chapel'" ([Wikipedia JSW2](https://en.wikipedia.org/wiki/Jet_Set_Willy_II)). The reason is **UNCONFIRMED**.
- Whether the guardian-halo problem was fixed in JSW2 is **UNCONFIRMED**.

---

## 13. JSW2 engine differences (Spectrum 1985), from [seasip JSW2 room format](https://www.seasip.info/Jsw/jsw2room.html) unless noted

**Origin:**
- JSW2 is a new codebase: the CPC JSW by Rowson and Wetherill, written without Smith's source and ported back to the Spectrum ([programmer comments](https://www.jdawiseman.com/papers/games/jsw2/jsw2_programmer_comments.html)).
- Room data is compressed. There are **134 room entries**, 133 reachable.
- Sprites are XOR-drawn onto a single copy screen. Wetherill says attribute colours "can tend to fight with each other sometimes". Rowson says the colour result is the same as JSW1.

**Tile elements:**
- Air, Water (stand-on), Earth (solid), Fire (nasty), "/" and "\" ramps, left and right conveyors, and Item.
- A room can have several ramps and conveyors. Only a single conveyor can animate.

**Entity limits:**
- **8 guardians or arrows per room.**
- Lifts each use a guardian slot.
- The rope is a room flag (T4 bit 7), not an entity. The format has no rope x or length field, so rope position and parameters are **UNCONFIRMED** (possibly fixed).

**Guardian record** (7 bytes, CG0–CG6):
- **Movement is counter-based, not bounds-based.**
  - A counter starts at CG0 and is decremented every frame.
  - At 0 it reloads from CG1 and the direction reverses.
- **Signed primary step CG3.** In JSW2 speed *is* per-guardian for horizontal guardians too: "Doubling the movement step makes a sprite go twice as far as well as twice as fast". On horizontal guardians it also sets the animation step.
- **Diagonal guardians** use a secondary step (CG6 bits 4–5). Angles are 45°, about 22° and about 18°.
- X and y positions are 7-bit (0–127). The pixel units of X are **UNCONFIRMED** (likely 2-px).
- **Unidirectional guardians** (CG5 b7, e.g. Megaron) are *not drawn* while moving left or down. They are always white.
- Animation masks: none, frames 1–2, frames 1 and 3, or frames 1–4. CG6 bit 6 swaps between frame sets 0–3 and 4–7 on reversal (bidirectional sprites).
- **Only 4 guardian colours** exist, from the table {0x87, 0xC6, 0xC5, 0xC4}: **white, yellow, cyan, green**, all BRIGHT. The purpose of the top bit is unknown.

**Arrows** (2-byte record: X, then direction bit and Y):
- The engine sets an X step of ±1, a Y step of 0, attribute 0x87 (white) and sprite EB01h or EB21h.
- The **speed units and the warning sound are UNCONFIRMED**.

**Special-case room code** (IDs in a table at 8361h):
- Lifts (moving platforms in pairs).
- Moving floors: Highway to Hell and Tribbles. Their state persists across deaths and even across new games ([TASVideos 10021S](https://tasvideos.org/10021S)).
- Rocket Room launch to space.
- Teleporters: 4 of them, 6-byte records.
- Trip Switch.
- Rigor Mortis: guardians start moving once the room's items are taken.
- Crypt switch: lengthens a guardian's path.
- Foot Room: a foot drops when its items are taken.
- Eggoids: diagonal guardians bounce off the screen top and bottom.
- Belfry: ropes drawn above vertical guardians, like pulleys.
- The Yacht sails away.
- First Landing: flashing fire cells.
- Master Bedroom, The Bathroom and Central Cavern: see §10.

**Collision:**
- "Die on entering a cell which contains a nasty… or if his sprite touches that of a guardian… or arrow."
- "Collision detection with guardians is done using his visual position" (relevant on stairs).
- "JSW2 ignores enemy collisions in some circumstances involving ropes" ([TASVideos 10021S](https://tasvideos.org/10021S)).
- The exact algorithm (pixel or attribute) is **UNCONFIRMED**. Pixel/sprite overlap is implied.

**Ropes:** grab on touch. Climbing direction follows the same rule as JSW1. "Some ropes allow him to climb to the top of the screen and enter the screen above, although others prevent this" ([TASVideos 10021S](https://tasvideos.org/10021S)).

**Lives:** sources conflict. JSWcentral says 7 at the start. The WoS database says 8 lives, stored as a shifting bit mask. **UNCONFIRMED.**

**JSW2+ (2016):**
- 12 sprites plus Willy.
- Bouncing sprites that bounce off objects.
- Bonus lives.
- A playable ending room.
- Source: [Wiseman JSW2 updated](http://www.jdawiseman.com/papers/games/jsw2/jsw2_updated.html).

---

## 14. Quick numbers for the Jet Set Wally 2 implementation (JSW1 mechanics unless noted)

```
FRAME: ~14 fps (JSW1 best case) / ~25 fps (JSW2 best case); all speeds below are per game frame
ENTITIES/ROOM: 8 (JSW1: rope+arrows+guardians; JSW2: guardians+arrows; rope separate)
SPRITE: 16x16 1bpp, guardian box = 2 cells wide, 2 or 3 cells tall (3 if y%8!=0)

HGUARD: every frame: frame += 1 (dir right: 4..7) / -1 (dir left: 3..0);
        on wrap: x_cell ±= 1 unless at limit -> flip dir (frame 7->3 or 0->4), no move that frame
        => 2 px/frame, period = 8*(max-min+1) frames, pre-shifted art (2 px per frame)
        mask 111 = 8 frames (L 0-3, R 4-7); mask 011 = 4 frames, same facing both ways
VGUARD: y += dy (dy = ±1..6 px); if y>=max: dy=-dy (no clamp); elif y<=min: y=min, dy=-dy
        anim: advance every frame (fast bit) or every 2nd frame; 1/2/4 frames; independent of direction
ARROW:  x_cell += ±1 per frame over 0..255 (wraps), visible only 0..31 -> 256-frame loop
        start x: L->R 208, R->L 28; sound when x==244 (L->R) / 44 (R->L) = 12/13 frames warning
        3 rows: pattern / 0xFF shaft / pattern; sets cell INK white; kills if cell was already white-INK
        and shaft row overlaps a set pixel; passes through walls
ROPE:   33 one-pixel segments from (x_cell*8, 0); step 3px (2px lower when swung), +0..3 px sideways
        frame 0..0x36 each side, step 2 (4 near centre), period 90 frames, bottom swings ±67 px
        grab = first segment overlapping a drawn pixel; Willy y = seg_y - 8; climb ±1 seg/frame
        (down if facing swing direction); min seg 12 if no room above; off bottom past seg 32
        jump off: jump in facing dir; 16-frame re-grab cooldown; colour = cell INK (no attributes)
ITEMS:  JSW1 83 total; JSW2 175 total, 150 needed, ≤16/room; one 8x8 graphic per room
        INK cycles 3,4,5,6 every frame, phase = item index; collect when item cell INK == white
NASTY:  attribute match on Willy's 6 cells (2x3 incl. under feet) -> death
GUARDIAN COLOUR: cell attr = (top-left cell PAPER) | guardian INK | guardian BRIGHT, over 2x2/2x3 block
GUARDIAN HIT: pixel AND against buffer (JSW1 also kills on tiles / earlier entities; design around it,
        or restrict to Willy's mask in the homage)
MARIA:  fixed at cell (14,11), pixel kill, anim by frame counter & Willy height; gone when all items taken
END:    bed (x<6 JSW1 / on bed-conveyor JSW2) -> forced run right at 4 px/frame, no jumping
        -> toilet x=28 in Bathroom -> head-down animation (JSW1) / nightmare "Central Cavern" room (JSW2)
DEATH:  8-step INK 7→0 flash; JSW1 respawn = room-entry state; JSW2 = last safe ground; items stay collected
```

**Homage recommendations:** keep the quirks, fix the bugs.
- Keep: pixel-perfect guardian hits, attribute-based nasty and item logic, the 256-frame arrow lap with its warning chirp, the 45-frame rope half-swing, guardian colour clash, the 1-frame turn at the ends.
- Fix, as JSW2 did: the Attic-style data errors, self-collecting items, respawn loops (use a safe restart point), and guardians "colliding" with tiles.