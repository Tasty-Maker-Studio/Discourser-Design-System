# @discourser/design-system

[![CI](https://github.com/tastymakers/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/tastymakers/design-system/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@discourser%2Fdesign-system.svg)](https://www.npmjs.com/package/@discourser/design-system)

An aesthetic-agnostic design system built with Panda CSS and Ark UI. **Swap design languages by changing a single import.**

## ✨ Features

- 🎨 **Swappable Aesthetics** - Material Design 3 by default, but change the entire look with one import
- 🎯 **Zero Runtime CSS** - SSR-safe with Panda CSS
- ♿ **Accessible** - WAI-ARIA compliant via Ark UI
- 📦 **Tree-shakeable** - Only import what you need
- 🌙 **Dark Mode** - Built-in light/dark theme support
- 🔒 **Type-safe** - Full TypeScript support with strict mode
- ⚡ **Fast** - Optimized builds with code splitting

## 🚀 Technologies

- **Panda CSS** - Zero-runtime CSS-in-JS with token-first architecture
- **Ark UI** - Headless, accessible React components
- **React 19** - Latest React with Server Components support
- **TypeScript** - Strict type safety
- **Material Design 3** - Default design language (TastyMakers green #63A002)
- **Storybook 8** - Component documentation
- **Vitest** - Unit testing with 83 passing tests
- **tsup** - Build tool for ESM/CJS output

## 📦 Installation

```bash
npm install @discourser/design-system
# or
pnpm add @discourser/design-system
# or
yarn add @discourser/design-system
```

## 🎯 Quick Start

```tsx
import { Button, Card, IconButton } from '@discourser/design-system';
import '@discourser/design-system/styled-system';

function App() {
  return (
    <Card variant="elevated">
      <h2>Welcome to TastyMakers</h2>
      <p>An aesthetic-agnostic design system</p>
      <Button variant="filled" size="md">
        Get Started
      </Button>
      <IconButton variant="tonal" aria-label="Settings">
        <SettingsIcon />
      </IconButton>
    </Card>
  );
}
```

## 📖 Components

### Button

Material Design 3 button with 5 variants and 3 sizes.

```tsx
import { Button } from '@discourser/design-system';

<Button variant="filled" size="md" leftIcon={<Icon />}>
  Click me
</Button>
```

**Variants:** `filled` | `outlined` | `text` | `elevated` | `tonal`
**Sizes:** `sm` | `md` | `lg`

### Card

Container component with 3 variants and optional interactive state.

```tsx
import { Card } from '@discourser/design-system';

<Card variant="elevated" interactive>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Variants:** `elevated` | `filled` | `outlined`
**Interactive:** `true` | `false` (adds hover/click states)

### IconButton

Icon-only button with 4 variants and 3 sizes. Requires `aria-label` for accessibility.

```tsx
import { IconButton } from '@discourser/design-system';

<IconButton variant="filled" size="md" aria-label="Settings">
  <SettingsIcon />
</IconButton>
```

**Variants:** `standard` | `filled` | `tonal` | `outlined`
**Sizes:** `sm` | `md` | `lg`

## 🎨 Three-Layer Architecture

This design system uses an aesthetic-agnostic architecture:

```
Layer 1: Infrastructure (Unchanging)
├── Token pipeline
├── Build system (tsup, Storybook)
├── Component logic (Ark UI)
└── Type contracts

Layer 2: Design Language (Swappable)
├── Token values (colors, spacing, radii)
├── Semantic mappings
└── Motion patterns

Layer 3: Component Recipes (Derived)
├── Visual styling via Panda recipes
└── Variant definitions
```

### Swapping Design Languages

To change from Material 3 to another design language:

1. Create your language file (e.g., `fluent.language.ts`)
2. Update `src/languages/index.ts`:

```typescript
// Change this import to swap the entire aesthetic
export { fluentLanguage as activeLanguage } from './fluent.language';
```

3. Rebuild: `pnpm build:panda`

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm dev

# Run tests
pnpm test

# Type check
pnpm typecheck

# Build
pnpm build
```

## 🧪 Testing

The design system has comprehensive test coverage:

```bash
pnpm test          # Run tests in watch mode
pnpm test --run    # Run tests once
pnpm test --ui     # Open Vitest UI
```

**Test Stats:**
- 83 tests passing
- Components: Button (30), Card (24), IconButton (29)
- 100% of components have tests

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Storybook on port 6006 |
| `pnpm build` | Build library (Panda + tsup) |
| `pnpm build:panda` | Generate styled-system |
| `pnpm build:lib` | Build library only |
| `pnpm build:storybook` | Build static Storybook |
| `pnpm test` | Run tests |
| `pnpm test:ui` | Open Vitest UI |
| `pnpm typecheck` | TypeScript validation |
| `pnpm lint` | ESLint |

## 🤝 Contributing

See [.github/README.md](.github/README.md) for CI/CD workflow documentation.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test --run`
5. Run type check: `pnpm typecheck`
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

MIT © TastyMakers

## 🔗 Links

- [Storybook Documentation](https://tastymakers.github.io/design-system/)
- [npm Package](https://www.npmjs.com/package/@discourser/design-system)
- [GitHub Repository](https://github.com/tastymakers/design-system)
