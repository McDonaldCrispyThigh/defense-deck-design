"""Every click state of the deck, captured in ONE headless Edge tab over the DevTools protocol.
Before each capture the page must report the expected slide title and #/n/k state, every image in the
active slide must be loaded, and fonts must be ready; otherwise the state is retried and finally reported.
usage: cdp_render.py PNG_DIR [SUBSET]   SUBSET like "2/3,18/0" (deck server on 127.0.0.1:8765)
writes PNG_DIR/pNN_K.png per click state; needs the websockets package and Microsoft Edge."""
import asyncio
import base64
import json
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

import websockets

PNG = Path(sys.argv[1])
PNG.mkdir(parents=True, exist_ok=True)
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 9333
slides = json.load(urllib.request.urlopen("http://127.0.0.1:8765/api/keywords"))["slides"]
states = [(s["n"], k, s["title"]) for s in slides for k in range(s["builds"])]
if len(sys.argv) > 2:  # optional subset, e.g. "2/3,3/0"
    keep = set(sys.argv[2].split(","))
    states = [x for x in states if f"{x[0]}/{x[1]}" in keep]

CLEAN = """(() => {  // drop anything a browser extension injected; the deck adds only these to <body>
  const deck = new Set(['viewport', 'overview', 'help', 'blackout', 'toast']);
  const gone = [];
  [...document.documentElement.children].forEach(e => { if (e !== document.head && e !== document.body) { gone.push(e.tagName); e.remove(); } });
  [...document.body.children].forEach(e => { if (e.tagName !== 'SCRIPT' && !deck.has(e.id) && !e.classList.contains('navhint')) { gone.push(e.tagName + '#' + e.id); e.remove(); } });
  return gone;
})()"""
CHECK = """(async () => {
  await document.fonts.ready;
  const s = document.querySelector('section.active');
  if (!s) return {ok: false, why: 'no active slide'};
  const imgs = [...s.querySelectorAll('img')];
  const pending = imgs.filter(i => !(i.complete && i.naturalWidth > 0)).length;
  return {ok: true, title: s.dataset.title, hash: location.hash, pending, imgs: imgs.length};
})()"""


async def main():
    prof = PNG / "_prof"
    edge = subprocess.Popen([EDGE, "--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--disable-extensions",
                             f"--user-data-dir={prof}", f"--remote-debugging-port={PORT}", "--window-size=1920,1080",
                             "about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        for _ in range(60):
            try:
                targets = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/list"))
                page = next(t for t in targets if t["type"] == "page")
                break
            except Exception:
                time.sleep(0.5)
        async with websockets.connect(page["webSocketDebuggerUrl"], max_size=None) as ws:
            seq = 0

            async def call(method, **params):
                nonlocal seq
                seq += 1
                await ws.send(json.dumps({"id": seq, "method": method, "params": params}))
                while True:
                    msg = json.loads(await ws.recv())
                    if msg.get("id") == seq:
                        if "error" in msg:
                            raise RuntimeError(f"{method}: {msg['error']}")
                        return msg.get("result", {})

            await call("Page.enable")
            await call("Emulation.setDeviceMetricsOverride", width=1920, height=1080, deviceScaleFactor=1, mobile=False)
            bad = []
            for i, (n, k, title) in enumerate(states):
                want = f"#/{n}" + (f"/{k}" if k else "")
                ok = False
                for attempt in range(4):
                    await call("Page.navigate", url=f"http://127.0.0.1:8765/?static=1&r={i}{attempt}{want}")
                    info = {}
                    for _ in range(40):  # up to ~20 s for the slide, its images and fonts
                        await asyncio.sleep(0.5)
                        try:
                            r = await call("Runtime.evaluate", expression=CHECK, awaitPromise=True, returnByValue=True)
                            info = r["result"].get("value") or {}
                        except RuntimeError:
                            continue
                        if info.get("ok") and info.get("title") == title and info.get("hash") == want and info.get("pending") == 0:
                            break
                    if info.get("title") == title and info.get("hash") == want and info.get("pending") == 0:
                        await asyncio.sleep(1.0)  # let maps and charts finish drawing
                        gone = (await call("Runtime.evaluate", expression=CLEAN, returnByValue=True))["result"].get("value")
                        if gone:
                            print(f"  removed injected nodes on {n}/{k}: {gone}", flush=True)
                        shot = await call("Page.captureScreenshot", format="png")
                        (PNG / f"p{n:02d}_{k}.png").write_bytes(base64.b64decode(shot["data"]))
                        ok = True
                        break
                print(f"{i + 1:3d}/{len(states)} {n:02d}/{k} {'ok' if ok else 'FAILED ' + json.dumps(info)}", flush=True)
                if not ok:
                    bad.append((n, k, info))
            print(f"captured {len(states) - len(bad)} of {len(states)}; failed: {bad}", flush=True)
    finally:
        edge.terminate()
        try:
            edge.wait(timeout=30)
        except subprocess.TimeoutExpired:
            edge.kill()
        time.sleep(2)
        shutil.rmtree(prof, ignore_errors=True)


asyncio.run(main())
