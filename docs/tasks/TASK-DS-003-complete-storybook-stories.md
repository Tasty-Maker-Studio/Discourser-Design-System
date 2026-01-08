# TASK-DS-003: Complete Storybook Stories & Missing Components

**Date:** January 7, 2026  
**Estimated Time:** 3-4 hours  
**Priority:** P1 - Design Lab Portfolio Quality  
**Depends On:** TASK-DS-002 (Complete Components & npm Publish) ✅ COMPLETED

---

## Objective

Complete Storybook documentation and add missing components:

1. **Add missing components:** Heading, Input, InputAddon, InputGroup
2. **Add missing stories:** For all 9 components without stories + 4 new components
3. Ensure complete Design Lab portfolio demonstration

---

## Context

### Current State (After TASK-DS-002)

✅ 26 components in the design system
✅ Published to npm as @discourser/design-system@0.2.1
✅ 12 stories exist

### Missing Components (4)

- **Heading** - Typography component for headings (h1-h6)
- **Input** - Standalone input (currently only have Field.Input)
- **InputAddon** - Prefix/suffix addons for inputs
- **InputGroup** - Container for input with start/end elements

### Missing Stories (9 existing + 4 new = 13 total)

**Existing components without stories:**

- Accordion, Badge, Checkbox, Drawer, Popover, RadioGroup, Skeleton, Textarea, Tooltip

**New components needing stories:**

- Heading, Input, InputAddon, InputGroup

---

## Pre-Implementation Checklist

- [ ] Storybook runs without errors (`pnpm dev`)
- [ ] All components export correctly from `src/components/index.ts`
- [ ] Review existing stories for patterns to follow

---

## Phase 1: Add Missing Components (45 min)

### 1.1 Create Heading Component

**File:** `src/components/Heading.tsx`

```tsx
import type { ComponentProps } from 'react';
import { styled } from '../styled-system/jsx';
import { type HeadingVariantProps, heading } from '../styled-system/recipes';
import type { StyledComponent } from '../styled-system/types';

type Props = HeadingVariantProps & { as?: React.ElementType };

export type HeadingProps = ComponentProps<typeof Heading>;
export const Heading = styled('h2', heading) as StyledComponent<'h2', Props>;
```

### 1.2 Create Heading Recipe

**File:** `src/preset/recipes/heading.ts`

```typescript
import { defineRecipe } from '@pandacss/dev';

export const heading = defineRecipe({
  className: 'heading',
  base: {
    fontWeight: 'semibold',
    color: 'fg.default',
  },
  defaultVariants: {
    size: 'xl',
  },
  variants: {
    size: {
      xs: { textStyle: 'xs' },
      sm: { textStyle: 'sm' },
      md: { textStyle: 'md' },
      lg: { textStyle: 'lg' },
      xl: { textStyle: 'xl' },
      '2xl': { textStyle: '2xl' },
      '3xl': { textStyle: '3xl' },
      '4xl': { textStyle: '4xl' },
      '5xl': { textStyle: '5xl' },
      '6xl': { textStyle: '6xl' },
      '7xl': { textStyle: '7xl' },
    },
  },
});
```

### 1.3 Create Input Component

**File:** `src/components/Input.tsx`

```tsx
import { Field } from '@ark-ui/react/field';
import type { ComponentProps } from 'react';
import { styled } from '../styled-system/jsx';
import { input } from '../styled-system/recipes';

export type InputProps = ComponentProps<typeof Input>;
export const Input = styled(Field.Input, input);
```

### 1.4 Create Input Recipe

**File:** `src/preset/recipes/input.ts`

