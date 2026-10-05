# Task routing

Load only entries needed for the current task. Skills below use their installed catalog paths; fallback: `~/.agents/skills/<name>/SKILL.md`. If a required file is missing, report it instead of silently claiming compliance.

| Task | Load |
| --- | --- |
| About to run shell commands | [snip.md](snip.md), before the first command; use a direct file reader or `snip cat` to bootstrap |
| Design, implement, refactor, or review code | `coding-guidelines` skill |
| Read, create, revise, or resume a saved implementation plan | `implementation-plans` skill |
| Substantive engineering task with a known topic | [lessons.md](lessons.md), then matching lesson files only |
| User asks to learn from mistakes or save a lesson | `self-improving` skill |

Coding guidance routes to `jsdocs` when writing code and `tdd` when writing tests. Do not load them just to read or discuss code.
