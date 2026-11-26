#!/usr/bin/env bash

# Copies repo skills into ~/.agents/skills. Before copying, moves out every installed skill that is not
# in the repo, not installed by the Skills CLI (non-local entries in ~/.agents/.skill-lock.json), and not
# listed in skills-keep.txt. Moved skills go to ~/.agents/skills-removed/<timestamp>/.

set -euo pipefail

trap 'echo "❌ Error: failed to copy files" >&2' ERR

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$HOME/.agents/skills"
GLOBAL_LOCK="$HOME/.agents/.skill-lock.json"
KEEP_FILE="$PROJECT_ROOT/skills-keep.txt"
BACKUP_DIR="$HOME/.agents/skills-removed/$(date +%Y%m%d-%H%M%S)"

mkdir -p "$TARGET_DIR"

repo_skills="$(find "$PROJECT_ROOT/skills" -type f -name 'SKILL.md' -exec dirname {} \; | sort)"

cli_skills=""
if [[ -f "$GLOBAL_LOCK" ]]; then
  cli_skills="$(node -e '
    const lock = JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8"));
    if (!lock.skills || typeof lock.skills !== "object") throw new Error("Invalid lockfile: " + process.argv[1]);
    for (const [name, entry] of Object.entries(lock.skills)) if (entry.sourceType !== "local") console.log(name);
  ' "$GLOBAL_LOCK")"
fi

keep_skills=""
if [[ -f "$KEEP_FILE" ]]; then
  keep_skills="$(sed -e 's/#.*//' -e 's/[[:space:]]//g' "$KEEP_FILE" | grep -v '^$' || true)"
fi

allowed="$(printf '%s\n%s\n%s\n' "$(xargs -n1 basename <<<"$repo_skills")" "$cli_skills" "$keep_skills")"

for entry in "$TARGET_DIR"/*; do
  [[ -d "$entry" ]] || continue

  name="$(basename "$entry")"
  grep -qxF "$name" <<<"$allowed" && continue

  mkdir -p "$BACKUP_DIR"
  mv "$entry" "$BACKUP_DIR/"
  echo "✓ Moved $name to $BACKUP_DIR"
done

while IFS= read -r dir; do
  [[ -n "$dir" ]] || continue
  echo "Copying $dir into $TARGET_DIR"
  cp -R -f "$dir" "$TARGET_DIR"
done <<<"$repo_skills"

echo "✓ Copy successful!"
