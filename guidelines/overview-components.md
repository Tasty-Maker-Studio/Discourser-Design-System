# Components Overview

Always prefer components from `@discourser/design-system` if available. Do not use native HTML elements when a design system component exists.

## Available Components

| Component | Purpose | Guidelines |
|-----------|---------|------------|
| Button | Primary interactive element for actions | [button.md](components/button.md) |
| Card | Container for related content with elevation | [card.md](components/card.md) |
| IconButton | Icon-only interactive element | [icon-button.md](components/icon-button.md) |
| Input | Text input with label and validation states | [input.md](components/input.md) |
| Dialog | Modal overlay for focused tasks or confirmations | [dialog.md](components/dialog.md) |
| Switch | Toggle control for binary on/off states | [switch.md](components/switch.md) |

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
