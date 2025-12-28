# Color Tokens

The design system uses Material Design 3 semantic color tokens. **Always use semantic tokens, never raw hex values.**

## Why Semantic Colors?

Semantic colors automatically adapt to light/dark themes and follow M3 color roles. Using semantic names ensures:
- Automatic theme switching
- Consistent contrast ratios
- Proper color relationships
- Accessibility compliance

## Semantic Colors Reference

### Primary Colors
Used for primary actions, key UI elements, and brand identity.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `primary` | #4C662B | #B1D18A | Primary buttons, active states, links |
| `onPrimary` | #FFFFFF | #1F3701 | Text/icons on primary color |
| `primaryContainer` | #CDEDA3 | #354E16 | Containers for primary content |
| `onPrimaryContainer` | #354E16 | #CDEDA3 | Text/icons on primary container |

### Secondary Colors
Used for secondary actions and less prominent UI elements.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `secondary` | #586249 | #BFCBAD | Secondary buttons, less prominent actions |
| `onSecondary` | #FFFFFF | #2A331E | Text/icons on secondary color |
| `secondaryContainer` | #DCE7C8 | #404A33 | Secondary containers |
| `onSecondaryContainer` | #404A33 | #DCE7C8 | Text/icons on secondary container |

### Tertiary Colors
Used for accent colors and tertiary actions.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `tertiary` | #386663 | #A0D0CB | Accent colors, tertiary actions |
| `onTertiary` | #FFFFFF | #003735 | Text/icons on tertiary color |
| `tertiaryContainer` | #BCECE7 | #1F4E4B | Tertiary containers |
| `onTertiaryContainer` | #1F4E4B | #BCECE7 | Text/icons on tertiary container |

### Error Colors
Used for error states, warnings, and destructive actions.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `error` | #BA1A1A | #FFB4AB | Error text, error icons |
| `onError` | #FFFFFF | #690005 | Text/icons on error color |
| `errorContainer` | #FFDAD6 | #93000A | Error message backgrounds |
| `onErrorContainer` | #93000A | #FFDAD6 | Text/icons in error containers |

### Surface Colors
Used for backgrounds and containers at different elevations.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `surface` | #F9FAEF | #12140E | Default background |
| `onSurface` | #1A1C16 | #E2E3D8 | Default text color |
| `surfaceVariant` | #E1E4D5 | #44483D | Alternate surface (subtle contrast) |
| `onSurfaceVariant` | #44483D | #C5C8BA | Text on variant surfaces |

### Surface Container Elevations
M3 uses surface tints instead of shadows for elevation. Higher elevations get lighter in light mode, darker in dark mode.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `surfaceContainerLowest` | #FFFFFF | #0C0F09 | Lowest elevation (0dp) |
| `surfaceContainerLow` | #F3F4E9 | #1A1C16 | Low elevation (1dp) - Cards |
| `surfaceContainer` | #EEEFE3 | #1E201A | Default containers (3dp) |
| `surfaceContainerHigh` | #E8E9DE | #282B24 | High elevation (4dp) - Dialogs |
| `surfaceContainerHighest` | #E2E3D8 | #33362E | Highest elevation (5dp) |

### Outline Colors
Used for borders and dividers.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `outline` | #75796C | #8F9285 | Borders, dividers |
| `outlineVariant` | #C5C8BA | #44483D | Subtle borders |

### Inverse Colors
Used for inverse color schemes (e.g., snackbars).

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `inverseSurface` | #2F312A | #E2E3D8 | Inverse backgrounds |
| `inverseOnSurface` | #F1F2E6 | #2F312A | Text on inverse surfaces |
| `inversePrimary` | #B1D18A | #4C662B | Primary color on inverse |

### Background Colors
Used for page/app backgrounds.

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `background` | #F9FAEF | #12140E | Page background |
| `onBackground` | #1A1C16 | #E2E3D8 | Text on background |

### Special Colors

| Token | Value | Usage |
|-------|-------|-------|
| `scrim` | #000000 | Overlay behind modals/dialogs |
| `shadow` | #000000 | Shadow color (rarely used directly) |

## Usage in Code

### Using Semantic Tokens in Components

```typescript
import { css } from '@discourser/design-system/styled-system/css';

// ✅ Correct - Use semantic tokens
const container = css({
  bg: 'surfaceContainerLow',
  color: 'onSurface',
  borderColor: 'outline'
});

const primaryAction = css({
  bg: 'primary',
  color: 'onPrimary'
});

const errorMessage = css({
  bg: 'errorContainer',
  color: 'onErrorContainer'
});
```

### Common Patterns

```typescript
// Card backgrounds
bg: 'surfaceContainerLow'  // For elevated cards
bg: 'surface'              // For filled/outlined cards

// Text colors
color: 'onSurface'         // Primary text
color: 'onSurfaceVariant'  // Secondary text

// Borders
borderColor: 'outline'     // Standard borders
borderColor: 'outlineVariant' // Subtle borders

// Interactive states
bg: 'primary'              // Default
bg: 'primaryContainer'     // Hover/focus
color: 'onPrimary'         // Text on primary
```

## What NOT to Do

```typescript
// ❌ NEVER use raw hex colors
const wrong = css({ bg: '#4C662B' });

// ❌ NEVER use RGB values
const wrong = css({ bg: 'rgb(76, 102, 43)' });

// ❌ NEVER hardcode light/dark colors
const wrong = css({ bg: mode === 'dark' ? '#000' : '#fff' });

// ✅ ALWAYS use semantic tokens
const correct = css({ bg: 'surface' });
```

## Color Combinations

Always pair colors with their corresponding "on" color for proper contrast:

| Background | Text/Icon Color | Use Case |
|-----------|----------------|----------|
| `primary` | `onPrimary` | Filled buttons |
| `primaryContainer` | `onPrimaryContainer` | Tonal buttons, chips |
| `surface` | `onSurface` | Default backgrounds |
| `surfaceVariant` | `onSurfaceVariant` | Alternate surfaces |
| `error` | `onError` | Error badges |
| `errorContainer` | `onErrorContainer` | Error messages |

## Accessibility

All semantic color combinations meet WCAG 2.1 Level AA contrast requirements (4.5:1 for normal text, 3:1 for large text).

**Never override these combinations** unless you verify contrast ratios yourself.
