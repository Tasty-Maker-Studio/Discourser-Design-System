# Tabs

**Purpose:** Navigation component for organizing content into separate views with smooth transitions and visual indicators, following Material Design 3 principles.

## Import

```typescript
import { Tabs } from '@discourser/design-system';
```

## Component Structure

The Tabs component is a **compound component** that follows the composition pattern. All parts must be used together:

| Component           | Purpose                                     | Required    |
| ------------------- | ------------------------------------------- | ----------- |
| `Tabs.Root`         | Container that manages tab state and layout | Yes         |
| `Tabs.List`         | Container for tab triggers                  | Yes         |
| `Tabs.Trigger`      | Individual tab button                       | Yes         |
| `Tabs.Content`      | Panel with content for each tab             | Yes         |
| `Tabs.Indicator`    | Visual indicator showing active tab         | Recommended |
| `Tabs.Context`      | Access tabs state in custom components      | Advanced    |
| `Tabs.RootProvider` | Provide external tabs state                 | Advanced    |

**Important:** Never use tab parts in isolation. They must be nested within `Tabs.Root`.

## Variants

The Tabs component supports 3 Material Design 3 inspired variants:

| Variant    | Visual Style                       | Usage         | When to Use                              |
| ---------- | ---------------------------------- | ------------- | ---------------------------------------- |
| `line`     | Underline indicator below tabs     | Default style | Primary navigation, content switching    |
| `subtle`   | Background highlight on active tab | Soft emphasis | Secondary navigation, embedded tabs      |
| `enclosed` | Pills with background container    | High emphasis | Segmented controls, toggle-like behavior |

### Visual Characteristics

- **line**: Border-bottom on list, sliding indicator line below active tab, primary color accent
- **subtle**: Rounded background behind active tab, subtle color palette, minimal borders
- **enclosed**: Contained pill-style buttons with shadow, gray background container, prominent selection

## Sizes

| Size | Height | Padding (Horizontal) | Font Size | Usage                                              |
| ---- | ------ | -------------------- | --------- | -------------------------------------------------- |
| `xs` | 32px   | 12px                 | xs        | Compact UI, dense layouts, small screens           |
| `sm` | 36px   | 14px                 | sm        | Secondary navigation, sidebars                     |
| `md` | 40px   | 16px                 | sm        | Default, most use cases                            |
| `lg` | 44px   | 18px                 | md        | Touch-friendly, mobile-first, prominent navigation |

**Recommendation:** Use `md` for most cases. Use `lg` for mobile-first designs or primary navigation.

## Props

### Root Props

| Prop             | Type                                   | Default        | Description                                           |
| ---------------- | -------------------------------------- | -------------- | ----------------------------------------------------- |
| `defaultValue`   | `string`                               | -              | Initially selected tab                                |
| `value`          | `string`                               | -              | Controlled selected tab                               |
| `onValueChange`  | `(details: { value: string }) => void` | -              | Callback when tab selection changes                   |
| `orientation`    | `'horizontal' \| 'vertical'`           | `'horizontal'` | Tab list orientation                                  |
| `activationMode` | `'automatic' \| 'manual'`              | `'automatic'`  | How tabs activate (on focus vs on click)              |
| `loopFocus`      | `boolean`                              | `true`         | Whether arrow key navigation loops at ends            |
| `variant`        | `'line' \| 'subtle' \| 'enclosed'`     | `'line'`       | Visual style variant                                  |
| `size`           | `'xs' \| 'sm' \| 'md' \| 'lg'`         | `'md'`         | Tab size                                              |
| `fitted`         | `boolean`                              | `false`        | Whether tabs stretch to fill container width          |
| `colorPalette`   | `string`                               | -              | Color palette for theming (e.g., 'primary', 'accent') |

### Trigger Props

| Prop       | Type        | Default  | Description                   |
| ---------- | ----------- | -------- | ----------------------------- |
| `value`    | `string`    | Required | Unique identifier for the tab |
| `disabled` | `boolean`   | `false`  | Disable this specific tab     |
| `children` | `ReactNode` | Required | Tab label content             |

### Content Props

| Prop       | Type        | Default  | Description                            |
| ---------- | ----------- | -------- | -------------------------------------- |
| `value`    | `string`    | Required | Must match corresponding Trigger value |
| `children` | `ReactNode` | Required | Tab panel content                      |

### List Props

Standard HTML div props are supported.

### Indicator Props

The indicator automatically follows the active tab. No props required.

