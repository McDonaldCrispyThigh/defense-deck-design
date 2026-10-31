# 09 · Adapting the design system to your field

The tokens, patterns, motion and engine (02–06) are the same in every discipline. A field changes only the
content: the running case, the figures and their furniture, the meaning of the colour roles, the three
listeners and a few rule readings. §4–§5 compare ten field families; §6–§15 give each one's figures,
"So:" line and adjustments; §16 is the checklist. Lines marked illustrative are phrasing, not findings.

## 1. What stays fixed in every field

- **No cards**: never put content in boxes, tiles, panels, pill chips or tabbed containers; hairlines,
  whitespace, type, icons and real figures separate content; filled shapes are data marks only (02 §8).
- **Numbers** (01 §4): one or two rounded numbers per slide; shares as fractions (3/10, never "3 in 10");
  big counts as plain numbers; each fraction on a finding slide with a firm "**So:**" line; percentages
  only for a rate written out as a formula at first use (`Deck_afx`, 05 §5); caveats and exact figures in
  the notes' "If asked:" line.
- **Evidence on the slide** (01 §7): every study the notes cite is visible as `.cite`; every content slide
  has a `.src` line; only studies from the work's own reference list, every number checked against the
  work; illustrative content is labelled as illustrative.
- **Figures read without the speaker** (05 §0; field types in §3). **Bold, not defensive** (01 §6).
- **The user's wording is final; frozen copies stay frozen** (SKILL.md, non-negotiables).
- **English by default**; ask once whether the presenter wants a second language, and which; it serves
  presenter material only, and the audience screen stays English (SKILL.md, Language; 06 §7).
- **Three listeners** (01 §3): an expert in your field, someone from a neighbouring field and a
  quantitatively trained outsider all follow every slide. No invented terms; one name per key object; rates
  named in words first, the technical term in parentheses; a one-line gloss for a necessary term the first
  time; groups of people described respectfully.

## 2. What each talk decides

| Decision | Where it lives | Example (reference deck, a geography thesis) |
|---|---|---|
| The fields the talk serves, named first | 01 §1; fields diagram 03 §3 | health geography, GIScience, GeoAI as three circles, "This thesis" at the intersection |
| The case that opens and closes the talk | hook 03 §2; closing slide 03 §12 | one census tract, 0.32 mi to the nearest pharmacy on one list, 0.70 mi on the other |
| The object followed through every step | rail row `.track-ex` (03 §5) | one supermarket with two online listings (the Cub in Maple Grove) |
| Section labels | the `label` of each `engine.js SECTIONS` entry; ids and `n` stay fixed (06 §2) | "Prologue · Why geography cares" … "Epilogue · What it means for geography" |
| The five rail stations | `.stations` (03 §5) | Find places · Describe them · Decide · Compare · Map |
| The names of the key objects | slide text, legends, notes | "my list" and "the state list" |
| The usual practice the study departs from | `.conv` (03 §13); chain (03 §5–§7) | "Studies often buy a vendor's list" |

The six semantic tokens keep their names and values; each talk assigns their meanings once, before the
first slide, and keeps them fixed (§5 for typical assignments).

| Token | Role | Example (reference deck) |
|---|---|---|
| `--wf` blue | source or condition A | my list, built from online listings; Act I accent |
| `--bd` amber | source or condition B | the state list, the reference; Act II accent |
| `--sp` cyan | space, context, setting | the map; Act III and Epilogue accent |
| `--ai` purple | method, model, instrument | the language model |
| `--ok` green | yes, agreement | include, match |
| `--no` red | no, error | exclude, miss |

