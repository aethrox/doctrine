---
name: research
description: Investigate a technical question against primary sources and capture the findings, with citations, as a file in the repo. Use when the user wants a topic researched, docs or API facts gathered, a claim verified before it's relied on, or reading legwork delegated to a background agent.
---

# Research

A claim is only as good as the source it traces back to. This skill's defining constraint: every finding in the output must be traceable to the primary source that actually owns the fact (official docs, source code, a spec, a first-party API response), not to a blog post, forum answer, or summary that itself read the primary source once. If tracing stops at a secondary source, that's stated as a limitation, not hidden.

## Phase 1: Scope the question

State the specific question or claim being investigated, narrowly enough that "found" and "not found" are both clear outcomes. A vague scope ("research React") produces an unfalsifiable report; a narrow one ("does React's `useEffect` cleanup run before or after the next effect's setup, per the official docs") produces a checkable answer. If the request bundles several questions, split it, mixing them is how one weak answer contaminates the credibility of the rest.

## Phase 2: Trace every claim to its primary source

For each sub-question:

1. **Go to the source that owns the fact.** Official documentation, the actual source code, a published spec or RFC, a first-party API response, not a secondary write-up of any of these.
2. **If only a secondary source turns up, follow its own citation back.** A blog post that says "per the docs, X" is a pointer, not the finding; open what it points to and verify the docs actually say X before citing the docs, not the post.
3. **If tracing dead-ends at a secondary source** (the primary source is gone, paywalled, or the secondary source cites nothing verifiable), say so explicitly in the finding rather than presenting a secondary source as if it were primary.
4. **Note the primary source's own date or version.** A fact that was true in an old version of a doc or API may not be true now; carry the version/date forward into the finding, not just the claim.

## Phase 3: Weigh source credibility

Where more than one primary-adjacent source disagrees, or where authority isn't obvious, check the source against the CRAAP criteria (Currency, Relevance, Authority, Accuracy, Purpose; the standard library-science checklist for source evaluation):

| Criterion | Question |
|---|---|
| **Currency** | Is this the current version, or superseded by a newer release/spec? |
| **Relevance** | Does it actually answer the scoped question, or just something adjacent? |
| **Authority** | Is the author/publisher the party that actually owns this fact (the framework's own maintainers, the spec body) or a third party writing about it? |
| **Accuracy** | Can the claim be cross-checked against another independent primary source, or the actual behavior (running the code, reading the actual response)? |
| **Purpose** | Is the source explaining the fact, or selling/promoting something that gives it a reason to shade the answer? |

A source that fails Authority or Purpose isn't disqualified outright, but the finding should say so; "per a third-party benchmark, not the vendor's own numbers" is a materially different claim than "per the vendor's published spec."

## Phase 4: Write the findings, cited

Capture the investigation as a single Markdown file:

- Each finding states the claim, then the source it traces to (link or exact reference; file path, doc URL, spec section), and the source's date/version where that matters.
- Conflicting sources are surfaced side by side, not silently resolved by picking one; the reader deciding what to do with the conflict is a different judgment call than the researcher's.
- Anything that couldn't be traced past a secondary source is marked as such, not smoothed over.
- Save it where the repo already keeps this kind of note; if there's no existing convention, pick a sensible location and say where, so the next research pass doesn't have to rediscover it.

Delegate the legwork to a background agent when the investigation is multi-step or time-consuming, so the primary conversation isn't blocked on reading, but the citation discipline in Phases 2–4 applies regardless of who does the reading.

## Done when

- [ ] The question is scoped narrowly enough to have a checkable answer.
- [ ] Every finding traces to a primary source, or explicitly states that it doesn't.
- [ ] Disputed or authority-weak sources are flagged per the CRAAP criteria rather than presented as settled.
- [ ] The output is a single cited file, saved where the repo's existing convention expects it (or a stated new location).
