# Accordion

**Purpose:** Collapsible content panels for organizing and revealing information progressively, following Material Design 3 principles.

## When to Use This Component

Use Accordion when you need to **organize and progressively disclose related content in collapsible sections** to conserve space while keeping content accessible.

### Decision Tree

| Scenario                                            | Use Accordion? | Alternative               | Reasoning                                                       |
| --------------------------------------------------- | -------------- | ------------------------- | --------------------------------------------------------------- |
| Displaying FAQ with expandable answers              | ✅ Yes         | -                         | Perfect for progressively disclosing detailed information       |
| Organizing settings into collapsible sections       | ✅ Yes         | -                         | Groups related settings while saving vertical space             |
| User needs to view multiple sections simultaneously | ⚠️ Maybe       | Tabs or Separate sections | Accordion with `multiple={true}` works, but tabs may be clearer |
| Navigation between different views                  | ❌ No          | Tabs                      | Tabs show one view at a time with clear navigation              |
| Content where all sections should be visible        | ❌ No          | Regular sections          | Don't hide content that should always be visible                |
| Quick comparison of all options                     | ❌ No          | Table or Grid             | Accordion requires clicking to see content                      |

### Component Comparison

```typescript
// ✅ Accordion - FAQs with expandable answers
<Accordion.Root defaultValue="faq-1">
  <Accordion.Item value="faq-1">
    <Accordion.ItemTrigger>
      What is your return policy?
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        We accept returns within 30 days of purchase with original packaging.
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
  <Accordion.Item value="faq-2">
    <Accordion.ItemTrigger>
      How long does shipping take?
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        Standard shipping takes 5-7 business days.
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>

// ❌ Don't use Accordion for navigation - Use Tabs instead
<Accordion.Root>
  <Accordion.Item value="overview">
    <Accordion.ItemTrigger>Overview</Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Dashboard />
    </Accordion.ItemContent>
  </Accordion.Item>
  <Accordion.Item value="analytics">
    <Accordion.ItemTrigger>Analytics</Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <AnalyticsView />
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>

// ✅ Better: Use Tabs for view switching
<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="overview"><Dashboard /></Tabs.Content>
  <Tabs.Content value="analytics"><AnalyticsView /></Tabs.Content>
</Tabs.Root>

// ❌ Don't use Accordion when all content should be visible
<Accordion.Root multiple defaultValue={['step1', 'step2', 'step3']}>
  <Accordion.Item value="step1">
    <Accordion.ItemTrigger>Step 1</Accordion.ItemTrigger>
    <Accordion.ItemContent>Instructions</Accordion.ItemContent>
  </Accordion.Item>
  {/* If all steps need to be visible, don't hide them */}
</Accordion.Root>

// ✅ Better: Use regular sections for always-visible content
<Stack gap="4">
  <Section>
    <Heading>Step 1</Heading>
    <Text>Instructions...</Text>
  </Section>
  <Section>
    <Heading>Step 2</Heading>
    <Text>Instructions...</Text>
  </Section>
</Stack>
```

## Import

```typescript
import { Accordion } from '@discourser/design-system';
```

## Component Structure

The Accordion is a **compound component** that follows the composition pattern. All parts must be used together:

| Component                 | Purpose                                     | Required    |
| ------------------------- | ------------------------------------------- | ----------- |
| `Accordion.Root`          | Container that manages accordion state      | Yes         |
| `Accordion.Item`          | Individual collapsible section              | Yes         |
| `Accordion.ItemTrigger`   | Clickable header to toggle item             | Yes         |
| `Accordion.ItemContent`   | Collapsible content area                    | Yes         |
| `Accordion.ItemIndicator` | Visual indicator (chevron icon)             | Recommended |
| `Accordion.ItemBody`      | Wrapper for content with consistent spacing | Optional    |
| `Accordion.Context`       | Access accordion state in custom components | Advanced    |
| `Accordion.RootProvider`  | Provide external accordion state            | Advanced    |

**Important:** Never use accordion parts in isolation. They must be nested within `Accordion.Root`.

## Variants

The Accordion component supports 2 visual variants:

| Variant   | Visual Style                | Usage            | When to Use                             |
| --------- | --------------------------- | ---------------- | --------------------------------------- |
| `outline` | Border between items        | Default style    | FAQs, settings panels, content sections |
| `plain`   | No borders, minimal styling | Clean appearance | Minimalist designs, nested accordions   |

