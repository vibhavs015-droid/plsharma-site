/**
 * build-logos.mjs — hand-crafted logo exploration for P.L. Sharma And Company.
 *
 * Five unique marks, each in two colour variants (on-light / on-dark),
 * rendered to PNG with sharp, then composed into one labelled contact sheet.
 *
 * All typography inside the SVGs is REAL font outlines (Playfair Display,
 * extracted via fontTools) — no font dependency, no <text> elements.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// sharp lives in the site package; resolve it explicitly
const require = createRequire(new URL("../../site/package.json", import.meta.url));
const sharp = require("sharp");

const ROOT = path.resolve(import.meta.dirname, "..");
const TOOLS = path.join(ROOT, "tools");
const OUT = path.join(ROOT, "options");
fs.mkdirSync(OUT, { recursive: true });

// ---------- palette ----------
const NAVY = "#262F3D";
const GOLD = "#C8934F";
const GOLD_BRIGHT = "#D9A866";
const IVORY = "#FAF6EE";

// bg = surface the mark sits on; ink = primary shape colour; sub = ghost
// detail lines that sit ON ink surfaces; gold = accent metal.
const LIGHT = { bg: IVORY, ink: NAVY, gold: GOLD, sub: "rgba(250,246,238,0.45)" };
const DARK = { bg: NAVY, ink: IVORY, gold: GOLD_BRIGHT, sub: "rgba(38,47,61,0.45)" };

// ---------- glyph outlines ----------
const read = (f) => JSON.parse(fs.readFileSync(path.join(TOOLS, f), "utf8"));
const pls = read("pls.json");

function textBlock(json, { size, x, y }) {
  // glyph coords are in font units (upem=1000). scale = size / upem
  const scale = size / json.upem;
  const paths = json.glyphs
    .map((d) => `<path transform="translate(${x},${y}) scale(${scale},${-scale})" d="${d}"/>`)
    .join("\n      ");
  return { svg: paths, width: json.advanceWidth * scale, capHeight: json.capHeight * scale };
}

// ---------- shared scales core ----------
// Drawn to sit ON an ink-filled surface, so strokes use p.bg (contrast) and
// metal parts use p.gold. postLen: how far the post runs below the bar pivot.
function scalesCore(p, cx, cy, s, postLen = 92) {
  const st = (d, w, col, cap = "round") =>
    `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="${cap}"/>`;
  const post = `M ${cx},${cy - 96 * s} L ${cx},${cy + postLen * s}`;
  const bar = `M ${cx - 47 * s},${cy - 58 * s} L ${cx + 47 * s},${cy - 58 * s}`;
  // V-strings: both strings of a pan hang from the same hook at the bar end
  const hooks = [
    [[-47, -58], [-66, -20]], [[-47, -58], [-28, -20]],
    [[47, -58], [28, -20]], [[47, -58], [66, -20]],
  ];
  const strings = hooks
    .map(([a, b]) => `M ${cx + a[0] * s},${cy + a[1] * s} L ${cx + b[0] * s},${cy + b[1] * s}`)
    .map((d) => st(d, 4.5 * s, p.bg))
    .join("");
  // pans: semicircular cups hanging below their rim line
  const cupL = `M ${cx - 66 * s},${cy - 20 * s} A ${19 * s},${19 * s} 0 0 0 ${cx - 28 * s},${cy - 20 * s} Z`;
  const cupR = `M ${cx + 28 * s},${cy - 20 * s} A ${19 * s},${19 * s} 0 0 0 ${cx + 66 * s},${cy - 20 * s} Z`;
  const rims =
    st(`M ${cx - 66 * s},${cy - 20 * s} L ${cx - 28 * s},${cy - 20 * s}`, 3.5 * s, p.bg, "butt") +
    st(`M ${cx + 28 * s},${cy - 20 * s} L ${cx + 66 * s},${cy - 20 * s}`, 3.5 * s, p.bg, "butt");
  const finial = `M ${cx},${cy - 119 * s} L ${cx + 11 * s},${cy - 108 * s} L ${cx},${cy - 97 * s} L ${cx - 11 * s},${cy - 108 * s} Z`;
  return (
    st(post, 9 * s, p.bg) +
    st(bar, 9 * s, p.bg) +
    strings +
    `<path d="${cupL}" fill="${p.gold}"/><path d="${cupR}" fill="${p.gold}"/>` +
    rims +
    `<path d="${finial}" fill="${p.gold}"/>` +
    `<circle cx="${cx}" cy="${cy + 6 * s}" r="${13 * s}" fill="${p.gold}"/>`
  );
}

// ---------- marks ----------
function m1ScalesRoundel(p) {
  return `
  <circle cx="256" cy="256" r="244" fill="${p.ink}"/>
  <circle cx="256" cy="256" r="222" fill="none" stroke="${p.gold}" stroke-width="5"/>
  <circle cx="256" cy="256" r="206" fill="none" stroke="${p.sub}" stroke-width="2"/>
  ${scalesCore(p, 256, 244, 1.06)}
  <rect x="222" y="332" width="68" height="10" rx="5" fill="${p.bg}"/>
  <rect x="204" y="348" width="104" height="13" rx="6" fill="${p.bg}"/>
  <rect x="192" y="370" width="128" height="5" rx="2.5" fill="${p.gold}"/>`;
}

function m2MonogramCrest(p) {
  // "PLS" set from real Playfair outlines, centred in the roundel
  const w = pls.advanceWidth * (1000 / pls.upem); // rendered width at size 1000
  const s = 208 / w;
  const capH = pls.capHeight * s;
  const bx = 256 - 104;
  const baseline = 268 + capH / 2;
  return `
  <circle cx="256" cy="256" r="244" fill="${p.ink}"/>
  <circle cx="256" cy="256" r="224" fill="none" stroke="${p.gold}" stroke-width="5"/>
  <circle cx="256" cy="256" r="208" fill="none" stroke="${p.sub}" stroke-width="2"/>
  <path d="M 256,154 L 267,165 L 256,176 L 245,165 Z" fill="${p.gold}"/>
  <g fill="${p.bg}">
    ${textBlock(pls, { size: 1000 * s, x: bx, y: baseline }).svg}
  </g>
  <rect x="200" y="356" width="112" height="4" rx="2" fill="${p.gold}"/>
  <rect x="214" y="372" width="84" height="4" rx="2" fill="${p.sub}"/>`;
}

function m3PillarLedger(p) {
  return `
  <rect x="24" y="24" width="464" height="464" rx="110" fill="${p.ink}"/>
  <rect x="50" y="50" width="412" height="412" rx="86" fill="none" stroke="${p.gold}" stroke-width="5"/>
  <!-- capital -->
  <rect x="196" y="146" width="120" height="30" rx="8" fill="${p.gold}"/>
  <rect x="204" y="184" width="104" height="6" rx="3" fill="${p.sub}"/>
  <!-- shaft -->
  <rect x="238" y="200" width="36" height="128" rx="4" fill="${p.bg}"/>
  <rect x="247" y="206" width="6" height="116" rx="3" fill="${p.sub}"/>
  <rect x="259" y="206" width="6" height="116" rx="3" fill="${p.sub}"/>
  <!-- base -->
  <rect x="208" y="334" width="96" height="16" rx="6" fill="${p.bg}"/>
  <rect x="192" y="356" width="128" height="18" rx="7" fill="${p.gold}"/>
  <!-- ledger stack -->
  <rect x="166" y="396" width="180" height="11" rx="5.5" fill="${p.bg}" opacity="0.85"/>
  <rect x="166" y="413" width="180" height="11" rx="5.5" fill="${p.bg}" opacity="0.6"/>
  <rect x="166" y="430" width="180" height="11" rx="5.5" fill="${p.bg}" opacity="0.4"/>`;
}

function m4PllLigature(p) {
  return `
  <g transform="translate(-16,-20)">
  <!-- stem -->
  <rect x="176" y="118" width="38" height="280" rx="19" fill="${p.ink}"/>
  <!-- P bowl (ring with counter) -->
  <path fill-rule="evenodd" fill="${p.ink}" d="M 214,118 H 272 A 71,71 0 0 1 272,260 H 214 V 222 H 268 A 33,33 0 0 0 268,156 H 214 Z"/>
  <!-- L foot -->
  <rect x="176" y="360" width="192" height="38" rx="19" fill="${p.ink}"/>
  <!-- rupee coin in the counter -->
  <circle cx="251" cy="189" r="21" fill="${p.gold}"/>
  <circle cx="251" cy="189" r="13" fill="none" stroke="${p.bg}" stroke-width="3.5"/>
  <!-- gold ledger tick under the foot -->
  <rect x="176" y="424" width="132" height="9" rx="4.5" fill="${p.gold}"/>
  </g>`;
}

function m5TrustShield(p) {
  const shield =
    "M 256,58 C 320,84 372,96 416,100 L 416,236 C 416,336 356,416 256,454 C 156,416 96,336 96,236 L 96,100 C 140,96 192,84 256,58 Z";
  const inner =
    "M 256,86 C 310,107 352,117 388,121 L 388,236 C 388,320 338,388 256,421 C 174,388 124,320 124,236 L 124,121 C 160,117 202,107 256,86 Z";
  return `
  <path d="${shield}" fill="${p.ink}"/>
  <path d="${shield}" fill="none" stroke="${p.gold}" stroke-width="9"/>
  <path d="${inner}" fill="none" stroke="${p.sub}" stroke-width="2.5"/>
  ${scalesCore(p, 256, 218, 0.62, 30)}
  <rect x="196" y="330" width="120" height="8" rx="4" fill="${p.gold}"/>
  <rect x="208" y="346" width="96" height="8" rx="4" fill="${p.bg}" opacity="0.75"/>
  <rect x="220" y="362" width="72" height="8" rx="4" fill="${p.bg}" opacity="0.5"/>`;
}

const marks = [
  { name: "01-ledger-scales", fn: m1ScalesRoundel, desc: "d1" },
  { name: "02-monogram-crest", fn: m2MonogramCrest, desc: "d2" },
  { name: "03-pillar-ledger", fn: m3PillarLedger, desc: "d3" },
  { name: "04-pl-ligature", fn: m4PllLigature, desc: "d4" },
  { name: "05-trust-shield", fn: m5TrustShield, desc: "d5" },
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
const sub = read("sub.json");
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

  // labels — outlined playfair, sized by target width
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
  .toFile(path.join(ROOT, "contact-sheet.png"));

console.log(`contact sheet written: ${path.join(ROOT, "contact-sheet.png")} (${W}x${H})`);
