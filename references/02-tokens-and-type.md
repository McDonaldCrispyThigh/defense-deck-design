# 02 · Tokens, type, surfaces

Every value below is read from the live deck (`docs/defense/css/v2.css` unless another file is named).
Use the tokens, never raw hex, so both themes and the per-slide accent keep working.

## 1. Stage and safe area

| Item | Value | Where |
|---|---|---|
| Stage | 1920 × 1080 px, `transform: translate(…) scale(k)` with `k = min(W/1920, H/1080)` | `engine.js fit()` |
| Bleed | `--bx`, `--by` = how far the window extends past 16:9, in stage px (+2) | `engine.js fit()` |
| Slide padding | `92px 128px 132px` (top, sides, bottom) | `.slide` |
| Content box | x 128 → 1792 (1664 wide), y 92 → 948 | derived |
| Anchor slides | `padding-top: 92px` (same), `.rail` margin-top 26 px, so the rail starts 48 px under the title box on slide 14 (on slide 8 it follows the lead and `.plan-ask`) | `.anchor`, `.rail` |
| Title slide | `padding-left: 140px`, vertically centred (`justify-content: center`) | `v2-slides.css .t-title` |

Fixed furniture inside the stage (all `position: absolute`):

| Element | Position | Type |
|---|---|---|
| Section label `.chrome .act` | left 128, top 44 | 600 15px Inter, `letter-spacing .14em`, uppercase, `--tx3`; the act name in `<b>` is 700 and `--acc`; gap 14 |
| "Usual step" note `.conv` | right 128, top 40 | 500 16px, `--tx2`, `<b>` 650 `--tx`; five 9 px dots (gap 4), `.on` = `--tx` |
| Formula pin `.fx-pin` | right 128, top 24 | see 05-maps-and-charts §5 |
| Back chip `.xback` (supplement) | left 600, top 44 | 550 16px, `↩` + mono slide number + "Back to the talk" (or "S6 Back" after an S-to-S jump) |
| Source line `.src` | left 128, bottom 74, max-width 1300 | 400 15px/1.35, `--tx3` |
| Photo credit `.credit` | right 128, bottom 74 | 500 13px, `--tx3`, `letter-spacing .02em`; text "Photo: Name / Unsplash" |
| Supplement links `.xrefs` | right 128, bottom 112, column, right-aligned, gap 6 | 550 16px `--tx2`; `<b>` = 700 14px mono `--tx`; `::after "→"` in `--tx3` |
| Page number `.pageno` | right 128, bottom 40 | 500 15px `--tx3`, tabular; current number `<b>` 600 `--tx2`; "15 / 22" or "S7 / S25" |
| Step dots `.stepdots` | right 200, bottom 46 | 5 px dots, gap 6, `--line2`; reached dots `--tx2` |
| Progress bar `.progress` | bottom edge of the window (bleed included) | 3 px, `--acc`, opacity .75, width animates .6s `--ease`; supplement = full width |

Leave y 948–1080 to the source line, links and page furniture. Leave y 0–92 to the chrome row.

## 2. Colour tokens

Two themes: `ink` (default, dark) and `paper` (light). `T` toggles; the choice persists in
`localStorage['deck.theme']`; `?theme=paper` forces one.

| Token | ink | paper | Use |
|---|---|---|---|
| `--bg0` | `#050507` | `#f5f5f7` | page, scrim base |
| `--bg1` | `#0c0c10` | `#fbfbfd` | radial mid stop, empty dots |
| `--bg2` | `#16161c` | `#ffffff` | radial highlight, toast |
| `--tx` | `#f5f5f7` | `#1d1d1f` | headlines, emphasis, numbers |
| `--tx2` | `rgba(235,235,245,.66)` | `rgba(29,29,31,.68)` | body text, labels |
| `--tx3` | `rgba(235,235,245,.40)` | `rgba(29,29,31,.44)` | sources, captions, axis notes, inactive |
| `--line` | `rgba(255,255,255,.12)` | `rgba(0,0,0,.10)` | hairline rules between rows |
| `--line2` | `rgba(255,255,255,.22)` | `rgba(0,0,0,.20)` | header rules, rails, tract strokes |
| `--fill` | `rgba(255,255,255,.06)` | `rgba(0,0,0,.04)` | empty map tracts, neutral matrix cells |
| `--fill2` | `rgba(255,255,255,.11)` | `rgba(0,0,0,.07)` | tokens, hover |
| `--scrim` | `5, 5, 7` | `245, 245, 247` | RGB triple for `rgba(var(--scrim), a)` |

