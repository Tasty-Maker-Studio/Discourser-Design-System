# Avatar

**Purpose:** Visual representation of users or entities through images, initials, or icons, providing identity context throughout the application.

## When to Use This Component

Use Avatar when you need to **visually represent a user, person, or entity** with an image, initials, or icon to provide identity context.

### Decision Tree

| Scenario                  | Use Avatar? | Alternative                 | Reasoning                                        |
| ------------------------- | ----------- | --------------------------- | ------------------------------------------------ |
| User profile pictures     | ✅ Yes      | -                           | Avatar is designed for user representation       |
| Comment author indicators | ✅ Yes      | -                           | Shows who created the content                    |
| Team member lists         | ✅ Yes      | -                           | Visual identification of people                  |
| Status labels or tags     | ❌ No       | Badge                       | Badge is for status, not identity                |
| Decorative icons          | ❌ No       | Icon component              | Use semantic icons for UI elements               |
| Company logos (non-user)  | ⚠️ Maybe    | Image with `shape="square"` | Avatar with square shape works for organizations |

### Component Comparison

```typescript
// ✅ Avatar - User profile representation
<Avatar.Root colorPalette="primary" size="md">
  <Avatar.Fallback name="John Doe" />
  <Avatar.Image src="/avatars/john.jpg" alt="John Doe" />
</Avatar.Root>

// ❌ Don't use Avatar for status indicators - Use Badge
<Avatar.Root colorPalette="success" size="sm">
  <Avatar.Fallback>✓</Avatar.Fallback>
</Avatar.Root>

// ✅ Better: Use Badge for status
<Badge colorPalette="success">Active</Badge>

// ❌ Don't use Avatar for UI icons - Use Icon
<Avatar.Root size="sm">
  <Avatar.Fallback>
    <SettingsIcon />
  </Avatar.Fallback>
</Avatar.Root>

// ✅ Better: Use IconButton for UI actions
<IconButton aria-label="Settings">
  <SettingsIcon />
</IconButton>

// ✅ Avatar - Comment author with status
<HStack gap="3">
  <Box position="relative">
    <Avatar.Root colorPalette="primary" size="md">
      <Avatar.Fallback name="Jane Smith" />
      <Avatar.Image src="/avatars/jane.jpg" alt="Jane Smith" />
    </Avatar.Root>
    {/* Online status indicator */}
    <Box
      position="absolute"
      bottom="0"
      right="0"
      width="3"
      height="3"
      borderRadius="full"
      bg="success.solid"
      border="2px solid white"
    />
  </Box>
  <Stack gap="1">
    <Text fontWeight="semibold">Jane Smith</Text>
    <Text fontSize="sm" color="fg.muted">2 hours ago</Text>
  </Stack>
</HStack>
```

## Import

```typescript
import * as Avatar from '@discourser/design-system';
```

## Component Structure

Avatar uses a compound component pattern with these parts:

- `Avatar.Root` - Container for the avatar
- `Avatar.Image` - Image element for avatar photo
- `Avatar.Fallback` - Fallback content when image fails or is loading
- `Avatar.Context` - Context hook for accessing avatar state
- `Avatar.RootProvider` - Root provider for advanced context usage

## Variants

The Avatar component supports 4 visual variants, each with specific use cases:

| Variant   | Visual Style                                 | Usage                     | When to Use                                         |
| --------- | -------------------------------------------- | ------------------------- | --------------------------------------------------- |
| `subtle`  | Light background with colored text           | Default avatars           | General user representations, comments, posts       |
| `solid`   | Solid color background with contrasting text | High emphasis identifiers | Important users, featured profiles, emphasis needed |
| `surface` | Surface background with border               | Outlined avatars          | Cards, lists, secondary emphasis                    |
| `outline` | Transparent background with border           | Minimal emphasis          | Subtle user indicators, ghost profiles              |

### Visual Characteristics