## Examples

### Basic Usage

```typescript
// Simple horizontal tabs (default)
<Tabs.Root colorPalette="primary" defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="details">Details</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="overview">
    Overview content goes here
  </Tabs.Content>
  <Tabs.Content value="details">
    Detailed information appears here
  </Tabs.Content>
  <Tabs.Content value="settings">
    Settings panel content
  </Tabs.Content>
</Tabs.Root>
```

### Controlled State

```typescript
const [activeTab, setActiveTab] = useState('tab1');

<Tabs.Root
  colorPalette="primary"
  value={activeTab}
  onValueChange={(details) => setActiveTab(details.value)}
>
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>

<p>Current tab: {activeTab}</p>
```

### Variant Examples

```typescript
// Line variant (default) - underlined indicator
<Tabs.Root colorPalette="primary" variant="line" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab1">Line variant content</Tabs.Content>
  <Tabs.Content value="tab2">Second tab</Tabs.Content>
  <Tabs.Content value="tab3">Third tab</Tabs.Content>
</Tabs.Root>

// Subtle variant - background highlight
<Tabs.Root colorPalette="primary" variant="subtle" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab1">Subtle variant content</Tabs.Content>
  <Tabs.Content value="tab2">Second tab</Tabs.Content>
</Tabs.Root>

// Enclosed variant - pill style
<Tabs.Root colorPalette="primary" variant="enclosed" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab1">Enclosed variant content</Tabs.Content>
  <Tabs.Content value="tab2">Second tab</Tabs.Content>
</Tabs.Root>
```

### Size Examples

```typescript
// Extra small tabs
<Tabs.Root size="xs" colorPalette="primary" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab1">Extra small content</Tabs.Content>
  <Tabs.Content value="tab2">Second tab</Tabs.Content>
</Tabs.Root>

// Large tabs (touch-friendly)
<Tabs.Root size="lg" colorPalette="primary" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab1">Large content</Tabs.Content>
  <Tabs.Content value="tab2">Second tab</Tabs.Content>
</Tabs.Root>
```

### Vertical Orientation

```typescript
<Tabs.Root orientation="vertical" colorPalette="primary" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Dashboard</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Reports</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="tab1">Dashboard view</Tabs.Content>
  <Tabs.Content value="tab2">Analytics charts</Tabs.Content>
  <Tabs.Content value="tab3">Report tables</Tabs.Content>
</Tabs.Root>
```

### Fitted Tabs

```typescript
// Tabs stretch to fill available width
<Tabs.Root fitted colorPalette="primary" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Details</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="tab1">Overview content</Tabs.Content>
  <Tabs.Content value="tab2">Details content</Tabs.Content>
  <Tabs.Content value="tab3">Settings content</Tabs.Content>
</Tabs.Root>
```

### Disabled Tabs

```typescript
<Tabs.Root colorPalette="primary" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Active Tab</Tabs.Trigger>
    <Tabs.Trigger value="tab2" disabled>
      Disabled Tab
    </Tabs.Trigger>
    <Tabs.Trigger value="tab3">Another Active</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="tab1">Active content</Tabs.Content>
  <Tabs.Content value="tab2">Inaccessible content</Tabs.Content>
  <Tabs.Content value="tab3">Another active content</Tabs.Content>
</Tabs.Root>
```

### Manual Activation Mode

```typescript
// Tabs activate on click/Enter, not on focus
<Tabs.Root activationMode="manual" colorPalette="primary" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
  <Tabs.Content value="tab3">Content 3</Tabs.Content>
</Tabs.Root>
```

### Dynamic Tabs

```typescript
const tabs = [
  { id: 'home', label: 'Home', content: 'Welcome to the home page' },
  { id: 'profile', label: 'Profile', content: 'Your profile information' },
  { id: 'settings', label: 'Settings', content: 'Adjust your preferences' },
];

<Tabs.Root colorPalette="primary" defaultValue={tabs[0].id}>
  <Tabs.List>
    {tabs.map((tab) => (
      <Tabs.Trigger key={tab.id} value={tab.id}>
        {tab.label}
      </Tabs.Trigger>
    ))}
    <Tabs.Indicator />
  </Tabs.List>

  {tabs.map((tab) => (
    <Tabs.Content key={tab.id} value={tab.id}>
      {tab.content}
    </Tabs.Content>
  ))}
</Tabs.Root>
```

## Common Patterns

### Profile Settings Navigation

