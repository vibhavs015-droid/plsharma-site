import { showSampleContent } from "@/lib/content-mode";

/**
 * Owner-preview banner — the first element in the body flow, visually
 * above the header, whenever the build runs with SHOW_SAMPLE_CONTENT=true
 * (OWNER PREVIEW ONLY — never set on a public deploy). Double-gated:
 * layout.tsx renders it only when the flag is on, and the component
 * returns null on its own if it ever slips through. In a production
 * build the flag is false, so this renders nothing and the string
 * appears nowhere in the served HTML or the RSC payload. The look is
 * the art-director's (the `sample-banner` class gets styled later).
 */
export function SampleBanner() {
  if (!showSampleContent) return null;
  return <p className="sample-banner">Design preview — sample content shown</p>;
}
