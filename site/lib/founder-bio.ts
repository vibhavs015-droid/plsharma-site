/**
 * Founder bio — ONE source for the Home hero paragraph and the /about
 * hero lead (T14-C). Owner-supplied copy, wording-spec §1.2 fact-locked:
 * no claims beyond what the site already states.
 *
 * Kept out of site-config.ts on purpose: client components import that
 * module, and this string only ships with the two server pages that
 * render it.
 *
 * The paragraphs are sentence segments so the two placements cannot
 * drift apart: Home renders all four, /about drops the last one because
 * /about §02 already carries the canonical free-consultation sentence
 * (wording-spec §0.6 — exactly three placements site-wide: Home fold,
 * /about §02, /faq fee answer).
 */
import { confirmedTeam } from "./site-config";

const founderName = confirmedTeam[0].name;

export const founderBioSentences = [
  `${founderName} has run his tax practice in Jaisalmer since 2001.`,
  "Individuals and businesses come to him with the everyday work of Indian tax: a return to file, a GST registration, a notice that needs a reply.",
  "He handles each case himself, agrees the fee before work begins, and keeps your papers confidential.",
  "The first consultation is free.",
];

/** Home hero — the full owner bio (wording-spec §1.2), free line included. */
export const founderBio = founderBioSentences.join(" ");

/** /about hero — identical but the final sentence; /about §02 owns that line. */
export const founderBioAbout = founderBioSentences.slice(0, -1).join(" ");
