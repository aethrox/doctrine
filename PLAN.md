# Plan

## Rename and re-platform (2026-08-09)

This repo was built as `engineering-skills` (`aethrox/engineering-skills`, private) through rounds 1–4 below, then renamed to **`doctrine`** and re-created as a fresh, public repo — a deliberate name change (unique, not generic like "skills") and a deliberate history reset (git history judged not worth preserving; the content and this plan carried forward instead). Alongside the rename, distribution widened from "manual copy into `~/.claude/skills`" to two real install paths:

1. **Claude Code plugin** (`.claude-plugin/plugin.json`) — native, auto-invoked-by-description installation for Claude Code itself, the same mechanism `mattpocock-skills` used.
2. **MCP server** (`mcp-server/`) — every skill exposed as an MCP prompt, so any MCP-capable client (Claude Desktop, Cursor, Windsurf, Cline, etc.) can pull the same discipline in, not just Claude Code.

Everything below this point is the unedited research and build history from the `engineering-skills` era — kept as-is because the reasoning is still the reasoning, only the repo's name and packaging changed.

## Why this repo exists

Goal: a self-contained skill set covering the standard practices of the software development lifecycle, so this machine doesn't have to keep pulling in other people's skill packages piecemeal. Two sources feed it:

1. **Gap-fill** — standards `mattpocock/skills` doesn't cover at all.
2. **Re-coverage** — topics `mattpocock/skills` already covers, reauthored here in our own voice, grounded in each topic's own named primary source, so this repo becomes the single source instead of depending on that plugin staying installed.

## Research method

For each skill: identify the primary, widely-adopted standard(s) or named primary source behind it (not an invented convention), pull the concrete, checkable rules out of it, and shape those into a phased discipline in the same structural style as `mattpocock/skills` (a stated defining constraint, numbered phases, a closing checklist) — verified against that plugin's actual installed `SKILL.md` files (`~/.claude/plugins/cache/claude-plugins-official/mattpocock-skills/`) for format fidelity. Re-coverage skills are deliberately restructured around their own primary source rather than mirroring mattpocock's phase breakdown — same discipline, different shape, so the result is authored, not copied.

## Contribution-path research (context)

Investigated contributing the *other* local skill set (`repo-ship`, `repo-polish`, `repo-secure`, `architecture-diagram`) upstream to `mattpocock/skills`. Finding: every merged PR in that repo's history is from the maintainer himself or the release bot — roughly 30 external PRs opened over the repo's life, zero merged. Decision: don't invest in PRs there; this repo is the actual outlet for that engineering-standards work instead.

## Shipped — gap-fill (9)

| Skill | Standard(s) |
|---|---|
| `release-versioning` | Conventional Commits 1.0, Semantic Versioning 2.0, Keep a Changelog, trunk-based development (trunkbaseddevelopment.com) |
| `secure-coding` | OWASP Top 10, Software Composition Analysis / secret-scanning practice |
| `observability` | Google SRE book (golden signals, SLI/SLO/error budget), the RED method |
| `safe-deployment` | Progressive delivery (canary / blue-green / rolling), feature-flag-based deploy/release decoupling, expand–contract schema migration |
| `api-design-standards` | Microsoft REST API Guidelines / Google API Design Guide, HTTP semantics, consumer-driven contract testing (Pact-style) |
| `dependency-upgrade-management` | SBOM (CycloneDX/SPDX), RFC 8594/9745 deprecation headers, Dependabot/Renovate cadence practice |
| `incident-response` | Google SRE incident management guide, blameless postmortem culture |
| `test-strategy` | Test data management practice, flaky-test quarantine practice |
| `code-style-lint` | Established per-language formatters (gofmt, rustfmt, black, prettier), pre-commit/CI enforcement practice |

## Shipped — re-coverage (7)

| Skill | Standard(s) |
|---|---|
| `tdd` | Kent Beck's red-green-refactor cycle, Mike Cohn's testing pyramid, Fowler's test-double taxonomy (dummy/stub/fake/spy/mock), FIRST test properties |
| `code-review` | Google's Engineering Practices code review guide, Fowler's code-smell catalog |
| `diagnosing-bugs` | David Agans' *Debugging: The 9 Indispensable Rules* |
| `domain-modeling` | Eric Evans' Domain-Driven Design, Michael Nygard's ADR format |
| `codebase-design` | John Ousterhout's *A Philosophy of Software Design* |
| `resolving-merge-conflicts` | Git's three-way merge model |
| `spec-to-tickets` | INVEST criteria (Bill Wake), tracer-bullet development (Hunt & Thomas, *The Pragmatic Programmer*), Definition of Ready / Definition of Done |

