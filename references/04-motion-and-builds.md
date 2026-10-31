# 04 · Motion and builds

Motion does one job: it reveals the argument one claim per click, in reading order, and moves the eye to
the element that just changed. Two ambient motions are the only decoration: the slow photo zoom (18 s Ken
Burns) and the blinking caret of a typing search bar, when a talk has one (§11). The timings below hold for
any subject.

File and line references (`engine.js`, `v2-common.js`, `v2-demos-*.js`) point to the reference
implementation in the reference deck folder (`docs/defense/js/`). Slide numbers, slide IDs and slide-specific
class names marked "reference deck" belong to that deck (a geography thesis) and serve as worked examples.

## 1. Easing and duration tokens

```css
--ease:    cubic-bezier(.22, .9, .24, 1);   /* fast start, long soft landing: almost everything */
--ease-io: cubic-bezier(.65, 0, .35, 1);    /* symmetric: slide exit only */
--spring:  cubic-bezier(.34, 1.4, .64, 1);  /* overshoot: the rail lens only */
```

JS tweens (`Deck.util.tween(ms, fn, ease)`) use `easeOut = 1 − (1 − t)³` by default, `easeInOut` (cubic)
when a shape moves both ways.

| Duration | Used for |
|---|---|
| .2–.3 s | hover colour, glass button state, toast, presenter keyword fade |
| .45 s | `.tswap` title cross-fade |
| .5 s | slide exit (`sOut`), station name and "how" colour change |
| .6 s | rail dot fill, progress bar, `.st-dot`, dot colour |
| .7 s | build fade (`opacity`), figure fill change (reference deck: map area fill), row reveal |
| .8 s | slide entrance (`sIn`), overlay outline opacity (reference deck: study-frame outlines on the map) |
| .85 s | build slide-in (`transform`) |
| .9 s | element entrance (`eIn`), line draw |
| 1.0–1.4 s | opening-figure card appears (1 s opacity / 1.4 s scale), lens move (1.1 s spring), bar growth (1.3 s), rail count-up (1.3 s); `data-count` defaults to 1.5 s, and the reference deck has no `data-count` element |
| 1.2 s | background glow colour change, photo fade on the opening slide |
| 1.8 s | opening-figure zoom (SVG `viewBox`) from the whole to one detail |
| 18 s | Ken Burns on photos |

## 2. Slide transitions

```css
.slide.active  { animation: sIn  .8s var(--ease)    both; }   /* from opacity 0, y +24px, scale .985 */
.slide.leaving { animation: sOut .5s var(--ease-io) both; }   /* to   opacity 0, y −18px, scale 1.01 */
#stage[data-dir="back"] … sInB (from y −24px) / sOutB (to y +18px)
```

Going back mirrors the direction, so the deck feels like a vertical stack. The leaving slide keeps
`display:flex` for 470 ms, then is hidden. There are no wipes, flips or zooms between slides.

## 3. Entrance stagger: `.e`

Every element with class `e` animates in when its slide becomes active:

```css
.slide.active .e { animation: eIn .9s var(--ease) both; animation-delay: calc(var(--i, 0) * 70ms + 160ms); }
@keyframes eIn { from { opacity: 0; transform: translate3d(0, 22px, 0); } to { opacity: 1; transform: none; } }
```

The engine numbers `.e` elements in DOM order (`--i` = 0, 1, 2 …) unless `style="--i:n"` is set. Put `e` on
the 3–6 top-level blocks of a slide in reading order: eyebrow, title, lead, body (and the `.conv` line). The
`.src` source line stays outside the cascade and appears with the slide. The result is a 70 ms cascade that
finishes in about 1.2–1.4 s for 3–6 blocks (160 ms + (n − 1) × 70 ms + 900 ms).

## 4. Builds (click steps)

Attributes on any element inside a slide:

| Attribute | Effect at step ≥ n | CSS |
|---|---|---|
| `data-s="n"` | appears: gets `.on` | hidden = `opacity 0; translate3d(0,22px,0); pointer-events none` |
| `data-x="n"` | disappears: gets `.off` | `opacity 0 !important` |
| `data-dim="n"` | dims: gets `.dim` | `opacity .25 !important` |
| `data-lit="n"` | gets `.lit` (style it per slide) | — |
| `data-a="fade\|left\|right\|scale"` | entrance variant for `data-s` | none / x −40 / x +40 / scale .94 |
| `data-d="k"` | delays this build by k × 90 ms | `transition-delay: calc(var(--d) * 90ms)` |

