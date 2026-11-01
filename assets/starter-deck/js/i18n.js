/* Optional second-language view, for the presenter's own reading. Off unless a dictionary is loaded.
   To turn it on, add <script src="js/i18n-<code>.js"></script> after this file and before js/engine.js in
   index.html, with
     window.DECK_L2 = '<code>';                 // for example 'es', 'fr', 'de', 'ja'
     window.I18N_<CODE> = { 'English block HTML': 'translated HTML', ... };
     window.I18N_<CODE>_TITLES = { 'English data-title': 'translated title', ... };
   then open index.html?lang=<code>. The audience view and the presenter previews stay English.
   DeckI18n.collect(document.querySelector('.slides')) lists the English keys to translate.

   A "text block" is the outermost element whose content is text plus inline markup only (b, em, span, br,
   small, icons ...). Its whitespace-collapsed innerHTML is the dictionary key. A translation is used only
   when its tags and attributes match the English exactly, so classes, data-s builds and demo hooks survive.
   Static slide text is translated before the engine indexes build steps; text that demos write later is
   translated as it appears. */
(function () {
  const INLINE = new Set(['B', 'EM', 'I', 'SPAN', 'BR', 'SMALL', 'SUP', 'SUB', 'CODE', 'A', 'STRONG', 'U', 'S', 'MARK', 'TSPAN']);
  const SKIP = new Set(['SCRIPT', 'STYLE', 'ASIDE', 'TEXTAREA', 'INPUT', 'SELECT']);
  const norm = (h) => h.replace(/\s+/g, ' ').trim();
  const tags = (h) => (h.match(/<[^>]+>/g) || []).map((t) => t.replace(/\s(?:data-label|alt|aria-label|title)="[^"]*"/g, '')).join('');
  const hasWord = (t) => /[A-Za-z]{2,}/.test(t);

  function inlineOnly(el) {
    for (const c of el.childNodes) {
      if (c.nodeType !== 1) continue;
      if (c.tagName.toLowerCase() === 'svg') { if (c.querySelector('text')) return false; continue; } // icon
      if (!INLINE.has(c.tagName) || !inlineOnly(c)) return false;
    }
    return true;
  }
  function blocks(root, out = []) {
    if (root.nodeType !== 1 || SKIP.has(root.tagName) || root.classList.contains('notes') || root.classList.contains('notes-en')) return out;
    const isSvgRoot = root.tagName.toLowerCase() === 'svg';
    if (!isSvgRoot && hasWord(root.textContent) && inlineOnly(root)) { out.push(root); return out; }
    for (const c of root.children) blocks(c, out);
    return out;
  }

  const code = () => (window.DECK_L2 || '').toUpperCase(); // read late: i18n-<code>.js loads after this file
  const dict = () => (code() && window['I18N_' + code()]) || {};
  // translate a block; when the whole block has no entry, translate its inline pieces instead
  function tr(el, D) {
    const k = norm(el.innerHTML), t = D[k];
    if (t) {
      if (tags(t) === tags(k)) { el.innerHTML = t; return 1; }
      console.warn('[i18n] markup differs, skipped:', k.slice(0, 80));
      return 0;
    }
    let n = 0;
    for (const c of [...el.children]) if (c.tagName.toLowerCase() !== 'svg' && hasWord(c.textContent)) n += tr(c, D);
    return n;
  }
  function translate(root) {
    const D = dict();
    return blocks(root).reduce((n, el) => n + tr(el, D), 0);
  }

  // keys for building the dictionary: every text block under root, plus classed spans inside blocks that
  // demos rewrite later (for example a threshold label inside a table)
  function collect(root) {
    const out = blocks(root).map((el) => norm(el.innerHTML));
    blocks(root).forEach((bl) => bl.querySelectorAll('[class]').forEach((e) => {
      if (INLINE.has(e.tagName) && hasWord(e.textContent) && inlineOnly(e)) out.push(norm(e.innerHTML));
    }));
    return out;
  }

  function watch(root) {
    let pending = new Set(), raf = 0;
    const obs = new MutationObserver((muts) => {
      muts.forEach((m) => pending.add(m.target.nodeType === 1 ? m.target : m.target.parentElement));
      if (!raf) raf = setTimeout(flush, 0);
    });
    function flush() {
      raf = 0;
      obs.disconnect();
      pending.forEach((el) => {
        if (!el || !el.isConnected) return;
        // translate the block that contains the change, or the blocks inside a new subtree
        let b = el;
        while (b && b !== root && !(hasWord(b.textContent) && inlineOnly(b) && b.tagName.toLowerCase() !== 'svg')) b = b.parentElement;
        translate(b && b !== root ? b : el);
      });
      pending = new Set();
      obs.observe(root, { childList: true, subtree: true, characterData: true });
    }
    obs.observe(root, { childList: true, subtree: true, characterData: true });
  }

  const title = (t) => ((code() && window['I18N_' + code() + '_TITLES']) || {})[t] || t;
  window.DeckI18n = { translate, collect, watch, title, norm };
})();
