---
name: codebase-design
description: Module design discipline from John Ousterhout's A Philosophy of Software Design — depth as the metric (a lot of functionality behind a simple interface), information hiding vs. leakage, the concrete red flags that mark a shallow module, and comparing at least two designs before committing. Use when designing a new module or class, deciding where an interface boundary (seam) should go, reviewing a design for unnecessary complexity, or asking whether something should be split or merged.
---

# Codebase Design

Complexity is the enemy, and the single lever that fights it at the module level is **depth**: a module's value is the ratio of functionality it provides to the size of the interface a caller has to learn. A deep module hides a lot behind a little; a shallow one exposes almost as much as it does. Given a choice, make the interface simpler even if that means the implementation underneath grows — the interface is what every caller pays for, forever; the implementation is paid for once, by whoever maintains it.

## Phase 1 — Depth is the metric

- A **deep module**: powerful functionality, a small number of simple things a caller needs to know to use it. A well-designed file system API, or a well-designed HTTP client with a handful of methods that hide connection pooling, retries, and serialization.
- A **shallow module**: an interface about as complicated as what it does. A class with one method that thinly wraps a single library call adds a name to learn without hiding any real complexity — the caller might as well have called the library directly.
- When deciding whether to add a class, function, or layer, ask what it hides. If the honest answer is "not much," it's shallow, and shallow modules accumulate into a system where understanding any one part requires understanding many parts at once — the opposite of what modules are for.

## Phase 2 — Information hiding, and its failure mode

- **Information hiding**: a design decision (a data format, an algorithm, an internal data structure) lives inside one module and is invisible to its callers — they depend on the module's behavior, not its internals.
- **Information leakage**: the same piece of knowledge is needed in two or more places to make a change. If changing one internal detail forces edits in a second, ostensibly unrelated module, that detail leaked across the boundary — the two modules are more coupled than their interfaces admit.
- A common leak source is **temporal decomposition**: splitting a module by the *order operations happen in* rather than by the *knowledge each part owns* (a `Parse` class, a `Validate` class, a `Save` class, each half-empty and only sensible read together in sequence) — this scatters one coherent piece of domain knowledge across several classes that all have to change together.

## Phase 3 — Concrete red flags

Name the smell rather than a vague "this feels off" (same discipline as `code-review`'s Fowler-smell naming):

- **Pass-through method** — a method that does nothing but call another method with the same arguments. It adds interface surface without adding depth; usually a sign the layering itself is unnecessary or misplaced.
- **Conjoined methods/classes** — two pieces that can't be understood independently, because a change to one routinely requires a matching change to the other. Either merge them (they're really one module pretending to be two) or find the actual missing abstraction that would let them vary independently.
- **Generic-sounding names hiding a special-purpose module** — a class called `Manager`, `Helper`, or `Processor` with no further specificity is a sign the module's actual responsibility was never named, which usually means it was never really decided either.
- **Repeated pattern with no shared home** — the same few lines copy-pasted at every call site is knowledge that should be hidden inside one deep module instead of known by every caller.

## Phase 4 — Design it twice

For a genuinely new interface or module boundary, sketch **at least two substantially different designs** before committing to one — not two trivial variations of the same idea. Comparing two real alternatives surfaces trade-offs neither would reveal alone, and the second design is often clearly better once the first exists as a point of contrast. Skipping straight to the first idea that comes to mind is how a project ends up living with the first idea's weaknesses indefinitely.

## Phase 5 — Where the seam goes

The module boundary chosen here **is** the seam `tdd` tests against — a seam placed at a genuinely deep interface stays stable as implementation changes, which is exactly what makes tests at that seam survive refactors. A seam placed at a shallow, leaky boundary forces tests (and every caller) to know internal details, and both the tests and the callers break together whenever the internals shift. If a `tdd` cycle keeps needing to update tests for reasons that aren't behavior changes, that's this phase's red flag showing up from the testing side — revisit where the seam actually sits.

## Done when

- [ ] Every new module's interface is simpler, in absolute terms, than what it hides — not proportionally simpler, actually simple enough to hold in your head.
- [ ] No single piece of domain knowledge requires touching two or more modules to change.
- [ ] None of Phase 3's red flags describe the design as shipped.
- [ ] A genuinely new module boundary was compared against at least one real alternative before being committed to.
