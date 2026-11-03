---
name: coding-guidelines
description: Use when writing/editing code.
---

# Coding guidelines

## Before writing

- Read the code the change touches; trace the real flow end to end.
- Bugs: reproduce first, fix the root cause. Grep every caller of the function you change; prefer one fix in the shared path over per-caller patches.

## Smallest solution

Stop at the first rung that works:

1. Unconfirmed need → skip it, say so.
2. Exists in codebase → reuse.
3. Stdlib.
4. Native platform feature: `<input type="date">` over a picker lib, CSS over JS, DB constraint over app code.
5. Installed dependency. Never add one for what a few lines do.
6. Minimum new code.

- Equal-size options → the one correct on edge cases.
- Deletion over addition, boring over clever, fewest files.
- Reduce states, side effects, branches, concepts, indirection.
- No unrequested abstractions: single-implementation interfaces, single-product factories, config for constants, scaffolding "for later".
- Prefer deep modules: small interface (few methods, simple params), complexity hidden inside.
- Deliberate shortcut with a known ceiling (global lock, O(n²) scan) → comment the ceiling and upgrade path.
- Never simplify away: input validation at trust boundaries, error handling that prevents data loss, security, accessibility, anything requested.
- Clean up code you touch (simpler flow, clearer names, stronger tests), adjacent to the change only. No broad rewrites.

## Naming

- Include units/representation when ambiguous: `timeoutMs`, `createdAtUtc`.
- No unexplained abbreviations, magic numbers, or type-encoded names.

## Style

- Separate distinct blocks with blank lines, e.g. between conditionals, declarations, method calls.

## Tests

- Test observable behavior, not implementation. One behavior per test.
- Cover critical paths: main behavior, error handling, conditionals.
- UI queries: user-visible text > `data-testid` > IDs > tag names.
- `waitFor()` for async assertions when supported; never for synchronous checks.
- Mock external boundaries only, not internal hooks/functions/components. Isolate mocks, storage, cookies, caches between tests.
- NEVER remove tests, weaken assertions, or reduce coverage to make checks pass.

## TypeScript

- No `any`, casts, or non-null assertions. Use `unknown`, narrowing, type guards.

## Finish

- Run tests, type-check, lint.
- Report: what changed, why, how to verify, what was skipped and when to add it. No unrequested prose.
