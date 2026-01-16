# Package Installation & Imports

This guide explains how to install and import components from the Discourser Design System.

## Installation

Install the design system package and its peer dependencies:

```bash
npm install @discourser/design-system react react-dom
```

Or with yarn:

```bash
yarn add @discourser/design-system react react-dom
```

Or with pnpm:

```bash
pnpm add @discourser/design-system react react-dom
```

## Import Patterns

The design system exports components in two patterns: **Simple Components** and **Compound Components**.

### Simple Components

These components are exported directly and can be imported using named imports:

```typescript
import {
  Button,
  Card,
  Input,
  InputAddon,
  InputGroup,
  Textarea,
  Heading,
  Badge,
  Spinner,
  Toaster,
  toaster,
} from '@discourser/design-system';
```

**Simple components include:**

- Button
- Card
- Input
- InputAddon
- InputGroup
- Textarea
- Heading
- Badge
- Spinner
- Toast (Toaster component and toaster API)

### Compound Components

These components use a compound pattern with multiple sub-components. Import them as namespaces:

```typescript
import * as Checkbox from '@discourser/design-system';
import * as RadioGroup from '@discourser/design-system';
import * as Select from '@discourser/design-system';
import * as Dialog from '@discourser/design-system';
import * as Drawer from '@discourser/design-system';
import * as Popover from '@discourser/design-system';
import * as Tooltip from '@discourser/design-system';
import * as Accordion from '@discourser/design-system';
import * as Tabs from '@discourser/design-system';
import * as Avatar from '@discourser/design-system';
import * as Progress from '@discourser/design-system';
import * as Skeleton from '@discourser/design-system';
import * as IconButton from '@discourser/design-system';
import * as Switch from '@discourser/design-system';
import * as Slider from '@discourser/design-system';
```

**Compound components include:**

- Checkbox (Checkbox.Root, Checkbox.Control, Checkbox.Label, Checkbox.Indicator)
- RadioGroup (RadioGroup.Root, RadioGroup.Item, RadioGroup.ItemControl, RadioGroup.ItemText)
- Select (Select.Root, Select.Control, Select.Trigger, Select.Content, Select.Item, etc.)
- Dialog (Dialog.Root, Dialog.Trigger, Dialog.Content, Dialog.Title, etc.)
- Drawer (Drawer.Root, Drawer.Trigger, Drawer.Content, etc.)
- Popover (Popover.Root, Popover.Trigger, Popover.Content, etc.)
- Tooltip (Tooltip.Root, Tooltip.Trigger, Tooltip.Content)
- Accordion (Accordion.Root, Accordion.Item, Accordion.Trigger, Accordion.Content)
- Tabs (Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content, etc.)
- Avatar (Avatar.Root, Avatar.Image, Avatar.Fallback)
- Progress (Progress.Root, Progress.Track, Progress.Range, etc.)
- Skeleton (Skeleton.Root, Skeleton.Item)
- IconButton (IconButton.Root)
- Switch (Switch.Root, Switch.Control, Switch.Thumb, Switch.Label)
- Slider (Slider.Root, Slider.Control, Slider.Track, Slider.Thumb, etc.)

### Styling Utilities

For advanced custom styling, import Panda CSS utilities:

```typescript
// CSS function for inline styles
import { css } from '@discourser/design-system/styled-system/css';

// Recipe functions for component variants
import { button } from '@discourser/design-system/styled-system/recipes';

// Styled function for creating styled components
import { styled } from '@discourser/design-system/styled-system/jsx';
```

**When to use styling utilities:**

- Use `css()` for one-off custom styles that don't belong in a component variant
- Use recipe functions when you need to replicate component styles
- Use `styled()` when creating new styled components
- **Always prefer using component variants** over custom styling

## Common Import Patterns

### Basic Form

```typescript
import { Input, Textarea, Select, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function ContactForm() {
  return (
    <form className={css({ display: 'flex', flexDirection: 'column', gap: 'lg' })}>
      <Input label="Name" />
      <Input label="Email" type="email" />
      <Textarea label="Message" rows={5} />
      <Button type="submit">Send</Button>
    </form>
  );
}
```

### Dialog with Form

```typescript
import * as Dialog from '@discourser/design-system';
import { Input, Button } from '@discourser/design-system';

function CreateDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create Item</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create New Item</Dialog.Title>
        <Input label="Name" />
        <Input label="Description" />
        <Button>Save</Button>
      </Dialog.Content>
    </Dialog.Root>
  );
}
```

### Navigation with Drawer

```typescript
import * as Drawer from '@discourser/design-system';
import { IconButton } from '@discourser/design-system';
import { MenuIcon } from 'your-icon-library';

function Navigation() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton aria-label="Open menu">
          <MenuIcon />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/settings">Settings</a>
        </nav>
      </Drawer.Content>
    </Drawer.Root>
  );
}
```

### Search with InputGroup

```typescript
import { InputGroup, Input } from '@discourser/design-system';
import { SearchIcon } from 'your-icon-library';

function SearchBar() {
  return (
    <InputGroup startElement={<SearchIcon />}>
      <Input placeholder="Search..." />
    </InputGroup>
  );
}
```

### Toast Notifications

```typescript
import { Button, toaster } from '@discourser/design-system';

function SaveButton() {
  const handleSave = async () => {
    try {
      await saveData();
      toaster.success({
        title: 'Saved!',
        description: 'Your changes have been saved.'
      });
    } catch (error) {
      toaster.error({
        title: 'Failed to save',
        description: error.message
      });
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

## TypeScript Support

All components are fully typed with TypeScript. Import types as needed:

```typescript
import { Button, type ButtonProps } from '@discourser/design-system';
import type { InputProps } from '@discourser/design-system';
import type * as Dialog from '@discourser/design-system';

// Use component props in your custom components
function CustomButton(props: ButtonProps) {
  return <Button {...props} />;
}

// Type dialog state
const [open, setOpen] = useState<boolean>(false);
```

## Tree Shaking

The design system is optimized for tree shaking. Only import what you use:

```typescript
// ✅ Good - Only imports Button
import { Button } from '@discourser/design-system';

// ❌ Avoid - Imports entire package
import * as DesignSystem from '@discourser/design-system';
```

## Package Structure

The design system package includes:

- **Components** - All React components
- **Styled System** - Panda CSS utilities (`styled-system/`)
  - `css` - CSS function
  - `jsx` - JSX factory
  - `patterns` - Layout patterns
  - `recipes` - Component recipes
  - `tokens` - Design tokens
- **Types** - TypeScript definitions
- **Guidelines** - This documentation folder

## Best Practices

### ✅ DO:

```typescript
// Import only what you need
import { Button, Input } from '@discourser/design-system';

// Use TypeScript types
import type { ButtonProps } from '@discourser/design-system';

// Import compound components as namespaces
import * as Dialog from '@discourser/design-system';

// Use semantic tokens via css()
import { css } from '@discourser/design-system/styled-system/css';
const style = css({ bg: 'primary', color: 'onPrimary' });
```

### ❌ DO NOT:

```typescript
// Don't import the entire package
import * as DS from '@discourser/design-system';

// Don't mix import patterns
import { Checkbox } from '@discourser/design-system'; // Wrong for compound components
// Should be: import * as Checkbox from '@discourser/design-system';

// Don't bypass the design system
import { Button as MUIButton } from '@mui/material'; // Use design system Button instead
```

## Related Files

- **[overview-components.md](overview-components.md)** - Complete list of available components
- **[overview-patterns.md](overview-patterns.md)** - Common UI patterns and examples
- **[Guidelines.md](Guidelines.md)** - Main navigation and workflow
