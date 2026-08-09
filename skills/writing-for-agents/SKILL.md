---
name: writing-for-agents
description: Classify and structure content going into a document an agent reads (a skill, AGENTS.md, CLAUDE.md, a linked doc) so procedure, facts, and rationale don't get tangled together. Use when creating or editing a skill, or writing/editing AGENTS.md or CLAUDE.md.
---

# Writing for Agents

A document a human reads and a document an agent re-reads on every invocation serve different needs, and the mismatch is where most skill docs go wrong. This skill's defining constraint adapts Diátaxis — the four-way documentation framework (tutorial, how-to, reference, explanation) — to that difference: an agent almost never needs a **tutorial** (a guided first-exposure experience; the agent isn't building lasting comprehension across sessions the way a human learner is), so a document written for an agent should be built almost entirely from **how-to** (the steps it executes) and **reference** (facts it consults on demand), with **explanation** (the "why") minimized or relocated to where a human maintainer, not the executing agent, will actually read it.

## Phase 1 — Classify before writing

Before adding a line, decide which Diátaxis quadrant it belongs to:

- **How-to** — an ordered action the agent takes. This is the spine of most skill documents.
- **Reference** — a fact, definition, or rule consulted on demand, not read top to bottom (a table of standards, a checklist of criteria).
- **Explanation** — the reasoning behind a choice, useful for understanding *why*, not for knowing *what to do*.
- **Tutorial** — a guided first-exposure walkthrough. Almost never belongs in an agent-facing document — see Phase 4.

Content of one kind buried inside another is where documents go stale and hard to maintain: an explanation sitting mid-procedure reads like a step, and an agent that treats it as one either stalls or improvises past it.

## Phase 2 — Write the how-to as the spine

The numbered phases or steps are what the agent actually executes, in order, each ending on a condition clear enough to tell done from not-done. This is the tier that earns the top of the document — everything else exists to support it, not to compete with it for attention.

## Phase 3 — Push reference behind structure, not narrative

Facts consulted on demand — a table, a checklist, a glossary — don't need to be read in sequence, so don't force them into one. Keep them as a clearly separate, flat structure (a table, a bulleted list under its own heading) rather than folding them into prose the agent has to parse linearly to extract one row. If the reference material is large enough to dwarf the how-to, split it into a linked file the agent reaches only when that step needs it — a document whose reference outweighs its procedure buries the procedure.

## Phase 4 — Relocate explanation, don't delete it

The reasoning behind a decision is real and worth keeping, but an agent re-executing a procedure every invocation doesn't need to re-read why it exists — a human maintaining or reviewing the skill later does. Where the "why" doesn't change what the agent does, move it to where a maintainer will find it (a commit message, a PR description, an ADR per `domain-modeling`) rather than paying its cost in the agent's context on every run. Where the "why" *does* change behavior — a caveat that alters what the agent should do in a specific case — it isn't explanation at all; it's a rule, and belongs in the how-to or reference tier where the agent will actually apply it.

## Phase 5 — Skip the tutorial tier

A tutorial's job is building a learner's confidence and mental model over a first guided pass — valuable for a human onboarding to a topic, essentially wasted on an agent that has no persistent mental model between invocations to build. If a document is drifting toward "first, let's understand X, then we'll look at Y" framing, that's tutorial voice leaking into agent-facing content — cut straight to the how-to and let reference carry the concepts it needs.

## Done when

- [ ] Every piece of content was classified as how-to, reference, or explanation before being placed, and tutorial-voice framing was avoided.
- [ ] The how-to (numbered steps) is the spine, not interleaved with reference material mid-procedure.
- [ ] Reference material is structured for lookup (tables, checklists), and split to a linked file if it would otherwise dwarf the how-to.
- [ ] Explanation that doesn't change agent behavior was relocated to where a human maintainer reads it, not left in the agent's re-read path.
- [ ] Explanation that does change agent behavior was rewritten as a rule in the how-to or reference tier, not left as unexecuted rationale.
