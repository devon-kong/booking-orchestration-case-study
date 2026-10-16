#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v mmdc >/dev/null || { echo 'Mermaid CLI is required; install an approved version before rendering.' >&2; exit 1; }
for source in diagrams/source/*.mmd; do
  name="$(basename "$source" .mmd)"
  mmdc -i "$source" -o "diagrams/rendered/$name.svg" -c diagrams/render-config.json -w 1600 -b white
  mmdc -i "$source" -o "diagrams/rendered/$name.png" -c diagrams/render-config.json -w 1600 -s 2 -b white
done