All 16 skills from the original round-1/round-2 backlog are shipped.

## Naming (resolved, then reverted)

The re-coverage skills that shared an exact `name` with a skill in the installed `mattpocock-skills` plugin carried an `es-` prefix for a period (`es-tdd`, `es-code-review`, `es-diagnosing-bugs`, `es-domain-modeling`, `es-codebase-design`, `es-resolving-merge-conflicts`, and round 4's `es-grilling`/`es-handoff`/`es-teach`/`es-to-questionnaire`/`es-wait-what`/`es-writing-for-agents`/`es-wizard`) — 13 skills in total, while that plugin was enabled and both could otherwise silently collide on install order.

**Reverted (2026-08-09):** now that `mattpocock-skills` is disabled (see the final phase below), the `es-` prefix no longer serves its purpose and was dropped by explicit user request — directories renamed back on both the `~/.claude/skills` copy and this repo, frontmatter `name:` fields updated, and every cross-reference between skills' `SKILL.md` files updated to the plain names (`` `tdd` ``, `` /codebase-design ``, etc). If `mattpocock-skills` is ever re-enabled, whichever of the two same-named skills loads is decided by install order, not by this repo — a prefix would need to be reintroduced at that point if both are wanted side by side. `spec-to-tickets` and round 4's `prototype`/`research`/`triage`/`improve-codebase-architecture`/`wayfinder` never needed a prefix — mattpocock's equivalents, where any exist, aren't the same string (`to-spec`/`to-tickets`/`implement`, `grill-me`/`grill-with-docs`). The other gap-fill topics keep their plain names since nothing in the plugin uses them.

## Shipped — round 4 (12, complete)

| Skill | Standard(s) |
|---|---|
| `prototype` | Kent Beck / Ward Cunningham's spike solution (Extreme Programming) |
| `research` | Primary-source citation practice, the CRAAP source-evaluation test (Sarah Blakeslee / CSU Chico) |
| `triage` | ITIL incident priority matrix (Impact x Urgency) |
| `improve-codebase-architecture` | Martin Fowler's Technical Debt Quadrant, layered on `codebase-design` |
| `wayfinder` | The RFC process (IETF / Rust-lang staged RFC process) |
| `grilling` | BABOK elicitation techniques (structured interviews, confirm elicitation results) — combines mattpocock's `grilling`/`grill-me`/`grill-with-docs` family |
| `handoff` | SBAR (Situation-Background-Assessment-Recommendation) handoff communication standard |
| `teach` | Bloom's Taxonomy, the worked-example effect and fading (Sweller / Renkl-Atkinson cognitive load theory) |
| `to-questionnaire` | Survey-design practice: leading/loaded question avoidance, balanced Likert-scale construction |
| `wait-what` | ISO 24495-1 Plain Language standard (Relevant/Findable/Understandable/Actionable) |
| `writing-for-agents` | The Diátaxis documentation framework, adapted to agent-consumed documents |
| `wizard` | Standard operating procedure (SOP) / runbook documentation practice |

(All seven previously carried an `es-` prefix for exact-name collision with the installed `mattpocock-skills` plugin; dropped once that plugin was disabled — see "Naming (resolved, then reverted)" above.)

## Round 4 plan — full mattpocock independence (in progress)

Goal: cover every remaining capability in the installed `mattpocock-skills` plugin so it can be disabled without losing anything, then disable it. Every remaining promoted-bucket skill gets a real, source-grounded home here — including the three previously marked "out of scope" (`ask-matt`, `setup-matt-pocock-skills`, `wizard`), resolved below rather than silently dropped.

### Per-skill process (same as rounds 1–3)

1. Web-search the skill's primary standard/source to ground it in real, named practice.
2. Author `SKILL.md` in `~/.claude/skills/<name>/` — mattpocock format: frontmatter, defining constraint, numbered phases, closing checklist. Cross-reference already-shipped skills where relevant instead of restating them.
3. Author `agents/openai.yaml` beside it.
4. Copy both into `~/Documents/Github/doctrine/skills/<name>/`.
5. Update `README.md` (Skills table row, Limitations count) and `PLAN.md` (move item from this plan into a new "Shipped — round 4" table).
6. Commit and push — one commit per skill, same as every prior round.
7. Report the shipped skill before moving to the next.

### Build order

1. ~~**`prototype`**~~ — shipped, see table above.
2. ~~**`research`**~~ — shipped, see table above.
3. ~~**`triage`**~~ — shipped, see table above.
4. ~~**`improve-codebase-architecture`**~~ — shipped, see table above.
5. ~~**`wayfinder`**~~ — shipped, see table above.
6. ~~**`grilling`**~~ — shipped as `grilling` (name collision), see table above.
7. ~~**`handoff`**~~ — shipped as `handoff` (name collision), see table above.
8. ~~**`teach`**~~ — shipped as `teach` (name collision), see table above.
9. ~~**`to-questionnaire`**~~ — shipped as `to-questionnaire` (name collision), see table above.
10. ~~**`wait-what`**~~ — shipped as `wait-what` (name collision), see table above.
11. ~~**`writing-for-agents`**~~ — shipped as `writing-for-agents` (name collision), see table above.
12. ~~**`wizard`**~~ — shipped as `wizard` (name collision), see table above.

All 12 skills in the build order are shipped. Proceeding to the final phase below.

### Deliberately not rebuilt 1:1

- **`ask-matt`** — a router over that plugin's *own* skill set. This repo's skills are model-invoked with rich trigger descriptions (see `.agents/invocation.md`'s pattern already followed here), so routing happens through those descriptions rather than a separate router skill. No replacement needed — note this explicitly so the gap isn't silently unnoticed, but it's a closed gap, not an open one.
- **`setup-matt-pocock-skills`** — one-time repo configuration for *that* plugin's issue-tracker integration (`to-spec`/`to-tickets`/`triage` wiring). This repo's `spec-to-tickets` and `triage` don't depend on a configured issue-tracker backend the way mattpocock's do, so there's nothing equivalent to set up.

### Final phase — retire the plugin

All 12 skills above are shipped (2026-08-09). Status:

1. **Re-verified** against the actual installed plugin skill list (`~/.claude/plugins/cache/claude-plugins-official/mattpocock-skills/1.2.3/skills/`). The plugin has four buckets: `engineering/` and `productivity/` (the "promoted" skills this repo targets — all accounted for: shipped, folded into an already-shipped skill, or explicitly out of scope per the "Deliberately not rebuilt 1:1" section above), plus `in-progress/` (`claude-handoff`, `loop-me`, `setup-ts-deep-modules`, `writing-beats`, `writing-fragments`, `writing-shape`) and `misc/` (`git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`) — both deliberately out of scope: unstable/WIP or narrow personal-tooling skills, never part of the "promoted bucket" this round targeted. This is a closed gap, not a silent omission.
2. **Done (2026-08-09)** — `mattpocock-skills@claude-plugins-official` flipped to `false` in `~/.claude/settings.json`'s `enabledPlugins`, on explicit user confirmation. Disabled, not uninstalled — the plugin cache stays on disk, re-enabling later is a one-line flip back to `true` if ever needed. Takes effect on the next session start.
3. Collision check re-run: with the plugin disabled, the default (keep `es-` as shipped) was reconsidered by explicit user request and reversed instead — all 13 affected skills (`tdd`, `code-review`, `diagnosing-bugs`, `domain-modeling`, `codebase-design`, `resolving-merge-conflicts`, `grilling`, `handoff`, `teach`, `to-questionnaire`, `wait-what`, `writing-for-agents`, `wizard`) reverted to their plain names — see "Naming (resolved, then reverted)" above.
4. This repo's plugin dependency is fully cut: all 28 skills are self-contained here, and the plugin that partially overlapped them is now off.

## Design notes

- `spec-to-tickets` combines mattpocock's three-skill chain (`to-spec` → `to-tickets` → `implement`) into one skill, per an explicit scoping decision — narrower surface area to maintain, at the cost of not matching mattpocock's granularity if the two are ever meant to interoperate.
- `test-strategy` was deliberately scoped narrow (test data, flaky-test policy, integration/e2e boundary) to avoid re-covering ground `tdd` already owns (the pyramid, test-double taxonomy) — the two cross-reference rather than overlap.
- `incident-response` cross-references `observability`'s alert/runbook phase rather than repeating it.

## Next steps

- Execute Round 4's build order above, one skill at a time, same process as rounds 1–3.
- Then run Round 4's final phase to retire the `mattpocock-skills` plugin.
- These 16 already-shipped skills (plus the 12 in Round 4) are unvalidated in real use — first real application of each is where problems with the authored discipline will actually surface.

## Format decision

Confirmed: full `mattpocock` format (SKILL.md with a stated defining constraint + phased discipline + `agents/openai.yaml`), not a shortened version — for consistency with the plugin these skills are meant to eventually stand in for.
