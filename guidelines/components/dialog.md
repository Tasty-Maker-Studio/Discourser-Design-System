# Dialog

**Purpose:** Modal overlay component for focused tasks, confirmations, and important information following Material Design 3 patterns.

## Import

```typescript
import { Dialog } from '@discourser/design-system';
```

## Overview

The Dialog component creates modal overlays that:
- Block interaction with the background content
- Display a semi-transparent backdrop (scrim)
- Center content on screen
- Support keyboard navigation (Escape to close)
- Manage focus automatically
- Prevent scroll on background content

## Sizes

| Size | Width | Min Height | Usage |
|------|-------|-----------|-------|
| `sm` | 280px | 140px | Simple confirmations, alerts |
| `md` | 560px | 200px | Default, most dialogs |
| `lg` | 800px | 300px | Forms, detailed content |
| `fullscreen` | 100vw × 100vh | - | Mobile-optimized, complex flows |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Whether the dialog is open (controlled) |
| `onOpenChange` | `(details: { open: boolean }) => void` | - | Callback when open state changes |
| `title` | `string` | - | Dialog title (headlineSmall) |
| `description` | `string` | - | Dialog description/content (bodyMedium) |
| `children` | `ReactNode` | - | Custom dialog content (alternative to description) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'fullscreen'` | `'md'` | Dialog size |
| `showCloseButton` | `boolean` | `true` | Whether to show the close button |
| `closeLabel` | `string` | `'Close'` | Accessible label for close button |

## Examples

### Basic Usage

```typescript
const [open, setOpen] = useState(false);

// Simple confirmation dialog
<>
  <Button onClick={() => setOpen(true)}>Open Dialog</Button>

  <Dialog
    open={open}
    onOpenChange={({ open }) => setOpen(open)}
    title="Confirm Action"
    description="Are you sure you want to proceed? This action cannot be undone."
  />
</>
```

### With Custom Content

```typescript
const [open, setOpen] = useState(false);

<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Create New Project"
  size="md"
>
  <div className={css({ p: 'lg', display: 'flex', flexDirection: 'column', gap: 'md' })}>
    <Input label="Project Name" />
    <Input label="Description" />
    <div className={css({ display: 'flex', gap: 'sm', justifyContent: 'flex-end', mt: 'md' })}>
      <Button variant="text" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="filled" onClick={handleCreate}>
        Create
      </Button>
    </div>
  </div>
</Dialog>
```

### Different Sizes

```typescript
// Small (alerts, confirmations)
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  size="sm"
  title="Delete Item?"
  description="This action cannot be undone."
/>

// Medium (default)
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  size="md"
  title="Edit Profile"
>
  {/* Form content */}
</Dialog>

// Large (forms, detailed content)
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  size="lg"
  title="Settings"
>
  {/* Complex settings UI */}
</Dialog>

// Fullscreen (mobile-optimized)
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  size="fullscreen"
  title="Full Editor"
>
  {/* Full-page editor */}
</Dialog>
```

### Without Close Button

```typescript
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Please Wait"
  description="Processing your request..."
  showCloseButton={false}
/>
```

## Common Patterns

### Confirmation Dialog

```typescript
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);

const handleDelete = async () => {
  setIsDeleting(true);
  await deleteItem();
  setIsDeleting(false);
  setDeleteDialogOpen(false);
};

<Dialog
  open={deleteDialogOpen}
  onOpenChange={({ open }) => setDeleteDialogOpen(open)}
  title="Delete Item?"
  size="sm"
>
  <div className={css({ p: 'lg' })}>
    <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant', mb: 'lg' })}>
      This action cannot be undone. The item will be permanently deleted.
    </p>
    <div className={css({ display: 'flex', gap: 'sm', justifyContent: 'flex-end' })}>
      <Button variant="text" onClick={() => setDeleteDialogOpen(false)}>
        Cancel
      </Button>
      <Button variant="filled" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  </div>
</Dialog>
```

### Form Dialog

```typescript
const [open, setOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  // Process form
  setOpen(false);
};

<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Contact Information"
  size="md"
>
  <form onSubmit={handleSubmit}>
    <div className={css({ p: 'lg', display: 'flex', flexDirection: 'column', gap: 'md' })}>
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
      <div className={css({ display: 'flex', gap: 'sm', justifyContent: 'flex-end', mt: 'md' })}>
        <Button type="button" variant="text" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" variant="filled">
          Save
        </Button>
      </div>
    </div>
  </form>
</Dialog>
```

### Alert Dialog

```typescript
<Dialog
  open={alertOpen}
  onOpenChange={({ open }) => setAlertOpen(open)}
  title="Success!"
  size="sm"
>
  <div className={css({ p: 'lg' })}>
    <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant', mb: 'lg' })}>
      Your changes have been saved successfully.
    </p>
    <div className={css({ display: 'flex', justifyContent: 'flex-end' })}>
      <Button variant="filled" onClick={() => setAlertOpen(false)}>
        OK
      </Button>
    </div>
  </div>
</Dialog>
```

### Loading Dialog

```typescript
<Dialog
  open={loading}
  onOpenChange={() => {}}  // Cannot close while loading
  title="Processing"
  showCloseButton={false}
  size="sm"
>
  <div className={css({ p: 'lg', textAlign: 'center' })}>
    <Spinner className={css({ mb: 'md' })} />
    <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
      Please wait while we process your request...
    </p>
  </div>
