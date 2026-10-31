# 05 · Figures: maps, charts, equations, tables

Every figure in the deck is drawn live from data or as a schematic in SVG, styled with the colour tokens,
and revealed by builds. No chart library; no screenshots of charts. The only raster images of data are
figures from papers and the talk's own primary images (micrographs, specimen photographs, scans). Figures
from papers are credited with their licence; the talk's own images name their source (§8).

Slide numbers below ("slide 17", "S14") name slides of the reference deck, a geography thesis defense whose
engine and source live in `docs/defense` (catalogue in 07). Its content appears only in labelled examples;
the values, classes and APIs are the design system.

## 0. Every figure reads without the speaker

A listener who looks up in the middle of a sentence reads the figure alone: what is shown, in which unit, at
which scale, and what each colour and mark means. A figure without its furniture is unfinished.

| Figure | Required furniture | In this system |
|---|---|---|
| Map | north arrow, scale bar, legend | `Deck.mapFurniture(svg)` draws the arrow and the bar; `.map-lg` is the legend (§2) |
| Plot (bars, histogram, score line, dot strip) | axis titles with units; a legend or key for every colour or mark that carries meaning | axis titles 600 18 px Inter, the y title rotated (§4 Histogram); key in 17 px below the marks (§4 Dot strips) |
| Image of a specimen or sample (micrograph, photograph, scan) | scale bar with its unit | in the image file, or drawn over it in the map bar's style (§2 Map furniture); the engine has no helper for images |
| Schematic, not to scale | no scale bar; the source line says "Diagram schematic" | §3 |
| Count table (2 × 2, matrix) | a title for the rows and a title for the columns, naming both classifications | §4 |
| Table | a row axis title (what each row is) and a column axis title (what the columns measure); units and denominators in the header | §7 |
| Equation | every symbol defined in words on the slide | §6 |
| Rate or percentage | the formula in words and numbers at first use, pinned on later slides that report it as a percentage | §5 |
| Proportional areas (Venn) | the source line says "Areas proportional to counts." | §4 |
| Figure from a paper | caption with what it shows, author, year, figure number and licence | §8 |

Rules for every figure:

1. **Swatches equal marks.** A legend swatch uses the same token, tint and dash as the marks it explains.
2. **Labels in plain words.** Legends, axis titles and keys use the words the audience uses, never variable
   names, codes or abbreviations the slide has not glossed (01 §3).
3. **Colour by role.** Categorical meaning is carried by the semantic tokens, each with one role per talk:
   `--wf` source or condition A (blue), `--bd` source or condition B (amber), `--sp` space, context or
   setting (cyan), `--ai` method, model or instrument (purple), `--ok` yes or agreement (green), `--no` no
   or error (red). The talk fixes its mapping once and keeps it on every figure. Neutral emphasis is `--tx`
   or `--acc`; sequential greys are `--tx` tints; empty regions are `--fill` (02 §2).
   Example (reference deck, a geography thesis): `--wf` my list, `--bd` the state list, `--sp` the map,
   `--ai` the model. Example (illustrative, a clinical trial): `--wf` treatment arm, `--bd` control arm,
   `--sp` study sites, `--ai` the assay.
4. **Numbers on a figure follow 01 §4**: one or two rounded numbers called out, shares as fractions with a
   "So:" line, big counts as plain numbers, percentages only with their formula (§5).
5. **A source line** (`.src`) on every content slide, figure slides included, names the data and where it
   comes from (01 §7).

### Picking the figure

| Claim | Figure | Section |
|---|---|---|
| Two sources or conditions overlap by this much | proportional Venn | §4 |
| Two yes/no classifications agree or disagree | 2 × 2 count table | §4 |
| A handful of records fall into these groups | unit rows or bars | §4 |
| Records survive each step of a filter | horizontal bars with a funnel cut | §4 |
| A value is distributed like this | histogram | §4 |
| Cases fall either side of a threshold | score line | §4 |
| Records are paired one to one | assignment matrix | §4 |
| The result differs from place to place | map | §1–2 |
| How a measurement, process or search works | schematic | §3 |
| A rate | formula in words and numbers | §5 |
| A score or model | equation walk-through | §6 |
| Several settings or results side by side | table | §7 |
| What earlier work showed | figure from the paper | §8 |

