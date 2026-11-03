---
name: manual-acceptance-tests
description: Use when writing manual acceptance tests for humans.
---

# Manual Acceptance Tests

Write for teammates of any discipline. Derive expected behavior from agreed requirements and relevant code.

- Before writing, ask for missing setup values (URLs, usernames; never passwords or secrets). Still missing → bold uppercase placeholder `**{OWNER_USERNAME}**`; in links `[preview URL]({PREVIEW_URL})`. Never invent URLs, credentials, controls, or behavior. If expected behavior or a key UI flow is unknown, state what's missing.
- State once, upfront: accounts, permissions, test data, links, feature flags.
- Scenarios: **AT 1 — [Behavior]** with numbered steps: where to go, which account, what to click, expected visible result. Exact UI labels.
- Cover main flow, relevant edge cases, and where the change must NOT appear. No redundant checks.
- State changes: check existing and newly created content.
- Say explicitly when to refresh, expand, switch accounts, or use separate browser sessions.
- Note setup, dependencies on earlier tests, and cleanup.
- Markdown with descriptive inline links; no bare URLs.
- No implementation details, automation code, or filler.

Credentials:

```md
Login as {USER_TYPE}:
  - username: `{USERNAME}`
  - password: `{PASSWORD}`
```