Non-semantic emphasis takes `--tx` or `--acc`; tints are `color-mix(in srgb, <token> N%, transparent)`,
never a new hex. A role colour carries only its role (08 #21): a group of people is never coloured `--no`,
because a group is not an error.

## 3. Figure furniture by figure type

| Figure | Required furniture | Build it with |
|---|---|---|
| Map, site plan, floor plan | north arrow, scale bar, legend whose swatches equal the fills | `.map`, `Deck.mapFurniture(svg)` after every viewBox change, `.map-lg` (05 §2). The reference `mapFurniture` reads the one global `MAPDATA.metersPerUnit` and labels miles: a figure in another unit or scale edits that constant and label (05 §2) |
| Plot or chart | axis titles with quantity and unit, tick labels, legend or direct labels in the series colour | bars, unit rows, histogram, score line (05 §4); axis titles 600 18 px as on S14 |
| Image of a specimen, sample or material | scale bar with length and unit; a legend for every channel, stain or false colour shown | `figure` + `.gx-fig` + `.gx-cap` (05 §8); the bar in the image file or drawn over it in the map bar's style (05 §0, §2); the engine has no helper for images |
| Table | row and column axis titles; units and denominators in the header | `.bk-tbl` (05 §7); `.lmap` with `.ax-col` / `.ax-row` (03 §8); `.km`, `.dx` (05 §4) |
| Schematic diagram | "Diagram schematic" in `.src`; no scale bar | SVG as in 05 §3 |
| Equation | number matching the written work (thesis, paper); every symbol defined on the slide | `.eq` + `.eqno` + `.defs` (05 §6) |
| Quotation | verbatim; author, work and page or line in `.cite` | `.quote` (02 §6, 03 §4) |
| Figure from a paper, archive or collection | author or holder, year, figure number or shelfmark, licence or rights | `.gx-cap` (05 §8) |

## 4. Cases and listeners by field

| Field | Case that opens and closes the talk | Expert · neighbour · quantitative outsider |
|---|---|---|
| Earth and environment, geography | one place or site: a watershed, a station, a neighbourhood | your subfield · another subfield · an applied mathematician. Example (reference deck): a quantitative health geographer · a physical geographer · an applied mathematician |
| Life sciences, lab biology | one specimen, organism, cell line or gene, followed through the protocol | a biologist in your area · one at another scale (an ecologist for a cell talk) · a statistician or physicist |
| Medicine, public health | one patient journey (composite and labelled, or de-identified with consent), one clinic, one community | a clinician in your specialty · an epidemiologist, nurse or other specialist · a data scientist |
| Engineering | one component, structure, circuit or prototype, from requirement to test | your discipline · another engineering discipline · a scientist or industry partner |
| Computer science, AI | one input followed through the system: a query, an image, a program, a request | your subarea · another subarea · a domain scientist or statistician |
| Mathematics, statistics | one small instance worked by hand: a five-vertex graph, n = 3, one dataset | your area · another area · a scientist or engineer who uses the result |
| Physics, chemistry | one sample, measurement, molecule, reaction or event | your subfield · a materials scientist or other neighbour · a mathematician or engineer |
| Social sciences | one person, household, firm, school or election, anonymised or composite and labelled | your discipline · another social science (a psychologist for an economics talk) · a statistician |
| Humanities | one passage, document, letter, object or argument, read again at the end with the answer | your period or text · another humanities field · a scientist who reads closely |
| Arts, design, architecture | one work, building, site or design iteration | a practitioner or critic · an adjacent design field · an engineer or social scientist |

## 5. Colour roles by field

| Field | `--wf` A (own, new) / `--bd` B (reference, comparison) | `--sp` | `--ai` | `--ok` / `--no` |
|---|---|---|---|---|
| Earth and environment, geography | new data source / established one; two scenarios or periods | study area, the map | model, sensor, classifier | agree / disagree; within / beyond a threshold |
| Life sciences, lab biology | treatment / control; mutant / wild type | tissue, compartment, field site | assay, stain, imaging instrument | effect / no effect; pass / fail |
| Medicine, public health | intervention / comparison; new test / reference test | setting, region, community | test, screening instrument, model | correct / incorrect classification |
| Engineering | new design / baseline | environment, load case, geometry | controller, model, sensor | within / outside specification |
| Computer science, AI | your system / baseline; two datasets | data, domain, deployment setting | the model | correct / incorrect |
| Mathematics, statistics | new estimator / standard one; two conditions or proof cases | domain, space | algorithm, method | holds / fails (a counterexample) |
| Physics, chemistry | measurement / prediction; two samples | geometry, phase, setting | instrument, simulation | agrees / disagrees with the prediction |
| Social sciences | treatment / control; survey / register; two groups | place, institution, context | model, instrument, questionnaire | yes / no answers; agreement / disagreement |
| Humanities | the text studied / its comparison; two authors, editions or readings | place, period, context | method (a corpus tool, a dating method) | present / absent; supports / contradicts |
| Arts, design, architecture | new design / earlier version; two works | site, context | tool, process, fabrication method | meets / misses the brief |

## 6. Earth and environmental sciences, geography

- **Figures**: maps; time series; cross-sections (vertical exaggeration in `.src`); field photos (02 §4).
- **So:** Example (reference deck): "So: a desert map at ½ or 1 mile depends on whose list draws it."
- **Adjust**: claim no spatial pattern the study does not state; pair two encodings as fill and outline
  (05 §2).

## 7. Life sciences and lab biology

- **Figures**: micrographs, gels and blots, dose-response curves, per-sample dot plots, protocol schematics.
- **So:** (illustrative) "So: without the gene the cells still divide, but 3/10 of them lose the marker."
- **Adjust**: your own images are data: a `figure` with scale bar, channel legend and "representative of
  n" in `.gx-cap`, never a scrimmed `data-photo`; n on every plot or caption. A channel colour that collides
  with a token (green beside `--ok`) is named in the legend, and the slide then uses no semantic green.

## 8. Medicine and public health

- **Figures**: participant flow as funnel bars (05 §4, S7) or a schematic with counts at each step;
  survival curves (time and unit on x, numbers at risk under the axis); forest plots (axis title with the
  measure, a line at no effect, legend); maps of rates (§3).
- **So:** (illustrative) "So: one screening visit is enough; a second visit finds 1/20 more cases."
- **Adjust**: sensitivity, specificity and incidence are rates: `Deck_afx` first, `Deck_pin` later (in
  the reference implementation, an `FX` entry `{ name, c, top, bot }` in `js/v2-fx.js`). Absolute shares
  (2/100 against 4/100) before any relative change; person-first names ("people with diabetes"); patient
  images only de-identified and with consent, stated in `.src`.

## 9. Engineering

- **Figures**: block diagrams (schematic SVG; icons `I.cpu`, `I.gear`, `I.ruler`); prototype drawings and
  photos with a dimension line or scale bar; performance curves; field plots with a legend in units.
- **So:** (illustrative) "So: the new bracket carries the design load; the old one cracks first."
- **Adjust**: a unit on every number and axis; tolerances and test conditions go to "If asked:". A
  pass/fail threshold is drawn like the score line's 3 px `--tx` tick (05 §4).

## 10. Computer science and AI

- **Figures**: architecture diagrams (schematic SVG, icons `I.code`, `I.db`, `I.cpu`, `I.layers`);
  benchmark tables (`.bk-tbl`); scaling and learning curves (units: tokens, seconds, examples); confusion
  matrices as a 2 × 2 `.km` or `.dx` with row and column heads.
- **So:** (illustrative) "So: the small model gets 9/10 right too; this task needs no large model."
- **Adjust**: accuracy, F1 and error rates are rates (`Deck_afx` at first use). Model name and version on
  the slide (the `.jflow` decision block, 03 §9: name 700 32 px `--ai`, version 16 px mono). Code, prompts
  and identifiers appear verbatim in mono (`.mono`, `.tok`; a verbatim prompt as `.bk-text`, as on S3) only
  as shown evidence or in the supplement; talk text names them in plain words (01 §3). No typewriter text
  or terminal animation: the one typing element is the search bar of 03 §9 (04 §11). Benchmark and dataset
  versions in `.src`.

## 11. Mathematics and statistics

- **Figures**: equations; object diagrams (schematic SVG); simulation plots ("dimensionless" if no unit).
- **So:** (illustrative) "So: the estimator stays unbiased when 1/10 of the values are missing."
- **Adjust**: the number rule counts empirical numbers, not symbols; a ratio inside a theorem is maths
  (`.eq` fractions, `.mth`), not a share. One equation per slide, walked term by term with `data-hl` and
  `.defs` (05 §6). The theorem is the finding: the title states it in words, the formal statement sits
  below; one proof step per click; full proofs in the supplement. Render-check new symbols (08 #1).

## 12. Physics and chemistry

- **Figures**: spectra and data plots (axis titles as quantity and unit, "wavelength (nm)"; error bars
  defined in the caption); apparatus and structure schematics; micrographs with a scale bar; equations.
- **So:** (illustrative) "So: the peak sits where the model puts it; the model needs no extra term."
- **Adjust**: every headline measurement carries its unit and uncertainty; the uncertainty's definition
  goes to `.src` or "If asked:". Conventional element colours collide with the tokens: label atoms with
  letters in `--tx` / `--tx2` and keep semantic colour for the claim.

## 13. Social sciences (economics, sociology, psychology, political science)

- **Figures**: coefficient plots (axis title in the outcome's unit, a line at zero, legend); unit rows or
  bars (`.mg2`, `.bar`, 05 §4); survey distributions; regional maps (§3); interview quotations (`.quote`).
- **So:** (illustrative) "So: the subsidy reaches the households it was written for; half the gap closes."
- **Adjust**: causal words only where the design identifies an effect (01 §7). Groups named by their
  defining measure. Example (reference deck): "lower-income / higher-income neighborhoods", never poor or
  rich. Participants under pseudonyms, consent in `.src`; exact estimates and intervals go to "If asked:".

## 14. Humanities (history, literature, philosophy)

- **Figures**: quotations (`.quote`); archival images and manuscript pages (`figure` + `.gx-cap`);
  timelines (schematic; `.src` "Timelines drawn schematically"); maps of historical places (§3); a source
  table with row and column titles (`.lmap`, 03 §8).
- **So:** (illustrative) "So: the poem answers the treaty; it cannot have inspired it."
- **Adjust**: a quotation is the slide's evidence: verbatim, short enough to read in one click, author,
  work and page in `.cite`. A quotation in another language stands verbatim with the English translation
  under it and the translator named: evidence on the audience screen, not the presenter-only second
  language (06 §7). Show an archival item whole before any labelled detail; holder, shelfmark and rights in
  the caption. An argument runs as numbered premises (`.steps` or `ol.fr-list`), one per click, the
  conclusion over a 2 px `--acc` rule (`.fr-end`). A finding slide without numbers still carries its "So:"
  line (01 §5).

## 15. Arts, design and architecture

- **Figures**: images of works; plans, sections and elevations; iterations side by side (`.mw2`, `.g2`);
  process timelines. Tokens colour annotations, never the work.
- **So:** (illustrative) "So: the second facade brings daylight to every desk; 7/10 users chose it."
- **Adjust**: works are figures, never `data-photo` backgrounds: the scrim and Ken Burns zoom (02 §4) alter
  them. Show a work uncropped and untinted, on the white plate of 05 §8 (`background: #fff`, radius 14)
  where its colours must read correctly, credited with artist, title, year, medium, collection and rights.
  Plans carry a north arrow, scale bar and legend, like maps; sections and elevations carry a scale bar and
  legend. A portfolio of framed tiles is a card grid: use whitespace and captions.

## 16. Checklist for a new field

- [ ] Name the fields or traditions the talk serves; they open the talk (03 §3 or the title-slide lead).
- [ ] Choose the case that opens and closes the talk and, if the method has steps, the object on the rail.
- [ ] Rename the five rail stations and the section labels (`label` in `engine.js SECTIONS`) for your
  argument.
- [ ] Write this talk's colour-role table (A, B, setting, method, yes, no) and keep it fixed.
- [ ] Name the three listeners; list the terms each would not know; gloss each once; one name per object.
- [ ] List the figure types and their furniture (§3); with maps or plans, set the scale bar's unit (miles in
  the reference implementation) to the talk's unit.
- [ ] Define every percentage as a rate (`Deck_afx` / `Deck_pin`); state every other share as a fraction.
- [ ] Draft the "So:" line for every finding before building its slide.
- [ ] Move mechanics, proofs and limitations to the supplement, linked with `.xref`; caveats and exact
  figures to the notes' "If asked:" line.
- [ ] Ask the user once about a second language for presenter material.
- [ ] Copy the nearest pattern (03 §15); add no new token or engine feature; new CSS goes only to
  `css/v2-frame2.css` under a dated comment, scoped to a slide class (SKILL.md, 06 §1).
