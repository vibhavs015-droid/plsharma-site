import { expect, test } from "@playwright/test";

/**
 * B3 — /privacy, the one-page disclosure.
 * Pins verified against served HTML: spec-evidence.json → privacy plus the
 * live privacy-check pass (four rail-nums, the hard-coded date, no act band).
 */

test.describe("Privacy — one page, four numbered sections (B3)", () => {
  test.setTimeout(90_000);

  test("200 with the shipped h1", async ({ page }) => {
    const res = await page.goto("/privacy", { waitUntil: "load" });
    expect(res?.status()).toBe(200);
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("One form collects your details — this site stores nothing.");
  });

  test("four numbered rail-num sections, in order", async ({ page }) => {
    await page.goto("/privacy", { waitUntil: "load" });
    const figs = page.locator("main p.rail-label.rail-num .rail-num-figure");
    await expect(figs).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(figs.nth(i)).toHaveText(String(i + 1).padStart(2, "0"));
      await expect(figs.nth(i)).toHaveAttribute("data-numeric", "true");
    }
    await expect(
      page.locator("main p.rail-label.rail-num .rail-num-text")
    ).toHaveText([
      "What the form collects",
      "Where your details go",
      "Cookies and analytics",
      "Correcting or deleting",
    ]);
  });

  test("the hard-coded freshness date ships; no act band competes", async ({ page }) => {
    await page.goto("/privacy", { waitUntil: "load" });
    await expect(page.locator("main")).toContainText("Last updated 17 November 2026");
    // The page states; it never sells — no closing CTA band.
    await expect(page.locator("section.act-band")).toHaveCount(0);
  });
});
