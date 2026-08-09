---
name: spec-to-tickets
description: Turns an already-discussed plan into a written spec and a set of tracer-bullet tickets, synthesizing rather than re-interviewing, slicing work end-to-end rather than by layer, and gating entry/exit with a written Definition of Ready and Definition of Done rather than by feel. Use when the user asks to turn a conversation or plan into a spec, break work into tickets, or size and sequence a set of tasks before implementation starts.
---

# Spec to Tickets

A spec synthesizes what's already been decided; it does not re-interview the user from scratch. And a ticket is not "ready to start" or "done" by feel; both are gated by a written, agreed checklist, so two people (or two sessions) apply the same bar instead of a different one each time.

## Phase 1: Synthesize the spec

Pull together what the conversation, plan, or existing notes have already established (problem statement, scope, explicit non-goals, and any real constraints (technical, timeline, dependency)) into one written document. This is a **synthesis** step, not a fresh discovery interview: if a genuine open question surfaces that nothing already discussed has answered, ask it once, narrowly, rather than re-covering ground already settled.

A spec worth ticketing states:

- **The problem**, in one or two sentences: what's wrong or missing, for whom.
- **Scope**, concretely enough that a reader can tell what's in and what's out.
- **Non-goals**: explicitly named, not left to be inferred. An unstated non-goal is the most common source of scope creep once tickets are underway.
- **Constraints** that shape the solution (a deadline, a system that can't change, a dependency on another team).

## Phase 2: Slice into tracer-bullet tickets

A **tracer bullet** ticket is a thin, complete slice through the whole system (enough to prove the path works end-to-end) rather than a horizontal layer (all the backend work, then all the frontend work). Slice work the same way `tdd` builds it: one vertical slice, working and demonstrable, before the next.

For each ticket:

- State what it delivers as a testable outcome, not a task description; "a user can submit the form and see a confirmation" instead of "build the form."
- Declare its **blocking edges** explicitly: which other tickets must land first, and why. A dependency left implicit is a dependency someone starts working around instead of respecting.
- Keep it small enough to land in one focused work session; a ticket that can't be described in a sentence or two is usually two tickets wearing one number.

## Phase 3: Apply INVEST to each ticket

Check every ticket against Bill Wake's INVEST criteria before it's considered ready to size or sequence:

| Criterion | What it rules out |
|---|---|
| **Independent** | a ticket that can't be worked without simultaneously touching another unfinished ticket's code |
| **Negotiable** | a ticket so over-specified it's actually a design document, leaving no room for the implementer's judgment on the how |
| **Valuable** | a ticket whose outcome doesn't matter to a user or the system on its own: usually a sign it should be folded into the ticket it's actually in service of |
| **Estimable** | a ticket too vague to size: usually missing the acceptance outcome from Phase 2 |
| **Small** | a ticket that spans more than one focused session: split it along another real seam |
| **Testable** | a ticket with no way to verify it's done: see Phase 5's Definition of Done |

## Phase 4: Definition of Ready (entry gate)

A ticket does not start until it passes a written Ready checklist, agreed once for the project rather than re-litigated per ticket:

- [ ] The acceptance outcome (Phase 2) is stated and testable.
- [ ] Every blocking ticket has already landed, or the dependency is at least known and sequenced.
- [ ] No open question remains that would change the approach; an unresolved question here is a hidden re-scope waiting to happen mid-implementation.

A backlog of tickets that haven't cleared this gate is fine to hold, starting one that hasn't is how a "small" ticket turns into a multi-day detour chasing an answer that should have been settled first.

## Phase 5: Definition of Done (exit gate) and handoff

A ticket closes only once it passes a written Done checklist:

- [ ] The acceptance outcome from Phase 2 is demonstrably true, not "the code is written," but the actual outcome the ticket promised.
- [ ] Built test-first per `tdd`, with tests at a correct seam.
- [ ] Reviewed and approved per `code-review`'s bar (improves code health, not necessarily perfect).
- [ ] Any spec, glossary, or ADR affected by the change is updated (see `domain-modeling`), not left to drift.

Implementation itself is `tdd`'s job and merging is `code-review`'s gate; this skill's job ends at handing off a ticket that's genuinely ready, and confirming it against Done once work claims to be finished.

## Done when

- [ ] The spec states problem, scope, non-goals, and constraints, synthesized from what's already known rather than re-interviewed.
- [ ] Every ticket is a vertical tracer-bullet slice with its blocking edges stated explicitly.
- [ ] Every ticket passes INVEST before being sized or sequenced.
- [ ] No ticket started without clearing Definition of Ready, and none closed without clearing Definition of Done.
