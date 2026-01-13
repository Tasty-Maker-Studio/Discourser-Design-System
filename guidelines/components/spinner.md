# Spinner

**Purpose:** Loading indicator that provides visual feedback during asynchronous operations following Material Design 3 patterns.

## When to Use This Component

Use Spinner when you need to **indicate loading or processing states** to users during async operations (data fetching, form submission, page loading).

**Decision Tree:**

| Scenario                                    | Use This             | Why                                   |
| ------------------------------------------- | -------------------- | ------------------------------------- |
| Loading data from API                       | Spinner ✅           | Indicates async operation in progress |
| Button action in progress (submitting form) | Spinner in Button ✅ | Shows action is processing            |
| Page/section loading                        | Spinner ✅           | Feedback while content loads          |
| Progress with known duration/percentage     | ProgressBar          | Shows specific progress amount        |
| Multi-step process with defined steps       | Stepper              | Shows progress through steps          |
| Indefinite wait (unknown duration)          | Spinner ✅           | Best for unknown duration             |
| Background process (non-blocking)           | Toast or Badge       | Don't block user interaction          |

**Component Comparison:**

```typescript
// ✅ Use Spinner for loading data
const [isLoading, setIsLoading] = useState(true);

{isLoading ? (
  <div className={css({ display: 'flex', justifyContent: 'center', py: 'lg' })}>
    <Spinner size="lg" />
  </div>
) : (
  <DataTable data={data} />
)}

// ✅ Use Spinner in buttons during submission
<Button disabled={isSubmitting}>
  {isSubmitting && <Spinner size="sm" />}
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>

// ✅ Use Spinner inline with text
<div className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}>
  <Spinner size="sm" />
  <span>Loading your data...</span>
</div>

// ❌ Don't use Spinner for progress with percentage
<Spinner size="md" />
<p>Loading... 45%</p>  // Wrong - should show progress bar

<ProgressBar value={45} max={100}>
  <ProgressBar.Label>Loading... 45%</ProgressBar.Label>
  <ProgressBar.Track>
    <ProgressBar.Range />
  </ProgressBar.Track>
</ProgressBar>  // Correct

// ❌ Don't use Spinner for multi-step processes
<Spinner size="md" />
<p>Step 2 of 5</p>  // Wrong - should show stepper

<Stepper currentStep={2} totalSteps={5}>
  {/* Steps */}
</Stepper>  // Correct

// ❌ Don't use Spinner alone without context
<Spinner size="md" />  // Wrong - user doesn't know what's loading

<div>
  <Spinner size="md" />
  <p>Loading products...</p>  // Correct - provides context
</div>
```

## Import

```typescript
import { Spinner } from '@discourser/design-system';
```

## Sizes

| Size      | Dimension | Usage                                       |
| --------- | --------- | ------------------------------------------- |
| `inherit` | 1em       | Inherits parent font size, inline with text |
| `xs`      | 12px      | Extra small, inline icons                   |
| `sm`      | 16px      | Small buttons, compact UI                   |
| `md`      | 20px      | Default, most use cases                     |
| `lg`      | 24px      | Larger buttons, sections                    |
| `xl`      | 28px      | Prominent loading states                    |
| `2xl`     | 32px      | Full page loading, hero sections            |

**Recommendation:** Use `md` for most cases. Use `sm` for buttons. Use `lg` or larger for full-page loading.

## Props

| Prop        | Type                                                         | Default | Description            |
| ----------- | ------------------------------------------------------------ | ------- | ---------------------- |
| `size`      | `'inherit' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'`  | Spinner size           |
| `className` | `string`                                                     | -       | Additional CSS classes |

**Note:** Spinner extends `HTMLAttributes<HTMLSpanElement>`, so all standard HTML span attributes are supported. The spinner inherits `currentColor` for its color.

## Examples

### Basic Usage

```typescript
import { Spinner } from '@discourser/design-system';

// Default spinner
<Spinner />

// Medium spinner (explicit)
<Spinner size="md" />

// With accessible label
<Spinner role="status" aria-label="Loading" />
```

### Different Sizes

```typescript
// Inherit size (matches text size)
<p className={css({ fontSize: '24px' })}>
  Loading <Spinner size="inherit" />
</p>

// Extra small
<Spinner size="xs" />

// Small
<Spinner size="sm" />

// Medium (default)
<Spinner size="md" />

// Large
<Spinner size="lg" />

// Extra large
<Spinner size="xl" />

// 2X Large
<Spinner size="2xl" />
```

### In Buttons

