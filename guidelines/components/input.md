# Input

**Purpose:** Text input field with built-in label, validation, and helper text following Material Design 3 patterns.

## When to Use This Component

Use Input when you need **single-line text entry** from the user (names, emails, search terms, etc.).

**Decision Tree:**

| Scenario                                           | Use This                             | Why                                        |
| -------------------------------------------------- | ------------------------------------ | ------------------------------------------ |
| Single-line text (name, email, username, search)   | Input ✅                             | Optimized for single-line entry            |
| Multi-line text (comments, descriptions, messages) | Textarea                             | Allows line breaks, expandable height      |
| Select from predefined options (4+ choices)        | Select                               | More efficient than typing, prevents typos |
| Select from 2-3 options                            | RadioGroup                           | Visual comparison of all options           |
| Binary choice (yes/no, on/off)                     | Switch or Checkbox                   | Visual metaphor for state                  |
| Date selection                                     | Input with type="date" or DatePicker | Structured date entry                      |
| Number entry                                       | Input with type="number"             | Numeric keyboard on mobile                 |

**Component Comparison:**

```typescript
// ✅ Use Input for single-line text
<Input label="Email address" type="email" />
<Input label="Username" />
<Input label="Search products" type="search" />

// ❌ Don't use Input for multi-line text - use Textarea
<Input label="Comments" />  // Wrong - can't enter line breaks

<Textarea label="Comments" />  // Correct

// ❌ Don't use Input when Select would be clearer
<Input label="Country" placeholder="Enter country name" />  // Wrong - prone to typos

<Select.Root collection={countries}>
  <Select.Label>Country</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select country" />
    </Select.Trigger>
  </Select.Control>
  <Select.Content>
    {/* country options */}
  </Select.Content>
</Select.Root>  // Correct

// ❌ Don't use Input for binary choices - use Switch
<Input label="Enable notifications" type="checkbox" />  // Wrong - not an Input use case

<Switch.Root>
  <Switch.Label>Enable notifications</Switch.Label>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
</Switch.Root>  // Correct
```

## Import

```typescript
import { Input } from '@discourser/design-system';
```

## Variants

The Input component supports 2 Material Design 3 variants:

| Variant    | Visual Style                         | Usage               | When to Use                      |
| ---------- | ------------------------------------ | ------------------- | -------------------------------- |
| `outlined` | Outlined border around input         | Default text inputs | Most common, clear boundaries    |
| `filled`   | Filled background with bottom border | Alternative style   | When you want less visual weight |

### Visual Characteristics

- **outlined**: Transparent background, 1px border, 2px border on focus
- **filled**: `surfaceContainerHighest` background, bottom border only, rounded top corners

## Sizes

| Size | Height | Font Size | Usage                        |
| ---- | ------ | --------- | ---------------------------- |
| `sm` | 40px   | bodySmall | Compact forms, dense layouts |
| `md` | 56px   | bodyLarge | Default, most use cases      |

## Props

| Prop           | Type                           | Default      | Description                                       |
| -------------- | ------------------------------ | ------------ | ------------------------------------------------- |
| `label`        | `string`                       | -            | Label text (highly recommended for accessibility) |
| `helperText`   | `string`                       | -            | Helper text displayed below input                 |
| `errorText`    | `string`                       | -            | Error message (also sets error state)             |
| `variant`      | `'outlined' \| 'filled'`       | `'outlined'` | Visual style variant                              |
| `size`         | `'sm' \| 'md'`                 | `'md'`       | Input size                                        |
| `state`        | `'error'`                      | -            | Visual state (auto-set if errorText provided)     |
| `disabled`     | `boolean`                      | `false`      | Disable input                                     |
| `value`        | `string`                       | -            | Controlled value                                  |
| `defaultValue` | `string`                       | -            | Uncontrolled default value                        |
| `onChange`     | `(event: ChangeEvent) => void` | -            | Change handler                                    |
| `placeholder`  | `string`                       | -            | Placeholder text                                  |
| `type`         | `string`                       | `'text'`     | HTML input type (text, email, password, etc.)     |
| `required`     | `boolean`                      | `false`      | Mark as required field                            |