```typescript
<Tabs.Root colorPalette="primary" variant="line" defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="security">Security</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="account">
    <Box p="6">
      <Heading size="lg">Account Settings</Heading>
      <Input label="Username" defaultValue="johndoe" />
      <Input label="Email" defaultValue="john@example.com" />
      <Button>Save Changes</Button>
    </Box>
  </Tabs.Content>

  <Tabs.Content value="security">
    <Box p="6">
      <Heading size="lg">Security Settings</Heading>
      <Input type="password" label="Current Password" />
      <Input type="password" label="New Password" />
      <Button>Update Password</Button>
    </Box>
  </Tabs.Content>

  {/* Other content panels */}
</Tabs.Root>
```

### Dashboard Views

```typescript
<Tabs.Root
  colorPalette="primary"
  variant="enclosed"
  size="lg"
  defaultValue="overview"
>
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="overview">
    <Box p="6">
      <h2>Dashboard Overview</h2>
      {/* Stats cards, charts, etc. */}
    </Box>
  </Tabs.Content>

  <Tabs.Content value="analytics">
    <Box p="6">
      <h2>Analytics</h2>
      {/* Data visualizations */}
    </Box>
  </Tabs.Content>

  <Tabs.Content value="reports">
    <Box p="6">
      <h2>Reports</h2>
      {/* Report tables */}
    </Box>
  </Tabs.Content>
</Tabs.Root>
```

### Segmented Control

```typescript
// Toggle-like behavior with enclosed variant
<Tabs.Root
  colorPalette="primary"
  variant="enclosed"
  size="sm"
  fitted
  defaultValue="grid"
>
  <Tabs.List>
    <Tabs.Trigger value="list">List View</Tabs.Trigger>
    <Tabs.Trigger value="grid">Grid View</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="list">
    {/* List layout */}
  </Tabs.Content>

  <Tabs.Content value="grid">
    {/* Grid layout */}
  </Tabs.Content>
</Tabs.Root>
```

### Product Information Tabs

```typescript
<Tabs.Root colorPalette="primary" variant="line" defaultValue="description">
  <Tabs.List>
    <Tabs.Trigger value="description">Description</Tabs.Trigger>
    <Tabs.Trigger value="specs">Specifications</Tabs.Trigger>
    <Tabs.Trigger value="reviews">Reviews (24)</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="description">
    <Box p="4">
      <p>Detailed product description with features and benefits...</p>
    </Box>
  </Tabs.Content>

  <Tabs.Content value="specs">
    <Box p="4">
      <table>
        <tr><td>Dimensions</td><td>10" x 8" x 2"</td></tr>
        <tr><td>Weight</td><td>1.5 lbs</td></tr>
      </table>
    </Box>
  </Tabs.Content>

  <Tabs.Content value="reviews">
    <Box p="4">
      {/* Review list */}
    </Box>
  </Tabs.Content>
</Tabs.Root>
```

### With Icons

```typescript
import { HomeIcon, UserIcon, SettingsIcon } from 'your-icon-library';

<Tabs.Root colorPalette="primary" defaultValue="home">
  <Tabs.List>
    <Tabs.Trigger value="home">
      <HomeIcon />
      Home
    </Tabs.Trigger>
    <Tabs.Trigger value="profile">
      <UserIcon />
      Profile
    </Tabs.Trigger>
    <Tabs.Trigger value="settings">
      <SettingsIcon />
      Settings
    </Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>

  <Tabs.Content value="home">Home content</Tabs.Content>
  <Tabs.Content value="profile">Profile content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs.Root>
```

## DO NOT

```typescript
// ❌ Don't use tab parts without Root
<Tabs.List>
  <Tabs.Trigger value="tab1">Won't work</Tabs.Trigger>
</Tabs.List>

// ❌ Don't forget matching values
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="different-value">  {/* Won't show! */}
    Content
  </Tabs.Content>
</Tabs.Root>

// ❌ Don't use duplicate values
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="same">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="same">Tab 2</Tabs.Trigger>  {/* Collision! */}
  </Tabs.List>
</Tabs.Root>

// ❌ Don't nest interactive elements in Trigger
<Tabs.Trigger value="tab1">
  <button>Nested button</button>  {/* Breaks accessibility */}
</Tabs.Trigger>

// ❌ Don't omit Indicator (poor visual feedback)
<Tabs.List>
  <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
  <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  {/* Missing <Tabs.Indicator /> */}
</Tabs.List>

// ❌ Don't use tabs for sequential steps (use Stepper instead)
<Tabs.Root defaultValue="step1">
  <Tabs.List>
    <Tabs.Trigger value="step1">Step 1</Tabs.Trigger>
    <Tabs.Trigger value="step2">Step 2</Tabs.Trigger>
    <Tabs.Trigger value="step3">Step 3</Tabs.Trigger>
  </Tabs.List>
  {/* This should be a Stepper, not Tabs */}
</Tabs.Root>

// ❌ Don't use too many tabs (>7 becomes hard to scan)
<Tabs.List>
  {/* 10+ tabs is overwhelming - consider dropdown or hierarchical nav */}
</Tabs.List>

// ✅ Use compound components properly
<Tabs.Root colorPalette="primary" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>
```

