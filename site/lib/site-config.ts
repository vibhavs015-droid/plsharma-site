/**
 * ============================================================
 *  SITE CONTENT (confirmed tier only) — P.L. Sharma And Company
 * ============================================================
 *  This file holds the CLIENT-SAFE content: name, phone, WhatsApp,
 *  email, address, services, FAQs, nav links, the confirmed team
 *  (the founder) and the confirmed client-words tier (empty until
 *  the owner sends real quotes). Client components ("use client")
 *  import from here, so EVERYTHING in this file ships in the
 *  production JS bundle — keep it free of sample/placeholder data.
 *
 *  SAMPLE content lives in lib/sample-content.ts (server-side
 *  consumption only): the sample testimonial and team arrays, the
 *  principal-quote tiers and the derived visible* exports pages
 *  render. The preview flag is lib/content-mode.ts
 *  (SHOW_SAMPLE_CONTENT=true — OWNER PREVIEW ONLY, never set on a
 *  public deploy); every sample item renders with a visible tag.
 *  The only cross-import is that flag (a boolean, no content) from
 *  lib/content-mode.ts — needed by visibleNavLinks below.
 *
 *  ⚠️ Values marked "PLACEHOLDER" must be replaced with real
 *     details before going live.
 * ============================================================
 */

export type Testimonial = { quote: string; name: string; area: string };
export type TeamMember = { name: string; role: string; bio: string; photo: string };

// The preview flag — a boolean, no content; client-safe (header note above).
import { showSampleContent } from "./content-mode";

export const site = {
  name: "P.L. Sharma And Company",
  shortName: "P.L. Sharma & Co.",
  tagline: "Tax Consultants & Financial Advisors",
  // User confirmed: the practice has been running for about 25 years → est. ~2001
  establishedYear: 2001,
  copyrightYear: 2026, // update each January (or ask the developer to automate)
  description:
    "P.L. Sharma And Company is a tax consultancy in Jaisalmer offering income tax filing, GST compliance, audits and business registration services to individuals and businesses.",

  phone: "+91 98297 71396",
  phoneHref: "+919829771396", // digits only, used for tel: links
  whatsappNumber: "919829771396", // country code + number, digits only
  email: "plperiwal@yahoo.com",
  address: "109, Indira Colony, Jaisalmer, Rajasthan, India — 345001",
  mapsLink: "https://maps.app.goo.gl/Ap3EUniM15RsW7oCA", // "Open in Google Maps" link

  // Live website URL — used for sitemap.xml, robots.txt, canonical links and
  // share previews. After buying the domain either (a) set the
  // NEXT_PUBLIC_SITE_URL env var on the host, or (b) edit this default.
  // Recommended domain: plsharmaco.in (see DEPLOYMENT.md for options).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://plsharmaco.in",

  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],

  // Owner-confirmed facts only (per user, Nov 2026): "25+ years" and "since
  // 2001" are the same fact, kept as ONE honest tile (Phase 1 critic fix).
  // The former "1:1" and "100%" tiles were service promises, not statistics —
  // removed; do not add unconfirmed stats (see docs/design/critic/).
  stats: [
    { value: "Since 2001", label: "25+ Years in Practice in Jaisalmer" },
  ],
};

// ── DERIVED FACT CONSTANTS (spec §2.2 binding notes) ───────────────
// Computed, never hard-coded: copyrightYear is bumped each January, so the
// band re-derives itself. (new Date() at prerender is forbidden — Cache
// Components; this stays build-time arithmetic on config values.)
export const yearsInPractice = site.copyrightYear - site.establishedYear;

// Compact hours display for fact bands — keep in sync with site.hours[0].
// /contact, /book and the footer render site.hours verbatim; only compact
// fact bands use this abbreviation.
export const hoursCompact = "Mon–Sat 10:00–7:00";

export const services = [
  {
    title: "Income Tax & ITR Filing",
    description:
      "Accurate preparation and filing of income tax returns for salaried individuals, professionals and businesses — with maximum legal deductions.",
    points: ["ITR-1 to ITR-7", "Capital gains & refunds", "Notices & scrutiny support"],
    icon: "file-text",
  },
  {
    title: "GST Registration & Compliance",
    description:
      "End-to-end GST services — new registration, monthly/quarterly returns, annual filing and reconciliation handled on time, every time.",
    points: ["GST registration", "GSTR-1 / 3B / 9 filing", "Input tax credit support"],
    icon: "receipt",
  },
  {
    title: "Audit & Assurance",
    description:
      "Independent and reliable audit services that keep your books compliant and give you a clear picture of your business finances.",
    points: ["Tax audit (44AB)", "Statutory audit", "Stock & internal audit"],
    icon: "clipboard-check",
  },
  {
    title: "Business Registration & Licensing",
    description:
      "Start your business the right way — company, LLP or firm registration, along with the licenses and registrations you need.",
    points: ["Pvt Ltd / LLP / Partnership", "MSME / Udyam, Shop & Establishment", "PAN, TAN & other registrations"],
    icon: "building-2",
  },
  {
    title: "Tax Planning & Advisory",
    description:
      "Practical, year-round tax planning so you legally save more and avoid last-minute surprises.",
    points: ["Advance tax planning", "Investment-linked deductions", "NRI & cross-border advisory"],
    icon: "calculator",
  },
  {
    title: "TDS, Payroll & Bookkeeping",
    description:
      "Routine compliance taken off your plate — TDS returns, payroll processing and clean, up-to-date books.",
    points: ["TDS return filing", "Payroll & Form 16", "Monthly bookkeeping"],
    icon: "landmark",
  },
];

