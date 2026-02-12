# Elevation & Shadow System Fix Plan

> **Document Purpose:** Step-by-step plan to fix elevation/shadow issues in the design system
>
> **Status:** Planning Phase - UPDATED with correct architectural understanding
> **Created:** 2026-02-10
> **Updated:** 2026-02-10
> **Related:** STORYBOOK_MCP_STRATEGY.md

---

## ⚠️ Architectural Philosophy

**CRITICAL:** This design system follows a **three-layer aesthetic-agnostic architecture**:

```
Layer 1: Infrastructure (Panda CSS / Park UI) - UNCHANGING
├── Token names: xs, sm, md, lg, xl, 2xl
└── Components ALWAYS use these names

Layer 2: Design Language (Material 3) - SWAPPABLE
├── M3 elevation levels: level0-5
└── MAPS values TO → Panda token names

Layer 3: Components - DECOUPLED FROM AESTHETIC
└── Reference Layer 1 tokens only: boxShadow: 'lg'
```

**This means:**
- ✅ Components use **Panda/Park UI token names** (`xs`, `sm`, `md`, `lg`)
- ✅ Material 3 **provides values** that get mapped to those names
- ✅ Swapping M3 for another design language = change values, NOT component code

---

## Table of Contents

1. [Issues Summary](#issues-summary)
2. [Fix Plan Overview](#fix-plan-overview)
3. [Issue 1: Inline Shadow Values](#issue-1-inline-shadow-values)
4. [Issue 2: Token Naming Violation](#issue-2-token-naming-violation)
5. [Issue 3: Missing Elevation Props](#issue-3-missing-elevation-props)
6. [Implementation Timeline](#implementation-timeline)
7. [Testing Strategy](#testing-strategy)
8. [Breaking Changes & Migration](#breaking-changes--migration)

---

## Issues Summary

### Issue 1: Inline Shadow Values (Minor) ⚠️

**Problem:** 3 components use inline shadow values instead of semantic tokens

**Affected Components:**
- `Input.tsx` - Flushed variant uses `'0 1px 0 0 var(--shadow-color)'`
- `Textarea.tsx` - Flushed variant uses `'0 1px 0 0 var(--shadow-color)'`
- `RadioGroup.tsx` - Uses `'inset 0 0 0 1px var(--shadow-color)'`

**Impact:** Low (works, but not using semantic tokens)

---

### Issue 2: Token Naming Violation (Major) ⚠️⚠️⚠️

**Problem:** Button recipe violates architectural philosophy by using M3-specific token names

**Correct (Infrastructure Layer - Park UI/Panda):**
```typescript
// All other components correctly use Panda names
boxShadow: 'sm'  // Card
boxShadow: 'lg'  // Dialog
boxShadow: 'md'  // Select
```

**Incorrect (Design Language Layer - M3-specific):**
```typescript
// Button incorrectly uses M3 names
boxShadow: 'level2'  // ❌ Couples to M3
boxShadow: 'level3'  // ❌ Can't swap design language
```

**Why this is wrong:**
- Breaks aesthetic-agnostic architecture
- If we swap M3 for Fluent Design, Button would break
- Other components would work fine (they use Panda names)

**Impact:** High (architectural violation, blocks design language swapping)

---

### Issue 3: Missing Elevation Props (Medium) ⚠️⚠️

**Problem:** Components don't expose elevation as props

**Components with Hardcoded Elevation:**
- Dialog → `lg`
- Drawer → `lg`
- Popover → `lg`
- Select → `md` (dropdown)
- Slider → `xs` (thumb)
- Stepper → `sm` (indicator)
- Switch → `xs` (thumb)
- Toast → `lg`
- Tooltip → `sm`

**Only 2 Components with Elevation Variants:**
- Button → `variant="elevated"` (but using wrong token names)
- Card → `variant="elevated"` ✅

**Impact:** Medium (limits consumer flexibility)

---

## Fix Plan Overview

### Phase 1: Fix Architectural Violation (1 hour)
1. Update Button recipe to use Panda token names
2. Verify M3 language mapping provides correct values
3. Test Button variants

### Phase 2: Fix Inline Shadows (30 minutes)
1. Create semantic tokens for Input/Textarea flushed variant
2. Create semantic token for RadioGroup border
3. Update recipes to use new tokens

### Phase 3: Add Elevation Variants (2-3 hours)
1. Add elevation variants to high-priority recipes
2. Update component TypeScript interfaces
3. Update stories with elevation examples
4. Document elevation usage

### Phase 4: Testing & Documentation (1-2 hours)
1. Visual regression testing
2. Update Storybook docs
3. Update agent knowledge base

**Total Estimated Time:** 4.5-6.5 hours

---

## Issue 1: Inline Shadow Values

### Current State

**Input & Textarea - Flushed Variant:**
```typescript
// src/preset/recipes/input.ts
flushed: {
  borderWidth: '0px 0px 1px 0px',
  _focusVisible: {
    borderColor: 'colorPalette.default',
    boxShadow: '0 1px 0 0 var(--shadow-color)',  // ← Inline value
  }
}
```

**RadioGroup - Border:**
```typescript
// src/preset/recipes/radio-group.ts
control: {
  boxShadow: 'inset 0 0 0 1px var(--shadow-color)',  // ← Inline value
}
```

### Fix Strategy

#### Step 1: Add Semantic Shadow Tokens

**File:** `src/preset/shadows.ts`

Add new Panda tokens (using Park UI naming convention):

```typescript
export const shadows = {
  // ... existing tokens (xs, sm, md, lg, xl, 2xl)

  // Input focus underline - uses Panda naming
  'focus-underline': {
    value: {
      base: '0 1px 0 0 {colors.neutral.a4}',
      _dark: '0 1px 0 0 {colors.neutral.a8}'
    }
  },

  // Inset border for form controls - uses Panda naming
  'inset-border': {
    value: {
      base: 'inset 0 0 0 1px {colors.neutral.a4}',
      _dark: 'inset 0 0 0 1px {colors.neutral.a8}'
    }
  },
};
```

#### Step 2: Update Recipes

**Input & Textarea:**
```typescript
// Before
_focusVisible: {
  borderColor: 'colorPalette.default',
  boxShadow: '0 1px 0 0 var(--shadow-color)',
}

// After - using Panda token
_focusVisible: {
  borderColor: 'colorPalette.default',
  boxShadow: 'focus-underline',
}
```

**RadioGroup:**
```typescript
// Before
control: {
  boxShadow: 'inset 0 0 0 1px var(--shadow-color)',
}

// After - using Panda token
control: {
  boxShadow: 'inset-border',
}
```

#### Step 3: Verify

- [ ] Run `pnpm build:panda`
- [ ] Check generated `styled-system/tokens/shadows.mjs`
- [ ] Test Input flushed variant focus state
- [ ] Test Textarea flushed variant focus state
- [ ] Test RadioGroup appearance
- [ ] Verify light/dark theme switching

---

## Issue 2: Token Naming Violation

### The Problem: Button Breaks Architecture

**Current Button Recipe (WRONG):**
```typescript
// src/preset/recipes/button.ts
elevated: {
  base: {
    boxShadow: 'level2',  // ❌ M3-specific name
  },
  _hover: {
    boxShadow: 'level3',  // ❌ M3-specific name
  },
  _active: {
    boxShadow: 'level1',  // ❌ M3-specific name
  }
}
```

**Why this is wrong:**
- `level2`, `level3`, `level1` are M3 design language names
- If we swap M3 for Fluent Design, Button code must change
- Violates aesthetic-agnostic architecture

**Other Components (CORRECT):**
```typescript
// Card, Dialog, Drawer, etc. correctly use Panda names
boxShadow: 'lg'  // ✅ Panda/Park UI name
boxShadow: 'sm'  // ✅ Panda/Park UI name
boxShadow: 'md'  // ✅ Panda/Park UI name
```

---

### The Fix: Use Panda Token Names

#### Step 1: Map M3 Elevation Semantics to Panda Names

**M3 Elevation Levels → Panda Token Mapping:**

| M3 Level | M3 Use Case | Panda Token | Panda Use Case |
|----------|-------------|-------------|----------------|
| level0 | No elevation | `none` | Flat surfaces |
| level1 | Subtle depth | `xs` | Minimal shadow |
| level2 | Moderate depth | `sm` | Small shadow |
| level3 | Prominent | `md` | Medium shadow |
| level4 | High | `lg` | Large shadow |
| level5 | Highest | `xl` or `2xl` | Extra large shadow |

**For Button's Elevated Variant:**
- Default state (M3 level2) → Use `sm`
- Hover state (M3 level3) → Use `md`
- Active state (M3 level1) → Use `xs`

#### Step 2: Update Button Recipe

**File:** `src/preset/recipes/button.ts`

```typescript
// Before (M3-specific names)
elevated: {
  base: {
    boxShadow: 'level2',
  },
  _hover: {
    boxShadow: 'level3',
  },
  _active: {
    boxShadow: 'level1',
  }
}

// After (Panda names - aesthetic-agnostic)
elevated: {
  base: {
    boxShadow: 'sm',  // ✅ Panda token
  },
  _hover: {
    boxShadow: 'md',  // ✅ Panda token
  },
  _active: {
    boxShadow: 'xs',  // ✅ Panda token
  }
}
```

#### Step 3: Verify M3 Language Provides Values

**File:** `src/languages/material3.language.ts`

The M3 language file should provide the VALUES for Panda tokens:

```typescript
// This is the TRANSFORM layer
// M3 elevation values map TO Panda token names

export const material3Language: DesignLanguageContract = {
  // ... colors, spacing, etc.

  // M3 defines what 'xs', 'sm', 'md', 'lg' MEAN in M3 context
  shadows: {
    xs: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',   // M3 level1
    sm: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',   // M3 level2
    md: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',   // M3 level3
    lg: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',  // M3 level4
    xl: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',  // M3 level5
  }
}
```

**Note:** This transformation might already exist in your preset layer. The key is that components reference `'sm'`, `'md'`, etc., and the M3 language provides the actual shadow values.

#### Step 4: Update Documentation

**File:** `src/stories/foundations/Elevation.mdx`

Update to clarify the architecture:

```markdown
## Elevation Token Architecture

### Three-Layer System

**Layer 1: Panda CSS Infrastructure (Unchanging)**
- Token names: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Components always use these names

**Layer 2: Material Design 3 Language (Swappable)**
- Defines what those tokens MEAN in M3 context
- Maps M3 elevation levels to Panda token values

**Layer 3: Components (Decoupled)**
- Reference Layer 1 tokens only

### Usage in Components

```tsx
import { css } from 'styled-system/css'

// ✅ CORRECT - Uses Panda token name
const cardStyle = css({
  boxShadow: 'sm',
  _hover: {
    boxShadow: 'md'
  }
})

// ❌ WRONG - Uses design language name
const cardStyle = css({
  boxShadow: 'level2',  // Couples to M3
})
```

### M3 Elevation Mapping

| Panda Token | M3 Level | Use Case |
|-------------|----------|----------|
| `none` | level0 | Flat surfaces |
| `xs` | level1 | Subtle depth (cards at rest) |
| `sm` | level2 | Moderate depth (elevated buttons) |
| `md` | level3 | Prominent (dialogs, menus) |
| `lg` | level4 | High (drawers, sheets) |
| `xl` | level5 | Highest (FABs, tooltips) |

**Why this matters:** If we swap M3 for another design language (Fluent, Carbon, etc.), components don't change—only the values in Layer 2 change.
```

#### Step 5: Generate and Test

```bash
# Regenerate Panda CSS
pnpm build:panda

# Run Storybook
pnpm dev

# Test Button elevated variant:
# - Default should have subtle shadow
# - Hover should increase shadow
# - Active should reduce shadow
# - Light/dark mode should work
```

---

## Issue 3: Missing Elevation Props

### Strategy

Add elevation variants to high-priority recipes that would benefit from flexibility.

### Priority Components

**High Priority (Add First):**
- Dialog - Often needs different elevations
- Drawer - Side sheets vs full drawers
- Popover - Context menus vs tooltips
- Toast - Different urgency levels

**Medium Priority (Add Later):**
- Select - Dropdown menu elevation
- Tooltip - May need subtle vs prominent

**Low Priority (Keep Hardcoded):**
- Slider - Thumb elevation is fixed
- Switch - Thumb elevation is fixed
- Stepper - Indicator elevation is fixed

---

### Implementation Example: Dialog

#### Step 1: Add Elevation Variant to Recipe

**File:** `src/preset/recipes/dialog.ts`

```typescript
import { defineRecipe } from '@pandacss/dev';

export const dialog = defineRecipe({
  className: 'dialog',

  slots: ['backdrop', 'positioner', 'content', 'title', 'description', 'closeTrigger'],

  base: {
    // ... existing base styles
  },

  variants: {
    // ... existing variants (size, placement, scrollBehavior)

    // NEW: Elevation variant (using Panda token names)
    elevation: {
      subtle: {
        content: {
          boxShadow: 'sm'  // ✅ Panda token
        }
      },
      moderate: {
        content: {
          boxShadow: 'md'  // ✅ Panda token
        }
      },
      prominent: {
        content: {
          boxShadow: 'lg'  // ✅ Panda token
        }
      }
    }
  },

  defaultVariants: {
    size: 'md',
    scrollBehavior: 'outside',
    placement: 'center',
    elevation: 'moderate',  // Default to md
  },
});
```

#### Step 2: Update Component TypeScript Interface

**File:** `src/components/Dialog.tsx`

```typescript
import type { DialogVariantProps } from 'styled-system/recipes';

interface DialogRootProps extends Dialog.RootProps {
  elevation?: 'subtle' | 'moderate' | 'prominent';
  // ... existing props
}
```

#### Step 3: Update Story with Elevation Examples

**File:** `stories/Dialog.stories.tsx`

```typescript
export const ElevationVariants: Story = {
  render: () => (
    <VStack gap="4">
      <Dialog elevation="subtle">
        <DialogTrigger>Subtle Elevation</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subtle Dialog</DialogTitle>
          </DialogHeader>
          <DialogBody>Lower elevation for less prominent dialogs</DialogBody>
        </DialogContent>
      </Dialog>

      <Dialog elevation="moderate">
        <DialogTrigger>Moderate Elevation (Default)</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Standard Dialog</DialogTitle>
          </DialogHeader>
          <DialogBody>Default elevation for most dialogs</DialogBody>
        </DialogContent>
      </Dialog>

      <Dialog elevation="prominent">
        <DialogTrigger>Prominent Elevation</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Important Dialog</DialogTitle>
          </DialogHeader>
          <DialogBody>Higher elevation for critical actions</DialogBody>
        </DialogContent>
      </Dialog>
    </VStack>
  )
};
```

#### Step 4: Document in Storybook

Add to dialog component docs:

```markdown
## Elevation

Dialogs support three elevation levels:

- **subtle** (`sm`) - For less prominent dialogs
- **moderate** (`md`) - Default, for standard dialogs
- **prominent** (`lg`) - For critical/important dialogs

Match the elevation to the dialog's importance in the user flow.
```

---

### Apply Same Pattern to Other Components

#### Drawer

```typescript
elevation: {
  moderate: { content: { boxShadow: 'md' } },  // ✅ Panda tokens
  high: { content: { boxShadow: 'lg' } },      // ✅ Panda tokens
}
defaultVariants: { elevation: 'high' }
```

#### Popover

```typescript
elevation: {
  subtle: { content: { boxShadow: 'sm' } },     // ✅ Panda tokens
  moderate: { content: { boxShadow: 'md' } },   // ✅ Panda tokens
}
defaultVariants: { elevation: 'moderate' }
```

#### Toast

```typescript
elevation: {
  high: { root: { boxShadow: 'lg' } },      // ✅ Panda tokens
  highest: { root: { boxShadow: 'xl' } },   // ✅ Panda tokens
}
defaultVariants: { elevation: 'highest' }
```

---

## Implementation Timeline

### Day 1: Fix Architectural Violation (1 hour)

**Morning:**
- [ ] Update Button recipe: `level2/3/1` → `sm/md/xs`
- [ ] Run `pnpm build:panda`
- [ ] Test Button elevated variant in Storybook
- [ ] Verify no visual regression

### Day 2: Fix Inline Shadows (30 minutes)

**Morning:**
- [ ] Add `focus-underline` and `inset-border` tokens to shadows.ts
- [ ] Update Input, Textarea, RadioGroup recipes
- [ ] Run `pnpm build:panda`
- [ ] Test all three components

### Day 3: Add Elevation Variants (2-3 hours)

**Morning:**
- [ ] Dialog - add elevation variant
- [ ] Drawer - add elevation variant

**Afternoon:**
- [ ] Popover - add elevation variant
- [ ] Toast - add elevation variant

### Day 4: Stories & Documentation (1-2 hours)

**Morning:**
- [ ] Update Dialog, Drawer, Popover, Toast stories
- [ ] Add elevation examples to each

**Afternoon:**
- [ ] Update `Elevation.mdx` with architecture explanation
- [ ] Document Panda token usage
- [ ] Update component-specific elevation docs

### Day 5: Final Testing (1 hour)

- [ ] Visual regression testing (all components)
- [ ] Test light/dark mode
- [ ] Test interactive states
- [ ] Verify Storybook builds successfully

**Total Time:** 5.5-7.5 hours over 5 days

---

## Testing Strategy

### Visual Regression Testing

**Manual Checklist:**

```
Components to Verify:
[ ] Button - elevated variant (sm → md on hover → xs on active)
[ ] Card - elevated variant (lg)
[ ] Dialog - content shadow (md or custom)
[ ] Drawer - content shadow (lg or custom)
[ ] Popover - content shadow (md or custom)
[ ] Select - dropdown shadow (md)
[ ] Slider - thumb shadow (xs)
[ ] Stepper - indicator shadow (sm)
[ ] Switch - thumb shadow (xs)
[ ] Toast - root shadow (xl or custom)
[ ] Tooltip - content shadow (sm)
[ ] Input - flushed variant focus (focus-underline)
[ ] Textarea - flushed variant focus (focus-underline)
[ ] RadioGroup - border (inset-border)

States to Test:
[ ] Default state
[ ] Hover state
[ ] Active/pressed state
[ ] Focus state
[ ] Disabled state
[ ] Light theme
[ ] Dark theme
```

### Verify Architecture

**Token Name Audit:**

```bash
# Find any remaining M3-specific token usage
grep -r "boxShadow: 'level" src/preset/recipes/
grep -r 'boxShadow: "level' src/preset/recipes/

# Should return ZERO results after fix
```

**Expected Result:** All recipes use Panda token names (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`)

---

## Breaking Changes & Migration

### Breaking Changes

#### For Component Consumers

**✅ NO BREAKING CHANGES for normal component usage**

Components work the same:
```typescript
// Still works exactly the same
<Button variant="elevated" />
<Card variant="elevated" />
<Dialog />
```

**⚠️ BREAKING: Only if using css() directly with old tokens**

If consumers were using M3 token names directly:

```typescript
// Before (if anyone was doing this)
<div className={css({ boxShadow: 'level2' })} />

// After - won't work, must use Panda names
<div className={css({ boxShadow: 'sm' })} />
```

**But this is unlikely** since M3 levels weren't in Panda preset (only in material3Language file).

---

### Migration Guide

**For Consumers of Design System:**

```markdown
# Migration Guide: Shadow Tokens v0.13 → v0.14

## Component Usage (No Changes)

✅ All components work the same:
```tsx
<Button variant="elevated" />
<Card variant="elevated" />
<Dialog />
```

No action needed for normal component usage.

## New Features

### Elevation Variants (New)

Some components now support elevation props:

```tsx
<Dialog elevation="moderate" />
<Drawer elevation="high" />
<Popover elevation="subtle" />
<Toast elevation="highest" />
```

Available levels: `subtle`, `moderate`, `prominent`, `high`, `highest`
(varies by component - check component docs)

## Internal Changes (Design System Only)

For design system maintainers:
- Button recipe updated to use Panda token names internally
- All recipes now use consistent Panda/Park UI naming
- M3 language provides values for those tokens
```

---

## Success Criteria

### Phase 1: Architecture Fix ✅

- [ ] Button uses Panda token names (`sm`, `md`, `xs`)
- [ ] Zero recipes use M3-specific names (`level0-5`)
- [ ] All shadow tokens use Panda naming convention
- [ ] M3 language provides values for Panda tokens
- [ ] Architecture audit passes (grep returns 0 results)

### Phase 2: Semantic Tokens ✅

- [ ] No inline shadow values
- [ ] `focus-underline` token created
- [ ] `inset-border` token created
- [ ] Input/Textarea/RadioGroup use new tokens

### Phase 3: Elevation Variants ✅

- [ ] 4+ components support elevation variants
- [ ] All elevation variants use Panda token names
- [ ] All elevation variants have story examples
- [ ] TypeScript interfaces include elevation props

### Phase 4: Documentation ✅

- [ ] Elevation.mdx explains three-layer architecture
- [ ] Component docs include elevation guidance
- [ ] Storybook MCP includes elevation knowledge
- [ ] Agent can understand Panda token usage

---

## Rollout Plan

### Step 1: Internal Fix (Day 1-3)
- [ ] Fix Button recipe (Panda tokens)
- [ ] Add semantic tokens
- [ ] Test all components

### Step 2: Enhancement (Day 4-5)
- [ ] Add elevation variants
- [ ] Update stories
- [ ] Update documentation

### Step 3: Release (Day 6)
- [ ] Publish as minor version (internal fix, no breaking changes)
- [ ] Update changelog
- [ ] Announce new elevation variants feature

---

## Architecture Validation

### Before Fix (Architectural Violation)

```
Button Recipe:
├── boxShadow: 'level2'  ❌ M3-specific (Layer 2)
├── boxShadow: 'level3'  ❌ M3-specific (Layer 2)
└── boxShadow: 'level1'  ❌ M3-specific (Layer 2)

Other Recipes:
├── boxShadow: 'sm'  ✅ Panda token (Layer 1)
├── boxShadow: 'md'  ✅ Panda token (Layer 1)
└── boxShadow: 'lg'  ✅ Panda token (Layer 1)

Problem: Inconsistent architecture
```

### After Fix (Aesthetic-Agnostic)

```
ALL Recipes:
├── boxShadow: 'xs'   ✅ Panda token (Layer 1)
├── boxShadow: 'sm'   ✅ Panda token (Layer 1)
├── boxShadow: 'md'   ✅ Panda token (Layer 1)
├── boxShadow: 'lg'   ✅ Panda token (Layer 1)
└── boxShadow: 'xl'   ✅ Panda token (Layer 1)

Material3 Language (Layer 2):
└── Provides VALUES for xs, sm, md, lg, xl

Result: Can swap M3 for any design language
```

---

## Related Documents

- **Architectural Philosophy:** `CLAUDE.md` (three-layer system)
- **Storybook MCP Strategy:** `STORYBOOK_MCP_STRATEGY.md`
- **Material Theme JSON:** `docs/material-theme.json`
- **Elevation Documentation:** `src/stories/foundations/Elevation.mdx`
- **Shadow Preset:** `src/preset/shadows.ts`

---

## Key Takeaway

**The fix is simple:**
- Change Button from M3 names → Panda names
- Everything else already follows correct architecture
- Add semantic tokens for inline shadows
- Add elevation variants for flexibility

**The insight is profound:**
- Design language (M3) provides VALUES
- Infrastructure (Panda) provides NAMES
- Components reference infrastructure only
- This enables aesthetic swapping

---

**Next Actions:**

1. [ ] Confirm architectural understanding with team
2. [ ] Execute Phase 1 (Button fix)
3. [ ] Execute Phase 2 (semantic tokens)
4. [ ] Execute Phase 3 (elevation variants)
5. [ ] Update documentation and MCP resources

**Document maintained by:** Design System Team
**Updated:** 2026-02-10 with corrected architectural understanding