- **subtle**: Uses `colorPalette.subtle.bg` background with `colorPalette.subtle.fg` text (default)
- **solid**: Uses `colorPalette.solid.bg` background with `colorPalette.solid.fg` text (highest contrast)
- **surface**: Uses `colorPalette.surface.bg` background with 1px border and `colorPalette.surface.fg` text
- **outline**: Transparent background with 1px `colorPalette.outline.border` and `colorPalette.outline.fg` text

## Shapes

| Shape     | Visual Style                | Usage             | When to Use                                      |
| --------- | --------------------------- | ----------------- | ------------------------------------------------ |
| `full`    | Fully circular avatar       | User profiles     | Default, most use cases, follows common patterns |
| `rounded` | Rounded corners (l3 radius) | Alternative style | Brand consistency, modern UI                     |
| `square`  | Sharp corners               | Non-user entities | Organizations, groups, system accounts           |

**Recommendation:** Use `full` for individual users. Use `square` for organizations or system entities.

## Sizes

| Size   | Dimensions | Font Size | Icon Size  | Usage                                           |
| ------ | ---------- | --------- | ---------- | ----------------------------------------------- |
| `2xs`  | 24px (6)   | 2xs       | 12px (3)   | Tiny indicators, inline mentions, compact lists |
| `xs`   | 32px (8)   | xs        | 16px (4)   | Dense layouts, small avatars in groups          |
| `sm`   | 36px (9)   | sm        | 18px (4.5) | Comments, compact user lists, secondary areas   |
| `md`   | 40px (10)  | md        | 20px (5)   | Default, most use cases, navigation bars        |
| `lg`   | 44px (11)  | md        | 22px (5.5) | User cards, prominent displays                  |
| `xl`   | 48px (12)  | lg        | 24px (6)   | Profile headers, featured users                 |
| `2xl`  | 64px (16)  | xl        | 32px (8)   | Large profile displays, hero sections           |
| `full` | 100%       | 100%      | Responsive | Container-sized avatars, flexible layouts       |

**Recommendation:** Use `md` for most cases. Use `sm` or `xs` for compact lists. Use `lg` or larger for profile pages and emphasis.

## Props

### Root Props

| Prop           | Type                                                               | Default    | Description                                               |
| -------------- | ------------------------------------------------------------------ | ---------- | --------------------------------------------------------- |
| `size`         | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'md'`     | Avatar size                                               |
| `variant`      | `'subtle' \| 'solid' \| 'surface' \| 'outline'`                    | `'subtle'` | Visual style variant                                      |
| `shape`        | `'full' \| 'rounded' \| 'square'`                                  | `'full'`   | Avatar shape                                              |
| `colorPalette` | `string`                                                           | -          | Color palette for the avatar (e.g., 'primary', 'neutral') |
| `className`    | `string`                                                           | -          | Additional CSS classes (use sparingly)                    |

### Image Props

| Prop             | Type      | Default         | Description                                 |
| ---------------- | --------- | --------------- | ------------------------------------------- |
| `src`            | `string`  | Required        | Image source URL                            |
| `alt`            | `string`  | Required        | Alt text for accessibility                  |
| `draggable`      | `boolean` | `false`         | Whether image is draggable (default: false) |
| `referrerPolicy` | `string`  | `'no-referrer'` | Referrer policy for image loading           |

### Fallback Props

| Prop       | Type        | Default | Description                                             |
| ---------- | ----------- | ------- | ------------------------------------------------------- |
| `name`     | `string`    | -       | Name to derive initials from (e.g., "John Doe" → "JD")  |
| `children` | `ReactNode` | -       | Custom fallback content (overrides name-based initials) |

**Note:** Avatar components extend their respective HTML element attributes, so all standard attributes are supported.

## Automatic Initials Generation

The `Avatar.Fallback` component automatically generates initials from the `name` prop:

- **Full name**: "John Doe" → "JD" (first letter of first and last name)
- **Single name**: "John" → "J" (first letter only)
- **Multiple names**: "Mary Jane Watson" → "MW" (first and last name only)
- **No name**: Displays default user icon

## Examples

### Basic Usage

```typescript
import * as Avatar from '@discourser/design-system';

