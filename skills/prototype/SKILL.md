---
name: prototype
description: Build a throwaway spike solution to answer one design or technical question before committing to an approach. Use when the user wants to sanity-check whether a state model, logic, or UI direction feels right, is unsure an approach will work, or wants to explore options before writing production code.
---

# Prototype

A spike solution (Kent Beck and Ward Cunningham's term from Extreme Programming) is a quick, throwaway program written to answer **one specific technical question**, ignoring every other concern. The code is not the deliverable; the answer is. Most spikes aren't good enough to keep, and that's by design: keeping one is a sign it wasn't actually a spike.

## Phase 1: Name the question

Before writing anything, state the single question this spike exists to answer; "does this state machine handle the cancel-mid-submit case correctly?", "can this API return the shape we need without an extra round-trip?", "what should this settings panel look like?" A spike with more than one question attached is really two spikes; split it.

Identify which kind of question it is, since it decides the artifact:

- **"Does this logic / state model hold up?"** → build a single shareable file (or minimal script) that drives the logic through the cases that are hard to reason about on paper, printing the resulting state after each step so the answer is visible, not inferred.
- **"What should this look like / feel like?"** → build the UI variation(s) directly in the app's existing routing/component conventions, switchable without rebuilding, so it can be looked at rather than described.
- **"Will this technical approach even work?"** → build the smallest possible harness that exercises the risky part end-to-end (the actual API call, the actual library, the actual integration point) and nothing else.

If the question is genuinely ambiguous and the user isn't reachable, default to whichever reading matches the surrounding code, and say so at the top of the spike rather than guessing silently.

## Phase 2: Timebox it

A spike is a thin, deep drive at one unknown (the "spike through a log" the name comes from), not a general exploration. Set an explicit bound before starting (Beck's own spikes ran half a day to two days; cap at what the question actually needs) and stop when the question is answered, even if the code is ugly. A spike that's still running past its bound has usually stopped being a spike and turned into unplanned production work; surface that instead of continuing silently.

## Phase 3: Build disposable code

1. **Mark it as throwaway on sight.** Name it so a casual reader knows immediately it isn't production code, and locate it near what it's prototyping so the context is obvious.
2. **Skip everything the question doesn't need.** No tests, no error handling beyond what keeps the spike running, no abstractions, no edge cases outside the one being investigated. Beck's framing: address the problem under examination and ignore all other concerns.
3. **No real persistence.** State lives in memory unless persistence is itself the thing being tested, in which case hit a scratch database or a clearly-named "PROTOTYPE: wipe me" file, never a real one.
4. **Trivial to run.** One command, or one file to open. Nobody should need instructions to start it.
5. **Surface the state.** Print or render the relevant state after every action or variant switch; the whole point is to make the answer visible, not to trust a mental model of what the code does.

## Phase 4: Answer and discard

The deliverable is the answer, not the code. When the question is settled:

- **Record the verdict** (what was learned, and what question it settles) in the issue, ticket, or a commit message. This is what survives; the code usually doesn't.
- **Fold only the validated decision** into real code, built properly (tests, error handling, the works) rather than promoting the spike's code wholesale.
- **Keep the spike as a reference, not as production code.** If it's worth keeping for the record, commit it to its own throwaway branch, out of main, and leave a pointer to that branch from the issue or commit that used its answer. Main keeps the decision, not the disposable code that reached it.
- **Write the verdict without em dashes**: use a comma, colon, period, or a reworded sentence instead.

## Done when

- [ ] The spike's single question is stated explicitly, before code was written.
- [ ] The spike stayed inside its timebox, or the overrun was surfaced rather than absorbed silently.
- [ ] The code skips tests, error handling, and abstractions beyond what keeps it running, and is unmistakably marked as throwaway.
- [ ] The verdict (what was learned) is recorded in the issue or commit, independent of whether the code itself survives.
- [ ] Only the validated decision, not the spike's code, was folded into production, built to that codebase's normal standard.
