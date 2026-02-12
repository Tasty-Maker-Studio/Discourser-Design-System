#!/bin/bash
# Quick verification that all translation MDX files exist and are properly structured
# Usage: bash scripts/verify-translation-docs.sh

set -e  # Exit on error

TRANSLATION_DIR="stories/documentation/figma-translation"
EXPECTED_FILES=(
  "00-FigmaTranslation.mdx"
  "01-Colors.mdx"
  "02-Typography.mdx"
  "03-Spacing.mdx"
  "04-Shadows-Radii.mdx"
  "05-Components.mdx"
  "06-Layout.mdx"
  "07-ExtensionGuide.mdx"
)

echo "========================================="
echo "Figma Translation Documentation Verification"
echo "========================================="
echo ""

# Check all expected files exist and have Meta tags
echo "📁 Checking file existence and structure..."
echo ""

MISSING_FILES=0
MISSING_META=0
FILES_OK=0

for file in "${EXPECTED_FILES[@]}"; do
  if [ ! -f "$TRANSLATION_DIR/$file" ]; then
    echo "❌ Missing: $TRANSLATION_DIR/$file"
    ((MISSING_FILES++))
  elif ! grep -q '<Meta title="Documentation/Figma Translation/' "$TRANSLATION_DIR/$file"; then
    echo "⚠️  Missing Meta tag: $file"
    ((MISSING_META++))
  else
    echo "✅ $file"
    ((FILES_OK++))
  fi
done

echo ""
echo "========================================="
echo "📊 Summary:"
echo "  ✅ Files OK: $FILES_OK / ${#EXPECTED_FILES[@]}"

if [ $MISSING_FILES -gt 0 ]; then
  echo "  ❌ Missing files: $MISSING_FILES"
fi

if [ $MISSING_META -gt 0 ]; then
  echo "  ⚠️  Missing Meta tags: $MISSING_META"
fi

echo "========================================="
echo ""

# Check table structure consistency
echo "📋 Checking table column consistency..."
echo ""

for file in "${EXPECTED_FILES[@]}"; do
  if [ -f "$TRANSLATION_DIR/$file" ]; then
    # Count table rows (lines starting with |)
    TABLE_ROWS=$(grep -c "^|" "$TRANSLATION_DIR/$file" 2>/dev/null || echo "0")

    # Count tables that appear to have "Source" as first column
    SOURCE_TABLES=$(grep -c "^| Source" "$TRANSLATION_DIR/$file" 2>/dev/null || echo "0")

    # Count tables with "Figma" or "Tailwind" or "Shadcn" in first column
    EXTERNAL_REF_TABLES=$(grep -cE "^\\| .*(?:Figma|Tailwind|Shadcn)" "$TRANSLATION_DIR/$file" 2>/dev/null || echo "0")

    if [ "$TABLE_ROWS" -gt 0 ]; then
      echo "  $file: $TABLE_ROWS table rows, $SOURCE_TABLES with 'Source' header"
    fi
  fi
done

echo ""
echo "========================================="
echo "🔗 Checking for common mistakes..."
echo ""

# Check for phantom tokens (bg.default, bg.muted, primary.contrast)
PHANTOM_TOKENS_FOUND=0

for file in "${EXPECTED_FILES[@]}"; do
  if [ -f "$TRANSLATION_DIR/$file" ]; then
    # Check for bg.default
    if grep -q 'bg\.default' "$TRANSLATION_DIR/$file" 2>/dev/null; then
      echo "⚠️  Found 'bg.default' in $file (should be 'surface.container')"
      ((PHANTOM_TOKENS_FOUND++))
    fi

    # Check for bg.muted
    if grep -q 'bg\.muted' "$TRANSLATION_DIR/$file" 2>/dev/null; then
      echo "⚠️  Found 'bg.muted' in $file (should be 'surface.container.low')"
      ((PHANTOM_TOKENS_FOUND++))
    fi

    # Check for primary.contrast or secondary.contrast
    if grep -qE '(primary|secondary)\.contrast' "$TRANSLATION_DIR/$file" 2>/dev/null; then
      echo "⚠️  Found 'primary.contrast' or 'secondary.contrast' in $file (should be 'onM3Primary' / 'onM3Secondary')"
      ((PHANTOM_TOKENS_FOUND++))
    fi
  fi
done

if [ $PHANTOM_TOKENS_FOUND -eq 0 ]; then
  echo "✅ No phantom tokens found"
fi

echo ""
echo "========================================="
echo "📝 Recommendations:"
echo ""

if [ $MISSING_FILES -gt 0 ] || [ $MISSING_META -gt 0 ]; then
  echo "  • Fix missing files or Meta tags before proceeding"
fi

if [ $PHANTOM_TOKENS_FOUND -gt 0 ]; then
  echo "  • Fix phantom tokens using correct M3 semantic tokens"
fi

echo "  • Run full test suite: pnpm test -- --grep translation"
echo "  • Build Storybook to verify MDX parsing: pnpm build-storybook"
echo ""

# Exit with error if any problems found
if [ $MISSING_FILES -gt 0 ] || [ $MISSING_META -gt 0 ] || [ $PHANTOM_TOKENS_FOUND -gt 0 ]; then
  echo "❌ Verification failed with errors"
  exit 1
else
  echo "✅ All checks passed!"
  exit 0
fi