// Avatar with image
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="John Doe" />
  <Avatar.Image src="https://example.com/avatar.jpg" alt="John Doe" />
</Avatar.Root>

// Avatar with initials only
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="Sarah Williams" />
</Avatar.Root>

// Avatar with default icon (no name)
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback />
</Avatar.Root>
```

### Image Avatars with Fallback

```typescript
// Image with automatic fallback
// If image fails to load, shows initials
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="Michael Chen" />
  <Avatar.Image
    src="https://api.example.com/users/123/avatar"
    alt="Michael Chen"
  />
</Avatar.Root>

// Multiple avatars with consistent fallback
const users = [
  { name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Carol White", avatar: "https://i.pravatar.cc/150?img=3" },
];

{users.map(user => (
  <Avatar.Root key={user.name} colorPalette="primary">
    <Avatar.Fallback name={user.name} />
    <Avatar.Image src={user.avatar} alt={user.name} />
  </Avatar.Root>
))}
```

### Initials-Only Avatars

```typescript
// Default variant with initials
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="Emily Rodriguez" />
</Avatar.Root>

// Different variants
<Avatar.Root colorPalette="primary" variant="subtle">
  <Avatar.Fallback name="David Kim" />
</Avatar.Root>

<Avatar.Root colorPalette="primary" variant="solid">
  <Avatar.Fallback name="Lisa Anderson" />
</Avatar.Root>

<Avatar.Root colorPalette="primary" variant="surface">
  <Avatar.Fallback name="Tom Baker" />
</Avatar.Root>

<Avatar.Root colorPalette="primary" variant="outline">
  <Avatar.Fallback name="Nina Patel" />
</Avatar.Root>
```

### Custom Fallback Content

```typescript
// Custom icon fallback
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback>
    <CustomUserIcon />
  </Avatar.Fallback>
</Avatar.Root>

// Custom text fallback
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback>?</Avatar.Fallback>
</Avatar.Root>

// Badge-style fallback
<Avatar.Root colorPalette="success">
  <Avatar.Fallback>✓</Avatar.Fallback>
</Avatar.Root>
```

### Different Sizes

```typescript
// Extra small - for inline mentions
<Avatar.Root colorPalette="primary" size="2xs">
  <Avatar.Fallback name="John Doe" />
</Avatar.Root>

// Small - for comments and compact lists
<Avatar.Root colorPalette="primary" size="sm">
  <Avatar.Fallback name="Jane Smith" />
  <Avatar.Image src="/avatars/jane.jpg" alt="Jane Smith" />
</Avatar.Root>

// Default - general use
<Avatar.Root colorPalette="primary" size="md">
  <Avatar.Fallback name="Mike Johnson" />
  <Avatar.Image src="/avatars/mike.jpg" alt="Mike Johnson" />
</Avatar.Root>

// Large - profile displays
<Avatar.Root colorPalette="primary" size="lg">
  <Avatar.Fallback name="Sarah Williams" />
  <Avatar.Image src="/avatars/sarah.jpg" alt="Sarah Williams" />
</Avatar.Root>

// Extra large - profile headers
<Avatar.Root colorPalette="primary" size="2xl">
  <Avatar.Fallback name="David Chen" />
  <Avatar.Image src="/avatars/david.jpg" alt="David Chen" />
</Avatar.Root>
```

### Different Shapes

```typescript
// Circular (default) - for users
<Avatar.Root colorPalette="primary" shape="full">
  <Avatar.Fallback name="John Doe" />
</Avatar.Root>

// Rounded - modern style
<Avatar.Root colorPalette="primary" shape="rounded">
  <Avatar.Fallback name="Jane Smith" />
</Avatar.Root>

// Square - for organizations
<Avatar.Root colorPalette="neutral" shape="square">
  <Avatar.Fallback name="Acme Corp" />
  <Avatar.Image src="/logos/acme.png" alt="Acme Corp" />
</Avatar.Root>
```

### Color Palettes

```typescript
// Different color palettes for variety
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="User One" />
</Avatar.Root>

<Avatar.Root colorPalette="neutral">
  <Avatar.Fallback name="User Two" />
</Avatar.Root>

<Avatar.Root colorPalette="error">
  <Avatar.Fallback name="User Three" />
</Avatar.Root>

<Avatar.Root colorPalette="success">
  <Avatar.Fallback name="User Four" />
</Avatar.Root>

// Use color palette to represent different user types
const getColorForRole = (role: string) => {
  const colors = {
    admin: 'error',
    moderator: 'warning',
    member: 'primary',
    guest: 'neutral',
  };
  return colors[role] || 'primary';
};

<Avatar.Root colorPalette={getColorForRole(user.role)}>
  <Avatar.Fallback name={user.name} />
  <Avatar.Image src={user.avatar} alt={user.name} />
</Avatar.Root>
```

## Common Patterns

### Avatar with Status Indicator

```typescript
import { css } from 'styled-system/css';

// Avatar with online status
<div className={css({ position: 'relative', display: 'inline-flex' })}>
  <Avatar.Root colorPalette="primary" size="md">
    <Avatar.Fallback name="John Doe" />
    <Avatar.Image src="/avatars/john.jpg" alt="John Doe" />
  </Avatar.Root>

  {/* Status indicator */}
  <div className={css({
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '3',
    height: '3',
    borderRadius: 'full',
    bg: 'success.solid',
    border: '2px solid',
    borderColor: 'bg.canvas',
  })} />
</div>

// Avatar with availability status
const StatusAvatar = ({ name, src, status }: Props) => {
  const statusColors = {
    online: 'success.solid',
    away: 'warning.solid',
    busy: 'error.solid',
    offline: 'neutral.subtle',
  };

  return (
    <div className={css({ position: 'relative', display: 'inline-flex' })}>
      <Avatar.Root colorPalette="primary" size="md">
        <Avatar.Fallback name={name} />
        <Avatar.Image src={src} alt={name} />
      </Avatar.Root>

      <div className={css({
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '3',
        height: '3',
        borderRadius: 'full',
        bg: statusColors[status],
        border: '2px solid',
        borderColor: 'bg.canvas',
      })} />
    </div>
  );
};
```

### Avatar Group (Stacked)

```typescript
import { HStack } from 'styled-system/jsx';

// Overlapping avatar group
<HStack gap="-3">
  <Avatar.Root colorPalette="primary" size="md">
    <Avatar.Fallback name="Alice Johnson" />
    <Avatar.Image src="/avatars/alice.jpg" alt="Alice" />
  </Avatar.Root>

  <Avatar.Root colorPalette="primary" size="md">
    <Avatar.Fallback name="Bob Smith" />
    <Avatar.Image src="/avatars/bob.jpg" alt="Bob" />
  </Avatar.Root>

  <Avatar.Root colorPalette="primary" size="md">
    <Avatar.Fallback name="Carol White" />
    <Avatar.Image src="/avatars/carol.jpg" alt="Carol" />
  </Avatar.Root>

  {/* Count indicator for additional users */}
  <Avatar.Root colorPalette="neutral" size="md">
    <Avatar.Fallback>+5</Avatar.Fallback>
  </Avatar.Root>
</HStack>

// Reusable avatar group component
const AvatarGroup = ({ users, max = 3, size = 'md' }: Props) => {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <HStack gap={size === 'sm' ? '-2' : '-3'}>
      {visibleUsers.map(user => (
        <Avatar.Root key={user.id} colorPalette="primary" size={size}>
          <Avatar.Fallback name={user.name} />
          <Avatar.Image src={user.avatar} alt={user.name} />
        </Avatar.Root>
      ))}

      {remainingCount > 0 && (
        <Avatar.Root colorPalette="neutral" size={size}>
          <Avatar.Fallback>+{remainingCount}</Avatar.Fallback>
        </Avatar.Root>
      )}
    </HStack>
  );
};

