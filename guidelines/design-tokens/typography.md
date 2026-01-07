# Typography Tokens

The design system uses Material Design 3 typography scale with semantic naming.

## Font Families

| Token | Font | Usage |
|-------|------|-------|
| `display` | "Fraunces", Georgia, serif | Display text, headings, editorial content |
| `body` | "Poppins", -apple-system, BlinkMacSystemFont, sans-serif | Body text, UI elements, most content |
| `mono` | "JetBrains Mono", "Fira Code", Consolas, monospace | Code snippets, technical text |

## Type Scale

Material Design 3 provides a comprehensive type scale with specific roles. Always use `textStyle` tokens instead of manual font sizing.

### Display (Hero Sections, Large Marketing Text)

Use for hero sections, large marketing content, or prominent display text.

| Token | Size | Line Height | Weight | Letter Spacing | Font Family |
|-------|------|-------------|--------|----------------|-------------|
| `displayLarge` | 57px | 64px | 400 | -0.25px | display |
| `displayMedium` | 45px | 52px | 400 | 0px | display |
| `displaySmall` | 36px | 44px | 400 | 0px | display |

**Use cases**: Landing page heroes, large feature announcements, major section breaks

### Headline (Page and Section Headers)

Use for page titles and major section headings.

| Token | Size | Line Height | Weight | Letter Spacing | Font Family |
|-------|------|-------------|--------|----------------|-------------|
| `headlineLarge` | 32px | 40px | 400 | 0px | display |
| `headlineMedium` | 28px | 36px | 400 | 0px | display |
| `headlineSmall` | 24px | 32px | 400 | 0px | display |

**Use cases**: Page titles (h1), section headings (h2), major card headers

### Title (Card Titles, Dialog Headers, List Items)

Use for card titles, dialog headers, and prominent list items.

| Token | Size | Line Height | Weight | Letter Spacing | Font Family |
|-------|------|-------------|--------|----------------|-------------|
| `titleLarge` | 22px | 28px | 500 | 0px | body |
| `titleMedium` | 16px | 24px | 500 | 0.15px | body |
| `titleSmall` | 14px | 20px | 500 | 0.1px | body |

**Use cases**: Dialog titles, card headers, list item titles, h3-h4 equivalents

### Body (Content Text)

Use for main content, paragraphs, and body copy.

| Token | Size | Line Height | Weight | Letter Spacing | Font Family |
|-------|------|-------------|--------|----------------|-------------|
| `bodyLarge` | 16px | 24px | 400 | 0.5px | body |
| `bodyMedium` | 14px | 20px | 400 | 0.25px | body |
| `bodySmall` | 12px | 16px | 400 | 0.4px | body |

**Use cases**:
- `bodyLarge`: Primary paragraphs, important content
- `bodyMedium`: Default body text (most common)
- `bodySmall`: Secondary text, captions, hints

### Label (Buttons, Form Labels, UI Elements)

Use for buttons, form labels, chips, and other UI elements.

| Token | Size | Line Height | Weight | Letter Spacing | Font Family |
|-------|------|-------------|--------|----------------|-------------|
| `labelLarge` | 14px | 20px | 500 | 0.1px | body |
| `labelMedium` | 12px | 16px | 500 | 0.5px | body |
| `labelSmall` | 11px | 16px | 500 | 0.5px | body |

**Use cases**:
- `labelLarge`: Button text, tab labels
- `labelMedium`: Form field labels, input labels
- `labelSmall`: Small badges, overline text, timestamps

## Usage in Code

### Using Text Styles

```typescript
import { css } from '@discourser/design-system/styled-system/css';

// ✅ Correct - Use textStyle tokens
const heading = css({ textStyle: 'headlineMedium' });
const body = css({ textStyle: 'bodyMedium' });
const label = css({ textStyle: 'labelLarge' });
```

### Common Patterns

```typescript
// Page title
<h1 className={css({ textStyle: 'headlineLarge' })}>
  Welcome to Our App
</h1>

// Section heading
<h2 className={css({ textStyle: 'headlineMedium' })}>
  Features
</h2>

// Card title
<h3 className={css({ textStyle: 'titleLarge' })}>
  Card Title
</h3>

// Body text
<p className={css({ textStyle: 'bodyMedium' })}>
  This is the main content text that users will read.
</p>

// Secondary text
<span className={css({ textStyle: 'bodySmall', color: 'onSurfaceVariant' })}>
  Updated 2 hours ago
</span>

// Form label
<label className={css({ textStyle: 'labelMedium' })}>
  Email Address
</label>
```

### Combining with Color Tokens

Always combine typography with semantic color tokens:

```typescript
// Primary heading
const heading = css({
  textStyle: 'headlineLarge',
  color: 'onSurface'
});

// Secondary text
const secondary = css({
  textStyle: 'bodySmall',
  color: 'onSurfaceVariant'
});

// Error message
const errorText = css({
  textStyle: 'bodySmall',
  color: 'error'
});

// Button text (components handle this automatically)
const buttonText = css({
  textStyle: 'labelLarge',
  color: 'onPrimary'
});
```

## What NOT to Do

```typescript
// ❌ NEVER use manual font sizes
const wrong = css({ fontSize: '16px', lineHeight: '24px' });

// ❌ NEVER hardcode font families
const wrong = css({ fontFamily: 'Arial, sans-serif' });

// ❌ NEVER use arbitrary font weights outside the scale
const wrong = css({ fontWeight: 600 });

// ✅ ALWAYS use textStyle tokens
const correct = css({ textStyle: 'bodyMedium' });
```

## Semantic HTML Mapping

Recommended mapping of textStyle tokens to HTML semantic elements:

| HTML Element | Recommended textStyle | Alternative |
|--------------|----------------------|-------------|
| `<h1>` | `headlineLarge` or `displaySmall` | `headlineMedium` |
| `<h2>` | `headlineMedium` | `headlineSmall` |
| `<h3>` | `headlineSmall` or `titleLarge` | `titleMedium` |
| `<h4>` | `titleLarge` | `titleMedium` |
| `<h5>` | `titleMedium` | `titleSmall` |
| `<h6>` | `titleSmall` | `labelLarge` |
| `<p>` | `bodyMedium` | `bodyLarge` or `bodySmall` |
| `<button>` | `labelLarge` | (handled by Button component) |
| `<label>` | `labelMedium` | (handled by Input component) |
| `<caption>` | `bodySmall` | `labelSmall` |

## Responsive Typography

The type scale is fixed and does not change at different breakpoints. However, you can choose different scales for different screen sizes:

```typescript
// Mobile: Use smaller scales
<h1 className={css({ textStyle: 'headlineMedium' })}>Title</h1>

// Desktop: Use larger scales
<h1 className={css({
  textStyle: { base: 'headlineMedium', lg: 'headlineLarge' }
})}>Title</h1>
```

## Accessibility

- All type scales meet WCAG 2.1 readability guidelines
- Line heights provide adequate spacing for readability
- Letter spacing improves legibility at different sizes
- Font weights ensure sufficient contrast and hierarchy

**Important**: Never reduce line-height below the specified values in the scale, as this can harm readability and accessibility.

## Font Loading

The design system expects these fonts to be loaded in your application:

```html
<!-- In your HTML head or CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500;1,9..144,600;1,9..144,700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
```
