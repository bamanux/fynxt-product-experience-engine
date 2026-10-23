#!/bin/sh
# Installs the FYNXT Claude Code login lock on a Mac. Run by IT/admin:  sudo sh install-macos.sh
# Prefer pushing the same JSON through MDM (configuration profile domain com.anthropic.claudecode).
set -eu
SRC="$(cd "$(dirname "$0")" && pwd)/managed-settings.json"
DEST_DIR="/Library/Application Support/ClaudeCode"
if grep -q "REPLACE-WITH-FYNXT-ORG-UUID" "$SRC"; then
  echo "Edit managed-settings.json first: set the FYNXT org UUID (claude.ai/admin-settings/organization)." >&2
  exit 1
fi
mkdir -p "$DEST_DIR"
install -m 0644 -o root -g wheel "$SRC" "$DEST_DIR/managed-settings.json"
echo "Installed $DEST_DIR/managed-settings.json — restart VS Code / Claude Code, then run /status to confirm."
