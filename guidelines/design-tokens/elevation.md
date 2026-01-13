# Elevation Tokens

The design system uses Material Design 3 elevation system combining surface tints and shadows to create depth and hierarchy.

## What is Elevation?

Elevation creates visual hierarchy by making elements appear to float above the background. M3 uses two techniques:

1. **Surface Tints**: Background color changes (via `surfaceContainer*` tokens)
2. **Shadows**: Subtle shadows for additional depth (optional)

**Important**: M3 primarily uses surface tints, not heavy shadows like older Material Design versions.

## Elevation Levels

| Token    | Shadow Value                                                     | Usage                           |
| -------- | ---------------------------------------------------------------- | ------------------------------- |
| `level0` | none                                                             | Flat elements, no elevation     |
| `level1` | `0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)`  | Cards (low elevation)           |
| `level2` | `0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)`  | Raised cards, FAB (resting)     |
| `level3` | `0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)`  | Dialogs, menus                  |
| `level4` | `0px 6px 10px 4px rgba(0,0,0,0.15), 0px 2px 3px rgba(0,0,0,0.3)` | FAB (hover), navigation drawers |
| `level5` | `0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)` | Modals, navigation bars         |

## M3 Elevation Strategy

### Primary Method: Surface Containers

M3 primarily uses surface container colors for elevation. Higher elevations get different background colors:

```typescript
import { css } from '@discourser/design-system/styled-system/css';

// Level 0 (flat, on page)
const flat = css({ bg: 'surface' });

// Level 1 (low elevation - cards)
const card = css({ bg: 'surfaceContainerLow' });

// Level 3 (default containers)
const container = css({ bg: 'surfaceContainer' });

// Level 4 (high elevation - dialogs)
const dialog = css({ bg: 'surfaceContainerHigh' });

// Level 5 (highest elevation)
const modal = css({ bg: 'surfaceContainerHighest' });
```

### Secondary Method: Shadows (Optional)

Shadows can be added for additional depth, but use sparingly:

```typescript
// Card with subtle shadow
const card = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1', // Optional shadow
});

// Dialog with shadow
const dialog = css({
  bg: 'surfaceContainerHigh',
  boxShadow: 'level3',
});
```

## Component Elevation Mapping

| Component         | Surface Container         | Shadow Level | Elevation |
| ----------------- | ------------------------- | ------------ | --------- |
| Page background   | `surface`                 | `level0`     | 0dp       |
| Filled Card       | `surface`                 | `level0`     | 0dp       |
| Outlined Card     | `surface`                 | `level0`     | 0dp       |
| Elevated Card     | `surfaceContainerLow`     | `level1`     | 1dp       |
| Input (filled)    | `surfaceContainerHighest` | `level0`     | 0dp       |
| Button (filled)   | `primary`                 | `level0`     | 0dp       |
| Button (elevated) | `surfaceContainerLow`     | `level1`     | 1dp       |
| Dialog            | `surfaceContainerHigh`    | `level3`     | 3dp       |
| Menu              | `surfaceContainer`        | `level2`     | 2dp       |
| Navigation Drawer | `surfaceContainerLow`     | `level1`     | 1dp       |

## Usage Patterns

### Cards

```typescript
// Filled card (no elevation)
const filledCard = css({
  bg: 'surface',
  borderColor: 'outlineVariant',
  borderWidth: '1px',
});

// Elevated card
const elevatedCard = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1', // Optional
});

// Outlined card (no elevation)
const outlinedCard = css({
  bg: 'surface',
  borderColor: 'outline',
  borderWidth: '1px',
});
```

### Dialogs and Modals

```typescript
// Dialog
const dialog = css({
  bg: 'surfaceContainerHigh',
  boxShadow: 'level3',
  borderRadius: 'large',
});

// Full-screen modal
const modal = css({
  bg: 'surfaceContainerHighest',
  boxShadow: 'level5',
});

// Scrim (overlay behind dialog)
const scrim = css({
  bg: 'scrim',
  opacity: 0.32,
});
```

### Interactive States

Elevation can change on interaction:

