---
name: dependency-upgrade-management
description: Discipline for keeping dependencies current and deprecating capabilities safely — an inventory (SBOM) of what's actually shipped, security patches on a fast lane separate from routine/major upgrades, and a stated deprecation window (Sunset/Deprecation headers, N-2 support) before removing anything consumers rely on. Use when upgrading a dependency, triaging a Dependabot/Renovate PR, deciding whether an upgrade is safe to automerge, or planning to deprecate or remove a capability others depend on.
---

# Dependency & Upgrade Management

A dependency is code you didn't write but do ship — it needs the same update discipline as your own code, except split into lanes by risk: a security patch and a major-version upgrade are different kinds of change with different urgency, and treating them identically means either shipping security fixes too slowly or shipping breaking changes too casually.

## Phase 1 — Know what you ship (SBOM)

Before triaging any upgrade, the project needs an accurate inventory of its dependency tree, not just its direct `package.json`/`requirements.txt`/`Cargo.toml` entries — transitive dependencies carry just as much risk and are the ones people forget about.

- Generate a **Software Bill of Materials** (SBOM) in CycloneDX or SPDX format as part of the build, not as a one-off manual export — an SBOM that's stale by the next release doesn't answer "what are we actually running" when a new CVE drops.
- The SBOM is what a dependency-vulnerability scan (see `secure-coding`'s Phase 4) runs against — inventory and scanning are two steps of the same discipline, not separate concerns.

## Phase 2 — Two lanes, not one queue

Route every proposed upgrade (automated PR or manual bump) into the lane that matches its risk:

| Lane | Trigger | Review depth | Cadence |
|---|---|---|---|
| **Security fast-track** | a CVE against a version currently in use | automerge if it's a patch-level bump with a passing test suite and a short observation window; manual review only if it's also a major bump | immediate, outside the batch schedule |
| **Routine batch** | non-security patch/minor bumps | grouped, reviewed together, low ceremony | weekly or similar fixed cadence — batching avoids a constant trickle of one-line PRs eating review attention |
| **Major-version migration** | a major version bump, even with no known CVE | full review: read the changelog for breaking changes, run the full test suite, check every usage site the upgrade touches | deliberate, scheduled, never auto-merged |

A security fix that also happens to be a major bump does not get the fast-track's automerge — the urgency of the CVE doesn't remove the risk of the breaking change; it goes to manual review, expedited.

## Phase 3 — Deprecating something others depend on

The same discipline a dependency owner owes you, you owe your own consumers (internal teams, API clients, plugin authors) when removing a capability:

- Signal the deprecation before removal — for an HTTP API, the `Deprecation` and `Sunset` response headers (RFC 8594 / RFC 9745) plus a `Link` header pointing at migration docs; for a library, a deprecation warning at the call site plus a changelog entry.
- State a concrete removal date in the signal, not "in a future release" — an open-ended deprecation trains consumers to ignore the warning, since there's no deadline forcing action.
- Support the old and new path simultaneously during the window. A common baseline is **N-2**: support the current version plus the two prior ones, so a consumer has a real runway rather than a single release cycle to migrate.
- Only remove the deprecated path after the stated sunset date has passed — removing it early because "surely nobody's still on it" breaks whoever didn't get the memo in time, which is exactly the failure this phase exists to prevent.

## Phase 4 — Safe major-version migration (as the consumer)

When upgrading a dependency across a major version, in order:

1. Read the changelog for breaking changes, not just the version number's assumption of "probably fine."
2. Check the codebase for every usage site the breaking changes actually touch — a global search for the API surface that changed, not a spot check.
3. Apply the vendor's codemod/migration tool if one exists; hand-port only what it can't cover.
4. Run the full test suite (leaning on `tdd`'s suite, not just the changed area) before merging.
5. Where the ecosystem supports it, roll the upgrade out to a subset of traffic/environments first (the same progressive approach as `safe-deployment`) rather than flipping every consumer to the new major version at once.

## Done when

- [ ] The project's SBOM reflects the current dependency tree and is regenerated as part of the build.
- [ ] Every open upgrade PR is in the lane matching its actual risk, not queued generically.
- [ ] No capability was removed without a prior deprecation signal carrying a concrete removal date and a support window.
- [ ] A major-version upgrade was reviewed against its changelog and every real usage site, not merged on the strength of a passing CI run alone.
