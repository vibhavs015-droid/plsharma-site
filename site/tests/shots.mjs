/**
 * T13 screenshot capture — standalone runner for the critic review.
 *
 * NOT an e2e spec: playwright.config.ts sets testDir "./tests/e2e", so this
 * file (site/tests/shots.mjs) is never collected by `npx playwright test`,
 * and its name matches no *.spec/*.test glob either.
 *
 * Run from site/:  node tests/shots.mjs
 *
 * Drives the ALREADY-RUNNING production server on :3000. It never starts,
 * restarts or stops anything — server ownership belongs to the Orchestrator.
 *
 * Output: docs/design/screenshots/polish/ — 65 files
 *   54 full-page   <slug>-<width>.png    9 pages × 6 widths
 *    9 viewport    <slug>-390-vp.png     fixed bar/float where a user sees them
 *    2 404         not-found-{390,1440}.png
 *
 * Tier guard: the production default build must never render the sample
 * banner. Any sighting aborts the run (T0 leak = tier bug, exit 2).
 */
import { chromium } from "@playwright/test";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "http://localhost:3000";
const HERE = path.dirname(fileURLToPath(import.meta.url)); // site/tests
const OUT = path.resolve(HERE, "..", "..", "docs", "design", "screenshots", "polish");
const BANNER = "Design preview — sample content shown";

const PAGES = [
  ["/", "home"],
  ["/about", "about"],
  ["/services", "services"],
  ["/why-choose-us", "why-choose-us"],
  ["/testimonials", "testimonials"],
  ["/faq", "faq"],
  ["/contact", "contact"],
  ["/book", "book"],
  ["/privacy", "privacy"],
];
const FULL_SIZES = [
  [360, 780],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1440, 900],
];

class TierBug extends Error {}

/** Wait for the Orchestrator's server before touching the browser. */
async function waitForServer(url, attempts = 60) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (r.status) return r.status;
    } catch {
      /* not up yet */
    }
    await new Promise((res) => setTimeout(res, 1000));
  }
  throw new Error(`no response from ${url} after ${attempts}s`);
}

async function main() {
  const boot = await waitForServer(BASE + "/");
  console.log(`server ready (GET / -> ${boot}) — capturing into ${OUT}`);
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce", // deterministic end-state frames
    colorScheme: "light", // single-scheme design — pin it
  });
  const page = await context.newPage();

  const shots = [];
  const errors = [];

  async function shoot(route, file, width, height, fullPage) {
    const expectStatus = route === "/does-not-exist" ? 404 : 200;
    await page.setViewportSize({ width, height });
    const res = await page.goto(BASE + route, {
      waitUntil: "networkidle",
      timeout: 45_000,
    });
    const got = res ? res.status() : null;
    if (got !== expectStatus) {
      throw new Error(`${file}: expected HTTP ${expectStatus} from ${route}, got ${got}`);
    }
    // Tier guard on EVERY capture: production must never show the sample strip.
    const html = await page.content();
    if (html.includes(BANNER)) {
      throw new TierBug(`sample banner rendered on ${route} — T0 leak, aborting`);
    }
    await page.waitForTimeout(250); // short settle (fonts/animation end-states)
    await page.screenshot({ path: path.join(OUT, file), fullPage });
    shots.push({ file, got, width, fullPage });
    console.log(`  ${file}  (HTTP ${got})`);
  }

  async function tryShoot(route, file, width, height, fullPage) {
    try {
      await shoot(route, file, width, height, fullPage);
    } catch (e) {
      if (e instanceof TierBug) throw e;
      errors.push(`${file}: ${e && e.message ? e.message : e}`);
      console.log(`  ${file}  FAILED — ${e && e.message ? e.message : e}`);
    }
  }

  try {
    // 1) 54 full-page captures — width-major for a readable log.
    for (const [width, height] of FULL_SIZES) {
      console.log(`— full-page @ ${width}×${height} —`);
      for (const [route, slug] of PAGES) {
        await tryShoot(route, `${slug}-${width}.png`, width, height, true);
      }
    }
    // 2) 9 viewport-only captures at 390 (fixed bar/float where users see them).
    console.log("— viewport-only @ 390×844 —");
    for (const [route, slug] of PAGES) {
      await tryShoot(route, `${slug}-390-vp.png`, 390, 844, false);
    }
    // 3) 2 bonus 404 captures.
    console.log("— 404 probes —");
    await tryShoot("/does-not-exist", "not-found-390.png", 390, 844, true);
    await tryShoot("/does-not-exist", "not-found-1440.png", 1440, 900, true);
  } catch (e) {
    if (e instanceof TierBug) {
      console.error(`TIER BUG — ${e.message}`);
      await browser.close();
      process.exit(2);
    }
    errors.push(String(e && e.stack ? e.stack : e));
  }

  await browser.close();

  // Verify: all 65 expected names exist with nonzero size.
  const expected = [];
  for (const [w] of FULL_SIZES) for (const [, slug] of PAGES) expected.push(`${slug}-${w}.png`);
  for (const [, slug] of PAGES) expected.push(`${slug}-390-vp.png`);
  expected.push("not-found-390.png", "not-found-1440.png");

  const missing = [];
  const zero = [];
  for (const f of expected) {
    try {
      const s = await stat(path.join(OUT, f));
      if (s.size === 0) zero.push(f);
    } catch {
      missing.push(f);
    }
  }
  const pngs = (await readdir(OUT)).filter((f) => f.endsWith(".png"));

  const perWidth = {};
  for (const [w] of FULL_SIZES) perWidth[`${w}px`] = shots.filter((s) => s.width === w && s.fullPage && !s.file.startsWith("not-found")).length;

  console.log("\n=== summary ===");
  console.log(`captured this run: ${shots.length} (expected 65)`);
  console.log(`expected names present: ${expected.length - missing.length}/65`);
  console.log(`zero-byte: ${zero.length} | missing: ${missing.length}`);
  console.log(`pngs in output dir: ${pngs.length}`);
  console.log(`full-page per width: ${JSON.stringify(perWidth)}`);
  console.log(`viewport-only: ${shots.filter((s) => !s.fullPage).length} | 404: ${shots.filter((s) => s.file.startsWith("not-found")).length}`);
  if (errors.length) {
    console.log("capture errors:");
    for (const e of errors) console.log(`  ${e}`);
  }

  const ok = shots.length === 65 && missing.length === 0 && zero.length === 0 && errors.length === 0;
  console.log(ok ? "OK — 65/65 captured, all nonzero" : "FAILED — see above");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
