# Workflow

1. Plan with user
2. Implementation loop
3. Validate

## Step 1 — Plan with user

If user prompts for plan, brainstorm or in planning mode, Read [planning](./planning.md).

## Step 2 — Implement

Follow plan step-by-step.

1. Use /tdd skill for TDD workflow. Specific coding guidelines: [writing-code](./writing-code.md), [writing-jsdocs](./writing-jsdocs.md), [refactoring](./refactoring.md), [writing-unit-tests](./writing-unit-tests.md).
2. Before finishing implementation, use [validating-work](./validating-work.md).

If has pre-existing uncommitted changes, ignore and continue.

## Step 3 — Final validation

Once done, validate all work again with [validating-work](./validating-work.md).

Final pass: run tests with coverage. Coverage target = 100% across all 4 dimensions.

Coverage fail → update tests, maintain behavior, cover missing dimensions. Never strip assertions to pass. Never make test less reliable.

## Completion

Output concise summary; no write file:

```markdown
## Done

- [implemented]

## Validation

- [what passed]

## Notes

- [defaults taken, caveats, stashed state]
```