```css
[data-s], [data-x], [data-dim] { transition: opacity .7s var(--ease), transform .85s var(--ease), filter .7s var(--ease); }
svg [data-s]:not(.on) { transform: none; }               /* SVG children only fade */
.slide.active .e[data-s]:not(.on) { animation: none; }  /* an .e that is also a build waits for its step */
```

The number of steps is the largest n found, or `data-steps` on the `<section>` when a demo drives steps
that no attribute declares. Step 0 is the slide as it first appears. Rules:

- One click = one claim. A slide has 0–4 builds on the talk. The one exception is a step-by-step walk
  through a process (03 §6): one click per step, two where a step carries a second claim, then its summary
  rows (03 §7). Example (reference deck): the chain slide has 9 builds; it walks its five stations in six
  clicks, because two stations ("List of places", "Distance test") take two clicks each, then adds three
  summary rows.
- Pair related items with `data-d`: two answers appear on the same click, the second 180 ms later
  (`data-d="2"`), so the eye reads them in order.
- The "So:" conclusion arrives with the number it explains. Three placements work: the last build; one
  "So:" line on screen from step 0 that the demo rewrites at each click; or one "So:" per column or list
  item. Reference deck: slide 13 uses the first, slides 15 and 18 the second, slides 16 and 19 the third.
