---
name: wait-what
description: Recognize when the last explanation didn't land, and re-pitch it rather than repeating it. Use when the user's response signals confusion (a follow-up that shows they missed the point, silence, or a direct "wait, what?") right after an explanation was given.
---

# Wait, What?

Confusion after an explanation is a signal about the explanation, not the reader; repeating the same words louder fixes nothing. This skill's defining constraint, from ISO 24495-1 (the international plain-language standard)'s four governing principles: a re-pitch must be **relevant** (only what this reader needs right now, not everything that's true), **findable** (the point stated up front, not buried under setup), **understandable** (plain words, one idea per sentence), and **actionable** (the reader knows what to do or believe next): all four, not just "simpler words."

This is the recovery move for one specific moment: an explanation was just given and didn't land. For explaining something plainly from the start, or maintaining a running glossary for a non-technical audience, that's a broader concern this skill doesn't own.

## Phase 1: Recognize the signal

The trigger is a response that shows the prior explanation didn't transfer: a follow-up question that reveals a different (wrong) mental model, silence where engagement was expected, or a direct signal like "wait, what?" Don't wait for an explicit "I don't understand"; a follow-up question aimed at the wrong layer of the problem is the same signal, just quieter.

## Phase 2: Re-pitch, don't repeat

The failed explanation's words, structure, and level of detail didn't work; reusing them with more emphasis repeats the failure. Reframe from a different angle: a different analogy, a different starting point, or a different granularity (too abstract → concrete example; too detailed → the one-sentence version first).

## Phase 3: Apply all four ISO 24495-1 principles

- **Relevant**: cut everything the reader doesn't need to resolve their actual confusion right now. A re-pitch that repeats context they already have is why the first attempt was missed.
- **Findable**: lead with the point itself, not the reasoning that arrives at it. A reader who's already confused won't survive a long windup before the answer appears.
- **Understandable**: plain words over jargon, short sentences, one idea per sentence. If a technical term is unavoidable, define it inline rather than assuming it survived from the first attempt.
- **Actionable**: end with what the reader should now do, believe, or decide. An explanation that's merely accurate but doesn't resolve into a next step leaves the reader exactly as stuck as before.
- **Punctuation**: write the re-pitch without em dashes, using a comma, colon, period, or a reworded sentence instead.

## Phase 4: Keep vocabulary consistent

Use the same terms the project's domain glossary already establishes (see `domain-modeling`'s ubiquitous language) rather than introducing a fresh synonym mid-re-pitch, swapping vocabulary between the first attempt and the re-pitch adds a second thing to reconcile on top of the concept itself.

## Phase 5: Confirm it landed

Don't move on until there's a real signal the re-pitch worked (a reader restating it in their own words, or acting on it correctly) rather than a token acknowledgment. A second miss calls for a third angle, not a third repeat of the second attempt.

## Done when

- [ ] The re-pitch used a genuinely different framing, not the same explanation with added emphasis.
- [ ] The point comes first (findable), stripped to what's relevant right now, in plain language, ending in something actionable.
- [ ] Terminology stayed consistent with the project's established glossary rather than introducing new synonyms.
- [ ] A real signal confirms the re-pitch landed before moving on.
