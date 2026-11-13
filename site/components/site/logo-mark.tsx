/**
 * LogoMark — the chosen brand mark (Minimal Monogram, option 06).
 *
 * Hand-drawn P&L ligature: stroke-built P (stem + circular bowl) fused with
 * an L foot, with a gold rupee-coin dot set in the bowl. Pure inline SVG so
 * it stays crisp at every size and inherits each context's palette.
 */
const PALETTES = {
  // onDark = mark sits on the navy header/footer/favicon surface
  dark: { ink: "#FAF6EE", cut: "#262F3D", gold: "#D9A866" },
  light: { ink: "#262F3D", cut: "#FAF6EE", gold: "#C8934F" },
} as const;

export function LogoMark({
  className,
  onDark = true,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const c = onDark ? PALETTES.dark : PALETTES.light;
  return (
    <svg viewBox="48 48 416 416" fill="none" className={className} aria-hidden="true">
      <g stroke={c.ink} strokeWidth={34} strokeLinecap="round">
        <path d="M 161 96 L 161 416" />
        <circle cx="225" cy="160" r="64" />
        <path d="M 161 399 L 351 399" />
      </g>
      <circle cx="225" cy="160" r="24" fill={c.gold} />
      <circle cx="225" cy="160" r="8" fill={c.cut} />
    </svg>
  );
}
