---
name: orchestrate-coding-session
description: Use to coordinate a coding session that needs research, a confirmed plan, implementation, and independent review.
---

# Orchestrate a coding session

For trivial changes with no design choices, skip this workflow and run relevant checks. Otherwise, the lead owns decisions and implementation, working in this session by default.

1. **Plan:** Follow `planning`. Answer quick questions directly; use read-only subagents for independent questions when useful. Get user approval of the written plan before implementing.
2. **Implement:** Validate each slice and log progress in the plan's `state.md` per `managing-plans`. If the plan proves wrong or a decision must change, stop and ask the user before proceeding.
3. **Review:** Once acceptance checks pass or known failures are documented, dispatch a fresh, read-only reviewer to load `my-code-review`. Provide the plan path, diff, and check results. Verify questionable findings yourself. Fix and retest, dismiss with a reason, or ask the user when judgment is needed. Log dispositions in `state.md`. Re-review at most once, only after substantial fixes.
4. **Report:** Summarize changed files and behavior, checks and results, review findings and dispositions, deviations, and open issues. Leave the plan in place unless the user asks otherwise.

Dispatch subagents for independent research and review without separate user approval, not merely to distribute work. Set the model explicitly: low-cost for research, higher-capability for review. Give agents self-contained briefs, not conversation context. Don't poll or fetch full transcripts.
