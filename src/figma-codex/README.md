# figma-codex

A portable manifest generator that reads `.figma.tsx` Code Connect files and produces `figma-codex.json` — a structured map of Figma design components to their code implementations.

## Why It Exists

Figma's Code Connect "inspect" feature (linking designs to code in Dev Mode) requires a Figma **Organization or Enterprise** plan. `figma-codex` achieves the same goal without the subscription: it reads the `.figma.tsx` connector files already in the codebase and produces a self-contained JSON manifest that AI agents can consume offline.

## What It Produces

`dist/figma-codex.json` contains:

```json
{
  "version": "1.0.0",
  "packageName": "@discourser/design-system",
  "generatedAt": "2026-02-27T12:00:00.000Z",
  "gitHash": "abc1234",
  "figmaFiles": {
    "GaHmFfmvO4loUzuZS4TgEz": { "fileKey": "GaHmFfmvO4loUzuZS4TgEz" }
  },
  "components": {
    "Accordion": {
      "name": "Accordion",
      "type": "compound",
      "figma": {
        "fileKey": "GaHmFfmvO4loUzuZS4TgEz",
        "nodeId": "38:7978",
        "url": "https://www.figma.com/design/..."
      },
      "imports": {
        "primary": "import * as Accordion from '@discourser/design-system/Accordion'",
        "namedExports": ["Accordion.Root", "Accordion.Item"]
      },
      "props": [],
      "subComponents": [
        { "name": "Root", "element": "div" },
        { "name": "Item", "element": "div" }
      ],
      "example": "<Accordion.Root>...</Accordion.Root>",
      "sourcePath": "src/components/Accordion.tsx"
    }
  }
}
```

## Component Types

| Type        | Description                                                   | Example                           |
| ----------- | ------------------------------------------------------------- | --------------------------------- |
| `simple`    | Single named export, no compound structure                    | `Header`, `DiscourserLogo`        |
| `compound`  | Namespace import with sub-components (`.Root`, `.Item`, etc.) | `Accordion`, `Breadcrumb`         |
| `composite` | Named export that imports other DDS components internally     | `NavigationMenu`, `ScenarioQueue` |

## Usage

### Generate the manifest

```bash
# One-time generation
pnpm codex:generate

# Watch mode (re-generates when .figma.tsx files change)
pnpm codex:watch
```

The manifest is also auto-generated at the end of `pnpm build`.

### Auto-regeneration on commit

When you commit a `.figma.tsx` file, lint-staged automatically runs the generator (`tsx src/figma-codex/generate.ts`) to keep the manifest in sync.

### Consuming the manifest

```typescript
// In AI agent code or tooling scripts
import codex from '@discourser/design-system/figma-codex';

const accordion = codex.components['Accordion'];
console.log(accordion.type); // 'compound'
console.log(accordion.imports.primary); // "import * as Accordion from '@discourser/design-system/Accordion'"
console.log(accordion.subComponents); // [{ name: 'Root', element: 'div' }, ...]
```

## Agent Workflow (Kai + Amelia)

1. **Kai** (Design Engineer) loads `figma-codex.json` and uses `figma.nodeId` to look up the Figma component
2. Kai reads `imports.primary`, `props`, and `example` to understand how to use the component in code
3. **Amelia** (Developer Agent) uses the manifest to verify the correct import path and prop types when implementing stories
4. Both agents benefit from `subComponents` entries when assembling compound components

## Adding a New Component

After creating `YourComponent.figma.tsx`, three import patterns are supported:

**Pattern 1 — Named import (simple)**

```tsx
import { YourComponent } from './YourComponent';
figma.connect(YourComponent, 'https://www.figma.com/design/...', {
  example: () => <YourComponent />,
});
```

**Pattern 2 — Namespace from component file (compound)**

```tsx
import * as YourComponent from './YourComponent';
figma.connect(YourComponent.Root, 'https://www.figma.com/design/...', {
  example: () => <YourComponent.Root />,
});
```

**Pattern 3 — Namespace from index (compound)**

```tsx
import * as YourComponent from './YourComponent/index';
figma.connect(YourComponent.Root, 'https://www.figma.com/design/...', {
  example: () => <YourComponent.Root />,
});
```

After creating the file, run `pnpm codex:generate` to update the manifest.

## Porting to Another Design System

1. Copy the `src/figma-codex/` directory to your repo
2. Add `"codex:generate": "tsx src/figma-codex/generate.ts"` to `package.json` scripts
3. Create `figma-codex.config.json` (optional, all fields have defaults):

```json
{
  "include": ["src/components/**/*.figma.tsx"],
  "outputPath": "dist/figma-codex.json",
  "packageName": "@your-org/design-system"
}
```

4. Run `pnpm codex:generate`

## Schema Reference

```typescript
interface FigmaCodex {
  version: '1.0.0';
  packageName: string;
  generatedAt: string; // ISO 8601
  gitHash?: string; // short SHA
  figmaFiles: Record<string, { fileKey: string; fileName?: string }>;
  components: Record<string, ComponentEntry>;
}

interface ComponentEntry {
  name: string;
  type: 'simple' | 'compound' | 'composite';
  figma: {
    fileKey: string;
    nodeId: string; // format: "123:456"
    nodeName?: string;
    url: string;
  };
  imports: {
    primary: string; // package import path
    namedExports: string[];
    subpath?: string;
  };
  props: PropDefinition[];
  subComponents?: SubComponentEntry[];
  example: string; // JSX usage string from figma.connect()
  sourcePath: string; // relative path to source .tsx file
}

interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  description?: string; // from JSDoc comment
  defaultValue?: string;
}

interface SubComponentEntry {
  name: string; // e.g. "Root", "Item", "Header"
  element: string; // underlying ark element, e.g. "div"
  description?: string;
}
```
