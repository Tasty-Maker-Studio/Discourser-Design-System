# Select

**Purpose:** Provides a dropdown menu for selecting one or more items from a list of options, ideal for forms and settings when screen space is limited or when there are many options to choose from.

## Import

```typescript
import { Select } from '@discourser/design-system';
```

## Component Structure

Select is a compound component built on Ark UI, providing a complete dropdown solution with built-in accessibility, keyboard navigation, and search functionality.

### Anatomy

```typescript
<Select.Root>
  <Select.Label />
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText />
      <Select.IndicatorGroup>
        <Select.Indicator />
      </Select.IndicatorGroup>
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        <Select.ItemGroup>
          <Select.ItemGroupLabel />
          <Select.Item>
            <Select.ItemText />
            <Select.ItemIndicator />
          </Select.Item>
        </Select.ItemGroup>
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

**Component Parts:**

- **Root**: Container managing select state and dropdown behavior
- **Label**: Descriptive label for the select field
- **Control**: Container for the trigger button
- **Trigger**: Button that opens/closes the dropdown
- **ValueText**: Displays the selected value(s)
- **IndicatorGroup**: Container for trigger indicators
- **Indicator**: Chevron icon showing dropdown state (default: ChevronsUpDownIcon)
- **Positioner**: Positions dropdown relative to trigger
- **Content**: Dropdown container with animations
- **List**: Scrollable list of options
- **Item**: Individual selectable option
- **ItemText**: Text content of an option
- **ItemIndicator**: Check icon shown on selected items
- **ItemGroup**: Groups related options together
- **ItemGroupLabel**: Label for a group of options
- **ClearTrigger**: Optional button to clear selection
- **HiddenSelect**: Hidden native select for form integration

## Variants

| Variant   | Visual Style                       | Usage             | When to Use                                          |
| --------- | ---------------------------------- | ----------------- | ---------------------------------------------------- |
| `outline` | Transparent background with border | Standard forms    | Default choice, works on light backgrounds           |
| `surface` | Subtle background with border      | Elevated sections | Cards, dialogs, surfaces that need visual separation |

### Visual Characteristics

- **outline**: Transparent background, gray border (gray.outline.border), focus ring inside
- **surface**: Gray surface background (gray.surface.bg), subtle border (gray.surface.border), focus ring inside

## Sizes

| Size | Height    | Padding    | Font Size | Item Height | Usage                                            |
| ---- | --------- | ---------- | --------- | ----------- | ------------------------------------------------ |
| `xs` | 32px (8)  | 8px (2)    | sm        | 32px (8)    | Very compact UI, dense data tables               |
| `sm` | 36px (9)  | 10px (2.5) | sm        | 36px (9)    | Compact forms, inline filters                    |
| `md` | 40px (10) | 12px (3)   | md        | 40px (10)   | Default, most use cases, standard forms          |
| `lg` | 44px (11) | 14px (3.5) | md        | 44px (11)   | Emphasis, mobile-friendly interfaces             |
| `xl` | 48px (12) | 16px (4)   | lg        | 48px (12)   | Hero sections, prominent selections, touch-first |

**Recommendation:** Use `md` for most cases. Use `lg` or `xl` for mobile-first designs or prominent selections.

## Props

### Root Props

| Prop            | Type                                    | Default     | Description                                |
| --------------- | --------------------------------------- | ----------- | ------------------------------------------ |
| `variant`       | `'outline' \| 'surface'`                | `'outline'` | Visual style variant                       |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`  | `'md'`      | Select size                                |
| `value`         | `string[]`                              | -           | Selected value(s) - controlled             |
| `defaultValue`  | `string[]`                              | -           | Initially selected value(s) - uncontrolled |
| `multiple`      | `boolean`                               | `false`     | Allow multiple selections                  |
| `disabled`      | `boolean`                               | `false`     | Disable the select                         |
| `invalid`       | `boolean`                               | `false`     | Mark select as invalid                     |
| `required`      | `boolean`                               | `false`     | Mark select as required                    |
| `name`          | `string`                                | -           | Form field name                            |
| `placeholder`   | `string`                                | -           | Placeholder text when no selection         |
| `onValueChange` | `(details: ValueChangeDetails) => void` | -           | Callback when selection changes            |
| `onOpenChange`  | `(details: { open: boolean }) => void`  | -           | Callback when dropdown opens/closes        |
| `positioning`   | `PositioningOptions`                    | -           | Custom dropdown positioning                |

### Item Props

| Prop       | Type               | Default  | Description              |
| ---------- | ------------------ | -------- | ------------------------ |
| `item`     | `string \| object` | Required | Value or collection item |
| `disabled` | `boolean`          | `false`  | Disable this option      |

