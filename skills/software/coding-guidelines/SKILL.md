---
name: coding-guidelines
description: Use when writing/editing code.
---

# Coding guidelines

Follow below instructions when writing code.

## General

- Optimize for: correct behavior, clear intent, safe change, low maintenance cost.
- Prefer: evidence over dogma; local consistency over personal taste.
- Prefer: direct control flow, explicit data flow, standard language features.
- Work in small valuable increments.
- Get fast feedback for your work: test, type-check, lint, run, review.
- Build for confirmed requirements ONLY. NO speculative code.
- Pick simplest design that fully satisfies constraints.
- Reduce: states, branches, concepts, indirection.
- Make dependency direction obvious; avoid cycles.

## Clean Code

- Functions → one responsibility.
- Side effects: should be visible and controlled.
- Handle errors at layer that can add context/recover.
- NEVER abstract early.
- Comments explain why, constraints, hazards; never implementation.
- Public APIs → small; hide implementation details.

## Deep modules

Pick Deep Modules when possible. Shallow only when deep not possible.

Deep modules have:

- small interface. e.g. Few methods, simple params.
- hidden, but well built, complex logic.

In contrast, shallow module have:

- large interface: Many methods, complex params.
- little implementation.

When designing interfaces, ask:

- Can I reduce number of methods?
- Can I simplify parameters?
- Can I hide more complexity inside?

## Variable Naming

- Name by domain meaning and role. e.g.: `invoiceTotal` vs `value`.
- USE: verbs for actions; nouns for values; `is`/`has`/`can` for booleans.
- Match name precision to scope: short locally, explicit across boundaries.
- Include units/representation when ambiguous. e.g.: `timeoutMs`, `createdAtUtc`.
- NEVER: unexplained abbreviations, magic numbers, type-encoded names, misleading names.

## Debugging

- Reproduce bugs before fix, if possible.

## Structure

- Keep related behavior close.
- Follow repository conventions unless they harm correctness.

## Style

- Separate distinct code blocks/sections with empty lines. E.g. between: conditionals, variable/fn declaration, method calls, etc.

## Tests

- DO test observable behavior, NOT implementation details.
- One focused behavior branch per test.
- DO ADD coverage for critical code paths, including: main behavior, error handling, conditionals.
- For UI assertions prefer user-visible text, then `data-testid`, IDs, and tag names.
- Prefer `waitFor()` for asynchronous assertions when supported; no waits on synchronous checks.
- NO mocking internal hooks, functions, and components where possible. Mock external boundaries as needed; isolate mocks, storage, cookies, and caches between tests.
- NEVER remove tests, weaken assertions, or reduce coverage scope TO make checks pass.

## TypeScript

- No `any`, type casts, or non-null assertions. Use `unknown`, narrowing, and type guards.

## Finishing

- Tell the user what changed, why, and how to verify.
