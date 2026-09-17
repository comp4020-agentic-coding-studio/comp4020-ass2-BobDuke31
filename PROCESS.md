# Process overview

How I got from the brief to what's in this repo, with real commits as
proof. Brief and word counts on the course's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit).

## What I built

*Fail States* (`SLOP3722`) is a course about how games design losing —
checkpoints, lives, permadeath, difficulty, and what players make of
failing. It runs on the fixed `astro-theme-university` platform, a 12-week
arc built around one small interaction system (live demo, run map, progress
bar, scroll reveals) reused across the site instead of one big homepage
feature — plus a back/next pager, direction-aware transitions, real photos
for six weeks, and the same live demos inside the lecture decks too.

## How I got here

Assignment 1 came back too simple and too linear. I treated that as a
directing problem, not a scope problem — I'd let the easiest version win
last time and didn't want to repeat it. The plan
([`.claude/plans/logical-bouncing-parrot.md`](.claude/plans/logical-bouncing-parrot.md))
had to hold out for something richer
([`616b40f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/616b40f)),
and even its first draft made the same mistake again — one interactive
centerpiece on the homepage, everything else static — caught before any
component code got written, and changed to one small system spread
wherever it fit instead of one big feature
([`4844e77`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/4844e77),
[`b4250c7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/b4250c7)).

`pnpm check` ran green throughout. Early on, with no way to see pages
render, I checked interactive stuff by grepping build output and curling
pages. Later a temporary Playwright setup — never a real dependency,
deleted after each use — let me take real screenshots, which caught most
of the problems below; none would have shown in `pnpm check` alone.

## Where I changed my mind

A few times something technically worked but I redid it anyway:

- The Week 4/12 demos ran fine, but needed the paragraph beside them to
  make sense — the marker teleported instead of moving, and a win and a
  loss flashed the same colour. I made the widgets show their own state,
  and noticed you also had to click, remember, then click again to compare
  two options — so I made both run side by side instead
  ([`c926d5c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/c926d5c),
  [`5a0b0c6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/5a0b0c6)).
- I once asked an agent to just read three files and report back. It came
  back clean — build passing, no accessibility issues — but had quietly
  written a chunk of unused CSS too. Not wrong, but I only caught it by
  checking the diff myself.
- The demos worked but were hidden — nothing told you one existed until
  you'd scrolled past a whole lecture. I added a badge and jump link at
  every entry point, and swapped a vague "notice if it feels different"
  line for a real list of things to check
  ([`c284559`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/c284559)).
- Early on I decided the site was "image-free by design" because I
  couldn't generate image files myself. That didn't hold up — I could just
  download real, licensed photos instead, for six of the twelve weeks,
  credited in `CREDITS.md`
  ([`b102a3e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/b102a3e)).
- Clearest example: a deck visual pass passed every automated check, all
  green ([`57e8158`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/57e8158)).
  Real screenshots turned up five problems instead: overflowing content, two
  decks inconsistent from one missing CSS rule, no way back to the site
  from a deck, slides that were just text over empty space, and a QR code
  broken by a markup mistake — none visible in a build log. Fixed all five,
  checked again with screenshots, not just a re-run build
  ([`9d785ab`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/9d785ab)).

## Before you ship

`pnpm check:evidence` checks PROCESS.md exists, the commits I cite are real,
and CLAUDE.md is here — that the account is traceable, not that it's good.
That's the marker's call.
