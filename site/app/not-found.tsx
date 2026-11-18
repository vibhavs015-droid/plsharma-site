import Link from "next/link";

/**
 * ============================================================
 *  NOT FOUND — the branded 404 (TASK 8 part 2)
 * ============================================================
 *  Root-level on purpose: this Next's docs (not-found.md) say the
 *  root app/not-found.tsx handles EVERY unmatched URL for the whole
 *  app and renders INSIDE the root layout — so the brand header,
 *  footer and skip link wrap it, and it lands inside <main id="main">,
 *  reachable from the skip link. All routes here are one level deep,
 *  so no nested segment needs its own not-found file.
 *
 *  Deliberately minimal, in the site's own voice — plain and calm:
 *  identity marker (plain rail-label, NOT a numbered rail-num — a
 *  404 is not a numbered section), one honest h1, one line, and the
 *  quick exits reusing the nav/footer labels verbatim (site-config
 *  strings; the /faq link carries its exact existing label "FAQ").
 *
 *  No metadata export (brief decision): Next auto-injects
 *  <meta name="robots" content="noindex"> for every 404, and the
 *  layout's ALLOW_INDEXING=false guard covers the rest; the browser
 *  title falls back to the layout default. Server component with
 *  <Link> only, per the docs' guidance for this file — it ships
 *  with every page, so no client JS and NO ActionBar import (the
 *  header/footer chrome already carries the CTAs; /not-found is not
 *  a page route, so the per-page bar include pattern does not apply).
 * ============================================================
 */

/* The entry-link underline (tokens.md §4 signature interaction): the same
   quiet hairline-to-brass hover every page uses for inline links. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* Labels and hrefs verbatim from site-config (navLinks + the footer's
   Book link) — no invented strings, every href a real route. */
const quickLinks = [
  { href: "/book", label: "Book a consultation" },
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="ledger-rail py-[var(--space-section)]">
      <p className="rail-label">404</p>
      <div>
        <div>
          <h1>That page isn&apos;t here.</h1>
          <p className="text-lead text-ink-muted mt-3 measure">
            The address may be out of date, or the link was typed wrong.
          </p>
          <ul className="measure mt-8">
            {quickLinks.map((link) => (
              <li key={link.href} className="ruled-entry">
                <p className="text-body">
                  <Link href={link.href} className={entryLink}>
                    {link.label}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
