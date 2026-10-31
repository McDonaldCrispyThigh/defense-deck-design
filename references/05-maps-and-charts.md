# 05 · Maps, charts, equations, tables

Every figure in the deck is drawn live from data or from a schematic in SVG, styled with the colour tokens,
and revealed by builds. No chart library; no screenshots of charts; figures from papers are the only images
of data, and they are credited with their licence.

## 1. Map data

`js/mapdata.js` (built by `tools/build_map_data.py` from the RQ3 outputs; no pharmacy coordinates):

```js
window.MAPDATA = { w: 1000, h: 1102.8, metersPerUnit: 84.163,            // EPSG:26915, y down, north up
  tracts: [{ g: "27053000101", d: "M439.8,473.1L…Z", p: [449.9, 480.7],  // GEOID, outline, internal point
             c: "053", iq: 2, nq: 4,                                     // county; income and non-White quartile 1–4
             wm: 1.1404, bm: 1.1525, dm: -0.0121,                        // nearest pharmacy, miles: my list, state list, gap
             s: ["BB", "BB", "BW"] }, … 327],                            // state at ½, 1, 2 mi
  counties: { "123": d, "053": d }, target: d, supply: d, water: d };
```

States: `BW` both lists have a pharmacy within the radius · `BB` neither · `WO` only my list · `BO` only the
state list. 1 mile = 19.12 map units. `js/tractattrs.js` holds ACS attributes per GEOID
(`{inc, nw, pop, hh, iq, nq}`).

## 2. Drawing a map

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
tract extent plus `pad` (`235.3 324.2 532.3 513.8` at pad 14), `preserveAspectRatio="xMidYMid meet"`, and
draws in order: `path.water`, optionally `path.supply` and `path.target`, a `<g>` of `path.tr`, optionally
`path.county`. It returns `{tracts: [{t, p}], supply, target}`.

Rules from the deck:

1. **Change state with classes, never redraw.** `path.tr` has `transition: fill .7s var(--ease), opacity .7s`,
   so swapping a class animates the map.
2. **Put emphasised tracts on top** (`root.appendChild(p)`): a 3.2 px outline drawn under its neighbours
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

```css
.map  { overflow: hidden; border-radius: 28px; }
.r3, .rmap { position: relative; height: 100%; background: rgba(255,255,255,.02); box-shadow: inset 0 0 0 1px var(--line); }
.r3 path.tr { stroke: color-mix(in srgb, var(--bg0) 55%, transparent); stroke-width: .6; }
```

The map box is the one bordered surface on a map slide: a 1 px inset hairline and a 28 px radius frame the
geography, nothing else. Typical size: 968 × 650–717 px in a `.g-64` grid beside a 624 px text column.
The tracts sit centred; letterbox space left and right is normal.

### Map furniture (required on every map)

`Deck.mapFurniture(svgRoot)` draws a north arrow and a scale bar at the bottom-right corner, 44 px from the
right edge and 40 px from the bottom edge of the SVG box, at constant screen size:

- the scale length is the value in `¼ ½ 1 2 5 10 20` miles closest (in log ratio) to a fifth of the visible
  width; label "0" at the start and "10 mi" at the end, Inter 600 15 px with a `--bg0` halo;
- the bar is two halves, 7 px tall: `--tx` filled and `--bg0` filled, both outlined 1.2 px `--tx`;
- the arrow is an 18 × 28 px notched arrowhead in `--tx` with a 1 px `--bg0` edge, "N" (Inter 750 16 px) above it;
- a `ResizeObserver` redraws it when the map changes size.

A schematic drawing that is not to scale gets no scale bar; its source line says "Diagram schematic" (slide 17).

### Legend

```css
.map-lg { position: absolute; left: 22px; bottom: 18px; display: flex; flex-wrap: wrap; gap: 8px 18px; max-width: 70%;
          padding: 10px 14px; border-radius: 12px; background: color-mix(in srgb, var(--bg0) 70%, transparent);
          font: 500 16px var(--f-sans); color: var(--tx2); }
.map-lg i { width: 14px; height: 14px; border-radius: 4px; background: var(--c); box-shadow: inset 0 0 0 1px var(--line2); }
```

