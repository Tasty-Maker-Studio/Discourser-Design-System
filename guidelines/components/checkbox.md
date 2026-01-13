# Checkbox

**Purpose:** Binary selection control for toggling options on/off, supporting single checkboxes and checkbox groups.

## When to Use This Component

Use Checkbox when you need **binary selections** that are part of a form or when users can select multiple independent options.

**Decision Tree:**

| Scenario                                                        | Use This    | Why                                       |
| --------------------------------------------------------------- | ----------- | ----------------------------------------- |
| Form consent (accept terms, subscribe to newsletter)            | Checkbox ✅ | Standard for form agreements              |
| Multiple selections from a list (select interests, features)    | Checkbox ✅ | Users can pick multiple items             |
| Single binary choice in a form                                  | Checkbox ✅ | Form submission context                   |
| Toggle setting with immediate effect (dark mode, notifications) | Switch      | Visual metaphor for instant state changes |
| Mutually exclusive choices (select one from many)               | RadioGroup  | Only one option can be selected           |
| Action trigger (save, delete)                                   | Button      | Explicit action with confirmation         |

**Component Comparison:**

```typescript
// ✅ Use Checkbox for form consent
<form onSubmit={handleSubmit}>
  <Checkbox.Root name="terms">
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>I accept the terms and conditions</Checkbox.Label>
  </Checkbox.Root>
  <Button type="submit">Sign Up</Button>
</form>

// ✅ Use Checkbox for multiple selections
<Checkbox.Group value={selectedInterests} onValueChange={setSelectedInterests}>
  <Checkbox.Root value="sports">
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    <Checkbox.Label>Sports</Checkbox.Label>
  </Checkbox.Root>
  <Checkbox.Root value="music">
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    <Checkbox.Label>Music</Checkbox.Label>
  </Checkbox.Root>
  <Checkbox.Root value="travel">
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    <Checkbox.Label>Travel</Checkbox.Label>
  </Checkbox.Root>
</Checkbox.Group>

// ❌ Don't use Checkbox for instant toggles - use Switch
<Checkbox.Root checked={isDarkMode} onCheckedChange={setDarkMode}>
  <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
  <Checkbox.Label>Dark mode</Checkbox.Label>
</Checkbox.Root>  // Wrong - settings that apply immediately should use Switch

<Switch.Root checked={isDarkMode} onCheckedChange={setDarkMode}>
  <Switch.Label>Dark mode</Switch.Label>
  <Switch.Control><Switch.Thumb /></Switch.Control>
</Switch.Root>  // Correct

// ❌ Don't use Checkbox for exclusive choices - use RadioGroup
<Checkbox.Group>
  <Checkbox.Root value="small">
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    <Checkbox.Label>Small</Checkbox.Label>
  </Checkbox.Root>
  <Checkbox.Root value="medium">
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    <Checkbox.Label>Medium</Checkbox.Label>
  </Checkbox.Root>
  <Checkbox.Root value="large">
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    <Checkbox.Label>Large</Checkbox.Label>
  </Checkbox.Root>
</Checkbox.Group>  // Wrong - users shouldn't select multiple sizes

<RadioGroup.Root>
  <RadioGroup.Item value="small">
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText>Small</RadioGroup.ItemText>
  </RadioGroup.Item>
  <RadioGroup.Item value="medium">
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText>Medium</RadioGroup.ItemText>
  </RadioGroup.Item>
  <RadioGroup.Item value="large">
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText>Large</RadioGroup.ItemText>
  </RadioGroup.Item>
</RadioGroup.Root>  // Correct
```

## Import

```typescript
import * as Checkbox from '@discourser/design-system';
```

## Component Structure

Checkbox uses a compound component pattern with these parts:

- `Checkbox.Root` - Container for the checkbox
- `Checkbox.Control` - The visual checkbox element
- `Checkbox.Label` - Text label for the checkbox
- `Checkbox.Indicator` - Checkmark icon (built-in)
- `Checkbox.HiddenInput` - Hidden native input
- `Checkbox.Group` - Container for multiple checkboxes

## Variants

