---
name: diagnosing-bugs
description: Systematic debugging discipline based on David Agans' nine rules — understand the system, reproduce reliably, bisect the search space, change one variable at a time, keep an audit trail, and never declare a fix done until it's verified against the original failure. Use when the user reports something broken, throwing, failing, or slow, or says "diagnose" / "debug this".
---

# Diagnosing Bugs

Debugging is not guessing with extra steps — it's a search problem, and a search problem has a systematic solution: understand the space you're searching, reproduce the failure on demand, shrink the search space by half at a time, and change exactly one thing per experiment so cause and effect stay unambiguous. Every rule below traces back to Agans' *Debugging: The 9 Indispensable Rules* — treat them as a sequence, not a menu to pick from.

**Redact secrets before showing any command, log, or captured artifact** — same discipline as `secure-coding`'s Phase 3: replace credentials with `<REDACTED>`, quote only the lines carrying real signal from anything with auth headers or full payloads.

## Rule 1 — Understand the system

Before touching anything, know the normal path the failing code should take: read `CONTEXT.md` or equivalent domain docs if they exist, trace the flow from entry point to the point of failure, and know what "correct" looks like well enough to recognize it. A theory formed without this is a guess with the system's real shape substituted by an assumed one.

## Rule 2 — Make it fail, then look before you theorize

**Reproduce on demand first.** A bug that only happens "sometimes, somewhere in prod" isn't diagnosable yet — build the smallest repeatable trigger: a failing test, a script, a request replayed against a dev instance. For a flaky/non-deterministic failure, the goal isn't a clean 100% repro but a **high enough reproduction rate to observe** — loop it, add stress, narrow timing windows, until it fails often enough to study.

**Then look, don't theorize.** With a reproducible failure in hand, inspect the actual evidence — logs, state, a debugger breakpoint — before forming a hypothesis. A theory built by staring at code without first looking at what the system actually did is the single most common way to burn time chasing the wrong cause.

## Rule 3 — Divide and conquer

Shrink the suspect region by bisecting it, not by scanning it linearly:

- **Across code:** binary-search the call stack or commit history (`git bisect`) — is the bug present at the midpoint between known-good and known-bad?
- **Across input:** shrink a large failing input to the smallest one that still fails, cutting roughly half at a time.
- **Across the system:** if the failure could be in any of several components, test the middle of the chain first (does data arrive there correctly?) rather than starting at one end and walking through every component in order.

Each bisection step is itself an experiment — apply Rule 4 to it.

## Rule 4 — Change one thing at a time

Every experiment changes exactly one variable and keeps everything else pinned. Two simultaneous changes (a code edit and an environment change; a config flip and a data change) make it impossible to attribute the resulting behavior to either one — a "fix" applied this way might be doing nothing, or might be masking a second, still-live bug.

## Rule 5 — Keep an audit trail

Write down every experiment and its result as you go, including the negative ones — "tried X, no change" is information, and without a record it gets re-tried by mistake an hour later. Tag any temporary debug instrumentation with a unique, greppable prefix so cleanup at the end is a single search, not a memory exercise.

## Rule 6 — Check the plug

Verify the boring, obvious assumptions before trusting an elaborate theory — is the service actually running, is the config pointing at the environment you think it is, is the clock right, is the code you're reading actually the code that's deployed. A sophisticated hypothesis built on top of a false boring assumption wastes far more time than the thirty seconds it takes to check the assumption first.

## Rule 7 — Get a fresh view when stuck

If several bisection/hypothesis cycles haven't converged, stop and explain the bug out loud to someone else, or write it out as if explaining it to them (rubber-duck works even with no one there to hear it). Articulating the full chain of evidence out loud routinely surfaces the gap in reasoning that silent re-reading doesn't.

## Rule 8 — If you didn't fix it, it ain't fixed

A fix isn't done because the code changed and looks right — it's done when the original reproduction from Rule 2 now passes, and only then. Turn that reproduction into a regression test at a real seam (see `tdd` for what makes a seam correct) so the same failure can't silently return. If no correct seam exists for a regression test, that absence is itself a finding — flag it, since it means the architecture is what's letting this class of bug reach production undetected.

## Done when

- [ ] The failure has a reliable (or high-rate, for flaky bugs) reproduction — a command, script, or test you've actually run.
- [ ] The search space was bisected, not scanned; each experiment changed exactly one variable.
- [ ] The audit trail shows what was tried, including dead ends, and all temporary instrumentation is removed.
- [ ] The original repro now passes, and a regression test locks it down at a correct seam (or the absence of one is explicitly flagged).
