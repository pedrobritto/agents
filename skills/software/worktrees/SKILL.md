---
name: worktrees
description: use when asked to manage worktrees.
---

# Worktrees

When using git worktrees:

- check if a worktree exist for intended branch.
- add them to `$HOME/.worktrees/<project-name>--<branch-name>`.
- project-name → same as directory name. both project/branch names should be lower/kebab cased.
- create a new branch off of the base branch's HEAD (usually origin/main or origin/master) unless stated otherwise.
- right after you create the worktree:
  - run the package manager to install dependencies.
  - copy all .env files -- such as .env, .env.test, .env.yarn, etc, including nested ones -- from the original repo into the added worktree.
