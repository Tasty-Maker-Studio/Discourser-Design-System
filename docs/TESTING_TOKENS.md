# Token Testing Strategy

## Overview

This document describes the comprehensive testing strategy for design tokens in the Discourser Design System. These tests prevent regressions in the three-layer token architecture.

## Test Categories

> **Total: 50 tests across 4 test files**

### 1. **Token Definition Tests** (`src/preset/__tests__/shadows.test.ts`) — 11 tests

**Purpose:** Verify semantic tokens are correctly defined and chained to base tokens.

**What it tests:**
- ✅ Semantic tokens (xs-2xl) reference correct base tokens (level1-5)
- ✅ Utility tokens (inset) remain independent
- ✅ No hardcoded Park UI values in semantic tokens
- ✅ All required tokens are present
- ✅ No unexpected tokens exist

**Example:**
```ts
it('sm should reference shadows.level2', () => {
  expect(shadows.sm.value).toBe('{shadows.level2}');
});
```

**Catches:**
- Accidentally using hardcoded values instead of token references
- Missing token definitions
- Wrong token references (e.g., sm → level3 instead of level2)

---

### 2. **Recipe Token Usage Tests** (`src/preset/recipes/__tests__/recipe-shadows.test.ts`) — 16 tests

**Purpose:** Verify component recipes use semantic tokens (NOT base tokens).

**What it tests:**
- ✅ All shadow-using components use semantic tokens (xs-2xl)
- ✅ No recipe references base tokens (level0-5) directly
- ✅ STORY-003: Input/Textarea use focus-underline token
- ✅ STORY-003: RadioGroup uses inset-border token
- ✅ No inline var(--shadow-color) strings in recipes
- ✅ Custom shadows are documented and intentional

**Example:**
```ts
it('button recipe should use semantic tokens (xs, sm, md)', () => {
  const elevated = button.variants?.variant?.elevated;
  expect(elevated?.boxShadow).toBe('sm');
  expect(elevated?._hover?.boxShadow).toBe('md');
});
```

**Catches:**
- Components bypassing semantic layer and using base tokens
- Regressions after refactoring
- Inconsistent token usage across components

---

### 3. **Transform Tests** (`src/languages/__tests__/transform.test.ts`) — 9 tests

**Purpose:** Verify design language contract is correctly transformed to Panda theme.

**What it tests:**
- ✅ Base tokens (level0-5) are created from elevation.levels
- ✅ M3 shadow values are preserved exactly
- ✅ Shadow values follow M3 pattern (two-part shadows)
- ✅ Elevation progression is correct
- ✅ Transform function doesn't mutate source data

**Example:**
```ts
it('should preserve M3 shadow values exactly', () => {
  const expected = material3Language.elevation.levels;
  expect(pandaTheme.tokens.shadows.level1.value).toBe(expected.level1);
});
```

**Catches:**
- Lost or corrupted M3 elevation values during transform
- Incorrect token structure
- Mutations to design language contract

---

### 4. **Integration Tests** (`src/preset/__tests__/token-resolution.test.ts`) — 14 tests

**Purpose:** Verify complete preset configuration has correct token architecture.

**What it tests:**
- ✅ Preset includes both base and semantic shadow tokens
- ✅ Semantic tokens reference existing base tokens
- ✅ No circular token references
- ✅ Inset token remains independent (STORY-002 requirement)
- ✅ Utility tokens (focus-underline, inset-border) are independent
- ✅ All recipes avoid base token usage (system-wide check)
- ✅ Utility tokens are used in appropriate recipes
- ✅ Token reference integrity across the system

**Example:**
```ts
it('semantic tokens should only reference existing base tokens', () => {
  const baseTokenNames = Object.keys(baseShadows || {});
  // Verify each semantic token reference is valid
  expect(baseTokenNames).toContain(referencedToken);
});
```

**Catches:**
- Broken token references
- Missing base tokens
- Circular dependencies
- Integration issues between layers

---

## Running Tests

### Run all token tests
```bash
pnpm test shadows
```

### Run specific test file
```bash
pnpm test shadows.test.ts
pnpm test recipe-shadows.test.ts
pnpm test transform.test.ts
pnpm test token-resolution.test.ts
```

### Run with coverage
```bash
pnpm test:coverage
```

