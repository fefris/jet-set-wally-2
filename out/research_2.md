# Jet Set Willy II vs Jet Set Willy: differences (ZX Spectrum first, Amstrad CPC origin noted)

Research report for "Jet Set Wally 2". Every key fact has a citation. **UNCONFIRMED** means the sources disagree or I could not verify the point.

---

## 0. Source key (cited by tag below)

| Tag | URL | Notes |
|---|---|---|
| WP2 | https://en.wikipedia.org/wiki/Jet_Set_Willy_II (raw wikitext) | |
| WP1 | https://en.wikipedia.org/wiki/Jet_Set_Willy | |
| SEA | https://www.seasip.info/Jsw/jsw2room.html | John Elliott, "Jet-Set Willy II Room Format v0.9.1". This is a partial JSW2 disassembly, the closest thing to a SkoolKit for JSW2. |
| JDW-IDX | https://www.jdawiseman.com/papers/games/jsw2/jsw2_index.html | J. D. A. Wiseman's full JSW2 map |
| JDW-ROUTE | https://www.jdawiseman.com/papers/games/jsw2/jsw2_route.html | |
| JDW-PROG | https://www.jdawiseman.com/papers/games/jsw2/jsw2_programmer_comments.html | Emails from Steve Wetherill and Derrick Rowson |
| JDW-CART | https://www.jdawiseman.com/papers/games/jsw2/jsw2_cartography.html | |
| JDW-UPD | https://www.jdawiseman.com/papers/games/jsw2/jsw2_updated.html | JSW2+ 2016 |
| JDW-WEST / SPACE / TELE / CENTRAL / SEWERS | same site: jsw2_west.html, jsw2_space.html, jsw2_teleport.html, jsw2_central.html, jsw2_sewers.html | |
| JDW-BBC | https://www.jdawiseman.com/papers/games/jsw2/bbc/jsw2_bbc.html | |
| JSWC | https://jswcentral.org/jsw2-01_jsw2.html | JSWC+ = https://jswcentral.org/jsw2-02_jsw2plus.html |
| TAS-ANY | https://tasvideos.org/8625S | DigitalDuck, very detailed engine notes |
| TAS-100 | https://tasvideos.org/10021S | |
| WOS | https://worldofspectrum.org/archive/software/games/jet-set-willy-ii-software-projects-ltd | |
| WOS-TXT | https://www.worldofspectrum.org/pub/sinclair/games-info/j/JetSetWillyII.txt | Fan-written info file |
| WOS-128 | https://www.worldofspectrum.org/pub/sinclair/games-info/j/JetSetWillyII_128.txt | |
| WOS-SHOT | https://www.worldofspectrum.org/pub/sinclair/screens/in-game/j/JetSetWillyII.gif | I viewed this screenshot directly |
| SC | https://spectrumcomputing.co.uk/entry/2595/ZX-Spectrum/Jet_Set_Willy_II | ZXSR = https://spectrumcomputing.co.uk/zxsr.php?id=2595 (review transcripts) |
| SK | https://skoolkid.github.io/jetsetwilly/ | JSW1 disassembly. Pages used: asm/87CA, 88FC, 8912, 89AD, 8B07, 8C01, 9A00, A400; buffers/gbuffer; tables/rooms; reference/bugs; reference/facts |
| CPCP | https://www.cpc-power.com/index.php?page=detail&num=1204 | |
| JSWMM-470 | https://jswmm.co.uk/topic/470-cheat-table-in-cpc-amstrad-version-of-jsw2/ | |
| JSWMM-F | https://jswmm.co.uk/files/file/NN-... | File descriptions: 76 (CPC JSW), 78 (CPC JSW2), 85 (C64 JSW2), 95 (C16 JSW2), 53 (BBC JSW2), 59 (Spectrum JSW2) |

---

## 1. Origin and platform history

- JSW2 began as the **Amstrad CPC conversion of JSW1**, written by Derrick P. Rowson and Steve Wetherill. Rowson compressed the screen data, which freed memory for new rooms [WP2][JDW-PROG].
  - Wetherill: "Derrick and I added all those additional screens ... mainly because we were having a blast doing it ... At no time did we (coders) imagine this as a sequel" [JDW-PROG].
  - Rowson says he wanted to fix JSW1's mapping bugs from the start. The expansion was possible because of compression, not because the CPC had more memory. On the Spectrum he "had about 3 bytes of memory left" [JDW-PROG].
- **CPC release.** It shipped as "Jet Set Willy" with the subtitle "The Final Frontier", officially in April 1985 [CPCP]. It reached no. 2 on the Amstrad chart for the four weeks to 16 April 1985 [WP2].
  - Software Projects later had Rowson cut it back to a 60-room straight port for the *They Sold A Million* compilation (November 1985) [WP2][JSWMM-470].
- **Spectrum port.** Rowson ported it back to the Spectrum alone, because Wetherill had moved to Odin [WP2][JDW-PROG]. It was released as *Jet Set Willy II* in summer 1985.
  - Sinclair User #41 (dated 18 July 1985) reviewed it [ZXSR].
  - It entered the Gallup chart at no. 8 in the fortnight to 12 July 1985 [WP2].
  - Price £6.95, 48K [WOS][SC].
