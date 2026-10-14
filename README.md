# Agents

My personal collection of skills, tools, configs, etc for agentic workflows.

## Deploy instructions

Run `pnpm copy:global:instructions` to deploy the shared instructions to Codex and pi:

- `~/.agents/instruction-references/` holds the shared, on-demand guidance.
- `~/.codex/AGENTS.md` loads that guidance for Codex.
- `~/.pi/agent/AGENTS.md` loads that guidance for pi, following its [agent-directory convention](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/configuration.md#agent-directory).

Use `pnpm copy:codex:instructions` or `pnpm copy:pi:instructions` to deploy only one harness. Each command also updates the shared references. `CODEX_HOME` and `PI_CODING_AGENT_DIR` override the respective harness directories; shared references always live under `~/.agents`.

The source remains in `instructions/AGENTS.md` and `instructions/instruction-references/`. Commands create missing directories and overwrite matching deployed files; unrelated files are preserved. Back up any customized deployed instructions before copying. After migrating from the old layout, the references in `~/.codex/instruction-references/` are no longer used and can be archived.