## Accessibility

The Tabs component follows WCAG 2.1 Level AA standards and implements WAI-ARIA Tabs Pattern:

- **Keyboard Navigation**:
  - `Tab`: Focus into/out of tab list
  - `ArrowRight` / `ArrowDown`: Next tab
  - `ArrowLeft` / `ArrowUp`: Previous tab
  - `Home`: First tab
  - `End`: Last tab
  - `Enter` / `Space`: Activate focused tab (manual mode)

- **ARIA Attributes**: Automatically managed
  - `role="tablist"` on List
  - `role="tab"` on Trigger
  - `role="tabpanel"` on Content
  - `aria-selected` on triggers (true/false)
  - `aria-controls` links trigger to panel
  - `aria-labelledby` links panel to trigger
  - `aria-orientation` on vertical tab lists
  - `aria-disabled` on disabled tabs

- **Focus Management**:
  - Clear focus indicators on keyboard navigation
  - Focus moves to active tab trigger when entering tab list
  - Tab panel is focusable for screen reader access

- **Activation Modes**:
  - **Automatic** (default): Tab activates on arrow key focus
  - **Manual**: Tab activates only on Enter/Space (better for dynamic content)

### Accessibility Best Practices

```typescript
// ✅ Use descriptive tab labels
<Tabs.Trigger value="account">Account Settings</Tabs.Trigger>

// ✅ Use manual activation for tabs that load data
<Tabs.Root activationMode="manual" colorPalette="primary" defaultValue="tab1">
  {/* Prevents triggering API calls on arrow key navigation */}
</Tabs.Root>

// ✅ Provide meaningful content in panels
<Tabs.Content value="overview">
  <h2>Overview</h2>
  <p>Well-structured content with headings...</p>
</Tabs.Content>

// ✅ Indicate disabled state clearly in label
<Tabs.Trigger value="premium" disabled>
  Premium Features (Upgrade Required)
</Tabs.Trigger>

// ✅ Use icons with text labels, not icon-only
<Tabs.Trigger value="home">
  <HomeIcon aria-hidden="true" />
  Home
</Tabs.Trigger>
```

## Variant Selection Guide

| Scenario             | Recommended Variant  | Reasoning                                          |
| -------------------- | -------------------- | -------------------------------------------------- |
| Primary navigation   | `line`               | Clear, familiar pattern for main content switching |
| Secondary navigation | `subtle`             | Lower emphasis for nested or supplementary tabs    |
| Segmented control    | `enclosed`           | Clear selection state, toggle-like behavior        |
| Settings sections    | `line`               | Clean, organized appearance                        |
| Dashboard views      | `line` or `enclosed` | Depends on design system aesthetics                |
| Sidebar navigation   | `subtle`             | Integrates well with sidebar design                |
| Toolbar controls     | `enclosed`           | Compact, clear selection                           |

## State Behaviors

| State        | Visual Change                     | Behavior                               |
| ------------ | --------------------------------- | -------------------------------------- |
| **Default**  | Muted text color                  | Tab is inactive but selectable         |
| **Selected** | Indicator visible, accent color   | Tab panel content is shown             |
| **Hover**    | Subtle background or color change | Visual feedback on interactive element |
| **Focus**    | Focus ring visible                | Keyboard navigation indicator          |
| **Disabled** | 38% opacity, cursor not-allowed   | Tab cannot be activated                |

## Indicator Animation

The `Tabs.Indicator` smoothly animates between tabs using CSS transforms:

- **Horizontal**: Slides left/right with width adjustment
- **Vertical**: Slides up/down with height adjustment
- **Transition**: Smooth, native feel with GPU acceleration

## Orientation Guidelines

### Horizontal Tabs (Default)