**Note:** Select.Root extends Ark UI's SelectRootProps, supporting advanced features like virtual scrolling and custom item rendering.

## Examples

### Basic Usage

```typescript
// Simple select (uncontrolled)
<Select.Root items={['Option 1', 'Option 2', 'Option 3']}>
  <Select.Label>Select an option</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose one" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['Option 1', 'Option 2', 'Option 3'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### Controlled Select

```typescript
const [selectedValue, setSelectedValue] = useState<string[]>([]);

<Select.Root
  items={['small', 'medium', 'large']}
  value={selectedValue}
  onValueChange={(details) => setSelectedValue(details.value)}
>
  <Select.Label>Size</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select size" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['small', 'medium', 'large'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### With Object Items

```typescript
interface Country {
  value: string;
  label: string;
  code: string;
}

const countries: Country[] = [
  { value: 'us', label: 'United States', code: 'US' },
  { value: 'ca', label: 'Canada', code: 'CA' },
  { value: 'mx', label: 'Mexico', code: 'MX' },
];

<Select.Root
  items={countries}
  itemToValue={(item) => item.value}
  itemToString={(item) => item.label}
>
  <Select.Label>Country</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select country" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {countries.map((country) => (
          <Select.Item key={country.value} item={country}>
            <Select.ItemText>
              {country.code} - {country.label}
            </Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### Different Variants

```typescript
// Outline variant (default)
<Select.Root variant="outline" items={['Option 1', 'Option 2']}>
  <Select.Label>Outline Select</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose one" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['Option 1', 'Option 2'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>

// Surface variant
<Select.Root variant="surface" items={['Option 1', 'Option 2']}>
  <Select.Label>Surface Select</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose one" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['Option 1', 'Option 2'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### Different Sizes

```typescript
// Extra small
<Select.Root size="xs" items={['Option 1', 'Option 2']}>
  <Select.Label>Extra Small</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['Option 1', 'Option 2'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>

// Extra large (touch-friendly)
<Select.Root size="xl" items={['Option 1', 'Option 2']}>
  <Select.Label>Extra Large</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['Option 1', 'Option 2'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### Grouped Options

```typescript
const groupedItems = [
  { label: 'Fruits', options: ['Apple', 'Banana', 'Orange'] },
  { label: 'Vegetables', options: ['Carrot', 'Broccoli', 'Spinach'] },
];

