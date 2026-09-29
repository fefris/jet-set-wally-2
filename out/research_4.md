# JSW II (ZX Spectrum): world map structure report

Scope: layout, scale and geography only. Room names are listed as data. No bitmaps or creative text are reproduced.

**Main sources**
- **JDW**: Julian D. A. Wiseman's JSW2 map pages. Index: https://www.jdawiseman.com/papers/games/jsw2/jsw2_index.html. Sub-pages are named `jsw2_overview.html`, `jsw2_central.html`, `jsw2_east.html`, `jsw2_west.html`, `jsw2_sewers.html`, `jsw2_space.html`, `jsw2_teleport.html`, `jsw2_cartography.html`, `jsw2_route.html`, `jsw2_programmer_comments.html` and `jsw2_updated.html`, all in the same folder.
- **SEASIP**: John Elliott, "JSW2 Room Format". https://www.seasip.info/Jsw/jsw2room.html
- **JSWC**: https://jswcentral.org/jsw2-01_jsw2.html
- **WIKI**: https://en.wikipedia.org/wiki/Jet_Set_Willy_II
- **SK**: the SkoolKit JSW1 disassembly. https://skoolkid.github.io/jetsetwilly/
- **SPECCYMAP**: https://maps.speccy.cz/map.php?id=JetSetWilly2. This is a seamless map image by FishyFish, 5889×2440 px.

