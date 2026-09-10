---
name: capacity-estimation
description: Turn a vague performance requirement into arithmetic before the architecture is chosen, size concurrency with Little's Law, and label every input as measured, derived, or assumed. Use when a design calls itself "scalable" or "fast" without a number, when choosing between one machine and a distributed system, when sizing a thread pool, connection pool, queue, or instance count, or when someone asks how much traffic, storage, or bandwidth a system will need.
---

# Capacity Estimation

A design chosen before anyone did the arithmetic was chosen on taste. This skill's defining constraint, from Little's Law (J.D.C. Little, "A Proof for the Queuing Formula: L = λW", *Operations Research* 9(3), 1961, pp. 383-387): the average number of requests in a system equals the arrival rate multiplied by the time each request spends there, and that relationship holds without assuming anything about queue discipline or service-time distribution. Required concurrency is therefore not a matter of opinion, it is a multiplication, and a system whose load has never been multiplied out cannot honestly claim it needs to be distributed.

This is a before-the-system-exists job, distinct from the doctrine skills it would otherwise overlap:

- `observability` measures a system that is already running: golden signals, SLI, SLO, error budget. This skill produces the target numbers that a later SLO gets set against. If the service is live and the question is "how is it doing," that is `observability`, not this.
- `grilling` owns the interview mechanics. This skill states which numbers it needs; when a number requires the user's judgment or authority, it is gathered through `grilling`'s frontier rounds rather than a separate interview method.
- `codebase-design` compares at least two designs. This skill supplies the load figure that decides between them; it does not choose the module boundary.
- `project-groundwork` checks an existing draft against ISO 29148, including whether a requirement is verifiable at all. This skill supplies the number that makes a performance requirement verifiable; it does not audit the document.
- `safe-deployment` and `incident-response` own what happens when capacity is exceeded in production. This skill exists so that outcome is a known risk rather than a surprise.

## Phase 1: Restate the requirement as a number, a unit, and a percentile

"Fast", "scalable", and "high traffic" are not requirements, they are placeholders where a requirement should be. ISO/IEC 25010:2023 splits Performance Efficiency into **time behaviour**, **resource utilization**, and **capacity**; each one is answered with a figure or it is not answered.

Rewrite each claim into this shape: a metric, a threshold, a unit, and the load it holds at. "p99 request latency under 300 ms at 2,000 requests per second" is a requirement. "Low latency" is not.

State latency as a **percentile, never a mean**: a mean is one number that a small fraction of very slow requests barely moves, so it can sit flat while the slowest requests get much worse. Then check the measurement rig separately. Gil Tene's "How NOT to Measure Latency" (QCon San Francisco, 2015) names **coordinated omission**: a load generator that waits for a response before sending the next request never sends the requests it would have sent during a slow period, so those slow observations are missing from the sample entirely. In Tene's words, "when omission is coordinated with observed events, it can dramatically skew the statistical analysis of the remaining results." Coordinated omission damages the high percentiles as well as the mean, so a percentile taken from a rig that has it is not trustworthy either.

If a number cannot be answered from the codebase, an existing dashboard, or a published document, it belongs in a `grilling` round. Do not invent it to keep the estimate moving.

## Phase 2: Label every input as measured, derived, or assumed

An estimate is only as re-checkable as its inputs, and an input whose origin was never written down cannot be revisited when the estimate turns out wrong. Tag each one:

- **Measured**: taken from a real system, with the source named (which dashboard, which query, which date).
- **Derived**: computed from other inputs, with the arithmetic shown, not just the result.
- **Assumed**: nobody knows yet. Write the assumption, the date, and who could confirm it.

Treat the widely quoted planning ratios as assumptions, not facts. Peak-to-average traffic multipliers and read-to-write splits circulate as though they were standards, but no primary source is cited for them; they are folklore repeated between system-design guides. Use your own system's measured ratio where one exists, and where none exists, write the number down as an explicitly labeled assumption rather than borrowing a figure whose origin nobody can name. An assumption that is labeled can be corrected later; one that is laundered into the estimate as a fact cannot.

## Phase 3: Do the arithmetic in units that do not lie

Work in one direction: demand, then rate, then per-request cost, then totals.

