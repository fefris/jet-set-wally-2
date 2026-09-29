# roof.js progress (region roof)
- the_box_room: done (1 item cup, 3 guardians: clockwork_mouse h, spider v, jack_in_box v; trapdoor cols 26-27 + KIDS/KEEP OUT signs; SOLVE OK)
- mothball_alley: done (1 item sock, 3 guardians: rat h, moth(butterfly) v, moth d; skylight wardrobe top row 4 cols 12-15; SOLVE OK)
- dads_model_railway: done (2 items battery, 3 guardians: clockwork_mouse h on the rails, toy_soldier h, balloon d; right conveyor track row 11 + tunnel; SOLVE OK)
- the_cold_water_tank: done (1 item tap, 3 guardians: rubber_duck d on the water, bubble v, drip v; staggered rungs 13/11/9/7, rim cross-bars row 6 over nasty water, ballcock arm row 4; SOLVE OK)
- the_rafters: done (1 item clock, 2 guardians: bat v, spider v; two rise-left rafters (26,14)->(21,9) and (11,8)->(8,5), collar beam 9, top beam 5; SOLVE OK)
- grannys_old_tat: done (1 item spoon, 3 guardians: yoyo v, stuffed owl v (static), cat h; hatch gap 12-13 + board 14-15; shelves 12/10/8/6 -> hat brim row 4; SOLVE OK)
- top_of_the_loft_ladder: done (1 item hammer, 3 guardians: bat d, spider v, saw v; loft ladder (25,15)->(29,11) rise right, hatch ladder (13,8)->(5,0) rise left + hatch ledge row 3, joists 9/7, beam 5; SOLVE OK)
- the_pigeon_loft: done (2 items envelope, 3 guardians: bird d, bird v (landing board), bird v (bottom coop); perches 9/11/13 zigzag, top coop row 5-6, bottom coop rows 13-14; SOLVE OK)
- sooty_chimney_stacks: done (1 item pipe, rope x=22 + 2 guardians: spider v, pigeon(bird) d; skylight gap 12-13 + glass 14-15; cowl ledge row 5 cols 24-29, caps 9/13; SOLVE OK with tower stubs)
- slippery_slates: done (2 items coin, 3 guardians: arrow left row 9 (y76), arrow right row 3 (y26), seagull d; west slope (2,11)->(8,5), ridge row 5 with moss conveyor, east slope (20,5)->(29,14); SOLVE OK)
- life_in_the_gutter: done (1 item mushroom, 2 guardians: snail h, pigeon(bird) v; puddles/leaves as nasties at row 14 on the gutter, pot 13 -> hopper row 11 under the eaves; SOLVE OK)
- bell_tower_buttress: done (1 item bell, rope x=12 + 2 guardians: bat d along the slope, pigeon(bird) h; buttress ledge row 4 cols 8-11 under the tower hole cols 10-13, corbels 8/12, buttress slope (24,14)->(29,9); SOLVE OK)
- aerial_alley: done (2 items bulb, 4 guardians: arrow right row 6, arrow left row 8, satellite v, crow(bird) d; three aerials mast+tips, crossbars 7/5, NO SIGNAL sign; SOLVE OK)
- weathercock_ridge: done (1 item feather, 5 guardians: arrow left row 10, arrow right row 6, cockerel(bird) v, seagull h, leaf v; parapet 9 + hatch lid 10 + loft ladder (6,15)->(3,12), silo stairs (11,11)->(22,0), weathercock plinth 10 / arms 8; validate OK, solve OK except synthetic silo-entry error that disappears once the silo exists)
- countdown_silo: done (3 items key, 4 guardians: fan v, spring v, robo_dog h, robot h; gantry stairs (21,15)->(23,13), east ledges 13/11/9/7 (capsule arm), west tank 13 + ledges 11/9/7 via flame trench under the rocket; rocket portal x15 y6 w2 -> rocket_park requires roomItems; T-MINUS/ONE WAY signs; SOLVE OK)
- stargazers_dome: done (2 items spectacles, 3 guardians: owl d, star v, ringed_planet v; rope arrival floor 15 cols 2-23, drop-back slot cols 24-25, telescope ramp (19,14)->(10,5), eyepiece platform 5, star-chart shelf 9, desk 12; NOTE: opened sooty_chimney_stacks row 0 cols 24-25 (sky 'S'->'.') so the planned drop-back onto the cowl works - was walled; SOLVE OK)
- bell_ringers_loft: done (1 item candle, rope x=18 + 3 guardians: pendulum v x2 (clappers), bat v; arrival floor 15 cols 12-14 + rope-hole gap 10-11, ringers' bench 13, corbels 11/9/7 + ledge 4 (catches belfry drops at cols 20-21), peal board, LOOK TO sign; SOLVE OK)
- ding_dong_belfry: done (3 items crown, 5 guardians: pendulum v x2 (bells), bat d x2, spider v; rope arrival floor 15 + drop-back gap 20-21, west corbels 13/11/9 -> west arch sill 7 + bell beam 7 under headstock 2 (falls off far end), east corbels 13/11/9 -> east arch sill 7; DING/DONG signs; SOLVE OK)

## Summary - session 2 (6 rooms added to roof.js)
room id | items | guardians | note
aerial_alley | 2 (bulb) | 4: arrow R row 6, arrow L row 8, satellite v, crow(bird) d | three TV aerials (masts + crackling tips, crossbars 7/5) on a flat roof at row 9, NO SIGNAL sign
weathercock_ridge | 1 (feather) | 5: arrow L row 10, arrow R row 6, cockerel(bird) v, seagull h, leaf v | parapet 9 + hatch lid 10, loft ladder (6,15)->(3,12), silo stairs (11,11)->(22,0), weathercock plinth/arms, moon
stargazers_dome | 2 (spectacles) | 3: owl d, star v, ringed_planet v | rope arrival cols 21-23, drop-back slot 24-25, telescope ramp to eyepiece platform 5, star-chart shelf 9, desk 12; dead end
bell_ringers_loft | 1 (candle) | rope x=18 + 3: pendulum v x2, bat v | arrival floor 12-14 + rope-hole gap 10-11, ringers' bench 13, corbels 11/9/7, ledge 4 catches belfry drops, peal board
ding_dong_belfry | 3 (crown) | 5: pendulum(bell) v x2, bat d x2, spider v | corbels 13/11/9 both sides, bell beam 7 under headstock (fatal far end), crowns in both open arches + by the 2nd bell
countdown_silo | 3 (key) | 4: fan v, spring v, robo_dog h, robot h | gantry stairs up from the ridge, ledges 13/11/9/7 east + west via flame trench, rocket portal x15 y6 w2 -> rocket_park (requires roomItems), T-MINUS/ONE WAY signs
Other change: sooty_chimney_stacks row 0 cols 24-25 opened ('SS'->'..') - the plan's drop-back from the dome (cols 24-25 onto the cowl at row 5) was walled over, which made the dome an inescapable dead end.
validate --file roof.js: VALIDATE OK (1 warning: countdown_silo portal targets rocket_park which does not exist yet)
solve --file roof.js: states 724285, rooms reached 18/18, items reachable 27/27 - SOLVE OK