- **Re-releases:** Ricochet/Mastertronic at £1.99 (WoS says 1985; Wikipedia says late 1988), and Dro Soft in Spain (1989) [WOS][WP2].
- **Credits.** Spectrum by Derrick P. Rowson, inlay art by Roger Tissyman [WOS]. C64 by John Darnell and Steve Birtles [WP2]. BBC by Chris Robson [JDW-BBC]. C16/Plus4 by Ian Davison for Tynesoft (1986) [JSWMM-F 95].
- **Other platforms:** C64, C16/Plus4, BBC Micro, Acorn Electron, MSX, Amiga [WP2].
- **Rendering differences between CPC and Spectrum:**
  - The CPC uses 4-colour mode 1 with per-room palettes. The room header has 4 extra palette bytes [SEA]. Some rooms show up to 6 colours via interrupt recolouring (JSWMM-470, post by "Norman Sword").
  - The Spectrum version uses 8x8 attribute colour and "lost coloured backgrounds in certain screens" [WP2].
  - Wetherill thought attribute clash was worse than in JSW1. Rowson says JSW2 uses one XOR-updated copy screen where JSW1 used two, with the same colour result [JDW-PROG].

---

## 2. Headline numbers compared

| Item | JSW1 (Spectrum 1984) | JSW2 (Spectrum 1985) |
|---|---|---|
| Room slots | 61 (0x00–0x3C). 0x2F "[" is an unused room, so 60 playable [SK tables/rooms][WP1] | **134** room table entries (Spectrum table at BAFDh) [SEA][JSWC] |
| Rooms reachable without cheating | 60 | **133**. "cheat" is the only one you can't reach; "Oh $#!+! The Central Cavern!" is room 133 and is reached only via the ending [JSWC][SEA][TAS-100] |
| Rooms you must visit to finish with all items | — | 126 [JSWC] |
| Items | **83** (item indices 0xAD–0xFF) [SK A400][TAS-ANY] | **175** [JSWC][TAS-ANY][WOS-TXT] |
| Items needed to finish | all 83 | **150** [SEA special case 10][JSWC][TAS-ANY] |
| Max items per room | global item table | **16**, stored as a 16-bit "untaken" mask per room [SEA] |
| Spare lives at start | 7 (address 85CC initialised to 7) [SK 87CA / gbuffer] | **7 spare (8 total)** [JSWC][ZXSR Crash: "Lives: seven"][WOS-TXT: "8 lives in the beginning"] |
| Bonus lives | none | **none** [JSWC] |
| Clock | 7:00am start, game quits at 1:00am [SK 88FC/89AD][SK facts] | **Elapsed timer HHHH:MM:SS from 0, no time limit** (§5) [TAS-ANY][WOS-SHOT] |
| Start room | The Bathroom (0x21), Willy at (13,20) [SK 87CA] | The Bathroom [JDW-CENTRAL] |

### Room counts on other platforms (conflicting; exact CPC total UNCONFIRMED)

- **Amstrad CPC "Final Frontier":**
  - 134 rooms and 175 objects, "+74" new rooms. Only 129 of 134 can be selected via the Cartography cheat map [CPCP].
  - "137 rooms", minus about 77 to make the 60-room version (JSWMM-470, forum user "Norman Sword").
  - "132 rooms" appears in several secondary summaries.
  - "a mere 76" new rooms [WOS-TXT].
  - JSWMM file 78 says the CPC game is "about identical to the Spectrum version". The BBC page says "The Amstrad and Spectrum versions of JSW II are essentially identical" [JDW-BBC].
  - **Best guess: the same 134-room map as the Spectrum. UNCONFIRMED.**
- **CPC reduced "Jet Set Willy"** (compilation version): 60 rooms [JSWMM-470].
- **Spectrum text sources disagree:** WOS-TXT says "131 rooms", WOS-128 says "134", the inlay says "over 100 room game", Sinclair User says "about 70 extra screens", and one Crash reviewer says "an extra forty rooms". The disassembly figure of 134 is authoritative [SEA].
- **BBC Micro cassette:**
  - Omits 60 Spectrum rooms. Most of the west wing, upper storey and Megatree are gone.
  - Adds 2 rooms not in the Spectrum version: "Ethel the Aardvark" and "The Fallout Shelter".
  - Willy never wears the spacesuit.
  - Each room is limited to 4 colours.
  - The BBC disc version has the full map, loaded in chunks [JDW-BBC][JSWMM-F 53].
  - The BBC scroller still says "collect all the items ... before midnight" [JDW-BBC].
- **C64:** "a few extra rooms (an IDS sequence if you jump into the Bathroom toilet)". Some room names differ, and the game-over sequence is completely different (Technician-Ted-like). Exact count UNCONFIRMED; 132 is claimed in secondary sources [JSWMM-F 85].
- **C16/Plus4:**
  - Split into 4 separately loaded sections, with the top row (On the Roof and beyond) missing.
  - No ropes, no arrows, and the teleporters don't work.
  - The HUD counts down "Items to collect: x" [JSWMM-F 95].
