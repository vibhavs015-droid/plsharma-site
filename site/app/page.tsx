import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Quote,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/site/section-header";
import { FeatureIcon } from "@/components/site/feature-icon";
import { Reveal } from "@/components/site/reveal";
import {
  site,
  services,
  whyChooseUs,
  testimonials,
  faqs,
  team,
} from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** First sentence of an FAQ answer, for the home-page preview list. */
function firstSentence(text: string): string {
  const m = /(.+?[.!?])(?=\s+[A-Z"']|$)/.exec(text);
  return m ? m[1] : text;
}

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero-pattern relative overflow-hidden bg-primary text-primary-foreground lg:flex lg:min-h-[calc(100svh-6rem)] lg:items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="font-heading text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Your Taxes, Handled by Trusted{" "}
              <span className="text-[color:var(--accent)]">Experts</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Tax filing, GST, audits and registrations, handled with honest
              personal attention.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-[color:var(--accent)] px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-black/20 transition-[background-color,box-shadow] hover:bg-[color:var(--accent)]/90 hover:shadow-xl"
              >
                <Link href="/book">
                  Book an Appointment
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <a href={`tel:${site.phoneHref}`}>
                  <Phone data-icon="inline-start" />
                  {site.phone}
                </a>
              </Button>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2.5 text-sm text-white/70">
              {[
                "Free initial consultation on call",
                "Fees told upfront",
                "Online & office visits",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[color:var(--accent)]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Founder photo card with ornamental frame */}
          <Reveal delay={0.15} className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative mx-auto max-w-sm">
              {/* offset gold frame */}
              <div
                className="absolute -inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-lg border border-[color:var(--accent)]/40"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-lg bg-white/5 shadow-2xl shadow-black/30">
                <div className="relative mx-auto aspect-[4/5] w-full">
                  <Image
                    src="/images/father.jpg"
                    alt={`${team[0].name}, Founder of ${site.name}`}
                    fill
                    sizes="(min-width: 1024px) 380px, 320px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-lg bg-primary/85 px-5 py-3.5 backdrop-blur-sm">
                  <p className="font-heading text-lg font-bold text-white">
                    {team[0].name}
                  </p>
                  <p className="text-xs text-white/75">
                    Founder & Principal Consultant
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07} className="py-8 text-center">
              <p className="font-heading text-3xl font-bold text-[color:var(--gold-ink)] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground sm:text-[15px]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          title="Our Services"
          description="Everything a growing individual or business needs, handled under one roof by people who know the law and the deadlines."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.07}>
              <Card className="card-lift group relative h-full overflow-hidden border-t-2 border-t-transparent hover:border-t-[color:var(--accent)]">
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-accent-foreground">
                      <FeatureIcon name={service.icon} className="size-5.5" />
                    </span>
                  </div>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-[color:var(--gold-ink)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full px-8 font-semibold"
          >
            <Link href="/services">
              View All Services
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="border-y bg-muted/60">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeader
            title={`Why Choose ${site.shortName}`}
            description="Anyone can file a return. We make sure it's right, on time, and in your best interest."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.07}>
                <div className="card-lift relative h-full rounded-lg bg-card p-6 pl-7">
                  {/* gold left rule */}
                  <span
                    className="absolute top-5 bottom-5 left-0 w-[3px] rounded-full bg-[color:var(--accent)]"
                    aria-hidden
                  />
                  <span className="mb-4 flex size-10 items-center justify-center rounded-md bg-secondary text-primary">
                    <FeatureIcon name={item.icon} className="size-5" />
                  </span>
                  <h3 className="font-semibold text-primary">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          title="What Our Clients Say"
          description="A few words from the clients we work with."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.slice(0, 4).map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.07}>
              <Card className="card-lift flex h-full flex-col">
                <CardContent className="flex flex-1 flex-col gap-4">
                  <Quote className="size-7 fill-[color:var(--accent)] text-[color:var(--accent)]" />
                  <p className="flex-1 font-heading text-[15px] leading-relaxed text-foreground/80">
                    “{t.quote}”
                  </p>
                  <div className="border-t pt-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className="size-3.5 fill-[color:var(--accent)] text-[color:var(--accent)]"
                        />
                      ))}
                    </div>
                    <p className="mt-2.5 font-semibold text-primary">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FAQ PREVIEW + CTA ============ */}
      <section className="border-t bg-muted/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-[2.75rem]">
              Common Questions
            </h2>
            <ul className="mt-7 space-y-5">
              {faqs.slice(0, 3).map((faq, i) => (
                <li key={faq.question} className="flex gap-4">
                  <span className="font-heading text-lg font-bold text-[color:var(--gold-ink)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold leading-snug text-primary">{faq.question}</p>
                    <p className="mt-2.5 text-sm text-muted-foreground">
                      {firstSentence(faq.answer)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild variant="link" className="gold-link mt-5 px-0">
              <Link href="/faq">
                See all FAQs
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <Reveal>
            <div className="card-lift relative overflow-hidden rounded-xl bg-card p-9 text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-[2.25rem]">
                Ready to get your taxes in order?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Book an appointment in under a minute, or just send us a
                WhatsApp message. We&apos;ll take it from there.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-full bg-[color:var(--accent)] px-7 font-semibold text-accent-foreground hover:bg-[color:var(--accent)]/90"
                >
                  <Link href="/book">Book an Appointment</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full px-7 font-semibold"
                >
                  <Link href="/contact">Visit Our Office</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
