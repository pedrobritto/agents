---
name: find-tech-debt
description: Use when asked to find/search tech debt.
---

# Find Tech Debt

1. Ask for scope: a path, or the HEAD-vs-base diff.
2. Find code that is: low-quality, hard-to-maintain, unnecessary duplicate, coupled, bug-prone.
3. Report in chat, ranked by recurring cost × change frequency × failure risk. Each item: impact, evidence (`file:line`), proposed fix.
4. Fix only on request.
