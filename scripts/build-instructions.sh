#!/usr/bin/env bash

set -euo pipefail

trap 'echo "❌ Error: failed to build the instructions bundle" >&2' ERR

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_ROOT="$PROJECT_ROOT/dist/"

SOURCE_SKILLS_DIR="$PROJECT_ROOT"/skills

if [[ ! -d "$SOURCE_SKILLS_DIR" ]]; then
  echo "ERROR: missing skills directory at $SOURCE_SKILLS_DIR" >&2
  exit 1
fi

rm -rf "$DIST_ROOT"

mkdir "$DIST_ROOT"

cp -r "$SOURCE_SKILLS_DIR" "$DIST_ROOT/skills"

echo "✅ Instruction bundle built."
exit 0
