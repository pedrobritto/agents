# Agents

My personal collection of skills, tools, configs, etc for agentic workflows.

## Deploy

Run commands from the repository root with Bash and pnpm available.

```sh
pnpm copy:all
```

This copies skills to `~/.agents/skills/` and deploys shared instructions to Codex, pi, and Claude.

### Instructions

```sh
pnpm copy:global:agents
```

Instructions come from `instructions/AGENTS.md` and `instructions/instruction-references/`:

| Content | Default destination | Directory override |
| --- | --- | --- |
| Shared, on-demand references | `~/.agents/instruction-references/` | None |
| Codex instructions | `~/.codex/AGENTS.md` | `CODEX_HOME` |
| pi instructions | `~/.pi/agent/AGENTS.md` | `PI_CODING_AGENT_DIR` |
| Claude instructions | `~/.claude/CLAUDE.md` | `CLAUDE_CONFIG_DIR` |

To deploy instructions to just one harness:

```sh
pnpm copy:codex:agents
pnpm copy:pi:agents
pnpm copy:claude:agents
```

Each command also updates the shared references. Despite its name, `pnpm copy:shared:agents` deploys both the shared references and instructions for all three harnesses.

### Skills

```sh
pnpm copy:global:skills
```

The script finds directories containing `SKILL.md` under `skills/` and copies each directory, including its supporting files, into `~/.agents/skills/`. Category directories such as `software/`, `workflow/`, and `learning/` are not included in the destination path.

### Copy behavior

Commands create missing directories and overwrite matching deployed files; unrelated files are preserved, and stale files are not removed. Back up any customized deployed files before copying.

Shared references and skills always live under `~/.agents`, regardless of harness directory overrides. References left over in `~/.codex/instruction-references/` from the old layout are no longer used and can be archived.
