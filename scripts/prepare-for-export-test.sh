#!/bin/bash
# Prepare for Export Test
# Run this AFTER importing to Figma, BEFORE exporting back

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOKENS_DIR="$SCRIPT_DIR/../tokens"

echo "🔄 Preparing for export test..."
echo ""

# Step 1: Create clean baseline if it doesn't exist
if [ ! -d "$TOKENS_DIR/CLEAN-BASELINE-JAN9" ]; then
  echo "📦 Creating CLEAN-BASELINE-JAN9..."
  mkdir -p "$TOKENS_DIR/CLEAN-BASELINE-JAN9"

  if [ -f "$TOKENS_DIR/tokens.json" ]; then
    cp "$TOKENS_DIR/tokens.json" "$TOKENS_DIR/CLEAN-BASELINE-JAN9/"
    echo "  ✓ Backed up tokens.json"
  fi

  if [ -f "$TOKENS_DIR/primitives-generated.json" ]; then
    cp "$TOKENS_DIR/primitives-generated.json" "$TOKENS_DIR/CLEAN-BASELINE-JAN9/"
  fi

  if [ -f "$TOKENS_DIR/semantic-light-generated.json" ]; then
    cp "$TOKENS_DIR/semantic-light-generated.json" "$TOKENS_DIR/CLEAN-BASELINE-JAN9/"
  fi

  if [ -f "$TOKENS_DIR/semantic-dark-generated.json" ]; then
    cp "$TOKENS_DIR/semantic-dark-generated.json" "$TOKENS_DIR/CLEAN-BASELINE-JAN9/"
  fi
else
  echo "✓ CLEAN-BASELINE-JAN9 already exists"
fi

echo ""

# Step 2: Move current files to staging
echo "📦 Moving current files to staging area..."
mkdir -p "$TOKENS_DIR/STAGING-BEFORE-EXPORT"

if [ -f "$TOKENS_DIR/tokens.json" ]; then
  mv "$TOKENS_DIR/tokens.json" "$TOKENS_DIR/STAGING-BEFORE-EXPORT/"
  echo "  ✓ Moved tokens.json to staging"
fi

if [ -f "$TOKENS_DIR/primitives-generated.json" ]; then
  mv "$TOKENS_DIR/primitives-generated.json" "$TOKENS_DIR/STAGING-BEFORE-EXPORT/"
  echo "  ✓ Moved primitives-generated.json to staging"
fi

if [ -f "$TOKENS_DIR/semantic-light-generated.json" ]; then
  mv "$TOKENS_DIR/semantic-light-generated.json" "$TOKENS_DIR/STAGING-BEFORE-EXPORT/"
  echo "  ✓ Moved semantic-light-generated.json to staging"
fi

if [ -f "$TOKENS_DIR/semantic-dark-generated.json" ]; then
  mv "$TOKENS_DIR/semantic-dark-generated.json" "$TOKENS_DIR/STAGING-BEFORE-EXPORT/"
  echo "  ✓ Moved semantic-dark-generated.json to staging"
fi

echo ""
echo "✅ Ready for export test!"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📋 NEXT STEPS:"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "1. Open Figma with your imported variables (146 variables)"
echo ""
echo "2. Run figma-token-sync plugin:"
echo "   • Plugins → Development → figma-token-sync"
echo "   • Click 'Export' button"
echo "   • Plugin will download 2 files:"
echo ""
echo "3. Save the exported files to:"
echo "   $TOKENS_DIR"
echo ""
echo "   Expected files:"
echo "   • primitives-colors.json"
echo "   • semantic-colors.json"
echo ""
echo "4. After export completes, run:"
echo "   ./scripts/compare-round-trip.sh"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📊 Baseline saved at:"
echo "   $TOKENS_DIR/CLEAN-BASELINE-JAN9/"
echo ""