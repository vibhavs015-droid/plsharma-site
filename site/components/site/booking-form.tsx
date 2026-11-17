"use client";

import { useRef, useState, useSyncExternalStore } from "react";
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

/* ?service= preselect (page-specs §7.2). Read from the URL with
 * useSyncExternalStore rather than useSearchParams: the documented Next 16
 * behaviour (node_modules/next/dist/docs/…/use-search-params.md L82–88) is
 * that useSearchParams client-renders its boundary inside a prerendered
 * route — the static shell would ship a Suspense fallback instead of the
 * slip, trading the honest first paint of the form for a feature only
 * /services deep links use. Here the server snapshot is "" so the
 * prerendered HTML matches; after hydration the client snapshot applies the
 * choice, and a popstate subscription keeps back/forward honest. Legal
 * values are the exact Select values below; anything else degrades to no
 * selection, never an error state. */
const legalServices = new Set<string>([
  ...services.map((s) => s.title),
  "Other / Not sure yet",
]);
const subscribeToServiceParam = (onStoreChange: () => void) => {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
};
const getRequestedService = () => {
  const value = new URLSearchParams(window.location.search).get("service");
  return value && legalServices.has(value) ? value : "";
};
const getRequestedServiceServer = () => "";

/* Quiet text link for secondary paths (user-problem.md §2.3 — stated, never
 * sold): the same hairline underline the page entries use, warming to
 * brass-ink on hover. */
const quietLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* Field boundary (tokens.md §9 gotcha 3) and size floor (§9 gotcha 10): every
 * control carries `border-line-input` (3.66:1 on the slip's paper) and stays
 * at text-base at every width — never the component's md:text-sm shrink,
 * which would zoom-jump on iOS. */
const slipField = "h-10 border-line-input text-base md:text-base";

export function BookingForm() {
  const [form, setForm] = useState(emptyBooking);
  const [sent, setSent] = useState(false);
  const today = useSyncExternalStore(subscribeToClock, getToday, getTodayServer);
  const requested = useSyncExternalStore(
    subscribeToServiceParam,
    getRequestedService,
    getRequestedServiceServer
  );

  /* The effective service: the visitor's own choice wins; the ?service=
   * preselect fills the field until they pick one themselves. */
  const service = form.service || requested;

  /* One window.open per submit. The old `pending` state never rendered its
   * branch — setPending(true) → window.open → setPending(false) all batch
   * inside one synchronous handler — so the state and its label/disabled
   * branch are gone. What stays is the guard: a ref that is set on the first
   * submit and held until reset(). A re-entrant dispatch (a fast double
   * click that beats the SENT swap) re-enters the handler while the ref is
   * still set and returns; the normal path can't double-fire either, because
   * the slip swaps to the SENT panel on the re-render that follows. */
  const submitting = useRef(false);

  const set = (field: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const reset = () => {
    setForm(emptyBooking);
    setSent(false);
    submitting.current = false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    try {
      const waUrl = buildWhatsAppUrl(
        { ...form, service },
        site.name,
        site.whatsappNumber
      );
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } finally {
      // Always the SENT state — even if the browser blocked the popup; the
      // panel carries the call fallback (user-problem.md §5.2).
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="slip">
        <div className="slip-head">
          <h2 className="text-xl">Consultation request</h2>
        </div>
        <h3>Request noted — we will confirm your slot on WhatsApp.</h3>
        <p className="text-body text-ink-muted mt-3">
          WhatsApp should now be open with your request — press Send there.
        </p>
        <p className="text-body text-ink-muted mt-3">
          Didn&apos;t open?{" "}
          <a href={`tel:${site.phoneHref}`} className={quietLink}>
            Call us directly at {site.phone}
          </a>
        </p>
        <button type="button" onClick={reset} className="btn-quiet mt-6">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="slip">
      <div className="slip-head">
        <h2 className="text-xl">Consultation request</h2>
      </div>
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
            className={slipField}
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
            className={slipField}
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
            className={slipField}
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="service">Service Needed</Label>
          <Select value={service} onValueChange={set("service")}>
            <SelectTrigger
              id="service"
              className="w-full border-line-input text-base"
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.title} value={s.title}>
                  {s.title}
                </SelectItem>
              ))}
              <SelectItem value="Other / Not sure yet">
                Other / Not sure yet
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date">Preferred Date</Label>
          <Input
            id="date"
            type="date"
            min={today || undefined}
            className={slipField}
            value={form.date}
            onChange={(e) => set("date")(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slot">Preferred Time</Label>
          <Select value={form.slot} onValueChange={set("slot")}>
            <SelectTrigger
              id="slot"
              className="w-full border-line-input text-base"
            >
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
          <Label htmlFor="message">
            Briefly describe your requirement (optional)
          </Label>
          <Textarea
            id="message"
            rows={4}
            placeholder="e.g. I need help filing my ITR with capital gains from shares..."
            className="border-line-input text-base md:text-base"
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Open WhatsApp with my request
          </button>
        </div>

        <p className="text-body text-ink-muted sm:col-span-2">
          <a
            className={quietLink}
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              "Consultation Request (Website)"
            )}&body=${encodeURIComponent(
              `Name: \nPhone: \nService: \nPreferred Date/Time: \nNote: `
            )}`}
          >
            Or send by email instead
          </a>
        </p>
      </form>
    </div>
  );
}
