# 03 · Layout patterns

Every slide in the deck is one of the patterns below. Build a new slide by picking the pattern whose job
matches, copying its skeleton, and changing only content. Values are stage px at 1920 × 1080; file names
are under `docs/defense/css/`.

## 0. The common frame

```html
<section data-title="…" data-acc="sp" [data-demo="…"] [data-steps="n"]>
  <div class="eyebrow e">RQ3 · Finding</div>                 <!-- 18 px caps, accent -->
  <h2 class="title e">Claim with <em>the accent words</em>.</h2> <!-- 64 px, ≤ 2 lines, max 1500 -->
  <div class="g-64 body"> … </div>                            <!-- flex: 1; starts ≈ y 298 (2-line title) or 231 (1 line) -->
  <div class="src">Thesis §4.3; Table 4.4. Shading: …</div>   <!-- 15 px, left 128 / bottom 74 -->
  <div class="xrefs"><a class="xref" data-goto="s-…"></a></div>
  <div class="conv e"> … </div>                               <!-- optional, chrome row, top right -->
  <aside class="notes-kw" hidden>…</aside><aside class="notes">…</aside><aside class="notes-en" hidden>…</aside>
</section>
```

Stack: eyebrow (18) → 22 → title (64/1.05) → 22 + 10 (`.body` margin-top) → body. Body height ≈ 650 px
under a two-line title, 717 px under a one-line title. Content stays inside x 128–1792; keep y ≥ 948 for the
source line and page number (three prologue slides run to y ≈ 995–1040; avoid repeating that). The
supplement-link stack grows upward from y 968 (≈ 923 with two links, ≈ 898 with three), so keep the
bottom of the right column clear above it.

Body grids:

| Class | Columns | Measured | Use |
|---|---|---|---|
| `.g-64` | `1.55fr 1fr`, gap 72 | 968 / 624 | map or figure + evidence column (the default for findings) |
| `.g2` | `1fr 1fr`, gap 64 | 800 / 800 | diagram + steps; closing map + text; two tables |
| `.g-46` | `1fr 1.45fr`, gap 72 | — | defined in v2.css; no current slide uses it (text + wide figure) |
| `.mw2` | `1fr 1fr`, gap 112 | 776 / 776 | two contrasting findings side by side |
| `.ans` | 3 equal, hairline-separated | 555 each | three answers |
| `.gq` | `1fr 560px`, gap 56 | 1048 / 560 | diagram + side text |
| `.hook-body` | `1fr 680px`, gap 60 | 924 / 680 | map + answer column |
| `.gx` | `1fr 760px`, gap 64 | — | numbered list + paper figure |
| `.jflow` | `420px 1fr 300px`, gap 50 | 420 / 844 / 300 | input → questions → verdict |
| `.lmap` | `300px repeat(4, 1fr)`, gap 18 | 300 / 323 ×4 | row × column literature table |
| rail `.stations` | `repeat(5, 1fr)` | 333 each | the recurring five-step rail |

Columns that hold text beside a figure use `.col.jc` (flex column, vertically centred).

## 1. Title slide

```html
<section data-title="Title" data-chrome="off" data-photo="photo-…" data-scrim="sl" data-pos="60% 50%" data-credit="Name" class="t-title">
  <div class="deck-logo e"><img class="lg-d" src="img/logo-dark.svg" alt=""><img class="lg-l" src="img/logo.svg" alt=""></div>
  <div class="eyebrow e" style="--acc:#fff">Geography Honors Thesis · Defense</div>
  <h1 class="display e" style="font-size:120px">From digital listings<br>to neighborhood<br>measurement</h1>
  <p class="lead e">An evidence-guided workflow to build and validate pharmacy inventories</p>
  <div class="t-plate lg e" data-lg-scale="40">
    <div><b>Name</b><span>Department · University</span></div>
    <div><span class="lab">Thesis Advisor</span><b>Name</b></div> …
  </div>
</section>
```

City photo (Minneapolis skyline and the river), `sl` scrim darkening the left; text column centred
vertically at x 140: logo 92 px → eyebrow → three-line display (white, 120–136 px, forced breaks) → lead
(32 px, max 900) → glass plate pinned at bottom 96 (`padding 22px 10px`, radius 28, columns separated by
1 px `rgba(255,255,255,.18)` rules; name 650 21 px white, role label 650 12 px caps at 55 % white).
No chrome. Credit bottom right.

## 2. The hook: one place, one question

