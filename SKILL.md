---
name: defense-deck-design
description: Design system and build rules for animated HTML research talks in any discipline (1920×1080 stage, dark "ink" / light "paper" themes, click-by-click builds, live figures such as plots, diagrams, maps, equations and tables, and a presenter window with keywords). Use when creating, adding, editing, reviewing or re-creating slides for a thesis or dissertation defense, conference talk, job talk, seminar or lab-meeting talk in this style, when adapting the system to a new field or a new deck, when rendering a deck to PNG or PDF, or when answering how its layout, typography, colour, animation, speaker notes or presenter view work. Includes wording rules for mixed audiences (plain words, one or two rounded numbers per slide, every source visible on the slide, no cards around content) and a documented reference implementation, one finished defense deck.
license: MIT
---

# Defense deck design

A design system for research talks built as a web page: a 1920×1080 stage revealed click by click, with live
figures, formulas written out in words, and presenter keywords. It serves any discipline and any research
talk: thesis and dissertation defenses, conference talks, job talks, seminars, lab meetings. Follow it and
every new slide looks and behaves like the rest of the system, whatever field the talk comes from.

**Reference implementation.** The system is documented from one finished deck, a geography honors-thesis
defense kept in the `docs/defense` folder of its project: 22 talk slides and 25 supplement slides on the
same stage. Its content does not ship with this skill; its engine, stylesheets and tools do, as the
starter deck in `assets/starter-deck/` with a sample talk in place of the thesis. The skill was written
from the deck's live source (engine, 9 stylesheets, 6 slide files, 6 demo files) and from renders of all
132 click states on 2026-10-30.
Paths such as `docs/defense/...`, the slide catalog (07) and the known issues (08) document that
implementation. Content taken from it appears only in examples labelled "Example (reference deck)". To carry
the system into another field, start with `references/09-adapting-to-your-field.md`.

## Non-negotiables

These hold in every field. Breaking any of them means redoing the slide.

1. **No cards.** Never put content in boxes, tiles, panels, pill chips or tabbed containers. Separate with
   type, whitespace, 1 px hairlines, coloured rules, icons and real figures. Filled shapes are data marks
   only (map areas, Venn circles, dots, bars, 2×2 cells).
2. **The question leads.** Titles and section labels speak about the object of study, not the method, in
   the field's own terms: each section label names the question its part serves; each title states a
   finding or the question the slide answers. Name the field or fields first, then the method. Start and
   end at one real case the audience can picture: a place, a person, a specimen, a text, an event, a
   dataset.
   Example (reference deck, a geography thesis): the fields health geography, GIScience and GeoAI open the
   talk; the section labels ask questions about places; one census tract opens and closes the talk.
   Example (another field, illustrative): a structural-biology defense opens and closes on one protein
   structure.
3. **Three listeners at once**: write every slide so that an expert in your field, someone from a
   neighbouring field and a quantitatively trained outsider can all follow it. Use plain everyday words and
   no invented or project-specific terms. Give each key object one everyday name and use it on every slide.
   Name rates in words first, the technical term in parentheses. Gloss a necessary term once, at first use.
   Describe groups of people respectfully, by the property measured.
   Example (reference deck): "my list" and "the state list"; "found (recall)", "matched (precision)",
   "disagreement"; income groups are "lower-income / higher-income", never poor or rich.
4. **Numbers**: one or two rounded numbers per slide. Shares as fractions (9/10, 1/7; never "1 in 7").
   Big counts as plain numbers, not as a share of a large total (Example (reference deck): "48 tracts", not
   "48/327"). Percentages only for a rate whose formula is written out at its first use
   (`references/05-maps-and-charts.md` §5). Each fraction has a firm "**So:**" line saying what it means.
   Caveats and exact figures go to the notes' "If asked" line.
5. **Evidence on the slide**: every study the notes cite appears on the slide as `.cite` next to its claim.
   Every content slide has a source line (`.src`). Cite only references from the work the talk presents
   (the thesis, dissertation or paper), with every number checked against that document. Illustrative
   content (a schematic, a made-up example, a mock-up) says so on the slide. (A few reference-deck slides
   fall short; see `references/08-known-issues.md`.)
6. **Every figure reads without the speaker.** Maps carry a north arrow, a scale bar and a legend:
   `Deck.mapFurniture(svg)` draws the arrow and the bar (call it after every viewBox change); the legend is
   a `.map-lg` block in the markup whose swatches match the fills. Plots carry axis titles with units and a
   legend. Images of specimens or samples (micrographs, scans, photographs of material) carry a scale bar.
   Tables carry row and column axis titles.
