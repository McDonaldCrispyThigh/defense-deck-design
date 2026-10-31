# 07 · Slide catalog: a reusable outline and the reference deck

Two parts. §1 is a field-neutral outline for a 20-minute research talk: 22 talk slots and a supplement, each
slot with its job, pattern, accent role and click plan. §2 is the reference deck (a geography thesis defense)
as that outline in use, slide by slide. Slot n of the outline is slide n of the reference deck, so the nearest
existing slide for any slot is the same row in §2. "Steps" = click states (builds + 1). Pattern numbers (§)
refer to 03-layout-patterns. Accent tokens are roles (02 §2); each talk assigns its own meanings to them.

## 1. Outline for a 20-minute research talk

Shape: three research questions, one act each, between a prologue and an epilogue. 22 talk slides fill
20 minutes. Method mechanics live in the supplement, reached by `.xref` links from the talk slide where the
question would arise. Every finding slot (13, 15, 16, 18, 19) follows the finding formula (01 §5) and the
number rules (01 §4): one or two rounded numbers, shares as fractions, big counts as plain numbers,
percentages only where a rate is defined with its formula, and a firm "So:" line beside each fraction.
Every content slot carries a `.src` line and shows each study its notes cite; the title, plan, recap and
thank-you slots (1, 8, 14, 22) carry no source line (01 §7).

Accent roles used below:

| `data-acc` | Role | Where the outline uses it |
|---|---|---|
| `wf` | source / condition A: what the study builds, measures or proposes | Act I; also the default accent, which photo slides keep |
| `bd` | source / condition B: the reference, comparison or second condition | Act II |
| `sp` | space / context / setting: where, when or for whom the results matter | fields, literature, Act III, Epilogue |
| `ai` | method / model / instrument | the decision step; field-level cautions |
| `w` | neutral (`--tx`) | the usual practice; limitations |

These are the outline's defaults. A slide about a different role than its part takes that role's accent,
and a role the talk does not have stays unused (02 §2). `--ok` (yes / agreement) and `--no` (no / error)
colour verdicts, lit cells and error rows inside a slide; no part of the outline takes either as its accent
(`--no` has no accent value).

Section labels name the question each part serves, in the talk's own words: `Prologue · Why <field> cares`,
`Act I · How <A> is built`, `Act II · How well <A> and <B> agree`, `Act III · What changes in <the outcome>`,
`Epilogue · What it means for <field>`. Angle brackets are placeholders.

