# Spacing Tokens

The design system uses a consistent spacing scale based on an 8px grid system for predictable, harmonious layouts.

## Spacing Scale

| Token  | Value | Usage                                |
| ------ | ----- | ------------------------------------ |
| `none` | 0px   | No spacing, reset margins/padding    |
| `xxs`  | 2px   | Minimal gaps, icon spacing, borders  |
| `xs`   | 4px   | Very tight spacing, inline elements  |
| `sm`   | 8px   | Small gaps, compact layouts          |
| `md`   | 16px  | Default spacing, most common use     |
| `lg`   | 24px  | Larger sections, comfortable spacing |
| `xl`   | 32px  | Major sections, page margins         |
| `xxl`  | 48px  | Large sections, page padding         |
| `xxxl` | 64px  | Maximum spacing, hero sections       |

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
  px: 'md', // 16px horizontal
  py: 'sm', // 8px vertical
});

// ✅ Card padding
const card = css({
  p: 'lg', // 24px all sides
});

// ✅ Input field
const input = css({
  px: 'md', // 16px horizontal
  py: 'sm', // 8px vertical
});
```

#### Layout Spacing

```typescript
// ✅ Stack of elements
const stack = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md', // 16px between items
});

// ✅ Grid layout
const grid = css({
  display: 'grid',
  gap: 'lg', // 24px between grid items
});

// ✅ Container with padding
const container = css({
  px: { base: 'md', lg: 'xl' }, // Responsive: 16px mobile, 32px desktop
  py: 'lg', // 24px vertical
});
```

#### Margin Between Sections

```typescript
// ✅ Section spacing
const section = css({
  mb: 'xxl', // 48px bottom margin
});

// ✅ Page-level spacing
const page = css({
  p: { base: 'lg', lg: 'xxl' }, // 24px mobile, 48px desktop
});
```

## Common Use Cases

### Component Spacing

| Use Case                    | Token        | Example |
| --------------------------- | ------------ | ------- |
| Button padding (horizontal) | `md`         | 16px    |
| Button padding (vertical)   | `sm`         | 8px     |
| Input padding               | `md`         | 16px    |
| Card padding                | `lg` or `xl` | 24-32px |
| Dialog padding              | `lg` or `xl` | 24-32px |
| Icon margins                | `xs` or `sm` | 4-8px   |

### Layout Spacing

| Use Case                | Token         | Example |
| ----------------------- | ------------- | ------- |
| Gap between form fields | `md`          | 16px    |
| Gap between cards       | `lg`          | 24px    |
| Section margins         | `xl` or `xxl` | 32-48px |
| Page margins            | `xl` or `xxl` | 32-48px |
| Hero section padding    | `xxxl`        | 64px    |

### Content Spacing

| Use Case          | Token        | Example |
| ----------------- | ------------ | ------- |
| Paragraph margins | `md`         | 16px    |
| List item spacing | `sm` or `md` | 8-16px  |
| Icon-text gap     | `xs` or `sm` | 4-8px   |
| Button group gap  | `sm`         | 8px     |

## Usage in Code

### Padding

```typescript
import { css } from '@discourser/design-system/styled-system/css';

// All sides
const box = css({ p: 'md' }); // 16px all sides

// Individual sides
const box = css({
  pt: 'lg', // padding-top: 24px
  pr: 'md', // padding-right: 16px
  pb: 'lg', // padding-bottom: 24px
  pl: 'md', // padding-left: 16px
});

// Horizontal/Vertical
const box = css({
  px: 'md', // padding-left + padding-right: 16px
  py: 'sm', // padding-top + padding-bottom: 8px
});
```

### Margin

```typescript
// All sides
const box = css({ m: 'md' }); // 16px all sides

// Individual sides
const box = css({
  mt: 'lg', // margin-top: 24px
  mr: 'md', // margin-right: 16px
  mb: 'lg', // margin-bottom: 24px
  ml: 'md', // margin-left: 16px
});

// Horizontal/Vertical
const box = css({
  mx: 'auto', // margin-left + margin-right: auto (centering)
  my: 'lg', // margin-top + margin-bottom: 24px
});
```

### Gap (Flexbox/Grid)

```typescript
// Flex/Grid gap
const stack = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'md', // 16px between all children
});

// Different horizontal/vertical gaps
const grid = css({
  display: 'grid',
  rowGap: 'lg', // 24px between rows
  columnGap: 'md', // 16px between columns
});
```

## Responsive Spacing

Use different spacing values at different breakpoints:

```typescript
const container = css({
  // Mobile: 16px padding
  // Desktop: 32px padding
  p: { base: 'md', lg: 'xl' },
});

