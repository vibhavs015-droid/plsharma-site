/**
 * Founder plate — one-off build-time asset step.
 * Spec: docs/design/phase-2/tokens.md §7 (crop, grade, size, acceptance test).
 *
 * What it does:
 *   1. Crops public/images/father.jpg (1000×1334) to the exact 4:5 plate
 *      (360×450) that keeps head/neck/shoulder and cuts above the raised hand.
 *   2. Grades the green/cyan cast at channel level (recomb matrix), then
 *      desaturates and lifts brightness slightly.
 *   3. Re-runs the art-director's acceptance test on the graded crop
 *      (plate-local patch means). Exits 1 if any threshold fails — in that
 *      case the plate must NOT be used on the hero (fallback: type-only hero,
 *      name/role link to /about only).
 *   4. On success, writes 600×750 (lanczos3) AVIF + WebP next to the source.
 *      The original father.jpg is never modified.
 *
 * Dev-only usage (from site/):  node tools/process-founder-photo.mjs
 */
import sharp from "sharp";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url); // site/
const src = fileURLToPath(new URL("public/images/father.jpg", root));
const outWebp = fileURLToPath(new URL("public/images/founder-plate.webp", root));
const outAvif = fileURLToPath(new URL("public/images/founder-plate.avif", root));

/* §7.1 — exact crop in source pixels: 4:5, top leaves ~45px above the crown,
   bottom sits above the raised hand, face centred. */
const CROP = { left: 258, top: 150, width: 360, height: 450 };

/* §7.2 — exact grade: lift red, trim green, leave blue; then desaturate and
   brighten. Order matters (recomb before modulate), as specified. */
const MATRIX = [
  [1.42, 0.01, 0.0],
  [0.04, 0.82, 0.02],
  [0.04, 0.02, 0.96],
];

/* §7.2 — acceptance patches, plate-local on the 360×450 crop. */
const PATCHES = [
  { name: "cheek", x: 112, y: 285, w: 80, h: 45, check: "G/R", max: 0.85 },
  { name: "forehead", x: 120, y: 140, w: 90, h: 50, check: "G/R", max: 0.88 },
  { name: "neck", x: 150, y: 360, w: 60, h: 40, check: "G/R", max: 0.85 },
  { name: "background", x: 25, y: 20, w: 90, h: 70, check: "B/R", max: 1.2 },
];

function ratio(stats, num, den) {
  return stats.channels[num].mean / stats.channels[den].mean;
}

const meta = await sharp(src).metadata();
if (meta.width !== 1000 || meta.height !== 1334) {
  console.warn(
    `warning: expected father.jpg 1000×1334, found ${meta.width}×${meta.height} — ` +
      `the crop constants assume the source the art-director measured; verify before shipping.`
  );
}

/* The graded 360×450 crop, as a lossless buffer, so the acceptance patches
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

/* Output 600×750 (×1.67 lanczos3) as AVIF + WebP. Never touches the original. */
const plate = sharp(gradedCrop).resize(600, 750, { kernel: "lanczos3" });
const webp = await plate.clone().webp({ quality: 85 }).toFile(outWebp);
const avif = await plate.clone().avif({ quality: 80 }).toFile(outAvif);
console.log(
  `\nOK — wrote founder-plate.webp (${webp.width}×${webp.height}, ` +
    `${(webp.size / 1024).toFixed(1)} KB) and founder-plate.avif (${(avif.size / 1024).toFixed(1)} KB).`
);
