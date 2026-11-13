import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about booking a consultation, documents required for ITR filing, fees, tax notices, online consultations and GST registration.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Quick answers to the questions clients ask us most."
      />

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="sr-only">Common questions and answers</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-xl border bg-muted/50 p-8 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary">
            Have a different question?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Ask us directly: call, WhatsApp or send a booking request.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6">
              <Link href="/book">Book an Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6">
              <a href={`tel:${site.phoneHref}`}>Call {site.phone}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
