# Card

**Purpose:** Container component for grouping related content with Material Design 3 elevation and styling.

## When to Use This Component

Use Card when you need to **group related content** in a visually distinct container that feels like a physical surface.

**Decision Tree:**

| Scenario                                                        | Use This             | Why                                                       |
| --------------------------------------------------------------- | -------------------- | --------------------------------------------------------- |
| Group related content (dashboard widget, product card, profile) | Card ✅              | Provides visual hierarchy and content separation          |
| Modal overlay requiring user interaction                        | Dialog               | Blocks interaction with page, requires explicit dismissal |
| Side panel navigation or supplementary content                  | Drawer               | Slides from edge, preserves page context                  |
| Floating contextual content near trigger element                | Popover              | Positioned relative to trigger, temporary                 |
| Brief contextual help (under 2 sentences)                       | Tooltip              | Lightweight, appears on hover                             |
| Collapsible sections within a page                              | Accordion            | Manages vertical space, shows/hides content               |
| Simple content wrapper without elevation                        | `<div>` with padding | When you don't need Material Design styling               |

**Component Comparison:**

```typescript
// ✅ Use Card for grouped content
<Card>
  <h3>User Profile</h3>
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>

// ❌ Don't use Card for modal overlays - use Dialog
<Card>
  <h2>Confirm Delete</h2>
  <Button>Delete</Button>
</Card>  // Wrong - doesn't block background interaction

<Dialog.Root>
  <Dialog.Content>
    <Dialog.Title>Confirm Delete</Dialog.Title>
    <Button>Delete</Button>
  </Dialog.Content>
</Dialog.Root>  // Correct

// ❌ Don't use Card for side panels - use Drawer
<Card className={css({ position: 'fixed', right: 0 })}>
  Navigation links
</Card>  // Wrong - Card isn't designed for this

<Drawer.Root>
  <Drawer.Content>Navigation links</Drawer.Content>
</Drawer.Root>  // Correct

// ❌ Don't use Card for tooltip-like hints - use Tooltip
<Card className={css({ position: 'absolute', fontSize: 'xs' })}>
  Helpful hint
</Card>  // Wrong - too heavy for brief help

<Tooltip.Root>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Content>Helpful hint</Tooltip.Content>
</Tooltip.Root>  // Correct
```

## Import

```typescript
import { Card } from '@discourser/design-system';
```

## Variants

The Card component supports 3 Material Design 3 variants:

| Variant    | Visual Style                             | Usage                             | When to Use                                        |
| ---------- | ---------------------------------------- | --------------------------------- | -------------------------------------------------- |
| `elevated` | Surface with shadow, elevated appearance | Default cards, content containers | Most common use case, provides visual hierarchy    |
| `filled`   | Filled background, no shadow             | Secondary cards, less emphasis    | When multiple cards are stacked, alternative style |
| `outlined` | Outlined border, no shadow               | Tertiary cards, minimal style     | When you want subtle separation without elevation  |

### Visual Characteristics

- **elevated**: `surfaceContainerLow` background, level1 shadow, level2 shadow on hover
- **filled**: `surfaceContainerHighest` background, no shadow
- **outlined**: `surface` background, 1px `outlineVariant` border

## Props

| Prop          | Type                                   | Default      | Description                                         |
| ------------- | -------------------------------------- | ------------ | --------------------------------------------------- |
| `variant`     | `'elevated' \| 'filled' \| 'outlined'` | `'elevated'` | Visual style variant                                |
| `interactive` | `boolean`                              | `false`      | Makes card clickable with hover/active states       |
| `onClick`     | `(event: MouseEvent) => void`          | -            | Click handler (sets interactive=true automatically) |
| `className`   | `string`                               | -            | Additional CSS classes (use sparingly)              |
| `children`    | `ReactNode`                            | Required     | Card content                                        |

**Note:** Card extends `HTMLAttributes<HTMLDivElement>`, so all standard HTML div attributes are supported.

## Examples