| Slot | Job | Pattern | Accent | Steps (ref.) | Click plan |
|---|---|---|---|---|---|
| **Prologue** | **motivation, gap, question** | | | | |
| 1 Title | who, what, for which occasion | §1 | `wf`, photo, chrome off | 1 | — |
| 2 Hook | one real case, one question, two answers that differ only because of what the study examines | §2 | `wf`, photo | 4 | the case comes into view · both answers with verdict words (`--ok` / `--no`) · one bold line naming what changed |
| 3 Why the fields care | name the fields the study joins; the study sits where they meet | §3 | `sp` | 4 | one field per click · the study at the intersection, with why now, the gap, the question |
| 4 Why the subject matters | the stakes beside a photo of the people or setting the work concerns: facts, each a number, a sentence and a citation | §4 facts | `wf`, photo | 1 | — |
| 5 The usual practice | walk the standard procedure step by step to where it goes wrong; then what this study changes and what that yields | §5 chain + §6 + §7 | `w` | 10 | one scene per step · usual-problem row · this-study row · result row |
| 6 Literature | prior studies on a row × column map with axis titles; the gap shown empty, then named, then filled | §8 | `sp` | 5 | one row per click · the gap named · the gap filled by the study ("● This thesis" in the reference) |
| 7 Definition | the verbatim definition of the key object, then one worked example of it | §4 definition | `wf`, photo | 1 | — |
| 8 The plan | the rail: the study's five steps with the research questions on them | §5 anchor `done=0` | `wf` | 2 | lens on step 01, "next" |
| **Act I · RQ1** | **how the evidence is produced** | | | | |
| 9 Setting and frames | where, when and on what the study runs (area, sample, cohort, corpus, apparatus) and the frames later steps use | §11 layered-figure version (on `.g-64`) | `wf` | 4 | one frame or layer per click |
| 10–11 Method steps | one step per slide, titled as a fact: inputs, the arithmetic, what comes out; a `.conv` line contrasts the usual practice where it applies (§13) | §9 | `wf` | 4 each | one part of the step per click · the running unit's note last (`.cub-note`) |
| 12 The decision | the judgment flow: evidence → yes-or-no questions → verdict; a real error row stays in if the method makes one | §9 judgment flow | `ai` | 1 | — |
| 13 RQ1 finding | what the method adds over the simple alternative | §10 count matrix | `wf` | 3 | one lit cell per click, each with its meaning; the "So:" line and its citation with the last cell |
| **Act II · RQ2** | **how well it holds against the reference** | | | | |
| 14 Recap | where we are: the rail with steps 1–3 done and their results | §5 anchor `done=3` | `bd` | 3 | running-unit cell fills · lens springs to the next step |
| 15 RQ2 finding: agreement | the agreement rates, each written out as a formula at first use; the last click replaces the figure with one real instance | §10 Venn + formulas | `bd` | 4 | one rate per click (the title follows, `.tswap`) · the real instance |
| 16 RQ2 finding: errors | what A missed and what it wrongly included, side by side | §10 two columns | `bd` | 2 | the second column |
| **Act III · RQ3** | **what changes downstream** | | | | |
| 17 The common measure | the same rule applied to A and B: a diagram and numbered steps ending in a 2 × 2 in words | §11 | `sp` | 5 | one step per click |
| 18 RQ3 finding: where results differ | the figure with legend and furniture, a count, its 2 × 2 table and the "So:" line; a glass control switches the parameter and rewrites every number, the title and the "So:" line | §10 figure + result column | `sp` | 3 | one parameter value per click; the control works at any time |
| 19 RQ3 finding: why and where | three numbered findings beside the figure, each with its "So:" and, where one exists, the comparable study | §10 figure + numbered findings | `sp` | 3 | one finding per click; the figure's encoding changes at the last click (re-shading, in the reference) |
| **Epilogue** | **what it means** | | | | |
| 20 Answers | one column per research question in its colour, one number each; then "What is new:" and the field-level stance | §12 answers | `sp` | 3 | one column per click · the two closing paragraphs with the last column |
| 21 Back to the opening | the hook's case again, read with the findings | §12 back to opening | `sp` | 2 | conclusion, next steps and closing line |
| 22 Thank you | thanks and where to find the work | §12 thanks | `wf`, photo, chrome off | 1 | — (presenter switches to Q&A mode) |

### Supplement

Order the pages in talk order, each linked from the talk slide where its question arises (`.xref`, 06 §4).
A page that no talk slide links to continues the run before it, and its back chip returns to the same talk
slide.

| Behind slot | Content | Pattern | Accent |
|---|---|---|---|
| 10–12 | the evidence in full; the model or instrument settings verbatim | §14 method detail, tables | `wf`, `ai` |
| 13 | the RQ1 breakdown tables | §14 tables | `wf` |
| 15–16 | the matching or scoring mechanics as one run: one rule per page, an equation walk-through, a worked example, a try-it page, calibration, the final assignment; then the records A missed | §14 method detail, equation walk-through, worked example + score line, interactive, tables | `bd` |
| 18–19 | every sensitivity check in one table with a formula pin; a detail figure for each finding | §14 tables, §10 figure layouts | `sp` |
| 20 | results at several levels; field-level cautions with a paper figure; practices for others | §5 three levels, §14 paper figure + numbered list, practices grid | `sp`, `ai` |
| 21 | limitations and next steps, stated once as facts | §14 limitations | `w` |

