# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

*Fail States* (`SLOP3722`) is a games-studies elective on how games design
losing: checkpoints, lives, permadeath, difficulty and the meaning players
make from failure. It's built on the fixed `astro-theme-university` platform,
with a 12-week arc, three assessments, two instructor personas, and a small
reusable interaction system (a live "trigger → outcome → feedback" demo, a
roguelike run map replacing the plain session grid, an ambient run-progress
indicator, and reveal-on-scroll) applied at the point of relevant content
across most of the site, rather than concentrated into a single homepage
feature.

## How I got here

I started from Assignment 1's retro in `CLAUDE.md` — too simple, too linear,
not interactive enough — and read it as a directing failure before writing
anything: the fix had to be holding out for the richer version, not
default-ing to whatever was easiest to build
([`616b40f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/616b40f)).
Course identity ("what happens when players fail in video games", reframed as
*Fail States*), the 12-week arc, and the three assessments were planned
before any code, in [`.claude/plans/logical-bouncing-parrot.md`](.claude/plans/logical-bouncing-parrot.md).

The first version of that plan put one interactive centerpiece on the
homepage and left the rest of the site static — the same mistake the retro
already named, just recurring at the planning stage instead of the build
stage. I caught this before writing any component code and revised the plan
to spread interactivity and polish across the site as a small reusable
system (one design-token stylesheet, one `<LiveDemo>` component reused with
three different `mode`s, one reveal-on-scroll behaviour, an ambient
run-progress indicator, and the theme's own view-transition mechanism)
applied wherever the content actually calls for it, rather than adding
features for quantity. That revision is recorded as the plan's own
"Interaction and visual design" section and carried into `CLAUDE.md`'s
Assignment 2 rules
([`4844e77`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/4844e77),
[`b4250c7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/b4250c7)).

Implementation went in four batches, each a real commit: course identity and
vocabulary (renaming "sessions" to "runs" throughout, since the run framing
motivates the run map rather than reading as decoration) and dropping the
starter images that no longer had a role
([`4844e77`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/4844e77));
the distributed interaction system itself
([`b4250c7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/b4250c7));
the full 12-week content set, assessments, decks and instructor bios
([`08146f6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/08146f6));
and the policies page
([`41afd7e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BobDuke31/commit/41afd7e)).

A meaningful part of the process was platform archaeology rather than
guessing at fixes. Three examples that changed the build:

- `astro-theme-university`'s `BaseLayout` exposes a `hero` slot that neither
  `ContentLayout` nor `MdxPageLayout` forwards to their own consumers — there
  was no way to add ambient chrome next to the nav without editing the fixed
  theme. Reading the actual `node_modules` source (not just the docs) is what
  found this, and the fix was a project-owned `CourseContentLayout.astro`
  wrapper mirroring the starter's own `PageLayout`-wraps-`MdxPageLayout`
  pattern, making the run-progress indicator the first element of each
  page's own content instead.
- Building the Run Map surfaced two of the platform's own automated gates:
  an axe "heading-order" violation (node titles were `<h3>` directly after
  the page's `<h1>`) and a base-path link-validation failure (hand-built
  hrefs skipped the theme's `withBase()` helper). Both were platform checks
  doing their job, not bugs to route around — fixed by using `<h2>` and by
  reusing `withBase()`, which also correctly aligned the run map's
  view-transition names with `ContentLayout`'s own convention.
- A hand-drawn SVG social card turned out to be a dead end: the theme's
  `OpenGraph` component always rasterises local `socialImage`s to JPEG via
  `getImage()`, which can't process SVG under this project's fixed
  `astro.config.ts` (no `dangerouslyProcessSVG`). Rather than fight the fixed
  platform or fake a workaround, `socialImage` was left unset — a documented
  fallback, not an oversight — and the file was removed rather than left as
  dead weight.

All three are recorded as rules in `CLAUDE.md`'s Assignment 2 section so a
future session doesn't have to rediscover them.

I verified the result against the platform's own checks after each batch
(`pnpm check`: typecheck, build with axe accessibility checks and base-path
validation, deck structural checks, course-graph generation, and the
`spec/course.test.ts` content-contract tests — code suffix, all 12 weeks
covered, at least one real deck, assessment weights summing to 100), all of
which pass cleanly on the content in this submission. I don't have
headless-browser tooling in this environment, so interactive behaviour (the
`LiveDemo` toggles, the run-progress indicator persisting across reload, page
transitions, keyboard and no-JS behaviour, reduced-motion) was checked
statically instead: grepping the built `dist/` output to confirm each
distributed interactive element is present on every page type where it's
expected, and a `pnpm preview` + `curl` smoke test against representative
pages. That's a real gap against the plan's own verification checklist, and
it's the honest limit of what I could confirm without a browser — the
remaining click-through verification is for a human reviewer.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