const section = css({
  // Mobile: 24px margin
  // Desktop: 48px margin
  mb: { base: 'lg', lg: 'xxl' },
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
  m: 'none', // margin: 0
  p: 'none', // padding: 0
});
```

### Negative Margins

```typescript
// Negative margins (use sparingly)
const overlap = css({
  mt: 'calc(var(--spacing-md) * -1)', // -16px
});
```

### Custom Spacing (Rare)

Only use custom spacing when absolutely necessary and none of the tokens fit:

```typescript
// Last resort - custom spacing
const custom = css({
  padding: 'calc(var(--spacing-sm) + var(--spacing-xs))', // 8px + 4px = 12px
});
```

## How Spacing Tokens Work With Other Tokens

Spacing tokens are rarely used in isolation. Here are real-world examples showing how spacing creates rhythm and hierarchy when combined with color, typography, and elevation tokens:

### Card Grid Layout

```typescript
import { Card } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<div className={css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: 'lg',                          // Spacing - 24px between cards
  p: { base: 'md', lg: 'xl' }         // Spacing - 16px mobile, 32px desktop padding
})}>
  {items.map(item => (
    <Card variant="elevated" key={item.id}>
      {/* Card combines: */}
      {/* bg: 'surfaceContainerLow' - Color token */}
      {/* boxShadow: 'level1' - Elevation token */}

      <div className={css({
        p: 'lg',                      // Spacing - 24px internal padding
        display: 'flex',
        flexDirection: 'column',
        gap: 'md'                     // Spacing - 16px between content sections
      })}>

        <h3 className={css({
          textStyle: 'titleLarge',    // Typography - 22px/28px
          color: 'onSurface',         // Color - primary text
          mb: 'sm'                    // Spacing - 8px bottom margin
        })}>
          {item.title}
        </h3>

        <p className={css({
          textStyle: 'bodyMedium',    // Typography - 14px/20px
          color: 'onSurfaceVariant',  // Color - secondary text
          mb: 'md'                    // Spacing - 16px bottom margin
        })}>
          {item.description}
        </p>

        <div className={css({
          display: 'flex',
          gap: 'sm',                  // Spacing - 8px between chips
          mt: 'auto'                  // Push to bottom
        })}>
          {item.tags.map(tag => (
            <span key={tag} className={css({
              bg: 'secondaryContainer',     // Color - chip background
              color: 'onSecondaryContainer', // Color - chip text
              textStyle: 'labelSmall',      // Typography - 11px/16px
              px: 'sm',                     // Spacing - 8px horizontal padding
              py: 'xs',                     // Spacing - 4px vertical padding
              borderRadius: 'full'          // Border radius - pill shape
            })}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  ))}
</div>
```

### Form Layout with Field Grouping

```typescript
import { Input, Button, Select } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<form className={css({
  maxWidth: '600px',
  p: { base: 'lg', lg: 'xl' },        // Spacing - 24px mobile, 32px desktop padding
  bg: 'surface',                      // Color - background
  borderRadius: 'l3',                 // Border radius - 12px
  boxShadow: 'level1'                 // Elevation - subtle shadow
})}>

  <h2 className={css({
    textStyle: 'headlineSmall',       // Typography - 24px/32px
    color: 'onSurface',               // Color - primary text
    mb: 'lg'                          // Spacing - 24px bottom margin
  })}>
    Contact Information
  </h2>

  <div className={css({
    display: 'flex',
    flexDirection: 'column',
    gap: 'lg'                         // Spacing - 24px between form fields
  })}>

    <Input
      label="Full Name"
      {/* Input internally uses: */}
      {/* textStyle: 'bodyLarge' - Typography (16px/24px) */}
      {/* px: 'md', py: 'sm' - Spacing (16px horizontal, 8px vertical) */}
      {/* borderColor: 'outline' - Color token */}
      {/* color: 'onSurface' - Color for text */}
    />

    <div className={css({
      display: 'grid',
      gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
      gap: 'md'                       // Spacing - 16px between email/phone
    })}>
      <Input label="Email" type="email" />
      <Input label="Phone" type="tel" />
    </div>

    <Select label="Country">
      {/* Select uses: */}
      {/* px: 'md', py: 'sm' - Spacing for padding */}
      {/* textStyle: 'bodyLarge' - Typography */}
    </Select>

    <div className={css({
      mt: 'xl',                       // Spacing - 32px top margin (section break)
      pt: 'lg',                       // Spacing - 24px top padding
      borderTopWidth: '1px',
      borderTopColor: 'outlineVariant' // Color - subtle divider
    })}>
      <h3 className={css({
        textStyle: 'titleMedium',     // Typography - 16px/24px
        color: 'onSurface',           // Color - primary text
        mb: 'md'                      // Spacing - 16px bottom margin
      })}>
        Additional Details
      </h3>

      <Input
        label="Message"
        multiline
        rows={4}
        {/* Multiline input uses: */}
        {/* p: 'md' - Spacing (16px all sides) */}
      />
    </div>

    <div className={css({
      display: 'flex',
      gap: 'sm',                      // Spacing - 8px between buttons
      justifyContent: 'flex-end',
      mt: 'lg'                        // Spacing - 24px top margin
    })}>
      <Button variant="text">
        {/* px: 'lg' - Spacing (24px horizontal) */}
        {/* textStyle: 'labelLarge' - Typography */}
        Cancel
      </Button>
      <Button variant="filled">
        {/* px: 'lg', height: '40px' - Spacing/size */}
        {/* bg: 'primary', color: 'onPrimary' - Color tokens */}
        Submit
      </Button>
    </div>
  </div>
</form>
```

### Navigation Menu with Hierarchical Spacing

```typescript
import { css } from '@discourser/design-system/styled-system/css';

<nav className={css({
  bg: 'surfaceContainerLow',          // Color - elevated surface
  borderRadius: 'l2',                 // Border radius - 8px
  p: 'sm',                            // Spacing - 8px outer padding
  boxShadow: 'level2'                 // Elevation - menu shadow
})}>

  <ul className={css({
    display: 'flex',
    flexDirection: 'column',
    gap: 'xxs'                        // Spacing - 2px between menu items (minimal)
  })}>

    <li>
      <a className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'md',                    // Spacing - 16px between icon and text
        px: 'md',                     // Spacing - 16px horizontal padding
        py: 'sm',                     // Spacing - 8px vertical padding
        borderRadius: 'l1',           // Border radius - 4px
        textStyle: 'labelLarge',      // Typography - 14px/20px
        color: 'onSurface',           // Color - primary text
        _hover: {
          bg: 'surfaceContainerHighest' // Color - hover background
        }
      })}>
        <Icon />                      {/* Icon size: 24px */}
        Dashboard
      </a>
    </li>

    <li>
      <a className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'md',                    // Spacing - consistent with above
        px: 'md',
        py: 'sm',
        borderRadius: 'l1',
        textStyle: 'labelLarge',
        color: 'onSurface',
        bg: 'secondaryContainer',     // Color - active state background
        _hover: {
          bg: 'secondaryContainer'
        }
      })}>
        <Icon />
        Projects
      </a>

      {/* Nested submenu */}
      <ul className={css({
        mt: 'xxs',                    // Spacing - 2px top margin
        ml: 'xl',                     // Spacing - 32px left margin (indent)
        display: 'flex',
        flexDirection: 'column',
        gap: 'xxs'                    // Spacing - 2px between subitems
      })}>
        <li>
          <a className={css({
            display: 'block',
            px: 'md',                 // Spacing - 16px horizontal
            py: 'xs',                 // Spacing - 4px vertical (smaller than parent)
            borderRadius: 'l1',
            textStyle: 'bodyMedium',  // Typography - 14px/20px
            color: 'onSurfaceVariant', // Color - secondary text
            _hover: {
              bg: 'surfaceContainerHighest'
            }
          })}>
            My Projects
          </a>
        </li>
      </ul>
    </li>

    <li className={css({
      mt: 'sm',                       // Spacing - 8px top margin (section break)
      pt: 'sm',                       // Spacing - 8px top padding
      borderTopWidth: '1px',
      borderTopColor: 'outlineVariant' // Color - divider
    })}>
      <a className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'md',
        px: 'md',
        py: 'sm',
        borderRadius: 'l1',
        textStyle: 'labelLarge',
        color: 'onSurface'
      })}>
        <Icon />
        Settings
      </a>
    </li>
  </ul>
