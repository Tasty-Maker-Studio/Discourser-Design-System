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

**New in v0.4.1:** Pre-compiled CSS is now included! No build step required.

```tsx
// Import the pre-compiled CSS (do this once in your app entry point)
import '@discourser/design-system/styles.css';

// Import and use components
import { Button, Card } from '@discourser/design-system';
import * as IconButton from '@discourser/design-system';

function App() {
  return (
    <Card variant="elevated">
      <h2>Welcome to TastyMakers</h2>
      <p>An aesthetic-agnostic design system</p>
      <Button variant="filled" size="md">
        Get Started
      </Button>
      <IconButton.Root variant="tonal" aria-label="Settings">
        <SettingsIcon />
      </IconButton.Root>
    </Card>
  );
}
```

**📘 See [CSS_USAGE.md](./CSS_USAGE.md) for complete usage guide including theme support, Figma Make integration, and framework-specific examples.**

## 📖 Components

We offer 21 fully-typed, accessible React components built with Ark UI and styled with Panda CSS.

### Core Components

#### Button

Material Design 3 button with 5 variants and 3 sizes.

```tsx
import * as Button from '@discourser/design-system';

<Button.Root variant="filled" size="md">
  Click me
</Button.Root>
```

**Variants:** `filled` | `outlined` | `text` | `elevated` | `tonal`
**Sizes:** `sm` | `md` | `lg`

#### Card

Container component with 3 variants and optional interactive state.

```tsx
import * as Card from '@discourser/design-system';

<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button.Root>Action</Button.Root>
  </Card.Footer>
</Card.Root>
```

**Variants:** `elevated` | `filled` | `outlined`

#### IconButton

Icon-only button with 4 variants and 3 sizes. Requires `aria-label` for accessibility.

```tsx
import * as IconButton from '@discourser/design-system';

<IconButton.Root variant="filled" size="md" aria-label="Settings">
  <SettingsIcon />
</IconButton.Root>
```

**Variants:** `standard` | `filled` | `tonal` | `outlined`
**Sizes:** `sm` | `md` | `lg`

#### Input

Text input field with multiple variants and sizes.

```tsx
import * as Input from '@discourser/design-system';
import * as Field from '@discourser/design-system';

<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input.Root variant="outline" size="md" placeholder="you@example.com" />
  <Field.HelperText>We'll never share your email</Field.HelperText>
</Field.Root>
```

**Variants:** `outline` | `filled` | `flushed`
**Sizes:** `xs` | `sm` | `md` | `lg` | `xl`

### Form Components

#### Select

Dropdown select component for choosing from a list of options.

```tsx
import * as Select from '@discourser/design-system';

const items = [
  { label: 'Chat', value: 'chat' },
  { label: 'Analysis', value: 'analysis' },
];

<Select.Root items={items} positioning={{ sameWidth: true }}>
  <Select.Label>Select Scenario</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select..." />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

**Sizes:** `sm` | `md` | `lg`

#### Checkbox

Checkbox input with custom styling and checked indicator.

```tsx
import * as Checkbox from '@discourser/design-system';

<Checkbox.Root>
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>
```

**Sizes:** `sm` | `md` | `lg`

#### RadioGroup

Radio button group for mutually exclusive selections.

```tsx
import * as RadioGroup from '@discourser/design-system';

<RadioGroup.Root defaultValue="option1">
  <RadioGroup.Item value="option1">
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
    <RadioGroup.HiddenInput />
  </RadioGroup.Item>
  <RadioGroup.Item value="option2">
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
    <RadioGroup.HiddenInput />
  </RadioGroup.Item>
</RadioGroup.Root>
```

**Sizes:** `sm` | `md` | `lg`

#### Slider

Range slider component for numeric input.

```tsx
import * as Slider from '@discourser/design-system';

<Slider.Root defaultValue={[50]} min={0} max={100}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.ValueText />
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0} />
  </Slider.Control>
  <Slider.HiddenInput />
</Slider.Root>
```

**Sizes:** `sm` | `md` | `lg`
**Orientation:** `horizontal` | `vertical`

#### Switch

Toggle switch for on/off states.

```tsx
import * as Switch from '@discourser/design-system';

<Switch.Root>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label>Enable notifications</Switch.Label>
  <Switch.HiddenInput />
</Switch.Root>
```

**Sizes:** `sm` | `md` | `lg`

#### Textarea

Multi-line text input field.

```tsx
import * as Textarea from '@discourser/design-system';

<Textarea.Root variant="outline" placeholder="Enter your message..." />
```

**Variants:** `outline` | `filled` | `subtle` | `flushed`
**Sizes:** `xs` | `sm` | `md` | `lg` | `xl`

### Layout & Navigation

#### Tabs

Tab navigation for organizing content into separate views.

```tsx
import * as Tabs from '@discourser/design-system';

<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="details">Details</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="details">Details content</Tabs.Content>
</Tabs.Root>
```

**Variants:** `line` | `enclosed` | `outline`
**Sizes:** `sm` | `md` | `lg`

#### Accordion

Collapsible content panels for FAQs and expandable sections.

```tsx
import * as Accordion from '@discourser/design-system';

