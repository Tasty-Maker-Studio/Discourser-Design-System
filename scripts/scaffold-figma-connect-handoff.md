# scaffold-figma-connect — Test Run Handoff

## What This Is

Two scripts were created in this session to automate `.figma.tsx` Code Connect
file creation for DDS components:

- `scripts/scaffold-figma-connect.ts` — main scaffold script
- `scripts/query-figma-variants.ts` — Figma MCP helper (reads real variant names)
- `pnpm scaffold:figma-connect` — the npm script entry point

The scripts read component TypeScript source, query Figma for real variant
property names and values, map them to DDS prop names, and write the
`.figma.tsx` file automatically.

---

## Test These Two Components First

### Component 1: Button

- Node ID: `38:7993`
- Figma variants confirmed: `Type` [Default, Secondary, Tertiary, Neutral], `State` [Default, Hover, Active, Focused, Disabled, Optional]
- Expected DDS mapping: Type → `variant` prop, Default→solid, Secondary→outline, Tertiary→plain, Neutral→surface
- State should be skipped (interaction state, not a React prop)
- Output path: `src/components/Button.figma.tsx`

### Component 2: SettingsPopover

- Node ID: `810:5398`
- Figma variants confirmed: `Property 1` [Default, Open-Popover]
- Property 1 should be skipped (generic Figma placeholder, not a meaningful prop)
- Required props from TypeScript: userName, userTier, userEmail, actions
- Output path: `src/components/SettingsPopover/SettingsPopover.figma.tsx`

---

## Commands to Run (in order)

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System

# Step 1: Dry run Button — verify output before writing
pnpm scaffold:figma-connect --component Button --nodeId 38:7993 --dry-run

# Step 2: Write Button if dry run looks correct
pnpm scaffold:figma-connect --component Button --nodeId 38:7993

# Step 3: Dry run SettingsPopover
pnpm scaffold:figma-connect --component SettingsPopover --nodeId 810:5398 --dry-run

# Step 4: Write SettingsPopover if dry run looks correct
pnpm scaffold:figma-connect --component SettingsPopover --nodeId 810:5398

# Step 5: Run codex generator to confirm both are picked up
pnpm codex:generate
```

---

## What to Check in Dry Run Output

### Button.figma.tsx should contain:

```tsx
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-7993',
  {
    props: {
      variant: figma.enum('Type', {
        Default: 'solid',
        Secondary: 'outline',
        Tertiary: 'plain',
        Neutral: 'surface',
      }),
    },
    example: ({ variant }) => <Button variant={variant}>Label</Button>,
  },
);
```

### SettingsPopover.figma.tsx should contain:

```tsx
import figma from '@figma/code-connect';
import { SettingsPopover } from './SettingsPopover';

figma.connect(
  SettingsPopover,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=810-5398',
  {
    example: () => (
      <SettingsPopover
        userName={'value'}
        userTier={'value'}
        userEmail={'value'}
        actions={[]}
      />
    ),
  },
);
```

---

## If the Figma Variant Query Fails

The `query-figma-variants.ts` helper makes an HTTP call to the Figma remote
MCP. It may fail in Claude Code if auth headers are not available via raw fetch.

If it fails, use `--skip-figma` and manually paste the known variant data:

```bash
# Skip Figma query — generates file without props mapping
pnpm scaffold:figma-connect --component Button --nodeId 38:7993 --skip-figma
```

Then open the generated file and manually add the props block using the known
variant data listed above.

---

## After Both Files Are Written

1. Open each `.figma.tsx` and verify the content matches expectations above
2. Run `pnpm codex:generate` — both components should appear in the output log
3. Commit both files — lint-staged will re-run the codex generator automatically

---

## codex:generate Expected Output

```
[figma-codex] ✓ Accordion (compound)
[figma-codex] ✓ Breadcrumb (compound)
[figma-codex] ✓ Button (simple)          ← new
[figma-codex] ✓ ContentCard (composite)
[figma-codex] ✓ Header (simple)
[figma-codex] ✓ NavigationMenu (composite)
[figma-codex] ✓ ScenarioQueue (composite)
[figma-codex] ✓ ScenarioSettings (composite)
[figma-codex] ✓ SettingsPopover (composite) ← new
[figma-codex] ✓ StudioControls (composite)
[figma-codex] Generated 10 components → dist/figma-codex.json
```

---

## Lookup Tables in scaffold-figma-connect.ts

If variant mapping is wrong, update these constants at the top of the script:

```ts
// Maps Figma property names → DDS prop names
const FIGMA_PROP_TO_DDS_PROP: Record<string, string | null> = {
  Type: 'variant',
  Variant: 'variant',
  Color: 'colorPalette',
  'Color Palette': 'colorPalette',
  Size: 'size',
  State: 'data-state',
  'Property 1': null, // skip
  'Property 2': null, // skip
};

// Maps Figma variant values → DDS prop values, per property
const FIGMA_VALUE_TO_DDS_VALUE: Record<string, Record<string, string>> = {
  Type: {
    Default: 'solid',
    Secondary: 'outline',
    Tertiary: 'plain',
    Neutral: 'surface',
  },
  Size: {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
  },
  // Add more as needed
};
```

These tables are the single place to update when you encounter a new Figma
naming pattern. Future components pick up the mappings automatically.
