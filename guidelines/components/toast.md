# Toast

**Purpose:** Temporary notification component that provides non-intrusive feedback to users about system events, actions, or status changes following Material Design 3 patterns.

## Import

```typescript
import { Toaster, toaster } from '@discourser/design-system';
```

## Component Structure

The Toast system consists of two parts:

1. **Toaster**: The container component that renders toast notifications (placed once in your app layout)
2. **toaster**: The imperative API for creating and managing toast notifications

### Basic Setup

```typescript
// In your root layout or App component
import { Toaster } from '@discourser/design-system';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
```

## Toast Types

The Toast component supports 4 types, each with specific visual indicators:

| Type      | Icon        | Usage                  | When to Use                                                    |
| --------- | ----------- | ---------------------- | -------------------------------------------------------------- |
| `success` | CheckCircle | Successful operations  | Form submissions, save confirmations, successful deletions     |
| `error`   | CircleX     | Error states           | Failed operations, validation errors, system errors            |
| `warning` | CircleAlert | Warning messages       | Cautionary information, potential issues, confirmations needed |
| `loading` | Spinner     | In-progress operations | Async operations, file uploads, data fetching                  |

### Visual Characteristics

- **success**: Green checkmark icon, positive feedback
- **error**: Red X icon, critical attention
- **warning**: Yellow alert icon, caution indicator
- **loading**: Animated spinner, ongoing process

## Toaster Configuration

The toaster is created with the following default configuration:

| Option            | Default        | Description                       |
| ----------------- | -------------- | --------------------------------- |
| `placement`       | `'bottom-end'` | Position of toast notifications   |
| `pauseOnPageIdle` | `true`         | Pause timers when page is idle    |
| `overlap`         | `true`         | Stack toasts on top of each other |
| `max`             | `5`            | Maximum number of visible toasts  |

### Placement Options

- `top-start`, `top`, `top-end`
- `bottom-start`, `bottom`, `bottom-end`

## Toaster API

### Creating Toasts

```typescript
// Basic toast with title only
toaster.create({
  title: 'Action completed',
  type: 'success',
});

// Toast with title and description
toaster.create({
  title: 'Error occurred',
  description: 'Unable to save your changes. Please try again.',
  type: 'error',
});

// Toast with custom duration (in milliseconds)
toaster.create({
  title: 'Processing...',
  type: 'loading',
  duration: 5000, // 5 seconds
});

// Toast with action button
toaster.create({
  title: 'Item deleted',
  description: 'The item has been removed.',
  type: 'success',
  action: {
    label: 'Undo',
    onClick: () => handleUndo(),
  },
});

// Toast without auto-dismiss
toaster.create({
  title: 'Important message',
  description: 'This will stay until closed.',
  type: 'warning',
  duration: Infinity,
});

// Closable toast (shows close button)
toaster.create({
  title: 'Notification',
  type: 'success',
  closable: true,
});
```

### Managing Toasts

```typescript
// Create and store toast ID for later control
const toastId = toaster.create({
  title: 'Processing...',
  type: 'loading',
});

// Update existing toast
toaster.update(toastId, {
  title: 'Success!',
  type: 'success',
  duration: 3000,
});

// Dismiss specific toast
toaster.dismiss(toastId);

// Dismiss all toasts
toaster.dismissAll();

// Remove specific toast (immediate, no animation)
toaster.remove(toastId);

// Check if toast exists
const exists = toaster.isVisible(toastId);

// Get toast details
const toast = toaster.getById(toastId);
```

## Toast Properties

| Property      | Type                                             | Default        | Description                                           |
| ------------- | ------------------------------------------------ | -------------- | ----------------------------------------------------- |
| `title`       | `string`                                         | Required       | Main toast message                                    |
| `description` | `string`                                         | -              | Additional details or context                         |
| `type`        | `'success' \| 'error' \| 'warning' \| 'loading'` | -              | Visual style and icon                                 |
| `duration`    | `number`                                         | `5000`         | Auto-dismiss duration in ms (Infinity for persistent) |
| `closable`    | `boolean`                                        | `false`        | Show close button                                     |
| `action`      | `{ label: string, onClick: () => void }`         | -              | Action button configuration                           |
| `id`          | `string`                                         | Auto-generated | Unique toast identifier                               |

