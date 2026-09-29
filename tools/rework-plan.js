#!/usr/bin/env node
// One-off provenance script: turns the winning world design (out/world_design_C.json, chosen by the judge panel)
// into the final plan src/data/world_plan.json, applying the judges' fixes and our own restructuring:
//  * coast moved east of the grounds (river mouth / seaside shop / headland lighthouse), well moved to a garden well
//    under the riverbank - so the macro-map is our own arrangement, not the original game's;
//  * plain or echo-y room names replaced with original witty names;
//  * one rope per room, static housekeeper, home pad in the transporter room, stair geometry & directions, etc.
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'out', 'world_design_C.json'), 'utf8'));
const R = {}; plan.rooms.forEach(r => { R[r.id] = r; });
const need = (id) => { if (!R[id]) throw new Error('missing room ' + id); return R[id]; };
const pair = (d, a, b) => (d.a === a && d.b === b) || (d.a === b && d.b === a);
const dropDoor = (a, b) => { plan.doors = plan.doors.filter(d => !pair(d, a, b)); };
const dropSealed = (a, b) => { plan.sealed = plan.sealed.filter(s => !((s[0] === a && s[1] === b) || (s[0] === b && s[1] === a))); };

// ------------------------------------------------------------------ 1. coast: east of the grounds
const coastPos = {
  the_beach: [20, 11], kiss_me_quick_pier: [21, 11], yacht_poop_deck: [22, 11], yacht_sharp_end: [23, 11],
  lighthouse_keepers_lunch: [22, 10], shark_infested_shallows: [24, 12], desert_island_discs: [25, 12],
};
for (const [id, pos] of Object.entries(coastPos)) need(id).pos = pos;
// remove every old coast door/sealed pair, then add the new ones
const coastIds = new Set(Object.keys(coastPos));
plan.doors = plan.doors.filter(d => !coastIds.has(d.a) && !coastIds.has(d.b));
plan.sealed = plan.sealed.filter(s => !coastIds.has(s[0]) && !coastIds.has(s[1]));
plan.doors.push(
  { a: 'under_the_bridge', b: 'the_beach', dir: 'right', kind: 'door', open: [10, 12], floor: 13, note: 'towpath along the river mouth down to the beach' },
  { a: 'the_beach', b: 'kiss_me_quick_pier', dir: 'right', kind: 'door', open: [11, 14], floor: 15 },
  { a: 'kiss_me_quick_pier', b: 'yacht_poop_deck', dir: 'right', kind: 'door', open: [10, 13], floor: 14, note: 'gangplank' },
  { a: 'yacht_poop_deck', b: 'yacht_sharp_end', dir: 'right', kind: 'door', open: [10, 13], floor: 14 },
  { a: 'open_all_hours', b: 'lighthouse_keepers_lunch', dir: 'right', kind: 'door', open: [11, 14], floor: 15, note: 'shop back door onto the headland' },
  { a: 'open_all_hours', b: 'kiss_me_quick_pier', dir: 'down', kind: 'stairs', cols: [8, 9], rise: 'left', note: 'promenade steps from the shop down to the pier' },
  { a: 'shark_infested_shallows', b: 'desert_island_discs', dir: 'right', kind: 'door', open: [11, 14], floor: 15 },
);
plan.sealed.push(['the_far_bank', 'the_beach'], ['lighthouse_keepers_lunch', 'yacht_poop_deck']);

// ------------------------------------------------------------------ 2. well: a garden well under the riverbank
const wellPos = { drop_me_a_line: [18, 11], well_beyond_help: [18, 12], deep_joy: [18, 13] };
for (const [id, pos] of Object.entries(wellPos)) need(id).pos = pos;
dropDoor('ee_by_gum_coal_face', 'drop_me_a_line');
dropDoor('drop_me_a_line', 'well_beyond_help');
dropDoor('well_beyond_help', 'deep_joy');
plan.doors.push(
  { a: 'the_riverbank', b: 'drop_me_a_line', dir: 'down', kind: 'rope', cols: [14, 17], note: 'winch rope at cols 14-15 (arrive back on the riverbank floor there); the well mouth beside it (gap cols 16-17 in the riverbank floor) drops onto the well-head ledge at row 4' },
  { a: 'drop_me_a_line', b: 'well_beyond_help', dir: 'down', kind: 'rope', cols: [20, 27], note: 'shaft rope at cols 20-21 (arrival floor 15 there); the well mouth beside it (gap cols 22-27) drops onto the row-4 ledge (cols 22-25)' },
  { a: 'well_beyond_help', b: 'deep_joy', dir: 'down', kind: 'rope', cols: [8, 15], note: 'bottom rope at cols 8-9 (arrival floor 15 there); the hole beside it (gap cols 10-15) drops onto the Deep Joy shelf at row 5 (cols 8-15)' },
);
plan.sealed.push(['tangled_roots', 'drop_me_a_line'], ['drop_me_a_line', 'under_the_bridge'], ['under_the_conker_roots', 'well_beyond_help']);

