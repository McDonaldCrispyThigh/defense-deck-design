# 06 · Engine, files, presenter, rendering

This file documents the reference implementation: the engine, tools and file layout of the reference deck
(a geography honors-thesis defense in `docs/defense`). A talk in any field reuses the engine and replaces
the talk content; §1 says which file is which and the few engine strings a talk sets. Paths are relative
to your deck folder (`docs/defense` in the reference deck); `scripts/…` paths are this skill's own
scripts.

## 1. Files

File names are those of the reference implementation. Keep the engine and slide file names: `index.html`,
the server and the render scripts find files by these names. Data and demo files are talk content; a talk
that adds or drops one updates its script tag in `index.html`.

```
<deck folder>/          your deck folder (docs/defense in the reference deck)
  index.html            loads css (fonts, v2, v2-slides, v2-acts, v2-act2, v2-act3, v2-math, v2-frame, v2-frame2)
                        then js: i18n, i18n-<code>, engine, qa-cheat, v2-fx, glass, icons, mapdata, tractattrs,
                        calibdata, slides/v2-0…v2-5, v2-common, v2-demos-0…4   (each with ?v=N cache-buster)
  slides/v2-0-prologue.js  v2-1-act1.js  v2-2-act2.js  v2-3-act3.js  v2-4-epilogue.js  v2-5-supplement.js
  js/engine.js          stage, builds, navigation, chrome, overview, presenter window
  js/v2-common.js       reference deck: Deck.drawMap, Deck.mapFurniture, its running examples (Deck.hook, the
                        opening tract; Deck.CUB, one pharmacy) and the anchor rail demo
  js/v2-demos-*.js      one Deck.demo per interactive slide
  js/v2-fx.js           Deck_afx / Deck_pin: the rate-formula registry
  js/glass.js           liquid glass; js/icons.js the icon set
  js/mapdata.js tractattrs.js calibdata.js   reference deck's data (map geometry, tract attributes, linkage
                        calibration grid), built by tools/build_*.py; derived data only (no pharmacy coordinates)
  js/i18n.js + i18n-<code>.js   optional second-language view (§7);  js/qa-cheat.js  presenter-only Q&A sheet
  css/v2.css            the design system (tokens, type, stage, builds, photo, chrome, rail, glass, maps)
  css/v2-frame2.css     later slide layouts (reference deck: chain, literature map, Act III maps, answers,
                        quartiles …)
  img/ fonts/           photos, figures from the written thesis or paper, logo; bundled fonts (works offline)
  tools/serve.py        local server on 127.0.0.1:8765, plus /api/keywords (read/write presenter keywords)
  tools/shoot.sh        headless Edge PNG of a slide or slide/step
  tools/build_review.py the copy for reviewers (§6)
  edit-keywords.html    visual editor for presenter keywords
  _backup_YYYYMMDD_*    copies taken before each round of edits
```

What a new talk keeps and what it replaces:

| Part | Files | In a new talk |
|---|---|---|
| Engine | `js/engine.js`, `js/glass.js`, `js/icons.js`, `js/i18n.js`, `css/fonts.css`, `css/v2.css`, `fonts/`, `tools/serve.py`, `tools/shoot.sh`, `edit-keywords.html`, `tools/build_review.py`, `js/review.js`, `css/review.css` | keep; change only the `SECTIONS` labels (§2), the owner and reviewer names in `build_review.py`, and the second-language text when the talk's language choice differs from the reference deck's (§7) |
| Rate registry | `js/v2-fx.js` | keep `Deck_afx` / `Deck_pin`; replace the entries of its `FX` object (`{name, c, top, bot}`: rate name in words, colour token, numerator and denominator in words) with the talk's own rates (05 §5) |
| Pattern CSS | `css/v2-slides.css` `v2-acts.css` `v2-act2.css` `v2-act3.css` `v2-math.css` `v2-frame.css` `v2-frame2.css` | keep: the patterns in 03 use these classes; new rules go to `v2-frame2.css` under a dated comment, scoped to a slide class |
| Talk content | the contents of the six `slides/v2-*.js`, `js/v2-demos-*.js`, the running examples and rail stations in `js/v2-common.js`, the data files and the `tools/build_*.py` that write them, `js/qa-cheat.js`, `img/`, `js/i18n-<code>.js` | replace with the talk's own |

