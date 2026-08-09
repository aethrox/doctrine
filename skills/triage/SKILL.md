---
name: triage
description: Classify and prioritize an incoming bug report or feature request using Impact × Urgency, and route it to the right next step. Use when the user wants a backlog triaged, an issue prioritized, or asks whether something is worth working on now versus later.
---

# Triage

Priority is not a feeling, and it isn't the reporter's tone of voice; it's the product of two independently-scored axes. This skill's defining constraint, from ITIL's incident priority matrix: **Priority = Impact × Urgency**, scored separately before they're combined, so a loud but low-impact request and a quiet but high-impact one land where they actually belong instead of where they were pushed.

This is the ongoing backlog process. For a live production outage happening right now, use `incident-response`'s severity/declaration phase instead; that skill owns the real-time incident path, while this one owns the queue.

## Phase 1: Classify

Tag the item with what kind of work it is before scoring anything:

- **Bug**: something that used to work, or was specified to work, doesn't.
- **Enhancement**: new capability or improvement; nothing is broken.

This decides which axis questions in Phase 2 even apply (a bug's urgency is about ongoing harm; an enhancement's is about a deadline or opportunity cost) and keeps the two from being scored by the same yardstick.

## Phase 2: Score Impact × Urgency

Score each axis independently, then combine, scoring them together is how a vivid report inflates urgency into impact it doesn't have.

| | **Low Urgency** | **High Urgency** |
|---|---|---|
| **High Impact** | P2 | P1 |
| **Low Impact** | P4 | P3 |

- **Impact**: how much of the system, how many users, or how much business function is actually affected. One user's edge case is not the same impact as an outage of a shared path, regardless of how it's phrased.
- **Urgency**: how quickly a resolution is actually needed: is there active harm accumulating (data loss, security exposure, blocked release), or is this tolerable for a while even though it matters?

Write down the reasoning for each axis, not just the resulting P-number; the number alone is where re-litigation starts later; the reasoning is what settles it.

## Phase 3: Verify before committing a priority

Don't prioritize a claim that hasn't been checked:

- **For a bug**, reproduce it from the reporter's steps before scoring impact. An unreproduced bug is a `needs-info` state, not a P-number yet: a report that can't be reproduced can't be sized honestly.
- **For an enhancement**, check whether it's already implemented (search by the underlying capability, not just the request's wording): a request for something that already exists is a routing decision, not a priority decision.
- Report what verification found: confirmed with a reproduction path, not reproduced (strong `needs-info` signal), or already implemented.

## Phase 4: Route

Every triaged item lands in exactly one state:

- **`needs-info`**: verification in Phase 3 couldn't confirm the claim, or scoring in Phase 2 is missing information only the reporter has. State precisely what's missing; a vague "need more detail" ask gets a vague answer back.
- **`ready-to-spec`**: verified, scored, and specific enough to hand to `spec-to-tickets` for slicing into tracer-bullet work.
- **`scheduled`**: verified and scored, but deliberately queued behind higher-priority work; note the P-number so re-triage later starts from the same reasoning instead of from scratch.
- **`wontfix`**: rejected (state why) or already implemented (point to where it lives). The latter is a different reason than rejection and shouldn't be logged the same way, since it means the request was valid but redundant.

Write the triage rationale and routing note without em dashes, using a comma, colon, period, or a reworded sentence instead.

## Done when

- [ ] The item is tagged bug or enhancement before any scoring happens.
- [ ] Impact and Urgency are scored independently, with the reasoning written down, not just the resulting P-number.
- [ ] A bug's reproduction (or an enhancement's already-implemented check) was verified before it was assigned a priority.
- [ ] The item is routed to exactly one of needs-info / ready-to-spec / scheduled / wontfix, with the reason stated.
