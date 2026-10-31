# defense-deck-design

A [Claude Code](https://claude.com/claude-code) skill that records the design system and build rules of an
animated HTML thesis-defense deck: a 1920×1080 stage, dark "ink" and light "paper" themes, click-by-click
builds, live census-tract maps, rate formulas written out in words, and a presenter window with keywords.
With it, Claude can add, edit, review or re-create slides that look and behave like the existing ones, or
build a new talk in the same style.

The skill was written from the deck's full source (engine, stylesheets, slide and demo files) and from renders
of all 132 click states. Two independent passes then checked it claim by claim against that source.

## Contents

| File | Contents |
|---|---|
| `SKILL.md` | entry point: non-negotiable rules, language default, the look in one paragraph, how to add a slide, checklist |
| `references/01-narrative-and-voice.md` | geography framing, structure and timing, writing for three kinds of listener, number rules, finding slides, citations, speaker notes |
| `references/02-tokens-and-type.md` | stage and safe area, colour tokens for both themes, accents, photo scrims, fonts, type scale, spacing, rules instead of boxes, glass, icons |
| `references/03-layout-patterns.md` | the common frame, body grids and every slide pattern with markup skeletons, plus a pattern chooser |
| `references/04-motion-and-builds.md` | easing and durations, transitions, build attributes, step-keyed CSS, title swaps, count-ups, demo motion, static mode |
| `references/05-maps-and-charts.md` | map drawing, north arrow and scale bar, legends, palettes; schematic diagrams; charts, rate formulas, equations, tables |
| `references/06-engine-and-tooling.md` | files, slide and demo API, supplement links, keys, presenter window, optional second language, PNG/PDF rendering |
| `references/07-slide-catalog.md` | every slide of the reference deck: accent, pattern, clicks, links |
| `references/08-known-issues.md` | quirks in the reference deck that new slides should not copy |
| `scripts/` | render every click state through one headless Edge tab, assemble a PDF, make contact sheets |

## Install

Clone into your personal skills folder:

```bash
git clone https://github.com/McDonaldCrispyThigh/defense-deck-design ~/.claude/skills/defense-deck-design
```

or into a project's `.claude/skills/` folder. Claude Code then loads it when a task matches the skill's
description.

## Scope

The skill documents one deck, kept in the `docs/defense` folder of a thesis project; the deck itself is not
in this repository. The rules, tokens, layout patterns and motion values carry over to any talk built on the
same engine. The file paths, the slide catalog and the known issues refer to that deck. The render scripts
expect the deck's local server on `127.0.0.1:8765` and Microsoft Edge, and need PyMuPDF, Pillow and
websockets.

Slides and speaker material are in English by default. Before writing presenter material, the skill asks
whether you want a second language and which one.
