# Skeleton

**Purpose:** Loading placeholder component that displays a temporary gray placeholder while content is loading, providing visual feedback and reducing perceived loading time following Material Design 3 patterns.

## When to Use This Component

Use Skeleton when you need to **show content placeholders during loading** to preserve layout and reduce perceived wait time.

### Decision Tree

| Scenario                                | Use Skeleton? | Alternative               | Reasoning                            |
| --------------------------------------- | ------------- | ------------------------- | ------------------------------------ |
| Loading cards, lists, or content blocks | ✅ Yes        | -                         | Maintains layout and shows structure |
| Loading user profiles or complex UI     | ✅ Yes        | -                         | Shows content shape while loading    |
| Loading tables or data grids            | ✅ Yes        | -                         | Preserves column structure           |
| Quick operations (under 300ms)          | ❌ No         | Nothing                   | Skeleton flash is jarring            |
| Operations with known progress          | ❌ No         | Progress bar              | Progress shows percentage complete   |
| Full page loading                       | ❌ No         | Spinner or loading screen | Skeleton is for content sections     |

### Component Comparison

```typescript
// ✅ Skeleton - Loading user cards
{isLoading ? (
  <Card>
    <HStack gap="4">
      <SkeletonCircle size="64px" />
      <Stack flex="1" gap="2">
        <Skeleton width="150px" height="20px" />
        <Skeleton width="200px" height="16px" />
        <SkeletonText noOfLines={2} />
      </Stack>
    </HStack>
  </Card>
) : (
  <UserCard user={data} />
)}

// ❌ Don't use Skeleton for progress tracking - Use Progress
{isUploading && (
  <Stack gap="2">
    <Skeleton width="full" height="8px" />
    <Skeleton width="full" height="8px" />
  </Stack>
)}

// ✅ Better: Use Progress for measurable operations
<Progress.Root value={uploadProgress} striped animated>
  <Progress.Label>Uploading...</Progress.Label>
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
  <Progress.ValueText />
</Progress.Root>

// ❌ Don't use Skeleton for instant loading - Don't show anything
{isLoading && <Skeleton width="full" height="40px" />}
{/* If loading takes < 300ms, skeleton flashes */}

// ✅ Better: Only show skeleton for longer loads
{isLoading && loadingTime > 300 && (
  <Skeleton width="full" height="40px" />
)}

// ✅ Skeleton - Article list loading
{isLoading ? (
  <Stack gap="6">
    {[...Array(3)].map((_, i) => (
      <Card key={i}>
        <Skeleton width="full" height="200px" />
        <Skeleton width="80%" height="24px" />
        <SkeletonText noOfLines={3} />
      </Card>
    ))}
  </Stack>
) : (
  <ArticleList articles={data} />
)}
```

## Import

```typescript
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@discourser/design-system';
```

## Component Variants

The Skeleton system provides three main components for different use cases:

| Component        | Purpose                       | When to Use                               |
| ---------------- | ----------------------------- | ----------------------------------------- |
| `Skeleton`       | Basic rectangular placeholder | General content blocks, images, cards     |
| `SkeletonCircle` | Circular placeholder          | Avatars, profile pictures, circular icons |
| `SkeletonText`   | Multi-line text placeholder   | Paragraphs, descriptions, text content    |

## Animation Variants

| Variant | Visual Effect          | Usage                     | When to Use                                    |
| ------- | ---------------------- | ------------------------- | ---------------------------------------------- |
| `pulse` | Gentle opacity pulsing | Default loading state     | Most loading scenarios, subtle feedback        |
| `shine` | Shimmer/wave effect    | Enhanced loading feedback | Premium feel, prominent loading states         |
| `none`  | No animation           | Static placeholder        | Reduced motion preference, minimal distraction |

### Visual Characteristics

- **pulse**: Smooth opacity fade in/out at 1.2s duration
- **shine**: Gradient wave moving across at 5s duration
- **none**: Static gray background without animation

## Props

### Skeleton

