---
name: code-review
description: "Code review discipline: the approval bar is \"improves code health,\" not \"perfect,\" Fowler's code-smell catalog gives design/complexity concerns a name instead of a vague feeling, and small PRs keep review depth from degrading. Use when reviewing a pull request or diff, requesting a review, deciding whether a change is blockable, or leaving review feedback."
---

# Code Review

A reviewer's job is to keep the codebase's health moving forward on net, not to hold every change to a standard of perfection. A change that is better than the current state gets approved, even with room left for future improvement; the improvement doesn't have to happen in this diff, it has to not regress in this diff.

## Phase 1: What a reviewer actually checks

In order, roughly by how much a mistake there costs to fix later:

1. **Design.** Does this change belong where it is, does its interface make sense, does it fit the system it's joining? A design problem caught here is cheap; caught after three more features build on top of it, expensive.
2. **Functionality.** Does it do what the author intended, and is that intent actually correct for the user/caller? Read the diff as if you were going to use it, not just as if you were going to compile it.
3. **Complexity.** Could this be simpler? A clever one-liner that takes five minutes to parse is a tax every future reader pays; see Phase 2 for naming the specific complexity smell rather than leaving a vague "this feels complicated."
4. **Tests.** Does the change have tests at the right seam (see `tdd`), and do those tests actually verify the behavior that matters, not just exercise the code path?
5. **Naming, comments, documentation.** Do names say what things are, do comments explain *why* rather than restating *what*, is anything now stale (a README, an ADR) because of this change?

**Style is not on this list.** Formatting, whitespace, and naming-convention violations are `code-style-lint`'s job, enforced by automation before a human ever opens the diff; a reviewer commenting on something a linter should have caught is a signal the pipeline is missing a check, not a legitimate review finding.

## Phase 2: Name the smell (Fowler's catalog)

When Phase 1's "complexity" or "design" check turns up something that feels off, name it against a known category instead of leaving an impression-based comment; a named smell tells the author exactly what to look for and how to fix it:

| Category | What it looks like |
|---|---|
| **Bloaters** | a method, class, or parameter list that grew past what a reader can hold in their head (Long Method, Large Class, Long Parameter List, Primitive Obsession) |
| **Object-orientation abusers** | inheritance or polymorphism used where it doesn't fit (Switch Statements that should be polymorphism, Refused Bequest, Temporary Field) |
| **Change preventers** | a change in one place forces edits in several unrelated places (Divergent Change, Shotgun Surgery, Parallel Inheritance Hierarchies) |
| **Dispensables** | code that adds no value and could be deleted (Dead Code, Speculative Generality, Duplicate Code, unnecessary Comments compensating for unclear code) |
| **Couplers** | one module knows too much about another's internals (Feature Envy, Inappropriate Intimacy, Message Chains, Middle Man) |

A comment that says "Shotgun Surgery; this same change touched four files, consider consolidating the logic that needs to change together" is actionable. "This feels messy" is not.

## Phase 3: The approval bar

Block a change only for what would make code health **worse**, not for what merely falls short of ideal:

- **Blocking:** an actual functional bug, a design choice that will cost real pain to reverse later, a missing test at a seam that genuinely matters, a named smell severe enough to hurt the next several changes in this area.
- **Non-blocking (comment, then approve):** a stylistic preference where the author's approach is also legitimate, a "nice to have" refactor unrelated to this change's purpose, a naming quibble that doesn't confuse anyone.
- Where the author can show, with reasoning or data, that their approach and the reviewer's alternative are both legitimate, the author's choice stands; a reviewer's personal preference is not grounds to block when there's no real difference in code health.

## Phase 4: Keep the diff reviewable

A reviewer's attention is roughly constant, not scaling with diff size; a 2,000-line PR does not get 10x the scrutiny a 200-line PR gets, it gets a skim. Push back on splitting a change **before** review starts, not during: a target of roughly 400 changed lines keeps a diff small enough that every line actually gets read. A change that's inherently large (a mechanical rename, a generated file) is the exception, and should say so explicitly rather than being reviewed as if it were 2,000 lines of judgment calls.

## Phase 5: Etiquette

- Respond promptly: a review that sits unstarted for days blocks the author's whole chain of follow-up work, not just this one change.
- Distinguish an explicit requirement ("this needs to change before merge") from a suggestion ("consider X, up to you") in the comment itself; an author guessing which kind of comment they're reading either over-blocks on a suggestion or under-fixes a requirement.
- Reviews are also where senior and junior engineers transfer knowledge in both directions; treat a comment as a chance to explain the reasoning, not just deliver the verdict.

## Done when

- [ ] Every blocking comment names a real cost (bug, design regression, missing critical test, or a named smell), not a stylistic preference.
- [ ] No comment duplicates something `code-style-lint`'s automation should have already caught.
- [ ] The diff was reviewable in size, or explicitly flagged as a mechanical exception.
- [ ] The change was approved once it was better than the current state, even with legitimate non-blocking suggestions left open.
