import type { Page } from "@playwright/test";
import { site } from "../../lib/site-config";

/**
 * Shared helpers for the Phase 2 e2e suite.
 *
 * `site-config` is imported (not hard-coded) so the tests track the content
 * source of truth; the honesty guards below assert the *served page* against
 * these owner-confirmed values.
 */

export { site };

/** The real wa.me deep link prefix, digits straight from site-config. */
export const WA_HREF_PREFIX = `https://wa.me/${site.whatsappNumber}?text=`;

/** The real office tel: link, straight from site-config. */
export const TEL_HREF = `tel:${site.phoneHref}`;

/** Long timeout: dev-mode Turbopack compiles routes on demand. */
export const DEV_TIMEOUT = 60_000;

/** Navigate to / and wait until the hero h1 is attached. */
export async function gotoHome(page: Page): Promise<void> {
  await page.goto("/", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page.locator("main h1").waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** Navigate to /book and wait until the booking form is attached. */
export async function gotoBook(page: Page): Promise<void> {
  await page.goto("/book", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page
    .getByRole("button", { name: "Send Booking Request" })
    .waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/**
 * Extract and decode the prefill message from a wa.me deep link.
 * Fails loudly if the link is not wa.me or has no text= parameter
 * (user-problem.md §2.3: naming the channel is the whole point).
 */
export function prefillOf(href: string): string {
  const url = new URL(href);
  if (url.hostname !== "wa.me" || url.pathname !== `/${site.whatsappNumber}`) {
    throw new Error(`not a wa.me link to ${site.whatsappNumber}: ${href}`);
  }
  const text = url.searchParams.get("text");
  if (!text) throw new Error(`wa.me link without a text= prefill: ${href}`);
  return text;
}
