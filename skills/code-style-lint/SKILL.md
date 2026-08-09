---
name: code-style-lint
description: Discipline for code style and static analysis, adopt the ecosystem's established formatter as the non-negotiable source of truth, enforce it at pre-commit and CI rather than in review, and treat linting (real defects) as a separate concern from formatting (appearance). Use when setting up a new project's tooling, when a code review comment is about whitespace/naming/formatting instead of behavior, or when the user asks how to configure a linter or formatter.
---

# Code Style & Lint Enforcement

Style is not a matter for human debate. A language's established, widely-adopted formatter is the single source of truth for how code looks, enforced automatically before a human ever reads the diff, so no reviewer ever spends attention on brace placement or import order again.

## Phase 1: Adopt the ecosystem's standard, don't invent one

Reach for the tool the language community has already converged on, rather than a project-specific configuration built from scratch:

| Language | Formatter | Linter |
|---|---|---|
| Go | `gofmt` (or `goimports`): not configurable by design | `go vet`, `staticcheck` |
| Rust | `rustfmt` | `clippy` |
| Python | `black` (or `ruff format`) | `ruff` / `flake8`, type-checked with `mypy`/`pyright` |
| JavaScript / TypeScript | `prettier` | `eslint` |
| Java | `google-java-format` | Error Prone, Checkstyle |

Where no single de facto tool dominates, fall back to a named, published style guide (e.g. the Google style guides) rather than an ad hoc house style; a house style is a style nobody outside the project can look up, onboard against, or get tooling support for.

## Phase 2: Prefer opinionated over configurable

An opinionated formatter (`gofmt`, `prettier`, `black`) that offers few or no style options is worth more than a configurable one, even though it feels less flexible; every open configuration option is a decision the team has to make once and then defend forever, which reopens exactly the debate the formatter exists to close. Where the chosen tool does expose options, set them once at project setup, commit the config file, and treat re-opening that discussion as a smell: a request to change a formatter setting midway through a project is usually a style preference relitigating itself, not a real defect being fixed.

## Phase 3: Enforcement layers, in order

1. **Editor / local, on save or on commit.** The formatter runs automatically before code is even staged; a pre-commit hook (or editor format-on-save) so a contributor never has to remember to run it manually.
2. **CI, in blocking mode.** Re-run the same formatter and linter in CI and fail the build on any diff or violation. This is the actual gate; local hooks can be skipped or misconfigured, so CI is what a merge actually depends on, not a courtesy check.
3. **Code review never re-litigates style.** If a review comment is about formatting, spacing, or naming convention the linter could catch, that is a signal the pipeline is missing a check, not a legitimate review comment; fix Phase 1/2's tooling, don't leave the enforcement to a human's attention in every future review.

## Phase 4: Linting is a separate concern from formatting

A **formatter** changes appearance without changing meaning (whitespace, line breaks, quote style). A **linter** flags real defects and risky patterns a formatter can't see: unused variables, unreachable code, an `==` where `===` was meant, a missing `await`, an unhandled promise rejection. Both run at the same enforcement layers (Phase 3), but they are not interchangeable; a project that only formats and never lints still ships the class of bug a linter exists to catch before a human does.

## Done when

- [ ] The project uses the ecosystem's established formatter/linter pair, not a bespoke house style.
- [ ] Formatting and linting run automatically pre-commit and are a blocking CI check, not a manual or advisory step.
- [ ] No open review comment is about something the automated tooling should have caught.
- [ ] Linting (defect detection) is configured and enforced separately from formatting (appearance).
