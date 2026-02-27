# Prompt: Implement Figma Code Connect for DDS Components

## Context

I'm connecting the Discourser Design System (DDS) React components to their Figma counterparts in my original design file. The goal is to get Code Connect published so Dev Mode shows real component code snippets, and so Claude (via Figma MCP) can use these mappings when building pages.

## Project Location

```
/Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
```

## Figma File

**Discourser.AI V1**: `GaHmFfmvO4loUzuZS4TgEz`

## Component Mapping

Here are the 7 components to connect. Each has an existing `.figma.tsx` file that currently points to the WRONG Figma file (`ua4LYtQHXt2lhHlCsSpdBm`). Update them to point to the correct nodes below.

| DDS Component | Figma Node URL | `.figma.tsx` Location |
|---|---|---|
| NavigationMenu | `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4046&m=dev` | `src/components/NavigationMenu/NavigationMenu.figma.tsx` |
| ScenarioQueue | `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=478-5781&m=dev` | `src/components/ScenarioQueue/ScenarioQueue.figma.tsx` |
| Breadcrumb | `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-7978&m=dev` | `src/components/Breadcrumb.figma.tsx` |
| ContentCard | `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=478-5957&m=dev` | `src/components/ContentCard/ContentCard.figma.tsx` |
| ScenarioSettings | `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8240&m=dev` | `src/components/ScenarioSettings/ScenarioSettings.figma.tsx` |
| Header (new) | `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=485-4697&m=dev` | `src/components/Header.figma.tsx` (CREATE NEW) |
| Logo (new) | `https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4045&m=dev` | `src/components/Logo.figma.tsx` (CREATE NEW) |

## Instructions

### Step 1: Verify Figma Nodes via MCP

For each component URL above, use the Figma MCP `get_design_context` tool to:
- Confirm the node exists and is a component (or frame that can be referenced)
- Note any Figma component properties (variants, booleans, strings) that should be mapped to props
- Note the exact node name

Use fileKey `GaHmFfmvO4loUzuZS4TgEz` and extract nodeId from each URL (e.g., `38-4046` → `38:4046`).

### Step 2: Update Existing `.figma.tsx` Files

For the 5 existing files, update:
1. The Figma URL in `figma.connect()` to point to the correct node URL
2. Any `props` mappings if the Figma component has properties that map to DDS component props
3. Keep the `example` usage as-is unless the Figma structure suggests changes

**URL format for Code Connect:**
```
https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=XX-YYYY
```

Remove `&m=dev` from URLs — Code Connect doesn't need it.

### Step 3: Create New `.figma.tsx` Files

For **Header** and **Logo**, these may not have existing DDS components yet. Based on what `get_design_context` returns:

- If a matching DDS component exists, create the `.figma.tsx` file following the same pattern
- If no DDS component exists yet, create a placeholder `.figma.tsx` with a TODO comment noting the component needs to be built, and skip it for now

### Step 4: Validate with Dry Run

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System
pnpm figma:connect:dry
```

This requires `FIGMA_ACCESS_TOKEN` to be set in `.env`. Check that it's configured.

Review the dry run output:
- Confirm all 7 components are recognized
- Note any property mapping warnings
- Fix any errors before proceeding

### Step 5: Publish

If the dry run succeeds:
```bash
pnpm figma:connect
```

## Important Notes

- The `figma.config.json` is already configured correctly with `parser: "react"` and `include: ["src/components/**/*.figma.tsx"]`
- Import paths map `src/components/*` → `@discourser/design-system`
- Don't modify the existing component source code — only `.figma.tsx` files
- The goal is component-level mapping only, not sub-component/layer mapping
- If a Figma node has variant properties, map them to the DDS component's variant props using `figma.enum()`, `figma.boolean()`, `figma.string()` as appropriate
