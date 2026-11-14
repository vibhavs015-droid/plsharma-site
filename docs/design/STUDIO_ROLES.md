# Studio roles — P.L. Sharma & Co. website

Maps the canonical roles in `STUDIO_CHARTER.md` to the OpenCode subagents in
`.opencode/agents/` (the environment supports subagents, so each role runs as its
own agent). Keep this file updated as roles evolve.

| Charter role | Agent id | Full definition | May write | Shell |
|---|---|---|---|---|
| Lead UX Strategist | `ux-strategist` | `.opencode/agents/ux-strategist.md` | `docs/**` only | default |
| Art Director / UI Specialist | `art-director` | `.opencode/agents/art-director.md` | `docs/**` + `site/app/globals.css` | default |
| Design Critic | `critic` | `.opencode/agents/critic.md` | `docs/design/critic/*` only | none |
| Frontend Architect + Engineer | `frontend-engineer` | `.opencode/agents/frontend-engineer.md` | full `site/` source | default |
| Accessibility Engineer | `a11y-checker` | `.opencode/agents/a11y-checker.md` | nothing (reports) | check commands (`npx *`, `node *`) |
| QA Engineer | `qa-engineer` | `.opencode/agents/qa-engineer.md` | test files only (`site/tests/**`, `*.test.*`, `*.spec.*`) | test/build commands (`npm *`, `npx *`, `node --test *`) |
| Performance and SEO Engineer | `perf-seo` | `.opencode/agents/perf-seo.md` | nothing (reports) | check commands (`npx *`, `node *`) |

**Orchestrator** = the main agent (no file). It owns the phase plan, task list, file
ownership and handoffs; writes each phase brief into `docs/design/PHASE_STATUS.md`
before work starts; assigns, merges, resolves disagreements, decides; never lets two
roles edit the same file at once; marks a phase done only after a Critic APPROVE and
verified exit criteria.

## Standing rules

- Roles review each other's work and never self-approve.
- **Critic protocol:** distrusts standard layouts, template sections (generic hero,
  three icon cards, testimonial carousel), default palettes, stock-looking imagery.
  Writes `docs/design/critic/<phase-or-page>.md` with findings, 1–5 scores
  (originality, hierarchy, consistency, usability, accessibility, performance, brand
  fit), verdict APPROVE/REJECT and required fixes. Never edits files other than its
  own review folder. Checks every screenshot at mobile, tablet and desktop widths.
- On REJECT the responsible role fixes and resubmits; **max 3 rounds**, then the
  Orchestrator decides and logs the reasoning in `DECISION_LOG.md`.
- If subagents are ever unavailable, run each role as a separate written pass under
  its own heading (charter fallback rule).
- **Models:** `critic` → `opencode/nemotron-3.5-super-vl-free`; `art-director` →
  `opencode/deepseek-v4.1-flash-free`; all other roles inherit the session model.
  Optional `#variant` suffix pins reasoning effort.
- **Path convention:** all paths in prompts, permissions and deliverables are relative
  to this project root (`site/…`, `docs/…`).
- Per-agent `temperature` is not settable in OpenCode V2 (deprecated field; the
  `request.body` overlay is not yet sent) — strictness is encoded in each prompt.