**Note:** Input extends `InputHTMLAttributes<HTMLInputElement>` (excluding 'size'), so all standard HTML input attributes are supported.

## Examples

### Basic Usage

```typescript
// Outlined input (default)
<Input label="Email" placeholder="you@example.com" />

// Filled input
<Input variant="filled" label="Username" />

// Small size
<Input size="sm" label="Search" />
```

### With Helper Text

```typescript
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>

<Input
  label="Email"
  type="email"
  helperText="We'll never share your email"
/>
```

### Error State

```typescript
<Input
  label="Email"
  type="email"
  errorText="Please enter a valid email address"
/>

<Input
  label="Username"
  errorText="Username is already taken"
/>
```

### Controlled Input

```typescript
const [email, setEmail] = useState('');

<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With validation
const [email, setEmail] = useState('');
const emailError = email && !isValidEmail(email)
  ? 'Invalid email address'
  : undefined;

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  errorText={emailError}
/>
```

### Uncontrolled Input

```typescript
<Input
  label="Name"
  defaultValue="John Doe"
/>
```

### Different Input Types

```typescript
// Email
<Input label="Email" type="email" />

// Password
<Input label="Password" type="password" />

// Number
<Input label="Age" type="number" min="0" max="120" />

// Tel
<Input label="Phone" type="tel" />

// URL
<Input label="Website" type="url" />

// Date
<Input label="Date of Birth" type="date" />
```

### Required Field

```typescript
<Input
  label="Email"
  type="email"
  required
  helperText="This field is required"
/>
```

### Disabled State

```typescript
<Input
  label="Username"
  value="johndoe"
  disabled
/>
```

## Common Patterns

### Login Form

```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

<form onSubmit={handleLogin}>
  <div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <Input
      label="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <Button type="submit">Log In</Button>
  </div>
</form>
```

### Form with Validation

```typescript
const [formData, setFormData] = useState({ email: '', password: '' });
const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  const newErrors: Record<string, string> = {};

  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    newErrors.email = 'Invalid email format';
  }

  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    // Submit form
  }
};

<form onSubmit={handleSubmit}>
  <div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
    <Input
      label="Email"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      errorText={errors.email}
      required
    />
    <Input
      label="Password"
      type="password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      errorText={errors.password}
      helperText="Must be at least 8 characters"
      required
    />
    <Button type="submit">Sign Up</Button>
  </div>
</form>
```

### Search Input

```typescript
const [searchQuery, setSearchQuery] = useState('');

<Input
  label="Search"
  size="sm"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search products..."
/>
```

### Password with Toggle Visibility

```typescript
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

<div className={css({ position: 'relative' })}>
  <Input
    label="Password"
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <IconButton
    variant="standard"
    aria-label={showPassword ? 'Hide password' : 'Show password'}
    onClick={() => setShowPassword(!showPassword)}
    className={css({ position: 'absolute', right: 'xs', top: 'md' })}
  >
    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
  </IconButton>
</div>
```

## DO NOT

```typescript
// ❌ Don't use native input without component
<input type="text" placeholder="Email" />  // Use <Input> instead

// ❌ Don't omit label (accessibility issue)
<Input placeholder="Enter your email" />  // Missing label

// ✅ Always provide label
<Input label="Email" placeholder="you@example.com" />

// ❌ Don't show both helperText and errorText (errorText takes precedence)
<Input
  label="Email"
  helperText="Helper text"
  errorText="Error text"  // Only error will show
/>

// ❌ Don't use inline styles for errors
<Input
  label="Email"
  style={{ borderColor: 'red' }}
/>

// ✅ Use errorText prop
<Input
  label="Email"
  errorText="Invalid email"
/>
```

