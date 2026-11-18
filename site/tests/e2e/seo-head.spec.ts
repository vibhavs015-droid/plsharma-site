import { expect, test } from "@playwright/test";
import { site } from "./helpers";
import { siteUrl } from "../../lib/content-mode";
import { confirmedTestimonials } from "../../lib/site-config";

/**
 * B3/B4 — served-head pins (T9.x): per-page title/OG/canonical trio, the
 * robots guard, viewport + manifest, robots.txt / sitemap.xml (Item 0), the
 * site-wide og image and the home JSON-LD. Every value was verified against
 * the default build: polish-evidence/default-build-evidence.json plus the
 * live head check (viewport, robots.txt body, sitemap locs).
 */

/**
 * The home JSON-LD payload shape this file asserts on — the schema.org
 * ProfessionalService subset the page ships (verified field-by-field in the
 * JSON-LD test below against served HTML).
 */
interface ProfessionalServiceLd {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  telephone: string;
  email: string;
  openingHours: string;
  foundingDate: string;
  areaServed: string;
  founder: { "@type": string; name: string };
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

// Title pins: the layout template is "%s | <site.name>"; home deliberately
// exports NO title (page.tsx), so the layout's absolute default survives.
const PAGES: Array<{ path: string; title: string }> = [
  { path: "/", title: "P.L. Sharma And Company — Tax Consultants & Financial Advisors" },
  { path: "/about", title: `About the practice | ${site.name}` },
  { path: "/services", title: `Services | ${site.name}` },
  { path: "/why-choose-us", title: `How we work | ${site.name}` },
  { path: "/faq", title: `Common questions — documents, fees, notices | ${site.name}` },
  { path: "/contact", title: `Contact the office | ${site.name}` },
  { path: "/book", title: `Book a consultation | ${site.name}` },
  { path: "/privacy", title: `Privacy | ${site.name}` },
  { path: "/testimonials", title: `Client words — published with permission | ${site.name}` },
];

/** Absolute URL for a route on the configured siteUrl. */
const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

test.describe("SEO heads — per-page title/OG/canonical trio (T9.2)", () => {
  test.setTimeout(180_000);

  for (const { path, title } of PAGES) {
    test(`${path} carries its own title, OG trio and canonical`, async ({ page }) => {
      const res = await page.goto(path, { waitUntil: "load" });
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(title);

      const content = async (sel: string) =>
        page.locator(sel).getAttribute("content");

      const desc = await content('meta[name="description"]');
      expect(desc, `${path} meta description present`).toBeTruthy();

      const ogTitle = await content('meta[property="og:title"]');
      const ogDesc = await content('meta[property="og:description"]');
      const ogUrl = await content('meta[property="og:url"]');
      const ogImage = await content('meta[property="og:image"]');
      expect(ogTitle, "og:title mirrors the tab title").toBe(title);
      expect(ogDesc, "og:description mirrors the meta description").toBe(desc);
      expect(ogUrl, "og:url is the page's absolute URL").toBe(abs(path));
      expect(ogImage, "og:image is the one site-wide share image").toBe(
        `${siteUrl}/images/og-default.png`
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        abs(path)
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image"
      );
    });
  }

  test("og:url values are distinct per page — nine different URLs", async ({ page }) => {
    const urls = new Set<string>();
    for (const { path } of PAGES) {
      await page.goto(path, { waitUntil: "load" });
      const ogUrl = await page
        .locator('meta[property="og:url"]')
        .getAttribute("content");
      urls.add(ogUrl ?? "");
    }
    expect(urls.size).toBe(PAGES.length);
  });
});

test.describe("SEO heads — guards, files and schema (B3/B4)", () => {
  test.setTimeout(180_000);

  test("meta robots: 'noindex, nofollow' site-wide; testimonials carries its own 'noindex'", async ({
    page,
  }) => {
    // T9.4: the layout guard ships while ALLOW_INDEXING is unset; the
    // /testimonials page OVERRIDES it with its own conditional flag (Item 0).
    for (const { path } of PAGES) {
      await page.goto(path, { waitUntil: "load" });
      const content = await page
        .locator('meta[name="robots"]')
        .getAttribute("content");
      expect(content, `${path} robots meta`).toBe(
        path === "/testimonials" ? "noindex" : "noindex, nofollow"
      );
    }
  });

  test("page heads carry the BARE eyebrow — no firm name, no place (T14-A cross-page)", async ({
    page,
  }) => {
    // Owner order: every page head's rail-label is the bare page name.
    // The per-page specs pin the exact word; this loop is the cross-page
    // net — all nine heads must drop the firm name AND the place.
    for (const { path } of PAGES) {
      const res = await page.goto(path, { waitUntil: "load" });
      expect(res?.status(), `${path} must return 200`).toBe(200);
      const label = page
        .locator("main section.ledger-rail")
        .first()
        .locator("p.rail-label")
        .first();
      await expect(label, `${path} eyebrow visible`).toBeVisible();
      const text = ((await label.textContent()) ?? "").trim();
      expect(text, `${path} eyebrow carries no firm name`).not.toMatch(
        /P\.L\. Sharma/i
      );
      expect(text, `${path} eyebrow carries no tagline`).not.toMatch(
        /Tax Consultants/i
      );
      expect(text, `${path} eyebrow carries no place`).not.toContain("Jaisalmer");
    }
  });

  test("viewport ships viewport-fit=cover and interactive-widget=resizes-content", async ({
    page,
  }) => {
    // TASK 12.1: safe-area + keyboard-aware viewport. Served content:
    // "width=device-width, initial-scale=1, viewport-fit=cover,
    //  interactive-widget=resizes-content".
    await page.goto("/", { waitUntil: "load" });
    const content = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(content).toContain("viewport-fit=cover");
    expect(content).toContain("interactive-widget=resizes-content");
  });

  test("manifest link is auto-injected and /manifest.webmanifest serves the app identity", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "load" });
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      "/manifest.webmanifest"
    );
    const res = await page.request.get("/manifest.webmanifest");
    expect(res.status()).toBe(200);
    const json = (await res.json()) as {
      name: string;
      short_name: string;
      icons: Array<{ src: string; sizes: string }>;
    };
    expect(json.name).toBe("P.L. Sharma And Company");
    expect(json.short_name).toBe("P.L. Sharma & Co.");
    expect(
      json.icons.map((i) => i.sizes).sort(),
      "both icon sizes ship"
    ).toEqual(["192x192", "512x512"]);
    for (const icon of json.icons) {
      const iconRes = await page.request.get(icon.src);
      expect(iconRes.status(), `${icon.src} must resolve`).toBe(200);
      expect(iconRes.headers()["content-type"] ?? "").toContain("image/png");
    }
  });

  test("robots.txt disallows every crawler and advertises no sitemap", async ({ page }) => {
    // T9.4 default: ALLOW_INDEXING unset → disallow-all, no sitemap line.
    // Served body (live check): "User-Agent: *\nDisallow: /\n\n".
    const res = await page.request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/user-agent:\s*\*/i);
    expect(body).toMatch(/disallow:\s*\//i);
    expect(body, "no sitemap advertised while indexing is off").not.toMatch(/sitemap/i);
  });

  test("sitemap lists the 8 fixed routes on siteUrl — /testimonials omitted (Item 0)", async ({
    page,
  }) => {
    expect(confirmedTestimonials, "tier must be empty for this pin").toHaveLength(0);
    const res = await page.request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"] ?? "").toContain("application/xml");
    const body = await res.text();
    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    // Exact set + order verified live: head-check pass (8 locs, preview host).
    expect(locs).toEqual(
      PAGES.filter((p) => p.path !== "/testimonials").map((p) => abs(p.path))
    );
    expect(
      locs.some((l) => l.endsWith("/testimonials")),
      "Item 0: sitemap omits /testimonials while the tier is empty"
    ).toBe(false);
  });

  test("the site-wide og image serves as a real PNG", async ({ page }) => {
    const res = await page.request.get("/images/og-default.png");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"] ?? "").toContain("image/png");
    const bytes = await res.body();
    expect(bytes.byteLength, "og image is non-empty").toBeGreaterThan(0);
  });

  test("home JSON-LD: ProfessionalService with the confirmed business facts", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "load" });
    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts).toHaveCount(1);
    const payload = JSON.parse(
      (await scripts.first().textContent())!
    ) as ProfessionalServiceLd;
    expect(payload["@context"]).toBe("https://schema.org");
    expect(payload["@type"]).toBe("ProfessionalService");
    expect(payload.name).toBe(site.name);
    expect(payload.url).toBe(siteUrl);
    expect(payload.telephone).toBe(site.phone);
    expect(payload.email).toBe(site.email);
    expect(payload.openingHours, "office hours, Mo-Sa 10:00-19:00").toBe(
      "Mo-Sa 10:00-19:00"
    );
    expect(payload.foundingDate).toBe(String(site.establishedYear));
    expect(payload.areaServed).toBe("Jaisalmer");
    expect(payload.founder).toEqual({ "@type": "Person", name: "Parbhati Lal Sharma" });
    expect(payload.address).toMatchObject({
      streetAddress: "109, Indira Colony",
      addressLocality: "Jaisalmer",
      addressRegion: "Rajasthan",
      postalCode: "345001",
      addressCountry: "IN",
    });
  });
});
