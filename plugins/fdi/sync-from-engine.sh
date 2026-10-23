#!/bin/sh
# Rebuilds the plugin's agent + commands from the engine's .claude/ (the source of truth),
# then bumps nothing — bump .claude-plugin/plugin.json "version" yourself before publishing.
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
ENGINE="$(cd "$HERE/../.." && pwd)"
cp "$ENGINE/.claude/agents/fdi.md" "$HERE/agents/fdi.md"
for f in "$ENGINE"/.claude/commands/fdi-*.md; do cp "$f" "$HERE/commands/"; done
echo "Synced agent + $(ls "$HERE"/commands | wc -l | tr -d ' ') commands from $ENGINE/.claude"
