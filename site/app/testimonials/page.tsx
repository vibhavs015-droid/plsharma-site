import type { Metadata } from "next";
import { site, confirmedTestimonials } from "@/lib/site-config";
import { visibleTestimonials } from "@/lib/sample-content";
import { showSampleContent } from "@/lib/content-mode";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";
import { SampleTag } from "@/components/site/sample-tag";

// The helper's full share set, plus the conditional robots flag (Item 0):
// noindex while the confirmed tier is empty — production AND preview — and
// automatically indexable the moment real permissioned quotes land. A
// page-level robots export overrides the layout's site-wide guard.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Client words — published with permission",
    description:
      "Real client words — published with permission, and not before. Nothing is invented: P.L. Sharma And Company has practised in Jaisalmer since 2001.",
    path: "/testimonials",
  }),
  robots: { index: confirmedTestimonials.length > 0 },
};

/* Page-aware wa.me deep links (user-problem.md §6): the band primary carries
 * the booking prefill with this page's name; the 01 collection line keeps
 * the question prefill — offering a quote is a question, not a booking
 * (spec §4 + §6 prefill map; the exception list extends to this page). */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation — via the website's testimonials page.`
)}`;
const questionHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I have a question.`
)}`;

/* The entry-link underline (tokens.md §4 signature interaction): a persistent
   hairline that warms to the text gold on hover. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* NOTE: client words live in two tiers (site-config + sample-content):
   `confirmed` — real quotes, deliberately EMPTY until the owner sends them —
   and `sample` — generic preview copy shown only when SHOW_SAMPLE_CONTENT=
   true. The page renders the derived `visibleTestimonials` only. The
   structure is future-proof (spec §4 + the T7 amendment, which removed the
   old §02/§03): the reserve below yields to the quotes list the moment
   confirmedTestimonials has entries — no restructure needed. Preview-only
   furniture (intro line, sample tags) must never appear in production HTML
   (qa guard §9.3), so every such render is gated on showSampleContent. */
const hasConfirmed = confirmedTestimonials.length > 0;

export default function TestimonialsPage() {
  return (
    <>
      {/* ============ PAGE HEAD — §0.1 ruled head; the h1 states the policy
           without apologising (§4 fold items 1–2). The lead swaps to the
           reserved line once real quotes render (spec §4). ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">TESTIMONIALS</p>
        <div>
          <div>
            <h1>
              Real client words — published with permission, and not before.
            </h1>
            <p className="text-lead text-ink-muted mt-3 measure">
              {hasConfirmed && !showSampleContent
                ? "Real client words, each shared with the client's permission."
                : "This page stays empty until real clients agree to be quoted. Nothing here is invented."}
            </p>
          </div>
        </div>
      </section>

      {/* ============ 01 · CLIENT WORDS — the designed gap is the content:
            the reserve while no real quote exists; the quotes list + the
            permission note once they do. The ONE collection CTA stands in
            every state, its prefill unchanged. The preview intro + tagged
            samples render only under SHOW_SAMPLE_CONTENT=true. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>01</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Client words</span>
        </p>
        <div>
          <h2>Client words</h2>
          {hasConfirmed ? (
            <>
              {showSampleContent ? (
                <p className="text-body text-ink-muted mt-8">
                  Sample entries for preview only — not real client words.
                </p>
              ) : null}
              <ul className="measure mt-8">
                {visibleTestimonials.map((t) => (
                  <li key={t.area} className="ruled-entry">
                    <p className="text-body">“{t.quote}”</p>
                    <p className="rail-label mt-2">
                      {t.name} · {t.area}{" "}
                      {showSampleContent ? <SampleTag /> : null}
                    </p>
                  </li>
                ))}
              </ul>
              {!showSampleContent ? (
                <p className="text-body text-ink-muted mt-4">
                  Shared with the client&apos;s permission.
                </p>
              ) : null}
            </>
          ) : (
            // T14-F3: the bracketed placeholder mark is gone (owner hates
            // that style — same rule as T14-B on /about). The plain note
            // below carries the empty state on its own, so it now sits at
            // the entry's top padding with no extra lead-in gap.
            <div className="ruled-entry measure mt-8">
              <p className="text-body text-ink-muted">
                A quote appears here only after a real client has read it and
                agreed to be named. Until then the entry stays empty on
                purpose — this page publishes only what the firm can stand
                behind.
              </p>
            </div>
          )}
          <p className="text-body mt-4">
            <a href={questionHref} className={entryLink} target="_blank" rel="noopener noreferrer">
              A quote to share? Send it — your permission decides what
              appears.
            </a>
          </p>
          {showSampleContent && !hasConfirmed ? (
            <>
              <p className="text-body text-ink-muted mt-8">
                Sample entries for preview only — not real client words.
              </p>
              {visibleTestimonials.map((t) => (
                <div key={t.area} className="ruled-entry measure mt-8">
                  <p className="text-body">“{t.quote}”</p>
                  <p className="rail-label mt-2">
                    {t.name} · {t.area} <SampleTag />
                  </p>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </section>

      {/* ============ THE ACT BAND — the page waits, the questions don't
           (§4 close): one sentence, canonical primary, quiet phone ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">The next step</p>
          <div>
            <h2 className="max-w-[24ch]">
              While this page waits, your questions get answered — ask us
              directly.
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