Keep the six slide file names even when the act titles change: `tools/serve.py` lists them in `FILES` and
treats the last one, `v2-5-supplement.js`, as the supplement; `/api/keywords`, the keyword editor and the
render scripts read the deck through that list.

Order matters for the helpers the slide templates call while they load: `engine.js` (`Deck.add`,
`Deck_photo`), `v2-fx.js` (`Deck_afx`, `Deck_pin`) and `icons.js` (`I`) must come before `slides/*.js`. The
relative order of slides and demos is free: `Deck.add` only queues HTML, and demos bind by name when the
engine builds the deck on `DOMContentLoaded`.

**Bump the `?v=` number** of every file you edit in `index.html`; browsers cache these files hard.

## 2. Writing a slide

```js
Deck.add('act3', `
<section data-title="[short stable title]" data-demo="[demo name]" data-steps="2" data-acc="sp">
  <div class="eyebrow e">[label] · Finding</div>
  <h2 class="title e tswap">…</h2>
  <div class="… e"> … body … </div>
  <div class="src">[table or figure number; data source] …</div>
  <div class="xrefs"><a class="xref" data-goto="s-…"></a></div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">cue</span></li>
    <li data-k="2" data-key><span class="en">the one takeaway</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>English talk track … <b>Click:</b> …</p><p><b>If asked:</b> …</p></aside>
</section>`);
```

Example (reference deck, a geography thesis): `data-title="RQ3: where the lists disagree"`,
`data-demo="rmap2"`, eyebrow `RQ3 · Finding`, source line `Table 4.3; Figure 4.2. …`, link
`data-goto="s-sens"`.

That is the English-only form, the default. If the user asked for a second language, each `<li>` gets a
second span after the English one, `<span class="<code>">cue in that language</span>`, and the slide gets
`<aside class="notes"><p>script in that language …</p><p><b>If asked (in that language):</b> …</p></aside>`
(§7). The keyword editor drops cues that have only an `.en` span; read its note in §7 before using it.

Section ids for `Deck.add(sec, …)` come from `engine.js SECTIONS`, one entry
`{ id, n, label }` per section. The ids and the `n` names are fixed; each talk writes its own `label`. The
chrome shows `n` in bold followed by `label`; the overview and the presenter header show `n · label`.

| id | `n` | Reference deck `label` (a geography thesis) | Illustrative, another field (a sleep-science thesis) |
|---|---|---|---|
| `open` | Prologue | Why geography cares | Why sleep researchers care |
| `act1` | Act I | How my list is built | How the phone measure is built |
| `act2` | Act II | How well the lists match | How well it agrees with the lab test |
| `act3` | Act III | What changes on the map | What changes for shift workers |
| `close` | Epilogue | What it means for geography | What it means for sleep research |
| `backup` | Supplement | Details for questions | Details for questions |

Slides in `backup` are numbered S1, S2 … in order and get back chips (§4); all other slides are numbered
1, 2 …. A slide with an unknown section id falls back to the first entry.

`<section>` attributes:

| Attribute | Meaning |
|---|---|
| `data-title` | name in overview, presenter, Q&A sheet links, PDF bookmarks. Keep it stable: `qa-cheat.js` and the keyword editor find slides by title, so it must also be unique |
| `data-acc` | `wf` `bd` `sp` `ai` `ok` `w`, by role (02 §2): source/condition A, source/condition B, space/context/setting, method/model/instrument, yes/agreement, neutral (`--tx`) |
| `data-demo="a b"` | demo names to bind (space-separated) |
| `data-steps` | highest step index (number of clicks); the slide has `data-steps` + 1 states. The engine takes the max of this and every `data-s/x/dim/lit` value, so set it when a demo drives steps that no attribute declares |
| `data-photo` `data-scrim` `data-pos` `data-credit` | photo layer (02 §4) |
| `data-chrome="off"` | hide the act label, page number, step dots and progress (title, thank-you) |
| `data-act="off"` | hide only the act label (reference deck: "Why pharmacies matter" and "The plan") |
| `data-id` | target for supplement links (`s-…`) |
| `data-done`, `data-tract`, `data-cub` | anchor rail (03 §5): stations done (0–5); `data-tract="1"` shows the second running-example row before all five stations are done; `data-cub="0"` hides the first running-example row. The attribute names come from the reference deck's examples (a census tract, a Cub pharmacy) and stay as they are |
| `class="anchor"`, `class="t-…"` | layout family hooks |

