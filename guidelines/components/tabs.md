# Tabs

**Purpose:** Navigation component for organizing content into separate views with smooth transitions and visual indicators, following Material Design 3 principles.

## When to Use This Component

Use Tabs when you need to **organize related content into separate, mutually exclusive views** where users switch between them without leaving the page.

### Decision Tree

| Scenario                                             | Use Tabs? | Alternative              | Reasoning                                                    |
| ---------------------------------------------------- | --------- | ------------------------ | ------------------------------------------------------------ |
| Switching between related views (Dashboard sections) | ✅ Yes    | -                        | Tabs provide clear navigation between distinct content areas |
| Organizing product info (Details, Reviews, Specs)    | ✅ Yes    | -                        | Perfect for grouping related but separate information        |
| User needs to see multiple sections at once          | ❌ No     | Accordion (multiple)     | Tabs show one view at a time                                 |
| Progressive disclosure of content (FAQs)             | ❌ No     | Accordion                | Accordion is better for showing/hiding sections              |
| Sequential steps in a process                        | ❌ No     | Stepper                  | Stepper shows progress through ordered steps                 |
| More than 7-8 tabs needed                            | ❌ No     | Dropdown menu or Sidebar | Too many tabs become hard to navigate                        |

### Component Comparison

```typescript
// ✅ Tabs - Switching between related views
<Tabs.Root colorPalette="primary" defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="overview">
    <DashboardOverview />
  </Tabs.Content>
  <Tabs.Content value="analytics">
    <AnalyticsView />
  </Tabs.Content>
  <Tabs.Content value="settings">
    <SettingsPanel />
  </Tabs.Content>
</Tabs.Root>

// ❌ Don't use Tabs when users need to see multiple sections - Use Accordion
<Tabs.Root defaultValue="section1">
  <Tabs.List>
    <Tabs.Trigger value="section1">FAQ 1</Tabs.Trigger>
    <Tabs.Trigger value="section2">FAQ 2</Tabs.Trigger>
    {/* User might want to see multiple FAQs at once */}
  </Tabs.List>
</Tabs.Root>

// ✅ Better: Use Accordion for collapsible sections
<Accordion.Root multiple>
  <Accordion.Item value="faq1">
    <Accordion.ItemTrigger>
      FAQ 1
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>Answer 1</Accordion.ItemContent>
  </Accordion.Item>
  <Accordion.Item value="faq2">
    <Accordion.ItemTrigger>
      FAQ 2
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>Answer 2</Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>

// ❌ Don't use Tabs for sequential steps - Use Stepper
<Tabs.Root defaultValue="step1">
  <Tabs.List>
    <Tabs.Trigger value="step1">Step 1</Tabs.Trigger>
    <Tabs.Trigger value="step2">Step 2</Tabs.Trigger>
    <Tabs.Trigger value="step3">Step 3</Tabs.Trigger>
  </Tabs.List>
  {/* Steps have an order - tabs don't convey sequence */}
</Tabs.Root>

// ✅ Better: Use Stepper for multi-step processes
<Stepper value={currentStep} onValueChange={setCurrentStep}>
  <Stepper.List>
    <Stepper.Item index={0}>Information</Stepper.Item>
    <Stepper.Item index={1}>Payment</Stepper.Item>
    <Stepper.Item index={2}>Confirmation</Stepper.Item>
  </Stepper.List>
  <Stepper.Content index={0}>Step 1 content</Stepper.Content>
  <Stepper.Content index={1}>Step 2 content</Stepper.Content>
  <Stepper.Content index={2}>Step 3 content</Stepper.Content>
</Stepper>
```

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

## Edge Cases

This section covers common edge cases and how to handle them properly.

### Dynamic Tabs - Adding/Removing at Runtime

**Scenario:** Tabs need to be added or removed dynamically based on user actions or application state.

**Solution:**