## Examples

### Success Toast

```typescript
// Simple success message
toaster.create({
  title: 'Profile updated',
  type: 'success',
});

// Success with details
toaster.create({
  title: 'Changes saved',
  description: 'Your profile has been updated successfully.',
  type: 'success',
  duration: 4000,
});

// Success with undo action
toaster.create({
  title: 'Item deleted',
  description: 'The file has been moved to trash.',
  type: 'success',
  action: {
    label: 'Undo',
    onClick: () => restoreItem(),
  },
});
```

### Error Toast

```typescript
// Simple error
toaster.create({
  title: 'Error saving changes',
  type: 'error',
});

// Error with explanation
toaster.create({
  title: 'Connection failed',
  description:
    'Unable to connect to the server. Please check your internet connection.',
  type: 'error',
  duration: 7000,
});

// Error with retry action
toaster.create({
  title: 'Upload failed',
  description: 'The file could not be uploaded.',
  type: 'error',
  action: {
    label: 'Retry',
    onClick: () => retryUpload(),
  },
  closable: true,
});
```

### Warning Toast

```typescript
// Simple warning
toaster.create({
  title: 'Unsaved changes',
  type: 'warning',
});

// Warning with details
toaster.create({
  title: 'Storage almost full',
  description: 'You have used 90% of your available storage.',
  type: 'warning',
  duration: 10000,
});

// Persistent warning
toaster.create({
  title: 'Action required',
  description: 'Please verify your email address to continue.',
  type: 'warning',
  duration: Infinity,
  closable: true,
});
```

### Loading Toast

```typescript
// Simple loading
const loadingToast = toaster.create({
  title: 'Processing...',
  type: 'loading',
});

// Loading with description
const uploadToast = toaster.create({
  title: 'Uploading file',
  description: 'Please wait while we upload your file.',
  type: 'loading',
});

// Update to success when complete
setTimeout(() => {
  toaster.update(uploadToast, {
    title: 'Upload complete',
    description: 'Your file has been uploaded successfully.',
    type: 'success',
    duration: 3000,
  });
}, 3000);
```

## Common Patterns

### Form Submission Feedback

```typescript
async function handleSubmit(data: FormData) {
  const toastId = toaster.create({
    title: 'Saving changes...',
    type: 'loading',
  });

  try {
    await saveData(data);

    toaster.update(toastId, {
      title: 'Changes saved',
      description: 'Your updates have been saved successfully.',
      type: 'success',
      duration: 3000,
    });
  } catch (error) {
    toaster.update(toastId, {
      title: 'Save failed',
      description: error.message,
      type: 'error',
      duration: 5000,
    });
  }
}
```

### Async Operation with Progress

```typescript
async function uploadFile(file: File) {
  const toastId = toaster.create({
    title: 'Uploading file...',
    description: `${file.name}`,
    type: 'loading',
  });

  try {
    const result = await upload(file);

    toaster.update(toastId, {
      title: 'Upload complete',
      description: `${file.name} has been uploaded.`,
      type: 'success',
      duration: 3000,
    });

    return result;
  } catch (error) {
    toaster.update(toastId, {
      title: 'Upload failed',
      description: `Could not upload ${file.name}. ${error.message}`,
      type: 'error',
      action: {
        label: 'Retry',
        onClick: () => uploadFile(file),
      },
      closable: true,
    });
  }
}
```

### Delete with Undo

```typescript
function handleDelete(itemId: string) {
  const item = getItem(itemId);

  // Soft delete
  markAsDeleted(itemId);

  toaster.create({
    title: 'Item deleted',
    description: item.name,
    type: 'success',
    duration: 5000,
    action: {
      label: 'Undo',
      onClick: () => {
        restoreItem(itemId);
        toaster.create({
          title: 'Item restored',
          type: 'success',
        });
      },
    },
  });

  // Permanent delete after toast duration
  setTimeout(() => {
    permanentlyDelete(itemId);
  }, 5000);
}
```

### Multiple Related Operations

