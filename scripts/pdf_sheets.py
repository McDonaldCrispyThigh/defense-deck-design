"""Contact sheets rendered from the finished PDF itself (4 x 4 pages per sheet, page numbers labelled)."""
import sys
from pathlib import Path

import fitz
from PIL import Image, ImageDraw

pdf, out = fitz.open(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
w, h, cols, per = 480, 270, 4, 16
for si in range(0, pdf.page_count, per):
    group = range(si, min(si + per, pdf.page_count))
    rows = (len(group) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * (w + 6), rows * (h + 22)), (255, 255, 255))
    d = ImageDraw.Draw(sheet)
    for i, p in enumerate(group):
        pix = pdf[p].get_pixmap(matrix=fitz.Matrix(w / 960, h / 540))
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        x, y = (i % cols) * (w + 6), (i // cols) * (h + 22)
        sheet.paste(im, (x, y + 20))
        d.text((x + 4, y + 4), f"p{p + 1}", fill=(0, 0, 0))
    sheet.save(out / f"sheet{si // per + 1}.png")
print("sheets:", (pdf.page_count + per - 1) // per)
