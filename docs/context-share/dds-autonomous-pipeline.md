# DDS Code to Canvas + Code Connect — Autonomous Pipeline

> **IMPORTANT**: Execute ALL phases sequentially without stopping to ask for confirmation. Do NOT pause to ask "should I proceed?" or "would you like me to continue?" — just keep going. If a phase fails verification, fix it and retry before moving to the next phase. Only stop if you hit 3 consecutive failures on the same step.

> **CONTEXT**: Phase 1 (adding ScenarioQueue to the FullCatalog) was already completed and verified in a prior session. This pipeline covers Phase 2 (Code to Canvas) and Phase 3 (Code Connect setup).

> **FIGMA TOKEN**: Available in `.env` file as `FIGMA_ACCESS_TOKEN`. Load it with `source .env` or `export $(cat .env | xargs)` if needed for CLI commands.

---

## Pre-Flight Checks

Before starting any phase, verify the environment is ready. Do all of these first:

### A. Verify Figma MCP is connected

Check that the Figma desktop MCP tools are available. You should have access to tools like `get_design_context`, `get_metadata`, `get_screenshot`, and importantly **write tools** for creating frames on the canvas. If the Figma MCP tools are not available, STOP and report that the Figma desktop MCP server is not connected — the user needs to enable it in Figma Dev Mode.

### B. Verify Storybook is running

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:6006 || echo "NOT_RUNNING"
```

If not running:
```bash
pnpm storybook &
sleep 15
# Verify it's up
curl -s -o /dev/null -w "%{http_code}" http://localhost:6006
```

### C. Verify Phase 1 is complete

```bash
# Check that ScenarioQueue is in the catalog
grep -c "ScenarioQueue" stories/ComponentCatalog.stories.tsx
```

Should return a number > 0. If it returns 0, something went wrong with the prior session — but do NOT redo Phase 1, just note it and proceed.

---

## Phase 2: Code to Canvas — Push FullCatalog to Figma

**Goal**: Capture the rendered FullCatalog from Storybook and push each section into the Figma file as editable frames.

**Target Figma file**: `https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm/V2-Discourser-FigmaLoop?node-id=0-1`
**File key**: `ua4LYtQHXt2lhHlCsSpdBm`

### 2A. Understand the catalog sections

The FullCatalog at `http://localhost:6006/?path=/story/design-system-component-catalog--full-catalog` contains these sections (in order):

1. **Typography** — Header component, 11 sizes
2. **Button & IconButton** — 6 variants × 7 sizes × 5 color palettes, states, ButtonGroup
3. **Form Inputs** — Input, InputGroup, Textarea
4. **Form Controls** — RadioGroup, Checkbox, Switch, Select, Slider
5. **Data Display** — Card, Badge, Avatar, Progress, Skeleton
6. **Feedback** — Spinner, CloseButton, Toast triggers, loading states
7. **Overlays** — Dialog, Drawer, Popover, Tooltip
8. **Navigation & Layout** — Breadcrumb, Accordion, Tabs, Stepper
9. **Custom Components** — ContentCard, NavigationMenu, ScenarioSettings, Stepper with content
10. **ScenarioQueue** — Full queue component, individual ScenarioCards
11. **Icon Library** — All 9 DDS icons

### 2B. Capture and push to Figma

Use the browser/devtools MCP to navigate to the Storybook FullCatalog URL at 1440px viewport width. Then use the Figma MCP write tools to push the captured UI into the target Figma file.

**Approach — for each section:**
1. Use the browser MCP to navigate to the FullCatalog story
2. Scroll to the section, take a screenshot or capture the rendered state
3. Use the Figma MCP to create a new frame on the canvas for that section
4. Name each frame clearly: `DDS / Typography`, `DDS / Button & IconButton`, `DDS / Form Inputs`, etc.

If the Figma MCP provides a "capture from browser" or "code to canvas" tool, use that directly — it will produce higher fidelity editable layers rather than rasterized screenshots.

If you cannot find write tools on the Figma MCP (only read tools are available), then:
- Document which tools ARE available
- Take screenshots of each section via browser MCP
- Save them to `docs/figma-captures/` as PNG files for manual import
- Report this in the summary and move on to Phase 3