```typescript
async function batchOperation(items: Item[]) {
  let successCount = 0;
  let failCount = 0;

  const toastId = toaster.create({
    title: `Processing ${items.length} items...`,
    type: 'loading',
  });

  for (const item of items) {
    try {
      await processItem(item);
      successCount++;
    } catch {
      failCount++;
    }
  }

  toaster.update(toastId, {
    title: 'Batch operation complete',
    description: `${successCount} succeeded, ${failCount} failed`,
    type: failCount === 0 ? 'success' : 'warning',
    duration: 5000,
  });
}
```

### Session Timeout Warning

```typescript
function showSessionWarning(secondsRemaining: number) {
  const toastId = toaster.create({
    title: 'Session expiring soon',
    description: `Your session will expire in ${secondsRemaining} seconds.`,
    type: 'warning',
    duration: Infinity,
    closable: true,
    action: {
      label: 'Extend Session',
      onClick: async () => {
        await extendSession();
        toaster.dismiss(toastId);
        toaster.create({
          title: 'Session extended',
          type: 'success',
        });
      },
    },
  });
}
```

## DO NOT

```typescript
// ❌ Don't use toasts for critical errors that require user action
toaster.create({
  title: 'Payment failed',
  type: 'error',
}); // Use a modal dialog instead

// ❌ Don't stack multiple toasts for the same operation
onClick={() => {
  toaster.create({ title: 'Starting...', type: 'loading' });
  toaster.create({ title: 'Processing...', type: 'loading' });
}} // Update the same toast instead

// ❌ Don't use very short durations
toaster.create({
  title: 'Saved',
  type: 'success',
  duration: 500, // Too fast to read
});

// ❌ Don't use toasts for complex information
toaster.create({
  title: 'Error',
  description: 'Very long error message with multiple paragraphs...',
  type: 'error',
}); // Use a dialog or dedicated error page

// ❌ Don't create toasts without type
toaster.create({
  title: 'Something happened',
}); // Always specify type for proper visual feedback

// ❌ Don't use action buttons for navigation
toaster.create({
  title: 'Success',
  action: {
    label: 'Go to Dashboard',
    onClick: () => router.push('/dashboard'),
  },
}); // Toasts should not be primary navigation

// ✅ Use proper duration based on content length
toaster.create({
  title: 'Saved',
  type: 'success',
  duration: 3000, // 3-5 seconds for simple messages
});

// ✅ Use update for state changes
const id = toaster.create({ title: 'Loading...', type: 'loading' });
toaster.update(id, { title: 'Done', type: 'success' });

// ✅ Use modals for critical information
<Dialog>
  <Dialog.Title>Payment Failed</Dialog.Title>
  <Dialog.Description>Your payment could not be processed...</Dialog.Description>
</Dialog>
```

## Accessibility

The Toast component follows WCAG 2.1 Level AA standards:

- **ARIA Role**: Uses `role="status"` for non-critical notifications
- **Live Regions**: Automatically announces toast content to screen readers
- **Keyboard Navigation**:
  - Tab focuses close button and action button
  - Enter/Space activates buttons
  - Escape dismisses closable toasts
- **Focus Management**: Does not steal focus from current interaction
- **Color Independence**: Uses icons in addition to color for type indication
- **Timing**: Respects `prefers-reduced-motion` for animations

### Accessibility Best Practices

```typescript
// ✅ Provide clear, concise messages
toaster.create({
  title: 'Profile updated successfully',
  type: 'success',
});

// ✅ Include helpful descriptions for errors
toaster.create({
  title: 'Connection error',
  description: 'Please check your internet connection and try again.',
  type: 'error',
});

// ✅ Use appropriate durations for content length
toaster.create({
  title: 'Short message',
  type: 'success',
  duration: 3000, // 3 seconds
});

toaster.create({
  title: 'Longer message',
  description: 'Additional context that takes more time to read.',
  type: 'warning',
  duration: 7000, // 7 seconds
});

// ✅ Make important toasts closable
toaster.create({
  title: 'Important update',
  description: 'System maintenance scheduled for tonight.',
  type: 'warning',
  duration: Infinity,
  closable: true,
});

// ✅ Provide meaningful action labels
toaster.create({
  title: 'Item deleted',
  type: 'success',
  action: {
    label: 'Undo deletion', // Descriptive, not just "Undo"
    onClick: handleUndo,
  },
});
```

