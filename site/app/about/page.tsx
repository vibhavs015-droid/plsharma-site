import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { visibleTeam, visiblePrincipalQuote } from "@/lib/sample-content";
import { practitionerIsCa } from "@/lib/content-mode";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";
import { SampleTag } from "@/components/site/sample-tag";

export const metadata: Metadata = pageMetadata({
  title: "About the practice",
  description:
    "About P.L. Sharma And Company — Parbhati Lal Sharma has practised in Jaisalmer since 2001. You speak to the principal himself, the fee is agreed before work begins, and the first consultation is free.",
  path: "/about",
});

/* Page-aware wa.me deep link for the end-of-page band — same mechanics as
   Home's band (user-problem.md §2.3): the pre-filled message says which page
   sent the visitor (ground truth for the §6 measurement plan). */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation — via the website's about page.`
)}`;

/* The entry-link underline (tokens.md §4 signature interaction): a persistent
   hairline that warms to the text gold on hover. The page's one quiet link
   besides the band's phone (page-specs §1 CTA map). */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

const founder = visibleTeam[0];

export default function AboutPage() {
  return (
    <>
      {/* ============ PAGE HEAD — §0.1 ruled head + the founder plate in the
           fold's lower half (§1 fold items 1–4) ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">
          {site.shortName} · About · Jaisalmer
        </p>
        <div>
          <div>
            <h1>Parbhati Lal Sharma has practised in Jaisalmer since 2001.</h1>

            <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-8">
              <p className="text-lead text-ink-muted measure">
                You speak to the principal himself — the person who does the
                work.
              </p>

              {/* Founder plate: the same interim graded crop as the Home hero
                  (tokens.md §7, acceptance-tested; reshoot #1a pending) —
                  never raw father.jpg, no arch, no circle. Not a link here:
                  this is /about itself. The caption rows below it carry the
                  facts, so the image is decorative to assistive tech (alt=""),
                  as on Home. */}
              <figure className="w-fit max-w-[300px] shrink-0">
                <Image
                  src="/images/founder-plate-polished.webp"
                  alt=""
                  width={300}
                  height={375}
                  sizes="(min-width: 1024px) 300px, 40vw"
                  priority
                  fetchPriority="high"
                  unoptimized
                  className="block h-auto w-full"
                />
                <p className="rail-label mt-3">{founder.name}</p>
                <p className="rail-label mt-1">Principal Consultant · Jaisalmer</p>
                <span aria-hidden className="mt-3 block h-px w-full bg-line" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 01 · THE PRACTICE — the one honest stat (the record
            line, same words as Home 03) + the short true story; no mark, no
            invented milestones (§1 content source). The work list is
            CA-gated (T6): "audits" drops out until the owner confirms. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>01</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">The practice</span>
        </p>
        <div>
          <h2>The practice</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="rail-label" data-numeric>
                Since {site.establishedYear} · {site.stats[0].label}
              </p>
              <p className="text-body text-ink-muted mt-3">
                {practitionerIsCa
                  ? "The work is the everyday work of a tax office: income tax returns and notices, GST registration and returns, audits, business registrations, tax planning, TDS and bookkeeping."
                  : "The work is the everyday work of a tax office: income tax returns and notices, GST registration and returns, business registrations, tax planning, TDS and bookkeeping."}
              </p>
              <p className="mt-3">
                <Link href="/services" className={entryLink}>
                  The work we handle
                </Link>
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 02 · THE PRINCIPAL — how the work is handled: three
           owner-confirmed facts, the canonical free-first sentence among
           them (§0.6 allows exactly three placements; this is /about's) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>02</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">The principal</span>
        </p>
        <div>
          <h2>The principal</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="text-body">
                The first conversation is about understanding your case.
              </p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">The fee is agreed before work begins.</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">The first consultation is free.</p>
            </li>
          </ul>
        </div>
        {/* Margin-rail note (§1 inventory): the page's single designed gap —
            M2's founder aside, honest until the owner supplies the line. It
            auto-places into the margin column at ≥64rem and reads as a
            footnote below the copy on small screens. */}
        <p className="placeholder-mark mt-8">
          [PLACEHOLDER — A LINE FROM THE PRINCIPAL HIMSELF, AWAITING OWNER]
        </p>
        {/* The principal's own line, in the gap the mark announces — owner
            preview only: production resolves visiblePrincipalQuote to null
            (confirmed: null in config), so this block renders nothing and
            02 above is untouched. Preview shows the facts-safe sample
            line, tagged. */}
        {visiblePrincipalQuote ? (
          <div className="mt-6">
            <SampleTag />
            <p className="text-body mt-2">“{visiblePrincipalQuote}”</p>
          </div>
        ) : null}
      </section>

      {/* ============ 03 · THE TEAM — names only: no roles, no bios, no
            photos, no initials standing in for people (§1 do-not list).
            Production renders the confirmed tier — the founder only; owner
            preview adds the three sample members, each tagged SAMPLE.
            Roles and bios stay unrendered in both modes. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>03</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">The team</span>
        </p>
        <div>
          <h2>The team</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <h3>{founder.name}</h3>
              <p className="text-meta text-ink-muted mt-1">{founder.role}</p>
            </li>
            {visibleTeam.slice(1).map((member) => (
              <li key={member.name} className="ruled-entry">
                <h3>{member.name}</h3>
                <p className="mt-1">
                  <SampleTag />
                </p>
              </li>
            ))}
          </ul>
          {/* Section-level mark (§0.4): the whole section's detail is
              pending — one mark for it, never one per row. */}
          <p className="placeholder-mark mt-8">
            [PLACEHOLDER — TEAM PHOTOS AND CONFIRMED ROLES, AWAITING OWNER]
          </p>
        </div>
      </section>

      {/* ============ THE ACT BAND — the ask in the principal's own terms
           (§1 close): one sentence, canonical primary, quiet phone ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">The next step</p>
          <div>
            <h2 className="max-w-[24ch]">
              Ask him directly — send your name and what you need on WhatsApp.
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
