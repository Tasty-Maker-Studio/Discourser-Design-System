#!/bin/bash
# Backup and Prepare for figma-token-sync Export Test
# Run this before exporting from Figma

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOKENS_DIR="$SCRIPT_DIR/../tokens"
BACKUP_DIR="$TOKENS_DIR/backup-$(date +%Y%m%d-%H%M%S)"

echo "🔄 Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

echo ""
echo "📦 Backing up ALL token files..."

# Backup root-level generated files
if [ -f "$TOKENS_DIR/tokens.json" ]; then
  cp "$TOKENS_DIR/tokens.json" "$BACKUP_DIR/"
  echo "  ✓ tokens.json"
fi

if [ -f "$TOKENS_DIR/primitives-generated.json" ]; then
  cp "$TOKENS_DIR/primitives-generated.json" "$BACKUP_DIR/"
  echo "  ✓ primitives-generated.json"
fi

if [ -f "$TOKENS_DIR/semantic-light-generated.json" ]; then
  cp "$TOKENS_DIR/semantic-light-generated.json" "$BACKUP_DIR/"
  echo "  ✓ semantic-light-generated.json"
fi

if [ -f "$TOKENS_DIR/semantic-dark-generated.json" ]; then
  cp "$TOKENS_DIR/semantic-dark-generated.json" "$BACKUP_DIR/"
  echo "  ✓ semantic-dark-generated.json"
fi

# Backup subdirectory files
if [ -f "$TOKENS_DIR/primitives/colors.json" ]; then
  mkdir -p "$BACKUP_DIR/primitives"
  cp "$TOKENS_DIR/primitives/colors.json" "$BACKUP_DIR/primitives/"
  echo "  ✓ primitives/colors.json"
fi

if [ -f "$TOKENS_DIR/semantic/colors.light.json" ]; then
  mkdir -p "$BACKUP_DIR/semantic"
  cp "$TOKENS_DIR/semantic/colors.light.json" "$BACKUP_DIR/semantic/"
  echo "  ✓ semantic/colors.light.json"
fi

if [ -f "$TOKENS_DIR/semantic/colors.dark.json" ]; then
  mkdir -p "$BACKUP_DIR/semantic"
  cp "$TOKENS_DIR/semantic/colors.dark.json" "$BACKUP_DIR/semantic/"
  echo "  ✓ semantic/colors.dark.json"
fi

echo ""
echo "✅ Backup complete!"
echo ""
echo "📊 Files backed up to:"
echo "   $BACKUP_DIR"
echo ""
echo "📋 Next steps:"
echo ""
echo "   1. Open Figma and run the figma-token-sync plugin"
echo ""
echo "   2. Click 'Export Variables' button"
echo ""
echo "   3. The plugin will download files - save them to:"
echo "      $TOKENS_DIR"
echo ""
echo "      Expected export files:"
echo "      • primitives-colors.json"
echo "      • semantic-colors.json"
echo ""
echo "   4. After export, run comparison:"
echo "      cd $(dirname $TOKENS_DIR)"
echo "      ./scripts/compare-exports.sh"
echo ""