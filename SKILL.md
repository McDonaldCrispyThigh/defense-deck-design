---
name: defense-deck-design
description: Design system and build rules for the animated HTML thesis-defense deck in docs/defense (1920×1080 stage, dark "ink" / light "paper" themes, click builds, live maps). Use when adding, editing, reviewing or re-creating slides in that deck, building a new talk in the same style (conference version, AAG paper talk, job talk), rendering the deck to PNG/PDF, or answering how the deck's layout, typography, colour, animation or presenter view works.
license: MIT
---

# Defense deck design

The deck at `docs/defense` is a geography talk built as a web page: 22 talk slides and 25 supplement
slides on a 1920×1080 stage, revealed click by click, with live tract maps, formulas written out in words,
and presenter keywords. This skill records how it is designed so that any new slide looks and
behaves like the existing ones. It was written from the live source (engine, 9 stylesheets, 6 slide files,
6 demo files) and from renders of all 132 click states on 2026-10-30.

## Non-negotiables

These come from the user's own corrections. Breaking any of them means redoing the slide.

1. **No cards.** Never put content in boxes, tiles, panels, pill chips or tabbed containers. Separate with
   type, whitespace, 1 px hairlines, coloured rules, icons and real figures. Filled shapes are data marks
   only (map tracts, Venn circles, dots, bars, 2×2 cells).
2. **A geography talk.** Titles and section labels name a question about places. Start and end at one real
   neighbourhood. Fields first (health geography, GIScience, GeoAI), then the method.
3. **Three listeners at once**: a quantitative health geographer, a physical geographer and an applied
   mathematician. Use plain everyday words, no invented terms, "my list" and "the state list", rates named
   in words first ("found (recall)", "matched (precision)", "disagreement"). Income groups are
   "lower-income / higher-income", never poor or rich.
4. **Numbers**: one or two rounded numbers per slide. Shares as fractions (9/10, 1/7; never "1 in 7").
   Big counts as plain numbers ("48 tracts"). Each fraction has a firm "**So:**" line saying what it
   means. Caveats and exact figures go to the notes' "If asked" line.
5. **Evidence on the slide**: every study the notes cite appears on the slide as `.cite` next to its claim.
   Every content slide has a source line (`.src`). Only thesis references, with every number checked against
   the thesis. (A few live slides fall short; see `references/08-known-issues.md`.)
6. **Maps carry a north arrow, a scale bar and a legend**: `Deck.mapFurniture(svg)` draws the arrow and the
   bar (call it after every viewBox change); the legend is a `.map-lg` block in the markup whose swatches
   match the fills. Tables carry row and column axis titles.
7. **Bold, not defensive**: state contributions as judgments; limitations as facts, once, in the supplement.
8. **The user's wording is final**: do not "correct" text the user wrote. Report objections instead.
9. **Frozen copies**: never edit or rebuild a copy that has been handed in or sent to a reviewer (a
   submitted PDF, a review build of the deck). Change only the working deck in `docs/defense`, and only
   when the user asks.

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
boxes; six semantic colours, each with one main meaning (blue my list, amber state list, cyan map, purple
model, green yes, red no); full-bleed photographs of the Twin Cities and pharmacies under graded scrims with
a slow zoom; liquid glass only on the title and thank-you plates, the rail lens and map controls; slide
elements rise 22 px into place in a 70 ms cascade and each click reveals one claim.

## How to add or change a slide

1. **Read the rules** you need: `references/01-narrative-and-voice.md` (what to say),
   `references/03-layout-patterns.md` (which pattern; §15 is a chooser).
2. **Find the nearest existing slide** in `references/07-slide-catalog.md`, open its source in
   `docs/defense/slides/v2-*.js`, and copy its markup. Reuse existing classes and demos; add CSS only to
   `css/v2-frame2.css` under a dated comment, scoped to a slide class.
3. **Write the content** as: eyebrow (`RQn · Finding`) → title sentence with one `<em>` → body → `.src` →
   optional `.xrefs` → `aside.notes-kw` (one or more short cues for every click, exactly one `data-key`)
   → `aside.notes-en` (English talk track); the second-language line in each cue and `aside.notes` only if
   the user asked for a second language.
4. **Plan the clicks**: one claim per click; each "So:" line beside the number it explains, revealed with it;
   `.tswap` when the title's claim changes; absolute positioning for anything that swaps in place. Values in
   `references/04-motion-and-builds.md`.
5. **Colours and type** only from tokens (`references/02-tokens-and-type.md`). Maps, charts, formulas,
   equations and tables from `references/05-maps-and-charts.md`.
6. **Back up** the slide file to `docs/defense/_backup_YYYYMMDD_<what>/` first; bump `?v=` in `index.html`
   for each edited file; if the deck has a second language, update its translations
   (`references/06-engine-and-tooling.md` §7).
7. **Verify** with the checklist below, then render the slide's states and look at them.

## Reference files

| File | Contents |
|---|---|
| `references/01-narrative-and-voice.md` | geography framing, structure and timing, the three listeners, number rules, the finding formula, citations, speaker notes |
| `references/02-tokens-and-type.md` | stage and safe area, chrome positions, colour tokens (both themes), accents per section, background, photo scrims, fonts, type scale, spacing, rules vs boxes, glass, icons |
| `references/03-layout-patterns.md` | the frame, body grids, and every slide pattern with markup skeletons |
| `references/04-motion-and-builds.md` | easing and durations, slide and element transitions, build attributes, step-keyed CSS, title swaps, count-ups, rail lens, demo motion, static mode |
| `references/05-maps-and-charts.md` | map data, drawing, furniture, legends, palettes, controls; schematic diagrams; Venn, 2×2, unit rows, bars, histogram, score line, matrix; rate formulas; equations; tables; paper figures |
| `references/06-engine-and-tooling.md` | files, slide and demo API, supplement links, keys, presenter window, optional second language, PNG/PDF rendering, pre-flight checks |
| `references/07-slide-catalog.md` | all 47 slides: accent, pattern, clicks, links; running examples |
| `references/08-known-issues.md` | quirks in the live deck that new slides must not copy |
| `scripts/cdp_render.py`, `pdf_assemble.py`, `pdf_sheets.py` | render every click state through one headless Edge tab, assemble the PDF, make contact sheets |

## Checklist before calling a slide done

- [ ] Title is one sentence about places or lists, ≤ 2 lines, one `<em>` in the accent.
- [ ] No box around content; separation by hairlines and whitespace.
- [ ] Only tokens; each semantic colour used for its main meaning (neutral emphasis in `--tx` or `--acc`).
- [ ] One or two numbers; shares as X/Y; each with a "So:" line; plain words for all three listeners.
- [ ] Every cited study visible on the slide; `.src` present and accurate; illustrative content labelled.
- [ ] Maps: north arrow, scale bar, legend whose swatches match the fills; tables: row and column titles.
- [ ] Clicks: one claim each, forwards and backwards correct; `?static=1#/n/k` correct for every k.
- [ ] Content inside x 128–1792, y 92–948; nothing overlaps the source line, links or page number.
- [ ] Paper theme (T) readable; no hard-coded white.
- [ ] Presenter keywords for every click (several cues per click is fine), exactly one `data-key`.
- [ ] Console clean; with a second language, `?lang=<code>` shows no "[i18n] markup differs" warning.
- [ ] Rendered states inspected as images (`scripts/cdp_render.py OUT "n/0,n/1"`).
