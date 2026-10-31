# 03 · Layout patterns

Every slide is one of the patterns below. Build a new slide by picking the pattern whose job matches,
copying its skeleton, and changing only content. Values are stage px at 1920 × 1080. CSS file names refer
to the reference implementation under `docs/defense/css/`. Text inside a skeleton is a placeholder; text
marked "reference deck" shows how the reference deck (a geography thesis defense) filled that slot, and
"another field" is an illustrative example of the same slot in a different discipline.

## 0. The common frame

```html
<section data-title="…" data-acc="sp" [data-demo="…"] [data-steps="n"]>
  <div class="eyebrow e">RQ n · Finding</div>                 <!-- 18 px caps, accent -->
  <h2 class="title e">Claim with <em>the accent words</em>.</h2> <!-- 64 px, ≤ 2 lines, max 1500 -->
  <div class="g-64 body"> … </div>                            <!-- flex: 1; starts ≈ y 298 (2-line title) or 231 (1 line) -->
  <div class="src">Thesis §x.y; Table x.y. Drawing: …</div>   <!-- 15 px, left 128 / bottom 74 -->
  <div class="xrefs"><a class="xref" data-goto="s-…"></a></div>
  <div class="conv e"> … </div>                               <!-- optional, chrome row, top right -->
  <aside class="notes-kw" hidden>…</aside><aside class="notes">…</aside><aside class="notes-en" hidden>…</aside>
</section>
```

Stack: eyebrow (18) → 22 → title (64/1.05) → 22 + 10 (`.body` margin-top) → body. Body height ≈ 650 px
under a two-line title, 717 px under a one-line title. Content stays inside x 128–1792; keep y ≥ 948 for the
source line and page number (three opening slides of the reference deck run to y ≈ 995–1040; do not repeat
that). The supplement-link stack grows upward from y 968 (≈ 923 with two links, ≈ 898 with three), so keep
the bottom of the right column clear above it.

Body grids:

| Class | Columns | Measured | Use |
|---|---|---|---|
| `.g-64` | `1.55fr 1fr`, gap 72 | 968 / 624 | main figure + evidence column (the default for findings) |
| `.g2` | `1fr 1fr`, gap 64 | 800 / 800 | diagram + steps; closing figure + text; two tables |
| `.g-46` | `1fr 1.45fr`, gap 72 | — | defined in the reference `v2.css`; no reference slide uses it (text + wide figure) |
| `.mw2` | `1fr 1fr`, gap 112 | 776 / 776 | two contrasting findings side by side |
| `.ans` | 3 equal, hairline-separated | 555 each | three answers |
| `.gq` | `1fr 560px`, gap 56 | 1048 / 560 | diagram + side text |
| `.hook-body` | `1fr 680px`, gap 60 | 924 / 680 | hook figure + answer column |
| `.gx` | `1fr 760px`, gap 64 | — | numbered list + figure from a paper |
| `.jflow` | `420px 1fr 300px`, gap 50 | 420 / 844 / 300 | input → questions → verdict |
| `.lmap` | `300px repeat(4, 1fr)`, gap 18 | 300 / 323 ×4 | literature matrix (rows × columns) |
| rail `.stations` | `repeat(5, 1fr)` | 333 each | the recurring five-station progress rail |

Columns that hold text beside a figure use `.col.jc` (flex column, vertically centred).

## 1. Title slide

```html
<section data-title="Title" data-chrome="off" data-photo="photo-…" data-scrim="sl" data-pos="60% 50%" data-credit="Name" class="t-title">
  <div class="deck-logo e"><img class="lg-d" src="img/logo-dark.svg" alt=""><img class="lg-l" src="img/logo.svg" alt=""></div>
  <div class="eyebrow e" style="--acc:#fff">Field · Thesis Defense</div>
  <h1 class="display e" style="font-size:120px">Title line one<br>title line two<br>title line three</h1>
  <p class="lead e">One-line subtitle: what the work does, and to what</p>
  <div class="t-plate lg e" data-lg-scale="40">
    <div><b>Name</b><span>Department · University</span></div>
    <div><span class="lab">Thesis Advisor</span><b>Name</b></div> …
  </div>
</section>
```

