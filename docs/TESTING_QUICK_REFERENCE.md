# Token Testing Quick Reference

## Run Tests

```bash
# Run all shadow token tests
pnpm test shadows --run

# Watch mode (auto-rerun on changes)
pnpm test shadows

# Run with UI
pnpm test:ui
```

## Test Results ✅

```
✓ src/preset/__tests__/shadows.test.ts (11 tests) 18ms
✓ src/languages/__tests__/transform.test.ts (9 tests) 14ms
✓ src/preset/recipes/__tests__/recipe-shadows.test.ts (16 tests) 22ms
✓ src/preset/__tests__/token-resolution.test.ts (14 tests) 22ms

Test Files  4 passed (4)
Tests  50 passed (50)
```

## What These Tests Verify

### 1. Shadow Token Architecture ✅ (11 tests)
- Semantic tokens (xs-2xl) correctly reference base tokens (level1-5)
- Utility tokens (inset, focus-underline, inset-border) remain independent
- No hardcoded Park UI values in semantic elevation tokens
- All required tokens exist, no unexpected tokens

### 2. Transform Tests ✅ (9 tests)
- Base tokens (level0-5) created from elevation.levels
- M3 shadow values preserved exactly
- Shadow values follow M3 dual-layer pattern
- Elevation progression is correct (level1 < level5)
- Transform function doesn't mutate source data

### 3. Recipe Token Usage ✅ (16 tests)
- All component recipes use semantic tokens (xs, sm, md, lg, xl, 2xl)
- **Zero** recipes use base tokens (level0-5) directly
- Button elevated variant: sm (default), md (hover), xs (active)
- STORY-003: Input/Textarea use focus-underline, RadioGroup uses inset-border
- No inline var(--shadow-color) strings in recipes

### 4. Integration Tests ✅ (14 tests)
- Preset includes both base and semantic shadow tokens
- Token references are valid (no broken chains)
- No circular token references
- Inset token remains independent (STORY-002 requirement)
- System-wide check: ALL recipes avoid base token usage

## Adding Tests for New Components

### When you create a new component with shadows:

**1. Import the recipe** in `recipe-shadows.test.ts`:
```ts
import { yourNewComponent } from '../your-new-component';
```

**2. Add test**:
```ts
it('yourNewComponent recipe should use semantic tokens', () => {
  const shadowValue = yourNewComponent.boxShadow;
  expect(shadowValue).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
});
```

**3. Add to anti-pattern check**:
```ts
const recipes = {
  button,
  card,
  // ... existing recipes
  yourNewComponent,  // Add here
};
```

## Adding New Shadow Tokens

### When you add a new semantic token:

**1. Update `shadows.ts`**:
```ts
export const shadows = defineSemanticTokens.shadows({
  // ... existing tokens
  xxl: {
    value: '{shadows.level5}',
  },
});
```

**2. Update test** in `shadows.test.ts`:
```ts
it('xxl should reference shadows.level5', () => {
  expect(shadows.xxl.value).toBe('{shadows.level5}');
});

// Update coverage test
const requiredTokens = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'xxl', 'inset'];
const allowedTokens = [...requiredTokens, 'focus-underline', 'inset-border'];
```

**3. Run tests**:
```bash
pnpm test shadows --run
```

## Common Test Failures

### ❌ "expected allowedTokens to include 'new-token'"
**Fix:** Add the new token to `allowedTokens` array in `shadows.test.ts`

### ❌ "recipeString matches /level[0-5]/"
**Fix:** Recipe is using base tokens directly. Change to semantic tokens:
```ts
// ❌ Bad
boxShadow: 'level2'

// ✅ Good
boxShadow: 'sm'
```

### ❌ "Cannot read properties of undefined (reading 'slots')"
**Fix:** Recipe structure is different. Check if it's a slot recipe or simple recipe:
```ts
// For slot recipes
const content = recipe.slots?.content;

// For simple recipes
const shadow = recipe.boxShadow;
```

## CI/CD Integration

These tests run automatically on:
- ✅ Pre-commit hook
- ✅ GitHub Actions CI
- ✅ Pull request checks

**Never skip these tests** - they prevent token architecture regressions!

## Benefits

- **5-10 second feedback** - No need to rebuild Panda or check Storybook
- **Prevents regressions** - Catches broken token chains immediately
- **Documents architecture** - Tests show correct patterns
- **Enables refactoring** - Safely change token values with confidence

## Related Docs

- [Full Testing Guide](./TESTING_TOKENS.md)
- [STORY-002 Implementation](./context-share/STORY-002-IMPLEMENTATION-COMPLETE.md)
- [Three-Layer Architecture](../CLAUDE.md#architecture)