7. **Bold, not defensive**: state contributions as judgments; limitations as facts, once, in the supplement.
8. **The user's wording is final**: do not "correct" text the user wrote. Report objections instead.
9. **Frozen copies**: never edit or rebuild a copy that has been handed in or sent to a reviewer (a
   submitted PDF, a review build of the deck). Change only the working deck (in the reference
   implementation, `docs/defense`), and only when the user asks.

## Language

English is the default for everything: slide text, presenter keywords and the talk track. A second
language is optional and only for the presenter (keyword lines, a speaker script, a translated view of the
deck); the audience screen stays English. Before writing presenter material for a new deck or a new set of
slides, ask the user once:

> Do you want the presenter keywords, the speaker script or a translated view in a second language? If so,
> which language?

Use the language the user names, in the slots described in `references/06-engine-and-tooling.md` §7. If
the user wants none, write English only and leave those slots out. Do not infer a second language from the
language the user chats in or from what an existing deck uses.

## The look in one paragraph

Near-black stage (`#050507`) lit by two soft glows in the slide's accent colour (strong top-right, faint
bottom-left); Inter / Inter Tight type with tight negative tracking on 64 px sentence titles; 18 px caps
eyebrows in the accent colour; generous 128 px side margins; content separated by hairlines rather than
boxes; six semantic colours, each with one role (blue `--wf` source or condition A, amber `--bd` source or
condition B, cyan `--sp` space, context or setting, purple `--ai` method, model or instrument, green `--ok`
yes or agreement, red `--no` no or error), whose meanings each talk assigns once and keeps; full-bleed
photographs of the study setting (the people, places, organisms or instruments the work is about; never
an image that carries evidence, which is a figure, `references/02-tokens-and-type.md` §4) under graded
scrims with a slow zoom; liquid glass only on the title and thank-you plates, the rail lens and the
controls of an interactive figure; slide elements rise 22 px into place in a 70 ms cascade and each click
reveals one claim.

Example (reference deck): blue is my list, amber the state list, cyan the map, purple the language model;
the photos show the city and its pharmacies. Example (another field, illustrative): a clinical-trial talk
gives blue to the treatment arm, amber to the control arm and purple to the assay; its photos show the
clinic and the instrument.

## Starting a talk in a new field or a new deck

1. **Read** `references/09-adapting-to-your-field.md`, then `references/01-narrative-and-voice.md`.
2. **Ask the language question** above.
3. **Fix the structure** (`references/01-narrative-and-voice.md` §2): the parts, the slide count for the
   time slot, and what moves to the supplement.
4. **Decide once, for the whole talk** (09 §2): the fields named first; the two running examples (01 §1:
   the case that opens and closes the talk, the object followed through every method step); the everyday
   name of each key object (01 §3); the section labels and rail stations; the meaning of each semantic
   colour role and the accent of each section (`references/02-tokens-and-type.md` §2).
5. **Start from the starter deck** in `assets/starter-deck/`: a copy of the reference implementation's engine,
   CSS and tools with a 12-slide sample talk of synthetic content (its `README.md` lists what to replace).
   Copy the folder, start `tools/serve.py`, then keep its tokens, class names, type scale, motion values and
   engine behaviour; set the section labels in `engine.js SECTIONS` (06 §2); replace the slide files, demos,
   data files and photos with your own. `references/06-engine-and-tooling.md` §1 lists where the starter
   differs from the reference implementation.
6. Add each slide with the steps below.

## How to add or change a slide

1. **Read the rules** you need: `references/01-narrative-and-voice.md` (what to say),
   `references/03-layout-patterns.md` (which pattern; §15 is a chooser).
2. **Find the nearest existing slide** in `references/07-slide-catalog.md`, open its source (reference
   implementation: `docs/defense/slides/v2-*.js`) or its markup skeleton in 03, and copy its markup. Reuse
   existing classes and demos; add CSS only to `css/v2-frame2.css` under a dated comment, scoped to a slide
   class.