## Accessibility

The Input component follows WCAG 2.1 Level AA standards:

- **Labels**: Always provide labels for screen readers
- **Error Messages**: Errors are announced to screen readers
- **Helper Text**: Helper text is associated with input
- **Focus Indicator**: Visible focus outline on focus
- **Required Fields**: Use `required` prop for required fields
- **Field Validation**: Use Ark UI's Field component internally for proper ARIA attributes

### Accessibility Best Practices

```typescript
// ✅ Always provide labels
<Input label="Email" type="email" />

// ✅ Mark required fields
<Input label="Email" required />

// ✅ Provide helpful error messages
<Input
  label="Email"
  errorText="Please enter a valid email address"
/>

// ✅ Use appropriate input types
<Input label="Email" type="email" />  // Enables email keyboard on mobile
<Input label="Phone" type="tel" />    // Enables numeric keyboard on mobile
<Input label="Website" type="url" />   // Enables URL keyboard on mobile

// ✅ Provide helper text for complex requirements
<Input
  label="Password"
  type="password"
  helperText="Must include uppercase, lowercase, number, and special character"
/>
```

## Form Integration

```typescript
// React Hook Form integration
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Input
    label="Email"
    {...register('email', {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    })}
    errorText={errors.email?.message}
  />
</form>

// Formik integration
import { useFormik } from 'formik';

const formik = useFormik({
  initialValues: { email: '' },
  onSubmit: values => { /* ... */ },
  validate: values => {
    const errors: any = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    return errors;
  }
});

<form onSubmit={formik.handleSubmit}>
  <Input
    label="Email"
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    errorText={formik.errors.email}
  />
</form>
```

## Variant Selection Guide

| Scenario       | Recommended Variant      | Reasoning                         |
| -------------- | ------------------------ | --------------------------------- |
| Standard forms | `outlined`               | Clear boundaries, default choice  |
| Dense forms    | `outlined` + `size="sm"` | Compact while maintaining clarity |
| Minimal UI     | `filled`                 | Lighter visual weight             |
| Search bars    | `outlined` or `filled`   | Either works, depends on design   |
| Settings forms | `outlined`               | Clear separation of fields        |

## State Behaviors

| State        | Visual Change                           | Behavior           |
| ------------ | --------------------------------------- | ------------------ |
| **Default**  | Normal border/background                | Ready for input    |
| **Hover**    | Border darkens or background changes    | Visual feedback    |
| **Focus**    | 2px border, primary color               | Active input state |
| **Error**    | Error color border, error message shown | Validation failed  |
| **Disabled** | 38% opacity, no interaction             | Cannot be edited   |

## Responsive Considerations

```typescript
// Mobile-first: Larger inputs for better touch
<Input size="md" label="Email" />

// Responsive sizing
<Input
  label="Email"
  size={{ base: 'md', lg: 'sm' }}
/>

// Full-width inputs (default)
<Input label="Email" />  // Already full-width

// Custom width
<Input
  label="Email"
  className={css({ maxWidth: '400px' })}
/>
```

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('input accepts text input', async () => {
  render(<Input label="Email" />);

  const input = screen.getByLabelText('Email');
  await userEvent.type(input, 'test@example.com');

  expect(input).toHaveValue('test@example.com');
});

test('input shows error message', () => {
  render(
    <Input label="Email" errorText="Invalid email" />
  );

  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});

test('input shows helper text when no error', () => {
  render(
    <Input label="Email" helperText="We'll never share your email" />
  );

  expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
});

test('controlled input updates value', async () => {
  const handleChange = vi.fn();
  render(
    <Input label="Email" value="" onChange={handleChange} />
  );

  const input = screen.getByLabelText('Email');
  await userEvent.type(input, 'a');

  expect(handleChange).toHaveBeenCalled();
});
```