```typescript
import { Button, Spinner } from '@discourser/design-system';

const [isLoading, setIsLoading] = useState(false);

// Loading state in button
<Button disabled={isLoading}>
  {isLoading && <Spinner size="sm" />}
  {isLoading ? 'Loading...' : 'Load Data'}
</Button>

// Spinner only (icon button style)
<Button disabled={isLoading} aria-label={isLoading ? 'Loading' : 'Submit'}>
  {isLoading ? <Spinner size="sm" /> : <SendIcon />}
</Button>

// With left icon slot
<Button leftIcon={isLoading ? <Spinner size="sm" /> : null} disabled={isLoading}>
  {isLoading ? 'Submitting...' : 'Submit Form'}
</Button>
```

### Loading States

```typescript
// Page loading
const [isLoading, setIsLoading] = useState(true);

{isLoading ? (
  <div className={css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px'
  })}>
    <Spinner size="xl" />
  </div>
) : (
  <Content />
)}

// Section loading
{isLoadingSection ? (
  <div className={css({ display: 'flex', justifyContent: 'center', py: 'lg' })}>
    <Spinner size="lg" />
  </div>
) : (
  <Section />
)}

// Inline loading
<div className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}>
  <Spinner size="sm" />
  <span>Loading your messages...</span>
</div>
```

### With Context Message

```typescript
// Centered with message
<div className={css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'md',
  py: 'xl'
})}>
  <Spinner size="xl" />
  <p className={css({ color: 'fg.muted' })}>Loading your data...</p>
</div>

// Inline with message
<div className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}>
  <Spinner size="md" />
  <span>Fetching products...</span>
</div>
```

### Color Variations

```typescript
// Inherits text color (default behavior)
<div className={css({ color: 'primary' })}>
  <Spinner size="md" />
</div>

// With custom color
<div className={css({ color: 'success' })}>
  <Spinner size="md" />
  <span>Success! Loading...</span>
</div>

// Error state
<div className={css({ color: 'error' })}>
  <Spinner size="md" />
  <span>Retrying...</span>
</div>
```

### In Cards

```typescript
import { Card } from '@discourser/design-system';

<Card.Root>
  <Card.Header>
    <Card.Title>User Statistics</Card.Title>
  </Card.Header>
  <Card.Body>
    {isLoading ? (
      <div className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      })}>
        <Spinner size="lg" />
      </div>
    ) : (
      <Statistics data={data} />
    )}
  </Card.Body>
</Card.Root>
```

### In Modals/Dialogs

```typescript
import { Dialog, Spinner } from '@discourser/design-system';

<Dialog.Root open={isOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Loading Data</Dialog.Title>
    </Dialog.Header>
    <Dialog.Body>
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'md',
        py: 'xl'
      })}>
        <Spinner size="xl" />
        <p>Please wait while we fetch your information...</p>
      </div>
    </Dialog.Body>
  </Dialog.Content>
</Dialog.Root>
```

### In Input Groups

```typescript
import { InputGroup, Input, Spinner } from '@discourser/design-system';

const [isSearching, setIsSearching] = useState(false);

<InputGroup.Root size="md">
  <InputGroup.Element>
    {isSearching ? (
      <Spinner size="sm" />
    ) : (
      <SearchIcon />
    )}
  </InputGroup.Element>
  <Input placeholder="Search..." />
</InputGroup.Root>
```

### In Lists

```typescript
// Loading list item
<ul className={css({ display: 'flex', flexDirection: 'column', gap: 'sm' })}>
  <li>Item 1</li>
  <li>Item 2</li>
  {isLoadingMore && (
    <li className={css({ display: 'flex', justifyContent: 'center', py: 'md' })}>
      <Spinner size="md" />
    </li>
  )}
</ul>
```

### Full Page Loading

```typescript
// Overlay loading screen
{isLoadingPage && (
  <div className={css({
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'lg',
    bg: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999
  })}>
    <Spinner size="2xl" className={css({ color: 'white' })} />
    <p className={css({ color: 'white', fontSize: 'lg' })}>Loading application...</p>
  </div>
)}
```

## Common Patterns

### Async Data Fetching

```typescript
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, []);

return (
  <div>
    {isLoading && (
      <div className={css({ display: 'flex', justifyContent: 'center', py: 'xl' })}>
        <Spinner size="lg" />
      </div>
    )}
    {error && <p className={css({ color: 'error' })}>Error: {error}</p>}
    {data && <DataDisplay data={data} />}
  </div>
);
```

### Form Submission

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await submitForm(formData);
    toast.success('Form submitted successfully!');
  } catch (error) {
    toast.error('Failed to submit form');
  } finally {
    setIsSubmitting(false);
  }
};

