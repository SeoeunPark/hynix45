#!/usr/bin/env python3
"""Remove white background and crop mascot sprites."""
import argparse
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def is_background(r, g, b, a=255):
    if a < 20:
        return True
    return r > 238 and g > 238 and b > 238


def flood_background(img: Image.Image) -> Image.Image:
    rgba = img.convert('RGBA')
    w, h = rgba.size
    pixels = rgba.load()
    visited = [[False] * w for _ in range(h)]
    q = deque()

    for x in range(w):
        for y in (0, h - 1):
            if is_background(*pixels[x, y]):
                q.append((x, y))
                visited[y][x] = True
    for y in range(h):
        for x in (0, w - 1):
            if not visited[y][x] and is_background(*pixels[x, y]):
                q.append((x, y))
                visited[y][x] = True

    while q:
        x, y = q.popleft()
        pixels[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                if is_background(*pixels[nx, ny]):
                    visited[ny][nx] = True
                    q.append((nx, ny))

    return rgba


def crop_transparent(img: Image.Image, pad: int = 8) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(img.width, x1 + pad)
    y1 = min(img.height, y1 + pad)
    return img.crop((x0, y0, x1, y1))


def process(src: Path, out: Path, pad: int = 10) -> None:
    img = Image.open(src)
    cut = crop_transparent(flood_background(img), pad=pad)
    out.parent.mkdir(parents=True, exist_ok=True)
    cut.save(out, optimize=True)
    print(f'Saved {out} ({cut.width}x{cut.height})')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('src', type=Path)
    parser.add_argument('out', type=Path)
    parser.add_argument('--pad', type=int, default=10)
    args = parser.parse_args()
    process(args.src, args.out, pad=args.pad)


if __name__ == '__main__':
    main()
