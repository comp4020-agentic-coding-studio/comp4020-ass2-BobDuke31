# Image credits

Real photos/screenshots used in this site and its lecture decks, all sourced
from Wikimedia Commons. Each keeps its own licence, separate from this
project's own `CC-BY-NC-SA-4.0` content licence declared in `src/site-config.ts`
— embedding a CC BY-SA image in a CC-BY-NC-SA page is standard practice; the
two licences apply to two different works, not one merged one.

| File | Title | Author | Licence | Source |
| --- | --- | --- | --- | --- |
| `arcade-museum.jpg` | American Classic Arcade Museum Interior | Funspotarcade | CC BY-SA 4.0 | <https://commons.wikimedia.org/wiki/File:American_Classic_Arcade_Museum_Interior.jpg> |
| `trail-marker.jpg` | Swiss hiking trail sign post at Grosse Scheidegg | UCaetano | CC BY-SA 4.0 | <https://commons.wikimedia.org/wiki/File:Swiss_hiking_trail_sign_post_at_Grosse_Scheidegg.jpg> |
| `dcss-screenshot.png` | DCSS Tiles Screenshot | Darkwolf812 | CC BY-SA 4.0 | <https://commons.wikimedia.org/wiki/File:DCSS_Tiles_Screenshot.png> |
| `adaptive-controller.jpg` | InclusiveGameLab Person-Using-Adaptive-Controller 2 | InclusiveGameLab | CC BY-SA 4.0 | <https://commons.wikimedia.org/wiki/File:InclusiveGameLab_Person-Using-Adaptive-Controller_2_CC-BY-SA.jpg> |
| `pinball.jpg` | Pinball machine Orbitor 1 | Lino Wirag | CC BY-SA 4.0 | <https://commons.wikimedia.org/wiki/File:Pinball_machine_Orbitor_1.jpg> |

Each file lives at `src/assets/images/<file>` for web use (lecture hero
banners and lecture-grid card thumbnails, via `astro:assets`) and, where the
same photo also appears as a deck background, a byte-identical copy at
`src/decks/assets/<file>` — astromotion only copies files that live under
`src/decks/` into the production build, so a deck `![bg]` reference can't
resolve a file that lives only under `src/assets/`.

No photo stands in for a person: `people/*.md` stay without a `photo`, since
every convenor/tutor on this site is a fictional persona and a stock
headshot would misrepresent, not illustrate. See `CLAUDE.md`.
