export const meta = {
  name: 'jsw2-rooms-2',
  description: 'Author the remaining Jet Set Wally II room groups (2 concurrent, token-lean, saved to disk as they go)',
  phases: [{ title: 'Author', detail: 'batches of 2 room authors; each saves every room immediately' }],
}

const ROOT = 'C:\\code\\Jet Set Wally 2'
const groups = args.groups
const BATCH = args.batch || 2
const COMMON = `You are building rooms for "Jet Set Wally II", an original browser homage to the ZX Spectrum classic Jet Set Willy II. Project root: ${ROOT} (cd there in Bash).
Be TOKEN-EFFICIENT: do not read docs/WORLD.md or docs/PLAN.md. Instead:
  1. Read docs/ROOMS.md once (the cookbook - follow it exactly).
  2. Run: node tools/plan-brief.js <your room ids>   -> your rooms' names, pos, items, difficulty, themes, every door contract / sealed edge / link.
  3. For the file format, read ONLY the first 70 lines of src/data/rooms/mansion_top.js as an example of a finished room.
All content must be ORIGINAL (no copying of rooms/layouts/names from Jet Set Willy / JSW II). Make each room distinctive, witty and fair with the authentic Spectrum look:
black backgrounds, bright contrasting attribute colours, clear platforms, 2-6 guardians with readable patrol paths, flashing items placed as small challenges.
Tools (pipe long output through tail):
  node tools/validate.js --file <yourfile> | tail -30      node tools/solve.js --file <yourfile> | tail -25      node tools/render.js file <yourfile>  (then Read out/rooms/<id>.png)
Rooms owned by other authors may not exist yet: the solver treats leaving through a planned boundary door as a valid exit and synthesises arrivals through every
planned boundary door/link into your rooms. Your rooms must pass validate with no errors and reach SOLVE OK; look at each room's PNG once at the end and fix anything ugly.
SAVE AS YOU GO: write your file after finishing EACH room and append one line per finished room to out/progress/<your file name>.md (sessions can be cut off).
Never edit files other than your own room file and your progress file.`

const results = []
for (let i = 0; i < groups.length; i += BATCH) {
  const batch = groups.slice(i, i + BATCH)
  log(`batch ${i / BATCH + 1}: ${batch.map(g => g.key).join(', ')}`)
  const out = await parallel(batch.map(g => () => agent(`${COMMON}

YOUR FILE: ${g.file}   (create it, or CONTINUE it if it already exists - keep finished rooms; one JSW.defineRoom call per room; region '${g.region}')
YOUR ROOMS: ${g.rooms.join(' ')}
${g.extra || ''}
Build every room at its planned pos with its planned name and item count, honouring every door contract / sealed edge touching your rooms (including edges shared
with other authors' rooms). Iterate with validate and solve until clean. Finally write a short summary to out/progress/${g.file.split('/').pop()}.md and return it
(room id | items | guardians | one-line note, plus the final validate/solve summary lines).`, { label: `author:${g.key}`, phase: 'Author' }).then(r => ({ key: g.key, file: g.file, summary: r }))))
  results.push(...out.filter(Boolean))
}
return results.map(r => `## ${r.key} (${r.file})\n${(r.summary || '').slice(0, 2000)}`).join('\n\n')
