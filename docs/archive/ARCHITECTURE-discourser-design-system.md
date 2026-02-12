# Discourser Design System — Architecture

> **Version:** 0.2.0  
> **Last Updated:** January 6, 2026  
> **Status:** Active Development

---

## Overview

The Discourser Design System is a React component library built on **Park UI infrastructure** with **Material Design 3 aesthetic**. It provides the visual foundation for Discourser.AI and demonstrates a bidirectional Figma ↔ Code workflow.

### Design Philosophy

```
Park UI (Infrastructure) + Material 3 (Aesthetic) = Discourser Design System
```

- **Park UI** provides: Component architecture, Ark UI primitives, PandaCSS recipes, accessibility
- **Material 3** provides: Color system, typography scale, elevation, motion, shape language
- **Discourser** adds: Voice-first UX patterns, custom interview-specific components

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FIGMA DESIGN                                    │
│  ┌──────────────────────┐    ┌────────────────────────────────────────────┐ │
│  │ Park UI Foundations  │───▶│ Discourser.AI Components                   │ │
│  │ Kit (Variables)      │    │ (Custom components using Park UI Variables)│ │
│  └──────────────────────┘    └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼ figma-token-sync Plugin
                                 ┌───────────┐
                                 │tokens.json│ ← DTCG W3C Format
                                 └───────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                              ▼
┌─────────────────────┐    ┌─────────────────────────┐    ┌─────────────────┐
│ figma-token-sync    │    │ @discourser/design-     │    │ Discourser.AI   │
│ CLI                 │    │ system                  │    │ (MVP App)       │
│                     │    │                         │    │                 │
│ • validate          │    │ ┌─────────────────────┐ │    │ Consumes via    │
│ • diff              │    │ │ Park UI Preset      │ │───▶│ npm package     │
│ • convert           │    │ │ (Ark UI + Recipes)  │ │    │                 │
└─────────────────────┘    │ └─────────────────────┘ │    └─────────────────┘
                           │ ┌─────────────────────┐ │
                           │ │ M3 Theme Bridge     │ │
                           │ │ (Color mapping)     │ │
                           │ └─────────────────────┘ │
                           │ ┌─────────────────────┐ │
                           │ │ Components (React)  │ │
                           │ └─────────────────────┘ │
                           │ ┌─────────────────────┐ │
                           │ │ Storybook           │ │
                           │ │ + Token Addon       │ │
                           │ └─────────────────────┘ │
                           └─────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| CSS Framework | PandaCSS 1.7+ | Zero-runtime CSS-in-JS |
| Component Primitives | Ark UI 5.30+ | Headless accessible components |
| Component Library | Park UI | Pre-built recipes and patterns |
| Design Language | Material 3 | Color, typography, motion, elevation |
| Token Format | DTCG/W3C | Industry-standard design tokens |
| Documentation | Storybook 8.x | Component playground |
| Package Manager | pnpm | Workspace management |
| Build | tsup | Library bundling |

---

## Color Architecture

### The Bridge Pattern

Material 3 uses **tonal palettes** (0-100 scale), while Park UI uses **Radix-style** (1-12 scale). We bridge these:

```
M3 Tonal Palette (0-100)         Radix Scale (1-12)
─────────────────────────        ──────────────────
100 (white) ─────────────────▶   1 (lightest bg)
 99 ─────────────────────────▶   1
 95 ─────────────────────────▶   2 (subtle bg)
 90 ─────────────────────────▶   3 (UI element bg)
 80 ─────────────────────────▶   4
 70 ─────────────────────────▶   5
 60 ─────────────────────────▶   6
 50 ─────────────────────────▶   7 (borders)
 40 ─────────────────────────▶   8, 9 (primary action)
 30 ─────────────────────────▶   10 (hover state)
 20 ─────────────────────────▶   11 (text)
 10 ─────────────────────────▶   12 (high contrast)
  0 (black) ─────────────────▶   12
```

### Color Palettes