| Prop        | Type                           | Default   | Description                                |
| ----------- | ------------------------------ | --------- | ------------------------------------------ |
| `loading`   | `boolean`                      | `true`    | Whether to show skeleton or reveal content |
| `variant`   | `'pulse' \| 'shine' \| 'none'` | `'pulse'` | Animation style                            |
| `width`     | `string \| number`             | -         | Width of skeleton (CSS value)              |
| `height`    | `string \| number`             | -         | Height of skeleton (CSS value)             |
| `circle`    | `boolean`                      | `false`   | Make skeleton circular                     |
| `className` | `string`                       | -         | Additional CSS classes                     |

### SkeletonCircle

| Prop      | Type                           | Default   | Description                                |
| --------- | ------------------------------ | --------- | ------------------------------------------ |
| `loading` | `boolean`                      | `true`    | Whether to show skeleton or reveal content |
| `variant` | `'pulse' \| 'shine' \| 'none'` | `'pulse'` | Animation style                            |
| `size`    | `string \| number`             | -         | Circle size (width and height)             |

**Note:** SkeletonCircle automatically sets `circle={true}` and renders as a circular skeleton.

### SkeletonText

| Prop        | Type                           | Default   | Description                                |
| ----------- | ------------------------------ | --------- | ------------------------------------------ |
| `loading`   | `boolean`                      | `true`    | Whether to show skeleton or reveal content |
| `variant`   | `'pulse' \| 'shine' \| 'none'` | `'pulse'` | Animation style                            |
| `noOfLines` | `number`                       | `3`       | Number of text lines to display            |
| `gap`       | `string`                       | -         | Space between lines                        |
| `rootProps` | `StackProps`                   | -         | Props for the Stack container              |

**Note:** Last line is automatically set to 80% width (100% if only one line).

## Examples

### Basic Skeleton

```typescript
// Simple rectangular skeleton
<Skeleton width="200px" height="20px" />

// Custom dimensions
<Skeleton width="100%" height="300px" />

// With explicit loading state
<Skeleton loading={isLoading} width="full" height="40px">
  <Text>Loaded content appears here</Text>
</Skeleton>
```

### Skeleton Circle (Avatars)

```typescript
// Basic avatar skeleton
<SkeletonCircle size="40px" />

// Large profile picture
<SkeletonCircle size="120px" />

// With content reveal
<SkeletonCircle loading={isLoading} size="48px">
  <Avatar src={user.avatar} />
</SkeletonCircle>

// Multiple avatar sizes
<HStack gap="4">
  <SkeletonCircle size="32px" />
  <SkeletonCircle size="48px" />
  <SkeletonCircle size="64px" />
</HStack>
```

### Skeleton Text (Paragraphs)

```typescript
// Default 3 lines
<SkeletonText />

// Custom number of lines
<SkeletonText noOfLines={5} />

// Single line
<SkeletonText noOfLines={1} />

// Custom gap between lines
<SkeletonText noOfLines={4} gap="3" />

// With content reveal
<SkeletonText loading={isLoading} noOfLines={3}>
  <Text>{article.content}</Text>
</SkeletonText>

// Custom container props
<SkeletonText
  noOfLines={3}
  rootProps={{
    maxWidth: '600px',
    padding: '4',
  }}
/>
```

### Animation Variants

```typescript
// Pulse animation (default)
<Skeleton variant="pulse" width="200px" height="20px" />

// Shine animation
<Skeleton variant="shine" width="200px" height="20px" />

// No animation
<Skeleton variant="none" width="200px" height="20px" />

// Respect reduced motion preference
<Skeleton
  variant={prefersReducedMotion ? 'none' : 'shine'}
  width="full"
  height="40px"
/>
```

### Loading State Control

```typescript
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetchData().then(() => setIsLoading(false));
}, []);

// Skeleton disappears when loading is false
<Skeleton loading={isLoading} width="full" height="200px">
  <Image src={data.imageUrl} alt={data.title} />
</Skeleton>
```

## Common Patterns

### User Profile Card

