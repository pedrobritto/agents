---
name: jsdocs
description: On writing good jsdocs.
---

# JSDocs

## Overview

- Prefer a single-line, concise doc.
- Document what can't be quickly inferred from reading code:
  - Function goal/what it does.
  - Non-obvious behavior, quicks, invariants.
- DON'T document implementation details information that can get stale after code changes.

## What to document

Write JSDocs, when helpful, for:

- functions
- classes
- interfaces and its properties.
- types

## Tag usage

Allowed tags:

- @returns
- @params

Other tags: avoid unless absolutely required.

## React Components

No tags for react components, as they are implicit.

## Other

- variables: doc only if name non-obvious and good name is impossible.

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
 * @returns The returns description
 */
function fn2(arg1: string) {
  return 1;
}
/** The component's description. */
function SomeComponent(props: ISomeComponentInterface) {}
```
