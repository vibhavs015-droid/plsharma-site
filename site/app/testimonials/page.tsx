import type { Metadata } from "next";
import { site, confirmedTestimonials } from "@/lib/site-config";
import { visibleTestimonials } from "@/lib/sample-content";
import { showSampleContent } from "@/lib/content-mode";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";

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
   `confirmed` — the owner's real quotes (T16: the six launch quotes are in,
   so production renders the real list) — and `sample` — generic preview
   copy shown only when SHOW_SAMPLE_CONTENT=true. The page renders the
   derived `visibleTestimonials` only. The structure stays future-proof
   (spec §4 + the T7 amendment, which removed the old §02/§03): the reserve
   below yields to the quotes list the moment confirmedTestimonials has
   entries — no restructure needed, and the reserve note can only ever
   show for a TRULY empty list. Preview-only furniture (intro line,
   preview notes) stays gated on showSampleContent, and NO sample tag
   renders anywhere on the page (T16: the badges are retired — qa guard
   §9.3). */
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
            permission note once they do (production today, T16). The ONE
            collection CTA stands in every state, its prefill unchanged. The
            preview intro + preview note render only under
            SHOW_SAMPLE_CONTENT=true; no sample tag renders in any state. ============ */}
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
                  <li key={t.name} className="ruled-entry">
                    <p className="text-body">“{t.quote}”</p>
                    <p className="rail-label mt-2">
                      {t.name} · {t.area}
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
                <div key={t.name} className="ruled-entry measure mt-8">
                  <p className="text-body">“{t.quote}”</p>
                  <p className="rail-label mt-2">
                    {t.name} · {t.area}
                  </p>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </section>

      {/* ============ THE ACT BAND — one sentence, canonical primary,
           quiet phone (§4 close). The sentence is state-aware (T16): with
           real quotes on the page it invites the reader's own case; the
           "page waits" line exists ONLY while the confirmed tier is empty,
           so no empty-state framing ever sits under real client words. ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">The next step</p>
          <div>
            <h2 className="max-w-[24ch]">
              {hasConfirmed
                ? "Facing something similar? Tell us what you need — we reply on WhatsApp and fix a time."
                : "While this page waits, your questions get answered — ask us directly."}
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
