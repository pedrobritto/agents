# Worktrees

When using git worktrees:

- check if a worktree exist for intended branch.
- add them to `$HOME/.worktrees/<project-name>--<branch-name>`.
- project-name → same as directory name. both project/branch names should be lower/kebab cased.
- right after you create the worktree:
  - run the package manager to install dependencies.
  - copy all .env files -- such as .env, .env.test, .env.yarn, etc, including nested ones -- from the original repo into the added worktree.
