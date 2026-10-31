"""Assemble verified click-state PNGs into one PDF: 960x540 pt pages, bookmarks Talk (1-22) / Supplement (S1-S25).
usage: pdf_assemble.py PNG_DIR OUT.pdf [TITLE] [AUTHOR]   (deck server on 127.0.0.1:8765)"""
import io
import json
import sys
import urllib.request
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

PNG, OUT = Path(sys.argv[1]), Path(sys.argv[2])
slides = json.load(urllib.request.urlopen("http://127.0.0.1:8765/api/keywords"))["slides"]
talk = [s for s in slides if not s["label"].startswith("S")]
doc = fitz.open()
toc = [[1, f"Talk (1–{len(talk)})", 1]]
for s in slides:
    if s["label"] == "S1":
        toc.append([1, f"Supplement (S1–S{len(slides) - len(talk)})", doc.page_count + 1])
    toc.append([2, f"{s['label']} · {s['title']}", doc.page_count + 1])
    for k in range(s["builds"]):
        im = Image.open(PNG / f"p{s['n']:02d}_{k}.png").convert("RGB")
        assert im.size == (1920, 1080), (s["n"], k, im.size)
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=88, optimize=True, progressive=True)
        page = doc.new_page(width=960, height=540)
        page.insert_image(page.rect, stream=buf.getvalue())
doc.set_toc(toc)
doc.set_metadata({"title": sys.argv[3] if len(sys.argv) > 3 else "",
                  "author": sys.argv[4] if len(sys.argv) > 4 else ""})
doc.save(OUT, garbage=4, deflate=True)
print(f"{OUT.name}: {doc.page_count} pages, {OUT.stat().st_size / 1e6:.1f} MB, {len(toc)} bookmarks")
