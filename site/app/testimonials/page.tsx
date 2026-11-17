import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { visibleTeam, visibleTestimonials } from "@/lib/sample-content";
import { SampleTag } from "@/components/site/sample-tag";

export const metadata: Metadata = {
  title: "Client words — published with permission",
  description:
    "This page stays empty until real clients agree to be quoted — nothing is invented. The proof that exists today: P.L. Sharma And Company has practised in Jaisalmer since 2001.",
  alternates: { canonical: "/testimonials" },
};

/* Page-aware wa.me deep links (user-problem.md §6): the band primary carries
 * the booking prefill with this page's name; the §01 collection line keeps
 * the question prefill — offering a quote is a question, not a booking
 * (page-specs §4 CTA map, §0.3 exception pattern). */
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

/* NOTE: client words live in two tiers (site-config): `confirmed` — real
   quotes, deliberately EMPTY until the owner sends them — and `sample` —
   generic preview copy shown only when SHOW_SAMPLE_CONTENT=true. This
   page renders the derived `visibleTestimonials` only: production
   resolves to the empty confirmed tier, so the honesty reserve below is
   the whole section and no sample string is rendered; owner preview adds
   the four sample entries, each visibly tagged SAMPLE (page-specs §4,
   qa guard §9.3). */

const founder = visibleTeam[0];

export default function TestimonialsPage() {
  return (
    <>
      {/* ============ PAGE HEAD — §0.1 ruled head; the h1 states the policy
           without apologising (§4 fold items 1–2) ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">
          {site.shortName} · Testimonials · Jaisalmer
        </p>
        <div>
          <div>
            <h1>
              Real client words — published with permission, and not before.
            </h1>
            <p className="text-lead text-ink-muted mt-3 measure">
              This page stays empty until real clients agree to be quoted.
              Nothing here is invented.
            </p>
          </div>
        </div>
      </section>

      {/* ============ § 01 · CLIENT WORDS — the designed gap is the content:
            the one placeholder mark this page carries (§0.4), visible in
            the fold, plus the collection invite as a live function (§4
            inventory). No stars, no invented quotes, no preview framing. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 01 · Client words</p>
        <div>
          <h2>Client words</h2>
          <div className="ruled-entry measure mt-8">
            <p className="placeholder-mark">
              [PLACEHOLDER — AWAITING REAL TESTIMONIAL FROM OWNER]
            </p>
            <p className="text-body text-ink-muted mt-4">
              A quote appears here only after a real client has read it and
              agreed to be named. Until then the entry stays empty on
              purpose — this page publishes only what the firm can stand
              behind.
            </p>
            <p className="text-body mt-4">
              <a href={questionHref} className={entryLink} target="_blank" rel="noopener noreferrer">
                If this office has handled your file and you&apos;d be willing
                to be quoted, say so on WhatsApp — your permission decides
                what appears.
              </a>
            </p>
          </div>
          {/* Owner preview only: the four generic sample entries, each
              visibly tagged. Production resolves visibleTestimonials to
              the empty confirmed tier, so this map renders nothing and
              the reserve above stays the entire section. */}
          {visibleTestimonials.map((t) => (
            <div key={t.area} className="ruled-entry measure mt-8">
              <p className="text-body">“{t.quote}”</p>
              <p className="rail-label mt-2">
                {t.name} · {t.area} <SampleTag />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ § 02 · THE PROOF THAT EXISTS TODAY — the record line
            plus three quiet links into the real pages; the page never
            dead-ends (§4 inventory, §4.1 zero journey weight) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 02 · The proof that exists today</p>
        <div>
          <h2>The proof that exists today</h2>
          <div className="ruled-entry measure mt-8">
            <p className="rail-label" data-numeric>
              Since {site.establishedYear} · {site.stats[0].label}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-body">
                <Link href="/about" className={entryLink}>
                  The principal
                </Link>
              </p>
              <p className="text-body">
                <Link href="/why-choose-us" className={entryLink}>
                  How we work
                </Link>
              </p>
              <p className="text-body">
                <Link href="/faq" className={entryLink}>
                  Straight answers
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ § 03 · THE SIGNED PAGE (M3) — the principal's name and
            facts, set in the regular faces (no italic ships in Phase 3,
            §0.6). The entry's top rule is the hairline. A signature is
            never drawn, traced or faked — the name only, until the scan
            arrives (§4 inventory) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 03 · The signed page</p>
        <div>
          <h2>The signed page</h2>
          <div className="ruled-entry measure mt-8">
            <h3>{founder.name}</h3>
            <p className="rail-label mt-1" data-numeric>
              Principal Consultant · Jaisalmer · Since {site.establishedYear}
            </p>
          </div>
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
                Call the office · {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
