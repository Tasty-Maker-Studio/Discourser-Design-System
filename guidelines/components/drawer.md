# Drawer

**Purpose:** A panel that slides in from the edge of the screen, used for navigation, forms, or additional content without leaving the current context. Built on Ark UI's Dialog primitive with specialized styling for edge-anchored panels.

## Import

```typescript
import { Drawer } from '@discourser/design-system';
```

## Component Structure

Drawer is a compound component built using Ark UI's Dialog primitive. It consists of several parts that work together:

### Core Components

| Component             | Purpose                                | Required    |
| --------------------- | -------------------------------------- | ----------- |
| `Drawer.Root`         | Main container and state manager       | Yes         |
| `Drawer.Trigger`      | Element that opens the drawer          | Yes         |
| `Drawer.Backdrop`     | Semi-transparent overlay behind drawer | Recommended |
| `Drawer.Positioner`   | Positions drawer at screen edge        | Yes         |
| `Drawer.Content`      | Main drawer panel                      | Yes         |
| `Drawer.Title`        | Drawer heading (for accessibility)     | Yes         |
| `Drawer.Description`  | Drawer description (for accessibility) | Recommended |
| `Drawer.CloseTrigger` | Button to close drawer                 | Recommended |

### Layout Components

| Component       | Purpose                                | Usage       |
| --------------- | -------------------------------------- | ----------- |
| `Drawer.Header` | Top section for title and close button | Recommended |
| `Drawer.Body`   | Main scrollable content area           | Recommended |
| `Drawer.Footer` | Bottom section for actions             | Optional    |

### Context

| Component        | Purpose                              |
| ---------------- | ------------------------------------ |
| `Drawer.Context` | Access drawer state programmatically |

## Variants

### Placement

Controls which edge of the screen the drawer slides from:

| Placement | Behavior                        | Usage                                   |
| --------- | ------------------------------- | --------------------------------------- |
| `start`   | Slides from left (right in RTL) | Navigation menus, filters               |
| `end`     | Slides from right (left in RTL) | Settings, detail panels, shopping carts |
| `top`     | Slides from top                 | Notifications, announcements            |
| `bottom`  | Slides from bottom              | Mobile sheets, quick actions            |

**Default:** `end`

**Animation Details:**

- `start/end`: Slides horizontally with fade, duration: slowest (open), normal (close)
- `top/bottom`: Slides vertically with fade, duration: slowest (open), normal (close)
- Uses emphasized easing curves for smooth, natural motion

### Size

Controls the width (start/end) or height (top/bottom) of the drawer:

| Size   | Dimension     | Usage                                 |
| ------ | ------------- | ------------------------------------- |
| `xs`   | 320px (20rem) | Minimal content, mobile-first         |
| `sm`   | 384px (24rem) | Standard navigation, compact forms    |
| `md`   | 448px (28rem) | Detailed forms, rich content          |
| `lg`   | 512px (32rem) | Complex panels, multi-section content |
| `xl`   | 576px (36rem) | Full-featured panels, dashboards      |
| `full` | 100vw/100dvh  | Fullscreen mode, mobile takeover      |

**Default:** `sm`

**Note:** For `top` and `bottom` placements, size controls height. For `start` and `end`, it controls width.

## Props

### Root Props

