# defense-deck-design

An [Agent Skill](https://agentskills.io) that records the design system and build rules of an animated HTML
thesis-defense deck: a 1920×1080 stage, dark "ink" and light "paper" themes, click-by-click builds, live
census-tract maps, rate formulas written out in words, and a presenter window with keywords. With it, an AI
coding agent can add, edit, review or re-create slides that look and behave like the existing ones, or build
a new talk in the same style.

It follows the open Agent Skills format (a folder with a `SKILL.md` file, plus `references/` and `scripts/`),
so it works with any agent that supports that format, for example Claude Code, Codex, GitHub Copilot, Cursor
and Gemini CLI ([full list](https://agentskills.io/clients)). Nothing in it depends on one agent.

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
project's `AGENTS.md`: "For slides in `docs/defense`, follow `defense-deck-design/SKILL.md` and the reference
files it lists."

## Scope

The skill documents one deck, kept in the `docs/defense` folder of a thesis project; the deck itself is not
in this repository. The rules, tokens, layout patterns and motion values carry over to any talk built on the
same engine. The file paths, the slide catalog and the known issues refer to that deck. The render scripts
expect the deck's local server on `127.0.0.1:8765` and Microsoft Edge, and need Python with PyMuPDF, Pillow
and websockets.

Slides and speaker material are in English by default. Before writing presenter material, the skill asks
whether you want a second language and which one.

## License

[MIT](LICENSE)
