# 07 · Slide catalog (the deck as of 2026-10-29)

47 slides, 132 click states. Talk 1–22, supplement S1–S25 (S n = deck slide n + 22). A supplement page that no talk slide links to
continues the run before it, and its back chip returns to the same talk slide (S7–S15 return to 15). "Steps" = click
states (builds + 1). Pattern numbers refer to 03-layout-patterns.

## Talk

| # | `data-title` | Section · accent | Pattern | Steps | What each click adds |
|---|---|---|---|---|---|
| 1 | Title | open · wf, photo `sl`, chrome off | §1 | 1 | — |
| 2 | Is there a pharmacy nearby? | open · wf, photo `sf`, demo `hook` | §2 | 4 | map zooms to the tract · both answers (0.32 mi Yes / 0.70 mi No) · "Only the list changed." |
| 3 | Why geography cares | open · sp | §3 | 4 | GIScience circle · GeoAI circle · "This thesis", why now, the gap, the question |
| 4 | Why pharmacies matter | open · wf, photo `half l`, act off | §4 facts | 1 | — (≈2×, ½ and 1 mi, 1 mi; each cited) |
| 5 | From an establishment to a desert map | open · w, demo `chain` | §5 chain + §6 + §7 | 10 | list of places (vendor record) · industry-code filter "?" · geocoding offset ≈80 m · distance test Yes · counter missing → No · published desert map · Usual problem row · This thesis row · Result row |
| 6 | Where this thesis sits in the literature | open · sp | §8 | 5 | "checked against a reference" row · "tested on an access measure" row · "No study tested this" · "● This thesis" |
| 7 | What counts as a pharmacy | open · wf, photo `half` | §4 quote | 1 | — (definition + the Cub's two listings) |
| 8 | The plan: build, check, map | open · wf, anchor `done=0`, `sx blur` | §5 anchor | 2 | lens on 01 "next" |
| 9 | Study area and frames | act1 · wf, demo `area` | §11 map + steps | 4 | 60 searched ZIPs · 102-ZIP supply area · 327 tracts, the Cub, the opening tract |
| 10 | Step 1: search | act1 · wf, demo `search` | §9 search | 4 | capped cell "60" · nested grids + 2,062 · Cub found twice |
| 11 | Step 2: evidence | act1 · wf, demo `evidence` | §9 evidence | 4 | archived-site row · never-archived row · Cub note |
| 12 | Step 3: four questions | act1 · ai | §9 judgment flow | 1 | — |
| 13 | RQ1: model versus keywords | act1 · wf | §10 count matrix | 3 | 150 lit green + block · 66 lit red + block + So: |
| 14 | The workflow so far: the list | act2 · bd, anchor `done=3`, `sx blur` | §5 anchor | 3 | Cub cell "store listing also kept" · lens springs to Compare "next" |
| 15 | RQ2: how well the lists match | act2 · bd, demo `euler` | §10 Venn + formulas | 4 | after the model (161/413) · by address (161/272) · one building, four listings |
| 16 | RQ2: what the list missed and got wrong | act2 · bd, demo `miss` | §10 two columns | 2 | wrongly-included column |
| 17 | The same ruler for both lists | act3 · sp, demo `ruler` | §11 diagram + steps | 5 | grid / straight line · nearest pharmacy per list · ½-mile ring · 2 × 2 in words + caveat |
| 18 | RQ3: where the lists disagree | act3 · sp, demo `rmap2` | §10 map + result | 3 | 1 mile (46) · 2 miles (4); buttons switch any time |
| 19 | RQ3: why and where | act3 · sp, demo `rq3why` | §10 map + findings | 3 | finding 2 · finding 3 + map shaded by income |
| 20 | Summary of findings | close · sp | §12 answers | 3 | RQ2 9/10 · RQ3 1/7 + What is new + For GeoAI |
| 21 | Back to the opening question | close · sp, demo `hookback` | §12 back to opening | 2 | conclusion, next steps, closing line |
| 22 | Thank you | close · wf, photo `sl`, chrome off | §12 thanks | 1 | — (presenter switches to Q&A mode) |

## Supplement

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

## Running examples across the deck

- **The Cub, Maple Grove** (one supermarket, two Google listings: the store and its pharmacy counter):
  slide 5 (the usual chain), 7 (definition), 8/14 (rail row), 9 (map dot), 10 (found twice), 11 (archive),
  12 (the model's error), 15 (the Cub's two listings at one address), 16 (notes: the state-list match went to the store listing),
  S6–S8, S10, S12–S14, S16 (linkage worked through; S9, S11 and S15 use other examples or none).
- **Tract 27123032500, Ramsey County** (0.32 mi on my list, 0.70 mi on the state list): slide 2 (hook),
  8 (rail row), 9 (ring), 17 (ruler distances), 18 (white outline), 21 (back to the opening).
