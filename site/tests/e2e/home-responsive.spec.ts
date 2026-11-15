import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

/**
 * Phase 2 QA — Home at the five charter widths (STUDIO_CHARTER.md,
 * PAGE COMPLETION RULE): 360 / 768 / 1024 / 1440 / 1920.
 *
 * Each width is its own test so a failure pinpoints the breakpoint.
 * Overflow is measured on documentElement; 2px tolerance covers subpixel
 * rounding around the decorative WhatsApp float only.
 */

const WIDTHS = [360, 768, 1024, 1440, 1920] as const;

for (const width of WIDTHS) {
  test(`no horizontal overflow on / at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 800 });
    await gotoHome(page);
    // Let fonts/layout settle before measuring.
    await page.locator("main h1").waitFor({ state: "visible", timeout: 60_000 });
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(
      scrollWidth,
      `documentElement.scrollWidth (${scrollWidth}) must be <= clientWidth (${clientWidth}) at ${width}px`
    ).toBeLessThanOrEqual(clientWidth + 2);
  });
}

test("at 360px the hero CTA and the act band are visible and usable", async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 360, height: 800 });
  await gotoHome(page);

  // Hero primary CTA: visible, full touch target, inside the 360px viewport.
  const heroCta = page.locator("main section.ledger-rail").first().locator("a.btn-primary");
  await expect(heroCta).toBeVisible();
  const heroBox = await heroCta.boundingBox();
  expect(heroBox).not.toBeNull();
  expect(
    heroBox!.height,
    "hero CTA touch target must meet the 44px minimum (tokens.md §5.1)"
  ).toBeGreaterThanOrEqual(44);
  expect(heroBox!.x).toBeGreaterThanOrEqual(0);
  expect(
    heroBox!.x + heroBox!.width,
    "hero CTA must not poke out of the 360px viewport"
  ).toBeLessThanOrEqual(360 + 2);

  // Act band reachable by scrolling, its primary CTA visible and usable.
  const band = page.locator("section.act-band");
  const bandCta = band.locator("a.btn-primary");
  await bandCta.scrollIntoViewIfNeeded();
  await expect(band).toBeVisible();
  await expect(bandCta).toBeInViewport();
  const bandBox = await bandCta.boundingBox();
  expect(bandBox).not.toBeNull();
  expect(
    bandBox!.height,
    "act-band CTA touch target must meet the 44px minimum (tokens.md §5.1)"
  ).toBeGreaterThanOrEqual(44);
  expect(bandBox!.x).toBeGreaterThanOrEqual(0);
  expect(
    bandBox!.x + bandBox!.width,
    "act-band CTA must not poke out of the 360px viewport"
  ).toBeLessThanOrEqual(360 + 2);
});