<form onSubmit={handleSubmit}>
  <Input label="Name" name="name" />
  <Input label="Email" name="email" type="email" />

  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting && <Spinner size="sm" />}
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </Button>
</form>
```

### Infinite Scroll Loading

```typescript
const [items, setItems] = useState([]);
const [isLoadingMore, setIsLoadingMore] = useState(false);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  if (isLoadingMore || !hasMore) return;

  setIsLoadingMore(true);
  try {
    const newItems = await fetchMoreItems();
    setItems([...items, ...newItems]);
    setHasMore(newItems.length > 0);
  } catch (error) {
    console.error('Failed to load more items');
  } finally {
    setIsLoadingMore(false);
  }
};

<div>
  <div className={css({ display: 'grid', gap: 'md' })}>
    {items.map(item => (
      <ItemCard key={item.id} item={item} />
    ))}
  </div>

  {isLoadingMore && (
    <div className={css({ display: 'flex', justifyContent: 'center', py: 'lg' })}>
      <Spinner size="lg" />
    </div>
  )}

  {hasMore && !isLoadingMore && (
    <Button variant="outlined" onClick={loadMore}>
      Load More
    </Button>
  )}
</div>
```

### Search with Debounce

```typescript
const [searchQuery, setSearchQuery] = useState('');
const [isSearching, setIsSearching] = useState(false);
const [results, setResults] = useState([]);

useEffect(() => {
  if (!searchQuery) {
    setResults([]);
    return;
  }

  setIsSearching(true);

  const debounceTimer = setTimeout(async () => {
    try {
      const data = await searchAPI(searchQuery);
      setResults(data);
    } catch (error) {
      console.error('Search failed');
    } finally {
      setIsSearching(false);
    }
  }, 300);

  return () => clearTimeout(debounceTimer);
}, [searchQuery]);

<div>
  <InputGroup.Root size="md">
    <InputGroup.Element>
      {isSearching ? (
        <Spinner size="sm" />
      ) : (
        <SearchIcon />
      )}
    </InputGroup.Element>
    <Input
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </InputGroup.Root>

  <div className={css({ mt: 'md' })}>
    {results.map(result => (
      <ResultItem key={result.id} result={result} />
    ))}
  </div>
</div>
```

### Skeleton Loading Alternative

```typescript
// Use spinner for simple loading
{isLoading ? (
  <div className={css({ display: 'flex', justifyContent: 'center', py: 'lg' })}>
    <Spinner size="lg" />
  </div>
) : (
  <Content />
)}

// Or use skeleton for better UX (shows layout)
{isLoading ? (
  <Skeleton>
    <Skeleton.Text lines={3} />
    <Skeleton.Rectangle height="200px" />
  </Skeleton>
) : (
  <Content />
)}
```

## DO NOT

```typescript
// ❌ Don't use Spinner without context
<Spinner size="md" />  // Wrong - user doesn't know what's loading

// ✅ Provide context
<div className={css({ display: 'flex', alignItems: 'center', gap: 'sm' })}>
  <Spinner size="md" />
  <span>Loading products...</span>
</div>

// ❌ Don't use Spinner for progress with percentage
<Spinner size="md" />
<p>45% complete</p>  // Wrong - use ProgressBar

// ✅ Use ProgressBar for known progress
<ProgressBar value={45} max={100} />

// ❌ Don't override animation with inline styles
<Spinner style={{ animation: 'none' }} />  // Wrong - breaks functionality

// ❌ Don't use wrong size for context
<Button>
  <Spinner size="2xl" />  // Wrong - too large for button
  Submit
</Button>

// ✅ Match size to context
<Button>
  <Spinner size="sm" />
  Submit
</Button>

// ❌ Don't use multiple spinners for single operation
<div>
  <Spinner size="md" />
  <Spinner size="lg" />  // Wrong - confusing
  <p>Loading...</p>
</div>

// ✅ Use one spinner per loading state
<div>
  <Spinner size="lg" />
  <p>Loading...</p>
</div>

// ❌ Don't show spinner without disabling interaction
<Button onClick={handleClick}>
  <Spinner size="sm" />
  Submit
</Button>  // Wrong - button still clickable

// ✅ Disable during loading
<Button onClick={handleClick} disabled={isLoading}>
  {isLoading && <Spinner size="sm" />}
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>
```

## Accessibility

The Spinner component follows WCAG 2.1 Level AA standards:

- **ARIA Attributes**: Use `role="status"` for loading announcements
- **Screen Reader Labels**: Provide `aria-label` to describe what's loading
- **Live Regions**: Consider `aria-live` for dynamic updates
- **Focus Management**: Don't trap focus during loading
- **Timeout Considerations**: Provide way to cancel long operations

### Accessibility Best Practices

```typescript
// ✅ Provide status role and label
<Spinner role="status" aria-label="Loading content" />

