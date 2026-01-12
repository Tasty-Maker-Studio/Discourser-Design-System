#!/bin/bash
# Compare figma-token-sync export with design-language-to-dtcg generated files

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOKENS_DIR="$SCRIPT_DIR/../tokens"

# Find most recent backup
BACKUP_DIR=$(find "$TOKENS_DIR" -maxdepth 1 -type d -name "backup-*" | sort -r | head -1)

if [ -z "$BACKUP_DIR" ]; then
  echo "❌ No backup directory found!"
  echo "   Run ./scripts/backup-and-prepare-for-export.sh first"
  exit 1
fi

echo "📊 Comparing exports..."
echo ""
echo "Backup directory: $BACKUP_DIR"
echo "Current directory: $TOKENS_DIR"
echo ""

# Function to count tokens in a JSON file
count_tokens() {
  if [ -f "$1" ]; then
    # Count top-level keys (excluding $schema)
    cat "$1" | jq 'del(."$schema") | keys | length' 2>/dev/null || echo "0"
  else
    echo "0"
  fi
}

# Compare primitives
echo "=== PRIMITIVES ==="
BACKUP_PRIM_COUNT=$(count_tokens "$BACKUP_DIR/primitives-generated.json")
EXPORT_PRIM_COUNT=$(count_tokens "$TOKENS_DIR/primitives-colors.json")

echo "  Backup (generated):    $BACKUP_PRIM_COUNT palettes"
echo "  Export (figma-sync):   $EXPORT_PRIM_COUNT palettes"

if [ "$BACKUP_PRIM_COUNT" == "$EXPORT_PRIM_COUNT" ]; then
  echo "  ✅ Token count matches!"
else
  echo "  ⚠️  Token count mismatch!"
fi
echo ""

# Compare semantic
echo "=== SEMANTIC (LIGHT) ==="
BACKUP_SEM_COUNT=$(count_tokens "$BACKUP_DIR/semantic-light-generated.json")
EXPORT_SEM_COUNT=$(count_tokens "$TOKENS_DIR/semantic-colors.json")

echo "  Backup (generated):    $BACKUP_SEM_COUNT tokens"
echo "  Export (figma-sync):   $EXPORT_SEM_COUNT tokens"

if [ "$BACKUP_SEM_COUNT" == "$EXPORT_SEM_COUNT" ]; then
  echo "  ✅ Token count matches!"
else
  echo "  ⚠️  Token count mismatch!"
fi
echo ""

# Check for differences in values (ignoring extensions)
echo "=== VALUE COMPARISON ==="

if [ -f "$BACKUP_DIR/primitives-generated.json" ] && [ -f "$TOKENS_DIR/primitives-colors.json" ]; then
  echo "  Checking primitive values..."

  # Extract just the $value fields and compare
  BACKUP_VALUES=$(cat "$BACKUP_DIR/primitives-generated.json" | jq 'walk(if type == "object" and has("$value") then ."$value" else . end)' | sort)
  EXPORT_VALUES=$(cat "$TOKENS_DIR/primitives-colors.json" | jq 'walk(if type == "object" and has("$value") then ."$value" else . end)' | sort)

  if [ "$BACKUP_VALUES" == "$EXPORT_VALUES" ]; then
    echo "  ✅ All primitive values match!"
  else
    echo "  ⚠️  Some primitive values differ"
    echo "  Run: diff <(cat $BACKUP_DIR/primitives-generated.json | jq .) <(cat $TOKENS_DIR/primitives-colors.json | jq .)"
  fi
fi
echo ""

echo "✅ Comparison complete!"
echo ""
echo "📋 Files compared:"
echo "  Backup:  $BACKUP_DIR"
echo "  Export:  $TOKENS_DIR"
echo ""