A full-bleed photo of the setting or object of the work, `sl` scrim darkening the left; text column centred
vertically at x 140: logo 92 px → eyebrow → three-line display (white, 120–136 px, forced breaks) → lead
(32 px, max 900) → glass plate pinned at bottom 96 (`padding 22px 10px`, radius 28, columns separated by
1 px `rgba(255,255,255,.18)` rules; name 650 21 px white, role label 650 12 px caps at 55 % white).
No chrome. Credit bottom right.

- Example (reference deck, a geography thesis): the skyline and river of the study city.
- Another field: the instrument or organism for a lab thesis; the archive reading room or the street the
  sources describe for a history thesis.

## 2. The hook: one case, one question

Photo of one concrete case under a flat `sf` scrim; the title asks a yes-or-no question about it, with the
deciding condition as the accent words. Click 1: the photo fades (1.2 s) and a figure card fades and scales
in (`.hook-map`, radius 28, deep shadow). Click 2: two answer rows slide in from the right, 180 ms apart:
the name of the source or condition in coloured caps, the value as a 96 px number with a small unit, the
verdict word (Yes `--ok` / No `--no`, 40 px), each row closed by a hairline. Click 3: one lead sentence that
names the only thing that differed between the rows. The source line names the case and says what is
illustrative.

The two rows answer the same question about the same case and disagree; the rest of the talk explains why.

- Example (reference deck): an aerial photo of houses; "Is there a pharmacy within *half a mile* of this
  neighborhood?"; the card is a map that zooms from the region to one census tract (1.8 s) with rings at
  ½ and 1 mile; the rows are two pharmacy lists (0.32 mi Yes, 0.70 mi No); click 3 "**Only the list
  changed.**"
- Another field: a clinical-informatics talk shows one patient; "Is this patient *eligible* for the
  trial?"; the card is the patient's record timeline; the rows are two coding schemes (Yes, No); click 3
  "**Only the coding changed.**"

## 3. Three-field Venn with side text (where the fields meet)

