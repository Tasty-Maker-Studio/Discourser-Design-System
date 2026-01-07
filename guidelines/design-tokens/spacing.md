# Spacing Tokens

The design system uses a consistent spacing scale based on an 8px grid system for predictable, harmonious layouts.

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | No spacing, reset margins/padding |
| `xxs` | 2px | Minimal gaps, icon spacing, borders |
| `xs` | 4px | Very tight spacing, inline elements |
| `sm` | 8px | Small gaps, compact layouts |
| `md` | 16px | Default spacing, most common use |
| `lg` | 24px | Larger sections, comfortable spacing |
| `xl` | 32px | Major sections, page margins |
| `xxl` | 48px | Large sections, page padding |
| `xxxl` | 64px | Maximum spacing, hero sections |

## Usage Principles

### The 8px Grid
All spacing values (except `xxs` and `xs`) are multiples of 8px. This creates:
- Visual rhythm and consistency
- Predictable alignment
- Easier mental math for designers and developers
- Better cross-browser rendering

### Common Patterns

#### Component Internal Spacing
```typescript
import { css } from '@discourser/design-system/styled-system/css';

// ✅ Button padding (handled by component)
const button = css({
  px: 'md',  // 16px horizontal
  py: 'sm'   // 8px vertical
});

// ✅ Card padding
const card = css({
  p: 'lg'    // 24px all sides
});

// ✅ Input field
const input = css({
  px: 'md',  // 16px horizontal
  py: 'sm'   // 8px vertical
});
```

#### Layout Spacing
```typescript
// ✅ Stack of elements
const stack = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md'  // 16px between items
});

// ✅ Grid layout
const grid = css({
  display: 'grid',
  gap: 'lg'  // 24px between grid items
});

// ✅ Container with padding
const container = css({
  px: { base: 'md', lg: 'xl' },  // Responsive: 16px mobile, 32px desktop
  py: 'lg'                        // 24px vertical
});
```

#### Margin Between Sections
```typescript
// ✅ Section spacing
const section = css({
  mb: 'xxl'  // 48px bottom margin
});

// ✅ Page-level spacing
const page = css({
  p: { base: 'lg', lg: 'xxl' }  // 24px mobile, 48px desktop
});
```

## Common Use Cases

### Component Spacing

| Use Case | Token | Example |
|----------|-------|---------|
| Button padding (horizontal) | `md` | 16px |
| Button padding (vertical) | `sm` | 8px |
| Input padding | `md` | 16px |
| Card padding | `lg` or `xl` | 24-32px |
| Dialog padding | `lg` or `xl` | 24-32px |
| Icon margins | `xs` or `sm` | 4-8px |

### Layout Spacing

| Use Case | Token | Example |
|----------|-------|---------|
| Gap between form fields | `md` | 16px |
| Gap between cards | `lg` | 24px |
| Section margins | `xl` or `xxl` | 32-48px |
| Page margins | `xl` or `xxl` | 32-48px |
| Hero section padding | `xxxl` | 64px |

### Content Spacing

| Use Case | Token | Example |
|----------|-------|---------|
| Paragraph margins | `md` | 16px |
| List item spacing | `sm` or `md` | 8-16px |
| Icon-text gap | `xs` or `sm` | 4-8px |
| Button group gap | `sm` | 8px |

## Usage in Code

### Padding

```typescript
import { css } from '@discourser/design-system/styled-system/css';

// All sides
const box = css({ p: 'md' });  // 16px all sides

// Individual sides
const box = css({
  pt: 'lg',   // padding-top: 24px
  pr: 'md',   // padding-right: 16px
  pb: 'lg',   // padding-bottom: 24px
  pl: 'md'    // padding-left: 16px
});

// Horizontal/Vertical
const box = css({
  px: 'md',  // padding-left + padding-right: 16px
  py: 'sm'   // padding-top + padding-bottom: 8px
});
```

