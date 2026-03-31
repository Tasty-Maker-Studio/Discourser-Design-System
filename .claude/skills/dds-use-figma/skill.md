---
name: dds-use-figma
description: Audit and update Figma nodes to use DDS variable bindings via the use_figma MCP. Two modes: audit (read-only, surfaces unbound nodes) and update (rebinds nodes to DDS variables). Always run audit before update.
---

# DDS use_figma Skill

## Purpose

This skill governs how Claude uses the `use_figma` MCP tool to inspect and
repair Figma designs so they correctly reference DDS variables (Semantic,
Primitives, Spacing & Shape collections). It is the bridge between the DDS
token system and existing Figma page designs.

## When to Use This Skill

- A Figma page design is using hardcoded hex values instead of DDS variables
- Figma nodes are bound to a legacy/old variable collection
- You need to understand which nodes in a frame are unbound before fixing them
- You are preparing a Figma frame so Kai (Design Engineer agent) can produce
  accurate Design Implementation Specs

## DDS Variable Collections (source of truth)

These are the three collections that exist in the Discourser.AI--V1 Figma file.
All rebinding targets must come from one of these collections.

| Collection      | ID                            | Modes        | Purpose                      |
| --------------- | ----------------------------- | ------------ | ---------------------------- |
| Primitives      | VariableCollectionId:752:5202 | Value        | Tonal palette (primary/0–90) |
| Semantic        | VariableCollectionId:752:5281 | Light / Dark | M3 semantic tokens           |
| Spacing & Shape | VariableCollectionId:752:5316 | Value        | Spacing, radii, border       |

### Semantic token quick reference (Figma path → DDS)

Colors — use Semantic collection:

- Body/primary text on surface → `onSurface` (Figma: Semantic/onSurface)
- High-contrast text → `onBackground` (Figma: Semantic/onBackground)
- Primary action bg → `primary` (Figma: Semantic/primary)
- Primary container bg → `primary/container` (Figma: Semantic/primary/container)
- Divider/outline → `outline/variant` (Figma: Semantic/outline/variant)
- Panel border → `outline` (Figma: Semantic/outline)
- Page background → `background` (Figma: Semantic/background)
- Surface/card bg → `surface` (Figma: Semantic/surface)

Spacing — use Spacing & Shape collection:

- spacing/none, spacing/xxs, spacing/xs, spacing/sm
- spacing/md (16px), spacing/lg, spacing/xl, spacing/xxl, spacing/xxxl

Radii — use Spacing & Shape collection:

- radii/none, radii/extraSmall (6px), radii/small, radii/medium
- radii/large, radii/extraLarge, radii/full

## MODE 1 — Audit (read-only)

Use this mode first, always. Never run update mode without a completed audit.

### Audit script template

```javascript
// INPUT: Replace TARGET_NODE_ID with the node ID to audit (e.g. '38:8232')
const TARGET_NODE_ID = 'REPLACE_ME';

const root = await figma.getNodeByIdAsync(TARGET_NODE_ID);

function hexFromColor(color) {
  if (!color) return null;
  return (
    '#' +
    Math.round(color.r * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.g * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.b * 255)
      .toString(16)
      .padStart(2, '0')
  );
}

function walk(node, results = []) {
  const entry = {
    id: node.id,
    name: node.name,
    type: node.type,
    unboundFills: [],
    unboundStrokes: [],
    unboundText: null,
    unboundCornerRadius: null,
    unboundSpacing: null,
  };

  if ('fills' in node && Array.isArray(node.fills)) {
    node.fills.forEach((f, i) => {
      if (f.type === 'SOLID' && !f.boundVariables?.color) {
        entry.unboundFills.push({
          index: i,
          hex: hexFromColor(f.color),
          opacity: f.opacity ?? 1,
        });
      }
    });
  }

  if ('strokes' in node && Array.isArray(node.strokes)) {
    node.strokes.forEach((s, i) => {
      if (s.type === 'SOLID' && !s.boundVariables?.color) {
        entry.unboundStrokes.push({
          index: i,
          hex: hexFromColor(s.color),
        });
      }
    });
  }

  if (node.type === 'TEXT') {
    const fill = node.fills?.[0];
    if (fill && !fill.boundVariables?.color) {
      entry.unboundText = {
        content: node.characters?.slice(0, 60),
        fontFamily: node.fontName?.family ?? null,
        fontSize: node.fontSize ?? null,
        fontWeight: node.fontName?.style ?? null,
        colorHex: hexFromColor(fill.color),
      };
    }
  }

  if (
    'cornerRadius' in node &&
    typeof node.cornerRadius === 'number' &&
    node.cornerRadius > 0
  ) {
    if (!node.boundVariables?.cornerRadius) {
      entry.unboundCornerRadius = { value: node.cornerRadius };
    }
  }

  if (node.layoutMode && node.layoutMode !== 'NONE') {
    const spacingVars = node.boundVariables ?? {};
    const unbound = {};
    if (!spacingVars.paddingTop && node.paddingTop > 0)
      unbound.paddingTop = node.paddingTop;
    if (!spacingVars.paddingBottom && node.paddingBottom > 0)
      unbound.paddingBottom = node.paddingBottom;
    if (!spacingVars.paddingLeft && node.paddingLeft > 0)
      unbound.paddingLeft = node.paddingLeft;
    if (!spacingVars.paddingRight && node.paddingRight > 0)
      unbound.paddingRight = node.paddingRight;
    if (!spacingVars.itemSpacing && node.itemSpacing > 0)
      unbound.itemSpacing = node.itemSpacing;
    if (Object.keys(unbound).length > 0) entry.unboundSpacing = unbound;
  }

  const hasIssues =
    entry.unboundFills.length > 0 ||
    entry.unboundStrokes.length > 0 ||
    entry.unboundText !== null ||
    entry.unboundCornerRadius !== null ||
    entry.unboundSpacing !== null;

  if (hasIssues) results.push(entry);

  if ('children' in node) {
    for (const child of node.children) walk(child, results);
  }

  return results;
}

const flagged = walk(root);

return {
  auditTarget: TARGET_NODE_ID,
  totalUnboundNodes: flagged.length,
  flagged,
};
```