1. **Demand**: the population and how often each member acts.
2. **Rate**: convert to requests per second. Note whether the figure is average or peak, and never compare one to the other.
3. **Per-request cost**: bytes stored, bytes transferred, and service time for one request.
4. **Totals**: storage per day and per year, bandwidth, and the concurrency figure Phase 4 needs.

Label byte units per IEC 80000-13: `KiB`, `MiB`, `GiB` are powers of 1,024, while `kB`, `MB`, `GB` are powers of 1,000. Pick one convention per document and say which; a storage estimate that silently mixes them is wrong by roughly 7% at the gigabyte scale and more above it.

Round hard. The output of this phase is an order of magnitude, not a figure with four significant digits; carrying precision that the inputs never had disguises an assumption as a measurement. When a per-operation constant is needed and none has been measured, Jeff Dean's "Numbers Everyone Should Know" (2009) remains the standard reference table for relative costs, with the caveat that its 10 ms disk seek is a spinning-disk figure and does not describe SSD or NVMe storage. Prefer a number measured on the actual target hardware over any published table.

## Phase 4: Size concurrency with Little's Law, then leave headroom

Apply `L = λW` directly to size a pool: **required concurrency = arrival rate × average service time**. A service taking 200 ms per request at 500 requests per second needs 100 requests in flight, so a pool of 100 is the arithmetic floor, not the answer. `L = λW` is a long-run average over a stationary period, so feed it the rate for the period being sized: a pool sized from a daily average will be undersized at every peak.

It is not the answer because a system run at its arithmetic floor has no headroom, and queueing systems do not degrade linearly. For an M/M/1 queue, mean response time is `1 / (μ(1 − ρ))`, where `μ` is the service rate (requests one server completes per second) and `ρ` is utilization: at 50% utilization response time is twice the unloaded service time, at 90% it is ten times, and as utilization approaches 1 it grows without bound. This is why "the CPU still has 10% left" is not a healthy reading.

Two consequences follow:

- **Provision above the floor, and say by how much.** Google's SRE book works the pattern explicitly under "Addressing Cascading Failures": with a measured per-cluster breaking point of 5,000 QPS and a peak of 19,000 QPS, four clusters serve the load and an N+2 posture provisions six. State the redundancy posture as a decision, since no single universal utilization target follows from the arithmetic; the right headroom depends on the measured breaking point and the failure tolerance.
- **Do not assume linear scaling across nodes.** Neil Gunther's Universal Scalability Law, `C(N) = N / (1 + α(N − 1) + βN(N − 1))`, adds a contention term `α` and a coherency-delay term `β` to Amdahl's Law. Because the `β` term grows with the square of `N` in the denominator, throughput peaks at a finite node count and falls off beyond it. If an estimate claims that doubling the nodes doubles the throughput, that claim needs a reason.

## Phase 5: State what the number decided, and record it

The deliverable is a decision, not a spreadsheet. Close with the sentence the arithmetic supports:

- If the load fits comfortably on one machine, say so plainly. From here on the distributed design is the option carrying the burden of justification, not the default.
- If it does not fit, name the specific resource that runs out first (CPU, memory, connection pool, disk throughput, network) and at what load, since that is what the architecture has to answer for.
- If the inputs were too uncertain to decide, say that instead of picking the answer that was already preferred. An estimate that could not distinguish between two designs is a real result and belongs in the record.

Record the outcome as an ADR per `domain-modeling`, with the inputs and their measured/derived/assumed labels in the Context section, so the decision can be re-litigated against the numbers rather than from memory. Re-run the estimate when an input moves by an order of magnitude or when the measured breaking point contradicts it, not on every release. Write the estimate and the ADR without em dashes, using a comma, colon, period, or a reworded sentence instead.

## Done when

- [ ] Every performance claim is stated as a metric, threshold, unit, and the load it holds at, with latency given as a percentile rather than a mean.
- [ ] Every input is labeled measured, derived, or assumed, and no planning ratio was borrowed as fact without a named source.
- [ ] The arithmetic runs demand to rate to per-request cost to totals, with one declared byte-unit convention and results rounded to an order of magnitude.
- [ ] Required concurrency was computed as arrival rate times service time, and the provisioned figure sits above it with the redundancy posture stated as a decision.
- [ ] Any claim that throughput scales linearly with nodes is justified rather than assumed.
- [ ] The estimate ends in a stated decision, recorded as an ADR with its inputs, including the honest verdict when the numbers could not decide.
