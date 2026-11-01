/* Percentages · one registry for every rate the deck reports.
   First appearance: Deck_afx() writes the formula out, words first, then numbers.
   Later appearances: Deck_pin() keeps the same formula in the top-right corner.
   The entries are the sample talk's; replace them with your talk's rates ({name, c, top, bot}). */
(() => {
  const FX = {
    agree: { name: 'Agreement', c: 'var(--ok)', top: 'nights within 30 minutes of the lab', bot: 'all nights measured both ways' },
    flip: { name: 'Verdict changed', c: 'var(--no)', top: 'nights whose 7-hour verdict differs', bot: 'all nights in the group' },
  };
  const get = (o) => (typeof o === 'string' ? FX[o] : { ...FX[o.k], ...o });
  // o.id gives each part a class (<id>-t, -b, -n, -d, -v) so a demo can update it.
  const cls = (o, part) => (o.id ? ` class="${o.id}-${part}"` : '');
  const wfr = (f, o = {}) => `<span class="wfr"><span${cls(o, 't')}>${f.top}</span><span${cls(o, 'b')}>${f.bot}</span></span>`;

  window.Deck_afx = (o) => {
    const f = get(o);
    return `<div class="afx" style="--c:${f.c}">`
      + `<span class="afx-name">${f.name}</span><span class="afx-eq">=</span>${wfr(f, o)}`
      + `<span></span><span class="afx-eq">=</span>`
      + `<span class="afx-num"><span class="nfr"><span${cls(o, 'n')}>${o.n}</span><span${cls(o, 'd')}>${o.d}</span></span>`
      + `<span class="afx-eq">=</span><span class="afx-v num${o.id ? ` ${o.id}-v` : ''}">${o.v}</span></span></div>`;
  };

  window.Deck_pin = (...keys) => `<div class="fx-pin">${keys.map((o) => {
    const f = get(o);
    return `<div class="pf" style="--c:${f.c}"><b>${f.name}</b><span class="afx-eq">=</span>${wfr(f)}</div>`;
  }).join('')}</div>`;
})();
