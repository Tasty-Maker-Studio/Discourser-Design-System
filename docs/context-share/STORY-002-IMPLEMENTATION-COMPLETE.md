# STORY-002: Shadow Token Architecture Fix — COMPLETE ✅

## Summary
Successfully unified the shadow token system by chaining semantic tokens (xs-2xl) to M3 base tokens (level0-5), eliminating the parallel Park UI shadow system.

## Changes Implemented

### 1. `src/preset/shadows.ts` ✅
**Before:** Independent Park UI shadow values with hardcoded colors
```ts
xs: { value: { base: '0px 1px 2px {colors.neutral.a6}...' } }
sm: { value: { base: '0px 2px 4px {colors.neutral.a4}...' } }
```

**After:** Semantic tokens chained to M3 base tokens
```ts
xs: { value: '{shadows.level1}' }
sm: { value: '{shadows.level2}' }
md: { value: '{shadows.level3}' }
lg: { value: '{shadows.level4}' }
xl: { value: '{shadows.level5}' }
'2xl': { value: '{shadows.level5}' }
```

**Result:** Semantic tokens now reference base M3 elevation values, creating proper token chain.

### 2. `src/preset/recipes/button.ts` ✅
**Changes:** Switched from base tokens to semantic tokens (3 lines)
- Line 108: `boxShadow: 'level2'` → `boxShadow: 'sm'`
- Line 112: `boxShadow: 'level3'` → `boxShadow: 'md'`
- Line 115: `boxShadow: 'level1'` → `boxShadow: 'xs'`

**Result:** Button recipe now uses semantic tokens consistently with other components.

### 3. `src/stories/foundations/Elevation.mdx` ✅
**Added:** Three-layer architecture explanation
- Layer 1: Base tokens (level0-5) from M3 spec
- Layer 2: Semantic tokens (xs-2xl) referencing base tokens
- Layer 3: Component usage with semantic tokens only

**Updated:** All code examples to use semantic tokens
- Interactive states: `level1`/`level2` → `xs`/`sm`
- Basic elevation: `level1` → `xs`
- Interactive button: `level1`/`level2`/`level3` → `xs`/`sm`/`md`
- Modal overlay: `level3` → `md`

## Verification Results

### ✅ Build Successful
```bash
$ pnpm build:panda
✔️ styled-system/css
✔️ styled-system/tokens
✔️ styled-system/patterns
✔️ styled-system/recipes
✔️ styled-system/jsx
```

### ✅ No Base Tokens in Recipes
```bash
$ grep -r "boxShadow: 'level" src/preset/recipes/
# Returns: 0 results ✓
```

### ✅ Files Unchanged (as required)
- `src/languages/transform.ts` — Line 27 still registers shadows from elevation.levels
- `src/languages/material3.language.ts` — elevation.levels (level0-5) unchanged
- `src/preset/shadows.ts` — inset token preserved (lines 30-35)
- DesignLanguageContract — No changes
- DTCG scripts/pipeline — No changes

## Components Requiring Visual Verification

**15 components use shadows** and should be verified in Storybook (light + dark themes):

1. **button** — Uses xs/sm/md (elevated variant)
2. **card** — Uses lg
3. **dialog** — Uses lg
4. **drawer** — Uses lg
5. **input** — Uses custom shadow (unchanged)
6. **popover** — Uses lg
7. **radio-group** — Uses custom inset shadow (unchanged)
8. **select** — Uses md
9. **skeleton** — Uses none (unchanged)
10. **slider** — Uses xs
11. **switch** — Uses xs
12. **tabs** — Uses custom inset shadow (unchanged)
13. **textarea** — Uses custom shadow (unchanged)
14. **toast** — Uses lg
15. **tooltip** — Uses sm

### Visual Check Instructions
```bash
pnpm dev  # Start Storybook at localhost:6006
```

For each component above:
1. Open component story in Storybook
2. Check light theme — shadows should match M3 elevation levels
3. Check dark theme — shadows should match M3 elevation levels
4. Verify interactive states (hover/active) show appropriate shadow changes

## Token Architecture Flow

```
Material3Language (material3.language.ts)
  ↓
elevation.levels.level0-5  (M3 shadow values)
  ↓
transform.ts (line 27: shadows: objectToTokens(language.elevation.levels))
  ↓
Base Tokens (level0-5 registered in Panda)
  ↓
shadows.ts (semantic tokens reference base tokens)
  ↓
Semantic Tokens (xs→level1, sm→level2, md→level3, lg→level4, xl/2xl→level5)
  ↓
Component Recipes (button, card, dialog, etc.)
  ↓
React Components
```

## Acceptance Criteria Status

| # | Criterion | Status |
|---|-----------|--------|
| 1 | shadows.ts updated with token references | ✅ Complete |
| 2 | inset token unchanged | ✅ Verified |
| 3 | Button recipe updated (level→semantic) | ✅ Complete |
| 4 | grep -r "boxShadow: 'level" returns 0 | ✅ Verified |
| 5 | transform.ts UNCHANGED | ✅ Verified |
| 6 | DesignLanguageContract UNCHANGED | ✅ Verified |
| 7 | DTCG scripts UNCHANGED | ✅ Verified |
| 8 | pnpm build:panda succeeds | ✅ Passed |
| 9 | Visual regression check needed | ⏳ Pending user verification |
| 10 | Elevation.mdx updated | ✅ Complete |

## Next Steps

1. **User Action Required:** Run `pnpm dev` and perform visual verification of all 15 components listed above
2. Test in both light and dark themes
3. Verify interactive states (hover, active) show proper elevation changes
4. Once verified, commit changes with message:
   ```
   fix: unify shadow token architecture - chain semantic to M3 base tokens

   - Update semantic tokens (xs-2xl) to reference M3 base tokens (level0-5)
   - Switch button recipe from base tokens to semantic tokens
   - Update Elevation.mdx with three-layer architecture docs
   - Remove all direct base token usage from component recipes

   Implements STORY-002
   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   ```

## Benefits

- **Single source of truth:** All shadows now derive from M3 elevation spec
- **Swappable design language:** Can replace M3 with another system by changing base token values
- **Consistent naming:** Components use meaningful semantic names (xs-2xl) not arbitrary levels
- **Maintainable:** Changes to elevation values only need updates in one place (material3.language.ts)
