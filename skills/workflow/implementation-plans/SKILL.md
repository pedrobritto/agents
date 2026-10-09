---
name: implementation-plans
description: Use when asked to read/write/update implementation plans.
---

# Implementation plans

Write self-contained implementation plans for an engineer resuming without chat history. Include only information needed to decide, execute, verify, revert, or resume. Summarize essential findings inline; links support context, never replace it. Keep plans self-contained.

Inspect the repository and existing plan first. Verify consequential assumptions against code and primary sources; label unresolved questions rather than inventing certainty.

## Managing plans

Store plans at: `${CODEX_HOME:-$HOME/.codex}/plans/<project-name>/<YYYY-MM-DD>--<plan-name>/plan.md`.

- Derive `<project-name>` from the repository root directory. Normalize project and plan names to lowercase kebab-case; use the local creation date.
- Honor an explicitly supplied plan path. Without a repository or identifiable project, establish the project before choosing its folder.
- Before creating a plan, inspect that project's existing plan filenames and read likely matches. Update the matching plan for continuing work; create a new one for distinct work. Ask only when the target is genuinely ambiguous.
- When updating, reconcile stale steps and record completed work, actual check results, and next actions. Preserve useful decisions; avoid appending contradictory plans.

## Structure

Adapt headings; Include only useful information.

- **Objective:** desired outcome and observable acceptance criteria.
- **Baseline:** dated repository/branch/revision, affected components, relevant versions, current behavior, existing failures, and local changes to preserve.
- **Scope and guardrails:** included/excluded work, invariants, permissions, environment prerequisites, and conditions requiring user direction. Planning does not authorize execution.
- **Execution:** ordered vertical slices with stable IDs, status, dependencies, and next action. Each slice states observable behavior, bounded files/components, red–green–refactor steps, validation commands with working directory and expected results, and rollback with dependencies or irreversible limits.
- **Evidence and decisions:** findings, source paths/URLs, verification date, chosen approach, rationale, and consequences. Distinguish observations, assumptions, and user decisions.
- **Deferred work:** stable IDs, reason deferred, impact, revisit trigger/dependencies, and acceptance criteria. Separate launch blockers from optional improvements.

## Atomicity

One step, one intention, one reviewable diff. Separate independent upgrades and optional modernization. Keep intermediate states usable; record unavoidable coupling and shared-file sequencing. Capture a baseline before changes; validate affected areas per step, then integrated behavior before acceptance.

## Vertical-slice TDD

Plan one behavior through its required layers at a time:

1. **Red:** write a behavior test first; run it and confirm the expected failure.
2. **Green:** implement only enough to pass; rerun the test.
3. **Refactor:** polish structure and naming without changing behavior; keep tests green.

Finish this cycle before the next slice. Never batch all tests, then all implementation, then all cleanup. For non-behavioral work where a failing test is inapplicable, record why and specify a before/after verification instead.

## Maintenance

After each step or material discovery, update status, actual changes, dated check results, decisions, blockers, backlog, and next action. Distinguish passed, failed, skipped, and blocked checks; implementation complete is not acceptance complete. Replace stale current-state claims; retain consequential decision history, not transcripts.

Reuse the existing plan. Unless directed otherwise, save at `$CODEX_HOME/plans/<repository-name>/<YYYY-MM-DD>--<plan-name>/plan.md` (default `$CODEX_HOME`: `~/.codex`); use lowercase kebab-case names. Return its absolute path.

## After plan creation/edit

- Do not jump to execution. Prompt user: "Plan written! Should I start implementation?"
