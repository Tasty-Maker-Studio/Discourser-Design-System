# Discourser Design System Guidelines

This project uses the `@discourser/design-system` package, a Material Design 3 implementation built with Panda CSS and Ark UI.

## IMPORTANT: Always Read These First

Before writing any code, follow these steps IN ORDER:

### Step 1: Read Overview Files (REQUIRED)

Read ALL files with a name that starts with "overview-":

- **[overview-components.md](overview-components.md)** - Available components with quick reference tables
- **[overview-imports.md](overview-imports.md)** - Package installation and import patterns
- **[overview-patterns.md](overview-patterns.md)** - Common UI patterns combining multiple components

### Step 2: Read Design Token Files (REQUIRED)

Read ALL files in the `design-tokens/` folder:

- **[design-tokens/colors.md](design-tokens/colors.md)** - Semantic color tokens and usage
- **[design-tokens/typography.md](design-tokens/typography.md)** - Typography scale and text styles
- **[design-tokens/spacing.md](design-tokens/spacing.md)** - Spacing system and layout
- **[design-tokens/elevation.md](design-tokens/elevation.md)** - Surface elevation and shadows

### Step 3: Plan Components Needed (REQUIRED)

Identify which components you need to use based on your task.

Refer to [overview-components.md](overview-components.md) for the complete list.

### Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)

BEFORE using ANY component, you MUST read its guidelines file first:

**Interactive Elements:**

- Using Button? → Read **[components/button.md](components/button.md)** FIRST
- Using IconButton? → Read **[components/icon-button.md](components/icon-button.md)** FIRST
- Using Switch? → Read **[components/switch.md](components/switch.md)** FIRST
- Using Checkbox? → Read **[components/checkbox.md](components/checkbox.md)** FIRST
- Using RadioGroup? → Read **[components/radio-group.md](components/radio-group.md)** FIRST

**Form Elements:**

- Using Input? → Read **[components/input.md](components/input.md)** FIRST
- Using InputAddon? → Read **[components/input-addon.md](components/input-addon.md)** FIRST
- Using InputGroup? → Read **[components/input-group.md](components/input-group.md)** FIRST
- Using Textarea? → Read **[components/textarea.md](components/textarea.md)** FIRST
- Using Select? → Read **[components/select.md](components/select.md)** FIRST
- Using Slider? → Read **[components/slider.md](components/slider.md)** FIRST

**Layout & Container:**

- Using Card? → Read **[components/card.md](components/card.md)** FIRST
- Using Accordion? → Read **[components/accordion.md](components/accordion.md)** FIRST
- Using Tabs? → Read **[components/tabs.md](components/tabs.md)** FIRST
- Using Drawer? → Read **[components/drawer.md](components/drawer.md)** FIRST

**Overlay Elements:**

- Using Dialog? → Read **[components/dialog.md](components/dialog.md)** FIRST
- Using Popover? → Read **[components/popover.md](components/popover.md)** FIRST
- Using Tooltip? → Read **[components/tooltip.md](components/tooltip.md)** FIRST

**Feedback & Status:**

- Using Badge? → Read **[components/badge.md](components/badge.md)** FIRST
- Using Avatar? → Read **[components/avatar.md](components/avatar.md)** FIRST
- Using Toast? → Read **[components/toast.md](components/toast.md)** FIRST
- Using Progress? → Read **[components/progress.md](components/progress.md)** FIRST
- Using Skeleton? → Read **[components/skeleton.md](components/skeleton.md)** FIRST
- Using Spinner? → Read **[components/spinner.md](components/spinner.md)** FIRST

**Typography:**

- Using Header? → Read **[components/heading.md](components/heading.md)** FIRST

**DO NOT write code using a component until you have read its specific guidelines.**

## CRITICAL: Working with Figma Designs

**When building from a Figma frame, DO NOT pixel-match or extract values from the design.**

Instead, follow these rules:

### NEVER Do This:

- ❌ Extract hex colors from the Figma design (e.g., `#4A4A4A`, `#f5f1eb`)
- ❌ Copy exact pixel values for spacing (e.g., `padding: '20px 10px'`)
- ❌ Copy exact font sizes (e.g., `fontSize: '16px'`)
- ❌ Copy exact border radius values (e.g., `borderRadius: '13px'`)
- ❌ Create inline SVGs for logos or icons
- ❌ Override component styles with `className={css({...})}` containing hardcoded values
- ❌ Use `<span>` or `<div>` when a design system component exists

