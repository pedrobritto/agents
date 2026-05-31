# Writting JSDocs

## 1. Keep it minimal and readable

- Prefer a single-line, concise doc when possible.
- Only expand to multi-line when documenting important/unusual/non-obvious context.

## 2. Tag usage

Allowed tags:

- @returns
- @params

Other tags forbidden.

## 3. Document behavior/why, not syntax

Write what can't be quickly inferred from reading code:

- Function goal/what it does.
- Non-obvious behavior, quicks, invariants.

Don't document information that can get stale after a function update.

## 4. Interfaces/properties

- Interface: one brief summary on the interface itself.
- Properties: one brief summary per property when it’s not obvious.

## 5. React Components

Omit tags for react components.

## 6. Other

- variables (let/const): comment only if name non-obvious and good name is impossible.

## Output

- If ambiguous: do not change, then report:
  - what was not changed + why
  - one clarifying rule suggestion

## Examples

```ts
/** Some hopefully relevant description. Otherwise, don't comment. */
const someConst = 1234;

/** Type description. */
type SomeType = string;

/** Interface Description. */
interface ISomeInterface {
  /** Property description. */
  property: string;
}

/**
 * Fn description.
 *
 * @param arg1 Arg1 description
 * @param arg2 Arg2 description
 * @param arg3 Arg3 description
 */
function fn(arg1: string, arg2: number, arg3: boolean) {
  // no return statement
}

/**
 * Fn description.
 *
 * @param arg1 Arg1 description
 * @returns {number} The returns description
 */
function fn2(arg1: string) {
  return 1;
}

/**
 * The component's description.
 */
function SomeComponent(props: ISomeComponentInterface) {}
```