- **MSX:** Spectrum, Amstrad and MSX are the versions where Willy wears a spacesuit "for these 33 rooms" [WP2].

### Composition of the Spectrum map (my count from the JDW-IDX room lists)

- **60** JSW1 rooms, several renamed (§7).
- **33** new mansion and grounds rooms.
- **7** sewer rooms.
- **23** space rooms plus **10** "Teleport Zone" rooms. These 33 are the spacesuit rooms, matching WP2's "33 rooms".
- **1** Central Cavern.
- 60 + 33 + 7 + 33 + 1 = **134**, which matches the +74 figure [CPCP].

---

## 3. Objective and ending

### Story (inlay)

Willy falls down the stairs and, while in hospital, calls in builders "with green skin" to remove the stairs' sharp edges. They add rooms, including a **Rocket Room**. Maria demands he clear up the mess. The inlay recommends NASA's "Guide to Simple Space Travel", and warns "Be careful in the sewers and watch out for the bell ringer in the Belfry!!" [WOS-TXT].

TASVideos summarises the framing as: JSW1 was a "censored, sanitised version of what really happened" [TAS-ANY].

### Objective

Collect the flashing items (at least 150 of 175), then return to the Master Bedroom [WOS-TXT][SEA].

### Ending sequence (Spectrum), from the special-case room code [SEA]

1. **Master Bedroom (special case 10):** "Removes Maria if 150 or more items have been collected. If Willy is standing on a right-moving conveyor (ie, the bed) then start him running to the right."
   - As in JSW1, the bed is a conveyor tile. In JSW1 it is a left-to-right conveyor that looks static because its pattern is 0x55 [SK facts].
2. Willy then **auto-runs right**. The rooms on the path also force the rightward run when the game is won: First Landing (20), Macaroni Ted (23) and Dumb Waiter (24).
   - JSW2 inserted Macaroni Ted and Dumb Waiter between Top Landing and The Bathroom (route: Bathroom → Dumb Waiter → Macaroni Ted → Top Landing) [JDW-ROUTE].
   - Along the way he can collect the Bathroom tap, the 175th item [JDW-ROUTE].
3. **The Bathroom (9):** "Draws the toilet. If Willy hits it and the game is won, then move him to room 133 (Central Cavern)."
   - Your Spectrum #18: "you'll not see our Willy exploring the depths of his loo because someone in the sickbay is doing that ... and the loo in the bathroom is fatal" [ZXSR]. So before winning, touching the toilet kills Willy (per that review).
4. **"Oh $#!+! The Central Cavern!" (room 133, special case 1):** "If Willy has won, jump on the spot repeatedly" [SEA].
   - The room is a replica of Manic Miner's first cavern and is **not playable** [JDW-ROUTE].
   - Wetherill: "Willy was in some sort of recurring nightmare ... we considered making it playable, but there was some issue with the way the data worked" [JDW-PROG].
   - Your Spectrum: the in-game tune is Manic Miner's, and "the reason for that becomes obvious when you finish the game" [ZXSR].
   - JSWCentral defines completion as the moment this room is reached [JSWC+].
   - What happens after that (return to title, or loop forever) is **UNCONFIRMED**.

### Contrast with JSW1

In JSW1 Willy runs to the toilet at double speed and ends with his head down it (animated). The game then simply quits at 1am, even mid-ending [SK 89AD][SK facts].

### Items required and the Maria check

Only 150 items are needed. Maria's removal is a threshold check (≥150), not "all items" as in JSW1 [SEA]. The Your Spectrum POKE 34686,n changes the required count (1–174) [WOS-TXT][ZXSR].

---

## 4. Lives system

