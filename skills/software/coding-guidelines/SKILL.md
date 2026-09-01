---
name: coding-guidelines
description: Apply pragmatic software-engineering discipline when designing, implementing, refactoring, or reviewing code. Use to keep changes simple, tested, readable, maintainable, and proportional to current needs.
---

# Coding guidelines

Optimize for correct behavior, clear intent, safe change, and low maintenance cost. Prefer evidence over dogma; local consistency over personal taste.

## XP

- Work in the smallest valuable increment.
- Get fast feedback: test, type-check, lint, run, review.
- Test behavior likely to break; reproduce bugs before fixing when practical.
- Refactor only with a safety net proportional to risk.

## YAGNI

- Build for confirmed requirements, not imagined futures.
- Avoid speculative abstractions, options, layers, and dependencies.
- Preserve an obvious extension seam only when cheap and evidence-backed.
- Delete obsolete code; do not keep it “just in case”.

## KISS

- Choose the simplest design that fully satisfies constraints.
- Prefer direct control flow, explicit data, standard language features.
- Reduce states, branches, concepts, and indirection.
- Add complexity only when it removes greater demonstrated complexity.

## SOLID

- **Single responsibility:** group code by one reason to change.
- **Open/closed:** abstract after repeated variation appears, not before.
- **Liskov substitution:** implementations must honor the contract without surprises.
- **Interface segregation:** expose the smallest coherent capability consumers need.
- **Dependency inversion:** depend on stable boundaries where change or testing warrants it.

IMPORTANT: Treat SOLID as design pressure, not a mandate for more classes or interfaces.

## Clean Code

- Make intent obvious. Prefer clarity over cleverness.
- Keep functions focused; extract when it improves meaning, reuse, or testability.
- Keep side effects visible and controlled.
- Handle errors at the layer that can add context or recover.
- Comments explain why, constraints, or hazards, never what readable code already says.
- Avoid duplication when shared knowledge is stable; tolerate small duplication over false abstraction.
- Never abstract early.

## Variable Naming

- Name by domain meaning and role: `invoiceTotal`, not `value`.
- Use verbs for actions; nouns for values; `is`/`has`/`can` for booleans.
- Match name precision to scope: short locally, explicit across boundaries.
- Include units or representation when ambiguous: `timeoutMs`, `createdAtUtc`.
- Avoid unexplained abbreviations, magic numbers, type-encoded names, and misleading generality.

## Organization

- Keep related behavior close; separate unrelated reasons to change.
- Follow repository conventions unless they harm correctness.
- Keep public APIs small; hide implementation details.
- Make dependency direction obvious; avoid cycles.
- Organize by domain or feature when it improves change locality.

## Tech Debt

- Distinguish debt from preference. Identify concrete cost, risk, or friction.
- Fix debt now when small, related, and safely verifiable.
- Record debt when larger or out of scope: impact, evidence, proposed next step.
- Prioritize by recurring cost × change frequency × failure risk.
- Never conceal a workaround; document its constraint and removal condition.

## Proactive Maintenance

- Leave touched code slightly better: clearer name, removed dead path, smaller duplication, stronger test.
- Keep cleanup adjacent and proportional to the requested change.
- Separate broad refactors from behavior changes when review or rollback benefits.
- Preserve behavior unless change is required and verified.
- Stop when further improvement becomes speculative, risky, or scope-expanding; surface it instead.

## TypeScript

- No `any` types. `unknown` allowed.
- No type casting. Use type guards.
- No non-null assertions.

## Done

Before finishing:

- Required behavior works, including relevant failure paths.
- Tests cover meaningful behavior; existing tests still pass.
- Types, lint, and formatting pass where available.
- Names and structure communicate intent without excess explanation.
- No needless abstraction, dependency, duplication, dead code, or hidden debt was introduced.
- Change remains focused, reviewable, and easy to revert.
