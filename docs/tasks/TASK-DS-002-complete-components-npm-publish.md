# TASK-DS-002: Complete Component Set & npm Publish

**Status:** ✅ COMPLETED
**Completed:** January 7, 2026
**Date:** January 7, 2026
**Estimated Time:** 3-4 hours
**Actual Time:** ~3 hours
**Priority:** P0 - Required for Discourser.AI MVP
**Depends On:** TASK-DS-001 (Park UI Integration) ✅ COMPLETED

---

## Objective

Complete the Discourser Design System component library by:
1. Adding remaining essential Park UI components needed for Discourser.AI
2. Creating Storybook stories for all components
3. Setting up proper package exports
4. Publishing `@discourser/design-system@0.2.0` to npm

---

## Context

### Current State (After TASK-DS-001)
✅ Park UI infrastructure integrated with M3 colors
✅ Core components working: Button, Input, Field, Card, Switch, Dialog
✅ Storybook running with stories
✅ Build passing

### Target State
- Full component set for MVP (15+ components)
- All components have Storybook stories
- Package properly exported for consumption
- Published to npm registry

---

## Pre-Implementation Checklist

- [ ] Verify TASK-DS-001 is complete (all tests passing)
- [ ] Ensure you're on a clean git state
- [ ] Review Discourser.AI Figma designs to confirm component needs

---

## Phase 1: Add Remaining Essential Components (1.5 hours)

### 1.1 Components to Add from Park UI

Copy these components from `/park-ui/components/react/src/components/ui/` to `src/components/`:

**Layout & Container:**
- `accordion.tsx` - For collapsible sections (settings panels)
- `drawer.tsx` - Side panel (mobile navigation)
- `tabs.tsx` - Tab navigation

**Feedback & Status:**
- `avatar.tsx` - User images
- `badge.tsx` - Status indicators
- `progress.tsx` - Loading/progress bars
- `skeleton.tsx` - Loading placeholders
- `spinner.tsx` - Loading spinner (may already exist)
- `toast.tsx` - Notifications

**Form Elements:**
- `checkbox.tsx` - Boolean inputs
- `radio-group.tsx` - Single selection
- `select.tsx` - Dropdown selection
- `textarea.tsx` - Multi-line input
- `slider.tsx` - Range input (for audio controls)

**Overlay:**
- `popover.tsx` - Floating content
- `tooltip.tsx` - Hover hints

### 1.2 Copy Corresponding Recipes

From `/park-ui/packages/preset/src/recipes/` to `src/preset/recipes/`:

```
accordion.ts
avatar.ts
badge.ts
checkbox.ts
drawer.ts
popover.ts
progress.ts
radio-group.ts
select.ts
skeleton.ts
slider.ts
tabs.ts
textarea.ts
toast.ts
tooltip.ts
```

### 1.3 Update Recipe Index

**File:** `src/preset/recipes/index.ts`

```typescript
// Existing
export * from './button';
export * from './input';
export * from './field';
export * from './card';
export * from './switch';
export * from './dialog';

// New additions
export * from './accordion';
export * from './avatar';
export * from './badge';
export * from './checkbox';
export * from './drawer';
export * from './popover';
export * from './progress';
export * from './radio-group';
export * from './select';
export * from './skeleton';
export * from './slider';
export * from './tabs';
export * from './textarea';
export * from './toast';
export * from './tooltip';
```

### 1.4 Update panda.config.ts

Add all new recipes to the config:

```typescript
import {
  accordion,
  avatar,
  badge,
  checkbox,
  drawer,
  popover,
  progress,
  radioGroup,
  select,
  skeleton,
  slider,
  tabs,
  textarea,
  toast,
  tooltip,
  // ... existing imports
} from './src/preset/recipes';
```

---

## Phase 2: Update Component Imports (30 min)

### 2.1 Fix Import Paths in Copied Components

Each copied component will have imports like:
```typescript
import { ark } from '@ark-ui/react/...'
import { styled } from 'styled-system/jsx'
import { type ComponentProps } from 'styled-system/types'
```


