import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site-config";
import { allowIndexing, practitionerIsCa, showSampleContent, siteUrl } from "@/lib/content-mode";
import { SampleBanner } from "@/components/site/sample-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

// Text face. Inter 400/500/600, self-hosted via next/font.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display face. Fraunces variable — the shipped contract is wght + opsz only.
// Italic, SOFT and WONK were dropped from the loader: loaded-but-unused
// everywhere (italic was unstyled anywhere; SOFT/WONK were pinned to 0 in
// globals.css, i.e. rendered at defaults), and the 4-axis × 2-style config
// preloaded 264 KB of Fraunces on / for default rendering. They return the
// moment real usage ships (see tokens.md §2 after the art-director's update).
// Consumed by --font-heading in globals.css.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  // The canonical host — from siteUrl (lib/content-mode.ts), the preview
  // host until SITE_URL is set on the live one (T9.1). Canonicals, og:url
  // and JSON-LD resolve against this.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // "tax audit" is CA-gated like the audit card (T6) — a keyword is a claim.
  keywords: [
    "tax consultant",
    "income tax filing",
    "GST registration",
    ...(practitionerIsCa ? (["tax audit"] as const) : []),
    "business registration",
    "Jaisalmer",
    "Rajasthan",
  ],
  // Site-wide indexing guard (T9.4): DEFAULT noindex/nofollow; the page-level
  // robots exports (e.g. /testimonials) still override when indexing is on.
  ...(allowIndexing ? {} : { robots: { index: false, follow: false } }),
  // Fallback openGraph for any route that does not define its own — every
  // shipped page defines one via pageMetadata(), which REPLACES this whole
  // block (segment merge rules), so the og:image is re-declared there too.
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}, Jaisalmer`,
      },
    ],
  },
};

// Android/iOS viewport markup (TASK 12.1). viewportFit=cover lets content
// paint edge-to-edge behind notches — the safe-area vars in globals.css
// only resolve when it is set. interactiveWidget=resizes-content makes the
// Android keyboard resize the layout instead of overlaying it, so the /book
// form stays reachable while typing. Both fields verified typed in this
// Next: generate-viewport.md docs + dist/lib/metadata/types/extra-types.d.ts.
export const viewport: Viewport = {
  themeColor: "#282E3F",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      {/* dvh body (TASK 12.2): min-height tracks the dynamic viewport, so
          nothing is stranded behind mobile browser chrome; html keeps its
          h-full. Replaces the min-h-full (100%) chain. */}
      <body className="flex min-h-dvh flex-col">
        {showSampleContent ? <SampleBanner /> : null}
        {/* Skip link (TASK 12.3): on focus it lands below the notch —
            max(1rem, var(--safe-top)) — instead of a fixed 1rem. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:top-[max(1rem,var(--safe-top))] focus:left-4 focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink focus:border focus:border-brass"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