For any interdisciplinary talk: what each field asks, and what sits where they overlap. `.gq.body`: left an
SVG of three overlapping circles (r 250, 13 % fill, 2.5 px stroke in the field's colour; field name 28 px,
the field's question 22 px, its sources 17 px `--tx3`, all centred), one circle per click; at the last click
the talk's own label ("This thesis" in the reference deck) appears at the intersection. Right column
(560 px, gap 34): one 28 px sentence; at the last click two 22 px notes led by bold words ("**Why now:**",
"**The gap:**") and the question of the work in 600 32 px under a 2 px `--sp` top rule (`.gq-ask`).

Each circle states its field's question in that field's own words and names its sources, so every
listener finds their own field on the slide.

- Example (reference deck): Health geography ("Who can reach care, and where?"), GIScience ("How do places
  become data?"), GeoAI ("What changes when AI builds the list?").
- Another field: Ecology, Statistics and Remote sensing; or Linguistics, Psychology and Computer science.

## 4. Photo splits

```html
<section data-photo="photo-…" data-scrim="half l" data-pos="30% 40%" data-credit="…" data-act="off">
  <div class="split-r"> eyebrow · title · .facts · p.small </div>      <!-- text right, photo left -->
</section>
<section data-photo="photo-…" data-scrim="half" data-pos="60% 50%" data-credit="…">
  <div class="split-l"> eyebrow · title · blockquote.quote · .one-addr · p.small </div>  <!-- text left -->
</section>
```

The photo fills one half and dissolves into the solid side through an eased 9-stop scrim, so there is no
seam. `.split-r` = `margin-left: 50%; padding-left: 40px`; `.split-l` = `width: 56%`; both vertically
centred. Use one for motivation (the people or setting the work concerns) and one for the definition (the
thing being defined). Example (reference deck): people at a pharmacy counter; a supermarket for the
definition of a pharmacy.

**Facts list** (number + sentence + citation, hairlines, no boxes):

```html
<div class="facts">
  <div class="fact e"><span class="num">≈2×</span><p>sentence that says what the number means <span class="cite">Author Year</span></p></div>
</div>
```

`.fact`: grid `270px 1fr` (230 outside a split), gap 30, baseline, padding 22 0, 1 px `--line` top rule;
number 60 px in `--acc`, nowrap; sentence 23 px. Example (reference deck): "≈2× as many visits to community
pharmacies as to physicians", Valliant et al. 2022.

**Definition**: `blockquote.quote` (30 px display, 3 px `--acc` left rule) with the verbatim definition
that decides what counts, then a worked example `.one-addr` (3 px `--wf` left rule; 16 px caps label that
names the case; item names 600 26 px each with a 20 px gloss). The case label can be an address, a
specimen ID, a case number or a catalogue entry. Example (reference deck): one supermarket address and its
two listings.

## 5. The progress rail (recurring spine)

Five stations on a 2 px line, one per step of the pipeline or argument. Each station: mono number "01"
(16 px), a 30 px dot on the line, the name (680 34 px display), its research question in 14 px caps in the
station colour, a 21 px "how" line, and a result block (58 px number in the station colour + 20 px label)
that appears when the station is done. A glass lens (84 px tall pill) springs to the current station
labelled "done" or "next".

- Example (reference deck): Find places · Describe them · Decide · Compare · Map.
- Another field: Recruit · Measure · Model · Validate · Apply.

One or two running-example rows sit under the rail (`.track-ex`): a coloured 38 px chip, the example's name,
and one cell per station that fills in as the talk reaches it. The first row (`.ex-cub` in the reference
implementation) always shows unless the slide sets `data-cub="0"`; the second (`.ex-tract`) only with
`data-tract="1"` (the plan) or when all five stations are done. Example (reference deck): "Rx" in `--wf`
for one pharmacy, "◎" in `--sp` for one neighbourhood; another field: one participant and one site, or one
specimen and one batch.

Variants:

- **Anchor** (`class="anchor" data-demo="anchor" data-done="k"`): the plan (k = 0, the lens appears on 01
  at click 1; reference slide 8) and the recap that opens a later act (reference slide 14, k = 3: stations
  1–3 done with results; click 2 moves the lens to the next station labelled "next"). In the reference deck
  Acts I and III open without a recap. Background: the title photo or a related photo under `sx blur`
  (heavily blurred coloured haze). Eyebrow "The plan" in grey (inline `style="--acc:var(--tx2)"`); "Where
  we are" in the act accent (`--bd` on Act II in the reference deck).
- **Chain** (`.ch`, reference slide 5): the same rail in neutral grey (`--c: var(--tx)`, fill `--tx3`,
  `.past` dots) for "the usual practice" in the field; below it a scene stage that changes per click (§6);
  after the walk, three coloured rows aligned to the five columns (§7).
- **Three levels** (`.lv`, supplement): three stations, 36–40 px names, lens without label, a closing line
  under a hairline at the last click.

Geometry the demos rely on: lens `left = station.offsetLeft − 30`, `width = offsetWidth + 6`, top 22;
rail fill to `offsetLeft + 15` of the newest done station, or 100 %.

## 6. Scene stage (one picture per click)

```html
<div class="ch-stage" data-x="7">
  <div class="ch-g" data-x="1"> picture + text … <p class="ch-cap">Caption<span class="cite">Author Year</span></p></div>
  <div class="ch-g g1" data-s="1" data-x="3"> icon → icon → record … </div>
  <div class="ch-g" data-s="3" data-x="4"><svg class="g-svg" viewBox="0 0 1180 440" role="img" aria-label="…">…</svg></div>
</div>
```

All scenes are `position: absolute; inset: 0 0 64px` and centred, so each click cross-fades in place
(`data-s` in, `data-x` out). The caption sits centred under the scene (500 26 px `--tx`, citation on its own
line at 16 px `--tx3`). Scene types: photo (820 × 400, radius 22) + 46 px name + 27 px text; an icon flow
(70 px stroke icons, 58 px CSS arrows, a mono record underlined by a 2 px rule, a 92 px red "?"); SVG
schematic drawings; a published figure on a white plate.

Each scene shows one step of the usual practice and, where it fails, the failure itself. Example (reference
deck): a vendor record, an industry-code filter with a red "?", a geocoding offset, a distance test that
flips from Yes to No. Another field: a sample, a preprocessing filter that drops cases, a calibration
offset, a threshold test.

## 7. Problem / response / result rows under the rail

```html
<div class="ch-map">
  <div class="cm-row" data-s="7" style="--c:var(--no)"><b class="cm-lab">Usual problem</b><span>…</span>×5</div>
  <div class="cm-row" data-s="8" style="--c:var(--wf)"><b class="cm-lab">This thesis</b><span>…</span><span class="cm-none">—</span>…</div>
  <div class="cm-row" data-s="9" style="--c:var(--sp)"><b class="cm-lab">Result</b><span>… <em>RQ short name</em></span>…</div>
</div>
```

The grid repeats the rail's five columns, so each cell sits under its station. Row label: 650 15 px caps in
`--c` over a 2 px `--c` rule. Cells 500 21 px (first row `--tx2`, later rows `--tx`); an `<em>` tag in
700 14 px mono (mixed case, .08em tracking, in `--c`) names the research question that answers the cell;
"—" in `--tx3` where the work did nothing. Row colours follow the roles in 02 §2: `--no` for the problem,
the colour the talk gives its own approach for the response (`--wf` in the reference deck), a third role
colour for the result (`--sp` in the reference deck). Example (reference deck): the `<em>` tags read
"Check", "Build · Check", "Map".

## 8. Literature matrix (rows × columns with axis titles)

```html
<div class="lmap e">
  <div class="ax-corner"></div><div class="ax-col">What the columns sort studies by →</div>
  <div class="ax-row">What the rows sort studies by ↓</div>
  <div class="ch-h">Column head<span>gloss: what belongs here</span></div> …
  <div class="ch-h ai">Column head<span>gloss</span></div>
  <div class="rh">Row head<span>gloss: which studies these are</span></div>
  <div class="cell"><span class="cite">Author Year<small>what the study used or did</small></span> …</div> …
  <div class="cell span2" data-s="1"><span class="cite">Author Year<small>…</small></span></div>
  <div class="cell gapcell"><span class="gapnote" data-s="3" data-x="4">No study tested this</span><span class="me" data-s="4">This thesis</span></div>
</div>
```

The axis titles (caps, `--acc`, with an arrow) say what rows and columns mean; header and row-head glosses
(17 px `--tx3`) say what each one is. One row per click. The gap is shown empty, then named, then filled
with the talk's own label ("● This thesis" in the reference deck) in the colour of its column. `.ch-h.ai`
gives a column head the `--ai` (method/model/instrument) colour.

- Example (reference deck): columns "Where the list of pharmacies came from →" (Government list ·
  Commercial database · Online map listings · Classified by a model); rows "What the study did with the
  list ↓" (List used as given · List checked against a reference · List tested on an access measure).
- Another field: columns by data source (registry · clinical notes · claims · model-labelled); rows by how
  the label was validated (not validated · against chart review · against an outcome).

## 9. Method step

The eyebrow names the research question and the step (reference deck: "RQ1 · Finding places",
"RQ1 · Describing places", "RQ1 · Deciding which places count"); the title states what was done as a fact.
On a step that departs from the usual practice, a `.conv` line in the chrome row says how (§13); in the
reference deck the search and judgment slides (10, 12) carry one and the evidence slide has none.

- **Input and its arithmetic** (`.g2`): left a pill input bar (86 px tall, radius 999, `--fill2`, mono
  27 px, a looping typed query with a blinking `--wf` caret), the arithmetic of the design written out
  (54 px numbers, 34 px `--tx3` operators), the terms; right a schematic of one unit split into cells, the
  cap or limit as a 64 px `--no` number in the corner, then the total as a 76 px stat. Example (reference
  deck): `3 terms × 60 ZIPs = 180 searches`, one ZIP polygon split into grid cells. Another field:
  `4 doses × 3 strains × 5 replicates = 60 plates`.
- **Evidence** (`.ev3`): three numbered columns, one per evidence source (2 px `--wf` top rule, 22 px
  numbers, 27 px heads, 20 px glosses), then a full-width schematic timeline for the source that has a time
  dimension. Example (reference deck): "01 Listing details / 02 Reviews / 03 Website history", timeline
  under 03.
- **Judgment flow** (`.jflow`): left the saved evidence (hairlines above and below) and the block for what
  makes the decision, a model, a rater, an instrument or a rule set (2 px `--ai` top rule, its name 700
  32 px `--ai`, version in 16 px mono); middle the criteria as yes-or-no questions in hairline rows
  (question 25 px, answer 700 28 px `--ok`, except a deliberate error row, whose "yes" and rule note are
  `--no`); right the verdict (caps count of yeses, the decision word 700 64 px `--ok`, with a red gloss that
  flags the error for later). Underneath, two rules of the method in a hairline-divided row, and one
  bold-led sentence on why, with its citation. Example (reference deck): four questions, "4 × yes",
  "Included", the error row's note "rule: no, whole store", the gloss "an error we come back to".
- **Running-example note** on the last click (`.cub-note`, named after the reference deck's running
  example): the example's name in 14 px caps `--wf`, then one 22 px sentence, under a hairline. Example
  (reference deck): "THE CUB".

## 10. Finding slides

The finding formula (01 §5) in five layouts:

- **Count matrix + explanations** (reference slide 13, `.g-64`): a 2 × 2 table (`.km`, row and column
  heads) whose cells light one per click; each lit number is repeated large in the right column with its
  meaning and examples (`.km-b`), then the "So:" line with the citation.
- **Proportional Venn + formulas** (reference slide 15, `.g-64`): the Venn on the left; on the right the two
  rates written out as formulas (`Deck_afx`) separated by hairlines, and a note that ends in "So:". The
  title (four states) and the line under it (`p.frame-line`, three states, 22 px, pulled up 10 px) are
  `.tswap`; the title changes on every click, the line on clicks 1 and 2.
  The last click replaces the Venn in place with one real case and its items (`.eu-bldg`, dot-coded rows:
  match `--ok`, repeat `--ok` 50 %, wrong `--no`). Example (reference deck): one address and its four
  listings.
- **Two columns side by side** (reference slide 16, `.mw2`): each column has a coloured head over a 2 px
  rule naming one kind of error with its fraction, unit rows (05 §4), a 76 px stat pushed to the bottom
  (`margin-top: auto`) and a "So:" line. The second column arrives on click 1. Example (reference deck):
  "Missed: 17/178 …" in `--bd`, "Wrongly included: at least 93/413 …" in `--no`. Another field: false
  negatives and false positives of a screening test.
- **Figure + result column** (reference slide 18, `.g-64`): the main figure (map or plot) with its legend,
  a glass control for the parameter the result depends on, and its furniture (maps: north arrow, scale bar,
  legend; plots: axis titles with units, legend; 05 §0); right column a 76 px count with its label, a
  one-line caption naming the table, the `.dx` 2 × 2 table, the "So:" line. Changing the parameter rewrites
  every number, the title and the "So:" line together. Example (reference deck): a map with a distance
  threshold control. Another field: a dose-response plot with a cut-off control.
- **Figure + numbered findings** (reference slide 19, `.g-64`): a figure whose encoding changes at the last
  click; right an `ol.fr-list.rw-list` of three findings (counter 30 px in `--acc`; head 27 px; body 20 px
  with an inline `<i>So: …</i>` in `--tx` and the citation), one per click. Example (reference deck): the
  map is re-shaded by a neighbourhood attribute at the last click.

## 11. Diagram + numbered steps

`.g2`: a schematic SVG on the left (max-height 640), and on the right a `.steps` list (01–04 counters in
22 px display `--acc`, heads 25 px) revealed one per click, ending with a 2 × 2 in words (`.dx-words`).

Layered-figure version (reference slide 9, on `.g-64`): the figure on the left, the steps (with a line
swatch for each layer) on the right; each step adds its layer to the figure. Use it for anything that builds
by layers: a study-area map (reference deck: one swatch per study frame), an apparatus, a model
architecture, a sampling design.

## 12. Epilogue

- **Answers** (`.ans`): three columns, one per research question, each with its colour: caps label, the
  answer as a 96 px number, a 24 px label, and a 20 px gloss under a hairline. One column per click; at the
  last click two full-width 26 px paragraphs led by bold words ("**What is new:**", and one for the field
  the work speaks to). Example (reference deck): "RQ1 · BUILD"; answers "592", "9/10", "1/7"; second
  paragraph "**For GeoAI:**".
- **Back to the opening** (`.g2`): the hook's case shown again inside the full result figure, marked so it
  is found at once (solid `--sp` with a white outline, a ring and a haloed label), with the cases that
  disagree tinted; right one lead sentence, then at click 1 the conclusion as one bold sentence + citations,
  next steps, the closing sentence. Example (reference deck): "the opening tract" on the full map;
  conclusion "**The list is part of the measurement.**"
- **Thank you**: same photo as the motivation slide, `sl` scrim, "Thank you." as a 180 px display, a
  lead, the logo with the repository URL, the title slide's glass plate without its Date column. No chrome.

## 13. Furniture that recurs on content slides

- **`.conv`** (top right, chrome row): five 9 px dots standing for the five steps of the usual chain, the
  current one bright, and one sentence. Bold part = the usual practice; plain part = this study.

  ```html
  <div class="conv e"><span class="dots"><i class=""></i><i class="on"></i><i class=""></i><i class=""></i><i class=""></i></span><span><b>Studies usually do X,</b> while this one does Y.</span></div>
  ```

  Example (reference deck): "**Studies often buy a vendor's list,** while this one searches public Google
  listings in every ZIP code."
- **`.xrefs`** (bottom right): links to supplement pages, "S# Title of the supplement page →". Example
  (reference deck): "S6 How names and addresses are matched →".
- **`.src`** (bottom left): sources and what the drawing is.
- **`.cite`** inline, right after the claim it supports.
- **Formula pin** (top right) on slides that report a rate defined earlier.
- **Figure furniture**: every figure reads without the speaker. Maps: north arrow, scale bar, legend.
  Plots: axis titles with units, legend. Images of specimens or samples: scale bar. Tables: row and column
  axis titles (05 §0).

## 14. Supplement patterns

Same frame; eyebrow "Supplement · Tables …" or "Method part · step n · library"; a back chip
"↩ 13 Back to the talk" next to the act label. Example (reference deck): "Supplement · Tables C11,
C31–C32", "Linkage · step 2 · RapidFuzz". Patterns:

- **Method detail** (`.g-64`: visual left, `.col.jc` explanation right, or one centred column), one rule per
  click; labels 700 14 px caps; hairline-ruled steps; source names the code or library version and says
  "Computed live." when numbers come from the JS port.
- **Equation walk-through** (05 §6), **worked example + score line**, **interactive** (try-it inputs,
  sliders, toggles, a live 100 px result with a caps verdict; reference deck: "CAN BE MATCHED").
- **Tables** (`.bk-tbl`, 05 §7), one or two side by side; a short bold-led paragraph under them.
- **Paper figure + numbered list** (`.gx`): `.fr-sub` lead (28 px), `ol.fr-list` of numbered points (four
  cautions in the reference deck), a closing verdict over a 2 px `--acc` rule (`.fr-end`), the figure at
  760 px with caption and licence.
- **Limitations** (`.lims`, two columns): numbered blocks (60 px `--tx3` numbers, 27 px heads, 21 px text,
  hairline top), and one full-width row with an arrow for the next step.
- **Practices grid** (`.sp-head` + `.sp-row`): five image heads (140 px crops) over the five steps of the
  chain, then rows labelled in 15 px caps ("PRACTICE", "ALL STEPS"), text 21 px.

## 15. Choosing a pattern

| You need to show | Use |
|---|---|
| Who you are, the title | §1 |
| One concrete case and a yes-or-no question about it | §2 |
| What each field asks, where the fields meet | §3 |
| Motivation with a photo of the people or setting; the definition of what counts | §4 |
| Where we are in the argument | §5 anchor |
| How the usual method works, step by step, and where it fails | §5 chain + §6 + §7 |
| How prior studies compare, and the gap | §8 |
| One step of your method | §9 |
| A result with a number and its meaning | §10 |
| A procedure, or a figure that builds by layers | §11 |
| Answers, conclusion, thanks | §12 |
| Detail for questions | §14, linked with `.xref` |
