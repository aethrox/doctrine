---
name: incident-response
description: Discipline for the full incident lifecycle, declaring and sizing an incident by severity, separating the incident-commander/comms/ops roles, mitigating before root-causing, and writing a blameless postmortem that investigates the system rather than a person. Use when a production incident is happening or just resolved, when the user asks to declare an incident, run an incident response, write a postmortem, or asks who's in charge during an outage.
---

# Incident Response

An incident is a sequence of distinct phases, each with a different job; declaring it is not the same task as fixing it, and fixing it is not the same task as understanding why it happened. The postmortem investigates **the system**, never a person: "who broke it" is the wrong question; "what condition in the system allowed this to break, and how do we change that condition" is the right one. This builds on `observability`'s alert/runbook phase (that's how an incident gets detected and where the first response steps live) but covers the incident's lifecycle after that point.

## Phase 1: Detect and declare

- Assign a **severity** at declaration time, sized to actual user impact, not to how alarming the alert sounds: SEV1 (full outage or data loss, all hands, immediate), SEV2 (significant degradation, a subset of users or a non-critical path), SEV3 (minor, workaround exists, no active user harm). The severity gates how much process kicks in; a SEV3 doesn't need the full incident-commander machinery below.
- Bias toward declaring early. A cheap early declaration that turns out to be a false alarm costs a few minutes; a real incident left undeclared because "it might resolve itself" costs the response time that could have started sooner.
- Anyone who spots the signal can declare; don't gate declaration behind a single role being available, or the incident sits unacknowledged while that person is found.

## Phase 2: Roles

For anything above the smallest severity, split the response into roles so one person isn't simultaneously debugging, fielding questions, and deciding what to tell stakeholders:

- **Incident commander (IC).** Owns the response's shape: coordinates who's doing what, makes the call on mitigation actions, decides when to escalate or de-escalate. The IC does not have to be the most senior engineer in the room or the one who best understands the failing system: the IC's job is coordination, not diagnosis.
- **Ops / subject-matter responder(s).** Actually investigates and mitigates, reporting status to the IC rather than making unilateral calls that change the incident's shape.
- **Communications lead** (above the smallest severity). Keeps stakeholders and status pages updated on a cadence, so the ops responders aren't interrupted every few minutes for a status update they don't have time to give.

A single person can hold more than one role on a small incident; the point is that these are distinct **functions**, assigned deliberately, not that every incident needs three separate humans.

## Phase 3: Mitigate before root-causing

The immediate goal is restoring service, not understanding the failure; those are sequential, not simultaneous, goals:

- Reach for the fastest safe mitigation first: roll back (see `safe-deployment`'s rollback trigger discipline), fail over, disable the offending feature flag, shed load. A full root-cause diagnosis (the `diagnosing-bugs` loop) starts **after** service is restored or stably mitigated, not instead of restoring it.
- Log the mitigation timeline as it happens (what was tried, when, what changed); this becomes the postmortem's timeline verbatim; reconstructing it from memory afterward loses precision exactly where precision matters most.
- Declare the incident mitigated (not necessarily resolved) once user impact stops, and only close it out once the underlying cause has an owner and a plan, even if that plan is a follow-up postmortem action item.

## Phase 4: Blameless postmortem

Required for SEV1 always, abbreviated for SEV2, optional brief summary for SEV3. Structure:

1. **Summary**: one paragraph: what happened, user impact, how it was resolved.
2. **Impact**: duration and scope (which users/systems), quantified where possible (requests failed, revenue/SLA impact; reuse the `observability` SLO/error-budget numbers if the service tracks them).
3. **Timeline**: chronological, from first signal to full resolution, built from Phase 3's running log.
4. **Root cause**: the technical cause, traced with the same rigor as `diagnosing-bugs`' hypothesis-and-verification discipline, not a guess written after the fact.
5. **Contributing factors**: the process or system gaps that let the root cause turn into user-facing impact: a missing test, an ambiguous runbook, an alert that didn't fire, unclear ownership. This is where the blameless framing does its real work; reframe every "X forgot to Y" as "the system allowed Y to be skipped," and fix the system.
6. **What went well**: the parts of the response worth keeping (fast detection, an accurate runbook, a mitigation that worked). A postmortem that only lists failures teaches half the lesson.
7. **Action items**: each with a named owner and a tracked ticket, not a bullet list that ends the document and gets forgotten. An action item with no owner is a wish, not a fix.

Never name an individual as the cause in the document. If a specific action (a deploy, a config change, a command) triggered the incident, describe the action and the system condition that let it cause harm, not who performed it.

## Done when

- [ ] The incident was declared with a severity matching real user impact, not the loudest alert.
- [ ] Roles were assigned above the smallest severity, so diagnosis and coordination didn't collapse onto one person.
- [ ] Mitigation restored service before root-causing started.
- [ ] The postmortem exists at the tier its severity requires, investigates the system rather than a person, and every action item has a named owner and a tracked ticket.
