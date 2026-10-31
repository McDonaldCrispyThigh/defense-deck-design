# 01 · Narrative, wording, evidence

How the talk argues. These rules hold for a talk in any discipline. They were first worked out on one
reference deck, a geography honors-thesis defense, from the author's corrections and the advisor's
feedback. Examples marked "reference deck" come from that talk; examples marked "illustrative" are
invented to show the same rule in another field. `references/09-adapting-to-your-field.md` maps the
reference deck's choices onto other fields.

## 1. Start from the field's question

The audience (at a defense, the committee) must see in the first minute why their field cares. Every talk
follows one order:

1. **Name the fields, or the audience, first.** Say which fields the work speaks to (three in the
   reference pattern, 03 §3), each with its sources, then place the work where they meet, with why now,
   the gap and the question.
2. **Pose the problem as a question the field already asks**, about the object of study (the places,
   patients, texts, materials, organisms, firms or systems the work is about), not about the method.
3. **Open and close on one concrete case from your field.** The hook slide shows it; the closing slide
   returns to it with the answer.
4. **Carry one concept diagram through the talk as the spine.** It shows where the talk is: it appears
   at the plan and returns as the recap that opens a later act (the reference implementation is the rail,
   03 §5).
5. **Keep methods to a few plainly titled slides.** Mechanics go to the supplement.
6. **Title findings as claims about the object of study**, each with a "So:" line (§4, §5).
7. **End with public translation and next steps**: what the answer means outside the field, and what
   comes next.
8. **Keep limitations in the supplement**, stated once, as facts.

Model the order on one strong talk from your own field. Example (reference deck): the order was adapted
from Jessica Finlay's "Cognability" talk (2024), a health-geography talk; its policy line after each
finding became the "So:" line.

Applied:

- **Every section label names the question its part serves** (the chrome label; in the reference
  implementation it comes from `engine.js SECTIONS`, 06 §2). Example (reference deck): Prologue · Why
  geography cares; Act I · How my list is built; Act II · How well the lists match; Act III · What changes
  on the map; Epilogue · What it means for geography. Example (illustrative, a clinical study):
  Prologue · Why clinicians care; Act I · How the score is built; Act II · How well it agrees with chart
  review; Act III · What changes for patients; Epilogue · What it means for practice.
- **Fields first.** The fields slide builds one field per click, each with its sources, then the work at
  the intersection (03 §3). Example (reference deck): slide 3 opens with the Health geography circle (who
  can reach care, and where), adds GIScience (how places become data) at click 1 and GeoAI (what changes
  when AI builds the list) at click 2, then "This thesis" at the intersection together with why now, the
  gap and the question (click 3). Example (illustrative, a materials thesis): the three fields are
  characterization, processing and machine learning.
- **Borrow a concept the field already owns.** Introduce the central problem as a cousin of an idea the
  audience knows, and state it as a short judgment. Example (reference deck): the hook is a cousin of the
  modifiable areal unit problem: zones fixed, the list changes; "The list is part of the measurement."
  Example (illustrative, a clinical study): a cousin of rater bias: the patients fixed, the rater changes.
- **Two running examples.** One concrete case opens and closes the talk; one unit of data is followed
  through every method step on the spine (07, "Running examples"). Example (reference deck): one
  neighborhood (census tract 27123032500: 0.32 mi on my list, 0.70 mi on the state list) opens and closes
  the talk; one pharmacy (the Cub in Maple Grove: one store, two Google listings) is followed through every
  step on the rail. Example (illustrative, an interview study): one interview opens and closes the talk;
  one transcript is followed through cleaning, coding and scoring.
- **Never claim a pattern the work does not state**; describe patterns only in the work's own words.
  Example (reference deck): not "disagreement concentrates in the suburbs" but the thesis's "scattered
  across the study area".

## 2. Structure

