#!/usr/bin/env bash

# Claude Code does not read ~/.agents/skills, so symlink each skill into Claude's skills directory.
# Skills already linked under any name (e.g. my-code-review -> code-review) are left alone.
# Broken links into ~/.agents/skills (deleted skills) are removed.

set -euo pipefail

SOURCE_DIR="$HOME/.agents/skills"
CLAUDE_SKILLS_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/skills"

[[ -d "$SOURCE_DIR" ]] || exit 0

mkdir -p "$CLAUDE_SKILLS_DIR"

source_path="$(cd -P "$SOURCE_DIR" && pwd)"

# Remove broken links into SOURCE_DIR left behind by deleted skills; other broken links are not ours.
for entry in "$CLAUDE_SKILLS_DIR"/*; do
  [[ -L "$entry" && ! -e "$entry" ]] || continue

  target="$(readlink "$entry")"
  [[ "$target" == /* ]] || target="$CLAUDE_SKILLS_DIR/$target"
  target_parent="$(cd -P "$(dirname "$target")" 2>/dev/null && pwd)" || continue

  if [[ "$target_parent" == "$source_path" ]]; then
    rm "$entry"
    echo "✓ Removed stale link $(basename "$entry")"
  fi
done

linked_targets=""

for entry in "$CLAUDE_SKILLS_DIR"/*; do
  [[ -L "$entry" && -d "$entry" ]] || continue
  linked_targets+="$(cd -P "$entry" && pwd)"$'\n'
done

for skill_dir in "$SOURCE_DIR"/*/; do
  [[ -f "$skill_dir/SKILL.md" ]] || continue

  skill_path="$(cd -P "$skill_dir" && pwd)"
  name="$(basename "$skill_path")"
  link="$CLAUDE_SKILLS_DIR/$name"

  if grep -qxF "$skill_path" <<<"$linked_targets"; then
    continue
  fi

  if [[ -e "$link" || -L "$link" ]]; then
    echo "⚠ Skipping $name: $link already exists" >&2
    continue
  fi

  ln -s "$skill_path" "$link"
  echo "✓ Linked $name into $CLAUDE_SKILLS_DIR"
done