```typescript
import type { RecipeConfig } from '@pandacss/dev';

export const input = {
  className: 'input',
  jsx: ['Input', 'Field.Input'],
  base: {
    appearance: 'none',
    borderRadius: 'l2',
    height: 'var(--input-height)',
    minHeight: 'var(--input-height)',
    minW: 'var(--input-height)',
    outline: '0',
    position: 'relative',
    textAlign: 'start',
    transition: 'colors',
    width: '100%',
    _disabled: {
      layerStyle: 'disabled',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variants: {
    variant: {
      outline: {
        borderWidth: '1px',
        borderColor: 'neutral.outline.border',
        focusVisibleRing: 'inside',
        _invalid: {
          focusRingColor: 'error',
          borderColor: 'error',
        },
      },
      surface: {
        bg: 'neutral.surface.bg',
        borderWidth: '1px',
        borderColor: 'neutral.surface.border',
        focusVisibleRing: 'inside',
        _invalid: {
          focusRingColor: 'error',
          borderColor: 'error',
        },
      },
      subtle: {
        borderWidth: '1px',
        borderColor: 'transparent',
        bg: 'neutral.subtle.bg',
        color: 'neutral.subtle.fg',
        focusVisibleRing: 'inside',
        _invalid: {
          focusRingColor: 'error',
          borderColor: 'error',
        },
      },
      flushed: {
        borderBottomWidth: '1px',
        borderBottomColor: 'neutral.outline.border',
        borderRadius: '0',
        color: 'fg.default',
        px: '0',
        _invalid: {
          borderColor: 'error',
        },
        _focus: {
          borderColor: 'colorPalette.solid.bg',
          boxShadowColor: 'colorPalette.solid.bg',
          boxShadow: '0 1px 0 0 var(--shadow-color)',
          _invalid: {
            borderColor: 'error',
            boxShadowColor: 'error',
          },
        },
      },
    },
    size: {
      '2xs': { textStyle: 'xs', px: '1.5', '--input-height': 'sizes.7' },
      xs: { textStyle: 'sm', px: '2', '--input-height': 'sizes.8' },
      sm: { textStyle: 'sm', px: '2.5', '--input-height': 'sizes.9' },
      md: { textStyle: 'md', px: '3', '--input-height': 'sizes.10' },
      lg: { textStyle: 'md', px: '3.5', '--input-height': 'sizes.11' },
      xl: { textStyle: 'lg', px: '4', '--input-height': 'sizes.12' },
      '2xl': { textStyle: '3xl', px: '4.5', '--input-height': 'sizes.16' },
    },
  },
} satisfies RecipeConfig;
```

### 1.5 Create InputAddon Component

**File:** `src/components/InputAddon.tsx`

```tsx
import { ark } from '@ark-ui/react/factory';
import type { ComponentProps } from 'react';
import { styled } from '../styled-system/jsx';
import { inputAddon } from '../styled-system/recipes';

export type InputAddonProps = ComponentProps<typeof InputAddon>;
export const InputAddon = styled(ark.div, inputAddon);
```

### 1.6 Create InputAddon Recipe

**File:** `src/preset/recipes/input-addon.ts`

```typescript
import { defineRecipe } from '@pandacss/dev';

export const inputAddon = defineRecipe({
  className: 'input-addon',
  base: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 'l2',
    color: 'fg.muted',
    display: 'flex',
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    width: 'auto',
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variants: {
    variant: {
      outline: {
        borderWidth: '1px',
        borderColor: 'neutral.outline.border',
      },
      surface: {
        bg: 'neutral.surface.bg',
        borderWidth: '1px',
        borderColor: 'neutral.surface.border',
      },
      subtle: {
        bg: 'neutral.subtle.bg',
      },
    },
    size: {
      xs: { textStyle: 'sm', px: '2', _icon: { boxSize: '4' } },
      sm: { textStyle: 'sm', px: '2.5', _icon: { boxSize: '4.5' } },
      md: { textStyle: 'md', px: '3', _icon: { boxSize: '5' } },
      lg: { textStyle: 'md', px: '3.5', _icon: { boxSize: '5' } },
      xl: { textStyle: 'lg', px: '4', _icon: { boxSize: '5.5' } },
    },
  },
});
```

### 1.7 Create InputGroup Component

**File:** `src/components/InputGroup.tsx`

