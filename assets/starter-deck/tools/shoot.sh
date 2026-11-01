#!/usr/bin/env bash
# Render slides to PNG with headless Edge in static mode (no motion).
# Usage: tools/shoot.sh OUTDIR "1" "2/3" "17" ...   (slide or slide/step, 1-based)
# Requires tools/serve.py running on port 8765. THEME=paper for the light theme.
E="${EDGE:-/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe}"
mkdir -p "$1"
OUT="$(cd "$1" && (pwd -W 2>/dev/null || pwd))"; shift   # absolute: Edge does not resolve relative paths against this shell
PROF="$OUT/.edgeprof"
THEME="${THEME:-ink}"
for h in "$@"; do
  name="s$(echo "$h" | tr '/' '_')"
  timeout 60 "$E" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$PROF" \
    --window-size=1920,1080 --virtual-time-budget=${BUDGET:-7000} \
    --screenshot="$OUT/$name.png" "http://127.0.0.1:8765/?static=1&theme=$THEME#/$h" >/dev/null 2>&1
  if [ -s "$OUT/$name.png" ]; then echo "$OUT/$name.png"; else echo "FAILED $h" >&2; fi
done
