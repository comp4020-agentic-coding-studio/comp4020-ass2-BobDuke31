# Your harness

This file is yours, and it arrives with no rules in it on purpose --- this note
is all there is, and it goes when you write your own. The rules you hold the
agent to are part of what gets marked, so they should be rules you decided on.

Nothing about the starter is recorded here. The platform under you is fixed and
documented in `README.md`, and the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec. Read both before you plan or build;
what the agent needs to carry from either is your call.

## Depth over simplicity

Assignment 1 came back marked too simple, too linear, and not interactive
enough. That was a directing failure, not a scope failure: I let the agent
reach for whichever version was easiest to implement instead of holding out
for the version that was actually interesting. Rules to stop that happening
again:

- Never simplify an idea just because the simpler version is easier to build.
  A focused idea still needs enough depth, variation and room to explore ---
  "focused" means the central idea stays clear, not that everything around it
  gets stripped away.
- This is HCI and interactive design work. Don't default to static
  information pages, plain forms, or basic input-in/output-out interactions.
  The interaction itself should let someone explore, experiment, get feedback
  and come to understand the idea by using it, not by reading about it.
- Visual presentation and playfulness are part of the quality of the
  response, not decoration to bolt on if time allows. Treat them as
  load-bearing from the start of the build, not a pass at the end.
- When exploring a direction, start from something richer than feels
  comfortable and refine it down, rather than starting minimal and hoping to
  add richness back in later --- that's how last time ended up linear.

## Assignment 2: Fail States (SLOP3722)

The course is "Fail States" --- how games design losing: checkpoints,
permadeath, lives, difficulty, and the meaning players make from failure.
Full identity and the 12-week arc are in `.claude/plans/logical-bouncing-parrot.md`
(the approved plan); the decisions worth carrying forward as rules:

- **Interactivity and polish are distributed, not concentrated.** First pass
  put one interactive centerpiece on the homepage and left the rest of the
  site static; that was corrected before any code was written. The fix wasn't
  "add more features" but a small reusable system applied at the point of
  relevant content: one design-token stylesheet (`src/styles/failstate.css`),
  one reusable `<LiveDemo>` component used with three different `mode`s
  (weeks 4/8/12), one reveal-on-scroll custom element reused on every card
  grid, one ambient run-progress indicator, and the view-transition
  choreography the theme already ships for free (`Card`/`ContentLayout`'s
  matching `transition:name` convention --- check before building a
  transition system from scratch, the theme may already have one). When
  adding a new interactive idea, prefer extending one of these over inventing
  a bespoke one-off widget, and prefer placing it where the content actually
  calls for it over the homepage by default.
- **Read the platform before building around it.** `astro-theme-university`'s
  `BaseLayout` (the true common ancestor of every page) exposes a `hero` slot
  that neither `ContentLayout` nor `MdxPageLayout` forwards to their own
  consumers --- there is no way to inject something next to the nav bar
  without editing the fixed theme. The fix was a project-owned
  `CourseContentLayout.astro` wrapper (mirrors the starter's own
  `PageLayout.astro`-wraps-`MdxPageLayout` pattern) that makes ambient chrome
  the first element of each page's own content instead, styled
  `position: sticky`. This kind of platform archaeology (read the actual
  `node_modules` source, don't assume) found the free transition mechanism
  above too.
- **Raster images are off the table; the site is image-free by design.** The
  `Write` tool can't author binary formats, and `check-evidence.ts` requires
  the four starter images be changed or removed. Rather than fight that, the
  site leans into CSS/SVG/motion for its visual identity (inline SVG hearts,
  the run map, the marking-weight bar) and the people/social-image slots go
  without photos --- an explicit design decision, not an oversight. Note:
  `astro-theme-university`'s `OpenGraph` component always encodes local
  `socialImage`s to JPEG via `getImage()`, which can't rasterize SVG under
  this project's fixed `astro.config.ts` (no `dangerouslyProcessSVG`) --- so
  a hand-drawn SVG can't stand in for a social card either. `socialImage` is
  therefore left unset in `src/site-config.ts` rather than pointed at a
  format the pipeline can't process.
- **Build the accessible version first, the enhancement second.** The Run Map
  is a real `<ol>` of links before it's a zig-zag node graph; `LiveDemo` and
  `MarkingModel`'s weight bar keep an aria-live status region or a plain
  table alongside the visual/interactive layer. This is what let `pnpm build`'s
  axe checks and the keyboard/no-JS verification pass without a special case.
- **A demo has to narrate its own states — don't lean on the paragraph beside
  it.** `LiveDemo`'s checkpoint and juice modes worked correctly on the first
  pass but needed the surrounding prose to be understood: the marker
  teleported instead of running, a death and a success flashed the identical
  colour, and "juice on/off" produced a subtle difference instead of an
  obvious one. The fix was inside the widget, not the copy: named on-screen
  states (Ready/Running.../Hit!/Cleared!), motion tied to a real quantity
  (the marker moves at a constant speed, so the distance skipped under the
  generous policy is *seen*, not asserted), and a failure-only flash colour
  (`fs-flash--danger`, `failstate.css`) kept distinct from the success one.
  If an interaction needs its caption to make sense, the interaction isn't
  finished.
- **Verify a delegated agent's "done" before trusting it, every time.** A
  background research task was asked only to read three theme files and
  report back; it instead implemented a real slice of a visual pass itself
  and reported clean builds and zero accessibility violations. That report
  turned out accurate, but only because it was independently re-run rather
  than taken on faith — the same pass had also written a whole `.fs-panel`
  HUD-panel CSS system that was never applied anywhere: dead code that
  matched its own doc comment but nothing in the actual DOM. Read the real
  diff and rerun `pnpm check`/`pnpm build` yourself before calling any
  delegated work complete.
