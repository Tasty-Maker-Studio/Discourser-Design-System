# Storybook MCP Strategy for Design System Integration

> **Document Purpose:** Analysis of using `@storybook/addon-mcp` to provide agents with Panda CSS and design system knowledge for translating Figma designs into code.
>
> **Status:** Planning Phase
> **Last Updated:** 2026-02-10
> **Owner:** Design System Team

---

## Table of Contents

1. [Vision & Concept](#vision--concept)
2. [Current Approach: Storybook + MCP Addon](#current-approach-storybook--mcp-addon)
3. [What We Can Do Now](#what-we-can-do-now)
4. [Implementation Roadmap](#implementation-roadmap)
5. [Limitations & Future Needs](#limitations--future-needs)
6. [Future: Custom MCP Server](#future-custom-mcp-server)
7. [Decision Matrix](#decision-matrix)

---

## Vision & Concept

### The Problem

When building applications that consume the Discourser Design System, developers (and AI agents) need to:

1. **Translate Figma designs** into working code
2. **Choose the right components** from the design system
3. **Apply Panda CSS patterns** correctly (VStack, HStack, Grid, etc.)
4. **Use semantic tokens** instead of raw color values
5. **Follow M3 design principles** and accessibility guidelines

Currently, this knowledge is scattered across:
- Component stories in Storybook
- Token documentation in MDX files
- Panda CSS official documentation (external)
- Design system guidelines (internal docs)
- Figma files (visual reference only)

### The Solution

**Create a centralized knowledge hub in Storybook** that:
- Contains all component examples
- Documents Panda CSS patterns and utilities
- Provides Figma → Component translation guides
- Exposes everything via `@storybook/addon-mcp`
- Enables agents (like BMAD) to query this knowledge when building pages

### The Workflow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Designer creates Figma page design                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Agent (BMAD Dev) receives Figma design via figma-mcp     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Agent queries Discourser Design System Storybook MCP:    │
│    - "What layout pattern for vertical auto-layout?"        │
│    - "What component for Figma 'Button/Filled'?"            │
│    - "What tokens for primary brand color?"                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Agent generates code using:                              │
│    - Discourser components                                  │
│    - Panda CSS patterns                                     │
│    - Semantic tokens                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Result: Page matches Figma design, uses design system    │
└─────────────────────────────────────────────────────────────┘
```

---

## Current Approach: Storybook + MCP Addon

### Why Storybook?

**Storybook is already our component documentation hub:**

✅ **Already Contains:**
- Component stories (`stories/*.stories.tsx`)
- Token documentation (`src/stories/foundations/`)
- Design guidelines (`stories/documentation/guidelines/`)
- Usage examples with live previews

✅ **Benefits:**
- Single source of truth
- Interactive component demos
- Automatically stays in sync with code
- Great developer experience

### Why @storybook/addon-mcp?

The [`@storybook/addon-mcp`](https://github.com/storybookjs/mcp) addon:

✅ **Exposes Storybook content via MCP protocol:**
- Story content as resources
- Documentation pages (MDX)
- Component metadata
- Custom resources

✅ **No Custom Server Needed (Initially):**
- Leverages existing Storybook infrastructure
- No additional maintenance burden
- Simpler deployment story

✅ **Works with AI Agents:**
- Claude, GPT, or custom agents (like BMAD)
- Can query docs, examples, and guidelines
- Standard MCP protocol

---

## What We Can Do Now

### Phase 1: Enhance Storybook with Panda CSS Knowledge

#### 1.1 Add Panda CSS Pattern Documentation

Create comprehensive MDX files documenting Panda CSS usage:

**New Stories to Create:**

```
stories/
├── panda-css/
│   ├── 01-Patterns.mdx           # VStack, HStack, Grid, etc.
│   ├── 02-Utilities.mdx          # Spacing, colors, typography
│   ├── 03-Responsive.mdx         # Breakpoints, conditions
│   ├── 04-Composition.mdx        # Layout composition patterns
│   └── 05-FigmaTranslation.mdx   # Figma → Panda mapping
```

**Content Structure:**

```markdown
# Panda CSS Patterns

## Layout Patterns

### VStack - Vertical Stack

**Purpose:** Arrange children vertically with consistent spacing.

**When to use:**
- Forms with multiple fields
- Vertical lists
- Content sections stacked vertically

**Figma equivalent:** Auto Layout with Vertical direction

**Usage:**
```tsx
import { VStack } from 'styled-system/jsx'

<VStack gap="4" alignItems="start">
  <Heading>Title</Heading>
  <Text>Description text</Text>
  <Button>Action</Button>
</VStack>
```

**Props:**
- `gap` - Spacing between items (use token values: 1-12)
- `alignItems` - Horizontal alignment (start/center/end)
- `justifyContent` - Vertical distribution
```

#### 1.2 Create Figma Translation Guide

**stories/panda-css/05-FigmaTranslation.mdx:**

```markdown
# Figma to Code Translation Guide

## Quick Reference Table

| Figma Element | Discourser Component | Example |
|---------------|---------------------|---------|
| Button (Filled) | `<Button variant="solid">` | `<Button variant="solid" colorPalette="primary">Submit</Button>` |
| Button (Outlined) | `<Button variant="outline">` | `<Button variant="outline">Cancel</Button>` |
| Text Input | `<Input variant="outline">` | `<Input placeholder="Email" />` |
| Checkbox | `<Checkbox>` | `<Checkbox>I agree</Checkbox>` |
| Auto Layout (V) | `<VStack>` | `<VStack gap="4">...</VStack>` |
| Auto Layout (H) | `<HStack>` | `<HStack gap="2">...</HStack>` |
| Frame with Grid | `<Grid>` | `<Grid columns={3} gap="4">...</Grid>` |

## Layout Constraints

| Figma Constraint | Panda CSS |
|-----------------|-----------|
| Fill Container | `w="full"` or `h="full"` |
| Hug Contents | `w="fit"` or `h="fit"` |
| Fixed (200px) | `w="200px"` |
| Min Width | `minW="200px"` |
| Max Width | `maxW="600px"` |

## Spacing Translation

| Figma Spacing | Panda Token | CSS Value |
|---------------|-------------|-----------|
| 4px | `gap="1"` | 0.25rem |
| 8px | `gap="2"` | 0.5rem |
| 16px | `gap="4"` | 1rem |
| 24px | `gap="6"` | 1.5rem |
| 32px | `gap="8"` | 2rem |

## Color Translation

**❌ Never use raw color values:**
```tsx
<Button style={{ backgroundColor: '#64A104' }}>❌ Wrong</Button>
```

**✅ Always use semantic tokens:**
```tsx
<Button colorPalette="primary">✅ Correct</Button>
```

**Token Selection:**
- Primary actions → `colorPalette="primary"`
- Secondary actions → `colorPalette="secondary"`
- Destructive actions → `colorPalette="error"`
- Neutral actions → `colorPalette="neutral"`
```

#### 1.3 Enhance Token Documentation

Expand existing `src/stories/foundations/Colors.mdx` with usage guidance:

```markdown
## Token Usage in Code

### For Agents/Developers

When translating Figma designs:

1. **Identify the semantic meaning**, not the color value
2. **Choose the semantic token** that matches the intent
3. **Never reference tonal palette values directly** (e.g., `primary.60`)

### Decision Tree

```
Is this a primary brand action?
  → Yes: colorPalette="primary"
  → No: Continue...

Is this a secondary/supporting action?
  → Yes: colorPalette="secondary"
  → No: Continue...

Is this a destructive/error action?
  → Yes: colorPalette="error"
  → No: colorPalette="neutral"
```
```

### Phase 2: Install & Configure @storybook/addon-mcp

#### 2.1 Installation

```bash
pnpm add -D @storybook/addon-mcp
```

#### 2.2 Configuration

**.storybook/main.ts:**

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',  // ← Add this
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  }
};

export default config;
```

**.storybook/preview.ts:**

```typescript
import type { Preview } from '@storybook/react-vite';
import '../src/global.css';

const preview: Preview = {
  parameters: {
    // ... existing parameters

    // MCP Configuration
    mcp: {
      servers: {
        'discourser-design-system': {
          // Expose all documentation as resources
          resources: [
            // Panda CSS documentation
            '/docs/panda-css--patterns',
            '/docs/panda-css--utilities',
            '/docs/panda-css--responsive',
            '/docs/panda-css--composition',
            '/docs/panda-css--figma-translation',

            // Foundation docs
            '/docs/foundations--colors',
            '/docs/foundations--typography',
            '/docs/foundations--spacing',
            '/docs/foundations--elevation',

            // Component guidelines
            '/docs/documentation-guidelines--*',

            // All component stories
            '/stories/components--*',
          ],

          // Optional: Custom metadata
          metadata: {
            version: '0.13.0',
            description: 'Discourser Design System - Material 3 components with Panda CSS',
            repository: 'https://github.com/Tasty-Maker-Studio/Discourser-Design-System',
          }
        }
      }
    }
  },
};

export default preview;
```

### Phase 3: Test with BMAD Agent

#### 3.1 Consuming App Setup

In the consuming application (e.g., `discourser.ai`):

**Install the design system:**
```bash
pnpm add @discourser/design-system
```

**Configure MCP client to connect to Storybook:**

```json
// .mcp/config.json
{
  "mcpServers": {
    "design-system": {
      "url": "http://localhost:6006/mcp",
      "description": "Discourser Design System documentation and examples"
    }
  }
}
```

#### 3.2 Agent Query Examples

**Example 1: Query for layout pattern**

```typescript
// Agent prompt:
// "I have a Figma frame with vertical auto-layout and 16px spacing.
//  What Panda CSS pattern should I use?"

// MCP Query:
const result = await mcp.readResource('design-system://docs/panda-css--patterns');

// Agent parses the docs and finds:
// "Auto Layout (Vertical) → <VStack gap='4'>"

// Agent generates code:
<VStack gap="4">
  {/* children */}
</VStack>
```

**Example 2: Query for component selection**

```typescript
// Agent prompt:
// "I have a Figma button with 'Filled' variant and primary color.
//  What component should I use?"

// MCP Query:
const translation = await mcp.readResource('design-system://docs/panda-css--figma-translation');

// Agent finds mapping:
// "Button (Filled) → <Button variant='solid' colorPalette='primary'>"

// Agent generates code:
<Button variant="solid" colorPalette="primary">
  Submit
</Button>
```

**Example 3: Query for token usage**

```typescript
// Agent prompt:
// "Should I use 'primary.60' or 'primary' for a button background?"

// MCP Query:
const colors = await mcp.readResource('design-system://docs/foundations--colors');

// Agent reads token usage guidelines and learns:
// "✅ Always use semantic tokens"
// "❌ Never use tonal palette directly"

// Agent generates code:
<Button colorPalette="primary">  {/* ✅ Correct */}
```

---

## Implementation Roadmap

### Week 1: Content Creation

- [ ] Create `stories/panda-css/01-Patterns.mdx`
- [ ] Create `stories/panda-css/02-Utilities.mdx`
- [ ] Create `stories/panda-css/03-Responsive.mdx`
- [ ] Create `stories/panda-css/04-Composition.mdx`
- [ ] Create `stories/panda-css/05-FigmaTranslation.mdx`
- [ ] Enhance `src/stories/foundations/Colors.mdx` with usage guidance
- [ ] Add token selection decision tree to docs

### Week 2: MCP Integration

- [ ] Install `@storybook/addon-mcp`
- [ ] Configure `.storybook/main.ts`
- [ ] Configure `.storybook/preview.ts` with MCP resources
- [ ] Test local Storybook with MCP addon
- [ ] Document MCP endpoints

### Week 3: Testing & Validation

- [ ] Create test consuming app
- [ ] Configure MCP client in consuming app
- [ ] Write example agent prompts
- [ ] Validate agent can query docs
- [ ] Validate agent generates correct code
- [ ] Document agent workflow

### Week 4: Documentation & Rollout

- [ ] Update README with MCP usage
- [ ] Create developer guide for consuming apps
- [ ] Create agent prompt examples
- [ ] Publish updated design system version
- [ ] Announce to team

---

## Limitations & Future Needs

### What @storybook/addon-mcp CAN Do ✅

1. **Expose static documentation** as MCP resources
2. **Provide component examples** with code snippets
3. **Share design guidelines** and best practices
4. **Enable agents to read** comprehensive docs

### What @storybook/addon-mcp CANNOT Do ❌

1. **No intelligent querying**
   - Can't answer "What component for X?"
   - Agent must parse docs and infer

2. **No context-aware recommendations**
   - Can't say "For this use case, use VStack instead of Flex"
   - Agent must understand Panda CSS concepts

3. **No validation**
   - Can't validate "Is this the right token?"
   - Agent must follow guidelines correctly

4. **No Figma integration**
   - Can't directly translate Figma nodes
   - Agent must implement translation logic

### Real-World Agent Workflow

**With Storybook MCP (Current Approach):**

```
1. Agent receives Figma design
2. Agent reads Figma Translation guide from MCP
3. Agent parses the guide to build mappings
4. Agent applies mappings to generate code
5. Agent reads token docs to choose correct tokens
```

**Pros:**
- ✅ Simple to implement
- ✅ No custom server needed
- ✅ Comprehensive documentation available

**Cons:**
- ⚠️ Agent must be sophisticated enough to parse and apply
- ⚠️ More prompting/context needed
- ⚠️ Slower query responses (must read full docs)

---

## Future: Custom MCP Server

### When to Build a Custom Server

Build a custom MCP server when:

1. **Agents need intelligent querying** beyond static docs
2. **Performance becomes critical** (caching, pre-computed answers)
3. **Validation is required** (check if component usage is correct)
4. **Complex Figma translation** (direct node → component mapping)

### Custom MCP Server Architecture

```typescript
// packages/design-system/mcp-server/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'discourser-design-system',
  version: '1.0.0',
}, {
  capabilities: {
    resources: {},
    tools: {},
  }
});

// Tool: Find component for Figma element
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'find_component_for_figma_element') {
    const { figmaType, variant, properties } = request.params.arguments;

    // Intelligent mapping logic
    const mapping = componentMapper.find({
      type: figmaType,
      variant: variant,
      ...properties
    });

    return {
      component: mapping.component,
      props: mapping.props,
      example: mapping.exampleCode,
      reasoning: mapping.why
    };
  }

  if (request.params.name === 'suggest_layout_pattern') {
    const { layout, spacing, alignment } = request.params.arguments;

    // Pattern recommendation logic
    const pattern = patternSelector.recommend({
      layout,
      spacing,
      alignment
    });

    return {
      pattern: pattern.name,
      props: pattern.props,
      example: pattern.code,
      alternatives: pattern.alternatives
    };
  }

  if (request.params.name === 'choose_semantic_token') {
    const { context, colorValue } = request.params.arguments;

    // Token recommendation logic
    const token = tokenSelector.recommend({
      context,
      approximateValue: colorValue
    });

    return {
      token: token.name,
      cssVar: token.cssVar,
      reasoning: token.why,
      warning: token.warning
    };
  }
});

// Resource: Pre-processed documentation
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'design-system://components/catalog',
      name: 'Component Catalog (Searchable)',
      mimeType: 'application/json',
    },
    {
      uri: 'design-system://patterns/index',
      name: 'Pattern Index (Queryable)',
      mimeType: 'application/json',
    },
    {
      uri: 'design-system://tokens/semantic',
      name: 'Semantic Token Registry',
      mimeType: 'application/json',
    }
  ]
}));
```

### Custom Server Benefits

✅ **Intelligent Tools:**
```typescript
// Instead of reading docs and parsing:
const docs = await mcp.readResource('design-system://docs/figma-translation');
// Parse, infer, decide...

