/**
 * build-logos2.mjs — round two: six variations of the P&L ligature concept
 * for P.L. Sharma And Company. Renders to logos/options2/ and composes
 * logos/contact-sheet-2.png. Same hand-drawn + real-font-outline approach.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(new URL("../../site/package.json", import.meta.url));
const sharp = require("sharp");

const ROOT = path.resolve(import.meta.dirname, "..");
const TOOLS = path.join(ROOT, "tools");
const OUT = path.join(ROOT, "options2");
fs.mkdirSync(OUT, { recursive: true });

// ---------- palette ----------
const NAVY = "#262F3D";
const GOLD = "#C8934F";
const GOLD_BRIGHT = "#D9A866";
const IVORY = "#FAF6EE";

const LIGHT = { bg: IVORY, ink: NAVY, gold: GOLD, sub: "rgba(250,246,238,0.45)" };
const DARK = { bg: NAVY, ink: IVORY, gold: GOLD_BRIGHT, sub: "rgba(38,47,61,0.45)" };

// ---------- glyph data ----------
const read = (f) => JSON.parse(fs.readFileSync(path.join(TOOLS, f), "utf8"));
const pls = read("pls.json");
const plPg = read("pl-pg.json"); // per-glyph P, L
const sharmaPg = read("sharma-pg.json"); // per-glyph "P. L. SHARMA"
const plsCap = pls.capHeight; // 708

function textBlock(json, { size, x, y }) {
  const scale = size / json.upem;
  const paths = json.glyphs
    .map((d) => `<path transform="translate(${x},${y}) scale(${scale},${-scale})" d="${d}"/>`)
    .join("\n      ");
  return { svg: paths, width: json.advanceWidth * scale, capHeight: json.capHeight * scale };
}

/** Hand-drawn rupee sign in a 100x100 box, stroke-based. */
function rupee(x, y, s, color) {
  const st = (d) =>
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s},${s})">
    ${st("M 22,0 L 22,100")}
    ${st("M 22,8 L 78,8 L 78,22")}
    ${st("M 22,30 L 62,30")}
    ${st("M 22,36 L 70,100")}
  </g>`;
}

/** Place glyphs along the top of a circle (notary-seal arc text). */
function arcText(pg, { cx, cy, R, capPx, trackingPx = 0, fill }) {
  const s = capPx / pg.capHeight;
  const glyphs = pg.glyphs;
  const arcLen = glyphs.reduce((a, g) => a + g.adv * s, 0) + trackingPx * (glyphs.length - 1);
  let th = -(arcLen / R) / 2;
  let out = `<g fill="${fill}">`;
  for (const g of glyphs) {
    if (g.d) {
      const deg = ((th * 180) / Math.PI).toFixed(3);
      out += `<path transform="rotate(${deg} ${cx} ${cy}) translate(${cx} ${(cy - R).toFixed(2)}) scale(${s.toFixed(5)},${(-s).toFixed(5)})" d="${g.d}"/>`;
    }
    th += (g.adv * s + trackingPx) / R;
  }
  return out + "</g>";
}

// ---------- variation 1: rounded ligature (round-one option 04, baseline) ----------
// ink = colour of the mark body; cut = colour that shows through the coin ring
function v1Body(p, ink = p.ink, cut = p.bg) {
  return `
  <rect x="176" y="118" width="38" height="280" rx="19" fill="${ink}"/>
  <path fill-rule="evenodd" fill="${ink}" d="M 214,118 H 272 A 71,71 0 0 1 272,260 H 214 V 222 H 268 A 33,33 0 0 0 268,156 H 214 Z"/>
  <rect x="176" y="360" width="192" height="38" rx="19" fill="${ink}"/>
  <circle cx="251" cy="189" r="21" fill="${p.gold}"/>
  <circle cx="251" cy="189" r="13" fill="none" stroke="${cut}" stroke-width="3.5"/>
  <rect x="176" y="424" width="132" height="9" rx="4.5" fill="${p.gold}"/>`;
}

function v1Rounded(p) {
  return `<g transform="translate(-16,-20)">\n${v1Body(p)}\n</g>`;
}

// ---------- variation 2: serif interlock (real Playfair P + gold L) ----------
function v2SerifInterlock(p) {
  const P = plPg.glyphs[0];
  const L = plPg.glyphs[1];
  const s = 280 / plsCap;
  const xu = Math.round(0.42 * P.adv); // L tucked under the P bowl
  const totalW = (xu + L.adv) * s;
  const x0 = (512 - totalW) / 2;
  const baseline = 396;
  return `
  <g fill="${p.gold}">
    <path transform="translate(${(x0 + xu * s).toFixed(2)},${baseline}) scale(${s.toFixed(5)},${(-s).toFixed(5)})" d="${L.d}"/>
  </g>
  <g fill="${p.ink}">
    <path transform="translate(${x0.toFixed(2)},${baseline}) scale(${s.toFixed(5)},${(-s).toFixed(5)})" d="${P.d}"/>
  </g>`;
}

// ---------- variation 3: stacked monogram (P / rupee / L in a ring) ----------
function v3Stacked(p) {
  const P = plPg.glyphs[0];
  const L = plPg.glyphs[1];
  const s = 120 / plsCap;
  const px = 256 - (P.adv * s) / 2;
  const lx = 256 - (L.adv * s) / 2;
  return `
  <circle cx="256" cy="256" r="220" fill="none" stroke="${p.gold}" stroke-width="3"/>
  <circle cx="256" cy="256" r="208" fill="none" stroke="${p.sub}" stroke-width="1.5"/>
  <g fill="${p.ink}">
    <path transform="translate(${px.toFixed(2)},195) scale(${s.toFixed(5)},${(-s).toFixed(5)})" d="${P.d}"/>
    <path transform="translate(${lx.toFixed(2)},435) scale(${s.toFixed(5)},${(-s).toFixed(5)})" d="${L.d}"/>
  </g>
  ${rupee(224, 225, 0.62, p.gold)}`;
}

// ---------- variation 4: notary seal (arc text + ligature + ornaments) ----------
function v4Seal(p) {
  return `
  <circle cx="256" cy="256" r="234" fill="none" stroke="${p.gold}" stroke-width="3"/>
  <circle cx="256" cy="256" r="222" fill="none" stroke="${p.sub}" stroke-width="1.5"/>
  ${arcText(sharmaPg, { cx: 256, cy: 256, R: 192, capPx: 26, trackingPx: 1.5, fill: p.ink })}
  <g transform="translate(256,268) scale(0.52) translate(-256,-265.5)">
    <g transform="translate(-16,-20)">
      ${v1Body(p)}
    </g>
  </g>
  <path d="M 256,403 L 265,412 L 256,421 L 247,412 Z" fill="${p.gold}"/>
  <circle cx="204" cy="412" r="3.5" fill="${p.gold}"/>
  <circle cx="308" cy="412" r="3.5" fill="${p.gold}"/>`;
}

// ---------- variation 5: diamond lozenge ----------
function v5Lozenge(p) {
  return `
  <rect x="136" y="136" width="240" height="240" transform="rotate(45 256 256)" fill="${p.ink}"/>
  <rect x="149" y="149" width="214" height="214" transform="rotate(45 256 256)" fill="none" stroke="${p.gold}" stroke-width="4"/>
  <g transform="translate(256,256) scale(0.5) translate(-256,-255.5)">
    <g transform="translate(-16,-20)">
      ${v1Body(p, p.bg, p.ink)}
    </g>
  </g>`;
}

// ---------- variation 6: minimal monogram (stroke-built, airy) ----------
function v6Minimal(p) {
  return `
  <path d="M 161,96 L 161,416" fill="none" stroke="${p.ink}" stroke-width="34" stroke-linecap="round"/>
  <circle cx="225" cy="160" r="64" fill="none" stroke="${p.ink}" stroke-width="34"/>
  <path d="M 161,399 L 351,399" fill="none" stroke="${p.ink}" stroke-width="34" stroke-linecap="round"/>
  <circle cx="225" cy="160" r="24" fill="${p.gold}"/>
  <circle cx="225" cy="160" r="8" fill="${p.bg}"/>`;
}

const marks = [
  { name: "r1-rounded-ligature", fn: v1Rounded, desc: "e1" },
  { name: "r2-serif-interlock", fn: v2SerifInterlock, desc: "e2" },
  { name: "r3-stacked-monogram", fn: v3Stacked, desc: "e3" },
  { name: "r4-notary-seal", fn: v4Seal, desc: "e4" },
  { name: "r5-diamond-lozenge", fn: v5Lozenge, desc: "e5" },
  { name: "r6-minimal-monogram", fn: v6Minimal, desc: "e6" },
];

function wrap(body, p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${p.bg}"/>
  ${body}
</svg>`;
}