Photo of a neighbourhood (aerial houses) under a flat `sf` scrim; title asks the question
("Is there a pharmacy within *half a mile* of this neighborhood?"). Click 1: the photo fades (1.2 s) and a
map card fades and scales in (`.hook-map`, radius 28, deep shadow), zooming from the region to one tract
(1.8 s); rings at ½ and 1 mile. Click 2: two answer rows slide in from the right, 180 ms apart: list name in
coloured caps, the distance as a 96 px number with a small "mi", the verdict word (Yes `--ok` / No `--no`,
40 px), each row closed by a hairline. Click 3: "**Only the list changed.**" (lead). The source line names
the tract and says what is illustrative.

## 3. Fields diagram with side text (why geography cares)

`.gq.body`: left an SVG of three overlapping circles (r 250, 13 % fill, 2.5 px stroke in the field's
colour; name 28 px, question 22 px, sources 17 px `--tx3`, all centred), one circle per click; at the last
click "This thesis" appears at the intersection. Right column (560 px, gap 34): one 28 px sentence; at the
last click two 22 px notes led by bold words ("**Why now:**", "**The gap:**") and the question of the thesis
in 600 32 px under a 2 px `--sp` top rule (`.gq-ask`).

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
centred. Used for motivation (people at a pharmacy counter) and the definition (a supermarket).

**Facts list** (number + sentence + citation, hairlines, no boxes):

```html
<div class="facts">
  <div class="fact e"><span class="num">≈2×</span><p>as many visits to community pharmacies as to physicians <span class="cite">Valliant et al. 2022</span></p></div>
</div>
```

`.fact`: grid `270px 1fr` (230 outside a split), gap 30, baseline, padding 22 0, 1 px `--line` top rule;
number 60 px in `--acc`, nowrap; sentence 23 px.

**Definition**: `blockquote.quote` (30 px display, 3 px `--acc` left rule) with the verbatim inclusion
definition, then a worked example `.one-addr` (3 px `--wf` left rule; 16 px caps address; listing names
600 26 px each with a 20 px gloss).

## 5. The rail (recurring spine)

Five stations on a 2 px line: Find places · Describe them · Decide · Compare · Map. Each station: mono
number "01" (16 px), a 30 px dot on the line, the name (680 34 px display), its research question in
14 px caps in the station colour, a 21 px "how" line, and a result block (58 px number in the station colour
+ 20 px label) that appears when the station is done. A glass lens (84 px tall pill) springs to the current
station labelled "done" or "next". One or two running-example rows sit under the rail (`.track-ex`): a
coloured 38 px chip ("Rx" in `--wf`, "◎" in `--sp`), the example's name, and one cell per station that fills
in as the talk reaches it. The Cub row always shows; the tract row only with `data-tract="1"` (the plan) or
when all five stations are done.

Variants:

- **Anchor** (`class="anchor" data-demo="anchor" data-done="k"`): the plan (k = 0, the lens appears on 01
  at click 1, slide 8) and the recap that opens Act II (slide 14, k = 3: stations 1–3 done with results;
  click 2 moves the lens to "Compare" labelled "next"). Acts I and III open without a recap. Background:
  the title photo or a related photo under `sx blur` (heavily blurred coloured haze). Eyebrow "The plan" in
  grey (inline `style="--acc:var(--tx2)"`); "Where we are" in the act accent (`--bd` on Act II).
- **Chain** (`.ch`, slide 5): the same rail in neutral grey (`--c: var(--tx)`, fill `--tx3`, `.past`
  dots) for "the usual practice"; below it a scene stage that changes per click (§6); after the walk, three
  coloured rows aligned to the five columns (§7).
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
line at 16 px `--tx3`). Scene types used: photo (820 × 400, radius 22) + 46 px name + 27 px text; an icon
flow (70 px stroke icons, 58 px CSS arrows, a mono record underlined by a 2 px rule, a 92 px red "?");
SVG drawings (geocoding offset, distance test); a published figure on a white plate.

## 7. Problem / response / result rows under the rail

```html
<div class="ch-map">
  <div class="cm-row" data-s="7" style="--c:var(--no)"><b class="cm-lab">Usual problem</b><span>…</span>×5</div>
  <div class="cm-row" data-s="8" style="--c:var(--wf)"><b class="cm-lab">This thesis</b><span>…</span><span class="cm-none">—</span>…</div>
  <div class="cm-row" data-s="9" style="--c:var(--sp)"><b class="cm-lab">Result</b><span>… <em>Build · Check</em></span>…</div>
</div>
```