- Exits (`data-x`) make room in place: in a step-by-step walk, each step's picture leaves as the next
  arrives, in the same box, so nothing reflows (reference deck: the chain slide's station pictures).
- Absolute positioning for anything that swaps in place, so later builds never shift earlier text
  (reference deck: `.ch-g` scenes, `.ch-map` rows, `.eu-bldg`).

## 5. Step-driven CSS

The engine writes the current step to `section[data-step]`. Keyframe animations that must replay on a
given click key off it. Example (reference deck, a geography thesis: two scenes on the chain slide, where a
store record slides in and its question mark pulses, then a map pin drops, its offset line draws and the
distance label fades in):

```css
.slide.active[data-step="1"] .g1-rec  { animation: ch-in .9s var(--ease) .35s both; }   /* slide in from x −60 */
.slide.active[data-step="2"] .g1-q b  { animation: ch-pulse 1.6s var(--ease) .6s 2; }   /* scale 1.18 twice */
.slide.active[data-step="3"] .gc-pin  { animation: gc-drop .8s cubic-bezier(.3,1.5,.5,1) .3s both; } /* pin drops 70 px */
.slide.active[data-step="3"] .gc-off  { stroke-dasharray: 100; animation: ln-draw 1s var(--ease) 1.1s both; }
.slide.active[data-step="3"] .gc-lab  { animation: gc-fade .6s var(--ease) 1.9s both; }
```

Sequencing inside one click is done with delays, in three beats: the object arrives (0.3 s), then the line
that measures it draws (1.1 s), then its label fades in (1.9 s). The same beats fit any "object, measure,
label" sequence: a data point, its residual, the value; a specimen image, its scale line, the length; a
node in a diagram, its connector, the weight (reference deck: a map pin, its offset line, the distance).
Lines that draw carry `pathLength="100"` so `stroke-dasharray: 100` + `ln-draw` (dashoffset 100 → 0) works
for any length. SVG elements that animate with transforms need `transform-box: fill-box`.

## 6. Titles that follow the build: `.tswap`

When a click changes what the slide claims, the title changes with it instead of adding a second headline:

```html
<h2 class="title e tswap">
  <span data-t="0" class="cur">[Claim at step 0, with its share as <em>a/b</em>.]</span>
  <span data-t="1">[Claim at step 1, with the share that replaces it, <em>c/d</em>.]</span>
</h2>
```

```css
.tswap { display: grid; }  .tswap > span { grid-area: 1 / 1; transition: opacity .45s var(--ease); }
.tswap > span:not(.cur) { opacity: 0; pointer-events: none; }
```

- Example (reference deck, a geography thesis): step 0 "Before the model, nearly all are found, but only
  *1/10* of candidates match." Step 1 "My list finds *9/10* of the state list, but only *4/10* of my
  listings match."
- Example (illustrative, an education study): step 0 "Without tutoring, *4/10* students pass the second
  course." Step 1 "With tutoring, *7/10* pass."

All variants share one grid cell, so the box is as tall as the longest variant and nothing below moves.
The demo's `step()` sets `.cur` on the span whose `data-t` matches the step (or the selected button).
The same pattern swaps the lead line under the title (`p.frame-line.tswap`).

## 7. Numbers that count

```html
<span class="num" data-count="N" data-from="0" data-dec="0" data-dur="1500" data-sep="1">0</span>
```

`data-count` is the target (`N` is a placeholder), `data-from` the start, `data-dec` the decimals,
`data-dur` the duration in ms (default 1500), `data-sep` the thousands separator (on unless `data-sep="0"`).
The number counts up with `easeOut` when it becomes visible (also inside a `data-s` parent) and resets when
hidden, so stepping back and forward replays it. Use it for the one headline number of a slide, not for
every figure. Rail results count up over 1.3 s when their
station turns "done" (`v2-common.js:151`); the reference deck uses only this rail count-up.

## 8. The rail lens (spring)

On anchor slides a glass lens slides to the current station. The stations are the steps of whatever
process the talk follows (03 §5; reference deck: five workflow steps).

```css
.lens { position: absolute; top: 22px; height: 84px; --r: 42px;
        transition: left 1.1s var(--spring), width 1.1s var(--spring), opacity .6s; }
```

Its label reads "done" or "next" in the station colour. The rail fill (2 px, gradient
`--wf → --bd 70% → --sp`) grows to the newest done station over 1.2 s; dots fill (.6 s) with an 8 px halo
at 18 % of the station colour; the result number fades up 14 px (.7/.8 s).

## 9. Demo motion (JS)

Use a JS tween only for motion CSS cannot express from a class: an SVG `viewBox` zoom, shapes re-placed
from computed numbers, a count-up. The reference deck has three. Everything else is a CSS transition on a
class or an inline style that a demo sets, except two timer-driven patterns: a typing search bar
(reference deck: the Act I search, `v2-demos-1.js`, started in `enter()`) and staggered cell reveals in a
matrix (reference deck: the supplement assignment matrix, `assign3`, `setTimeout` at 150 + k × 550 ms).
Prefer tweens or CSS transitions; timers need a run token and a static-mode branch.

| Motion | How (reference implementation) | Duration |
|---|---|---|
| opening figure zooms from the whole to one detail (SVG `viewBox`); reference deck: the hook map, region to one tract | `tween(1800, …, easeInOut)` (`v2-demos-0.js:44`) | 1.8 s |
| overlap circles (Venn) re-place when the counts change | `tween(1300, …, easeInOut)` (`v2-demos-2.js:263`) | 1.3 s |
| rail result counts up | `tween(1300, …)` (`v2-common.js:151`) | 1.3 s |
| opening-figure card appears (reference deck: `.t-hook.mapon`) | CSS opacity / transform scale .96 → 1 | 1 s / 1.4 s |
| photo fades out under the opening figure | CSS opacity | 1.2 s |
| area or cell fill changes (threshold, shading switch); reference deck: map tracts | CSS `transition: fill .7s var(--ease)` on `.map path.tr` | .7 s |
| overlay outlines appear (reference deck: study-frame outlines) | CSS opacity on `.target`, `.supply` | .8 s |
| dots recolour (reference deck: `.sx-dots i`) | CSS background, box-shadow, opacity | .7 s |
| bars grow (reference deck: `.rf-bar`, supplement slide S4) | CSS keyframe `barIn` scaleX 0 → 1, `transform-origin: left`, replayed on every entry | 1.3 s |
| measuring lines draw (reference deck: distance and geocoding lines) | CSS `ln-draw` keyframe on `pathLength="100"` | .9–1 s |

The same motions carry figures from any field: the `viewBox` zoom takes a whole plot to one region, a
timeline to one year, a diagram to one component; the fill transition recolours heat-map cells as well as
map areas; the line draw serves any distance, residual or connector.

Demos must respect `Deck.static` (see §10): `tween()` already jumps to the end state.

## 10. Static mode, reduced motion, rendering

`?static=1` sets `html.static`, which zeroes every animation and transition duration and delay, and makes
`tween()` call its callback once with `p = 1`. A slide in static mode shows the final state of its current
step. This is how slides are rendered to PNG/PDF (see 06-engine-and-tooling §8). Any new animation must:

1. reach a correct final frame when durations are 0 (use `animation-fill-mode: both`);
2. not depend on `setTimeout` chains that static mode cannot skip; if a demo uses timers, check
   `Deck.static` and draw the end state directly;
3. look right on the first frame after `go()` (the engine applies step −1 silently, then reveals the real
   step two animation frames later, so entrances always play).

## 11. What the system does not do

No bounce or elastic easing outside the lens (`--spring`) and one marker drop (reference deck: the
geocoding pin, `cubic-bezier(.3,1.5,.5,1)`); no rotation; no 3D flips; no typewriter text except one typing
search bar, which types its queries letter by letter (40 ms a character, 2.2 s pause, looping) beside a
blinking caret, the only blinking element (reference deck: the Act I search box, four queries); no
auto-advancing; no motion that runs while the speaker talks except the photo zoom and that search bar; no
sound.
