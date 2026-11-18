import { expect, type Locator, type Page } from "@playwright/test";
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

/** Navigate to /book and wait until the consultation slip is attached. */
export async function gotoBook(page: Page): Promise<void> {
  await page.goto("/book", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page
    .getByRole("button", { name: "Open WhatsApp with my request" })
    .waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** Navigate to /about and wait until the page head is attached. */
export async function gotoAbout(page: Page): Promise<void> {
  await page.goto("/about", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page.locator("main h1").waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** Navigate to /services and wait until the page head is attached. */
export async function gotoServices(page: Page): Promise<void> {
  await page.goto("/services", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page.locator("main h1").waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** Navigate to /faq and wait until the page head is attached. */
export async function gotoFaq(page: Page): Promise<void> {
  await page.goto("/faq", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page.locator("main h1").waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** Navigate to /contact and wait until the page head is attached. */
export async function gotoContact(page: Page): Promise<void> {
  await page.goto("/contact", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page.locator("main h1").waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** Navigate to /why-choose-us and wait until the page head is attached. */
export async function gotoWhyChooseUs(page: Page): Promise<void> {
  await page.goto("/why-choose-us", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page.locator("main h1").waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** Navigate to /testimonials and wait until the page head is attached. */
export async function gotoTestimonials(page: Page): Promise<void> {
  await page.goto("/testimonials", { waitUntil: "load", timeout: DEV_TIMEOUT });
  await page.locator("main h1").waitFor({ state: "attached", timeout: DEV_TIMEOUT });
}

/** The four invented sample-testimonial names — never render. The
 *  testimonials spec derives the same set straight from the config array;
 *  pinned here as literals so every route's sweep checks a fixed set. */
export const INVENTED_TESTIMONIAL_NAMES = [
  "Rajesh Verma",
  "Sunita Malhotra",
  "Amit Khanna",
  "Priya Nair",
];

/** The invented sample roles join the guard (Stage D): no route may re-say
 *  them either — they exist only in the config's placeholder array. */
const INVENTED_TESTIMONIAL_ROLES = ["Business Owner", "IT Professional"];

/**
 * §2.4/§9.3 honesty sweep for the rebuilt routes: no star glyphs or star
 * markup, no rating schema, no fee figures (₹ + digits), none of the invented
 * testimonial names OR roles — checked against the served HTML including the
 * RSC flight payload (Stage D guard), not just the visible DOM.
 */
export async function expectNoInventedClaims(page: Page): Promise<void> {
  const html = await page.content();
  expect(html, "no star glyphs anywhere in the served page").not.toMatch(/[★☆]/);
  expect(html, "no rating schema markup").not.toMatch(
    /aggregateRating|ratingValue|bestRating|reviewCount/i
  );
  expect(html, "no fee figures (no ₹ + digits)").not.toMatch(/₹\s?\d/);
  // Token-boundary star classes: "lucide-star" matches, Tailwind's
  // "inline-start" substring (star followed by "t") does not.
  const starNodes = await page.evaluate(() => {
    const starClass = (cls: string) =>
      cls.split(/\s+/).some((token) => /star(?!t)/i.test(token));
    return Array.from(document.querySelectorAll("body *")).filter(
      (el) =>
        starClass(el.getAttribute("class") ?? "") ||
        /\bstar\b/i.test(el.getAttribute("aria-label") ?? "")
    ).length;
  });
  expect(starNodes, "no star-rating markup nodes").toBe(0);
  const mainText = await page.locator("main").innerText();
  const inventedSet = [...INVENTED_TESTIMONIAL_NAMES, ...INVENTED_TESTIMONIAL_ROLES];
  for (const invented of inventedSet) {
    expect(
      mainText,
      `invented testimonial datum must not appear: "${invented}"`
    ).not.toContain(invented);
    expect(
      html,
      `invented testimonial datum must not appear in HTML/RSC payload: "${invented}"`
    ).not.toContain(invented);
  }
  expect(mainText, "no invented percentage stats").not.toMatch(/100%/);
  expect(mainText, "no invented ratio stats").not.toMatch(/1:1/);
  expect(mainText, "no invented client counts").not.toMatch(/5000\+|happy clients|trusted by/i);
}

/**
 * §2.3 CTA-surface wording guard: no "appointment" inside any link or button
 * — its text content, aria-label or title. Body copy of the plain word is
 * allowed; CTA surfaces are not.
 */
export async function expectNoAppointmentOnCtaSurfaces(page: Page): Promise<void> {
  const offenders = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll("a, button")) {
      const surface = `${el.getAttribute("aria-label") ?? ""} ${
        el.getAttribute("title") ?? ""
      } ${el.textContent ?? ""}`;
      if (/appointment/i.test(surface)) {
        bad.push(`<${el.tagName.toLowerCase()}> ${surface.trim().slice(0, 60)}`);
      }
    }
    return bad;
  });
  expect(
    offenders,
    "no 'appointment' wording on any CTA surface (link/button text, aria-label, title)"
  ).toEqual([]);
}

/**
 * Extract and decode the prefill message from a wa.me deep link.
 * Fails loudly if the link is not wa.me or has no text= parameter
 * (user-problem.md §2.3: naming the channel is the whole point).
 */
/**
 * Assert ONE `.rail-label.rail-num` device (B3 polish): the numbered figure
 * with its `data-numeric` flag, the hairline rule, and the section text.
 * Figure and text are pinned separately because the label's combined
 * textContent is the bare concatenation ("01The practice") with no
 * separator — asserting the old "§ 01 · The practice" string form can no
 * longer match, and the device's parts are the real contract.
 * Verified against served HTML: spec-evidence.json.
 */
export async function expectRailNum(
  label: Locator,
  figure: string,
  text: string
): Promise<void> {
  await expect(label).toHaveCount(1);
  await expect(label).toHaveClass(/rail-num/);
  await expect(label.locator(".rail-num-figure")).toHaveText(figure);
  await expect(label.locator(".rail-num-figure")).toHaveAttribute(
    "data-numeric",
    "true"
  );
  await expect(label.locator(".rail-num-rule")).toHaveCount(1);
  await expect(label.locator(".rail-num-text")).toHaveText(text);
}

export function prefillOf(href: string): string {
  const url = new URL(href);
  if (url.hostname !== "wa.me" || url.pathname !== `/${site.whatsappNumber}`) {
    throw new Error(`not a wa.me link to ${site.whatsappNumber}: ${href}`);
  }
  const text = url.searchParams.get("text");
  if (!text) throw new Error(`wa.me link without a text= prefill: ${href}`);
  return text;
}
