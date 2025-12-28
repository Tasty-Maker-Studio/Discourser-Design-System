# Storybook Documentation

This directory contains Storybook stories and documentation pages.

## Structure

```
stories/
├── Introduction.mdx                    # Welcome page
├── documentation/                      # Auto-generated docs (gitignored)
│   ├── guidelines/                    # Design system guidelines
│   ├── figma-make/                    # Figma Make template docs
│   └── skills/                        # Claude Code skills
└── README.md                          # This file
```

## How It Works

### Auto-Generated Documentation

The `documentation/` folder is **automatically generated** from markdown files:

**Source → Generated:**
- `guidelines/*.md` → `stories/documentation/guidelines/*.mdx`
- `docs/figma-make-docs/*.md` → `stories/documentation/figma-make/*.mdx`
- `.claude/skills/*.md` → `stories/documentation/skills/*.mdx`

### Generation Script

Run the generator:
```bash
pnpm docs:generate
```

This happens automatically when you run:
- `pnpm dev` - Generates docs, then starts Storybook
- `pnpm build:storybook` - Generates docs, then builds Storybook

### Manual Stories

Add component stories directly to `stories/` or `src/`:
```
src/components/Button/Button.stories.tsx  # Component-specific
stories/CustomPage.mdx                     # Custom documentation page
```

## Creating Documentation

### Option 1: Edit Source Markdown Files

Edit the markdown files in their source locations:
- Guidelines: `guidelines/`
- Figma docs: `docs/figma-make-docs/`
- Skills: `.claude/skills/`

Then regenerate:
```bash
pnpm docs:generate
```

### Option 2: Create MDX Stories

Create `.mdx` files directly in `stories/`:

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Your Custom Page" />

# Your Content Here

Your markdown content...
```

## Viewing Documentation

Start Storybook:
```bash
pnpm dev
```

Open: http://localhost:6006

Documentation will be organized in the sidebar:
- **Introduction** - Welcome page
- **Documentation**
  - **Guidelines** - Design system guidelines
  - **Figma Make** - Template creation guides
  - **Skills** - Claude Code context

## Updating Documentation

1. Edit source markdown files
2. Run `pnpm docs:generate` (or it runs automatically with `pnpm dev`)
3. Refresh Storybook to see changes

## Why Auto-Generate?

**Benefits:**
- ✅ Single source of truth (markdown files)
- ✅ Documentation stays in sync
- ✅ Guidelines used by Figma Make **and** visible in Storybook
- ✅ Skills used by Claude Code **and** viewable by humans
- ✅ No manual duplication

**The Flow:**
```
Write Once (markdown) → Used by Tools → Also in Storybook
     ↓                       ↓                  ↓
guidelines/*.md    →    Figma Make AI    +   Storybook
.claude/skills/*   →    Claude Code      +   Storybook
```

## Troubleshooting

### Documentation not showing?
```bash
pnpm docs:generate
```

### Stale content?
```bash
rm -rf stories/documentation
pnpm docs:generate
```

### Want to customize?
Edit `scripts/generate-storybook-docs.ts`
