---
name: repo-secure
description: Audit and enable a GitHub repository's own recommended security settings, confirming with the maintainer which ones actually apply before turning anything on. Use when the user wants a repo hardened, asks to enable secret scanning or branch protection, wants a SECURITY.md written, or references GitHub's maintainer security checklist.
---

# Repo Secure

A repository's security posture is not one setting, it is a system of defaults: who can push, what can merge, which secrets get blocked before they land, how dependencies get flagged, and how vulnerable code gets surfaced before it becomes production risk. This skill's defining constraint, grounded in GitHub's own maintainer security guidance (the six settings every maintainer is told to enable): configuration happens one repository at a time, and never blanket, since a private personal script repo and a public library with external contributors do not need the same posture.

This skill is scoped to the repository's own configuration surface. It is not `secure-coding` (the code inside the repo, mapped to OWASP) and not `dependency-upgrade-management` (the cadence at which dependencies get upgraded once flagged); both are cross-referenced here rather than repeated.

## Phase 1: Inventory what is already on

Before changing anything, check the repo's current settings: SECURITY.md presence, private vulnerability reporting, secret scanning and push protection, Dependabot alerts and dependency review, code scanning, and branch protection rules on the default branch. State what is already enabled and what is not, so the audit has a real starting point instead of assuming a blank slate.

## Phase 2: Confirm which layers genuinely apply

Not every setting belongs on every repo. A private, single-maintainer script repo has little use for external vulnerability disclosure workflows; a public library that other projects depend on needs nearly all of them. Ask, or infer from the repo's actual visibility and audience, which of the following genuinely apply before proposing to enable them:

- **SECURITY.md and private vulnerability reporting**: how a researcher reports a vulnerability safely, without opening a public issue.
- **Secret scanning and push protection**: catches credentials before they land in history, blocks the push rather than the after-the-fact cleanup.
- **Dependabot alerts and dependency review**: flags vulnerable dependencies; see `dependency-upgrade-management` for what happens once one is flagged.
- **Code scanning**: CodeQL or an equivalent, run in CI so a vulnerability surfaces before merge, not after.
- **Branch protection**: who can push directly to the default branch, what must pass before a merge is allowed.

## Phase 3: Enable in order, confirm before consequential changes

Enable settings that are purely additive (SECURITY.md, secret scanning, Dependabot, code scanning) without much ceremony; they rarely break an existing workflow. Branch protection is different: it can block a maintainer's own existing push habits or an automation's write access, so confirm with the user before applying it, and state exactly what it will restrict.

## Phase 4: Record what was deliberately skipped

A setting that was considered and not enabled for a real reason (a solo repo with no external contributors does not need private vulnerability reporting yet, for instance) should be recorded as a deliberate decision, not left silently absent. This is what keeps a later audit from re-litigating the same question from scratch.

## Done when

- [ ] The repo's current settings were inventoried before anything was proposed.
- [ ] Each layer's applicability was judged against this specific repo's visibility and audience, not applied uniformly.
- [ ] Additive settings were enabled directly; branch protection was confirmed with the user first, with its restrictions stated plainly.
- [ ] Anything deliberately skipped is recorded with its reason, not left unexplained.
