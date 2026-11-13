# WEBSITE PROJECT: STUDIO CHARTER
Save this file as docs/design/STUDIO_CHARTER.md. Re-read it at the start of every phase.

## PROJECT DETAILS (fill in; blank fields are asked in Phase 1)
- Project / brand name: [ ]
- What the website is (portfolio, SaaS landing, e-commerce, blog, docs, agency, etc.): [ ]
- Target audience: [ ]
- Desired emotion / vibe (e.g. calm and premium, bold and energetic): [ ]
- Existing repo or assets (or "new project"): [ ]
- Preferred stack (or "choose the best for this project"): [ ]
- Pages / features required (or "propose them"): [ ]
- Hosting target (Vercel, Netlify, Cloudflare Pages, GitHub Pages, own server, undecided): [ ]

## MISSION
Design and build a complete, production-ready, highly distinctive website: strategy, UX,
visual identity, design system, implementation, testing, SEO, performance and
accessibility. It must NOT look like a generic AI-generated template, a default
Tailwind/Bootstrap theme, or a sterile corporate page. It must be unique, memorable,
emotionally resonant and still fast, accessible and usable.

## RULES
- If an existing repo exists: read its README, docs and code first; preserve its
  architecture and conventions; no unrelated refactors; no destructive Git commands.
- No secrets in source code; use environment variables. No fake data presented as real.
- No pushing, deploying or publishing unless I explicitly say so.
- No paid services, no credit card, no sensitive account access without my approval.
- Choose the simplest stack that fully serves the project (static or content sites favour
  Astro or Next.js static export; app-like sites favour Next.js or similar). Record the
  choice and reasons in DECISION_LOG.md.
- Machine constraint: keep tooling light; avoid heavy duplicate processes.

## STUDIO SETUP (ORCHESTRATOR + CRITIC + TEAM)
Create docs/design/STUDIO_ROLES.md defining these roles and keep it updated.

ORCHESTRATOR (main agent, final decision-maker)
- Owns the phase plan, task list, file ownership and handoffs.
- Before each phase writes a brief (goal, inputs, outputs, files it may touch, exit
  criteria) in docs/design/PHASE_STATUS.md.
- Assigns work to roles, merges results, resolves disagreements, decides.
- Never lets two roles edit the same file at the same time.
- Marks a phase done only after the Critic issues APPROVE and exit criteria are verified.

ROLES
1. Lead UX Strategist: information architecture, journeys, conversion flow, content
   hierarchy.
2. Art Director / UI Specialist: colour, typography, spacing, imagery direction, motion,
   mood.
3. Design Critic (independent gatekeeper): see Critic Protocol.
4. Frontend Architect + Engineer: component architecture, semantic HTML, scalable CSS,
   production code.
5. Accessibility Engineer: WCAG 2.2 AA, keyboard use, screen readers, reduced motion.
6. QA Engineer: component, visual regression and end-to-end tests.
7. Performance and SEO Engineer: Core Web Vitals, asset weight, metadata, structured data.

If the environment supports sub-agents or an agent manager, run each role as a separate
agent. If not, run each as a separate written pass under its own heading. Roles review
each other's work and never self-approve.

CRITIC PROTOCOL
- The Critic distrusts standard layouts, template-like sections (generic hero, three
  icon cards, testimonial carousel), default palettes and stock-looking imagery.
- After every phase and every finished page the Critic writes
  docs/design/critic/<phase-or-page>.md with: findings, scores (1-5) for originality,
  hierarchy, consistency, usability, accessibility, performance, brand fit, a verdict
  (APPROVE or REJECT) and required fixes.
- On REJECT the responsible role fixes and resubmits. Max 3 rounds, then the Orchestrator
  decides and logs the reasoning in DECISION_LOG.md.
- The Critic never edits files, only reviews, and checks every screenshot at mobile,
  tablet and desktop widths.