```tsx
'use client';
import { ark } from '@ark-ui/react/factory';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';
import { createStyleContext } from '../styled-system/jsx';
import { inputGroup } from '../styled-system/recipes';

const { withProvider, withContext } = createStyleContext(inputGroup);

type RootProps = ComponentProps<typeof Root>;
const Root = withProvider(ark.div, 'root');
const Element = withContext(ark.div, 'element');

export interface InputGroupProps extends RootProps {
  startElement?: ReactNode | undefined;
  endElement?: ReactNode | undefined;
}

const InputGroupRoot = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const { startElement, endElement, children, ...rest } = props;

    return (
      <Root ref={ref} {...rest}>
        {startElement && (
          <Element insetInlineStart="0" top="0">
            {startElement}
          </Element>
        )}
        {children}
        {endElement && (
          <Element insetInlineEnd="0" top="0">
            {endElement}
          </Element>
        )}
      </Root>
    );
  },
);

export const InputGroup = Object.assign(InputGroupRoot, {
  Root,
  Element,
});
```

### 1.8 Create InputGroup Recipe

**File:** `src/preset/recipes/input-group.ts`

```typescript
import { defineSlotRecipe } from '@pandacss/dev';

export const inputGroup = defineSlotRecipe({
  className: 'input-group',
  slots: ['root', 'element'],
  base: {
    root: {
      position: 'relative',
      width: 'full',
    },
    element: {
      alignItems: 'center',
      color: 'fg.muted',
      display: 'flex',
      height: 'full',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: '2',
      _icon: {
        color: 'fg.subtle',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      xs: {
        element: { minW: '8', _icon: { boxSize: '4' } },
        root: {
          '& > input:not(:first-child)': { ps: '7!' },
          '& > input:not(:last-child)': { pe: '7!' },
        },
      },
      sm: {
        root: {
          '& > input:not(:first-child)': { ps: '8!' },
          '& > input:not(:last-child)': { pe: '8!' },
        },
        element: { minW: '9', _icon: { boxSize: '4.5' } },
      },
      md: {
        root: {
          '& > input:not(:first-child)': { ps: '9!' },
          '& > input:not(:last-child)': { pe: '9!' },
        },
        element: { minW: '10', _icon: { boxSize: '5' } },
      },
      lg: {
        root: {
          '& > input:not(:first-child)': { ps: '10!' },
          '& > input:not(:last-child)': { pe: '10!' },
        },
        element: { minW: '11', _icon: { boxSize: '5' } },
      },
      xl: {
        root: {
          '& > input:not(:first-child)': { ps: '11!' },
          '& > input:not(:last-child)': { pe: '11!' },
        },
        element: { minW: '11', _icon: { boxSize: '5.5' } },
      },
    },
  },
});
```

### 1.9 Update Recipe Index

**File:** `src/preset/recipes/index.ts`

Add exports:

```typescript
export * from './heading';
export * from './input';
export * from './input-addon';
export * from './input-group';
```

### 1.10 Update Component Index

**File:** `src/components/index.ts`

Add exports:

```typescript
// Typography
export { Heading, type HeadingProps } from './Heading';

// Form Components (updated)
export { Input, type InputProps } from './Input';
export { InputAddon, type InputAddonProps } from './InputAddon';
export { InputGroup, type InputGroupProps } from './InputGroup';
```

### 1.11 Update panda.config.ts

Add the new recipes to the config.

---

## Phase 2: Form Component Stories (45 min)

### 2.1 Checkbox.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src';

const meta: Meta = {
  title: 'Components/Form/Checkbox',
  component: Checkbox.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Checkbox.Root defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox.Root>
  ),
};

export const Unchecked: Story = {
  render: () => (
    <Checkbox.Root>
      <Checkbox.Control />
      <Checkbox.Label>Subscribe to newsletter</Checkbox.Label>
    </Checkbox.Root>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Checkbox.Root checked="indeterminate">
      <Checkbox.Control />
      <Checkbox.Label>Select all items</Checkbox.Label>
    </Checkbox.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox.Root disabled>
        <Checkbox.Control />
        <Checkbox.Label>Disabled unchecked</Checkbox.Label>
      </Checkbox.Root>
      <Checkbox.Root disabled defaultChecked>
        <Checkbox.Control />
        <Checkbox.Label>Disabled checked</Checkbox.Label>
      </Checkbox.Root>
    </div>
  ),
};