| Variant   | Visual Style                          | Usage                | When to Use              |
| --------- | ------------------------------------- | -------------------- | ------------------------ |
| `solid`   | Filled background when checked        | Primary checkboxes   | Default, most use cases  |
| `outline` | Border only, highlighted when checked | Secondary checkboxes | Forms with less emphasis |
| `surface` | Surface background                    | Alternative style    | Cards, elevated surfaces |
| `subtle`  | Subtle background                     | Low-emphasis options | Settings, preferences    |
| `plain`   | Minimal styling                       | Text-like checkboxes | Inline selections        |

### Visual Characteristics

- **solid**: Filled with primary color when checked, white checkmark
- **outline**: Border changes to primary color when checked, checkmark inside
- **surface**: Surface background with border
- **subtle**: Subtle gray background
- **plain**: Minimal styling, blends with text

## Sizes

| Size | Box Size | Label Text    | Usage                        |
| ---- | -------- | ------------- | ---------------------------- |
| `sm` | 18px     | Small (14px)  | Compact forms, dense layouts |
| `md` | 20px     | Medium (16px) | Default, most use cases      |
| `lg` | 22px     | Large (18px)  | Touch targets, mobile-first  |

**Recommendation:** Use `md` for most cases. Use `lg` for mobile or touch-focused interfaces.

## Props

### Root Props

| Prop              | Type                         | Default | Description                         |
| ----------------- | ---------------------------- | ------- | ----------------------------------- |
| `checked`         | `boolean \| 'indeterminate'` | -       | Controlled checked state            |
| `defaultChecked`  | `boolean`                    | `false` | Uncontrolled default checked state  |
| `onCheckedChange` | `(details) => void`          | -       | Callback when checked state changes |
| `disabled`        | `boolean`                    | `false` | Disable interaction                 |
| `invalid`         | `boolean`                    | `false` | Mark as invalid                     |
| `required`        | `boolean`                    | `false` | Mark as required                    |
| `name`            | `string`                     | -       | Form field name                     |
| `value`           | `string`                     | -       | Form field value                    |

### Style Props

| Prop      | Type                                                       | Default   | Description          |
| --------- | ---------------------------------------------------------- | --------- | -------------------- |
| `variant` | `'solid' \| 'outline' \| 'surface' \| 'subtle' \| 'plain'` | `'solid'` | Visual style variant |
| `size`    | `'sm' \| 'md' \| 'lg'`                                     | `'md'`    | Checkbox size        |

## Examples

### Basic Usage

```typescript
import * as Checkbox from '@discourser/design-system';

// Single checkbox
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
</Checkbox.Root>
```

### Controlled Checkbox

```typescript
const [accepted, setAccepted] = useState(false);

<Checkbox.Root
  checked={accepted}
  onCheckedChange={(details) => setAccepted(details.checked)}
>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>I agree to the terms</Checkbox.Label>
</Checkbox.Root>
```

### Different Variants

```typescript
// Solid (default)
<Checkbox.Root variant="solid">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Solid checkbox</Checkbox.Label>
</Checkbox.Root>

// Outline
<Checkbox.Root variant="outline">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Outline checkbox</Checkbox.Label>
</Checkbox.Root>

// Subtle
<Checkbox.Root variant="subtle">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Subtle checkbox</Checkbox.Label>
</Checkbox.Root>
```

### Different Sizes

```typescript
// Small
<Checkbox.Root size="sm">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Small checkbox</Checkbox.Label>
</Checkbox.Root>

// Medium (default)
<Checkbox.Root size="md">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Medium checkbox</Checkbox.Label>
</Checkbox.Root>

// Large
<Checkbox.Root size="lg">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Large checkbox</Checkbox.Label>
</Checkbox.Root>
```

### Indeterminate State

```typescript
// "Select all" checkbox that shows indeterminate when some items selected
const [selectedItems, setSelectedItems] = useState<string[]>([]);
const allItems = ['item1', 'item2', 'item3'];
const allSelected = selectedItems.length === allItems.length;
const someSelected = selectedItems.length > 0 && !allSelected;

<Checkbox.Root
  checked={someSelected ? 'indeterminate' : allSelected}
  onCheckedChange={(details) => {
    if (details.checked) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  }}
>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Select all</Checkbox.Label>
</Checkbox.Root>
```