Two sources failed:
- The mdfs.net JSW2 room map (https://mdfs.net/Software/JSW/JSW2/Room/Map.htm) could not be reached. Ports 80 and 443 were refused or timed out, and the Wayback Machine was blocked.
- I did not extract data from the game binary itself. Spectrum Computing marks the game "distribution denied."

---

## 1. Totals

| Fact | Value | Source |
|---|---|---|
| Room-table entries (JSW2 Spectrum) | **134** (table at BAFDh, pointer at 7E69h) | SEASIP |
| Rooms reachable without cheating | **133** (the room literally named "cheat" can't be reached) | JSWC; JDW route |
| Rooms carried over from JSW1 | **60** (JSW1 has 61 room definitions; room 0x2F "[" is unused) | SK Trivia (https://skoolkid.github.io/jetsetwilly/reference/facts.html); JDW updated page ("original 60 rooms") |
| New rooms in JSW2 | **74** (my name-matching count: 134 − 60) | derived |
| Items | **175** in total; **150** needed to finish (Maria leaves the Master Bedroom at ≥150) | JSWC; SEASIP (Master Bedroom special case) |
| Rooms that must be visited | 100 or fewer; 126 for 100% item collection | JSWC |
| Space rooms (the "spacesuit" section) | **33** = 23 starship + 10 planet ("Teleport Zone") | WIKI ("for these 33 rooms he dons a spacesuit"); matches the JDW Space + Teleport pages |
| Spare lives at start | 7 | JSWC |
| Final room | #133 "Oh $#!+!The Central Cavern!", entered via the toilet after winning; not playable | SEASIP; JDW cavern and comments pages |

**Room numbering.** jswcentral's gallery files are named `jsw2_000.png` … `jsw2_133.png`. I read the room names off these files. The numbering agrees with every room number SEASIP gives:
- 108 = Cartography Room
- 133 = Central Cavern
- 75 = Rigor Mortis
- 103 = Foot Room

So the gallery order is almost certainly the room-table order. It is inferred, though, not read from the game data.

**The Well is one room (#131), not three.** JDW draws it three times because Willy falls through the same screen three times. Rowson (JDW comments page): "the (room)name repeats 3 times to say 'well, well, well' before your pending demise." Wetherill: "hence the repeating Well screen." The exact mechanism is UNCONFIRMED, since no Well special-case routine is listed in SEASIP.

---

## 2. Grid and scale

- **Whole-world overview (JDW overview page): 24 columns × 19 rows.**
  - The overview mimics the layout of the in-game Cartography Room.
  - Rows 0–13 hold everything except the well shaft. Rows 14–18 are the well shaft only (Water Supply, the Well screen ×3, Dinking Vater ?).
  - The Central Cavern is not placed on the grid.
- **The in-game Cartography Room (#108)** draws each room as a single 8×8 cell in a schematic map. Its blocks span about 24 cells wide.
  - A block appears once its room is visited. It is green if all the room's items are collected, and red if any remain.
  - Rooms with no block: Well, Dinking Vater ?, Secret passage and Without A Limb.
  - Rowson says the Cartography Room was built as a developer room-select/editor tool.
  - Sources: JDW cartography page; JDW comments page.
- **Occupied cells:** 133 rooms fill 135 cells (the Well counts three times).
- **Spine:** row 11 is one unbroken horizontal run of **23 rooms**. It goes from Deserted Isle in the far west, through the Beach, the cellar corridor under the house and the Drive, to The Off Licence in the far east. This is the world's ground-level corridor.
- **Occupied cells per row:**

| Row | Cells | Row | Cells |
|---|---|---|---|
| r0 | 4 | r7 | 9 |
| r1 | 9 | r8 | 10 |
| r2 | 3 | r9 | 13 |
| r3 | 7 | r10 | 15 |
| r4 | 1 | r11 | 23 |
| r5 | 11 | r12 | 8 |
| r6 | 14 | r13 | 3 |
| | | r14–18 | 1 each |

- **Placement caveat:** the Sewers (top-left), the planet (upper right) and the starship (top) are placed where the Cartography Room schematic puts them. They are not physically next to their neighbours on the grid. You reach them by warps (section 5).

---

## 3. Regions and room counts

Grid coordinates are (row, column) on the 24×19 overview. Numbers are room-table indices as in section 1.

| Region | Rooms | Grid area | From JSW1 / new | Rooms (#, left→right per row) |
|---|---|---|---|---|
| **Tower / rocket** | 3 | r4–5, c11–13 | 1 / 2 | r4: 119 Rocket Room. r5: 48 The Watch Tower (directly below the Rocket Room); 68 Belfry (above Rescue Esmerelda) |
| **Roof** (r6) + **Attic** (r7) | 15 (7 + 8) | r6 c8–14; r7 c7–14 | 13 / 2 | r6: 45 Nomen Luni, 18 On The Roof, 17 Up On The Battlements, 16 We must peform a Quirkafleeg, 15 I'm sure I've seen this before.., 14 Rescue Esmerelda, 42 On Top Of The House. r7: 41 Conservatory Roof, 40 Under The Roof, 39 The Attic, **60 Hero Worship**, 38 I mean, even I dont believe this, **61 ]**, 37 Emergency Power Generator, 36 Priest's Hole |
| **Mansion house**: 3 floors × 10 | 30 | r8–10, c5–14 | 24 / 6 | Top floor r8: 54 Above The West Bedroom, 53 West Wing Roof, 35 The Orangery, 34 A bit of Tree, 33 Master Bedroom, 32 Top Landing, **62 Macaroni Ted, 63 Dumb Waiter**, 31 **The Bathroom**, 30 Half Way Up The East Wall. First floor r9: 52 West Bedroom, 51 West Wing, 70 Swimming Pool, 29 Banyan Tree, 28 Nightmare Room, 26 First Landing, **64 Study, 65 Library**, 25 The Chapel, 24 East Wall Base. Ground floor r10: 50 Back Door, 49 Back Stairway, 23 Cold Store, 22 West of Kitchen, 21 The Kitchen, 20 To The Kitchen / Main Stairway, **66 Megaron, 67 Butlers Pantry**, 19 Ballroom West, 58 Ballroom East |
| **Cellars / ground-level corridor** | 10 | r11, c5–14 | 3 / 7 | 47 Tool Shed, 46 The Wine Cellar, 57 Forgotten abbey, **71 Trip Switch, 72 Willy's lookout, 73 Sky Blue Pink, 74 Potty Pot Plant, 75 Rigor Mortis, 76 Crypt, 77 Decapitare** |
| **Mines / underground** | 7 | r12–13, c9–14 | 0 / 7 | r12: 81 Wonga'S Spillage Tray, 82 Willy's Bird Bath, 83 Seedy Hole, 84 The Zoo, 85 Pit Gear On. r13: 86 In T' Rat Hole, 87 Down T' Pit |
| **Well shaft** | 3 | r14–18, c14 | 0 / 3 | 88 Water Supply, 131 Well (shown 3×), 132 Dinking Vater ? |
| **East grounds**: Drive, Megatree, far east | 20 | r9–13, c15–22 | 16 / 4 | Megatree canopy r9: **130 Without A Limb**, 13 Out On A Limb, 12 Tree Top. r10: 11 The Hall, 10 The Front Door, 9 On A Branch Over The Drive, 8 Inside The Megatree, 7 Cuckoo's Nest. r11: **78 Money Bags**, 5 The Security Guard, 4 The Drive, 3 At The Foot Of The Megatree, 2 Under The Megatree, 1 The Bridge, **69 Garden**, 0 The Off Licence. r12: **59 Highway to Hell**, 43 Under The Drive, 44 Tree Root. r13: 6 Entrance To Hades |
| **West coast**: beach, yacht, island | 5 | r11, c0–4 | 3 / 2 | 80 Deserted Isle, 79 cheat, 55 The Bow, 56 The Yacht, 27 The Beach |
| **Sewers** | 7 | r5–7, c0–4 | 0 / 7 | r5: 94 Mega Hill. r6: 89 The Outlet, 90 In The Drains, 91 Nasties, 92 Main Entrance (The Sewer), 93 Holt Road. r7: 95 Downstairs |
| **Starship** ("Space Map") | 23 | r0–3, c5–17 | 0 / 23 | r0: 115 Maria in Space, 116 Banned, 117 (Flower) Power Source, 118 Star Drive (Early Brick Version). r1: 96 Beam me Down Spotty, 97 Captain Slog, 98 Alienate?, 99 Ship's Computer, 100 MAIN LIFT 1, 101 Phaser Power, 102 Sickbay, 103 Foot Room, 114 Someone Else. r2: 104 Defence System, 105 MAIN LIFT 2, 113 The TROUBLE with TRIBBLES is... r3: 106 Photon Tube, 107 MAIN LIFT 3, 108 Cartography Room, 109 Docking Bay (directly above the Rocket Room), 110 NCC 1501, 111 Aye 'Appen, 112 Shuttle Bay |
| **Planet** ("Teleport Zone") | 10 | r5–6, c16–23 | 0 / 10 | r5: 120 Teleport, 121 Galactic Invasion, 122 INCREDIBLE -, 123 - BIG HOLE -, 124 - IN THE GROUND, 125 Loony Jet Set, 126 Eggoids, 127 Beam me Up Spotty. r6: 128 The Hole with No Name, 129 Secret passage |
| **Central Cavern** | 1 | off-grid | 0 / 1 | 133 Oh $#!+!The Central Cavern! |
| **Total** | **134** | | **60 / 74** | |

New JSW2 rooms are in **bold** (only in the mansion and grounds rows; the Sewers, Mines, Well, Starship and Planet rooms are all new). Region counts match the JDW pages: Central 68, East 20, West 5, Sewers 7, Space 23, Teleport 10, Cavern 1.

The Central page's 68 rooms split into my sub-regions:

| Sub-region | Rooms |
|---|---|
| Towers | 3 |
| Roof and attic | 15 |
| House | 30 |
| Cellars | 10 |
| Mines | 7 |
| Well shaft | 3 |

**Other named sub-areas** (sources: JDW maps; Wetherill and Rowson notes on the JDW comments page):
- **West wing:** columns c5–6, rows r8–10.
- **East wall:** column c14.
- **Indoor tree:** Banyan Tree and A bit of Tree.
- **Megatree:** 9 rooms — the Foot/Inside/Under Megatree rooms, Tree Top, Out/Without A Limb, On A Branch, Cuckoo's Nest and Tree Root.
- **Sewers:** the pool's "drainage system" leading to the sea.
- **Planet:** "a planet, such as might be seen on a Star Trek episode".
- **Starship:** "obviously the Starship Enterprise, kinda".

---

## 4. Start room and position

- **The game starts in The Bathroom (#31)** (JDW Central Map: "Game starts in The Bathroom").
  - It is on the top house floor, second column from the east.
  - The first route step is "exit lowest level" west into Dumb Waiter (JDW route).
- **JSW2 start coordinates: UNCONFIRMED.**
  - For reference, JSW1 starts in room 0x21 The Bathroom at cell (13,20), pixel y = 104 (stored as 0xD0), with 7 lives. Source: SK routine 87CA, https://skoolkid.github.io/jetsetwilly/asm/87CA.html.
- **The Master Bedroom (#33) is next to the start**, two rooms west via Top Landing.
  - Maria blocks the bed until 150 items are collected (SEASIP).
  - Winning makes Willy run right automatically back to The Bathroom, through Top Landing, Macaroni Ted and Dumb Waiter. These rooms have "run right if game won" special cases (SEASIP).
  - Touching the toilet then sends him to room 133 (the Central Cavern).

---

## 5. Warps, one-way links and non-Euclidean connections

I could not get the exit bytes for JSW2. Everything below comes from the JDW map notes and route, the SEASIP special cases, and designer comments.

### 5a. Special transport (scripted / teleport)

| # | From | To | Mechanism | Direction | Source |
|---|---|---|---|---|---|
| 1 | Rocket Room (#119) | Docking Bay (#109) | Rocket launch special case. "When Willy reaches particular coordinates, the central section of the room takes off and Willy is transported to the room above." The route adds "Rocket takes off once objects are collected" and "the clock stops whilst the rocket flies". | One-way; there is no documented return. Docking Bay is directly above the Rocket Room on the grid. | SEASIP; JDW route, Central and Space pages |
| 2 | The Yacht (#56) | Deserted Isle (#80) | Yacht-sails special case. Needs the **Trip Switch** (#71, in the cellar corridor) to have been thrown. Collect the items in The Bow and The Yacht, then "follow the saw". The trip switch is not reset when you lose a life. | One-way. It skips two columns (The Bow, cheat). "cheat" exists "to physically separate the bow from the deserted Isle". | JDW West page; JDW comments (Rowson) |
| 3 | Deserted Isle | Beam me Down Spotty (lower-east platform) | Hidden teleporter: collect the item, wait, walk east, then walk west without jumping. | One-way (island → ship) | JDW West, Space and route pages |
| 4 | Beam me Down Spotty (top-west platform) | Teleport (#120, top-west) | Teleporter | One-way (ship → planet) | JDW Space and Teleport pages |
| 5 | Beam me Up Spotty (#127, upper-east) | Beam me Down Spotty (lower-west platform) | Teleporter | One-way (planet → ship) | JDW Teleport page |
| 6 | Beam me Down Spotty (top-east platform) | The Bathroom (#31) | Teleporter | One-way. This is the **only documented way back from space.** | JDW Space page and route |

SEASIP: the game has exactly **4 teleporter definitions** (6 bytes each: from-room, x, y, to-room+1, x, y). They work only in rooms whose special-case ID is 11 (Beam me Up/Down Spotty) or 22 (Deserted Isle).

### 5b. Non-grid warps through ordinary exits

| # | From | To | Notes | Direction |
|---|---|---|---|---|
| 7 | Cold Store (#23), top of its rope | Main Entrance (The Sewer) (#92) | The Swimming Pool is the room directly above on the grid; the sewers sit 4 rows up and 4 columns west in the schematic. | Reverse UNCONFIRMED; the route never goes back. |
| 8 | The Outlet (#89) | The Beach (#27) | Sewer outfall. The West page marks "From The Outlet" above The Beach, so it is probably entered from the top (UNCONFIRMED). | Reverse UNCONFIRMED |
| 9 | Secret passage (#129), east edge | The Hole with No Name (#128), west edge | The two rooms loop into each other horizontally: the Hole's hidden upper-east exit leads to Secret passage, and Secret passage's east side wraps back to the Hole's west side. | Wrap-around |

Sources: JDW Central, Sewers, West and Teleport pages.

### 5c. Death traps and fatal one-way falls

| # | Path | Notes | Source |
|---|---|---|---|
| 10 | Down T' Pit → Water Supply → Well (fall through ×3) → Dinking Vater ? | Fatal; the route then continues from Down T' Pit | JDW route |
| 11 | Out On A Limb → Without A Limb (#130) → The Front Door → The Security Guard | Without A Limb "contains no data and is only accessed by a death jump" | JDW route; JDW comments (Rowson) |
| 12 | Highway to Hell → Entrance To Hades (#6) | Death room | JDW route; SPECCYMAP |

**Respawn:** JSW2 seems to put you back at the last safe spot, not the room entry point. In #10 play resumes in Down T' Pit, and in #11 in Out On A Limb, several rooms back. JSWC says: "Infinite death scenarios have been eliminated thanks to providing safe restart positions." The exact rule is UNCONFIRMED.

### 5d. Geometry-only one-ways and gates

- **Nomen Luni:** it can't be crossed east→west, because you can't safely drop from the three-block shelf (JDW Central).
- **Quirkafleeg rope link:** from the top of "I mean, even I dont believe this" you can jump onto the rope in Quirkafleeg. This is a cross-room move; the route says it is possible "though not useful" (JDW Central).
- **cheat:** unreachable without hacking (JDW West; JSWC).
- **Item-state gates:** Maria leaves the Master Bedroom at ≥150 items; the rocket launches once its items are collected; the Trip Switch enables the yacht.
- **Room mechanics** (not map gates): the Rigor Mortis and Crypt guardians and the Foot Room foot change with item or switch state (SEASIP).

---

## 6. Exit statistics

### 6a. JSW2: no exit table obtained (UNCONFIRMED)

SEASIP documents the room-entry format. The exit bytes are stored in the order **left, up, right, down** as room numbers, right after the compressed room name. JSW1 uses the order left, right, up, down.

No published JSW2 dump of these bytes was reachable. Two proxies:

**(i) Grid adjacency on the Cartography-style overview** (133 placed rooms; an upper bound on possible links):
- 105 horizontally adjacent room pairs and 81 vertically adjacent pairs.
- Rooms by number of grid neighbours:

| Grid neighbours | Rooms |
|---|---|
| 1 | 13 |
| 2 | 44 |
| 3 | 33 |
| 4 | 43 |

**(ii) Traversals confirmed by the JDW 100% route** (every consecutive room pair in the route; 133 rooms visited, all except Swimming Pool and cheat, counting the Central Cavern):
- **145 distinct room-to-room traversals:**

| Type | Count | Share of grid adjacencies confirmed |
|---|---|---|
| Horizontal, grid-adjacent | 91 | 91 of 105 (87%) |
| Vertical, grid-adjacent | 43 | 43 of 81 (53%) |
| Special | 11 | — |

- The 11 special traversals are: 4 teleports, the rocket, the yacht, the rope-to-sewer warp, the outfall-to-beach warp, and 3 death/respawn steps.
- **Takeaway:** most side-by-side rooms connect, but only about half of stacked rooms do; the rest have solid floors or ceilings.

### 6b. JSW1 exact exit table (baseline for the 60 inherited rooms)

Parsed from all SkoolKit room pages, e.g. https://skoolkid.github.io/jetsetwilly/asm/C000.html through FC00.

Counting method: an exit to room 0 counts as "no exit" unless it is reciprocal. Room 0 is The Off Licence, but it is also used as filler. Self-exits are also excluded.

- **172 exits:** Left 53, Right 52, Up 35, Down 32. That is about 1.6 horizontal exits per vertical one.
- **Exits per room:**

| Exits | Rooms |
|---|---|
| 1 | 3 |
| 2 | 18 |
| 3 | 23 |
| 4 | 16 |

- **152 exits are reciprocal** (76 two-way links). **20 are one-way or non-reciprocal.** Examples:
  - The Bathroom (up) → Emergency Generator, whose down exit goes nowhere.
  - Master Bedroom (up) → The Attic, whose down exit goes to Top Landing.
  - Priests' Hole (up) → The Bow.
  - Rescue Esmerelda (up) → Ballroom East.
  - Cold Store (up) → Swimming Pool.
  - Out on a limb (left) → The Front Door.
  - Tree Root (right) → the unused room "[".
  - Everything into Entrance to Hades.
- **Non-Euclidean two-way links in JSW1** (my BFS layout check):
  - The roof row is wider than the attic row below it (Nomen Luni→Quirkafleeg is 3 steps; Under the Roof→Dr Jones is 2).
  - Forgotten Abbey ↔ Wine Cellar is a one-room wormhole under the whole house; the Abbey also touches the Security Guard.
  - Two rooms overlap on the roof row.
- **JSW2 fixed these by adding rooms.** This is inferred from the layout and supported by designer statements:
  - Hero Worship and "]" widen the attic row to match the roof.
  - The Forgotten Abbey wormhole became a 10-room cellar corridor (Trip Switch … Decapitare, then Money Bags).
  - Macaroni Ted/Dumb Waiter, Study/Library and Megaron/Butlers Pantry add two columns in the middle of the house.
  - Belfry sits above Rescue Esmerelda.
  - Rowson: "At the outset… I had decided to change its layout in order to fix the known bugs in the mapping."
  - Wetherill: "many of the screens were added to fill 'gaps' in the original… so that the cartography room would make sense." (JDW comments page)
  - **Result:** the JSW2 mansion, grounds and underground form a consistent flat grid. All the non-Euclidean links are the deliberate warps listed in section 5.

---

## 7. How the regions connect

Confirmed means an actual traversal in the JDW route, unless marked "map". → means one-way; ⇄ means two-way or unknown.

| Link | Region → region | Rooms / notes |
|---|---|---|
| ⇄ | House → Roof/Attic | 3 links: Half Way Up The East Wall–Priest's Hole; The Orangery–Conservatory Roof; A bit of Tree–Under The Roof |
| ⇄ | Roof → Towers | Quirkafleeg rope → The Watch Tower; Rescue Esmerelda–Belfry |
| → | Towers → Starship | Rocket Room → Docking Bay (needs the Rocket Room items) |
| ⇄ | House → Cellars | Back Door–Tool Shed; Back Stairway–The Wine Cellar |
| ⇄ | Cellars → Mines | Willy's lookout–Wonga'S Spillage Tray; Rigor Mortis–The Zoo; Crypt–Pit Gear On |
| → | Mines → Well | Down T' Pit → Water Supply → Well → Dinking Vater ? (fatal) |
| ⇄ | House → East grounds | Ballroom East–The Hall |
| ⇄ | Cellars → East grounds | Decapitare–Money Bags |
| ⇄ | Cellars → Coast | Tool Shed–The Beach (map arrows only; not traversed in the route; two-way in JSW1) |
| → | House → Sewers | Cold Store rope → Main Entrance (The Sewer) |
| → | Sewers → Coast | The Outlet → The Beach |
| → | Coast → Coast | The Yacht → Deserted Isle (needs the Trip Switch) |
| → | Coast → Starship | Deserted Isle hidden teleporter → Beam me Down Spotty |
| → ← | Starship ⇄ Planet | Beam me Down Spotty → Teleport; Beam me Up Spotty → Beam me Down Spotty (a loop made of two one-way teleports) |
| → | Starship → House | Beam me Down Spotty → The Bathroom (the start room) |
| → | House → Cavern | Bathroom toilet → Central Cavern (end only) |

**Overall shape (hub and loops):**
- The **mansion** is the hub. The **grounds**, **cellars**, **mines** and **towers** hang directly off it and can be walked both ways.
- The remote themed zones form **one big one-way loop:**
  - House → (rope) Sewers → (outfall) Beach → Yacht → (after the Trip Switch) Island → (teleport) Starship ⇄ Planet → (teleport) Bathroom.
  - The rocket from the tower is a second one-way entry into the Starship.
- **Space therefore has two ways in** (rocket; island teleporter) and **one way out** (teleporter to the start room).
- **Planet internal notes:**
  - Invisible ramps join the middle and upper levels of Loony Jet Set.
  - Your Spectrum (issue 18) claimed the top of Secret passage can be reached; JDW could not confirm this.

---

## 8. Typical exit patterns

- **Horizontal movement dominates.**
  - Every house floor is a 10-room left-right corridor.
  - Row 11 is a 23-room corridor across the whole world.
  - The planet is essentially an 8-room left-right strip plus a 2-room side branch.
  - The sewers are a 5-room corridor with a 3-room vertical branch at Holt Road (Mega Hill above, Downstairs below).
- **Vertical links are the exception and are often special:**
  - Ropes: Quirkafleeg → Watch Tower; Cold Store → Sewers.
  - Lifts: the Starship has a column MAIN LIFT 1/2/3, and Dumb Waiter has lifts. SEASIP lists 6 lift special cases; each lift pair uses guardian slots.
  - Falls: through Top Landing, Without A Limb, the Well shaft and the Security Guard stairway into Highway to Hell.
  - Towers: single-room vertical stacks above the roof. Rocket Room, Watch Tower and Quirkafleeg form a 3-high column.
- **Dead ends are common and mark spots for items or hazards:**
  - 13 grid cells have only one neighbour, e.g. Tree Top, Mega Hill, Belfry, Entrance To Hades, Dinking Vater ?.
  - In JSW1, 21 of 60 rooms have at most 2 exits.
- **Development note:** Rowson says some rooms (the Well, Dinking Vater ?, Without A Limb, Secret passage) "all had only one access point." That is why they have no Cartography Room blocks.

---

## 9. Extra facts useful to the synthesis

- **Rooms-visited counter:** the JSW2 HUD shows "Rooms NNN" next to a time counter. Source: jswcentral screenshots, e.g. https://jswcentral.org/images/03-jsw2/01-jsw2/jsw2_031.png.
- **Engine limits** (SEASIP):
  - Up to 8 guardians or arrows per room; a room with lifts can have at most 6.
  - Up to 16 items per room, stored as a 16-bit bitmask per room. There is no global item table.
  - Each room is 32×16 cells, stored compressed. Cell types: air, water (can stand on it), earth, fire, "/" ramp, "\" ramp, left conveyor, right conveyor, item.
- **Engine lineage:** JSW2 was built on the Amstrad CPC JSW codebase, then ported back to the Spectrum. The extra rooms fit because Rowson compressed the data (JDW comments page).
- **JSW2+ (2016, Rowson):**
  - Total rooms raised to 140.
  - The start room moved to the Cartography Room.
  - The Central Cavern became playable.
  - Source: JDW updated page.
  - Not the 1985 release; mentioned for context only.