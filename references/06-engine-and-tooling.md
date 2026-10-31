# 06 · Engine, files, presenter, rendering

## 1. Files

```
docs/defense/
  index.html            loads css (fonts, v2, v2-slides, v2-acts, v2-act2, v2-act3, v2-math, v2-frame, v2-frame2)
                        then js: i18n, i18n-<code>, engine, qa-cheat, v2-fx, glass, icons, mapdata, tractattrs,
                        calibdata, slides/v2-0…v2-5, v2-common, v2-demos-0…4   (each with ?v=N cache-buster)
  slides/v2-0-prologue.js  v2-1-act1.js  v2-2-act2.js  v2-3-act3.js  v2-4-epilogue.js  v2-5-supplement.js
  js/engine.js          stage, builds, navigation, chrome, overview, presenter window
  js/v2-common.js       Deck.drawMap, Deck.mapFurniture, Deck.hook (opening tract), Deck.CUB, the anchor rail demo
  js/v2-demos-*.js      one Deck.demo per interactive slide
  js/v2-fx.js           Deck_afx / Deck_pin: the rate-formula registry
  js/glass.js           liquid glass; js/icons.js the icon set
  js/mapdata.js tractattrs.js calibdata.js   data built by tools/build_*.py (no pharmacy coordinates)
  js/i18n.js + i18n-<code>.js   optional second-language view (§7);  js/qa-cheat.js  presenter-only Q&A sheet
  css/v2.css            the design system (tokens, type, stage, builds, photo, chrome, rail, glass, maps)
  css/v2-frame2.css     later slide layouts (chain, literature map, Act III maps, answers, quartiles …)
  img/ fonts/           photos, paper figures, logo; bundled fonts (works offline)
  tools/serve.py        local server on 127.0.0.1:8765, plus /api/keywords (read/write presenter keywords)
  tools/shoot.sh        headless Edge PNG of a slide or slide/step
  edit-keywords.html    visual editor for presenter keywords
  _backup_YYYYMMDD_*    copies taken before each round of edits
```

Order matters for the helpers the slide templates call while they load: `engine.js` (`Deck.add`,
`Deck_photo`), `v2-fx.js` (`Deck_afx`, `Deck_pin`) and `icons.js` (`I`) must come before `slides/*.js`. The
relative order of slides and demos is free: `Deck.add` only queues HTML, and demos bind by name when the
engine builds the deck on `DOMContentLoaded`.

**Bump the `?v=` number** of every file you edit in `index.html`; browsers cache these files hard.

## 2. Writing a slide

```js
Deck.add('act3', `
<section data-title="RQ3: where the lists disagree" data-demo="rmap2" data-steps="2" data-acc="sp">
  <div class="eyebrow e">RQ3 · Finding</div>
  <h2 class="title e tswap">…</h2>
  <div class="… e"> … body … </div>
  <div class="src">Table 4.3; Figure 4.2. …</div>
  <div class="xrefs"><a class="xref" data-goto="s-sens"></a></div>
  <aside class="notes-kw" hidden><ol>
    <li data-k="0"><span class="en">cue</span></li>
    <li data-k="2" data-key><span class="en">the one takeaway</span></li>
  </ol></aside>
  <aside class="notes-en" hidden><p>English talk track … <b>Click:</b> …</p><p><b>If asked:</b> …</p></aside>
</section>`);
```

That is the English-only form, the default. If the user asked for a second language, each `<li>` gets a
second span after the English one, `<span class="<code>">cue in that language</span>`, and the slide gets
`<aside class="notes" hidden><p>script in that language …</p><p><b>If asked (in that language):</b> …</p></aside>`
(§7).

Section ids for `Deck.add(sec, …)`: `open` (Prologue · Why geography cares), `act1` (How my list is built),
`act2` (How well the lists match), `act3` (What changes on the map), `close` (Epilogue · What it means for
geography), `backup` (Supplement · Details for questions). The chrome label comes from this table in
`engine.js SECTIONS`.

`<section>` attributes:

| Attribute | Meaning |
|---|---|
| `data-title` | name in overview, presenter, Q&A sheet links, PDF bookmarks. Keep it stable: `qa-cheat.js` finds slides by title |
| `data-acc` | `wf` `bd` `sp` `ai` `ok` `w` (see 02 §2) |
| `data-demo="a b"` | demo names to bind (space-separated) |
| `data-steps` | highest step index (number of clicks); the slide has `data-steps` + 1 states. The engine takes the max of this and every `data-s/x/dim/lit` value, so set it when a demo drives steps that no attribute declares |
| `data-photo` `data-scrim` `data-pos` `data-credit` | photo layer (02 §4) |
| `data-chrome="off"` | hide the act label, page number, step dots and progress (title, thank-you) |
| `data-act="off"` | hide only the act label (used on "Why pharmacies matter" and "The plan") |
| `data-id` | target for supplement links (`s-…`) |
| `data-done`, `data-tract`, `data-cub` | anchor rail: stations done (0–5), show the tract row, hide the Cub row |
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
precomputed states, so going backwards works for free. Put state on classes (`.mapon`, `.inc`, `.fm-dis`,
`.sx-placed`) and let CSS transitions do the motion. Read colours from CSS variables, not hex, so the
theme switch needs no redraw. Errors in a demo are caught and logged per demo; the slide still shows.