### Checkbox Group

```typescript
import * as Checkbox from '@discourser/design-system';

const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['email']);

<Checkbox.Group
  value={selectedFeatures}
  onValueChange={(details) => setSelectedFeatures(details.value)}
>
  <label>
    <span>Notification Preferences</span>
  </label>

  <Checkbox.Root value="email">
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Email notifications</Checkbox.Label>
  </Checkbox.Root>

  <Checkbox.Root value="push">
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Push notifications</Checkbox.Label>
  </Checkbox.Root>

  <Checkbox.Root value="sms">
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>SMS notifications</Checkbox.Label>
  </Checkbox.Root>
</Checkbox.Group>
```

### Disabled State

```typescript
// Disabled unchecked
<Checkbox.Root disabled>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Disabled option</Checkbox.Label>
</Checkbox.Root>

// Disabled checked
<Checkbox.Root disabled checked>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Disabled checked option</Checkbox.Label>
</Checkbox.Root>
```

### Invalid State

```typescript
const [accepted, setAccepted] = useState(false);
const [submitted, setSubmitted] = useState(false);
const invalid = submitted && !accepted;

<div>
  <Checkbox.Root
    checked={accepted}
    invalid={invalid}
    onCheckedChange={(details) => setAccepted(details.checked)}
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>I accept the terms and conditions *</Checkbox.Label>
  </Checkbox.Root>

  {invalid && (
    <div className={css({ color: 'error', textStyle: 'sm', mt: '1' })}>
      You must accept the terms to continue
    </div>
  )}

  <Button onClick={() => setSubmitted(true)}>Submit</Button>
</div>
```

## Common Patterns

### Terms and Conditions

```typescript
const [agreed, setAgreed] = useState(false);

<div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
  <Checkbox.Root
    checked={agreed}
    onCheckedChange={(details) => setAgreed(details.checked)}
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>
      I agree to the{' '}
      <a href="/terms" className={css({ color: 'primary', textDecoration: 'underline' })}>
        Terms of Service
      </a>{' '}
      and{' '}
      <a href="/privacy" className={css({ color: 'primary', textDecoration: 'underline' })}>
        Privacy Policy
      </a>
    </Checkbox.Label>
  </Checkbox.Root>

  <Button variant="filled" disabled={!agreed}>
    Continue
  </Button>
</div>
```

### Settings List

```typescript
const [settings, setSettings] = useState({
  emailNotifications: true,
  pushNotifications: false,
  darkMode: true,
  autoSave: true,
});

<div className={css({ display: 'flex', flexDirection: 'column', gap: 'lg' })}>
  <Heading size="md">Settings</Heading>

  <Checkbox.Root
    checked={settings.emailNotifications}
    onCheckedChange={(details) =>
      setSettings({ ...settings, emailNotifications: details.checked })
    }
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Email notifications</Checkbox.Label>
  </Checkbox.Root>

  <Checkbox.Root
    checked={settings.pushNotifications}
    onCheckedChange={(details) =>
      setSettings({ ...settings, pushNotifications: details.checked })
    }
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Push notifications</Checkbox.Label>
  </Checkbox.Root>

  <Checkbox.Root
    checked={settings.darkMode}
    onCheckedChange={(details) =>
      setSettings({ ...settings, darkMode: details.checked })
    }
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Dark mode</Checkbox.Label>
  </Checkbox.Root>
</div>
```

### Filter List

```typescript
const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

<div>
  <Heading size="sm">Filter Results</Heading>

  <Checkbox.Group
    value={selectedFilters}
    onValueChange={(details) => setSelectedFilters(details.value)}
  >
    <Checkbox.Root value="inStock" variant="outline">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>In stock</Checkbox.Label>
    </Checkbox.Root>

    <Checkbox.Root value="onSale" variant="outline">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>On sale</Checkbox.Label>
    </Checkbox.Root>

    <Checkbox.Root value="freeShipping" variant="outline">
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Free shipping</Checkbox.Label>
    </Checkbox.Root>
  </Checkbox.Group>
</div>
```

## DO NOT

