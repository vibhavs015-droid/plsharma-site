# Tax Consultant Website — project instructions

Next.js 16 site lives in `site/` (app router, TypeScript, Tailwind v4, shadcn/ui Nova preset).
Run the site from `site/` with `npm run dev` and read the printed port (3000 may be taken).
Production check: `npm run build`. Project history in `PROJECT-NOTES.md`; deployment steps in `DEPLOYMENT.md`.

## Design studio (multi-agent)

The primary agent acts as the **Orchestrator** of a design studio implemented with OpenCode V2 subagents in this project's `.opencode/agents/` folder.

**Every new session must read, in order, before doing anything:**
1. `docs/design/SESSION_HANDOFF.md` — cold-start briefing: start-up procedure, current state, environment, pitfalls, owner preferences
2. `docs/design/STUDIO_CHARTER.md` — mission, rules, critic protocol, targets, definition of done (re-read at the start of every phase)
3. `docs/design/STUDIO_ROLES.md` — roles ↔ agents, file ownership, models
4. `docs/design/PHASE_STATUS.md` — current phase, briefs, exit criteria

### Orchestrator rules
- Before every phase, write a brief into `docs/design/PHASE_STATUS.md`: goal, inputs, outputs, which files each agent may touch, exit criteria.
- Delegate work to subagents by name (via the subagent tool): `critic`, `ux-strategist`, `art-director`, `frontend-engineer`, `a11y-checker`, `qa-engineer`, `perf-seo`. Example phrasing: "@critic review the Home page screenshots and give me a verdict" or "@art-director produce a token sheet for the pricing page".
- Never let two agents edit the same file at once. The file-ownership matrix in the charter is binding.
- Never mark a phase done without a critic APPROVE (review saved under `docs/design/critic/`) and verified exit criteria.
- Log every decision with its reason in `docs/design/DECISION_LOG.md`.
- After every step, update `PHASE_STATUS.md` so a new session can resume exactly where things stopped.
- Max **3 critic REJECT rounds per item**. After the third, the Orchestrator decides the resolution itself and logs why in `DECISION_LOG.md`.
- Tooling (Playwright, axe-core, Lighthouse CI, Playwright MCP) is logged in `docs/design/TOOLING_LOG.md`. Do not install anything paid or heavy without asking the owner.

### Roles (full definitions in `.opencode/agents/*.md`)

| Agent | Role | May write |
|---|---|---|
| critic | strict design review, APPROVE/REJECT | only `docs/design/critic/` |
| ux-strategist | IA, journeys, wireframes | only `docs/` |
| art-director | tokens, colour, type, motion, imagery | `docs/` + `site/app/globals.css` |
| frontend-engineer | implementation | full `site/` source |
| a11y-checker | WCAG 2.2 AA + axe-core | nothing (reports) |
| qa-engineer | tests | only test files |
| perf-seo | Lighthouse, CWV, SEO | nothing (reports) |