The grid repeats the rail's five columns, so each cell sits under its station. Row label: 650 15 px caps in
`--c` over a 2 px `--c` rule. Cells 500 21 px (first row `--tx2`, later rows `--tx`); an `<em>` tag in
700 14 px mono (mixed case, .08em tracking, in `--c`: "Check", "Build · Check", "Map") names the research
question that answers the cell; "—" in `--tx3` where the thesis did nothing.

## 8. Row × column table with axis titles (literature map)

```html
<div class="lmap e">
  <div class="ax-corner"></div><div class="ax-col">Where the list of pharmacies came from →</div>
  <div class="ax-row">What the study did with the list ↓</div>
  <div class="ch-h">Government list<span>licence registry, federal file</span></div> …
  <div class="ch-h ai">Classified by a model<span>AI in the loop</span></div>
  <div class="rh">List used as given<span>pharmacy-desert and access studies</span></div>
  <div class="cell"><span class="cite">Catalano 2025<small>federal facility file</small></span> …</div> …
  <div class="cell span2" data-s="1"><span class="cite">Liese 2010<small>…</small></span></div>
  <div class="cell gapcell"><span class="gapnote" data-s="3" data-x="4">No study tested this</span><span class="me" data-s="4">This thesis</span></div>
</div>
```

The axis titles (caps, `--acc`, with an arrow) say what rows and columns mean; header and row-head
glosses (17 px `--tx3`) say what each one is. One row per click. The gap is shown empty, then named,
then filled with "● This thesis" in the colour of its column.

## 9. Method step (Act I)

Eyebrow "RQ1 · Finding places / Describing places / Deciding which places count"; title states what was
done as a fact; on the search and judgment slides (10, 12) a `.conv` line in the chrome row contrasts the
usual practice with this study (§13); the evidence slide has none.

- **Search** (`.g2`): left a pill search bar (86 px tall, radius 999, `--fill2`, mono 27 px, a looping
  typed query with a blinking `--wf` caret), the arithmetic `3 terms × 60 ZIPs = 180 searches` (54 px
  numbers, 34 px `--tx3` operators), the terms; right a schematic ZIP polygon split into grid cells, the
  result cap as a 64 px `--no` number in the corner, then the total as a 76 px stat.
- **Evidence** (`.ev3`): three numbered columns ("01 Listing details / 02 Reviews / 03 Website history",
  2 px `--wf` top rule, 22 px numbers, 27 px heads, 20 px glosses), then a full-width schematic timeline
  for column 03.
- **Judgment flow** (`.jflow`): left the saved evidence (hairlines above and below) and the model block
  (2 px `--ai` top rule, model name 700 32 px `--ai`, version in 16 px mono); middle four yes-or-no questions
  as hairline rows (question 25 px, answer 700 28 px `--ok`, except the deliberate error row, whose "yes"
  and "rule: no, whole store" note are `--no`); right the verdict ("4 × yes" caps, "Included" 700 64 px
  `--ok`, with a red "an error we come back to" gloss). Underneath, two rules of the method in a hairline-divided row, and one bold-led
  sentence on why, with its citation.
- **Running-example note** on the last click (`.cub-note`): "THE CUB" in 14 px caps `--wf`, then one
  22 px sentence, under a hairline.

## 10. Finding slides

The finding formula (01 §5) in five layouts:

- **Count matrix + explanations** (slide 13, `.g-64`): a 2 × 2 table (`.km`, row and column heads) whose
  cells light one per click; each lit number is repeated large in the right column with its meaning and
  examples (`.km-b`), then the "So:" line with the citation.
- **Proportional Venn + formulas** (slide 15, `.g-64`): the Venn on the left; on the right the two rates
  written out as formulas (`Deck_afx`) separated by hairlines, and a note that ends in "So:". The title
  (four states) and the line under it (`p.frame-line`, three states, 22 px, pulled up 10 px) are `.tswap`;
  the title changes on every click, the line on clicks 1 and 2.
  The last click replaces the Venn in place with one real address and its four listings (`.eu-bldg`, dot-coded
  rows: match `--ok`, repeat `--ok` 50 %, wrong `--no`).
- **Two columns side by side** (slide 16, `.mw2`): each column has a coloured head over a 2 px rule
  ("Missed: 17/178 …" in `--bd`, "Wrongly included: at least 93/413 …" in `--no`), unit rows (§05 4), a
  76 px stat pushed to the bottom (`margin-top: auto`) and a "So:" line. The second column arrives on click 1.
