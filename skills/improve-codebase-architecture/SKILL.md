---
name: improve-codebase-architecture
description: Scan a codebase (or a named area of one) for architectural friction, classify each finding by how it was incurred, and propose deepening opportunities in priority order. Use when the user wants an architecture review, asks where the design is causing pain, wants technical debt surfaced and prioritized, or asks what to refactor next.
---

# Improve Codebase Architecture

Not every rough edge is the same kind of problem. This skill's defining constraint, from Martin Fowler's technical debt quadrant: every finding is classified on two axes before it's prioritized: **deliberate vs. inadvertent** (was the tradeoff known at the time) and **prudent vs. reckless** (was it a reasoned tradeoff or a corner cut under pressure). A knowingly-accepted tradeoff and an accidental mistake call for different responses even when the resulting code looks identical.

This skill finds *what's shallow*; `codebase-design` supplies the vocabulary (module, interface, depth, seam, the deletion test) for describing *why*. Use that skill's terms exactly rather than drifting into generic words like "component" or "service."

## Phase 1: Scope the scan

Decide where to look before looking everywhere, scanning a whole codebase uniformly dilutes attention across places that don't need it:

- If the user named a module, subsystem, or pain point, take it directly.
- Otherwise, walk back through recent commit history to find hot spots (files and areas that keep recurring) since a module actively being changed pays back a deepening investment faster than a stable, rarely-touched one.

Read any existing domain glossary or ADRs covering the scoped area first, so findings don't re-litigate a decision already made deliberately.

## Phase 2: Find the friction

Walk the scoped code looking for Ousterhout-style red flags (see `codebase-design` for the full vocabulary):

- A module whose interface is nearly as complex as its implementation; shallow, not deep.
- Understanding one concept requires bouncing across many small modules to assemble the picture.
- Logic extracted into "testable" pure functions while the real bugs live in how and where they're called; no locality.
- A seam that's leaking implementation details across it instead of hiding them.

For each candidate, apply the deletion test: would removing it concentrate the complexity somewhere sensible, or just relocate the same mess? Only "concentrates" candidates are worth writing up.

## Phase 3: Classify by how it was incurred

For each finding, place it in Fowler's quadrant before deciding what to recommend:

| | **Prudent** | **Reckless** |
|---|---|---|
| **Deliberate** | Accepted knowingly, for a reason: check first whether an ADR already documents why. If so, this may not be a finding at all; only surface it if the friction now outweighs the original reason. | Cut knowingly, for speed, without reasoning through the cost. Flag directly: this is the case most worth revisiting. |
| **Inadvertent** | A better approach was learned after the fact; normal to accumulate as understanding grows. Prioritize by current cost, not by fault. | A mistake made without the knowledge to avoid it at the time. Worth fixing, but don't frame it as blame: the point is the code's current state, not who wrote it. |

A **Deliberate/Prudent** finding that still has a live ADR usually isn't a finding; skip it unless the original tradeoff has genuinely stopped paying off. The other three quadrants are real candidates, but the framing of the recommendation differs by quadrant, not just the priority.

## Phase 4: Present in priority order

For each surfaced candidate, state:

- **Where**: the files/modules involved, named with the project's own domain vocabulary where one exists.
- **Quadrant**: which of the four cells it falls in, and why.
- **Problem**: the concrete friction this causes today (not hypothetical future pain).
- **Proposed deepening**: what would change, described in `codebase-design` terms.
- **Cost of leaving it** vs. **cost of fixing it**: the actual tradeoff, since a Reckless/Deliberate finding with a low leave-cost may still not be worth touching now.

Order candidates by leave-cost, not by how easy the fix is; an easy fix for a low-cost problem is not more urgent than a harder fix for a problem actively slowing the team down. Write the findings without em dashes, using a comma, colon, period, or a reworded sentence instead.

## Phase 5: Record the decision

Once the user picks a candidate to act on (or explicitly declines one with a load-bearing reason):

- A declined finding with a real reason behind it is an ADR candidate per `domain-modeling`, so the next scan doesn't re-surface the same already-settled question.
- A finding acted on gets designed properly; run `codebase-design`'s design-it-twice practice before committing to one interface, rather than taking the first shape that comes to mind.

## Done when

- [ ] The scan was scoped deliberately (named area or recent hot spots), not run uniformly over the whole codebase.
- [ ] Every finding passed the deletion test before being written up.
- [ ] Every finding is classified into one of Fowler's four quadrants, with the classification driving how it's framed.
- [ ] Findings are ordered by the cost of leaving them, not by ease of fixing them.
- [ ] A declined finding with a real reason is captured as an ADR so it isn't re-surfaced next scan.
