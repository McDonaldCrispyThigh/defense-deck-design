# 08 · Known pitfalls (do not repeat them)

Pitfalls that any deck built on this engine falls into easily, whatever the field. Each item names the
pitfall, gives the rule that avoids it (**Do:**; in items 24–28 the bold line is the rule), and cites where
the reference deck shows it (*Reference deck:*) as evidence only. The reference deck is a geography
honors-thesis defense (talk slides 1–22, supplement S1–S25), audited slide by slide on 2026-10-30; slide
numbers and class names are cited as found there. These pitfalls are harmless in that deck's own setting
(ink theme, Chromium, 1920×1080), but a new slide must not repeat them: several break in the paper theme,
for a viewer who turns off motion, or after slides are added or reordered. Run these checks with 06 §9
before you call a slide done, and use them to audit an existing deck.

Change a working deck only when the user asks (the reference implementation lives in `docs/defense`). A copy
already handed in or sent to reviewers is frozen: never edit or rebuild it.

## Rendering

1. **Weights and glyphs outside the bundled fonts.** Bundled ranges: Inter 400–700, Inter Tight 500–700,
   JetBrains Mono 400–600. Weight 750 renders as 700; mono 650/700 render as 600. The latin subsets lack `→`
   and `↩` in Inter and `≥` in STIX Two Text; those fall back to system fonts.
   **Do:** use 700 at most. Treat every symbol outside basic Latin (arrows, maths operators, Greek letters,
   unit signs) as unverified until a render shows it in the intended font.
2. **Hard-coded white.** A raw `#fff` or `rgba(255,255,255,…)` in slide CSS, an SVG attribute or demo JS stays
   white on the paper theme, so strokes, fills and text vanish there.
   **Do:** use tokens (`--tx`, `--line2`, `--fill`) and check every slide with `T` (06 §9).
   *Reference deck:* closing-map tracts (`rgba(255,255,255,.03)`), hook-map tracts (`rgba(255,255,255,.04)`
   fill, `.16` stroke), area-map tracts and background (the study-area map), the `.gridsvg .cell` stroke,
   the white stroke on the running-example store's dot, `#fff` outlines on the opening tract, the ruler's
   centre dot and marker crosses, the title eyebrow `--acc:#fff`, the range-slider thumb, `.sp-credit`.
3. **SVG `fill` attributes lose to CSS rules.** A class rule that sets `fill` overrides the attribute, so a
   label renders in a colour other than the one written in its markup.
   **Do:** set the colour of SVG text and marks (axis labels, annotations, map labels) in CSS only.
   *Reference deck:* under `.rl`, the hook's "1 mile" label renders `--sp` and the ruler's "½ mile" label
   renders `--tx3`, opposite to their attributes.
4. **Motion that never stops.** The engine has no `prefers-reduced-motion` handling.
   **Do:** add no looping motion beyond what 04 §11 allows. A loop you add stops in `leave()` and draws its
   end state under `Deck.static` (04 §10).
   *Reference deck:* the Ken Burns zoom, the blinking caret and the looping typewriter always run.

## Cascade

5. **`.fr-list span` overrides `.cite`** by specificity, so a citation inside a numbered list renders at full
   size in `--tx2`.
   **Do:** give citations in lists their own rule (`.fr-list .cite { font-size: .82em; color: var(--tx3) }`).
   *Reference deck:* slide 19, S23.
6. **`.steps > div` captures every child `div`**: a `.legend` placed inside `.steps` becomes a numbered grid
   row.
   **Do:** keep legends outside numbered lists.
   *Reference deck:* slide 9 shows an extra "04".
7. **Generic class names collide across files.** A short class styled globally in one stylesheet reaches every
   element that reuses the name elsewhere.
   **Do:** scope generic class names to their slide (`.st4 .sx`).
   *Reference deck:* `v2-act3.css` styles `.sx` globally, so `data-scrim="sx"` gives the photo layer a 1 px top
   border and a dot.
