- servants_back_stairs: done (1 item, maid + rat; nursery flight -> half-landing r9, lower flight -> back hall, lobby climb)
- the_rogues_gallery: done (2 items on portrait frames, pendulum + ghost; rails 13/11/9/7)
- shhh_the_library: done (2 items on high west shelves, spider + 2 flying books; bookcase climb, rolling ladder to row-11 gallery door)
- pot_black_billiard_room: done (2 items over the table, 2 snooker balls; stool climb-back, dumbwaiter gap 26-27 + grating 28-29)
- the_drawing_room: done (1 item over the tallest easel, hand + candle; overlapping easel canvases 13/11/9/7, half-painted Wally portrait)
- the_music_room: done (2 items on piano lid + chandelier, metronome + bat; stool->lid, harp ramp->landing r9->chandelier r7)
- the_galleried_landing: done (1 key on the balustraded gallery r8, knight + ghost; straight grand staircase (8,0)-(23,15))
- the_trophy_room: done (2 trophies on antler rails r7, cat + parrot + bat; trunk/gun-cabinet pyramid 13/11/9)

## Summary - src/data/rooms/mansion_first.js (8 rooms, 13 items, region mansion, first floor row 9)

| room id | items | guardians | notes |
|---|---|---|---|
| servants_back_stairs | 1 (envelope) | maid (h), rat (h) | Nursery flight (3,0)-(11,8) down to half-landing r9; lower flight (21,15)-(25,11) to Back Hall; landing r11 + drop alcove to E door; lobby bench/shelf climb back up; sign DID YOU HEAR? |
| the_rogues_gallery | 2 (spectacles) | pendulum (v), ghost (d) | rails 13/11/9 both ends -> upper rail r7 -> portrait-frame tops r5; pendulum over mid-floor, ghost clear of rail ends |
| shhh_the_library | 2 (book) | spider (v), 2 flying_book (d) | free-standing bookcase climb (13/11/top 9) -> high shelves r7/r5; rolling ladder onto row-11 gallery to billiard door (open 7-10); sign SHHH! |
| pot_black_billiard_room | 2 (coin) | 2 beach_ball (h, cue ball speed 2) | baize table r11 continues gallery; walk off to floor, stool r13 back up; safe gap between balls; dumbwaiter gap 26-27 + grating 28-29; sign BREAK: 147 |
| the_drawing_room | 1 (apple) | hand (d), candle (v) | overlapping easel canvases 13/11/9/7 (safe walk-offs), half-painted Wally portrait, decorative crayons in unreachable voids |
| the_music_room | 2 (bell) | metronome pendulum (v), bat (d) | stool -> piano lid r11 -> walk off east; harp ramp (rises left) -> landing r9 -> chandelier r7; organ pipes decor |
| the_galleried_landing | 1 (key) | knight (h), ghost (v) | straight grand staircase (8,0)-(23,15) rising left; hop the stairwell at col 23 to cross the floor; gallery r8 with knight + key |
| the_trophy_room | 2 (trophy) | cat (h), parrot (d), bat (v) | trunk/gun-cabinet pyramid 13/11/9/11/13; rails r7 under antler nasties (walk safe, jump deadly); tiger rug; French windows; sign ROSES -> |

validate --file: validated 8 rooms, VALIDATE OK (1 warning: trophy_room east door -> the_rose_terrace not built yet)
solve --file: states 29124, rooms reached 8/8, items reachable 13/13 - SOLVE OK
solve --region mansion (24 rooms built so far): rooms 24/24, items 31/31 - SOLVE OK