## 1. Maps: data

Sections 1 and 2 are for talks with maps: geography, ecology, epidemiology, earth science, history,
planning. The map module draws one layer of polygon units from one data file. The engine calls the units
`tracts`, whatever they are (census tracts, counties, survey plots, watersheds, parishes).

What the engine reads: `tracts[].d` (each outline; their extent sets the viewBox), `metersPerUnit` (the
scale bar), `water`, `counties` (a boundary layer, drawn as `path.county`), and `supply` / `target` (study
frames, drawn with `frames: true`). Coordinates are projected, y down, north up. Every other field is the
talk's own data, read by its demos. Ship only what the slides draw.

Example (reference deck, a geography thesis): `js/mapdata.js`, built by `tools/build_map_data.py` from the
thesis outputs; it holds outlines and per-unit results, no pharmacy coordinates.

```js
window.MAPDATA = { w: 1000, h: 1102.8, metersPerUnit: 84.163,            // EPSG:26915, y down, north up
  tracts: [{ g: "27053000101", d: "M439.8,473.1L…Z", p: [449.9, 480.7],  // GEOID, outline, internal point
             c: "053", iq: 2, nq: 4,                                     // county; income and non-White quartile 1–4
             wm: 1.1404, bm: 1.1525, dm: -0.0121,                        // nearest pharmacy, miles: my list, state list, gap
             s: ["BB", "BB", "BW"] }, … 327],                            // state at ½, 1, 2 mi
  counties: { "123": d, "053": d }, target: d, supply: d, water: d };
```

Reference states: `BW` both lists have a pharmacy within the radius · `BB` neither · `WO` only my list · `BO` only the
state list. 1 mile = 19.12 map units. `js/tractattrs.js` holds ACS attributes per GEOID
(`{inc, nw, pop, hh, iq, nq}`).

Example (illustrative, ecology): the units are survey plots; `s` holds each plot's state under three
detection thresholds; habitat attributes sit in a second file keyed by plot ID, the way `js/tractattrs.js`
is keyed by GEOID.

## 2. Drawing a map

Skeleton from the reference deck (`st-…` classes are its per-unit states, `dis(t)` its test for a unit
where the two sources disagree):

```js
Deck.demo('mymap', {
  init(s) {
    const root = $('.my-map svg', s);
    s._p = Deck.drawMap(root, { counties: false }).tracts;          // water + one path.tr per tract
    s._p.forEach(({ t, p }) => { p.classList.add('st-' + t.s[1]); if (dis(t)) root.appendChild(p); }); // outlines on top
  },
  step(s, n) { s.classList.toggle('my-on', n >= 1); Deck.mapFurniture($('.my-map svg', s)); },
});
```

`Deck.drawMap(root, {box, pad = 14, water = true, frames = false, counties = true})` sets the viewBox to the
extent of the unit outlines plus `pad` (`235.3 324.2 532.3 513.8` at pad 14 for the reference data),
`preserveAspectRatio="xMidYMid meet"`, and draws in order: `path.water`, optionally `path.supply` and
`path.target`, a `<g>` of `path.tr`, optionally `path.county`. It returns `{tracts: [{t, p}], supply, target}`.

Rules:

1. **Change state with classes, never redraw.** `path.tr` has `transition: fill .7s var(--ease), opacity .7s`,
   so swapping a class animates the map.
2. **Put emphasised units on top** (`root.appendChild(p)`): a 3.2 px outline drawn under its neighbours
   loses half its stroke.
3. **All map strokes are screen pixels** (`vector-effect: non-scaling-stroke`), so a map keeps the same line
   weight at any size or zoom.
4. **Call `Deck.mapFurniture(svg)` in every `step()`** and after any viewBox change.

### Map box

```html
<div class="map r3 my-map e"><svg></svg>
  <div class="map-lg"><span><i style="--c:var(--wf)"></i>only my list</span> …</div>
  <div class="lg-btns lg rm-ctl" data-lg-scale="34"><button data-t="0">½ mile</button> …</div>
</div>
```

(Legend and button labels from the reference deck.)