Utilities on `Deck.util`: `$ $$ el svg tween easeOut easeInOut sleep fmt clamp mulberry32 store` and the
linkage ports (`ratio tokenSort tokenSortRatio lcsAlign cleanSteps normName parseAddress addressScore`);
`sha256` is added by `v2-common.js` for the fingerprint demo. Map helpers:
`Deck.drawMap(svgRoot, {box, pad, water, frames, counties})`, `Deck.mapBox(pad)`,
`Deck.mapFurniture(svgRoot)`. Running examples: `Deck.hook()` (the opening tract), `Deck.CUB`.

## 4. Supplement links

On a talk slide: `<div class="xrefs"><a class="xref" data-goto="s-calib" data-label="optional label"></a></div>`.
The engine fills it as `<b>S15</b><span>label or target title</span> →`, computes S-numbers from slide order,
pushes the return point on a stack, and gives every supplement slide a back chip ("↩ 18 Back to the talk"
or "↩ S6 Back" after an S-to-S jump). `R` returns. Supplement slides that no talk slide links to continue the run before them and return to the same talk slide.
A link whose target id is missing is removed and logged.

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
  second-language line under it (19 px) when there is one, and a step label ("start", "click 1" …). Current-step cues are bright, earlier ones fade to
  .32, later ones .5; the `data-key` cue (at most one per slide; S24 has none) is gold `#ffd28a`. The box scrolls itself so the current cues stay
  in view. Under the keywords: the S pages this slide links to (or, on an S page, the talk slides that link to it).
- Q&A sheet (`js/qa-cheat.js`): during slides 1–21 three answer moves (Denominator, Purpose, Check); from the
  thank-you slide and on every S page, Q&A mode: the keywords move under the current slide and the right column
  lists questions by asker with slide chips that jump the audience screen; text shrinks until the list fits.
- `.notes-en` (and `.notes`, the second-language script, when there is one) stay in the files but are not
  shown in the presenter.

Never show presenter material on the audience screen. A copy for reviewers is built separately, without
presenter material, and is frozen once sent.

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
4. Translation tooling: after changing slide text, open `tools/collect_i18n.html` through the server, add
   the translation of new blocks to `tools/i18n/<code>_by_index.json` "extra", and run
   `tools/build_i18n_<code>.py`, which writes `js/i18n-<code>.js`.

Names, addresses, citations, credits and the verbatim prompt stay English in every language.

The live deck was built with one second language already wired into these places. To switch it to another
language, find the current code with `grep -n "qs.get('lang')" js/engine.js`, then replace that code in
`engine.js` (the `?lang=` check, the keyword span class, the `.kw` CSS, `documentElement.lang`), in
`js/i18n.js` (the dictionary global names), in the `notes-kw` spans of every slide file, in the `index.html`
script tag, and in the tool and data file names above; rewrite each `notes` aside and the dictionary in the
new language. To drop the second language, delete those spans, the `notes` asides and the `i18n-<code>.js`
script tag: with no dictionary loaded, `i18n.js` translates nothing and every view stays English.

## 8. Rendering to PNG and PDF

Start the server: `python docs/defense/tools/serve.py` (`/api/keywords` returns
`slides[{n, label, title, builds}]`; the live deck has 47 slides and 132 click states).

- One state: `bash tools/shoot.sh OUT 18 18/2` (headless Edge, `?static=1`, 1920×1080).
- Every click state, reliably: `scripts/cdp_render.py OUTDIR` in this skill. It drives **one** headless Edge
  tab over the DevTools protocol, and before each capture checks that the active slide's `data-title` and
  `location.hash` are the expected ones, every `<img>` in the slide has loaded (complete, with a natural width), and `document.fonts.ready`
  resolved; it tries each state up to 4 times, waits 1 s for maps to settle, removes nodes that browser extensions
  inject, and launches Edge with `--disable-extensions`. Never run several headless browsers in parallel on
  the same server: captures get mixed up and blank pages appear.
- Assemble: `scripts/pdf_assemble.py PNGDIR OUT.pdf [TITLE] [AUTHOR]` (PyMuPDF; 960×540 pt pages, JPEG q88, bookmarks
  "Talk" / "Supplement" with one entry per slide).
- Check: `scripts/pdf_sheets.py OUT.pdf SHEETDIR` renders 4×4 contact sheets with page numbers; look at
  every sheet before handing the PDF over.

Run the scripts with a Python that has PyMuPDF, Pillow and websockets installed.

## 9. Before you call a slide done

1. Open it through the server, step through every build forwards and backwards.
2. `?static=1#/n/k` for each k: the final frame of each step is correct.
3. `T`: check the paper theme (no hard-coded white text, map strokes visible).
4. Resize to 1280×720 and 2560×1440: nothing clips and the bleed fills the window (the stage scales as one
   piece, so the north arrow and scale bar keep their size relative to the map).
5. Presenter (S): keywords for every step, one `data-key`, links listed.
6. Only with a second language: `?lang=<code>` shows no console "[i18n] markup differs" warning for this slide.
7. Console clean (no `[demo …]` errors, no "supplement link without target").
8. Render the slide's states and look at them as images.
9. Back up the slide file to `_backup_YYYYMMDD_<what>/` before a round of edits.
