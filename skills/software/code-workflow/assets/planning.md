# Planning

## Goal

Write detailed implementation plan artifact based on the user's request/goal.

## Workflow

1. User asked for a plan?
   1. Yes: Get user input on goals; continue.
   2. No: SKIP PLANNING.
2. Explore/Research codebase for relevant context.
3. Has questions or need decision?
   1. Yes: Ask user all questions in single message, ordered list format.
   2. No: Continue.
4. Forumlate the plan, but not write or output.
5. More questions?
   1. Yes: Go to step 3.
   2. No: continue.
6. Presente plan to user; Write plan to filesystem (see instructions below).
7. Prompt user for approval to start implementation.

## Guidelines

1. During planning, explore the codebase for:
   1. Relevant: modules/files/functions/snippets.
   2. Existing: abstractions/conventions.
   3. Any context you find useful.
2. The complete plan should be a standalone document and contain ALL NECESSARY CONTEXT FOR IMPLEMENTATION. No external context should be required.
3. Plan requires decision? Present 2-4 options with trade-offs to user via STDOUT. RECOMMEND ONE.
   1. Note: If task is trivial, pick the simplest, most idiomatic option. Note it.
4. If plan is large/complex, break it down in phases. Each phase should produce stable, working features.
5. Write the finalized plan to (`plans/[branch-name][-optional-phase-NUMBER].plan.md`).

## Research quality criteria

1. Read all relevant code.
2. Identify patterns to follow (naming, structure, error handling, types)
3. Note any gotchas or constraints discovered

## Sections

1. **General context**: request context, relevant files, etc.
2. **Scope**:
   1. scope: bounded, clear, no ambiguity.
   2. scope creep: identified and excluded.
   3. edge cases: listed.
3. **Goals**:
   1. goals: What needs to be done.
   2. success criteria: definition of done, measurable, testable.
4. **Implementation** steps: in order.
5. **Test approach**: how changes will be verified.
6. **Validation approach**: what needs to pass.
7. **Potential blockers**: listed and accounted for.
8. **Open decisions**: note in the plan besides STDOUT.

## Output

1. The plan should be entirely on the plan file.
2. A summary may be provided in STDOUT.
3. Questions/Request for user action should be sent to STDOUT.