```css
.map  { overflow: hidden; border-radius: 28px; }
.r3, .rmap { position: relative; height: 100%; background: rgba(255,255,255,.02); box-shadow: inset 0 0 0 1px var(--line); }
.r3 path.tr { stroke: color-mix(in srgb, var(--bg0) 55%, transparent); stroke-width: .6; }
```

The map box is the one bordered surface on a map slide: a 1 px inset hairline and a 28 px radius frame the
map, nothing else. Typical size: 968 × 650–717 px in a `.g-64` grid beside a 624 px text column.
The units sit centred; letterbox space left and right is normal.

### Map furniture (required on every map)

`Deck.mapFurniture(svgRoot)` draws a north arrow and a scale bar at the bottom-right corner, 44 px from the
right edge and 40 px from the bottom edge of the SVG box, at constant screen size:

- the scale length is the value in `¼ ½ 1 2 5 10 20` miles closest (in log ratio) to a fifth of the visible
  width; label "0" at the start and "10 mi" at the end, Inter 600 15 px with a `--bg0` halo;
- the bar is two halves, 7 px tall: `--tx` filled and `--bg0` filled, both outlined 1.2 px `--tx`;
- the arrow is an 18 × 28 px notched arrowhead in `--tx` with a 1 px `--bg0` edge, "N" (Inter 750 16 px) above it;
- a `ResizeObserver` redraws it when the map changes size.

Units: the reference implementation measures in miles only (1 mile = `1609.344 / metersPerUnit` map units,
labelled "mi"); it has no unit option. The bar reads in the same unit as the talk's text, so a talk in
another unit edits that constant and label in `Deck.mapFurniture`.

A schematic drawing that is not to scale gets no scale bar; its source line says "Diagram schematic"
(reference: slide 17).

### Legend

```css
.map-lg { position: absolute; left: 22px; bottom: 18px; display: flex; flex-wrap: wrap; gap: 8px 18px; max-width: 70%;
          padding: 10px 14px; border-radius: 12px; background: color-mix(in srgb, var(--bg0) 70%, transparent);
          font: 500 16px var(--f-sans); color: var(--tx2); }
.map-lg i { width: 14px; height: 14px; border-radius: 4px; background: var(--c); box-shadow: inset 0 0 0 1px var(--line2); }
```

Bottom-left inside the map, clear of the scale bar (`max-width: 60%` where the bar is wide). Swatch colour
per item by inline `--c`. Outline swatch: `--c: transparent; box-shadow: inset 0 0 0 2px var(--wf)`. Labels
are plain words the audience would use; when the map shading changes, swap legend groups (`.lg-a` / `.lg-b`,
shown with `:not(.inc)`) at the same click. The swatch colour must equal the map fill.

Example (reference deck): "only my list", "both lists", "lowest-income quarter". Its slide 18 breaks the
swatch rule ("neither list" swatch `--fill2` against `--fill` tracts; 08, item 15); do not copy that.
Example (illustrative, epidemiology): "above the case threshold", "no data".

### Map palettes

| Encoding | Classes | Fill |
|---|---|---|
| Categorical answer from two sources (reference: which list has a pharmacy within the radius) | `st-WO` `st-BO` `st-BW` `st-BB` | `--wf` · `--bd` · `--tx` 26 % · `--fill` |
| Difference between the sources (sequential, one hue; reference bins in miles) | `gp0` (< 0.1 mi) `gp1` (0.1–0.25) `gp2` (> 0.25) | `--tx` 12 % · `--sp` 38 % · `--sp` 82 % |
| Context variable by quartile (sequential grey; reference: income or non-White share) | `q1`–`q4` | `--tx` 8 / 20 / 36 / 56 % (more `--tx` = higher quartile: on the dark ink theme lighter = higher, on paper darker = higher) |
| Units where the sources disagree | `dwo` / `dbo` (stroke on slide 19 and S19; solid fill on S20) or `dis` | 3.2 px `--wf` / `--bd` outline (S20: `--wf` / `--bd` fill), or a 3.2 px `--sp` outline |
| Opening unit (the running example) | `.me` | hook `--sp` 30 % + 2.5 px `--sp` stroke · study area `--sp` 55 % + 2 px · closing map solid `--sp` with a 2.5 px white outline, a 3 px `--sp` ring and a haloed label |
| Study frames | `path.target` / `path.supply` | `--wf` 9 % fill + 2.2 px `--wf` stroke / no fill, 2.2 px `--sp`, dash 8 6 |
| Water | `path.water` | `--wf` 18 % |
| Boundary line (reference: county) | `path.county` | 1.2 px `--tx3`, dash 3 5 |