// ------------------------------------------------------------------ 3. themes rewritten for moved / fixed rooms
const T = (id, theme, extra) => { const r = need(id); r.theme = theme; if (extra) Object.assign(r, extra); };
T('the_beach', 'Where the river meets the sea: golden sand, a striped windbreak and a sandcastle. West door (open 10-12, floor 13) is the towpath from under the bridge, stepping down to the sand (floor 15); east door floor 15 onto the pier. The sewer outfall pipe pokes out of the cliff: outfall arrivals (special.arrival) land on a sand dune at row 5 (cols 6-11) that slopes down (ramp) to the sand - signposted BEACH. The cliff above is sealed. Crabs scuttle (h) and a beach_ball rolls (h); item on top of the sandcastle.');
T('kiss_me_quick_pier', "A seaside pier with a helter-skelter and a fortune-teller's booth. West door floor 15 from the beach; the east gangplank rises to the yacht door (open 10-13, floor 14). The promenade steps climb out through the ceiling to the corner shop above: a staircase rising LEFT whose top ramp cells are (9,1) and (8,0), coming up from the lower right. Seagulls swoop (d) and flying fish zip across (arrow, row 10); item on the helter-skelter top.");
T('lighthouse_keepers_lunch', "The lighthouse on the headland, entered through the corner shop's back door (west, floor 15). Spiral stairs (switchback ramps) wind up to the lamp room at row 2; walls on the north, east and south. The lamp flashes once the trip switch is thrown - the sign that the yacht can sail. Seagulls swoop (d) through the windows and a crab guards the stairs; items in the lamp room and on the keeper's lunch tin. Dead end.", { name: 'Beacon and Eggs' });
T('yacht_poop_deck', "The stern of a millionaire's yacht moored at the pier: gangplank door west (open 10-13, floor 14), a sun deck (floor 14) with deckchairs (row 12), a cabin roof at row 10 and a flybridge at row 8. East door (open 10-13, floor 14) to the bow; the headland above is sealed. A sailor paces (h) and a lifebuoy bobs (v); item on the flagstaff (row 4).", { name: 'Poop Deck Posers' });
T('yacht_sharp_end', "The bow: a raked foredeck ramp up to the bowsprit, the anchor windlass and the mast. West door (open 10-13, floor 14) from the poop deck; the east rail is sealed (open sea). A swinging anchor (v) and a parrot (d); ratline ledges climb the mast to a crow's nest at row 4; items on the bowsprit and in the crow's nest.", {
  name: 'The Sharp End',
  special: "yacht portal (kind yacht): once the trip switch flag 'trip' is set AND every item in yacht_poop_deck and yacht_sharp_end is collected, standing at the ship's wheel (floor 14, cols 6-7) sails the yacht one-way to desert_island_discs. Before that a furled sail and a flashing NOT YET pennant; after, the sail unfurls.",
});
T('shark_infested_shallows', 'A sandbar of stepping stones over the sea (waves nasty, row 15) just west of the island. East door floor 15 to the island; every other edge is sealed. A shark fin glides (h) and a jellyfish bobs (v); item on a rock. Dead end.');
T('desert_island_discs', "A tiny palm island far out to sea. The yacht drops Wally on the sand (special.arrival: floor 15, cols 20-21). A palm tree with notch ledges climbs to a frond at row 4 with an item; a wind-up gramophone plays; west door floor 15 to the shallows. A crab and a parrot. In a clearing a crashed escape pod glows.", {
  special: 'teleport: the escape-pod pad (floor 15, cols 4-7) beams Wally one-way to molecule_shuffler on the starship - signposted by a flashing ONE-WAY TICKET beacon. This is the only exit from the island.',
});
T('open_all_hours', "The corner shop at the east end of the village: shelves of penny-sweet jars and a till that springs open. West door floor 15 from the far bank; back door east (floor 15) out onto the lighthouse headland. Promenade steps lead down through the floor to the pier below: the staircase rises LEFT, its bottom ramp cells are (9,15) and (8,14) and it continues up-left to a stockroom shelf. A runaway trolley (h) and a spring-loaded till drawer (spring, v); item in the sweet jar on the top shelf.");
T('under_the_bridge', "Beneath the humpback arch: the river (nasty, rows 14-15) with bobbing stepping stones (lifts beside, never under, the drop). The bargee's rope hangs to row 0 at cols 14-15 (climb back up to the bridge); drop in beside it (the missing plank, cols 16-17) onto a ledge at row 4 (cols 16-19) that steps down (rows 7, 10) to the towpath. The towpath (floor 13, south bank) runs to the east door (open 10-12, floor 13): the river mouth and the beach. West edge sealed (the well). A fish leaps (v) and a trolley drifts (h); items under the arch.", { name: 'Troll Toll Towpath' });
T('the_riverbank', "Reeds and a weeping willow at the river's source. West door floor 15, grassy steps up to the east door (open 10-13, floor 14) onto the bridge approach. Among the reeds an old garden well: the well mouth is a gap in floor 15 at cols 16-17 (sign: DANGER - WELL) and the winch rope comes up from the well head at cols 14-15, where the floor-15 arrival spot is. A frog hops (h) and a heron (bird, d) stabs; item on the willow branch (row 9), reached from its roots (rows 13, 11).", { name: 'Reedy Steady Go' });
T('drop_me_a_line', 'The well head beneath the reeds. Dropping in from the riverbank (gap cols 16-17) lands on a row-4 ledge (cols 16-21) that steps down by mossy stones (rows 7, 10) to the rim (floor 13-15). The winch rope (cols 14-15) hangs from row 0 to row 11 for the climb back up to the riverbank. The rim (floor 15, cols 8-21) surrounds the well mouth (gap cols 22-27): drop in beside the shaft rope top (cols 20-21), which climbs back from Well Beyond Help. Sealed west (tree roots) and east (river). A spider dangles (v) and a drip falls (v); item on the winch.', { special: '' });
T('well_beyond_help', 'A sheer shaft. The shaft rope (cols 20-21) hangs from row 0 to row 12 and climbs back to the well head; a mossy ledge at row 4 (cols 22-25) catches careful droppers from the well mouth, and west-wall ledges (rows 7, 10, 13; never more than 3 rows apart) lead down and back up; the items sit on them. At the bottom, a floor-15 ledge (cols 4-9) is where the Deep Joy rope arrives; beside it a hole (cols 10-15) drops onto the Deep Joy shelf. Nothing but air below the east side of the row-4 ledge - leaping off it is the comic fatal plunge. Sealed west (cellars) and east.');
T('deep_joy', "The well bottom: black water (nasty, row 15) with a rock shelf at row 5 (cols 8-15) that catches a drop from the hole above; stepping stones every 3 rows (rows 8, 11, 14) lead down to a skeleton of a previous adventurer clutching an item. A rope (cols 8-9) climbs from the shelf back up to Well Beyond Help. A frog (h) and drips (v) guard the stones. Three items - the reward for braving the well.");
T('ee_by_gum_coal_face', 'The deepest working: the plank ramp from Dynamite Depot comes down through the ceiling (stairs rising right, ramp cells (27,15)/(28,14) continuing the flight). A crusher pounds (v) at the coal face and a miner_bot trundles (h); the old winze at the far end has caved in (solid rock). West door floor 15; item on a coal truck.');
T('the_boot_room', 'Wellies, fishing rods and a bricked-up back door (the builders again - note the sign WAS: TO THE BEACH). The back stairs arrive from above; floor-15 door east (Laundry); the west edge is solid wall. A wet dog pads the floor (h); item on a shelf above the rods (row 9), reached from the boot bench (row 13) and the rod rack (row 11).', { name: 'Boots and All' });
T('master_bedroom', 'The four-poster bed (right conveyor, row 14, cols 2-11) fills the west floor. Mrs Mop (special.housekeeper, static at cell x 12, y 104, standing on floor 15 just east of the bed) guards it. Enter at floor 15 from the east; a tallboy and a chest of drawers form one-way shelves (rows 13, 11, 9) in mid-room leading to a wardrobe-top shelf at row 7 that runs west to the high boudoir door, safely above Mrs Mop (too high to drop onto the bed); one item on the wardrobe top. No ramps or walls on the floor-15 run line from the bed to the east door; no guardian paths or nasties on it.', {
  special: 'housekeeper: Mrs Mop (special.housekeeper {x:12, y:104}) - touching her is fatal until 150 items are held, then she leaves. bed: true - standing on the bed conveyor afterwards starts the forced run right (4 px/frame, no jumping) along floor 15 through walk_in_wardrobe into the_bathroom.',
});
T('bell_ringers_loft', "Under the bells. Arrival from the roof below is by the roof room's rope (arrive on floor 15 at cols 12-13, drop back through the gap at cols 10-11). This room's ONE rope hangs at cols 18-19 and climbs on into the belfry above (a ledge at row 4, cols 20-23, catches drops from above and steps down by corbels at rows 7 and 10). Two pendulum guardians (v, 'pendulum') swing as the clappers; timing jumps between the corbels is the test. A bat flies (v); item between the corbels at row 7.");
T('the_galleried_landing', 'Balustraded landing: one straight grand staircase rising LEFT crosses the room - it arrives from the Great Hall below with ramp cells (23,15) and (22,14) and climbs up-left to (9,1) and (8,0) into Top of the Stairs. Floor-15 doors west (Music Room) and east (Trophy Room); the floor passes under the stairs. A knight clanks along the landing (h); item on the balustrade rail.');
T('molecule_shuffler', 'The transporter room: an ARRIVALS pad (floor 15, cols 4-7) where island and planet beams land (special.arrival), a HOME pad (floor 15, cols 12-15) that beams one-way to the Bathroom, and a DEPARTURES dais (row 9, cols 20-23, up console steps at rows 13 and 11) that beams one-way to the alien planet. Doors west and east at floor 15. A robot operator paces the console (h, away from the pads) and a satellite bobs (v); items on the console (row 10) and the dais.', {
  special: "arrival pad for island and planet teleports; portals: HOME pad -> the_bathroom (teleport, signposted HOME in flashing letters), departures dais -> welcome_to_zarg (teleport, signposted PLANET ZARG: ONE WAY). No guardian path over any pad.",
});
plan.links.push({ from: 'molecule_shuffler', to: 'the_bathroom', kind: 'teleport', note: 'HOME pad in the transporter room (second way home; removes the single point of failure on the grav-tube climb)' });
// great hall stairs follow the galleried landing's straight flight
const gh = need('the_great_hall');
gh.theme = gh.theme.replace(/cols 18-21/g, 'cols 22-23') + ' The grand staircase leaves through the ceiling rising LEFT with top ramp cells (23,1) and (22,0): from the floor it climbs right to a half-landing at the east wall, then turns back up-left (switchback).';

