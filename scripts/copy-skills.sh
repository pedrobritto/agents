#!/usr/bin/env bash

set -euo pipefail

trap 'echo "❌ Error: failed to copy files" >&2' ERR

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$HOME/.agents/skills"

mkdir -p $TARGET_DIR

find ./skills -type f -name 'SKILL.md' -exec dirname {} \; |
	while IFS= read -r dir; do
		[ -n "$dir" ] || continue
		echo Copying $dir into $TARGET_DIR
		cp -R -f "$dir" $TARGET_DIR
	done

exit 0