Bottom-left inside the map, clear of the scale bar (`max-width: 60%` where the bar is wide). Swatch colour
per item by inline `--c`. Outline swatch: `--c: transparent; box-shadow: inset 0 0 0 2px var(--wf)`. Labels
are plain words a resident would use ("only my list", "both lists", "lowest-income quarter"); when the map
shading changes, swap legend groups (`.lg-a` / `.lg-b`, shown with `:not(.inc)`) at the same click.
The swatch colour must equal the map fill (slide 18's "neither list" swatch is `--fill2` against `--fill`
tracts; do not copy that).

### Map palettes

| Encoding | Classes | Fill |
|---|---|---|
| Two-list answer (categorical) | `st-WO` `st-BO` `st-BW` `st-BB` | `--wf` · `--bd` · `--tx` 26 % · `--fill` |
| Distance gap (sequential, one hue) | `gp0` (< 0.1 mi) `gp1` (0.1–0.25) `gp2` (> 0.25) | `--tx` 12 % · `--sp` 38 % · `--sp` 82 % |
| Income or non-White quartile (sequential grey) | `q1`–`q4` | `--tx` 8 / 20 / 36 / 56 % (more `--tx` = higher quartile: on the dark ink theme lighter = higher income, on paper darker = higher) |
| Tracts that disagree | `dwo` / `dbo` (stroke on slide 19 and S19; solid fill on S20) or `dis` | 3.2 px `--wf` / `--bd` outline (S20: `--wf` / `--bd` fill), or a 3.2 px `--sp` outline |
| Opening tract | `.me` | hook `--sp` 30 % + 2.5 px `--sp` stroke · study area `--sp` 55 % + 2 px · closing map solid `--sp` with a 2.5 px white outline, a 3 px `--sp` ring and a haloed label |
| Study frames | `path.target` / `path.supply` | `--wf` 9 % fill + 2.2 px `--wf` stroke / no fill, 2.2 px `--sp`, dash 8 6 |
| Water | `path.water` | `--wf` 18 % |
| County line | `path.county` | 1.2 px `--tx3`, dash 3 5 |

Map fills are tokens, either solid (`st-WO` `--wf`, `st-BO` `--bd`, `st-BB` `--fill`, the closing map's tract
`--sp`) or `color-mix(in srgb, <token> N%, transparent)` tints, so the theme switch flips them (the hook,
study-area and closing-map base tracts are hard-coded white rgba; see 08). Two encodings
can share a map when one is fill and the other is outline (slide 19: gap or income as fill, 1-mile
disagreement as coloured outline throughout).

### Map controls

`.lg-btns.lg` glass pill at the map's top-right (`top: 22px; right: 22px; z-index: 4`), buttons 600 18 px,
padding 11 × 20, active button inverted (`--tx` background, `--bg0` text). One `paint(k)` function serves
both the buttons and `step(n)`; every number and label that depends on the threshold carries a hook class
(`.rm-thr`, `.rm-wo` …) and is rewritten by `paint`, together with the `.tswap` title and the "So:" line.
Clicking a button never advances the slide.

### The hook map (slide 2)

The opening tract over a dimmed aerial photo: the map card (`.hook-map`, `rgba(var(--scrim), .55)`, deep
shadow `0 40px 80px -40px rgba(0,0,0,.8)`, 1 px inset line) fades and scales in (.96 → 1, 1.4 s) while the
photo fades out (1.2 s); at the same click the viewBox zooms from the region to the tract
(`tween(1800, …, easeInOut)`).
Dashed 1-mile ring (1.5 px `--tx3`, dash 6 7), solid ½-mile ring (3 px `--sp`, 8 % fill), white dot for the
tract's internal point, and two distance lines (4 px, round caps) to a `--wf` and a `--bd` pharmacy marker.
The answers stand beside it: list name in caps (`.ha-src`, 17 px, coloured), the distance as a 96 px number
with a small "mi", and Yes / No in 40 px `--ok` / `--no`.

## 3. Schematic diagrams (SVG, not to scale)

- **Ruler** (slide 17): `viewBox="-360 -300 720 600"`, 200 units per mile; 40-unit grid in `--line`; tract
  hexagon (`--sp` 14 % fill, 2 px stroke); dashed 1-mile and solid ½-mile rings; two distance lines with
  `--wf` / `--bd` round markers carrying a white plus; labels 650 20 px with a 7 px `--bg0` halo
  (`paint-order: stroke`). Builds: grid → lines → ½-mile ring.
