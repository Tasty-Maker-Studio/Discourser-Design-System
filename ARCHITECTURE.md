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

---

## File Structure

```
Discourser-Design-System/
├── src/
│   ├── components/           # React components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── preset/               # Panda CSS preset
│   │   ├── colors/           # M3 → Radix color bridge
│   │   │   ├── m3-primary.ts
│   │   │   ├── m3-neutral.ts
│   │   │   ├── m3-error.ts
│   │   │   └── index.ts
│   │   ├── recipes/          # Component recipes
│   │   └── semantic-tokens.ts
│   ├── languages/            # Design language definitions
│   │   └── material3.language.ts
│   └── index.ts              # Main export
├── stories/                  # Storybook stories
├── styled-system/            # Generated PandaCSS output
├── dist/                     # Built library output
├── docs/
│   └── tasks/                # Task documents
├── panda.config.ts           # PandaCSS configuration
└── ARCHITECTURE.md           # This file
```

---

## Related Projects

| Project | Relationship |
|---------|--------------|
| [Discourser.AI](../discourser.ai) | Primary consumer |
| [figma-token-sync](../figma-token-sync) | Token synchronization tooling |
| [Park UI](https://park-ui.com) | Component foundation |

---

*Last updated: January 6, 2026*
