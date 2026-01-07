# TASK-DS-001: Park UI Integration into Discourser-Design-System

**Status:** ✅ COMPLETED
**Completed:** January 7, 2026
**Date:** January 6, 2026
**Estimated Time:** 4-6 hours
**Actual Time:** ~5 hours
**Priority:** P0 - Blocking for Discourser.AI MVP

---

## Completion Summary

### ✅ What Was Accomplished

**All phases completed successfully:**
1. ✅ Phase 1: Dependencies installed (Ark UI, PandaCSS)
2. ✅ Phase 2: M3-Park UI color bridge created (primary, neutral, error)
3. ✅ Phase 3: Panda config updated with Park UI structure
4. ✅ Phase 4: Park UI recipes integrated (button, input, field, card, switch, dialog)
5. ✅ Phase 5: Park UI components integrated
6. ✅ Phase 6: Storybook stories created and verified
7. ✅ Phase 7: Build verified and components working

### 🔧 Key Issues Resolved

**Switch Component Visibility Bug:**
- **Issue:** Switch thumb disappeared when toggled to checked state
- **Root Cause:** `colorPalette` prop not set, causing `colorPalette.solid.fg` to resolve to transparent
- **Fix:** Added `colorPalette: 'primary'` to switch recipe defaultVariants and Default story
- **Result:** Switch now displays white thumb on green background when checked

**Component Integration:**
- Successfully created working Storybook stories for Card, Switch, and Dialog components
- All color palette variants working (primary/green, neutral/gray, error/red)
- Dialog modal opens/closes correctly with backdrop and content
- All components use M3 colors properly

### 📊 Success Criteria - ALL MET