// ------------------------------------------------------------------ 4. stairs doors: 2-column overlap spans + rise
for (const d of plan.doors) {
  if (d.kind !== 'stairs' || d.rise) continue;
  const c0 = d.cols[0], mid = (d.cols[0] + d.cols[1]) / 2;
  d.cols = [c0 + 1, c0 + 2];
  d.rise = /ris\w* left/i.test(d.note || '') ? 'left' : /ris\w* right/i.test(d.note || '') ? 'right' : (mid >= 16 ? 'right' : 'left');
}
for (const d of plan.doors) {
  if (d.kind === 'stairs' && pair(d, 'top_of_the_stairs', 'the_galleried_landing')) { d.cols = [8, 9]; d.rise = 'left'; }
  if (d.kind === 'stairs' && pair(d, 'the_galleried_landing', 'the_great_hall')) { d.cols = [22, 23]; d.rise = 'left'; }
  if (d.kind === 'stairs' && pair(d, 'dynamite_depot', 'ee_by_gum_coal_face')) { d.cols = [27, 28]; d.rise = 'right'; }
}

// ------------------------------------------------------------------ 5. names
const NAMES = {
  nursery: 'Rock-a-Bye Nursery', walk_in_wardrobe: 'Coats of Many Colours', the_airing_cupboard: 'Hot Water Bottle Heaven',
  top_of_the_stairs: 'Stair Head Case', the_spare_room: 'Spare Room? Spare Me!', servants_back_stairs: 'Back Stairs Gossip',
  shhh_the_library: 'Shhh! Bookworms at Work', the_drawing_room: 'Drawing a Blank', the_music_room: 'Chopsticks Concerto',
  the_galleried_landing: 'A Landing Strip', the_trophy_room: 'The Stuffed Shirt Trophy Room', the_back_hall: 'Back Hall Bedlam',
  the_conservatory: 'Hothouse Flowers', the_dining_room: 'Soup of the Day', the_servery: 'Service With a Smirk',
  gentlemens_smoking_room: 'Pipe Dreams', the_cloakroom: 'Cloak and Dagger Room', the_great_hall: 'The Not-So-Great Hall',
  the_front_porch: 'Mind the Doorstep', the_laundry: 'Mangle Tangle', the_turkish_bath: 'The Turkish Bath (Drained)',
  the_kitchen: 'Too Many Cooks', the_scullery: 'Scrub-a-Dub Scullery', servants_hall: "Servants' Knees-Up",
  the_boiler_room: 'Boiling Point', the_coal_hole: 'Coal Hole Rigmarole',
  the_box_room: 'Boxing Clever', the_cold_water_tank: 'Tank Top', top_of_the_loft_ladder: 'Loft Conversion', the_rafters: 'Raising the Rafters',
  the_wine_cellar: 'The Vintage Whine Cellar', the_bottling_line: 'Bottleneck', cellar_steps: 'Steps in the Dark', the_stilton_store: 'Say Cheese!',
  the_family_crypt: 'Dead Relatives', the_coal_cellar: 'Cellar Dwellers', echo_chamber: 'Hello? Hello? Hello?',
  fatberg_alley: 'Gravy Train Tunnel', turbo_lift_a: 'Grav Tube: Going Up', turbo_lift_b: 'Grav Tube: Stopping',
  turbo_lift_c: 'Grav Tube: Going Down', say_aaah_sickbay: 'Say Aaah!', the_gravel_drive: 'Gravel Rash Drive',
  the_gatehouse: 'Who Goes There?', the_village_green: 'Howzat! The Village Green', the_rose_terrace: 'Roses Are Red',
  the_far_bank: 'Allotment of Trouble', the_beach: 'Sand in Your Sandwiches', the_nightmare: 'Back to Square One!',
};
for (const [id, name] of Object.entries(NAMES)) need(id).name = name;
const nm = need('the_nightmare');
nm.theme = 'The ending: Wally wakes up at the bottom of a mine he has never seen, every guardian he ever dodged patrolling above him, and jumps on the spot in despair while the results roll. Not playable (special.nightmare {x, y}).';

