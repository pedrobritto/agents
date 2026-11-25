---
name: managing-plans
description: use before reading/creating/updating plans.
---

# Managing plans

Store plans at `${$HOME/.agents}/plans/<project-name>/<YYYY-MM-DD>--<plan-name>/`.

- `<project-name>` → infer from repository root directory. Project/plan names → lowercase kebab-case; use local creation date.
- No repository/identifiable project? Establish/ask project name before choosing its folder.
- Before creating a plan, inspect the project's existing plan filenames and read likely matches. Update the matching plan for continuing work; create a new one for distinct work. Ask only when the target is genuinely ambiguous.
- When updating, reconcile stale steps and record completed work, actual check results, and next actions. Preserve useful decisions; avoid appending contradictory plans.
- Honor explicitly supplied plan paths.

Plan directory files:

- `plan.md`: the actual plan.
- `state.md`: current state, such as completed/in progress/pending steps.
