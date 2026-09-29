export const meta = {
  name: 'jsw2-rooms',
  description: 'Author all Jet Set Wally II rooms: room groups built in small batches (max 3 concurrent authors), saved to disk as they go',
  phases: [
    { title: 'Author', detail: 'batches of up to 3 room authors, each iterating with validate/solve/render and saving each room immediately' },
  ],
}

const ROOT = 'C:\\code\\Jet Set Wally 2'
const groups = args.groups
const BATCH = args.batch || 3
const COMMON = `You are building rooms for "Jet Set Wally II", an original browser homage to the ZX Spectrum classic Jet Set Willy II. Project root: ${ROOT} (cd there in Bash).
READ FIRST: docs/ROOMS.md (the cookbook - follow it exactly), docs/PLAN.md sections 3-5, and your rooms' entries in docs/WORLD.md (generated from src/data/world_plan.json,
which is the binding source: ids, names, grid pos, item counts, difficulty, themes, door contracts, sealed edges, links, conventions).
All content must be ORIGINAL - do not copy rooms, layouts or names from Jet Set Willy / JSW II. Make each room distinctive, witty and fair with the authentic Spectrum look:
black backgrounds, bright contrasting attribute colours, clear platforms, 2-6 guardians with readable patrol paths, flashing items placed as small challenges.
Tools (run from the project root):
  node tools/validate.js --file <yourfile>     node tools/solve.js --file <yourfile>     node tools/render.js file <yourfile>   (then Read out/rooms/<id>.png)
Rooms owned by other authors may not exist yet: the solver treats leaving through a planned boundary door as a valid exit and synthesises arrivals through every
planned boundary door/link into your rooms. Your rooms must pass validate with no errors, reach SOLVE OK, and look good in the PNGs.
SAVE AS YOU GO: write your file after finishing EACH room and append one line per finished room to out/progress/<your file name>.md (sessions can be cut off).
Never edit files other than your own room file and your progress file.`

const results = []
for (let i = 0; i < groups.length; i += BATCH) {
  const batch = groups.slice(i, i + BATCH)
  log(`batch ${i / BATCH + 1}: ${batch.map(g => g.key).join(', ')}`)
  const out = await parallel(batch.map(g => () => agent(`${COMMON}

YOUR FILE: ${g.file}   (create it, or CONTINUE it if it already exists from an earlier interrupted run - keep finished rooms; one JSW.defineRoom call per room; region '${g.region}')
YOUR ROOMS (ids from the plan): ${g.rooms.join(', ')}
${g.extra || ''}
Build every room exactly at its planned pos with its planned name and item count, honouring every door contract / sealed edge touching your rooms (including edges
shared with rooms owned by other authors). Then iterate with validate, solve and render until all three are clean and every room looks good (check each PNG:
theme, colours, readable platforms, fair guardians with safe spots, nothing camping on arrival spots or the only route).
Finally write a summary to out/progress/${g.file.split('/').pop()}.md and return it: a compact table (room id | items | guardians | notes) plus the final
validate/solve summary lines.`, { label: `author:${g.key}`, phase: 'Author' }).then(r => ({ key: g.key, file: g.file, summary: r }))))
  results.push(...out.filter(Boolean))
}
return results.map(r => `## ${r.key} (${r.file})\n${(r.summary || '').slice(0, 2500)}`).join('\n\n')