### Visual Characteristics

- **outline**: 1px border-bottom between items, clear visual separation
- **plain**: No borders, relying on spacing and typography for hierarchy

## Sizes

| Size | Trigger Height | Padding             | Font Size     | Usage                  |
| ---- | -------------- | ------------------- | ------------- | ---------------------- |
| `md` | auto           | 12px (y) / 16px (x) | textStyle: md | Default, all use cases |

**Note:** Currently only `md` size is defined. Additional sizes can be added to the recipe as needed.

## Props

### Root Props

| Prop            | Type                                     | Default     | Description                                               |
| --------------- | ---------------------------------------- | ----------- | --------------------------------------------------------- |
| `defaultValue`  | `string \| string[]`                     | -           | Initially expanded item(s)                                |
| `value`         | `string \| string[]`                     | -           | Controlled expanded item(s)                               |
| `onValueChange` | `(details: { value: string[] }) => void` | -           | Callback when expansion changes                           |
| `multiple`      | `boolean`                                | `false`     | Allow multiple items to be expanded simultaneously        |
| `collapsible`   | `boolean`                                | `true`      | Allow all items to be collapsed (when `multiple={false}`) |
| `disabled`      | `boolean`                                | `false`     | Disable all accordion items                               |
| `variant`       | `'outline' \| 'plain'`                   | `'outline'` | Visual style variant                                      |
| `size`          | `'md'`                                   | `'md'`      | Accordion size                                            |

### Item Props

| Prop       | Type      | Default  | Description                    |
| ---------- | --------- | -------- | ------------------------------ |
| `value`    | `string`  | Required | Unique identifier for the item |
| `disabled` | `boolean` | `false`  | Disable this specific item     |

### ItemTrigger Props

| Prop       | Type        | Default  | Description                          |
| ---------- | ----------- | -------- | ------------------------------------ |
| `children` | `ReactNode` | Required | Trigger content (usually title text) |

### ItemContent Props

| Prop       | Type        | Default  | Description         |
| ---------- | ----------- | -------- | ------------------- |
| `children` | `ReactNode` | Required | Collapsible content |

### ItemIndicator Props

| Prop       | Type        | Default               | Description                                 |
| ---------- | ----------- | --------------------- | ------------------------------------------- |
| `children` | `ReactNode` | `<ChevronDownIcon />` | Custom indicator icon (defaults to chevron) |

## Examples

### Basic Usage

```typescript
// Single item expanded at a time (default)
<Accordion.Root defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      What is React?
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        React is a JavaScript library for building user interfaces.
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.ItemTrigger>
      What is TypeScript?
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

### Multiple Items Expanded

```typescript
// Allow multiple items to be open simultaneously
<Accordion.Root multiple defaultValue={['item-1', 'item-2']}>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Section 1
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        First section content
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.ItemTrigger>
      Section 2
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        Second section content
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

### Controlled State

```typescript
const [value, setValue] = useState<string[]>(['item-1']);

<Accordion.Root
  multiple
  value={value}
  onValueChange={(details) => setValue(details.value)}
>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Controlled Item 1
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        This accordion is controlled by React state
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

### Non-Collapsible Mode

```typescript
// At least one item must always be open
<Accordion.Root multiple={false} collapsible={false} defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Always One Open
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        You cannot collapse all items in this mode
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

### Disabled Items

```typescript
<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Active Item
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        This item can be toggled
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>

  <Accordion.Item value="item-2" disabled>
    <Accordion.ItemTrigger>
      Disabled Item
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        This content cannot be accessed
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

### Plain Variant

```typescript
// Minimal styling without borders
<Accordion.Root variant="plain">
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Clean Design
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        No borders for a minimal aesthetic
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

### Dynamic Content

```typescript
const faqs = [
  { id: 'faq-1', question: 'How do I reset my password?', answer: 'Click on "Forgot Password" on the login page.' },
  { id: 'faq-2', question: 'How do I contact support?', answer: 'Email us at support@example.com' },
  { id: 'faq-3', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards and PayPal.' },
];

<Accordion.Root defaultValue="faq-1">
  {faqs.map((faq) => (
    <Accordion.Item key={faq.id} value={faq.id}>
      <Accordion.ItemTrigger>
        {faq.question}
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          {faq.answer}
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  ))}
</Accordion.Root>
```

## Common Patterns

### FAQ Section