export const WithColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox.Root defaultChecked colorPalette="primary">
        <Checkbox.Control />
        <Checkbox.Label>Primary</Checkbox.Label>
      </Checkbox.Root>
      <Checkbox.Root defaultChecked colorPalette="neutral">
        <Checkbox.Control />
        <Checkbox.Label>Neutral</Checkbox.Label>
      </Checkbox.Root>
      <Checkbox.Root defaultChecked colorPalette="error">
        <Checkbox.Control />
        <Checkbox.Label>Error</Checkbox.Label>
      </Checkbox.Root>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <fieldset style={{ border: 'none', padding: 0 }}>
      <legend style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
        Select your interests
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Checkbox.Root defaultChecked>
          <Checkbox.Control />
          <Checkbox.Label>Technology</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root>
          <Checkbox.Control />
          <Checkbox.Label>Design</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root defaultChecked>
          <Checkbox.Control />
          <Checkbox.Label>Business</Checkbox.Label>
        </Checkbox.Root>
      </div>
    </fieldset>
  ),
};
```

### 2.2 RadioGroup.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../src';

const meta: Meta = {
  title: 'Components/Form/RadioGroup',
  component: RadioGroup.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="option1">
      <RadioGroup.Label>Select an option</RadioGroup.Label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginTop: '0.5rem',
        }}
      >
        <RadioGroup.Item value="option1">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="option2">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="option3">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 3</RadioGroup.ItemText>
        </RadioGroup.Item>
      </div>
    </RadioGroup.Root>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="small" orientation="horizontal">
      <RadioGroup.Label>Size</RadioGroup.Label>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <RadioGroup.Item value="small">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Small</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="medium">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Medium</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="large">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Large</RadioGroup.ItemText>
        </RadioGroup.Item>
      </div>
    </RadioGroup.Root>
  ),
};

export const WithColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <RadioGroup.Root defaultValue="a" colorPalette="primary">
        <RadioGroup.Label>Primary</RadioGroup.Label>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem',
          }}
        >
          <RadioGroup.Item value="a">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Option A</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="b">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Option B</RadioGroup.ItemText>
          </RadioGroup.Item>
        </div>
      </RadioGroup.Root>
    </div>
  ),
};
```

### 2.3 Textarea.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../src';

const meta: Meta = {
  title: 'Components/Form/Textarea',
  component: Textarea.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Textarea.Root
      placeholder="Enter your message..."
      style={{ width: '300px' }}
    />
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <label
        style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
      >
        Description
      </label>
      <Textarea.Root placeholder="Describe your experience..." rows={4} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Textarea.Root
      placeholder="This textarea is disabled"
      disabled
      style={{ width: '300px' }}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Textarea.Root placeholder="Small (2 rows)" rows={2} />
      <Textarea.Root placeholder="Medium (4 rows)" rows={4} />
      <Textarea.Root placeholder="Large (6 rows)" rows={6} />
    </div>
  ),
};
```

### 2.4 Input.stories.tsx (NEW)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src';

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Input placeholder="Enter text..." style={{ width: '300px' }} />
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="surface" placeholder="Surface variant" />
      <Input variant="subtle" placeholder="Subtle variant" />
      <Input variant="flushed" placeholder="Flushed variant" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input size="xs" placeholder="Extra small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium (default)" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra large" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Input placeholder="Disabled input" disabled style={{ width: '300px' }} />
  ),
};

export const WithTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
    </div>
  ),
};
```

### 2.5 InputGroup.stories.tsx (NEW)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup, Input } from '../src';