| Part | Section id | Job |
|---|---|---|
| Prologue | `open` | title · hook (the opening case) · why the fields care · why the object of study matters · how the usual approach works and where it goes wrong · where the work sits in the literature · the key definition · the plan (the spine, the research questions) |
| Act I–III | `act1` `act2` `act3` | one act per research question: its few method slides, then its finding slides |
| Epilogue | `close` | the answers, what is new, the stance for the field (§6) · the opening case again, with the conclusion and next steps · thank you |
| Supplement | `backup` | method details and limitations, each linked from the talk slide where the question would arise |

Example (reference deck, a geography thesis):

| Part | Slides | Job |
|---|---|---|
| Prologue | 1 title · 2 hook · 3 why geography cares · 4 why pharmacies · 5 how a desert map is made and where it goes wrong · 6 where this thesis sits in the literature · 7 the inclusion definition · 8 the plan (rail, three RQs) | motivation, gap, question |
| Act I (RQ1 · Build) | 9 study area · 10 search · 11 evidence package · 12 four yes-or-no questions · 13 model vs keyword rule | how the list is built and what the model adds |
| Act II (RQ2 · Check) | 14 rail recap · 15 how well the lists match · 16 what the list missed and wrongly kept | agreement with the state list |
| Act III (RQ3 · Map) | 17 same distance rule · 18 where the lists disagree (map + threshold buttons) · 19 why and where | what changes on the map |
| Epilogue | 20 answers + what is new + GeoAI stance · 21 the opening tract again + conclusion + next steps · 22 thank you | so what, for geography |
| Supplement S1–S25 | method details, linked from the talk | questions |

- **Timing.** Measure the speaker's pace in words a minute and the talk track's length, and fit the slide
  count to the slot. The presenter speaks from the keywords, not the script (§9). Example (reference
  deck): a 20-minute talk = 22 slides; the English talk track is about 2,190 words (≈ 21 minutes at the
  speaker's pace of about 104 words a minute), so the presenter speaks from keywords rather than the
  script.
- **The last research question gets at least as much room as each earlier one.** Method slides never
  squeeze the findings. Example (reference deck): RQ3, the map, gets at least as much room as
  list-building and linkage.
- **Method mechanics live in the supplement**, reached by links (`.xrefs`, 06 §4) from the talk slide
  where a question would arise. Example (reference deck): name cleaning, edit distance, the score
  equation, calibration, one-to-one assignment.

## 3. Three listeners at once

Every line must work for three listeners at the same time: **an expert in your field**, **someone from a
neighbouring field** and **a quantitatively trained outsider**. Write for real people in those three
roles (at a defense, the committee members). Example (reference deck): a quantitative health geographer
(geography and logic, no algorithms), a physical geographer (hazards; no social-science methods) and an
applied mathematician (no geography).

- **No invented or project-specific words on talk slides.** Give each key object one plain name and use
  that name every time; on its first appearance, say what it stands for. Example (reference deck): the two
  lists are **my list** (on slide 2, "My workflow's list, built from Google listings") and **the state
  list** (pharmacies licensed by the Minnesota Board of Pharmacy). Example (illustrative, a clinical
  study): "the model's diagnosis" and "the chart review", not "pred_v2" and "GS labels".
- **Rates are named in words first**, the technical term in parentheses. Example (reference deck):
  **found (recall)**, **matched (precision)**, **disagreement**.
- **Internal working vocabulary stays off talk slides** (pipeline, variable, parameter and code names);
  the supplement may use the work's own terms. Example (reference deck): supply frame, evidence packet,
  keyword signal, temperature 0, open-weight, NAICS codes were removed; "Board" appears only in
  parentheses after "state list" the first time.
- **A necessary technical term gets a one-line gloss the first time.** Example (reference deck): "census
  tract: a small area the Census Bureau draws to report its statistics"; "access here means straight-line
  distance to the nearest pharmacy". Example (illustrative, a psychology study): "standardized effect
  size: the difference between the two group means, in standard deviations".
- **Explain with what the people concerned would notice**, not analyst shorthand. Example (reference
  deck): "a pharmacy is usually within half a mile", "the closest pharmacy is often about a mile away",
  "if that one pharmacy is on only one list, the lists give different answers"; not "well inside the
  mile", "near the line", "one pharmacy flips the answer".
- **Describe groups of people respectfully**, with neutral comparative terms that name the measure.
  Example (reference deck): "lower-income / higher-income neighborhoods", "lowest-income / highest-income
  tracts"; never poor, poorer, rich, richer. The same holds for age, health, ethnicity or any other group.

## 4. Numbers

- **One or two numbers per slide, rounded.** Do not repeat the same headline numbers on several slides.
- **Shares are fractions**: 9/10, 4/10, 1/7, 7/10, 1/20 against 1/5. Never "1 in 7", "nine in ten",
  "10 of 17", or the same word forms in any other language. (A group name such as "the top quarter" stays
  a word.)
- **Big counts are plain numbers**, not a share of a large total. Example (reference deck): "48 tracts
  change their answer", not "48/327".
- **Percentages appear only where a rate is defined.** The first time a rate appears it is written out as
  a formula, words first, then numbers (`Deck_afx`, 05 §5). Example (reference deck): "Found (recall) =
  state-list pharmacies matched / all 178 state-list pharmacies = 161/178 = 90%". Example (illustrative,
  placeholders): "Sensitivity = patients with the disease whom the test flags / all patients with the
  disease = n/N = …%". A later slide that reports the same rate as a percentage carries the formula small
  in the top-right corner (`Deck_pin`). Talk slides that state rates as fractions carry no pin. Example
  (reference deck): the formula is written out once on the talk (slide 15: recall and precision) and once
  in the supplement (S19: "nearly equal"); S15 (recall, precision) and S18 (disagreement) carry pins.
