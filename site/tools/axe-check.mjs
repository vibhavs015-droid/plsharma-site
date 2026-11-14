import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const url = process.argv[2];
if (!url) {
  console.error("Usage: node tools/axe-check.mjs <url>");
  process.exit(2);
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });

const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
  .analyze();

const violations = results.violations.map((v) => ({
  id: v.id,
  impact: v.impact,
  wcag: v.tags.filter((t) => t.startsWith("wcag")),
  nodes: v.nodes.length,
  help: v.helpUrl,
}));

console.log(JSON.stringify(violations, null, 2));
await browser.close();
process.exit(violations.length ? 1 : 0);