<Accordion.Root collapsible>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Section 1
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      Content for section 1
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

**Sizes:** `sm` | `md` | `lg`

### Overlays & Dialogs

#### Dialog

Modal dialog for focused user interactions.

```tsx
import * as Dialog from '@discourser/design-system';

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Dialog description</Dialog.Description>
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

**Sizes:** `sm` | `md` | `lg` | `xl` | `full`

#### Drawer

Side panel for navigation or additional content.

```tsx
import * as Drawer from '@discourser/design-system';

<Drawer.Root>
  <Drawer.Trigger>Open Drawer</Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Drawer Title</Drawer.Title>
        <Drawer.CloseTrigger />
      </Drawer.Header>
      <Drawer.Body>Drawer content</Drawer.Body>
      <Drawer.Footer>Footer content</Drawer.Footer>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

**Placement:** `left` | `right` | `top` | `bottom`

#### Popover

Floating content overlay anchored to a trigger element.

```tsx
import * as Popover from '@discourser/design-system';

<Popover.Root>
  <Popover.Trigger>Open Popover</Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Arrow>
        <Popover.ArrowTip />
      </Popover.Arrow>
      <Popover.Title>Popover Title</Popover.Title>
      <Popover.Description>Popover content</Popover.Description>
      <Popover.CloseTrigger />
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
```

#### Tooltip

Brief informative text shown on hover.

```tsx
import * as Tooltip from '@discourser/design-system';

<Tooltip.Root>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>
      Helpful tooltip text
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
```

### Feedback & Status

#### Toast

Temporary notification messages.

```tsx
import { Toaster, toaster } from '@discourser/design-system';

// Add <Toaster /> to your app root
<Toaster />

// Trigger toasts from anywhere
toaster.success({
  title: 'Success!',
  description: 'Your changes have been saved.',
});

toaster.error({
  title: 'Error',
  description: 'Something went wrong.',
});
```

**Types:** `success` | `error` | `warning` | `info` | `loading`

#### Progress

Linear or circular progress indicator.

```tsx
import * as Progress from '@discourser/design-system';

// Linear progress
<Progress.Root value={60}>
  <Progress.Label>Upload Progress</Progress.Label>
  <Progress.ValueText />
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.Root>

// Circular progress
<Progress.Root value={75} type="circular">
  <Progress.Circle>
    <Progress.CircleTrack />
    <Progress.CircleRange />
  </Progress.Circle>
  <Progress.ValueText />
</Progress.Root>
```

**Sizes:** `sm` | `md` | `lg`
**Type:** `linear` | `circular`

#### Avatar

User avatar with image and fallback to initials.

```tsx
import * as Avatar from '@discourser/design-system';

<Avatar.Root>
  <Avatar.Fallback name="John Doe" />
  <Avatar.Image src="https://i.pravatar.cc/150?img=3" alt="John Doe" />
</Avatar.Root>
```

**Sizes:** `xs` | `sm` | `md` | `lg` | `xl` | `2xl`

#### Badge

Small status or label indicator.

```tsx
import * as Badge from '@discourser/design-system';

<Badge.Root>New</Badge.Root>
```

**Sizes:** `sm` | `md` | `lg`

#### Skeleton

Loading placeholder for content.

```tsx
import * as Skeleton from '@discourser/design-system';

<Skeleton.Root>
  <Skeleton.Circle />
  <Skeleton.Text noOfLines={3} />
</Skeleton.Root>
```

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

## 🔄 Token Workflow

This design system uses [figma-token-sync](https://github.com/yourusername/figma-token-sync) for bidirectional token synchronization with Figma.

### After Exporting from Figma

1. **Export from Figma**
   - Run figma-token-sync plugin → Export
   - Save files to Downloads (or remember location)

2. **Organize tokens**
   ```bash
   pnpm organize-tokens
   ```
   - Provide paths when prompted
   - Review summary

3. **Rebuild design system**
   ```bash
   pnpm build:panda
   ```

4. **Test in Storybook**
   ```bash
   pnpm dev
   ```

5. **Commit changes**
   ```bash
   git add tokens/
   git commit -m "chore: update tokens from Figma"
   ```

### Importing to Figma

1. **Generate DTCG tokens**
   ```bash
   pnpm transform:contract-to-dtcg
   ```

2. **Open figma-token-sync plugin**
   - Click "Import"
   - Browse to `tokens/tokens.json`
   - Plugin creates/updates Figma variables

### Token Files

- `tokens/primitives-generated.json` - Primitive color tokens from Figma (not in git)
- `tokens/semantic-light-generated.json` - Light mode semantic tokens (not in git)
- `tokens/semantic-dark-generated.json` - Dark mode semantic tokens (not in git)
- `tokens/tokens.json` - Combined token file for import to Figma (not in git)
- `src/languages/material3.language.ts` - Source of truth (in git)

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
