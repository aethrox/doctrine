---
name: repo-ship
description: Split in-progress work into commits by intent as it happens, and give a new repository its name, visibility, description, and topics at the moment it is created rather than as a follow-up. Use when work is about to be committed or pushed, when a new repository is being created, or before any push that would otherwise land as one large commit.
---

# Repo Ship

A commit history and a repository's first impression are both easy to get right at the moment they are made and expensive to fix afterward. This skill's defining constraint, extending Conventional Commits from classifying already-made commits into shaping how they get made in the first place: split by intent as work happens, not by file count after the fact, and treat a new repository's metadata as part of creating it, not a task for later.

This is a different job from `release-versioning`, which classifies already-made commits into a version bump and changelog entry for a release that is shipping now. This skill governs the commits themselves while work is in progress, and a repository's first creation; `release-versioning` takes over once code already exists and a release is being cut.

## Phase 1: Split commits by intent, not by file count

A reader running `git log --oneline` should be able to tell what happened without opening a diff. One logical change per commit: a bug fix, a rename, and a new feature landing in the same commit is the pattern to avoid. If the working tree already mixes several intents, stage explicit paths per commit rather than staging everything at once. Formatting-only churn gets its own commit so it does not bury a real change inside it. Decide commit boundaries before editing when practical, especially when several intents will touch the same file.

## Phase 2: Name a new repository for what it is

A repository's name should describe what it is, not the working directory it happened to be created in. Propose the name before creating the repository, and confirm it with whoever is creating it if there is any ambiguity about what the project actually is.

## Phase 3: Decide visibility deliberately

Anything touching personal data, credentials, notes, or the repository owner's own infrastructure defaults to private. Public is for things meant to be shown. When it is genuinely ambiguous which one applies, ask rather than defaulting to public.

## Phase 4: Fill description and topics at creation

A repository's one-line description and its topics are part of creating it, not a follow-up task that gets forgotten. Fill both at the moment the repository is created, so it never sits with zero topics and no description in the interim.

## Phase 5: Verify before reporting done

Before saying a repository is shipped, inspect the actual commit log, the working tree's status, the upstream tracking relationship, and confirm the repository's visibility, description, and topics as they actually landed on the host, not as intended. If a push failed or a commit was amended along the way, report that plainly rather than reporting success by assumption.

## Done when

- [ ] Every commit represents one logical change, and unrelated intents were never staged together.
- [ ] The repository's name describes what it is, proposed and confirmed before creation.
- [ ] Visibility was a deliberate decision, private by default for anything touching personal data or infrastructure.
- [ ] Description and topics were filled at creation time, not left for later.
- [ ] The actual commit log, working tree status, and repository metadata were inspected and confirmed, not assumed.
