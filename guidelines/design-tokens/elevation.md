# Elevation Tokens

The design system uses Material Design 3 elevation system combining surface tints and shadows to create depth and hierarchy.

## What is Elevation?

Elevation creates visual hierarchy by making elements appear to float above the background. M3 uses two techniques:
1. **Surface Tints**: Background color changes (via `surfaceContainer*` tokens)
2. **Shadows**: Subtle shadows for additional depth (optional)

**Important**: M3 primarily uses surface tints, not heavy shadows like older Material Design versions.

## Elevation Levels

| Token | Shadow Value | Usage |
|-------|--------------|-------|
| `level0` | none | Flat elements, no elevation |
| `level1` | `0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)` | Cards (low elevation) |
| `level2` | `0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)` | Raised cards, FAB (resting) |
| `level3` | `0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)` | Dialogs, menus |
| `level4` | `0px 6px 10px 4px rgba(0,0,0,0.15), 0px 2px 3px rgba(0,0,0,0.3)` | FAB (hover), navigation drawers |
| `level5` | `0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)` | Modals, navigation bars |

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
  boxShadow: 'level1'  // Optional shadow
});

// Dialog with shadow
const dialog = css({
  bg: 'surfaceContainerHigh',
  boxShadow: 'level3'
});
```

## Component Elevation Mapping

| Component | Surface Container | Shadow Level | Elevation |
|-----------|-------------------|--------------|-----------|
| Page background | `surface` | `level0` | 0dp |
| Filled Card | `surface` | `level0` | 0dp |
| Outlined Card | `surface` | `level0` | 0dp |
| Elevated Card | `surfaceContainerLow` | `level1` | 1dp |
| Input (filled) | `surfaceContainerHighest` | `level0` | 0dp |
| Button (filled) | `primary` | `level0` | 0dp |
| Button (elevated) | `surfaceContainerLow` | `level1` | 1dp |
| Dialog | `surfaceContainerHigh` | `level3` | 3dp |
| Menu | `surfaceContainer` | `level2` | 2dp |
| Navigation Drawer | `surfaceContainerLow` | `level1` | 1dp |

## Usage Patterns

### Cards

```typescript
// Filled card (no elevation)
const filledCard = css({
  bg: 'surface',
  borderColor: 'outlineVariant',
  borderWidth: '1px'
});

// Elevated card
const elevatedCard = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1'  // Optional
});

// Outlined card (no elevation)
const outlinedCard = css({
  bg: 'surface',
  borderColor: 'outline',
  borderWidth: '1px'
});
```

### Dialogs and Modals

```typescript
// Dialog
const dialog = css({
  bg: 'surfaceContainerHigh',
  boxShadow: 'level3',
  borderRadius: 'large'
});

// Full-screen modal
const modal = css({
  bg: 'surfaceContainerHighest',
  boxShadow: 'level5'
});

// Scrim (overlay behind dialog)
const scrim = css({
  bg: 'scrim',
  opacity: 0.32
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
    boxShadow: 'level2'  // Increase shadow on hover
  }
});

// Card hover
const card = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1',
  transition: 'box-shadow 0.2s',
  _hover: {
    boxShadow: 'level2'
  }
});
```

## What NOT to Do

```typescript
// ❌ NEVER use arbitrary shadow values
const wrong = css({
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
});

// ❌ NEVER use heavy shadows (old Material Design style)
const wrong = css({
  boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
});

// ❌ NEVER use elevation without surface tints
const wrong = css({
  bg: '#FFFFFF',  // Raw color
  boxShadow: 'level1'
});

// ✅ ALWAYS use surface containers + optional shadows
const correct = css({
  bg: 'surfaceContainerLow',
  boxShadow: 'level1'
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
    boxShadow: 'level2'
  }
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

| ❌ Wrong | ✅ Right | Why |
|---------|---------|-----|
| Dialog at level1 | Dialog at level3 | Dialogs should float above content |
| Heavy `boxShadow: '0 10px 50px'` | `boxShadow: 'level1'` | M3 uses subtle shadows |
| Card at level5 | Card at level1 | Cards shouldn't float too high |
| `bg: '#FFF', boxShadow: 'level1'` | `bg: 'surfaceContainerLow'` | Use surface containers, not raw colors |
| No elevation for dialogs | `bg: 'surfaceContainerHigh'` | Dialogs need visual separation |
