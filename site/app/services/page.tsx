import type { Metadata } from "next";
import Link from "next/link";
import { site, services } from "@/lib/site-config";
import { practitionerIsCa } from "@/lib/content-mode";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";

// CA-gated meta description (T6): the audit card is "Audit Support & Record
// Review" while practitionerIsCa is false, so the list drops "audits" —
// tax planning is already named further in.
export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: practitionerIsCa
    ? "Income tax filing, GST registration & compliance, audits, business registration, tax planning, TDS and bookkeeping — by P.L. Sharma And Company, Jaisalmer."
    : "Income tax filing, GST registration & compliance, business registration, tax planning, TDS and bookkeeping — by P.L. Sharma And Company, Jaisalmer.",
  path: "/services",
});

/* Page-aware wa.me deep link for the end-of-page band — same mechanics as
   Home's band (user-problem.md §2.3): the pre-filled message says which page
   sent the visitor (ground truth for the §6 measurement plan). */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation — via the website's services page.`
)}`;

/* The entry-link underline (tokens.md §4 signature interaction): a persistent
   hairline that warms to the text gold on hover. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

export default function ServicesPage() {
  return (
    <>
      {/* ============ PAGE HEAD — §0.1 ruled head; the lead names the
           deep-link mechanic honestly (§2 fold item 3) ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">SERVICES</p>
        <div>
          <div>
            <h1>
              {practitionerIsCa
                ? "Income tax, GST, audits, registration — the work, in your words."
                : "Income tax, GST, audit support, registration — the work, in your words."}
            </h1>
            <p className="text-lead text-ink-muted mt-3 measure">
              Six kinds of work people bring to this office. Each entry opens
              the booking form with that service already chosen.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 01 · SERVICES — six numbered ruled entries in
           site-config order (§2 inventory). Titles, descriptions and points
           render verbatim from config; the ?service= value is the same
           title string the /book Select renders, so deep links can't drift
           from the options (page-specs §7.2). No icon tiles — icons are
           retired; the numbered rail replaces them. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>01</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Services</span>
        </p>
        <div>
          <h2>The work we handle</h2>
          <ul className="measure mt-8">
            {services.map((service, i) => (
              <li key={service.title} className="ruled-entry">
                <div className="flex gap-4">
                  <span className="rail-label pt-1" data-numeric>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{service.title}</h3>
                    <p className="text-body text-ink-muted mt-2">
                      {service.description}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {service.points.map((point) => (
                        <li key={point} className="text-meta text-ink-muted">
                          — {point}
                        </li>
                      ))}
                    </ul>
                    {/* The one "what to bring" line (§2 inventory item 6):
                        entry 01 only, drawn from the FAQ documents answer.
                        No other entry invents a document list. */}
                    {i === 0 ? (
                      <p className="text-meta text-ink-muted mt-3">
                        Form 16, PAN and your investment proofs are usually
                        enough to start — you get a checklist for your case.
                      </p>
                    ) : null}
                    <p className="mt-3">
                      <Link
                        href={`/book?service=${encodeURIComponent(service.title)}`}
                        className={entryLink}
                        aria-label={`Book a consultation — the form opens with ${service.title} chosen.`}
                      >
                        Book a consultation — the form opens with this
                        service chosen.
                      </Link>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* The earned S→F click (§2 CTA map): quiet, after the list,
              before the band. The former "not sure which service?" panel is
              deleted — its job moved into the band sentence below. */}
          <Link href="/faq" className="btn-quiet mt-8">
            Documents, fees, notices — the common questions
          </Link>
        </div>
      </section>

      {/* ============ THE ACT BAND — the not-sure path (§2 close); the deep
           links above are the ready path ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">The next step</p>
          <div>
            <h2 className="max-w-[24ch]">
              Not sure which service is yours? Send one line — we&apos;ll
              tell you honestly.
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a consultation on WhatsApp
              </a>
              <a href={`tel:${site.phoneHref}`} className="btn-quiet">
                Call the office ·{" "}
                <span className="phone-number">{site.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <ActionBar />
    </>
  );
}
