/* ==========================================================================
   Deck engine (defense-deck-design starter)
   - 1920×1080 stage scaled to the window
   - step builds: [data-s] show at step n, [data-x] hide, [data-dim] dim, [data-lit] add .lit
   - demos: Deck.demo(name, {init, enter, step, leave}) bound via <section data-demo="name">
   - keys: → / Space / PgDn next · ← / PgUp prev · ↓ / ↑ skip steps · Home / End
           O overview · S presenter window · T theme · F fullscreen · B blackout · H help
           type a slide number then Enter to jump
   ========================================================================== */
(function () {
  'use strict';

  const Deck = (window.Deck = window.Deck || {});
  Deck.queue = Deck.queue || [];
  Deck.demos = Deck.demos || {};
  Deck.add = (sec, html) => Deck.queue.push({ sec, html });
  Deck.demo = (name, impl) => { Deck.demos[name] = impl; };
  Deck.onEnter = Deck.onEnter || [];

  /* Sections: the ids and n names are fixed; each talk writes its own labels (sample talk shown). */
  const SECTIONS = [
    { id: 'open', n: 'Prologue', label: 'Why sleep researchers care' },
    { id: 'act1', n: 'Act I', label: 'How the phone measure is built' },
    { id: 'act2', n: 'Act II', label: 'How well it agrees with the lab test' },
    { id: 'act3', n: 'Act III', label: 'What changes for shift workers' },
    { id: 'close', n: 'Epilogue', label: 'What it means for sleep research' },
    { id: 'backup', n: 'Supplement', label: 'Details for questions' },
  ];
  /* Optional second language: js/i18n-<code>.js sets window.DECK_L2 = '<code>' (see js/i18n.js). */
  const L2 = window.DECK_L2 || '';
  const TRACK = [];

  /* ---------------- utilities ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const store = {
    get(k) { try { return localStorage.getItem('deck.' + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('deck.' + k, v); } catch (e) { /* storage unavailable */ } },
  };
  function fmt(v, dec = 0, sep = true) {
    const s = Number(v).toFixed(dec);
    if (!sep) return s;
    const [i, d] = s.split('.');
    return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? '.' + d : '');
  }
  function tween(dur, fn, ease = easeOut) {
    if (Deck.static) { fn(1, 1); return Promise.resolve(); }
    return new Promise((res) => {
      const t0 = performance.now();
      function f(t) {
        const p = clamp((t - t0) / dur, 0, 1);
        fn(ease(p), p);
        if (p < 1) requestAnimationFrame(f); else res();
      }
      requestAnimationFrame(f);
    });
  }
  function el(tag, attrs = {}, html = '') {
    const n = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'style' && typeof attrs[k] === 'object') Object.assign(n.style, attrs[k]);
      else if (k === 'class') n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (html) n.innerHTML = html;
    return n;
  }
  const SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs = {}, parent) {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  Deck.util = { $, $$, clamp, easeOut, easeInOut, sleep, fmt, tween, el, svg, mulberry32, store };

  /* ---------------- state ---------------- */
  let stage, slidesEl, chrome, slides = [], cur = -1, curStep = 0, preview = false;
  let presenter = null, presenterT0 = Date.now(), numBuf = '', numTimer = null, leaveTimers = new Map();
  let mainCount = 0, supCount = 0; const retStack = []; // supplement links: where to return after a detour
  let qaHome = null; // [slide, step] where Q&A was when a cheat-sheet chip left it; cleared on return or on reaching the last slide

  /* ---------------- background ---------------- */
  function buildBackground() {
    const bg = el('div', { class: 'bg' });
    bg.appendChild(el('div', { class: 'glow g1' }));
    bg.appendChild(el('div', { class: 'glow g2' }));
    return bg;
  }

  /* photo layer: <section data-photo="unsplash-id" data-scrim="sl|sb|sf|sx|half|half l" data-pos="50% 30%" data-credit="Name"> */
  /* photos ship in img/ (downloaded from Unsplash, 1920 px wide); the online copy is only a fallback */
  const photoOnline = (id, w = 1920) => `https://images.unsplash.com/${id}?w=${w}&q=78&auto=format&fit=crop`;
  const photoURL = (id) => `img/${id}.jpg`;
  Deck.photoURL = photoURL;
  window.Deck_photo = photoURL;
  function addPhoto(s) {
    const id = s.dataset.photo;
    if (!id) return;
    const ph = el('div', { class: 'ph ' + (s.dataset.scrim || 'sl') });
    if (s.dataset.pos) ph.style.setProperty('--pos', s.dataset.pos);
    const img = el('img', { alt: '', decoding: 'async', loading: 'eager', src: photoURL(id) });
    img.addEventListener('error', () => { if (!img.dataset.fb) { img.dataset.fb = '1'; img.src = photoOnline(id); } });
    ph.appendChild(img);
    s.insertBefore(ph, s.firstChild);
    if (s.dataset.credit) s.appendChild(el('div', { class: 'credit' }, 'Photo: ' + s.dataset.credit + ' / Unsplash'));
  }

  /* ---------------- build ---------------- */
  function init() {
    const qs = new URLSearchParams(location.search);
    preview = qs.has('preview');
    Deck.lang = L2 && qs.get('lang') === L2 && window.DeckI18n ? L2 : 'en';
    if (qs.has('static')) { Deck.static = true; document.documentElement.classList.add('static'); }
    const theme = qs.get('theme') || store.get('theme') || 'ink';
    document.documentElement.dataset.theme = theme;
    if (preview) document.body.classList.add('preview');

    const vp = el('div', { id: 'viewport' });
    stage = el('div', { id: 'stage' });
    vp.appendChild(stage);
    document.body.appendChild(vp);
    stage.appendChild(buildBackground());
    slidesEl = el('div', { class: 'slides' });
    stage.appendChild(slidesEl);

    const tmp = document.createElement('div');
    Deck.queue.forEach((q) => {
      tmp.innerHTML = q.html;
      $$(':scope > section', tmp).forEach((s) => { s.dataset.sec = q.sec; s.classList.add('slide'); slidesEl.appendChild(s); });
    });
    if (Deck.lang !== 'en') { document.documentElement.lang = L2; DeckI18n.translate(slidesEl); } // before build steps are indexed
    slides = $$('.slide', slidesEl);
    slides.forEach(prep);
    setupLinks();
    if (Deck.lang !== 'en') DeckI18n.translate(slidesEl); // link labels written by setupLinks
    setTimeout(() => slides.forEach((s, k) => { if (s.dataset.photo) setTimeout(() => { const im = new Image(); im.src = photoURL(s.dataset.photo); }, k * 120); }), 600);

    chrome = el('div', { class: 'chrome' });
    chrome.innerHTML = `<div class="act"></div><div class="stepdots"></div><div class="pageno"></div><div class="progress"></div>`;
    stage.appendChild(chrome);

    document.body.appendChild(el('div', { class: 'overlay', id: 'overview' }));
    document.body.appendChild(el('div', { class: 'overlay', id: 'help' }));
    document.body.appendChild(el('div', { class: 'blackout', id: 'blackout' }));
    document.body.appendChild(el('div', { class: 'toast', id: 'toast' }));
    const nh = el('div', { class: 'navhint' }, '<button aria-label="previous">‹</button><button aria-label="next">›</button>');
    nh.children[0].onclick = prev; nh.children[1].onclick = next;
    document.body.appendChild(nh);

    fit();
    window.addEventListener('resize', fit);
    document.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', fromHash);
    let mt;
    document.addEventListener('mousemove', () => { document.body.classList.add('mouse'); clearTimeout(mt); mt = setTimeout(() => document.body.classList.remove('mouse'), 1800); });
    window.addEventListener('message', (e) => { if (e.data && e.data.deckGo) go(e.data.deckGo[0], e.data.deckGo[1]); });

    if (Deck.lang !== 'en') DeckI18n.watch(stage); // text that demos and the chrome write later
    const h = parseHash();
    go(h ? h[0] : 0, h ? h[1] : 0, 'fwd', true);
  }

  function prep(s, i) {
    s.dataset.idx = i;
    addPhoto(s);
    const nodes = $$('[data-s],[data-x],[data-dim],[data-lit]', s);
    s._nodes = nodes;
    let max = +s.dataset.steps || 0;
    nodes.forEach((n) => ['s', 'x', 'dim', 'lit'].forEach((k) => { if (n.dataset[k] !== undefined) max = Math.max(max, +n.dataset[k]); }));
    s._max = max;
    $$('.e', s).forEach((n, k) => { if (!n.style.getPropertyValue('--i')) n.style.setProperty('--i', k); });
    $$('[data-d]', s).forEach((n) => n.style.setProperty('--d', n.dataset.d));
    const h = $('.h1, .display, .h2', s);
    s._title = s.dataset.title || (h ? h.textContent.replace(/\s+/g, ' ').trim() : 'Slide ' + (i + 1));
    const notes = $('.notes', s);
    s._notes = notes ? notes.innerHTML : '';
    // presenter keywords: <aside class="notes-kw" hidden><ol><li data-k="step" [data-key]><span class="en">…</span>[<span class="<L2 code>">…</span>]</li>…</ol></aside>
    s._kw = $$('.notes-kw li', s).map((li) => ({ k: +li.dataset.k || 0, key: li.hasAttribute('data-key'),
      en: (li.querySelector('.en') || li).innerHTML, l2: (L2 && li.querySelector('.' + L2) || {}).innerHTML || '' }));
    s._demos = (s.dataset.demo || '').split(/\s+/).filter(Boolean);
  }

  function fit() {
    // fit to the viewport box (the review layer shrinks it for its toolbar and panel)
    const vp = stage.parentElement, W = vp.clientWidth || window.innerWidth, H = vp.clientHeight || window.innerHeight;
    const k = Math.min(W / 1920, H / 1080);
    stage.style.transform = `translate(${(W - 1920 * k) / 2}px, ${(H - 1080 * k) / 2}px) scale(${k})`;
    // bleed: how far the window extends past the 16:9 stage, in stage pixels; background and photos fill it
    stage.style.setProperty('--bx', ((W - 1920 * k) / 2 / k + 2).toFixed(1) + 'px');
    stage.style.setProperty('--by', ((H - 1080 * k) / 2 / k + 2).toFixed(1) + 'px');
  }

  /* ---------------- demos ---------------- */
  function demoCall(s, fn, ...args) {
    s._demos.forEach((name) => {
      const d = Deck.demos[name];
      if (!d) return;
      try {
        if (!s._inited) s._inited = new Set();
        if (!s._inited.has(name) && d.init) { d.init(s); s._inited.add(name); }
        if (d[fn]) d[fn](s, ...args);
      } catch (err) { console.error('[demo ' + name + '.' + fn + ']', err); }
    });
  }

  /* ---------------- steps ---------------- */
  function shown(n, s) {
    for (let p = n; p && p !== s; p = p.parentElement) {
      if (p.dataset && p.dataset.s !== undefined && !p.classList.contains('on')) return false;
      if (p.classList && p.classList.contains('off')) return false;
    }
    return true;
  }
  function applyStep(s, step, silent) {
    s.dataset.step = step;
    s._nodes.forEach((n) => {
      const d = n.dataset;
      if (d.s !== undefined) n.classList.toggle('on', step >= +d.s);
      if (d.x !== undefined) n.classList.toggle('off', step >= +d.x);
      if (d.dim !== undefined) n.classList.toggle('dim', step >= +d.dim);
      if (d.lit !== undefined) n.classList.toggle('lit', step >= +d.lit);
    });
    if (silent) return;
    $$('[data-count]', s).forEach((n) => {
      const vis = shown(n, s);
      if (vis && !n._counted) {
        n._counted = true;
        const to = +n.dataset.count, dec = +(n.dataset.dec || 0), sep = n.dataset.sep !== '0';
        const from = +(n.dataset.from || 0);
        tween(+(n.dataset.dur || 1500), (p) => { n.textContent = fmt(from + (to - from) * p, dec, sep); });
      } else if (!vis && n._counted) { n._counted = false; n.textContent = fmt(+(n.dataset.from || 0), +(n.dataset.dec || 0)); }
    });
  }
  function setStep(step) {
    const s = slides[cur];
    const prevStep = curStep;
    curStep = clamp(step, 0, s._max);
    applyStep(s, curStep);
    demoCall(s, 'step', curStep, prevStep);
    updateChrome();
  }

  /* supplement links: <a class="xref" data-goto="id"> on a talk slide jumps to <section data-id="id">;
     each supplement slide (S1, S2 …) carries a back chip to the talk slide that sent you, or that links to it */
  function setupLinks() {
    const byId = {};
    slides.forEach((s, i) => {
      if (s.dataset.id) byId[s.dataset.id] = i;
      if (s.dataset.sec === 'backup') s._sno = ++supCount; else mainCount++;
    });
    $$('[data-goto]', slidesEl).forEach((a) => {
      const i = byId[a.dataset.goto];
      if (i === undefined) { console.warn('supplement link without target:', a.dataset.goto); a.remove(); return; }
      const t = slides[i];
      a.innerHTML = `<b>S${t._sno}</b><span>${a.dataset.label || t._title}</span>`;
      a.setAttribute('href', `#/${i + 1}`);
      a.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); retStack.push([cur, curStep]); go(i, 0, 'fwd'); });
    });
    let lastFrom = -1; // slides that continue a linked sequence (S8 after S7 …) return to the same talk slide
    slides.forEach((s) => {
      if (!s._sno) return;
      s._from = slides.findIndex((m) => !m._sno && m.querySelector(`[data-goto="${s.dataset.id}"]`));
      if (s._from < 0) s._from = lastFrom; else lastFrom = s._from;
      if (s._from < 0) return;
      const b = el('a', { class: 'xback', href: `#/${s._from + 1}` });
      b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goBack(); });
      s.appendChild(b);
    });
  }
  function goBack() {
    const s = slides[cur];
    const r = retStack.pop() || (s && s._from >= 0 ? [s._from, slides[s._from]._max] : null);
    if (r) go(r[0], r[1], 'back');
  }

  function go(i, step = 0, dir = 'fwd', first = false) {
    i = clamp(i, 0, slides.length - 1);
    if (!slides[i]._sno) retStack.length = 0;
    if (i === mainCount - 1) qaHome = null;
    if (i === cur) { setStep(step); return; }
    const old = slides[cur];
    if (old) {
      old.classList.remove('active');
      old.classList.add('leaving');
      clearTimeout(leaveTimers.get(old));
      leaveTimers.set(old, setTimeout(() => old.classList.remove('leaving'), 470));
      demoCall(old, 'leave');
      $$('[data-count]', old).forEach((n) => { n._counted = false; });
    }
    stage.dataset.dir = dir;
    cur = i;
    const s = slides[i];
    clearTimeout(leaveTimers.get(s));
    s.classList.remove('leaving');
    s.classList.add('active');
    stage.style.setProperty('--acc', getComputedStyle(s).getPropertyValue('--acc'));
    stage.dataset.acc = s.dataset.acc || 'sand';
    curStep = clamp(step, 0, s._max);
    applyStep(s, -1, true);
    $$('[data-count]', s).forEach((n) => { n._counted = false; n.textContent = fmt(+(n.dataset.from || 0), +(n.dataset.dec || 0)); });
    demoCall(s, 'enter', curStep);
    (Deck.onEnter || []).forEach((f) => { try { f(s); } catch (err) { console.error(err); } });
    const reveal = () => {
      if (cur !== i) return;
      applyStep(s, curStep);
      demoCall(s, 'step', curStep, -1);
    };
    if (Deck.static) reveal();
    else requestAnimationFrame(() => requestAnimationFrame(reveal));
    updateChrome();
  }

  function next() {
    const s = slides[cur];
    if (curStep < s._max) setStep(curStep + 1);
    else if (cur < slides.length - 1) go(cur + 1, 0, 'fwd');
  }
  function prev() {
    if (curStep > 0) setStep(curStep - 1);
    else if (cur > 0) go(cur - 1, slides[cur - 1]._max, 'back');
  }
  Deck.next = next; Deck.prev = prev; Deck.go = go; Deck.fit = () => stage && fit();
  Deck.current = () => ({ slide: slides[cur], index: cur, step: curStep });

  /* ---------------- chrome ---------------- */
  function updateChrome() {
    const s = slides[cur];
    const sec = SECTIONS.find((x) => x.id === s.dataset.sec) || SECTIONS[0];
    $('.act', chrome).innerHTML = `<b>${sec.n}</b><span>${sec.label}</span>`;
    $('.act', chrome).style.display = s.dataset.act === 'off' ? 'none' : '';
    $('.pageno', chrome).innerHTML = s._sno ? `<b>S${s._sno}</b> / S${supCount}` : `<b>${cur + 1}</b> / ${mainCount}`;
    const back = $('.xback', s);
    if (back) {
      const r = retStack[retStack.length - 1];
      const to = r ? r[0] : s._from;
      const toS = slides[to] && slides[to]._sno; // an S-to-S detour returns to an S page, not to the talk
      back.innerHTML = toS ? `<b>S${toS}</b><span>Back</span>` : `<b>${to + 1}</b><span>Back to the talk</span>`;
    }
    const dots = $('.stepdots', chrome);
    dots.innerHTML = s._max > 0 ? Array.from({ length: s._max + 1 }, (_, k) => `<i class="${k <= curStep ? 'on' : ''}"></i>`).join('') : '';
    chrome.style.display = s.dataset.chrome === 'off' ? 'none' : '';
    chrome.classList.toggle('over-photo', s.dataset.scrim === 'half'); // page number sits on the photo
    $('.progress', chrome).style.width = `calc((100% + 2 * var(--bx, 2px) - 4px) * ${s._sno ? 1 : (cur + 1) / mainCount})`; // spans the window, bleed included
    if (!preview) {
      const h = `#/${cur + 1}${curStep ? '/' + curStep : ''}`;
      if (location.hash !== h) history.replaceState(null, '', h);
    }
    updatePresenter();
    if ($('#overview').classList.contains('show')) buildOverview();
  }

  function parseHash() {
    const m = location.hash.match(/^#\/(\d+)(?:\/(\d+))?/);
    return m ? [+m[1] - 1, +(m[2] || 0)] : null;
  }
  function fromHash() {
    const h = parseHash();
    if (h && (h[0] !== cur || h[1] !== curStep)) go(h[0], h[1], h[0] < cur ? 'back' : 'fwd');
  }

  /* ---------------- overlays ---------------- */
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 1600);
  }
  const SEC_COLOR = { open: 'var(--tx2)', act1: 'var(--wf)', act2: 'var(--bd)', act3: 'var(--sp)', close: 'var(--tx2)', backup: 'var(--tx3)' };
  function buildOverview() {
    const ov = $('#overview');
    let html = `<div class="ov-head"><b>Slide overview</b><span>click to jump · Esc to close</span></div>`;
    SECTIONS.forEach((sec) => {
      const list = slides.filter((x) => x.dataset.sec === sec.id);
      if (!list.length) return;
      html += `<div class="ov-sec"><h4>${sec.n} · ${sec.label}</h4><div class="ov-grid">` +
        list.map((x) => {
          const i = +x.dataset.idx;
          const c = getComputedStyle(x).getPropertyValue('--acc') || SEC_COLOR[sec.id];
          return `<div class="ov-card ${i === cur ? 'cur' : ''}" data-go="${i}" style="--c:${c}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${x._title}</div>`;
        }).join('') + '</div></div>';
    });
    ov.innerHTML = html;
    $$('[data-go]', ov).forEach((c) => (c.onclick = () => { ov.classList.remove('show'); go(+c.dataset.go, 0, +c.dataset.go < cur ? 'back' : 'fwd'); }));
  }
  function toggleOverview() {
    const ov = $('#overview');
    if (ov.classList.contains('show')) ov.classList.remove('show');
    else { buildOverview(); ov.classList.add('show'); const c = $('.ov-card.cur', ov); if (c) c.scrollIntoView({ block: 'center' }); }
  }
  function toggleHelp() {
    const h = $('#help');
    if (h.classList.contains('show')) { h.classList.remove('show'); return; }
    const rows = [['→  Space  PgDn', 'next build / next slide'], ['←  PgUp', 'previous'], ['↓  ↑', 'next / previous slide (skip builds)'], ['Home  End', 'first / last slide'],
      ['12 Enter', 'jump to slide 12'], ['O', 'overview'], ['S', 'presenter window (notes, timer, next)'], ['T', 'toggle dark / light theme'], ['F', 'fullscreen'], ['B', 'blackout'], ['R', 'back to the talk from a supplement slide'], ['H  ?', 'this help'], ['Esc', 'close overlays']];
    h.innerHTML = `<div class="ov-head"><b>Keyboard</b><span>Esc to close</span></div><div class="help-grid">${rows.map((r) => `<span class="key">${r[0]}</span><span>${r[1]}</span>`).join('')}</div>`;
    h.classList.add('show');
  }
  function toggleTheme() {
    const t = document.documentElement.dataset.theme === 'paper' ? 'ink' : 'paper';
    document.documentElement.dataset.theme = t;
    store.set('theme', t);
    stage.style.setProperty('--acc', getComputedStyle(slides[cur]).getPropertyValue('--acc'));
    toast(t === 'paper' ? 'Light theme' : 'Dark theme');
    demoCall(slides[cur], 'theme', t);
    if (presenter && !presenter.closed) $$('iframe', presenter.document).forEach((f) => { f.dataset.theme = t; f.dataset.loaded = ''; });
    updatePresenter();
  }

  /* ---------------- presenter window ---------------- */
  const PRESENTER_CSS = `
    *{box-sizing:border-box}body{margin:0;background:#0b0f17;color:#e9eef6;font:15px/1.5 Inter,"Segoe UI",system-ui,sans-serif;height:100vh;display:grid;grid-template-columns:1.25fr 1fr;grid-template-rows:auto minmax(0,1fr) auto;gap:14px;padding:16px}
    header{grid-column:1/3;display:flex;justify-content:space-between;align-items:center;color:#8d97a8;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
    header b{color:#e9eef6;font:600 26px/1.1 Fraunces,Georgia,serif;letter-spacing:0;text-transform:none}
    .timer{font:600 34px/1 "JetBrains Mono",Consolas,monospace;color:#fff;letter-spacing:0}.clock{font:500 14px "JetBrains Mono",monospace;color:#8d97a8;text-align:right}
    .card{background:#121826;border:1px solid #232c3d;border-radius:14px;padding:14px;display:flex;flex-direction:column;min-height:0}
    .card h5{margin:0 0 10px;font:700 11px/1 Inter,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#7c879a;display:flex;justify-content:space-between}
    .frame{position:relative;width:100%;aspect-ratio:16/9;background:#000;border-radius:8px;overflow:hidden}.frame iframe{position:absolute;left:0;top:0;width:1920px;height:1080px;border:0;transform-origin:0 0;pointer-events:none}
    .notes{overflow:auto;font-family:Inter,"Segoe UI",system-ui,sans-serif;font-size:21px;line-height:1.7;color:#dbe3ef}.notes p{margin:0 0 .7em}.notes b{color:#fff}.notes em{color:#ffd28a;font-style:normal}
    .left{display:grid;grid-template-rows:auto auto;gap:14px;align-content:start}
    footer{grid-column:1/3;display:flex;gap:10px;align-items:center;color:#7c879a;font-size:13px}
    button{background:#1a2232;color:#e9eef6;border:1px solid #2c3648;border-radius:999px;padding:9px 18px;font:600 14px Inter,sans-serif;cursor:pointer}button:hover{border-color:#5ea8ff}
    .steps{font-family:"JetBrains Mono",monospace;color:#b5c0d2}.nexttitle{font:500 15px Inter,sans-serif;color:#b5c0d2;margin-top:8px}
    .kw{list-style:none;margin:0;padding:0}.kw li{display:grid;grid-template-columns:64px 1fr;column-gap:10px;padding:9px 0 10px;border-bottom:1px solid #1f2736;opacity:.5;transition:opacity .2s}
    .kw li.now{opacity:1}.kw li.past{opacity:.32}.kw .st{grid-row:1/3;font:600 12px/1.9 "JetBrains Mono",Consolas,monospace;color:#7c879a;letter-spacing:.06em;white-space:nowrap}
    .kw li.now .st{color:#5ea8ff}.kw .en{font-size:23px;line-height:1.35;color:#eef3fa}.kw .l2{font-size:19px;line-height:1.45;color:#9fb0c8;margin-top:2px}
    .kw li.key .en{color:#ffd28a;font-weight:700}.kw li.key .l2{color:#e6c487}
    .links{margin-top:16px;padding-top:12px;border-top:1px solid #2c3648;font-size:16px;line-height:1.55;color:#b5c0d2}.links h6{margin:0 0 6px;font:700 11px/1 Inter,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#7c879a}
    .links div{display:flex;gap:10px}.links b{color:#5ea8ff;font-family:"JetBrains Mono",Consolas,monospace;min-width:44px}
    .right{display:grid;grid-template-rows:minmax(0,1fr) auto;gap:14px;min-height:0}.right .notes{flex:1;min-height:0}
    .qa-list{overflow:hidden}
    .qi{padding:6px 0 7px 10px;border-left:3px solid transparent}.qi+.qi{border-top:1px solid #1f2736}.qi.now{border-left-color:#ffd28a;background:#151d2c}
    .qh{display:flex;align-items:baseline;gap:8px;margin-bottom:2px}.qh b{font-size:17px;color:#ffd28a}.qh .qz{font:600 12px Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#8d97a8}
    .qg{margin-left:auto;display:flex;gap:5px}.qg span{font:600 12px/1 "JetBrains Mono",Consolas,monospace;color:#5ea8ff;border:1px solid #2c3648;border-radius:6px;padding:4px 6px;cursor:pointer;white-space:nowrap}
    .qg span:hover{border-color:#5ea8ff;color:#fff}.qg span.here{background:#5ea8ff;color:#0b0f17;border-color:#5ea8ff}
    .ql{font-size:14px;line-height:1.4;color:#dbe3ef}.ql i{font-style:normal;color:#8fc0ff}
    .qback{color:#5ea8ff;cursor:pointer;letter-spacing:.08em;margin-left:6px}.qback:hover{color:#fff}
    body.qa-mode{grid-template-columns:1fr 1.4fr}body.qa-mode #cNext{display:none}
    body.qa-mode .left{grid-template-rows:auto minmax(0,1fr);align-content:stretch;min-height:0}body.qa-mode .right{grid-template-rows:minmax(0,1fr)}
    body.qa-mode #cKw .notes{flex:1;min-height:0}body.qa-mode #cKw .kw .en{font-size:19px}body.qa-mode #cKw .kw .l2{font-size:16px}
    body.qa-mode #pQA{flex:1;min-height:0}
    .qb-moves{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 0 .45em;margin-bottom:.2em;border-bottom:1px solid #2c3648;line-height:1.35}
    .qb-moves b{color:#ffd28a;margin-right:4px}.qb-moves i,.qb-i i{font-style:normal;color:#8fc0ff}
    .qb-g h6{margin:.5em 0 .1em;font:700 .74em/1.2 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#ffd28a}
    .qb-i{display:flex;gap:8px;align-items:baseline;padding:.16em 0 .2em .5em;border-left:3px solid transparent;line-height:1.35}.qb-i.now{border-left-color:#ffd28a;background:#151d2c}
    .qb-i .hear{color:#eef3fa;font-weight:600;margin-right:.4em}.qb-i .say{color:#cfd8e6}.qb-i .qg span{font-size:.78em;padding:.25em .4em}`;
  function openPresenter() {
    if (presenter && !presenter.closed) { presenter.focus(); return; }
    presenter = window.open('', 'deck-presenter', `width=${Math.max(1400, screen.availWidth)},height=${Math.max(860, screen.availHeight)}`); // as large as the screen: the Q&A list needs the room
    if (!presenter) { toast('Pop-up blocked — allow pop-ups for this file'); return; }
    presenterT0 = Date.now();
    const d = presenter.document;
    d.open();
    d.write(`<!doctype html><html><head><meta charset="utf-8"><title>Presenter</title><style>${PRESENTER_CSS}</style></head><body>
      <header><div><span id="pSec"></span><br><b id="pTitle"></b></div><div style="text-align:right"><div class="timer" id="pTimer">00:00</div><div class="clock" id="pClock"></div></div></header>
      <div class="left"><div class="card"><h5><span>Current</span><span class="steps" id="pStep"></span></h5><div class="frame"><iframe id="fCur"></iframe></div></div>
      <div class="card" id="cNext"><h5><span>Next</span><span id="pNextLab"></span></h5><div class="frame" style="width:62%"><iframe id="fNext"></iframe></div><div class="nexttitle" id="pNext"></div></div></div>
      <div class="right"><div class="card" id="cKw"><h5><span>Keywords</span><span id="pNo"></span></h5><div class="notes" id="pNotes"></div></div>
      <div class="card"><h5><span>Q&amp;A cheat sheet</span><span>click a slide to show it · <span class="qback" id="pQBack">↩ back to the talk</span></span></h5><div class="qa-list" id="pQA"></div></div></div>
      <footer><button id="bPrev">‹ Prev</button><button id="bNext">Next ›</button><button id="bReset">Reset timer</button><span style="margin-left:auto">← → navigate · R reset timer · T theme · Esc close</span></footer></body></html>`);
    d.close();
    d.getElementById('bPrev').onclick = prev;
    d.getElementById('bNext').onclick = next;
    d.getElementById('bReset').onclick = () => { presenterT0 = Date.now(); };
    d.getElementById('pQBack').onclick = () => { // back to where Q&A was, else back from an S page
      if (qaHome) { const [i, st] = qaHome; qaHome = null; go(i, st, 'back'); } else goBack();
    };
    d.getElementById('pQA').addEventListener('click', (e) => { // cheat-sheet slide chips; "back to the talk" returns from an S page
      const b = e.target.closest('[data-i]');
      if (!b || +b.dataset.i === cur) return;
      const i = +b.dataset.i;
      if (!qaHome && d.body.classList.contains('qa-mode')) qaHome = [cur, curStep]; // stay in Q&A mode until back
      if (slides[i]._sno) retStack.push([cur, curStep]);
      go(i, 0, i < cur ? 'back' : 'fwd');
    });
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { presenter.close(); return; }
      if (e.key === 'r' || e.key === 'R') { presenterT0 = Date.now(); return; }
      onKey(e);
    });
    const tick = () => {
      if (!presenter || presenter.closed) return;
      const s = Math.floor((Date.now() - presenterT0) / 1000);
      d.getElementById('pTimer').textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
      d.getElementById('pClock').textContent = new Date().toLocaleTimeString();
      presenter.setTimeout(tick, 500);
    };
    tick();
    const resize = () => { $$('.frame', d).forEach((f) => { const ifr = f.querySelector('iframe'); ifr.style.transform = `scale(${f.clientWidth / 1920})`; }); fitQA(); followKw(); };
    presenter.addEventListener('resize', resize);
    setTimeout(resize, 50);
    updatePresenter();
  }
  function setFrame(ifr, idx, step) {
    const base = location.href.split('#')[0].split('?')[0];
    const theme = document.documentElement.dataset.theme;
    if (!ifr.dataset.loaded || ifr.dataset.theme !== theme) {
      ifr.dataset.loaded = '1'; ifr.dataset.theme = theme;
      ifr.src = `${base}?preview=1&theme=${theme}#/${idx + 1}/${step}`; // presenter previews in English, as the audience sees them
    } else {
      try { ifr.contentWindow.postMessage({ deckGo: [idx, step] }, '*'); } catch (e) { ifr.src = `${base}?preview=1&theme=${theme}#/${idx + 1}/${step}`; }
    }
  }
  /* presenter panel: this slide's keywords (current build highlighted) and the S pages it links to */
  function presenterPanel(s) {
    let h = '';
    if (s._kw && s._kw.length) {
      h += '<ol class="kw">' + s._kw.map((w) => {
        const state = w.k === curStep ? 'now' : w.k < curStep ? 'past' : '';
        return `<li class="${state}${w.key ? ' key' : ''}"><span class="st">${w.k ? 'click ' + w.k : 'start'}</span><span class="en">${w.en}</span>${w.l2 ? `<span class="l2">${w.l2}</span>` : ''}</li>`;
      }).join('') + '</ol>';
    } else h += '<p style="color:#7c879a">No keywords for this slide.</p>';
    if (!s._sno) {
      const out = $$('[data-goto]', s).map((a) => { const b = a.querySelector('b'), l = a.querySelector('span'); return b ? `<div><b>${b.textContent}</b><span>${l ? l.textContent : ''}</span></div>` : ''; }).join('');
      h += `<div class="links"><h6>Links to</h6>${out || '<div><span>no S page</span></div>'}</div>`;
    } else {
      const from = slides.map((m, i) => (!m._sno && m.querySelector(`[data-goto="${s.dataset.id}"]`) ? i : -1)).filter((i) => i >= 0);
      const back = from.length ? from : (s._from >= 0 ? [s._from] : []);
      h += `<div class="links"><h6>S${s._sno} · back to</h6>${back.map((i) => `<div><b>${i + 1}</b><span>${slides[i]._title}</span></div>`).join('') || '<div><span>not linked from the talk</span></div>'}</div>`;
    }
    return h;
  }
  /* Q&A cheat sheet (js/qa-cheat.js, presenter only). During the talk: three answer moves, bottom right. From the thank-you slide on
     and on S pages (Q&A mode): the moves in one row plus the questions by asker. Nothing scrolls; items that point
     to this slide are marked, and a slide number puts that slide on the audience screen. */
  const qaIdx = (titles) => titles.map((t) => { const i = slides.findIndex((m) => m._title === t); if (i < 0) console.warn('cheat sheet: no slide titled', t); return i; }).filter((i) => i >= 0);
  const qaChips = (idx) => idx.map((i) => `<span data-i="${i}"${i === cur ? ' class="here"' : ''}>${slides[i]._sno ? `S${slides[i]._sno}` : i + 1}</span>`).join('');
  function qaPanel() {
    return (window.DeckQA || []).map((x) => {
      const idx = qaIdx(x.go);
      return `<div class="qi${idx.includes(cur) ? ' now' : ''}"><div class="qh"><b>${x.t}</b><span class="qz">${x.en}</span><span class="qg">${qaChips(idx)}</span></div>` +
        x.lines.map((l) => `<div class="ql">${l}</div>`).join('') + '</div>';
    }).join('');
  }
  function bankPanel() {
    const moves = '<div class="qb-moves">' + (window.DeckQA || []).map((x) => `<div><b>${x.t}</b>${x.lines[0]}</div>`).join('') + '</div>';
    return moves + (window.DeckQABank || []).map((g) => `<div class="qb-g"><h6>${g.who}</h6>` + g.items.map((it) => {
      const idx = qaIdx(it.go);
      return `<div class="qb-i${idx.includes(cur) ? ' now' : ''}"><div><span class="hear">${it.hear}</span><span class="say">${it.say}</span></div><span class="qg">${qaChips(idx)}</span></div>`;
    }).join('') + '</div>').join('');
  }
  function fitQA() { // Q&A mode: shrink the text until the whole list fits its box
    if (!presenter || presenter.closed) return;
    const d = presenter.document, qa = d.getElementById('pQA');
    if (!qa) return;
    if (!d.body.classList.contains('qa-mode')) { qa.style.fontSize = ''; return; }
    let f = 16;
    qa.style.fontSize = f + 'px';
    while (qa.scrollHeight > qa.clientHeight + 1 && f > 9) { f -= 0.5; qa.style.fontSize = f + 'px'; }
  }
  function followKw() { // keywords taller than their box: scroll just enough to show this build's lines
    if (!presenter || presenter.closed) return;
    const box = presenter.document.getElementById('pNotes');
    if (!box) return;
    const now = $$('.kw li.now', box), past = $$('.kw li.past', box);
    const first = now[0] || past[past.length - 1], last = now[now.length - 1] || first;
    if (!first) { box.scrollTop = 0; return; }
    const top = box.getBoundingClientRect().top - box.scrollTop;
    const y0 = first.getBoundingClientRect().top - top - 4, y1 = last.getBoundingClientRect().bottom - top + 4;
    if (y0 < box.scrollTop || y1 - y0 > box.clientHeight) box.scrollTop = Math.max(0, y0); // taller than the box: show its start
    else if (y1 > box.scrollTop + box.clientHeight) box.scrollTop = y1 - box.clientHeight;
  }
  function updatePresenter() {
    if (!presenter || presenter.closed) return;
    const d = presenter.document, s = slides[cur];
    const sec = SECTIONS.find((x) => x.id === s.dataset.sec) || SECTIONS[0];
    d.getElementById('pSec').textContent = `${sec.n} · ${sec.label}`;
    const tt = (t) => t; // presenter view in English
    const lab = (m, i) => (m._sno ? `S${m._sno}` : `${i + 1}`);
    d.getElementById('pTitle').textContent = `${lab(s, cur)}. ${tt(s._title)}`;
    d.getElementById('pStep').textContent = s._max ? `build ${curStep + 1} / ${s._max + 1}` : '';
    d.getElementById('pNo').textContent = `${cur + 1} / ${slides.length}`;
    d.getElementById('pNotes').innerHTML = presenterPanel(s);
    followKw();
    if (presenter._qaSlide !== cur) {
      presenter._qaSlide = cur;
      const qaMode = !!s._sno || cur === mainCount - 1 || !!qaHome, kw = d.getElementById('cKw'), right = d.querySelector('.right');
      if (qaMode !== d.body.classList.contains('qa-mode')) { // Q&A mode: keywords move under the current slide, the questions take the right column
        d.body.classList.toggle('qa-mode', qaMode);
        if (qaMode) d.querySelector('.left').appendChild(kw); else right.insertBefore(kw, right.firstChild);
        presenter.setTimeout(() => presenter.dispatchEvent(new presenter.Event('resize')), 30);
      }
      d.getElementById('pQA').innerHTML = qaMode ? bankPanel() : qaPanel();
      fitQA();
      presenter.setTimeout(() => { fitQA(); followKw(); }, 400); // again once web fonts have settled
    }
    let ni = cur, ns = curStep + 1;
    if (ns > s._max) { ni = cur + 1; ns = 0; }
    const nx = slides[ni];
    d.getElementById('pNextLab').textContent = nx ? (ni === cur ? 'next build' : 'next slide') : 'end';
    d.getElementById('pNext').textContent = nx ? `${lab(nx, ni)}. ${tt(nx._title)}` : 'End of deck';
    setFrame(d.getElementById('fCur'), cur, curStep);
    if (nx) setFrame(d.getElementById('fNext'), ni, ns);
  }

  /* ---------------- keyboard ---------------- */
  function onKey(e) {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
      if (e.key === 'Escape') t.blur();
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (/^[0-9]$/.test(k)) {
      numBuf += k; clearTimeout(numTimer);
      numTimer = setTimeout(() => (numBuf = ''), 1600);
      toast('Go to slide ' + numBuf + ' — Enter');
      return;
    }
    if (k === 'Enter' && numBuf) { go(+numBuf - 1, 0, +numBuf - 1 < cur ? 'back' : 'fwd'); numBuf = ''; e.preventDefault(); return; }
    switch (k) {
      case 'ArrowRight': case ' ': case 'PageDown': case 'Enter': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp': case 'Backspace': e.preventDefault(); prev(); break;
      case 'ArrowDown': e.preventDefault(); if (cur < slides.length - 1) go(cur + 1, 0, 'fwd'); break;
      case 'ArrowUp': e.preventDefault(); if (cur > 0) go(cur - 1, 0, 'back'); break;
      case 'Home': go(0, 0, 'back'); break;
      case 'End': go(slides.length - 1, 0, 'fwd'); break;
      case 'o': case 'O': case 'g': case 'G': toggleOverview(); break;
      case 's': case 'S': openPresenter(); break;
      case 't': case 'T': toggleTheme(); break;
      case 'f': case 'F': if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); else document.exitFullscreen(); break;
      case 'b': case 'B': case '.': $('#blackout').classList.toggle('show'); break;
      case 'r': case 'R': goBack(); break;
      case 'h': case 'H': case '?': toggleHelp(); break;
      case 'Escape': $$('.overlay.show').forEach((o) => o.classList.remove('show')); $('#blackout').classList.remove('show'); break;
      default: return;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