const meta: Meta = {
  title: 'Components/Form/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const WithStartElement: Story = {
  render: () => (
    <InputGroup startElement={<span>🔍</span>} style={{ width: '300px' }}>
      <Input placeholder="Search..." />
    </InputGroup>
  ),
};

export const WithEndElement: Story = {
  render: () => (
    <InputGroup endElement={<span>✓</span>} style={{ width: '300px' }}>
      <Input placeholder="Username" />
    </InputGroup>
  ),
};

export const WithBothElements: Story = {
  render: () => (
    <InputGroup
      startElement={<span>$</span>}
      endElement={<span>.00</span>}
      style={{ width: '300px' }}
    >
      <Input placeholder="0" type="number" />
    </InputGroup>
  ),
};

export const EmailInput: Story = {
  render: () => (
    <InputGroup startElement={<span>📧</span>} style={{ width: '300px' }}>
      <Input type="email" placeholder="you@example.com" />
    </InputGroup>
  ),
};

export const PasswordInput: Story = {
  render: () => (
    <InputGroup
      startElement={<span>🔒</span>}
      endElement={<span>👁</span>}
      style={{ width: '300px' }}
    >
      <Input type="password" placeholder="Enter password" />
    </InputGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <InputGroup size="sm" startElement={<span>🔍</span>}>
        <Input size="sm" placeholder="Small" />
      </InputGroup>
      <InputGroup size="md" startElement={<span>🔍</span>}>
        <Input size="md" placeholder="Medium" />
      </InputGroup>
      <InputGroup size="lg" startElement={<span>🔍</span>}>
        <Input size="lg" placeholder="Large" />
      </InputGroup>
    </div>
  ),
};
```

---

## Phase 3: Typography Stories (15 min)

### 3.1 Heading.stories.tsx (NEW)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../src';

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Heading>Default Heading</Heading>,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading size="7xl">Heading 7xl</Heading>
      <Heading size="6xl">Heading 6xl</Heading>
      <Heading size="5xl">Heading 5xl</Heading>
      <Heading size="4xl">Heading 4xl</Heading>
      <Heading size="3xl">Heading 3xl</Heading>
      <Heading size="2xl">Heading 2xl</Heading>
      <Heading size="xl">Heading xl (default)</Heading>
      <Heading size="lg">Heading lg</Heading>
      <Heading size="md">Heading md</Heading>
      <Heading size="sm">Heading sm</Heading>
      <Heading size="xs">Heading xs</Heading>
    </div>
  ),
};

export const AsElement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading as="h1" size="4xl">
        H1 Heading
      </Heading>
      <Heading as="h2" size="3xl">
        H2 Heading
      </Heading>
      <Heading as="h3" size="2xl">
        H3 Heading
      </Heading>
      <Heading as="h4" size="xl">
        H4 Heading
      </Heading>
      <Heading as="h5" size="lg">
        H5 Heading
      </Heading>
      <Heading as="h6" size="md">
        H6 Heading
      </Heading>
    </div>
  ),
};

export const PageExample: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Heading as="h1" size="4xl" style={{ marginBottom: '1rem' }}>
        Welcome to Discourser.AI
      </Heading>
      <Heading as="h2" size="2xl" style={{ marginBottom: '0.75rem' }}>
        Practice Makes Perfect
      </Heading>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Improve your interview skills with AI-powered voice conversations.
      </p>
      <Heading as="h3" size="xl" style={{ marginBottom: '0.5rem' }}>
        Getting Started
      </Heading>
      <p style={{ color: '#666' }}>
        Choose a scenario and start practicing in minutes.
      </p>
    </div>
  ),
};
```

---

## Phase 4: Layout Component Stories (30 min)

### 4.1 Accordion.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../src';

