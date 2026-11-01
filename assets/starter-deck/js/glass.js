/* Liquid glass: refraction + chromatic dispersion via SVG displacement maps.
   Any element with class "lg" gets its own filter, sized to the element, the first
   time its slide becomes visible. Chromium applies url() filters in backdrop-filter;
   other browsers keep the plain blur fallback declared in CSS.
   Options per element (data attributes):
     data-lg-bezel  width of the refracting rim in px (default: 0.28 × min(w, h))
     data-lg-scale  displacement strength in px (default 46)
     data-lg-blur   frost under the refraction in px (default 1.2)                */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  let defs, n = 0;
  const cache = new Map();

  function ensureDefs() {
    if (defs) return defs;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('id', 'glass-defs');
    svg.setAttribute('aria-hidden', 'true');
    defs = document.createElementNS(NS, 'defs');
    svg.appendChild(defs);
    document.body.appendChild(svg);
    return defs;
  }

  // Displacement map for a rounded rectangle: inside the rim, each pixel points along
  // the surface normal; strength rises toward the edge like a convex bevel.
  function mapURL(w, h, r, bezel) {
    const key = [w, h, r, bezel].join('x');
    if (cache.has(key)) return cache.get(key);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(w, h);
    const hw = w / 2, hh = h / 2;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const px = x + 0.5 - hw, py = y + 0.5 - hh;
        const qx = Math.abs(px) - (hw - r), qy = Math.abs(py) - (hh - r);
        const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
        const sd = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r; // < 0 inside
        const d = -sd;
        let dx = 0, dy = 0;
        if (d > 0 && d < bezel) {
          let nx, ny;
          if (qx > 0 && qy > 0) { const l = Math.hypot(qx, qy) || 1; nx = qx / l; ny = qy / l; }
          else if (qx > qy) { nx = 1; ny = 0; } else { nx = 0; ny = 1; }
          nx *= Math.sign(px) || 1; ny *= Math.sign(py) || 1;
          const t = 1 - d / bezel;
          const m = Math.pow(t, 1.8) * (1 - 0.15 * t);
          dx = nx * m; dy = ny * m;
        }
        const i = (y * w + x) * 4;
        img.data[i] = Math.round(128 + dx * 127);
        img.data[i + 1] = Math.round(128 + dy * 127);
        img.data[i + 2] = 128;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    const url = c.toDataURL();
    cache.set(key, url);
    return url;
  }

  function build(el) {
    const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
    if (!w || !h) return false;
    if (el._lgSize === w + 'x' + h) return true;
    const cs = getComputedStyle(el);
    const r = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, h / 2, w / 2);
    const bezel = +el.dataset.lgBezel || Math.max(10, Math.min(w, h) * 0.28);
    const scale = +el.dataset.lgScale || 46;
    const blur = el.dataset.lgBlur !== undefined ? +el.dataset.lgBlur : 1.2;
    const id = el._lgId || (el._lgId = 'lg' + ++n);
    const d = ensureDefs();
    const old = d.querySelector('#' + id);
    if (old) old.remove();
    const f = document.createElementNS(NS, 'filter');
    f.setAttribute('id', id);
    f.setAttribute('x', '0'); f.setAttribute('y', '0');
    f.setAttribute('width', w); f.setAttribute('height', h);
    f.setAttribute('filterUnits', 'userSpaceOnUse');
    f.setAttribute('color-interpolation-filters', 'sRGB');
    const ch = (k, sc, keep) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${sc}" xChannelSelector="R" yChannelSelector="G" result="d${k}"/>` +
      `<feColorMatrix in="d${k}" type="matrix" values="${keep}" result="c${k}"/>`;
    f.innerHTML = `<feImage href="${mapURL(w, h, r, bezel)}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="map"/>` +
      ch('r', scale, '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0') +
      ch('g', scale * 1.07, '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0') +
      ch('b', scale * 1.15, '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0') +
      '<feBlend in="cr" in2="cg" mode="screen" result="rg"/><feBlend in="rg" in2="cb" mode="screen"/>';
    d.appendChild(f);
    const v = `blur(${blur}px) url(#${id}) saturate(1.7) brightness(1.06)`;
    el.style.backdropFilter = v;
    el.style.webkitBackdropFilter = v;
    el._lgSize = w + 'x' + h;
    return true;
  }

  function refresh(root) {
    (root || document).querySelectorAll('.lg').forEach((el) => {
      if (!build(el)) requestAnimationFrame(() => build(el));
    });
  }
  window.Glass = { refresh, build };
  if (window.Deck) Deck.onEnter.push((s) => { refresh(s); setTimeout(() => refresh(s), 120); });
})();