### Basic Usage

```typescript
// Elevated card (default)
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>

// Filled card
<Card variant="filled">
  <h3>Secondary Card</h3>
  <p>Less emphasized content</p>
</Card>

// Outlined card
<Card variant="outlined">
  <h3>Minimal Card</h3>
  <p>Subtle separation</p>
</Card>
```

### Interactive Cards

```typescript
// Clickable card
<Card interactive onClick={() => navigate('/details')}>
  <h3>Click me!</h3>
  <p>This card responds to clicks</p>
</Card>

// Card as link wrapper
<Card interactive as="a" href="/product">
  <h3>Product Name</h3>
  <p>Product description</p>
</Card>
```

### With Custom Styling

```typescript
import { css } from '@discourser/design-system/styled-system/css';

// Card with custom padding
<Card className={css({ p: 'xl' })}>
  <h3>Spacious Card</h3>
  <p>Extra padding for comfort</p>
</Card>

// Card with custom width
<Card className={css({ width: '400px' })}>
  <h3>Fixed Width Card</h3>
</Card>
```

## Common Patterns

### Card Grid Layout

```typescript
import { css } from '@discourser/design-system/styled-system/css';

const gridContainer = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: 'lg'
});

<div className={gridContainer}>
  <Card>
    <h3>Card 1</h3>
    <p>Content 1</p>
  </Card>
  <Card>
    <h3>Card 2</h3>
    <p>Content 2</p>
  </Card>
  <Card>
    <h3>Card 3</h3>
    <p>Content 3</p>
  </Card>
</div>
```

### Card with Image

```typescript
<Card variant="elevated">
  <img
    src="/image.jpg"
    alt="Description"
    className={css({ width: '100%', height: '200px', objectFit: 'cover' })}
  />
  <div className={css({ p: 'lg' })}>
    <h3 className={css({ textStyle: 'titleLarge', mb: 'sm' })}>
      Card Title
    </h3>
    <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
      Card description goes here with supporting details.
    </p>
  </div>
</Card>
```

### Card with Actions

```typescript
<Card>
  <div className={css({ p: 'lg' })}>
    <h3 className={css({ textStyle: 'titleLarge', mb: 'sm' })}>
      Confirm Action
    </h3>
    <p className={css({ textStyle: 'bodyMedium', mb: 'md', color: 'onSurfaceVariant' })}>
      Are you sure you want to proceed with this action?
    </p>
    <div className={css({ display: 'flex', gap: 'sm', justifyContent: 'flex-end' })}>
      <Button variant="text">Cancel</Button>
      <Button variant="filled">Confirm</Button>
    </div>
  </div>
</Card>
```

### List of Cards

```typescript
const items = [
  { id: 1, title: 'Item 1', description: 'Description 1' },
  { id: 2, title: 'Item 2', description: 'Description 2' },
  { id: 3, title: 'Item 3', description: 'Description 3' },
];

<div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
  {items.map(item => (
    <Card key={item.id} interactive onClick={() => handleClick(item.id)}>
      <div className={css({ p: 'lg' })}>
        <h3 className={css({ textStyle: 'titleMedium' })}>{item.title}</h3>
        <p className={css({ textStyle: 'bodySmall', color: 'onSurfaceVariant' })}>
          {item.description}
        </p>
      </div>
    </Card>
  ))}
</div>
```

## DO NOT

```typescript
// ❌ Don't use div when you need card styling
<div className={css({ bg: 'surface', borderRadius: 'md', p: 'lg' })}>
  Content
</div>  // Use <Card> instead

// ❌ Don't override elevation styles
<Card style={{ boxShadow: '0 10px 50px rgba(0,0,0,0.5)' }}>
  Content
</Card>

// ❌ Don't nest cards inappropriately
<Card>
  <Card>Nested card</Card>  // Avoid nesting cards
</Card>

// ❌ Don't use card for everything (over-cardification)
<Card>
  <Card>Login</Card>
  <Card>Signup</Card>
</Card>  // Consider simpler layouts

// ✅ Use cards for logical content grouping
<div className={css({ display: 'flex', gap: 'md' })}>
  <Card>Login Form</Card>
  <Card>Signup Form</Card>
</div>
```

