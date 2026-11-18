import { expect, test } from "@playwright/test";
import { prefillOf, TEL_HREF, site } from "./helpers";

/**
 * B4 — the sticky bottom action bar (TASK 12.5): Call + WhatsApp on every
 * page EXCEPT /book (there the form is the action surface) and the 404.
 *
 * Markup-only pins: presence and attributes, never visibility — the art pass
 * owns the CSS and may hide the bar at desktop widths.
 * Served evidence: spec-evidence.json → actionBar, default-build-evidence →
 * pages[].actionBarPresent + extras.notFound.
 */

const BAR_ROUTES = [
  "/",
  "/about",
  "/services",
  "/why-choose-us",
  "/faq",
  "/contact",
  "/privacy",
  "/testimonials",
];

// The bar's prefill is page-AGNOSTIC (A2 hand-off): no "via the website's
// X page" attribution, unlike every in-page band.
const UNATTRIBUTED_PREFILL = `Hello ${site.name}, I would like to book a consultation.`;

test.describe("Sticky action bar — present on the 8 bar-routes (B4)", () => {
  test.setTimeout(120_000);

  for (const route of BAR_ROUTES) {
    test(`${route} carries Call + WhatsApp with the unattributed prefill`, async ({
      page,
    }) => {
      const res = await page.goto(route, { waitUntil: "load" });
      expect(res?.status()).toBe(200);

      const bar = page.locator("nav.sticky-action-bar");
      await expect(bar).toHaveCount(1);
      await expect(bar).toHaveAttribute("aria-label", "Quick actions");

      const call = bar.locator('a[href^="tel:"]');
      await expect(call).toHaveCount(1);
      await expect(call).toHaveText("Call");
      await expect(call).toHaveAttribute("href", TEL_HREF);
      await expect(call).toHaveAttribute("aria-label", `Call the office · ${site.phone}`);

      const wa = bar.locator('a[href^="https://wa.me/"]');
      await expect(wa).toHaveCount(1);
      await expect(wa).toHaveText("WhatsApp");
      await expect(wa).toHaveAttribute(
        "aria-label",
        "Book a consultation on WhatsApp"
      );
      expect(prefillOf((await wa.getAttribute("href"))!), "unattributed prefill").toBe(
        UNATTRIBUTED_PREFILL
      );
    });
  }
});

test.describe("Sticky action bar — absent where the surface says no (B4)", () => {
  test.setTimeout(90_000);

  test("/book carries no action bar — the form is the action surface", async ({ page }) => {
    const res = await page.goto("/book", { waitUntil: "load" });
    expect(res?.status()).toBe(200);
    await expect(page.locator("nav.sticky-action-bar")).toHaveCount(0);
  });

  test("the 404 carries no action bar", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist", { waitUntil: "load" });
    expect(res?.status()).toBe(404);
    await expect(page.locator("nav.sticky-action-bar")).toHaveCount(0);
  });
});