3. **Write the content** as: eyebrow (the research question, then the slide's role: `RQn · Finding`) →
   title sentence with one `<em>` → body → `.src` → optional `.xrefs` → `aside.notes-kw` (one or more short
   cues for every click, exactly one `data-key`) → `aside.notes-en` (English talk track); the
   second-language line in each cue and `aside.notes` only if the user asked for a second language.
4. **Plan the clicks**: one claim per click; each "So:" line beside the number it explains, revealed with it;
   `.tswap` when the title's claim changes; absolute positioning for anything that swaps in place. Values in
   `references/04-motion-and-builds.md`.
5. **Colours and type** only from tokens (`references/02-tokens-and-type.md`), each semantic colour in the
   role this talk gave it. Plots, schematic diagrams, maps, rate formulas, equations and tables from
   `references/05-maps-and-charts.md`.
6. **Back up** the slide file to `_backup_YYYYMMDD_<what>/` in the deck folder first (reference
   implementation: `docs/defense/_backup_YYYYMMDD_<what>/`); bump `?v=` in `index.html` for each edited
   file; if the deck has a second language, update its translations (`references/06-engine-and-tooling.md`
   §7).
7. **Verify** with the checklist below, then render the slide's states and look at them.

## Reference files

| File | Contents |
|---|---|
| `references/01-narrative-and-voice.md` | framing the question in its field, structure and timing, the three listeners, number rules, the finding formula, bold wording, citations and sources, the user's wording, speaker notes |
| `references/02-tokens-and-type.md` | stage and safe area, chrome positions, colour tokens (both themes) and their roles, accents per section, background, photo scrims, fonts, type scale, spacing, rules vs boxes, glass, icons |
| `references/03-layout-patterns.md` | the frame, body grids, every slide pattern with markup skeletons, and a pattern chooser (§15) |
| `references/04-motion-and-builds.md` | easing and durations, slide and element transitions, build attributes, step-keyed CSS, title swaps, count-ups, rail lens, demo motion, static mode, the motion the system never uses |
| `references/05-maps-and-charts.md` | figure furniture for every figure type and how to pick a figure (§0); maps: data, drawing, furniture, legends, palettes, controls; schematic diagrams; charts: Venn, 2×2, unit rows, dot strips, bars, histogram, score line, assignment matrix; rate formulas; equations; tables; figures from papers and the talk's own images |
| `references/06-engine-and-tooling.md` | the reference engine: files and what a new talk keeps or replaces, slide and demo API, section labels, supplement links, keys, presenter window, optional second language, PNG/PDF rendering, pre-flight checks |
| `references/07-slide-catalog.md` | a field-neutral outline for a 20-minute talk (22 slots and a supplement, each with job, pattern, accent role and click plan; how to adapt it; running examples), then the reference deck's 47 slides as that outline in use |
| `references/08-known-issues.md` | 28 pitfalls any deck on this engine falls into (rendering, cascade, layout, behaviour, semantics, content checks), each with its rule and the reference deck's instance; new slides must not repeat them |
| `references/09-adapting-to-your-field.md` | carrying the system into another discipline: what stays fixed, what each talk decides (including its colour-role table), figure furniture by figure type, the opening case, three listeners and colour roles for ten field families, figures and adjustments per family, a checklist for a new field |
| `assets/starter-deck/` | a working deck to copy: the engine, all CSS, the server and render tools, and a sample talk (9 talk slides, 3 supplement slides, synthetic data) that shows the main patterns; its `README.md` says what to replace |
| `scripts/cdp_render.py`, `pdf_assemble.py`, `pdf_sheets.py` | render every click state through one headless Edge tab, assemble the PDF, make contact sheets |

## Checklist before calling a slide done

- [ ] Title is one sentence about the object of study (the finding, or the question the slide answers), ≤ 2 lines, one `<em>` in the accent.
- [ ] No box around content; separation by hairlines and whitespace.
- [ ] Only tokens; each semantic colour in the role this talk assigned it (neutral emphasis in `--tx` or `--acc`).
- [ ] One or two numbers; shares as X/Y; each with a "So:" line; a percentage only for a rate defined with its formula; plain words for all three listeners.
- [ ] Every cited study visible on the slide; `.src` present and accurate; illustrative content labelled.
- [ ] Every figure readable without the speaker: maps with north arrow, scale bar and a legend whose swatches match the fills; plots with axis titles, units and legend; specimen or sample images with a scale bar; tables with row and column titles.
- [ ] Clicks: one claim each, forwards and backwards correct; `?static=1#/n/k` correct for every k.
- [ ] Content inside x 128–1792, y 92–948; nothing overlaps the source line, links or page number.
- [ ] Paper theme (T) readable; no hard-coded white.
- [ ] Presenter keywords for every click (several cues per click is fine), exactly one `data-key`.
- [ ] Console clean; with a second language, `?lang=<code>` shows no "[i18n] markup differs" warning.
- [ ] Rendered states inspected as images (`scripts/cdp_render.py OUT "n/0,n/1"`).
