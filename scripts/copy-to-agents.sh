#!/usr/bin/env bash

set -euo pipefail

trap 'echo "❌ Error: failed to copy files" >&2' ERR

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

SOURCE_DIR="$PROJECT_ROOT/dist/skills/pl-guidelines"
TARGET_DIR=~/.agents/skills

if [[ -d "$TARGET_DIR/pl-guidelines" ]]; then
  echo "info: pl-agents skill exists in $TARGET_DIR. Removing before copy."
  echo ""
fi

cp -r "$SOURCE_DIR" "$TARGET_DIR"

echo "✅ Instructions copied successfully to ~/.agents/skills."
exit 0