```typescript
// Button hover (increase elevation)
const button = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1',
  _hover: {
    boxShadow: 'level2', // Increase shadow on hover
  },
});

// Card hover
const card = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1',
  transition: 'box-shadow 0.2s',
  _hover: {
    boxShadow: 'level2',
  },
});
```

## What NOT to Do

```typescript
// ❌ NEVER use arbitrary shadow values
const wrong = css({
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
});

// ❌ NEVER use heavy shadows (old Material Design style)
const wrong = css({
  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
});

// ❌ NEVER use elevation without surface tints
const wrong = css({
  bg: '#FFFFFF', // Raw color
  boxShadow: 'level1',
});

// ✅ ALWAYS use surface containers + optional shadows
const correct = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1',
});
```

## Elevation Hierarchy Rules

1. **Higher elements** should have higher elevation
2. **Overlays and modals** should be highest (level 4-5)
3. **Dialogs and menus** should be mid-high (level 2-3)
4. **Cards and containers** should be low (level 0-1)
5. **Page backgrounds** should be level 0

### Layering Example

```
Page Background (surface, level0)
  ├─ Filled Card (surface, level0)
  ├─ Elevated Card (surfaceContainerLow, level1)
  └─ Dialog (surfaceContainerHigh, level3)
      └─ Button in Dialog (primary, level0)
```

## How Elevation Tokens Work With Other Tokens

Elevation tokens are rarely used alone. Here are real-world examples showing how shadows and surface tints combine with color, spacing, and typography tokens to create visual hierarchy:

### Elevated Card with Content Hierarchy

```typescript
import { Card } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<Card variant="elevated">
  {/* Card automatically combines: */}
  {/* bg: 'surfaceContainerLow' - Color token for elevation */}
  {/* boxShadow: 'level1' - Elevation token for depth */}
  {/* borderRadius: 'l3' - Border radius - 12px */}

  <div className={css({
    p: 'lg',                          // Spacing - 24px padding
    display: 'flex',
    flexDirection: 'column',
    gap: 'md'                         // Spacing - 16px between sections
  })}>

    <div className={css({
      display: 'flex',
      alignItems: 'center',
      gap: 'sm',                      // Spacing - 8px between icon and title
      mb: 'sm'                        // Spacing - 8px bottom margin
    })}>
      <div className={css({
        bg: 'primaryContainer',       // Color - icon container
        color: 'onPrimaryContainer',  // Color - icon color
        p: 'sm',                      // Spacing - 8px padding
        borderRadius: 'full',         // Border radius - circular
        boxShadow: 'level0'           // Elevation - flat (no shadow)
      })}>
        <StarIcon size="20px" />
      </div>

      <h3 className={css({
        textStyle: 'titleLarge',      // Typography - 22px/28px
        color: 'onSurface'            // Color - primary text
      })}>
        Featured Content
      </h3>
    </div>

    <p className={css({
      textStyle: 'bodyMedium',        // Typography - 14px/20px
      color: 'onSurfaceVariant',      // Color - secondary text
      mb: 'md'                        // Spacing - 16px bottom margin
    })}>
      This card demonstrates how elevation creates visual hierarchy when
      combined with proper spacing and typography.
    </p>

    <div className={css({
      display: 'flex',
      gap: 'sm'                       // Spacing - 8px between buttons
    })}>
      <Button variant="filled">
        {/* Button sits on elevated surface */}
        {/* bg: 'primary' - Color */}
        {/* boxShadow: 'level0' - No additional shadow needed */}
        {/* px: 'lg' - Spacing (24px) */}
        Learn More
      </Button>
    </div>
  </div>
</Card>
```

### Dialog Over Page Content (Multi-Layer Elevation)

