#!/usr/bin/env bash

set -euo pipefail

trap 'echo "❌ Error: failed to copy instructions" >&2' ERR

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HARNESS="${1:-all}"
SHARED_DIR="$HOME/.agents/instruction-references"
CODEX_DIR="${CODEX_HOME:-$HOME/.codex}"
PI_DIR="${PI_CODING_AGENT_DIR:-$HOME/.pi/agent}"

if [[ $# -gt 1 ]]; then
  echo "Usage: bash $0 [codex|pi|all]" >&2
  exit 1
fi

case "$HARNESS" in
  codex|pi|all) ;;
  *)
    echo "Usage: bash $0 [codex|pi|all]" >&2
    exit 1
    ;;
esac

mkdir -p "$SHARED_DIR"
cp -R "$PROJECT_ROOT/instructions/instruction-references/." "$SHARED_DIR/"
echo "✓ Shared references copied to $SHARED_DIR"

if [[ "$HARNESS" == codex || "$HARNESS" == all ]]; then
  mkdir -p "$CODEX_DIR"
  cp "$PROJECT_ROOT/instructions/AGENTS.md" "$CODEX_DIR/AGENTS.md"
  echo "✓ Codex instructions copied to $CODEX_DIR/AGENTS.md"
fi

if [[ "$HARNESS" == pi || "$HARNESS" == all ]]; then
  mkdir -p "$PI_DIR"
  cp "$PROJECT_ROOT/instructions/AGENTS.md" "$PI_DIR/AGENTS.md"
  echo "✓ Pi instructions copied to $PI_DIR/AGENTS.md"
fi