- **Best for**: Primary navigation, most use cases
- **Layout**: Tabs arranged left-to-right
- **Responsiveness**: May need overflow handling on small screens
- **Common placement**: Top of content area

### Vertical Tabs

- **Best for**: Sidebar navigation, settings with many sections
- **Layout**: Tabs arranged top-to-bottom
- **Responsiveness**: Works well on all screen sizes
- **Common placement**: Left or right side of content

```typescript
// Responsive orientation
<Tabs.Root
  orientation={{ base: 'horizontal', md: 'vertical' }}
  colorPalette="primary"
  defaultValue="tab1"
>
  {/* Horizontal on mobile, vertical on desktop */}
</Tabs.Root>
```

## Responsive Considerations

```typescript
// Responsive size
<Tabs.Root
  size={{ base: 'lg', md: 'md' }}
  colorPalette="primary"
  defaultValue="tab1"
>
  {/* Larger on mobile for touch, standard on desktop */}
</Tabs.Root>

// Responsive fitted
<Tabs.Root
  fitted={{ base: true, md: false }}
  colorPalette="primary"
  defaultValue="tab1"
>
  {/* Full width on mobile, auto width on desktop */}
</Tabs.Root>

// Handle overflow with scrolling
<Box overflowX="auto">
  <Tabs.Root colorPalette="primary" defaultValue="tab1">
    <Tabs.List>
      <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
      <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      <Tabs.Trigger value="tab4">Tab 4</Tabs.Trigger>
      <Tabs.Trigger value="tab5">Tab 5</Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    {/* Content */}
  </Tabs.Root>
</Box>
```

## Testing

When testing Tabs components:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('tabs switch content on click', async () => {
  render(
    <Tabs.Root colorPalette="primary" defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>
  );

  expect(screen.getByText('Content 1')).toBeVisible();
  expect(screen.queryByText('Content 2')).not.toBeVisible();

  await userEvent.click(screen.getByText('Tab 2'));

  expect(screen.queryByText('Content 1')).not.toBeVisible();
  expect(screen.getByText('Content 2')).toBeVisible();
});

test('disabled tab cannot be activated', async () => {
  render(
    <Tabs.Root colorPalette="primary" defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>Tab 2</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>
  );

  const disabledTab = screen.getByText('Tab 2');
  await userEvent.click(disabledTab);

  expect(screen.getByText('Content 1')).toBeVisible();
  expect(screen.queryByText('Content 2')).not.toBeVisible();
  expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
});

test('keyboard navigation with arrow keys', async () => {
  render(
    <Tabs.Root colorPalette="primary" defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs.Root>
  );

  const tab1 = screen.getByText('Tab 1');
  tab1.focus();

  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByText('Tab 2')).toHaveFocus();

  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByText('Tab 3')).toHaveFocus();

  await userEvent.keyboard('{Home}');
  expect(screen.getByText('Tab 1')).toHaveFocus();
});

test('controlled tabs update on value change', async () => {
  const TestComponent = () => {
    const [value, setValue] = useState('tab1');
    return (
      <>
        <button onClick={() => setValue('tab2')}>Switch to Tab 2</button>
        <Tabs.Root
          colorPalette="primary"
          value={value}
          onValueChange={(d) => setValue(d.value)}
        >
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>
      </>
    );
  };

  render(<TestComponent />);
  await userEvent.click(screen.getByText('Switch to Tab 2'));
  expect(screen.getByText('Content 2')).toBeVisible();
});

test('manual activation mode requires explicit activation', async () => {
  render(
    <Tabs.Root
      colorPalette="primary"
      activationMode="manual"
      defaultValue="tab1"
    >
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>
  );

  const tab1 = screen.getByText('Tab 1');
  tab1.focus();

  // Arrow key navigation doesn't activate tab in manual mode
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByText('Tab 2')).toHaveFocus();
  expect(screen.getByText('Content 1')).toBeVisible();  // Still tab 1 content

  // Explicit Enter/Space activates tab
  await userEvent.keyboard('{Enter}');
  expect(screen.getByText('Content 2')).toBeVisible();
});
```

## Related Components

- **Accordion**: For progressive disclosure of stacked content
- **Menu**: For navigation or action menus with different interaction patterns
- **Breadcrumbs**: For hierarchical navigation
- **Stepper**: For sequential multi-step processes (not random access like tabs)
- **SegmentedControl**: Alternative for 2-3 mutually exclusive options
