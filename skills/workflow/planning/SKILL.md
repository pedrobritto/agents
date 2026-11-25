---
name: planning
description: Use when asked to pre-plan, plan, or read/write/update/resume implementation plans.
---

# Planning

Two phases: **pre-plan** (understand the problem) → **plan** (write the implementation plan). Run both unless the user asks for only one. When resuming an existing plan, skip to the matching phase.

## Phase 1: Understanding and Research

Consolidate a precise understanding of the problem before planning.

- Before starting, check for an existing plan for this work (see [Managing plans](#managing-plans)).
- Investigate context, code, and primary sources; verify consequential assumptions.
- Ask all open questions in layered batches until these are strict and explicit:
  - requirements;
  - constraints;
  - guardrails;
  - scope and non-goals;
  - acceptance criteria;
  - risks.
- No open questions? State it.

### Gate

Write to output (not file system) a minimal yet complete summary of the problem understanding, organized by the items above. Then **stop and wait for user confirmation**. The user may end here without a plan.

Never jump to implementation.

## Phase 2: Plan

- Write self-contained plans for an engineer resuming without chat history: ALL required context — file names, decisions, etc. — so a fresh agent can start without asking questions. Include only information needed to decide, execute, verify, revert, or resume. Summarize essential findings inline; links support context.
- Carry the confirmed pre-plan summary into **Objective** and **Scope and guardrails**.
- Label unresolved questions rather than inventing certainty. Don't write a plan with open questions.

### Managing plans

Store plans at `${$HOME/.agents}/plans/<project-name>/<YYYY-MM-DD>--<plan-name>/`.

- `<project-name>` → infer from repository root directory. Project/plan names → lowercase kebab-case; use local creation date.
- No repository/identifiable project? Establish/ask project name before choosing its folder.
- Before creating a plan, inspect the project's existing plan filenames and read likely matches. Update the matching plan for continuing work; create a new one for distinct work. Ask only when the target is genuinely ambiguous.
- When updating, reconcile stale steps and record completed work, actual check results, and next actions. Preserve useful decisions; avoid appending contradictory plans.
- Honor explicitly supplied plan paths.

Plan directory files:

- `plan.md`: the actual plan.
- `state.md`: current state, such as completed/in progress/pending steps.

### Structure

Adapt headings; include only useful information.

- **Objective:** desired outcome and observable acceptance criteria.
- **Baseline:** dated repository/branch/revision, affected components, relevant versions, current behavior, existing failures, and local changes to preserve.
- **Scope and guardrails:** included/excluded work, non-goals, invariants, risks, permissions, environment prerequisites, and conditions requiring user direction.
- **Execution:** ordered vertical slices with numerical stable IDs, status, dependencies, and next action. Each slice states observable behavior, bounded files/components, red–green–refactor steps, validation commands with working directory and expected results, and rollback with dependencies or irreversible limits.
- **Evidence:** findings, source paths/URLs, verification date, chosen approach, rationale. Distinguish observations, assumptions, and user decisions.
- **Deferred work:** numerical stable IDs, reason deferred, impact, revisit trigger/dependencies, and acceptance criteria.

Large or non-trivial changes: split into multiple phases within the single plan file.

### Atomicity

One step, one intention, one reviewable diff. Keep intermediate states usable; record unavoidable coupling. Capture a baseline before changes; validate affected areas per step, then integrated behavior before acceptance.

### Vertical-slice TDD

Plan one behavior through its required layers at a time:

1. **Red:** write a behavior test first; run it and confirm the expected failure.
2. **Green:** implement only enough to pass; rerun the test.
3. **Refactor:** polish structure and naming without changing behavior; keep tests green.

Finish this cycle before the next slice. Never batch all tests, then all implementation, then all cleanup. For non-behavioral work where a failing test is inapplicable, record why and specify a before/after verification instead.

### After plan creation/edit

Do not jump to execution. Tell the user you are ready to implement.
