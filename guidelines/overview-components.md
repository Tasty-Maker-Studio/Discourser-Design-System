# Components Overview

Always prefer components from `@discourser/design-system` if available. Do not use native HTML elements when a design system component exists.

## ⚠️ CRITICAL: Simple vs Compound Components

The design system has two types of components. Using them incorrectly causes runtime errors.

### Simple Components (use directly)

These components can be used directly without `.Root`:

- `Button` → `<Button variant="solid" colorPalette="primary">Click</Button>`
- `Heading` → `<Heading as="h1" size="2xl">Title</Heading>`
- `Input` → `<Input label="Email" />`
- `Textarea` → `<Textarea label="Message" />`
- `Badge` → `<Badge>New</Badge>`
- `Spinner` → `<Spinner />`

### Compound Components (MUST use .Root)

**These components require `.Root` - using them directly causes "Element type is invalid" error:**

```typescript
// ❌ WRONG - causes runtime error
<Card>Content</Card>

// ✅ CORRECT
<Card.Root>Content</Card.Root>
```

**Compound components list:**

- Card → `Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`, `Card.Body`, `Card.Footer`
- IconButton → `IconButton.Root`
- Switch → `Switch.Root`, `Switch.Control`, `Switch.Thumb`, `Switch.Label`
- Checkbox → `Checkbox.Root`, `Checkbox.Control`, `Checkbox.Label`
- RadioGroup → `RadioGroup.Root`, `RadioGroup.Item`, `RadioGroup.ItemControl`, `RadioGroup.ItemText`
- Select → `Select.Root`, `Select.Control`, `Select.Trigger`, `Select.Content`, `Select.Item`
- Dialog → `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`
- Drawer → `Drawer.Root`, `Drawer.Trigger`, `Drawer.Content`
- Accordion → `Accordion.Root`, `Accordion.Item`, `Accordion.Trigger`, `Accordion.Content`
- Tabs → `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`
- Avatar → `Avatar.Root`, `Avatar.Image`, `Avatar.Fallback`
- Progress → `Progress.Root`, `Progress.Track`, `Progress.Range`
- Skeleton → `Skeleton.Root`, `Skeleton.Item`
- Popover → `Popover.Root`, `Popover.Trigger`, `Popover.Content`
- Tooltip → `Tooltip.Root`, `Tooltip.Trigger`, `Tooltip.Content`
- Slider → `Slider.Root`, `Slider.Control`, `Slider.Track`, `Slider.Thumb`

---

## Button Component

**Type:** Simple Component (use directly)

### Variants & ColorPalette

**⚠️ IMPORTANT:** Button requires BOTH `variant` AND `colorPalette` props for proper styling!

| Prop           | Values                                           | Description  |
| -------------- | ------------------------------------------------ | ------------ |
| `variant`      | `solid`, `surface`, `subtle`, `outline`, `plain` | Visual style |
| `colorPalette` | `primary`, `neutral`, `error`                    | Color theme  |
| `size`         | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`       | Button size  |

### Button Examples

```typescript
// Primary action
<Button variant="solid" colorPalette="primary">Submit</Button>

// Secondary action
<Button variant="outline" colorPalette="neutral">Cancel</Button>

// Destructive action
<Button variant="solid" colorPalette="error">Delete</Button>

// Text-only/tertiary
<Button variant="plain" colorPalette="primary">Learn More</Button>
```

### Common Button Mistakes

```typescript
// ❌ WRONG - "filled" and "outlined" don't exist
<Button variant="filled">Click</Button>
<Button variant="outlined">Click</Button>

// ❌ WRONG - Missing colorPalette
<Button variant="solid">Click</Button>

// ✅ CORRECT
<Button variant="solid" colorPalette="primary">Click</Button>
<Button variant="outline" colorPalette="neutral">Click</Button>
```

---

## Heading Component

**Type:** Simple Component (use directly)

```typescript
// ✅ CORRECT - Heading is simple, no .Root needed
<Heading as="h1" size="3xl">Page Title</Heading>
<Heading as="h2" size="2xl">Section</Heading>
<Heading as="h3" size="xl">Subsection</Heading>
```

| Prop   | Values                                                                 | Description  |
| ------ | ---------------------------------------------------------------------- | ------------ |
| `as`   | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`                                     | HTML element |
| `size` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl` | Text size    |

---

## Card Component

**Type:** Compound Component (MUST use .Root)

```typescript
<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Optional description</Card.Description>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="outline" colorPalette="neutral">Cancel</Button>
    <Button variant="solid" colorPalette="primary">Confirm</Button>
  </Card.Footer>
