---
title: Project Workflow
description: Move from an idea to work you can review and verify with only the Doctrine skills you need.
---

Think of this workflow as a flexible lifecycle, not a pipeline you must follow in order. Skip anything that does not help. Go back when new evidence changes an earlier decision.

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

For most beginner tasks, this shorter loop is enough:

1. **State the outcome.** Describe what a user can observe when the task works.
2. **Select the skill.** Choose one for the situation in front of you, not out of habit.
3. **Set boundaries.** Name non-goals, allowed files, and actions requiring approval.
4. **Build one slice.** Focus on one behavior and one result you can check.
5. **Inspect the result.** Review the diff and run the smallest relevant check.
6. **Record the change.** Make a commit for one logical intent and note any risk that remains.

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

Use `secure-coding` while you write the change. Security is part of the work, not something to add during review.

## Evidence before “done”

An agent saying “done” is not evidence. Check the result in four places:

1. **Diff:** Does the list of file changes contain only the files and behaviors you intended to change?
2. **Automated check:** Did the relevant test, build, or validation command pass?
3. **User behavior:** Can you show the promised outcome working?
4. **Repository state:** Did unrelated changes stay untouched, and is the logical change recorded clearly?

For a bug fix, repeat the steps that originally showed the bug. For a new feature, demonstrate the result you agreed would prove it works.

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

Leave out any field that does not matter. This brief is here to expose hidden assumptions, not create paperwork.
