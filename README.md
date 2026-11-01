# defense-deck-design

An [Agent Skill](https://agentskills.io) that records a design system and build rules for animated HTML
research talks in any discipline: thesis defenses, conference talks, job talks and seminars. The system is a
1920×1080 stage, dark "ink" and light "paper" themes, click-by-click builds, live figures drawn from data,
rates written out as formulas in words, and a presenter window with keywords. With it, an AI coding agent can
build a new talk in this style, or add, edit, review or re-create slides that look and behave like the
existing ones.

It follows the open Agent Skills format (a folder with a `SKILL.md` file, plus `references/` and `scripts/`),
so it works with any agent that supports that format, for example Claude Code, Codex, GitHub Copilot, Cursor
and Gemini CLI ([full list](https://agentskills.io/clients)). Nothing in it depends on one agent.

The skill was developed on one reference deck, a geography thesis defense, and the second part of its slide
catalog documents that deck. The skill was written from the deck's source (engine, stylesheets, slide and
demo files) and from renders of all 132 click states, and two independent passes checked it claim by claim
against that source. The deck's content is not in this repository; its engine, stylesheets and tools are, as
the starter deck in `assets/starter-deck/`, with a sample talk in place of the thesis. The rules are stated
for any field. Content taken from the reference deck appears only as labelled examples.

## Contents

| File | Contents |
|---|---|
| `SKILL.md` | entry point: non-negotiable rules, language default, the look in one paragraph, starting a talk in a new field, how to add a slide, checklist |
| `references/01-narrative-and-voice.md` | framing the talk by its field and question, structure and timing, writing for three kinds of listener, number rules, finding slides, citations, speaker notes |
| `references/02-tokens-and-type.md` | stage and safe area, colour tokens for both themes, semantic colours by role, accents, photo scrims, fonts, type scale, spacing, rules instead of boxes, glass, icons |
| `references/03-layout-patterns.md` | the common frame, body grids and every slide pattern with markup skeletons, plus a pattern chooser |
| `references/04-motion-and-builds.md` | easing and durations, transitions, build attributes, step-keyed CSS, title swaps, count-ups, demo motion, static mode |
| `references/05-maps-and-charts.md` | figures readable without the speaker: charts with axis titles, units and legends; maps with north arrow, scale bar and legend; scale bars on images; tables with row and column titles; palettes, schematic diagrams, rate formulas, equations |
| `references/06-engine-and-tooling.md` | the reference engine: files, slide and demo API, supplement links, keys, presenter window, optional second language, PNG/PDF rendering |
| `references/07-slide-catalog.md` | a field-neutral outline for a 20-minute talk (job, pattern, accent role and click plan per slot), then every slide of the reference deck as that outline in use |
| `references/08-known-issues.md` | pitfalls any deck on this engine falls into, each with the rule that avoids it and the reference deck's instance; new slides must not repeat them |
| `references/09-adapting-to-your-field.md` | applying the system to a talk in another discipline: what stays fixed, what each talk sets for itself, figure furniture by figure type, choices for ten field families, a checklist |
| `assets/starter-deck/` | a working deck to copy: engine, CSS, local server and render tools, plus a sample talk with synthetic data (12 slides) that shows the main patterns and is meant to be replaced |
| `scripts/` | render every click state through one headless Edge tab, assemble a PDF, make contact sheets |

## Install

Put this folder where your agent looks for skills. Keep the folder name `defense-deck-design`: the format
requires it to match the `name` in `SKILL.md`.

| Agent | For all your projects | For one project |
|---|---|---|
| Claude Code | `~/.claude/skills/defense-deck-design` | `.claude/skills/defense-deck-design` |
| Codex (CLI, IDE extension, ChatGPT desktop app) | `~/.agents/skills/defense-deck-design` | `.agents/skills/defense-deck-design` |
| Any other agent with skills support | its skills folder (see the agent's documentation) | |

For example, for Codex:

```bash
git clone https://github.com/McDonaldCrispyThigh/defense-deck-design ~/.agents/skills/defense-deck-design
```

The agent then reads the skill's name and description and loads the full instructions when a task matches.

An agent without skills support can still use it: point it at `SKILL.md`, for example with a line in the
project's `AGENTS.md`: "For slides in `<your deck folder>`, follow `defense-deck-design/SKILL.md` and the
reference files it lists."

## Scope

The tokens, type scale, layout patterns, motion values and writing rules apply to a talk in any discipline
built on the same engine. To start one, copy `assets/starter-deck/` and run `python tools/serve.py` in the
copy; its `README.md` lists what to replace. Each talk assigns its own meanings to the semantic colours and
names its own key objects; `references/09-adapting-to-your-field.md` covers that step. The engine paths, the
slide catalog and the known issues document the reference implementation, kept in the `docs/defense` folder
of the reference deck's project. The render scripts expect a deck server on `127.0.0.1:8765` and Microsoft
Edge, and need Python with PyMuPDF, Pillow and websockets. The starter deck itself needs only a browser and
Python's standard library.

Slides and speaker material are in English by default. Before writing presenter material, the skill asks
whether you want a second language and which one.

## License

[MIT](LICENSE). The starter deck loads its fonts (Inter, Inter Tight, JetBrains Mono, STIX Two Text) from
Google Fonts under the SIL Open Font License; its placeholder photos and logo were generated for it.
