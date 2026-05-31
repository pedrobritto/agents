## Principles

1. Test behavior, visible output, not implementation.
   - e.g.: rendered UI; enabled/disabled buttons; filter/sort/date interactions; download/fetch calls from the real flow.
2. Write tests to catch regressions, edge cases.
3. FORBIDDEN: remove tests, reduce quality or scope to make them pass.
4. Only useful tests should exist: Test basic/advanced/required scenarios, prevent regressions, edge cases. Redundant, bloated tests should be reworked if salvageable or removed otherwise.

## General Rules

1. Keep one focused test per behavior branch. Easier failure read. Easier maintenance.
   - Example: render shell, SSR branch, side effect, mapping branch.
2. Prefer waitFor() over act() for state update
3. Put component/function tests inside `describe('<component-name>')`. One block per each.
4. Assert real UI state with stable data-testid and user-visible text
5. Use `waitFor`/`findBy*` for async stability.

## Coverage

1. Target 100% coverage target for statements, branches, functions, lines.

## Mocks

1. No mocking of internal modules/hooks/fns/components.
   - Example: `@/lib/hooks/**`; `@/lib/utils/**`; `@/components/**`; `@/component-library/**`
2. Use real providers vs mocking context hooks.
   - Example: `UserContextProvider`; `ShelterLocationProvider`; `ToastProvider`
3. Mock only external boundaries
   - Example: auth0 hooks, API SDK/client methods, browser APIs.
4. Clear between tests: mocks/storage/cookies/query cache, etc.
5. For mapping/transform validation: inject realistic input into mocked data sources -> assert rendered output from the real UI path.

## Work loop

When writing or updating many tests, do loop per test:

1. Change test.
2. Verify changed test pass.
   1. If fail, rework test until fixed.
   2. If pass, go to next test.
3. When all pass, success! finish loop.
