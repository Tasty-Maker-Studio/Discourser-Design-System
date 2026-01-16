# Package Installation & Imports

This guide explains how to install and import components from the Discourser Design System.

## Installation

Install the design system package:

```bash
npm install @discourser/design-system
```

## ⚠️ CRITICAL: Simple vs Compound Components

The design system has two types of components:

- **Simple Components** - Use directly (e.g., `<Button>`, `<Heading>`)
- **Compound Components** - MUST use `.Root` pattern (e.g., `<Card.Root>`)

## Import Pattern

All components are imported from the main package:

```typescript
import {
  // Simple Components (use directly)
  Button,
  Heading,
  Input,
  InputAddon,
  InputGroup,
  Textarea,
  Badge,
  Spinner,
  Toaster,
  toaster,

  // Compound Components (MUST use .Root)
  Card,
  Checkbox,
  RadioGroup,
  Select,
  Dialog,
  Drawer,
  Popover,
  Tooltip,
  Accordion,
  Tabs,
  Avatar,
  Progress,
  Skeleton,
  IconButton,
  Switch,
  Slider,
} from '@discourser/design-system';

// CSS function for custom styling
import { css } from '@discourser/design-system/styled-system/css';
```

---

## Simple Components

These components are used **directly without `.Root`**:

### Button

```typescript
// ✅ CORRECT - Button is a simple component
<Button variant="solid" colorPalette="primary">Primary Action</Button>
<Button variant="outline" colorPalette="neutral">Secondary</Button>
<Button variant="plain" colorPalette="primary">Text Only</Button>
```

**Button Props:**
| Prop | Values | Default | Description |
|------|--------|---------|-------------|
| `variant` | `solid`, `surface`, `subtle`, `outline`, `plain` | `solid` | Visual style |
| `colorPalette` | `primary`, `neutral`, `error` | - | Color theme |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | `md` | Button size |

**⚠️ IMPORTANT:** Always include `colorPalette` for proper button styling!

```typescript
// ❌ WRONG - Missing colorPalette, wrong variant names
<Button variant="filled">Click</Button>
<Button variant="outlined">Click</Button>

// ✅ CORRECT - Proper variant names with colorPalette
<Button variant="solid" colorPalette="primary">Click</Button>
<Button variant="outline" colorPalette="neutral">Click</Button>
```

### Heading

```typescript
// ✅ CORRECT - Heading is a simple component (no .Root needed)
<Heading as="h1" size="3xl">Page Title</Heading>
<Heading as="h2" size="2xl">Section Title</Heading>
<Heading as="h3" size="xl">Subsection</Heading>
```

**Heading Props:**
| Prop | Values | Default | Description |
|------|--------|---------|-------------|
| `as` | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | `h2` | HTML element |
| `size` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl` | `xl` | Text size |

### Other Simple Components

```typescript
<Input label="Email" type="email" />
<Textarea label="Message" rows={5} />
<Badge>New</Badge>
<Spinner />
```

**Simple components list:**

- Button
- Heading
- Input
- InputAddon
- InputGroup
- Textarea
- Badge
- Spinner
- Toaster / toaster

---

## Compound Components

**⚠️ CRITICAL: These components MUST use `.Root` - never use them directly!**

```typescript
// ❌ WRONG - Will cause "Element type is invalid" error
<Card>Content</Card>

// ✅ CORRECT - Use .Root for compound components
<Card.Root>Content</Card.Root>
```

### Compound Component Reference

| Component  | Root Element      | Sub-Components                                                              |
| ---------- | ----------------- | --------------------------------------------------------------------------- |
| Card       | `Card.Root`       | `Card.Header`, `Card.Title`, `Card.Description`, `Card.Body`, `Card.Footer` |
| IconButton | `IconButton.Root` | (none - just use Root)                                                      |
| Switch     | `Switch.Root`     | `Switch.Control`, `Switch.Thumb`, `Switch.Label`                            |
| Checkbox   | `Checkbox.Root`   | `Checkbox.Control`, `Checkbox.Label`, `Checkbox.Indicator`                  |
| RadioGroup | `RadioGroup.Root` | `RadioGroup.Item`, `RadioGroup.ItemControl`, `RadioGroup.ItemText`          |
| Select     | `Select.Root`     | `Select.Control`, `Select.Trigger`, `Select.Content`, `Select.Item`         |
| Dialog     | `Dialog.Root`     | `Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`, `Dialog.Description`    |
| Drawer     | `Drawer.Root`     | `Drawer.Trigger`, `Drawer.Content`                                          |
| Popover    | `Popover.Root`    | `Popover.Trigger`, `Popover.Content`                                        |
| Tooltip    | `Tooltip.Root`    | `Tooltip.Trigger`, `Tooltip.Content`                                        |
| Accordion  | `Accordion.Root`  | `Accordion.Item`, `Accordion.Trigger`, `Accordion.Content`                  |
| Tabs       | `Tabs.Root`       | `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`                                 |
| Avatar     | `Avatar.Root`     | `Avatar.Image`, `Avatar.Fallback`                                           |
| Progress   | `Progress.Root`   | `Progress.Track`, `Progress.Range`                                          |
| Skeleton   | `Skeleton.Root`   | `Skeleton.Item`                                                             |
| Slider     | `Slider.Root`     | `Slider.Control`, `Slider.Track`, `Slider.Thumb`                            |

### Card Component Example

```typescript
import { Card, Button } from '@discourser/design-system';

