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

**Interactive Elements:**

- Using Button? → Read `components/button.md` FIRST
- Using IconButton? → Read `components/icon-button.md` FIRST
- Using Switch? → Read `components/switch.md` FIRST
- Using Checkbox? → Read `components/checkbox.md` FIRST
- Using RadioGroup? → Read `components/radio-group.md` FIRST

**Form Elements:**

- Using Input? → Read `components/input.md` FIRST
- Using Textarea? → Read `components/textarea.md` FIRST
- Using Select? → Read `components/select.md` FIRST

**Layout & Container:**

- Using Card? → Read `components/card.md` FIRST
- Using Accordion? → Read `components/accordion.md` FIRST
- Using Tabs? → Read `components/tabs.md` FIRST
- Using Drawer? → Read `components/drawer.md` FIRST

**Overlay Elements:**

- Using Dialog? → Read `components/dialog.md` FIRST
- Using Popover? → Read `components/popover.md` FIRST
- Using Tooltip? → Read `components/tooltip.md` FIRST

**Feedback & Status:**

- Using Badge? → Read `components/badge.md` FIRST
- Using Avatar? → Read `components/avatar.md` FIRST
- Using Toast? → Read `components/toast.md` FIRST
- Using Progress? → Read `components/progress.md` FIRST
- Using Skeleton? → Read `components/skeleton.md` FIRST

**Typography:**

- Using Heading? → Read `components/heading.md` FIRST

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
// Simple Components (exported directly)
import {
  Button,
  Card,
  Input,
  Textarea,
  Heading,
  Badge,
  Toaster,
  toaster,
} from '@discourser/design-system';

// Compound Components (exported as namespaces)
import * as Checkbox from '@discourser/design-system';
import * as RadioGroup from '@discourser/design-system';
import * as Select from '@discourser/design-system';
import * as Dialog from '@discourser/design-system';
import * as Drawer from '@discourser/design-system';
import * as Popover from '@discourser/design-system';
import * as Tooltip from '@discourser/design-system';
import * as Accordion from '@discourser/design-system';
import * as Tabs from '@discourser/design-system';
import * as Avatar from '@discourser/design-system';
import * as Progress from '@discourser/design-system';
import * as Skeleton from '@discourser/design-system';
import * as IconButton from '@discourser/design-system';
import * as Switch from '@discourser/design-system';

// For advanced styling (use sparingly)
import { css } from '@discourser/design-system/styled-system/css';
import { button } from '@discourser/design-system/styled-system/recipes';
```

## Quick Reference

**Interactive Elements:**

| Component  | Key Variants                            | Guidelines                  |
| ---------- | --------------------------------------- | --------------------------- |
| Button     | filled, outlined, text, elevated, tonal | `components/button.md`      |
| IconButton | standard, filled, tonal, outlined       | `components/icon-button.md` |
| Switch     | -                                       | `components/switch.md`      |
| Checkbox   | solid, outline, subtle                  | `components/checkbox.md`    |
| RadioGroup | solid                                   | `components/radio-group.md` |

**Form Elements:**

| Component | Key Variants                      | Guidelines               |
| --------- | --------------------------------- | ------------------------ |
| Input     | surface, outline, subtle          | `components/input.md`    |
| Textarea  | surface, outline, subtle, flushed | `components/textarea.md` |
| Select    | outline, surface                  | `components/select.md`   |

**Layout & Containers:**

| Component | Key Variants                        | Guidelines                |
| --------- | ----------------------------------- | ------------------------- |
| Card      | elevated, filled, outlined          | `components/card.md`      |
| Accordion | outline, plain                      | `components/accordion.md` |
| Tabs      | line, subtle, enclosed              | `components/tabs.md`      |
| Drawer    | Placements: start, end, top, bottom | `components/drawer.md`    |

**Overlays:**

| Component | Key Features                  | Guidelines              |
| --------- | ----------------------------- | ----------------------- |
| Dialog    | Sizes: sm, md, lg, fullscreen | `components/dialog.md`  |
| Popover   | 12 positioning options        | `components/popover.md` |
| Tooltip   | Lightweight contextual help   | `components/tooltip.md` |

**Feedback & Status:**

| Component | Key Variants                                     | Guidelines               |
| --------- | ------------------------------------------------ | ------------------------ |
| Badge     | subtle, solid, surface, outline                  | `components/badge.md`    |
| Avatar    | Sizes: 2xs to 2xl, Shapes: full, rounded, square | `components/avatar.md`   |
| Toast     | Types: success, error, warning, loading          | `components/toast.md`    |
| Progress  | Shapes: linear, circular                         | `components/progress.md` |
| Skeleton  | Animations: pulse, shine, none                   | `components/skeleton.md` |

**Typography:**

| Component | Key Features                      | Guidelines              |
| --------- | --------------------------------- | ----------------------- |
| Heading   | Sizes: xs to 7xl (M3 text styles) | `components/heading.md` |

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
