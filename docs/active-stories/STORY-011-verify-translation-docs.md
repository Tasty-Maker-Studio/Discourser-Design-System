# STORY-011: Verify & Test Figma Translation Doc Suite

> **Epic:** Kai Agent — Design System MCP Integration
> **Depends on:** STORY-006 (all parts complete — files 00-07 must exist)
> **Estimate:** 2-3hr

---

## Context

STORY-006 creates the Figma Translation doc suite. This story verifies it's **accurate, complete, and usable** by both humans and the Kai agent.

A wrong token mapping is worse than no mapping — it produces confidently wrong code. Testing must be thorough and repeatable. These tests become the regression safety net when the design system evolves.

---

## Prerequisites — READ THESE FIRST

1. **All 8 translation MDX files** in `stories/documentation/figma-translation/` — understand what's being tested
2. `panda.config.ts` — source of truth for semantic tokens, recipes, slotRecipes
3. `src/components/index.ts` — source of truth for component exports
4. `src/preset/shadows.ts` — shadow token definitions
5. `src/preset/semantic-tokens.ts` — M3 semantic token definitions
6. `styled-system/tokens/index.mjs` (generated) — the actual token output after `pnpm prepare`

---

## Deliverables

### 1. Token Accuracy Test

**File:** `src/preset/__tests__/translation-token-accuracy.test.ts`

Write a test that:
1. Reads all translation MDX files (01-Colors, 02-Typography, 03-Spacing, 04-Shadows-Radii)
2. Extracts every Discourser token reference from the "Discourser" column of tables using regex
   - Pattern match: `bg="..."`, `color="..."`, `shadow="..."`, `rounded="..."`, `textStyle="..."`, `p="..."`, `gap="..."`, `fontFamily="..."`, `fontWeight="..."`, etc.
   - Also match semantic tokens like `fg.default`, `fg.muted`, `canvas`, `border`, `primary.9`, `surface.container`, etc.
3. Cross-references each extracted token against the actual token configuration:
   - For color tokens: check they exist in `panda.config.ts` semanticTokens.colors or in the Radix scale (primary.1-12, etc.)
   - For shadow tokens: check against `src/preset/shadows.ts`
   - For spacing tokens: check numeric values exist in Panda preset spacing scale
   - For radii tokens: check against semanticTokens.radii (l1, l2, l3) and preset radii
   - For textStyle tokens: check against theme.textStyles in panda.config.ts
4. Reports any token that doesn't resolve with file name and line context

**Approach:** Don't try to import and resolve every token programmatically (that's fragile). Instead:
- Build a known-good token list by reading `panda.config.ts` and preset files
- Parse MDX files as plain text
- Match extracted tokens against the known-good list
- Allow-list common patterns that aren't direct tokens (like numeric spacing values `"4"`, `"6"`, `"8"` which are always valid in Panda)

### 2. Component Completeness Test

**File:** `src/preset/__tests__/translation-component-completeness.test.ts`

Write a test that:
1. Reads `src/components/index.ts` and extracts all exported component names
2. Reads `stories/documentation/figma-translation/05-Components.mdx` as plain text
3. Checks each component name appears as a heading (`### ComponentName`) in the MDX
4. Reports any missing components

**Edge cases to handle:**
- Some exports may be utility types or helpers, not visual components — allow-list these
- Component names might differ slightly (e.g., `switchComponent` in config vs `Switch` in export) — normalize

### 3. MDX Render Verification Script

**File:** `scripts/verify-translation-docs.sh`

```bash
#!/bin/bash
# Quick verification that all translation MDX files exist and Storybook can parse them

# Check all expected files exist
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

# Verify each file exists and has Meta tag
for file in "${EXPECTED_FILES[@]}"; do
  if [ ! -f "$TRANSLATION_DIR/$file" ]; then
    echo "❌ Missing: $TRANSLATION_DIR/$file"
  elif ! grep -q '<Meta title="Documentation/Figma Translation/' "$TRANSLATION_DIR/$file"; then
    echo "⚠️ Missing Meta tag: $TRANSLATION_DIR/$file"
  else
    echo "✅ $file"
  fi
done

# Check table column consistency
echo ""
echo "Checking table column consistency..."
for file in "${EXPECTED_FILES[@]}"; do
  if [ -f "$TRANSLATION_DIR/$file" ]; then
    # Count tables that don't start with Source/Figma/Tailwind in first column
    BAD_TABLES=$(grep -c "^|[^|]*|" "$TRANSLATION_DIR/$file" 2>/dev/null || echo "0")
    echo "  $file: $BAD_TABLES table rows found"
  fi
done
```

Adjust the script to actually validate — the above is a starting point. The real value is:
- File existence check
- Meta tag presence
- Could extend to Storybook build test: `pnpm build-storybook 2>&1 | grep -i error`

### 4. Cross-Reference Integrity Check

Add to the token accuracy test (or separate test):
- Extract all cross-reference links from translation MDX files
- Verify the referenced page titles exist in Storybook (check that the target MDX files exist in the expected paths)
- Example: A link to "Guidelines/99-Button" should verify `stories/documentation/guidelines/components/button.mdx` exists

### 5. Regression Documentation

Add a section to `07-ExtensionGuide.mdx` (if not already there from STORY-006c):

```markdown
## Running Verification Tests

After any design system change, run:

\`\`\`bash
# Full verification suite
pnpm test -- --grep translation

# Quick file/structure check
bash scripts/verify-translation-docs.sh

# Full Storybook build (catches MDX parse errors)
pnpm build-storybook
\`\`\`

### When to Run
- After adding/removing components from `src/components/index.ts`
- After changing semantic tokens in `panda.config.ts`
- After modifying recipes or slotRecipes
- After running `pnpm prepare` if token output changes
- Before any design system version release
```

---

## Technical Requirements

1. Tests must use `vitest` (or whatever test runner the project uses — check `package.json`)
2. MDX parsing should be plain text regex, NOT a full MDX parser — keep it simple and dependency-free
3. Token validation should be generous — allow numeric spacing values, allow Panda preset tokens, only flag things that clearly don't exist
4. All tests should have descriptive failure messages: "Token 'bg.nonexistent' referenced in 01-Colors.mdx does not exist in token configuration"
5. Tests should be runnable independently: `pnpm test -- --grep translation`

---

## DO NOT

- Modify the translation MDX files (only create test files and scripts)
- Install new test dependencies — use existing test infrastructure
- Make the tests so strict they break on every minor formatting change
- Test MDX rendering directly (that's what `pnpm build-storybook` is for)

---

## Acceptance Criteria

- [ ] `translation-token-accuracy.test.ts` — parses MDX, extracts tokens, validates against config
- [ ] `translation-component-completeness.test.ts` — checks every exported component has a mapping entry
- [ ] `scripts/verify-translation-docs.sh` — quick structure/existence check
- [ ] Cross-reference integrity verified (links to guideline MDX files resolve)
- [ ] All tests pass on current translation doc suite
- [ ] Tests produce clear failure messages identifying file, line, and problem
- [ ] Regression process documented in `07-ExtensionGuide.mdx`
- [ ] Tests runnable via `pnpm test -- --grep translation`
- [ ] No new dependencies installed