## 3. Demos

```js
Deck.demo('name', {
  init(s)            { /* once, first time the slide is entered: build SVG, cache nodes on s */ },
  enter(s, step)     { /* every time the slide becomes current: reset state */ },
  step(s, k, prev)   { /* every step change, incl. arrival (prev = -1): set classes, tween */ },
  leave(s)           { /* stop timers */ },
  theme(s, t)        { /* optional: redraw colours that JS computed */ },
});
```

Pattern used throughout: `init` draws everything once; `step` only toggles classes or tweens between
precomputed states, so going backwards works for free. Put state on classes (reference deck: `.mapon`,
`.inc`, `.fm-dis`, `.sx-placed`) and let CSS transitions do the motion. Read colours from CSS variables,
not hex, so the theme switch needs no redraw. `Deck.static` is true under `?static=1`: jump to the final
state of the step instead of animating. Errors in a demo are caught and logged per demo; the slide still
shows. The rail demo `anchor` in `js/v2-common.js` belongs to the rail pattern (03 §5) and keeps its name;
the other demo names (`rmap2`, `ruler`, `fp` …) are the reference deck's, and a new talk names its own.

Utilities on `Deck.util`: `$ $$ el svg tween easeOut easeInOut sleep fmt clamp mulberry32 store` and the
string-matching ports used by the reference deck's record-linkage demos
(`ratio tokenSort tokenSortRatio lcsAlign cleanSteps normName parseAddress addressScore`); `sha256` is
added by `v2-common.js` for the reference deck's fingerprint demo.

Map helpers (reference implementation, `js/v2-common.js`, reading `window.MAPDATA` from `js/mapdata.js`):
`Deck.drawMap(svgRoot, {box, pad, water, frames, counties})`, `Deck.mapBox(pad)`,
`Deck.mapFurniture(svgRoot)`. `Deck.mapFurniture` draws the north arrow and the scale bar (labelled in
miles, a round length near a fifth of the view) from `MAPDATA.metersPerUnit`; call it after every viewBox
change. The map's legend is `.map-lg` in the markup. Other figures carry their furniture in the demo's SVG
or the markup: axis titles with units and a legend on plots, a scale bar on images of specimens or
samples, row and column axis titles on tables (05 §0).

Running examples: `Deck.hook()` (the opening tract) and `Deck.CUB` (one pharmacy) are the reference deck's
talk content; a new talk replaces them with its own examples.

## 4. Supplement links

On a talk slide: `<div class="xrefs"><a class="xref" data-goto="s-…" data-label="optional label"></a></div>`.
The engine fills it as `<b>S15</b><span>label or target title</span> →`, computes S-numbers from slide order,
pushes the return point on a stack, and gives every supplement slide a back chip ("↩ 18 Back to the talk"
or "↩ S6 Back" after an S-to-S jump). `R` returns. Supplement slides that no talk slide links to continue
the run before them and return to the same talk slide. A link whose target id is missing is removed and
logged.

## 5. Keys and URL

→ Space PgDn next build · ← PgUp previous · ↓ ↑ skip builds · Home End · `12` Enter jump · O overview ·
S presenter · T theme · F fullscreen · B blackout · R back from supplement · H ? help · Esc close.
URL hash `#/slide/step` (1-based slide). Query: `?static=1`, `?theme=paper|ink`, `?lang=<code>` (only with a second language), `?preview=1`
(chrome hidden; used by the presenter iframes).

## 6. Presenter window (S)

A pop-up the size of the screen: header with section, slide number and title, a running timer
(JetBrains Mono 34 px) and clock; left column the current slide and the next build/slide as live iframes
(always English, same theme); right column **keywords** and the **Q&A cheat sheet**.

