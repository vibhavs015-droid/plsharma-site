import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { LogoMark } from "@/components/site/logo-mark";
import { site, emailHref, visibleNavLinks, services } from "@/lib/site-config";
import { practitionerIsCa } from "@/lib/content-mode";

export function SiteFooter() {
  return (
    <footer className="relative border-t bg-primary text-primary-foreground">
      {/* Screen-reader heading keeps the outline valid (h1/h2 → h3 columns) on
          pages whose body has no h2 of its own, e.g. /contact and /book. */}
      <h2 className="sr-only">Site footer</h2>
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <LogoMark onDark className="size-9 shrink-0" />
            <span className="font-heading text-base font-bold">{site.name}</span>
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/80">
            Tax consultancy serving individuals and businesses in Jaisalmer.
            Accurate filing, honest advice, complete confidentiality.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[color:var(--accent)]">
            Quick links
          </h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            {visibleNavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="hover:text-white hover:underline">
                Book a consultation
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[color:var(--accent)]">
            Services
          </h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            {services.map((service) => (
              <li key={service.title}>
                <Link href="/services" className="hover:text-white hover:underline">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[color:var(--accent)]">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[color:var(--accent)]" />
              {/* T14-G: the address opens Google Maps (same link the
                  contact desk row offers). */}
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline"
              >
                109, Indira Colony, Jaisalmer,
                <br />
                Rajasthan 345001
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-[color:var(--accent)]" aria-hidden />
              <a href={`tel:${site.phoneHref}`} className="hover:text-white hover:underline">
                Call the office ·{" "}
                <span className="phone-number">{site.phone}</span>
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-[color:var(--accent)]" />
              <a href={emailHref} className="break-all hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-[color:var(--accent)]" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days} · {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            © {site.copyrightYear} {site.name}.
          </p>
          {/* CA-gated service list (T6) — mirrors the service card's audit
              status in one line. */}
          <p>
            {practitionerIsCa
              ? "Income Tax, GST, Audit and Business Registration"
              : "Income Tax, GST, Tax Planning and Business Registration"}
          </p>
          {/* T16 owner order: the developer credit — the footer's last
              element, same smallest text and subdued colour as the row it
              sits in (text-xs at primary-foreground/60 ≈ 5.6:1 on the ink
              ground, AA). Plain text, not a link, no icon — a quiet
              colophon, not a watermark. */}
          <p>Developed by Vibhav Sharma</p>
        </div>
      </div>
    </footer>
  );
}