Map fills are tokens, either solid (`st-WO` `--wf`, `st-BO` `--bd`, `st-BB` `--fill`, the closing map's unit
`--sp`) or `color-mix(in srgb, <token> N%, transparent)` tints, so the theme switch flips them (the
reference deck's hook, study-area and closing-map base tracts are hard-coded white rgba; see 08). Two
encodings can share a map when one is fill and the other is outline (reference slide 19: gap or income as
fill, 1-mile disagreement as coloured outline throughout).

### Map controls

`.lg-btns.lg` glass pill at the map's top-right (`top: 22px; right: 22px; z-index: 4`), buttons 600 18 px,
padding 11 × 20, active button inverted (`--tx` background, `--bg0` text). The buttons switch the setting
the map depends on (reference: the ½, 1 and 2 mile thresholds; elsewhere a year, a scenario or a model).
One `paint(k)` function serves both the buttons and `step(n)`; every number and label that depends on the
setting carries a hook class (`.rm-thr`, `.rm-wo` …) and is rewritten by `paint`, together with the `.tswap`
title and the "So:" line. Clicking a button never advances the slide.

### The opening map (reference: slide 2, demo `hook`)

The running example's unit over a dimmed aerial photo: the map plate (`.hook-map`, `rgba(var(--scrim), .55)`,
deep shadow `0 40px 80px -40px rgba(0,0,0,.8)`, 1 px inset line) fades and scales in (.96 → 1, 1.4 s) while
the photo fades out (1.2 s); at the same click the viewBox zooms from the region to the unit
(`tween(1800, …, easeInOut)`).
Dashed outer ring (1.5 px `--tx3`, dash 6 7), solid inner ring (3 px `--sp`, 8 % fill), white dot for the
unit's internal point, and two distance lines (4 px, round caps) to a `--wf` and a `--bd` marker.
The answers stand beside it: the source name in caps (`.ha-src`, 17 px, coloured), the measured value as a
96 px number with a small unit, and Yes / No in 40 px `--ok` / `--no`.

Example (reference deck): one census tract with rings at 1 mile and ½ mile, markers for the nearest
pharmacy on each list, and "0.32 mi Yes" beside "0.70 mi No".

## 3. Schematic diagrams (SVG, not to scale)

Drawings that show how a measurement, a process or a search works. Each source line says "Diagram
schematic". The reference deck's five, by kind:

- **Measurement diagram** (reference: the ruler, slide 17): `viewBox="-360 -300 720 600"`, 200 units per
  mile; 40-unit grid in `--line`; the unit as a hexagon (`--sp` 14 % fill, 2 px stroke); dashed outer and
  solid inner rings (reference: 1 mile and ½ mile); two distance lines with `--wf` / `--bd` round markers
  carrying a white plus; labels 650 20 px with a 7 px `--bg0` halo (`paint-order: stroke`). Builds: grid →
  lines → inner ring.
- **Process drawing** (reference: the chain, slide 5): `.g-svg` 1180 px wide; connecting strokes as 12 px /
  5 px `--line2` round strokes and shapes `--fill2` with 2 px `--line2` (reference: roads and buildings); a
  pin that drops in, an offset line that draws, a label that fades (sequenced 0.3 / 1.1 / 1.9 s; reference:
  a geocoded point landing beside its building).
- **Sampling or search grid** (reference: the search grid, slide 10): seeded random polygon (`--wf` 12 %,
  2.5 px stroke; reference: a ZIP code area); quadtree cells (`--sp` 16 % searched, `--no` 30 % capped,
  .2 opacity skipped) with mono counts.
- **Timeline** (reference: the archive timeline, slide 11): years on a mono axis every 5 years, event ticks
  (reference: archive captures), triangular lookup markers in `--ai`, curved links to the nearest event,
  outcome text at the row end, a dashed cutoff line.
