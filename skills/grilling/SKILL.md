---
name: grilling
description: Interview the user relentlessly, in rounds, to close the gap between what's known and what's needed before acting on a plan, decision, or idea. Use when the user wants to stress-test their thinking, a plan has unstated assumptions, or a decision keeps getting acted on before it's actually been made.
---

# Grilling

An interview isn't a checklist of questions read out in order; it's closing a specific gap between what's already known and what's needed before acting. This skill's defining constraint, from BABOK's elicitation discipline: every question earns its place by targeting that gap, and nothing gathered is treated as settled until it's played back and confirmed. This is a business-analysis technique for the same reason it applies here: an unconfirmed answer is often not the answer that was meant.

## Phase 1: Map the gap before asking anything

Before the first question, identify what's already known (from the conversation, the codebase, prior decisions) versus what's genuinely missing. A question that's already answerable from context doesn't belong in the interview, asking it anyway wastes the user's attention on ground already covered, and signals the interviewer wasn't listening.

Structure the missing pieces as a **decision tree**: each open decision, and which other open decisions it depends on. A decision with no unresolved dependency is on the **frontier**: answerable right now, without guessing at something not yet heard.

## Phase 2: Elicit in rounds

Ask the whole frontier in one round, not one question at a time, batching respects the user's time and lets them see how the questions relate to each other. For each question:

- State it precisely enough that a specific answer, not a restatement of the question, is the expected response.
- Offer a recommended answer where one exists: a default the user can accept, correct, or override, rather than a blank slate they have to fill from nothing.
- Write questions and their surrounding prose without em dashes: use a comma, colon, period, or a reworded sentence instead.

Wait for the round's answers before computing the next round. Each answer can unblock questions that depended on it; recompute the frontier fresh each round rather than pre-planning every round up front, since an early answer can make a later planned question moot or reveal a new one.

## Phase 3: Elicit facts by finding them, not asking for them

A question that's actually a lookup (something answerable from the filesystem, a tool, or already-published documentation) isn't the user's job to answer. Go find it (per `research` for anything needing primary-source verification) instead of spending a round on it. Only questions that require the user's judgment, preference, or authority belong in front of them. If a fact-finding pass is still running, don't block the whole round on it; ask everything else in the frontier now, and fold the fact in once it's back.

## Phase 4: Confirm before treating an answer as settled

BABOK's elicitation discipline doesn't end at gathering an answer; it closes with explicitly confirming it, because a restated answer often reveals it wasn't received the way it was meant. Before moving an answered decision out of the open list:

- Play back what was understood, in the interviewer's own words, not a copy of the user's phrasing; a paraphrase surfaces a misunderstanding that an echo would hide.
- Treat silence or a vague "yes" to a paraphrase with lower confidence than an explicit correction or confirmation; if the stakes are high enough to be asking at all, a real confirmation is worth one more line.

## Phase 5: Stop when the gap is closed

The interview ends when the decision tree has no open branches left: everything that mattered was asked, confirmed, and recorded, with nothing left silently assumed. Don't act on the gathered decisions until the user has confirmed the whole picture matches their intent, not just each individual answer in isolation; a set of individually-correct answers can still add up to a plan the user wouldn't actually choose.

## Done when

- [ ] The gap between known and needed was mapped before any question was asked, and already-answerable questions were skipped.
- [ ] Questions were asked in frontier rounds, not one at a time or all at once regardless of dependency.
- [ ] Lookups were resolved by finding the fact, not by asking the user to supply it.
- [ ] Every gathered answer was played back and confirmed before being treated as settled.
- [ ] Nothing was acted on until the user confirmed the whole assembled picture, not just each answer individually.
