---
name: release-versioning
description: Discipline for commit messages, version bumps, and changelogs — Conventional Commits classify every change, SemVer computes the version from those commits, Keep a Changelog renders the result. Use when the user asks to cut a release, bump a version, write a changelog, decide if a change is a major/minor/patch, choose a branching model, or when committing on a project that ships versioned releases.
---

# Release Versioning

The version number and changelog are **derived**, never chosen by feel. Conventional Commits classifies each change; that classification computes the SemVer bump; the bump renders straight into a Keep a Changelog entry. Skip a step and the other two have nothing to compute from.

## Phase 1 — Commit classification (Conventional Commits)

Every commit that touches shipped behaviour is typed:

```
<type>(<optional scope>)!: <description>

<optional body>

<optional footer(s)>
```

| Type | Meaning | SemVer effect |
|---|---|---|
| `fix` | bug fix | PATCH |
| `feat` | new backwards-compatible capability | MINOR |
| `feat!` / `fix!` / any type with `!` or a `BREAKING CHANGE:` footer | incompatible API change | MAJOR |
| `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore` | no shipped behaviour change | none |

- `refactor` and `perf` carry no version bump **only if** the public interface is unchanged — a `perf` that changes a function signature is a `feat` or a breaking change, not a `perf`.
- The `!` and the `BREAKING CHANGE:` footer are the **only** signals that force a MAJOR bump. Do not infer "this feels big" — if nothing changed for a consumer's existing calls, it is not breaking.
- One commit, one logical change. A commit mixing a `fix` and an unrelated `feat` forces the classifier to guess; split it.

Done when every commit in the range to be released has an unambiguous type and, for any breaking one, a `BREAKING CHANGE:` footer describing what a consumer must change.

## Phase 2 — Version computation (SemVer)

Given `MAJOR.MINOR.PATCH`, and reading the range since the last release in Conventional Commit order of precedence (MAJOR beats MINOR beats PATCH — one breaking commit anywhere in the range forces MAJOR regardless of how many `fix`es sit next to it):

- Any breaking commit → bump MAJOR, reset MINOR and PATCH to 0.
- Else any `feat` → bump MINOR, reset PATCH to 0.
- Else any `fix` → bump PATCH.
- Else (only non-releasing types) → no release; do not cut one just because time passed.
- Below `1.0.0`: MINOR may carry breaking changes by convention (the public API is declared unstable) — state this explicitly in the project's README if relied on, since it silently overrides the table above.

Never hand-pick a version number "because it feels like a big release" — if the commits don't justify the bump, the commits are mis-typed; fix the classification, not the number.

## Phase 3 — Changelog (Keep a Changelog)

Render the computed release as one dated section, changes grouped under the fixed category headings — only the categories that have entries appear:

```
## [1.4.0] - 2026-08-09

### Added
- <feat commits, plain-language, user-facing wording — not the raw commit message>

### Changed
### Deprecated
### Removed
### Fixed
- <fix commits>

### Security
```

- An **Unreleased** section at the top of the file accumulates entries as commits land, and is renamed to the version + date at release time — never write changelog entries only at release time from a blank slate, or the entry quality degrades into "various fixes."
- Each entry is written for the consumer reading the changelog, not a copy-paste of the commit subject — "Fixed a race condition in the retry queue that could drop the last job" beats `fix(queue): race condition`.
- A `Security` entry is mandatory for any fix classified as a vulnerability patch, even if it could also read as a `Fixed` bug — security fixes must be independently discoverable by someone scanning only that heading.

## Phase 4 — Branching model

Default to **trunk-based development**: one long-lived branch, short-lived feature branches (hours to a couple of days, never weeks), merged behind a feature flag if the feature isn't ready to release. State to the user, don't silently assume, when the repo's actual practice differs.

Trunk-based only holds up with all three supports in place — missing any one degrades it back into long-lived branching under a different name:

- **Fast, reliable CI** on every merge to trunk (if CI is slow or flaky, people start avoiding merging, which recreates long-lived branches).
- **Feature flags** to decouple "merged to trunk" from "visible to users" — an unfinished feature merges dark, behind a flag, rather than staying on a branch.
- **A merge queue or equivalent discipline** keeping trunk green — a red trunk blocks everyone, so nothing merges into an already-broken trunk.

Reach for a longer-lived release-branch model (Gitflow-style) only when the project genuinely maintains multiple production versions in parallel (e.g. an SDK supporting N-1 major versions) — not as a default for a single deployed service.

## Done when

- [ ] Every commit in the release range has an unambiguous Conventional Commits type, and every breaking one has a `BREAKING CHANGE:` footer.
- [ ] The version bump is the one the commit types compute — not a hand-picked number.
- [ ] The changelog entry groups changes under the standard headings, in consumer-facing language, with a `Security` heading used wherever it applies.
- [ ] The branching model in use has its three trunk-based supports in place, or the deviation is a stated, deliberate choice — not silent drift.
