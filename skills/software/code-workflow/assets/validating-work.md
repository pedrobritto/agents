# Validation loop

## Validation steps

Run order:

1. linter.
2. typechecker.
3. formatter.
4. test changed files.

## Loop behavior

On error/failure:

1. Attempt fix.
2. On fail, try different approach.
3. 3 approaches fail → stop → raise hand.

Lint passes but later step fails → continue from failure. Skip passing steps.

## Pre-existing failures

Unrelated failure, doesn't block your changes → skip and continue.

## Blocking failures

Stop and alert user if:

- App crash. Feature untestable by human.
- Cannot determine if changes work due to pre-existing condition.
