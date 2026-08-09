---
name: project-groundwork
description: Check an existing draft specification or README against a fixed set of quality characteristics, batch only the genuinely blocking gaps into one round of questions, and write each resolved decision into the source document plus the repository's existing decision-recording artifact when one exists. Use when a draft spec or architecture doc has sections that disagree with each other, still carries TBDs, or needs its open points settled before implementation starts.
---

# Project Groundwork

A draft document is not settled just because it exists; internal contradictions and unresolved TBDs hide in it until implementation runs into them. This skill's defining constraint, from ISO/IEC/IEEE 29148's requirements quality characteristics: a specification is checked against a fixed, named set of properties rather than a vague sense of whether it "looks done." The standard distinguishes properties of one requirement (unambiguous, verifiable) from properties of the document as a whole (complete, consistent); both are checked here.

This is a narrow, existing-document job, distinct from three doctrine skills it would otherwise overlap:

- `wayfinder` charts open decisions when no document exists yet, or the whole effort is too large to spec in one pass. This skill starts from a draft that already exists.
- `grilling` is the general-purpose interview technique for closing any known-versus-needed gap. This skill uses `grilling`'s batching discipline for the specific gaps this skill's own scan surfaces; it does not redefine the interview mechanics.
- `domain-modeling` owns the glossary and ADR format that decisions get recorded into over time. This skill's distinct output is writing the resolved decision into the source document itself, in the same step, not only into an ADR.

## Phase 1: Scan against the quality characteristics

Read the draft and check it against each of these, noting concrete violations, not general unease:

- **Unambiguous**: does any section allow more than one reasonable interpretation?
- **Consistent**: do any two sections state something that cannot both be true?
- **Complete**: is there a TBD, a placeholder, or a decision the document assumes was made elsewhere but never states?
- **Verifiable**: is there a claim or requirement with no way to confirm it was met?

List each violation with its location, not a summary judgment that the document "needs work."

## Phase 2: Separate blocking gaps from ones that can wait

Not every violation found in Phase 1 blocks implementation from starting. A genuinely blocking gap is one where guessing wrong would cost real rework; a non-blocking one can be left as a stated open question and revisited later. Sort the list before asking anything, since a batch of ten questions when only three are load-bearing wastes the reader's attention on the other seven.

## Phase 3: Batch the blocking gaps into one round

Run `grilling`'s frontier-round technique on the blocking gaps only: ask them together, with a recommended answer where one exists, rather than trickling questions out one at a time or holding the whole document hostage to a single unresolved point.

## Phase 4: Write the answer into the document and existing decision record

As each blocking gap resolves, edit the source document directly so the contradiction or TBD is actually gone, not just answered in conversation. If the repository already has a convention for recording decisions, such as `domain-modeling`'s `CONTEXT.md`, an ADR directory, or another discovered artifact, record the decision there in the same pass. If no such convention exists, say so and update only the source document; do not invent a new memory file as a fallback. A decision that only lives in the conversation is lost the moment the session ends; a decision that only lives in a separate record leaves the document still internally inconsistent for the next reader. Write both artifacts without em dashes, using a comma, colon, period, or a reworded sentence instead.

## Phase 5: Confirm the document now reads as settled

Re-check the document against the four characteristics from Phase 1 after the edits land. A document is done here when a cold reader could implement from it without needing to ask the questions this pass already answered, not when every conceivable question has been asked.

## Done when

- [ ] The draft was checked against unambiguous, consistent, complete, and verifiable, with concrete violations listed by location.
- [ ] Violations were sorted into blocking and non-blocking before any question was asked.
- [ ] Only the blocking gaps were batched into one round, using `grilling`'s frontier technique rather than a separate interview method.
- [ ] Each resolved answer was written into the source document and, when one already existed, the repository's decision-recording artifact in the same step; if none existed, that absence was stated and no new memory file was invented.
- [ ] The document was re-checked against the four characteristics after edits, and reads as settled for a cold reader.
