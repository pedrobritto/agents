## Principles

1. Use smallest, simplest code to solve request.
2. Reject speculative abstraction.
3. Unless explicit, prefer existing patterns and primitives from repo.
4. Keep responsibilities focused.
5. Do not abstract early.
6. Avoid broad rewrite.
7. Preserve behavior unless request expects change.

## Editing

1. Depend on interfaces/abstractions where boundaries already exist.
2. Keep APIs small, explicit, intention-revealing.
3. Remove local safe duplication.
4. Keep naming clear, explicit. Avoid comments unless logic non-obvious.
5. Minimize complexity.
6. Minimize branching and nesting; simplify conditionals.
7. Write code flow in human-read order

## Validation

1. Check no YAGNI violations.
2. Check no complexity increase without payoff.
3. Check tests cover changed behavior.
4. Check diff is minimal and maintainable.

## Guidelines

### General Coding

1. Prefer named exports over default (unless default required)
2. Don't use object/array literals as React prop fallbacks.

### TypeScript

1. Typing quality -> high.
2. No `any` types.
3. No type casting. Use type guards.
4. No non-null assertions.
