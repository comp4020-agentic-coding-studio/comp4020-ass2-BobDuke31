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
Full identity and the 12-week arc were planned before any code was written,
grounded in real research into failure-design writing and case studies
(Juul's paradox of failure, checkpoint/permadeath design, Celeste's assist
mode, arcade economics, flow theory, speedrunning, multiplayer tilt,
rage-game culture, game feel); the decisions worth carrying forward as
rules:

- **Interactivity and polish are distributed, not concentrated.** First pass
  put one interactive centerpiece on the homepage and left the rest of the
  site static; the user pointed this out and asked for a rethink before any
  component code was written. The fix wasn't
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
  calls for it over the homepage by default. A later pass added one more
  piece to the same system rather than a one-off: `CollectionPager.astro`, a
  single two-`variant` component (`"back"` / `"pager"`) reused across all
  four detail-page types (sessions, lectures, assessments, people) for the
  back-link and week-ordered prev/next, styled with the theme's own unused
  `.at-button` system rather than plain `<button>`/`<a>` elements.
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
- **The image-free era was a tooling gap, not a real constraint --- don't
  reintroduce that mistake elsewhere.** An earlier pass declared the site
  "image-free by design" because the `Write` tool can't author binary
  formats. That reasoning was wrong: the actual blocker was authoring a
  binary file from nothing, not images in general, and `curl`-ing an
  already-openly-licensed file from the network sidesteps it completely.
  A later pass sourced six real CC BY-SA 4.0 Wikimedia Commons photos ---
  an arcade cabinet floor (weeks 1 and 3, reused as both a deck background
  and a lecture hero), a real trail-marker signpost (week 4, the "the
  marked place you return to" that "checkpoint" is a metaphor for), a
  roguelike's own tiles-mode UI (week 5), an Xbox Adaptive Controller in
  use (week 8, two distinct photos --- one for the hero, a second for the
  "Celeste ships a toggle" slide, deliberately not the same image twice in
  one deck), a pinball machine's lit playfield (week 12, the physical
  object "juice" describes) --- each chosen because it grounds that week's
  abstract idea in a concrete referent no CSS/SVG shape would, not to fill
  a quota. `CREDITS.md` records title/author/licence/source per image; that
  licence is separate from this project's own declared content licence
  (`src/site-config.ts`'s `licence`), the same way any embedded
  third-party media's rights stay distinct from the surrounding page's.
  Don't force an image into a slot that doesn't need one --- six of
  twelve weeks still carry no photo, on purpose, because nothing sourced
  for them beat the existing treatment. The people/social-image slots
  staying photo-free is a *separate*, still-live decision: a stock photo
  standing in for a fictional convenor/tutor is misrepresentation, not
  illustration, which is a different problem than "couldn't author a
  file." Two platform mechanics worth knowing before adding another one:
  `astro-theme-university`'s `ContentLayout`/`BaseLayout` already accept
  undocumented `heroImage`/`heroImageAlt` props (real fields on
  `BaseLayoutProps`, just not mentioned in the narrower
  `ContentLayoutProps`) that render a full `Hero` banner for free, and
  `astromotion`'s deck engine only copies files living under `src/decks/`
  into the production build (`asset-collector.ts`'s `astro:build:done`
  hook) --- an image used in a deck's `![bg ...]` directive must have a
  copy physically inside `src/decks/`, not just `src/assets/`, or it 404s
  in production while looking fine in dev. `astro-theme-university`'s
  `OpenGraph` component still always encodes local `socialImage`s to JPEG
  via `getImage()`, which can't rasterize SVG under this project's fixed
  `astro.config.ts` (no `dangerouslyProcessSVG`) --- `socialImage` stays
  unset in `src/site-config.ts` for that unrelated reason.
- **A deck's own markdown already has a background-image and caption
  syntax --- read it before building a component (or a class) for the same
  job.** astromotion's `![bg cover|left:40%|blur:8px](...)` directive
  (handled by its `remark-deck-bg` plugin) produces either a full-bleed
  background or a `.split-content`/`.split-image` two-column layout with
  zero extra component work; the site now uses it in three decks. The
  caption class it needs (`.image-credit`, bottom-right overlay, legible
  white ink) turned out to already exist too --- not in astromotion, but in
  `astro-theme-university`'s own `deck.css`, easy to miss because the two
  packages split the deck styling between them. First pass restated the
  class in this project's `src/decks/theme.css` before noticing the
  platform one, and the restatement silently won the cascade (same
  specificity, later in source order via the `@import`) --- wrong position
  entirely, caught by reading `deck.css` itself, not by any check. A full
  bg photo behind a title also gets its own scrim for free: `_class: hero`
  on a slide with a `![bg]` reuses the exact gradient-overlay treatment the
  website's own `Hero.astro` uses, so a photo can run at natural brightness
  and still leave heading text legible, rather than pre-darkening the photo
  as a substitute contrast fix. Separately, astromotion hardcodes Reveal.js's
  `transition` option to `"none"` ---
  classic slide/fade/zoom and fragment bullet-reveals are not available
  without forking a fixed platform, which this project won't do.
  `_animate`/`_animate: id` (Reveal auto-animate, a FLIP-style morph
  between two adjacent slides sharing a `data-id`) is the *one* real
  transition primitive the engine exposes end-to-end, used for the
  twelve-week arc timeline (week 1 to week 12) and now also for two small
  before/after morphs (a widening timing window in week 8, a filling juice
  meter in week 12) that make each week's live `<LiveDemo>` argument
  visible once before the room drives it themselves.
- **The View Transitions API does not gate itself on reduced motion ---
  that is the page's job, every time.** Adding custom
  `::view-transition-old/new(root)` rules to `failstate.css` for a
  Fail-States-flavoured page transition, it would have been easy to assume
  `<ClientRouter />` already handles `prefers-reduced-motion` the way it
  handles routing and scroll restoration. It doesn't: nothing in Astro's
  own transitions runtime checks it, so a custom `::view-transition-*` rule
  ships full motion to a "reduce motion" visitor unless the page's own CSS
  says otherwise, same as any other animation. The fix was the same
  reduced-motion media block this file already had, extended with
  `::view-transition-group/old/new(*) { animation: none !important; }`
  rather than a new one. Direction-aware transitions (the run pager's
  prev/next now exit and enter from opposite sides) go through the
  documented `astro:before-swap` event: the pager's own script stamps
  `data-transition-direction` on the *incoming* document's `<html>` before
  the swap runs, and `failstate.css` selects on it --- no fork of the
  router, no per-page JS beyond the one component that needs it.
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
- **When a demo's point is "compare two conditions," show both at once, not
  one at a time.** `LiveDemo`'s checkpoint and juice modes originally made
  the reader pick a policy/toggle, click, remember the result, then switch
  and click again to compare --- which asked them to hold the other
  condition in their head instead of seeing it. The fix was two tracks
  (Punishing/Generous) or two blocks (no-juice/juice) running side by side,
  sharing one button and one random roll or event, so both outcomes land in
  the same click and the comparison is on screen, not in memory. Prefer this
  whenever a future interaction's whole point is "X vs Y": a single
  simultaneous view beats a toggle/radio picker across separate attempts,
  even though the toggle is the easier build --- consistent with never
  taking the easier version by default.
- **A signal that something interactive exists must sit at every doorway to
  it, not just at the destination.** The `LiveDemo` widgets on weeks 4/8/12
  worked correctly but were invisible until a reader had scrolled past the
  whole lecture to reach them --- nothing on the lectures grid, the top of
  the lecture page, or the homepage said a demo was there before you hit it.
  The fix was a single `interactive: boolean` field on the lecture schema
  (`src/content.config.ts`) driving a small badge or link at every entry
  point that flag can reach: `⚡ Live demo inside` on the `LecturesGrid`
  card, a `Try the live demo` button at the top of the lecture page itself
  linking to the `#try-it` heading the MDX already had, and a "Try it right
  now" section on the homepage linking straight to the same anchor. One
  boolean driving several doorway signals to one existing anchor beats
  hoping a reader scrolls far enough to discover an interactive centerpiece
  --- discoverability is a property to add at the entrances, not a hope that
  the destination is good enough to be found.
- **Tell the reader what to compare; don't leave "notice the difference" to
  do the work.** The three `LiveDemo` lectures originally closed with one
  sentence like "notice whether it feels different," which hands the reader
  the job of inventing their own comparison criteria after the fact. Each
  was replaced with a **Notice:** list of two or three concrete, specific
  things to check (a percentage-point gap, a hit-rate change, an exact
  frame) tied to what that demo's own on-screen states can actually show.
  A short list of named things to look for is less cognitive effort than a
  single vague prompt to "notice something," even though the list is more
  words on the page --- legibility is about how much the reader has to
  invent, not how little you wrote.
- **When the point matters more felt live than read about after a
  click-through, put the widget where the reading already is.** `LiveDemo`
  on weeks 4/8/12 is now embedded directly in the deck slides, not just
  linked from the separate lecture page, so presenting or reading the deck
  reaches the live comparison without leaving the slide (`src/decks/theme.css`
  ports the site's `.at-button` and the two background tokens `LiveDemo`
  needs, since a deck never loads `components.css`/`tokens.css` the way the
  site does). The deck also flags the demo up front, on the title slide, so
  the room knows it's coming rather than stumbling into it mid-talk. Treat
  "there's a link to the interactive version" as not yet good enough
  whenever the interaction is the point being made in that moment.
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
- **A deck slide is a fixed-size canvas, not a page --- it doesn't reflow,
  it scales.** "Doesn't fit" on a slide is a real overflow bug, not a zoom
  problem, so fix the content's size, not the zoom level. This is why
  `LiveDemo` is sized in `em` and not `rem` --- `rem` blew up on a deck's
  bigger base font size. The same bug was also why Week 4 looked
  inconsistent with Weeks 8/12: a missing grid rule was quietly stacking
  its two-column comparison into one column.
- **Decks have no back button by default.** astromotion's deck route is
  just the slide content, nothing else --- no exit link, no prop to add
  one. `DeckExitLink.astro` fixes this by adding the link straight onto
  `<body>`, outside the part of the page that gets scaled and clipped.
- **A broken slide can still pass every check.** A `<div>` wrapped around a
  `![qr]` directive made astromotion's QR plugin silently skip it --- no
  build error, no accessibility warning, just a broken image. Only caught
  by actually looking at a screenshot. Passing checks isn't the same as
  looking at the thing.