### 2C. Verify Phase 2

Use `get_metadata` on the Figma file (node `0-1`) to confirm frames were created. List them by name.

---

## Phase 3: Code Connect Setup

**Goal**: Set up Figma Code Connect so that Figma Dev Mode shows correct DDS React imports and usage examples when inspecting components.

### 3A. Install Code Connect

```bash
pnpm add -D @figma/code-connect
```

### 3B. Create `figma.config.json` at project root

```json
{
  "codeConnect": {
    "parser": "react",
    "include": ["src/components/**/*.figma.tsx"],
    "importPaths": {
      "src/components/*": "@discourser/design-system"
    }
  }
}
```

### 3C. Create `.figma.tsx` annotation files

Create one `.figma.tsx` file per component. These map Figma components to real code. The `figmaNodeUrl` values use the file URL as a base — they'll be refined once components exist as Figma component nodes.

**Base URL for all**: `https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm`

Create ALL of the following files. Do not skip any. Do not stop to ask if you should continue.

---

#### `src/components/Button.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', {
      Solid: 'solid', Elevated: 'elevated', Surface: 'surface',
      Subtle: 'subtle', Outline: 'outline', Plain: 'plain',
    }),
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    size: figma.enum('Size', {
      '2xs': '2xs', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl',
    }),
    disabled: figma.boolean('Disabled'),
    loading: figma.boolean('Loading'),
    label: figma.string('Label'),
  },
  example: ({ variant, colorPalette, size, disabled, loading, label }) => (
    <Button variant={variant} colorPalette={colorPalette} size={size} disabled={disabled} loading={loading}>
      {label}
    </Button>
  ),
})
```

#### `src/components/IconButton.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { IconButton } from './IconButton'

figma.connect(IconButton, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', {
      Solid: 'solid', Elevated: 'elevated', Surface: 'surface',
      Subtle: 'subtle', Outline: 'outline', Plain: 'plain',
    }),
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    size: figma.enum('Size', {
      '2xs': '2xs', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl',
    }),
  },
  example: ({ variant, colorPalette, size }) => (
    <IconButton variant={variant} colorPalette={colorPalette} size={size} aria-label="Action">
      {/* icon */}
    </IconButton>
  ),
})
```

#### `src/components/Input.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { Input } from './Input'

figma.connect(Input, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    size: figma.enum('Size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }),
    disabled: figma.boolean('Disabled'),
    placeholder: figma.string('Placeholder'),
  },
  example: ({ size, disabled, placeholder }) => (
    <Input size={size} disabled={disabled} placeholder={placeholder} />
  ),
})
```

#### `src/components/Textarea.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

figma.connect(Textarea, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    disabled: figma.boolean('Disabled'),
    placeholder: figma.string('Placeholder'),
  },
  example: ({ disabled, placeholder }) => (
    <Textarea disabled={disabled} placeholder={placeholder} rows={3} />
  ),
})
```

#### `src/components/Header.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { Header } from './Header'

figma.connect(Header, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    size: figma.enum('Size', {
      '7xl': '7xl', '6xl': '6xl', '5xl': '5xl', '4xl': '4xl',
      '3xl': '3xl', '2xl': '2xl', xl: 'xl', lg: 'lg',
      md: 'md', sm: 'sm', xs: 'xs',
    }),
    children: figma.string('Text'),
  },
  example: ({ size, children }) => <Header size={size}>{children}</Header>,
})
```

#### `src/components/Badge.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { Badge } from './Badge'

figma.connect(Badge, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', { Solid: 'solid', Subtle: 'subtle', Outline: 'outline' }),
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    size: figma.enum('Size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    label: figma.string('Label'),
  },
  example: ({ variant, colorPalette, size, label }) => (
    <Badge variant={variant} colorPalette={colorPalette} size={size}>{label}</Badge>
  ),
})
```

#### `src/components/Spinner.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { Spinner } from './Spinner'

figma.connect(Spinner, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    size: figma.enum('Size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
  },
  example: ({ size, colorPalette }) => <Spinner size={size} colorPalette={colorPalette} />,
})
```

#### `src/components/Card.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Card from './Card'

