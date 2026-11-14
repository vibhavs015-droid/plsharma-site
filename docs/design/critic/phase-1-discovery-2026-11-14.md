# Critic review — Phase 1 Discovery and Vibe (round 1 of 3)

**Reviewed:** `docs/design/discovery/vibe-board.md` (art director), `docs/design/discovery/brand-personality.md` (art director), `docs/design/discovery/user-problem.md` (ux strategist), cross-checked against `STUDIO_CHARTER.md`, `PHASE_STATUS.md`, `PROJECT-NOTES.md`, `site/lib/site-config.ts`, and `docs/design/critic/smoke-test-2026-11-13.md` (standing backlog).

**Date:** 14 Nov 2026 · **Reviewer:** Critic (independent gatekeeper)

---

## Findings

**F1 (major) — Unconfirmed statistics presented as metrics in the stats band, contradicting the brand personality's own hard honesty rule.**

- **Reference:** `site/lib/site-config.ts` lines 45–50 (`stats` array: `"1:1 Personal Attention on Every Case"` and `"100% Confidential & Secure"`), cross-checked against `docs/design/discovery/brand-personality.md` §3.3 ("No statistic may appear that the owner has not confirmed" … "'25 years in practice' (owner-confirmed) — and nothing else numerical") and `docs/design/discovery/user-problem.md` §2.4/#4 (no fee figures; honesty stance) and §5.1 ("at most three honest tiles" for the stat band).
- **What is wrong:** `"1:1"` and `"100%"` are service promises typeset as metrics. Neither is an owner-confirmed statistic; neither appears in `PROJECT-NOTES.md` as a confirmed figure; both are exactly the kind of "evidence-looking" filler the smoke test called out (#5: "Stats band is half real, half costume"). `site-config.ts` already marks `establishedYear: 2001` as the owner-confirmed anchor, so `"25+"` and `"2001"` are the only supportable tiles.
- **Why it matters:** P.L. Sharma's brand promise is honesty and confidentiality. Presenting unverified statistics as evidence on the trust axis is a direct, stated-rule violation (brand-personality §3.3 is a hard rule, not a preference). The Phase 1 deliverables acknowledge the problem only generally ("at most three honest tiles") without naming the two tiles for removal. Approving Phase 1 with this unresolved bakes a trust violation into the build phase.
- **Severity:** major.

**F2 (minor) — Contrast ratios cited as measured fact with no traceable source.**

- **Reference:** `docs/design/discovery/vibe-board.md` §3.2 ("Ratios computed from WCAG 2.2 relative luminance … every figure below was produced by the same script") — e.g. `#0B6E39` 5.89:1 on paper, `#282E3F` 12.53:1, `#0F8344` 4.47:1 "fails 4.5".
- **What is wrong:** The ratios are presented as verified measurements, but no script, tool, or file path is cited that produced them, and no such measuring artefact exists among the files handed to this review. They cannot be traced to a source.
- **Why it matters:** The review brief explicitly requires flagging any claim with no source. These ratios feed the accessibility score and the token verdicts; if they are wrong, the whole palette verdict (`#0B6E39` replacing `#0F8344` because 4.47 < 4.5) rests on an unverified number. They are plausible and consistent with the smoke test, but unverifiable from the deliverables.
- **Severity:** minor.

**F3 (minor) — WhatsApp CTA/button wording diverges across the three governing documents.**

- **Reference:** `docs/design/discovery/user-problem.md` §2.3 (primary CTA "Book a consultation on WhatsApp"; form submit "Open WhatsApp with my request"), `docs/design/discovery/vibe-board.md` M1 (Consultation Slip button "Send on WhatsApp"), `docs/design/discovery/brand-personality.md` §4 #6 (button examples "Book on WhatsApp", "Call the office", "Send the details").
- **What is wrong:** Three different wordings for the same channel's primary action float across the three documents. The user-problem's stated decision is "one action, one wording, everywhere," yet the documents do not converge on a single submit wording.
- **Why it matters:** Consistency axis. One action / one wording is a deliberate conversion decision (surprise reads as trickery to a wary audience). Divergent wording across governing docs guarantees inconsistent implementation in build.
- **Severity:** minor.

---

**Positive / not findings (confirmed coherent, no action needed):**
- WhatsApp-first conversion is honoured in all three documents (static float, one navy end-of-page act band per page, one primary CTA everywhere; `/book` stays two required fields).
- Dual audience treated equally (vibe-board §1 "half salaried individual, half GST business"; user-problem §1.1/§1.2; home fold names both audiences in one breath).
- From-scratch original identity: no admired references borrowed; "The Kept Ledger" is a studio-originated concept, explicitly not a costume.
- The three named exclusions are all explicitly rejected (startup flash, stock-photo corporate, cluttered card grids — vibe-board §10 drift table; brand-personality §4 #3 "zero cards with shadows").
- Standing REJECT items are explicitly prohibited, not reintroduced: no star rows (vibe-board §7 "no star rows at all"; brand-personality §7 #8 "no star icon and no rating token"), no invented testimonials/names (user-problem §2.4 #1; brand-personality §3.3), no festive-photo endorsement (vibe-board §7 founder-photo reshoot directive + type-only hero fallback), no card grids (vibe-board §5 "cards replaced by entries").
- Placeholder honesty is designed, not hidden: visible dashed-rule entries with `[PLACEHOLDER — awaiting real testimonial from owner]` in all three documents; no invented stats/testimonials/credentials/fees asserted.
- "First consultation free" is correctly flagged verify-or-cut (user-problem §2.4 #4); `PROJECT-NOTES.md` confirms a "free-first-call line" exists in the About CTA, so this is a real live claim needing owner verification.
- "Kept Ledger" avoids ledger kitsch (vibe-board §8 rejects faux stains, torn edges, wax seals, jali, camels, gold foil; §10 "Over-restraint" guardrails require at least one human mark per screen). The direction is self-aware and genuinely not template-shaped.

---

## Scores (1–5)

| Axis | Score |
|---|---|
| Originality | 4.0 |
| Hierarchy | 4.5 |
| Consistency | 3.5 |
| Usability | 4.0 |
| Accessibility | 4.0 |
| Performance | 4.0 |
| Brand fit | 4.5 |

---

## Verdict: **REJECT**

At least one major (F1). The direction is strong and genuinely original, but Phase 1 cannot be approved while an unconfirmed statistic contradicts the brand personality's hard honesty rule on the core trust axis.

### Required fixes

- [ ] **Remove or re-typeset the unconfirmed stat tiles** in `site/lib/site-config.ts`: delete `"1:1 Personal Attention on Every Case"` and `"100% Confidential & Secure"` (neither is owner-confirmed; both violate brand-personality §3.3). Keep only owner-confirmed `"25+"` and `"2001"`, merged into one honest tile per smoke-test finding #5, and confirm no unconfirmed statistic appears anywhere in the site or design docs.
- [ ] **Make every contrast ratio traceable** in `docs/design/discovery/vibe-board.md` §3.2: cite the measuring script/tool (or the axe/LHCI run) that produced each ratio, or re-state the table as targets pending measurement rather than claimed measured fact.
- [ ] **Converge WhatsApp wording** across the three deliverables: one verb-first wording for the primary CTA ("Book a consultation on WhatsApp") and one for the `/book` form submit, and align `brand-personality.md` §4 #6 button examples to the final wording before build.

Resubmit the three discovery files (with the fixes applied) for round 2 review. Max 3 rounds; after the third, the Orchestrator decides and logs reasoning in `DECISION_LOG.md`.

---

# Round 2 of 3 — Re-verification (14 Nov 2026)

## Findings — re-issued

**F1 (major) — FIXED.** `site/lib/site-config.ts` lines 47–49 now hold exactly one stat tile: `{ value: "Since 2001", label: "25+ Years in Practice in Jaisalmer" }`, built only from owner-confirmed facts (`establishedYear: 2001` per the Nov 2026 user note; "25+" is the same fact restated). The `"1:1 Personal Attention on Every Case"` and `"100% Confidential & Secure"` tiles are removed, with an in-file comment documenting why. Hours, address, phone, WhatsApp number, and email are operational facts from the owner's setup. No unconfirmed statistic remains in the stats array. The remaining PLACEHOLDER testimonials block is visibly marked (`// ⚠️ PLACEHOLDER testimonials — replace with real client feedback`) and already tracked in KNOWN_ISSUES #1/#2 for owner-supplied data; it is designed placeholder honesty, not asserted fact, and is acceptable for Phase 1 sign-off.

**F2 (minor) — FIXED.** `site/tools/contrast-check.mjs` is committed (dependency-free WCAG 2.2 relative-luminance verifier, same definition axe-core/Lighthouse use) and its output `docs/design/discovery/contrast-evidence.json` is committed. All vibe-board §3 figures reproduce exactly (DECISION_LOG, 2026-11-14 Phase 1 entry). Independent hand-computation of the script's formula confirms the cited pairs: `whatsapp-OLD/paper` = 4.47:1 (fails 4.5 — defect confirmed), `whatsapp/paper` = 5.88:1 ≈ 5.89:1, `brass/ink` = 5.17:1, `line/paper` = 1.43:1 (decorative by design). Every ratio is now traceable to a committed, runnable artefact.

**F3 (minor) — FIXED.** Wording converges across all three governing documents:
- Header button: "Book a consultation" → `/book` (user-problem §2.3 table; brand-personality §4 #6)
- Primary CTA / float accessible name / end-of-page band: "Book a consultation on WhatsApp" (all three docs)
- `/book` form submit: "Open WhatsApp with my request" (user-problem §2.3; brand-personality §4 #6; M1 slip)
- Phone: "Call the office" (brand-personality §4 #6)
No stray "Send on WhatsApp", "Book on WhatsApp", or "Send the details" remains as active wording in any discovery doc. The old mix is only referenced in user-problem §2.4 as items to *retire*.

**Duplicate-run NOTE (user-problem.md §0 top):** Reasonable and honest handling. It documents that two ux-strategist runs raced after a server restart, identifies the critic-reviewed v1 as canonical (restored verbatim), and defers the duplicate's unreviewed nav proposal (drop `/testimonials` and `/why-choose-us` from the header) to the owner at the [GATE] rather than adopting it. Consistent with the charter's "never hide failures" rule; no unreviewed IA change is smuggled into the build.

---

## Scores (1–5)

| Axis | Score | Notes |
|---|---|---|
| Originality | 4.0 | "The Kept Ledger" is a studio-originated concept; no template or admired reference borrowed. Direction is genuinely distinct from generic premium-services layouts. |
| Hierarchy | 4.5 | One action per viewport, margin rail, ruled entries instead of cards, one navy act-band per page. Information architecture is deliberate and consistent. |
| Consistency | 4.0 | F3 resolved — one WhatsApp wording per surface across all three docs. Palette, typography and radius rules are internally consistent. (Implementation drift in `site/` source — e.g. lingering "Book an Appointment" — is a Phase 2 build concern, not a Phase 1 design-doc defect.) |
| Usability | 4.0 | WhatsApp-first conversion, one-tap reachability from every page, two-required-field slip, static float, live message preview before submit. Low-commitment, one-handed on 360px. |
| Accessibility | 4.5 | F2 resolved — every cited ratio traceable to the committed verifier. All shipping text pairs exceed WCAG AA 4.5:1; decorative `line/paper` at 1.43:1 is explicitly non-text. Focus rings specified at 12.53:1 / 5.17:1. |
| Performance | 4.0 | Phase 1 is design documentation; no implementation weight to judge. Token choices (no gradients, no shadows except float, static animation) are performance-friendly by intent. |
| Brand fit | 4.5 | F1 resolved — honesty rule satisfied (only owner-confirmed stats; no invented numbers). Sage+Caregiver archetype, plain-spoken voice, locally rooted without folkloric kitsch. Strong fit; proposal still awaits owner [GATE]. |

---

## Verdict: **APPROVE**

No blockers, no majors remaining. All three round-1 required fixes are applied and verified. Phase 1 — Discovery and Vibe — is signed off. The deliverables (`vibe-board.md`, `brand-personality.md`, `user-problem.md`) pass the [GATE] as studio proposals awaiting owner approval before any design/build phase begins.

### Optional suggestions (not blocking)
- Consider raising Consistency to 4.5 in Phase 2 once the `site/` source wording ("Book an Appointment" across 8 occurrences in `app/` and `components/`) is converged to the canonical table.
- The PLACEHOLDER testimonials block in `site-config.ts` uses invented names; keep it clearly marked and replace with owner-supplied real data before launch (KNOWN_ISSUES #1/#2).
- The founder photo interim grade (neutralising the cyan cast) remains the highest-impact asset decision for brand fit.
