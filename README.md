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
| `pnpm dev` | Start Storybook on port 6006 
| `pnpm build` | Build library (Panda + tsup) |
| `pnpm build:panda` | Generate styled-system |
| `pnpm build:lib` | Build library only |
| `pnpm build:storybook` | Build static Storybook |
| `pnpm test` | Run tests |
| `pnpm test:ui` | Open Vitest UI |
| `pnpm typecheck` | TypeScript validation |
| `pnpm lint` | ESLint |

## 🤝 Contributing

### Development Workflow

**⚠️ IMPORTANT: We use Changesets for version management. Never manually edit the version in `package.json`.**

#### For Team Members (Write Access)

1. **Create a feature branch from `main`:**
   ```bash
   git checkout main
   git pull
   git checkout -b feature/my-feature  # or fix/bug-name, docs/readme-update
   ```

2. **Make your changes and test:**
   ```bash
   pnpm test --run      # Run tests
   pnpm typecheck       # Type check
   pnpm lint            # Lint code
   pnpm build           # Build package
   ```

3. **Create a changeset** (required for any code changes):
   ```bash
   pnpm changeset
   # Select change type:
   # - patch: Bug fixes (0.1.2 → 0.1.3)
   # - minor: New features (0.1.2 → 0.2.0)
   # - major: Breaking changes (0.1.2 → 1.0.0)
   # Write a brief summary of your changes
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push -u origin feature/my-feature
   ```

5. **Open a Pull Request to `main`:**
   - CI will run automatically (lint, test, typecheck, build)
   - Address any CI failures
   - Wait for review (if required)

6. **After your PR is merged:**
   - Changesets bot creates/updates a "Version Packages" PR automatically
   - When "Version Packages" PR is merged → package publishes to npm automatically via OIDC

#### For External Contributors (No Write Access)

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Discourser-Design-System.git
   ```

3. **Follow steps 1-5 above** (feature branch, changeset, commit)
4. **Open a Pull Request** from your fork to our `main` branch
5. **Wait for maintainer review** - we'll review and merge if approved

### Branch Protection

- ✅ `main` is protected - all changes require Pull Requests
- ✅ CI must pass before merging (lint, test, typecheck, build)
- ✅ Only maintainers can merge to `main`
- ✅ Releases only happen from `main` via automated workflow

### Release Process (Automated)

**You don't manually publish!** Our CI/CD handles it:

1. **Changesets accumulate** - Multiple PRs can add changesets
2. **"Version Packages" PR** - Created automatically when changesets exist
3. **Review changelog** - Check the auto-generated CHANGELOG.md
4. **Merge "Version Packages" PR** - Triggers automatic npm publish via OIDC
5. **Published!** - Package is live on npm with provenance

### What NOT to Do

❌ Don't manually edit version in `package.json` - use `pnpm changeset`
❌ Don't push directly to `main` - use Pull Requests
❌ Don't merge without CI passing - wait for checks
❌ Don't skip changesets - required for tracking changes
❌ Don't manually run `npm publish` - CI handles it

### Questions?

- See [`.claude/skills/npm-oidc-publishing/SKILL.md`](.claude/skills/npm-oidc-publishing/SKILL.md) for OIDC setup details
- See [.github/README.md](.github/README.md) for CI/CD workflow documentation
- Ask in Discussions or open an Issue

## 📄 License

MIT © TastyMakers

## 🔗 Links

- [Storybook Documentation](https://tastymakers.github.io/design-system/)
- [npm Package](https://www.npmjs.com/package/@discourser/design-system)
- [GitHub Repository](https://github.com/tastymakers/design-system)
