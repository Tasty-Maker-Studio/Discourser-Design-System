# Fix: Checkbox, Radio Button, and Input Error State Token Resolution

## Problem Summary

Multiple Park UI recipes reference semantic color tokens (`border`, `error`) as shorthand strings like `borderColor: 'border'` and `borderColor: 'error'`. In Park UI's upstream preset, these are **flat** semantic tokens with a direct `value` property. In the Discourser Design System, they were defined as **nested** tokens (with `default`/`muted` children but no root `value`), which causes Panda CSS to pass the literal string through to CSS instead of resolving it to a CSS variable.

**Affected CSS output (broken):**
```css
.checkbox__control { border-color: border; }          /* literal string, not a color */
.input--variant_outline:is(:invalid) { border-color: error; }  /* same problem */
```

**Expected CSS output (working):**
```css
.checkbox__control { border-color: var(--colors-border); }
.input--variant_outline:is(:invalid) { border-color: var(--colors-error); }
```

## Root Cause

In `panda.config.ts`, the semantic token aliases section defines:

```ts
border: {
  default: { value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' } },
  muted: { value: { base: '{colors.gray.4}', _dark: '{colors.gray.4}' } },
},
```

Park UI upstream (`park-ui/packages/preset/src/index.ts`) defines:

```ts
border: { value: { _light: '{colors.gray.4}', _dark: '{colors.gray.4}' } },
error: { value: { _light: '{colors.red.9}', _dark: '{colors.red.9}' } },
```

When Panda CSS encounters `borderColor: 'border'` in a recipe, it looks for a token with a `value` at the `colors.border` path. The Discourser config has no `value` at that level — only `colors.border.default` and `colors.border.muted` exist. Panda falls through and emits the literal string.

The `error` token is **completely missing** from the Discourser config.

## Fix Instructions

### File: `panda.config.ts`

Location: Inside `theme.extend.semanticTokens.colors`, the `border` definition (around line ~130).

**Change the `border` token from:**
```ts
border: {
  default: {
    value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' },
  },
  muted: {
    value: { base: '{colors.gray.4}', _dark: '{colors.gray.4}' },
  },
},
```

**To:**
```ts
border: {
  value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' },
  default: {
    value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' },
  },
  muted: {
    value: { base: '{colors.gray.4}', _dark: '{colors.gray.4}' },
  },
},
```

This adds a root-level `value` that generates `--colors-border` as a CSS variable, while preserving the nested `border.default` and `border.muted` sub-tokens. The root `value` matches `border.default` because that is the semantic equivalent — when recipes say `borderColor: 'border'` they mean the default border color.

**Then add the missing `error` token.** Place it right after the `border` block, before `...m3SemanticTokens`:

```ts
error: {
  value: { base: '{colors.red.9}', _dark: '{colors.red.9}' },
},
```

This matches Park UI upstream exactly. The `error` token is referenced by Input, Textarea, Select, and other form component recipes for invalid/error states.

### No recipe file changes needed

Do NOT modify any recipe files (`checkbox.ts`, `radio-group.ts`, `input.ts`, etc.). They are character-identical to Park UI upstream and are correct. The fix is entirely in the token definitions.

### No story file changes needed for this fix

The checkbox stories may benefit from adding `colorPalette="primary"` to demonstrate the solid variant's checked state properly, but that is a story improvement, not a bug fix. The rendering fix is the token change above.

## Verification Steps

After making the change:

1. **Rebuild Panda CSS:**
   ```bash
   pnpm panda codegen
   ```

2. **Check that `--colors-border` now exists in the generated CSS.** Look in `styled-system/styles.css` or rebuild Storybook and check the output CSS. You should see:
   ```css
   --colors-border: var(--colors-gray-6);
   --colors-border-default: var(--colors-gray-6);
   --colors-border-muted: var(--colors-gray-4);
   --colors-error: var(--colors-red-9);
   ```

3. **Check checkbox renders with visible border.** The `.checkbox__control` rule should now show:
   ```css
   border-color: var(--colors-border);
   ```

4. **Check input error states work.** The `.input--variant_outline:is(:invalid)` rule should show:
   ```css
   border-color: var(--colors-error);
   ```

5. **Run Storybook** and visually confirm:
   - Checkbox: unchecked state shows a visible border (gray ring around the box)
   - Checkbox solid variant: checked state fills with `colorPalette` color
   - Radio: unchecked state shows a visible circle border (this already works via the `boxShadow` pattern using `gray.surface.border`, but verify no regression)
   - Input: invalid states show red border

## Scope of Impact

This fix affects every component recipe that references the bare `'border'` or `'error'` token strings. Based on CSS analysis, these components currently have broken token resolution:

**`border` literal (fixed by adding root `value`):**
- Checkbox (base `control` + solid variant `control`)
- Stepper (`indicator` border-color)
- Slider (`track` background — uses `background: border`)
- Tabs enclosed variant (`--shadow-color: border`)

**`error` literal (fixed by adding `error` token):**
- Input (outline, surface, subtle, flushed variants — invalid state `border-color`)
- Textarea (outline, surface, subtle, flushed variants — invalid state)
- Input flushed variant (`--shadow-color: error` on focus+invalid)
- Textarea flushed variant (`--shadow-color: error` on focus+invalid)

## Why Radio Buttons Already Work

The radio button recipe uses a different pattern: `boxShadow: 'inset 0 0 0 1px {colors.gray.surface.border}'` with `--shadow-color` set to the fully-qualified token path `gray.surface.border`. This resolves correctly because `gray.surface.border` has a direct `value` in the color palette definitions. No fix needed for radio unchecked state visibility.

If radio buttons appear invisible in Storybook, the issue is likely CSS specificity or a missing `colorPalette` prop on the story — not a token resolution problem. The CSS output for radio is correct: `--shadow-color: var(--colors-gray-surface-border)` which resolves to `var(--colors-neutral-6)` → `#91918B`.
