## Reuse Existing State Before Adding Effects

Before adding local transient state or `useEffect`, check whether existing state can represent the behavior.

Guidelines:

- Prefer existing sources of truth: URL/query, props, server/query data, form state, parent state.
- If new behavior should match an existing scenario, enter that scenario instead of adding a parallel path.
  - Example: if “after filter change” should behave like “initial load with no selected item,” clear selected-item state.
- Use `useEffect` for external sync only: subscriptions, timers, imperative DOM APIs, router sync, analytics, etc.
- Do not use `useEffect` to manage derived render state when it can be computed from props/state.
- Avoid pending/force/reset flags unless existing state cannot encode the transition.
- If adding transient state/effects, explain why they are necessary.
- Test observable behavior: UI, URL/query, callbacks, network params. Do not test internal flags.
