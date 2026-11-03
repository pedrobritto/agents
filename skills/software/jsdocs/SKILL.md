---
name: jsdocs
description: Use when writing JSDoc comments.
---

# JSDocs

- Document functions, classes, interfaces (and properties), and types only when it adds what the code doesn't show: purpose, non-obvious behavior, quirks, invariants.
- Variables: only when no good name is possible.
- No implementation details that go stale.
- Prefer one line. Use `@param`/`@returns` only when they add info beyond name and type; other tags only if required. React components: no tags.

```ts
/** Retries with exponential backoff; throws after `maxAttempts`. */
function fetchWithRetry(url: string, maxAttempts: number) {}

/**
 * Splits an amount into installments; remainder cents go to the first.
 *
 * @param totalCents Non-negative integer.
 */
function splitAmount(totalCents: number, count: number): number[] {}
```
