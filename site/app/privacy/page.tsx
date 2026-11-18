import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "What the booking form collects, where your details go — straight to the office on WhatsApp — and what this site stores: nothing. How to have your details corrected or deleted.",
  path: "/privacy",
});

/* The entry-link underline (tokens.md §4 signature interaction): a persistent
   hairline that warms to the text gold on hover. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* The last-updated date is a hard-coded string on purpose: `new Date()` is
   forbidden during prerender (Cache Components), and this page's facts
   change only when the page itself is edited. */
const LAST_UPDATED = "Last updated 17 November 2026";

export default function PrivacyPage() {
  return (
    <>
      {/* ============ PAGE HEAD — the ruled head, one plain statement.
           No act band on this page: the contact facts in 04 are the close,
           stated, never sold (T10). ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">PRIVACY</p>
        <div>
          <div>
            <h1>One form collects your details — this site stores nothing.</h1>
            <p className="text-lead text-ink-muted mt-3 measure">
              What the booking form asks for, where the details go, and how
              to have them corrected or deleted — in plain words.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 01 · WHAT THE FORM COLLECTS — the real field list,
           not a summary: the form is the only place a visitor types
           anything on this site. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>01</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">What the form collects</span>
        </p>
        <div>
          <h2>What the form collects</h2>
          <p className="text-body text-ink-muted mt-3 measure">
            The <Link href="/book" className={entryLink}>booking form</Link>{" "}
            asks for:
          </p>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="text-body">Your name</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">Your phone or WhatsApp number</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">Your email — optional</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">What you need help with — optional</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">
                A service, a preferred date and a time — only if you choose
                them
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 02 · WHERE YOUR DETAILS GO — the delivery mechanics
           stated exactly as the form behaves: WhatsApp opens with the
           message written, you press Send; email is the second path; the
           site itself keeps nothing. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>02</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Where your details go</span>
        </p>
        <div>
          <h2>Where your details go</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">
                When you send the form, WhatsApp opens with your details
                already written out, addressed to the office (
                <a href={`tel:${site.phoneHref}`} className={entryLink}>
                  <span className="phone-number">{site.phone}</span>
                </a>
                ). You press Send there — nothing is sent automatically.
              </p>
            </li>
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">
                The form has an email option too — the same details, sent to{" "}
                <a href={`mailto:${site.email}`} className={entryLink}>
                  {site.email}
                </a>{" "}
                from your own email app.
              </p>
            </li>
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">
                This site does not store or process your details — there is
                no copy kept on the website. The form only writes your
                message into WhatsApp (or your email app) for you.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 03 · COOKIES AND ANALYTICS — the fact and the promise,
           verbatim (T10). ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>03</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Cookies and analytics</span>
        </p>
        <div>
          <h2>Cookies and analytics</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">
                This site sets no cookies and runs no analytics.
              </p>
            </li>
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">
                If that changes, this page will say so.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 04 · CORRECTING OR DELETING — the office's own
           channels; a person replies, not a process. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>04</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Correcting or deleting</span>
        </p>
        <div>
          <h2>Correcting or deleting your details</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">
                Ask the office and it is done: call or WhatsApp{" "}
                <a href={`tel:${site.phoneHref}`} className={entryLink}>
                  <span className="phone-number">{site.phone}</span>
                </a>
                , or email{" "}
                <a href={`mailto:${site.email}`} className={entryLink}>
                  {site.email}
                </a>
                . A correction, a deletion — just ask.
              </p>
            </li>
          </ul>
          <p className="text-meta text-ink-muted mt-8">{LAST_UPDATED}</p>
        </div>
      </section>
      <ActionBar />
    </>
  );
}
