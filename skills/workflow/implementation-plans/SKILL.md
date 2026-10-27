---
name: implementation-plans
description: Use when asked to read/write/update implementation plans.
---

# Implementation plans

- Write self-contained implementation plans for an engineer resuming without chat history. Include only information needed to decide, execute, verify, revert, or resume. Summarize essential findings inline; links support context.
- Self-contained means: plan should contain ALL required context -- including file names, decisions, etc -- for a fresh agent to start working without needing to ask more questions.
- Verify consequential assumptions against code and primary sources; label unresolved questions rather than inventing certainty.
- Don't write a plan if you have open questions.

## Managing plans

Store plans at directory: `${$HOME/.agents}/plans/<project-name>/<YYYY-MM-DD>--<plan-name>/`.

- `<project-name>` → infer from repository root directory. Project/Plan names → lowercase kebab-case; use local creation date.
- No repository/identifiable project? Establish/Ask project name before choosing its folder.
- Before creating a plan, inspect that project's existing plan filenames and read likely matches. Update the matching plan for continuing work; create a new one for distinct work. Ask only when the target is genuinely ambiguous.
- When updating, reconcile stale steps and record completed work, actual check results, and next actions. Preserve useful decisions; avoid appending contradictory plans.
- Honor explicitly supplied plan paths.

Plan directories should have files:

- `plan.md`. The actual plan.
- `state.md`. Current plan state, such as completed/in progress/pending steps.
- `scratchpad.md`. Scratchpad for you to use if needed. Add your personal notes/ideas here.

## Structure

Adapt headings; Include only useful information.

- **Objective:** desired outcome and observable acceptance criteria.
- **Baseline:** dated repository/branch/revision, affected components, relevant versions, current behavior, existing failures, and local changes to preserve.
- **Scope and guardrails:** included/excluded work, invariants, permissions, environment prerequisites, and conditions requiring user direction.
- **Execution:** ordered vertical slices with numerical stable IDs, status, dependencies, and next action. Each slice states observable behavior, bounded files/components, red–green–refactor steps, validation commands with working directory and expected results, and rollback with dependencies or irreversible limits.
- **Evidence:** findings, source paths/URLs, verification date, chosen approach, rationale. Distinguish observations, assumptions, and user decisions.
- **Deferred work:** numerical stable IDs, reason deferred, impact, revisit trigger/dependencies, and acceptance criteria.

## Atomicity

One step, one intention, one reviewable diff. Keep intermediate states usable; record unavoidable coupling. Capture a baseline before changes; validate affected areas per step, then integrated behavior before acceptance.

## Large plans

For large or non-trivial changes, add multiple phases to plan file. keep single plan file.

## Vertical-slice TDD

Plan one behavior through its required layers at a time:

1. **Red:** write a behavior test first; run it and confirm the expected failure.
2. **Green:** implement only enough to pass; rerun the test.
3. **Refactor:** polish structure and naming without changing behavior; keep tests green.

Finish this cycle before the next slice. Never batch all tests, then all implementation, then all cleanup. For non-behavioral work where a failing test is inapplicable, record why and specify a before/after verification instead.

## After plan creation/edit

- Do not jump to execution. Say to user you are ready to implement.