const meta: Meta = {
  title: 'Components/Layout/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Accordion.Root defaultValue={['item-1']} style={{ width: '400px' }}>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>
          What is Discourser.AI?
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          Discourser.AI is a voice-first AI interview practice platform that
          helps professionals prepare for job interviews through realistic
          conversation simulations.
        </Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.ItemTrigger>
          How does it work?
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          You select an interview scenario, configure your preferences, and then
          engage in a voice conversation with our AI interviewer.
        </Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.ItemTrigger>
          Is my data secure?
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          Yes, we take data security seriously. All conversations are encrypted.
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion.Root
      multiple
      defaultValue={['item-1', 'item-2']}
      style={{ width: '400px' }}
    >
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>
          Section 1
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          Multiple sections can be open at once.
        </Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.ItemTrigger>
          Section 2
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          Try opening and closing sections independently.
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <Accordion.Root collapsible style={{ width: '400px' }}>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>
          Click to expand (collapsible)
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          This accordion is collapsible - click the header again to collapse.
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  ),
};
```

### 4.2 Drawer.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, Button } from '../src';

const meta: Meta = {
  title: 'Components/Layout/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button.Root>Open Drawer</Button.Root>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>This is a drawer component.</Drawer.Description>
            <Drawer.CloseTrigger asChild>
              <Button.Root variant="outline" size="sm">
                ×
              </Button.Root>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>
            <p>Drawer content goes here.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button.Root variant="outline">Cancel</Button.Root>
            </Drawer.CloseTrigger>
            <Button.Root colorPalette="primary">Save</Button.Root>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  ),
};

export const LeftPlacement: Story = {
  render: () => (
    <Drawer.Root placement="left">
      <Drawer.Trigger asChild>
        <Button.Root>Open Left Drawer</Button.Root>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Navigation</Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <Button.Root variant="outline" size="sm">
                ×
              </Button.Root>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li
                  style={{
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  Home
                </li>
                <li
                  style={{
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  Practice
                </li>
                <li
                  style={{
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  History
                </li>
                <li style={{ padding: '0.75rem 0' }}>Settings</li>
              </ul>
            </nav>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  ),
};
```

---

## Phase 5: Feedback Component Stories (30 min)

### 5.1 Badge.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src';

const meta: Meta = {
  title: 'Components/Feedback/Badge',
  component: Badge.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Badge.Root>Badge</Badge.Root>,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge.Root variant="solid">Solid</Badge.Root>
      <Badge.Root variant="subtle">Subtle</Badge.Root>
      <Badge.Root variant="outline">Outline</Badge.Root>
    </div>
  ),
};

export const ColorPalettes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge.Root colorPalette="primary">Primary</Badge.Root>
      <Badge.Root colorPalette="neutral">Neutral</Badge.Root>
      <Badge.Root colorPalette="error">Error</Badge.Root>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge.Root colorPalette="primary" variant="subtle">
        In Progress
      </Badge.Root>
      <Badge.Root colorPalette="primary" variant="solid">
        Completed
      </Badge.Root>
      <Badge.Root colorPalette="error" variant="subtle">
        Failed
      </Badge.Root>
    </div>
  ),
};
```

### 5.2 Skeleton.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src';

const meta: Meta = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Skeleton.Root style={{ width: '200px', height: '20px' }} />,
};

export const Circle: Story = {
  render: () => (
    <Skeleton.Root
      style={{ width: '64px', height: '64px', borderRadius: '50%' }}
    />
  ),
};

export const TextLines: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '300px',
      }}
    >
      <Skeleton.Root style={{ height: '16px', width: '100%' }} />
      <Skeleton.Root style={{ height: '16px', width: '90%' }} />
      <Skeleton.Root style={{ height: '16px', width: '75%' }} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '1rem',
        border: '1px solid #eee',
        borderRadius: '8px',
      }}
    >
      <Skeleton.Root
        style={{ width: '100%', height: '150px', marginBottom: '1rem' }}
      />
      <Skeleton.Root
        style={{ height: '20px', width: '70%', marginBottom: '0.5rem' }}
      />
      <Skeleton.Root
        style={{ height: '16px', width: '100%', marginBottom: '0.25rem' }}
      />
      <Skeleton.Root style={{ height: '16px', width: '60%' }} />
    </div>
  ),
};
```

---

## Phase 6: Overlay Component Stories (30 min)

