import { expect, test } from "@playwright/test";

/**
 * TASK 0 production leak guard — the owner's explicit requirement.
 *
 * The sample content tier (`site/lib/sample-content.ts`) may ONLY ever
 * render in an owner-preview build (`SHOW_SAMPLE_CONTENT=true`). A default
 * production build must leak NOTHING from that tier — no banner, no SAMPLE
 * tags, no sample bylines, no sample associate names — neither in the
 * served HTML nor in the RSC flight payload. `page.content()` returns the
 * full document including the flight payload, so the string sweep below
 * covers both. The structural half additionally asserts the banner/tag
 * elements do not exist in the served DOM.
 *
 * This is the test that fails a production build that ships sample content.
 */

// The leak set: the banner line, the tag line, the generic sample byline,
// and the three sample associate names. If the sample tier grows, this
// list grows with it.
const LEAK_STRINGS = [
  "Design preview — sample content shown",
  "SAMPLE — not real, replace before launch",
  "Sample client",
  "Vikram Singh Soda",
  "Bhawani",
  "Hemraj",
];

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/book",
  "/faq",
  "/contact",
  "/why-choose-us",
  "/testimonials",
  "/privacy",
];

test.describe("Sample content — production leak guard (TASK 0)", () => {
  test.setTimeout(90_000);

  for (const route of ROUTES) {
    test(`${route} renders nothing from the sample tier (HTML + RSC payload)`, async ({
      page,
    }) => {
      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.status(), `${route} must return 200`).toBe(200);
      const html = await page.content(); // includes the RSC flight payload
      for (const leak of LEAK_STRINGS) {
        expect(
          html,
          `"${leak}" must not appear on ${route} in a production build`
        ).not.toContain(leak);
      }
      // Structural half: no banner or tag nodes may exist in the DOM either.
      await expect(page.locator(".sample-banner")).toHaveCount(0);
      await expect(page.locator(".sample-tag")).toHaveCount(0);
    });
  }
});
