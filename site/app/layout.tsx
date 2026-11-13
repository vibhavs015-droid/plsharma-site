import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site-config";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
