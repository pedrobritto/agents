---
name: manual-acceptance-tests
description: Use when writing manual acceptance tests for humans.
---

# Manual Acceptance Tests

Write for teammates of any discipline, including developers and designers. Use the agreed requirements and relevant code to establish expected behavior.

- State required accounts, permissions, test data, links, and feature flags once upfront.
- Group scenarios as **AT 1 — [Behavior]**, each with numbered UI steps.
- Say where to go, which account to use, what to click, and what visible result to expect. Keep each step short and concrete.
- Use exact UI labels when known. Never invent URLs, credentials, controls, or behavior.
- Format acceptance tests in Markdown. Use descriptive inline links for URLs, for example:
  - Use [this preview URL](PREVIEW_URL) with comments enabled.
  - Use actual URLs when available; otherwise, keep uppercase URL placeholders in link destinations.
  - Avoid bare URLs or standalone URL placeholders.
- Cover the main flow, relevant edge cases, and where the change must NOT appear. Avoid redundant checks.
- For state changes, check existing and newly created content when relevant.
- Explicitly say when to refresh, expand content, switch accounts, or use separate browser sessions.
- Make tests reproducible: identify setup, dependencies on earlier tests, and cleanup when needed.
- Omit implementation details, automation code, and explanatory filler. Output ready-to-share instructions.
- Use placeholders for unavailable setup values. If expected behavior or an essential UI flow cannot be established, state exactly what is missing; do not invent a test outcome.
- Prompt the user for all missing values, (e.g. URLs, usernames) except passwords or sensitive data, before you write the acceptance test.
- If user does not provide missing values before hand, output missing values with bold, uppercase placeholders: **{OWNER_USERNAME}**, **{OWNER_PASSWORD}**. Use consistent, descriptive names.
- Format user credentials as:

```md
Login as {USER_TYPE}:
  - username: `{USERNAME}`
  - password: `{PASSWORD}`
```