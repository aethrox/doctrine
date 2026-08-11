---
title: Project Workflow
description: Move from an idea to verified, reviewable work using the smallest relevant set of Doctrine skills.
---

Doctrine describes a lifecycle, not a rigid pipeline. Skip phases and skills that do not apply. Return to an earlier phase when new evidence changes a decision.

## The lifecycle

| Phase | Main question | Typical skills |
|---|---|---|
| Plan and discover | What are we trying to achieve, and what is still unknown? | `wayfinder`, `grilling`, `research`, `project-groundwork` |
| Spec and ticket | What small outcomes can be built and verified? | `spec-to-tickets` |
| Design and prototype | Which technical choice must be settled first? | `prototype`, `codebase-design`, `architecture-diagram` |
| Build | What is the next observable behavior? | `tdd`, `secure-coding`, `code-style-lint` |
| Review and merge | Does the change improve code health and meet its outcome? | `code-review`, `test-strategy`, `resolving-merge-conflicts` |
| Release and ship | How should the work be committed, versioned, and deployed? | `repo-ship`, `release-versioning`, `safe-deployment` |
| Operate and respond | What is happening in the running system? | `observability`, `diagnosing-bugs`, `incident-response`, `handoff` |
| Improve | Which structural friction is worth addressing next? | `improve-codebase-architecture` |

## A small-task loop

Most beginner tasks need a shorter loop:

1. **State the outcome.** Describe what a user can observe when the task works.
2. **Select the skill.** Choose by the current situation, not by habit.
3. **Set boundaries.** Name non-goals, allowed files, and actions requiring approval.
4. **Build one slice.** Keep one behavior and one verification target in focus.
5. **Inspect the result.** Review the diff and run the smallest relevant check.
6. **Record the change.** Commit one logical intent and note any remaining risk.

## Common routes

### A new, unclear idea

```text
wayfinder or grilling
→ research where facts are missing
→ project-groundwork
→ spec-to-tickets
→ tdd
→ code-review
→ repo-ship
```

### A reported bug

```text
triage when priority is unknown
→ diagnosing-bugs
→ tdd for the regression test and fix
→ code-review
→ repo-ship
```

### A security-sensitive change

Use `secure-coding` while the change is written. Do not postpone it until review.

## Evidence before “done”

A response saying “done” is not evidence. Check the result at four levels:

1. **Diff:** Did only the intended files and behaviors change?
2. **Automated check:** Does the relevant test, build, or validation command pass?
3. **User behavior:** Can you demonstrate the promised outcome?
4. **Repository state:** Are unrelated changes untouched, and is the logical change recorded clearly?

For a bug fix, rerun the original reproduction. For a new feature, demonstrate its stated acceptance outcome.

## A good task brief

```md
Outcome:
Non-goals:
Relevant context:
Allowed changes:
Actions requiring approval:
Evidence of completion:
Doctrine skill to use:
```

Do not fill fields that do not matter. The purpose is to prevent hidden assumptions, not to create paperwork.