- **Every fraction on a finding slide gets a firm conclusion beside it**, a line starting **"So:"** that
  says concretely what the number means for the object of study. No hedge on screen. Examples (reference
  deck): "So: the model works as a filter"; "So: half the gap is one address listed more than once";
  "So: a desert map at ½ or 1 mile depends on whose list draws it"; "So: distance holds up when the list
  changes; a yes-or-no threshold does not". Example (illustrative, a clinical study): "So: the screen can
  replace the first chart review, not the second." The summary slide states its fractions with one-line
  conclusions under each number instead of "So:" lines (reference deck: slide 20).
- **Caveats, exact figures and denominators go to the last line of the speaker notes**, "If asked:" (in a
  second-language script, the same line in that language).
- When explaining a mechanism (in chat or in the presenter keywords) use words, not fractions.

## 5. Titles and the finding-slide formula

- **A talk-slide title is one full sentence**: the finding, or the question the slide answers. It ends
  with a full stop or a question mark; the closing slide may add a short answer to its question. Example
  (reference deck, slide 21): "A pharmacy within half a mile? It depends on the list."
- Usually one phrase is in `<em>` (accent colour), the claim word; a title that contrasts two things may
  mark both (reference deck: slides 15 and 16). Supplement titles may be plain labels without `<em>` or a
  full stop (reference deck: "Model instruction", "Linkage calibration").
- **Findings are claims about the object of study, not about the method.** Not "Model results" or
  "Regression output". Examples (reference deck): "A threshold lets *one pharmacy* decide the answer."
  "At ½ mile, *switching the list* changes the answer for 1/7 of tracts." Example (illustrative, an
  ecology thesis): "Warmer streams *lose their mayflies* first."
- **The eyebrow above the title names the research question and the slide's role**: `RQn · Finding`.
  Examples (reference deck): "RQ2 · FINDING", "RQ3 · WHY, AND WHERE", "BACKGROUND · ILLUSTRATIVE EXAMPLE",
  "LITERATURE REVIEWED".
