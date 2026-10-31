# 04 · Motion and builds

Motion in this deck does one job: it reveals the argument one claim per click, in reading order, and
moves the eye to the element that just changed. No motion is decorative except the slow photo zoom and the blinking search-box caret on Act I.

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
| .7 s | build fade (`opacity`), map tract fill change, row reveal |
| .8 s | slide entrance (`sIn`), map outline opacity |
| .85 s | build slide-in (`transform`) |
| .9 s | element entrance (`eIn`), line draw |
| 1.0–1.4 s | hook map card appears (1 s opacity / 1.4 s scale), lens move (1.1 s spring), supplement bar growth (1.3 s), rail count-up (1.3 s; `data-count` defaults to 1.5 s but no slide uses it) |
| 1.8 s | hook map viewBox zoom from the region to the tract |
| 1.2 s | background glow colour change, photo fade on the hook |
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
that no attribute declares. Step 0 is the slide as it first appears. Rules of thumb from the deck:

- One click = one claim. A slide has 0–4 builds on the talk (the chain slide has 9: it walks the five
  stations in six clicks, because "List of places" and "Distance test" take two each, then adds three
  summary rows).
- Pair related items with `data-d`: two answers appear on the same click, the second 180 ms later
  (`data-d="2"`), so the eye reads them in order.
- The "So:" conclusion arrives with the number it explains. On slide 13 it is the last build; on slides 15
  and 18 one "So:" line is on screen from step 0 and the demo rewrites it at each click; on slides 16 and 19
  each column or list item carries its own.
- Exits (`data-x`) make room in place: on the chain slide each station's picture leaves as the next arrives,
  in the same box, so nothing reflows.
- Absolute positioning for anything that swaps in place (`.ch-g` scenes, `.ch-map` rows, `.eu-bldg`), so later builds
  never shift earlier text.

## 5. Step-driven CSS

The engine writes the current step to `section[data-step]`. Keyframe animations that must replay on a
given click key off it:

```css
.slide.active[data-step="1"] .g1-rec  { animation: ch-in .9s var(--ease) .35s both; }   /* slide in from x −60 */
.slide.active[data-step="2"] .g1-q b  { animation: ch-pulse 1.6s var(--ease) .6s 2; }   /* scale 1.18 twice */
.slide.active[data-step="3"] .gc-pin  { animation: gc-drop .8s cubic-bezier(.3,1.5,.5,1) .3s both; } /* pin drops 70 px */
.slide.active[data-step="3"] .gc-off  { stroke-dasharray: 100; animation: ln-draw 1s var(--ease) 1.1s both; }
.slide.active[data-step="3"] .gc-lab  { animation: gc-fade .6s var(--ease) 1.9s both; }
```

Sequencing inside one click is done with delays: the object arrives (0.3 s), then the line that measures
it draws (1.1 s), then its label fades in (1.9 s). Lines that draw carry `pathLength="100"` so
`stroke-dasharray: 100` + `ln-draw` (dashoffset 100 → 0) works for any length. SVG elements that animate
with transforms need `transform-box: fill-box`.

## 6. Titles that follow the build: `.tswap`

When a click changes what the slide claims, the title changes with it instead of adding a second headline:

```html
<h2 class="title e tswap">
  <span data-t="0" class="cur">Before the model, nearly all are found, but only <em>1/10</em> of candidates match.</span>
  <span data-t="1">My list finds <em>9/10</em> of the state list, but only <em>4/10</em> of my listings match.</span>
</h2>
```

```css
.tswap { display: grid; }  .tswap > span { grid-area: 1 / 1; transition: opacity .45s var(--ease); }
.tswap > span:not(.cur) { opacity: 0; pointer-events: none; }
```

All variants share one grid cell, so the box is as tall as the longest variant and nothing below moves.
The demo's `step()` sets `.cur` on the span whose `data-t` matches the step (or the selected button).
The same pattern swaps the lead line under the title (`p.frame-line.tswap`).

## 7. Numbers that count

`<span class="num" data-count="2062" data-from="0" data-dec="0" data-dur="1500" data-sep="1">` counts up
with `easeOut` when it becomes visible (also inside a `data-s` parent) and resets when hidden, so stepping
back and forward replays it. Use for the one headline number of a slide, not for every figure. Rail
results count up over 1.3 s when their station turns "done".

## 8. The rail lens (spring)

On anchor slides a glass lens slides to the current station:

```css
.lens { position: absolute; top: 22px; height: 84px; --r: 42px;
        transition: left 1.1s var(--spring), width 1.1s var(--spring), opacity .6s; }
```

Its label reads "done" or "next" in the station colour. The rail fill (2 px, gradient
`--wf → --bd 70% → --sp`) grows to the newest done station over 1.2 s; dots fill (.6 s) with an 8 px halo
at 18 % of the station colour; the result number fades up 14 px (.7/.8 s).

## 9. Demo motion (JS)

Only three motions in the whole deck are JS tweens. Everything else is a CSS transition on a class or an
inline style that a demo sets, except two timer-driven sequences: the Act I search typing
(`v2-demos-1.js`, started in `enter()`) and the staggered reveals of the supplement assignment matrix
(`assign3`, `setTimeout` at 150 + k × 550 ms). Prefer tweens or CSS transitions; timers need a run token
and a static-mode branch.

| Motion | How | Duration |
|---|---|---|
| hook map zooms from the region to the tract (viewBox) | `tween(1800, …, easeInOut)` (`v2-demos-0.js:44`) | 1.8 s |
| Venn circles re-place when the counts change | `tween(1300, …)` (`v2-demos-2.js:263`) | 1.3 s |
| rail result counts up | `tween(1300, …)` (`v2-common.js:151`) | 1.3 s |
| hook map card appears (`.t-hook.mapon`) | CSS opacity / transform scale .96 → 1 | 1 s / 1.4 s |
| photo fades out under the hook map | CSS opacity | 1.2 s |
| tract fill changes (threshold, shading switch) | CSS `transition: fill .7s var(--ease)` on `.map path.tr` | .7 s |
| frame outlines appear | CSS opacity on `.target`, `.supply` | .8 s |
| dots recolour (`.sx-dots i`) | CSS background, box-shadow, opacity | .7 s |
| bars grow (`.rf-bar`, S4) | CSS keyframe `barIn` scaleX 0 → 1, `transform-origin: left`, replayed on every entry | 1.3 s |
| distance and geocoding lines draw | CSS `ln-draw` keyframe on `pathLength="100"` | .9–1 s |

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

## 11. What the deck does not do

No bounce or elastic easing outside the lens and the geocoding pin; no rotation; no 3D flips; no typewriter
text except the Act I search box, which types its four queries letter by letter (40 ms a character,
2.2 s pause, looping) beside a blinking caret, the only blinking element; no auto-advancing; no motion that
runs while the speaker talks except the photo zoom and that search box; no sound.