| Prop                     | Type                                             | Default        | Description                          |
| ------------------------ | ------------------------------------------------ | -------------- | ------------------------------------ |
| `placement`              | `'start' \| 'end' \| 'top' \| 'bottom'`          | `'end'`        | Screen edge to slide from            |
| `size`                   | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'sm'`         | Width/height of drawer               |
| `open`                   | `boolean`                                        | -              | Controlled open state                |
| `defaultOpen`            | `boolean`                                        | `false`        | Initial open state (uncontrolled)    |
| `onOpenChange`           | `(details: { open: boolean }) => void`           | -              | Callback when open state changes     |
| `closeOnInteractOutside` | `boolean`                                        | `true`         | Close when clicking backdrop         |
| `closeOnEscapeKeyDown`   | `boolean`                                        | `true`         | Close when pressing Escape           |
| `preventScroll`          | `boolean`                                        | `true`         | Prevent body scroll when open        |
| `unmountOnExit`          | `boolean`                                        | `true`         | Remove from DOM when closed          |
| `lazyMount`              | `boolean`                                        | `true`         | Mount content only when first opened |
| `modal`                  | `boolean`                                        | `true`         | Trap focus within drawer             |
| `id`                     | `string`                                         | auto-generated | Unique ID for accessibility          |

### Content Props

All compound components accept standard HTML attributes plus styling props from Panda CSS.

## Examples

### Basic Usage

```typescript
import { Drawer, Button } from '@discourser/design-system';
import { XIcon } from 'your-icon-library';

function BasicDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button>Open Drawer</Button>
      </Drawer.Trigger>

      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>
              This is a description of what the drawer contains
            </Drawer.Description>
            <Drawer.CloseTrigger asChild>
              <Button variant="text" size="sm">
                <XIcon />
              </Button>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body>
            <p>Main content goes here</p>
          </Drawer.Body>

          <Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <Button variant="outlined">Cancel</Button>
            </Drawer.CloseTrigger>
            <Button>Save</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
```

### Controlled Drawer

```typescript
import { useState } from 'react';
import { Drawer, Button } from '@discourser/design-system';

function ControlledDrawer() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // Save logic here
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Settings</Button>

      <Drawer.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Settings</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <Button variant="text" size="sm">
                  <XIcon />
                </Button>
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body>
              {/* Settings form */}
            </Drawer.Body>

            <Drawer.Footer>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}
```

### Different Placements

```typescript
// Navigation drawer (left side)
<Drawer.Root placement="start" size="sm">
  <Drawer.Trigger asChild>
    <Button leftIcon={<MenuIcon />}>Menu</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Navigation</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <nav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>

// Shopping cart drawer (right side)
<Drawer.Root placement="end" size="md">
  <Drawer.Trigger asChild>
    <Button rightIcon={<CartIcon />}>Cart (3)</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Shopping Cart</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {/* Cart items */}
      </Drawer.Body>
      <Drawer.Footer>
        <Button variant="filled">Checkout</Button>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>

// Mobile bottom sheet
<Drawer.Root placement="bottom" size="md">
  <Drawer.Trigger asChild>
    <Button>Share</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Share Options</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {/* Share options */}
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

### Different Sizes

```typescript
// Compact drawer for filters
<Drawer.Root size="xs">
  <Drawer.Trigger asChild>
    <Button>Filters</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Filter Results</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {/* Compact filter options */}
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>

// Large drawer for detailed content
<Drawer.Root size="lg">
  <Drawer.Trigger asChild>
    <Button>View Details</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Product Details</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {/* Rich content with images, descriptions, etc. */}
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>

// Fullscreen drawer for mobile
<Drawer.Root size="full">
  <Drawer.Trigger asChild>
    <Button>Edit Profile</Button>
  </Drawer.Trigger>
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Edit Profile</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {/* Full editing interface */}
      </Drawer.Body>
      <Drawer.Footer>
        <Button>Save Changes</Button>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

### Form in Drawer

```typescript
import { Drawer, Button, Input, Textarea } from '@discourser/design-system';
import { useState } from 'react';

