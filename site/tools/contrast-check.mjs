#!/usr/bin/env node
/**
 * contrast-check.mjs — WCAG 2.2 contrast-ratio verifier for the Phase 1 palette.
 *
 * Purpose: make every contrast ratio cited in docs/design/discovery/vibe-board.md
 * §3 traceable to a committed, dependency-free script (critic round-1 fix F2).
 * Output: JSON array of { pair, foreground, background, ratio, passes } — redirect
 * to docs/design/discovery/contrast-evidence.json and compare against the doc.
 *
 * Formula: WCAG 2.2 relative luminance (sRGB, IEC 61966-2-1) and the 1.05/0.05
 * ratio — the same definition axe-core and Lighthouse use.
 *
 * Usage:  node tools/contrast-check.mjs > ../docs/design/discovery/contrast-evidence.json
 *         (run from site/)
 * Removal: delete this file (dev-only; nothing imports it).
 */

// Palette from vibe-board.md §3.2/§3.3 (The Kept Ledger proposal).
const C = {
  ink: "#282E3F",
  paper: "#FAF6EC",
  sand: "#F1E8D9",
  brass: "#CF9455",
  brassInk: "#854E24",
  inkMuted: "#57534A",
  line: "#D9CFBE",
  lineInput: "#8A7F69",
  error: "#B3261E",
  whatsappOld: "#0F8344", // current site token — the measured defect
  whatsapp: "#0B6E39", // proposed replacement
  white: "#FFFFFF",
};

// Every pair the vibe board cites as shipping, plus the defect pair it cites
// as failing and the decorative/control-boundary pairs.
const PAIRS = [
  ["ink/paper", C.ink, C.paper],
  ["ink/sand", C.ink, C.sand],
  ["ink-muted/paper", C.inkMuted, C.paper],
  ["ink-muted/sand", C.inkMuted, C.sand],
  ["brass-ink/paper", C.brassInk, C.paper],
  ["brass-ink/sand", C.brassInk, C.sand],
  ["paper/ink", C.paper, C.ink],
  ["brass/ink", C.brass, C.ink],
  ["ink/brass", C.ink, C.brass],
  ["error/paper", C.error, C.paper],
  ["error/sand", C.error, C.sand],
  ["whatsapp/paper", C.whatsapp, C.paper],
  ["whatsapp/sand", C.whatsapp, C.sand],
  ["white/whatsapp", C.white, C.whatsapp],
  ["white/error", C.white, C.error],
  ["whatsapp-OLD/paper (defect)", C.whatsappOld, C.paper],
  ["line-input/paper", C.lineInput, C.paper],
  ["line-input/sand", C.lineInput, C.sand],
  ["line/paper (decorative)", C.line, C.paper],
];

function luminance(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fgHex, bgHex) {
  const [fg, bg] = [luminance(fgHex), luminance(bgHex)].sort((a, b) => b - a);
  return (fg + 0.05) / (bg + 0.05);
}

const AA_TEXT = 4.5; // normal text
const results = PAIRS.map(([name, fg, bg]) => {
  const r = ratio(fg, bg);
  return {
    pair: name,
    foreground: fg,
    background: bg,
    ratio: Math.round(r * 100) / 100,
    passesAAText: r >= AA_TEXT,
  };
});

console.log(
  JSON.stringify(
    {
      generator: "site/tools/contrast-check.mjs (WCAG 2.2 relative luminance, sRGB; control pair #000000/#FFFFFF = 21.00)",
      aaTextThreshold: AA_TEXT,
      pairs: results,
    },
    null,
    2
  )
);