Update to use local paths:
```typescript
import { ark } from '@ark-ui/react/...'  // Keep as-is
import { styled } from '../styled-system/jsx'
import { type ComponentProps } from '../styled-system/types'
```

### 2.2 Update Main Export

**File:** `src/index.ts`

```typescript
// Components
export * from './components/button';
export * from './components/input';
export * from './components/field';
export * from './components/card';
export * from './components/switch';
export * from './components/dialog';

// New components
export * from './components/accordion';
export * from './components/avatar';
export * from './components/badge';
export * from './components/checkbox';
export * from './components/drawer';
export * from './components/popover';
export * from './components/progress';
export * from './components/radio-group';
export * from './components/select';
export * from './components/skeleton';
export * from './components/slider';
export * from './components/tabs';
export * from './components/textarea';
export * from './components/toast';
export * from './components/tooltip';

// Styled system exports
export { css, cx } from './styled-system/css';
export { styled } from './styled-system/jsx';
export { token } from './styled-system/tokens';
```

---

## Phase 3: Create Storybook Stories (1 hour)

### 3.1 Story Structure

Create stories for each component group in `stories/`:

```
stories/
├── Button.stories.tsx     (existing)
├── Input.stories.tsx      (existing)
├── Switch.stories.tsx     (existing)
├── Card.stories.tsx       (existing)
├── Dialog.stories.tsx     (existing)
├── Accordion.stories.tsx  (new)
├── Avatar.stories.tsx     (new)
├── Badge.stories.tsx      (new)
├── Checkbox.stories.tsx   (new)
├── Drawer.stories.tsx     (new)
├── Progress.stories.tsx   (new)
├── RadioGroup.stories.tsx (new)
├── Select.stories.tsx     (new)
├── Slider.stories.tsx     (new)
├── Tabs.stories.tsx       (new)
├── Textarea.stories.tsx   (new)
├── Toast.stories.tsx      (new)
└── Tooltip.stories.tsx    (new)
```

### 3.2 Story Template

Use this template for each component:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    colorPalette: {
      control: 'select',
      options: ['primary', 'neutral', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // default props
  },
};

export const WithColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ComponentName colorPalette="primary">Primary</ComponentName>
      <ComponentName colorPalette="neutral">Neutral</ComponentName>
      <ComponentName colorPalette="error">Error</ComponentName>
    </div>
  ),
};
```

### 3.3 Priority Stories

Focus on these first (most used in Discourser.AI):
1. **Select** - Scenario selection dropdowns
2. **Tabs** - Settings panel navigation
3. **Slider** - Audio volume/speed controls
4. **Progress** - Interview progress indicator
5. **Toast** - Feedback notifications
6. **Avatar** - User profile display

---

## Phase 4: Package Configuration (30 min)

### 4.1 Update package.json

**File:** `package.json`

```json
{
  "name": "@discourser/design-system",
  "version": "0.2.0",
  "description": "Design system for Discourser.AI - Park UI + Material 3",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styled-system/css": {
      "import": "./dist/styled-system/css.mjs",
      "require": "./dist/styled-system/css.js",
      "types": "./dist/styled-system/css.d.ts"
    },
    "./styled-system/jsx": {
      "import": "./dist/styled-system/jsx.mjs",
      "require": "./dist/styled-system/jsx.js",
      "types": "./dist/styled-system/jsx.d.ts"
    },
    "./styled-system/tokens": {
      "import": "./dist/styled-system/tokens.mjs",
      "require": "./dist/styled-system/tokens.js",
      "types": "./dist/styled-system/tokens.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "sideEffects": [
    "*.css"
  ],
  "scripts": {
    "build": "pnpm build:panda && pnpm build:lib",
    "build:panda": "panda codegen",
    "build:lib": "tsup",
    "dev": "storybook dev -p 6006",
    "prepublishOnly": "pnpm build"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "keywords": [
    "design-system",
    "react",
    "components",
    "material-design-3",
    "park-ui",
    "panda-css"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/Tasty-Maker-Studio/Discourser-Design-System"
  },
  "license": "MIT",
  "author": "Will Streeter"
}
```

### 4.2 Update tsup.config.ts

Ensure proper bundling:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/styled-system/css.ts',
    'src/styled-system/jsx.ts',
    'src/styled-system/tokens.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@ark-ui/react'],
  treeshake: true,
});
```

