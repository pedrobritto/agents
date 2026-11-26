# Agents

My personal collection of skills, tools, configs, etc for agentic workflows.

## Deploy

Run commands from the repository root with Node.js, Bash, and pnpm available.

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

Each command also updates the shared references. Deploying Claude instructions also runs `scripts/link-claude-skills.sh`, which symlinks each skill in `~/.agents/skills/` into `~/.claude/skills/` (or `$CLAUDE_CONFIG_DIR/skills/`), since Claude does not read `~/.agents/skills/`. Skills already linked under any name are left alone, and existing entries are never overwritten. Broken links pointing into `~/.agents/skills/` (deleted skills) are removed; other entries are untouched. Despite its name, `pnpm copy:shared:agents` deploys both the shared references and instructions for all three harnesses.

### Skills

```sh
pnpm copy:global:skills
```

The script finds directories containing `SKILL.md` under `skills/` and copies each directory, including its supporting files, into `~/.agents/skills/`. Category directories such as `software/`, `workflow/`, and `learning/` are not included in the destination path.

Before copying, it moves every skill directory in `~/.agents/skills/` to `~/.agents/skills-removed/<timestamp>/` unless the skill is:

- in this repository's `skills/`;
- installed by the Skills CLI (a non-local entry in `~/.agents/.skill-lock.json`); or
- listed in `skills-keep.txt` (one name per line, `#` comments), for skills installed by other tools.

This cleans up renamed or deleted skills. An invalid global lockfile aborts before anything is moved. Delete old backups manually.

### External skills

Local skills are maintained in `skills/`. External skills installed through the [Skills CLI](https://github.com/vercel-labs/skills) are tracked separately in the repository's `.skill-lock.json`.

After adding or removing global skills with the CLI, capture the external dependency list:

```sh
pnpm sync:skills
```

This reads `~/.agents/.skill-lock.json` (version 3) and replaces the repository snapshot with its non-local entries. Local entries, including stale paths to removed skills, and CLI preferences are excluded. Review and commit the snapshot. The global lockfile is not modified. A missing or invalid global lockfile causes an error without replacing the snapshot.

To install the saved external skills on another machine:

```sh
pnpm install:skills
pnpm copy:all
```

`install:skills` invokes `skills@1.9.0` through `pnpm dlx`, installing each saved skill globally for Codex, pi, and Claude. The first run requires network access to fetch the CLI; remote skill sources also require network access and any necessary credentials. The CLI manages the installed files, agent links, and global lockfile; the repository snapshot is never copied over the global lockfile.

Recorded commits or refs are reused when present. Folder hashes alone are not version pins: entries without a commit or ref install the current source version. This is a restorable source list, not a guarantee of byte-for-byte reproducibility.

Both commands are explicit: `copy:all` neither captures nor installs external dependencies. An empty snapshot is valid and installs nothing. Installation stops on the first CLI error; already completed installs are not rolled back. Removing an entry from the snapshot does not uninstall the skill globally.

### Copy behavior

Commands create missing directories and overwrite matching deployed files; unrelated files are preserved, and stale files are not removed (except the skill cleanup above). Back up any customized deployed files before copying.

Shared references and copied local skills always live under `~/.agents`, regardless of harness directory overrides. References left over in `~/.codex/instruction-references/` from the old layout are no longer used and can be archived.

## Tests

```sh
pnpm test
```

Tests use temporary home directories and a stubbed Skills CLI boundary; they do not install skills or change your global setup.