```typescript
import { Dialog, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<Dialog.Root>
  {/* Layer 1: Page Background (level0) */}
  <div className={css({
    bg: 'surface',                    // Color - page background (level0)
    p: 'xl'                           // Spacing - 32px padding
  })}>
    <Card variant="elevated">
      {/* Layer 2: Elevated Card (level1) */}
      {/* bg: 'surfaceContainerLow' - Color for level1 */}
      {/* boxShadow: 'level1' - Elevation shadow */}
      <div className={css({ p: 'lg' })}>
        <h2 className={css({
          textStyle: 'headlineMedium',  // Typography - 28px/36px
          color: 'onSurface'            // Color - primary text
        })}>
          Page Content
        </h2>
      </div>
    </Card>
  </div>

  {/* Layer 3: Scrim/Backdrop (over everything) */}
  <Dialog.Backdrop className={css({
    bg: 'scrim',                      // Color - black overlay
    opacity: 0.32                     // Semi-transparent
  })} />

  {/* Layer 4: Dialog (highest elevation - level3) */}
  <Dialog.Content className={css({
    bg: 'surfaceContainerHigh',       // Color - high elevation surface
    color: 'onSurface',               // Color - primary text
    borderRadius: 'l4',               // Border radius - 28px
    boxShadow: 'level3',              // Elevation - dialog shadow (floats above all)
    p: 'xl',                          // Spacing - 32px padding
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: 'lg'                         // Spacing - 24px between sections
  })}>

    <Dialog.Title className={css({
      textStyle: 'headlineSmall',     // Typography - 24px/32px
      color: 'onSurface',             // Color - primary text on elevated surface
      mb: 'sm'                        // Spacing - 8px bottom margin
    })}>
      Confirm Action
    </Dialog.Title>

    <Dialog.Description className={css({
      textStyle: 'bodyMedium',        // Typography - 14px/20px
      color: 'onSurfaceVariant'       // Color - secondary text
    })}>
      This dialog demonstrates the highest elevation level, floating above
      the backdrop and all page content.
    </Dialog.Description>

    <div className={css({
      display: 'flex',
      gap: 'sm',                      // Spacing - 8px between buttons
      justifyContent: 'flex-end',
      mt: 'md'                        // Spacing - 16px top margin
    })}>
      <Button variant="text">
        {/* No elevation change needed on elevated surface */}
        {/* color: 'primary' - Color */}
        Cancel
      </Button>
      <Button variant="filled">
        {/* bg: 'primary' - Color */}
        {/* boxShadow: 'level0' - No shadow (already on elevated surface) */}
        Confirm
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
```

### Interactive Elevation Changes (Hover States)

```typescript
import { css } from '@discourser/design-system/styled-system/css';

<div className={css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
  gap: 'lg',                          // Spacing - 24px between cards
  p: 'xl'                             // Spacing - 32px padding
})}>
  {products.map(product => (
    <article key={product.id} className={css({
      bg: 'surfaceContainerLow',      // Color - elevated surface (level1)
      borderRadius: 'l3',             // Border radius - 12px
      boxShadow: 'level1',            // Elevation - default card shadow
      p: 'lg',                        // Spacing - 24px padding
      transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // M3 motion
      cursor: 'pointer',
      _hover: {
        boxShadow: 'level2'           // Elevation - increase on hover
      },
      _active: {
        boxShadow: 'level0'           // Elevation - decrease on click
      }
    })}>

      <div className={css({
        bg: 'surfaceContainer',       // Color - slightly higher elevation
        borderRadius: 'l2',           // Border radius - 8px
        p: 'md',                      // Spacing - 16px padding
        mb: 'md'                      // Spacing - 16px bottom margin
      })}>
        <img
          src={product.image}
          alt={product.name}
          className={css({
            width: '100%',
            height: 'auto',
            borderRadius: 'l1'        // Border radius - 4px
          })}
        />
      </div>

      <h3 className={css({
        textStyle: 'titleMedium',     // Typography - 16px/24px
        color: 'onSurface',           // Color - primary text
        mb: 'xs'                      // Spacing - 4px bottom margin
      })}>
        {product.name}
      </h3>

      <p className={css({
        textStyle: 'bodySmall',       // Typography - 12px/16px
        color: 'onSurfaceVariant',    // Color - secondary text
        mb: 'md'                      // Spacing - 16px bottom margin
      })}>
        {product.description}
      </p>

      <div className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      })}>
        <span className={css({
          textStyle: 'titleLarge',    // Typography - 22px/28px
          color: 'primary'            // Color - brand color
        })}>
          ${product.price}
        </span>

        <Button variant="filled" size="sm">
          {/* px: 'md' - Spacing (16px) */}
          {/* bg: 'primary' - Color */}
          {/* No additional shadow - already on elevated card */}
          Add to Cart
        </Button>
      </div>
    </article>
  ))}
</div>
```