</Dialog>
```

## DO NOT

```typescript
// ❌ Don't use div or custom modal (use Dialog component)
<div className="modal-overlay">
  <div className="modal-content">...</div>
</div>  // Use <Dialog> instead

// ❌ Don't forget controlled state
<Dialog title="Test">...</Dialog>  // Missing open/onOpenChange

// ✅ Always control the dialog state
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Test"
>
  ...
</Dialog>

// ❌ Don't nest dialogs
<Dialog open={open1}>
  <Dialog open={open2}>...</Dialog>  // Avoid nested dialogs
</Dialog>

// ❌ Don't override backdrop/scrim styles heavily
<Dialog
  style={{ backgroundColor: 'red' }}  // Don't do this
  title="Test"
/>

// ❌ Don't use fullscreen for simple confirmations
<Dialog size="fullscreen" title="Delete item?">  // Overkill
  ...
</Dialog>

// ✅ Use appropriate sizes
<Dialog size="sm" title="Delete item?">
  ...
</Dialog>
```

## Accessibility

The Dialog component follows WCAG 2.1 Level AA standards:

- **Focus Management**: Automatically traps focus within dialog
- **Keyboard Navigation**: Escape key closes dialog, Tab cycles through elements
- **ARIA Attributes**: Proper role, aria-modal, aria-labelledby applied
- **Focus Restoration**: Returns focus to trigger element on close
- **Screen Reader Support**: Title and description properly associated

### Accessibility Best Practices

```typescript
// ✅ Always provide a title
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Confirm Deletion"  // Required for accessibility
>
  ...
</Dialog>

// ✅ Provide descriptive close button label
<Dialog
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Settings"
  closeLabel="Close settings dialog"
>
  ...
</Dialog>

// ✅ Use semantic button elements for actions
<Dialog open={open} onOpenChange={({ open }) => setOpen(open)} title="Confirm">
  <div className={css({ p: 'lg' })}>
    <p>Are you sure?</p>
    <Button variant="text">Cancel</Button>  {/* Semantic button */}
    <Button variant="filled">Confirm</Button>
  </div>
</Dialog>

// ✅ Ensure proper reading order
// Dialog content should follow logical reading order (title → description → actions)
```

## Size Selection Guide

| Scenario | Recommended Size | Reasoning |
|----------|-----------------|-----------|
| Simple confirmation | `sm` | Minimal content, quick decision |
| Alerts | `sm` | Brief message, single action |
| Forms (2-3 fields) | `md` | Standard forms, most common |
| Settings/Preferences | `lg` | Multiple sections, complex UI |
| Mobile editor/viewer | `fullscreen` | Maximize screen space |
| Multi-step wizard | `lg` or `fullscreen` | Complex flow needs space |

## State Behaviors

| State | Visual Change | Behavior |
|-------|---------------|----------|
| **Opening** | Fade in + scale animation | Backdrop fades, content scales up |
| **Open** | Fully visible | Modal state, focus trapped |
| **Closing** | Fade out + scale animation | Backdrop fades, content scales down |
| **Backdrop Click** | Closes dialog | Click outside closes (default Ark UI behavior) |
| **Escape Key** | Closes dialog | Keyboard shortcut to close |

## Backdrop Behavior

The backdrop (scrim) behind the dialog:
- Uses `scrim` color token (#000000)
- 40% opacity
- Blocks all background interactions
- Clicking backdrop closes dialog (can be disabled via Ark UI props)

## Focus Management

The Dialog component automatically:
1. **Traps focus** within the dialog when open
2. **Focuses first focusable element** when opened (typically close button or first input)
3. **Restores focus** to the trigger element when closed
4. **Prevents Tab** from leaving the dialog

## Responsive Considerations

```typescript
// Mobile: Use fullscreen for complex dialogs
<Dialog
  size={{ base: 'fullscreen', md: 'md' }}
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Settings"
>
  {/* Complex settings */}
</Dialog>

// Mobile: Reduce to sm for simple dialogs
<Dialog
  size={{ base: 'sm', md: 'md' }}
  open={open}
  onOpenChange={({ open }) => setOpen(open)}
  title="Confirm"
>
  {/* Simple confirmation */}
</Dialog>
```

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('dialog opens and closes', async () => {
  const { rerender } = render(
    <Dialog open={false} onOpenChange={() => {}} title="Test">
      Dialog content
    </Dialog>
  );

  expect(screen.queryByText('Dialog content')).not.toBeInTheDocument();

  rerender(
    <Dialog open={true} onOpenChange={() => {}} title="Test">
      Dialog content
    </Dialog>
  );

  expect(screen.getByText('Dialog content')).toBeInTheDocument();
});

test('dialog close button triggers onOpenChange', async () => {
  const handleOpenChange = vi.fn();
  render(
    <Dialog open={true} onOpenChange={handleOpenChange} title="Test">
      Content
    </Dialog>
  );

  const closeButton = screen.getByLabelText('Close');
  await userEvent.click(closeButton);

  expect(handleOpenChange).toHaveBeenCalledWith({ open: false });
});

test('dialog has proper ARIA attributes', () => {
  render(
    <Dialog open={true} onOpenChange={() => {}} title="Test Dialog">
      Content
    </Dialog>
  );

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(screen.getByText('Test Dialog')).toBeInTheDocument();
});
```
