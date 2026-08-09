---
name: secure-coding
description: Secure-coding discipline mapped to the OWASP Top 10, checked at the point of writing code, not after. Covers input validation and injection classes, broken access control, secrets handling, dependency/supply-chain risk, and safe error handling/logging. Use when writing code that crosses a trust boundary (handles user input, auth, payments, file paths, external commands, or third-party dependencies), when reviewing a diff for security issues, or when the user asks for a security review, threat check, or "is this safe."
---

# Secure Coding

Security is checked **at the point of writing the code**, not bolted on after. Every trust boundary gets its input validated, every secret goes through the environment or a vault and never a literal in source, and every new dependency gets a known-vulnerability check before it merges. Retrofit security review finds problems too late to fix cheaply; this skill runs while the code is still being written.

A **trust boundary** is any point where data crosses from a less-trusted source into more-trusted code: a request body, a query parameter, a file upload, an environment variable set by a deploy pipeline, a response from a third-party API, a value read from a database another service writes to.

## Phase 1: Input validation and injection classes

At every trust boundary, validate before use: allowlist the shape you expect rather than denylisting what you don't:

| Injection class | Root cause | Fix |
|---|---|---|
| SQL / NoSQL injection | user input concatenated into a query | parameterised queries / prepared statements: never string-built queries |
| Command injection | user input passed to a shell | avoid shelling out to build a command from input; if unavoidable, use an argument-array API, never string interpolation into a shell string |
| Path traversal | user input used to build a filesystem path | resolve the path, then verify it is still inside the allowed root directory before any read/write |
| XSS | user input rendered into HTML/JS context unescaped | context-aware output encoding (the framework's templating auto-escape, not manual string concatenation) |
| Deserialization | untrusted bytes deserialized into objects/classes | use a data-only format (JSON with a schema) instead of a format that can instantiate arbitrary types (e.g. pickle, native object serialization) |
| SSRF | server fetches a URL supplied by the user | allowlist destination hosts/IP ranges; block requests to internal/link-local addresses |

Validate type, length, format, and range; reject early, fail closed (deny by default on anything unexpected, don't try to "sanitize and continue").

## Phase 2: Access control

Broken access control is the single most common real-world vulnerability class. For every endpoint or function reachable with a user-supplied identifier (an object ID, a filename, a user ID in a URL):

- Check that the **authenticated caller** is authorized for **this specific resource**, not just that they are logged in; the classic bug is checking authentication and skipping the per-object authorization check (IDOR: swap the ID in the URL, get someone else's data).
- Default deny: a new route or field is inaccessible until explicitly granted, never accessible until explicitly restricted.
- Re-check authorization server-side even when the client also enforces it; a client-side check is UX, not security.

## Phase 3: Secrets

- No credential, API key, or token is ever a literal in source, a config file committed to the repo, or a client-side bundle. It comes from an environment variable, a secret manager, or a vault at runtime.
- Grep for accidental commits before pushing (`git diff --staged` review, or a pre-commit secret scanner); a secret that reaches a shared branch must be treated as compromised and rotated, not just deleted from history.
- Secrets never appear in logs, error messages, or stack traces. When building a debugging or diagnostic loop, redact first (see the pattern in `diagnosing-bugs`).

## Phase 4: Dependencies and supply chain

- Before adding a new dependency: check it's actively maintained, has no known critical CVEs (run the ecosystem's audit tool; `npm audit`, `pip-audit`, `cargo audit`, or equivalent SCA scan), and pull only what's needed rather than a heavyweight package for a few lines of logic.
- Pin versions (lockfile committed) so a build is reproducible and a compromised upstream publish doesn't silently flow in.
- Re-run the dependency audit as part of CI, not just at install time; new CVEs get disclosed against dependencies already in the lockfile.

## Phase 5: Error handling and logging

- Error messages returned to a caller describe what went wrong in terms safe to expose (`"invalid credentials"`), never a stack trace, internal path, or query fragment reaching the client in production.
- Fail closed: an error in an authorization check or a security-relevant operation denies the action, it does not fall through to allow.
- Log enough to investigate an incident (who, what, when) without logging the secret or full payload that triggered it.

## Done when

- [ ] Every trust boundary in the diff has its input validated against the matching injection class above.
- [ ] Every resource access re-checks authorization for the specific object, not just authentication.
- [ ] No secret is a literal anywhere in the diff, including test fixtures and comments.
- [ ] Any new dependency has been audited for known CVEs and is pinned.
- [ ] No error path leaks internals to the caller, and no log line carries a secret.