- **Finite.** 7 spare lives plus the current one, no bonus lives [JSWC][WOS-TXT].
- **Internal storage.** The count is held as a bit pattern: byte 11111110b is rotated through carry on each death, and game over comes when a 0 falls out. POKEing 255 gives infinite lives (POKE 30019,255, alternatively 31254,195) [WOS-TXT][ZXSR, Your Spectrum #18].
- **Display (from the screenshot [WOS-SHOT]).** The remaining lives are drawn as **seven dancing Willies** on the bottom rows (about character rows 22–23, from x = 0), each a different colour in ZX order: blue, red, magenta, green, cyan, yellow, white.
  - JSW1 also shows multicoloured dancing lives at display address 50A0, with colours from the 9A00 attribute table (cyan, yellow, green, blue, cyan, magenta, green) [SK 898B, 9A00].
- **Speed effect:** "The game also runs slower when there are more lives available", because JSW2 has no frame-rate cap [TAS-ANY].
- **Respawn rule changed:**
  - JSW1 restores Willy's state on room entry [SK 8C01].
  - JSW2 returns Willy "to the last static solid ground he was standing on. If this was in a different room, that room will be loaded" [TAS-ANY].
  - The room resets, but collected items stay collected [TAS-ANY].
  - Sources conflict on whether this helped:
    - JSWCentral claims "infinite death scenarios have been eliminated thanks to providing safe restart positions" [JSWC].
    - Contemporary reviews say infinite death traps "have multiplied" (SU) and it is "easier to get into loops where you lose all your remaining lives" (Crash) [ZXSR]. The TAS author says the respawn mechanic "makes infinite death loops very, very common" [TAS-ANY].
    - Your Spectrum: "you're plonked back in a safe place but if that just happens to be a sprite start position, tough luck" [ZXSR].
    - James McKay's unofficial 128K "fixed" version adds **3 seconds of invulnerability after death** to stop the loops [WOS-128]. Rowson's JSW2+ added "a routine to stop reoccurring death on re-spawn" [JDW-UPD].
- **Game over:** the foot/boot sequence is kept ("the foot (which crushes you on the game over screen)") [TAS-ANY]. The C64 JSW2 game-over sequence is completely different [JSWMM-F 85].

---

## 5. The clock (changed completely)

- **JSW1:**
  - Starts at " 7:00a" (text at 8585). The minute counter at 85CB advances once per main-loop pass, so 1 game minute = 256 frames.
  - At 12:59pm → 1:00 the code says "If so, quit the game (it's 1am)" [SK 88FC, 89AD].
  - There is an am/pm bug: it switches at 1pm and not at midnight [SK bugs].
  - The title-screen message wrongly implies a midnight deadline [SK facts].
- **JSW2 (Spectrum):**
  - The HUD shows `Rooms 002   TIME   0000 00 30` on one row and `Items : 001` next to the lives [WOS-SHOT].
  - The timer is an **elapsed counter: 4-digit hours, then minutes, then seconds**, starting at 0000 00 00. JSWCentral records times as "0000:42:42" [JSWC].
  - "It ticks one second for every ten frames", with no attempt to match real time. "It holds four digits for the number of hours so will work until 360 million frames" (about 6 months). Behaviour at overflow is unknown [TAS-ANY].
  - **No midnight or 1am cutoff** is documented for the Spectrum version. The BBC cassette scroller still says "before midnight" [JDW-BBC]. BBC timing rules are UNCONFIRMED.
  - "The clock stops whilst the rocket flies" [JDW-ROUTE].
- **New HUD counter: "Rooms"** counts the rooms visited [WOS-SHOT]. The room name is printed centred on row 16 [WOS-SHOT]; name-centring spaces and the border colour are stored per room [SEA].

---

## 6. Controls, options, speed

- **Spectrum keys** [ZXSR Crash][WOS-128]:
  - Left: Q E T U O. Right: W R Y I P. Jump: bottom row (CAPS SHIFT … SPACE).
  - Music on/off: H J K L ENTER. Pause: A S D F G.
  - Joystick: **Kempston** (also "Ram Turbo" per Crash) [ZXSR].
  - JSW1's layout is the same, and in JSW1 SHIFT+SPACE together quits [SK 89AD, 8B07]. The JSW2 quit key is **UNCONFIRMED** (probably the same); TAS confirms a quit check exists [TAS-ANY].
- **CPC keys** [JSWMM-F 78]:
  - Left Q,E,T,U,O; right W,R,Y,I,P; jump on the bottom row.
  - Pause "A to H"; tune on/off "J to ;"; cursor keys; joystick port 0; a key to abort.
  - CPC V1 has the keypad code; V2 (re-release) does not.
- **C64 keys:** Q/O left, W/P right, SPACE jump, F1 pause, F3 music [JSWMM-F 85].
- **Speed and framing:**
  - JSW2 "does not attempt to control its framerate". Turning the music off gives "a considerable speed boost", and jumping slows the game slightly. At best it runs about 0.04 s per frame (about 25 fps) [TAS-ANY].
  - Reviewers said movement is "considerably faster" (SU) or "a touch faster" (Crash) [ZXSR]. CPC-Power says the character moves faster and is better controlled [CPCP].
  - Inputs are read **once per frame**, unlike MM and JSW1. While airborne only pause, music and quit are checked [TAS-ANY].
- **Movement numbers, same as JSW1** [TAS-ANY]:
  - 2 px per frame horizontally (4 frames per 8-px cell).
  - A jump lasts **18 frames**, peaks **20 px** up, and covers **36 px** on flat ground. It can collect items up to 5 cells above the floor.
  - Hitting a ceiling cancels the jump and all motion, then Willy falls at **4 px/frame**.
  - Safe drop: walking off, up to **4 cells (32 px)**; from a jump, up to **2 cells (16 px)** below the take-off point.
  - The fall counter resets on a room transition unless the fall is already fatal.
- **Changes to jump and turn feel** [WP2][JSWC][TAS-ANY]:
  - The player "can jump in the opposite direction immediately upon landing, without releasing the jump button."
  - "Willy now takes a step forward before jumping from a standstill."
  - Turning on the ground costs a frame with no movement, but a jump in that frame now carries horizontal motion.
  - New conveyor-edge quirk: if only one of Willy's two floor cells is a conveyor, he can jump in any direction.
  - Stairs work internally as cells that warp Willy up or down one cell, with a visual offset. Guardian collision uses the visual position, everything else the internal one.
  - Holding left and right together on a conveyor keeps his current direction.
  - Some staircases are really conveyors [TAS-ANY].

---

## 7. New areas added vs JSW1 (Spectrum)

From the JDW-IDX room lists, diffed against the JSW1 room table [SK tables/rooms].

**Mansion and grounds (33 new):**
- Belfry, Butlers Pantry, Crypt, Decapitare, Dinking Vater ?, Down T' Pit, Dumb Waiter, Garden, Hero Worship.
- Highway to Hell, Library, Macaroni Ted, Megaron, Money Bags, Pit Gear On, Potty Pot Plant, Rigor Mortis.
- Rocket Room, Seedy Hole, Sky Blue Pink, Study, In T' Rat Hole, Trip Switch, Water Supply, Well.
- Willy's Bird Bath, Willy's lookout, Without A Limb, Wonga'S Spillage Tray, The Zoo.
- "]" (a large camel sprite; JSW1 had an unused room "[").
- West: **cheat**, **Deserted Isle**.

**The Sewers (7):**
- Main Entrance (The Sewer), Holt Road, Mega Hill, Downstairs, Nasties, In The Drains, The Outlet.
- Reached from the top of the rope in the Cold Store; The Outlet drops to The Beach [JDW-SEWERS].

**Space ("Starship Enterprise, kinda", 23):**
- (Flower) Power Source, Alienate?, Aye 'Appen, Banned, Beam me Down Spotty, Captain Slog, Cartography Room, Defence System, Docking Bay, Foot Room.
- MAIN LIFT 1/2/3, Maria in Space, NCC 1501, Phaser Power, Photon Tube, Ship's Computer, Shuttle Bay, Sickbay, Someone Else, Star Drive (Early Brick Version), The TROUBLE with TRIBBLES is....
- Reached via the rocket in the Rocket Room, which flies to the Docking Bay [JDW-IDX][JDW-CENTRAL][JDW-PROG].

**Teleport Zone (a planet, 10):**
- Teleport, Galactic Invasion, INCREDIBLE - / - BIG HOLE - / - IN THE GROUND (a 3-room title pun), The Hole with No Name, Secret passage, Loony Jet Set, Eggoids, Beam me Up Spotty [JDW-IDX][JDW-TELE].

**End room:** Oh $#!+! The Central Cavern!

**Placement and structural changes:**
- New rooms fill the "gaps" in JSW1's map, partly so the Cartography Room makes sense [JDW-PROG].
- The wrong-warps above Rescue Esmerelda and The Watch Tower are replaced by the Belfry and the Rocket Room [TAS-ANY].
- The Wine Cellar / basement one-way gauntlet is extended [TAS-100].

**Renamed JSW1 rooms (Spectrum JSW2 names):**
- "Dr Jones will never believe this" → "I mean, even I dont believe this"
- "Inside the MegaTrunk" → "Inside The Megatree"
- "Emergency Generator" → "Emergency Power Generator"
- "Halfway up the East Wall" → "Half Way Up The East Wall"
- "We must perform a Quirkafleeg" → "We must **peform** a Quirkafleeg"
- "Wonga'S" has an odd capital S

The typos come from Rowson re-typing names for the room-name compression [JDW-PROG][SK tables/rooms].

---

## 8. New mechanics and guardian behaviours (engine-level, Spectrum) [SEA unless noted]

### Room format

- 32×16 = 512 cells, run-length compressed.
- Cell types: 0 air, 1 water, 2 earth, 3 fire, 4 "/" ramp, 5 left conveyor, 6 item, 7 "\" ramp, 8 right conveyor.
- Graphics per room are 9-bit indices into a shared cell bank (9 bytes each: 1 attribute + 8 bitmap).
- Room header: exits L/U/R/D, border colour, compressed name, rope flag, conveyor-animation flags, guardian count, special-case ID, arrow flag.
- **Max 8 guardians plus arrows per room.** Lifts use guardian slots, so rooms with lifts have at most 6 guardians.
- Conveyors animate only if there is one contiguous conveyor in the room.

### Guardians

- A 7-byte compressed record: two counters that reverse direction, a primary step (signed), a secondary step, X and Y, an animation mask (none / frames 1,2 / 1,3 / 1–4), and an optional frame-set swap on reversal.
- **Movement angles:** vertical, horizontal, and **diagonal at 45°, 22° and 18°**. JSW1 guardians were horizontal or vertical only, plus ropes and arrows.
- **Unidirectional guardians** (e.g. Megaron) are always drawn white, and are hidden when moving the "wrong" way.
- **Guardian colour is limited to 4:** white, yellow, cyan, green (table at 70A9h: 87h, C6h, C5h, C4h). This is a leftover of the CPC's 4-colour mode.
- **Arrows:** a 2-byte record (X, Y, direction left or right).

### Special-case room behaviours (IDs 1–26)

| Behaviour | Rooms (special-case ID) |
|---|---|
| Lifts: moving platforms in pairs, defined at 0FB30h | IDs 2–5, 19, 21; Dumb Waiter 24 |
| Moving floor segments; their state persists across deaths, re-entry and even new games [TAS-ANY] | The Trouble With Tribbles (6), Highway to Hell (25) |
| Rocket: at set coordinates the centre of the room lifts off and Willy goes to the room above. It takes off once the room's objects are collected [JDW-ROUTE] | Rocket Room (8) |
| Teleporters enabled | Beam Me Up/Down Spotty (11), Deserted Isle (22) |
| Ropes drawn above vertical guardians (the bell-ringer hunchback) | Belfry (12) |
| Diagonal guardians bounce off the top and bottom of the screen | Eggoids (13) |
| Yacht sails away | The Yacht (14) |
| Toggle switch: the left-conveyor graphic is "off", the right-conveyor graphic "on" | Trip Switch (15) |
| When all items in room 75 are taken, the two monks start moving ("Guardians move when objects collected" [JDW-ROUTE]) | Rigor Mortis (16) |
| Switch lengthens the first guardian's path | Crypt (17) |
| A foot at the top of the room drops when all items in room 103 are taken; homage to the MM game-over [JDW-PROG]. The floor is also a hidden left conveyor [TAS-100] | Foot Room (18) |
| Fire cells flash | First Landing (20), Lift 6 (21) |
| Unused on Spectrum. 7 was reserved for the CPC cheat [JDW-PROG] | 7, 26 |

### Teleporters (4 total, 6-byte records at 7435h)

[SEA][JDW-SPACE][JDW-TELE]

| From | To |
|---|---|
| Beam me Down Spotty, top-west platform | Teleport (Teleport Zone) |
| Beam me Down Spotty, top-east platform | The Bathroom |
| Beam me Up Spotty, upper-east | Beam me Down Spotty, lower-west platform |
| Deserted Isle (hidden) | Beam me Down Spotty, lower-east platform |

"Each of the four platforms is a teleporter; the top two outgoing and the bottom two incoming" [TAS-100].

### Trip Switch → Yacht → Deserted Isle chain

1. Jump at the switch in the top-left of **Trip Switch**. A "Trip Switch On" message appears [WOS-TXT].
   - Sources conflict on whether losing a life resets it. WOS-TXT says it does; JDW-WEST says "Contrary to some reports, losing a life does not reset the Trip Switch."
2. With the switch set, collect the items in The Bow and The Yacht, then walk along the base of **The Yacht** or "follow the saw". The yacht sails off and crashes into **Deserted Isle** [JDW-WEST][TAS-100].
   - The idea came from a hoax (a Your Spectrum #7 claim, and a joke Crash letter about a raft to a "Secret Isle") that JSW1 did this [WOS-TXT].
3. On the isle: collect the item. A "Time to rescue 999" countdown runs (a "forced half-minute wait" [TAS-100]).
4. At 000 the tree collapses or lowers into the ground [JDW-PROG][TAS-100].
5. Walk east, then west without jumping, to hit a **hidden teleport** to Beam me Down Spotty [JDW-WEST][JDW-ROUTE].
   - WOS-TXT says it goes to the "Teleport" room. The map and TAS sources agree on Beam me Down Spotty.

### Cartography Room (room 108)

- A live map of the mansion. A block appears for each room visited, drawn from water cells mapped through a table at 0FBE8h [SEA].
- **Green** = room cleared (walkable / pass-through); **red** = items remain (**solid**). You can softlock by visiting rooms without clearing them [JDW-CART][TAS-ANY].
- Quirk: the block is set green on entry and turns red on exit if items remain [JDW-CART].
- Some rooms are deliberately not shown (Well, Dinking Vater?, Secret passage, Without A Limb) [JDW-CART][JDW-PROG].
- On the CPC it doubled as the developers' debug room-select (§11).

### Other level gimmicks

- **Invisible ramps** in Loony Jet Set [JDW-ROUTE].
- **Secret exits:** Hole with No Name ↔ Secret passage [WOS-TXT][JDW-TELE].
- **"Well"** repeats 3 times ("well, well, well"), leading to Dinking Vater?, a death drop [JDW-PROG][ZXSR].
- **Spacesuit:** Willy wears one in the 33 space and teleport-zone rooms [WP2].
- **Maria** appears as a hazard in space ("Maria in Space"). The Nightmare Room has flying Marias and a foot [TAS-ANY].
- **Attract "tour" mode:** if idle, the game previews each room in turn; the Cartography Room is the 99th shown [JDW-CART].

---

## 9. JSW1 bugs fixed or changed in JSW2

- **Attic Bug:** gone ("no Attic Bug") [WOS-TXT]. TAS: "the no longer bugged Attic" [TAS-100].
- **"Bugfix needed after the original release? NO"** [JSWC].
- **Conservatory Roof:** now reachable via the Banyan Tree and completable. All four items can be collected without dying [ZXSR Your Spectrum][TAS-ANY]. This fixes JSW1's "inaccessible items" and "uncollectable item" bugs [SK bugs].
- **Swimming Pool:** JSW1's self-collecting item bug does not apply, since the JSW2 room has no item [JDW-ROUTE][SK bugs].
- **Invisible item:** JSW1's POKE-revealed invisible object is absent in JSW2 (noted in The Hall) [JDW-ROUTE].
- **Stairs:** the conveyor-stairways in The Chapel and Halfway Up The East Wall are ordinary stairways now [ZXSR Your Spectrum].
- **Clock:** the am/pm bug and the 1am cutoff are gone with the new elapsed timer (§5).
- **Wrong-warps:** above Rescue Esmerelda and The Watch Tower they now lead to the Belfry and the Rocket Room [TAS-ANY].
- **"I mean, even I dont believe this":** exiting via the top was a JSW1 infinite-death trap. In JSW2, "done right", it drops you into Quirkafleeg [TAS-ANY].
- **Forgotten Abbey:** you can no longer clip through a platform [TAS-ANY].
- **Deliberate hazard change:** some former "safe spots" are now lethal, e.g. the tall candle in The Chapel [WP2].

**New issues in JSW2:**
- Frequent infinite death loops (§4).
- Cartography Room softlocks.
- Nomen Luni can't be traversed east→west [JDW-CENTRAL].
- Willy can get stuck in The Watch Tower wall [JDW-ROUTE].
- Rope collision oddities [TAS-ANY].
- The top of Secret passage is unreachable without POKE 30436,205 [JDW-TELE].
- Worse attribute clash [JDW-PROG].

---

## 10. Title screen and music

- **Title screen** [SEA]:
  - The JSW1-style mansion picture is built from coloured cells and "/" "\" slope UDGs, stored at 0FCCDh–0FE72h and drawn from x=18, y=2.
  - The title tune is at 0FC69h–0FCCCh, in JSW1 format.
  - The original Spectrum title has a **flashing border and a "screech"**; Rowson removed both in JSW2+ [JDW-UPD].
  - Scrolling text (CPC; the Spectrum version is similar per JDW-IDX): "Right! . . . . This is the adventure of MINER WILLY retold. This time the truth is out. ... Developed from an original idea by Matthew-JET-SET-Smith ... Programmed by D.P.Rowson ... THE FINAL FRONTIER" [JDW-IDX][JSWMM-F 78].
  - The idle attract "tour" is described in §8.
- **Spectrum music:**
  - Title: **Beethoven, *Moonlight Sonata*** (1801, public domain).
  - In game: **Grieg, "In the Hall of the Mountain King"** (*Peer Gynt*, 1875, public domain). This is the Manic Miner tune [WOS-TXT][ZXSR Your Spectrum].
  - The in-game tune is exactly 64 bytes at 0FAF0h, in MM/JSW1 format [SEA].
  - Music can be toggled with H–ENTER [WOS-128].
- **JSW1 comparison.** Title: Moonlight Sonata. In game: early copies used "If I Were a Rich Man" (Bock, *Fiddler on the Roof*, **copyrighted**; the publishers wanted £36,000), later replaced by Grieg [WP1][SK facts]. **Do not use "If I Were a Rich Man".**
- **CPC:** "The 'in game' tune is different" [JSWMM-F 76/78]. Which piece is **UNCONFIRMED**.
- **C64 JSW1** (possible public-domain alternatives): Moonlight Sonata, Bach Invention No. 1, Mozart *Rondo alla Turca* [WP1]. C64 JSW2 music is UNCONFIRMED.

---

## 11. Secrets and cheats

- **Spectrum JSW2 has no built-in cheat.** The CPC cheat was removed for memory ("memory constraints meant it needed to be deleted") [JDW-PROG]. There is no WRITETYPER equivalent; JSW1's WRITETYPER at First Landing plus the 9 / 1–5 / 6 teleport keys is covered in [SK 8B07].
- **Spectrum POKEs** [WOS-TXT][ZXSR]:

  | POKE | Effect |
  |---|---|
  | 30019,255 | Infinite lives |
  | 31254,195 | Infinite lives (alternative) |
  | 31224,201 | Invulnerability |
  | 32261,201 | Monsters harmless |
  | 34686,n | Objects needed (1–174) |
  | 30027,n | Start room |
  | 31657,n | Max monsters per room (an AND mask, so at most 9 in practice) |
  | 30436,205 | Reach the top of Secret passage [JDW-TELE] |

  - Your Spectrum #18 also printed a teleporter hack: press T, type a 3-digit room number (≤134); S saves the screen [ZXSR].
- **The "cheat" room.**
  - It sits physically between The Bow and Deserted Isle and can only be reached by cheating, e.g. walking on water [WOS-TXT][JDW-WEST].
  - Rowson: its primary aim was "to Physically separate the bow from the deserted Isle."
  - Wetherill: it was meant to flag cheaters [JDW-PROG].
  - Wikipedia frames it as an homage to JSW1's POKE culture [WP2].
- **CPC cheat.** Type **EMMRAIDNAPRRRTT** or **HIEMMRAIDNAPRRRTT** (per Rowson, the "official" code for both CPC JSW1 and JSW2), then ESC.
  - It opens the Cartography Room with a cursor: pick a room, then pick Willy's start position [JDW-PROG][JSWMM-470].
  - CPC-Power stores it as "HIEMMRAIDNAPRRRT" at &88F3, and says only 129 of the 134 rooms can be selected [CPCP].
  - It is broken on disc versions, where the drive's RAM overwrites the ~150-byte room-index table [JSWMM-470].
  - The code is a counting rhyme ("Eeny Meeny Macka Racka Air I Domi Nacka ...") [JDW-PROG].
- **Hidden CPC message:** "Hi Amsoft!Hi Wonga & Stu!" at #9F33 [CPCP].
- **James McKay 128K fix:** press T for a cheat and teleport menu; 3 s invulnerability after death [WOS-128][JSWC].
- **JSW2+ (Rowson, Nov 2016)** [JDW-UPD][JSWC+]:
  - 147 rooms (146 accessible), 325 items (298 needed), 6 spare lives plus 11 bonus lives.
  - Starts in the Cartography Room; the Central Cavern is playable with collapsing floors; 12 sprites plus Willy.
  - Cheat: type "MONKLION 2016". Then hold 8+9+0 and tap 6 to toggle infinite lives (the Willies turn yellow), or press 6+8+0 for the map (Q/W/K/M to move, Enter to select). Using a cheat leaves a visible marker.
- **Hidden or odd rooms:**
  - Secret passage: jump at the top-right wall of The Hole with No Name [WOS-TXT].
  - Without A Limb: reached only by a death jump; Rowson says it "contains no data" [JDW-PROG].
  - Well ×3 and Dinking Vater? (fatal).
  - Deserted Isle, Teleport Zone, cheat, Central Cavern.
  - Swimming Pool: no item.

### In-jokes (for tone only; don't copy)

- Dumb Waiter: a dig at Eugene Evans' *Wacky Waiters*.
- Macaroni Ted: *Technician Ted*, whose authors worked at Marconi.
- Wonga rooms: the budgie of programmer Marc Wilding.
- Holt Road / Mega Hill: Birkenhead digs.
- Pit Gear On / In T' Rat Hole / Down T' Pit: Yorkshire coal-mining.
- Loony Jet Set = *Jetpac*; Eggoids = *Lunar Jetman*.
- Space: Star Trek (Beam me Up/Down Spotty, NCC 1501, Tribbles, Captain Slog).
- Sickbay has someone with their head in a loo [JDW-PROG][WOS-TXT][ZXSR].

---

## 12. Reception

| Outlet | Verdict |
|---|---|
| Crash #19 (Aug 1985) | 61%, "Very good... but not much progress"; "more of a Deluxe version" than a sequel |
| Sinclair User #41 | 3/5, "the rip-off of the year ... Jet Set Willy with about 70 extra screens" |
| SU Annual 1986 | "biggest rip-off of them all" |
| Sinclair Programs | 79% |
| Your Sinclair (Jul 1987) | 7/10 |
| SU (Dec 1988, Ricochet) | 65% |
| Home Computing Weekly | "trying to flog it as a new game" |
| Amstrad Computer User | "one of the best CPC games around" |
| Spectrum Computing | average 65.83% across 6 reviews |

[ZXSR][SC][WP2]

The TAS author's view: "most of the extra rooms are either incredibly boring or incredibly unfair, or both" [TAS-ANY]. Rowson himself "personally thought no one would finish the game without some form of cheating" [JDW-PROG].

---

## 13. Design takeaways for "Jet Set Wally 2" (mechanics only)

1. **HUD:**
   - Room name centred on row 16.
   - Row 19: "Rooms NNN", "TIME HHHH MM SS" (elapsed, counting up, no time limit).
   - Rows 22–23: 7 dancing life figures in ZX colours 1–7, with "Items : NNN" in yellow.
   - 1 in-game second = 10 logic frames, and the clock pauses during the rocket flight.
2. **Win condition:**
   - The bed-keeper is removed once collected ≥ 150 (or ~86% of total).
   - Touching the bed (a right conveyor) starts a forced run right through designated rooms to the toilet, then a warp to a non-playable "nightmare" room where the hero jumps on the spot.
   - Before winning, the toilet is lethal.
3. **Lives:** 7 spare, no bonus lives. Respawn at the last solid ground stood on (with an optional brief invulnerability to avoid death loops, as the fan and author fixes did). Items persist through death.
4. **Movement:** 2 px/frame; 18-frame jump, 20 px peak, 36 px range; fall at 4 px/frame; safe drops of 32 px (walk-off) and 16 px (below jump start). Add JSW2's step-forward-from-standstill jump and instant reverse-jump on landing.
5. **Engine features:**
   - Diagonal guardians (45/22/18°), unidirectional wrap guardians, bouncing diagonals, lifts in pairs, moving/collapsing floor segments.
   - Guardians triggered by item collection, switch-altered paths, a trip switch with persistent state, one-way rocket transport, 4 teleporter pads.
   - A live cartography-map room (green = passable/cleared, red = solid/uncleared), invisible ramps, secret exits.
   - An idle attract mode that tours rooms.
   - Per-room cap of 8 guardians plus arrows and 16 items.
6. **Music (public domain only):** Moonlight Sonata for the title, "In the Hall of the Mountain King" in game. Bach's Invention No. 1 and Mozart's *Rondo alla Turca* are further PD options. Music toggle and pause keys.
7. **Keys:** QETUO left / WRYIP right / bottom row jump / A–G pause / H–ENTER music. Add a joystick or gamepad as the Kempston equivalent.