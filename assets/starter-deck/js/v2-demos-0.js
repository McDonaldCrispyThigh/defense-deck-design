/* v2 demos · the sample talk. Every figure is drawn from window.SAMPLE (js/sampledata.js) or
   window.MAPDATA (js/mapdata.js); colours come from CSS variables, so the theme switch needs no redraw. */
(function () {
  const { $, $$, svg, tween, mulberry32 } = Deck.util;
  const D = () => window.SAMPLE;
  const txt = (parent, attrs, s) => { const e = svg('text', attrs, parent); e.textContent = s; return e; };

  /* ---------- hook: one night, two instruments (slide 2) ---------- */
  Deck.demo('night', {
    init(s) {
      const N = D().night, root = $('.nt-svg', s);
      const X0 = 170, X1 = 860, x = (m) => X0 + ((X1 - X0) * m) / N.minutes;
      const rows = [{ key: 'lab', name: 'Lab test', c: 'var(--bd)', y: 140 }, { key: 'phone', name: 'Phone app', c: 'var(--wf)', y: 280 }];
      // legend
      const lg = svg('g', { class: 'nt-lg' }, root);
      svg('rect', { x: X0, y: 34, width: 17, height: 16, rx: 3, fill: 'var(--bd)', class: 'nt-on' }, lg); // swatches match the bars
      svg('rect', { x: X0 + 17, y: 34, width: 17, height: 16, rx: 3, fill: 'var(--wf)', class: 'nt-on' }, lg);
      txt(lg, { x: X0 + 44, y: 48 }, 'Asleep');
      svg('rect', { x: X0 + 150, y: 34, width: 34, height: 16, rx: 3, class: 'nt-track' }, lg);
      txt(lg, { x: X0 + 194, y: 48 }, 'Awake');
      const lm = svg('g', { class: 'nt-miss-lg' }, lg);
      svg('rect', { x: X0 + 300, y: 34, width: 34, height: 16, rx: 3, class: 'nt-miss' }, lm);
      txt(lm, { x: X0 + 344, y: 48 }, 'Wake the phone missed');
      // rows
      rows.forEach((r) => {
        txt(root, { x: X0 - 24, y: r.y + 46, class: 'nt-name', 'text-anchor': 'end', fill: r.c }, r.name);
        svg('rect', { x: X0, y: r.y, width: X1 - X0, height: 70, rx: 8, class: 'nt-track' }, root);
        N[r.key].forEach(([a, b]) => svg('rect', { x: x(a), y: r.y, width: x(b) - x(a), height: 70, rx: 6, fill: r.c, class: 'nt-on' }, root));
      });
      // wake the phone missed: lab awake while the phone says asleep
      const awake = (iv, m) => !iv.some(([a, b]) => m >= a && m < b);
      let start = null;
      for (let m = 0; m <= N.minutes; m++) {
        const miss = m < N.minutes && awake(N.lab, m) && !awake(N.phone, m) && m > N.lab[0][0] && m < N.lab[N.lab.length - 1][1];
        if (miss && start === null) start = m;
        if (!miss && start !== null) { svg('rect', { x: x(start), y: 126, width: x(m) - x(start), height: 238, rx: 6, class: 'nt-miss nt-mk' }, root); start = null; }
      }
      // axis: one tick per hour, title with unit
      const ax = svg('g', { class: 'nt-ax' }, root);
      svg('line', { x1: X0, x2: X1, y1: 392, y2: 392 }, ax);
      const h0 = +N.start.split(':')[0];
      for (let m = 0; m <= N.minutes; m += 60) {
        svg('line', { x1: x(m), x2: x(m), y1: 392, y2: 402 }, ax);
        txt(ax, { x: x(m), y: 430, 'text-anchor': 'middle' }, `${String((h0 + m / 60) % 24).padStart(2, '0')}:00`);
      }
      txt(root, { x: (X0 + X1) / 2, y: 478, 'text-anchor': 'middle', class: 'nt-axt' }, 'Clock time (hours and minutes), night 3');
    },
    step(s, n) {
      s.classList.toggle('mapon', n >= 1);
      s.classList.toggle('nt-missed', n >= 3);
    },
  });

  /* ---------- method schematic: signal, epochs, labels, sum (slide 4; not to scale) ---------- */
  Deck.demo('epochs', {
    init(s) {
      const root = $('.ep-svg', s), X0 = 40, X1 = 780, n = 12, w = (X1 - X0) / n, awake = new Set([0, 5, 6]);
      const rnd = mulberry32(3);
      let d = '';
      for (let i = 0; i <= 240; i++) {
        const xx = X0 + ((X1 - X0) * i) / 240, e = Math.min(n - 1, Math.floor((xx - X0) / w)), a = awake.has(e) ? 34 : 7;
        d += (i ? 'L' : 'M') + xx.toFixed(1) + ' ' + (150 + a * Math.sin(i * 1.7) * (0.4 + 0.6 * rnd())).toFixed(1);
      }
      const layer = (k) => svg('g', { class: 'ep-l', 'data-k': k }, root);
      const l0 = layer(0);
      txt(l0, { x: X0, y: 44, class: 'ep-cap', fill: 'var(--wf)' }, 'Motion and sound, recorded by the phone');
      svg('path', { d, class: 'ep-trace' }, l0);
      const l1 = layer(1);
      for (let e = 0; e <= n; e++) svg('line', { x1: X0 + e * w, x2: X0 + e * w, y1: 96, y2: 330, class: 'ep-grid' }, l1);
      svg('path', { d: `M${X0} 92v-8h${w}v8`, class: 'ep-br' }, l1);
      txt(l1, { x: X0 + w / 2, y: 76, 'text-anchor': 'middle', class: 'ep-cap2' }, '30 s');
      const l2 = layer(2);
      txt(l2, { x: X0, y: 262, class: 'ep-cap', fill: 'var(--ai)' }, 'Asleep or awake, labelled by a model');
      for (let e = 0; e < n; e++) svg('rect', { x: X0 + e * w + 4, y: 280, width: w - 8, height: 46, rx: 6, class: awake.has(e) ? 'ep-aw' : 'ep-as' }, l2);
      const l3 = layer(3);
      txt(l3, { x: X0, y: 410, class: 'ep-sum' }, `${n - awake.size} asleep epochs × 30 s = ${((n - awake.size) * 0.5).toFixed(1)} minutes asleep`);
      txt(l3, { x: X0, y: 450, class: 'ep-cap2' }, 'Over a whole night: 960 epochs, 23:00 to 07:00');
    },
    step(s, n) { $$('.ep-l', s).forEach((g) => { g.style.opacity = n >= +g.dataset.k ? 1 : 0; }); },
  });

  /* ---------- RQ2: phone against lab, one dot per night ---------- */
  Deck.demo('agree', {
    init(s) {
      const S = D(), root = $('.sc2-svg', s);
      const lo = 3.5, hi = 9.5, PX0 = 130, PX1 = 670, PY0 = 590, PY1 = 50;
      const x = (h) => PX0 + ((PX1 - PX0) * (h - lo)) / (hi - lo), y = (h) => PY0 - ((PY0 - PY1) * (h - lo)) / (hi - lo);
      const band = S.agree / 60;
      const clip = svg('clipPath', { id: 'sc2-clip' }, svg('defs', {}, root));
      svg('rect', { x: PX0, y: PY1, width: PX1 - PX0, height: PY0 - PY1 }, clip);
      const plot = svg('g', { 'clip-path': 'url(#sc2-clip)' }, root);
      for (let h = 4; h <= 9; h++) {
        svg('line', { x1: x(h), x2: x(h), y1: PY1, y2: PY0, class: 'sc2-grid' }, plot);
        svg('line', { x1: PX0, x2: PX1, y1: y(h), y2: y(h), class: 'sc2-grid' }, plot);
      }
      svg('polygon', { points: `${x(lo)},${y(lo + band)} ${x(hi)},${y(hi + band)} ${x(hi)},${y(hi - band)} ${x(lo)},${y(lo - band)}`, class: 'sc2-band' }, plot);
      svg('line', { x1: x(lo), y1: y(lo), x2: x(hi), y2: y(hi), class: 'sc2-one' }, plot);
      S.nights.forEach((r) => {
        const ok = Math.abs(r.phone - r.lab) <= S.agree;
        svg('circle', { cx: x(r.lab / 60), cy: y(r.phone / 60), r: 7, class: 'sc2-pt ' + (ok ? 'ok' : 'no') }, plot);
      });
      // axes, ticks, titles with units
      const ax = svg('g', { class: 'sc2-ax' }, root);
      svg('path', { d: `M${PX0} ${PY1}V${PY0}H${PX1}` }, ax);
      for (let h = 4; h <= 9; h++) {
        txt(ax, { x: x(h), y: PY0 + 30, 'text-anchor': 'middle' }, h);
        txt(ax, { x: PX0 - 16, y: y(h) + 6, 'text-anchor': 'end' }, h);
      }
      txt(root, { x: (PX0 + PX1) / 2, y: PY0 + 68, 'text-anchor': 'middle', class: 'sc2-axt' }, 'Lab test: total sleep (hours)');
      txt(root, { x: 0, y: 0, 'text-anchor': 'middle', class: 'sc2-axt', transform: `translate(${PX0 - 62} ${(PY0 + PY1) / 2}) rotate(-90)` }, 'Phone app: total sleep (hours)');
      // key, beside the plot
      const k = svg('g', { class: 'sc2-key' }, root), KX = 712;
      const row = (yy, mark, label) => { mark(yy); txt(k, { x: KX + 34, y: yy + 6 }, label); };
      row(70, (yy) => svg('circle', { cx: KX + 10, cy: yy, r: 7, class: 'sc2-pt ok' }, k), 'within 30 min of the lab');
      row(110, (yy) => svg('circle', { cx: KX + 10, cy: yy, r: 7, class: 'sc2-pt no' }, k), 'more than 30 min apart');
      row(150, (yy) => svg('rect', { x: KX, y: yy - 9, width: 22, height: 18, class: 'sc2-band' }, k), 'band: ±30 min');
      row(190, (yy) => svg('line', { x1: KX - 2, x2: KX + 24, y1: yy, y2: yy, class: 'sc2-one' }, k), 'phone equals lab');
      const above = S.nights.filter((r) => r.phone - r.lab > S.agree).length;
      const apart = S.nights.filter((r) => Math.abs(r.phone - r.lab) > S.agree).length;
      txt(root, { x: x(5.7), y: y(4.3), class: 'sc2-note' }, `${above} of ${apart} apart lie above the line`); // empty corner, below the band
    },
    step(s, n) { s.classList.toggle('sc2-hl', n >= 1); },
  });

  /* ---------- RQ3: the 7-hour verdict, by work schedule ---------- */
  const GROUPS = [
    { key: 'shift', name: 'shift-worker', so: '<b>So:</b> on 1/5 of shift-worker nights the verdict depends on the instrument, and the phone undercounts short sleep.' },
    { key: 'day', name: 'day-worker', so: '<b>So:</b> for day workers, the phone and the lab give the same verdict on almost every night.' },
    { key: 'all', name: '', so: '<b>So:</b> pooled over everyone, the shift workers’ nights carry most of the changed verdicts.' },
  ];
  Deck.demo('verdict', {
    init(s) {
      const S = D(), root = $('.vd-svg', s);
      const lo = -60, hi = 90, X0 = 230, X1 = 920, x = (m) => X0 + ((X1 - X0) * (m - lo)) / (hi - lo);
      const rows = [{ key: 'shift', name: 'Shift workers', y: 170 }, { key: 'day', name: 'Day workers', y: 370 }];
      svg('rect', { x: x(-S.agree), y: 60, width: x(S.agree) - x(-S.agree), height: 420, class: 'vd-band' }, root);
      svg('line', { x1: x(0), x2: x(0), y1: 60, y2: 480, class: 'vd-zero' }, root);
      txt(root, { x: x(0), y: 48, 'text-anchor': 'middle', class: 'vd-tl' }, 'phone equals lab');
      const rnd = mulberry32(14);
      s._rows = rows.map((r) => {
        const g = svg('g', { class: 'vd-row' }, root);
        txt(g, { x: 20, y: r.y + 8, class: 'vd-name' }, r.name);
        svg('line', { x1: X0, x2: X1, y1: r.y, y2: r.y, class: 'vd-base' }, g);
        S.nights.filter((d) => (r.key === 'shift') === d.shift).forEach((d) => {
          const only = d.phone >= S.enough && d.lab < S.enough ? ' wo' : d.lab >= S.enough && d.phone < S.enough ? ' bo' : ''; // which instrument alone says 7 h or more
          svg('circle', { cx: x(Math.max(lo, Math.min(hi, d.phone - d.lab))), cy: r.y + (rnd() - 0.5) * 120, r: 8, class: 'vd-pt' + only }, g);
        });
        return { ...r, g };
      });
      const ax = svg('g', { class: 'sc2-ax' }, root);
      svg('line', { x1: X0, x2: X1, y1: 500, y2: 500 }, ax);
      for (let m = lo; m <= hi; m += 30) {
        svg('line', { x1: x(m), x2: x(m), y1: 500, y2: 510 }, ax);
        txt(ax, { x: x(m), y: 536, 'text-anchor': 'middle' }, m > 0 ? '+' + m : m);
      }
      txt(root, { x: (X0 + X1) / 2, y: 578, 'text-anchor': 'middle', class: 'sc2-axt' }, 'Phone minus lab: total sleep (minutes)');
      $$('.vd-ctl button', s).forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); Deck.go(+s.dataset.idx, +b.dataset.t); }));
    },
    step(s, n) {
      const S = D(), G = GROUPS[Math.min(n, 2)];
      const pick = S.nights.filter((d) => G.key === 'all' || (G.key === 'shift') === d.shift);
      const c = { yy: 0, yn: 0, ny: 0, nn: 0 };
      pick.forEach((d) => { c[(d.lab >= S.enough ? 'y' : 'n') + (d.phone >= S.enough ? 'y' : 'n')]++; });
      const flips = c.yn + c.ny;
      s._rows.forEach((r) => r.g.classList.toggle('dim', G.key !== 'all' && r.key !== G.key));
      ['yy', 'yn', 'ny', 'nn'].forEach((k) => { $('.vd-' + k, s).textContent = c[k]; });
      $('.vd-lab', s).textContent = `of ${pick.length} ${G.name ? G.name + ' ' : ''}nights change their 7-hour verdict`;
      $('.vd-so', s).innerHTML = G.so;
      $$('.vd-ctl button', s).forEach((b) => b.classList.toggle('on', +b.dataset.t === Math.min(n, 2)));
      const el = $('.vd-n', s), from = +el.textContent || 0;
      tween(700, (p) => { el.textContent = Math.round(from + (flips - from) * p); });
    },
  });

  /* ---------- S2: where participants were recruited (a fictional city) ---------- */
  Deck.demo('sites', {
    init(s) {
      const root = $('.st-map svg', s);
      const parts = Deck.drawMap(root, { pad: 0 });
      parts.areas.forEach(({ a, p }) => p.classList.add(a.n >= 3 ? 'n3' : a.n >= 1 ? 'n1' : 'n0'));
      const g = svg('g', { class: 'st-clinics' }, root);
      MAPDATA.clinics.forEach((c) => {
        svg('circle', { cx: c.xy[0], cy: c.xy[1], r: 6.5, class: 'st-cl' }, g);
        txt(g, { x: c.xy[0] + 10, y: c.xy[1] - 8, class: 'st-cll' }, c.name);
      });
    },
    step(s, n) {
      s.classList.toggle('st-on', n >= 1);
      Deck.mapFurniture($('.st-map svg', s));
    },
  });
})();