```typescript
<section>
  <h2>Frequently Asked Questions</h2>
  <Accordion.Root variant="outline">
    <Accordion.Item value="shipping">
      <Accordion.ItemTrigger>
        What are your shipping options?
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          We offer standard (5-7 days) and express (2-3 days) shipping options.
          Free shipping on orders over $50.
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>

    <Accordion.Item value="returns">
      <Accordion.ItemTrigger>
        What is your return policy?
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          We accept returns within 30 days of purchase. Items must be unused
          and in original packaging.
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</section>
```

### Settings Panel

```typescript
<Accordion.Root multiple defaultValue={['account', 'privacy']}>
  <Accordion.Item value="account">
    <Accordion.ItemTrigger>
      Account Settings
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        <Input label="Email" defaultValue="user@example.com" />
        <Input label="Username" defaultValue="johndoe" />
        <Button>Save Changes</Button>
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>

  <Accordion.Item value="privacy">
    <Accordion.ItemTrigger>
      Privacy Settings
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        <Switch label="Allow marketing emails" />
        <Switch label="Public profile" defaultChecked />
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

### Rich Content

```typescript
<Accordion.Root>
  <Accordion.Item value="features">
    <Accordion.ItemTrigger>
      Key Features
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        <ul>
          <li>Real-time collaboration</li>
          <li>Cloud storage integration</li>
          <li>Advanced security features</li>
        </ul>
        <Button variant="text" rightIcon={<ArrowIcon />}>
          Learn More
        </Button>
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

## DO NOT

```typescript
// ❌ Don't use accordion parts without Root
<Accordion.Item value="item-1">
  <Accordion.ItemTrigger>Won't work</Accordion.ItemTrigger>
</Accordion.Item>

// ❌ Don't forget unique values for each item
<Accordion.Root>
  <Accordion.Item value="same">...</Accordion.Item>
  <Accordion.Item value="same">...</Accordion.Item>  // Collision!
</Accordion.Root>

// ❌ Don't use multiple={false} with array defaultValue
<Accordion.Root multiple={false} defaultValue={['item-1', 'item-2']}>
  // Only works with single string value when multiple={false}
</Accordion.Root>

// ❌ Don't nest interactive elements in ItemTrigger
<Accordion.ItemTrigger>
  <button>Nested button</button>  // Breaks accessibility
  <Accordion.ItemIndicator />
</Accordion.ItemTrigger>

// ❌ Don't omit ItemIndicator (poor UX)
<Accordion.ItemTrigger>
  No visual cue for expansion  // Users won't know it's expandable
</Accordion.ItemTrigger>

// ❌ Don't override styles with inline styles
<Accordion.Root style={{ backgroundColor: 'red' }}>  // Use variants instead
</Accordion.Root>

// ✅ Use compound components properly
<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Proper Structure
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>Content here</Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

## Accessibility

The Accordion component follows WCAG 2.1 Level AA standards and implements WAI-ARIA Accordion Pattern:

- **Keyboard Navigation**:
  - `Tab` / `Shift+Tab`: Navigate between triggers
  - `Enter` / `Space`: Toggle item expansion
  - `ArrowDown`: Focus next trigger
  - `ArrowUp`: Focus previous trigger
  - `Home`: Focus first trigger
  - `End`: Focus last trigger

- **ARIA Attributes**: Automatically managed
  - `role="region"` on content areas
  - `aria-expanded` on triggers (true/false)
  - `aria-controls` links trigger to content
  - `aria-labelledby` links content to trigger
  - `aria-disabled` on disabled items

- **Focus Management**: Clear focus indicators on keyboard navigation
- **Screen Readers**: Announce expansion state and content structure

### Accessibility Best Practices

```typescript
// ✅ Use descriptive trigger text
<Accordion.ItemTrigger>
  How do I reset my password?
  <Accordion.ItemIndicator />
</Accordion.ItemTrigger>

// ✅ Provide meaningful content
<Accordion.ItemContent>
  <Accordion.ItemBody>
    Step-by-step instructions with clear language
  </Accordion.ItemBody>
</Accordion.ItemContent>

// ✅ Use semantic HTML in content
<Accordion.ItemContent>
  <Accordion.ItemBody>
    <h3>Subsection Title</h3>
    <p>Well-structured content improves screen reader navigation</p>
  </Accordion.ItemBody>
</Accordion.ItemContent>

