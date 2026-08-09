---
name: resolving-merge-conflicts
description: Discipline for resolving an in-progress git merge or rebase conflict, a conflict marker names two divergent intents from a shared ancestor, resolved by tracing each side back to what it was trying to accomplish, never by blindly picking one side's raw text. Use when a merge or rebase has stopped with conflict markers, when deciding whether to resolve with --ours/--theirs, or when choosing between merge and rebase for integrating a branch.
---

# Resolving Merge Conflicts

A conflict marker is not a text diff to eyeball into agreement; it's two commits that each changed the same region of a file since their shared ancestor, and git can't tell which change should win because it doesn't know what either side was trying to accomplish. Resolving it means tracing each side back to its actual intent and reconciling those intents, not picking whichever half of the marker looks less broken.

## Phase 1: Understand what's actually being compared

Git's three-way merge compares three points: the **merge base** (the last common ancestor), **HEAD** (the current branch's state), and the **incoming branch's** state. A conflict fires specifically where both sides changed the same region relative to that shared base; git applies both sets of changes automatically everywhere they don't overlap, and only asks a human where they do.

Before resolving anything, identify all three for the conflicting hunk: what did the base look like, what did HEAD do to it, what did the incoming side do to it. A resolution written by comparing only the two conflicting sides, without the base, is missing the information that explains *why* they diverged.

## Phase 2: Resolve hunk by hunk, by intent

For each conflict marker:

1. Read **both sides' actual commits** that touched this region (the commit message, and the rest of that commit's diff) to understand what each side was trying to achieve, not just what the raw conflicting lines say.
2. Determine whether the two intents are **compatible** (both can be kept, combined) or **genuinely contradictory** (only one can stand, or a third resolution is needed that satisfies the goal behind both).
3. Write the resolution to satisfy both intents where possible. A resolution that keeps one side's *text* while silently dropping the *behavior* the other side's commit existed to add is not a resolution; it's a regression wearing the shape of one.
4. Move to the next hunk. Resolve one conflict region at a time rather than skimming the whole file and guessing at a combined result; the intent-tracing in step 1 only works region by region.

## Phase 3: Never blind-pick a whole side

`git checkout --ours <file>` or `--theirs <file>` at the whole-file level discards every change from the other side in that file, not just the conflicting hunks; anything the other side changed cleanly in that file (which merged silently, until this command overwrote it) is lost too. Reach for this only when the entire file is genuinely meant to come from one side wholesale (a generated file, a lockfile that should just be regenerated after), never as a shortcut to avoid reading a conflict.

## Phase 4: Verify before declaring the merge/rebase done

A conflict resolved by making the text look reasonable can still be **behaviorally wrong**: the markers are gone but the logic combining both sides doesn't actually work. Before completing the operation:

- Build/compile if the language requires it.
- Run the test suite (`tdd`'s regression tests are exactly what catches a syntactically-clean but behaviorally-broken resolution).
- For a resolution spanning multiple related hunks (e.g. a function signature changed in one hunk, its call sites in another), re-check that the resolved pieces are actually consistent with each other, not just each individually plausible.

## Phase 5: Finish the operation; don't abort to escape a hard conflict

`git merge --abort` / `git rebase --abort` discard all resolution work done so far in this operation; reach for it only when the wrong operation was started in the first place (wrong branch, wrong base), not as an escape hatch from a conflict that's merely tedious. A genuinely hard conflict gets solved by going back to Phase 1–2 with more care (read more context, ask whoever wrote the other side's commit what its intent was), not by abandoning the merge and hoping to avoid the same conflict next time; the same two branches will produce the same conflict again.

## Phase 6: Merge vs. rebase, chosen up front

| | Merge | Rebase |
|---|---|---|
| Conflict cost | resolved once, at the merge commit | may repeat, once per replayed commit that touches the conflicting region |
| History | preserved exactly as it happened, including a merge commit | rewritten: commits get new hashes |
| Safe on a shared/pushed branch | yes | no: rewriting history that others have already pulled breaks their clones |
| CI predictability | tests the exact commits that will reach production | needs re-validation after replay, since intermediate commit states changed |

Rebase only a branch that hasn't been shared, when a fully linear history is worth repeated conflict resolution across commits. Once a branch is pushed and others may have based work on it, merge is the safe default.

## Done when

- [ ] Every conflict marker was resolved by tracing both sides' intent from their actual commits, not by comparing raw text alone.
- [ ] No whole-file `--ours`/`--theirs` was used except where the entire file was genuinely meant to come from one side.
- [ ] The build and full test suite pass on the resolved result, not just "no more conflict markers visible."
- [ ] The operation was completed (committed / rebase finished), not abandoned mid-way via `--abort` to dodge a hard conflict.