```typescript
const [isLoading, setIsLoading] = useState(true);

<Card>
  <HStack gap="4" align="start">
    <SkeletonCircle loading={isLoading} size="64px">
      <Avatar src={user.avatar} size="lg" />
    </SkeletonCircle>

    <Stack flex="1" gap="2">
      <Skeleton loading={isLoading} width="150px" height="20px">
        <Heading size="md">{user.name}</Heading>
      </Skeleton>

      <Skeleton loading={isLoading} width="200px" height="16px">
        <Text color="fg.muted">{user.email}</Text>
      </Skeleton>

      <SkeletonText loading={isLoading} noOfLines={2}>
        <Text>{user.bio}</Text>
      </SkeletonText>
    </Stack>
  </HStack>
</Card>
```

### Article List

```typescript
function ArticleListSkeleton() {
  return (
    <Stack gap="6">
      {[...Array(3)].map((_, index) => (
        <Card key={index}>
          <Stack gap="3">
            {/* Cover image */}
            <Skeleton width="full" height="200px" />

            {/* Title */}
            <Skeleton width="80%" height="24px" />

            {/* Meta info */}
            <HStack gap="3">
              <SkeletonCircle size="32px" />
              <Stack gap="2" flex="1">
                <Skeleton width="120px" height="14px" />
                <Skeleton width="80px" height="12px" />
              </Stack>
            </HStack>

            {/* Description */}
            <SkeletonText noOfLines={3} />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}

function ArticleList() {
  const { data, isLoading } = useArticles();

  if (isLoading) return <ArticleListSkeleton />;

  return (
    <Stack gap="6">
      {data.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Stack>
  );
}
```

### Data Table

