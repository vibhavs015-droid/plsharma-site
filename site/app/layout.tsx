import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site-config";
import { showSampleContent } from "@/lib/content-mode";
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
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "tax consultant",
    "income tax filing",
    "GST registration",
    "tax audit",
    "business registration",
    "Jaisalmer",
    "Rajasthan",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_IN",
    url: site.siteUrl,
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#282E3F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {showSampleContent ? <SampleBanner /> : null}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:top-4 focus:left-4 focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink focus:border focus:border-brass"
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
