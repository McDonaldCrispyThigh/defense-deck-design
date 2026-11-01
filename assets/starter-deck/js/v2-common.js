/* v2 · shared pieces: map drawing and furniture, title swaps, and the recurring progress rail */
(function () {
  const { $, $$, svg, tween, fmt } = Deck.util;
  const M = () => window.MAPDATA;

  /* ---------- map helpers ----------
     MAPDATA (js/mapdata.js): { units: 'km' | 'mi', metersPerUnit, box?, water?, areas: [{ id, d, ... }] },
     projected coordinates with north up. */
  function areaBox(pad = 16) {
    if (M().box && !pad) return M().box.slice();
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    M().areas.forEach((a) => {
      const v = a.d.match(/-?\d+(?:\.\d+)?/g);
      for (let i = 0; i < v.length; i += 2) { const x = +v[i], y = +v[i + 1]; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    });
    return [x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad];
  }
  Deck.mapBox = areaBox;
  Deck.drawMap = function (root, o = {}) {
    const D = M();
    root.setAttribute('viewBox', (o.box || areaBox(o.pad === undefined ? 14 : o.pad)).join(' '));
    root.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    const out = {};
    const g = svg('g', {}, root);
    out.areas = D.areas.map((a) => ({ a, p: svg('path', { d: a.d, class: 'tr' }, g) }));
    if (o.water !== false && D.water) out.water = svg('path', { d: D.water, class: 'water' }, root);
    return out;
  };

  /* ---------- map furniture: north arrow and scale bar, sized to the extent on screen ----------
     Map units are metres / MAPDATA.metersPerUnit, north up; the bar is labelled in MAPDATA.units (km or mi).
     Call after the slide is laid out and whenever the viewBox changes; the bar picks a round length near a
     fifth of the view. */
  Deck.mapFurniture = function (root) {
    if (!root._mfObs && window.ResizeObserver) { // redraw once the map has its final size
      root._mfObs = new ResizeObserver(() => Deck.mapFurniture(root));
      root._mfObs.observe(root);
    }
    const vbA = (root.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    const cw = root.clientWidth, ch = root.clientHeight;
    if (vbA.length !== 4 || !cw || !ch) return;
    let g = root.querySelector(':scope > g.mf');
    if (!g) g = svg('g', { class: 'mf' }, root);
    root.appendChild(g); // keep it above everything drawn later
    const [x, y, w, h] = vbA;
    const k = Math.min(cw / w, ch / h); // screen px per map unit (preserveAspectRatio meet)
    const vw = cw / k, vh = ch / k, vx = x - (vw - w) / 2, vy = y - (vh - h) / 2;
    const u = (px) => px / k;
    const km = M().units === 'km';
    const one = (km ? 1000 : 1609.344) / M().metersPerUnit; // map units per km or per mile
    const want = (vw * 0.2) / one;
    const nice = [0.25, 0.5, 1, 2, 5, 10, 20, 50].reduce((a, b) => (Math.abs(Math.log(b / want)) < Math.abs(Math.log(a / want)) ? b : a));
    const L = nice * one, lab = (!km && { 0.25: '¼', 0.5: '½' }[nice]) || String(nice);
    const right = vx + vw - u(44), base = vy + vh - u(40); // clear of the rounded corner
    g.innerHTML = '';
    const bx = right - L, bh = u(7);
    svg('rect', { x: bx, y: base - bh, width: L / 2, height: bh, class: 'mf-a' }, g);
    svg('rect', { x: bx + L / 2, y: base - bh, width: L / 2, height: bh, class: 'mf-b' }, g);
    const t = (tx, ty, txt, anchor, size = 15) => {
      const e = svg('text', { x: tx, y: ty, 'text-anchor': anchor, 'font-size': u(size), 'stroke-width': u(5) }, g);
      e.textContent = txt; return e;
    };
    t(bx, base - bh - u(7), '0', 'middle');
    t(right, base - bh - u(7), lab + (km ? ' km' : ' mi'), 'end');
    const nx = right - u(10), ny = base - bh - u(56);
    svg('path', { d: `M${nx} ${ny - u(20)} L${nx + u(9)} ${ny + u(8)} L${nx} ${ny + u(2)} L${nx - u(9)} ${ny + u(8)} Z`, class: 'mf-n' }, g);
    t(nx, ny - u(26), 'N', 'middle', 16).classList.add('mf-nl');
  };

  /* ---------- title swaps: <h2 class="title tswap"><span data-t="0" class="cur">…</span><span data-t="1">…</span></h2>
     bind with data-demo="tswap" (alone or next to the slide's own demo); the state follows the step, and the
     last state stays after the last click. */
  Deck.demo('tswap', {
    step(s, n) {
      $$('.tswap', s).forEach((sw) => {
        const last = sw.children.length - 1;
        [...sw.children].forEach((t) => t.classList.toggle('cur', +t.dataset.t === Math.min(n, last)));
      });
    },
  });

  /* ==========================================================================
     TALK CONTENT: the rail's five stations and the two running examples (sample talk).
     Replace with your talk's own; keep five stations (the CSS grid has five columns).
     ========================================================================== */
  const ST = [
    { name: 'Record', rq: 'RQ1 · BUILD: HOW DOES THE PHONE MEASURE SLEEP?', c: 'var(--wf)', how: 'Motion and sound, three nights each', num: '120', lab: 'nights recorded at home' },
    { name: 'Score', rq: 'RQ1 · BUILD: HOW DOES THE PHONE MEASURE SLEEP?', c: 'var(--ai)', how: 'A model labels every 30-second epoch', num: '960', lab: 'epochs scored per night' },
    { name: 'Total', rq: 'RQ1 · BUILD: HOW DOES THE PHONE MEASURE SLEEP?', c: 'var(--wf)', how: 'Asleep epochs add up to total sleep', num: '7.1 h', lab: 'median night by phone' },
    { name: 'Compare', rq: 'RQ2 · CHECK: DOES THE PHONE AGREE WITH THE LAB?', c: 'var(--bd)', how: 'The same nights, scored in the lab', num: '4/5', lab: 'nights within 30 minutes' },
    { name: 'Apply', rq: 'RQ3 · APPLY: DOES THE 7-HOUR VERDICT CHANGE?', c: 'var(--sp)', how: 'Short sleep means under 7 hours', num: '1/5', lab: 'shift-worker nights change verdict' },
  ];
  const EX1 = { chip: '◐', c: 'var(--wf)', name: 'One night', sub: 'participant P014, night 3',
    cells: ['Recorded at home', 'Two wake periods mostly <b>missed</b>', '<b>7.4 h</b> by phone', 'Lab: <b>6.6 h</b>, 48 min apart', 'Verdict <b>flips</b> to 7 h or more'] };
  const EX2 = { chip: '◎', c: 'var(--sp)', name: 'One shift worker', sub: 'participant P027',
    cells: ['', '', '', '', '<b>2 of 3</b> nights change verdict'] };
  /* ========================================================================== */

  const exRow = (cls, x) => `<div class="track-ex ${cls}"><div class="who"><i style="--c:${x.c}">${x.chip}</i><div><b>${x.name}</b><span>${x.sub}</span></div></div>${x.cells.map((c, k) => `<div class="cell" data-k="${k}">${c}</div>`).join('')}</div>`;

  Deck.demo('anchor', {
    init(s) {
      const done = +s.dataset.done || 0;
      s._done = done;
      const host = $('.anchor-host', s);
      host.innerHTML = `<div class="rail"><div class="rail-line"></div><div class="rail-fill"></div>
        <div class="stations">${ST.map((t, k) => `<div class="st" style="--c:${t.c}" data-k="${k}"><span class="st-n">0${k + 1}</span><div class="st-dot"></div>
          <div class="st-name">${t.name}</div><div class="st-rq">${t.rq}</div><div class="st-how">${t.how}</div>
          <div class="st-res"><div class="num">${t.num}</div><span>${t.lab}</span></div></div>`).join('')}</div>
        <div class="lens lg" data-lg-scale="54" data-lg-bezel="22"><span class="lens-lab"></span></div></div>
        ${exRow('ex-cub', EX1)}${exRow('ex-tract', EX2)}`;
    },
    layout(s, n) {
      const done = s._done;
      const sts = $$('.st', s);
      const newest = done - 1;
      sts.forEach((st, k) => {
        st.classList.toggle('done', k <= newest); // a station shows its result as soon as the lens calls it done
        st.classList.toggle('show', k <= newest);
      });
      $$('.ex-cub .cell, .ex-tract .cell', s).forEach((c) => {
        const k = +c.dataset.k;
        c.classList.toggle('show', k < done - 1 || (k === newest && n >= 1));
      });
      // lens position: newest done station at step < 2, next station from step 2
      let at = newest < 0 ? (n >= 1 ? 0 : -1) : (n >= 2 && done < 5 ? done : newest);
      if (done >= 5 && n >= 2) at = -1;
      sts.forEach((st, k) => st.classList.toggle('cur', k === at));
      const lens = $('.lens', s);
      if (at >= 0) {
        const st = sts[at];
        lens.style.left = st.offsetLeft - 30 + 'px';
        lens.style.width = st.offsetWidth + 6 + 'px';
        lens.style.opacity = 1;
        lens.style.setProperty('--c', ST[at].c);
        $('.lens-lab', s).textContent = at < done ? 'done' : 'next';
      } else lens.style.opacity = 0;
      // rail fill to the last visible done station
      const fill = $('.rail-fill', s);
      fill.style.width = newest >= 0 ? sts[newest].offsetLeft + 15 + 'px' : '0px';
      if (done >= 5 && n >= 2) fill.style.width = '100%';
      $('.ex-tract', s).style.display = done >= 5 || s.dataset.tract === '1' ? '' : 'none';
      $('.ex-cub', s).style.display = s.dataset.cub === '0' ? 'none' : '';
      // count-up on the newest result
      if (newest >= 0 && !s._counted) {
        s._counted = true;
        const numEl = sts[newest].querySelector('.num');
        const txt = ST[newest].num, m = txt.match(/^([\d,]+)(.*)$/);
        if (m && !/^[./]/.test(m[2]) && !Deck.static) { const to = +m[1].replace(/,/g, ''); tween(1300, (p) => { numEl.textContent = fmt(Math.round(to * p)) + m[2]; }); }
      }
    },
    enter(s) { s._counted = false; },
    step(s, n) { requestAnimationFrame(() => this.layout(s, n)); if (Deck.static) this.layout(s, n); },
  });
})();
