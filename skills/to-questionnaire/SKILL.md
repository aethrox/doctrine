---
name: to-questionnaire
description: Turn a decision that can't be answered alone into a written questionnaire for the person who actually holds the missing knowledge. Use when a decision is blocked on facts or judgment only one specific person has, and that person needs to be asked async or in a structured meeting rather than interviewed live.
---

# To Questionnaire

A questionnaire only earns its place when the knowledge gap is real and the recipient is the only one who can close it — this skill's defining constraint is that every question in the document targets that gap specifically, grounded in established survey-design practice: neutral, unbiased phrasing (never a leading or loaded question), the right choice between closed and open questions for what's actually being asked, and a correctly-balanced scale wherever a rating is needed.

Interview the person sending the questionnaire only about the **send** — who it's going to, and what's needed back — never about the subject itself, since the subject is exactly what the recipient knows and the sender doesn't.

## Phase 1 — Scope the send

Establish two things before drafting a single question:

1. **Who's the recipient** — their role, expertise, and relationship to the sender. This fixes the questionnaire's tone and how much background context it needs to carry; a peer needs less framing than someone outside the team entirely.
2. **What's actually needed back** — the specific decisions or facts the sender can't resolve alone. A vague goal ("get their thoughts") produces a vague questionnaire; a concrete list of what the sender must walk away able to decide produces a targeted one.

## Phase 2 — Choose closed or open per question, deliberately

Neither is a default — each question earns its format from what it's actually collecting:

- **Closed** (multiple choice, yes/no, a scale) when the answer needs to be quick, comparable across respondents, or clearly structured — at the cost of not capturing anything outside the offered options.
- **Open** when the sender needs context, reasoning, or an answer that can't be enumerated in advance — at the cost of being harder to compare or aggregate later.

Pairing a closed question with a short open follow-up ("why?") is often the right shape when both the fact and the reasoning behind it matter.

## Phase 3 — Write every question to avoid leading and loading

- **No leading language.** "How satisfied are you with X?" gets an honest answer; "Do you agree that X is working well?" pulls the respondent toward agreeing. Neutral phrasing produces the respondent's actual view, not the one implied by the question.
- **No loaded or double-barreled questions.** One idea per question — a question that bundles two things ("is the API fast and reliable?") produces an answer that doesn't actually resolve to either one.
- **No compound assumptions.** A question that presumes an unstated fact ("how much did the outage cost you?" presumes there was measurable cost) traps a respondent who'd otherwise say the premise is wrong.

## Phase 4 — Balance any rating scale

Where a question needs a rating rather than a free answer, build a proper Likert-style scale, not an ad hoc one:

- Offer equal numbers of positive and negative options around a genuinely neutral midpoint — "Excellent / Very Good / Good / Fair / Neutral" is unbalanced (four positive-leaning terms and no real negative); "Excellent / Good / Neutral / Bad / Poor" is balanced.
- Label the endpoints (and ideally every point) so respondents share a common understanding of what each value means, rather than each anchoring the scale differently in their head.
- Five points is a reasonable default — enough resolution to be useful, not so many that adjacent points become indistinguishable.

## Phase 5 — Assemble the document

Order questions most-important-first — an async questionnaire may only get one pass before the recipient stops. Group under theme headings once there are more than a handful. For each question: state it as one idea, leave an answer stub directly beneath, and add a one-line "why this matters" only where the question could otherwise be misread or invite a throwaway answer. Open with a short context paragraph orienting a recipient who wasn't in the sender's head, and close with a catch-all for anything not asked but worth knowing.

## Done when

- [ ] The recipient and the specific gap they're being asked to close are both stated before any question was drafted.
- [ ] Every question is closed or open on purpose, not by default.
- [ ] No question leads, loads, or bundles more than one idea.
- [ ] Any rating scale is balanced around a genuine neutral midpoint with labeled anchors.
- [ ] Questions are ordered most-important-first, one idea per question, with context up front and a catch-all at the end.
