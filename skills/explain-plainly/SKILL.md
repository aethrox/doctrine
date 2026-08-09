---
name: explain-plainly
description: Default to explaining technical work in plain language for a non-technical audience, using an existing project glossary only when a persistent document is already in scope. Use whenever an explanation is aimed at someone outside the technical team, or whenever jargon would otherwise go unexplained. Distinct from wait-what, which is a recovery move after an explanation already failed, not a default posture.
---

# Explain Plainly

Most technical writing defaults to precision for an audience that already has the vocabulary, then gets awkwardly simplified after someone gets lost. This skill's defining constraint, from ISO 24495-1's plain language principles: plain framing is the default posture for a non-technical audience, not a fallback reached for only after confusion is signaled. This is the same standard `wait-what` uses, applied differently: `wait-what` triggers reactively, after a specific explanation has already failed to land; this skill is the proactive default for anything explained to someone outside the technical team. When a project already has a persistent glossary owned by `domain-modeling`, this skill uses that artifact rather than creating a separate one.

## Phase 1: Default to no unexplained jargon

Assume the reader does not already hold the vocabulary. Define a technical term inline the first time it appears in a given piece of writing, in a plain clause the reader would not need to look up. If a persistent project document is already in scope and the repository has an existing glossary convention, route the term there under Phase 3 when a full definition would derail the sentence. Do not wait for a confusion signal before doing this; treat unexplained jargon as a default defect, not an edge case.

## Phase 2: Frame from the reader's stake, not the mechanism

Lead with what changes for the reader (what they can now do, what risk is gone, what decision this enables), not with how the underlying system works. A reader outside the technical team rarely needs the mechanism to act on the information; they need to know what it means for them. Explain the mechanism only when the reader's own next decision actually depends on it.

## Phase 3: Use an existing glossary only when it is in scope

For an ordinary chat explanation, explain terms inline and do not create or edit a glossary. Update a glossary only when a persistent project document is already in scope for the current task and an existing repository convention authorizes the write, such as `domain-modeling`'s `CONTEXT.md` or equivalent. If no such convention exists, do not invent `GLOSSARY.md`; keep the definition inline. When the convention does exist, consume its established terms and add an authorized entry there rather than maintaining a separate glossary.

## Phase 4: Verify against the Actionable principle

Before treating an explanation as finished, check whether it resolves into something the reader can now decide or do, per ISO 24495-1's actionable principle: an explanation that is accurate but leaves the reader exactly where they started has not actually done its job. If it does not, the explanation is missing its point, not just missing polish.

## Phase 5: Stay out of wait-what's lane

If a specific explanation has already been given and the reader's response signals it did not land (a follow-up that reveals a wrong mental model, silence, a direct sign of confusion), that is `wait-what`'s recovery move, not a fresh default-posture explanation from this skill. This skill governs the first pass; `wait-what` governs the repair.

## Done when

- [ ] Every technical term is defined inline on first use, or routed to an existing authorized glossary when a persistent project document is already in scope, without waiting for a confusion signal.
- [ ] The explanation leads with what it means for the reader, not with the underlying mechanism, unless the mechanism is what the reader's own decision depends on.
- [ ] When an existing glossary convention and the current task authorized an update, that artifact was updated as terms were used; otherwise no glossary was created or edited.
- [ ] The explanation resolves into something actionable for the reader, not just an accurate description.
- [ ] A reactive repair after a failed explanation was handed to `wait-what`, not redone here.