figma.connect(Card.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', { Elevated: 'elevated', Outline: 'outline', Subtle: 'subtle' }),
  },
  example: ({ variant }) => (
    <Card.Root variant={variant}>
      <Card.Header>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
      </Card.Header>
      <Card.Body>Content</Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card.Root>
  ),
})
```

#### `src/components/Checkbox.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Checkbox from './Checkbox'

figma.connect(Checkbox.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    disabled: figma.boolean('Disabled'),
    label: figma.string('Label'),
  },
  example: ({ colorPalette, disabled, label }) => (
    <Checkbox.Root colorPalette={colorPalette} disabled={disabled}>
      <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
      <Checkbox.Label>{label}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  ),
})
```

#### `src/components/Switch.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Switch from './Switch'

figma.connect(Switch.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    disabled: figma.boolean('Disabled'),
    label: figma.string('Label'),
  },
  example: ({ colorPalette, disabled, label }) => (
    <Switch.Root colorPalette={colorPalette} disabled={disabled}>
      <Switch.Control><Switch.Thumb /></Switch.Control>
      <Switch.Label>{label}</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  ),
})
```

#### `src/components/Tabs.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Tabs from './Tabs'

figma.connect(Tabs.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>
  ),
})
```

#### `src/components/Accordion.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Accordion from './Accordion'

figma.connect(Accordion.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Accordion.Root collapsible>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>
          <span>Trigger</span>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>Content</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  ),
})
```

#### `src/components/Dialog.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Dialog from './Dialog'

figma.connect(Dialog.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild><button>Open</button></Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.CloseTrigger />
          </Dialog.Header>
          <Dialog.Body>Content</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
})
```

#### `src/components/Drawer.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Drawer from './Drawer'

figma.connect(Drawer.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild><button>Open</button></Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body>Content</Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  ),
})
```

#### `src/components/Select.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Select from './Select'

figma.connect(Select.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Select.Root collection={collection}>
      <Select.Label>Label</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select..." />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.Item item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  ),
})
```

#### `src/components/Slider.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Slider from './Slider'

figma.connect(Slider.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
  },
  example: ({ colorPalette }) => (
    <Slider.Root colorPalette={colorPalette}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track><Slider.Range /></Slider.Track>
        <Slider.Thumb index={0}><Slider.HiddenInput /></Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  ),
})
```

#### `src/components/RadioGroup.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as RadioGroup from './RadioGroup'

figma.connect(RadioGroup.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
  },
  example: ({ colorPalette }) => (
    <RadioGroup.Root colorPalette={colorPalette}>
      <RadioGroup.Item value="option">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>Option</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Root>
  ),
})
```

#### `src/components/Avatar.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Avatar from './Avatar'

figma.connect(Avatar.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    size: figma.enum('Size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }),
  },
  example: ({ size }) => (
    <Avatar.Root size={size}>
      <Avatar.Image src="avatar.jpg" alt="User" />
      <Avatar.Fallback name="User Name" />
    </Avatar.Root>
  ),
})
```

#### `src/components/Progress.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Progress from './Progress'

figma.connect(Progress.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary', Error: 'error',
    }),
  },
  example: ({ colorPalette }) => (
    <Progress.Root value={50} colorPalette={colorPalette}>
      <Progress.Label>Label</Progress.Label>
      <Progress.ValueText />
      <Progress.Track><Progress.Range /></Progress.Track>
    </Progress.Root>
  ),
})
```

#### `src/components/Tooltip.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Tooltip from './Tooltip'

figma.connect(Tooltip.Tooltip, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    content: figma.string('Content'),
  },
  example: ({ content }) => (
    <Tooltip.Tooltip content={content} showArrow>
      <button>Trigger</button>
    </Tooltip.Tooltip>
  ),
})
```

#### `src/components/Popover.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Popover from './Popover'

figma.connect(Popover.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Popover.Root>
      <Popover.Trigger asChild><button>Trigger</button></Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow><Popover.ArrowTip /></Popover.Arrow>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
})
```

#### `src/components/Breadcrumb.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Breadcrumb from './Breadcrumb'

figma.connect(Breadcrumb.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Current</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
})
```

#### `src/components/ContentCard/ContentCard.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as ContentCard from './index'