### 4.3 Create/Update README.md

```markdown
# @discourser/design-system

Design system for Discourser.AI built on Park UI + Material Design 3.

## Installation

\`\`\`bash
pnpm add @discourser/design-system
\`\`\`

## Setup

Import the CSS in your app entry:

\`\`\`tsx
import '@discourser/design-system/styles.css';
\`\`\`

## Usage

\`\`\`tsx
import { Button, Input, Select } from '@discourser/design-system';

export function MyComponent() {
  return (
    <div>
      <Button colorPalette="primary">Click Me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
\`\`\`

## Components

- Button, IconButton
- Input, Textarea, Field
- Select, Checkbox, RadioGroup, Switch, Slider
- Card, Accordion, Tabs
- Dialog, Drawer, Popover, Tooltip
- Avatar, Badge, Progress, Skeleton, Spinner, Toast

## Styling Utilities

\`\`\`tsx
import { css, cx } from '@discourser/design-system/styled-system/css';
import { styled } from '@discourser/design-system/styled-system/jsx';

const customClass = css({ color: 'primary.9', padding: 'md' });
\`\`\`

## License

MIT
\`\`\`

---

## Phase 5: Build & Test (30 min)

### 5.1 Full Build

```bash
# Clean previous builds
rm -rf dist styled-system

# Regenerate PandaCSS
pnpm build:panda

# Build library
pnpm build:lib

# Or combined:
pnpm build
```

### 5.2 Verify Storybook

```bash
pnpm dev
```

Check that:
- [ ] All component stories load
- [ ] No console errors
- [ ] Dark mode works for all components
- [ ] colorPalette switching works

### 5.3 Test Package Locally

```bash
# Create tarball
pnpm pack

# In a test project:
pnpm add ../path/to/discourser-design-system-0.2.0.tgz
```

---

## Phase 6: Publish to npm (15 min)

### 6.1 Pre-publish Checklist

- [ ] All tests passing
- [ ] Version bumped to 0.2.0
- [ ] CHANGELOG updated
- [ ] README accurate
- [ ] `pnpm build` succeeds

### 6.2 Publish

```bash
# Login if needed
npm login

# Publish with public access (for scoped package)
npm publish --access public
```

### 6.3 Verify Publication

```bash
# Check npm registry
npm view @discourser/design-system

# Test installation in fresh project
pnpm create vite test-app --template react-ts
cd test-app
pnpm add @discourser/design-system
```

---

## Success Criteria

| Criterion | Target |
|-----------|--------|
| Components added | ✅ 15+ total components |
| Stories created | ✅ Story for each component |
| Build passes | ✅ Zero errors |
| Package exports work | ✅ All entry points resolve |
| Published to npm | ✅ @discourser/design-system@0.2.0 |
| Consumable in Discourser.AI | ✅ Verified import works |

---

## Component Inventory (Target)

### ✅ Complete (from TASK-DS-001)
- Button
- IconButton (if separate)
- Input
- Field
- Card
- Switch
- Dialog

### 🎯 To Add (this task)
- Accordion
- Avatar
- Badge
- Checkbox
- Drawer
- Popover
- Progress
- RadioGroup
- Select
- Skeleton
- Slider
- Tabs
- Textarea
- Toast
- Tooltip

---

## Reference Files

- Park UI components: `/park-ui/components/react/src/components/ui/`
- Park UI recipes: `/park-ui/packages/preset/src/recipes/`
- Discourser.AI Figma: Review for component requirements
- Current panda.config.ts: Reference for recipe integration pattern

---

## Notes

1. **Prioritize by Discourser.AI needs** - Select, Tabs, Slider, Progress are high priority
2. **Don't copy everything** - Only components actually needed for MVP
3. **Test dark mode** - Ensure colorPalette works in both modes
4. **Keep stories simple** - Basic variants, colorPalette demo, sizes
5. **Version as 0.2.0** - Indicates Park UI integration milestone

---

*End of Task Document*