### Margin

```typescript
// All sides
const box = css({ m: 'md' });  // 16px all sides

// Individual sides
const box = css({
  mt: 'lg',   // margin-top: 24px
  mr: 'md',   // margin-right: 16px
  mb: 'lg',   // margin-bottom: 24px
  ml: 'md'    // margin-left: 16px
});

// Horizontal/Vertical
const box = css({
  mx: 'auto',  // margin-left + margin-right: auto (centering)
  my: 'lg'     // margin-top + margin-bottom: 24px
});
```

### Gap (Flexbox/Grid)

```typescript
// Flex/Grid gap
const stack = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md'  // 16px between all children
});

// Different horizontal/vertical gaps
const grid = css({
  display: 'grid',
  rowGap: 'lg',    // 24px between rows
  columnGap: 'md'  // 16px between columns
});
```

## Responsive Spacing

Use different spacing values at different breakpoints:

```typescript
const container = css({
  // Mobile: 16px padding
  // Desktop: 32px padding
  p: { base: 'md', lg: 'xl' }
});

const section = css({
  // Mobile: 24px margin
  // Desktop: 48px margin
  mb: { base: 'lg', lg: 'xxl' }
});
```

## What NOT to Do

```typescript
// ❌ NEVER use arbitrary pixel values
const wrong = css({ padding: '17px' });
const wrong = css({ margin: '13px' });

// ❌ NEVER use rem/em values directly
const wrong = css({ padding: '1.5rem' });

// ❌ NEVER use non-token spacing
const wrong = css({ gap: '20px' });

// ✅ ALWAYS use spacing tokens
const correct = css({ p: 'md', gap: 'lg' });
```

## Special Cases

### Zero Spacing
```typescript
// Reset spacing
const reset = css({
  m: 'none',  // margin: 0
  p: 'none'   // padding: 0
});
```

### Negative Margins
```typescript
// Negative margins (use sparingly)
const overlap = css({
  mt: 'calc(var(--spacing-md) * -1)'  // -16px
});
```

### Custom Spacing (Rare)
Only use custom spacing when absolutely necessary and none of the tokens fit:

```typescript
// Last resort - custom spacing
const custom = css({
  padding: 'calc(var(--spacing-sm) + var(--spacing-xs))'  // 8px + 4px = 12px
});
```

## Accessibility

Proper spacing improves:
- **Touch targets**: Minimum 44x44px (use appropriate padding)
- **Readability**: Adequate spacing between text blocks
- **Scannability**: Clear visual separation between sections
- **Focus indicators**: Enough space for focus outlines

### Minimum Touch Target Spacing

```typescript
// ✅ Adequate touch target (Button component handles this)
const button = css({
  minHeight: '44px',
  px: 'md',
  py: 'sm'
});

// ✅ Spacing between interactive elements
const buttonGroup = css({
  display: 'flex',
  gap: 'sm'  // Minimum 8px between buttons
});
```

## Best Practices

1. **Prefer fewer, larger gaps** over many small gaps
2. **Use consistent spacing** within similar components
3. **Increase spacing** for more important separations
4. **Follow the 8px grid** whenever possible
5. **Test on mobile** to ensure adequate touch targets
6. **Use responsive spacing** for better mobile/desktop experiences

## Common Spacing Mistakes

| ❌ Wrong | ✅ Right | Why |
|---------|---------|-----|
| `gap: 'xs'` for cards | `gap: 'lg'` | Cards need breathing room |
| `p: 'xxxl'` for button | `px: 'md', py: 'sm'` | Too much padding overwhelms |
| `mb: 'sm'` for sections | `mb: 'xl'` or `'xxl'` | Sections need clear separation |
| `padding: '20px'` | `p: 'lg'` | Use tokens, not arbitrary values |
| `gap: 'lg'` between icons | `gap: 'xs'` or `'sm'` | Icons are small, need less space |