function FormDrawer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form
    console.log('Form submitted:', formData);
  };

  return (
    <Drawer.Root placement="end" size="md">
      <Drawer.Trigger asChild>
        <Button>Contact Us</Button>
      </Drawer.Trigger>

      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <form onSubmit={handleSubmit}>
            <Drawer.Header>
              <Drawer.Title>Contact Form</Drawer.Title>
              <Drawer.Description>
                Send us a message and we'll get back to you soon
              </Drawer.Description>
              <Drawer.CloseTrigger asChild>
                <Button variant="text" size="sm" type="button">
                  <XIcon />
                </Button>
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body>
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Textarea
                label="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                required
              />
            </Drawer.Body>

            <Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <Button variant="outlined" type="button">Cancel</Button>
              </Drawer.CloseTrigger>
              <Button type="submit">Send Message</Button>
            </Drawer.Footer>
          </form>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
```

### Navigation Menu Drawer

```typescript
import { Drawer, Button, IconButton } from '@discourser/design-system';
import { MenuIcon, HomeIcon, SettingsIcon, UserIcon, XIcon } from 'your-icon-library';

function NavigationDrawer() {
  const menuItems = [
    { icon: <HomeIcon />, label: 'Home', href: '/' },
    { icon: <UserIcon />, label: 'Profile', href: '/profile' },
    { icon: <SettingsIcon />, label: 'Settings', href: '/settings' },
  ];

  return (
    <Drawer.Root placement="start" size="sm">
      <Drawer.Trigger asChild>
        <IconButton aria-label="Open menu">
          <MenuIcon />
        </IconButton>
      </Drawer.Trigger>

      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Menu</Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <IconButton aria-label="Close menu" variant="text" size="sm">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body>
            <nav className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3',
                    p: '3',
                    borderRadius: 'md',
                    color: 'fg.default',
                    textDecoration: 'none',
                    _hover: { bg: 'gray.a3' },
                  })}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
```

### Using Context

```typescript
import { Drawer } from '@discourser/design-system';

function DrawerWithContext() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button>Open</Button>
      </Drawer.Trigger>

      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Custom Content</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <Drawer.Context>
              {(context) => (
                <div>
                  <p>Drawer is {context.open ? 'open' : 'closed'}</p>
                  <Button onClick={() => context.setOpen(false)}>
                    Close Programmatically
                  </Button>
                </div>
              )}
            </Drawer.Context>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
