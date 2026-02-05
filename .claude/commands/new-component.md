---
description: Create a new component with Ark UI primitives, Panda CSS recipe, tests, and Storybook stories
---

# Create New Component: $ARGUMENTS

## Pre-Implementation: Gather Context

### Step 1: Check for Figma Reference

Check if `docs/ux/$ARGUMENTS/` exists with design exports.

- If present: Read `.claude/skills/figma-to-component/skill.md` and analyze the images
- Document observed states, colors, spacing, and derive the component API

### Step 2: Check Ark UI for Primitives

Use the Ark UI MCP to fetch documentation for this component type:

- Search for `$ARGUMENTS` or related primitive (e.g., "stepper" → "steps")
- If Ark UI has a matching primitive, use it as the foundation
- Note the component anatomy (Root, Item, Trigger, Content, etc.)
- Note available props, callbacks, and accessibility features

### Step 3: Load Required Skills

Read these skills before implementing:

1. `.claude/skills/component-patterns/skill.md` - React patterns, forwardRef, TypeScript
2. `.claude/skills/panda-recipes/skill.md` - Recipe structure, variants
3. `.claude/skills/m3-tokens/skill.md` - Semantic token values

## Implementation

### Step 4: Create Slot Recipe (for compound components)

If the Ark UI component has multiple parts (slots), create a slot recipe:

```typescript
// src/recipes/$ARGUMENTS.recipe.ts
import { defineSlotRecipe } from '@pandacss/dev';

export const $ARGUMENTSRecipe = defineSlotRecipe({
  className: '$ARGUMENTS',
  description: 'Description from Figma analysis',
  slots: [
    'root',
    'list',
    'item',
    'trigger',
    'indicator',
    'separator',
    'content',
  ],

  base: {
    root: {
      /* styles */
    },
    item: {
      /* styles */
    },
    // ... each slot
  },

  variants: {
    // Variants derived from Figma states
    size: {
      sm: {
        /* slot styles */
      },
      md: {
        /* slot styles */
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
```

For simple components, use `defineRecipe` instead.

### Step 5: Create React Component

```
src/components/$ARGUMENTS/
├── $ARGUMENTS.tsx           # Component wrapping Ark UI
├── $ARGUMENTS.test.tsx      # Unit tests
├── index.ts                 # Barrel export
```

Component should:

- Wrap Ark UI primitive with `forwardRef`
- Apply slot recipe classes to each part
- Export proper TypeScript types
- Include JSDoc comments

### Step 6: Create Tests

```typescript
// src/components/$ARGUMENTS/$ARGUMENTS.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { $ARGUMENTS } from './$ARGUMENTS';

describe('$ARGUMENTS', () => {
  // Rendering tests
  it('renders with default props', () => {});
  it('renders all slots correctly', () => {});

  // State tests (from Figma analysis)
  it('shows current state styling', () => {});
  it('shows completed state styling', () => {});
  it('shows upcoming state styling', () => {});

  // Interaction tests
  it('handles click events', () => {});
  it('supports keyboard navigation', () => {});

  // Accessibility tests
  it('has correct ARIA attributes', () => {});
  it('supports screen readers', () => {});

  // Variant tests
  it('applies size variants correctly', () => {});
});
```

### Step 7: Create Storybook Stories

```
stories/$ARGUMENTS.stories.tsx
```

Stories should demonstrate:

- Default state
- Each variant from the recipe
- Each visual state from Figma (current, completed, upcoming, etc.)
- Interactive example showing state transitions
- All sizes
- Responsive behavior

```typescript
// stories/$ARGUMENTS.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { $ARGUMENTS } from '../src/components/$ARGUMENTS';

const meta: Meta<typeof $ARGUMENTS> = {
  title: 'Components/$ARGUMENTS',
  component: $ARGUMENTS,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Define controls for interactive props
  },
};

export default meta;
type Story = StoryObj<typeof $ARGUMENTS>;

// Default
export const Default: Story = {
  args: {
    // default props
  },
};

// All States (from Figma analysis)
export const AllStates: Story = {
  name: 'All Visual States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Show component at each step to demonstrate all states */}
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Show sm, md, lg variants */}
    </div>
  ),
};

// Interactive
export const Interactive: Story = {
  name: 'Interactive Demo',
  args: {
    // props that enable full interaction
  },
};

// Figma Comparison (optional - for visual QA)
export const FigmaComparison: Story = {
  name: 'Figma Reference',
  parameters: {
    design: {
      type: 'figma',
      url: 'YOUR_FIGMA_URL_HERE', // Update if using Storybook Figma addon
    },
  },
  render: () => (
    // Render component matching exact Figma state for comparison
  ),
};
```

## Post-Implementation

### Step 8: Register Recipe

Add to `panda.config.ts`:

```typescript
theme: {
  extend: {
    slotRecipes: {
      $ARGUMENTS: $ARGUMENTSRecipe,
    },
    // OR for simple recipes:
    recipes: {
      $ARGUMENTS: $ARGUMENTSRecipe,
    },
  },
}
```

### Step 9: Export Component

Add to `src/components/index.ts`:

```typescript
export * from './$ARGUMENTS';
```

### Step 10: Regenerate and Verify

```bash
pnpm build:panda    # Regenerate styled-system
pnpm test           # Run tests
pnpm dev            # Verify in Storybook
```

## Quality Checklist

- [ ] Figma design analyzed (if present in `docs/ux/`)
- [ ] Ark UI primitive used (if available)
- [ ] Slot recipe created with all visual states
- [ ] All colors use semantic tokens (no hex values)
- [ ] Component uses forwardRef pattern
- [ ] TypeScript types exported
- [ ] Tests cover rendering, states, interactions, a11y
- [ ] Storybook stories show all variants and states
- [ ] Recipe registered in panda.config.ts
- [ ] Component exported from index.ts
- [ ] `pnpm build:panda` succeeds
- [ ] `pnpm test` passes
- [ ] Visual match with Figma confirmed in Storybook
