---
name: find-tech-debt
description: Use when asked to find/search tech debt.
---

# Find Tech Debt

## Workflow

1. Search. Look for low quality code, hard-to-maintain code, bug-prone/bug-confirmed code.
2. Fix immediately if low effort: when changes are small, related, safely verifiable.
3. Record larger debt: its current impact, debt evidence, your proposed solutions.

## Guidelines

- Prioritize by recurring cost × change frequency × failure risk.
- Never conceal workaround; document its constraint and removal condition.
- Output findings to the chat, ordered by priority.