```

## Common Patterns

### Confirmation Before Close

```typescript
function ConfirmCloseDrawer() {
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInteractOutside = (e: Event) => {
    if (hasChanges) {
      e.preventDefault();
      setShowConfirm(true);
    }
  };

  return (
    <>
      <Drawer.Root onInteractOutside={handleInteractOutside}>
        <Drawer.Trigger asChild>
          <Button>Edit Settings</Button>
        </Drawer.Trigger>

        <Drawer.Backdrop />

        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Settings</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <Input onChange={() => setHasChanges(true)} />
            </Drawer.Body>

            <Drawer.Footer>
              <Button>Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      {showConfirm && (
        <Dialog.Root open onOpenChange={(e) => setShowConfirm(e.open)}>
          <Dialog.Content>
            <Dialog.Title>Unsaved Changes</Dialog.Title>
            <Dialog.Description>
              You have unsaved changes. Are you sure you want to close?
            </Dialog.Description>
            <Dialog.Footer>
              <Button variant="outlined" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowConfirm(false);
                setHasChanges(false);
              }}>
                Discard Changes
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
```

### Multi-Step Drawer

```typescript
function MultiStepDrawer() {
  const [step, setStep] = useState(1);

  return (
    <Drawer.Root size="md">
      <Drawer.Trigger asChild>
        <Button>Start Wizard</Button>
      </Drawer.Trigger>

      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Setup Wizard - Step {step} of 3</Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <IconButton aria-label="Close" variant="text" size="sm">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body>
            {step === 1 && <div>Step 1 content</div>}
            {step === 2 && <div>Step 2 content</div>}
            {step === 3 && <div>Step 3 content</div>}
          </Drawer.Body>

          <Drawer.Footer>
            {step > 1 && (
              <Button variant="outlined" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <Button>Finish</Button>
            )}
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
```

### Responsive Drawer

```typescript
function ResponsiveDrawer() {
  return (
    <Drawer.Root
      placement={{ base: 'bottom', md: 'end' }}
      size={{ base: 'md', md: 'sm' }}
    >
      <Drawer.Trigger asChild>
        <Button>Open Filters</Button>
      </Drawer.Trigger>

      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Filters</Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <IconButton aria-label="Close" variant="text" size="sm">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body>
            {/* Filter options - layout adapts to placement */}
          </Drawer.Body>

          <Drawer.Footer>
            <Button variant="outlined">Clear</Button>
            <Button>Apply Filters</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
```

## DO NOT

```typescript
// ❌ Don't omit Backdrop (unless intentional)
<Drawer.Root>
  <Drawer.Positioner>
    <Drawer.Content>...</Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>

// ❌ Don't forget Positioner wrapper
<Drawer.Root>
  <Drawer.Backdrop />
  <Drawer.Content>...</Drawer.Content>  // Missing Positioner
</Drawer.Root>

// ❌ Don't omit Title (required for accessibility)
<Drawer.Content>
  <Drawer.Body>
    Content without title
  </Drawer.Body>
</Drawer.Content>

// ❌ Don't use for critical alerts or confirmations (use Dialog instead)
<Drawer.Root>
  <Drawer.Content>
    <Drawer.Title>Delete Account?</Drawer.Title>
    <Drawer.Body>This action cannot be undone</Drawer.Body>
  </Drawer.Content>
</Drawer.Root>

// ❌ Don't nest drawers
<Drawer.Root>
  <Drawer.Content>
    <Drawer.Root>  // Don't nest
      <Drawer.Content>...</Drawer.Content>
    </Drawer.Root>
  </Drawer.Content>
</Drawer.Root>

// ❌ Don't use oversized drawers for simple content
<Drawer.Root size="xl">
  <Drawer.Content>
    <Drawer.Body>
      <p>Just a simple message</p>  // Use smaller size
    </Drawer.Body>
  </Drawer.Content>
</Drawer.Root>

// ❌ Don't put primary navigation in end-placed drawer
<Drawer.Root placement="end">  // Use placement="start" for navigation
  <Drawer.Content>
    <nav>Main navigation menu</nav>
  </Drawer.Content>
</Drawer.Root>

// ✅ Correct usage
<Drawer.Root placement="start">
  <Drawer.Trigger asChild>
    <Button>Menu</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Navigation</Drawer.Title>
        <Drawer.CloseTrigger asChild>
          <IconButton aria-label="Close menu">
            <XIcon />
          </IconButton>
        </Drawer.CloseTrigger>
      </Drawer.Header>
      <Drawer.Body>
        <nav>Navigation items</nav>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

## Accessibility

The Drawer component follows WCAG 2.1 Level AA standards:

- **Focus Management**: Focus trapped within drawer when open
- **Keyboard Navigation**:
  - `Escape` key closes drawer
  - `Tab` cycles through focusable elements
  - Focus returns to trigger on close
- **Screen Reader Support**:
  - Announced as dialog/modal
  - Title required for proper announcement
  - Description recommended for context
- **ARIA Attributes**:
  - `role="dialog"` on Content
  - `aria-modal="true"` when modal
  - `aria-labelledby` references Title
  - `aria-describedby` references Description
- **Body Scroll Lock**: Prevents background scrolling when open

### Accessibility Best Practices

```typescript
// ✅ Always provide Title
<Drawer.Content>
  <Drawer.Header>
    <Drawer.Title>Settings</Drawer.Title>
  </Drawer.Header>
</Drawer.Content>

// ✅ Add Description for complex drawers
<Drawer.Header>
  <Drawer.Title>Export Data</Drawer.Title>
  <Drawer.Description>
    Choose format and options for exporting your data
  </Drawer.Description>
</Drawer.Header>

// ✅ Label close buttons
<Drawer.CloseTrigger asChild>
  <IconButton aria-label="Close drawer">
    <XIcon />
  </IconButton>
</Drawer.CloseTrigger>

// ✅ Use semantic HTML in content
<Drawer.Body>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</Drawer.Body>

// ✅ Announce dynamic changes
<Drawer.Body>
  <form aria-live="polite">
    {/* Form with validation messages */}
  </form>
</Drawer.Body>
```

## Usage Guidelines

### When to Use Drawer

| Use Case        | Why Drawer                                    |
| --------------- | --------------------------------------------- |
| Navigation menu | Slides from side, doesn't block entire screen |
| Filter panel    | Related to page content, easy to dismiss      |
| Shopping cart   | Contextual preview without leaving page       |
| Settings panel  | Secondary actions, can stay on current page   |
| Detail view     | Additional info without full page navigation  |
| Form/wizard     | Multi-step process without modal interruption |

### When NOT to Use Drawer

| Use Case               | Use Instead     | Why                                          |
| ---------------------- | --------------- | -------------------------------------------- |
| Critical confirmations | Dialog          | Center focus, harder to dismiss accidentally |
| Short messages         | Toast/Alert     | Drawer is too heavy for simple notifications |
| Quick tips             | Tooltip/Popover | Drawer is overkill for small hints           |
| Full page forms        | Separate route  | Better for complex, primary content          |
| Nested panels          | Tabs/Accordion  | Avoid drawer inception                       |

## Placement Guidelines

| Placement | Best For                  | Direction Support         |
| --------- | ------------------------- | ------------------------- |
| `start`   | Primary navigation, menus | LTR: left, RTL: right     |
| `end`     | Carts, details, settings  | LTR: right, RTL: left     |
| `top`     | Notifications, banners    | Top edge (all locales)    |
| `bottom`  | Mobile sheets, actions    | Bottom edge (all locales) |

## Size Guidelines

| Size   | Width/Height | Best For                          |
| ------ | ------------ | --------------------------------- |
| `xs`   | 320px        | Minimal menus, quick filters      |
| `sm`   | 384px        | Standard navigation, simple forms |
| `md`   | 448px        | Detailed content, shopping cart   |
| `lg`   | 512px        | Rich panels, multi-section forms  |
| `xl`   | 576px        | Dashboard panels, complex content |
| `full` | 100%         | Mobile takeover, full editing     |

## State Behaviors

| State       | Visual Change          | Behavior                                  |
| ----------- | ---------------------- | ----------------------------------------- |
| **Opening** | Slides in + fades in   | Duration: slowest (emphasized-in easing)  |
| **Open**    | Fully visible          | Focus trapped, body scroll locked         |
| **Closing** | Slides out + fades out | Duration: normal (emphasized-out easing)  |
| **Closed**  | Removed from DOM       | Focus returns to trigger, scroll restored |

## Testing

When testing Drawer components:

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer, Button } from '@discourser/design-system';

test('drawer opens and closes', async () => {
  const user = userEvent.setup();

  render(
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button>Open</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Test Drawer</Drawer.Title>
          <Drawer.Body>Content</Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <Button>Close</Button>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );

  // Initially closed
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  // Open drawer
  await user.click(screen.getByText('Open'));

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
  });

  // Close drawer
  await user.click(screen.getByText('Close'));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

test('drawer closes on backdrop click', async () => {
  const user = userEvent.setup();
  const onOpenChange = vi.fn();

  render(
    <Drawer.Root onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>
        <Button>Open</Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Test</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );

  await user.click(screen.getByText('Open'));

  const backdrop = screen.getByRole('dialog').parentElement;
  await user.click(backdrop!);

  expect(onOpenChange).toHaveBeenCalledWith({ open: false });
});

test('drawer closes on escape key', async () => {
  const user = userEvent.setup();

  render(
    <Drawer.Root defaultOpen>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Title>Test</Drawer.Title>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.keyboard('{Escape}');

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

## Related Components

- **Dialog**: Use for centered modals and critical confirmations
- **Popover**: Use for contextual menus and tooltips
- **Sheet**: Mobile-specific bottom sheet (Drawer with `placement="bottom"`)
- **Menu**: Use for dropdown menus and context menus
- **Tooltip**: Use for simple hints and help text
