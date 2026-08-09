---
name: handoff
description: Hand off in-progress work, an on-call shift, or an open incident to another person or agent using a fixed four-part structure, so nothing load-bearing is lost between one owner and the next. Use when work needs to change hands mid-flight, an on-call rotation is ending, or a session needs to brief whoever picks this up next.
---

# Handoff

A handoff fails when the receiver has to reconstruct context the sender already had. This skill's defining constraint, from SBAR (Situation-Background-Assessment-Recommendation); the structured handoff standard behind the Joint Commission's National Patient Safety Goal for handoff communication, adapted here from clinical and on-call practice: every handoff has exactly four parts, in that order, and nothing that belongs in one part gets buried inside another.

This covers handing off live, in-progress work between owners: an on-call shift, an open incident, or a task mid-flight. It is not the same job as compacting a conversation for a fresh agent session to resume (that's a session-continuity concern) or as writing a postmortem (that's `incident-response`'s closed-incident artifact, written after the fact rather than mid-handoff).

## Phase 1: Situation

State the current state in one or two lines: what's happening right now, headline only. A reader who stops after this line should still know whether this is urgent. Don't lead with history or analysis; the situation is the "what," not the "how we got here."

## Phase 2: Background

Give only the context that changes what the receiver does next: what's already been tried, what's already been ruled out, what decisions are already made and shouldn't be re-litigated. A background section that restates everything from the start forces the receiver to re-derive what actually matters; the discipline here is inclusion by relevance, not by completeness. If something was tried and failed, say so explicitly; the single most expensive handoff failure is the receiver re-attempting a dead end because nobody mentioned it was already dead.

## Phase 3: Assessment

State the current read of the problem, not just facts, but the sender's judgment: how serious is this, what's the actual root concern, what's still genuinely unknown versus just not yet written down. This is the part a bare status report skips, and it's the part that carries the most value, because it's the sender's accumulated judgment, not just a log of events.

## Phase 4: Recommendation

Give a concrete next action, not just a description of the problem. If there's a decision only the receiver can make, name it explicitly rather than leaving it implicit in the background. A handoff that ends at Assessment leaves the receiver to invent their own recommendation from scratch, often duplicating judgment the sender already reached.

## Phase 5: Confirm receipt

A handoff isn't complete when it's sent. Closed-loop communication (the same principle SBAR is built on) means the receiver reads back what they understood before the sender disengages. For a live on-call or incident handoff, get an explicit acknowledgment of the Assessment and Recommendation specifically, not just "got it"; a receiver who can restate the recommendation in their own words has actually received it.

## Done when

- [ ] Situation is a short headline, not a summary of everything that follows.
- [ ] Background includes only what changes the receiver's next action, and explicitly names anything already tried and ruled out.
- [ ] Assessment states the sender's judgment, not just a list of facts.
- [ ] Recommendation names a concrete next action and any decision only the receiver can make.
- [ ] Receipt was confirmed: the receiver restated the Assessment and Recommendation, not just acknowledged receiving a message.
- [ ] Generated prose uses commas, colons, periods, or reworded sentences instead of em dashes.