### Floating Action Button (FAB) with Elevation States

```typescript
import { css } from '@discourser/design-system/styled-system/css';

<button className={css({
  position: 'fixed',
  bottom: 'xl',                       // Spacing - 32px from bottom
  right: 'xl',                        // Spacing - 32px from right
  width: '56px',                      // Size - standard FAB size
  height: '56px',                     // Size - standard FAB size
  bg: 'primary',                      // Color - primary brand color
  color: 'onPrimary',                 // Color - white icon
  borderRadius: 'l3',                 // Border radius - 12px (M3 style)
  boxShadow: 'level2',                // Elevation - FAB resting state (floats)
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // M3 motion
  cursor: 'pointer',
  _hover: {
    boxShadow: 'level4',              // Elevation - increase significantly on hover
    transform: 'scale(1.05)'          // Slight scale increase
  },
  _active: {
    boxShadow: 'level2',              // Elevation - return to resting
    transform: 'scale(0.95)'          // Slight press effect
  }
})}>
  <AddIcon size="24px" />             {/* Icon size: 24px */}
</button>
```

### Menu/Dropdown with Proper Elevation

```typescript
import { Menu } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

<Menu.Root>
  <Menu.Trigger asChild>
    <Button variant="outlined">
      {/* Trigger button: */}
      {/* borderColor: 'outline' - Color */}
      {/* px: 'lg' - Spacing (24px) */}
      Options
    </Button>
  </Menu.Trigger>

  <Menu.Content className={css({
    bg: 'surfaceContainer',           // Color - menu elevation (level2/3)
    borderRadius: 'l2',               // Border radius - 8px
    boxShadow: 'level2',              // Elevation - menu floats above content
    p: 'xs',                          // Spacing - 4px padding
    minWidth: '200px',
    border: 'none'
  })}>

    <Menu.Item className={css({
      px: 'md',                       // Spacing - 16px horizontal padding
      py: 'sm',                       // Spacing - 8px vertical padding
      borderRadius: 'l1',             // Border radius - 4px
      textStyle: 'bodyMedium',        // Typography - 14px/20px
      color: 'onSurface',             // Color - primary text
      display: 'flex',
      alignItems: 'center',
      gap: 'sm',                      // Spacing - 8px between icon and text
      _hover: {
        bg: 'surfaceContainerHighest' // Color - hover background (higher than menu)
      },
      _focus: {
        bg: 'surfaceContainerHighest',
        outline: '2px solid',
        outlineColor: 'primary',      // Color - focus ring
        outlineOffset: '-2px'
      }
    })}>
      <EditIcon size="18px" />
      Edit
    </Menu.Item>

    <Menu.Item className={css({
      px: 'md',
      py: 'sm',
      borderRadius: 'l1',
      textStyle: 'bodyMedium',
      color: 'onSurface',
      display: 'flex',
      alignItems: 'center',
      gap: 'sm'
    })}>
      <ShareIcon size="18px" />
      Share
    </Menu.Item>

    <Menu.Separator className={css({
      my: 'xs',                       // Spacing - 4px vertical margin
      height: '1px',
      bg: 'outlineVariant'            // Color - subtle divider
    })} />

    <Menu.Item className={css({
      px: 'md',
      py: 'sm',
      borderRadius: 'l1',
      textStyle: 'bodyMedium',
      color: 'error',                 // Color - destructive action
      display: 'flex',
      alignItems: 'center',
      gap: 'sm',
      _hover: {
        bg: 'errorContainer',         // Color - error background on hover
        color: 'onErrorContainer'     // Color - maintain contrast
      }
    })}>
      <DeleteIcon size="18px" />
      Delete
    </Menu.Item>
  </Menu.Content>
</Menu.Root>
```

### Snackbar/Toast with Inverse Surface