### Adapting the outline

- **Room**: the last research question gets at least as much room as each earlier one; method slides never
  squeeze the findings. Mechanics go to the supplement (01 §2).
- **A different argument**: the act jobs above fit a study that builds something, checks it and applies
  it. Any other argument keeps the shape of 01 §2: one act per research question, its few method slides,
  then its finding slides, each act titled by its own question.
- **Two or four research questions**: one act per question. Add or drop act slides; keep slots 1–8 and 20–22.
  The answers grid `.ans` (slot 20) has three columns (03 §0), so a talk with two or four questions sets its
  own column count there.
- **No second condition**: Act II reports the second question. Slots 15 and 16 keep their layouts for any
  two-part result (overlap plus rates; two sides side by side). If that part compares against something,
  the comparison is B and takes `bd`; if it does not, `bd` stays unused and Act II takes the accent of the
  role it is about (02 §2).
- **Figures of any kind**: the figure layouts in §10 and §11 (figure + result column, figure +
  numbered findings, layered figure) take any real figure on the same `.g-64` grid, with the furniture
  05 §0 requires: north arrow, scale bar and legend on maps; axis titles with units and a legend on plots;
  a scale bar on images of specimens or samples; row and column axis titles on tables.
- **Recaps**: the plan (8) opens Act I; one recap (14) opens Act II; Act III opens without one.
- **Length**: measure your pace in words a minute and your track's length, and fit the slide count to the
  slot; the presenter speaks from the keywords, not the script (01 §2, §9).
  Example (reference deck): 22 slides for 20 minutes; a talk track of about 2,190 words, ≈ 21 minutes at
  about 104 words a minute.
- **Assigning A, B and the key objects** for a new field: 09-adapting-to-your-field.

### Running examples

Two running examples carry the talk:

- one **case** that opens and closes it: hook (2), the plan's rail row (8), setting (9), common measure (17),
  the RQ3 figure (18), back to the opening (21);
- one **unit** followed through every step: usual practice (5), definition (7), rail rows (8, 14), setting
  and method steps (9–12), RQ2 (15–16) and the supplement mechanics.

Both appear as rows under the rail (`.track-ex`, 03 §5). The unit's row shows unless a slide sets
`data-cub="0"`; the case's row shows on the plan (`data-tract="1"`) and once all five stations are done.

- Example (reference deck, a geography thesis): the case is census tract 27123032500, 0.32 mi to the nearest
  pharmacy on "my list" and 0.70 mi on "the state list"; the unit is the Cub in Maple Grove, one supermarket
  with two Google listings (the store and its pharmacy counter).
- Example (another field, illustrative): a talk on a new clinical assay takes one patient who tests positive
  on the new assay and negative on the reference test as the case, and one specimen followed from collection
  through each processing step as the unit.

## 2. Example: the outline in use (reference deck, a geography thesis defense, as of 2026-10-29)

The thesis builds a pharmacy list from Google listings with a language model ("my list", `wf`), checks it
against the state licence list ("the state list", Minnesota Board of Pharmacy, `bd`), and compares
straight-line distance to the nearest pharmacy from Minneapolis–St. Paul census tracts under both lists
(`sp`); the model is `ai`. Everything below is that thesis's content.

47 slides, 132 click states. Talk 1–22, supplement S1–S25 (S n = deck slide n + 22). A supplement page that
no talk slide links to continues the run before it, and its back chip returns to the same talk slide (S7–S15
return to 15). Source files of the reference implementation, under `docs/defense/slides/`:
`v2-0-prologue.js` (1–8), `v2-1-act1.js` (9–13), `v2-2-act2.js` (14–16), `v2-3-act3.js` (17–19),
`v2-4-epilogue.js` (20–22), `v2-5-supplement.js` (S1–S25).

### Talk

