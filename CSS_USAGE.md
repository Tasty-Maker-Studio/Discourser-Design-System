# Using Pre-compiled CSS

As of version 0.4.1, `@discourser/design-system` ships with pre-compiled CSS for easy integration with any project.

## Quick Start

### Installation

```bash
npm install @discourser/design-system react react-dom
```

### Basic Usage

Simply import the pre-compiled CSS and start using components:

```tsx
// Import the pre-compiled CSS (do this once in your app entry point)
import '@discourser/design-system/styles.css';

// Import components
import { Button, Card, Input } from '@discourser/design-system';

function App() {
  return (
    <div>
      <Card variant="elevated">
        <h1>Welcome</h1>
        <Input label="Email" type="email" />
        <Button variant="filled">Submit</Button>
      </Card>
    </div>
  );
}
```

### Theme Support

The pre-compiled CSS includes both light and dark theme support. Set the `data-theme` attribute on your HTML element:

```tsx
// Light theme (default)
<html data-theme="light">
  <body>
    <App />
  </body>
</html>

// Dark theme
<html data-theme="dark">
  <body>
    <App />
  </body>
</html>
```

You can toggle themes dynamically:

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </Button>
  );
}
```

## What's Included

The pre-compiled `styles.css` file (144KB) includes:

- ✅ All semantic color tokens (primary, surface, onPrimary, etc.)
- ✅ All typography tokens (displayLarge through labelSmall)
- ✅ All spacing tokens (none through xxxl)
- ✅ All component recipes (button, card, dialog, input, etc.)
- ✅ Light and dark theme support via `[data-theme="light"]` and `[data-theme="dark"]`
- ✅ CSS reset and base styles
- ✅ Material Design 3 design tokens

## Advanced Usage

### Using Styled System (Advanced)

For advanced styling needs, you can still import the Panda CSS styled system:

```tsx
import { css } from '@discourser/design-system/styled-system/css';
import { Button } from '@discourser/design-system';

const customStyle = css({
  bg: 'primary',
  color: 'onPrimary',
  padding: 'lg',
  borderRadius: 'md'
});

function CustomButton() {
  return <Button className={customStyle}>Custom Styled Button</Button>;
}
```

### Without Pre-compiled CSS

If you prefer to use Panda CSS's runtime styles (for dynamic styling), you can skip importing `styles.css` and use the styled system directly. However, you'll need to set up Panda CSS in your project with `panda codegen`.

## Integration Examples

### Vite

```tsx
// main.tsx
import '@discourser/design-system/styles.css';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@discourser/design-system/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import '@discourser/design-system/styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

## Figma Make Integration

The pre-compiled CSS enables seamless integration with Figma Make. Simply install the package and it will automatically use the pre-compiled styles for AI-generated designs.

## File Size

The pre-compiled CSS file is optimized and includes only the styles you need:

- **Size**: 144KB (uncompressed)
- **Gzipped**: ~20-25KB (estimated)
- **Includes**: All tokens, recipes, and theme styles

## Migration from Runtime CSS

If you were previously using runtime Panda CSS:

**Before:**
```tsx
// Had to run panda codegen
import { css } from '../styled-system/css';
```

**After:**
```tsx
// Just import the pre-compiled CSS
import '@discourser/design-system/styles.css';
import { Button } from '@discourser/design-system';
```

No more build step required!

## Troubleshooting

### Components don't have styles

Make sure you've imported the CSS at the top of your application:

```tsx
import '@discourser/design-system/styles.css'; // Add this!
```

### Theme not working

Ensure the `data-theme` attribute is set on your HTML element:

```html
<html data-theme="light"> <!-- or "dark" -->
```

### CSS conflicts with other libraries

The design system uses CSS layers to prevent conflicts:

```css
@layer reset, base, tokens, recipes, utilities;
```

If you still have conflicts, you may need to adjust your CSS loading order.

## Package Exports

The package exports the following:

```json
{
  ".": "./dist/index.js",
  "./styles.css": "./dist/styles.css",
  "./styled-system": "./styled-system/index.mjs",
  "./styled-system/css": "./styled-system/css/index.mjs",
  "./styled-system/tokens": "./styled-system/tokens/index.mjs",
  "./styled-system/recipes": "./styled-system/recipes/index.mjs"
}
```

## Questions?

- **Documentation**: See the [guidelines folder](./guidelines/) for complete component documentation
- **GitHub**: https://github.com/Tasty-Maker-Studio/Discourser-Design-System
- **Issues**: https://github.com/Tasty-Maker-Studio/Discourser-Design-System/issues