- **Chain drawings** (slide 5): `.g-svg` 1180 px wide; roads as 12 px / 5 px `--line2` round strokes,
  buildings `--fill2` with 2 px `--line2`; a geocoding pin that drops in, an offset line that draws, a label
  that fades (sequenced 0.3 / 1.1 / 1.9 s).
- **Search grid** (slide 10): seeded random ZIP polygon (`--wf` 12 %, 2.5 px stroke); quadtree cells
  (`--sp` 16 % searched, `--no` 30 % capped, .2 opacity skipped) with mono counts.
- **Archive timeline** (slide 11): years on a mono axis every 5 years, capture ticks, triangular lookup
  markers in `--ai`, curved links to the nearest capture, outcome text at the row end, a dashed cutoff line.
- **Three fields** (slide 3): three overlapping circles (`.gq-c`: `--c` 13 % fill, 2.5 px `--c` stroke),
  field name 28 px 680 in `--c`, question 22 px `--tx2`, sources 17 px `--tx3`, "This thesis" 30 px 750 at the
  intersection. Health geography `--sp`, GIScience `--bd`, GeoAI `--ai`.

Text inside SVG uses `font-family: var(--f-sans)` and `fill` tokens; labels that cross shapes get a halo
(`paint-order: stroke; stroke: var(--bg0); stroke-width: 5–10px; stroke-linejoin: round`).

## 4. Charts

### Proportional Venn (slide 15)

Areas proportional to counts: `R(n) = √(n·A/π)` with the largest set at radius 300; the centre distance is
solved (bisection, 60 iterations) so the lens area equals the overlap count. My list `--wf` 22 % fill + 3 px
stroke, state list `--bd` 28 % + 3 px drawn on top; set labels outside the circles in their colour
("My list · 413", "State list · 178"); the overlap count in the lens, 680 50 px display. When the counts
change the circles re-place in `tween(1300, …, easeInOut)`; the state-list circle never moves. The source
line says "Areas proportional to counts."

### Two-by-two count tables

Two flavours, both with row and column titles:

- `.km` (slide 13): `grid-template-columns: 240px 1fr 1fr; gap: 14px`; column heads 650 17 px caps
  `--tx2` ("model includes / model excludes"), row heads 600 23 px ("has a keyword / no keyword");
  cells 150 px tall, radius 22, `--fill`, 650 66 px numbers. A cell lights at its click with `data-lit`:
  18 % `--ok` fill + 3 px inset `--ok` ring (or 16 % `--no` fill + 3 px `--no` ring). The lit number is explained beside the table
  in a `.km-b` block: the same number at 66 px in the same colour, a caption, examples.
- `.dx` (slides 17–18): `170px 1fr 1fr`, gap 10, cells 92 px, radius 16, 650 44 px; the two
  disagreement cells tinted `--wf` 22 % / `--bd` 20 % with a 2.5 px inset ring in the same colour.
  Column heads "My list: pharmacy within ½ mi", row heads "State list: none within ½ mi"; the threshold
  word updates with the buttons. `.dx-words` replaces numbers with words ("Both lists / agree").

### Unit rows and bars (slide 16)

`.mg2`: count (58–76 px, right-aligned, `--c`) | one 32–44 px dot per record (gap 10–12) | label under
the dots. Bar variant `.bar` = 6 px per unit, 32 px tall, radius 16. Shades of one colour separate
subgroups (`color-mix(in oklab, var(--bd) 50%, var(--tx3))` for "retail", `--tx3` for "other").

### Dot strips (S20)

`.sx-dots`: 17 px circles, gap 7, wrapping at 610 px, one per tract; at the click the fixed ones become
hollow rings (`inset 0 0 0 2px --tx3`) and new ones fade in. Key below in 17 px.

### Horizontal bars (S4, S7)

64 px (S4) or 52 px (S7) bars, radius 12–14, `width: calc(var(--v) * 1%)`; the S4 bars grow with `barIn 1.3s`
(scaleX 0 → 1 from the left) on every entry, the S7 bars are static; value as a 60–66 px number beside the bar, label 21–22 px.
Funnel cut shown as an indented row with a dashed `--bd` left rule and a red "−67".

### Histogram (S14, canvas)

