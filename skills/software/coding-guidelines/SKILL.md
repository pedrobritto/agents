---
name: coding-guidelines
description: Apply personal engineering conventions when designing, implementing, refactoring, or reviewing code. Use when making code changes.
---

# Coding guidelines

Optimize for correct behavior, clear intent, safe change, and low maintenance cost. Prefer evidence over dogma; local consistency over personal taste.

## XP

- Work in the smallest valuable increment.
- Get fast feedback: test, type-check, lint, run, review.
- Reproduce bugs before fix if practical.

## YAGNI

- Build for confirmed requirements. Avoid any speculative code.

## KISS

- Pick simplest design that fully satisfies constraints.
- Prefer direct control flow, explicit data flow, standard language features.
- Reduce states, branches, concepts, indirection.

## Clean Code

- Intent should be obvious.
- Functions should have narrow focus.
- Side effects: should be visible, controlled.
- Handle errors at the layer that can add context or recover.
- Never abstract early.
- Comments explain why, constraints, hazards; never explain implementation.
- Public APIs → small; hide implementation details.

## Variable Naming

- Name by domain meaning and role. e.g.: `invoiceTotal` vs `value`.
- Use verbs for actions; nouns for values; `is`/`has`/`can` for booleans.
- Match name precision to scope: short locally, explicit across boundaries.
- Include units or representation when ambiguous. e.g.: `timeoutMs`, `createdAtUtc`.
- Avoid unexplained abbreviations, magic numbers, type-encoded names, and misleading generality.

## Organization

- Keep related behavior close.
- Follow repository conventions unless they harm correctness.
- Make dependency direction obvious; avoid cycles.

## Tech Debt

- Fix debt now when small, related, safely verifiable.
- Record debt when larger or out of scope: impact, evidence, proposed next step.
- Prioritize by recurring cost × change frequency × failure risk.
- Never conceal workaround; document its constraint and removal condition.

## Tests

- Inspect existing coverage first; test observable behavior, not implementation details. Keep one focused behavior branch per test.
- For UI assertions prefer user-visible text, then `data-testid`, IDs, and tag names. 
- Prefer `waitFor()` for asynchronous assertions when supported; do not add waits to synchronous checks.
- Avoid mocking internal hooks, functions, and components where possible. Mock external boundaries as needed; isolate mocks, storage, cookies, and caches between tests.
- Never remove tests, weaken assertions, or reduce coverage scope to make checks pass.

## Proactive Maintenance

- Improve existing code you touch: simpler design/data flow, clearer name, stronger test.
- Keep cleanup adjacent to requested change; No broad rewrites.

## TypeScript

- No `any`, type casts, or non-null assertions. Use `unknown`, narrowing, and type guards.

## Verify work

Before finishing:

- Check for missing behavioral coverage; add useful tests without duplicating existing ones.
- Tell the user what changed, why, and how to verify.