## EXTERNAL REPOSITORIES (use fully, licence check first)
Seed list; verify each URL, activity and licence yourself, and find better alternatives
if these are unsuitable:
- https://github.com/Junaid-PK/frontend-design-skill (anti-generic design practice)
- https://github.com/storybookjs/storybook (component catalogue and visual states)
- https://github.com/microsoft/playwright (end-to-end and visual regression tests)
- https://github.com/dequelabs/axe-core (automated accessibility checks)
- https://github.com/GoogleChrome/lighthouse-ci (performance, SEO, accessibility budgets)
- https://github.com/radix-ui/primitives and https://github.com/shadcn-ui/ui
  (accessible component foundations; restyle heavily, never ship default look)
- https://github.com/motiondivision/motion (animation for React) or CSS-native scroll
  and view transitions where the stack is not React
- https://github.com/darkroomengineering/lenis (smooth scroll, only if it helps the
  experience and respects reduced motion)
- Also search GitHub for strong open-source reference sites and design systems relevant
  to this project type, for inspiration and pattern study.

Rules:
- Before use record licence, last commit, open issues, version compatibility, bundle
  size impact in docs/design/REPOSITORY_REFERENCE.md.
- Use them fully where they help, if the licence allows. Permissive (MIT/BSD/Apache):
  copying allowed with attribution in docs/design/THIRD_PARTY_NOTICES.md. GPL/AGPL/
  unclear: study only, never copy code or assets.
- Stable releases only. Reference clones stay outside production source (git-ignored).
- No two packages that do the same job. Watch the JavaScript bundle size.
- If a repo is unmaintained or unsuitable, use the best alternative and log why.

## FREE TOOLING CLAUSE
The agent may download and install any FREE tool that improves the result: agent
management or orchestration tools, design and contrast checkers, image optimisers
(squoosh/sharp), font tools, Lighthouse, Playwright browsers, accessibility scanners,
linters, formatters, screenshot or diff tools, diagram tools, CLI utilities.
Conditions: free or open source only; official source only; licence checked; no
personal data or secrets sent to third parties; dev tools stay out of production;
log each in docs/design/TOOLING_LOG.md (tool, version, source, licence, purpose, how to
remove). Anything paid, account-linked or architecture-changing needs my approval.

## ANTI-GENERIC DESIGN RULES
Avoid: generic centred hero plus three feature cards, gradient blobs, purple-blue
"AI startup" palettes, glassmorphism overuse, stock photos, emoji as icons, identical
section rhythm down the page, meaningless animation, lorem ipsum, carousels for
the sake of it.
Prefer: a strong concept, expressive typography, intentional grid and asymmetry,
considered whitespace, custom details, real content or well-written placeholder copy
marked as such, purposeful motion, strong brand consistency, memorable moments that
still serve the user's goal.

## PAGE COMPLETION RULE
A page is done only when: content and copy are final or clearly marked; responsive at
360, 768, 1024, 1440 and 1920 px; light/dark if the design includes both; all states
(hover, focus, active, disabled, loading, empty, error) exist; keyboard and screen reader
usable; images optimised with dimensions and alt text; SEO metadata set; Lighthouse
targets met; screenshots reviewed; Critic APPROVE; tests exist.

## TARGETS
Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ on mobile.
Core Web Vitals: LCP under 2.5 s, CLS under 0.1, INP under 200 ms. WCAG 2.2 AA.

## DOCUMENTATION AND HONESTY
Maintain docs/design/PHASE_STATUS.md, IMPLEMENTATION_LOG.md, DECISION_LOG.md,
KNOWN_ISSUES.md, TOOLING_LOG.md, FINAL_QA_REPORT.md. Per phase record: work done, files
changed, dependencies added, tests run, problems found and resolved, exit criteria.
Never hide failures. Never claim success without verification.
[GATE] means stop and wait for my approval. Otherwise continue autonomously.

## DEFINITION OF DONE
All pages built with one original design system; responsive across all breakpoints;
accessibility and performance targets met or documented; SEO complete; tests run; build
passes with no errors; deployment-ready (not deployed); docs complete; final audit done.

Confirm you saved this charter, then wait for the first phase prompt.
