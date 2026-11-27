---
name: coding-guidelines
description: Use when writing/editing code.
---

# Coding guidelines

## Before writing

- Read the affected code, trace the flow end to end, and search for every caller of functions you change.
- For bugs: reproduce → add a regression test → fix the root cause. Prefer one shared fix over per-caller patches.

## Smallest solution

Skip unconfirmed needs and say so. Otherwise, stop at the first option that works:

1. Reuse existing code.
2. Use the language's standard library.
3. Use a native feature: date input over a picker library, CSS over JS, DB constraint over app code.
4. Use an installed dependency. Never add one for what a few lines do.
5. Write the minimum new code.

- Among equal-size options, choose the one that handles edge cases correctly. Prefer deletion, boring code, and fewer files.
- Avoid unnecessary states, side effects, branches, concepts, and indirection. No unrequested abstractions: single-implementation interfaces, single-product factories, config for constants, or future scaffolding.
- Prefer deep modules: few methods, simple parameters, hidden complexity. Comment known limits of deliberate shortcuts and how to upgrade them.
- Preserve trust-boundary validation, error handling that prevents data loss, security, accessibility, and everything requested.
- Clean up only adjacent code you touch: simplify flow, clarify names, strengthen tests. No broad rewrites.

## Naming and style

- Include units or representation when ambiguous (`timeoutMs`, `createdAtUtc`). No unexplained abbreviations, magic numbers, or type-encoded names.
- Separate distinct blocks with blank lines (e.g., conditionals, declarations, method calls).

## Tests

- Test observable behavior, not implementation. One behavior per test. Cover critical paths: main behavior, error handling, and conditionals.
- UI queries: user-visible text > `data-testid` > IDs > tag names. Use `waitFor()` for async assertions when supported, never for synchronous checks.
- Mock external boundaries only, not internal hooks, functions, or components. Isolate mocks, storage, cookies, and caches between tests.
- Never remove tests, weaken assertions, or reduce coverage to make checks pass.

## TypeScript

No `any`, casts, or non-null assertions. Use `unknown`, narrowing, and type guards.

## Finish

Run tests, type-check, and lint. Report what changed, why, how to verify, and what was skipped and when to add it. No unrequested prose.
