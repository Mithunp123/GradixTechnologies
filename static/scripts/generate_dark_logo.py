from pathlib import Path
from PIL import Image


def generate_dark_logo(src: Path, dst: Path) -> None:
    image = Image.open(src).convert("RGBA")
    pixels = image.load()
    width, height = image.size

    # Convert bright, near-white text pixels into dark text while preserving alpha.
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if r > 180 and g > 180 and b > 180:
                pixels[x, y] = (18, 24, 38, a)

    dst.parent.mkdir(parents=True, exist_ok=True)
    image.save(dst, format="PNG")


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[2]
    source = root / "static" / "images" / "gradix_light.png"
    output = root / "static" / "images" / "gradix_dark.png"
    generate_dark_logo(source, output)
    print(f"Generated: {output}")
