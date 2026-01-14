# Button

**Purpose:** Primary interactive element for user actions following Material Design 3 patterns.

## When to Use This Component

Use Button when you need a clickable element that **triggers an action** (submit, save, cancel, etc.).

**Decision Tree:**

| Scenario                                 | Use This                      | Why                                               |
| ---------------------------------------- | ----------------------------- | ------------------------------------------------- |
| Trigger an action (submit, save, delete) | Button ✅                     | Semantic action element                           |
| Navigate to a different page/route       | `<a>` tag or Next.js `<Link>` | Navigation should use links for SEO/accessibility |
| Icon-only action (close, menu, settings) | IconButton                    | Better for icon-only affordances                  |
| Toggle state (on/off, enable/disable)    | Switch                        | Visual metaphor for state changes                 |
| Select from options (exclusive choice)   | RadioGroup                    | For mutually exclusive selections                 |
| Select multiple options                  | Checkbox                      | For multiple selections                           |

**Component Comparison:**

```typescript
// ✅ Use Button for actions
<Button onClick={handleSave}>Save</Button>
<Button onClick={handleDelete}>Delete</Button>

// ❌ Don't use Button for navigation - use Link
<Button onClick={() => router.push('/page')}>Go to Page</Button>  // Wrong
<Link href="/page">Go to Page</Link>  // Correct

// ❌ Don't use Button for icon-only - use IconButton
<Button><CloseIcon /></Button>  // Wrong
<IconButton aria-label="Close"><CloseIcon /></IconButton>  // Correct

// ❌ Don't use Button for toggles - use Switch
<Button onClick={toggleDarkMode}>Dark Mode</Button>  // Wrong
<Switch checked={isDarkMode} onCheckedChange={setDarkMode}>Dark Mode</Switch>  // Correct
```

## Import

```typescript
import { Button } from '@discourser/design-system';
```

## Variants

The Button component supports 5 Material Design 3 variants, each with specific use cases:

| Variant    | Visual Style                          | Usage             | When to Use                                                        |
| ---------- | ------------------------------------- | ----------------- | ------------------------------------------------------------------ |
| `filled`   | Solid background with primary color   | Primary actions   | Submit forms, confirm dialogs, main CTAs                           |
| `outlined` | Transparent background with border    | Secondary actions | Cancel buttons, back navigation, alternative options               |
| `text`     | Transparent background, no border     | Tertiary actions  | Links, less prominent actions, dialog actions                      |
| `elevated` | Elevated surface with subtle shadow   | Floating actions  | FAB-like buttons, actions that need emphasis but not primary color |
| `tonal`    | Filled with secondary container color | Medium emphasis   | Secondary CTAs, soft highlights, supportive actions                |

### Visual Characteristics

- **filled**: Primary color background, white text, slight shadow on hover
- **outlined**: Transparent background, primary color text, 1px outline border
- **text**: Transparent background, primary color text, no border
- **elevated**: Surface container background, primary color text, level 1 shadow
- **tonal**: Secondary container background, on-secondary-container text

## Sizes

| Size | Height | Padding (Horizontal) | Font Size   | Usage                                         |
| ---- | ------ | -------------------- | ----------- | --------------------------------------------- |
| `sm` | 32px   | 16px (md)            | labelMedium | Compact UI, dense layouts, small dialogs      |
| `md` | 40px   | 24px (lg)            | labelLarge  | Default, most use cases                       |
| `lg` | 48px   | 32px (xl)            | labelLarge  | Touch targets, mobile emphasis, hero sections |

**Recommendation:** Use `md` for most cases. Use `lg` for mobile-first designs or prominent CTAs.

## Props

| Prop        | Type                                                        | Default    | Description                            |
| ----------- | ----------------------------------------------------------- | ---------- | -------------------------------------- |
| `variant`   | `'filled' \| 'outlined' \| 'text' \| 'elevated' \| 'tonal'` | `'filled'` | Visual style variant                   |
| `size`      | `'sm' \| 'md' \| 'lg'`                                      | `'md'`     | Button size                            |
| `leftIcon`  | `ReactNode`                                                 | -          | Icon or element before button text     |
| `rightIcon` | `ReactNode`                                                 | -          | Icon or element after button text      |
| `disabled`  | `boolean`                                                   | `false`    | Disable button interaction             |
| `onClick`   | `(event: MouseEvent) => void`                               | -          | Click handler                          |
| `type`      | `'button' \| 'submit' \| 'reset'`                           | `'button'` | HTML button type                       |
| `className` | `string`                                                    | -          | Additional CSS classes (use sparingly) |
| `children`  | `ReactNode`                                                 | Required   | Button text content                    |

**Note:** Button extends `ButtonHTMLAttributes<HTMLButtonElement>`, so all standard HTML button attributes are supported.

## Examples

### Basic Usage

```typescript
// Primary action (default)
<Button>Submit</Button>

// Secondary action
<Button variant="outlined">Cancel</Button>

// Tertiary action
<Button variant="text">Learn More</Button>

// Medium emphasis
<Button variant="tonal">Save Draft</Button>

// Floating action
<Button variant="elevated">Create</Button>
```

### With Icons

```typescript
import { PlusIcon, ArrowRightIcon } from 'your-icon-library';

// Icon on left
<Button leftIcon={<PlusIcon />}>
  Add Item
</Button>

// Icon on right
<Button rightIcon={<ArrowRightIcon />}>
  Continue
</Button>

// Both icons (rare, but supported)
<Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
  Add and Continue
</Button>
```

### Sizes

```typescript
// Small button (compact UI)
<Button size="sm">Save</Button>

// Default size
<Button size="md">Submit</Button>

// Large button (mobile-friendly)
<Button size="lg">Get Started</Button>
```