</nav>
```

### Dialog with Structured Content Spacing

```typescript
import { Dialog, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<Dialog.Root>
  <Dialog.Backdrop
    bg: 'scrim'                       // Color - overlay background
    opacity: 0.32
  />

  <Dialog.Content className={css({
    bg: 'surfaceContainerHigh',       // Color - high elevation surface
    borderRadius: 'l4',               // Border radius - 28px
    boxShadow: 'level3',              // Elevation - dialog shadow
    p: 'xl',                          // Spacing - 32px padding
    maxWidth: '560px',
    display: 'flex',
    flexDirection: 'column',
    gap: 'lg'                         // Spacing - 24px between major sections
  })}>

    <div>
      <Dialog.Title className={css({
        textStyle: 'headlineSmall',   // Typography - 24px/32px
        color: 'onSurface',           // Color - primary text
        mb: 'md'                      // Spacing - 16px bottom margin
      })}>
        Confirm Changes
      </Dialog.Title>

      <Dialog.Description className={css({
        textStyle: 'bodyMedium',      // Typography - 14px/20px
        color: 'onSurfaceVariant'     // Color - secondary text
      })}>
        The following changes will be applied to your account:
      </Dialog.Description>
    </div>

    <div className={css({
      bg: 'surfaceContainerHighest',  // Color - nested surface
      borderRadius: 'l2',             // Border radius - 8px
      p: 'md'                         // Spacing - 16px padding
    })}>
      <ul className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'sm'                     // Spacing - 8px between list items
      })}>
        {changes.map((change, index) => (
          <li key={index} className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'xs',                // Spacing - 4px between icon and text
            textStyle: 'bodySmall',   // Typography - 12px/16px
            color: 'onSurface'        // Color - primary text
          })}>
            <CheckIcon size="16px" />
            {change}
          </li>
        ))}
      </ul>
    </div>

    <div className={css({
      bg: 'primaryContainer',         // Color - info background
      borderRadius: 'l2',             // Border radius - 8px
      p: 'md',                        // Spacing - 16px padding
      display: 'flex',
      gap: 'sm'                       // Spacing - 8px between icon and text
    })}>
      <InfoIcon className={css({
        color: 'onPrimaryContainer',  // Color - icon color
        flexShrink: 0
      })} />
      <p className={css({
        textStyle: 'bodySmall',       // Typography - 12px/16px
        color: 'onPrimaryContainer'   // Color - text color
      })}>
        This action can be reverted within 30 days.
      </p>
    </div>

    <div className={css({
      display: 'flex',
      gap: 'sm',                      // Spacing - 8px between action buttons
      justifyContent: 'flex-end',
      mt: 'md'                        // Spacing - 16px top margin
    })}>
      <Button variant="text">
        {/* px: 'lg' - Spacing (24px) */}
        {/* textStyle: 'labelLarge' - Typography */}
        Cancel
      </Button>
      <Button variant="filled">
        {/* px: 'lg' - Spacing (24px) */}
        {/* bg: 'primary', color: 'onPrimary' - Color */}
        Confirm
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
```

### Button Group with Icon Spacing

```typescript
import { Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<div className={css({
  display: 'flex',
  gap: 'sm',                          // Spacing - 8px between buttons
  flexWrap: 'wrap'
})}>
  <Button variant="filled">
    {/* Internal button structure: */}
    <span className={css({
      display: 'flex',
      alignItems: 'center',
      gap: 'xs',                      // Spacing - 4px between icon and text
      px: 'lg',                       // Spacing - 24px horizontal padding
      height: '40px'                  // Size - md variant
    })}>
      <SaveIcon />                    {/* Icon size: 18px */}
      <span className={css({
        textStyle: 'labelLarge',      // Typography - 14px/20px
        color: 'onPrimary'            // Color - button text
      })}>
        Save
      </span>
    </span>
  </Button>

  <Button variant="outlined">
    {/* bg: transparent - Color */}
    {/* borderColor: 'outline' - Color */}
    {/* px: 'lg' - Spacing */}
    <span className={css({
      display: 'flex',
      alignItems: 'center',
      gap: 'xs'                       // Spacing - consistent icon-text gap
    })}>
      <DownloadIcon />
      <span>Download</span>
    </span>
  </Button>

  <Button variant="text">
    {/* color: 'primary' - Color */}
    {/* px: 'lg' - Spacing */}
    Preview
  </Button>
</div>
```

### List Item with Avatar and Actions

```typescript
import { Avatar, IconButton } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<li className={css({
  display: 'flex',
  alignItems: 'center',
  gap: 'md',                          // Spacing - 16px between major sections
  p: 'md',                            // Spacing - 16px padding
  borderRadius: 'l2',                 // Border radius - 8px
  bg: 'surface',                      // Color - background
  _hover: {
    bg: 'surfaceContainerHighest'     // Color - hover state
  }
})}>

  <Avatar.Root size="md">
    {/* Avatar size: 40px */}
    {/* Avatar has built-in bg: 'primary', color: 'onPrimary' */}
    <Avatar.Image src="/avatar.jpg" />
    <Avatar.Fallback>JD</Avatar.Fallback>
  </Avatar.Root>

  <div className={css({ flex: 1 })}>
    <div className={css({
      display: 'flex',
      alignItems: 'center',
      gap: 'xs',                      // Spacing - 4px between name and badge
      mb: 'xxs'                       // Spacing - 2px bottom margin
    })}>
      <h4 className={css({
        textStyle: 'titleMedium',     // Typography - 16px/24px
        color: 'onSurface'            // Color - primary text
      })}>
        Jane Doe
      </h4>
      <span className={css({
        bg: 'tertiaryContainer',      // Color - badge background
        color: 'onTertiaryContainer', // Color - badge text
        textStyle: 'labelSmall',      // Typography - 11px/16px
        px: 'xs',                     // Spacing - 4px horizontal padding
        py: '2px',                    // Spacing - minimal vertical
        borderRadius: 'full'          // Border radius - pill
      })}>
        Pro
      </span>
    </div>

    <p className={css({
      textStyle: 'bodySmall',         // Typography - 12px/16px
      color: 'onSurfaceVariant',      // Color - secondary text
      mb: 'xs'                        // Spacing - 4px bottom margin
    })}>
      jane.doe@example.com
    </p>

    <span className={css({
      textStyle: 'labelSmall',        // Typography - 11px/16px
      color: 'onSurfaceVariant'       // Color - tertiary text
    })}>
      Last active 2 hours ago
    </span>
  </div>

  <div className={css({
    display: 'flex',
    gap: 'xs'                         // Spacing - 4px between icon buttons
  })}>
    <IconButton variant="ghost" size="sm">
      {/* IconButton uses: */}
      {/* p: 'sm' - Spacing (8px padding) */}
      {/* size: '32px' - Size token */}
      {/* borderRadius: 'full' - Border radius */}
      <EditIcon />
    </IconButton>
    <IconButton variant="ghost" size="sm">
      <DeleteIcon className={css({
        color: 'error'                // Color - error icon
      })} />
    </IconButton>
  </div>
</li>
```

### Multi-Token Spacing Pattern Summary

When creating layouts, spacing tokens combine with other tokens in these patterns:

**Container Pattern:**

```typescript
{
  p: 'md-xxl',                        // Spacing - internal padding
  gap: 'sm-lg',                       // Spacing - between children
  bg: 'surface*',                     // Color - background
  borderRadius: 'l1-l4',              // Border radius
  boxShadow: 'level*'                 // Elevation (if needed)
}
```

**Content Flow Pattern:**

```typescript
{
  display: 'flex|grid',
  flexDirection: 'column',
  gap: 'md-lg',                       // Spacing - primary content flow
  mb: 'xl-xxl'                        // Spacing - section separation
}
```

**Interactive Element Pattern:**

```typescript
{
  px: 'md-lg',                        // Spacing - horizontal padding
  py: 'xs-sm',                        // Spacing - vertical padding (usually smaller)
  gap: 'xs-sm',                       // Spacing - icon-text gap
  textStyle: 'label*',                // Typography
  borderRadius: 'full|l1',            // Border radius
  _hover: {
    bg: 'surface*'                    // Color - hover state
  }
}
```

**Hierarchical Text Pattern:**

```typescript
{
  textStyle: 'headline*|title*',      // Typography - heading
  color: 'onSurface',                 // Color - primary text
  mb: 'sm-md',                        // Spacing - heading-to-content gap

  // Followed by:
  textStyle: 'body*',                 // Typography - body text
  color: 'onSurfaceVariant',          // Color - secondary text
  mb: 'md-lg'                         // Spacing - paragraph separation
}
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
  py: 'sm',
});

// ✅ Spacing between interactive elements
const buttonGroup = css({
  display: 'flex',
  gap: 'sm', // Minimum 8px between buttons
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

| ❌ Wrong                  | ✅ Right              | Why                              |
| ------------------------- | --------------------- | -------------------------------- |
| `gap: 'xs'` for cards     | `gap: 'lg'`           | Cards need breathing room        |
| `p: 'xxxl'` for button    | `px: 'md', py: 'sm'`  | Too much padding overwhelms      |
| `mb: 'sm'` for sections   | `mb: 'xl'` or `'xxl'` | Sections need clear separation   |
| `padding: '20px'`         | `p: 'lg'`             | Use tokens, not arbitrary values |
| `gap: 'lg'` between icons | `gap: 'xs'` or `'sm'` | Icons are small, need less space |
