---
name: safe-deployment
description: Discipline for shipping changes reversibly — decouple deploy (code reaches production) from release (users see it) with feature flags, roll out progressively, and define the automated rollback trigger before shipping, not during the incident. Use when the user asks how to deploy a risky change, choose between canary/blue-green/rolling deployment, ship behind a feature flag, plan a rollback strategy, or asks "how do we ship this safely."
---

# Safe Deployment

Every deploy is reversible **before** it becomes visible. That means treating "code reaches production" and "users see the new behaviour" as two separate, independently controllable events, rolling exposure out in steps instead of all at once, and deciding what "unhealthy, roll back" means while writing the deploy plan — not while paged at 3am reading dashboards for the first time.

## Phase 1 — Decouple deploy from release

Before choosing a rollout strategy, decide whether this change needs a **feature flag**:

- If the change is risky, user-visible, or its blast radius is unclear — put it behind a flag. The code ships to production dark (compiled in, disabled), and "release" becomes flipping a config value, not another deploy.
- A flagged change can be enabled for an internal allowlist first, then a percentage of traffic, then everyone — all without a redeploy, and all instantly reversible by flipping the flag back off.
- Flags accumulate cost (branches to test, config to reason about) — remove a flag once the change has fully rolled out and stabilized; a flag left in forever is dead code with a stated deadline that got ignored.

## Phase 2 — Choose the rollout strategy

| Strategy | How it works | Reach for it when |
|---|---|---|
| **Rolling** | replace instances a few at a time, old and new versions serve traffic simultaneously during the rollout | default for stateless services with no schema change; simplest, no extra infrastructure |
| **Canary** | route a small percentage (often 1–5%) of real traffic to the new version, watch its signals, then widen | the change is risky enough to want real-traffic validation before full exposure, and the service has per-version metrics to compare |
| **Blue-green** | two full identical environments, traffic cut over from old to new all at once, old kept warm for instant rollback | the change can't safely run two versions concurrently (e.g. a coordinated multi-service release), and instant full rollback matters more than gradual exposure |

Whichever strategy is chosen, a database migration under it follows the **expand–contract pattern**: add the new column/table (expand) → deploy code that writes both old and new, reads new with fallback → backfill → deploy code that only uses new → drop the old column (contract). Never ship a schema change and the code that depends on it in the same atomic step — the two must be independently rollback-safe, since a version rollback happens after the migration has already run.

## Phase 3 — Define the rollback trigger before deploying

Write down, before the deploy starts, not during an incident:

- **The specific signals that trigger a rollback** — reuse the golden signals from `observability` (error rate above X%, latency p99 above Y, saturation above Z) rather than "if it looks bad." A vague trigger gets argued about mid-incident instead of executed.
- **Who or what executes it.** Prefer an automated rollback (the deploy pipeline watches the signal and reverts on breach) over a manual one — automated analysis catches problems in minutes; a human noticing and deciding takes longer, exactly when speed matters most.
- **That rollback is actually fast.** A rollback strategy that takes as long as forward-fixing isn't a safety net — verify the previous version can be restored (traffic cut back, flag flipped off) in the time budget the trigger implies, before relying on it.

## Phase 4 — Execute and verify

1. Ship the change per the chosen strategy, starting at the smallest exposure step.
2. Watch the defined signals at each step before widening exposure — do not advance to the next step on a timer alone if the signals haven't confirmed health.
3. If a rollback trigger fires, execute the rollback path exactly as defined in Phase 3 — this is not the moment to improvise a different fix.
4. After full rollout (or after a rollback), record what the signals showed, so the next deploy's trigger thresholds are informed by real data instead of a first guess.

## Done when

- [ ] The change is behind a feature flag if its risk or blast radius warranted one.
- [ ] A rollout strategy was chosen against the table above, not defaulted to "however we did it last time."
- [ ] Any schema change follows expand–contract and is independently rollback-safe from the code change.
- [ ] The rollback trigger — specific signal, specific threshold, who/what executes it — was written down before the deploy started.
- [ ] Exposure widened in steps, gated on the defined signals at each step.