`<canvas width=1000 height=470>` drawn with colours read from CSS variables at draw time; bars `--fill2`,
x ticks every 5 in 18 px mono, axis titles in 600 18 px Inter ("errors on the 270 hand-read pairs",
"number of settings", rotated); no axis lines; marked bins recoloured `--bd` / `--tx` with 2 px marker lines
and 650 19 px labels at the click. Redraw in `theme()`.

### Score line (S12)

A 0–100 axis (`X = 40 + 15.8·v`, y 70) with the below-threshold zone in `--no` 10 %, ticks 17 px mono, the
threshold as a 3 px `--tx` tick labelled "60 / threshold", a dashed ceiling marker, and each case as an
r 14 dot in `--ok` / `--no` labelled in its colour.

### Assignment matrix (S16)

3 × 3 grid of 130 px score cells (radius 22, 650 54 px); headers coloured by list (columns `--bd`, rows
`--wf`); below-threshold cells struck through diagonally and faded; the greedy picks ringed 4 px `--no`
with row/column strike bars growing in (.45 s), the optimal set ringed `--ok`; caption names the axes
("rows: list records · columns: Board records · cell: score S").

## 5. Rates: the formula at first use

```js
${Deck_afx({ k: 'recall', id: 'eur', n: '161', d: '178', v: '90%' })}   // first appearance
${Deck_pin('recall', 'precision')}                                     // later slides: top-right corner
```

Registry in `js/v2-fx.js` (`name`, colour, words for numerator and denominator): recall "Found (recall)"
`--bd`; precision "Matched (precision)" `--wf`; disc "Disagreement" `--sp`; archive `--ai`; closer `--wf`;
near "Nearly equal" `--sp`; addr `--ok`; off `--no`.

Rendered as: name (700 26 px, the rate's colour, right-aligned) `=` word fraction (500 21 px, 2 px bar) on
the first row; `=` number fraction (STIX 500 38 px) `=` value (64 px, the rate's colour) on the second.
`=` signs are STIX 36 px `--tx3`. Passing `id` gives every part a class (`eur-n`, `eur-v` …) so a demo can
rewrite the numbers per step. The pin: frosted pill at top 24 / right 128 (`--bg0` 72 %, blur 10 px, 1 px
`--line`, radius 16), name 700 14 px caps in the rate colour, word fraction 17 px.

## 6. Equations (STIX Two Text)

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
- Term-by-term explanation: `data-hl` on the equation names the term in focus; that term takes its colour
  (N `--wf`, A `--bd`, z `--sp`, weights `--ai`) and every other term drops to opacity .42 (.5 s); operators
  stay full. Under the equation, one definition per click cross-fades in the same place
  (`.defs` 200 px tall, each `.def` absolute with `data-s=n data-x=n+1 data-a="fade"`). The last step
  shows the whole equation uncoloured.
- Equation number `(3.1)` at the right edge, Inter .38em `--tx3`, matching the thesis numbering.
- Inline maths in prose: `.mth` (STIX 1.08em, Inter subscript .62em).
- The bundled STIX subset lacks `≥` (falls back to Cambria Math); keep that in mind when adding symbols.

## 7. Tables (supplement)

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

Talk-slide tables follow the same idea: the literature map (slide 6) has a caps column title
("WHERE THE LIST OF PHARMACIES CAME FROM →", centred over the four columns, `--acc`) and a caps row title
("WHAT THE STUDY DID WITH THE LIST ↓", bottom-aligned in the first column); column heads 650 25 px with a
17 px `--tx3` gloss and a 2 px `--line2` rule; row heads 650 24 px with a gloss; cells hold "Author Year"
(600 23 px) with a 15 px gloss of what list that study used; a study that spans two columns gets a 2 px rule
under its name across both. The empty cell this thesis fills carries a note first ("No study tested this")
and then "● This thesis" in `--ai` 750 30 px.

## 8. Figures from papers

```html
<figure class="e" style="margin:0">
  <div class="gx-fig"><img src="${Deck_photo('lit-etheredge2024-fig2')}" alt="…"></div>
  <figcaption class="gx-cap">What it shows. Etheredge et al. 2024, Fig. 2 (CC BY).</figcaption>
</figure>
```

Image at column width, no frame; caption 16 px/1.4 `--tx2` with author, year, figure number and licence.
On the chain slide a published desert map sits on a white plate (`background: #fff`, radius 14) so the
paper's own colours read correctly. Files: `img/lit-<author><year>-fig<n>.jpg`. Only figures from papers in
the thesis reference list, checked in the paper.
