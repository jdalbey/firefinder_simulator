"""
Download OpenTopoMap tiles for offline use.
Run once on wifi from the mockup/ folder:  python3 fetch_tiles.py
Tiles are saved to mockup/tiles/{z}/{x}/{y}.png
  │ Zoom │ #Tiles │ Area
  │ 14   │ ~20    │ 1.5 sq mi
  │ 15   │ ~80    │
  │ 16   │ ~320   │
  │ 17   │ ~1280  │
"""

import math, os, time, urllib.request

# ── Bounding box (adjust to cover your area) ──────────────────────────
# Center: Delilah lookout  36.80454, -119.11755
# This covers roughly 6 x 6 miles around the tower.
LAT_MIN = 36.73 # Bear Mtn
LAT_MAX = 36.9  # N. side Pine Flat Lake
LON_MIN = -119.36  # Tivy Mtn
LON_MAX = -119.00  # Millwood

ZOOM_MIN = 12   # broad context = 12
ZOOM_MAX = 12   # zoomed max is 17   

OUTPUT  = "tiles"  # foldername
DELAY   = 0.6   # seconds between requests (stays under 2 req/s limit)

# ── Tile math ──────────────────────────────────────────────────────────
def deg2tile(lat, lon, z):
    n   = 2 ** z
    x   = int((lon + 180.0) / 360.0 * n)
    lat_r = math.radians(lat)
    y   = int((1.0 - math.asinh(math.tan(lat_r)) / math.pi) / 2.0 * n)
    return x, y

# ── Download ───────────────────────────────────────────────────────────
headers = {'User-Agent': 'FireLookoutTrainer/1.0 (offline tile cache)'}
total_downloaded = 0
total_skipped    = 0

for z in range(ZOOM_MIN, ZOOM_MAX + 1):
    x_min, y_max = deg2tile(LAT_MIN, LON_MIN, z)
    x_max, y_min = deg2tile(LAT_MAX, LON_MAX, z)
    count = (x_max - x_min + 1) * (y_max - y_min + 1)
    print(f"\nZoom {z}: x {x_min}–{x_max}, y {y_min}–{y_max}  ({count} tiles)")

    for x in range(x_min, x_max + 1):
        for y in range(y_min, y_max + 1):
            path = f"{OUTPUT}/{z}/{x}/{y}.png"
            if os.path.exists(path):
                total_skipped += 1
                continue

            os.makedirs(f"{OUTPUT}/{z}/{x}", exist_ok=True)
            url = f"https://a.tile.opentopomap.org/{z}/{x}/{y}.png"
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=15) as resp:
                    with open(path, 'wb') as f:
                        f.write(resp.read())
                print(f"  {z}/{x}/{y}")
                total_downloaded += 1
                time.sleep(DELAY)
            except Exception as e:
                print(f"  FAILED {z}/{x}/{y}: {e}")

print(f"\nDone. Downloaded: {total_downloaded}  Skipped (cached): {total_skipped}")
