# 01 · Narrative, wording, evidence

How the deck argues. These rules came from the user's corrections between 2026-10-20 and 2026-10-29 and
from the thesis advisor's feedback.

## 1. It is a geography talk

The committee must see in the first minute why geography should care. The model is Jessica Finlay's
"Cognability" talk (2024): name the fields first, start from people and places in Minneapolis, pose the
problem as a geographic question, carry one concept diagram through the talk as the spine, keep methods
to a few plainly titled slides, title results as findings about places, attach a policy line to each
finding (adapted here as the "So:" line on what it means), end with public translation and next steps,
keep limitations in backup slides.

Applied here:

- **The question is about places.** "Which places does a list contain, and what changes in our picture of
  a neighborhood when the list changes?" (the thesis conclusion). Every section label names the geographic
  question it serves: Prologue · Why geography cares; Act I · How my list is built; Act II · How well the
  lists match; Act III · What changes on the map; Epilogue · What it means for geography.
- **Fields first.** Slide 3 opens with the Health geography circle (who can reach care, and where), adds
  GIScience (how places become data) at click 1 and GeoAI (what changes when AI builds the list) at
  click 2, each with its sources inside the circle, then "This thesis" at the intersection together with
  why now, the gap and the question (click 3).
- **Concepts geographers already own.** The hook slide is introduced as a cousin of the modifiable areal
  unit problem: zones fixed, the list changes. "The list is part of the measurement."
- **Two running examples, both places.** One neighborhood (census tract 27123032500: 0.32 mi on my list,
  0.70 mi on the state list) opens and closes the talk. One pharmacy (the Cub in Maple Grove: one store,
  two Google listings) is followed through every step on the rail.
