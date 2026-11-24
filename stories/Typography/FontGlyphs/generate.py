"""Rebuild the gallery with fonttools[woff]: python3 generate.py "SB Sans 1811.zip"."""

import json
import re
import sys
from collections import defaultdict
from io import BytesIO
from pathlib import Path
from zipfile import ZipFile

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent
LIBRARY_FONTS = ROOT.parents[2] / "public/assets/fonts"
DATA = ROOT / "data"


def export_face(filename, content, family):
    font = TTFont(BytesIO(content))
    glyph_set = font.getGlyphSet()
    codes = defaultdict(list)
    for code, name in sorted(font.getBestCmap().items()):
        codes[name].append(code)

    rows = []
    for gid, name in enumerate(font.getGlyphOrder()):
        pen = SVGPathPen(glyph_set)
        glyph_set[name].draw(pen)
        glyph = font["glyf"][name]
        left = min(0, getattr(glyph, "xMin", 0))
        right = max(glyph_set[name].width, getattr(glyph, "xMax", 0))
        top = max(font["hhea"].ascent, getattr(glyph, "yMax", 0))
        bottom = min(font["hhea"].descent, getattr(glyph, "yMin", 0))
        rows.append({
            "gid": gid, "name": name, "codes": codes[name], "path": pen.getCommands(),
            "viewBox": f"{left} {-top} {max(1, right - left)} {top - bottom}",
        })

    # Keep aliases on one card and place alternate/unencoded forms after Unicode.
    rows.sort(key=lambda row: (not row["codes"], not row["path"], min(row["codes"], default=sys.maxsize)))
    face_id = Path(filename).stem
    with (DATA / f"{face_id}.json").open("w") as out:
        out.write("[\n" + ",\n".join(json.dumps(row, separators=(",", ":")) for row in rows) + "\n]\n")

    style = face_id.split("-")[1].replace("SemiBold", "Semibold")
    style = re.sub(r"(?<!^)([A-Z])", r" \1", style)
    library_file = LIBRARY_FONTS / filename
    return {
        "id": face_id, "family": family, "style": style,
        "inLibrary": library_file.exists() and library_file.read_bytes() == content,
    }


def main(archive):
    DATA.mkdir(exist_ok=True)
    faces = []
    with ZipFile(archive) as fonts:
        for member in fonts.namelist():
            path = Path(member)
            if "WEB" in path.parts and path.suffix == ".woff2" and "__MACOSX" not in path.parts:
                faces.append(export_face(path.name, fonts.read(member), path.parts[0]))
    mono = LIBRARY_FONTS / "SBSansTextMono-Regular.woff2"
    faces.append(export_face(mono.name, mono.read_bytes(), "SB Sans Text Mono"))
    styles = ["Thin", "Light", "Light Italic", "Regular", "Italic", "Medium",
              "Semibold", "Semibold Italic", "Bold", "Bold Italic", "Heavy", "Extended Semibold"]
    faces.sort(key=lambda face: (face["family"], styles.index(face["style"])))
    (ROOT / "faces.json").write_text(json.dumps(faces, indent=2) + "\n")


if __name__ == "__main__":
    main(sys.argv[1])