<Select.Root items={groupedItems.flatMap(g => g.options)}>
  <Select.Label>Select food</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose food" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {groupedItems.map((group) => (
          <Select.ItemGroup key={group.label}>
            <Select.ItemGroupLabel>{group.label}</Select.ItemGroupLabel>
            {group.options.map((item) => (
              <Select.Item key={item} item={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.ItemGroup>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### Multiple Selection

```typescript
const [selected, setSelected] = useState<string[]>([]);

<Select.Root
  multiple
  items={['React', 'Vue', 'Angular', 'Svelte']}
  value={selected}
  onValueChange={(details) => setSelected(details.value)}
>
  <Select.Label>Select frameworks</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose frameworks" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['React', 'Vue', 'Angular', 'Svelte'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>

{/* Display selected items */}
<div className={css({ display: 'flex', gap: '2', flexWrap: 'wrap', mt: '2' })}>
  {selected.map((item) => (
    <span
      key={item}
      className={css({
        px: '2',
        py: '1',
        bg: 'gray.surface.bg',
        borderRadius: 'md',
        fontSize: 'sm'
      })}
    >
      {item}
    </span>
  ))}
</div>
```

### With Clear Button

```typescript
<Select.Root items={['Option 1', 'Option 2', 'Option 3']}>
  <Select.Label>Select with clear</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose one" />
      <Select.IndicatorGroup>
        <Select.ClearTrigger>×</Select.ClearTrigger>
        <Select.Indicator />
      </Select.IndicatorGroup>
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['Option 1', 'Option 2', 'Option 3'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### Disabled States

```typescript
// Entire select disabled
<Select.Root disabled items={['Option 1', 'Option 2']}>
  <Select.Label>Disabled Select</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Cannot select" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {['Option 1', 'Option 2'].map((item) => (
          <Select.Item key={item} item={item}>
            <Select.ItemText>{item}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>

// Individual options disabled
<Select.Root items={['Free', 'Pro', 'Enterprise']}>
  <Select.Label>Select plan</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose plan" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        <Select.Item item="Free">
          <Select.ItemText>Free</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
        <Select.Item item="Pro">
          <Select.ItemText>Pro</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
        <Select.Item item="Enterprise" disabled>
          <Select.ItemText>Enterprise (Coming Soon)</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

## Common Patterns

### Form Integration

```typescript
<form onSubmit={handleSubmit}>
  <Select.Root
    name="country"
    required
    items={countries}
    onValueChange={(details) => {
      setFormData({ ...formData, country: details.value[0] });
    }}
  >
    <Select.Label>
      Country
      <span className={css({ color: 'error.fg' })}> *</span>
    </Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select country" />
        <Select.Indicator />
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {countries.map((country) => (
            <Select.Item key={country} item={country}>
              <Select.ItemText>{country}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
  <Button type="submit">Submit</Button>
</form>
```

### With Validation

```typescript
const [value, setValue] = useState<string[]>([]);
const [error, setError] = useState('');

const handleSubmit = () => {
  if (value.length === 0) {
    setError('Please select an option');
    return;
  }
  setError('');
  // Process form
};

<div>
  <Select.Root
    invalid={!!error}
    items={options}
    value={value}
    onValueChange={(details) => {
      setValue(details.value);
      setError('');
    }}
  >
    <Select.Label>Required Field</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select option" />
        <Select.Indicator />
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {options.map((option) => (
            <Select.Item key={option} item={option}>
              <Select.ItemText>{option}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
  {error && (
    <div className={css({ color: 'error.fg', fontSize: 'sm', mt: '1' })}>
      {error}
    </div>
  )}
</div>
```

### Searchable Select (with filtering)

```typescript
const [searchTerm, setSearchTerm] = useState('');
const countries = ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina'];

const filteredCountries = countries.filter((country) =>
  country.toLowerCase().includes(searchTerm.toLowerCase())
);

<Select.Root items={filteredCountries}>
  <Select.Label>Search countries</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select country" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <div className={css({ p: '2', borderBottom: '1px solid', borderColor: 'gray.4' })}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
        />
      </div>
      <Select.List>
        {filteredCountries.map((country) => (
          <Select.Item key={country} item={country}>
            <Select.ItemText>{country}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>
```

### Filter Toolbar

```typescript
<div className={css({ display: 'flex', gap: '3', alignItems: 'flex-end' })}>
  <Select.Root size="sm" items={['All', 'Active', 'Inactive']}>
    <Select.Label>Status</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Filter by status" />
        <Select.Indicator />
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {['All', 'Active', 'Inactive'].map((item) => (
            <Select.Item key={item} item={item}>
              <Select.ItemText>{item}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>

  <Select.Root size="sm" items={['All', 'Admin', 'User', 'Guest']}>
    <Select.Label>Role</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Filter by role" />
        <Select.Indicator />
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {['All', 'Admin', 'User', 'Guest'].map((item) => (
            <Select.Item key={item} item={item}>
              <Select.ItemText>{item}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
</div>
```

## DO NOT

```typescript
// ❌ Don't use for 2-4 simple options (use RadioGroup instead)
<Select.Root items={['Yes', 'No']}>
  {/* Use RadioGroup for simple visible choices */}
</Select.Root>

// ✅ Use RadioGroup for few simple options
<RadioGroup.Root defaultValue="yes">
  <RadioGroup.Label>Enable feature?</RadioGroup.Label>
  <RadioGroup.Item value="yes">Yes</RadioGroup.Item>
  <RadioGroup.Item value="no">No</RadioGroup.Item>
</RadioGroup.Root>

// ❌ Don't omit Select.HiddenSelect (breaks form submission)
<Select.Root items={options}>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  {/* Missing Positioner, Content, and HiddenSelect */}
</Select.Root>

// ✅ Always include complete structure
<Select.Root items={options}>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>{/* items */}</Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>

// ❌ Don't use for immediate actions (use Button or Menu instead)
<Select.Root items={['Edit', 'Delete', 'Share']}>
  <Select.Label>Actions</Select.Label>
  {/* Use Menu for action lists */}
</Select.Root>

// ✅ Use Menu for actions
<Menu.Root>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Delete</Menu.Item>
    <Menu.Item>Share</Menu.Item>
  </Menu.Content>
</Menu.Root>

// ❌ Don't create selects without labels
<Select.Root items={options}>
  {/* No label - unclear purpose */}
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select..." />
    </Select.Trigger>
  </Select.Control>
</Select.Root>

// ✅ Always provide a descriptive label
<Select.Root items={options}>
  <Select.Label>Country</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select country" />
    </Select.Trigger>
  </Select.Control>
</Select.Root>

// ❌ Don't use for binary on/off toggles
<Select.Root items={['Enabled', 'Disabled']}>
  <Select.Label>Notifications</Select.Label>
  {/* Use Switch for on/off states */}
</Select.Root>

// ✅ Use Switch for toggles
<Switch.Root>
  <Switch.Label>Enable notifications</Switch.Label>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
</Switch.Root>
```

## Accessibility

The Select component follows WCAG 2.1 Level AA standards:

- **Keyboard Navigation**:
  - `Tab` focuses the trigger
  - `Enter` or `Space` opens/closes the dropdown
  - Arrow keys (↑/↓) navigate options
  - `Home`/`End` jump to first/last option
  - `Esc` closes dropdown
  - Type-ahead: typing filters/jumps to matching options
- **Focus Management**:
  - Clear focus indicator on trigger (2px ring inside)
  - Highlighted state on focused items in dropdown
  - Focus returns to trigger when dropdown closes
- **Screen Readers**:
  - Trigger has `role="combobox"` with `aria-expanded` state
  - Content has `role="listbox"` with `aria-labelledby`
  - Items have `role="option"` with `aria-selected` state
  - Selected items announced with visual indicator
- **Disabled State**:
  - Uses `aria-disabled` attribute
  - Visual opacity reduction (layerStyle: 'disabled')
  - Prevents interaction
- **Required Fields**: Use `aria-required` on Root

### Accessibility Best Practices

```typescript
// ✅ Always provide a descriptive label
<Select.Root items={countries}>
  <Select.Label>Country of residence</Select.Label>
  {/* ... */}
</Select.Root>

// ✅ Use meaningful placeholders
<Select.Trigger>
  <Select.ValueText placeholder="Select your country" />
  <Select.Indicator />
</Select.Trigger>

// ✅ Mark required fields clearly
<Select.Root required items={options}>
  <Select.Label>
    Country
    <span className={css({ color: 'error.fg' })}> *</span>
  </Select.Label>
  {/* ... */}
</Select.Root>

// ✅ Provide error feedback
<Select.Root invalid={hasError} items={options}>
  <Select.Label>Country</Select.Label>
  {/* ... */}
</Select.Root>
{hasError && (
  <div role="alert" className={css({ color: 'error.fg', fontSize: 'sm' })}>
    Please select a country
  </div>
)}

// ✅ Group related options with labels
<Select.ItemGroup>
  <Select.ItemGroupLabel>North America</Select.ItemGroupLabel>
  <Select.Item item="US">United States</Select.Item>
  <Select.Item item="CA">Canada</Select.Item>
</Select.ItemGroup>
```

## Variant Selection Guide

| Scenario                           | Recommended Variant         | Reasoning                                             |
| ---------------------------------- | --------------------------- | ----------------------------------------------------- |
| Standard forms on light background | `outline`                   | Clean, minimal, works well on white/light backgrounds |
| Forms in cards/dialogs             | `surface`                   | Provides visual separation on elevated surfaces       |
| Dense data tables                  | `outline` with `xs` or `sm` | Minimal visual weight, compact                        |
| Settings panels                    | `surface`                   | Subtle background helps distinguish fields            |
| Primary forms                      | `outline`                   | Default choice, most versatile                        |

## Size Selection Guide

| Scenario          | Recommended Size | Reasoning                                |
| ----------------- | ---------------- | ---------------------------------------- |
| Mobile interfaces | `lg` or `xl`     | Larger touch targets (44px+ recommended) |
| Desktop forms     | `md`             | Standard, comfortable size               |
| Data tables       | `xs` or `sm`     | Compact, fits in table cells             |
| Inline filters    | `sm`             | Minimal space usage                      |
| Hero sections     | `xl`             | Prominent, emphasizes importance         |
| Toolbar actions   | `sm` or `md`     | Balances space and usability             |

## State Behaviors

| State           | Visual Change                  | Behavior                            |
| --------------- | ------------------------------ | ----------------------------------- |
| **Default**     | Border, neutral colors         | Clickable, focusable                |
| **Hover**       | Subtle background change       | Indicates interactivity             |
| **Focus**       | 2px focus ring inside border   | Keyboard navigation indicator       |
| **Open**        | Dropdown slides in with fade   | Content visible, can select options |
| **Closed**      | Dropdown slides out with fade  | Content hidden, back to trigger     |
| **Selected**    | Item shows check icon          | Visual confirmation of selection    |
| **Highlighted** | Item background changes        | Keyboard/mouse focus on item        |
| **Disabled**    | Reduced opacity, gray          | Cannot interact, no pointer events  |
| **Invalid**     | Error styling (if implemented) | Shows validation error state        |

## When to Use Select vs. Other Components

| Use Select When                        | Use Instead                                           |
| -------------------------------------- | ----------------------------------------------------- |
| 5+ options to choose from              | -                                                     |
| Limited screen space                   | Use **RadioGroup** if 2-4 options and space available |
| Need searchable dropdown               | -                                                     |
| Single or multiple selection from list | -                                                     |
| Form field for data entry              | -                                                     |
| Binary on/off toggle                   | Use **Switch** for immediate state changes            |
| 2-4 simple visible choices             | Use **RadioGroup** for better scannability            |
| Navigation between pages               | Use **Tabs** or **Navigation**                        |
| Action menu                            | Use **Menu** or **Dropdown Menu**                     |

## Responsive Considerations

```typescript
// Mobile-first: Use larger size
<Select.Root
  size={{ base: 'lg', md: 'md' }}
  items={options}
>
  <Select.Label>Select option</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Choose one" />
      <Select.Indicator />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      <Select.List>
        {options.map((option) => (
          <Select.Item key={option} item={option}>
            <Select.ItemText>{option}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.List>
    </Select.Content>
  </Select.Positioner>
  <Select.HiddenSelect />
</Select.Root>

// Responsive form layout
<div className={css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
  gap: '4'
})}>
  <Select.Root items={countries}>
    <Select.Label>Country</Select.Label>
    {/* ... */}
  </Select.Root>

  <Select.Root items={states}>
    <Select.Label>State</Select.Label>
    {/* ... */}
  </Select.Root>
</div>

// Full-width on mobile, fixed width on desktop
<Select.Root
  items={options}
  className={css({ width: { base: 'full', md: '320px' } })}
>
  <Select.Label>Option</Select.Label>
  {/* ... */}
</Select.Root>
```

## Testing

When testing Select components:

```typescript
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('opens dropdown and selects option', async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();

  render(
    <Select.Root
      items={['Option 1', 'Option 2', 'Option 3']}
      onValueChange={handleChange}
    >
      <Select.Label>Select option</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Choose one" />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.List>
            {['Option 1', 'Option 2', 'Option 3'].map((item) => (
              <Select.Item key={item} item={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  );

  const trigger = screen.getByRole('combobox');
  await user.click(trigger);

  const listbox = screen.getByRole('listbox');
  const option2 = within(listbox).getByText('Option 2');
  await user.click(option2);

  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({ value: ['Option 2'] })
  );
});

test('keyboard navigation works correctly', async () => {
  const user = userEvent.setup();

  render(
    <Select.Root items={['Apple', 'Banana', 'Cherry']}>
      <Select.Label>Select fruit</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Choose fruit" />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.List>
            {['Apple', 'Banana', 'Cherry'].map((item) => (
              <Select.Item key={item} item={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  );

  const trigger = screen.getByRole('combobox');

  // Open with Enter
  await user.tab(); // Focus trigger
  expect(trigger).toHaveFocus();
  await user.keyboard('{Enter}');

  // Navigate with arrows
  await user.keyboard('{ArrowDown}');
  await user.keyboard('{ArrowDown}');

  // Select with Enter
  await user.keyboard('{Enter}');

  expect(trigger).toHaveTextContent('Banana');
});

test('disabled select cannot be interacted with', async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();

  render(
    <Select.Root
      disabled
      items={['Option 1', 'Option 2']}
      onValueChange={handleChange}
    >
      <Select.Label>Disabled select</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Cannot select" />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.List>
            {['Option 1', 'Option 2'].map((item) => (
              <Select.Item key={item} item={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  );

  const trigger = screen.getByRole('combobox');
  await user.click(trigger);

  expect(handleChange).not.toHaveBeenCalled();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('multiple selection works correctly', async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();

  render(
    <Select.Root
      multiple
      items={['React', 'Vue', 'Angular']}
      onValueChange={handleChange}
    >
      <Select.Label>Select frameworks</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Choose frameworks" />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.List>
            {['React', 'Vue', 'Angular'].map((item) => (
              <Select.Item key={item} item={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  );

  const trigger = screen.getByRole('combobox');
  await user.click(trigger);

  const listbox = screen.getByRole('listbox');
  await user.click(within(listbox).getByText('React'));
  await user.click(within(listbox).getByText('Vue'));

  expect(handleChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ value: expect.arrayContaining(['React', 'Vue']) })
  );
});
```

## Related Components

- **RadioGroup**: For 2-4 visible options where all choices should be scannable
- **Checkbox**: For multiple selections when all options should be visible
- **Switch**: For binary on/off toggles with immediate effect
- **Input**: For free-text entry instead of predefined options
- **Combobox**: For searchable select with autocomplete (if available)
- **Menu**: For action lists rather than form selections
