---
name: orchestrate-coding-session
description: Use to coordinate a coding session that needs research, a confirmed plan, implementation, and independent review.
---

# Orchestrate a coding session

The lead owns decisions and implementation. Use subagents for independent research and review, not merely to distribute work.

For trivial changes with no design choices, skip this workflow and run the relevant checks.

## Research and Plan

Follow `planning`. During its research phase, answer quick questions directly and use authorized, read-only subagents for independent questions when useful. Start implementation only after the user approves the written plan.

## Implement

Implement in this session by default. Validate each slice and record progress in the plan’s `state.md` (see `managing-plans`). If the plan proves wrong or a decision must change, stop and ask the user before proceeding.

## Review

After acceptance checks pass (or known failures are documented), ask a fresh, read-only reviewer to load `my-code-review`. Provide the plan path, diff, and check results—not conversation context. Fix and retest, dismiss with a reason, or ask the user when judgment is needed. Record dispositions in `state.md`. Allow at most one re-review, only after substantial fixes.

## Report

Summarize changed files and behavior, checks and results, review findings and disposition, deviations, and unresolved items. Leave the plan in place unless the user asks otherwise.

## Dispatch rules

- Set the model explicitly; use low-cost models for research and higher-capability review models for independent review.
- Keep briefs self-contained; subagents do not inherit this skill or the conversation.
- Do not poll or fetch full transcripts. Verify questionable findings yourself.