<AvatarGroup users={teamMembers} max={4} size="md" />
```

### Avatar with Tooltip

```typescript
import * as Tooltip from '@discourser/design-system';

// Avatar with hover tooltip
<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Avatar.Root colorPalette="primary" size="md">
      <Avatar.Fallback name="John Doe" />
      <Avatar.Image src="/avatars/john.jpg" alt="John Doe" />
    </Avatar.Root>
  </Tooltip.Trigger>

  <Tooltip.Positioner>
    <Tooltip.Content>
      <Tooltip.Arrow />
      John Doe - Senior Developer
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>

// Avatar group with individual tooltips
{users.map(user => (
  <Tooltip.Root key={user.id}>
    <Tooltip.Trigger asChild>
      <Avatar.Root colorPalette="primary" size="md">
        <Avatar.Fallback name={user.name} />
        <Avatar.Image src={user.avatar} alt={user.name} />
      </Avatar.Root>
    </Tooltip.Trigger>

    <Tooltip.Positioner>
      <Tooltip.Content>
        <Tooltip.Arrow />
        {user.name} - {user.role}
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
))}
```

### Avatar in User Card

```typescript
import { VStack, HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const UserCard = ({ user }: Props) => (
  <div className={css({
    p: '4',
    borderRadius: 'l2',
    bg: 'bg.surface',
    borderWidth: '1px',
    borderColor: 'border.default',
  })}>
    <HStack gap="3" align="center">
      <Avatar.Root colorPalette="primary" size="lg">
        <Avatar.Fallback name={user.name} />
        <Avatar.Image src={user.avatar} alt={user.name} />
      </Avatar.Root>

      <VStack gap="1" align="start">
        <div className={css({ fontWeight: 'semibold' })}>
          {user.name}
        </div>
        <div className={css({ fontSize: 'sm', color: 'fg.subtle' })}>
          {user.email}
        </div>
      </VStack>
    </HStack>
  </div>
);
```

### Avatar with Upload/Edit

```typescript
import { css } from 'styled-system/css';

// Avatar with edit overlay
const EditableAvatar = ({ name, src, onEdit }: Props) => (
  <div className={css({ position: 'relative', display: 'inline-flex' })}>
    <Avatar.Root colorPalette="primary" size="2xl">
      <Avatar.Fallback name={name} />
      <Avatar.Image src={src} alt={name} />
    </Avatar.Root>

    {/* Edit overlay */}
    <button
      onClick={onEdit}
      className={css({
        position: 'absolute',
        inset: '0',
        borderRadius: 'full',
        bg: 'blackAlpha.600',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '0',
        transition: 'opacity 0.2s',
        cursor: 'pointer',
        _hover: { opacity: '1' },
      })}
    >
      <CameraIcon />
    </button>
  </div>
);
```

### Loading State

```typescript
import { Skeleton } from '@discourser/design-system';

// Avatar loading skeleton
<Skeleton.Root>
  <Skeleton.Circle size="10" />
</Skeleton.Root>

// Conditional loading
const UserAvatar = ({ user, isLoading }: Props) => {
  if (isLoading) {
    return <Skeleton.Circle size="10" />;
  }

  return (
    <Avatar.Root colorPalette="primary" size="md">
      <Avatar.Fallback name={user.name} />
      <Avatar.Image src={user.avatar} alt={user.name} />
    </Avatar.Root>
  );
};
```

### Comment/Post Avatar

```typescript
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const Comment = ({ comment }: Props) => (
  <HStack gap="3" align="start">
    <Avatar.Root colorPalette="primary" size="sm">
      <Avatar.Fallback name={comment.author.name} />
      <Avatar.Image src={comment.author.avatar} alt={comment.author.name} />
    </Avatar.Root>

    <VStack gap="1" align="start" flex="1">
      <HStack gap="2" align="center">
        <span className={css({ fontWeight: 'semibold', fontSize: 'sm' })}>
          {comment.author.name}
        </span>
        <span className={css({ fontSize: 'xs', color: 'fg.subtle' })}>
          {comment.timestamp}
        </span>
      </HStack>

      <p className={css({ fontSize: 'sm' })}>
        {comment.content}
      </p>
    </VStack>
  </HStack>
);
```

### Navigation User Menu

```typescript
import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const UserMenu = ({ user }: Props) => (
  <HStack gap="2" align="center">
    <Avatar.Root colorPalette="primary" size="sm">
      <Avatar.Fallback name={user.name} />
      <Avatar.Image src={user.avatar} alt={user.name} />
    </Avatar.Root>

    <span className={css({ fontSize: 'sm', fontWeight: 'medium' })}>
      {user.name}
    </span>

    <ChevronDownIcon />
  </HStack>
);
```

## DO NOT

```typescript
// ❌ Don't forget the fallback (image might fail to load)
<Avatar.Root colorPalette="primary">
  <Avatar.Image src={user.avatar} alt={user.name} />
</Avatar.Root>

// ✅ Always provide a fallback
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name={user.name} />
  <Avatar.Image src={user.avatar} alt={user.name} />
</Avatar.Root>

// ❌ Don't forget alt text for accessibility
<Avatar.Image src={user.avatar} />

// ✅ Always provide meaningful alt text
<Avatar.Image src={user.avatar} alt={user.name} />

// ❌ Don't use inline styles
<Avatar.Root style={{ width: '60px' }}>
  <Avatar.Fallback name="User" />
</Avatar.Root>

// ✅ Use size prop
<Avatar.Root size="xl">
  <Avatar.Fallback name="User" />
</Avatar.Root>

// ❌ Don't use Image without Root
<Avatar.Image src={user.avatar} alt={user.name} />

// ✅ Always wrap with Root
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name={user.name} />
  <Avatar.Image src={user.avatar} alt={user.name} />
</Avatar.Root>

// ❌ Don't hardcode initials
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>

// ✅ Let the component generate initials
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="John Doe" />
</Avatar.Root>

// ❌ Don't use different sizes in avatar groups
<HStack gap="-3">
  <Avatar.Root size="md"><Avatar.Fallback name="User 1" /></Avatar.Root>
  <Avatar.Root size="lg"><Avatar.Fallback name="User 2" /></Avatar.Root>
</HStack>

// ✅ Keep consistent sizes in groups
<HStack gap="-3">
  <Avatar.Root size="md"><Avatar.Fallback name="User 1" /></Avatar.Root>
  <Avatar.Root size="md"><Avatar.Fallback name="User 2" /></Avatar.Root>
</HStack>

// ❌ Don't mix shapes in the same context
<HStack gap="2">
  <Avatar.Root shape="full"><Avatar.Fallback name="User 1" /></Avatar.Root>
  <Avatar.Root shape="square"><Avatar.Fallback name="User 2" /></Avatar.Root>
</HStack>

// ✅ Use consistent shapes in the same context
<HStack gap="2">
  <Avatar.Root shape="full"><Avatar.Fallback name="User 1" /></Avatar.Root>
  <Avatar.Root shape="full"><Avatar.Fallback name="User 2" /></Avatar.Root>
</HStack>
```

## Accessibility

The Avatar component follows WCAG 2.1 Level AA standards:

- **Alt Text**: Always provide descriptive alt text for Avatar.Image
- **Semantic HTML**: Uses proper img elements with alt attributes
- **Color Contrast**: All variants meet 4.5:1 contrast ratio for text/initials
- **Non-decorative**: Images convey user identity and should have meaningful alt text
- **Keyboard Navigation**: If interactive (e.g., clickable), ensure proper keyboard support

### Accessibility Best Practices

```typescript
// ✅ Provide meaningful alt text
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="Sarah Johnson" />
  <Avatar.Image
    src="/avatars/sarah.jpg"
    alt="Sarah Johnson's profile picture"
  />
</Avatar.Root>

// ✅ For clickable avatars, add proper labels
<button aria-label="View John Doe's profile">
  <Avatar.Root colorPalette="primary">
    <Avatar.Fallback name="John Doe" />
    <Avatar.Image src="/avatars/john.jpg" alt="John Doe" />
  </Avatar.Root>
</button>

// ✅ For decorative avatars in groups (when text is nearby)
<HStack gap="2" align="center">
  <Avatar.Root colorPalette="primary" size="sm">
    <Avatar.Fallback name="Jane Smith" />
    <Avatar.Image src="/avatars/jane.jpg" alt="" role="presentation" />
  </Avatar.Root>
  <span>Jane Smith</span>
</HStack>

// ✅ Provide context for avatar groups
<div role="group" aria-label="Team members">
  <HStack gap="-3">
    {members.map(member => (
      <Avatar.Root key={member.id} colorPalette="primary">
        <Avatar.Fallback name={member.name} />
        <Avatar.Image src={member.avatar} alt={member.name} />
      </Avatar.Root>
    ))}
  </HStack>
</div>

// ✅ Status indicators should be announced
<div role="img" aria-label="Sarah Johnson, online">
  <Avatar.Root colorPalette="primary">
    <Avatar.Fallback name="Sarah Johnson" />
    <Avatar.Image src="/avatars/sarah.jpg" alt="" />
  </Avatar.Root>
  <span className={css({ srOnly: true })}>Online</span>
  <div className={css({ /* status indicator styles */ })} />
</div>
```

## Size Selection Guide

| Scenario        | Recommended Size | Reasoning                               |
| --------------- | ---------------- | --------------------------------------- |
| Inline mentions | `2xs`            | Minimal disruption to text flow         |
| Comment threads | `sm`             | Compact, doesn't overwhelm content      |
| User lists      | `sm` or `md`     | Balance between recognition and density |
| Navigation bar  | `sm` or `md`     | Subtle presence, space-efficient        |
| User cards      | `lg`             | Prominent, easy to recognize            |
| Profile headers | `xl` or `2xl`    | Hero display, maximum recognition       |
| Avatar groups   | `sm` or `md`     | Better overlap appearance               |
| Sidebar users   | `md`             | Standard size for side navigation       |
| Chat messages   | `sm`             | Space-efficient for message threads     |
| Settings pages  | `lg`             | Clear identity context                  |

## Variant Selection Guide

| Scenario          | Recommended Variant  | Reasoning                                        |
| ----------------- | -------------------- | ------------------------------------------------ |
| Default users     | `subtle`             | Soft, unobtrusive, works everywhere              |
| Featured users    | `solid`              | High contrast, draws attention                   |
| User cards        | `surface`            | Defined boundaries, works on colored backgrounds |
| Minimal UI        | `outline`            | Lightweight, modern appearance                   |
| Dark backgrounds  | `solid` or `surface` | Better contrast and visibility                   |
| Light backgrounds | `subtle`             | Subtle, doesn't compete with content             |

## Shape Selection Guide

| Scenario         | Recommended Shape     | Reasoning                                |
| ---------------- | --------------------- | ---------------------------------------- |
| Individual users | `full`                | Standard convention, friendly appearance |
| Organizations    | `square`              | Distinct from users, formal              |
| Brand logos      | `square` or `rounded` | Preserves logo shape and design          |
| Bot accounts     | `rounded`             | Different from users, still approachable |
| System users     | `square`              | Indicates non-human entity               |

## State Behaviors

| State                      | Visual Change            | Behavior                                       |
| -------------------------- | ------------------------ | ---------------------------------------------- |
| **Loading**                | Shows fallback           | Fallback displays while image loads            |
| **Error**                  | Shows fallback           | Fallback displays if image fails to load       |
| **No Image**               | Shows fallback           | Displays initials or default icon              |
| **Hover** (if interactive) | Optional visual feedback | Add cursor: pointer and hover styles as needed |

## Responsive Considerations

```typescript
// Responsive avatar sizes
import { css } from 'styled-system/css';

<Avatar.Root
  colorPalette="primary"
  className={css({
    // Use size tokens for responsive sizing
    size: { base: '8', md: '10', lg: '12' }
  })}
>
  <Avatar.Fallback name="John Doe" />
  <Avatar.Image src="/avatars/john.jpg" alt="John Doe" />
</Avatar.Root>

// Responsive avatar group
<HStack
  gap={{ base: '-2', md: '-3' }}
  className={css({
    '& > *': {
      size: { base: 'sm', md: 'md' }
    }
  })}
>
  {users.map(user => (
    <Avatar.Root key={user.id} colorPalette="primary">
      <Avatar.Fallback name={user.name} />
      <Avatar.Image src={user.avatar} alt={user.name} />
    </Avatar.Root>
  ))}
</HStack>

// Responsive profile header
<VStack gap={{ base: '3', md: '4' }} align="center">
  <Avatar.Root
    colorPalette="primary"
    size={{ base: 'xl', md: '2xl' }}
  >
    <Avatar.Fallback name={user.name} />
    <Avatar.Image src={user.avatar} alt={user.name} />
  </Avatar.Root>

  <h1 className={css({
    fontSize: { base: 'xl', md: '2xl' },
    fontWeight: 'bold'
  })}>
    {user.name}
  </h1>
</VStack>
```

## Testing

When testing Avatar components:

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import * as Avatar from '@discourser/design-system';

test('displays image when loaded', async () => {
  render(
    <Avatar.Root colorPalette="primary">
      <Avatar.Fallback name="John Doe" />
      <Avatar.Image src="https://example.com/avatar.jpg" alt="John Doe" />
    </Avatar.Root>
  );

  const image = await screen.findByAltText('John Doe');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
});

test('displays fallback when image fails', async () => {
  render(
    <Avatar.Root colorPalette="primary">
      <Avatar.Fallback name="John Doe" />
      <Avatar.Image src="invalid-url.jpg" alt="John Doe" />
    </Avatar.Root>
  );

  // Initially shows fallback
  expect(screen.getByText('JD')).toBeInTheDocument();
});

test('generates correct initials from name', () => {
  render(
    <Avatar.Root colorPalette="primary">
      <Avatar.Fallback name="Sarah Jane Williams" />
    </Avatar.Root>
  );

  // Should show first and last name initials only
  expect(screen.getByText('SW')).toBeInTheDocument();
});

test('displays default icon when no name provided', () => {
  const { container } = render(
    <Avatar.Root colorPalette="primary">
      <Avatar.Fallback />
    </Avatar.Root>
  );

  // Should render the default user icon SVG
  expect(container.querySelector('svg')).toBeInTheDocument();
});

test('supports custom fallback content', () => {
  render(
    <Avatar.Root colorPalette="primary">
      <Avatar.Fallback>🎉</Avatar.Fallback>
    </Avatar.Root>
  );

  expect(screen.getByText('🎉')).toBeInTheDocument();
});
```

## Color Palette System

Avatar supports the design system's color palette:

```typescript
// Semantic colors
<Avatar.Root colorPalette="primary">
  <Avatar.Fallback name="Primary User" />
</Avatar.Root>

<Avatar.Root colorPalette="neutral">
  <Avatar.Fallback name="Neutral User" />
</Avatar.Root>

<Avatar.Root colorPalette="success">
  <Avatar.Fallback name="Success" />
</Avatar.Root>

<Avatar.Root colorPalette="warning">
  <Avatar.Fallback name="Warning" />
</Avatar.Root>

<Avatar.Root colorPalette="error">
  <Avatar.Fallback name="Error" />
</Avatar.Root>

// Use different colors to categorize users
const getUserColor = (role: string) => {
  const roleColors = {
    admin: 'error',
    moderator: 'warning',
    premium: 'primary',
    free: 'neutral',
  };
  return roleColors[role] || 'neutral';
};

<Avatar.Root colorPalette={getUserColor(user.role)}>
  <Avatar.Fallback name={user.name} />
  <Avatar.Image src={user.avatar} alt={user.name} />
</Avatar.Root>
```

## Related Components

- **Badge**: For displaying status or role labels near avatars
- **Tooltip**: For showing additional user information on hover
- **Dialog**: For displaying full user profiles
- **IconButton**: For edit actions on avatars
- **Skeleton**: For loading states
