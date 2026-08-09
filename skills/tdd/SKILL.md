---
name: tdd
description: "Test-driven development discipline: the red-green-refactor cycle, the testing pyramid's proportion of unit/integration/e2e, Fowler's test-double taxonomy, and the FIRST properties of a test worth keeping. Use when building a feature or fixing a bug test-first, mentions \"TDD\" or \"red-green-refactor\", or when deciding what kind of test to write, whether to mock a dependency, or how a test suite should be shaped."
---

# Test-Driven Development

TDD is a design discipline, not a testing habit. Kent Beck's rule is absolute: **no production code is written except to make a failing test pass, and no more of it than the test requires.** The test comes first because it forces the interface to be designed from the caller's side before an implementation exists to bias the design.

## Phase 1: The cycle

One cycle, repeated, never skipped:

1. **Red.** Write the smallest test that expresses one new piece of behaviour, for code that does not yet support it. Run it. Confirm it fails, and fails for the reason you expect; a test that fails on a typo or a missing import isn't red for the right reason.
2. **Green.** Write the minimum production code that makes the test pass. Resist the urge to generalize or handle a case the test didn't ask for; a case not yet demanded by a test is a case not yet designed, and designing it now is a guess.
3. **Refactor.** With the suite green, improve the internal structure, naming, and duplication; behaviour does not change, only shape. Run the suite after every small edit; if it goes red, the refactor introduced a real change, not just a cleanup, and needs to be undone or reconsidered.

Each cycle is a **vertical slice**: one behaviour, one test, one minimal implementation, then the next cycle picks the next behaviour. Writing a batch of tests up front for behaviour that doesn't exist yet is not TDD; it's testing an imagined shape, and the tests go insensitive to what implementation actually teaches you as you build.

## Phase 2: What makes a test worth keeping (FIRST)

- **Fast.** A slow suite gets run less often, which defeats the purpose of a tight feedback loop: milliseconds, not seconds, for the unit layer.
- **Isolated / Independent.** Any test can run alone or in any order, with no shared mutable state leaking from another test. A test that only passes after a specific other test ran first is not a test, it's a trap.
- **Repeatable.** Same result every run, in any environment: no dependence on wall-clock time, network availability, or random seed unless pinned.
- **Self-validating.** Pass or fail, with no human reading output to decide: an assertion, not a `console.log` someone has to eyeball.
- **Timely.** Written just before the code that makes it pass, not after. A test written after the implementation tends to assert what the code happens to do, not what it should do.

Structure each test **Arrange, Act, Assert**: set up the preconditions, perform the one action under test, assert the outcome. A test with multiple Act/Assert blocks is testing multiple behaviours and should be split.

The expected value in an assertion must come from an **independent source of truth** (a known-good literal, a worked example, a spec), never recomputed by the same logic the test is exercising. A test that derives its expected value the way the code does can never disagree with a bug in that logic; it passes by construction.

## Phase 3: Test doubles (Fowler's taxonomy)

Reach for the narrowest double that makes the test possible, in this order of preference:

| Double | What it does | Use it when |
|---|---|---|
| **Dummy** | passed in but never actually used, just fills a parameter slot | the collaborator is required by the signature but irrelevant to this test |
| **Stub** | returns canned answers to calls made during the test | the code under test needs a dependency to return a specific value to reach the branch being tested |
| **Fake** | a working, simplified implementation (in-memory DB instead of a real one) | a stub's canned answers aren't enough because the test needs realistic, stateful behaviour, but the real dependency is too slow or heavy |
| **Spy** | a stub that also records how it was called | the test needs to assert on an interaction (was this called, with what) in addition to controlling the return value |
| **Mock** | pre-programmed with expectations about the calls it will receive, fails the test itself if unmet | the test's whole point **is** the interaction (an email got sent, an event got published): not the resulting state |

Mocking a collaborator you don't own the interaction contract for, or mocking three levels deep into a call chain, is a sign the seam is wrong, not that you need a fancier double; reach for `/codebase-design` to find the right seam before adding another layer of mocks.

## Phase 4: Shape of the suite (the testing pyramid)

Most tests are fast, isolated **unit tests**; fewer are **integration tests** that exercise a real seam between components (a real database, a real HTTP call to a test server); fewest are **end-to-end tests** that drive the whole system as a user would. Push a test as far down the pyramid as it can go while still being a true test of the behaviour; an inverted pyramid (mostly e2e, few unit) is slow to run and slow to diagnose when it fails, because a red e2e test names a symptom, not a cause.

## Anti-patterns

- **Test-after.** Writing the implementation first, then tests to match what it does: the tests confirm the code compiles, not that it's correct, and the design never got the benefit of being driven from the caller's side.
- **Horizontal slicing.** Writing every test for a feature before any implementation. See Phase 1: TDD is vertical, one slice at a time.
- **Implementation-coupled tests.** Asserting on private state, internal method calls, or a side channel (querying storage directly instead of going through the public interface) instead of observable behaviour. The tell: the test breaks on a refactor even though behaviour didn't change.
- **Ice-cream-cone suite.** The inverted pyramid from Phase 4: heavy on e2e, light on unit. Usually the result of unit tests being too coupled to implementation to survive refactors, so people stop trusting them and retreat to testing everything end-to-end instead.
- **Refactor folded into the cycle.** Redesigning while also changing behaviour in the same step removes the safety net TDD exists to provide: refactor only with a green suite, as its own step.

## Done when

- [ ] Every production line exists because a failing test demanded it.
- [ ] Each test is fast, isolated, repeatable, self-validating, and was written before its code (FIRST).
- [ ] Every assertion's expected value comes from an independent source, not the code's own logic.
- [ ] Test doubles used are the narrowest kind that made the test possible, not the most convenient one reached for by default.
- [ ] The suite is unit-heavy, with integration and e2e tests reserved for what a unit test genuinely cannot verify.