### ALWAYS Do This:

- ✅ Map visual colors to semantic tokens (green → `primary`, light bg → `surface`)
- ✅ Use spacing tokens (`sm`, `md`, `lg`) not pixel values
- ✅ Use typography tokens (`bodyMedium`, `titleLarge`) not font sizes
- ✅ Use radius tokens (`small`, `medium`, `large`) not pixel values
- ✅ Use placeholder elements or icon components for logos/icons
- ✅ Use component variants (`variant="filled"`) not style overrides
- ✅ Use `<Badge>` component, not styled spans
- ✅ Use `<Button>` component, not styled divs

### Color Mapping Guide

When you see these colors in a Figma design, use these tokens:

| Figma Color          | Semantic Token                  | Usage                       |
| -------------------- | ------------------------------- | --------------------------- |
| Green/olive tones    | `primary`                       | Brand color, CTAs           |
| Light cream/beige    | `surface` or `surfaceContainer` | Backgrounds                 |
| Dark gray/black text | `onSurface`                     | Primary text                |
| Medium gray text     | `onSurfaceVariant`              | Secondary text              |
| White                | `onPrimary`                     | Text on primary backgrounds |
| Borders/dividers     | `outline` or `outlineVariant`   | Borders                     |
| Error/red tones      | `error`                         | Error states                |

### Component Override Rules

**Acceptable overrides:**

```tsx
// ✅ OK - Layout positioning only
<Card.Root className={css({ width: '100%', maxWidth: '400px' })}>
```

**Unacceptable overrides:**

```tsx
// ❌ WRONG - Overriding colors, fonts, spacing
<Card.Root className={css({ bg: '#f5f1eb', borderRadius: '13px', padding: '20px' })}>
```

### Logo and Icon Handling

- **Logos**: Use a placeholder `<div>` with text or import from an assets folder. NEVER create inline SVGs.
- **Icons**: Use Lucide React icons or a placeholder. NEVER create custom SVG icon components.

```tsx
// ✅ OK - Placeholder for logo
<div className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}>
  <span>🎯</span>
  <span>Discourser</span>
</div>;

// ❌ WRONG - Inline SVG
function Logo() {
  return <svg>...</svg>; // Never do this
}
```

---

## Core Principles

- **Always prefer design system components** over native HTML elements
- **Use semantic tokens** (e.g., `primary`, `onPrimary`) not raw colors
- **Follow M3 patterns** for variants, sizing, and state layers
- **Do not override styles** unless absolutely necessary
- **Never use inline styles** with raw color values
- **Read component guidelines** before using any component
- **Follow common patterns** documented in overview-patterns.md
- **Map Figma designs to tokens** — never extract exact values

## Quick Start

1. Install the package (see [overview-imports.md](overview-imports.md))
2. Import components you need
3. Use components with their documented variants and props
4. Apply semantic tokens for custom styling
5. Follow accessibility best practices from component guidelines

## Theme Support

The design system supports light and dark themes. The theme is controlled by the `data-theme` attribute on a parent element (typically `html` or `body`):

```tsx
// Light theme (default)
<html data-theme="light">

// Dark theme
<html data-theme="dark">
```

All semantic color tokens automatically adapt to the current theme.

## Documentation Structure

```
guidelines/
├── Guidelines.md (this file)         # Main navigation
├── overview-components.md            # Component catalog
├── overview-imports.md               # Installation & imports
├── overview-patterns.md              # Common UI patterns
├── design-tokens/
│   ├── colors.md                     # Color system
│   ├── typography.md                 # Type scale
│   ├── spacing.md                    # Spacing system
│   └── elevation.md                  # Elevation system
└── components/
    ├── button.md                     # Component guidelines
    ├── input.md
    └── ...                           # (25 total components)
```

## Getting Help

For questions or issues, visit:

- **GitHub:** https://github.com/Tasty-Maker-Studio/Discourser-Design-System
- **Documentation:** Read the overview and component-specific guidelines in this folder
- **Component Reference:** See [overview-components.md](overview-components.md)
- **Patterns:** See [overview-patterns.md](overview-patterns.md)