## Duration Guidelines

| Content Type             | Recommended Duration | Reasoning                                        |
| ------------------------ | -------------------- | ------------------------------------------------ |
| Simple success message   | 3-4 seconds          | Quick confirmation, doesn't need long visibility |
| Error with description   | 5-7 seconds          | User needs time to read and understand           |
| Warning message          | 7-10 seconds         | Important information, needs attention           |
| Loading state            | Infinity             | Should be dismissed programmatically             |
| Message with action      | 5-10 seconds         | User needs time to read and decide               |
| Critical persistent info | Infinity + closable  | Stays until user acknowledges                    |

**Formula**: Base 3 seconds + 1 second per 10 words in description

## Type Selection Guide

| Scenario             | Recommended Type | Reasoning                                 |
| -------------------- | ---------------- | ----------------------------------------- |
| Form saved           | `success`        | Positive confirmation of completed action |
| Item created         | `success`        | New resource successfully created         |
| Item deleted         | `success`        | Destructive action completed (with undo)  |
| Validation error     | `error`          | User input needs correction               |
| Network error        | `error`          | Operation failed due to connectivity      |
| Server error         | `error`          | Backend operation failed                  |
| Unsaved changes      | `warning`        | User might lose data                      |
| Low storage          | `warning`        | Approaching limit, action recommended     |
| Permission issue     | `warning`        | Limited functionality available           |
| File uploading       | `loading`        | Async operation in progress               |
| Data fetching        | `loading`        | Loading state for async operation         |
| API call in progress | `loading`        | Waiting for server response               |

## Responsive Considerations

```typescript
// The Toaster component automatically adjusts for mobile
// It uses `insetInline={{ mdDown: '4' }}` for proper spacing

// Desktop: Toasts appear in bottom-end corner
// Mobile: Toasts have 4-unit horizontal padding for better visibility

// Ensure touch-friendly action buttons
toaster.create({
  title: 'Action required',
  type: 'warning',
  action: {
    label: 'Dismiss', // Short label for mobile
    onClick: handleDismiss,
  },
  closable: true, // Provides alternative way to dismiss
});
```

## Testing

When testing Toast components:

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster, toaster } from '@discourser/design-system';

test('creates and displays success toast', async () => {
  render(<Toaster />);

  toaster.create({
    title: 'Success message',
    type: 'success',
  });

  expect(await screen.findByText('Success message')).toBeInTheDocument();
});

test('updates loading toast to success', async () => {
  render(<Toaster />);

  const id = toaster.create({
    title: 'Loading...',
    type: 'loading',
  });

  expect(await screen.findByText('Loading...')).toBeInTheDocument();

  toaster.update(id, {
    title: 'Complete',
    type: 'success',
  });

  expect(await screen.findByText('Complete')).toBeInTheDocument();
});

test('action button triggers callback', async () => {
  const handleAction = vi.fn();
  render(<Toaster />);

  toaster.create({
    title: 'Action needed',
    type: 'warning',
    action: {
      label: 'Confirm',
      onClick: handleAction,
    },
  });

  const button = await screen.findByRole('button', { name: 'Confirm' });
  await userEvent.click(button);

  expect(handleAction).toHaveBeenCalledOnce();
});

test('dismisses toast when close button clicked', async () => {
  render(<Toaster />);

  toaster.create({
    title: 'Dismissible',
    type: 'success',
    closable: true,
  });

  const closeButton = await screen.findByRole('button', { name: /close/i });
  await userEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByText('Dismissible')).not.toBeInTheDocument();
  });
});

test('automatically dismisses after duration', async () => {
  render(<Toaster />);

  toaster.create({
    title: 'Auto dismiss',
    type: 'success',
    duration: 1000,
  });

  expect(await screen.findByText('Auto dismiss')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText('Auto dismiss')).not.toBeInTheDocument();
  }, { timeout: 2000 });
});
```

## Related Components

- **Dialog**: For critical messages requiring explicit user acknowledgment
- **Alert**: For persistent, non-dismissible contextual messages within page content
- **Banner**: For system-wide announcements or important information
- **Snackbar**: Alternative term for Toast in some design systems
