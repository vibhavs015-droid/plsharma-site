import { expect, test } from "@playwright/test";
import { gotoBook, prefillOf, site } from "./helpers";
import { services } from "../../lib/site-config";

/**
 * Phase 3 Stage A QA — booking form regression, offline.
 *
 * The form was rebuilt as the Kept Ledger consultation slip (§5.2); mechanics
 * (two required fields, wa.me deep link, double-submit guard) and the
 * useSyncExternalStore clock are unchanged. These are regression guards, run
 * with all non-localhost network blocked: the booking flow is client-side and
 * must not depend on connectivity.
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
    await page.getByRole("button", { name: "Open WhatsApp with my request" }).click();
    const popup = await popupPromise;

    const msg = prefillOf(popup.url());
    expect(msg).toContain("Name: Test Person");
    expect(msg).toContain("Phone: 98765 43210");
  });

  test("after submit the SENT state shows the Request-noted copy with the phone fallback", async ({ page }) => {
    await gotoBook(page);
    await page.context().route(/wa\.me/, (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>intercepted offline</title>" })
    );
    await page.fill("#name", "Test Person");
    await page.fill("#phone", "98765 43210");

    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Open WhatsApp with my request" }).click();
    await popupPromise;

    // The slip's shipped SENT strings (user-problem.md §5.2: an entry noted,
    // not a marketing success screen).
    await expect(
      page.getByRole("heading", {
        name: "Request noted — we will confirm your slot on WhatsApp.",
        exact: true,
      })
    ).toBeVisible();
    await expect(
      page.getByText("WhatsApp should now be open with your request — press Send there.")
    ).toBeVisible();

    // The offline fallback: the real office number as a tel: link.
    await expect(
      page.locator('a[href^="tel:"]', { hasText: `Call us directly at ${site.phone}` })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send another request", exact: true })
    ).toBeVisible();
  });

  test("?service=<config title> preselects the service select after hydration", async ({ page }) => {
    // §7.2 deep-link mechanics, verified end-to-end (§9.9). The value comes
    // from site-config — the same byte-string the Select options carry.
    const title = services[0].title;
    await page.goto(`/book?service=${encodeURIComponent(title)}`, {
      waitUntil: "load",
      timeout: 60_000,
    });
    // Server snapshot is "" (prerender shows the placeholder); after hydration
    // the client snapshot applies the choice — hence the retrying assertion.
    await expect(page.locator("#service")).toHaveText(title, { timeout: 30_000 });
  });

  test("an illegal ?service= value degrades to no selection, never an error", async ({ page }) => {
    // §7.2: unknown or garbage values fall back to no selection.
    await page.goto("/book?service=Nonsense", { waitUntil: "load", timeout: 60_000 });
    await expect(page.locator("#service")).toHaveText("Select a service", { timeout: 30_000 });
    // The slip still functions after the soft fallback.
    await expect(
      page.getByRole("button", { name: "Open WhatsApp with my request" })
    ).toBeVisible();
  });

  test("?service=Other / Not sure yet is a legal value and preselects", async ({ page }) => {
    // §7.2: the legal set is the service titles PLUS "Other / Not sure yet".
    await page.goto(`/book?service=${encodeURIComponent("Other / Not sure yet")}`, {
      waitUntil: "load",
      timeout: 60_000,
    });
    await expect(page.locator("#service")).toHaveText("Other / Not sure yet", {
      timeout: 30_000,
    });
  });

  test("the mailto fallback is a quiet text link, not a competing button", async ({ page }) => {
    await gotoBook(page);
    const mailto = page.locator('form a[href^="mailto:"]');
    await expect(mailto).toHaveCount(1);
    // §7.6 shipped label (Stage B): quiet, under the submit — never a <button>
    // with equal visual weight (§2.3 demotion).
    await expect(mailto).toHaveText("Or send by email instead");
    const isAnchor = await mailto.evaluate((el) => el.tagName === "A");
    expect(isAnchor).toBe(true);
    // Subject per the slip copy.
    const href = await mailto.getAttribute("href");
    const subject = new URL(href!).searchParams.get("subject");
    expect(subject).toBe("Consultation Request (Website)");
  });
});
