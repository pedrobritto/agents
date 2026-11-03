---
name: worktrees
description: Use when creating or managing git worktrees.
---

# Worktrees

- Reuse an existing worktree for the branch if one exists.
- Path: `$HOME/.worktrees/<project>--<branch>`; project = repo directory name; both kebab-case.
- New branch off the base branch HEAD (usually `origin/main`/`origin/master`) unless told otherwise.
- After creating: install dependencies; copy every `.env*` file, including nested ones, from the original repo.