// ---------- render marks ----------
const pngs = {};
for (const m of marks) {
  for (const [variant, p] of [["light", LIGHT], ["dark", DARK]]) {
    const svg = wrap(m.fn(p), p);
    fs.writeFileSync(path.join(OUT, `${m.name}-${variant}.svg`), svg);
    const buf = await sharp(Buffer.from(svg), { density: 96 }).resize(512, 512).png().toBuffer();
    pngs[`${m.name}-${variant}`] = buf;
    await sharp(buf).toFile(path.join(OUT, `${m.name}-${variant}.png`));
  }
}
console.log("marks rendered");

// ---------- contact sheet ----------
const TILE = 250;
const GAP = 26;
const ROW_H = TILE + 30;
const W = 1180;
const ROW0 = 180;
const H = ROW0 + marks.length * ROW_H + 50;

const title = read("title.json");
const sub = read("sub2.json");
const option = read("option.json");
const titleBlock = textBlock(title, { size: 1000 * (500 / title.advanceWidth), x: 60, y: 86 });
const subBlock = textBlock(sub, { size: 1000 * (330 / sub.advanceWidth), x: 60, y: 128 });

const composites = [];
let y = ROW0;
for (let i = 0; i < marks.length; i++) {
  const m = marks[i];
  const lightPng = await sharp(pngs[`${m.name}-light`]).resize(TILE, TILE).png().toBuffer();
  const darkPng = await sharp(pngs[`${m.name}-dark`]).resize(TILE, TILE).png().toBuffer();
  composites.push({ input: lightPng, left: 60, top: y });
  composites.push({ input: darkPng, left: 60 + TILE + GAP, top: y });

  const num = read(`n0${i + 1}.json`);
  const desc = read(`${m.desc}.json`);
  const optScale = 110 / option.advanceWidth;
  const numScale = 44 / num.advanceWidth;
  const descScale = Math.min(500 / desc.advanceWidth, 0.052);
  const lx = 60 + 2 * (TILE + GAP) + 26;
  const labelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W - lx}" height="${TILE}">
    <g fill="#A9722F">${textBlock(option, { size: 1000 * optScale, x: 0, y: 40 }).svg}</g>
    <g fill="#262F3D">${textBlock(num, { size: 1000 * numScale, x: 150, y: 52 }).svg}</g>
    <g fill="#262F3D">${textBlock(desc, { size: 1000 * descScale, x: 0, y: 150 }).svg}</g>
    <rect x="0" y="180" width="120" height="5" rx="2.5" fill="#C8934F"/>
  </svg>`;
  composites.push({ input: await sharp(Buffer.from(labelSvg)).png().toBuffer(), left: lx, top: y + 30 });

  y += ROW_H;
}

const baseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#FAF6EE"/>
  <rect width="${W}" height="6" fill="#C8934F"/>
  <g fill="#262F3D">${titleBlock.svg}</g>
  <g fill="#A9722F">${subBlock.svg}</g>
  <rect x="60" y="146" width="180" height="4" fill="#C8934F"/>
</svg>`;

await sharp(Buffer.from(baseSVG))
  .composite(composites)
  .png()
  .toFile(path.join(ROOT, "contact-sheet-2.png"));

console.log(`contact sheet written: ${path.join(ROOT, "contact-sheet-2.png")} (${W}x${H})`);
