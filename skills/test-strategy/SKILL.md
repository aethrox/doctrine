---
name: test-strategy
description: Suite-level testing decisions that sit above individual tests, where test data comes from (synthetic factories vs anonymized production snapshots), the flaky-test quarantine policy, and where the integration/e2e boundary actually belongs. Use when deciding how a test suite should source its data, what to do with a flaky test, or whether a given seam needs a full integration test, a contract test, or a unit test with a double is enough. Does not cover the red-green-refactor cycle or test-double taxonomy; see the tdd skill for those.
---

# Test Strategy

Where a test gets its data from and what happens when it goes flaky are suite-level policies, decided once and applied consistently, not improvised per test or per failure. This skill covers the decisions that sit above the individual red-green-refactor cycle (see `tdd` for that): test data sourcing, flaky-test handling, and the integration/e2e boundary.

## Phase 1: Test data

Default to **synthetic data generated at test runtime**: factories or fixtures that build exactly the shape a test needs, checked into the test itself or a shared factory module. This is fast, requires no external data source, and its content is fully under the test's control (see `tdd` Phase 2, expected values need an independent source of truth, and hand-built synthetic data is that source).

Reach for a **production data snapshot** only when synthetic data genuinely can't reproduce the bug pattern or edge case under test; real-world data has irregularities and relationship patterns synthetic generators tend to smooth over. When a snapshot is used:

- **Anonymize before it leaves production**, never after: mask or replace identifying fields (names, emails, IDs) while preserving format and **referential integrity** (a masked customer ID still matches the same masked customer's masked orders), so the data stays realistic enough to be useful without staying identifying.
- Version the snapshot alongside the code that depends on it, the same way `tdd`'s FIRST properties require a test to be repeatable; a snapshot that silently changes between CI runs breaks that guarantee.
- Treat it as the exception, not the default: a suite that leans on production snapshots for routine tests has usually skipped building proper factories, and inherits every compliance and staleness problem synthetic data doesn't have.

## Phase 2: Flaky test policy

A test that fails intermittently with no code change is not evidence of a real bug until proven otherwise, but it also cannot be allowed to sit red-flaking-green forever; it trains people to ignore CI failures, which is worse than not having the test.

1. **Quarantine, don't delete.** Move the test out of the required-check set so its failure no longer blocks a merge, but keep it running and keep recording its result; quarantine preserves the signal, deletion destroys it.
2. **File a ticket at quarantine time**, not later: the failure pattern observed, the test's original author as default owner, and a **stay limit** (two to four weeks is a reasonable default).
3. **Before the stay limit expires**, the test is either fixed (root-caused with the same rigor as `diagnosing-bugs`, most commonly a Phase 3 anti-pattern from `tdd`, shared mutable state, unpinned time, an unmocked network call) or formally retired with the reasoning written down. A test that silently ages past its stay limit without either outcome is exactly the state this phase exists to prevent.
4. Track quarantine as a first-class suite health metric; a suite with an ever-growing quarantine list is accumulating debt the team has stopped noticing.

## Phase 3: Where the integration/e2e boundary goes

A test earns its place at the integration or e2e layer only if a unit test with a double genuinely cannot verify the behavior, not by default, and not because it was easier to write against the real thing:

| Situation | Right layer |
|---|---|
| Logic is internal to one module, no real I/O involved | Unit test (`tdd`) |
| Behavior depends on how this service and another service actually agree on a shape (a request/response contract) | Consumer-driven contract test (see `api-design-standards` Phase 4): cheaper than a full integration test and fails for the same reason a real breaking change would |
| Behavior depends on real infrastructure semantics a fake can't reproduce (a real database's transaction/locking behavior, a real message queue's ordering guarantees) | Integration test against a real (or realistic containerized) instance of that dependency |
| The thing under test is the user-visible flow across the whole system | End-to-end test: kept deliberately few, per `tdd`'s pyramid, since each one is slow and names a symptom rather than a cause when it fails |

Before adding an integration or e2e test, ask whether a contract test or a unit test with the right double (`tdd` Phase 3) would catch the same class of bug, if it would, that's the cheaper and faster test to maintain, and the heavier one is redundant coverage.

## Done when

- [ ] Test data is synthetic by default; any production snapshot in use is anonymized with referential integrity preserved and versioned alongside the code.
- [ ] Every flaky test is either green, quarantined with a ticket/owner/stay-limit, or formally retired; none are silently tolerated in the required-check set.
- [ ] Every integration or e2e test exists because a unit test or contract test genuinely couldn't cover it, not by default.
