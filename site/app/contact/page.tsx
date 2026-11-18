import type { Metadata } from "next";
import { site, emailHref } from "@/lib/site-config";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";

export const metadata: Metadata = pageMetadata({
  title: "Contact the office",
  description: `Visit ${site.address} — open ${site.hours[0].days}, ${site.hours[0].time}. Call or WhatsApp ${site.phone}, or email ${site.email}.`,
  path: "/contact",
});

/* Page-aware wa.me deep links (user-problem.md §6): the band primary carries
 * the booking prefill with this page's name; the desk card's WhatsApp row
 * keeps the question prefill — a contact-page message is not always a booking
 * (page-specs §0.3 exception, §6). */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation — via the website's contact page.`
)}`;
const questionHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I have a question.`
)}`;

/* The entry-link underline (tokens.md §4 signature interaction): a persistent
   hairline that warms to the text gold on hover. Every linked desk row and
   the maps link use it; email is a quiet text link, never a fill button. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* One desk row: small rail marker above the value, the slip's field rhythm
   without the fields. No icon tiles — icons are retired; type rules the
   desk (page-specs §6 do-not list). */
function DeskRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="rail-label">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* ============ PAGE HEAD — §0.1 ruled head; the lead carries the
           essentials as searchable text, no image (§6 fold items 1–3).
           Hours render from config so the stated times can't drift from
           the desk rows. ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">CONTACT</p>
        <div>
          <div>
            <h1>One office in Jaisalmer — open six days a week.</h1>
            <p className="text-lead text-ink-muted mt-3 measure" data-numeric>
              {/* T14-G: the lead's address opens Google Maps. */}
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={entryLink}
              >
                109, Indira Colony
              </a>{" "}
              · {site.hours[0].days}, {site.hours[0].time} · WhatsApp and
              phone reach the same desk.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 01 · THE OFFICE — the desk slip: the .slip primitive
           from /book's precedent (tokens.md §5 first shipped instance), on
           its sand ground, ruled head "The office". Rows: phone · WhatsApp
           (question prefill) · address + the one map link · hours stated
           from config, never widgeted · email last, quiet text (§6 fold
           item 4). No embedded map iframe, no booking form. ============ */}
      <section className="border-y border-line bg-sand">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label rail-num">
            <span className="rail-num-figure" data-numeric>01</span>
            <span className="rail-num-rule" />
            <span className="rail-num-text">The office</span>
          </p>
          <div>
            <div className="slip">
              <div className="slip-head">
                <h2 className="text-xl">The office</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <DeskRow label="Call the office">
                  <p className="text-body">
                    <a href={`tel:${site.phoneHref}`} className={entryLink}>
                      <span className="phone-number">{site.phone}</span>
                    </a>
                  </p>
                </DeskRow>

                <DeskRow label="WhatsApp">
                  <p className="text-body">
                    <a
                      href={questionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={entryLink}
                      aria-label={`WhatsApp · ${site.phone}`}
                    >
                      <span className="phone-number">{site.phone}</span>
                    </a>
                  </p>
                </DeskRow>

                <DeskRow label="Address">
                  <p className="text-body text-ink-muted">{site.address}</p>
                  <p className="mt-2">
                    <a
                      href={site.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={entryLink}
                    >
                      Open in Google Maps
                    </a>
                  </p>
                </DeskRow>

                <DeskRow label="Hours">
                  {site.hours.map((h) => (
                    <p key={h.days} className="text-body text-ink-muted" data-numeric>
                      {h.days} · {h.time}
                    </p>
                  ))}
                </DeskRow>

                <DeskRow label="Email">
                  <p className="text-body">
                    <a href={emailHref} className={entryLink}>
                      {site.email}
                    </a>
                  </p>
                </DeskRow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 · BEFORE YOU COME — the walk-in welcome, sourced
           from the FAQ online answer (§6 inventory); hours stay stated, no
           live open/closed badge. T14-F: this is the one paper section that
           follows a bordered band, so it carries the section space itself —
           the standard pb-only rhythm assumes the previous section's
           padding sits on paper, and here it sits inside the sand band
           (owner screenshot: h2 jammed under the hairline). pt gives the
           h2 one clean --space-section of paper above it, the same gap
           every other section gets from its predecessor. ============ */}
      <section className="ledger-rail pt-[var(--space-section)] pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>02</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Before you come</span>
        </p>
        <div>
          <h2>Before you come</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">
                Walk in any working day — books and audit papers are easier
                across a desk. Routine matters (returns, GST filings,
                documents) often don&apos;t need a visit at all: they move
                over WhatsApp.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ THE ACT BAND — the page's gravity stays on the primary
           (§6 close): one sentence, canonical primary, quiet phone ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">The next step</p>
          <div>
            <h2 className="max-w-[24ch]">
              We reply on WhatsApp and fix a time — or just walk in.
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
