/**
 * Founder plate — one-off build-time asset step.
 * Spec: docs/design/phase-2/tokens.md §7 (crop, grade, size, acceptance test).
 *
 * What it does:
 *   1. Crops public/images/father-src.jpg (3072×4096 — the untouched
 *      original; T14-D moved the source off the 1000×1334 father.jpg
 *      downscale) to a 4:5 head+shoulders plate: crown ~7% down with
 *      sensible headroom, eye line and face centre at ~33% (the upper
 *      third), shoulders and the hand-at-collar gesture inside the frame.
 *      (Owner feedback T14-D: the old 360×450 face-only crop was "too
 *      tight" — geometry re-derived, grade untouched.)
 *   2. Grades the green/cyan cast at channel level (recomb matrix), then
 *      desaturates and lifts brightness slightly.
 *   3. Re-runs the art-director's acceptance test on the graded crop
 *      (plate-local patch means; the patches were remapped from the old
 *      crop onto the new one — same source pixels, so the measured values
 *      still match tokens.md §7.2's table). Exits 1 if any threshold
 *      fails — in that case the plate must NOT be used on the hero
 *      (fallback: type-only hero, name/role link to /about only).
 *   4. Applies the shipped polish passes (TASK 1, TOOLING_LOG): global
 *      saturation ×0.75, then a top-region ×0.5 pass behind a gradient
 *      alpha mask that fades out at the crown line — the shade-net strip
 *      gets tamed, the face keeps the global pass only.
 *   5. On success, writes 600×750 (lanczos3) AVIF (q80) + WebP (q85) as
 *      founder-plate-polished.* — the pair Home + /about render. The
 *      originals (father-src.jpg, father.jpg, founder-plate.*) are never
 *      modified.
 *
 * Dev-only usage (from site/):  node tools/process-founder-photo.mjs
 */
import sharp from "sharp";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url); // site/
const src = fileURLToPath(new URL("public/images/father-src.jpg", root));
const outWebp = fileURLToPath(
  new URL("public/images/founder-plate-polished.webp", root)
);
const outAvif = fileURLToPath(
  new URL("public/images/founder-plate-polished.avif", root)
);

/* T14-D — exact crop in source pixels (3072×4096), 4:5: head+shoulders.
   Measured on the father.jpg preview (×3.072): crown y≈205 → local 182
   (7.3% headroom), eye line y≈410 → local 827 (33.1%), chin y≈618 →
   local 1467 (58.7%), hand y≈627–770 → 60–77%, face centred at x=1367
   (crop spans 367–2367). Wider than the §7.1 face-only crop on purpose
   (owner feedback); grade, quality and output size unchanged. */
const CROP = { left: 367, top: 432, width: 2000, height: 2500 };

/* §7.2 — exact grade: lift red, trim green, leave blue; then desaturate and
   brighten. Order matters (recomb before modulate), as specified. */
const MATRIX = [
  [1.42, 0.01, 0.0],
  [0.04, 0.82, 0.02],
  [0.04, 0.02, 0.96],
];

/* §7.2 — acceptance patches, remapped from the old 360×450 plate (origin
   258,150) onto this crop: source = (old + 258,150) × 3.072, local =
   source − (367,432). Same source pixels the art-director measured. */
const PATCHES = [
  { name: "cheek", x: 770, y: 904, w: 246, h: 138, check: "G/R", max: 0.85 },
  { name: "forehead", x: 794, y: 459, w: 276, h: 154, check: "G/R", max: 0.88 },
  { name: "neck", x: 886, y: 1135, w: 184, h: 123, check: "G/R", max: 0.85 },
  { name: "background", x: 502, y: 90, w: 276, h: 215, check: "B/R", max: 1.2 },
];

function ratio(stats, num, den) {
  return stats.channels[num].mean / stats.channels[den].mean;
}

const meta = await sharp(src).metadata();
if (meta.width !== 3072 || meta.height !== 4096) {
  console.warn(
    `warning: expected father-src.jpg 3072×4096, found ${meta.width}×${meta.height} — ` +
      `the crop constants assume the original the geometry was measured on; verify before shipping.`
  );
}

/* The graded crop, as a lossless buffer, so the acceptance patches
   measure exactly the pixels the plate comes from. */
const gradedCrop = await sharp(src)
  .extract(CROP)
  .recomb(MATRIX)
  .modulate({ saturation: 0.55, brightness: 1.06 })
  .png()
  .toBuffer();

let pass = true;
console.log("Acceptance test (tokens.md §7.2) — patch means on the graded crop:");
for (const patch of PATCHES) {
  /* Route through a lossless buffer: with .stats() directly on an extract
     pipeline, this sharp version measures the whole image, not the patch. */
  const patchBuf = await sharp(gradedCrop)
    .extract({ left: patch.x, top: patch.y, width: patch.w, height: patch.h })
    .png()
    .toBuffer();
  const stats = await sharp(patchBuf).stats();
  const r = stats.channels[0].mean;
  const g = stats.channels[1].mean;
  const b = stats.channels[2].mean;
  const value = patch.check === "G/R" ? ratio(stats, 1, 0) : ratio(stats, 2, 0);
  const ok = value <= patch.max;
  pass = pass && ok;
  console.log(
    `  ${patch.name.padEnd(11)} rgb(${[r, g, b].map((v) => v.toFixed(0)).join(", ")})  ` +
      `${patch.check} ${value.toFixed(2)} (max ${patch.max})  ${ok ? "PASS" : "FAIL"}`
  );
}

if (!pass) {
  console.error(
    "\nACCEPTANCE FAILED — do not use the plate on the hero. " +
      "Fallback per tokens.md §7: type-only home hero; name/role links to /about only."
  );
  process.exit(1);
}

/* Output 600×750 (lanczos3 downscale) as AVIF + WebP. Never touches the original. */
const base = await sharp(gradedCrop)
  .resize(600, 750, { kernel: "lanczos3" })
  .modulate({ saturation: 0.75 }) // TASK 1 polish, pass 1: global ×0.75
  .png()
  .toBuffer();

/* TASK 1 polish, pass 2: top-region ×0.5 behind a vertical gradient mask,
   full at the top and fading to nothing at the crown line (182/2500 of
   the crop = 55px of 750) — same "fade ending just above the face"
   behaviour as the shipped plate, geometry re-derived for this crop.
   librsvg needs the xmlns on the SVG root; dest-in keeps the tone-down
   only where the gradient is opaque (TOOLING_LOG). */
const FADE_END = 55;
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="${FADE_END}" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0" stop-color="#fff" stop-opacity="1"/>` +
    `<stop offset="1" stop-color="#fff" stop-opacity="0"/>` +
    `</linearGradient></defs>` +
    `<rect width="600" height="750" fill="url(#g)"/></svg>`
);

const topMasked = await sharp(base)
  .modulate({ saturation: 0.5 })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

const polished = await sharp(base)
  .composite([{ input: topMasked, blend: "over" }])
  .removeAlpha() // residual alpha after compositing is uniformly opaque
  .png()
  .toBuffer();

const webp = await sharp(polished).webp({ quality: 85 }).toFile(outWebp);
const avif = await sharp(polished).avif({ quality: 80 }).toFile(outAvif);
console.log(
  `\nOK — wrote founder-plate-polished.webp (${webp.width}×${webp.height}, ` +
    `${(webp.size / 1024).toFixed(1)} KB) and founder-plate-polished.avif ` +
    `(${avif.width}×${avif.height}, ${(avif.size / 1024).toFixed(1)} KB).`
);