- **Never claim a spatial pattern the thesis does not state** (e.g. "disagreement concentrates in the
  suburbs"); describe patterns only in the thesis's words ("scattered across the study area").

## 2. Structure

| Part | Slides | Job |
|---|---|---|
| Prologue | 1 title · 2 hook · 3 why geography cares · 4 why pharmacies · 5 how a desert map is made and where it goes wrong · 6 where this thesis sits in the literature · 7 the inclusion definition · 8 the plan (rail, three RQs) | motivation, gap, question |
| Act I (RQ1 · Build) | 9 study area · 10 search · 11 evidence package · 12 four yes-or-no questions · 13 model vs keyword rule | how the list is built and what the model adds |
| Act II (RQ2 · Check) | 14 rail recap · 15 how well the lists match · 16 what the list missed and wrongly kept | agreement with the state list |
| Act III (RQ3 · Map) | 17 same distance rule · 18 where the lists disagree (map + threshold buttons) · 19 why and where | what changes on the map |
| Epilogue | 20 answers + what is new + GeoAI stance · 21 the opening tract again + conclusion + next steps · 22 thank you | so what, for geography |
| Supplement S1–S25 | method details, linked from the talk | questions |

A 20-minute talk = 22 slides. The English talk track is about 2,190 words (≈ 21 minutes at the speaker's
pace of about 104 words a minute), so the presenter speaks from keywords rather than the script.
RQ3 gets at least as much room as list-building and linkage. Method mechanics (name cleaning, edit
distance, the score equation, calibration, one-to-one assignment) live in the supplement, reached by
links from the talk slide where a question would arise.

## 3. Three listeners at once

Every line must work for a quantitative health geographer (geography and logic, no algorithms), a
physical geographer (hazards; no social-science methods) and an applied mathematician (no geography).

- No invented or project-specific words on talk slides. The two lists are **my list** (built from Google
  listings; on its first appearance, slide 2, "My workflow's list, built from Google listings") and
  **the state list** (pharmacies licensed by the Minnesota Board of Pharmacy). Rates
  are named in words first: **found (recall)**, **matched (precision)**, **disagreement**.
- Words removed from talk slides: supply frame, evidence packet, keyword signal, temperature 0,
  open-weight, NAICS codes. "Board" appears only in parentheses after "state list" the first time.
  The supplement may use the thesis terms.
- A necessary thesis term gets a one-line gloss the first time ("census tract: a small area the Census
  Bureau draws to report its statistics"; "access here means straight-line distance to the nearest
  pharmacy").
- Explanations use what a resident would notice: "a pharmacy is usually within half a mile", "the closest
  pharmacy is often about a mile away", "if that one pharmacy is on only one list, the lists give different
  answers". Not analyst shorthand ("well inside the mile", "near the line", "one pharmacy flips the answer").
- Income groups: "lower-income / higher-income neighborhoods", "lowest-income / highest-income tracts".
  Never poor, poorer, rich, richer.

## 4. Numbers

- One or two numbers per slide, rounded. Do not repeat the same headline numbers on several slides.
- **Shares are fractions**: 9/10, 4/10, 1/7, 7/10, 1/20 against 1/5. Never "1 in 7", "nine in ten",
  "10 of 17", or the same word forms in any other language. (A group name like "lowest-income quarter"
  stays a word.)
- **Big counts are plain numbers**: "48 tracts change their answer", not "48/327".
- Percentages appear only where a rate is defined: the first time a rate appears it is written out as a
  formula, words first, then numbers (`Deck_afx`: "Found (recall) = state-list pharmacies matched / all 178
  state-list pharmacies = 161/178 = 90%"). In the live deck this happens once on the talk (slide 15:
  recall and precision) and once in the supplement (S19: "nearly equal"). A later slide that reports the same
  rate as a percentage can carry the formula small in the top-right corner (`Deck_pin`); the deck does this on
  S15 (recall, precision) and S18 (disagreement). Talk slides that state rates as fractions carry no pin.
- **Every fraction on a finding slide gets a firm conclusion beside it**, a line starting **"So:"** that says concretely what it
  means for a map or a neighborhood: "So: the model works as a filter"; "So: half the gap is one address
  listed more than once"; "So: a desert map at ½ or 1 mile depends on whose list draws it"; "So: distance
  holds up when the list changes; a yes-or-no threshold does not". No hedge on screen. The summary slide
  (20) states its fractions with one-line conclusions under each number instead of "So:" lines.
- Caveats, exact figures and denominators go to the last line of the speaker notes, "If asked:" (in a
  second-language script, the same line in that language).
- When explaining a mechanism (in chat or in the presenter keywords) use words, not fractions.

## 5. Titles and the finding-slide formula

- A talk-slide title is one full sentence: the finding, or the question the slide answers. It ends with a
  full stop or a question mark (slide 21 adds a short answer: "A pharmacy within half a mile? It depends on
  the list."). Usually one phrase is in `<em>` (accent colour), the claim word; a title that contrasts two
  things may mark both (slides 15 and 16). Supplement titles may be plain labels ("Model instruction",
  "Linkage calibration") without `<em>` or a full stop.
- Findings are about places and lists, not about the method: "A threshold lets *one pharmacy* decide the
  answer." "At ½ mile, *switching the list* changes the answer for 1/7 of tracts."
- Eyebrow above the title names the research question and the slide's role: "RQ2 · FINDING",
  "RQ3 · WHY, AND WHERE", "BACKGROUND · ILLUSTRATIVE EXAMPLE", "LITERATURE REVIEWED".
- A finding slide carries, in order: the title (finding) → one number or one figure → the reason →
  "So:" (what it means) → and, where one exists, the comparable study, named on the same slide next to the
  point it supports (slides 13, 16 and 19 do this; slides 15 and 18 have no comparable study on screen).
- Results carry their own discussion; there is no separate discussion section on the talk. Limitations
  are stated once, as facts, and live in the supplement (S24).
- When a click changes the claim, the title changes with it (`.tswap`), so the title is always true for
  what is on screen.

## 6. Bold, not defensive

State the contributions as judgments: "This thesis tests a model-built list on an access measure."
"The list is part of the measurement." "For GeoAI: the promise is real if every decision can be
checked." (slide 20; S23 title: "GeoAI: real promise, if every decision can be checked.")
No timid qualifiers on the talk slides ("might", "may suggest", "a prior argument, not tested in this
study"). "May" appears only in the supplement, where it states a rule or a limitation: S11 "the pair may be
matched", S20 "the remaining disagreement may be understated", S23 "some labels may change", "Evidence may
be thinner in lower-income areas", S24 "May overstate proximity for people who walk."
Limitations stay, as plain facts, in their own place.

## 7. Evidence on every slide

- Every study named in the notes is shown on that slide, in small `.cite` text next to the sentence it
  supports ("This agrees with Apparicio et al. 2017"). (Live exceptions: slide 20's notes cite Huang 2025 and
  Deitz 2025, which are not on the slide; S9 (Bachmann 2026) and S16 (Kuhn 1955; Crouse 2016) name their
  studies only in the `.src` line; slide 3 shows its studies as SVG labels inside the circles.)
- Every content slide has a source line (`.src`, bottom left): thesis section, table, figure or appendix,
  and what the drawing is ("Diagram schematic", "Areas proportional to counts", "Timelines drawn
  schematically", "Shading: …; at the last click, …"). Title, plan, recap and thank-you slides have none;
  slides 4 and 5 cite inline or in captions instead; slide 7, S3 and S13 have neither (see 08).
- Only studies in the thesis reference list; every number checked against the thesis text, Appendix C
  tables or the analysis outputs; every figure from a paper checked in the paper itself (who made it, what
  data source it used) and shown with its licence ("Wittenauer et al. 2024, Fig. 1 (CC BY 4.0)").
- Illustrative content is labelled as such ("Example pages fictitious" on S1;
  "pharmacy bearings are only illustrative"; "Grid drawn schematically").
- Never add a spatial interpretation or a causal reading the thesis does not make.

## 8. Wording the user set is final

Text the user wrote or annotated stays, even when a later review objects; report the objection instead of
editing (e.g. slide 6 "No study tested this"). Conclusions must name the concrete subject and consequence;
"the search misses almost nothing; the work is removing the rest" was rejected as vague.

## 9. Speaker material

Speaker material is English by default. Before writing it, ask the user whether they want a second
language for the keywords, the script or a translated view, and which one (SKILL.md, "Language"). With
no second language, each slide carries two hidden asides:

- `notes-kw`: keywords, one or more short cues per click, one gold takeaway marked `data-key` (S24
  currently has none). The presenter speaks from these.
- `notes-en`: the English talk track, with "Click:" markers where a build fires and a closing
  "If asked:" paragraph wherever there are exact figures or caveats (18 of the 47 live slides have one;
  the thank-you slide ends with "After the timer stops:").

With a second language, each keyword cue adds a line in that language under the English one, and a third
aside, `notes`, holds the script in that language with the same "If asked" ending. The live deck has all
three asides because it was built with a second language (06 §7).

Keep notes and slide text consistent: a study cited in the notes must be on the slide.
