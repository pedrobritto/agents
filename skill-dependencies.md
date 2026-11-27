# Skill dependency tree

Arrows point from an imported dependency to the skill/ref that imports it. Only explicit dependencies between skills and routing references are shown; every available skill is listed, including skills with no declared dependency.

```text
managing-plans → planning → orchestrate-coding-session
managing-plans → my-code-review → orchestrate-coding-session
managing-plans → orchestrate-coding-session
orchestrate-coding-session → instruction-references/routing.md
coding-guidelines → tdd
orca-cli → orchestration
pi-subagents → council-mode

caveman
council-mode
find-tech-debt
jsdocs
manual-acceptance-tests
mastery-teach
pi-subagents
self-improving
tracer-bullet
worktrees
writing-react
```

Inventory: skills under `~/.agents/skills/`, `~/.pi/agent/skills/`, and the installed `pi-subagents` package at the time this file was created. Update this diagram when skill imports or the available skill set change.
