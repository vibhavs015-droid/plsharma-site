/**
 * SAMPLE tag — rendered beside every sample-content item in owner preview
 * (see lib/content-mode.ts). Visible text, deliberately NOT aria-hidden:
 * the point is that nobody — owner, qa, critic or visitor — can mistake
 * sample copy for real content. The look is the art-director's (the
 * `sample-tag` class gets styled in globals.css); this file only fixes
 * the exact string and the semantic span.
 */
export function SampleTag() {
  return (
    <span className="sample-tag">SAMPLE — not real, replace before launch</span>
  );
}
