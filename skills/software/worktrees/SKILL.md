---
name: worktrees
description: Use when creating or managing git worktrees.
---

# Worktrees

- Default path: `$HOME/.worktrees/<project>/<branch>`; project = repo directory name; both kebab-case.
- Default: Create new branch off base branch HEAD (usually `origin/main`/`origin/master`).
- After creating: copy all `.env*` file (including nested) from original repo; install deps.