### Watch mode during development
```bash
pnpm test --watch
```

---

## CI/CD Integration

### Pre-commit Hook
```bash
# .husky/pre-commit
pnpm test shadows --run
```

### GitHub Actions
```yaml
- name: Test Token Architecture
  run: pnpm test shadows --run
```

---

## Test Patterns

### Pattern 1: Token Reference Validation
```ts
// Verify semantic token references base token
expect(shadows.sm.value).toBe('{shadows.level2}');
```

### Pattern 2: Component Recipe Validation
```ts
// Verify recipe uses semantic tokens
expect(recipe.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
```

### Pattern 3: Negative Testing (Anti-patterns)
```ts
// Verify no base tokens in recipes
expect(recipeString).not.toMatch(/['"]level[0-5]['"]/);
```

### Pattern 4: Structural Validation
```ts
// Verify token has expected structure
expect(token.value).toHaveProperty('base');
expect(token.value).toHaveProperty('_dark');
```

---

## Extending Tests for New Tokens

### Adding a new semantic shadow token

1. **Update `shadows.test.ts`:**
```ts
it('xxl should reference shadows.level5', () => {
  expect(shadows.xxl.value).toBe('{shadows.level5}');
});
```

2. **Update coverage test:**
```ts
const requiredTokens = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'xxl', 'inset'];
```

### Adding a new component recipe

1. **Import the recipe:**
```ts
import { newComponent } from '../newComponent';
```

2. **Add recipe test:**
```ts
it('newComponent recipe should use semantic tokens', () => {
  expect(newComponent.boxShadow).toMatch(/^(xs|sm|md|lg|xl|2xl)$/);
});
```

3. **Add to anti-pattern check:**
```ts
const recipes = { button, card, /* ... */, newComponent };
```

---

## Visual Regression Testing

While unit tests verify token definitions, visual regression tests verify the actual rendered output.

### Chromatic Integration (Recommended)
```bash
# Run visual regression tests
pnpm chromatic
```

### Manual Visual Testing
```bash
pnpm dev  # Start Storybook
# Check each component in light + dark themes
```

**Components to visually verify:**
- Button (elevated variant)
- Card
- Dialog
- Drawer
- Popover
- Select
- Slider
- Switch
- Toast
- Tooltip

---

## Debugging Failed Tests

### Token reference mismatch
```
Expected: '{shadows.level2}'
Received: '{shadows.level3}'
```
**Fix:** Update semantic token definition in `src/preset/shadows.ts`

### Recipe using base token
```
Error: recipeString matches /level[0-5]/
```
**Fix:** Update recipe to use semantic token (xs, sm, md, lg, xl, 2xl)

### Missing base token
```
Error: baseTokenNames does not contain 'level6'
```
**Fix:** Either add the base token to material3.language.ts or fix the reference

### Transform not preserving values
```
Expected: "0px 1px 2px rgba(0,0,0,0.3)"
Received: undefined
```
**Fix:** Check transform.ts objectToTokens function and language contract

---

## Benefits of This Testing Strategy

### 1. **Prevents Regressions**
Tests catch when someone accidentally:
- Uses base tokens directly in components
- Breaks the token chain
- Removes required tokens

### 2. **Documents Architecture**
Tests serve as executable documentation showing:
- How tokens should be structured
- What the token chain looks like
- Which patterns are allowed/forbidden

### 3. **Enables Refactoring**
With comprehensive tests, you can:
- Safely refactor token definitions
- Swap design languages
- Update M3 values with confidence

### 4. **Fast Feedback**
Tests run in milliseconds:
- No need to rebuild Panda
- No need to check Storybook manually
- Instant feedback on token changes

---

## Best Practices

### ✅ DO:
- Run tests before committing
- Add tests for new tokens/recipes
- Keep tests focused and specific
- Use descriptive test names
- Test both positive and negative cases

### ❌ DON'T:
- Skip tests when adding new components
- Test implementation details
- Make tests dependent on each other
- Hardcode magic values
- Test Panda CSS internals

---

## Related Documentation

- [STORY-002 Implementation](../context-share/STORY-002-IMPLEMENTATION-COMPLETE.md)
- [Three-Layer Architecture](../CLAUDE.md#architecture)
- [Shadow Token Architecture](../context-share/ELEVATION_FIX_PLAN.md)