</Card.Root>
```

**Card.Root Variants:** `outline`, `elevated`, `subtle`

---

## Available Components

### Interactive Elements

| Component  | Type     | Purpose                                 |
| ---------- | -------- | --------------------------------------- |
| Button     | Simple   | Primary interactive element for actions |
| IconButton | Compound | Icon-only interactive element           |
| Switch     | Compound | Toggle control for binary on/off states |
| Checkbox   | Compound | Binary selection control                |
| RadioGroup | Compound | Mutually exclusive selection            |

### Form Elements

| Component  | Type     | Purpose                       |
| ---------- | -------- | ----------------------------- |
| Input      | Simple   | Single-line text input        |
| InputAddon | Simple   | Decorative element for inputs |
| InputGroup | Simple   | Layout wrapper for inputs     |
| Textarea   | Simple   | Multi-line text input         |
| Select     | Compound | Dropdown selection            |
| Slider     | Compound | Range selection control       |

### Layout & Container Elements

| Component | Type     | Purpose                       |
| --------- | -------- | ----------------------------- |
| Card      | Compound | Container for related content |
| Accordion | Compound | Collapsible sections          |
| Tabs      | Compound | Tabbed navigation             |
| Drawer    | Compound | Side panel                    |

### Overlay Elements

| Component | Type     | Purpose              |
| --------- | -------- | -------------------- |
| Dialog    | Compound | Modal overlay        |
| Popover   | Compound | Floating panel       |
| Tooltip   | Compound | Contextual help text |

### Feedback & Status Elements

| Component | Type     | Purpose                   |
| --------- | -------- | ------------------------- |
| Badge     | Simple   | Status indicator          |
| Avatar    | Compound | User profile image        |
| Toast     | Simple   | Notification messages     |
| Progress  | Compound | Task completion indicator |
| Skeleton  | Compound | Loading placeholder       |
| Spinner   | Simple   | Loading indicator         |

### Typography Elements

| Component | Type   | Purpose          |
| --------- | ------ | ---------------- |
| Heading   | Simple | Semantic heading |

---

## Styling Guidelines

### ✅ DO:

```typescript
// Use simple components directly with proper props
<Button variant="solid" colorPalette="primary">Submit</Button>
<Heading as="h1" size="2xl">Page Title</Heading>

// Use compound components with .Root
<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>Form</Card.Title>
  </Card.Header>
  <Card.Body>
    <Input label="Email" />
  </Card.Body>
  <Card.Footer>
    <Button variant="solid" colorPalette="primary">Submit</Button>
  </Card.Footer>
</Card.Root>

// Use semantic color tokens for custom styling
import { css } from '@discourser/design-system/styled-system/css';
const style = css({ bg: 'surface', color: 'onSurface' });
```

### ❌ DO NOT:

```typescript
// Don't use compound components without .Root
<Card>Content</Card>  // ❌ Runtime error!

// Don't use wrong Button variant names
<Button variant="filled">Click</Button>   // ❌ "filled" doesn't exist
<Button variant="outlined">Click</Button> // ❌ "outlined" doesn't exist

// Don't forget colorPalette for Button
<Button variant="solid">Click</Button>    // ❌ Missing colorPalette

// Don't use raw HTML when components exist
<button>Submit</button>  // ❌ Use <Button>
<h1>Title</h1>           // ❌ Use <Heading>

// Don't use raw color values
css({ bg: '#ffffff' })   // ❌ Use 'surface' instead
```

---

## Quick Reference

### Component Type Lookup

| Component | Type     | Correct Usage                                     |
| --------- | -------- | ------------------------------------------------- |
| Button    | Simple   | `<Button variant="solid" colorPalette="primary">` |
| Heading   | Simple   | `<Heading as="h1" size="2xl">`                    |
| Input     | Simple   | `<Input label="Email" />`                         |
| Card      | Compound | `<Card.Root variant="elevated">`                  |
| Dialog    | Compound | `<Dialog.Root>`                                   |
| Switch    | Compound | `<Switch.Root>`                                   |

### Button Variant Quick Reference

| Use Case      | Code                                                |
| ------------- | --------------------------------------------------- |
| Primary CTA   | `<Button variant="solid" colorPalette="primary">`   |
| Secondary     | `<Button variant="outline" colorPalette="neutral">` |
| Destructive   | `<Button variant="solid" colorPalette="error">`     |
| Text/Tertiary | `<Button variant="plain" colorPalette="primary">`   |
| Low emphasis  | `<Button variant="subtle" colorPalette="neutral">`  |

---

## Accessibility

All components follow WCAG 2.1 Level AA standards:

- Keyboard navigation is built-in
- Focus management is automatic
- ARIA attributes are applied correctly
- Color contrast meets requirements
- Screen reader support is included

**Important**: Always provide labels for form inputs:

```typescript
// ✅ Correct
<Input label="Email" />

// ❌ Wrong - Missing label
<Input placeholder="Enter email" />
```

## Theme Integration

All components automatically respond to theme changes via `data-theme` attribute:

```typescript
<html data-theme="light">  // Light theme
<html data-theme="dark">   // Dark theme
```

No additional code needed - it works automatically.