| Criterion | Target | Status |
|-----------|--------|--------|
| Build passes | ✅ Zero errors | ✅ PASSED |
| Storybook loads | ✅ All stories render | ✅ PASSED |
| Button uses M3 primary (#3F6900) | ✅ Visual match | ✅ PASSED |
| Dark mode works | ✅ Colors invert correctly | ✅ PASSED |
| Core components work | ✅ Button, Input, Field, Card, Switch, Dialog | ✅ PASSED |
| Published version | ✅ @discourser/design-system@0.2.0 | 🟡 READY TO PUBLISH |

---

## Objective

Integrate Park UI infrastructure into Discourser-Design-System while preserving Material 3 aesthetic. This creates the foundation for bidirectional Figma ↔ Code token synchronization.

---

## Context

### Current Architecture
- **Discourser-Design-System** uses custom `DesignLanguageContract` pattern
- M3 tokens defined in `src/languages/material3.language.ts`
- 6 custom recipes (Button, Card, IconButton, Input, Dialog, Switch)
- PandaCSS for styling

### Target Architecture
- Park UI preset as foundation (provides 60+ component recipes)
- M3 colors mapped to Park UI's Radix-based color system
- Custom M3 semantic tokens layered on top
- Preserve existing typography and spacing from M3

### Key Insight: Park UI Color Architecture
Park UI uses Radix Colors (1-12 scale) with semantic variants:
- `solid` - Filled backgrounds with contrast foreground
- `subtle` - Transparent backgrounds
- `surface` - Card/container backgrounds with borders
- `outline` - Border-focused variants
- `plain` - Text-only variants

Each color (e.g., `green`) has: `1-12` (base), `a1-a12` (alpha), plus `solid.*`, `subtle.*`, `surface.*`, `outline.*`, `plain.*`

---

## Pre-Implementation Checklist

- [ ] Ensure you're on the latest `main` branch of Discourser-Design-System
- [ ] Backup current `panda.config.ts` and `src/languages/material3.language.ts`
- [ ] Have local Park UI clone available at `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/park-ui` for reference

---

## ⚠️ CRITICAL: Park UI Installation Strategy

**Park UI's `@park-ui/preset` is PRIVATE and NOT published to npm.**

We DO NOT run: `pnpm add @park-ui/panda-preset` ❌

Instead, our approach is:

| What | Source | Method |
|------|--------|--------|
| **Ark UI** | npm | `pnpm add @ark-ui/react@5.30.0` |
| **PandaCSS** | npm | `pnpm add -D @pandacss/dev@1.7.0` |
| **Park UI Preset** | Local clone | Copy files from `/park-ui/packages/preset/src/` |
| **Park UI Components** | Local clone | Copy files from `/park-ui/components/react/src/` |
| **M3 Colors** | Our own | Create bridge files mapping M3 → Radix scale |

The Park UI clone at `/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/park-ui` serves as our **reference implementation** - we copy what we need and customize with M3 colors.

---

## Phase 1: Install Dependencies & Setup (30 min)

### 1.1 Install npm Packages

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System

# Ark UI - headless component primitives (THIS is what Park UI builds on)
pnpm add @ark-ui/react@5.30.0

# PandaCSS - CSS framework (match Park UI's version)
pnpm add -D @pandacss/dev@1.7.0
```

### 1.2 Backup Current Config

```bash
cp panda.config.ts panda.config.backup.ts
```

### 1.3 Create Preset Directory Structure

```bash
mkdir -p src/preset/colors
mkdir -p src/preset/recipes
```

---

## Phase 2: Create M3-Park UI Bridge (2-3 hours)

### 2.1 Create Color Mapping File

**File:** `src/preset/colors/m3-primary.ts`

This maps M3 tonal palette (0-100) to Radix scale (1-12):

```typescript
/**
 * Material 3 Primary Color → Park UI Radix Scale
 * 
 * Mapping Strategy:
 * - Radix 1-12 represents light → dark in light mode
 * - M3 tonal palette 100 → 0 (white to black)
 * 
 * Radix Scale Semantics:
 * 1-2: App background
 * 3-4: Subtle backgrounds  
 * 5-6: UI element backgrounds
 * 7-8: Borders and separators
 * 9: Solid backgrounds (primary action color)
 * 10: Hovered solid backgrounds
 * 11: Low-contrast text
 * 12: High-contrast text
 */

import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../../languages/material3.language';

const m3 = material3Language.colors.primary;

export const primary = defineSemanticTokens.colors({
  // Base scale mapping M3 tonal to Radix
  '1': { value: { _light: m3[99], _dark: m3[10] } },
  '2': { value: { _light: m3[95], _dark: m3[20] } },
  '3': { value: { _light: m3[90], _dark: m3[30] } },
  '4': { value: { _light: m3[80], _dark: m3[30] } },
  '5': { value: { _light: m3[70], _dark: m3[40] } },
  '6': { value: { _light: m3[60], _dark: m3[40] } },
  '7': { value: { _light: m3[50], _dark: m3[50] } },
  '8': { value: { _light: m3[40], _dark: m3[60] } },
  '9': { value: { _light: m3[40], _dark: m3[80] } },  // Primary action color
  '10': { value: { _light: m3[30], _dark: m3[70] } }, // Hover state
  '11': { value: { _light: m3[30], _dark: m3[90] } }, // Low-contrast text
  '12': { value: { _light: m3[10], _dark: m3[95] } }, // High-contrast text
  
  // Alpha variants (for overlays/transparency)
  a1: { value: { _light: `${m3[40]}08`, _dark: `${m3[80]}08` } },
  a2: { value: { _light: `${m3[40]}10`, _dark: `${m3[80]}10` } },
  a3: { value: { _light: `${m3[40]}18`, _dark: `${m3[80]}18` } },
  a4: { value: { _light: `${m3[40]}24`, _dark: `${m3[80]}24` } },
  a5: { value: { _light: `${m3[40]}32`, _dark: `${m3[80]}32` } },
  a6: { value: { _light: `${m3[40]}48`, _dark: `${m3[80]}48` } },
  a7: { value: { _light: `${m3[40]}64`, _dark: `${m3[80]}64` } },
  a8: { value: { _light: `${m3[40]}80`, _dark: `${m3[80]}80` } },
  a9: { value: { _light: `${m3[40]}96`, _dark: `${m3[80]}96` } },
  a10: { value: { _light: `${m3[40]}AA`, _dark: `${m3[80]}AA` } },
  a11: { value: { _light: `${m3[40]}CC`, _dark: `${m3[80]}CC` } },
  a12: { value: { _light: `${m3[40]}EE`, _dark: `${m3[80]}EE` } },
  
  // Semantic variants (Park UI component styling)
  solid: {
    bg: {
      DEFAULT: { value: { _light: '{colors.primary.9}', _dark: '{colors.primary.9}' } },
      hover: { value: { _light: '{colors.primary.10}', _dark: '{colors.primary.10}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.white}', _dark: '{colors.primary.1}' } } 
    },
  },
  subtle: {
    bg: {
      DEFAULT: { value: { _light: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
      hover: { value: { _light: '{colors.primary.a4}', _dark: '{colors.primary.a4}' } },
      active: { value: { _light: '{colors.primary.a5}', _dark: '{colors.primary.a5}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } } 
    },
  },
  surface: {
    bg: {
      DEFAULT: { value: { _light: '{colors.primary.a2}', _dark: '{colors.primary.a2}' } },
      active: { value: { _light: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
    },
    border: {
      DEFAULT: { value: { _light: '{colors.primary.a6}', _dark: '{colors.primary.a6}' } },
      hover: { value: { _light: '{colors.primary.a7}', _dark: '{colors.primary.a7}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } } 
    },
  },
  outline: {
    bg: {
      hover: { value: { _light: '{colors.primary.a2}', _dark: '{colors.primary.a2}' } },
      active: { value: { _light: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
    },
    border: { 
      DEFAULT: { value: { _light: '{colors.primary.a7}', _dark: '{colors.primary.a7}' } } 
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } } 
    },
  },
  plain: {
    bg: {
      hover: { value: { _light: '{colors.primary.a3}', _dark: '{colors.primary.a3}' } },
      active: { value: { _light: '{colors.primary.a4}', _dark: '{colors.primary.a4}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.primary.a11}', _dark: '{colors.primary.a11}' } } 
    },
  },
});
```

### 2.2 Create Neutral (Gray) Color Mapping

**File:** `src/preset/colors/m3-neutral.ts`

```typescript
import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../../languages/material3.language';

const m3 = material3Language.colors.neutral;

export const neutral = defineSemanticTokens.colors({
  '1': { value: { _light: m3[99], _dark: m3[10] } },
  '2': { value: { _light: m3[95], _dark: m3[20] } },
  '3': { value: { _light: m3[90], _dark: m3[20] } },
  '4': { value: { _light: m3[80], _dark: m3[30] } },
  '5': { value: { _light: m3[70], _dark: m3[30] } },
  '6': { value: { _light: m3[60], _dark: m3[40] } },
  '7': { value: { _light: m3[50], _dark: m3[50] } },
  '8': { value: { _light: m3[40], _dark: m3[60] } },
  '9': { value: { _light: m3[40], _dark: m3[60] } },
  '10': { value: { _light: m3[30], _dark: m3[70] } },
  '11': { value: { _light: m3[30], _dark: m3[80] } },
  '12': { value: { _light: m3[10], _dark: m3[90] } },
  
  // Alpha variants
  a1: { value: { _light: '#00000003', _dark: '#ffffff05' } },
  a2: { value: { _light: '#00000006', _dark: '#ffffff09' } },
  a3: { value: { _light: '#0000000f', _dark: '#ffffff12' } },
  a4: { value: { _light: '#00000017', _dark: '#ffffff1b' } },
  a5: { value: { _light: '#0000001f', _dark: '#ffffff22' } },
  a6: { value: { _light: '#00000026', _dark: '#ffffff2c' } },
  a7: { value: { _light: '#00000031', _dark: '#ffffff3b' } },
  a8: { value: { _light: '#00000044', _dark: '#ffffff55' } },
  a9: { value: { _light: '#00000072', _dark: '#ffffff64' } },
  a10: { value: { _light: '#0000007c', _dark: '#ffffff72' } },
  a11: { value: { _light: '#0000009b', _dark: '#ffffffaf' } },
  a12: { value: { _light: '#000000df', _dark: '#ffffffed' } },
  
  // Semantic variants
  solid: {
    bg: {
      DEFAULT: { value: { _light: '{colors.black}', _dark: '{colors.white}' } },
      hover: { value: { _light: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.white}', _dark: '{colors.black}' } } 
    },
  },
  subtle: {
    bg: {
      DEFAULT: { value: { _light: '{colors.neutral.a3}', _dark: '{colors.neutral.a3}' } },
      hover: { value: { _light: '{colors.neutral.a4}', _dark: '{colors.neutral.a4}' } },
      active: { value: { _light: '{colors.neutral.a5}', _dark: '{colors.neutral.a5}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } } 
    },
  },
  surface: {
    bg: {
      DEFAULT: { value: { _light: '{colors.white}', _dark: '{colors.neutral.1}' } },
      hover: { value: { _light: '{colors.neutral.2}', _dark: '{colors.neutral.2}' } },
      active: { value: { _light: '{colors.neutral.3}', _dark: '{colors.neutral.3}' } },
    },
    border: {
      DEFAULT: { value: { _light: '{colors.neutral.6}', _dark: '{colors.neutral.6}' } },
      hover: { value: { _light: '{colors.neutral.7}', _dark: '{colors.neutral.7}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } } 
    },
  },
  outline: {
    bg: {
      hover: { value: { _light: '{colors.neutral.a2}', _dark: '{colors.neutral.a2}' } },
      active: { value: { _light: '{colors.neutral.a3}', _dark: '{colors.neutral.a3}' } },
    },
    border: { 
      DEFAULT: { value: { _light: '{colors.neutral.6}', _dark: '{colors.neutral.6}' } } 
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } } 
    },
  },
  plain: {
    bg: {
      hover: { value: { _light: '{colors.neutral.a3}', _dark: '{colors.neutral.a3}' } },
      active: { value: { _light: '{colors.neutral.a4}', _dark: '{colors.neutral.a4}' } },
    },
    fg: { 
      DEFAULT: { value: { _light: '{colors.neutral.12}', _dark: '{colors.neutral.12}' } } 
    },
  },
});
```

### 2.3 Create Error Color Mapping

**File:** `src/preset/colors/m3-error.ts`

```typescript
import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../../languages/material3.language';

const m3 = material3Language.colors.error;

export const error = defineSemanticTokens.colors({
  '1': { value: { _light: m3[99], _dark: m3[10] } },
  '2': { value: { _light: m3[95], _dark: m3[20] } },
  '3': { value: { _light: m3[90], _dark: m3[30] } },
  '4': { value: { _light: m3[80], _dark: m3[30] } },
  '5': { value: { _light: m3[70], _dark: m3[40] } },
  '6': { value: { _light: m3[60], _dark: m3[40] } },
  '7': { value: { _light: m3[50], _dark: m3[50] } },
  '8': { value: { _light: m3[40], _dark: m3[60] } },
  '9': { value: { _light: m3[40], _dark: m3[80] } },
  '10': { value: { _light: m3[30], _dark: m3[70] } },
  '11': { value: { _light: m3[30], _dark: m3[90] } },
  '12': { value: { _light: m3[10], _dark: m3[95] } },
  
  // Alpha variants
  a1: { value: { _light: `${m3[40]}08`, _dark: `${m3[80]}08` } },
  a2: { value: { _light: `${m3[40]}10`, _dark: `${m3[80]}10` } },
  a3: { value: { _light: `${m3[40]}18`, _dark: `${m3[80]}18` } },
  a4: { value: { _light: `${m3[40]}24`, _dark: `${m3[80]}24` } },
  a5: { value: { _light: `${m3[40]}32`, _dark: `${m3[80]}32` } },
  a6: { value: { _light: `${m3[40]}48`, _dark: `${m3[80]}48` } },
  a7: { value: { _light: `${m3[40]}64`, _dark: `${m3[80]}64` } },
  a8: { value: { _light: `${m3[40]}80`, _dark: `${m3[80]}80` } },
  a9: { value: { _light: `${m3[40]}96`, _dark: `${m3[80]}96` } },
  a10: { value: { _light: `${m3[40]}AA`, _dark: `${m3[80]}AA` } },
  a11: { value: { _light: `${m3[40]}CC`, _dark: `${m3[80]}CC` } },
  a12: { value: { _light: `${m3[40]}EE`, _dark: `${m3[80]}EE` } },
  
  // Semantic variants
  solid: {
    bg: {
      DEFAULT: { value: { _light: '{colors.error.9}', _dark: '{colors.error.9}' } },
      hover: { value: { _light: '{colors.error.10}', _dark: '{colors.error.10}' } },
    },
    fg: { DEFAULT: { value: { _light: 'white', _dark: 'white' } } },
  },
  subtle: {
    bg: {
      DEFAULT: { value: { _light: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
      hover: { value: { _light: '{colors.error.a4}', _dark: '{colors.error.a4}' } },
      active: { value: { _light: '{colors.error.a5}', _dark: '{colors.error.a5}' } },
    },
    fg: { DEFAULT: { value: { _light: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
  surface: {
    bg: {
      DEFAULT: { value: { _light: '{colors.error.a2}', _dark: '{colors.error.a2}' } },
      active: { value: { _light: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
    },
    border: {
      DEFAULT: { value: { _light: '{colors.error.a6}', _dark: '{colors.error.a6}' } },
      hover: { value: { _light: '{colors.error.a7}', _dark: '{colors.error.a7}' } },
    },
    fg: { DEFAULT: { value: { _light: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
  outline: {
    bg: {
      hover: { value: { _light: '{colors.error.a2}', _dark: '{colors.error.a2}' } },
      active: { value: { _light: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
    },
    border: { DEFAULT: { value: { _light: '{colors.error.a7}', _dark: '{colors.error.a7}' } } },
    fg: { DEFAULT: { value: { _light: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
  plain: {
    bg: {
      hover: { value: { _light: '{colors.error.a3}', _dark: '{colors.error.a3}' } },
      active: { value: { _light: '{colors.error.a4}', _dark: '{colors.error.a4}' } },
    },
    fg: { DEFAULT: { value: { _light: '{colors.error.a11}', _dark: '{colors.error.a11}' } } },
  },
});
```

### 2.4 Create Colors Index

**File:** `src/preset/colors/index.ts`

```typescript
import { primary } from './m3-primary';
import { neutral } from './m3-neutral';
import { error } from './m3-error';

// Export all M3 colors mapped to Park UI structure
export const colors = {
  primary,
  neutral,
  error,
  // Alias gray to neutral (Park UI expects this)
  gray: neutral,
  // Map red to error for Park UI compatibility
  red: error,
};
```

### 2.5 Create M3 Semantic Tokens Layer

**File:** `src/preset/semantic-tokens.ts`

```typescript
import { defineSemanticTokens } from '@pandacss/dev';
import { material3Language } from '../languages/material3.language';

const semantic = material3Language.semantic;
const semanticDark = material3Language.semanticDark;

/**
 * M3 Semantic Tokens - layered on top of Park UI
 * 
 * These provide M3-style naming (surface, onSurface, etc.)
 * while Park UI components use their own naming (fg, canvas, etc.)
 */
export const m3SemanticTokens = defineSemanticTokens.colors({
  // M3 Surface System
  surface: { 
    DEFAULT: { value: { _light: semantic.surface, _dark: semanticDark.surface } },
    dim: { value: { _light: semantic.surfaceContainerLow, _dark: semanticDark.surfaceContainerLow } },
    bright: { value: { _light: semantic.surfaceContainerHigh, _dark: semanticDark.surfaceContainerHigh } },
    container: {
      DEFAULT: { value: { _light: semantic.surfaceContainer, _dark: semanticDark.surfaceContainer } },
      low: { value: { _light: semantic.surfaceContainerLow, _dark: semanticDark.surfaceContainerLow } },
      lowest: { value: { _light: semantic.surfaceContainerLowest, _dark: semanticDark.surfaceContainerLowest } },
      high: { value: { _light: semantic.surfaceContainerHigh, _dark: semanticDark.surfaceContainerHigh } },
      highest: { value: { _light: semantic.surfaceContainerHighest, _dark: semanticDark.surfaceContainerHighest } },
    },
  },
  onSurface: { 
    DEFAULT: { value: { _light: semantic.onSurface, _dark: semanticDark.onSurface } },
    variant: { value: { _light: semantic.onSurfaceVariant, _dark: semanticDark.onSurfaceVariant } },
  },
  
  // M3 Primary tokens (for explicit M3 usage)
  m3Primary: { 
    DEFAULT: { value: { _light: semantic.primary, _dark: semanticDark.primary } },
    container: { value: { _light: semantic.primaryContainer, _dark: semanticDark.primaryContainer } },
  },
  onM3Primary: { 
    DEFAULT: { value: { _light: semantic.onPrimary, _dark: semanticDark.onPrimary } },
    container: { value: { _light: semantic.onPrimaryContainer, _dark: semanticDark.onPrimaryContainer } },
  },
  
  // M3 Secondary
  secondary: { 
    DEFAULT: { value: { _light: semantic.secondary, _dark: semanticDark.secondary } },
    container: { value: { _light: semantic.secondaryContainer, _dark: semanticDark.secondaryContainer } },
  },
  onSecondary: { 
    DEFAULT: { value: { _light: semantic.onSecondary, _dark: semanticDark.onSecondary } },
    container: { value: { _light: semantic.onSecondaryContainer, _dark: semanticDark.onSecondaryContainer } },
  },
  
  // M3 Tertiary  
  tertiary: { 
    DEFAULT: { value: { _light: semantic.tertiary, _dark: semanticDark.tertiary } },
    container: { value: { _light: semantic.tertiaryContainer, _dark: semanticDark.tertiaryContainer } },
  },
  onTertiary: { 
    DEFAULT: { value: { _light: semantic.onTertiary, _dark: semanticDark.onTertiary } },
    container: { value: { _light: semantic.onTertiaryContainer, _dark: semanticDark.onTertiaryContainer } },
  },
  
  // M3 Outline
  outline: { 
    DEFAULT: { value: { _light: semantic.outline, _dark: semanticDark.outline } },
    variant: { value: { _light: semantic.outlineVariant, _dark: semanticDark.outlineVariant } },
  },
  
  // M3 Inverse
  inverseSurface: { value: { _light: semantic.inverseSurface, _dark: semanticDark.inverseSurface } },
  inverseOnSurface: { value: { _light: semantic.inverseOnSurface, _dark: semanticDark.inverseOnSurface } },
  inversePrimary: { value: { _light: semantic.inversePrimary, _dark: semanticDark.inversePrimary } },
  
  // Scrim/Shadow
  scrim: { value: { _light: semantic.scrim, _dark: semanticDark.scrim } },
});
```

---

## Phase 3: Update Panda Config (1 hour)

Replace `panda.config.ts` with the new configuration that uses the Park UI preset pattern with M3 tokens.

**Reference:** See Park UI preset at `/park-ui/packages/preset/src/index.ts` for the pattern.

---

## Phase 4: Copy Park UI Recipes (1 hour)

Copy these recipe files from `/park-ui/packages/preset/src/recipes/` to `src/preset/recipes/`:

**Essential for Day 1:**
- `button.ts`
- `input.ts`
- `field.ts`

**Update imports** in each file to use local paths.

---

## Phase 5: Copy Park UI Components (1 hour)

Copy component files from `/park-ui/components/react/src/components/ui/` to `src/components/`:

**Day 1 Priority:**
- `button.tsx`
- `input.tsx`
- `field.tsx`
- `icon.tsx`
- `spinner.tsx`
- `loader.tsx`
- `group.tsx`

**Update imports** in each file.

---

## Phase 6: Update Storybook Stories (1 hour)

Create new Button story showcasing Park UI variants.

---

## Phase 7: Build & Verify (30 min)

```bash
pnpm build:panda
pnpm dev
```

### Verification Checklist

- [ ] Storybook loads without errors
- [ ] Button renders with M3 green primary color
- [ ] Button variants (solid, subtle, outline, etc.) work
- [ ] Dark mode toggle works
- [ ] Input component renders
- [ ] No TypeScript errors

---

## Success Criteria

| Criterion | Target |
|-----------|--------|
| Build passes | ✅ Zero errors |
| Storybook loads | ✅ All stories render |
| Button uses M3 primary (#3F6900 area) | ✅ Visual match |
| Dark mode works | ✅ Colors invert correctly |
| Core components work | ✅ Button, Input, Field |
| Published version | ✅ @discourser/design-system@0.2.0 |

---

## Reference Files

When implementing, reference these Park UI source files:
- `/park-ui/packages/preset/src/index.ts` - Preset structure
- `/park-ui/packages/preset/src/theme/colors/green.ts` - Color structure template
- `/park-ui/packages/preset/src/recipes/button.ts` - Recipe pattern
- `/park-ui/components/react/src/components/ui/button.tsx` - Component pattern

---

## Notes

1. **Don't install @park-ui/preset from npm** - it's private, we're creating our own
2. **Preserve material3.language.ts** - it's our source of truth for colors
3. **The bridge pattern** is M3 tonal (0-100) → Radix scale (1-12)
4. **Test dark mode early** - the _light/_dark conditional values must work
5. **colorPalette** is how Park UI switches accent colors - ensure it's set up
