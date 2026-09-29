# Fact-check: JSW II world-map report

Two claims (the route's 133-room count and the Master Bedroom being two rooms west) are the report's own counting or reading errors. Two more (the run-right rooms and the lift count) are errors in reading SEASIP. A fifth is a small misquote of Rowson.

Method:
- I downloaded and parsed the primary pages directly: SEASIP's raw HTML, the JDW overview's HTML table, all 61 SkoolKit JSW1 room pages, and a sample of jswcentral screenshots, which I looked at.
- I recomputed the report's grid and exit statistics from these instead of relying on page summaries.

## Claim verification

| # | Claim in report | Verdict | Evidence / source |
|---|---|---|---|
| 1 | Room table has **134** entries, at BAFDh, with its address stored at 7E69h | **VERIFIED** | SEASIP: "JSW2 has 134 entries in this table … find the address of this table from the word at 7E69h." SEASIP also says the robust count is (ROOM0 − TABLE)/2. https://www.seasip.info/Jsw/jsw2room.html |
| 2 | 133 rooms reachable without cheating; **175** items, **150** needed; 100 or fewer rooms needed to finish, 126 for all items; **7** spare lives | **VERIFIED** | jswcentral, verbatim: "Number of edited rooms: 134 / accessible without cheating: 133 / items to collect: 175 / … need to be collected … 150 / Spare lives at the start: 7". The Bathroom screenshot shows 7 spare Willys. https://jswcentral.org/jsw2-01_jsw2.html |
| 3 | Maria leaves the Master Bedroom at **≥150** items | **VERIFIED** | SEASIP special case 10: "Removes Maria if 150 or more items have been collected. If Willy is standing on a right-moving conveyor (ie, the bed) then start him running to the right." |
| 4 | **33** space rooms = 23 starship + 10 planet | **VERIFIED** | Wikipedia: "for these 33 rooms he dons a spacesuit" (https://en.wikipedia.org/wiki/Jet_Set_Willy_II). Counting the overview grid gives starship 4+9+3+7 = 23 and planet 8+2 = 10. |
| 5 | Overview grid is **24 × 19**. Occupied cells per row are 4,9,3,7,1,11,14,9,10,13,15,**23**,8,3, then 1×5. That makes 135 cells for 133 distinct rooms, and row 11 is a 23-room run from Deserted Isle to The Off Licence. | **VERIFIED** | I parsed the HTML table at https://www.jdawiseman.com/papers/games/jsw2/jsw2_overview.html. **Caveat for anyone re-parsing it:** a caption cell with `rowspan="4" colspan="4"` sits in columns 0–3 of rows 1–4. Rows 2–4 must be shifted +4 columns, or they parse as only 20 wide. With the shift, Docking Bay (r3), Rocket Room (r4), Watch Tower (r5) and Quirkafleeg (r6) all fall in column 11. The Central Cavern is not on the grid. |
| 6 | Grid adjacency: 105 horizontal pairs and 81 vertical pairs. Rooms with 1/2/3/4 grid neighbours: 13/44/33/43. | **VERIFIED** | Recomputed from the same table with the rowspan shift. Exact match. |
| 7 | Room numbers: 31 Bathroom, 62 Macaroni Ted, 119 Rocket Room, 131 Well (one room), 108 Cartography, 133 Central Cavern, 75 Rigor Mortis, 103 Foot Room | **VERIFIED** | Screenshots show the room names: `jsw2_031` "The Bathroom", `jsw2_062` "Macaroni Ted", `jsw2_119` "Rocket Room", `jsw2_131` "Well". Pattern: https://jswcentral.org/images/03-jsw2/01-jsw2/jsw2_NNN.png. SEASIP names rooms 108, 133, 75 and 103. The JDW route's Rooms column goes Water Supply 28 → Well 29 → Dinking Vater 30, so the Well counts as **one** room. |
| 8 | The game starts in The Bathroom | **VERIFIED** | JDW Central: "Game starts in The Bathroom" (https://www.jdawiseman.com/papers/games/jsw2/jsw2_central.html). The route's first step is Bathroom → Dumb Waiter ✓. The exact JSW2 start coordinates are still **UNCONFIRMED**. |
| 9 | "The Master Bedroom is next to the start, **two rooms west** via Top Landing" | **CORRECTED** | It is **four rooms west**. On row 8: Bathroom c13 → Dumb Waiter c12 → Macaroni Ted c11 → Top Landing c10 → Master Bedroom c9 (JDW overview). The report's own section 4 run-right path already implies this. |
| 10 | The win-state "run right" special cases are in "Top Landing, Macaroni Ted and Dumb Waiter" | **CORRECTED** | SEASIP gives run-right-if-won behaviour to **The Bathroom (ID 9), Master Bedroom (ID 10, when Willy is on the bed conveyor), First Landing (ID 20), Macaroni Ted (ID 23) and Dumb Waiter (ID 24)**. Top Landing has no special case listed. |
| 11 | Exit byte order: JSW2 is left, up, right, down; JSW1 is left, right, up, down | **VERIFIED** | SEASIP: "Exit left / Exit up / Exit right / Exit down". SkoolKit 80E9–80EC: room to the left, room to the right, room above, room below. https://skoolkid.github.io/jetsetwilly/asm/80E9.html |
| 12 | **4** teleporters, 6 bytes each (from, x, y, to+1, x, y), working only in rooms with special case 11 or 22. The report's teleport links: Isle → BMDS lower-east; BMDS top-west → Teleport; BMUS upper-east → BMDS lower-west; BMDS top-east → Bathroom. | **VERIFIED** | SEASIP section 8 (table at 7435h): "Teleporters only work if the special-case number for the room is 11 or 22." The links match the JDW Space, Teleport and West pages (`jsw2_space.html`, `jsw2_teleport.html`, `jsw2_west.html`). |
| 13 | Up to 8 guardians or arrows per room, at most 6 in a room with lifts. "SEASIP lists **6** lift special cases." | Limits **VERIFIED**; lift count **CORRECTED** | SEASIP: "eight guardians or arrows"; "any room with lifts can only have up to six guardians". There are **7** lift-pair users: Lift 1–4 (IDs 2–5, pairs 1–4), Lift 5 (ID 19, pair 6), Lift 6 (ID 21, pair 7, also flashing fire) and Dumb Waiter (ID 24, pair 5). The lift table is at 0FB30h. |
| 14 | The JDW 100% route visits "133 rooms … all except Swimming Pool and cheat, counting the Central Cavern" | **CORRECTED** | The count is **132** (134 − Swimming Pool − cheat). The route's Rooms column reaches 131 at the Master Bedroom and 132 at the Central Cavern. Swimming Pool is marked "No item; no need". https://www.jdawiseman.com/papers/games/jsw2/jsw2_route.html |
| 15 | JSW1 start: room 0x21, cell (13,20), y stored as 0xD0 (= 2 × 104), 7 lives | **VERIFIED** | SkoolKit 87CA: `LD A,$21 / LD ($8420),A`; `LD A,$D0 / LD ($85CF),A`; `LD HL,$5DB4` = (13,20); `LD A,$07 / LD ($85CC),A`. https://skoolkid.github.io/jetsetwilly/asm/87CA.html |
| 16 | JSW1 exits: 172 total (L53 R52 U35 D32). Exits per room 1/2/3/4 = 3/18/23/16. 152 reciprocal, 20 one-way. Room 0x2F unused. | **VERIFIED** | Recomputed from all 61 SkoolKit room pages (C000–FC00). The examples also check out: 33U→39, 35U→41, 38U→60, 14U→20, 25U→31, 13L→10, 46R→47. Trivia: "Room 0x2F is completely empty" (https://skoolkid.github.io/jetsetwilly/reference/facts.html). |
| 17 | The Trip Switch is not reset when you lose a life, and it is needed before the yacht will sail | **VERIFIED** | JDW West: "Contrary to some reports, losing a life does not reset the Trip Switch." |
| 18 | Rooms with no Cartography block: Well, Dinking Vater ?, Secret passage, Without A Limb. Blocks are green when the room is cleared, red when items remain. | **VERIFIED** | JDW Cartography page; Rowson on the comments page ("Without A Limb never counted as a real room, it contains no data and is only accessed by a death jump"). |
| 19 | Sewers are the pool's drainage system "leading to the sea" | **CORRECTED** (wording) | Rowson: "a drainage system going to the **river**". JDW programmer comments page. |
| 20 | Well mechanism and exact respawn rule | **UNCONFIRMED** (stays) | SEASIP has no Well special case. The route shows play resuming in the room before the death sequence: Dinking Vater → Down T' Pit; Security Guard → Out On A Limb; Entrance To Hades → Highway to Hell. The rule behind this is still unknown. |

## Important facts the report missed

**Controls and HUD**
- **JSW2 controls differ from JSW1** (jswcentral): "Willy now takes a step forward before jumping from a standstill" and "the player can jump in the opposite direction immediately after landing, without releasing the jump button."
- **HUD and clock:** JSW2 shows `Rooms NNN`, `TIME` and yellow `Items : NNN`. The timer is elapsed time in HHHH:MM:SS, starting at 0000:00:00 (jswcentral).
  - In the 0-item Bathroom screenshot the Items counter is not drawn.
  - JSW1 instead ran a clock from 7:00am with game over at 1am (SK Trivia).
  - Whether JSW2 has any time limit is **UNCONFIRMED**.
- **No bonus lives** in JSW2, and the game is completable without losing a life (jswcentral).

**Cartography Room internals**
- The blocks are **Water cells**, which Willy can stand on. A table at 0FBE8h maps each water cell to a room; it starts 74h, 75h, 76h, which are rooms 116–118 (SEASIP).
- Because the blocks are solid, visiting many rooms without collecting items can **bar the route across the room** (JDW Cartography).
- Block colouring (Russ Juckes, via JDW):
  - Entering any room places a green block.
  - Leaving a room turns its block red if items remain.
  - So the Cartography Room's own block stays green until you leave and re-enter.
- There is an attract-mode "tour" that previews rooms (JDW Cartography).

**Special cases the synthesis will need** (SEASIP)

| ID | Room | Behaviour |
|---|---|---|
| 1 | Central Cavern | If the game is won, Willy jumps on the spot repeatedly (this is why it's unplayable) |
| 6 | Tribbles | Moving floor segments |
| 25 | Highway to Hell | Moving floor segments |
| 12 | Belfry | Ropes drawn above vertical guardians |
| 13 | Eggoids | Diagonal guardians reverse at the top and bottom of the screen |
| 15 | Trip Switch | Left-conveyor graphic = "off", right-conveyor graphic = "on" |
| 16 | Rigor Mortis | Once room 75 is cleared, the first two guardians get X steps −1 and +1 and counter 28 |
| 17 | Crypt Switch | Adjusts the X step and counter of the first guardian |
| 18 | Foot Room | Foot drops when room 103 is cleared |
| 20 | First Landing | Fire cells flash |
| 21 | Lift 6 | Fire cells flash |

**Guardians and room data** (SEASIP)
- **New guardian types:** diagonal guardians at 45°, 22° or 18°, and "unidirectional" guardians (e.g. Megaron) that are only drawn in one direction.
- **Guardian colours** come from a 4-entry table: white, yellow, cyan, green. Unidirectional guardians are always white.
- **Guardian record:** 7 bytes. Movement uses a counter that starts at CG0, reverses direction at 0 and reloads from CG1. The step is a signed byte.
- **Arrow record:** 2 bytes (x; direction bit plus y).
- **Room byte T4:**
  - A rope flag.
  - Conveyor animation, which only works if the room has one contiguous conveyor.
  - A guardian count, where values above 8 count as 0.

**Music and misc**
- The in-game tune is 64 bytes at 0FAF0h, in the same format as Manic Miner and JSW1. The title tune uses the JSW1 title format (SEASIP).
- The original Software Projects release had colour-code protection; re-releases did not (jswcentral).
- **Respawn tension:** jswcentral says JSW2 eliminated infinite-death loops. But Rowson's JSW2+ (2016) change list includes "A routine to stop reoccurring death on re-spawn implemented", so the 1985 respawn may not be fully safe. Treat this as **UNCONFIRMED** (https://www.jdawiseman.com/papers/games/jsw2/jsw2_updated.html).
- **Cartography Room history:** it began as the developer tool entered via "special event code 7", for changing the start room and position. The official cheat code is "HIEMMRAIDNAPRRRTT"; the CPC version used "EMMRAIDNAPRRRTT" (JDW programmer comments).