8. **Margin conflicts by load order.** A utility margin on an element that has its own margin rule wins or
   loses by specificity and file order, not by intent.
   **Do:** put spacing on a wrapper, not on an element with its own margin rule.
   *Reference deck:* `.quote { margin: 0 }` cancels `.mt-m`; `.cub-note` beats `.tail`; `.ans` overrides
   `.body`'s margin-top.
9. **Inline `opacity` on an `.e` element has no effect**: the `eIn` fill holds opacity at 1.
   **Do:** set a resting opacity on a wrapper or a child of the `.e` element, or dim it with a build
   (`data-dim`, 04 §4).

## Layout

10. **Content below y 948.** The content box ends at y 948; y 948–1080 belongs to the source line, links and
    page furniture (02 §1).
    **Do:** size every body to the space under its title and check the lowest element in a render.
    *Reference deck:* slide 3's side column (to y 997), slide 6's table (993), slide 8's tract row (1040),
    slide 17's ruler (640 px in a 589 px body).
11. **Fixed-width name columns overflow.** A long name in a fixed column runs into the next one.
    **Do:** let the name column size to content.
    *Reference deck:* `.afx-name` overflows a 150 px column on slide 15 ("Matched (precision)" is 256 px
    wide). Example (illustrative): "Sensitivity (true positive rate)" in a clinical talk overflows the same
    column.
12. **Rows that should align with the rail do not.** A row under the rail needs the rail's own grid.
    **Do:** build it on the chain's `.cm-row` (03 §7), which aligns with the stations.
    *Reference deck:* `.track-ex` cells (260 px label column + 5 columns) miss the rail stations.
13. **Figure boxes without `position`.** Absolutely positioned furniture (legend, north arrow, scale bar,
    buttons) needs a positioned parent.
    **Do:** give every map or plot box `position: relative`.
    *Reference deck:* `.hb-map` has no `position`; its legend is positioned only because the entrance
    animation leaves a transform.
14. **Paired summaries out of level.** When one of two side-by-side "So:" lines wraps to two lines, the
    summaries no longer line up.
    **Do:** keep paired "So:" lines the same length, or align the columns by grid rows.
    *Reference deck:* the two summaries on slide 16.
15. **Legend swatch differs from the mark it explains.** A reader matches swatch to mark by colour and dash;
    any mismatch breaks the legend.
    **Do:** draw each swatch with the same token and dash as its mark. Every figure is readable without the
    speaker (05 §0): maps carry a north arrow, a scale bar and a legend; plots carry axis titles with units and a
    legend; images of specimens or samples carry a scale bar; tables carry row and column axis titles.
    *Reference deck:* slide 18 ("neither list" swatch `--fill2`, tracts `--fill`); slide 9 (county swatch
    dotted `--tx2`, line dashed `--tx3`).

## Behaviour

16. **Transitions on the wrong element.** When JS changes a property on one element and the CSS transition
    sits on another, or on none, the change jumps instead of easing.
    **Do:** put the transition on the element whose property changes.
    *Reference deck:* on S6 the JS sets opacity on the `<g>` while the CSS transition is on its children; the
    ruler markers have no transition.
17. **`theme()` hooks that redraw a fixed state.** A hook that redraws the final state puts the wrong step on
    screen when the theme toggles mid-build.
    **Do:** redraw the current step.
    *Reference deck:* the S14 histogram draws step 2 on any theme toggle.
18. **`data-title` is a lookup key.** `qa-cheat.js` finds slides by title, and the overview, presenter and PDF
    bookmarks show it (06 §2). Renaming a slide breaks its cheat-sheet chips.
    **Do:** keep titles stable; when one must change, update every Q&A-sheet entry that names it in the same
    edit.
19. **Supplement back chips inherit.** A supplement page with no talk link returns to the talk slide of the
    previous linked page (06 §4), so reordering pages or links changes where "Back" goes.
    **Do:** after any reorder, follow every back chip once.