```typescript
interface Tab {
  id: string;
  label: string;
  content: string;
  closable?: boolean;
}

const [tabs, setTabs] = useState<Tab[]>([
  { id: 'tab1', label: 'Home', content: 'Home content', closable: false },
  { id: 'tab2', label: 'Profile', content: 'Profile content', closable: true },
]);
const [activeTab, setActiveTab] = useState('tab1');

const addTab = () => {
  const newTabId = `tab${Date.now()}`;
  const newTab: Tab = {
    id: newTabId,
    label: `New Tab ${tabs.length + 1}`,
    content: `Content for new tab`,
    closable: true,
  };
  setTabs([...tabs, newTab]);
  setActiveTab(newTabId); // Activate newly created tab
};

const closeTab = (tabId: string) => {
  // Prevent closing if it's the last tab
  if (tabs.length <= 1) return;

  const tabIndex = tabs.findIndex((t) => t.id === tabId);
  const newTabs = tabs.filter((t) => t.id !== tabId);
  setTabs(newTabs);

  // If closing active tab, switch to adjacent tab
  if (activeTab === tabId) {
    const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
    setActiveTab(newTabs[newActiveIndex].id);
  }
};

<div>
  <Tabs.Root
    colorPalette="primary"
    value={activeTab}
    onValueChange={(details) => setActiveTab(details.value)}
  >
    <div className={css({ display: 'flex', alignItems: 'center', gap: '2', mb: '2' })}>
      <Tabs.List className={css({ flex: 1 })}>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.id} value={tab.id}>
            <span>{tab.label}</span>
            {tab.closable && (
              <button
                className={css({
                  ml: '2',
                  p: '1',
                  borderRadius: 'sm',
                  _hover: { bg: 'gray.a3' },
                })}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent tab activation
                  closeTab(tab.id);
                }}
                aria-label={`Close ${tab.label}`}
              >
                ×
              </button>
            )}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>

      <Button size="sm" onClick={addTab} variant="outlined">
        + Add Tab
      </Button>
    </div>

    {tabs.map((tab) => (
      <Tabs.Content key={tab.id} value={tab.id}>
        <div className={css({ p: '4' })}>{tab.content}</div>
      </Tabs.Content>
    ))}
  </Tabs.Root>
</div>
```

**Best practices:**

- Always maintain at least one tab to prevent empty state
- Switch to adjacent tab when closing the active tab
- Stop event propagation on close buttons to prevent tab activation
- Provide clear visual indicators for closable tabs
- Consider confirming before closing tabs with unsaved changes

---

### Too Many Tabs - Handling Overflow

**Scenario:** When there are too many tabs to fit horizontally, implement scrolling or alternative navigation patterns.

**Solution:**

```typescript
const manyTabs = Array.from({ length: 12 }, (_, i) => ({
  id: `tab${i + 1}`,
  label: `Tab ${i + 1}`,
  content: `Content for tab ${i + 1}`,
}));

const [activeTab, setActiveTab] = useState('tab1');

<Tabs.Root
  colorPalette="primary"
  value={activeTab}
  onValueChange={(details) => setActiveTab(details.value)}
>
  {/* Horizontal scroll container */}
  <div
    className={css({
      overflowX: 'auto',
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
      scrollbarWidth: 'thin', // Firefox
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        bg: 'gray.a5',
        borderRadius: 'full',
      },
    })}
  >
    <Tabs.List className={css({ minWidth: 'max-content' })}>
      {manyTabs.map((tab) => (
        <Tabs.Trigger
          key={tab.id}
          value={tab.id}
          className={css({ whiteSpace: 'nowrap', flexShrink: 0 })}
        >
          {tab.label}
        </Tabs.Trigger>
      ))}
      <Tabs.Indicator />
    </Tabs.List>
  </div>

  {manyTabs.map((tab) => (
    <Tabs.Content key={tab.id} value={tab.id}>
      <div className={css({ p: '4' })}>{tab.content}</div>
    </Tabs.Content>
  ))}
</Tabs.Root>

{/* Alternative: Dropdown for overflow tabs */}
<Tabs.Root
  colorPalette="primary"
  value={activeTab}
  onValueChange={(details) => setActiveTab(details.value)}
>
  <div className={css({ display: 'flex', alignItems: 'center' })}>
    <Tabs.List>
      {/* Show first 5 tabs */}
      {manyTabs.slice(0, 5).map((tab) => (
        <Tabs.Trigger key={tab.id} value={tab.id}>
          {tab.label}
        </Tabs.Trigger>
      ))}
      <Tabs.Indicator />
    </Tabs.List>

    {/* Dropdown for remaining tabs */}
    {manyTabs.length > 5 && (
      <Select.Root
        items={manyTabs.slice(5)}
        itemToValue={(item) => item.id}
        itemToString={(item) => item.label}
        value={[activeTab]}
        onValueChange={(details) => setActiveTab(details.value[0])}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="More..." />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.List>
              {manyTabs.slice(5).map((tab) => (
                <Select.Item key={tab.id} item={tab}>
                  <Select.ItemText>{tab.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    )}
  </div>

  {manyTabs.map((tab) => (
    <Tabs.Content key={tab.id} value={tab.id}>
      <div className={css({ p: '4' })}>{tab.content}</div>
    </Tabs.Content>
  ))}
</Tabs.Root>
```

**Best practices:**

- Limit visible tabs to 7-8 maximum for usability
- Use horizontal scrolling with clear scroll indicators
- Consider a dropdown menu for overflow tabs
- Add visual cues (shadows/gradients) to indicate more tabs
- On mobile, consider switching to a different navigation pattern