```typescript
import { css } from '@discourser/design-system/styled-system/css';

<div className={css({
  position: 'fixed',
  bottom: 'lg',                       // Spacing - 24px from bottom
  left: '50%',
  transform: 'translateX(-50%)',
  bg: 'inverseSurface',               // Color - inverse surface (dark in light mode)
  color: 'inverseOnSurface',          // Color - light text on dark background
  boxShadow: 'level2',                // Elevation - floats above content
  borderRadius: 'l1',                 // Border radius - 4px
  px: 'md',                           // Spacing - 16px horizontal padding
  py: 'sm',                           // Spacing - 8px vertical padding
  display: 'flex',
  alignItems: 'center',
  gap: 'md',                          // Spacing - 16px between icon and content
  minWidth: '344px',
  maxWidth: '672px'
})}>

  <CheckCircleIcon className={css({
    color: 'inversePrimary',          // Color - brand color on inverse surface
    flexShrink: 0
  })} size="20px" />

  <div className={css({ flex: 1 })}>
    <p className={css({
      textStyle: 'bodyMedium',        // Typography - 14px/20px
      color: 'inverseOnSurface'       // Color - light text
    })}>
      Your changes have been saved successfully!
    </p>
  </div>

  <Button variant="text" size="sm" className={css({
    color: 'inversePrimary',          // Color - action button on inverse
    px: 'sm',                         // Spacing - 8px horizontal
    _hover: {
      bg: 'rgba(255, 255, 255, 0.08)' // Subtle hover on inverse
    }
  })}>
    Undo
  </Button>

  <IconButton variant="ghost" size="sm" className={css({
    color: 'inverseOnSurface',        // Color - close button
    _hover: {
      bg: 'rgba(255, 255, 255, 0.08)'
    }
  })}>
    <CloseIcon size="18px" />
  </IconButton>
</div>
```

### Navigation Drawer with Scrim

```typescript
import { css } from '@discourser/design-system/styled-system/css';

<>
  {/* Scrim overlay */}
  <div className={css({
    position: 'fixed',
    inset: 0,
    bg: 'scrim',                      // Color - black overlay
    opacity: isOpen ? 0.32 : 0,
    transition: 'opacity 0.2s',
    pointerEvents: isOpen ? 'auto' : 'none'
  })} />

  {/* Navigation drawer */}
  <nav className={css({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '280px',
    bg: 'surfaceContainerLow',        // Color - elevated drawer surface
    boxShadow: 'level1',              // Elevation - drawer shadow
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // M3 motion
    p: 'md',                          // Spacing - 16px padding
    display: 'flex',
    flexDirection: 'column',
    gap: 'lg'                         // Spacing - 24px between sections
  })}>

    <div className={css({
      display: 'flex',
      alignItems: 'center',
      gap: 'md',                      // Spacing - 16px between logo and title
      pb: 'md',                       // Spacing - 16px bottom padding
      borderBottomWidth: '1px',
      borderBottomColor: 'outlineVariant' // Color - divider
    })}>
      <Logo size="32px" />
      <h2 className={css({
        textStyle: 'titleLarge',      // Typography - 22px/28px
        color: 'onSurface'            // Color - primary text
      })}>
        App Name
      </h2>
    </div>

    <ul className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: 'xxs'                      // Spacing - 2px between nav items
    })}>
      <li>
        <a className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'md',                  // Spacing - 16px between icon and label
          px: 'md',                   // Spacing - 16px horizontal padding
          py: 'sm',                   // Spacing - 8px vertical padding
          borderRadius: 'l1',         // Border radius - 4px
          textStyle: 'labelLarge',    // Typography - 14px/20px
          color: 'onSurface',         // Color - text
          _hover: {
            bg: 'surfaceContainerHighest' // Color - hover (higher than drawer)
          }
        })}>
          <HomeIcon size="24px" />
          Home
        </a>
      </li>
    </ul>
  </nav>
</>
```

### Multi-Token Elevation Pattern Summary

When combining elevation with other tokens, follow these patterns:

**Elevated Surface Pattern:**

```typescript
{
  bg: 'surfaceContainer*',            // Color - elevation surface
  boxShadow: 'level1-3',              // Elevation - subtle shadow
  borderRadius: 'l1-l4',              // Border radius
  p: 'md-xl',                         // Spacing - internal padding
  color: 'onSurface'                  // Color - text maintains contrast
}
```

