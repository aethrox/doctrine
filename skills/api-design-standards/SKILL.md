---
name: api-design-standards
description: API design discipline grounded in the Microsoft/Google REST guidelines, resource and URL conventions, a chosen versioning strategy, what counts as a backward-compatible vs breaking change, and consumer-driven contract testing. Use when designing a new API endpoint, changing an existing API's request/response shape, deciding how to version an API, or asking whether a change to a public interface is breaking.
---

# API Design Standards

An API is a promise to callers you don't control and usually can't see. Adding to that promise is free; changing or removing part of it breaks someone who already depended on it. Every API change is classified against that promise (additive or breaking) before it ships, not discovered after a caller files a bug.

## Phase 1: Resource and URL conventions

- URLs name **resources** (nouns), never actions (verbs): `POST /orders`, not `POST /createOrder`. The HTTP method carries the verb.
- Collections are plural (`/orders`), a specific member is the collection plus an identifier (`/orders/{id}`), and nesting reflects real ownership (`/orders/{id}/items`), not an arbitrary path someone found convenient.
- HTTP methods map to a fixed meaning, and only that meaning: `GET` (read, no side effects, safe to retry and cache), `POST` (create, or a non-idempotent action), `PUT` (full replace, idempotent, calling it twice with the same body leaves the same state), `PATCH` (partial update), `DELETE` (remove, idempotent).
- Status codes communicate outcome precisely: `2xx` success (`201` for created with a `Location` header, `204` for success with no body), `4xx` the caller's fault (`400` malformed request, `401` unauthenticated, `403` authenticated but not authorized, `404` not found, `409` conflict, `422` semantically invalid), `5xx` the server's fault. Returning `200` with an error payload embedded in the body hides the failure from every generic HTTP-aware tool (retries, caches, monitoring).

## Phase 2: Versioning strategy

Pick one signal and use it consistently across the whole API; mixing strategies forces every client to handle more than one:

| Strategy | How | Tradeoff |
|---|---|---|
| **URI path** (`/v2/orders`) | version segment in the path | most discoverable and cacheable, but encourages whole-API version bumps for a change that only touched one resource |
| **Header / content negotiation** (`Accept: application/vnd.api+json;version=2`) | version encoded in a request header | most correct REST semantics (a version is a different representation of the same resource, not a different resource) but far less discoverable: undebuggable by just reading a URL |
| **Query parameter** (`?version=2`) | version as a query param | simplest to add after the fact, easiest to accidentally omit and silently get a default |

Version the API only when a breaking change (Phase 3) actually requires it. A version bump for a purely additive change forces every existing client to migrate for no reason; that cost is the same mistake a hand-picked SemVer bump is, applied to an API instead of a package.

## Phase 3: What's backward-compatible vs breaking

| Change | Compatible? |
|---|---|
| Adding a new optional request field | Compatible: old clients that don't send it are unaffected |
| Adding a new field to a response | Compatible **if** clients are expected to ignore unknown fields: state this expectation explicitly in the API's docs, since some client generators fail closed on unknown fields |
| Adding a new endpoint | Compatible |
| Removing or renaming a field, endpoint, or enum value | Breaking |
| Changing a field's type or meaning (a string that used to be an ID now being a display name) | Breaking |
| Making a previously-optional field required | Breaking |
| Changing default behavior for an omitted parameter | Breaking |
| Tightening validation on an existing field (was permissive, now rejects previously-valid values) | Breaking |

When a breaking change is unavoidable (security fix, correcting a genuinely wrong design): communicate it ahead of the change, support the old and new shape in parallel for a stated deprecation window (see `dependency-upgrade-management` for the deprecation-signal mechanics), and only remove the old shape after that window closes.

## Phase 4: Contract testing

- An OpenAPI (or equivalent) schema is the API's published, machine-readable shape; validate requests and responses against it in CI so a gross schema violation is caught before it reaches a client.
- For APIs consumed by services you also control (internal microservices), add **consumer-driven contract testing**: the consumer writes a test capturing exactly what it expects from the provider, the provider verifies against that captured contract in its own CI. This catches a breaking change (a renamed field, a removed endpoint) at the point the provider would have shipped it, not after deploy, in the consumer's production logs.
- Run the schema validation and the contract verification as CI gates, not manual pre-release checklist items; a check that depends on someone remembering to run it will eventually not run.

## Done when

- [ ] Every endpoint uses resource-noun URLs and the HTTP method matching its actual semantics.
- [ ] The API uses one versioning signal consistently, and a version bump happened only because Phase 3 classified the change as breaking.
- [ ] Every changed field, endpoint, or default was checked against the Phase 3 table before shipping.
- [ ] Any unavoidable breaking change has a stated deprecation window with the old and new shape both live during it.
- [ ] Schema validation and (for internally-consumed APIs) contract tests run as CI gates.