// ✅ Use with descriptive text
<div role="status" aria-live="polite">
  <Spinner size="md" />
  <span>Loading your dashboard...</span>
</div>

// ✅ Announce loading to screen readers
<div>
  <Spinner role="status" aria-label="Searching products" />
  <span className="sr-only">Searching products, please wait...</span>
</div>

// ✅ Provide cancel option for long operations
<div>
  <Spinner size="lg" />
  <p>This might take a few minutes...</p>
  <Button variant="outlined" onClick={handleCancel}>
    Cancel
  </Button>
</div>

// ✅ Update aria-label dynamically
<Spinner
  role="status"
  aria-label={`Loading step ${currentStep} of ${totalSteps}`}
/>

// ✅ Hide decorative spinners from screen readers
<Spinner aria-hidden="true" />
<p>Loading...</p>  // Text provides context instead
```

## Size Selection Guide

| Scenario           | Recommended Size | Reasoning                    |
| ------------------ | ---------------- | ---------------------------- |
| Inline with text   | `inherit`        | Matches text size            |
| Small buttons      | `sm`             | Fits button padding          |
| Medium buttons     | `sm` or `md`     | Proportional to button       |
| Large buttons      | `md` or `lg`     | Matches larger button        |
| Input fields       | `sm`             | Fits input height            |
| Cards/sections     | `lg`             | Visible but not overwhelming |
| Full page loading  | `xl` or `2xl`    | Prominent, clear indication  |
| Icon size elements | `xs` to `sm`     | Matches icon sizing          |

## State Behaviors

| State        | Visual Change                    | Behavior                  |
| ------------ | -------------------------------- | ------------------------- |
| **Loading**  | Continuous rotation              | Indicates ongoing process |
| **Complete** | Hidden/removed                   | Operation finished        |
| **Error**    | Replaced with error icon/message | Operation failed          |

## Responsive Considerations

```typescript
// Responsive sizing
<Spinner size={{ base: 'lg', md: 'md' }} />

// Responsive loading layout
<div className={css({
  display: 'flex',
  flexDirection: { base: 'column', md: 'row' },
  alignItems: 'center',
  gap: 'md'
})}>
  <Spinner size={{ base: 'xl', md: 'lg' }} />
  <p>Loading your content...</p>
</div>

// Mobile-optimized full-page loading
<div className={css({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bg: 'bg.default'
})}>
  <Spinner size={{ base: '2xl', md: 'xl' }} />
</div>
```

## Testing

```typescript
import { render, screen } from '@testing-library/react';

test('spinner renders with correct role', () => {
  render(<Spinner role="status" aria-label="Loading" />);

  const spinner = screen.getByRole('status');
  expect(spinner).toBeInTheDocument();
  expect(spinner).toHaveAttribute('aria-label', 'Loading');
});

test('spinner shows during loading', () => {
  const { rerender } = render(
    <div>
      {true && <Spinner data-testid="spinner" />}
      <p>Content</p>
    </div>
  );

  expect(screen.getByTestId('spinner')).toBeInTheDocument();

  rerender(
    <div>
      {false && <Spinner data-testid="spinner" />}
      <p>Content</p>
    </div>
  );

  expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
});

test('button is disabled while spinner is shown', () => {
  const isLoading = true;

  render(
    <Button disabled={isLoading}>
      {isLoading && <Spinner size="sm" />}
      {isLoading ? 'Loading...' : 'Submit'}
    </Button>
  );

  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

## Performance Considerations

```typescript
// ✅ Conditional rendering for better performance
{isLoading && <Spinner size="md" />}

// ✅ Avoid unnecessary re-renders
const MemoizedSpinner = memo(Spinner);

// ✅ Show spinner only after delay (avoid flash for quick operations)
const [showSpinner, setShowSpinner] = useState(false);

useEffect(() => {
  if (isLoading) {
    const timer = setTimeout(() => setShowSpinner(true), 300);
    return () => clearTimeout(timer);
  } else {
    setShowSpinner(false);
  }
}, [isLoading]);

return showSpinner ? <Spinner size="md" /> : null;
```

## Related Components

- **ProgressBar** - For operations with known progress percentage
- **Skeleton** - For placeholder content during loading
- **Button** - Often contains spinner during loading states
- **Toast** - For background operation notifications
