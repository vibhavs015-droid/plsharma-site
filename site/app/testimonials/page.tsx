import type { Metadata } from "next";
import { Quote, Star } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about P.L. Sharma And Company — trusted tax consultancy in Jaisalmer, Rajasthan.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="What Our Clients Say"
        subtitle="Long-term relationships are our proudest achievement."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08}>
              <Card className="card-lift h-full">
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Quote className="size-7 fill-[color:var(--accent)] text-[color:var(--accent)]" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-[color:var(--accent)] text-[color:var(--accent)]"
                      />
                    ))}
                  </div>
                </div>
                <p className="font-heading text-base leading-relaxed text-foreground/85">
                  “{t.quote}”
                </p>
                <div className="mt-1 border-t pt-4">
                  <p className="font-semibold text-primary">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {/* PLACEHOLDER note: remove after adding real testimonials */}
          These are sample testimonials for preview. Real client quotes go in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">lib/site-config.ts</code>{" "}
          or straight to the developer.
        </p>
      </section>
    </>
  );
}