Semantic colours. Each one has one main meaning across the deck. The live deck borrows a few of them
elsewhere: slide 3's field circles (cyan health geography, amber GIScience, purple GeoAI), `--bd` / `--ok`
in the slide 5 geocoding drawing and the search-query ZIP, `--ai` for archive snapshots and the "archive
coverage" rate, `--no` for the archive cutoff line. In new slides give non-semantic emphasis `--tx` or
`--acc`.

| Token | ink | paper | Meaning | Text class |
|---|---|---|---|---|
| `--wf` | `#2f8fff` | `#0071e3` | **my list** (the workflow, built from Google listings); Act I accent | `.c-wf` |
| `--bd` | `#ff9f0a` | `#c86b00` | **the state list** (Minnesota Board of Pharmacy, the reference); Act II and linkage accent | `.c-bd` |
| `--sp` | `#40c8e0` | `#0a8aa8` | the map / RQ3 / geography; Prologue-geography, Act III, Epilogue accent | `.c-sp` |
| `--ai` | `#bf5af2` | `#8944ab` | the language model, GeoAI, "classified by a model" | `.c-ai` |
| `--ok` | `#30d158` | `#248a3d` | include, match, yes | `.c-ok` |
| `--no` | `#ff5a52` | `#d70015` | exclude, miss, no, "usual problem" | `.c-no` |

Other text classes: `.c-acc` (slide accent), `.c-tx`, `.c-2` (`--tx2`), `.c-3` (`--tx3`).
Mixed tints are built with `color-mix(in srgb, var(--wf) 22%, transparent)`, never with a new hex.
Typical mixes: 9 % (target area fill), 13 % (slide 3 field circles; 22 % / 28 % for the RQ2 Venn),
18 % (water, done-dot halo),
20–22 % (matrix cell tint), 38 % / 82 % (two-step sequential map ramp on `--sp`).

### Slide accent `--acc`

`<section data-acc="wf|bd|sp|ai|ok|w">` sets `--acc` (`w` = `--tx`, a neutral slide). The engine copies it
to the stage on every slide change, so the background glow, the eyebrow, `<em>` in titles, the act label
and the progress bar all take it. Accent by section in the live deck:

| Section | Accent |
|---|---|
| Title, hook, why pharmacies, definition | default `--wf` (photo slides) |
| Why geography cares, literature map | `sp` |
| The usual chain to a desert map | `w` (neutral grey: it is "the usual practice", not this thesis) |
| Act I (search, evidence, keyword test) | `wf`; the model's four questions `ai` |
| Act II (anchor, finding, misses) | `bd` |
| Act III, Epilogue (except Thank you: default `--wf`) | `sp` |
| Supplement | by subject: evidence `wf`, prompt/GeoAI/practices `ai`, linkage `bd`, RQ3 `sp`, limitations `w` |

## 3. Background

```css
.bg { background: radial-gradient(1600px 1000px at <x 1632px from the stage's left edge, y −108px>, var(--bg2), var(--bg1) 45%, var(--bg0)); }
.bg .glow  { 1200×1200 circle, filter: blur(160px), opacity .16, background: var(--acc), transition: background 1.2s var(--ease) }
.bg .glow.g1 { top-right, offset −500 / −620 }   .bg .glow.g2 { bottom-left, opacity .08 }
[data-theme="paper"] .bg .glow { opacity: .10 }
```

The glow is the only colour field in the deck. It changes colour smoothly when the accent changes,
so moving from Act I to Act II reads as a colour shift from blue to amber.

## 4. Photography

`<section data-photo="photo-<unsplash-id>" data-scrim="…" data-pos="x% y%" data-credit="Name">`.
Files ship in `img/<id>.jpg` (1920 px wide); the online Unsplash URL is only a fallback.

| `data-scrim` | Scrim (`::after`) | Use |
|---|---|---|
| `sl` | left-to-right: .96 → .86 (34 %) → .28 (68 %) → .10 | title, thank-you: text on the left over a photo |
| `sb` | bottom-up: .97 → .72 (38 %) → .10 (75 %) | text at the bottom |
| `sf` | flat .55 | hook: photo dimmed under a map |
| `sx` | top-down .62 → .86 | anchor slides |
| `sx blur` | plus `filter: blur(28px) saturate(1.35) brightness(.95)` | anchor slides: the photo becomes a coloured haze |
| `half` | photo on the right half; an eased 9-stop gradient from solid (x ≈ 1037) to clear (x ≈ 1344) | text-left split |
| `half l` | mirrored: photo on the left, text right | text-right split |

Every photo slowly zooms (Ken Burns): `kb 18s linear`, scale 1.04 → 1.12, drift −1.2 % / −.8 %.
Photo filter: `saturate(.9) contrast(1.02)`. Credit sits bottom right; on a right-hand half photo it
turns white with a text shadow. Photos are people and places (Minneapolis skyline, a pharmacist with a
patient, a supermarket), never stock graphics or icons.

