---
name: observability
description: Discipline for making a service's health answerable without reading its code — structured logging, the four golden signals (latency, errors, traffic, saturation), and an SLI/SLO/error-budget definition with alerts that link a runbook. Use when adding logging to a service, instrumenting metrics or tracing, defining what "healthy" means for a service, setting up alerts, or when the user asks how to monitor, debug in production, or know if something is broken.
---

# Observability

A service is not done until someone who has never read its code can answer "is it healthy right now" from its telemetry alone. That means structured logs that a platform can index and correlate, the four golden signals tracked per service, and an explicit SLO with an error budget — not "we'll notice if it breaks."

## Phase 1 — Structured logging

- Every log line is a structured record (JSON or the platform's structured format), not a hand-built string — fields are queryable and indexable; a concatenated string is only greppable.
- Every log line inside a request/job carries a **correlation ID** (trace ID / request ID) so a slow request, its trace, and its log lines can be joined without copy-pasting timestamps.
- Log levels mean something consistent across the codebase: `error` = needs human attention, `warn` = degraded but self-recovering, `info` = significant state change (request completed, job started), `debug` = development-time detail, off by default in production.
- Never log a secret, full payload, or PII field directly — log its presence or a redacted/hashed form (same redaction discipline as `diagnosing-bugs` and `secure-coding`).
- Log the **outcome**, not just the attempt: "started X" without a matching "X succeeded / X failed (reason)" leaves a gap no dashboard can fill in later.

## Phase 2 — The four golden signals

Every service exposes these four, regardless of what else it tracks:

| Signal | What it measures | Typical source |
|---|---|---|
| **Latency** | time to serve a request — track success and failure latency **separately**, a fast failure skews the average down and hides a real slowdown | request duration histogram |
| **Errors** | rate of failed requests (5xx, exceptions, failed jobs) | error counter / request outcome |
| **Traffic** | demand on the system (requests/sec, queue depth, jobs/min) | request or throughput counter |
| **Saturation** | how full the constrained resource is (CPU, memory, connection pool, queue length) | resource utilization gauge |

For an API or service boundary specifically, the same four collapse into the **RED method** — Rate, Errors, Duration — as the minimum viable dashboard for that endpoint.

## Phase 3 — SLI, SLO, error budget

- **SLI** (Service Level Indicator): the specific, measurable signal — "proportion of requests completed in under 300ms", "proportion of requests returning non-5xx." Pick SLIs from Phase 2's signals; don't invent a new metric nobody dashboards.
- **SLO** (Service Level Objective): a target on that SLI over a window — "99.9% of requests succeed, measured over 30 days." The number is a product/business decision (how much unreliability users tolerate), not a technical maximum.
- **Error budget**: `1 − SLO` over the window. It is spent by every failure, deploy-caused or not. A team with budget left ships faster; a team that has burned its budget freezes risky changes until it recovers. This is what turns "reliability" from a vague goal into a concrete, checkable number that also unblocks shipping speed when things are healthy.
- If a service cannot state its SLI and SLO in one sentence, it is not ready to call itself monitored — "we have dashboards" is not the same as "we know what healthy means."

## Phase 4 — Alerting and runbooks

- Alert on **symptom**, not cause: alert when the SLO is at risk (error budget burn rate, latency SLI breach) rather than on every underlying anomaly — cause-based alerts multiply noise and train people to ignore pages.
- Every alert that can page a human links a **runbook**: what this alert means, what to check first, what mitigates it, when to escalate. An alert with no runbook is a 3am guessing game.
- Tune alert thresholds against the error budget's burn rate, not a fixed absolute number picked once and forgotten — a slow burn over days and a fast burn over minutes are different incidents needing different urgency.

## Done when

- [ ] Logs are structured, correlated by request/trace ID, and carry no secret or raw PII.
- [ ] The service exposes latency (success/failure split), errors, traffic, and saturation.
- [ ] The service has a stated SLI and SLO, and the error budget is a number someone could quote.
- [ ] Every human-paging alert links a runbook, and thresholds are tied to error-budget burn rate, not an arbitrary constant.
