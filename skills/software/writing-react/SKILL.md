---
name: writing-react
description: Build, refactor, or review React client components, Server Components, and SSR-safe component boundaries. Use for component APIs, state, effects, data flow, accessibility, rendering, or React tests.
---

# Writing react

Build the smallest component tree that makes ownership, data flow, and runtime boundaries obvious.

## Choose the Runtime

- Default to Server Components where supported. Add `"use client"` only for browser APIs, event handlers, client state, or client-only libraries.
- Keep client boundaries low and narrow. Pass serializable data across them; never secrets, privileged clients, or server-only modules.
- Treat SSR as pure: no browser globals, request-shared mutable state, nondeterministic render output, or hydration-dependent markup.
- Fetch near the server component that owns the result. Parallelize independent requests; stream slow regions when the framework supports it.
- Perform writes through the framework's server mutation primitive/API. Authorize and validate again on the server; refresh invalidated data deliberately.

## Design the Component

- One clear responsibility. Extract only when behavior, reuse, testability, or a runtime boundary improves.
- Prefer composition and explicit variants over boolean-prop matrices. Keep props minimal, cohesive, and domain-named.
- Render from props/state. Keep derived values out of state; compute them during render.
- Put state at the nearest common owner. Preserve one source of truth; use controlled inputs when callers must coordinate them.
- Use stable domain IDs as keys. Never generate keys during render; avoid indexes when items can reorder.
- Model loading, empty, error, success, disabled, and optimistic states explicitly when applicable.

## Write Client Logic

- Event handlers perform user-driven work. Effects synchronize with external systems only.
- Before adding state/effects, reuse props, URL/query, server/query cache, form state, or parent state.
- Effects must have complete dependencies and cleanup. Never use an effect to mirror props or derive render state.
- Use refs for imperative handles or mutable values that must not trigger rendering—not hidden UI state.
- Keep async work race-safe and cancellation-aware. Surface pending and failure states; prevent accidental duplicate mutations.
- Optimize after evidence. Prefer simpler data flow over memoization; use memoization only for measured cost or required referential stability.

## Preserve Quality

- Use semantic HTML first. Preserve keyboard access, focus behavior, labels, names, and useful announcements.
- Keep render pure. Do not mutate props/state or trigger side effects during render.
- Follow project conventions and existing libraries before adding abstractions or dependencies.
- Use precise types; represent valid states structurally. Avoid `any`, unsafe casts, and impossible prop combinations.
- Handle errors at the boundary that can recover or explain them. Do not silently swallow failures.
- Test observable behavior: text, roles, focus, navigation, callbacks, and network parameters. Avoid implementation-detail assertions and internal-module mocks.

## Finish

Review client/server placement, state ownership, effect necessity, accessibility, failure states, and hydration safety. Run targeted tests, typecheck, lint, and formatting available in the project. Report tradeoffs or framework assumptions.
