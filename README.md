# doctrine

![doctrine](./assets/banner-v6.png)

[![GitHub Sponsors](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-EA4AAA?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/aethrox)
[![Buy Me a Coffee](https://img.shields.io/badge/support-Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/aethrox)

Software engineering discipline grounded in named primary standards (OWASP, ITIL, IETF RFCs, ISO, BABOK, SBAR, and more) instead of invented convention. 33 skills covering the software development lifecycle: TDD, code review, incident response, domain modeling, deployment, dependency management, and more.

Three ways to use it, depending on your tool:

## Option 1: Claude Code plugin

Native install for Claude Code: the right skill is auto-invoked from its description, no manual copying.

```bash
/plugin marketplace add aethrox/doctrine
/plugin install doctrine
```

Toggle it off later from `enabledPlugins` in `~/.claude/settings.json`, same as any other plugin.

## Option 2: MCP server (Claude Desktop, Cursor, Windsurf, Cline, and anything else that speaks MCP)

Every skill is exposed as an MCP **prompt**: the same content, reachable from any MCP-capable client, not just Claude Code. Add it as a local MCP server:

```json
{
  "mcpServers": {
    "doctrine": {
      "command": "npx",
      "args": ["-y", "github:aethrox/doctrine"]
    }
  }
}
```

(Exact config location and format differ per client; Claude Desktop's `claude_desktop_config.json`, Cursor's `.cursor/mcp.json`, etc., but the `command`/`args` above are the same everywhere.)

Run it directly to confirm it works:

```bash
npx github:aethrox/doctrine
```

## Option 3: manual copy (no plugin system, no MCP client)

```bash
git clone https://github.com/aethrox/doctrine.git
for s in doctrine/skills/*/; do
  name=$(basename "$s")
  cp -r "$s" ~/.claude/skills/"$name"/
done
```

Re-run after pulling updates to resync.

## How it works

Every skill follows the same shape: a one-sentence defining constraint (the fact that makes it behave differently from the obvious default), a numbered set of phases with concrete, checkable rules, and a closing checklist. The skills combine named external standards and established practices with clearly labeled Doctrine policy defaults.

See [WORKFLOW.md](./WORKFLOW.md) for how the 33 skills relate to each other: the lifecycle they map to, which ones cross-reference which, and a worked example.

## Skills

| Skill | Standard(s) it encodes | Covers |
|---|---|---|
| [release-versioning](./skills/release-versioning/SKILL.md) | [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), [Semantic Versioning](https://semver.org/spec/v2.0.0.html), [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), trunk-based development | Commit classification, version bump, changelog entry, branching model |
| [secure-coding](./skills/secure-coding/SKILL.md) | [OWASP Top 10](https://owasp.org/www-project-top-ten/), SCA and secret-scanning practice | Injection classes, access control, secrets, dependency and supply-chain risk, safe error handling |
| [observability](./skills/observability/SKILL.md) | Google SRE golden signals, SLI/SLO/error budget, the RED method | Structured logging, the four golden signals, SLO definition, alert and runbook discipline |
| [safe-deployment](./skills/safe-deployment/SKILL.md) | Progressive delivery, canary/blue-green/rolling, expand-contract migrations | Decoupling deploy from release, rollout strategy choice, rollback triggers defined up front |
| [api-design-standards](./skills/api-design-standards/SKILL.md) | Microsoft/Google REST guidelines, consumer-driven contract testing | Resource/URL conventions, versioning strategy, backward-compatible vs breaking changes, contract testing |
| [dependency-upgrade-management](./skills/dependency-upgrade-management/SKILL.md) | SBOM (CycloneDX/SPDX), [RFC 8594](https://www.rfc-editor.org/rfc/rfc8594.html)/[9745](https://www.rfc-editor.org/rfc/rfc9745.html) deprecation headers, Dependabot/Renovate cadence practice | Dependency inventory, security vs routine vs major-upgrade lanes, deprecation windows, safe major-version migration |
| [incident-response](./skills/incident-response/SKILL.md) | Google SRE incident management guide, blameless postmortem culture | Severity/declaration, IC/comms/ops roles, mitigate-before-root-cause, blameless postmortem structure |
| [test-strategy](./skills/test-strategy/SKILL.md) | Test data management practice, flaky-test quarantine practice | Synthetic vs anonymized production test data, flaky-test quarantine policy, integration/e2e boundary decisions |
| [code-style-lint](./skills/code-style-lint/SKILL.md) | Established per-language formatters (gofmt, rustfmt, black, prettier), pre-commit/CI enforcement practice | Adopting the ecosystem standard, opinionated over configurable, pre-commit + CI enforcement layers, linting vs formatting |
| [tdd](./skills/tdd/SKILL.md) | Kent Beck's red-green-refactor, the testing pyramid, Fowler's test-double taxonomy, FIRST properties | The TDD cycle, what makes a test worth keeping, choosing the right test double, shaping a suite |
| [code-review](./skills/code-review/SKILL.md) | Google's Engineering Practices code review guide, Fowler's code-smell catalog | Improve-over-perfect approval bar, naming smells instead of vague complaints, small-PR discipline, review etiquette |
| [diagnosing-bugs](./skills/diagnosing-bugs/SKILL.md) | David Agans' *Debugging: The 9 Indispensable Rules* | Reproduce reliably, bisect the search space, change one variable at a time, audit trail, verify the fix against the original failure |
| [domain-modeling](./skills/domain-modeling/SKILL.md) | Eric Evans' Domain-Driven Design, Michael Nygard's ADR format | Ubiquitous language, bounded contexts and translation at boundaries, one-page ADRs, keeping the model current |
| [codebase-design](./skills/codebase-design/SKILL.md) | John Ousterhout's *A Philosophy of Software Design* | Depth as the design metric, information hiding vs. leakage, concrete shallow-module red flags, designing it twice |
| [resolving-merge-conflicts](./skills/resolving-merge-conflicts/SKILL.md) | Git's three-way merge model | Resolving hunks by tracing both sides' intent, avoiding whole-file --ours/--theirs, verifying before finishing, merge vs. rebase |
| [spec-to-tickets](./skills/spec-to-tickets/SKILL.md) | INVEST criteria, tracer-bullet development, Definition of Ready/Done | Synthesizing a spec, slicing tracer-bullet tickets with blocking edges, INVEST checks, Ready/Done gates, handoff to tdd/code-review |
| [prototype](./skills/prototype/SKILL.md) | Kent Beck/Ward Cunningham's spike solution (Extreme Programming) | Naming the one question a spike answers, timeboxing it, building disposable code, recording the verdict and discarding the code |
| [research](./skills/research/SKILL.md) | Primary-source citation practice, the CRAAP source-evaluation test | Scoping a checkable question, tracing claims to primary sources, weighing source credibility, citing findings in a saved file |
| [triage](./skills/triage/SKILL.md) | ITIL incident priority matrix (Impact x Urgency) | Classifying bug vs. enhancement, scoring impact and urgency independently, verifying before prioritizing, routing to needs-info/ready-to-spec/scheduled/wontfix |
| [improve-codebase-architecture](./skills/improve-codebase-architecture/SKILL.md) | Fowler's Technical Debt Quadrant, layered on `codebase-design`'s Ousterhout grounding | Scoping a scan, finding shallow-module red flags, classifying findings by how debt was incurred, prioritizing by leave-cost, recording declined findings as ADRs |
| [wayfinder](./skills/wayfinder/SKILL.md) | The RFC process (IETF/Rust-style engineering decision records) | Naming the destination, charting open decisions breadth-first, resolving one at a time with recorded reasoning, tracking decided/open/unspecified/out-of-scope, handoff to spec-to-tickets |
| [grilling](./skills/grilling/SKILL.md) | BABOK elicitation techniques (structured interviews, confirm elicitation results) | Mapping the known/needed gap before asking, frontier-round questioning, resolving facts by lookup not by asking, confirming answers before treating them as settled |
| [handoff](./skills/handoff/SKILL.md) | SBAR (Situation-Background-Assessment-Recommendation) handoff communication standard | Structuring a handoff into Situation/Background/Assessment/Recommendation, naming what's already ruled out, confirming receipt via read-back |
| [teach](./skills/teach/SKILL.md) | Bloom's Taxonomy, the worked-example effect and fading (cognitive load theory) | Placing the target and learner's cognitive level, opening with a fully worked example, fading scaffolding in stages, matching method to level, checking retention over fluency |
| [to-questionnaire](./skills/to-questionnaire/SKILL.md) | Survey-design practice: leading/loaded question avoidance, closed vs. open question choice, balanced Likert-scale construction | Scoping the send (recipient, gap), choosing closed vs. open per question, avoiding leading/loaded/compound questions, balancing rating scales, assembling the document |
| [wait-what](./skills/wait-what/SKILL.md) | [ISO 24495-1:2023](https://www.iso.org/standard/78907.html) Plain Language standard (Relevant/Findable/Understandable/Actionable) | Recognizing a missed-explanation signal, re-pitching instead of repeating, applying all four RFUA principles, keeping vocabulary consistent, confirming it landed |
| [writing-for-agents](./skills/writing-for-agents/SKILL.md) | The Diátaxis documentation framework, adapted to agent-consumed documents | Classifying content as how-to/reference/explanation/tutorial, writing the how-to as the spine, structuring reference for lookup, relocating explanation to human-read artifacts, skipping tutorial voice |
| [wizard](./skills/wizard/SKILL.md) | Standard operating procedure (SOP) / runbook documentation practice | Scoping to human-authority-only steps, one verifiable action per step, persisting captured values immediately, confirming before advancing, resumability after interruption |
| [repo-secure](./skills/repo-secure/SKILL.md) | GitHub's maintainer security best-practices guidance | Inventorying current settings, judging which layers apply to this repo, confirming every setting before enabling it, with branch protection receiving the most scrutiny, recording deliberate skips |
| [architecture-diagram](./skills/architecture-diagram/SKILL.md) | [The C4 model](https://c4model.com/) (Simon Brown) | Picking the right zoom level for the audience, consistent box and arrow notation, choosing to show, save, or commit a diagram as code based on what is authorized, updating on structural change |
| [explain-plainly](./skills/explain-plainly/SKILL.md) | [ISO 24495-1:2023](https://www.iso.org/standard/78907.html) Plain Language standard, applied as a default posture | No unexplained jargon by default, framing from the reader's stake, maintaining a running glossary, verifying the explanation is actionable |
| [repo-ship](./skills/repo-ship/SKILL.md) | [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), applied at authoring time, plus repo-creation-as-first-class-step practice | Splitting commits by intent, naming a new repo for what it is, deciding visibility deliberately, filling description and topics at creation |
| [project-groundwork](./skills/project-groundwork/SKILL.md) | [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html) requirements quality characteristics | Scanning a draft for ambiguity, inconsistency, incompleteness, and unverifiable claims, batching only the blocking gaps, writing decisions into the document and the repository's existing decision record together |

## MCP server internals

`mcp-server.js` is a plain Node.js (ESM, no build step) script: at startup it reads every `skills/<name>/SKILL.md`, parses the `name`/`description` out of the frontmatter, and registers each one as an MCP prompt whose content is the full skill text. Run `npm test` to smoke-test it. The test validates every skill's frontmatter as real YAML, spawns the server and performs a real MCP handshake, asserts an exact `prompts/list` name match against the discovered skill set, and diffs each `prompts/get` response against its corresponding `SKILL.md` file byte-for-byte.

## Limitations

None of the 33 skills have been battle-tested against a real release, incident, or security review yet; they're authored from standards but not yet validated in use. The MCP server has a smoke test (`npm test`) but hasn't been exercised against a real third-party MCP client (Cursor, Windsurf, etc.) yet, only a scripted handshake. This repo has no SECURITY.md or vulnerability reporting channel yet.

## License

MIT, see [LICENSE](LICENSE).
