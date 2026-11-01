"""Write the sample talk's synthetic data: js/sampledata.js (nights) and js/mapdata.js (a fictional city).

    python tools/build_sample_data.py

Every number in the sample talk is synthetic and comes from this script. A real talk replaces both files
with its own derived data, built by its own tools/build_*.py, and keeps raw or private records out of the
deck. Standard library only; the fixed seed makes the output identical on every run.
"""
import json
import math
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEED = 7
ENOUGH = 420  # minutes: the 7-hour verdict
AGREE = 30    # minutes: phone within this many minutes of the lab counts as agreement


def nights(seed):
    rnd = random.Random(seed)
    rows = []
    for i in range(40):
        pid = f"P{i + 1:03d}"
        shift = i % 5 in (1, 3)  # 16 shift workers, 24 day workers
        for night in (1, 2, 3):
            lab = rnd.gauss(392, 46) if shift else rnd.gauss(424, 34)
            bias = 22 if shift else 6
            phone = lab + bias + rnd.gauss(0, 26 if shift else 15)
            rows.append({"p": pid, "n": night, "shift": shift, "lab": round(lab), "phone": round(phone)})
    # the running examples: one night (P014, night 3) and one shift worker (P027)
    for r in rows:
        if r["p"] == "P014" and r["n"] == 3:
            r.update(shift=True, lab=396, phone=444)
        if r["p"] == "P027":
            r["shift"] = True
            r.update({1: dict(lab=405, phone=431), 2: dict(lab=388, phone=426), 3: dict(lab=446, phone=459)}[r["n"]])
    return rows


def stats(rows):
    agree = sum(abs(r["phone"] - r["lab"]) <= AGREE for r in rows)
    flips = lambda g: sum((r["phone"] >= ENOUGH) != (r["lab"] >= ENOUGH) for r in g)
    shift = [r for r in rows if r["shift"]]
    day = [r for r in rows if not r["shift"]]
    return {"nights": len(rows), "agree": agree, "shift_nights": len(shift), "shift_flips": flips(shift),
            "day_nights": len(day), "day_flips": flips(day)}


def pick_seed():
    """First seed from SEED on whose data the sample talk's rounded statements hold."""
    s = SEED
    while True:
        st = stats(nights(s))
        if (st["agree"] == 96 and st["shift_nights"] == 48 and 9 <= st["shift_flips"] <= 10
                and st["day_flips"] <= 6):
            return s
        s += 1


def city(seed):
    """A fictional city: 8 x 6 districts on a jittered grid, a river, three clinics. 1 unit = 50 m."""
    rnd = random.Random(seed)
    W, H, nx, ny = 480, 320, 8, 6
    pts = [[(W * i / nx + (rnd.uniform(-14, 14) if 0 < i < nx else 0),
             H * j / ny + (rnd.uniform(-12, 12) if 0 < j < ny else 0)) for j in range(ny + 1)] for i in range(nx + 1)]
    fmt = lambda p: f"{p[0]:.1f} {p[1]:.1f}"
    areas = []
    for i in range(nx):
        for j in range(ny):
            q = [pts[i][j], pts[i + 1][j], pts[i + 1][j + 1], pts[i][j + 1]]
            cx, cy = sum(p[0] for p in q) / 4, sum(p[1] for p in q) / 4
            areas.append({"id": f"D{i + 1}{chr(65 + j)}", "d": "M" + "L".join(fmt(p) for p in q) + "Z",
                          "c": [round(cx, 1), round(cy, 1)], "n": 0})
    # river: a band along a sine curve
    top = [(x, 150 + 46 * math.sin(x / 75) - 7) for x in range(0, W + 1, 12)]
    bot = [(x, y + 14) for x, y in top][::-1]
    water = "M" + "L".join(fmt(p) for p in top + bot) + "Z"
    clinics = [{"name": "Clinic A", "xy": [118, 92]}, {"name": "Clinic B", "xy": [300, 236]}, {"name": "Clinic C", "xy": [392, 70]}]
    # 40 participants, drawn towards the clinics
    for _ in range(40):
        c = rnd.choice(clinics)["xy"]
        x, y = c[0] + rnd.gauss(0, 46), c[1] + rnd.gauss(0, 38)
        a = min(areas, key=lambda a: (a["c"][0] - x) ** 2 + (a["c"][1] - y) ** 2)
        a["n"] += 1
    return {"units": "km", "metersPerUnit": 50, "box": [0, 0, W, H], "water": water, "areas": areas, "clinics": clinics}


def main():
    seed = pick_seed()
    rows = nights(seed)
    st = stats(rows)
    night = {"start": "23:00", "minutes": 480, "lab": [[20, 190], [218, 338], [358, 464]], "phone": [[14, 200], [208, 466]]}
    data = {"seed": seed, "enough": ENOUGH, "agree": AGREE, "stats": st, "nights": rows, "night": night}
    (ROOT / "js" / "sampledata.js").write_text(
        "/* Synthetic data for the sample talk, written by tools/build_sample_data.py. Not real measurements. */\n"
        f"window.SAMPLE = {json.dumps(data, separators=(',', ':'))};\n", encoding="utf-8", newline="\n")
    m = city(seed)
    (ROOT / "js" / "mapdata.js").write_text(
        "/* A fictional city for the sample talk, written by tools/build_sample_data.py. 1 map unit = 50 m, north up. */\n"
        f"window.MAPDATA = {json.dumps(m, separators=(',', ':'))};\n", encoding="utf-8", newline="\n")
    print("seed", seed, st)
    print("areas with participants", sum(a["n"] > 0 for a in m["areas"]), "max", max(a["n"] for a in m["areas"]))


if __name__ == "__main__":
    main()