### Form Integration

```typescript
// Submit button
<form onSubmit={handleSubmit}>
  <Input label="Email" />
  <Button type="submit">Sign Up</Button>
</form>

// Reset button
<Button type="reset" variant="text">Reset Form</Button>
```

### Disabled State

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

<Button disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

### Event Handling

```typescript
const handleClick = () => {
  console.log('Button clicked!');
};

<Button onClick={handleClick}>Click Me</Button>

// With event parameter
<Button onClick={(e) => {
  e.preventDefault();
  handleSubmit();
}}>
  Submit
</Button>
```

## Common Patterns

### Primary/Secondary Button Group

```typescript
<div className={css({ display: 'flex', gap: 'sm' })}>
  <Button variant="outlined">Cancel</Button>
  <Button variant="filled">Confirm</Button>
</div>
```

### Dialog Actions

```typescript
<Dialog.Content>
  <Dialog.Title>Confirm Action</Dialog.Title>
  <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>

  <div className={css({ display: 'flex', gap: 'sm', justifyContent: 'flex-end' })}>
    <Button variant="text">Cancel</Button>
    <Button variant="filled">Confirm</Button>
  </div>
</Dialog.Content>
```

### Loading State

```typescript
const [loading, setLoading] = useState(false);

<Button disabled={loading}>
  {loading && <Spinner />}
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

## DO NOT

```typescript
// ❌ Don't use native button element
<button className="...">Submit</button>  // Use <Button> instead

// ❌ Don't override button styles with inline styles
<Button style={{ backgroundColor: 'red' }}>Delete</Button>

// ❌ Don't use multiple filled buttons next to each other (unclear hierarchy)
<div>
  <Button variant="filled">Save</Button>
  <Button variant="filled">Delete</Button>  // Use outlined or text instead
</div>

// ❌ Don't use button for navigation (use <a> tag or Next.js Link)
<Button onClick={() => router.push('/page')}>Go to Page</Button>  // Bad

// ❌ Don't omit text for accessibility (use IconButton instead)
<Button><TrashIcon /></Button>  // Use <IconButton> for icon-only

// ✅ Use IconButton for icon-only actions
<IconButton aria-label="Delete"><TrashIcon /></IconButton>
```

## Accessibility

The Button component follows WCAG 2.1 Level AA standards:

- **Keyboard Navigation**: Focusable via Tab key, activates with Enter/Space
- **Focus Indicator**: 2px outline on focus-visible
- **Disabled State**: Uses `disabled` attribute, opacity 0.38, pointer-events: none
- **Touch Target**: Minimum 44x44px (use `md` or `lg` size)
- **Color Contrast**: All variants meet 4.5:1 contrast ratio

### Accessibility Best Practices

```typescript
// ✅ Always provide meaningful text
<Button>Submit Form</Button>

// ✅ Use aria-label for dynamic content
<Button aria-label={`Delete ${itemName}`}>Delete</Button>

// ✅ Indicate loading state
<Button aria-busy={loading} disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</Button>

// ✅ Use proper button types
<Button type="submit">Submit</Button>
<Button type="reset">Reset</Button>
```

## Variant Selection Guide

| Scenario               | Recommended Variant  | Reasoning                                 |
| ---------------------- | -------------------- | ----------------------------------------- |
| Form submission        | `filled`             | Primary action, needs highest emphasis    |
| Cancel/Back            | `outlined` or `text` | Secondary action, lower emphasis          |
| Dialog confirmation    | `filled`             | Primary action in dialog                  |
| Dialog dismiss         | `text`               | Tertiary action, minimal emphasis         |
| Save draft             | `tonal`              | Medium emphasis, not primary action       |
| Delete/Destructive     | `filled` or `tonal`  | High attention, but consider error colors |
| Filter/Sort            | `text` or `outlined` | Lower emphasis, frequent use              |
| Floating action button | `elevated`           | Needs to float above content              |
| Link-like actions      | `text`               | Minimal emphasis, inline with text        |

## State Behaviors

| State        | Visual Change                 | Behavior                                                                                                                |
| ------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Hover**    | Opacity change or shadow      | `filled`: 92% opacity + level1 shadow<br />`outlined`: 8% primary background<br />`elevated`: Increase shadow to level2 |
| **Active**   | Further opacity/shadow change | `filled`: 88% opacity<br />`outlined`: 12% primary background                                                           |
| **Focus**    | 2px outline                   | Primary color outline, 2px offset                                                                                       |
| **Disabled** | 38% opacity, no interaction   | Cannot be clicked, greyed out appearance                                                                                |

## Responsive Considerations

```typescript
// Mobile-first: Use larger buttons for touch
<Button size="lg">Submit</Button>

// Desktop: Can use smaller sizes
<Button size={{ base: 'lg', md: 'md' }}>Submit</Button>

// Responsive button group
<div className={css({
  display: 'flex',
  flexDirection: { base: 'column', md: 'row' },
  gap: 'sm'
})}>
  <Button variant="outlined">Cancel</Button>
  <Button variant="filled">Confirm</Button>
</div>
```

## Testing

When testing Button components:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('button handles click events', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  const button = screen.getByRole('button', { name: 'Click Me' });
  await userEvent.click(button);

  expect(handleClick).toHaveBeenCalledOnce();
});

test('disabled button cannot be clicked', async () => {
  const handleClick = vi.fn();
  render(<Button disabled onClick={handleClick}>Click Me</Button>);

  const button = screen.getByRole('button', { name: 'Click Me' });
  await userEvent.click(button);

  expect(handleClick).not.toHaveBeenCalled();
  expect(button).toBeDisabled();
});
```
