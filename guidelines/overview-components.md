# Components Overview

Always prefer components from `@discourser/design-system` if available. Do not use native HTML elements when a design system component exists.

## Available Components

### Interactive Elements

| Component  | Purpose                                            | Guidelines                                  |
| ---------- | -------------------------------------------------- | ------------------------------------------- |
| Button     | Primary interactive element for actions            | [button.md](components/button.md)           |
| IconButton | Icon-only interactive element                      | [icon-button.md](components/icon-button.md) |
| Switch     | Toggle control for binary on/off states            | [switch.md](components/switch.md)           |
| Checkbox   | Binary selection control for toggling options      | [checkbox.md](components/checkbox.md)       |
| RadioGroup | Mutually exclusive selection from multiple options | [radio-group.md](components/radio-group.md) |

### Form Elements

| Component | Purpose                                          | Guidelines                            |
| --------- | ------------------------------------------------ | ------------------------------------- |
| Input     | Single-line text input with label and validation | [input.md](components/input.md)       |
| Textarea  | Multi-line text input for longer content         | [textarea.md](components/textarea.md) |
| Select    | Dropdown selection from list of options          | [select.md](components/select.md)     |

### Layout & Container Elements

| Component | Purpose                                            | Guidelines                              |
| --------- | -------------------------------------------------- | --------------------------------------- |
| Card      | Container for related content with elevation       | [card.md](components/card.md)           |
| Accordion | Collapsible sections for organizing content        | [accordion.md](components/accordion.md) |
| Tabs      | Tabbed navigation for switching between views      | [tabs.md](components/tabs.md)           |
| Drawer    | Side panel for navigation or supplementary content | [drawer.md](components/drawer.md)       |

### Overlay Elements

| Component | Purpose                                          | Guidelines                          |
| --------- | ------------------------------------------------ | ----------------------------------- |
| Dialog    | Modal overlay for focused tasks or confirmations | [dialog.md](components/dialog.md)   |
| Popover   | Floating panel for contextual content            | [popover.md](components/popover.md) |
| Tooltip   | Brief contextual help text on hover              | [tooltip.md](components/tooltip.md) |

### Feedback & Status Elements

| Component | Purpose                                       | Guidelines                            |
| --------- | --------------------------------------------- | ------------------------------------- |
| Badge     | Compact visual indicator for status or labels | [badge.md](components/badge.md)       |
| Avatar    | User profile image with fallback initials     | [avatar.md](components/avatar.md)     |
| Toast     | Temporary notification messages               | [toast.md](components/toast.md)       |
| Progress  | Visual indicator for task completion          | [progress.md](components/progress.md) |
| Skeleton  | Loading placeholder for content               | [skeleton.md](components/skeleton.md) |

### Typography Elements

| Component | Purpose                                | Guidelines                          |
| --------- | -------------------------------------- | ----------------------------------- |
| Heading   | Semantic heading for content hierarchy | [heading.md](components/heading.md) |

## Common Props

Most components accept these standard props:

- `variant` - Visual style variant (e.g., filled, outlined, text)
- `size` - Size variant (sm, md, lg)
- `disabled` - Disable interaction
- `className` - Additional CSS classes (use sparingly)
- `ref` - React ref for DOM access (all components use forwardRef)

## Styling Guidelines

### ✅ DO:

```typescript
// Use design system components with variants
<Button variant="filled" size="md">Submit</Button>
<Card variant="elevated">Content</Card>
<Input variant="outlined" label="Email" />

// Use semantic color tokens when custom styling is needed
import { css } from '@discourser/design-system/styled-system/css';
const customStyle = css({ bg: 'primary', color: 'onPrimary' });

// Compose multiple components together
<Card variant="elevated">
  <Input label="Username" />
  <Button variant="filled">Submit</Button>
</Card>
```

### ❌ DO NOT:

```typescript
// Don't use raw HTML when components exist
<button className="...">Submit</button>  // Use <Button> instead
<input type="text" />                     // Use <Input> instead
<div className="card">...</div>           // Use <Card> instead

// Don't override styles with inline styles
<Button style={{ backgroundColor: 'blue' }}>Submit</Button>

// Don't use raw color values
<div style={{ backgroundColor: '#4C662B' }}>...</div>
const style = css({ bg: '#4C662B' });  // Use semantic tokens instead

// Don't skip required props like labels
<Input placeholder="Email" />  // Missing label (accessibility issue)
```

## Component Categories

### Interactive Elements

- **Button** - For user actions (submit, cancel, etc.)
- **IconButton** - For icon-only actions (close, menu, etc.)
- **Switch** - For toggle states (enable/disable features)

### Input Elements

- **Input** - For text input fields with built-in label and validation

### Layout Elements

- **Card** - For grouping related content with visual hierarchy

### Overlay Elements

- **Dialog** - For modal dialogs and confirmations

## Controlled vs Uncontrolled

### Controlled Components

Component receives `value` and `onChange` props from parent:

```typescript
const [email, setEmail] = useState('');
<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Uncontrolled Components

Component manages own state, use `defaultValue`:

```typescript
<Input label="Email" defaultValue="user@example.com" />
```

**Recommendation**: Prefer controlled components for form inputs to maintain single source of truth.

## Accessibility

All components follow WCAG 2.1 Level AA standards:

- Keyboard navigation is built-in
- Focus management is automatic
- ARIA attributes are applied correctly
- Color contrast meets accessibility requirements
- Screen reader support is included

**Important**: Always provide labels for form inputs:

```typescript
// ✅ Correct
<Input label="Email" />

// ❌ Wrong - Missing label
<Input placeholder="Enter email" />
```

## Responsive Design

Components are designed to work on all screen sizes. Use the `size` prop to control component sizing:

```typescript
// Mobile-friendly larger touch targets
<Button size="lg">Submit</Button>

// Desktop compact layouts
<Button size="sm">Save</Button>

// Default for most use cases
<Button size="md">Submit</Button>
```

## Theme Integration

All components automatically respond to theme changes via `data-theme` attribute:

```typescript
// Light theme
<html data-theme="light">
  <Button variant="filled">Submit</Button>  // Uses light theme colors
</html>

// Dark theme
<html data-theme="dark">
  <Button variant="filled">Submit</Button>  // Uses dark theme colors
</html>
```

No additional code is needed for theme support - it works automatically.