export const whyChooseUs = [
  {
    title: "25+ Years of Experience",
    description:
      "Decades of hands-on practice across individual, business and NRI taxation — there is no situation we haven't seen.",
    icon: "award",
  },
  {
    title: "Personal Attention",
    description:
      "You speak directly with the principal consultant, not a call centre. Every case is handled personally.",
    icon: "users",
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear, agreed fees before work begins. No hidden charges, no surprises.",
    icon: "shield-check",
  },
  {
    title: "On-Time, Every Time",
    description:
      "Returns and filings are completed well before their due dates.",
    icon: "clock",
  },
  {
    title: "Complete Confidentiality",
    description:
      "Your financial data stays strictly between us. Professional secrecy is the foundation of our practice.",
    icon: "lock",
  },
  {
    title: "End-to-End Support",
    description:
      "From first consultation to notice handling — we stay with you through the whole process.",
    icon: "handshake",
  },
];

// ── CLIENT WORDS — confirmed tier ──────────────────────────────────
// Real, owner-supplied client words. Stays EMPTY until the owner
// sends real quotes — the /testimonials honesty reserve renders
// nothing from it, and nothing invented may ever fill it. The
// sample tier and the derived visible lists live in
// lib/sample-content.ts.
export const confirmedTestimonials: Testimonial[] = [];

export const faqs = [
  {
    question: "How do I book a consultation?",
    answer:
      "Use the booking form on this website or tap the WhatsApp button. Share your name, service needed and preferred date — we will confirm your slot on WhatsApp.",
  },
  {
    question: "Which documents do I need?",
    answer:
      "For salaried individuals: Form 16, interest certificates, investment proofs (80C, 80D etc.) and Aadhaar/PAN. For businesses: books of account, bank statements, sales & purchase details. We will give you a checklist specific to your case.",
  },
  {
    question: "What are your fees?",
    answer:
      "Fees depend on the complexity of the work — a simple salary return costs much less than a business audit. You will always be told the exact fee upfront before we begin. Please contact us for a quote.",
  },
  {
    question: "Can consultations happen online?",
    answer:
      "Yes. While we welcome you at our office, most routine matters (ITR filing, GST returns, documents) can be handled completely over WhatsApp, email or phone.",
  },
  {
    question: "I got a tax notice. What now?",
    answer:
      "Don't panic, and don't ignore it. Bring or send us the notice as soon as possible — we will read it, explain what it means in plain language, and prepare a proper response within the deadline.",
  },
  {
    question: "Do you handle GST registration?",
    answer:
      "Yes — registration, amendments, monthly/quarterly returns and annual reconciliation. We also advise on whether GST registration is required for your turnover and business type.",
  },
  {
    question: "Is my information confidential?",
    answer:
      "Absolutely. Professional confidentiality is a cornerstone of our practice. Your documents and data are never shared with any third party.",
  },
];

// ── TEAM — confirmed tier ──────────────────────────────────────────
// The principal: real, owner-confirmed name and role; his bio below
// is PROVISIONAL and needs the owner's real bio. The three sample
// associate entries live in lib/sample-content.ts until the owner
// confirms real names, roles, bios and photos (see PROJECT-NOTES
// pending list). Photos go in public/images/. father.jpg is wired in.
export const confirmedTeam: TeamMember[] = [
  {
    name: "Parbhati Lal Sharma",
    role: "Founder & Principal Consultant",
    bio: "Over two decades of practice in income tax, GST, audits and compliance — known in Jaisalmer for straight advice, careful work and complete confidentiality.", // PROVISIONAL — needs the owner's real bio
    photo: "father.jpg", // ✅ photo added by user
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// ── NAV VISIBILITY — /testimonials stays in the nav only once real client
// words exist (the honesty wall: production with zero confirmed quotes
// hides the link in header + footer; owner preview keeps it). Derived from
// the confirmed tier — no sample data involved, so this export stays
// client-safe (header.tsx is a "use client" component and imports it).
export const visibleNavLinks = navLinks.filter(
  (l) =>
    l.href !== "/testimonials" ||
    confirmedTestimonials.length > 0 ||
    showSampleContent
);
