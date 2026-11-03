---
name: writing-react
description: Use when building, refactoring, or reviewing React components (Next.js App Router), including state, effects, data flow, server/client boundaries, or React tests.
---

# Writing React

## Server/client

- Server Components by default. `"use client"` only for browser APIs, event handlers, client state, client-only libs; keep client boundaries low and narrow.
- Across the boundary: serializable data only; never secrets, privileged clients, or server-only modules.
- Fetch in the server component that owns the data; parallelize independent requests; stream slow regions with Suspense.
- Writes via Server Actions: re-authorize and validate on the server; revalidate affected data.
- SSR-safe render: no browser globals, request-shared mutable state, or nondeterministic output.

## Components

- Composition and explicit variants over boolean-prop matrices.
- Before adding state/effects, reuse props, URL params, server/query cache, form state, or parent state. Effects only sync with external systems.
- Compute derived values in render, not state.
- Model loading, empty, error, and optimistic states explicitly when applicable.
- Memoize only for measured cost or required referential stability.
- Tests assert on roles, text, focus, navigation, callbacks, network params.

## Finish

Check client/server placement, state ownership, effect necessity, accessibility, hydration safety.
