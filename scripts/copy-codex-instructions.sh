#!/usr/bin/env bash

# Copies AGENTS.md to CODEX root.

set -euo pipefail

trap 'echo "❌ Error: failed to copy files" >&2' ERR

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$HOME/.codex"

echo Copying Codex instructions into ~/.codex

cp -R $PROJECT_ROOT/instructions/* $TARGET_DIR

echo ✓ Copy successful!
exit 0
