# 08 · Known quirks in the live deck (do not copy them)

Found while auditing every slide on 2026-10-30. They are harmless in the defense setting (ink theme, Chromium,
1920×1080), but a new slide should not repeat them. Change the live deck in `docs/defense` only when the user asks;
copies already sent to reviewers are frozen.

## Rendering

1. **Font subsets and weights.** Bundled ranges: Inter 400–700, Inter Tight 500–700, JetBrains Mono 400–600.
   Weights 750 render as 700; mono 650/700 render as 600. The latin subsets lack `→` and `↩` in Inter and `≥` in
   STIX Two Text; those fall back to system fonts. Use 700 at most and check new symbols in a render.
2. **Hard-coded white breaks the paper theme**: closing-map tracts (`rgba(255,255,255,.03)`), hook-map tracts (`rgba(255,255,255,.04)` fill, `.16` stroke),
   area-map tracts and background, `.gridsvg .cell` stroke, the Cub dot's white stroke, `#fff` outlines on the
   opening tract, the ruler's centre dot and marker crosses, the title eyebrow `--acc:#fff`, the range-slider
   thumb, `.sp-credit`. Use tokens (`--tx`, `--line2`, `--fill`) instead.
3. **SVG `fill` attributes lose to CSS rules** (`.rl`): the hook's "1 mile" label renders `--sp` and the
   ruler's "½ mile" label renders `--tx3`, opposite to their attributes. Set label colours in CSS only.
4. **No `prefers-reduced-motion` handling**; the Ken Burns zoom, the blinking caret and the looping typewriter
   always run. A new looping animation should stop in `leave()` and respect `Deck.static`.

## Cascade

5. **`.fr-list span` overrides `.cite`** (specificity), so citations inside numbered lists render at full size in
   `--tx2` (slide 19, S23). Give citations in lists their own rule (`.fr-list .cite { font-size: .82em; color: var(--tx3) }`).
6. **`.steps > div` turns a `.legend` placed inside `.steps` into a numbered grid row** (slide 9 shows an extra "04").
   Keep legends outside numbered lists.
7. **`.sx` collides**: `v2-act3.css` styles `.sx` globally, so `data-scrim="sx"` gives the photo layer a 1 px top
   border and a dot. Scope generic class names to a slide (`.st4 .sx`).
8. **Margin conflicts by load order**: `.quote { margin: 0 }` cancels `.mt-m`; `.cub-note` beats `.tail`;
   `.ans` overrides `.body`'s margin-top. Put spacing on a wrapper, not on an element with its own margin rule.
9. **Inline `opacity` on an `.e` element has no effect** (the `eIn` fill holds opacity at 1).

## Layout

10. **Content below y 948**: slide 3's side column (to y 997), slide 6's table (993), slide 8's tract row (1040),
    and slide 17's ruler (640 px in a 589 px body). Size new bodies to the space under the title.
11. **`.afx-name` overflows** a 150 px column on slide 15 ("Matched (precision)" is 256 px wide). Let the name
    column size to content.
12. **`.track-ex` cells do not align with rail stations** (260 px label column + 5 columns). The chain's
    `.cm-row` does align; copy that.
13. **`.hb-map` has no `position`**; its legend is positioned only because the entrance animation leaves a
    transform. Give every map box `position: relative`.
14. **The two summaries on slide 16 are not level** when one "So:" line wraps to two lines. Keep paired
    "So:" lines the same length or align by grid rows.
15. **Legend swatch ≠ map fill** on slide 18 ("neither list" swatch `--fill2`, tracts `--fill`) and slide 9 (county
    swatch dotted `--tx2`, line dashed `--tx3`). Swatches must use the same token and dash as the map.

## Behaviour

16. **Links that pop**: on S6 the JS sets opacity on the `<g>` while the CSS transition is on its children; the
    ruler markers have no transition. Put the transition on the element whose property changes.
17. **`theme()` hooks that redraw the final state** (S14 histogram draws step 2 on any theme toggle). A theme
    hook must redraw the current step.
18. **`data-title` is a lookup key** for `qa-cheat.js`; renaming a slide breaks its cheat-sheet chips.
19. **Supplement back chips inherit**: pages with no talk link return to the talk slide of the previous linked
    page. Reordering links changes where "Back" goes.
20. **Dead code** left from earlier rounds (`.ch-u/.ch-t/.ch-brk/.ch-open/.ch-sum/.ch-b/.ch-q`, `.rm-big`, `.rm-split`,
    `.miss/.mg`, demos `srcs`, `audit`, `judge`, `checks`, `rq1`, `kw`, `assign2`, `recur2`, `scat`, `sens3`, `quart2` and their CSS, unused data arrays). CSS comments
    still use pre-restructure slide numbers. Do not rely on comments for slide numbers; use `data-title`.

## Semantics

21. **Colour used outside its meaning**: the archive cutoff line is `--no` (it is not an error); ZIP digits in the
    search bar are `--bd` (they are not the state list); on slide 12 "Included" is green although the slide
    marks it as an error (only the red notes say so). In new slides, give non-semantic emphasis `--tx` or
    `--acc`, not a semantic colour.
22. **Citation position varies** (after the full stop on slide 13, before it on slide 16). Put `.cite` directly
    after the clause it supports, before the full stop.
23. **Filled boxes exist** (`.page` mock web pages, `.frame-box`, `.fx-pin`, `.dx-c` and `.km-c` cells, `.mx` cells,
    pills). They are data cells, mock-ups and controls. The user's rule stands: never present content in a card.

## Content gaps against the rules in 01

24. **Slides without a source line**: content slides 4 (why pharmacies; cites inline), 5 (the chain; cites in
    captions), 7 (inclusion definition), S3 (model instruction) and S13 (try the pair score). Title, plan,
    recap and thank-you slides need none.
25. **A study cited only in the notes**: slide 20's notes cite Huang 2025 and Deitz 2025, which are not on the
    slide.
26. **No gold takeaway on S24**: its five keyword cues carry no `data-key`.
27. **Finding slides without a comparable study on screen**: slides 15 and 18.
28. **Rates without a corner formula**: talk slides 19 and 20 state rates as fractions with no `Deck_pin`, which
    is fine; slide 16 states recall as "161/168 … (96%)", a percentage with no `Deck_pin` or `Deck_afx`, the one
    live case that needs a pin or should drop the percentage. Disagreement has no `Deck_afx` on the talk.