```typescript
function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {[...Array(columns)].map((_, i) => (
            <TableHeader key={i}>
              <Skeleton width="80px" height="16px" />
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(rows)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton
                  width={colIndex === 0 ? '120px' : '80px'}
                  height="16px"
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Comment Thread

```typescript
function CommentSkeleton() {
  return (
    <Stack gap="4">
      {[...Array(3)].map((_, index) => (
        <HStack key={index} gap="3" align="start">
          <SkeletonCircle size="40px" />

          <Stack flex="1" gap="2">
            <HStack gap="2">
              <Skeleton width="100px" height="16px" />
              <Skeleton width="60px" height="14px" />
            </HStack>

            <SkeletonText noOfLines={2} />

            <HStack gap="4">
              <Skeleton width="40px" height="14px" />
              <Skeleton width="40px" height="14px" />
            </HStack>
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
}
```

### Dashboard Statistics

```typescript
function StatsSkeleton() {
  return (
    <Grid columns={{ base: 1, md: 2, lg: 4 }} gap="4">
      {[...Array(4)].map((_, index) => (
        <Card key={index}>
          <Stack gap="3">
            <HStack justify="space-between">
              <Skeleton width="80px" height="14px" />
              <SkeletonCircle size="24px" />
            </HStack>

            <Skeleton width="100px" height="32px" />

            <Skeleton width="120px" height="12px" />
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
```

### Product Grid

```typescript
function ProductGridSkeleton({ count = 8 }) {
  return (
    <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="6">
      {[...Array(count)].map((_, index) => (
        <Card key={index}>
          <Stack gap="3">
            {/* Product image */}
            <Skeleton width="full" height="200px" />

            {/* Product name */}
            <Skeleton width="90%" height="20px" />

            {/* Price */}
            <Skeleton width="60px" height="24px" />

            {/* Rating */}
            <HStack gap="1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} width="16px" height="16px" />
              ))}
            </HStack>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
```

### Chat Messages

```typescript
function ChatSkeleton() {
  return (
    <Stack gap="4">
      {[...Array(5)].map((_, index) => {
        const isOwnMessage = index % 2 === 0;
        return (
          <HStack
            key={index}
            gap="3"
            justify={isOwnMessage ? 'flex-end' : 'flex-start'}
          >
            {!isOwnMessage && <SkeletonCircle size="32px" />}

            <Stack gap="1" maxW="70%">
              <Skeleton width="200px" height="16px" />
              <Skeleton width="150px" height="12px" />
            </Stack>

            {isOwnMessage && <SkeletonCircle size="32px" />}
          </HStack>
        );
      })}
    </Stack>
  );
}
```

### Form Fields

```typescript
function FormSkeleton() {
  return (
    <Stack gap="4">
      {[...Array(4)].map((_, index) => (
        <Stack key={index} gap="2">
          <Skeleton width="100px" height="16px" />
          <Skeleton width="full" height="40px" />
        </Stack>
      ))}

      <HStack gap="3" justify="flex-end">
        <Skeleton width="80px" height="40px" />
        <Skeleton width="100px" height="40px" />
      </HStack>
    </Stack>
  );
}
```

## DO NOT

```typescript
// ❌ Don't use skeleton for instant content
<Skeleton loading={true} width="200px" height="20px">
  <Text>Static text that loads instantly</Text>
</Skeleton> // No need for skeleton if content is immediate

// ❌ Don't forget to set dimensions
<Skeleton /> // No width or height specified

// ❌ Don't use skeleton for interactive elements
<Skeleton width="100px" height="40px">
  <Button>Click me</Button>
</Skeleton> // Use disabled state instead

// ❌ Don't overuse animations
<div>
  {[...Array(100)].map((_, i) => (
    <Skeleton key={i} variant="shine" />
  ))} // Too many animations cause performance issues
</div>

// ❌ Don't use skeleton for error states
{error && <Skeleton width="full" height="200px" />}
// Show error message instead

// ❌ Don't mix skeleton with partial content
<Card>
  <Skeleton width="200px" height="20px" />
  <Text>This text is loaded</Text> // Inconsistent loading state
</Card>

// ✅ Always set dimensions for predictable layout
<Skeleton width="200px" height="20px" />

// ✅ Use loading state from data fetching
<Skeleton loading={isLoading} width="200px" height="20px">
  <Text>{data.title}</Text>
</Skeleton>

// ✅ Show entire section as loading or loaded
{isLoading ? (
  <CardSkeleton />
) : (
  <Card>{content}</Card>
)}

// ✅ Use appropriate animation for context
<Skeleton
  variant={prefersReducedMotion ? 'none' : 'pulse'}
  width="full"
  height="200px"
/>

// ✅ Show error state explicitly
{error ? (
  <Alert variant="error">{error.message}</Alert>
) : isLoading ? (
  <Skeleton width="full" height="200px" />
) : (
  <Content data={data} />
)}
```

## Accessibility

The Skeleton component follows WCAG 2.1 Level AA standards:

- **Hidden Content**: Uses `visibility: hidden` for skeleton content to prevent screen reader announcement
- **Semantic Structure**: Maintains layout structure while loading
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **Color Independence**: Does not rely on color alone (uses animation)
- **No Focus Trap**: Skeleton elements are not focusable
- **Transparent Text**: Uses `color: transparent` to hide text during loading

### Accessibility Best Practices

```typescript
// ✅ Provide loading announcement
<div role="status" aria-live="polite" aria-busy={isLoading}>
  {isLoading ? (
    <SkeletonText noOfLines={3} />
  ) : (
    <Text>{content}</Text>
  )}
</div>

// ✅ Use aria-label for loading regions
<section aria-label="Loading articles" aria-busy={isLoading}>
  {isLoading ? (
    <ArticleListSkeleton />
  ) : (
    <ArticleList articles={data} />
  )}
</section>

// ✅ Respect reduced motion preference
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

<Skeleton
  variant={prefersReducedMotion ? 'none' : 'pulse'}
  width="200px"
  height="20px"
/>

// ✅ Announce loading state changes
<div aria-live="polite">
  {isLoading && <span className="sr-only">Loading content...</span>}
</div>

// ✅ Maintain focus management
function ContentSection() {
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      // Focus first interactive element after load
      const firstButton = contentRef.current.querySelector('button');
      firstButton?.focus();
    }
  }, [isLoading]);

  return (
    <div ref={contentRef}>
      {isLoading ? <ContentSkeleton /> : <Content />}
    </div>
  );
}
```

## Animation Selection Guide

| Scenario                    | Recommended Variant | Reasoning                                    |
| --------------------------- | ------------------- | -------------------------------------------- |
| General content loading     | `pulse`             | Subtle, not distracting, good for most cases |
| Premium/prominent content   | `shine`             | Enhanced visual feedback, modern feel        |
| User prefers reduced motion | `none`              | Respects accessibility preferences           |
| Many simultaneous skeletons | `pulse`             | Better performance than shine                |
| Quick loading (under 500ms) | `none`              | Prevents animation flash                     |
| Long loading (over 2s)      | `shine`             | Indicates activity, reduces perceived wait   |
| Background/ambient loading  | `pulse`             | Less attention-grabbing                      |

## Performance Considerations

```typescript
// ✅ Use pulse for multiple skeletons (better performance)
<Grid columns={4}>
  {[...Array(20)].map((_, i) => (
    <Skeleton key={i} variant="pulse" width="full" height="200px" />
  ))}
</Grid>

// ⚠️ Be cautious with shine for many elements
<Grid columns={4}>
  {[...Array(20)].map((_, i) => (
    <Skeleton key={i} variant="shine" width="full" height="200px" />
  ))} // Can cause performance issues
</Grid>

// ✅ Use memo for skeleton components
const ProductSkeleton = memo(() => (
  <Card>
    <Stack gap="3">
      <Skeleton width="full" height="200px" />
      <Skeleton width="90%" height="20px" />
      <Skeleton width="60px" height="24px" />
    </Stack>
  </Card>
));

// ✅ Virtualize long lists with skeletons
function VirtualizedList() {
  return (
    <VirtualList
      items={isLoading ? Array(50).fill(null) : data}
      renderItem={(item) =>
        item === null ? <ItemSkeleton /> : <Item data={item} />
      }
    />
  );
}
```

## Responsive Considerations

```typescript
// Responsive skeleton dimensions
<Skeleton
  width={{ base: 'full', md: '300px' }}
  height={{ base: '150px', md: '200px' }}
/>

// Responsive text lines
<SkeletonText
  noOfLines={{ base: 2, md: 3 }}
/>

// Responsive grid with skeletons
<Grid
  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
  gap="4"
>
  {[...Array(8)].map((_, i) => (
    <ProductSkeleton key={i} />
  ))}
</Grid>

// Mobile-optimized avatar size
<SkeletonCircle size={{ base: '48px', md: '64px' }} />
```

## Testing

When testing Skeleton components:

```typescript
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonText, SkeletonCircle } from '@discourser/design-system';

test('shows skeleton when loading', () => {
  render(
    <Skeleton loading={true} width="200px" height="20px">
      <Text>Content</Text>
    </Skeleton>
  );

  // Skeleton should be visible
  const skeleton = screen.getByTestId('skeleton'); // Add data-testid if needed
  expect(skeleton).toBeInTheDocument();

  // Content should be hidden
  expect(screen.queryByText('Content')).not.toBeVisible();
});

test('shows content when not loading', () => {
  render(
    <Skeleton loading={false} width="200px" height="20px">
      <Text>Content</Text>
    </Skeleton>
  );

  // Content should be visible
  expect(screen.getByText('Content')).toBeVisible();
});

test('renders correct number of lines for SkeletonText', () => {
  const { container } = render(<SkeletonText noOfLines={5} />);

  // Should render 5 skeleton lines
  const skeletonLines = container.querySelectorAll('[class*="skeleton"]');
  expect(skeletonLines).toHaveLength(5);
});

test('SkeletonCircle renders as circular', () => {
  const { container } = render(<SkeletonCircle size="48px" />);

  const circle = container.firstChild;
  expect(circle).toHaveStyle({
    borderRadius: '9999px',
  });
});

test('respects loading state changes', () => {
  const { rerender } = render(
    <Skeleton loading={true} width="200px" height="20px">
      <Text>Content</Text>
    </Skeleton>
  );

  expect(screen.queryByText('Content')).not.toBeVisible();

  rerender(
    <Skeleton loading={false} width="200px" height="20px">
      <Text>Content</Text>
    </Skeleton>
  );

  expect(screen.getByText('Content')).toBeVisible();
});

test('applies correct animation variant', () => {
  const { container } = render(
    <Skeleton variant="shine" width="200px" height="20px" />
  );

  const skeleton = container.firstChild;
  expect(skeleton).toHaveAttribute('data-variant', 'shine');
});
```

## Related Components

- **Spinner**: For small, inline loading indicators
- **Progress**: For determinate loading with progress indication
- **Toast**: For notifying users when content finishes loading
- **EmptyState**: For when no content is available after loading
