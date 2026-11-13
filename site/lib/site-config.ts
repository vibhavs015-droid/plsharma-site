/**
 * ============================================================
 *  SITE CONTENT — P.L. Sharma And Company
 * ============================================================
 *  This is the ONLY file you need to edit to update the website
 *  content: name, phone, WhatsApp, email, address, services,
 *  testimonials, FAQs, team, stats, working hours.
 *
 *  ⚠️ Values marked "PLACEHOLDER" must be replaced with real
 *     details before going live.
 * ============================================================
 */

export const site = {
  name: "P.L. Sharma And Company",
  shortName: "P.L. Sharma & Co.",
  tagline: "Tax Consultants & Financial Advisors",
  // User confirmed: the practice has been running for about 25 years → est. ~2001
  establishedYear: 2001,
  copyrightYear: 2026, // update each January (or ask the developer to automate)
  description:
    "P.L. Sharma And Company is a trusted tax consultancy offering income tax filing, GST compliance, audits and business registration services to individuals and businesses.",

  phone: "+91 98297 71396",
  phoneHref: "+919829771396", // digits only, used for tel: links
  whatsappNumber: "919829771396", // country code + number, digits only
  email: "plperiwal@yahoo.com",
  address: "109, Indira Colony, Jaisalmer, Rajasthan, India — 345001",
  mapsQuery: "109, Indira Colony, Jaisalmer, Rajasthan 345001", // used for the embedded map
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

  // Only "25+ years" is a confirmed figure (per user, Nov 2026). The other
  // tiles are service promises, not invented numbers — do not add fake stats.
  stats: [
    { value: "25+", label: "Years of Experience" },
    { value: "2001", label: "Serving Jaisalmer Since" },
    { value: "1:1", label: "Personal Attention on Every Case" },
    { value: "100%", label: "Confidential & Secure" },
  ],
};

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
      "Clear, agreed-upon fees before work begins. No hidden charges, no surprises.",
    icon: "shield-check",
  },
  {
    title: "On-Time, Every Time",
    description:
      "Strict deadlines discipline — returns and filings are completed well before due dates.",
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

// ⚠️ PLACEHOLDER testimonials — replace with real client feedback
export const testimonials = [
  {
    quote:
      "P.L. Sharma ji has been handling my personal and business taxes for over 10 years. Filing is always done early and I've never once worried about a notice.",
    name: "Rajesh Verma",
    role: "Business Owner",
  },
  {
    quote:
      "They registered my company and handled everything — GST, TAN, MSME. I didn't have to visit any office. Very professional and honest about fees.",
    name: "Sunita Malhotra",
    role: "Founder, Retail Business",
  },
  {
    quote:
      "I received a scrutiny notice and was very stressed. Sharma sir handled the entire process and it closed smoothly. Truly experienced hands.",
    name: "Amit Khanna",
    role: "Salaried Professional",
  },
  {
    quote:
      "Clear advice, no jargon, and he explains everything patiently. My parents also file their returns here now.",
    name: "Priya Nair",
    role: "IT Professional",
  },
];

export const faqs = [
  {
    question: "How do I book a consultation?",
    answer:
      "Use the booking form on this website or tap the WhatsApp button. Share your name, service needed and preferred date — we will confirm your appointment slot.",
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

// Photos go in public/images/. father.jpg is already wired in.
// NOTE: roles/bios below are presentable interim copy — swap in the real
// details when the user provides them (see PROJECT-NOTES pending list).
export const team = [
  {
    name: "Parbhati Lal Sharma",
    role: "Founder & Principal Consultant",
    bio: "Over two decades of practice in income tax, GST, audits and compliance — known in Jaisalmer for straight advice, careful work and complete confidentiality.", // provisional — replace with real qualifications/bio
    photo: "father.jpg", // ✅ photo added by user
  },
  {
    name: "Vikram Singh Soda",
    role: "Senior Tax Associate", // provisional role
    bio: "Handles assessments, returns and client coordination with careful attention to every deadline.",
    photo: "team-1.jpg", // awaiting photo
  },
  {
    name: "Bhawani",
    role: "GST & Compliance Associate", // provisional role
    bio: "Manages GST registrations, returns and reconciliations for our business clients.",
    photo: "team-2.jpg", // awaiting photo
  },
  {
    name: "Hemraj",
    role: "Accounts & Bookkeeping Executive", // provisional role
    bio: "Keeps client books accurate and audit-ready, month after month.",
    photo: "team-3.jpg", // awaiting photo
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
