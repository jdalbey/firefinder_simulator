
#!/usr/bin/env python3
# image-edge-bearing

import sys
from PIL import Image

def dms_to_degrees(d, m, s):
    sign = -1 if d < 0 else 1
    return sign * (abs(d) + m / 60.0 + s / 3600.0)

def main():
    if len(sys.argv) != 2:
        print("Usage: image-edge-bearing <image_file>", file=sys.stderr)
        sys.exit(1)

    image_file = sys.argv[1]
    with Image.open(image_file) as img:
        image_width = img.width
    print ("Image width is ",image_width)
    features = []

    while True:
        print ("Enter feature values:  x, deg, min (no commas, Ctrl-D when done.")
        try:
            line = input().strip()
        except EOFError:
            break

        if not line:
            continue

        parts = line.split()
        if len(parts) != 3:
            print("Each feature must be: x degrees minutes ", file=sys.stderr)
            sys.exit(1)

        x = float(parts[0])
        deg = float(parts[1])
        minute = float(parts[2])

        bearing = dms_to_degrees(deg, minute, 0)
        features.append((x, bearing))

    if len(features) < 2:
        print("Need at least two features.", file=sys.stderr)
        sys.exit(1)

    left_bearings = []
    right_bearings = []

    n = len(features)
    for i in range(n):
        x1, b1 = features[i]
        for j in range(i + 1, n):
            x2, b2 = features[j]
            if x1 == x2:
                continue

            slope = (b2 - b1) / (x2 - x1)
            intercept = b1 - slope * x1

            left_bearings.append(intercept)
            right_bearings.append(slope * (image_width - 1) + intercept)

    if not left_bearings:
        print("No valid feature pairs.", file=sys.stderr)
        sys.exit(1)

    left_edge_bearing = sum(left_bearings) / len(left_bearings)
    right_edge_bearing = sum(right_bearings) / len(right_bearings)

    print(f"Left edge: {left_edge_bearing:.6f}")
    print(f"Right edge: {right_edge_bearing:.6f}")

if __name__ == "__main__":
    main()
