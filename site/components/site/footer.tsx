import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { LogoMark } from "@/components/site/logo-mark";
import { site, navLinks, services } from "@/lib/site-config";

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
            Trusted tax consultancy serving individuals and businesses
            since {site.establishedYear}. Accurate filing, honest advice,
            complete confidentiality.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[color:var(--accent)]">
            Quick links
          </h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            {navLinks.map((link) => (
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
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[color:var(--accent)]">
            Services
          </h3>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            {services.slice(0, 5).map((service) => (
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
              <span>
                109, Indira Colony, Jaisalmer,
                <br />
                Rajasthan 345001
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-[color:var(--accent)]" aria-hidden />
              <a href={`tel:${site.phoneHref}`} className="hover:text-white hover:underline">
                Call the office · {site.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-[color:var(--accent)]" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-[color:var(--accent)]" />
              <span>
                Mon to Sat: 10:00 AM to 7:00 PM
                <br />
                Sunday: Closed
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
          <p>Income Tax, GST, Audit and Business Registration</p>
        </div>
      </div>
    </footer>
  );
}