- **A finding slide carries, in order**: the title (finding) → one number or one figure → the reason →
  "So:" (what it means) → and, where one exists, the comparable study, named on the same slide next to the
  point it supports (03 §10). Example (reference deck): slides 13, 16 and 19 do this; slides 15 and 18
  have no comparable study on screen (08 #27).
- **Results carry their own discussion**; there is no separate discussion section on the talk.
  Limitations are stated once, as facts, and live in the supplement (reference deck: S24).
- **When a click changes the claim, the title changes with it** (`.tswap`, 04 §6), so the title is always
  true for what is on screen.

## 6. Bold, not defensive

State the contributions as judgments. Patterns (placeholders in brackets): "This work [does the new thing it
contributes]." "[The thing usually taken as given] is part of the measurement." "For [field]: [the promise]
is real if [the condition]." Examples (reference deck): "This thesis tests a model-built list on an
access measure." "The list is part of the measurement." "For GeoAI: the promise is real if every decision
can be checked." (slide 20; S23 title: "GeoAI: real promise, if every decision can be checked.")

No timid qualifiers on the talk slides ("might", "may suggest", "a prior argument, not tested in this
study"). "May" appears only in the supplement, where it states a rule or a limitation. Examples
(reference deck): S11 "the pair may be matched", S20 "the remaining disagreement may be understated",
S23 "some labels may change", "Evidence may be thinner in lower-income areas", S24 "May overstate
proximity for people who walk."
Limitations stay, as plain facts, in their own place.

## 7. Evidence on every slide

- **Every study named in the notes is shown on that slide**, in small `.cite` text next to the sentence
  it supports. Example (reference deck): "This agrees with Apparicio et al. 2017". Reference-deck
  exceptions to the `.cite` form: S9 and S16 name their studies only in the `.src` line; the fields
  diagram (slide 3) shows its studies as SVG labels inside the circles (03 §3). Slide 20's notes cite two
  studies that are not on the slide at all, the one real gap (08 #25).
- **Every content slide has a source line** (`.src`, bottom left): the work's section, table, figure or
  appendix, and what the drawing is ("Diagram schematic", "Areas proportional to counts", "Timelines drawn
  schematically", "Shading: …; at the last click, …"). Title, plan, recap and thank-you slides have none.
  The reference deck's gaps are listed in 08 #24.
- **Only studies in the work's own reference list.** Every number is checked against the text, its tables
  or appendices, or the analysis outputs. Every figure taken from a paper is checked in the paper itself
  (who made it, what data it used) and shown with its licence. Example (reference deck): "Wittenauer et
  al. 2024, Fig. 1 (CC BY 4.0)".
- **Every figure is readable without the speaker** (05 §0): maps carry a north arrow, a scale bar and a
  legend; plots carry axis titles with units and a legend; images of specimens or samples carry a scale
  bar; tables carry row and column axis titles.
- **Illustrative content is labelled as such.** Examples (reference deck): "Example pages fictitious"
  (S1); "pharmacy bearings are only illustrative"; "Grid drawn schematically".
- **Never add an interpretation the work does not make**, spatial, causal or otherwise.

## 8. Wording the user set is final

Text the user wrote or annotated stays, even when a later review objects; report the objection instead of
editing. Example (reference deck): slide 6 "No study tested this" stayed. Conclusions must name the
concrete subject and the consequence. Example (reference deck): "the search misses almost nothing; the
work is removing the rest" was rejected as vague.

Copies already handed in or sent to reviewers are frozen: never edit or rebuild them. Change only the
working deck, and only when the user asks (SKILL.md, "Non-negotiables").

## 9. Speaker material

Speaker material is English by default. Before writing it, ask the user whether they want a second
language for the keywords, the script or a translated view, and which one (SKILL.md, "Language"). With
no second language, each slide carries two hidden asides:

- `notes-kw`: keywords, one or more short cues per click, one gold takeaway marked `data-key`. The
  presenter speaks from these. (Reference deck: S24 has none, 08 #26.)
- `notes-en`: the English talk track, with "Click:" markers where a build fires and a closing
  "If asked:" paragraph wherever there are exact figures or caveats. (Reference deck: 18 of the 47 slides
  have one; the thank-you slide ends with "After the timer stops:".)

With a second language, each keyword cue adds a line in that language under the English one, and a third
aside, `notes`, holds the script in that language with the same "If asked" ending (06 §7). The reference
deck has all three asides because it was built with a second language.

Keep notes and slide text consistent: a study cited in the notes must be on the slide.