// ✅ Indicate disabled state clearly
<Accordion.Item value="locked" disabled>
  <Accordion.ItemTrigger>
    Premium Feature (Upgrade Required)
    <Accordion.ItemIndicator />
  </Accordion.ItemTrigger>
</Accordion.Item>
```

## Variant Selection Guide

| Scenario           | Recommended Variant | Reasoning                                  |
| ------------------ | ------------------- | ------------------------------------------ |
| FAQ section        | `outline`           | Clear visual separation between questions  |
| Settings panel     | `outline`           | Organized, scannable interface             |
| Nested content     | `plain`             | Avoid visual clutter with too many borders |
| Minimal design     | `plain`             | Clean, modern aesthetic                    |
| Form sections      | `outline`           | Clear boundaries between form groups       |
| Sidebar navigation | `plain`             | Streamlined appearance                     |

## State Behaviors

| State         | Visual Change                                       | Behavior                                    |
| ------------- | --------------------------------------------------- | ------------------------------------------- |
| **Collapsed** | Content hidden, chevron points down                 | ItemContent has `display: none`             |
| **Expanded**  | Content visible, chevron points up (rotated 180deg) | Smooth height animation via `expand-height` |
| **Hover**     | Trigger shows hover state                           | Visual feedback on interactive element      |
| **Focus**     | Focus ring on trigger                               | Keyboard navigation indicator               |
| **Disabled**  | 38% opacity, cursor not-allowed                     | Item cannot be toggled                      |

## Animation Details

The Accordion uses smooth expand/collapse animations:

- **Expand**: `expand-height` + `fade-in` over `normal` duration
- **Collapse**: `collapse-height` + `fade-out` over `normal` duration
- **Indicator**: 0.2s rotation transition

## Responsive Considerations

```typescript
// Mobile: Full width is default
<Accordion.Root>
  {/* Automatically responsive */}
</Accordion.Root>

// Desktop: May want to constrain width
<div className={css({ maxWidth: '800px', mx: 'auto' })}>
  <Accordion.Root>
    {/* Content with reasonable line length */}
  </Accordion.Root>
</div>

// Responsive padding in content
<Accordion.ItemContent>
  <Accordion.ItemBody>
    <div className={css({
      px: { base: '4', md: '6' },
      py: { base: '3', md: '4' }
    })}>
      Responsive content spacing
    </div>
  </Accordion.ItemBody>
</Accordion.ItemContent>
```

## Testing

When testing Accordion components:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('accordion expands on trigger click', async () => {
  render(
    <Accordion.Root>
      <Accordion.Item value="test">
        <Accordion.ItemTrigger>
          Question
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>Answer</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );

  const trigger = screen.getByText('Question');
  expect(screen.queryByText('Answer')).not.toBeVisible();

  await userEvent.click(trigger);
  expect(screen.getByText('Answer')).toBeVisible();
});

test('disabled item cannot be toggled', async () => {
  render(
    <Accordion.Root>
      <Accordion.Item value="test" disabled>
        <Accordion.ItemTrigger>
          Disabled
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>Content</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );

  const trigger = screen.getByText('Disabled');
  await userEvent.click(trigger);

  expect(screen.queryByText('Content')).not.toBeVisible();
  expect(trigger).toHaveAttribute('aria-disabled', 'true');
});

test('multiple mode allows multiple items open', async () => {
  render(
    <Accordion.Root multiple>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>
          First
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>First content</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.ItemTrigger>
          Second
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>Second content</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );

  await userEvent.click(screen.getByText('First'));
  await userEvent.click(screen.getByText('Second'));

  expect(screen.getByText('First content')).toBeVisible();
  expect(screen.getByText('Second content')).toBeVisible();
});

test('controlled accordion updates on value change', async () => {
  const TestComponent = () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <>
        <button onClick={() => setValue(['test'])}>Expand</button>
        <Accordion.Root value={value} onValueChange={(d) => setValue(d.value)}>
          <Accordion.Item value="test">
            <Accordion.ItemTrigger>Trigger</Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>Content</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </>
    );
  };

  render(<TestComponent />);
  await userEvent.click(screen.getByText('Expand'));
  expect(screen.getByText('Content')).toBeVisible();
});
```

## Related Components

- **Tabs**: For switching between different views (not progressive disclosure)
- **Dialog**: For modal overlays with focused content
- **Collapsible**: For single collapsible sections (simpler alternative)
- **Menu**: For navigation or action menus