```typescript
// ❌ Don't use native checkbox input
<input type="checkbox" />  // Use Checkbox component instead

// ❌ Don't forget HiddenInput (needed for forms)
<Checkbox.Root>
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Option</Checkbox.Label>
</Checkbox.Root>  // Missing <Checkbox.HiddenInput />

// ❌ Don't forget Label (accessibility issue)
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
</Checkbox.Root>  // Missing label

// ❌ Don't use checkbox for single exclusive choice
<Checkbox.Root>...</Checkbox.Root>  // Use RadioGroup for exclusive selections

// ❌ Don't override checkbox colors with inline styles
<Checkbox.Control style={{ backgroundColor: 'red' }}>
  <Checkbox.Indicator />
</Checkbox.Control>  // Use variants instead

// ✅ Use complete Checkbox structure
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Accept terms</Checkbox.Label>
</Checkbox.Root>
```

## Accessibility

The Checkbox component follows WCAG 2.1 Level AA standards:

- **Keyboard Navigation**: Space to toggle, Tab to navigate
- **Focus Indicator**: Clear focus ring on keyboard navigation
- **ARIA Attributes**: Proper `role="checkbox"` and `aria-checked`
- **Labels**: Associated labels for screen readers
- **Disabled State**: Proper `aria-disabled` attribute
- **Touch Targets**: Minimum 44x44px with size md or larger

### Accessibility Best Practices

```typescript
// ✅ Always provide a label
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Subscribe to newsletter</Checkbox.Label>
</Checkbox.Root>

// ✅ Use required attribute for required fields
<Checkbox.Root required>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>I accept the terms *</Checkbox.Label>
</Checkbox.Root>

// ✅ Provide error messages for invalid state
<div>
  <Checkbox.Root invalid={!accepted && submitted}>
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Accept terms</Checkbox.Label>
  </Checkbox.Root>
  {!accepted && submitted && (
    <span role="alert" className={css({ color: 'error' })}>
      Required field
    </span>
  )}
</div>

// ✅ Group related checkboxes
<Checkbox.Group aria-label="Notification preferences">
  {/* Checkboxes here */}
</Checkbox.Group>
```

## Variant Selection Guide

| Scenario          | Recommended Variant | Reasoning                              |
| ----------------- | ------------------- | -------------------------------------- |
| Terms acceptance  | `solid`             | Clear, prominent for important consent |
| Settings toggles  | `solid` or `subtle` | Clear state indication                 |
| Filter options    | `outline`           | Less prominent, multiple selections    |
| Feature flags     | `solid`             | Default, clear on/off state            |
| Inline selections | `plain`             | Minimal, blends with content           |
| Form checkboxes   | `solid`             | Standard, clear visual feedback        |

## State Behaviors

| State             | Visual Change                 | Behavior                               |
| ----------------- | ----------------------------- | -------------------------------------- |
| **Unchecked**     | Empty box with border         | Default state                          |
| **Checked**       | Filled box with checkmark     | Selected state                         |
| **Indeterminate** | Filled box with dash          | Partial selection (e.g., "select all") |
| **Hover**         | Background color change       | Interactive feedback                   |
| **Focus**         | Focus ring appears            | Keyboard navigation indicator          |
| **Disabled**      | Grayed out, reduced opacity   | Cannot be toggled                      |
| **Invalid**       | Error color border/background | Validation error                       |

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('checkbox can be checked and unchecked', async () => {
  const handleChange = vi.fn();

  render(
    <Checkbox.Root onCheckedChange={handleChange}>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Accept terms</Checkbox.Label>
    </Checkbox.Root>
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

  await userEvent.click(checkbox);
  expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ checked: true }));

  await userEvent.click(checkbox);
  expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ checked: false }));
});

test('disabled checkbox cannot be toggled', async () => {
  render(
    <Checkbox.Root disabled>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Disabled</Checkbox.Label>
    </Checkbox.Root>
  );

  const checkbox = screen.getByRole('checkbox');
  await userEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
});
```

## Related Components

- **RadioGroup** - For exclusive single selections
- **Switch** - For on/off toggles (different visual metaphor)
- **Button** - For action triggers
- **Select** - For choosing from many options