---

### Disabled Tabs - Conditional Access

**Scenario:** Some tabs should be visible but not accessible due to permissions, incomplete prerequisites, or application state.

**Solution:**

```typescript
interface TabConfig {
  id: string;
  label: string;
  content: string;
  disabled: boolean;
  disabledReason?: string;
}

const [hasPermission, setHasPermission] = useState(false);
const [completedStep1, setCompletedStep1] = useState(false);

const tabConfigs: TabConfig[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: 'Overview content available to all',
    disabled: false,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    content: 'Analytics content',
    disabled: !hasPermission,
    disabledReason: 'Requires Pro subscription',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    content: 'Advanced settings',
    disabled: !completedStep1,
    disabledReason: 'Complete overview first',
  },
];

const [activeTab, setActiveTab] = useState('overview');
const [tooltipTab, setTooltipTab] = useState<string | null>(null);

<div>
  {/* Controls for demo */}
  <div className={css({ mb: '4', p: '3', bg: 'gray.a2', borderRadius: 'md' })}>
    <label>
      <input
        type="checkbox"
        checked={hasPermission}
        onChange={(e) => setHasPermission(e.target.checked)}
      />
      <span className={css({ ml: '2' })}>Has Pro subscription</span>
    </label>
    <label className={css({ ml: '4' })}>
      <input
        type="checkbox"
        checked={completedStep1}
        onChange={(e) => setCompletedStep1(e.target.checked)}
      />
      <span className={css({ ml: '2' })}>Completed overview</span>
    </label>
  </div>

  <Tabs.Root
    colorPalette="primary"
    value={activeTab}
    onValueChange={(details) => setActiveTab(details.value)}
  >
    <Tabs.List>
      {tabConfigs.map((tab) => (
        <div
          key={tab.id}
          className={css({ position: 'relative' })}
          onMouseEnter={() => tab.disabled && setTooltipTab(tab.id)}
          onMouseLeave={() => setTooltipTab(null)}
        >
          <Tabs.Trigger value={tab.id} disabled={tab.disabled}>
            {tab.label}
            {tab.disabled && (
              <span className={css({ ml: '1', fontSize: 'xs', color: 'fg.muted' })}>
                🔒
              </span>
            )}
          </Tabs.Trigger>

          {/* Tooltip for disabled tabs */}
          {tab.disabled && tooltipTab === tab.id && tab.disabledReason && (
            <div
              className={css({
                position: 'absolute',
                top: 'full',
                left: '50%',
                transform: 'translateX(-50%)',
                mt: '2',
                p: '2',
                bg: 'gray.12',
                color: 'white',
                fontSize: 'xs',
                borderRadius: 'sm',
                whiteSpace: 'nowrap',
                zIndex: 10,
              })}
            >
              {tab.disabledReason}
            </div>
          )}
        </div>
      ))}
      <Tabs.Indicator />
    </Tabs.List>

    {tabConfigs.map((tab) => (
      <Tabs.Content key={tab.id} value={tab.id}>
        <div className={css({ p: '4' })}>{tab.content}</div>
      </Tabs.Content>
    ))}
  </Tabs.Root>
</div>
```

**Best practices:**

- Clearly indicate why a tab is disabled with tooltips or labels
- Use lock icons or visual indicators for disabled tabs
- Keep disabled tabs visible for discoverability
- Provide actionable steps to enable disabled tabs when possible
- Ensure `aria-disabled` is properly communicated to screen readers

---

### Async Tab Content - Lazy Loading

**Scenario:** Tab content is expensive to render or requires data fetching, so it should only load when the tab is first selected.

**Solution:**

```typescript
interface TabData {
  id: string;
  label: string;
  loaded: boolean;
  loading: boolean;
  data: any | null;
  error: string | null;
}

const [activeTab, setActiveTab] = useState('overview');
const [tabsData, setTabsData] = useState<Record<string, TabData>>({
  overview: { id: 'overview', label: 'Overview', loaded: true, loading: false, data: {}, error: null },
  analytics: { id: 'analytics', label: 'Analytics', loaded: false, loading: false, data: null, error: null },
  reports: { id: 'reports', label: 'Reports', loaded: false, loading: false, data: null, error: null },
});

// Load data when tab becomes active
useEffect(() => {
  const currentTab = tabsData[activeTab];

  if (!currentTab.loaded && !currentTab.loading) {
    // Start loading
    setTabsData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], loading: true },
    }));

    // Simulate async data fetch
    fetch(`/api/${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setTabsData((prev) => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            loaded: true,
            loading: false,
            data,
            error: null,
          },
        }));
      })
      .catch((error) => {
        setTabsData((prev) => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            loading: false,
            error: error.message,
          },
        }));
      });
  }
}, [activeTab]);

