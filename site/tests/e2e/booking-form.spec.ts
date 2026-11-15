import { expect, test } from "@playwright/test";
import { gotoBook, prefillOf, site } from "./helpers";

/**
 * Phase 2 QA — booking form regression, offline.
 *
 * The form's behaviour was deliberately unchanged in the rebuild (only the
 * today's-date hook moved to useSyncExternalStore), so these are regression
 * guards, run with all non-localhost network blocked: the booking flow is
 * client-side and must not depend on connectivity.
 *
 * The wa.me deep link is fulfilled locally so the popup never leaves the
 * machine — user-problem.md §2.1: the site-observable event is "WhatsApp
 * opens with the request prefilled", not "the visitor pressed Send".
 */

test.describe("Booking form (offline e2e)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ context, baseURL }) => {
    const origin = baseURL ?? "http://localhost:3000";
    await context.route("**/*", (route) =>
      route.request().url().startsWith(origin) ? route.continue() : route.abort()
    );
  });

  test("date input min becomes today after hydration (useSyncExternalStore clock)", async ({ page }) => {
    await gotoBook(page);
    // Same UTC slice as the component's getToday snapshot.
    const today = new Date().toISOString().slice(0, 10);
    await expect(page.locator("#date")).toHaveAttribute("min", today, { timeout: 30_000 });
  });

  test("submitting the form opens WhatsApp with the request prefilled", async ({ page }) => {
    await gotoBook(page);
    await page.context().route(/wa\.me/, (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>intercepted offline</title>" })
    );
    await page.fill("#name", "Test Person");
    await page.fill("#phone", "98765 43210");

    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Send Booking Request" }).click();
    const popup = await popupPromise;

    const msg = prefillOf(popup.url());
    expect(msg).toContain("Name: Test Person");
    expect(msg).toContain("Phone: 98765 43210");
  });

  test("after submit the SENT state shows the Request-family copy with the phone fallback", async ({ page }) => {
    await gotoBook(page);
    await page.context().route(/wa\.me/, (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>intercepted offline</title>" })
    );
    await page.fill("#name", "Test Person");
    await page.fill("#phone", "98765 43210");

    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Send Booking Request" }).click();
    await popupPromise;

    // The component's actual SENT strings (deliberately unchanged wording).
    await expect(
      page.getByRole("heading", { name: "Request Ready to Send!", exact: true })
    ).toBeVisible();
    await expect(
      page.getByText("WhatsApp should now be open with your booking details filled in.")
    ).toBeVisible();
    await expect(
      page.getByText("we will confirm your appointment as soon as possible")
    ).toBeVisible();

    // The offline fallback: the real office number as a tel: link.
    await expect(
      page.locator('a[href^="tel:"]', { hasText: `Call us directly at ${site.phone}` })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Book another appointment" })
    ).toBeVisible();
  });
});
