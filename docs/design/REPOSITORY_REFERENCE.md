# Repository reference — external repositories

Verified 14 Nov 2026 via the GitHub API (unauthenticated) and `npm view` for package
licences. `open issues` counts include PRs (GitHub API semantics). All seed repos are
active (pushed within days) and none archived. Per the charter: GPL/AGPL/unclear =
study only — none of the seed repos fall in that category.

| Seed repo | Licence | Last push | Open issues+PRs | Stars | Use in this project | Version compat | Bundle impact | Decision |
|---|---|---|---|---|---|---|---|---|
| microsoft/playwright | Apache-2.0 | 2026-11-13 | 32 | 100,123 | **In use** — `@playwright/test` 1.65.0, `@playwright/mcp` 0.0.85, chromium 158.0.8127.18 (E2E, visual regression, MCP screenshots, axe driver) | Node 24 ok; builds green | none (dev-only) | keep |
| dequelabs/axe-core | MPL-2.0 | 2026-11-13 | 488 | 7,818 | **In use** — `@axe-core/playwright` 4.14.0 + `axe-core` 4.14.0 via `site/tools/axe-check.mjs` | matches installed | none (dev-only) | keep; direct `axe-core` dep is redundant (the wrapper declares it) — cleanup candidate, kept per owner's explicit setup instruction |
| GoogleChrome/lighthouse-ci | Apache-2.0 | 2026-11-12 | 151 | 7,144 | **In use** — `@lhci/cli` 0.16.1 + `site/lighthouserc.json` | Node 24 ok | none (dev-only) | keep |
| radix-ui/primitives | MIT | 2026-10-14 | 289 | 19,500 | **In use** — `radix-ui` 1.8.1 under the shadcn/ui components (accordion, dialog/sheet, dropdown) | React 19 ok | ships in prod bundle, tree-shaken per used component | keep |
| shadcn-ui/ui | MIT | 2026-11-13 | 1,774 | 128,143 | **In use** — components copied into `site/components/ui` (Nova preset), restyled into the navy/gold token system (never shipped with default look) | Next 16 ok | copied code, tree-shaken | keep; attribution below |
| motiondivision/motion | MIT | 2026-11-13 | 10 | 35,122 | **Not used** — `motion@^14.12.0` is in package.json but zero `from "motion"` imports exist (grep-verified 14 Nov 2026; the Reveal component was rewritten as a CSS-only server component) | n/a | zero while unused | **removal candidate** — pending owner approval in Phase 1; do not adopt for one-off animations (CSS-native first, per charter) |
| darkroomengineering/lenis | MIT | 2026-11-13 | 33 | 17,248 | Not used — native CSS scroll suffices for a static 8-page site | n/a | n/a | revisit only if a journey demonstrably benefits and respects reduced-motion (charter condition) |
| storybookjs/storybook | MIT | 2026-11-13 | 1,809 | 91,558 | Not adopted — component catalogue is heavyweight duplicate tooling for a 16-route static site; Playwright screenshots + axe cover the visual-state need; charter's machine constraint says keep tooling light | n/a | n/a (dev) | deliberately not adopted, reason logged here per charter |
| Junaid-PK/frontend-design-skill | Apache-2.0 | 2026-08-31 | 0 | 4 | Not yet used — anti-generic design practice skill; licence permissive, repo small and quiet | n/a | n/a | candidate for the critic's reference library in Phase 1 if it demonstrably sharpens reviews; licence already cleared |

## Notes

- "Before use" rule satisfied for every package already in production: licences
  verified, versions pinned in `site/package.json`, build green after install
  (16 static routes).
- Stable releases only: npm-installed versions are published releases (see
  `TOOLING_LOG.md` for the tool set).
- Reference clones under `repos/` (cal.com, awesome-landing-pages, shadcn-ui) are
  study material and stay out of production source.
- Queued for Phase 1 per the charter's seed list: search GitHub for strong
  open-source reference sites and design systems relevant to professional-services
  / consultancy sites, for pattern study only.