<Tabs.Root
  colorPalette="primary"
  value={activeTab}
  onValueChange={(details) => setActiveTab(details.value)}
>
  <Tabs.List>
    {Object.values(tabsData).map((tab) => (
      <Tabs.Trigger key={tab.id} value={tab.id}>
        {tab.label}
        {tab.loading && (
          <span className={css({ ml: '2' })}>
            <Spinner size="xs" />
          </span>
        )}
      </Tabs.Trigger>
    ))}
    <Tabs.Indicator />
  </Tabs.List>

  {Object.values(tabsData).map((tab) => (
    <Tabs.Content key={tab.id} value={tab.id}>
      <div className={css({ p: '4', minHeight: '200px' })}>
        {tab.loading && (
          <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2' })}>
            <Spinner />
            <p className={css({ color: 'fg.muted' })}>Loading {tab.label.toLowerCase()}...</p>
          </div>
        )}

        {tab.error && (
          <div className={css({ textAlign: 'center', color: 'error.fg' })}>
            <p>Failed to load {tab.label.toLowerCase()}</p>
            <p className={css({ fontSize: 'sm', mt: '2' })}>{tab.error}</p>
          </div>
        )}

        {tab.loaded && !tab.loading && !tab.error && (
          <div>
            <h3>{tab.label} Content</h3>
            <pre>{JSON.stringify(tab.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </Tabs.Content>
  ))}
</Tabs.Root>
```

**Best practices:**

- Show loading indicators in both the tab trigger and content area
- Cache loaded data to avoid refetching when switching back
- Handle errors gracefully with retry options
- Set minimum heights to prevent layout shifts during loading
- Use `activationMode="manual"` for expensive operations to prevent accidental loads

---

### Keyboard Navigation - Advanced Controls

**Scenario:** Implementing comprehensive keyboard navigation including Home, End, and proper arrow key behavior with looping.

**Solution:**

```typescript
const tabs = [
  { id: 'home', label: 'Home', content: 'Home content' },
  { id: 'profile', label: 'Profile', content: 'Profile content' },
  { id: 'settings', label: 'Settings', content: 'Settings content' },
  { id: 'help', label: 'Help', content: 'Help content' },
];

const [activeTab, setActiveTab] = useState('home');
const [lastInteraction, setLastInteraction] = useState<'mouse' | 'keyboard'>('mouse');

<div>
  {/* Keyboard shortcuts legend */}
  <div className={css({ mb: '3', p: '2', bg: 'gray.a2', borderRadius: 'sm', fontSize: 'sm' })}>
    <strong>Keyboard shortcuts:</strong> Arrow keys to navigate, Home/End for first/last tab,
    Enter/Space to activate (manual mode)
  </div>

  <Tabs.Root
    colorPalette="primary"
    value={activeTab}
    onValueChange={(details) => {
      setActiveTab(details.value);
    }}
    // Enable keyboard navigation
    loopFocus={true} // Arrow keys loop from last to first
    activationMode="automatic" // Change to "manual" for explicit Enter/Space activation
    onFocusChange={(details) => {
      // Track interaction type for analytics or styling
      setLastInteraction('keyboard');
    }}
  >
    <Tabs.List
      onMouseDown={() => setLastInteraction('mouse')}
      className={css({
        // Add visual indicator for keyboard focus
        '& [data-focus]': {
          outline: lastInteraction === 'keyboard' ? '2px solid' : 'none',
          outlineColor: 'primary.9',
          outlineOffset: '2px',
        },
      })}
    >
      {tabs.map((tab) => (
        <Tabs.Trigger key={tab.id} value={tab.id}>
          {tab.label}
        </Tabs.Trigger>
      ))}
      <Tabs.Indicator />
    </Tabs.List>

    {tabs.map((tab) => (
      <Tabs.Content
        key={tab.id}
        value={tab.id}
        // Make content focusable for screen readers
        tabIndex={0}
      >
        <div className={css({ p: '4' })}>{tab.content}</div>
      </Tabs.Content>
    ))}
  </Tabs.Root>

  <div className={css({ mt: '3', fontSize: 'sm', color: 'fg.muted' })}>
    Last interaction: {lastInteraction}
  </div>
</div>
```

**Best practices:**

- Enable `loopFocus` for intuitive circular navigation
- Use `activationMode="manual"` for tabs with expensive content
- Show clear focus indicators for keyboard navigation
- Make tab content focusable for screen reader access
- Test with keyboard-only navigation to ensure full accessibility
- Document keyboard shortcuts for users

---

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