## Accessibility

The Card component follows accessibility best practices:

- **Semantic HTML**: Uses `<div>` by default, appropriate for content containers
- **Interactive State**: When `interactive={true}`, card has proper cursor and hover states
- **Keyboard Navigation**: If used as link/button, ensure proper tabindex and keyboard support
- **Focus Indicators**: Should add focus styles when interactive

### Accessibility Best Practices

```typescript
// ✅ Use semantic elements for clickable cards
<Card as="button" interactive onClick={handleClick} aria-label="View details">
  Card content
</Card>

// ✅ Use proper heading hierarchy
<Card>
  <h2 className={css({ textStyle: 'titleLarge' })}>Card Title</h2>
  <p>Content</p>
</Card>

// ✅ Ensure sufficient color contrast
<Card>
  <p className={css({ color: 'onSurface' })}>Primary text</p>
  <p className={css({ color: 'onSurfaceVariant' })}>Secondary text</p>
</Card>
```

## Variant Selection Guide

| Scenario          | Recommended Variant    | Reasoning                                 |
| ----------------- | ---------------------- | ----------------------------------------- |
| Product cards     | `elevated`             | Visual hierarchy, draws attention         |
| Form sections     | `outlined`             | Subtle separation without heavy elevation |
| Dashboard widgets | `elevated`             | Emphasizes different data sections        |
| List items        | `outlined` or `filled` | Lighter style for repeated elements       |
| Content previews  | `elevated`             | Interactive, prominent                    |
| Settings sections | `outlined`             | Clean, minimal separation                 |

## State Behaviors

| State       | Visual Change                                                                          | Applies When                         |
| ----------- | -------------------------------------------------------------------------------------- | ------------------------------------ |
| **Hover**   | `elevated`: shadow increases to level2<br />`filled`/`outlined`: slight opacity change | Only when `interactive={true}`       |
| **Active**  | Opacity reduces to 0.92                                                                | Only when `interactive={true}`       |
| **Default** | No hover effects                                                                       | When `interactive={false}` (default) |

## Responsive Considerations

```typescript
// Responsive card width
<Card className={css({
  width: { base: '100%', md: '400px' }
})}>
  Content
</Card>

// Responsive padding
<Card>
  <div className={css({ p: { base: 'md', lg: 'xl' } })}>
    Content with responsive padding
  </div>
</Card>

// Responsive grid
const gridStyles = css({
  display: 'grid',
  gridTemplateColumns: {
    base: '1fr',
    sm: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
    xl: 'repeat(4, 1fr)'
  },
  gap: 'lg'
});

<div className={gridStyles}>
  {items.map(item => <Card key={item.id}>...</Card>)}
</div>
```

## Content Padding

Cards have no default padding. Add padding to card content:

```typescript
// ✅ Recommended: Add padding to content
<Card>
  <div className={css({ p: 'lg' })}>
    Content with padding
  </div>
</Card>

// ✅ Or use className on Card itself
<Card className={css({ p: 'lg' })}>
  Content
</Card>
```

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('interactive card handles clicks', async () => {
  const handleClick = vi.fn();
  render(
    <Card interactive onClick={handleClick}>
      Card Content
    </Card>
  );

  const card = screen.getByText('Card Content').closest('div');
  await userEvent.click(card);

  expect(handleClick).toHaveBeenCalledOnce();
});

test('non-interactive card does not trigger clicks', async () => {
  const handleClick = vi.fn();
  render(
    <Card onClick={handleClick}>
      Card Content
    </Card>
  );

  const card = screen.getByText('Card Content').closest('div');
  await userEvent.click(card);

  // interactive is false by default, so onClick should not be called
  expect(handleClick).not.toHaveBeenCalled();
});
```