| Palette | M3 Source | Usage |
|---------|-----------|-------|
| `primary` | TastyMakers green (#63A002) | Primary actions, brand |
| `neutral` | M3 neutral tones | Text, backgrounds, borders |
| `error` | M3 error red | Destructive actions, errors |
| `secondary` | M3 secondary | Secondary actions (future) |
| `tertiary` | M3 tertiary | Accents (future) |

### Semantic Token Layers

**Layer 1: Park UI Base** (required for components)
```typescript
colorPalette: {
  solid: { bg, fg },
  subtle: { bg, fg },
  surface: { bg, border, fg },
  outline: { bg, border, fg },
  plain: { bg, fg }
}
```

**Layer 2: M3 Semantic** (optional, for M3-style usage)
```typescript
surface, onSurface
surfaceContainer, surfaceContainerLow, etc.
m3Primary, onM3Primary
outline, outlineVariant
```

---

## Typography System

Based on Material 3 type scale with M3 fonts:

| Role | Font | Size | Weight | Use Case |
|------|------|------|--------|----------|
| Display Large | Fraunces | 57px | 400 | Hero headlines |
| Display Medium | Fraunces | 45px | 400 | Section headers |
| Display Small | Fraunces | 36px | 400 | Card titles |
| Headline Large | Fraunces | 32px | 400 | Page titles |
| Headline Medium | Fraunces | 28px | 400 | Section titles |
| Headline Small | Fraunces | 24px | 400 | Subsections |
| Title Large | Poppins | 22px | 500 | Card headers |
| Title Medium | Poppins | 16px | 500 | List items |
| Title Small | Poppins | 14px | 500 | Captions |
| Body Large | Poppins | 16px | 400 | Primary text |
| Body Medium | Poppins | 14px | 400 | Secondary text |
| Body Small | Poppins | 12px | 400 | Helper text |
| Label Large | Poppins | 14px | 500 | Buttons |
| Label Medium | Poppins | 12px | 500 | Chips |
| Label Small | Poppins | 11px | 500 | Overlines |

### Park UI Aliases

For compatibility with Park UI recipes:
- `xs` → Label Small
- `sm` → Body Small
- `md` → Body Medium
- `lg` → Body Large
- `xl` → Title Medium
- `2xl` → Title Large
- etc.

---

## Component Inventory

### Core Components (from Park UI)

| Component | Status | Notes |
|-----------|--------|-------|
| Button | ✅ Ready | solid, subtle, outline, plain, surface variants |
| IconButton | ✅ Ready | Icon-only button |
| Input | ✅ Ready | Text input with field wrapper |
| Textarea | ✅ Ready | Multi-line input |
| Select | ✅ Ready | Dropdown selection |
| Checkbox | ✅ Ready | Boolean input |
| Switch | ✅ Ready | Toggle control |
| Radio Group | ✅ Ready | Single selection |
| Dialog | ✅ Ready | Modal dialogs |
| Drawer | ✅ Ready | Side panels |
| Popover | ✅ Ready | Floating content |
| Tooltip | ✅ Ready | Hover hints |
| Tabs | ✅ Ready | Tab navigation |
| Accordion | ✅ Ready | Collapsible sections |
| Avatar | ✅ Ready | User images |
| Badge | ✅ Ready | Status indicators |
| Card | ✅ Ready | Content containers |
| Progress | ✅ Ready | Loading indicators |
| Skeleton | ✅ Ready | Loading placeholders |
| Spinner | ✅ Ready | Loading spinner |
| Toast | ✅ Ready | Notifications |

### Discourser-Specific Components (Custom)

| Component | Status | Purpose |
|-----------|--------|---------|
| AudioWaveform | 🔲 Planned | Voice visualization |
| ConversationBubble | 🔲 Planned | Chat messages |
| ScenarioCard | 🔲 Planned | Interview scenario selection |
| FeedbackPanel | 🔲 Planned | AI feedback display |
| RecordingControls | 🔲 Planned | Voice recording UI |
| ProgressStepper | 🔲 Planned | Multi-step flows |

---

## Package Exports

```typescript
// Main entry - all components
import { Button, Input, Dialog } from '@discourser/design-system';

// Styled system utilities
import { css, cx } from '@discourser/design-system/styled-system/css';
import { styled } from '@discourser/design-system/styled-system/jsx';

// Tokens for custom styling
import { token } from '@discourser/design-system/styled-system/tokens';

// Recipes for custom components
import { button } from '@discourser/design-system/styled-system/recipes';
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm dev

# Run tests
pnpm test

# Type check
pnpm typecheck
```

### Build & Publish

```bash
# Generate PandaCSS
pnpm build:panda

# Build library
pnpm build

# Create changeset
pnpm changeset

# Version bump
pnpm version

# Publish to npm
pnpm release
```

### Token Sync Workflow

```bash
# In Figma:
# 1. Open figma-token-sync plugin
# 2. Export Variables to tokens.json

# In Storybook:
# 3. File watcher detects change
# 4. Tokens update in real-time

# To push changes back to Figma:
# 5. Edit tokens in Storybook addon
# 6. Export tokens.json
# 7. Import via Figma plugin
```

---

## File Structure

```
Discourser-Design-System/
├── src/
│   ├── components/           # React components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── preset/               # Panda CSS preset
│   │   ├── colors/           # M3 → Radix color bridge
│   │   │   ├── m3-primary.ts
│   │   │   ├── m3-neutral.ts
│   │   │   ├── m3-error.ts
│   │   │   └── index.ts
│   │   ├── recipes/          # Component recipes (from Park UI)
│   │   │   ├── button.ts
│   │   │   ├── input.ts
│   │   │   └── ...
│   │   └── semantic-tokens.ts
│   ├── languages/            # Design language definitions
│   │   └── material3.language.ts
│   └── index.ts              # Main export
├── stories/                  # Storybook stories
├── styled-system/            # Generated PandaCSS output
├── dist/                     # Built library output
├── panda.config.ts           # PandaCSS configuration
├── tsup.config.ts            # Build configuration
├── package.json
└── ARCHITECTURE.md           # This file
```

---

## Design Decisions

### 1. Park UI as Foundation
**Decision:** Build on Park UI rather than from scratch.

**Rationale:** 
- 60+ production-ready components
- Ark UI provides accessibility
- Active community (part of Chakra org)
- Reduces development time significantly

### 2. M3 Color Bridge
**Decision:** Map M3 tonal palettes to Radix scale instead of replacing Park UI colors.

**Rationale:**
- Park UI recipes expect Radix-style color structure
- Preserves all Park UI component styling
- M3 aesthetic achieved through color values, not structure

### 3. Dual Semantic Token Layers
**Decision:** Support both Park UI semantics (`solid.bg`) and M3 semantics (`surface`, `onSurface`).

**Rationale:**
- Park UI components work out of the box
- Custom components can use M3 naming if preferred
- Flexibility for different use cases

### 4. DTCG Token Format
**Decision:** Use W3C Design Tokens format for token interchange.

**Rationale:**
- Industry standard
- Tool ecosystem support
- Future-proof for design tool integrations

### 5. Monolithic Package
**Decision:** Single npm package rather than monorepo with sub-packages.

**Rationale:**
- Simpler consumption for Discourser.AI
- Easier versioning
- Can split later if needed

---

## Integration with Discourser.AI

### Installation

```bash
pnpm add @discourser/design-system
```

### Setup

```tsx
// app/layout.tsx
import '@discourser/design-system/styled-system/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

### Usage

```tsx
import { Button, Input, Dialog } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

export function LoginForm() {
  return (
    <div className={css({ p: 'lg' })}>
      <Input placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button colorPalette="primary">Sign In</Button>
    </div>
  );
}
```

---

## Versioning Strategy

- **0.x.x** — Pre-release, API may change
- **1.0.0** — Stable release with Discourser.AI MVP
- Follows [Semantic Versioning](https://semver.org/)
- Changesets for changelog generation

### Current Version: 0.2.0
- Park UI integration
- M3 color bridge
- Core component set

---

## Related Projects

| Project | Relationship |
|---------|--------------|
| [Discourser.AI](../discourser.ai) | Primary consumer |
| [figma-token-sync](../figma-token-sync) | Token synchronization tooling |
| [Park UI](https://park-ui.com) | Component foundation |
| [Ark UI](https://ark-ui.com) | Headless primitives |
| [PandaCSS](https://panda-css.com) | Styling engine |

---

## Resources

- [Park UI Documentation](https://park-ui.com/docs)
- [Ark UI Documentation](https://ark-ui.com/react/docs)
- [PandaCSS Documentation](https://panda-css.com/docs)
- [Material Design 3](https://m3.material.io)
- [W3C Design Tokens](https://tr.designtokens.org/format/)

---

*Last updated: January 6, 2026*