- **Map + result column** (slide 18, `.g-64`): map with legend, glass threshold control and furniture;
  right column a 76 px count with its label, a one-line caption naming the table, the `.dx` 2 × 2 table,
  the "So:" line. Threshold changes rewrite every number, the title and the "So:" line together.
- **Map + numbered findings** (slide 19, `.g-64`): map whose shading changes at the last click; right an
  `ol.fr-list.rw-list` of three findings (counter 30 px in `--acc`; head 27 px; body 20 px with an
  inline `<i>So: …</i>` in `--tx` and the citation), one per click.

## 11. Diagram + numbered steps

`.g2`: a schematic SVG on the left (max-height 640), and on the right a `.steps` list (01–04 counters in
22 px display `--acc`, heads 25 px) revealed one per click, ending with a 2 × 2 in words (`.dx-words`).
Map version (slide 9, on `.g-64`): the study-area map on the left, the steps (with line swatches for each frame) on the
right; each step adds its layer to the map.

## 12. Epilogue

- **Answers** (`.ans`): three columns, one per research question, each with its colour: caps label
  ("RQ1 · BUILD"), the answer as a 96 px number ("592", "9/10", "1/7"), a 24 px label, and a 20 px gloss under
  a hairline. One column per click; at the last click two full-width 26 px paragraphs led by bold words
  ("**What is new:**", "**For GeoAI:**").
- **Back to the opening** (`.g2`): the opening tract on the full map (disagreeing tracts tinted, the tract
  solid `--sp` with a white outline, a ring and a haloed label "the opening tract"); right one lead sentence,
  then at click 1 the conclusion ("**The list is part of the measurement.**" + citations), next steps, the
  closing sentence.
- **Thank you**: same photo as the motivation slide, `sl` scrim, "Thank you." as a 180 px display, a
  lead, the logo with the repository URL, the title slide's glass plate without its Date column. No chrome.

## 13. Furniture that recurs on content slides

- **`.conv`** (top right, chrome row): five 9 px dots standing for the five steps of the usual chain, the
  current one bright, and one sentence "**Studies often buy a vendor's list,** while this one searches
  public Google listings in every ZIP code." Bold part = the usual practice; plain part = this study.
- **`.xrefs`** (bottom right): links to supplement pages, "S6 How names and addresses are matched →".
- **`.src`** (bottom left): sources and what the drawing is.
- **`.cite`** inline, right after the claim it supports.
- **Formula pin** (top right) on slides that report a rate defined earlier.

## 14. Supplement patterns

Same frame; eyebrow "Supplement · Tables C11, C31–C32" or "Linkage · step 2 · RapidFuzz"; a back chip
"↩ 13 Back to the talk" next to the act label. Patterns:

- **Method detail** (`.g-64`: visual left, `.col.jc` explanation right, or one centred column), one rule per
  click; labels 700 14 px caps; hairline-ruled steps; source names the code or library version and says
  "Computed live." when numbers come from the JS port.
- **Equation walk-through** (05 §6), **worked example + score line**, **interactive** (try-it inputs,
  sliders, toggles, a live 100 px result with an "CAN BE MATCHED" verdict).
- **Tables** (`.bk-tbl`, 05 §7), one or two side by side; a short bold-led paragraph under them.
- **Paper figure + numbered list** (`.gx`): `.fr-sub` lead (28 px), `ol.fr-list` (four cautions), a closing
  verdict over a 2 px `--acc` rule (`.fr-end`), the figure at 760 px with caption and licence.
- **Limitations** (`.lims`, two columns): numbered blocks (60 px `--tx3` numbers, 27 px heads, 21 px text,
  hairline top), and one full-width row with an arrow for the next step.
- **Practices grid** (`.sp-head` + `.sp-row`): five image heads (140 px crops) over the five steps of the
  chain, then rows labelled in 15 px caps ("PRACTICE", "ALL STEPS"), text 21 px.

## 15. Choosing a pattern

| You need to show | Use |
|---|---|
| Who you are, the title | §1 |
| A single place and a yes/no question | §2 |
| Why a field cares, where fields meet | §3 |
| Motivation with a human photo, a definition | §4 |
| Where we are in the argument | §5 anchor |
| How the usual method works, step by step | §5 chain + §6 + §7 |
| How prior studies compare | §8 |
| One step of your method | §9 |
| A result with a number and its meaning | §10 |
| A procedure with a diagram | §11 |
| Answers, conclusion, thanks | §12 |
| Detail for questions | §14, linked with `.xref` |