### After running audit

Save the output to:
`docs/figma-mcp-return/{component-name}-audit.json`

Then map each flagged hex value to a DDS token using the quick reference
table above and `docs/token-name-mapping.json`. Produce a Rebinding Manifest
before proceeding to update mode.

## MODE 2 — Update (writes to Figma)

⚠️ Never run update mode without a completed audit and an approved Rebinding
Manifest.

### Update script template

```javascript
// INPUT: Rebinding manifest — array of { nodeId, property, fillIndex, variableName }
// variableName must match a variable in the Semantic or Spacing & Shape collection
const REBINDING_MANIFEST = [
  // Example:
  // { nodeId: '38:8233', property: 'fill', fillIndex: 0, variableName: 'onSurface' }
];

const collections = await figma.variables.getLocalVariableCollectionsAsync();

async function getVariableByName(name) {
  for (const col of collections) {
    for (const id of col.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v?.name === name) return v;
    }
  }
  return null;
}

const results = [];

for (const entry of REBINDING_MANIFEST) {
  const node = await figma.getNodeByIdAsync(entry.nodeId);
  if (!node) {
    results.push({ ...entry, status: 'NODE_NOT_FOUND' });
    continue;
  }

  const variable = await getVariableByName(entry.variableName);
  if (!variable) {
    results.push({ ...entry, status: 'VARIABLE_NOT_FOUND' });
    continue;
  }

  const alias = figma.variables.createVariableAlias(variable);

  if (entry.property === 'fill') {
    const fills = JSON.parse(JSON.stringify(node.fills));
    fills[entry.fillIndex].boundVariables = { color: alias };
    node.fills = fills;
    results.push({ ...entry, status: 'BOUND' });
  }

  if (entry.property === 'stroke') {
    const strokes = JSON.parse(JSON.stringify(node.strokes));
    strokes[entry.fillIndex].boundVariables = { color: alias };
    node.strokes = strokes;
    results.push({ ...entry, status: 'BOUND' });
  }
}

return { updated: results.filter((r) => r.status === 'BOUND').length, results };
```

## Workflow sequence (mandatory order)

1. **Audit** — run audit script, save output JSON
2. **Map** — map hex values to DDS tokens, produce Rebinding Manifest
3. **Review** — human approves Rebinding Manifest before any writes
4. **Update** — run update script with approved manifest
5. **Verify** — re-run audit script to confirm zero unbound nodes remain
6. **Document** — log all changes to Notion

## File conventions

- Audit output: `docs/figma-mcp-return/{component-name}-audit.json`
- Rebinding manifest: `docs/figma-mcp-return/{component-name}-rebinding-manifest.json`
- Skill location: `.claude/skills/dds-use-figma/skill.md`

## Integration

This skill feeds directly into the Kai (Design Engineer) workflow.
A fully bound Figma frame produces clean `get_design_context` output —
semantic variable names instead of hardcoded hex — which allows Kai to
produce accurate Design Implementation Specs without guessing token intent.
