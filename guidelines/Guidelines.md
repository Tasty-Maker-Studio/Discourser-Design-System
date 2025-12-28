# Discourser Design System Guidelines

This project uses the `@discourser/design-system` package, a Material Design 3 implementation built with Panda CSS and Ark UI.

## IMPORTANT: Always Read These First

Before writing any code, follow these steps IN ORDER:

### Step 1: Read Overview Files (REQUIRED)
Read ALL files with a name that starts with "overview-":
- `overview-components.md` - Available components and usage patterns

### Step 2: Read Design Token Files (REQUIRED)
Read ALL files in the `design-tokens/` folder:
- `design-tokens/colors.md`
- `design-tokens/typography.md`
- `design-tokens/spacing.md`
- `design-tokens/elevation.md`

### Step 3: Plan Components Needed (REQUIRED)
Identify which components you need to use.

### Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)
BEFORE using ANY component, you MUST read its guidelines file first:
- Using Button? → Read `components/button.md` FIRST
- Using Dialog? → Read `components/dialog.md` FIRST
- Using Input? → Read `components/input.md` FIRST
- Using Card? → Read `components/card.md` FIRST
- Using IconButton? → Read `components/icon-button.md` FIRST
- Using Switch? → Read `components/switch.md` FIRST

DO NOT write code using a component until you have read its specific guidelines.

## Core Principles

- **Always prefer design system components** over native HTML elements
- **Use semantic tokens** (e.g., `primary`, `onPrimary`) not raw colors
- **Follow M3 patterns** for variants, sizing, and state layers
- **Do not override styles** unless absolutely necessary
- **Never use inline styles** with raw color values

## Package Installation

```bash
npm install @discourser/design-system react react-dom
```

## Package Imports

```typescript
// Components
import { Button, Card, Dialog, Input, IconButton, Switch } from '@discourser/design-system';

// For advanced styling (use sparingly)
import { css } from '@discourser/design-system/styled-system/css';
import { button } from '@discourser/design-system/styled-system/recipes';
```

## Quick Reference

| Component | Variants | Sizes | Guidelines |
|-----------|----------|-------|------------|
| Button | filled, outlined, text, elevated, tonal | sm, md, lg | `components/button.md` |
| Card | elevated, filled, outlined | - | `components/card.md` |
| IconButton | standard, filled, tonal, outlined | sm, md, lg | `components/icon-button.md` |
| Input | filled, outlined | sm, md | `components/input.md` |
| Dialog | - | sm, md, lg, fullscreen | `components/dialog.md` |
| Switch | - | sm, md | `components/switch.md` |

## Theme Support

The design system supports light and dark themes. The theme is controlled by the `data-theme` attribute on a parent element (typically `html` or `body`):

```tsx
// Light theme (default)
<html data-theme="light">

// Dark theme
<html data-theme="dark">
```

All semantic color tokens automatically adapt to the current theme.

## Getting Help

For questions or issues, visit:
- GitHub: https://github.com/Tasty-Maker-Studio/Discourser-Design-System
- Documentation: Read the overview and component-specific guidelines in this folder
