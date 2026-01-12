# Badge

**Purpose:** Compact visual indicator for displaying status, labels, counts, or categories following Material Design 3 patterns.

## Import

```typescript
import { Badge } from '@discourser/design-system';
```

## Variants

The Badge component supports 4 visual variants, each with specific use cases:

| Variant   | Visual Style                                 | Usage                     | When to Use                                        |
| --------- | -------------------------------------------- | ------------------------- | -------------------------------------------------- |
| `subtle`  | Light background with colored text           | Default status indicators | General labels, categories, non-critical status    |
| `solid`   | Solid color background with contrasting text | High emphasis indicators  | Important status, featured items, primary labels   |
| `surface` | Surface background with border               | Outlined status           | Secondary emphasis, grouped badges, neutral labels |
| `outline` | Transparent background with border           | Minimal emphasis          | Tertiary labels, tags, filters                     |

### Visual Characteristics

- **subtle**: Uses `colorPalette.subtle.bg` background with `colorPalette.subtle.fg` text
- **solid**: Uses `colorPalette.solid.bg` background with `colorPalette.solid.fg` text (highest contrast)
- **surface**: Uses `colorPalette.surface.bg` background with 1px border and `colorPalette.surface.fg` text
- **outline**: Transparent background with 1px `colorPalette.outline.border` and `colorPalette.outline.fg` text

## Sizes

| Size  | Height     | Padding (Horizontal) | Font Size | Icon Size  | Gap       | Usage                                 |
| ----- | ---------- | -------------------- | --------- | ---------- | --------- | ------------------------------------- |
| `sm`  | 18px (4.5) | 6px (1.5)            | xs        | 10px (2.5) | 2px (0.5) | Compact UI, dense tables, inline text |
| `md`  | 20px (5)   | 8px (2)              | xs        | 12px (3)   | 4px (1)   | Default, most use cases               |
| `lg`  | 22px (5.5) | 10px (2.5)           | xs        | 14px (3.5) | 4px (1)   | Prominent labels, touch targets       |
| `xl`  | 24px (6)   | 10px (2.5)           | sm        | 16px (4)   | 6px (1.5) | Large displays, featured items        |
| `2xl` | 28px (7)   | 12px (3)             | md        | 18px (4.5) | 6px (1.5) | Hero sections, marketing emphasis     |

**Recommendation:** Use `md` for most cases. Use `sm` for dense layouts or inline badges. Use `lg` or larger for touch interfaces.

## Props

| Prop        | Type                                            | Default    | Description                                 |
| ----------- | ----------------------------------------------- | ---------- | ------------------------------------------- |
| `variant`   | `'subtle' \| 'solid' \| 'surface' \| 'outline'` | `'subtle'` | Visual style variant                        |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`         | `'md'`     | Badge size                                  |
| `children`  | `ReactNode`                                     | Required   | Badge content (text, icons, or combination) |
| `className` | `string`                                        | -          | Additional CSS classes (use sparingly)      |

**Note:** Badge extends `HTMLAttributes<HTMLDivElement>`, so all standard HTML div attributes are supported.

## Color Palettes

Badges support dynamic color palettes using Panda CSS color palette system:

```typescript
// Use colorPalette prop to change badge colors
<Badge colorPalette="primary">Primary</Badge>
<Badge colorPalette="success">Success</Badge>
<Badge colorPalette="warning">Warning</Badge>
<Badge colorPalette="danger">Danger</Badge>
<Badge colorPalette="info">Info</Badge>
<Badge colorPalette="neutral">Neutral</Badge>
```

## Examples

### Basic Usage

```typescript
// Default badge (subtle variant)
<Badge>New</Badge>

// Different variants
<Badge variant="subtle">Pending</Badge>
<Badge variant="solid">Active</Badge>
<Badge variant="surface">Draft</Badge>
<Badge variant="outline">Optional</Badge>
```

### Semantic Status Badges

```typescript
// Success status
<Badge colorPalette="success" variant="subtle">
  Completed
