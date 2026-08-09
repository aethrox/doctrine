---
name: domain-modeling
description: Domain-Driven Design discipline, build a ubiquitous language shared by code and conversation, draw explicit bounded contexts where a term's meaning holds, and record significant decisions as one-page Architecture Decision Records. Use when project vocabulary is inconsistent or ambiguous, when the same word means different things in different parts of a codebase, when onboarding needs a shared glossary, or when a significant architectural decision needs to be captured for later.
---

# Domain Modeling

A model's vocabulary is the code's vocabulary. The same word means the same thing in conversation, code, and documentation; inside one deliberately bounded area. A term that needs qualifying every time it's used ("order" meaning a purchase in one team's code and a queue position in another's) is not one term with an ambiguity problem, it's two terms wearing the same word, and the fix is a boundary, not a footnote.

## Phase 1: Build the ubiquitous language

- Build the vocabulary **with** the people who know the domain, not in isolation; a term invented by engineers alone tends to drift from how the business actually talks about the thing, which reopens the translation gap this phase exists to close.
- Use the agreed term **everywhere**: class names, variable names, module boundaries, commit messages, conversation, and documentation. If the code says `Customer` and the domain experts say `Client`, one of the two is wrong; reconcile it rather than letting code and conversation quietly diverge into two dialects.
- A term needing a qualifier every time it's spoken ("the *shipping* order, not the *purchase* order") is the tell that two concepts are sharing one word. Split the word, or draw a boundary (Phase 2) so each side keeps its own meaning without collision.
- Record the language in a living glossary (a `CONTEXT.md` or equivalent) that a new contributor reads before writing code in the area; the language exists to lower everyone's cognitive load, which only works if it's written down somewhere more durable than institutional memory.
- `domain-modeling` owns the project's glossary or vocabulary artifact (`CONTEXT.md` or equivalent). `explain-plainly` should consume its terms or propose entries into that artifact rather than maintaining a separate glossary.

## Phase 2: Draw bounded contexts

A **bounded context** is an explicit boundary (team, codebase area, or database schema) inside which one model and its language hold a single, consistent meaning. Outside that boundary, the same word is allowed to mean something else on purpose, because it belongs to a different model serving a different concern.

- Draw the boundary around a real seam: team ownership, a deployable unit, a bounded area of the business, not an arbitrary folder split.
- Where two contexts must exchange data (a shipping context needs to know about an order the sales context owns), translate explicitly at the boundary rather than importing one context's model wholesale into the other's; an untranslated import is how one context's internal vocabulary leaks into and corrupts a second context's language.
- A **context map** shows which contexts exist and how they relate (one upstream of another, a shared kernel, or a translation layer between them). It is worth drawing out loud when a project has more than a couple of contexts, so the boundaries are a decision the team can see, not an accident of how the code happened to get split.

## Phase 3: Record significant decisions (ADRs)

Not every decision needs a record: an ADR is for a decision that shapes structure, a non-functional characteristic, a dependency, an interface, or a construction technique going forward. Use Michael Nygard's format, kept to one page:

```markdown
# <Number>. <Title>

## Status
Proposed | Accepted | Superseded by <ADR-N>

## Context
The forces at play (technical, business, or team constraints) that make this decision necessary. Stated neutrally, not as an argument for the answer already chosen.

## Decision
What was decided, stated as a plain, active sentence ("We will use X"), not a menu of options.

## Consequences
What becomes easier and what becomes harder as a result. Every real decision has both; an ADR with no downside listed under Consequences didn't look hard enough.
```

- An ADR describes **why**, not **how**: implementation detail belongs in code and its comments, not the record of the decision that led there.
- If the length pushes past one page, it's usually documenting more than one decision; split it.
- A superseded decision is never edited in place; write a new ADR, mark the old one's status as `Superseded by <new ADR>`, and leave the original text intact. The history of *why things changed* is as valuable as the current state.

## Phase 4: Keep it alive

A glossary term or an ADR that no longer matches how the system actually works is a signal to revisit the model, not a stale doc to quietly patch around. Treat a mismatch surfaced during a `grilling` conversation, a code review, or a fresh onboarding question as a trigger to update `CONTEXT.md` and, if the underlying decision changed, write a new ADR superseding the old one.

## Done when

- [ ] Every term in active use means one thing inside its bounded context, and that meaning matches what domain experts actually say.
- [ ] Code identifiers (classes, modules, key variables) use the same words as the glossary and the conversation; no quiet dialect drift.
- [ ] Any place two contexts exchange data does so through an explicit translation, not a raw import of the other's model.
- [ ] A significant decision has a one-page ADR stating context, decision, and consequences, and a changed decision superseded the old ADR rather than editing it.