- Keywords come from `<aside class="notes-kw">`: one `<li data-k>` per cue, the English line (23 px), the
  second-language line under it (19 px) when there is one, and a step label ("start", "click 1" …).
  Current-step cues are bright, earlier ones fade to .32, later ones .5; the `data-key` cue (exactly one per
  slide; the reference deck's S24 has none, see 08 #26) is gold `#ffd28a`. The box scrolls itself so the current
  cues stay in view. Under the keywords: the S pages this slide links to (or, on an S page, the talk slides
  that link to it).
- Q&A sheet (`js/qa-cheat.js`, talk content, presenter only), two globals:
  - `window.DeckQA`: answer moves, each `{t, en, go, lines}`: the move's name in bold (`t`; the reference
    deck writes it in its second language), its English word (`en`), the slide titles to show (`go`,
    matched against `data-title`) and the answer lines. On every talk slide before the last, the moves sit
    under the keywords, and the moves that point to the current slide are marked. The reference deck has
    three: Denominator, Purpose, Check.
  - `window.DeckQABank`: questions grouped by asker, `{who, items: [{hear, say, go}]}`: the question as it
    will be heard, the answer to give, the slides to show.
  - From the last talk slide (the thank-you slide) and on every S page, Q&A mode: the keywords move under
    the current slide, the moves collapse to one row, and the right column lists the questions by asker
    with slide chips that jump the audience screen; text shrinks until the list fits.
- `.notes-en` (and `.notes`, the second-language script, when there is one) stay in the files but are not
  shown in the presenter.

Never show presenter material on the audience screen. A copy for reviewers is built separately, without
presenter material, and is frozen once sent. In the reference implementation `tools/build_review.py` builds
it: `review.html` (the owner's copy, with the comment and suggestion layer of `js/review.js` and
`css/review.css`) and a zip package for the reviewer, with every `notes`, `notes-en` and `notes-kw` aside
and `js/qa-cheat.js` removed. Its docstring says to rerun it after every change; once the package has been
sent, do not rerun it, because it overwrites the sent package.

## 7. Optional second language

English only is the default: one `.en` span per keyword cue, `notes-en`, no `notes` aside, no translated
view, and §9 step 6 does not apply. Ask the user before adding a second language and use the one they
name; `<code>` below is its language code (for example `es`, `fr`, `de`, `ja`).

The engine has one second-language slot, which appears in four places:

1. Presenter keywords: `engine.js` reads the span with class `<code>` in each `notes-kw` `<li>` and styles
   it as the smaller line under the English one (`.kw .<code>` rules in the presenter CSS). A cue without
   that span shows the English line alone.
2. Speaker script: `<aside class="notes">` in that language. It is kept in the file, not displayed.
3. Translated view, for the presenter's own reading: `engine.js` turns it on when `?lang=` equals the code
   and `window.DeckI18n` exists, and sets `document.documentElement.lang`; `js/i18n.js` then swaps each text
   block for its entry in the dictionary that `js/i18n-<code>.js` defines (`window.I18N_<CODE>`, slide
   titles in `window.I18N_<CODE>_TITLES`), only when tags and attributes match the English exactly, so
   builds and demos survive. The presenter-window previews always load without `?lang=`, and the audience
   screen is opened without it, so both stay English.
4. Translation tooling (reference implementation): after changing slide text, open
   `tools/collect_i18n.html` through the server, add the translation of new blocks to
   `tools/i18n/<code>_by_index.json` "extra", and run `tools/build_i18n_<code>.py`, which writes
   `js/i18n-<code>.js`.

Names, citations, credits and verbatim quoted material (in the reference deck: addresses and the model
prompt) are never translated: every language shows them exactly as the English slide does.

