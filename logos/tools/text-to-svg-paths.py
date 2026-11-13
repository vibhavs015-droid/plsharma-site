"""
text-to-svg-paths.py — convert a string to outlined SVG paths using a font.

Usage:
  python text-to-svg-paths.py <font.woff2> <string> <out.svg> [size] [letterspacing]

Produces an SVG <svg> with one combined <path> (fill=currentColor inherits).
Uses fontTools' SVGPathPen — no font dependency remains in the SVG.
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform


def main():
    font_path, text, out_svg = sys.argv[1], sys.argv[2], sys.argv[3]
    size = float(sys.argv[4]) if len(sys.argv) > 4 else 100.0
    tracking = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0  # extra units

    # If out_svg endswith .json -> emit structured glyph data instead of svg
    json_mode = out_svg.lower().endswith(".json")
    # -pg.json -> per-glyph entries (each path at origin + advance) for arc
    # placement / custom kerning; spaces are emitted with d="".
    per_glyph = out_svg.lower().endswith("-pg.json")

    font = TTFont(font_path)
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    hmtx = font["hmtx"]
    upem = font["head"].unitsPerEm
    cap_height = getattr(font["OS/2"], "sCapHeight", 0) or int(upem * 0.7)

    glyph_list = []  # (glyph_name | None=space, x, advance)
    x = 0.0
    for ch in text:
        if ch == " ":
            adv = hmtx[cmap[32]][0] if 32 in cmap else int(upem * 0.25)
            glyph_list.append((None, x, adv))
            x += adv
            continue
        if ord(ch) not in cmap:
            continue
        gname = cmap[ord(ch)]
        glyph_list.append((gname, x, hmtx[gname][0]))
        x += hmtx[gname][0]
    if tracking:
        n = max(0, len(glyph_list) - 1)
        x += tracking * n

    if json_mode:
        import json
        data = {
            "upem": upem,
            "capHeight": cap_height,
            "advanceWidth": x,
            "glyphs": [],
        }
        if per_glyph:
            for gname, gx, adv in glyph_list:
                if gname is None:
                    data["glyphs"].append({"d": "", "adv": adv})
                else:
                    spen = SVGPathPen(glyph_set)
                    glyph_set[gname].draw(spen)
                    data["glyphs"].append({"d": spen.getCommands(), "adv": adv})
        else:
            for gname, gx, adv in glyph_list:
                if gname is None:
                    continue
                spen = SVGPathPen(glyph_set)
                tpen = TransformPen(spen, Transform(1, 0, 0, 1, gx, 0))
                glyph_set[gname].draw(tpen)
                data["glyphs"].append(spen.getCommands())
        with open(out_svg, "w", encoding="utf-8") as f:
            json.dump(data, f)
        print(f"OK wrote {out_svg} glyphs={len(data['glyphs'])} width={x:.0f}upem cap={cap_height}")
        return

    paths = []
    for gname, gx, adv in glyph_list:
        spen = SVGPathPen(glyph_set)
        tpen = TransformPen(spen, Transform(1, 0, 0, 1, gx, 0))
        glyph_set[gname].draw(tpen)
        d = spen.getCommands()
        if d:
            paths.append(d)

    scale = size / upem
    height = size
    w = x * scale

    body = "\n  ".join(
        f'<path transform="translate(0,{size:.2f}) scale({scale:.6f},-{scale:.6f})" d="{d}"/>'
        for d in paths
    )

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {height:.2f}">\n'
        f"  <g fill=\"currentColor\">\n  {body}\n  </g>\n</svg>\n"
    )
    with open(out_svg, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"OK wrote {out_svg}  width={w:.1f}  glyphs={len(paths)}")


if __name__ == "__main__":
    main()