figma.connect(ContentCard.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', { Outline: 'outline', Elevated: 'elevated', Flat: 'flat' }),
    size: figma.enum('Size', { sm: 'sm', md: 'md', lg: 'lg' }),
  },
  example: ({ variant, size }) => (
    <ContentCard.Root variant={variant} size={size}>
      <ContentCard.Header>
        <ContentCard.Title>Title</ContentCard.Title>
        <ContentCard.BadgeBar>badges</ContentCard.BadgeBar>
      </ContentCard.Header>
      <ContentCard.Body>Content</ContentCard.Body>
      <ContentCard.Separator />
      <ContentCard.Section>
        <ContentCard.SectionTitle>Section</ContentCard.SectionTitle>
        <ContentCard.List>
          <ContentCard.ListItem>Item</ContentCard.ListItem>
        </ContentCard.List>
      </ContentCard.Section>
    </ContentCard.Root>
  ),
})
```

#### `src/components/NavigationMenu/NavigationMenu.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { NavigationMenu } from './index'

figma.connect(NavigationMenu, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <NavigationMenu
      sections={sections}
      defaultOpenSections={['dashboard']}
      activeHref="/dashboard/progress"
    />
  ),
})
```

#### `src/components/ScenarioSettings/ScenarioSettings.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { ScenarioSettings } from './index'

figma.connect(ScenarioSettings, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <ScenarioSettings
      defaultValue={['duration', 'number-of-questions']}
      defaultDuration="standard"
      defaultQuestionCount="standard"
    />
  ),
})
```

#### `src/components/ScenarioQueue/ScenarioQueue.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { ScenarioQueue } from './index'

figma.connect(ScenarioQueue, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <ScenarioQueue
      scenarios={scenarios}
      onReorder={handleReorder}
      onRequeue={handleRequeue}
    />
  ),
})
```

#### `src/components/Stepper/Stepper.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import { Stepper } from './index'

figma.connect(Stepper, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', { Primary: 'primary', Secondary: 'secondary' }),
  },
  example: ({ colorPalette }) => (
    <Stepper
      steps={steps}
      defaultStep={0}
      colorPalette={colorPalette}
      showContent
      showActions
    />
  ),
})
```

#### `src/components/Skeleton.figma.tsx`
```tsx
import figma from '@figma/code-connect'
import * as Skeleton from './Skeleton'

figma.connect(Skeleton.Skeleton, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => <Skeleton.Skeleton css={{ h: '4', w: '40', borderRadius: 'md' }} />,
})
```

### 3D. Add npm scripts to package.json

Add these two scripts:

```json
"figma:connect": "figma connect publish",
"figma:connect:dry": "figma connect publish --dry-run"
```

### 3E. Ensure .env is gitignored

```bash
grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore
grep -q "^\.env\.local$" .gitignore || echo ".env.local" >> .gitignore
```

### 3F. Create `.env.example`

```
FIGMA_ACCESS_TOKEN=your-figma-personal-access-token
```

### 3G. Verify Phase 3

Run the dry-run to check annotations parse:

```bash
source .env
pnpm figma:connect:dry 2>&1 | head -50
```

This will likely warn about unresolved Figma node URLs (expected — the components don't exist as Figma components yet), but it should NOT show syntax errors. If there are syntax errors in any `.figma.tsx` file, fix them and re-run.

---

## Execution Rules — READ THESE

1. **Do NOT stop to ask me anything.** Make reasonable decisions and proceed.
2. **Do NOT ask "should I proceed to Phase 3?" or "would you like me to continue?"** — just do it.
3. **If a phase fails**, fix the issue and retry (up to 3 attempts per step).
4. **If Storybook isn't running**, start it.
5. **If Figma MCP write tools are not available**, document what IS available, save screenshots to `docs/figma-captures/`, and move on to Phase 3.
6. **If Code Connect dry-run shows syntax errors**, fix them. If it shows warnings about unresolved URLs, that's expected — move on.
7. **At the very end**, provide a single summary of what succeeded and what needs manual attention. Format it as a table like:

```
| Phase | Status | Notes |
|-------|--------|-------|
| Phase 2 | ✅/❌ | ... |
| Phase 3 | ✅/❌ | ... |
```