The keyword editor (`edit-keywords.html` through `tools/serve.py`) always works with two spans per cue:
`serve.py` parses a cue only when it carries both (`KW_ITEM`), writes both on save (`block()`, the second
one empty when nothing was typed in it), and a save replaces the slide's whole `notes-kw` block. In an
English-only deck, cues with only an `.en` span are invisible to the editor and lost on its first save of
that slide. Either write every cue with an empty second span of the class `KW_ITEM` expects (an empty span
shows nothing in the presenter) or edit keywords in the slide files only. The editor finds a `notes-kw`
block only at the skeleton's two-space indent (`KW_BLOCK`), and saves only into a slide that has one or
has the exact line `  <aside class="notes">` (`NOTES_ANCHOR`, no `hidden`) to insert one before.

The reference deck was built with one second language already wired into these places. To switch it to
another language, find the current code with `grep -n "qs.get('lang')" js/engine.js`, then replace that
code in `engine.js` (the `?lang=` check, the keyword span class, the `.kw` CSS, `documentElement.lang`), in
`js/i18n.js` (the dictionary global names), in the `notes-kw` spans of every slide file, in the `index.html`
script tag, in `tools/serve.py` (`KW_ITEM`, `block()`) and `edit-keywords.html`, and in the tool and data
file names above; rewrite each `notes` aside and the dictionary in the new language. The presenter headings
in `engine.js` (`Keywords · …`, `Q&A cheat sheet · …`, `Links to · …`, `back to · …`) and the lines under
them, and the keyword editor's headings, labels and placeholders, also carry the second language; rewrite
that text in the new language. To drop the second language, delete that text, the spans (or empty them,
if you keep using the keyword editor), the `notes` asides and the `i18n-<code>.js` script tag: with no
dictionary loaded, `i18n.js` translates nothing and every view stays English.

## 8. Rendering to PNG and PDF

Start the server: `python <deck folder>/tools/serve.py` (`python docs/defense/tools/serve.py` in the
reference deck). `/api/keywords` returns `slides[{n, label, title, builds}]`; the reference deck has 47
slides and 132 click states. `tools/shoot.sh` and `scripts/cdp_render.py` expect Microsoft Edge at its
default Windows path.

- One state: `bash tools/shoot.sh OUT 18 18/2` (headless Edge, `?static=1`, 1920×1080; `THEME=paper` in the
  environment for the paper theme).
- Every click state, reliably: `scripts/cdp_render.py OUTDIR [SUBSET]` in this skill (SUBSET like
  `"2/3,18/0"`; writes `pNN_K.png` per state). It drives **one** headless Edge tab over the DevTools
  protocol, and before each capture checks that the active slide's `data-title` and `location.hash` are the
  expected ones, every `<img>` in the slide has loaded (complete, with a natural width), and
  `document.fonts.ready` resolved; it tries each state up to 4 times, waits 1 s for maps and charts to
  finish drawing, removes nodes that browser extensions inject, and launches Edge with
  `--disable-extensions`. Never run several headless browsers in parallel on the same server: captures get
  mixed up and blank pages appear.
- Assemble: `scripts/pdf_assemble.py PNGDIR OUT.pdf [TITLE] [AUTHOR]` (PyMuPDF; 960×540 pt pages, JPEG q88,
  bookmarks "Talk" / "Supplement" with one entry per slide).
- Check: `scripts/pdf_sheets.py OUT.pdf SHEETDIR` renders 4×4 contact sheets with page numbers; look at
  every sheet before handing the PDF over.

Run the scripts with a Python that has PyMuPDF, Pillow and websockets installed.

## 9. Before you call a slide done

1. Open it through the server, step through every build forwards and backwards.
2. `?static=1#/n/k` for each k: the final frame of each step is correct.
3. `T`: check the paper theme (no hard-coded white text; map strokes, axes and figure lines visible).
4. Resize to 1280×720 and 2560×1440: nothing clips and the bleed fills the window (the stage scales as one
   piece, so figure furniture such as the north arrow, scale bar and axis titles keeps its size relative to
   the figure).
5. Presenter (S): keywords for every step, one `data-key`, links listed.
6. Only with a second language: `?lang=<code>` shows no console "[i18n] markup differs" warning for this slide.
7. Console clean (no `[demo …]` errors, no "supplement link without target", no "cheat sheet: no slide
   titled").
8. Render the slide's states and look at them as images.
9. Back up the slide file to `_backup_YYYYMMDD_<what>/` before a round of edits.