### 6.1 Popover.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Button } from '../src';

const meta: Meta = {
  title: 'Components/Overlay/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button.Root>Open Popover</Button.Root>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <div style={{ padding: '1rem' }}>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              This is the popover content.
            </Popover.Description>
          </div>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Popover.Root key={placement} positioning={{ placement }}>
          <Popover.Trigger asChild>
            <Button.Root variant="outline">{placement}</Button.Root>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Arrow>
                <Popover.ArrowTip />
              </Popover.Arrow>
              <div style={{ padding: '0.75rem' }}>Popover on {placement}</div>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      ))}
    </div>
  ),
};
```

### 6.2 Tooltip.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '../src';

const meta: Meta = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button.Root>Hover me</Button.Root>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          This is a tooltip
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip.Root key={placement} positioning={{ placement }}>
          <Tooltip.Trigger asChild>
            <Button.Root variant="outline">{placement}</Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Positioner>
            <Tooltip.Content>
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              Tooltip on {placement}
            </Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
      ))}
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button.Root variant="outline" size="sm">
            🎤
          </Button.Root>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            Start Recording
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button.Root variant="outline" size="sm">
            ⚙️
          </Button.Root>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            Settings
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </div>
  ),
};
```

---

## Phase 7: Verify & Test (15 min)

### 7.1 Run Storybook

```bash
pnpm build:panda  # Regenerate styled-system with new recipes
pnpm dev
```

### 7.2 Verification Checklist

- [ ] All new components build without errors
- [ ] All stories load without errors
- [ ] No console errors or warnings
- [ ] Dark mode works for all components
- [ ] Interactive components function correctly

### 7.3 Final Component Count

**After this task:**

- **30 components total** (26 existing + 4 new)
- **25 stories** (12 existing + 13 new)

---

## Success Criteria

| Criterion                   | Target                                        |
| --------------------------- | --------------------------------------------- |
| New components added        | ✅ 4 (Heading, Input, InputAddon, InputGroup) |
| New stories created         | ✅ 13 story files                             |
| Stories load without errors | ✅ No console errors                          |
| Components render correctly | ✅ Visual verification                        |
| Dark mode works             | ✅ All components                             |
| Build passes                | ✅ Zero errors                                |

---

## Final Inventory

### Components (30 total)

| Category       | Components                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Typography** | Heading (NEW)                                                                                                               |
| **Form**       | Button, IconButton, Input (NEW), InputAddon (NEW), InputGroup (NEW), Checkbox, RadioGroup, Select, Slider, Switch, Textarea |
| **Layout**     | Card, Accordion, Drawer, Tabs                                                                                               |
| **Feedback**   | Avatar, Badge, Progress, Skeleton, Toast, Spinner                                                                           |
| **Overlay**    | Dialog, Popover, Tooltip                                                                                                    |
| **Utility**    | CloseButton, Icon, Group, AbsoluteCenter, Loader                                                                            |

### Stories (25 total)

| Category       | Stories                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Typography** | Heading                                                                                       |
| **Form**       | Button, IconButton, Input, InputGroup, Checkbox, RadioGroup, Select, Slider, Switch, Textarea |
| **Layout**     | Card, Dialog, Tabs, Accordion, Drawer                                                         |
| **Feedback**   | Avatar, Progress, Toast, Badge, Skeleton                                                      |
| **Overlay**    | Popover, Tooltip                                                                              |

---

## Reference Files

- Park UI components: `/park-ui/components/react/src/components/ui/`
- Park UI recipes: `/park-ui/packages/preset/src/recipes/`
- Existing stories: `/Discourser-Design-System/stories/`

---

## Notes

1. **Input vs Field.Input** - The new Input component is a standalone styled input. Field.Input is for use within Field context.
2. **InputGroup** - Uses startElement/endElement props for adding icons or text to inputs
3. **Heading** - Use `as` prop to change the element (h1-h6), `size` prop controls visual size
4. **Run `pnpm build:panda`** after adding recipes to regenerate styled-system

---

_End of Task Document_
