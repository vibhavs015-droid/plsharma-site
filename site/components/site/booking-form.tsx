"use client";

import { useState, useSyncExternalStore } from "react";
import { CalendarCheck, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { site, services } from "@/lib/site-config";
import { buildWhatsAppUrl, emptyBooking } from "@/lib/booking";

const timeSlots = [
  "Morning (10:00 AM to 1:00 PM)",
  "Afternoon (1:00 PM to 4:00 PM)",
  "Evening (4:00 PM to 7:00 PM)",
];

/* Today's date for the date input's `min`. `new Date()` is not allowed during
 * prerender, and writing it from an effect would trip
 * react-hooks/set-state-in-effect — so it is read during render with
 * useSyncExternalStore instead: the server snapshot is "" while prerendering
 * and hydrating; the browser value replaces it right after hydration. Same
 * observable behaviour as the old mount-effect, with no state write. */
const subscribeToClock = () => () => {};
const getToday = () => new Date().toISOString().slice(0, 10);
const getTodayServer = () => "";

export function BookingForm() {
  const [form, setForm] = useState(emptyBooking);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const today = useSyncExternalStore(subscribeToClock, getToday, getTodayServer);

  const set = (field: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const reset = () => {
    setForm(emptyBooking);
    setSent(false);
    setPending(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return; // guard against double-submit (two WhatsApp tabs)

    setPending(true);
    try {
      const waUrl = buildWhatsAppUrl(form, site.name, site.whatsappNumber);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } finally {
      setPending(false);
      setSent(true);
    }
  };

  if (sent) {
    return (
      <Card className="border-[color:var(--accent)]/50">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <CheckCircle2 className="size-12 text-whatsapp" />
          <h3 className="text-xl font-bold text-primary">Request Ready to Send!</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            WhatsApp should now be open with your booking details filled in.
            Just press <strong>Send</strong> in WhatsApp and we will confirm
            your appointment as soon as possible.
          </p>
          <p className="text-sm text-muted-foreground">
            Didn&apos;t open?{" "}
            <a
              className="font-medium text-primary underline underline-offset-4"
              href={`tel:${site.phoneHref}`}
            >
              Call us directly at {site.phone}
            </a>
          </p>
          <Button variant="outline" className="mt-2" onClick={reset}>
            Book another appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <CalendarCheck className="size-5" />
          Book an Appointment
        </CardTitle>
        <CardDescription>
          Fill in your details: on submit, WhatsApp opens with your booking
          request ready to send. We confirm your slot shortly after.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className="h-10"
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">
              Phone / WhatsApp <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              pattern={"[0-9+ ()-]{8,16}"}
              title="Enter a valid phone number (8-16 digits)"
              placeholder="Your mobile number"
              className="h-10"
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="h-10"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="service">Service Needed</Label>
            <Select value={form.service} onValueChange={set("service")}>
              <SelectTrigger id="service" className="h-10 w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.title} value={s.title}>
                    {s.title}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other / Not sure yet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              min={today || undefined}
              className="h-10"
              value={form.date}
              onChange={(e) => set("date")(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slot">Preferred Time</Label>
            <Select value={form.slot} onValueChange={set("slot")}>
              <SelectTrigger id="slot" className="h-10 w-full">
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="message">Briefly describe your requirement (optional)</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="e.g. I need help filing my ITR with capital gains from shares..."
              value={form.message}
              onChange={(e) => set("message")(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
            <Button type="submit" disabled={pending} className="h-11 w-full px-6 sm:w-auto sm:flex-1 text-base">
              <Send data-icon="inline-start" />
              {pending ? "Opening WhatsApp…" : "Send Booking Request"}
            </Button>
            <Button asChild variant="outline" className="h-11 w-full px-6 sm:w-auto sm:flex-1 text-base">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  "Appointment Request (Website)"
                )}&body=${encodeURIComponent(
                  `Name: \nPhone: \nService: \nPreferred Date/Time: \nNote: `
                )}`}
              >
                Or send via Email instead
              </a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground sm:col-span-2">
            Your details go directly to {site.shortName} over WhatsApp/email and
            are never shared with anyone else.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