function ProductCard() {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Card.Title>Product Name</Card.Title>
        <Card.Description>Brief product description</Card.Description>
      </Card.Header>
      <Card.Body>
        <p>Product details go here</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" colorPalette="neutral">Cancel</Button>
        <Button variant="solid" colorPalette="primary">Buy Now</Button>
      </Card.Footer>
    </Card.Root>
  );
}
```

### Dialog Component Example

```typescript
import { Dialog, Button } from '@discourser/design-system';

function ConfirmDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="solid" colorPalette="primary">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Confirm Action</Dialog.Title>
        <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>
        <Button variant="outline" colorPalette="neutral">Cancel</Button>
        <Button variant="solid" colorPalette="primary">Confirm</Button>
      </Dialog.Content>
    </Dialog.Root>
  );
}
```

---

## Styling Utilities

For custom styling, use the `css()` function with semantic tokens:

```typescript
import { css } from '@discourser/design-system/styled-system/css';

// ✅ CORRECT - Use semantic tokens
const container = css({
  bg: 'surface',
  color: 'onSurface',
  p: 'lg',
  borderRadius: 'l2',
});

// ❌ WRONG - Never use raw values
const wrong = css({
  bg: '#ffffff',
  color: '#1a1a1a',
  padding: '24px',
});
```

---

## Common Patterns

### Card with Form

```typescript
import { Card, Input, Button, Heading } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function LoginCard() {
  return (
    <Card.Root variant="elevated" className={css({ maxWidth: '400px' })}>
      <Card.Header>
        <Card.Title>
          <Heading as="h2" size="xl">Sign In</Heading>
        </Card.Title>
        <Card.Description>Enter your credentials</Card.Description>
      </Card.Header>
      <Card.Body className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
      </Card.Body>
      <Card.Footer>
        <Button variant="solid" colorPalette="primary">Sign In</Button>
      </Card.Footer>
    </Card.Root>
  );
}
```

### Page Layout with Heading

```typescript
import { Heading, Card, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function Dashboard() {
  return (
    <div className={css({ p: 'xl', bg: 'surface', minHeight: '100vh' })}>
      <Heading as="h1" size="3xl" className={css({ mb: 'lg', color: 'onSurface' })}>
        Dashboard
      </Heading>

      <div className={css({ display: 'grid', gap: 'lg', gridTemplateColumns: 'repeat(3, 1fr)' })}>
        <Card.Root variant="elevated">
          <Card.Header>
            <Card.Title>Stats</Card.Title>
          </Card.Header>
          <Card.Body>
            <p>Content here</p>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  );
}
```

---

## Best Practices

### ✅ DO:

```typescript
// Use simple components directly
<Button variant="solid" colorPalette="primary">Submit</Button>
<Heading as="h1" size="2xl">Title</Heading>

// Use .Root for compound components
<Card.Root variant="elevated">...</Card.Root>

// Always include colorPalette for buttons
<Button variant="solid" colorPalette="primary">Primary</Button>
<Button variant="outline" colorPalette="neutral">Secondary</Button>

// Use semantic tokens
css({ bg: 'surface', color: 'onSurface', gap: 'lg' })
```

### ❌ DO NOT:

```typescript
// Don't use compound components without .Root
<Card>Content</Card>              // ❌ Runtime error!

// Don't use wrong variant names for Button
<Button variant="filled">Click</Button>    // ❌ "filled" doesn't exist
<Button variant="outlined">Click</Button>  // ❌ "outlined" doesn't exist

// Don't forget colorPalette for Button
<Button variant="solid">Click</Button>     // ❌ Missing colorPalette

// Don't use raw color values
css({ bg: '#ffffff' })            // ❌ Use 'surface' instead
```

---

## Quick Reference

### Button Variants

| Variant   | colorPalette | Usage               |
| --------- | ------------ | ------------------- |
| `solid`   | `primary`    | Primary CTA         |
| `solid`   | `error`      | Destructive action  |
| `outline` | `neutral`    | Secondary action    |
| `outline` | `primary`    | Alternative primary |
| `plain`   | `primary`    | Text-only/tertiary  |
| `subtle`  | `neutral`    | Low emphasis        |
| `surface` | `primary`    | Elevated button     |

### Component Type Quick Check

| Component | Type     | Usage           |
| --------- | -------- | --------------- |
| Button    | Simple   | `<Button>`      |
| Heading   | Simple   | `<Heading>`     |
| Input     | Simple   | `<Input>`       |
| Card      | Compound | `<Card.Root>`   |
| Dialog    | Compound | `<Dialog.Root>` |
| Switch    | Compound | `<Switch.Root>` |

## Related Files

- **[overview-components.md](overview-components.md)** - Complete component catalog
- **[design-tokens/colors.md](design-tokens/colors.md)** - Semantic color tokens
- **[Guidelines.md](Guidelines.md)** - Main navigation