// Agent directly queries:
const result = await mcp.callTool('find_component_for_figma_element', {
  figmaType: 'Button',
  variant: 'Filled',
  size: 'Large'
});

// Returns:
{
  component: 'Button',
  props: {
    variant: 'solid',
    size: 'lg',
    colorPalette: 'primary'
  },
  example: '<Button variant="solid" size="lg" colorPalette="primary">Click</Button>',
  reasoning: 'Figma "Filled" variant maps to Panda "solid". Large size maps to "lg".'
}
```

✅ **Validation:**
```typescript
const validation = await mcp.callTool('validate_component_usage', {
  component: 'Button',
  props: {
    variant: 'solid',
    colorPalette: 'primary.60'  // ❌ Wrong
  }
});

// Returns:
{
  valid: false,
  errors: [
    {
      property: 'colorPalette',
      message: 'Use semantic token "primary" instead of tonal palette "primary.60"',
      suggestion: 'colorPalette: "primary"'
    }
  ]
}
```

✅ **Context-Aware Recommendations:**
```typescript
const recommendation = await mcp.callTool('recommend_pattern', {
  context: 'form-layout',
  elements: ['heading', 'input', 'input', 'checkbox', 'button']
});

// Returns:
{
  pattern: 'VStack',
  props: { gap: '4', alignItems: 'stretch' },
  reasoning: 'Form elements should stack vertically with consistent spacing',
  example: `
    <VStack gap="4" alignItems="stretch">
      <Heading>Form Title</Heading>
      <Input />
      <Input />
      <Checkbox>I agree</Checkbox>
      <Button>Submit</Button>
    </VStack>
  `
}
```

### Migration Path

**Phase 1: Current (Storybook MCP)**
- Start with `@storybook/addon-mcp`
- Comprehensive documentation
- Static resources only
- Agent must be sophisticated

**Phase 2: Hybrid**
- Keep Storybook MCP for docs
- Add lightweight custom server for specific tools
- Best of both worlds

**Phase 3: Full Custom Server**
- Replace Storybook MCP
- Custom server handles everything
- Maximum intelligence and performance

---

## Decision Matrix

### Start with Storybook MCP if:

- ✅ You want to move fast (1-2 weeks)
- ✅ You have sophisticated agents (Claude, GPT-4)
- ✅ Documentation is comprehensive
- ✅ You want minimal maintenance

### Build Custom MCP Server if:

- ✅ Agents need intelligent querying
- ✅ Performance is critical
- ✅ Validation is required
- ✅ Complex Figma integration needed
- ✅ You have engineering resources for custom tooling

### Hybrid Approach if:

- ✅ You want quick wins now + future flexibility
- ✅ Some queries need intelligence, others just docs
- ✅ You want to iterate and learn

---

## Recommended Approach

### Start Now: Storybook MCP (2-4 weeks)

**Why:**
1. Fastest path to value
2. Leverages existing Storybook infrastructure
3. Validates the concept with real agents
4. Learns what agents actually need

**Deliverables:**
- Comprehensive Panda CSS docs in Storybook
- Figma translation guide
- MCP addon configured
- Tested with BMAD agent

### Evaluate in 1-2 Months

**Questions to answer:**
- Are agents successfully translating Figma designs?
- Are they choosing the right components?
- Are they applying tokens correctly?
- What queries are most common?
- Where do agents struggle?

### Build Custom Server if Needed (Future)

**Based on:**
- Frequency of complex queries
- Agent success rate
- Performance requirements
- Engineering capacity

**Benefits:**
- Intelligent recommendations
- Validation
- Better UX for agents
- Faster responses

---

## Success Metrics

### Phase 1 (Storybook MCP)

- ✅ 100% of Panda CSS patterns documented
- ✅ Figma → Component mapping table complete
- ✅ MCP addon successfully exposes resources
- ✅ BMAD agent can query and retrieve docs
- ✅ Agent generates valid code from Figma designs

### Phase 2 (Validation)

- ✅ Agent success rate > 80% for simple pages
- ✅ Agent chooses correct components > 90%
- ✅ Agent uses semantic tokens > 95%
- ✅ Generated code passes design system linting

### Phase 3 (Custom Server, if needed)

- ✅ Intelligent queries reduce agent prompt size by 50%
- ✅ Response time < 200ms for common queries
- ✅ Validation catches 100% of token misuse
- ✅ Agent success rate > 95%

---

## Next Steps

### Immediate (This Week)

1. ✅ Document this strategy (current document)
2. ⬜ Create Panda CSS pattern documentation (stories/panda-css/)
3. ⬜ Create Figma translation guide
4. ⬜ Install `@storybook/addon-mcp`

### Short Term (Next 2 Weeks)

1. ⬜ Configure MCP addon in Storybook
2. ⬜ Test MCP resources are accessible
3. ⬜ Set up test consuming app
4. ⬜ Validate agent workflow

### Medium Term (1-2 Months)

1. ⬜ Collect agent usage data
2. ⬜ Identify pain points
3. ⬜ Evaluate need for custom server
4. ⬜ Document lessons learned

---

## References

- **@storybook/addon-mcp:** https://github.com/storybookjs/mcp
- **MCP Protocol Spec:** https://modelcontextprotocol.io/
- **Panda CSS Docs:** https://panda-css.com/
- **Design System Repo:** https://github.com/Tasty-Maker-Studio/Discourser-Design-System
- **Material Design 3:** https://m3.material.io/

---

## Questions & Feedback

For questions about this strategy or to provide feedback:

1. Open an issue in the design system repo
2. Discuss in team standup
3. Update this document with new learnings

**Document maintained by:** Design System Team
**Review cycle:** Monthly or as strategy evolves