- **Overlapping fields** (reference: three fields, slide 3): three overlapping circles (`.gq-c`: `--c` 13 %
  fill, 2.5 px `--c` stroke), field name 28 px 680 in `--c`, question 22 px `--tx2`, sources 17 px `--tx3`,
  the talk's own label 30 px 750 at the intersection. Example (reference deck): health geography `--sp`,
  GIScience `--bd`, GeoAI `--ai`, "This thesis" in the middle. Example (illustrative, a linguistics talk):
  phonetics, sociolinguistics, speech technology.

Text inside SVG uses `font-family: var(--f-sans)` and `fill` tokens; labels that cross shapes get a halo
(`paint-order: stroke; stroke: var(--bg0); stroke-width: 5–10px; stroke-linejoin: round`).

## 4. Charts

### Proportional Venn (reference: slide 15)

Two sets with areas proportional to counts: `R(n) = √(n·A/π)` with the largest set at radius 300; the centre
distance is solved (bisection, 60 iterations) so the lens area equals the overlap count. Set A `--wf` 22 %
fill + 3 px stroke, set B `--bd` 28 % + 3 px drawn on top; set labels outside the circles in their colour
("Name · count"); the overlap count in the lens, 680 50 px display. When the counts change the circles
re-place in `tween(1300, …, easeInOut)`; the set whose count stays fixed keeps its circle still. The source
line says "Areas proportional to counts."

Example (reference deck): "My list · 413" and "State list · 178"; the state-list circle never moves while
the other circle shrinks click by click from 1,748 candidates to 413 listings to 272 addresses.

### Two-by-two count tables

Two flavours, both with a row title and a column title that name the two classifications:

- `.km` (reference: slide 13): `grid-template-columns: 240px 1fr 1fr; gap: 14px`; column heads 650 17 px
  caps `--tx2`, row heads 600 23 px; cells 150 px tall, radius 22, `--fill`, 650 66 px numbers. A cell
  lights at its click with `data-lit`: 18 % `--ok` fill + 3 px inset `--ok` ring (or 16 % `--no` fill + 3 px
  `--no` ring). The lit number is explained beside the table in a `.km-b` block: the same number at 66 px in
  the same colour, a caption, examples.
  Example (reference deck): columns "model includes / model excludes", rows "has a keyword / no keyword".
  Example (illustrative, diagnostics): columns "test positive / test negative", rows "disease present /
  disease absent".
- `.dx` (reference: slides 17–18): `170px 1fr 1fr`, gap 10, cells 92 px, radius 16, 650 44 px; the two
  disagreement cells tinted `--wf` 22 % / `--bd` 20 % with a 2.5 px inset ring in the same colour. The
  setting word in the heads updates with the setting buttons (§2 Map controls). `.dx-words` replaces
  numbers with words.
  Example (reference deck): column heads "My list: pharmacy within ½ mi", row heads "State list: none
  within ½ mi", words "Both lists / agree".

### Unit rows and bars (reference: slide 16)

`.mg2`: count (58–76 px, right-aligned, `--c`) | one 32–44 px dot per record (gap 10–12) | label under
the dots. Bar variant `.bar` = 6 px per unit, 32 px tall, radius 16. Shades of one colour separate
subgroups: `color-mix(in oklab, var(--bd) 50%, var(--tx3))` for a secondary subgroup, `--tx3` for the rest
(reference: "retail" and "other").

### Dot strips (reference: S20)

`.sx-dots`: 17 px circles, gap 7, wrapping at 610 px, one per record or unit, coloured by class (`.wo` `--wf`, `.bo`
`--bd`); at the click (`.sx-placed` on the slide) the `.fix` dots become hollow rings
(`inset 0 0 0 2px --tx3`) and the `.add` dots fade in. Key below in 17 px.

Example (reference deck): one dot per tract where the lists disagree; placing records that lacked
coordinates resolves some (hollow rings) and adds a few (fade in).

### Horizontal bars (reference: S4, S7)

64 px (S4) or 52 px (S7) bars, radius 12–14, `width: calc(var(--v) * 1%)`; the S4 bars grow with `barIn 1.3s`
(scaleX 0 → 1 from the left) on every entry, the S7 bars are static; value as a 60–66 px number beside the
bar, label 21–22 px. A funnel cut is an indented row with a dashed `--bd` left rule and the removed count in
red (reference: "−67").