</Badge>

// Warning status
<Badge colorPalette="warning" variant="solid">
  Attention Required
</Badge>

// Error status
<Badge colorPalette="danger" variant="surface">
  Failed
</Badge>

// Info status
<Badge colorPalette="info" variant="outline">
  Information
</Badge>
```

### Different Sizes

```typescript
// Small badges for compact layouts
<Badge size="sm">Small</Badge>

// Default size
<Badge size="md">Medium</Badge>

// Large badges for emphasis
<Badge size="lg">Large</Badge>

// Extra large for hero sections
<Badge size="xl">Extra Large</Badge>

// Maximum size
<Badge size="2xl">Huge</Badge>
```

### With Icons

```typescript
import { CheckIcon, ClockIcon, XIcon, InfoIcon } from 'your-icon-library';

// Icon before text
<Badge>
  <CheckIcon /> Verified
</Badge>

// Icon after text
<Badge>
  In Progress <ClockIcon />
</Badge>

// Icon only (ensure accessible label)
<Badge aria-label="Completed">
  <CheckIcon />
</Badge>

// Multiple elements
<Badge colorPalette="success">
  <CheckIcon />
  <span>Success</span>
</Badge>
```

### Counts and Numbers

```typescript
// Notification count
<Badge variant="solid" colorPalette="danger">
  5
</Badge>

// Quantity indicator
<Badge variant="subtle">
  12 items
</Badge>

// Numeric status
<Badge colorPalette="primary">
  +99
</Badge>

// Percentage
<Badge variant="surface" colorPalette="success">
  +15%
</Badge>
```

### Category Labels

```typescript
// Product categories
<Badge colorPalette="primary">Technology</Badge>
<Badge colorPalette="purple">Design</Badge>
<Badge colorPalette="green">Marketing</Badge>

// Priority levels
<Badge variant="solid" colorPalette="danger">High Priority</Badge>
<Badge variant="subtle" colorPalette="warning">Medium Priority</Badge>
<Badge variant="outline" colorPalette="neutral">Low Priority</Badge>
```

### Tag Groups

```typescript
// Multiple tags
<div className={css({ display: 'flex', gap: '2', flexWrap: 'wrap' })}>
  <Badge variant="outline">JavaScript</Badge>
  <Badge variant="outline">React</Badge>
  <Badge variant="outline">TypeScript</Badge>
  <Badge variant="outline">Node.js</Badge>
</div>

// Removable tags
<div className={css({ display: 'flex', gap: '2' })}>
  <Badge variant="surface">
    Design
    <button aria-label="Remove Design tag">
      <XIcon />
    </button>
  </Badge>
  <Badge variant="surface">
    Development
    <button aria-label="Remove Development tag">
      <XIcon />
    </button>
  </Badge>
</div>
```

## Common Patterns

### Status Indicators in Lists

```typescript
// List with status badges
<ul>
  {items.map(item => (
    <li key={item.id} className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
      <span>{item.name}</span>
      <Badge
        colorPalette={item.status === 'active' ? 'success' : 'neutral'}
        variant="subtle"
      >
        {item.status}
      </Badge>
    </li>
  ))}
</ul>
```

### Notification Badge

```typescript
// Icon with notification count
<div className={css({ position: 'relative', display: 'inline-block' })}>
  <IconButton aria-label="Notifications">
    <BellIcon />
  </IconButton>
  <Badge
    variant="solid"
    colorPalette="danger"
    size="sm"
    className={css({ position: 'absolute', top: '-1', right: '-1' })}
  >
    3
  </Badge>
</div>
```

### Card with Badge

```typescript
// Card featuring a badge
<Card>
  <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'start' })}>
    <Heading as="h3" size="md">Premium Plan</Heading>
    <Badge variant="solid" colorPalette="primary">
      Popular
    </Badge>
  </div>
  <p>Best value for growing teams</p>
  <Button>Choose Plan</Button>