// ------------------------------------------------------------------ 6. regions & notes
for (const rg of plan.regions || []) {
  if (rg.region === 'coast') rg.placement = 'east of the grounds, rows 10-12, cols 20-25: river mouth -> beach -> pier -> yacht (stern, bow); headland lighthouse above the yacht behind the corner shop; island pocket (shallows + island) out to sea, reached only by the yacht';
  if (rg.region === 'well') rg.placement = 'a garden well under the riverbank: col 18, rows 11-13 (well head, shaft, bottom)';
}
plan.title = 'Jet Set Wally II - world plan (base: design C, judged; reworked)';
plan.notes = (plan.notes || '') + `

FINAL-PLAN CONVENTIONS (binding):
- Edges: at every shared edge, everything outside the listed opening(s) is WALL in both edge columns on both sides (validate checks col 31 vs col 0 row by row).
- Stairs doors: "cols" is a 2-column overlap span and "rise" gives the direction the stairs climb. Rise right: the LOWER room's ramp cells at (c0,1) and (c1,0), the UPPER room's at (c0,15) and (c1,14); rise left: lower (c1,1),(c0,0), upper (c1,15),(c0,14). The upper room repeats the lower room's top two ramp cells (Wally re-enters from below two rows above the geometric continuation). Verified by tools/test-stairs.js.
- Rope doors: the rope hangs in the LOWER room from row 0 inside the span; the upper room has a floor-15 arrival spot above the rope columns and (optionally) a separate drop-back gap beside it.
- Shafts: 4-col span, drop gap at c0..c0+1, one-way arrival floor at c0+2..c1, catch ledge at row 3-4 in the lower room. Lifts go beside static shelves, never under a drop.
- Vary ledge spacing between rooms (not always every 2 rows).
- Guardians: write them as sprite (h|v|d) with bounds; paths only over air; never parked on an arrival spot, pad or the only route.
- One rope per room (engine limit). Housekeeper is static. Yacht portal requires the 'trip' flag and both yacht rooms cleared.
- Layout note: the coast lies EAST of the grounds (reached down the river under the bridge, or via the corner shop's promenade steps); the well is a garden well beneath the riverbank.`;

fs.writeFileSync(path.join(ROOT, 'src', 'data', 'world_plan.json'), JSON.stringify(plan, null, 1));
console.log('wrote src/data/world_plan.json');