## 5. Typefaces

Bundled in `fonts/` (latin + latin-ext subsets, OFL), declared in `css/fonts.css`:

| Token | Stack | Role |
|---|---|---|
| `--f-display` | "Inter Tight", Inter, Segoe UI, system-ui | headlines, big numbers, station names |
| `--f-sans` | Inter, Segoe UI, system-ui | everything else |
| `--f-mono` | "JetBrains Mono", Cascadia Mono, Consolas | codes, step numbers, S-numbers, tokens, verbatim strings |
| math | "STIX Two Text", Cambria Math, serif (normal + italic) | equations, fraction numerals, `=` signs |

`body { font-feature-settings: "cv11", "ss01", "ss03"; -webkit-font-smoothing: antialiased; }`.
Numbers use `font-variant-numeric: tabular-nums lining-nums`.

Bundled weight ranges: Inter 400–700, Inter Tight 500–700, JetBrains Mono 400–600, STIX 400–600. The CSS uses
in-between weights (450, 550, 650, 680) because the fonts are variable; 750 renders as 700 and mono 650/700 as
600. The latin subsets lack `→`, `↩` (Inter) and `≥` (STIX); those glyphs come from system fonts.

## 6. Type scale

| Class | Font | Weight · size / line-height | Tracking | Colour | Other |
|---|---|---|---|---|---|
| `.display` | display | 700 · 128/0.95 (title slide 136, set inline to 120; "Thank you." 180) | −.04em | `--tx` (on photos `#fff`, paper `--tx`) | `text-wrap: balance`, mb 28 |
| `.title` | display | 680 · 64/1.05 | −.028em | `--tx`; `<em>` = `--acc`, upright | max-width 1500, `balance`, mb 22 |
| `.eyebrow` | sans | 650 · 18/1 | .16em, uppercase | `--acc` | mb 22; pattern "RQ2 · FINDING" |
| `.lead` | sans | 400 · 30/1.42 | — | `--tx2`; `<b>` 600 `--tx` | max-width 1180, `pretty` |
| `.sub` | sans | 600 · 26/1.3 | −.01em | `--tx` | mb 8 |
| `p`, `li` | sans | 25/1.48 | — | `--tx2` | `p` mb 14, `pretty` |
| `.small` | sans | 21/1.45 | — | inherit | |
| `.tiny` | sans | 17/1.4 | — | `--tx3` | |
| `.num` | display | 650 · (set per use)/0.95 | −.035em | per use | tabular lining |
| `.stat .num` | display | 104 (`.m` 76) | | `--tx` | |
| `.stat .lab` | sans | 450 · 22/1.38 | | `--tx2` | max-width 380 |
| `.quote` | display | 500 · 30/1.4 | −.01em | `--tx` | 3 px `--acc` left rule, padding-left 28 |
| `.cite` | inherit | .82em | | `--tx3` | nowrap; placed after the sentence it supports |
| `.mono` | mono | .88em | −.01em | | |
| `.tok` | mono | .86em | | `--tx` on `--fill2` | padding 2/10, radius 8, nowrap |
| `b`, `strong` | | 600 | | `--tx` | bold = brighter, not just heavier |

Scale ladder in practice: 180 / 120 display (136 is the `.t-title` default, overridden inline) · 104 / 96 / 76 / 66 / 64 / 58 numbers · 64 title ·
40–46 sub-display (`.ha-v`, `.g0-txt b`) · 30–32 lead and closing question · 27–29 list heads · 25 body ·
21–23 secondary · 17–20 labels and legends · 15–16 sources, caps labels · 13–14 credits and small caps.
Body text on a talk slide is never below 15 px; 11–13 px is only for photo credits and caps tags.

Rules that recur:

- Talk-slide title = one sentence that states the finding or the question, ending with a full stop or
  "?". Usually one phrase in `<em>` carries the accent (the claim word: "the same places", "switching the
  list", "one pharmacy"). Some supplement titles are plain labels without a full stop.
- Caps labels (eyebrow, section label, axis titles, column heads, `.t-plate .lab`, `.rq`) are mostly
  12–18 px, weight 600–700, tracking .06–.20em (section label 600 15 px .14em; verdict `.s-v` 700 20 px
  .06em). `.stat .lab` is not a caps label: it is a 450 22 px sentence-case label.
- Emphasis is colour or weight, never a box: `<b>` brightens to `--tx`; `<em>` takes `--acc`;
  semantic words take `.c-wf` / `.c-bd`.
- Fractions in prose use the plain "9/10" glyphs; "½" uses the single glyph.

## 7. Spacing and grids

Layout utilities (`v2.css`): `.row` (flex, gap 48) · `.col` · `.g2` (1fr 1fr, gap 64) · `.g3` (gap 56) ·
`.g4` (gap 40) · `.g-64` (1.55fr 1fr, gap 72) · `.g-46` (1fr 1.45fr, gap 72) · `.body` (flex 1, mt 10) ·
`.mt-s` 16 · `.mt-m` 34 · `.mt-l` 60 · `.tail` (mt 22) · `.hr` (1 px `--line`, margin 26 0).

Recurring spacing values: 6–10 (label to value), 14–22 (row padding), 22 (eyebrow→title), 32
(title→`.body`: 22 + 10), 24–44 (column padding beside a vertical hairline: mostly 28, 44 on `.ans`),
56–72 (column gaps), 112 (two wide columns, `.mw2`).
Map + text slides use `grid-template-columns: 1fr 680px` (hook: 924 / 680) or `.g-64` (measured 968 / 624); the closing map (slide 21) uses `.g2` (800 / 800).
The body starts at y ≈ 298 under a two-line title (≈ 650 px tall) and y ≈ 231 under a one-line title (≈ 717).

## 8. Surfaces: rules, not boxes

The deck separates content with:

1. **Hairlines**: 1 px `--line` between rows (`.fact`, `.why`, `.sx-row`, `.eb-list`, `.bk-tbl`, `.lm`);
   `.fr-list` and `.lmap` rows use 1 px `--line2`; 1 px vertical `--line` between stat columns (`.stats`,
   `.ans`, `.qm-vs`); the title plate uses `rgba(255,255,255,.18)` on the photo (`--line` in paper).
2. **Header rules**: 2 px `--line2` under column heads (`.lmap .ch-h`), 2 px in the semantic colour under a
   group head (`.mw-hd`, `.cm-lab`: the slide-5 "Usual problem" / "This thesis" / "Result" rows in `--no` /
   `--wf` / `--sp`), 2 px `--wf` over the evidence columns (`.evc`), 2 px `--ai` over the model block.
3. **Left rules**: 3 px for a quote (`.quote`, in `--acc`) and a worked example (`.one-addr`, in `--wf`),
   both on slide 7.
4. **Top rule for a conclusion**: 2 px `--sp` over the thesis question (`.gq-ask`), 2 px `--acc` over a
   verdict (`.fr-end`).
5. **Whitespace** and alignment to the five-column rail grid.

Filled shapes are reserved for data marks: map tracts, Venn circles, dots, bars, 2×2 matrix cells
(`.dx-c`, 92 px tall, radius 16, `--fill` or a 20–22 % semantic tint with a 2.5 px inset ring), score
chips in the assignment matrix, and mock web-page snippets on S1. Content is not put in a card; the live
exceptions (the `.frame-box` note on S7 and the `.fx-pin` formula pin) are listed in 08 (item 23) and are
not to be copied.

## 9. Liquid glass (sparingly)

`.lg` = `rgba(255,255,255,.06)` + `backdrop-filter: blur(14px) saturate(1.6)` + inset highlights + a 1.4 px
gradient rim (`::before`, masked) + a top-left sheen (`::after`, screen blend); radius `--r` (default 32).
`js/glass.js` upgrades it in Chromium to real refraction: a per-element SVG displacement map (convex bevel,
`data-lg-bezel`, `data-lg-scale` default 46, `data-lg-blur` default 1.2) with R/G/B offset 1 / 1.07 / 1.15 for
dispersion. Used only on: the title and thank-you plates (`.t-plate`, `data-lg-scale="40"`), the rail lens
(`data-lg-scale="54" data-lg-bezel="22"`) and map controls (`.lg-btns`: pill, `--r: 999px`, active button
inverted `--tx` background). Do not add glass elsewhere.

## 10. Icons and marks

`js/icons.js` exposes `I.<name>`: 24×24 stroke icons, `stroke-width 1.7`, round caps and joins,
`currentColor`, class `.ic` (1em square, `vertical-align: -.14em`). Names: cross, store, db, globe, clock,
history, search, doc, shield, link, pin, map, chart, lock, unlock, user, users, car, walk, bus, calendar,
filter, cpu, hash, layers, alert, eye, check, x, building, landmark, star, msg, phone, code, sparkle,
target, ruler, grid, gear, book, box, scale, split, merge, refresh. Icons label nodes in diagrams
(70 px in the chain, 38 px for the filter, 30 px in the search bar); never decorate a heading with one.

Logo: `img/logo.svg` (paper) / `img/logo-dark.svg` (ink), the "Echo" mark (solid disc + offset ring of
equal radius), 92 px on the title slide, 40 px `.deck-logo.sm` elsewhere.