| # | `data-title` | Section · accent | Pattern | Steps | What each click adds |
|---|---|---|---|---|---|
| 1 | Title | open · wf, photo `sl`, chrome off | §1 | 1 | — |
| 2 | Is there a pharmacy nearby? | open · wf, photo `sf`, demo `hook` | §2 | 4 | map zooms to the tract · both answers (0.32 mi Yes / 0.70 mi No) · "Only the list changed." |
| 3 | Why geography cares | open · sp | §3 | 4 | GIScience circle · GeoAI circle · "This thesis", why now, the gap, the question |
| 4 | Why pharmacies matter | open · wf, photo `half l`, act off | §4 facts | 1 | — (≈2×, ½ and 1 mi, 1 mi; each cited) |
| 5 | From an establishment to a desert map | open · w, demo `chain` | §5 chain + §6 + §7 | 10 | list of places (vendor record) · industry-code filter "?" · geocoding offset ≈80 m · distance test Yes · counter missing → No · published desert map · Usual problem row · This thesis row · Result row |
| 6 | Where this thesis sits in the literature | open · sp | §8 | 5 | "checked against a reference" row · "tested on an access measure" row · "No study tested this" · "● This thesis" |
| 7 | What counts as a pharmacy | open · wf, photo `half` | §4 definition | 1 | — (definition + the Cub's two listings) |
| 8 | The plan: build, check, map | open · wf, anchor `done=0`, `sx blur` | §5 anchor | 2 | lens on 01 "next" |
| 9 | Study area and frames | act1 · wf, demo `area` | §11 layered-figure version (a map) | 4 | 60 searched ZIPs · 102-ZIP supply area · 327 tracts, the Cub, the opening tract |
| 10 | Step 1: search | act1 · wf, demo `search` | §9 input and arithmetic | 4 | capped cell "60" · nested grids + 2,062 · Cub found twice |
| 11 | Step 2: evidence | act1 · wf, demo `evidence` | §9 evidence | 4 | archived-site row · never-archived row · Cub note |
| 12 | Step 3: four questions | act1 · ai | §9 judgment flow | 1 | — |
| 13 | RQ1: model versus keywords | act1 · wf | §10 count matrix | 3 | 150 lit green + block · 66 lit red + block + So: |
| 14 | The workflow so far: the list | act2 · bd, anchor `done=3`, `sx blur` | §5 anchor | 3 | Cub cell "store listing also kept" · lens springs to Compare "next" |
| 15 | RQ2: how well the lists match | act2 · bd, demo `euler` | §10 Venn + formulas | 4 | after the model (161/413) · by address (161/272) · one building, four listings |
| 16 | RQ2: what the list missed and got wrong | act2 · bd, demo `miss` | §10 two columns | 2 | wrongly-included column |
| 17 | The same ruler for both lists | act3 · sp, demo `ruler` | §11 diagram + steps | 5 | grid / straight line · nearest pharmacy per list · ½-mile ring · 2 × 2 in words + caveat |
| 18 | RQ3: where the lists disagree | act3 · sp, demo `rmap2` | §10 figure + result column (a map) | 3 | 1 mile (46) · 2 miles (4); buttons switch any time |
| 19 | RQ3: why and where | act3 · sp, demo `rq3why` | §10 figure + numbered findings (a map) | 3 | finding 2 · finding 3 + map shaded by income |
| 20 | Summary of findings | close · sp | §12 answers | 3 | RQ2 9/10 · RQ3 1/7 + What is new + For GeoAI |
| 21 | Back to the opening question | close · sp, demo `hookback` | §12 back to opening | 2 | conclusion, next steps, closing line |
| 22 | Thank you | close · wf, photo `sl`, chrome off | §12 thanks | 1 | — (presenter switches to Q&A mode) |

### Supplement

| S | `data-id` · title | Accent | Pattern / demo | Steps | Linked from |
|---|---|---|---|---|---|
| S1 | `s-fp` Store-specific, fingerprinted evidence | wf | mock web pages + SHA-256 try-it (`fp`) | 3 | 11 |
| S2 | `s-evid` Evidence and judgments | wf | two `.bk-tbl` | 1 | 11 |
| S3 | `s-prompt` Model instruction | ai | verbatim prompt (`.bk-text`, pre-wrap 21 px) | 1 | 12 |
| S4 | `s-rq1` RQ1: what decided the list | wf | animated bars + table | 1 | 13 |
| S5 | `s-kw66` The 66 kept without a keyword | wf | three small tables | 1 | 13 |
| S6 | `s-names` Name finds the brand, address finds the store | bd | record boxes linked to one Board record (`cubmatch`) | 3 | 15 |
| S7 | `s-board` The Board reference | bd | funnel bars | 1 | S6 |
| S8 | `s-clean` Linkage step 1: clean names | bd | string cleaning per click (`clean2`) | 5 | S6 |
| S9 | `s-indel` RapidFuzz: count the edits | bd | letter tiles + alignment lines (`indel`) | 4 | — (continues the S6 run) |
| S10 | `s-tsort` Sort the words first | bd | word chips that re-sort + try-it (`tsort`) | 4 | — (continues the S6 run) |
| S11 | `s-eq` Linkage step 3: the pair score | bd | Equation 3.1 term by term (`eq`) | 6 | — (continues the S6 run) |
| S12 | `s-worked` Scoring the Cub | bd | worked example + score line (`worked`) | 3 | — (continues the S6 run) |
| S13 | `s-score` Try the pair score | bd | sliders, toggles, gauge (`score2`) | 1 | — (continues the S6 run) |
| S14 | `s-why` Why these numbers | bd | canvas histogram + steps (`calib2`) | 3 | — (continues the S6 run) |
| S15 | `s-calib` Linkage calibration | bd | two tables + pin | 1 | S6 |
| S16 | `s-121` Linkage step 4: one-to-one | bd | assignment matrix (`assign3`) | 5 | 15 |
| S17 | `s-unmatched` Missed state-list pharmacies | bd | three-column record table | 1 | 16 |
| S18 | `s-sens` Spatial sensitivity: all checks | sp | four-column table + pin | 1 | 18 |
| S19 | `s-flip` RQ3 detail: why tracts change | sp | map (gap shading → outlines) + formula (`flipmap`) | 3 | 19 |
| S20 | `s-miss` RQ3 detail: missing locations | sp | map + county tags + dot strip (`sens4`) | 3 | 19 |
| S21 | `s-quart` RQ3 detail: where disagreement falls | sp | quartile map + income / non-White switch (`quartmap`) | 4 | 19 |
| S22 | `s-levels` The list changes results at three levels | sp | three-station rail (`levels`) | 4 | 20 |
| S23 | `s-geoai` GeoAI: four cautions | ai | numbered list + paper figure | 1 | 20 |
| S24 | `s-limits` Limitations and next steps | w | `.lims` | 1 | 21 |
| S25 | `s-practice` Practices for building place data with models | ai | practices grid | 1 | 20 |

### Running examples in the reference deck

- **The Cub, Maple Grove** (the unit; one supermarket, two Google listings: the store and its pharmacy
  counter): slide 5 (the usual chain), 7 (definition), 8/14 (rail row), 9 (map dot), 10 (found twice),
  11 (archive), 12 (the model's error), 15 (the Cub's two listings at one address), 16 (notes: the state-list
  match went to the store listing), S6–S8, S10, S12–S14, S16 (linkage worked through; S9, S11 and S15 use
  other examples or none).
- **Tract 27123032500, Ramsey County** (the case; 0.32 mi on my list, 0.70 mi on the state list): slide 2
  (hook), 8 (rail row), 9 (ring), 17 (ruler distances), 18 (white outline), 21 (back to the opening).