### Histogram (reference: S14, canvas)

`<canvas width=1000 height=470>` drawn with colours read from CSS variables at draw time; bars `--fill2`,
x ticks every 5 in 18 px mono, axis titles in 600 18 px Inter with units, the y title rotated; no axis
lines; marked bins recoloured `--bd` / `--tx` with 2 px marker lines and 650 19 px labels at the click.
Redraw in `theme()`.

Example (reference deck): x "errors on the 270 hand-read pairs", y "number of settings".

### Score line (reference: S12)

A 0–100 axis (`X = 40 + 15.8·v`, y 70) with the below-threshold zone in `--no` 10 %, ticks 17 px mono, the
threshold as a 3 px `--tx` tick labelled with its value over the word "threshold" (reference: "60 /
threshold"), a dashed ceiling marker, and each case as an r 14 dot in `--ok` / `--no` labelled in its colour.

### Assignment matrix (reference: S16)

3 × 3 grid of 130 px score cells (radius 22, 650 54 px); headers coloured by source (columns `--bd`, rows
`--wf`); below-threshold cells struck through diagonally and faded; the greedy picks ringed 4 px `--no`
with row/column strike bars growing in (.45 s), the optimal set ringed `--ok`; the caption names the axes.

Example (reference deck): "rows: list records · columns: Board records · cell: score S".

## 5. Rates: the formula at first use

A percentage appears only for a rate whose formula is on screen. At first use `Deck_afx` writes the formula
out, words first, then numbers; on later slides `Deck_pin` keeps it in the top-right corner. Without a
formula, state the share as a fraction (01 §4).

Example (reference deck):

```js
${Deck_afx({ k: 'recall', id: 'eur', n: '161', d: '178', v: '90%' })}   // first appearance
${Deck_pin('recall', 'precision')}                                     // later slides: top-right corner
```

Registry in `js/v2-fx.js`: one entry per rate the talk reports, `{ name, c, top, bot }` (name, colour, words
for the numerator and the denominator). A call passes the key `k` and the numbers `n`, `d`, `v`; a registry
field passed in the call overrides the entry. Each rate's colour follows its role (§0).

Example (reference deck registry): recall "Found (recall)" `--bd`; precision "Matched (precision)" `--wf`;
disc "Disagreement" `--sp`; archive `--ai`; closer `--wf`; near "Nearly equal" `--sp`; addr `--ok`; off `--no`.
Example (illustrative, diagnostics): name "Found (sensitivity)", numerator "patients with the disease who
test positive", denominator "all patients with the disease".

Rendered as: name (700 26 px, the rate's colour, right-aligned) `=` word fraction (500 21 px, 2 px bar) on
the first row; `=` number fraction (STIX 500 38 px) `=` value (64 px, the rate's colour) on the second.
`=` signs are STIX 36 px `--tx3`. Passing `id` gives every part a class (`eur-n`, `eur-v` …) so a demo can
rewrite the numbers per step. The pin: frosted pill at top 24 / right 128 (`--bg0` 72 %, blur 10 px, 1 px
`--line`, radius 16), name 700 14 px caps in the rate colour, word fraction 17 px.

## 6. Equations (STIX Two Text)

An equation appears only with every symbol defined in words on the slide, one definition per click.

Example (reference deck, the pair score, Equation 3.1):

```html
<div class="eq big e" data-hl="">
  <span class="t" data-k="S"><i>S</i><sub>ij</sub></span><span class="op">=</span>
  <span class="t" data-k="z"><i>z</i><sub>ij</sub></span>
  <span class="fr"><span><span class="t" data-k="N"><i>N</i><sub>ij</sub></span><span class="op">+</span>
     <span class="t" data-k="w">1.2</span><span class="t" data-k="A"><i>A</i><sub>ij</sub></span></span>
     <span><span class="t" data-k="w">2.2</span></span></span>
  <span class="eqno">(3.1)</span>
</div>
```

- `.eq`: STIX Two Text, flex row, `line-height 1.1`, lining numerals; sizes `.big` 112 px, `.sm` 58 px,
  `.md` 44 px. Operators in `<span class="op">` (margin .28em) because flex collapses spaces.
- Variables italic; subscripts `.58em`, lowered .32em; fractions as an inline flex column with a
  `.045em currentColor` bar; function names (`.fn`) in mono .62em; bracketed conditions (`.brk`) as a small
  Inter pill on `--fill2`; piecewise brace `.pw` (a 2.3em "{" squeezed to 60 % width).
- Term-by-term explanation: `data-hl` on the equation names the term in focus; that term takes its role
  colour and every other term drops to opacity .42 (.5 s); operators stay full. Under the equation, one
  definition per click cross-fades in the same place (`.defs` 200 px tall, each `.def` absolute with
  `data-s=n data-x=n+1 data-a="fade"`). The last step shows the whole equation uncoloured.
  Example (reference deck): N `--wf`, A `--bd`, z `--sp`, weights `--ai`.
- Equation number `(3.1)` at the right edge, Inter .38em `--tx3`, matching the numbering in the written
  document the talk presents (thesis, paper, report).
- Inline maths in prose: `.mth` (STIX 1.08em, Inter subscript .62em).
- The bundled STIX subset lacks `≥` (falls back to Cambria Math); keep that in mind when adding symbols.

## 7. Tables

Example (reference deck, a supplement table):

```html
<div class="bk-tbl e">
  <div class="h"><span>Setting (w, h, z, T)</span><span>links · false · missed</span></div>
  <div><span><b>Selected</b> (1.2, 90, 0.90, 60)</span><b>161 · 0 · 1</b></div>
</div>
```

Each row is its own grid (`1fr auto`, gap 30, padding 15 0, 1 px `--line` top rule, 21 px `--tx2`); values
in `<b>` (`--tx`, tabular numerals) sit flush right. Header row: 650 14 px caps `--tx3`, no rule; the first
header cell names what the rows are, the others name the columns. No zebra stripes, no vertical rules, no
outer border. Variants: `.wide` (4 columns `1.6fr 1fr 1fr 1fr`), `.c3` (`1.6fr .8fr 1fr`, 18 px), `.kw-sm`
(17 px, 6 px padding). Units and denominators go in the header ("yes / all"); several values in a cell are
joined with " · "; "n (p%)" with two decimals; "—" for not applicable; "†" notes resolved in `.src`.

### Literature map (reference: slide 6)

Talk-slide tables follow the same idea. The literature map places prior studies on a grid of two
questions: a caps column title centred over the columns in `--acc`, and a caps row title bottom-aligned in
the first column; column heads 650 25 px with a 17 px `--tx3` gloss and a 2 px `--line2` rule; row heads
650 24 px with a gloss; cells hold "Author Year" (600 23 px) with a 15 px gloss of what that study used; a
study that spans two columns gets a 2 px rule under its name across both. The empty cell the talk fills
carries a note first and then the talk's own label in `--ai` 750 30 px.

Example (reference deck): column title "WHERE THE LIST OF PHARMACIES CAME FROM →", row title "WHAT THE
STUDY DID WITH THE LIST ↓", the empty cell "No study tested this" then "● This thesis". Example
(illustrative, education research): columns by data source (surveys, school records, classroom
observation), rows by what the study did with it.

## 8. Figures from papers

Example (reference deck):

```html
<figure class="e" style="margin:0">
  <div class="gx-fig"><img src="${Deck_photo('lit-etheredge2024-fig2')}" alt="…"></div>
  <figcaption class="gx-cap">What it shows. Etheredge et al. 2024, Fig. 2 (CC BY).</figcaption>
</figure>
```

Image at column width, no frame; caption 16 px/1.4 `--tx2` with what it shows, author, year, figure number
and licence. A published figure drawn for a white page sits on a white plate (`background: #fff`, radius 14)
so the paper's own colours read correctly (reference: the published pharmacy-desert map on slide 5). Files:
`img/lit-<author><year>-fig<n>.jpg`; `Deck_photo(id)` resolves to `img/<id>.jpg`. Only figures from works in
the reference list of the document the talk presents, checked in the paper itself.

The talk's own images (micrographs, specimen photographs, scans) use the same markup: column width, no
frame, a caption saying what the image shows and where it comes from, and, for a specimen or sample, a
scale bar with its unit (§0).