</Card>
```

### Table Cell Badges

```typescript
// Status column in table
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(row => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>
          <Badge
            variant="subtle"
            colorPalette={row.status === 'complete' ? 'success' : 'warning'}
            size="sm"
          >
            {row.status}
          </Badge>
        </td>
        <td>
          <Badge size="sm" variant="outline">
            {row.priority}
          </Badge>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

### User Profile Badges

```typescript
// Profile with role badges
<div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
  <Avatar src={user.avatar} />
  <div>
    <div className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
      <span className={css({ fontWeight: 'bold' })}>{user.name}</span>
      <Badge variant="solid" colorPalette="primary" size="sm">
        Admin
      </Badge>
      {user.isVerified && (
        <Badge variant="subtle" colorPalette="success" size="sm">
          <CheckIcon /> Verified
        </Badge>
      )}
    </div>
    <p className={css({ fontSize: 'sm', opacity: 0.7 })}>{user.email}</p>
  </div>
</div>
```

### Filter Tags

```typescript
// Active filters with badges
<div>
  <span className={css({ fontWeight: 'medium', mr: '3' })}>Active Filters:</span>
  <div className={css({ display: 'inline-flex', gap: '2', flexWrap: 'wrap' })}>
    {activeFilters.map(filter => (
      <Badge
        key={filter.id}
        variant="surface"
        colorPalette="primary"
      >
        {filter.label}
        <button
          onClick={() => removeFilter(filter.id)}
          aria-label={`Remove ${filter.label} filter`}
          className={css({ ml: '1', cursor: 'pointer' })}
        >
          <XIcon />
        </button>
      </Badge>
    ))}
  </div>
</div>
```

### Feature Badges

```typescript
// Product features with badges
<div className={css({ display: 'grid', gridTemplateColumns: '2', gap: '4' })}>
  <div>
    <Badge variant="solid" colorPalette="success" size="sm">
      New
    </Badge>
    <Heading as="h3" size="md" className={css({ mt: '2' })}>
      Dark Mode
    </Heading>
    <p>Beautiful dark theme for reduced eye strain</p>
  </div>
  <div>
    <Badge variant="subtle" colorPalette="warning" size="sm">
      Beta
    </Badge>
    <Heading as="h3" size="md" className={css({ mt: '2' })}>
      AI Assistant
    </Heading>
    <p>Intelligent help powered by machine learning</p>
  </div>
</div>
```

## DO NOT

```typescript
// ❌ Don't use badges for interactive buttons
<Badge onClick={handleClick}>Click Me</Badge>  // Use Button instead

// ❌ Don't overuse solid variant (reduces emphasis)
<div>
  <Badge variant="solid">Tag 1</Badge>
  <Badge variant="solid">Tag 2</Badge>
  <Badge variant="solid">Tag 3</Badge>  // Too much emphasis
</div>

// ❌ Don't use long text in badges
<Badge>This is a very long label that doesn't fit well in a badge</Badge>

// ❌ Don't mix too many color palettes
<div>
  <Badge colorPalette="red">A</Badge>
  <Badge colorPalette="blue">B</Badge>
  <Badge colorPalette="green">C</Badge>
  <Badge colorPalette="yellow">D</Badge>  // Too chaotic
</div>

// ❌ Don't use badges as primary navigation
<Badge onClick={() => navigate('/page')}>Go to Page</Badge>  // Use Link

// ❌ Don't forget accessible labels for icon-only badges
<Badge><CheckIcon /></Badge>  // No text alternative

// ❌ Don't override semantic colors inappropriately
<Badge colorPalette="success">Error</Badge>  // Misleading color

// ✅ Use appropriate variants for emphasis
<div className={css({ display: 'flex', gap: '2' })}>
  <Badge variant="solid">Featured</Badge>
  <Badge variant="subtle">Tag 1</Badge>
  <Badge variant="subtle">Tag 2</Badge>
  <Badge variant="outline">Optional</Badge>
</div>

// ✅ Keep badge text concise
<Badge>New</Badge>
<Badge>Beta</Badge>
<Badge>Coming Soon</Badge>

// ✅ Use consistent color palette
<div className={css({ display: 'flex', gap: '2' })}>
  <Badge colorPalette="primary" variant="outline">JavaScript</Badge>
  <Badge colorPalette="primary" variant="outline">React</Badge>
  <Badge colorPalette="primary" variant="outline">TypeScript</Badge>
</div>

// ✅ Match colors to meaning
<Badge colorPalette="success">Completed</Badge>
<Badge colorPalette="danger">Failed</Badge>
<Badge colorPalette="warning">Pending</Badge>

// ✅ Always provide accessible labels
<Badge aria-label="Verified user">
  <CheckIcon />
</Badge>
```

## Accessibility

The Badge component follows WCAG 2.1 Level AA standards:

- **Color Independence**: Don't rely solely on color to convey meaning
- **Text Alternative**: Provide text or aria-label for icon-only badges
- **Color Contrast**: All variants meet 4.5:1 contrast ratio
- **Non-interactive**: Badges are display elements, not interactive controls
- **Readable Text**: Minimum font size ensures legibility

### Accessibility Best Practices

```typescript
// ✅ Include text with icons
<Badge colorPalette="success">
  <CheckIcon /> Verified
</Badge>

// ✅ Provide aria-label for icon-only badges
<Badge colorPalette="success" aria-label="Verified">
  <CheckIcon />
</Badge>

// ✅ Use semantic meaning beyond color
<Badge colorPalette="danger">Failed - Try Again</Badge>  // Text clarifies status

// ✅ Screen reader friendly counts
<Badge aria-label="5 unread notifications">5</Badge>

// ✅ Accessible removable badges
<Badge variant="surface">
  Design
  <button
    aria-label="Remove Design tag"
    onClick={() => removeTag('design')}
  >
    <XIcon />
  </button>
</Badge>

// ✅ Status badges with clear meaning
<Badge
  colorPalette="warning"
  aria-label="Status: Pending approval"
>
  Pending
</Badge>
```

### Screen Reader Considerations

```typescript
// Badge content is read by screen readers
<Badge>New</Badge>  // Announces: "New"

// Combine with context for clarity
<article aria-label="New feature: Dark mode">
  <Badge colorPalette="primary">New</Badge>
  <Heading as="h3" size="md">Dark Mode</Heading>
</article>

// Use aria-hidden for decorative badges
<Badge aria-hidden="true" size="sm">
  <StarIcon />
</Badge>
<span className="sr-only">Featured item</span>
```

## Variant Selection Guide

| Scenario           | Recommended Variant | Color Palette                     | Reasoning                                |
| ------------------ | ------------------- | --------------------------------- | ---------------------------------------- |
| Status indicator   | `subtle`            | Semantic (success/warning/danger) | Clear status without overwhelming        |
| Featured item      | `solid`             | `primary`                         | Maximum emphasis for important items     |
| Category tags      | `outline`           | `neutral` or `primary`            | Minimal emphasis, clean grouping         |
| Notification count | `solid`             | `danger`                          | High visibility for urgent items         |
| Filter tags        | `surface`           | `primary`                         | Medium emphasis, distinct from content   |
| Priority labels    | `subtle` or `solid` | Semantic                          | Matches urgency level                    |
| Beta/New labels    | `solid` or `subtle` | `primary` or `warning`            | Draws attention to new features          |
| Role badges        | `subtle`            | `primary` or `neutral`            | Clear identification without distraction |

## State Behaviors

| State                      | Visual Change             | Behavior                                        |
| -------------------------- | ------------------------- | ----------------------------------------------- |
| **Default**                | Standard appearance       | Non-interactive, pure visual indicator          |
| **With interactive child** | Child element interactive | Button or link within badge can be clicked      |
| **Disabled**               | N/A                       | Badges don't have disabled state (hide instead) |

**Note:** Badges themselves are not interactive. If you need an interactive badge-like element, consider using a Button with badge styling or wrap the badge in a clickable element.

## Size Selection Guide

| Context               | Recommended Size | Reasoning                                 |
| --------------------- | ---------------- | ----------------------------------------- |
| Inline with text      | `sm`             | Matches text baseline, minimal disruption |
| Table cells           | `sm`             | Compact display in dense layouts          |
| Card headers          | `md`             | Balanced emphasis with card content       |
| List items            | `md`             | Clear visibility without overwhelming     |
| Feature highlights    | `lg` or `xl`     | Prominent display for marketing           |
| Navigation indicators | `sm` or `md`     | Visible but not distracting               |
| Notification bubbles  | `sm`             | Compact count display                     |
| Hero sections         | `xl` or `2xl`    | Large format for emphasis                 |

## Responsive Considerations

```typescript
// Responsive badge sizes
<Badge size={{ base: 'sm', md: 'md', lg: 'lg' }}>
  Responsive
</Badge>

// Hide badges on mobile for cleaner layout
<Badge className={css({ display: { base: 'none', md: 'inline-flex' } })}>
  Desktop Only
</Badge>

// Responsive badge groups
<div className={css({
  display: 'flex',
  gap: { base: '1', md: '2' },
  flexWrap: 'wrap'
})}>
  <Badge size={{ base: 'sm', md: 'md' }}>Tag 1</Badge>
  <Badge size={{ base: 'sm', md: 'md' }}>Tag 2</Badge>
  <Badge size={{ base: 'sm', md: 'md' }}>Tag 3</Badge>
</div>
```

## Testing

When testing Badge components:

```typescript
import { render, screen } from '@testing-library/react';

test('renders badge with text content', () => {
  render(<Badge>New</Badge>);

  const badge = screen.getByText('New');
  expect(badge).toBeInTheDocument();
});

test('applies correct variant styles', () => {
  const { container } = render(<Badge variant="solid">Featured</Badge>);

  const badge = container.firstChild;
  expect(badge).toHaveClass('badge');
});

test('applies correct size', () => {
  render(<Badge size="lg">Large Badge</Badge>);

  const badge = screen.getByText('Large Badge');
  expect(badge).toBeInTheDocument();
});

test('applies color palette', () => {
  render(<Badge colorPalette="success">Success</Badge>);

  const badge = screen.getByText('Success');
  expect(badge).toBeInTheDocument();
});

test('renders icon-only badge with aria-label', () => {
  const { container } = render(
    <Badge aria-label="Verified">
      <svg data-testid="check-icon" />
    </Badge>
  );

  const badge = container.firstChild;
  expect(badge).toHaveAttribute('aria-label', 'Verified');
  expect(screen.getByTestId('check-icon')).toBeInTheDocument();
});

test('renders badge with icon and text', () => {
  render(
    <Badge>
      <svg data-testid="icon" />
      <span>Verified</span>
    </Badge>
  );

  expect(screen.getByTestId('icon')).toBeInTheDocument();
  expect(screen.getByText('Verified')).toBeInTheDocument();
});

test('accepts custom className', () => {
  const { container } = render(
    <Badge className="custom-badge">Custom</Badge>
  );

  const badge = container.firstChild;
  expect(badge).toHaveClass('custom-badge');
});

test('badge is not interactive by default', () => {
  const handleClick = vi.fn();
  const { container } = render(
    <Badge onClick={handleClick}>Click Me</Badge>
  );

  const badge = container.firstChild as HTMLElement;
  badge.click();

  expect(handleClick).toHaveBeenCalled();  // onClick is passed through but not recommended
});
```

## Related Components

- **Button**: For interactive badge-like elements
- **Chip**: For interactive, removable tags (if implemented)
- **Tag**: Alternative name for similar component patterns
- **IconButton**: For interactive icon elements
- **Heading**: Often paired with badges in headers
- **Card**: Frequently contains status badges
- **Avatar**: Often displayed with role or status badges
