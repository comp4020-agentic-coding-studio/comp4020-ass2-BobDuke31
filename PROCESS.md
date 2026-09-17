# Process overview

How I got from the brief to what's here, with real commits as
proof. Brief and word counts on the course's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit).

## What I built

*Fail States* (`SLOP3722`) is a course about how games design losing —
checkpoints, lives, permadeath, difficulty, and what players make of
failing. Built on the fixed `astro-theme-university` platform: a 12-week
arc built around one small interaction system (live demo, run map, progress
bar, scroll reveals) reused across the site instead of one homepage
feature, plus a back/next pager, direction-aware transitions, real photos
for six weeks, and the same live demos inside the lecture decks.

## How I got here

Assignment 1 came back too simple and too linear, so before starting the
new course I put a rule in `CLAUDE.md`: don't default to whatever's
easiest to build
([`616b40f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/616b40f)).

I had a rough seed idea — "what happens when players fail in video games"
— and asked the agent to research it into a coherent 12-week course before
proposing a direction. Real research — Juul's paradox of failure,
checkpoint/permadeath design, Celeste's assist mode, arcade economics, flow
theory, speedrunning, multiplayer tilt, rage-game culture, game feel —
grounded the arc, and the agent drafted a plan for me to review before any
code was written.

That plan still put one interactive centerpiece on the homepage, leaving
the rest static — the exact mistake `CLAUDE.md` had just named. I pushed
back, said the site needed to feel modern and interactive throughout, not
concentrated in one feature, and asked for a rethink. The revision — one
small system spread across the site — got built
([`4844e77`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/4844e77),
[`b4250c7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/b4250c7)).

`pnpm check` stayed green throughout. Early on, unable to see pages
render, I checked things by grepping build output and curling pages; later
a temporary Playwright setup — never a real dependency — took real
screenshots, catching most of the problems below, none visible in
`pnpm check` alone.

## Where I changed my mind

A few times something technically worked but I redid it anyway:

- The Week 4/12 demos worked, but only made sense with the paragraph
  beside them: the marker teleported instead of moving, and a win and a
  loss flashed the same colour. I made the widgets show their own state,
  then made both run side by side instead of clicking through one option
  at a time
  ([`c926d5c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/c926d5c),
  [`5a0b0c6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/5a0b0c6)).
- I once asked an agent to just read three files and report back. It came
  back clean — build passing, no accessibility issues — but had quietly
  written unused CSS too, caught only in the diff.
- The demos worked but stayed hidden until you'd scrolled past a whole
  lecture. I added a badge and jump link everywhere, and swapped a vague
  "notice if it feels different" line for a real checklist
  ([`c284559`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/c284559)).
- Early on I called the site "image-free by design" because I couldn't
  generate image files. That didn't hold up — I could just
  download real, licensed photos for six of the twelve weeks, credited in
  `CREDITS.md`
  ([`b102a3e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/b102a3e)).
- Clearest example: a deck visual pass passed every automated check, all
  green ([`57e8158`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/57e8158)).
  Real screenshots found five problems instead — overflow, two
  inconsistent decks from one missing CSS rule, no way back to the site,
  empty slides, and a QR code broken by a markup mistake — none visible
  in a build log. Fixed all five and re-checked with screenshots, not a
  rebuild
  ([`9d785ab`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/9d785ab)).

## Before you ship

`pnpm check:evidence` checks PROCESS.md exists, the commits I cite are
real, and CLAUDE.md is present — traceable, not necessarily good. That's
the marker's call.
