---
name: orchestrator
description: Use when asked to orchestrate work.
---

# Orchestrate (hybrid)

You are the lead. You plan, you implement, and you own every decision.
Subagents do two jobs only:

- Gather facts, so search output never floods this context.
- Review the finished work with fresh eyes.

Implementation stays in this session, so the reasons behind the plan
(what was rejected and why) travel with the code.

The guiding rule: spawn a subagent for independence, not for tidiness.

## 0. Triage the task

Classify the task before doing anything else.

- **Trivial** (one file, obvious change, no design choices): do it directly.
  Run the checks and stop. Skip this skill.
- **Normal ticket** (the default): run phases 1 to 5 below.
- **Large** (parts that are truly independent, unlikely to fit one
  context, or the user asked for unattended work): run phases 1 to 5, and
  use the "Escalation: parallel implementation" section in phase 3.

Tell the user which class you picked, in one line.

## 1. Research (delegated, read-only)

- First, write down the 1 to 3 concrete questions you need answered.
  Examples: where X lives, how Y is called today, which tests cover Z.
- If one quick grep answers a question, run the grep yourself instead of
  spawning a subagent.
- Otherwise spawn up to 3 `Explore` subagents in parallel, one question each.
- Use cheap subagents for the research.
- Each subagent returns at most 200 words: findings with `file:line`
  references, plus open questions.
- Read the summaries. Open specific files yourself only where the plan
  depends on the exact code.

## 2. Plan (lead only) and stop for approval

Write `.plans/<short-slug>.md` with these sections:

1. **Goal**: one paragraph.
2. **Decisions**: each decision and the reason for it.
3. **Rejected options**: what you considered and why you dropped it.
4. **Constraints**: conventions, APIs and files you must not touch.
5. **Steps**: an ordered list, each with the files it touches.
6. **Acceptance checks**: the exact commands that must pass (tests,
   typecheck, lint, build) and any manual check.
7. **Log**: empty for now; you fill it in during phase 3.

Then STOP. Show the user a short summary of the plan and wait for their
approval. Do not write code before they approve. If they change the plan,
update the file first.

## 3. Implement (in this session)

- Work through the steps in order. After each step, run the relevant
  checks.
- Append to the plan's **Log** section: a step was done, the plan was
  deviated from (and why), or something surprised you. Keep each entry to
  one line.
- Do not quietly change a decision. If the plan turns out to be wrong,
  stop, explain why, propose the change and wait for approval.
- Delegate only noisy side tasks whose raw output you won't need again:
  - Running the full test suite and summarizing the failures.
  - Digging through logs or long stack traces.
  - Looking up library documentation.
- For those side tasks use a general-purpose subagent with
  `model: sonnet`, `effort: low`, and a brief asking it to return only
  the facts you need, in at most 200 words.

### Escalation: parallel implementation (large tasks only)

Use this only when steps touch disjoint sets of files.

- Run 2 to 4 workers per wave, each in its own git worktree.
- Treat overlapping file ownership as a reason to merge tasks, not to add
  workers.
- Only the lead edits hotspot files: routes, config, registries, schemas,
  lockfiles.
- Give each worker a brief that copies its section of the plan verbatim:
  goal, decisions, rejected options, which files it may and may not touch,
  the acceptance checks, and the return format.
- Subagents do not inherit your skills or conversation. Paste in any
  conventions they need.
- Forbid repo-wide git operations (stash, reset, checkout of other
  branches) in worker prompts.
- Merge one branch at a time, and rerun the checks after each merge.

## 4. Review (delegated, fresh context)

- Run all the acceptance checks first. The review starts from passing
  checks, or from a clear list of known failures.
- Spawn the `plan-reviewer` subagent if it exists. If it doesn't, spawn a
  general-purpose subagent with the reviewer brief from the appendix and
  an explicit order not to edit files.
- Use `model: opus` and `effort: medium` or higher. Review is not
  cheap-model work.
- Give the reviewer ONLY:
  - the path to the plan file;
  - the diff (`git diff <base>...HEAD`, or the working-tree diff);
  - the output of the acceptance checks.
- Do NOT give it a summary of this conversation or your reasoning. Its
  value comes from not sharing your assumptions.
- Run one review pass. Triage each finding:
  - **Fix**: make the change and rerun the checks.
  - **Dismiss**: record a one-line reason in the plan's Log.
  - **Ask the user**: the finding needs a judgment call.
- Allow at most one re-review, and only if the fixes were substantial.
  Never loop reviews until clean.

## 5. Report

Tell the user:

- what changed, as files and behavior;
- which checks ran, and their results;
- what the reviewer flagged, and what you did about each finding;
- any deviations from the plan, and anything still undecided.

Leave the plan file in place, unless the user doesn't want `.plans/` in
the repo.

## Rules for every dispatch

- Always set the model explicitly. Defaults inherit the expensive one.
- Don't poll subagents or fetch their full transcripts. Wait for their
  result.
- Briefs must be self-contained, because subagents can't see this
  conversation.
- If a subagent's result looks wrong, check the claim yourself before
  acting on it.

## Appendix: reviewer brief

Optionally, save this as `.claude/agents/plan-reviewer.md`. As a file it
enforces read-only tools (plus Bash for running checks). Without the file,
paste the body into a general-purpose subagent's prompt.

```markdown
---
name: plan-reviewer
description: Independent reviewer. Checks a diff against its written plan. Use after implementation. Never edits files.
tools: Read, Grep, Glob, Bash
model: opus
effort: medium
---

You review a diff against a written plan. You did not write this code and
you have not seen the conversation that produced it.

Read the plan file first, then the diff, then any code needed for context.

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
```