**Interactive Elevation Pattern:**

```typescript
{
  bg: 'surfaceContainerLow',          // Color - base elevation
  boxShadow: 'level1',                // Elevation - resting state
  transition: 'box-shadow 0.2s',      // M3 motion timing
  _hover: {
    boxShadow: 'level2'               // Elevation - increase on hover
  },
  _active: {
    boxShadow: 'level0'               // Elevation - decrease on press
  }
}
```

**Overlay Pattern:**

```typescript
{
  // Backdrop:
  bg: 'scrim',                        // Color - black overlay
  opacity: 0.32,                      // Semi-transparent

  // Elevated content:
  bg: 'surfaceContainerHigh',         // Color - high elevation
  boxShadow: 'level3-5',              // Elevation - floats above backdrop
  p: 'xl',                            // Spacing - generous padding
  borderRadius: 'l3-l4'               // Border radius - soft corners
}
```

**Layering Hierarchy:**

```typescript
// Level 0 (Page):
{ bg: 'surface', boxShadow: 'level0' }

// Level 1 (Cards):
{ bg: 'surfaceContainerLow', boxShadow: 'level1' }

// Level 2 (Menus):
{ bg: 'surfaceContainer', boxShadow: 'level2' }

// Level 3 (Dialogs):
{ bg: 'surfaceContainerHigh', boxShadow: 'level3' }

// Level 4-5 (Modals):
{ bg: 'surfaceContainerHighest', boxShadow: 'level4-5' }
```

## Accessibility

### Color Contrast

Surface tint changes must maintain adequate contrast:

- Text on elevated surfaces still uses `onSurface` or `onSurfaceVariant`
- The design system automatically handles this

### Motion and Transitions

When elevation changes on interaction:

```typescript
const card = css({
  transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  _hover: {
    boxShadow: 'level2',
  },
});
```

Use M3 motion tokens for consistent timing:

- `fast` (100ms) - Subtle changes
- `normal` (200ms) - Standard transitions
- `slow` (300ms) - Emphasized changes

## Dark Mode

Elevation behaves differently in dark mode:

- **Light mode**: Higher elevation = lighter background
- **Dark mode**: Higher elevation = lighter background (more tint)

The surface container tokens handle this automatically. No code changes needed.

```typescript
// Automatically adapts to dark mode
const card = css({ bg: 'surfaceContainerLow' });
```

## Component Usage

Most components handle elevation automatically:

```typescript
import { Card, Dialog, Button } from '@discourser/design-system';

// Card handles elevation via variant
<Card variant="elevated">Content</Card>  // Auto uses surfaceContainerLow + level1

// Dialog handles elevation automatically
<Dialog.Content>Dialog content</Dialog.Content>  // Auto uses surfaceContainerHigh + level3

// Button elevated variant
<Button variant="elevated">Action</Button>  // Auto uses surfaceContainerLow + level1
```

Only use manual elevation tokens when creating custom layouts outside of components.

## Best Practices

1. **Prefer surface containers** over shadows alone
2. **Use minimal shadows** - M3 is more subtle than older Material Design
3. **Maintain hierarchy** - overlays above dialogs above cards
4. **Animate elevation changes** for smooth interactions
5. **Test in dark mode** to ensure proper contrast
6. **Let components handle elevation** when possible
7. **Use level 0-1 for most content** - save higher levels for overlays

## Common Elevation Mistakes

| ❌ Wrong                          | ✅ Right                     | Why                                    |
| --------------------------------- | ---------------------------- | -------------------------------------- |
| Dialog at level1                  | Dialog at level3             | Dialogs should float above content     |
| Heavy `boxShadow: '0 10px 50px'`  | `boxShadow: 'level1'`        | M3 uses subtle shadows                 |
| Card at level5                    | Card at level1               | Cards shouldn't float too high         |
| `bg: '#FFF', boxShadow: 'level1'` | `bg: 'surfaceContainerLow'`  | Use surface containers, not raw colors |
| No elevation for dialogs          | `bg: 'surfaceContainerHigh'` | Dialogs need visual separation         |
