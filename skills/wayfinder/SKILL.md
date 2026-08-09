---
name: wayfinder
description: Plan a piece of work too large or too foggy for one sitting as a staged sequence of written decisions, resolved one at a time until the path to done is clear. Use when a loose idea needs to become a plan before implementation starts, when several open questions block each other, or when work is too big to spec in a single pass.
---

# Wayfinder

Some work isn't unclear because nobody's thought about it; it's unclear because it depends on decisions that haven't been made yet, and those decisions depend on others. This skill's defining constraint, from the RFC process IETF and Rust use for exactly this problem, is to chart large, uncertain work as a **sequence of individually-written decisions**, each one settled and recorded before the next is opened, rather than one big document trying to resolve everything at once.

Once the path is clear (no open decisions block the destination anymore), hand off to `spec-to-tickets` for execution. Wayfinder's job ends where a spec's job begins.

## Phase 1: Name the destination

Before charting anything, state what reaching the end of this effort looks like: a spec ready to hand off, a design decision locked in, or a migration completed. One or two lines, fixed before anything else, because it's what decides which open questions are actually in scope and which aren't. A destination that shifts mid-effort invalidates decisions already made against the old one; if it must shift, say so explicitly and re-check standing decisions against the new destination rather than silently continuing.

## Phase 2: Chart the open decisions

Fan out breadth-first across the whole space (every open question standing between here and the destination) rather than diving deep on the first one found. For each:

- State the decision precisely enough that "resolved" and "not yet resolved" are unambiguous.
- Note what it blocks and what blocks it. A decision that depends on another isn't ready to open yet.
- If a genuine open area exists but can't be phrased as a precise question yet, leave it as **unspecified** rather than forcing it into a premature decision; a vague decision produces a vague, unusable answer.

If this pass surfaces no real open questions (the path to the destination is already obvious), stop here. The work doesn't need staging; it needs a spec.

## Phase 3: Resolve one decision at a time

Work the open decisions in dependency order, one at a time, resolving several in parallel is how a later decision gets invalidated by an earlier one still in flux. For each:

1. **Write the proposal**: the decision being made, the options actually considered, and the tradeoffs between them. A proposal with one option isn't a decision, it's an announcement; note honestly if that's genuinely the case.
2. **Hold it open long enough to be questioned**: for a decision more than one person has a stake in, this is a real review window (the RFC process's Final Comment Period exists precisely so silence isn't mistaken for agreement); for a solo effort, it's still worth sitting with before locking it in rather than resolving and moving on in the same breath.
3. **Record the resolution**: the decision made, and the reasoning, not just the outcome. A future reader (including a later session of this same effort) needs the "why," not just the "what."

A decision that turns out to invalidate an earlier one isn't a failure of the process; reopen the earlier decision, note why, and record the supersession rather than quietly overwriting it.

Write proposals and resolutions without em dashes, using a comma, colon, period, or a reworded sentence instead.

## Phase 4: Track state honestly

Keep three categories visibly distinct as the effort progresses:

- **Decided**: resolved, with its reasoning recorded.
- **Open**: a precise question, not yet resolved, with its blocking edges stated.
- **Unspecified**: a real area of uncertainty that can't be phrased precisely yet; graduates to Open once it can be.

Work beyond the destination is neither Open nor Unspecified; it's **out of scope**, ruled out explicitly rather than left to be silently ignored or accidentally resolved.

## Phase 5: Hand off

Stop staging once every decision that blocks the destination is Decided. At that point:

- A decision with lasting consequences for the codebase's shape is worth capturing as an ADR per `domain-modeling`, so it isn't silently re-litigated later.
- The cleared path is ready for `spec-to-tickets` to turn into a spec and sliced tickets; wayfinder charted the way, it doesn't execute it.

## Done when

- [ ] The destination is stated before any decision is charted, and re-checked against if it ever shifts.
- [ ] Open decisions are charted breadth-first, each precise enough to know when it's resolved.
- [ ] Decisions are resolved one at a time, in dependency order, each with its reasoning recorded, not just its outcome.
- [ ] Decided, Open, Unspecified, and Out-of-scope are kept visibly distinct throughout.
- [ ] The effort stops staging once the destination is unblocked, and hands off to `spec-to-tickets` rather than continuing into execution.
