---
name: tdd
description: Use when user wants to build features or fix bugs using TDD.
---

# TDD

Test rules: `coding-guidelines` Tests. Examples: [tests.md](tests.md). Mocking: [mocking.md](mocking.md).

## Vertical slices only

Never write all tests first. One test → its implementation → repeat; each test uses what the last cycle taught.

```
WRONG: RED test1..test5 → GREEN impl1..impl5
RIGHT: test1→impl1, test2→impl2, …
```

## 1. Plan, before any code

- Use the project's domain glossary and ADRs when present.
- Propose interface changes ([testable design](interface-design.md)) and a prioritized list of behaviors to test: critical paths and complex logic, not every edge case.
- Get user approval.

## 2. Red → green

Per behavior, starting with one end-to-end tracer bullet:

- RED: one test; see it fail.
- GREEN: minimum code to pass. Don't anticipate future tests.

## 3. Refactor

Only when green; run tests after each step. Candidates: [refactoring.md](refactoring.md).
