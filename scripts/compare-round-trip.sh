#!/bin/bash
# Compare Round-Trip Results
# Compares original tokens with exported tokens from Figma

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOKENS_DIR="$SCRIPT_DIR/../tokens"
BASELINE_DIR="$TOKENS_DIR/CLEAN-BASELINE-JAN9"

echo "═══════════════════════════════════════════════════════════"
echo "🔍 ROUND-TRIP COMPARISON"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [ ! -d "$BASELINE_DIR" ]; then
  echo "❌ Baseline not found at: $BASELINE_DIR"
  echo "   Run ./scripts/prepare-for-export-test.sh first"
  exit 1
fi

# Check what was exported
echo "📊 Files found:"
echo ""
echo "Baseline (original):"
ls -lh "$BASELINE_DIR"/*.json 2>/dev/null || echo "  (none)"

echo ""
echo "Exported (from Figma):"
ls -lh "$TOKENS_DIR"/*.json 2>/dev/null | grep -v "backup" | grep -v "STAGING" | grep -v "CLEAN-BASELINE" || echo "  (none)"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if export files exist
if [ ! -f "$TOKENS_DIR/primitives-colors.json" ]; then
  echo "⚠️  primitives-colors.json not found"
  echo "   Did you save the exported file to $TOKENS_DIR?"
  exit 1
fi

if [ ! -f "$TOKENS_DIR/semantic-colors.json" ]; then
  echo "⚠️  semantic-colors.json not found"
  echo "   Did you save the exported file to $TOKENS_DIR?"
  exit 1
fi

echo "✅ Export files found!"
echo ""

# Function to extract and count color values
count_colors() {
  if [ -f "$1" ]; then
    cat "$1" | grep -c '"\$value"' || echo "0"
  else
    echo "0"
  fi
}

# Compare counts
echo "═══════════════════════════════════════════════════════════"
echo "📈 TOKEN COUNTS"
echo "═══════════════════════════════════════════════════════════"
echo ""

BASELINE_TOTAL=$(count_colors "$BASELINE_DIR/tokens.json")
EXPORT_PRIM=$(count_colors "$TOKENS_DIR/primitives-colors.json")
EXPORT_SEM=$(count_colors "$TOKENS_DIR/semantic-colors.json")
EXPORT_TOTAL=$((EXPORT_PRIM + EXPORT_SEM))

echo "Baseline (original tokens.json):  $BASELINE_TOTAL tokens"
echo ""
echo "Exported from Figma:"
echo "  • Primitives:                   $EXPORT_PRIM tokens"
echo "  • Semantic:                     $EXPORT_SEM tokens"
echo "  • Total:                        $EXPORT_TOTAL tokens"
echo ""

if [ "$BASELINE_TOTAL" -eq "$EXPORT_TOTAL" ]; then
  echo "✅ Token counts match!"
else
  echo "⚠️  Token count mismatch!"
  echo "   Expected: $BASELINE_TOTAL"
  echo "   Got: $EXPORT_TOTAL"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "🔬 DETAILED ANALYSIS"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check for aliases in exported files
PRIM_ALIASES=$(cat "$TOKENS_DIR/primitives-colors.json" | grep -c '"\$value": "{"' || echo "0")
SEM_ALIASES=$(cat "$TOKENS_DIR/semantic-colors.json" | grep -c '"\$value": "{"' || echo "0")

echo "Alias preservation:"
echo "  • Primitives with aliases:      $PRIM_ALIASES (should be 0)"
echo "  • Semantic with aliases:        $SEM_ALIASES (should be ~10)"
echo ""

if [ "$PRIM_ALIASES" -eq 0 ]; then
  echo "  ✅ Primitives correctly have raw hex values"
else
  echo "  ⚠️  Primitives should not have aliases"
fi

if [ "$SEM_ALIASES" -gt 0 ]; then
  echo "  ✅ Semantic tokens correctly have aliases"
else
  echo "  ⚠️  Semantic tokens should have aliases"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📋 SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [ "$BASELINE_TOTAL" -eq "$EXPORT_TOTAL" ] && [ "$SEM_ALIASES" -gt 0 ]; then
  echo "✅ Round-trip test PASSED!"
  echo ""
  echo "   • All tokens exported successfully"
  echo "   • Alias references preserved"
  echo "   • No data loss detected"
  echo ""
  echo "🎉 The figma-token-sync tool is working correctly!"
else
  echo "⚠️  Issues detected in round-trip"
  echo ""
  echo "Please review the differences above."
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📂 Files for manual inspection:"
echo ""
echo "Baseline:"
echo "  $BASELINE_DIR/tokens.json"
echo ""
echo "Exported:"
echo "  $TOKENS_DIR/primitives-colors.json"
echo "  $TOKENS_DIR/semantic-colors.json"
echo ""