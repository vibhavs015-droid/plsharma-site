import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-reveal wrapper.
 *
 * Content is never hidden at rest: the server-rendered HTML ships fully
 * visible, with or without JavaScript. A short entrance animation plays
 * once as the page loads (see `.reveal-in` in globals.css); users with
 * reduced motion get no animation at all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  /** seconds to stagger multiple items */
  delay?: number;
  /** pixels to slide up from */
  y?: number;
  className?: string;
}) {
  const style = {
    animationDelay: delay ? `${delay}s` : undefined,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div
      className={className ? `reveal-in ${className}` : "reveal-in"}
      style={style}
    >
      {children}
    </div>
  );
}
