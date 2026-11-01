# Starter deck

A working deck on the defense-deck-design engine, with a short sample talk to replace. Copy this folder,
start the server, and you have the stage, themes, builds, presenter window and render pipeline that the
skill's reference files describe. The sample talk shows the main patterns in use, each filled with
synthetic content.

The sample is a fictional sleep-science thesis: "Does a phone measure sleep like the lab?" It has 9 talk
slides and 3 supplement slides (27 click states), and every number in it comes from
`tools/build_sample_data.py`. None of it is real data.

## Start

```bash
cp -r assets/starter-deck my-talk      # or copy the folder by hand
cd my-talk
python tools/serve.py                  # http://127.0.0.1:8765
```

Open `http://127.0.0.1:8765`. Use → and ← to step through the builds, S for the presenter window, T to
switch themes and H for every key. Open the deck through the server, not as a file: the render scripts
read the deck through it.

Fonts load from Google Fonts by default. Run `python tools/fetch_fonts.py` once before the talk. It
downloads the fonts into `fonts/` and rewrites `css/fonts.css`, so the deck works offline.

## What the sample shows

| # | Slide | Pattern (skill reference) | Mechanics on show |
|---|---|---|---|
| 1 | Title | title slide (03 §1) | photo layer, glass plate, logo in both themes |
| 2 | Did this participant sleep 7 hours? | the hook: one case, one question (03 §2) | demo `night` draws a figure from data; answer rows; three clicks |
| 3 | The plan | progress rail, plan (03 §5) | demo `anchor`, two running-example rows |
| 4 | Step 1: scoring each epoch | method step, diagram + numbered steps (03 §9, §11) | demo `epochs` (a schematic built in layers), `.conv` line, supplement link |
| 5 | So far | progress rail, recap (03 §5) | stations done with count-ups, the lens moves to "next" |
| 6 | RQ2: how well the phone agrees | finding: figure + formula (03 §10) | scatter with axis titles, units and key; `Deck_afx` rate formula; title swap |
| 7 | RQ3: where the verdict changes | finding: figure + result column (03 §10) | dot strip, `.dx` 2 × 2 with row and column titles, glass buttons that rewrite every number |
| 8 | Summary of findings | answers (03 §12) | three answers, one per click |
| 9 | Thank you | thank-you slide (03 §12) | no chrome |
| S1 | How agreement is counted | supplement table (05 §7) | `.bk-tbl` with axis titles, formula pin `Deck_pin` |
| S2 | Where the nights were recorded | map (05 §2) | `Deck.drawMap`, north arrow and scale bar from `Deck.mapFurniture`, legend |
| S3 | Limitations and next steps | limitations (03 §14) | an S page no talk slide links to |

Each slide has presenter keywords (`notes-kw`, exactly one `data-key`) and an English script (`notes-en`).
`js/qa-cheat.js` fills the presenter's Q&A sheet.

## Files

```
index.html             loads the CSS, then the scripts in order (bump ?v=N when you edit a file)
css/fonts.css          fonts (rewritten by tools/fetch_fonts.py)
css/v2*.css            the design system and the pattern classes; the sample's own figure rules are
                       the last block of v2-frame2.css
js/engine.js           stage, builds, navigation, chrome, overview, presenter window; SECTIONS labels
js/i18n.js             optional second-language view (off unless a dictionary is loaded)
js/glass.js icons.js   liquid glass; stroke icons
js/v2-fx.js            the rate registry: Deck_afx (formula at first use), Deck_pin (corner pin)
js/v2-common.js        Deck.drawMap, Deck.mapFurniture, the tswap demo, the progress rail (stations and
                       running examples in its TALK CONTENT block)
js/v2-demos-0.js       the sample's demos: night, epochs, agree, verdict, sites
js/sampledata.js       synthetic nights          } written by tools/build_sample_data.py
js/mapdata.js          a fictional city          }
js/qa-cheat.js         presenter-only Q&A sheet
slides/v2-0 … v2-5     the talk, one file per section; v2-5-supplement.js is numbered S1, S2 …
img/                   placeholder logo (both themes) and two generated placeholder photos
tools/serve.py         local server on 127.0.0.1:8765 with /api/keywords (read-only)
tools/shoot.sh         one PNG per slide or slide/step with headless Edge
tools/fetch_fonts.py   fonts for offline use
tools/build_sample_data.py   the sample's synthetic data
```

## Make it your talk

1. Read the skill's `SKILL.md` and `references/09-adapting-to-your-field.md`. Decide your fields, two
   running examples, colour roles and section labels.
2. Set the section labels in `js/engine.js` (`SECTIONS`). The ids and `n` names stay the same.
3. Replace the slides in `slides/v2-*.js`, keeping the six file names.
4. Replace the sample's demos in `js/v2-demos-0.js`. Add more `js/v2-demos-N.js` files as needed, each with
   a script tag in `index.html`.
5. Replace the rail stations and running examples in the TALK CONTENT block of `js/v2-common.js`, and
   the rates in `js/v2-fx.js`.
6. Replace `js/sampledata.js` and `js/mapdata.js` with your own derived data, built by your own
   `tools/build_*.py`. Never put raw or private records in the deck. If your talk has no map, delete
   `js/mapdata.js` and its script tag.
7. Replace `img/` with your logo and your photos. A slide's `data-photo="name"` loads `img/name.jpg`. An
   Unsplash photo ID also works: with no local file, the engine loads that photo from Unsplash.
8. Delete the sample's block at the end of `css/v2-frame2.css`, and add your own rules there under a dated
   comment.
9. Write `js/qa-cheat.js` for your talk. It lives only in the presenter window. Leave it out of any copy
   you send to reviewers.

## Render

With the server running, from the skill folder:

```bash
python scripts/cdp_render.py OUT_PNG
python scripts/pdf_assemble.py OUT_PNG talk.pdf "Talk title" "Your Name"
python scripts/pdf_sheets.py talk.pdf OUT_SHEETS
```

The render scripts need Python with PyMuPDF, Pillow and websockets, and Microsoft Edge (at its Windows default
path; on other systems, edit `EDGE` in `scripts/cdp_render.py`). For one state, run
`bash tools/shoot.sh OUT 6 6/1`, adding `THEME=paper` for the light theme.

## Second language

English only is the default. To add a translated view for your own reading, create `js/i18n-<code>.js`
with `window.DECK_L2 = '<code>'` and the dictionaries described at the top of `js/i18n.js`. Load it after
`js/i18n.js` and before `js/engine.js`, then open `?lang=<code>`. A cue in that language goes in each
`notes-kw` item as `<span class="<code>">…</span>` after the English span. The audience view and the
presenter previews stay English.

## How this differs from the reference implementation

The engine, CSS and tools come from the reference deck the skill documents. They differ in these ways:

- Section labels, rail stations, rates, demos and data are the sample talk's.
- The second language is one setting, `window.DECK_L2`; it is not wired to a fixed language.
- `Deck.util` leaves out the reference deck's record-linkage string functions.
- Map data has the schema `{units, metersPerUnit, box, water, areas}`, and the scale bar is labelled in
  km or mi.
- The hook's unit comes from `data-unit` on `.ha-num`. The title-slide eyebrow is readable in the paper
  theme.
- Title swaps have a shared demo, `tswap`.
- `tools/serve.py` is read-only. The keyword editor and the reviewer-copy builder are not included; edit
  keywords in the slide files.

## Licence

The code is MIT-licensed, like the skill. The fonts are under the SIL Open Font License. The placeholder
photos and logo were generated for this starter; replace them freely.
