# Discourser Design System

A modern, type-safe design system for Discourser AI built with cutting-edge technologies.

## 🚀 Technologies

- **React 19** - Latest React with improved performance and features
- **TypeScript** - Type-safe component development
- **PandaCSS** - Zero-runtime CSS-in-JS with type safety
- **Ark UI** - Headless component library for accessible components
- **Storybook** - Component documentation and development environment
- **Tsup** - Fast TypeScript bundler
- **Vite** - Lightning-fast build tool
- **pnpm** - Efficient package manager

## 📦 Installation

```bash
pnpm install
```

## 🛠️ Development

### Start Storybook

Run Storybook to develop and test components:

```bash
pnpm dev
```

This will start Storybook on `http://localhost:6006`

### Build the Library

Build the design system for production:

```bash
pnpm build
```

### Generate PandaCSS Types

PandaCSS automatically generates TypeScript types for your design tokens:

```bash
pnpm prepare
```

## 📖 Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@discourser/design-system';

<Button variant="primary" size="md">
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean

### Card

A container component with optional title and shadow effects.

```tsx
import { Card } from '@discourser/design-system';

<Card title="Card Title">
  Your content here
</Card>
```

**Props:**
- `title`: string (optional)
- `children`: ReactNode

### Input

A form input component with label and error support.

```tsx
import { Input } from '@discourser/design-system';

<Input 
  label="Username" 
  placeholder="Enter username"
  error="Username is required"
/>
```

**Props:**
- `label`: string (optional)
- `error`: string (optional)
- All standard HTML input attributes

## 🎨 Theming

The design system uses PandaCSS for styling with a comprehensive token system. Customize theme in `panda.config.ts`:

```typescript
theme: {
  extend: {
    tokens: {
      colors: {
        primary: { /* your colors */ },
        secondary: { /* your colors */ },
      },
    },
  },
}
```

## 📝 Scripts

- `pnpm dev` - Start Storybook development server
- `pnpm build` - Build the library for production
- `pnpm build:storybook` - Build Storybook static site
- `pnpm prepare` - Generate PandaCSS code
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT
