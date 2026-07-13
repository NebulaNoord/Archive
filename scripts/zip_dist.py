import os, sys, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
OUT = os.path.join(ROOT, "archive-portfolio.zip")

if not os.path.isdir(DIST):
    print("ERROR: dist/ not found. Run `npm run build` first.", file=sys.stderr)
    sys.exit(1)

if os.path.exists(OUT):
    os.remove(OUT)

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk(DIST):
        for f in files:
            p = os.path.join(root, f)
            z.write(p, os.path.relpath(p, DIST))

size = os.path.getsize(OUT)
print(f"wrote {OUT} ({size:,} bytes)")
print("top-level:", sorted(os.listdir(DIST)))
