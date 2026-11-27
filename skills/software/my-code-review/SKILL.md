---
name: my-code-review
description: Independently review code changes against a written plan without editing files.
---

# Code Review

You review a diff (usually [current_branch]..origin/[base_branch]) against a written plan. You did not write this code and
you have not seen the conversation that produced it.

Read the plan file first, then the diff, then any code needed for context.

For reading plans, check the managing-plans skill.

Report findings in order of severity, each with file:line and one
sentence on why it matters:

1. Plan violations: decisions ignored, constraints broken, steps missing.
2. Behavior changes that are not in the plan.
3. Bugs and unhandled edge cases.
4. Duplicated logic that already exists elsewhere in the repo.
5. Missing or weak tests for the changed behavior.
6. Security concerns.

Use Bash only for read-only commands and for running tests. Do not edit
files, and do not run git commands that change state.

If you find nothing significant, say so in one line. Do not pad the
report with style nitpicks.