20. **Dead code.** Retired slides leave classes, demos and data arrays behind, and CSS comments keep the slide
    numbers of an older order.
    **Do:** remove a retired demo with its CSS and data in the same edit. Find slides by `data-title`, never by
    a number in a comment.
    *Reference deck:* `.ch-u/.ch-t/.ch-brk/.ch-open/.ch-sum/.ch-b/.ch-q`, `.rm-big`, `.rm-split`, `.miss/.mg`;
    demos `srcs`, `audit`, `judge`, `checks`, `rq1`, `kw`, `assign2`, `recur2`, `scat`, `sens3`, `quart2` and
    their CSS; unused data arrays; CSS comments with pre-restructure slide numbers.

## Semantics

21. **Colour used outside its role.** Each semantic token carries one role per talk (02 §2): `--wf` source or
    condition A (blue), `--bd` source or condition B (amber), `--sp` space, context or setting (cyan), `--ai`
    method, model or instrument (purple), `--ok` yes or agreement (green), `--no` no or error (red). A semantic
    colour on anything else tells the audience it belongs to that role.
    **Do:** give non-semantic emphasis `--tx` or `--acc`. Never colour a word with the opposite of what the
    slide says about it.
    *Reference deck* (`--wf` = my list, `--bd` = the state list): the archive cutoff line is `--no`, though it
    is not an error; ZIP digits in the search bar are `--bd`, though they are not the state list; on slide 12
    "Included" is green although the slide marks it as an error (only the red notes say so).
22. **Citation position varies.**
    **Do:** put `.cite` directly after the clause it supports, before the full stop.
    *Reference deck:* after the full stop on slide 13, before it on slide 16.
23. **Content in a filled box.** The rule stands: never present content in a card. Filled shapes are for data
    marks, mock-ups of a real interface such as a web page (02 §8), and interactive controls (02 §9).
    **Do:** carry a note with type, whitespace, a hairline or a left rule (02 §8). The formula pin serves one
    job through `Deck_pin` (05 §5); never borrow its pill for other content.
    *Reference deck:* filled boxes are `.page` mock web pages, `.fx-pin`, `.dx-c` and `.km-c` cells, `.mx`
    cells and pills (data cells, mock-ups and controls), and the `.frame-box` note on S7, which is a card and
    is not to be copied.

## Content checks against the rules in 01

24. **Every content slide has a source line** (`.src`, bottom left): the source (section, table, figure,
    dataset or paper) and what the drawing is ("Diagram schematic", "Areas proportional to counts"). Inline
    citations and captions do not replace it. Title, plan, recap and thank-you slides need none (01 §7).
    *Reference deck:* slides 4 and 5 cite inline or in captions; slide 7 (a definition), S3 (a model
    instruction) and S13 (an interactive demo) have neither.
25. **Every study cited in the notes is on the slide**, in `.cite` next to the sentence it supports (01 §7).
    *Reference deck:* slide 20's notes cite Huang 2025 and Deitz 2025, which are not on the slide.
26. **Every slide has one key cue**: exactly one `notes-kw` cue marked `data-key`, shown gold in the presenter
    (06 §6).
    *Reference deck:* S24's five keyword cues carry no `data-key`.
27. **Every finding slide names a comparable study where one exists**, on the same slide, next to the point it
    supports (01 §5).
    *Reference deck:* slides 15 and 18 have none on screen.
28. **Every percentage has its formula.** A rate's first appearance is written out with `Deck_afx`; a later
    slide that reports it as a percentage carries `Deck_pin`; a rate stated as a fraction needs no pin. A
    fraction followed by a percentage needs a pin or a formula, or drops the percentage (01 §4, 05 §5).
    *Reference deck:* talk slides 19 and 20 state rates as fractions with no pin, which is correct; slide 16
    states recall as "161/168 … (96%)" with no `Deck_pin` or `Deck_afx`, the one live case that breaks the
    rule. Disagreement has no `Deck_afx` on the talk.
