---
name: implementation-plans
description: Read, create, update, or resume saved implementation plans for a repository. Use for persistent plan work, not every task that needs a short in-chat outline.
---

# Implementation plans

Use `${CODEX_HOME:-$HOME/.codex}/plans/<project-name>/<YYYY-MM-DD>--<plan-name>/plan.md`.

- Derive project name from the repository root directory, not a nested working directory. Normalize project and plan names to lowercase kebab-case; use the local creation date.
- Honor an explicitly supplied plan path. Without a repository or identifiable project, establish the project before choosing its folder.
- Before creating a plan, inspect that project's existing plan filenames and read likely matches. Update the matching plan for continuing work; create a new one for distinct work. Ask only when the target is genuinely ambiguous.
- Reading a plan does not authorize edits or execution. Planning does not authorize implementation.
- Keep plans self-contained: objective, scope, repository path, relevant files/current behavior, decisions and constraints, ordered work, verification, progress, and unresolved questions. Include only sections that carry useful information.
- When updating, reconcile stale steps and record completed work, actual check results, and next actions. Preserve useful decisions; avoid appending contradictory plans.
- Preserve the original path when resuming. Reference the saved plan's absolute path in the final response and handoffs.
