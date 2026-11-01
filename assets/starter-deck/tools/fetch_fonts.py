"""Download the deck's web fonts from Google Fonts into fonts/ and rewrite css/fonts.css with local
@font-face rules (latin and latin-ext subsets only), so the deck works offline. Run it once before the talk.
The fonts are under the SIL Open Font License (openfontlicense.org).

    python tools/fetch_fonts.py

A talk in a language outside latin and latin-ext adds that subset to KEEP (for example "greek",
"cyrillic", "vietnamese"); scripts such as Chinese, Japanese or Korean need their own font family.
"""
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "fonts"
CSS_OUT = ROOT / "css" / "fonts.css"
API = ("https://fonts.googleapis.com/css2?"
       "family=Inter:wght@400..700"
       "&family=Inter+Tight:wght@500..700"
       "&family=JetBrains+Mono:wght@400..600"
       "&family=STIX+Two+Text:ital,wght@0,400..600;1,400..600"
       "&display=swap")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
KEEP = {"latin", "latin-ext"}


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


css = get(API).decode("utf-8")
blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]*\})", css)
FONTS.mkdir(exist_ok=True)
out = ["/* Local copies of Google Fonts (SIL Open Font License). Built by tools/fetch_fonts.py */"]
n = 0
for subset, block in blocks:
    if subset not in KEEP:
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    style = re.search(r"font-style:\s*(\w+)", block).group(1)
    url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
    name = f"{fam.replace(' ', '')}-{style}-{subset}.woff2"
    (FONTS / name).write_bytes(get(url))
    out.append(block.replace(url, f"../fonts/{name}"))
    n += 1
CSS_OUT.write_text("\n".join(out) + "\n", encoding="utf-8")
print(n, "font files ->", FONTS)
