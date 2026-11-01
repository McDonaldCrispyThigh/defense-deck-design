"""Serve the deck folder locally with caching disabled (for editing, rehearsal and rendering).

    python tools/serve.py            -> http://127.0.0.1:8765
    python tools/serve.py 8766       -> another port (the render scripts expect 8765)

GET /api/keywords lists every slide in deck order: {n, label, title, builds, keywords, links, back}.
The skill's render scripts (scripts/cdp_render.py, scripts/pdf_assemble.py) read the deck through it.
The server listens on 127.0.0.1 only and never writes files.
"""
import functools
import html
import http.server
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
SLIDES = ROOT / "slides"
# Keep these six names: the last one is the supplement (S1, S2 …).
FILES = ["v2-0-prologue.js", "v2-1-act1.js", "v2-2-act2.js", "v2-3-act3.js", "v2-4-epilogue.js", "v2-5-supplement.js"]
KW_BLOCK = re.compile(r'\n  <aside class="notes-kw" hidden>.*?</aside>', re.S)
# one cue: the English span, then an optional second-language span of any class
KW_ITEM = re.compile(r'<li data-k="(\d+)"( data-key)?><span class="en">(.*?)</span>(?:<span class="[\w-]+">(.*?)</span>)?</li>', re.S)


def split_sections(text):
    return re.split(r'(?=<section\b)', text)


def builds_of(sec):
    head = re.match(r'<section\b([^>]*)>', sec).group(1)
    body = sec.split('<aside class="notes')[0]
    mx = int(re.search(r'data-steps="(\d+)"', head).group(1)) if "data-steps" in head else 0
    for m in re.finditer(r'data-(?:s|x|dim|lit)="(\d+)"', body):
        mx = max(mx, int(m.group(1)))
    return mx + 1


def read_deck():
    """Every slide in deck order: number, label (1, 2 … or S1, S2 …), title, builds, links, keywords."""
    texts = {f: (SLIDES / f).read_text(encoding="utf-8") for f in FILES}
    slides, ids, n, sno = [], {}, 0, 0
    for f in FILES:
        for sec in split_sections(texts[f])[1:]:
            n += 1
            head = re.match(r'<section\b([^>]*)>', sec).group(1)
            sup = f == FILES[-1]
            if sup:
                sno += 1
            m = re.search(r'data-id="([^"]+)"', head)
            title = html.unescape(re.search(r'data-title="([^"]+)"', head).group(1))
            label = f"S{sno}" if sup else str(n)
            if m:
                ids[m.group(1)] = (label, title)
            kw_m = KW_BLOCK.search(sec)
            kws = [{"k": int(k), "key": bool(key), "en": html.unescape(en), "l2": html.unescape(l2)}
                   for k, key, en, l2 in KW_ITEM.findall(kw_m.group(0))] if kw_m else []
            body = sec.split('<aside class="notes')[0]
            slides.append({"n": n, "label": label, "title": title, "file": f, "builds": builds_of(sec), "keywords": kws,
                           "goto": re.findall(r'data-goto="([^"]+)"', body), "id": m.group(1) if m else None})
    for s in slides:
        s["links"] = [f"{ids[g][0]} · {ids[g][1]}" for g in s.pop("goto") if g in ids]
    talk_links = {}
    for f in FILES[:-1]:
        for sec in split_sections(texts[f])[1:]:
            title = html.unescape(re.search(r'data-title="([^"]+)"', sec).group(1))
            talk_links[title] = re.findall(r'data-goto="([^"]+)"', sec.split('<aside class="notes')[0])
    for s in slides:
        if s["label"].startswith("S"):
            s["back"] = [f"{t['label']} · {t['title']}" for t in slides if t["title"] in talk_links and s["id"] in talk_links[t["title"]]]
        s.pop("id", None)
    return slides


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def log_message(self, *args):
        pass

    def _json(self, code, obj):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path.split("?")[0] == "/api/keywords":
            try:
                return self._json(200, {"slides": read_deck()})
            except Exception as e:  # report, never crash the deck server
                return self._json(500, {"error": str(e)})
        return super().do_GET()


if __name__ == "__main__":
    handler = functools.partial(NoCache, directory=str(ROOT))
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as httpd:
        print(f"Serving {ROOT} at http://127.0.0.1:{PORT}", flush=True)
        httpd.serve_forever()
