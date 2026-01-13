# Common UI Patterns

This guide demonstrates common patterns for combining components from the Discourser Design System to create complete user interfaces. These patterns help developers and AI tools understand how to build real-world UIs using the design system.

## Table of Contents

- [Form Patterns](#form-patterns)
  - [Vertical Form (Default)](#vertical-form-default)
  - [Horizontal Form (Compact)](#horizontal-form-compact)
  - [Multi-Step Form](#multi-step-form)
  - [Form with Inline Validation](#form-with-inline-validation)
  - [Form with Field Dependencies](#form-with-field-dependencies)
- [Navigation Patterns](#navigation-patterns)
  - [Sidebar Navigation](#sidebar-navigation)
  - [Top Navigation Bar](#top-navigation-bar)
  - [Tabbed Interface](#tabbed-interface)
  - [Breadcrumb Navigation](#breadcrumb-navigation)
- [Feedback Patterns](#feedback-patterns)
  - [Success Flow](#success-flow)
  - [Error Handling](#error-handling)
  - [Confirmation Dialogs](#confirmation-dialogs)
  - [Inline Notifications](#inline-notifications)
- [Loading States](#loading-states)
  - [Page Load](#page-load)
  - [Partial Load (Section)](#partial-load-section)
  - [Button Loading State](#button-loading-state)
  - [Infinite Scroll](#infinite-scroll)
- [Data Display Patterns](#data-display-patterns)
  - [Card Grid](#card-grid)
  - [List with Actions](#list-with-actions)
  - [List with Avatar](#list-with-avatar)
  - [Expandable/Collapsible List](#expandablecollapsible-list)
- [Search & Filter Patterns](#search--filter-patterns)
  - [Search Bar (Simple)](#search-bar-simple)
  - [Search with Filters](#search-with-filters)
  - [Search with Results](#search-with-results)
- [Authentication Patterns](#authentication-patterns)
  - [Login Form](#login-form)
  - [Sign Up Form](#sign-up-form)
  - [Password Reset Flow](#password-reset-flow)
- [Settings Patterns](#settings-patterns)
  - [Settings Panel](#settings-panel)
  - [Profile Settings](#profile-settings)
- [Empty States](#empty-states)
  - [No Data](#no-data)
  - [No Search Results](#no-search-results)

---

## Form Patterns

### Vertical Form (Default)

**When to use:** Standard form layout for most use cases. Provides clear hierarchy and is mobile-friendly.

**Components used:** Input, Textarea, Select, Button, Toast

**Example:**

```typescript
import { Input, Textarea, Button, toaster } from '@discourser/design-system';
import * as Select from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState, FormEvent } from 'react';

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit form data
      await submitForm(formData);

      toaster.create({
        title: 'Message sent!',
        description: "We'll get back to you soon.",
        type: 'success'
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toaster.create({
        title: 'Failed to send',
        description: 'Please try again later.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'lg',              // Spacing - 24px between fields
        maxWidth: '500px',
        mx: 'auto',
        p: 'xl'                 // Spacing - 32px padding
      })}
    >
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <Input
        label="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        required
      />

      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={5}
        required
      />

      <Button
        type="submit"
        variant="filled"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

**Best practices:**

- Use `gap` for consistent spacing between form fields
- Always include labels for accessibility
- Provide loading states for async submissions
- Use Toast for success/error feedback
- Make forms responsive with `maxWidth`

**Accessibility:**

- All inputs have labels
- Submit button has clear text
- Loading state is communicated
- Form can be submitted with Enter key

---

### Horizontal Form (Compact)

**When to use:** Space-constrained layouts, filters, or inline editing where vertical space is limited.

**Components used:** Input, Button

**Example:**

```typescript
import { Input, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function InlineSearchForm() {
  const [query, setQuery] = useState('');

  return (
    <form
      className={css({
        display: 'flex',
        gap: 'md',              // Spacing - 16px between elements
        alignItems: 'flex-end', // Align button with input
        flexWrap: 'wrap'        // Stack on mobile if needed
      })}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(query);
      }}
    >
      <div className={css({ flex: 1, minWidth: '200px' })}>
        <Input
          label="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter keywords..."
          size="sm"
        />
      </div>

      <Button
        type="submit"
        variant="filled"
        size="sm"
      >
        Search
      </Button>
    </form>
  );
}
```

**Best practices:**

- Use `alignItems: 'flex-end'` to align button with input baseline
- Add `flexWrap: 'wrap'` for mobile responsiveness
- Keep labels visible (don't rely only on placeholders)
- Use `size="sm"` for more compact layouts

**Accessibility:**

- Labels are present even in horizontal layout
- Tab order follows visual order
- Works with keyboard navigation

---

### Multi-Step Form

**When to use:** Complex forms with many fields that benefit from being broken into logical sections.

**Components used:** Tabs, Input, Button, Progress

**Example:**

```typescript
import { Input, Textarea, Button, toaster } from '@discourser/design-system';
import * as Tabs from '@discourser/design-system';
import * as Progress from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Personal info
    name: '',
    email: '',
    // Step 2: Company info
    company: '',
    role: '',
    // Step 3: Preferences
    interests: ''
  });

  const steps = ['Personal Info', 'Company Info', 'Preferences'];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitForm(formData);
      toaster.create({
        title: 'Registration complete!',
        description: 'Your account has been created.',
        type: 'success'
      });
    } catch (error) {
      toaster.create({
        title: 'Registration failed',
        description: 'Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className={css({ maxWidth: '600px', mx: 'auto', p: 'xl' })}>
      {/* Progress indicator */}
      <div className={css({ mb: 'xl' })}>
        <Progress.Root value={progress}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <div className={css({
          textStyle: 'labelMedium',
          color: 'onSurfaceVariant',
          mt: 'xs'
        })}>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </div>
      </div>

      {/* Form content */}
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'lg',
        mb: 'xl'
      })}>
        {currentStep === 0 && (
          <>
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </>
        )}

        {currentStep === 1 && (
          <>
            <Input
              label="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
            <Input
              label="Your Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </>
        )}

        {currentStep === 2 && (
          <Textarea
            label="What are you interested in?"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            rows={5}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className={css({
        display: 'flex',
        gap: 'sm',
        justifyContent: 'space-between'
      })}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button variant="filled" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="filled" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
```

**Best practices:**

- Show progress indicator to communicate position
- Validate each step before allowing next
- Allow users to go back to previous steps
- Save progress automatically if possible
- Use clear step labels

**Accessibility:**

- Progress indicator announces current step
- Navigation buttons have clear labels
- Keyboard navigation works between steps

---

### Form with Inline Validation

**When to use:** Forms where immediate feedback helps users correct errors while filling out the form.

**Components used:** Input, Button, Toast

**Example:**

```typescript
import { Input, Button, toaster } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function ValidatedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation functions
  const validateUsername = (value: string) => {
    if (!value) return 'Username is required';
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return 'Please confirm your password';
    if (value !== formData.password) return 'Passwords do not match';
    return '';
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });

    let error = '';
    switch (field) {
      case 'username':
        error = validateUsername(formData.username);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.confirmPassword);
        break;
    }

    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword)
    };

    setErrors(newErrors);
    setTouched({ username: true, email: true, password: true, confirmPassword: true });

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      try {
        await registerUser(formData);
        toaster.create({
          title: 'Account created!',
          description: 'Welcome to our platform.',
          type: 'success'
        });
      } catch (error) {
        toaster.create({
          title: 'Registration failed',
          description: 'Please try again.',
          type: 'error'
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: 'lg',
      maxWidth: '400px',
      mx: 'auto',
      p: 'xl'
    })}>
      <Input
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        onBlur={() => handleBlur('username')}
        errorText={touched.username ? errors.username : ''}
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        onBlur={() => handleBlur('email')}
        errorText={touched.email ? errors.email : ''}
        required
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        onBlur={() => handleBlur('password')}
        errorText={touched.password ? errors.password : ''}
        helperText="Must be 8+ characters with uppercase, lowercase, and number"
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        onBlur={() => handleBlur('confirmPassword')}
        errorText={touched.confirmPassword ? errors.confirmPassword : ''}
        required
      />

      <Button type="submit" variant="filled">
        Create Account
      </Button>
    </form>
  );
}
```

**Best practices:**

- Validate on blur, not on every keystroke
- Show errors only after user leaves field
- Provide helpful error messages
- Include helper text for complex requirements
- Validate all fields on submit

**Accessibility:**

- Error messages are announced to screen readers
- Errors are associated with inputs via ARIA
- Helper text provides guidance upfront

---

### Form with Field Dependencies

**When to use:** Forms where certain fields only appear or are required based on previous selections.

**Components used:** Input, Select, RadioGroup, Checkbox

**Example:**

```typescript
import { Input, Button } from '@discourser/design-system';
import * as Select from '@discourser/design-system';
import * as RadioGroup from '@discourser/design-system';
import * as Checkbox from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';
import { createListCollection } from '@ark-ui/react';

function DependentFieldsForm() {
  const [accountType, setAccountType] = useState('personal');
  const [hasCompany, setHasCompany] = useState(false);
  const [receiveNewsletter, setReceiveNewsletter] = useState(false);

  const accountTypes = createListCollection({
    items: [
      { label: 'Personal', value: 'personal' },
      { label: 'Business', value: 'business' }
    ]
  });

  return (
    <form className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: 'lg',
      maxWidth: '500px',
      mx: 'auto',
      p: 'xl'
    })}>
      {/* Account type selection */}
      <RadioGroup.Root
        value={accountType}
        onValueChange={(details) => setAccountType(details.value)}
      >
        <RadioGroup.Label>Account Type</RadioGroup.Label>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: 'sm' })}>
          <RadioGroup.Item value="personal">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Personal</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="business">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Business</RadioGroup.ItemText>
          </RadioGroup.Item>
        </div>
      </RadioGroup.Root>

      {/* Show company field only for business accounts */}
      {accountType === 'business' && (
        <>
          <Input
            label="Company Name"
            required
          />
          <Input
            label="Tax ID"
            required
          />
        </>
      )}

      {/* Standard fields */}
      <Input
        label="Full Name"
        required
      />

      <Input
        label="Email"
        type="email"
        required
      />

      {/* Newsletter subscription */}
      <Checkbox.Root
        checked={receiveNewsletter}
        onCheckedChange={(details) => setReceiveNewsletter(details.checked === true)}
      >
        <Checkbox.Control>
          <Checkbox.Indicator>✓</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>Subscribe to newsletter</Checkbox.Label>
      </Checkbox.Root>

      {/* Show frequency only if subscribed */}
      {receiveNewsletter && (
        <Select.Root collection={createListCollection({
          items: [
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' }
          ]
        })}>
          <Select.Label>Newsletter Frequency</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select frequency" />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {accountTypes.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      )}

      <Button type="submit" variant="filled">
        Create Account
      </Button>
    </form>
  );
}
```

**Best practices:**

- Clear dependent fields when parent changes
- Use smooth transitions when showing/hiding fields
- Validate dependent fields only when visible
- Provide clear context for conditional fields

**Accessibility:**

- ARIA live regions announce field changes
- Focus management when fields appear
- Clear relationship between parent and dependent fields

---

## Navigation Patterns

### Sidebar Navigation

**When to use:** Applications with multiple primary sections that need persistent navigation.

**Components used:** Drawer, IconButton, Button

**Example:**

```typescript
import { Button } from '@discourser/design-system';
import * as Drawer from '@discourser/design-system';
import * as IconButton from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';
import { HomeIcon, ProjectsIcon, SettingsIcon, MenuIcon } from 'your-icon-library';

function SidebarNavigation() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'projects', label: 'Projects', icon: ProjectsIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <IconButton.Root
        variant="standard"
        onClick={() => setOpen(true)}
        className={css({ position: 'fixed', top: 'md', left: 'md', zIndex: 10 })}
      >
        <MenuIcon />
      </IconButton.Root>

      {/* Drawer */}
      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content className={css({ width: '280px' })}>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <IconButton.Root variant="standard" size="sm">
                  ✕
                </IconButton.Root>
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 'xs',
              pt: 'md'
            })}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'tonal' : 'text'}
                  onClick={() => {
                    setActiveSection(item.id);
                    setOpen(false);
                  }}
                  leftIcon={<item.icon />}
                  className={css({
                    justifyContent: 'flex-start',
                    width: '100%'
                  })}
                >
                  {item.label}
                </Button>
              ))}
            </Drawer.Body>

            <Drawer.Footer className={css({
              borderTopWidth: '1px',
              borderTopColor: 'outlineVariant',
              pt: 'md'
            })}>
              <Button variant="outlined" className={css({ width: '100%' })}>
                Sign Out
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}
```

**Best practices:**

- Use icons with labels for clarity
- Highlight active section
- Close drawer on mobile after selection
- Provide sign out option in footer
- Keep navigation items organized

**Accessibility:**

- Drawer traps focus when open
- Escape key closes drawer
- Active item is clearly indicated
- Screen readers announce drawer state

---

### Top Navigation Bar

**When to use:** Simple websites or apps with few primary sections that fit horizontally.

**Components used:** Button, IconButton, Avatar

**Example:**

```typescript
import { Button } from '@discourser/design-system';
import * as IconButton from '@discourser/design-system';
import * as Avatar from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function TopNavigation() {
  const navItems = ['Home', 'Products', 'About', 'Contact'];

  return (
    <nav className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: { base: 'md', lg: 'xl' },
      py: 'md',
      bg: 'surface',
      borderBottomWidth: '1px',
      borderBottomColor: 'outlineVariant',
      position: 'sticky',
      top: 0,
      zIndex: 100
    })}>
      {/* Logo */}
      <div className={css({
        textStyle: 'titleLarge',
        color: 'primary',
        fontWeight: 'bold'
      })}>
        Brand
      </div>

      {/* Navigation links - hidden on mobile */}
      <div className={css({
        display: { base: 'none', md: 'flex' },
        gap: 'sm',
        alignItems: 'center'
      })}>
        {navItems.map((item) => (
          <Button key={item} variant="text">
            {item}
          </Button>
        ))}
      </div>

      {/* User actions */}
      <div className={css({ display: 'flex', gap: 'sm', alignItems: 'center' })}>
        <IconButton.Root variant="standard">
          <SearchIcon />
        </IconButton.Root>

        <Avatar.Root size="sm">
          <Avatar.Image src="/user-avatar.jpg" alt="User" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar.Root>
      </div>
    </nav>
  );
}
```

**Best practices:**

- Keep navigation items concise
- Use sticky positioning for accessibility
- Hide secondary items on mobile
- Include logo/brand on left
- Group user actions on right

**Accessibility:**

- Use semantic `nav` element
- Links have clear focus indicators
- Works with keyboard navigation

---

### Tabbed Interface

**When to use:** Content that can be organized into distinct categories or views.

**Components used:** Tabs, Card

**Example:**

```typescript
import { Card } from '@discourser/design-system';
import * as Tabs from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function TabbedInterface() {
  return (
    <Tabs.Root defaultValue="overview" className={css({ maxWidth: '800px', mx: 'auto' })}>
      <Tabs.List className={css({ mb: 'lg' })}>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>

      <Tabs.Content value="overview">
        <Card variant="elevated" className={css({ p: 'xl' })}>
          <h2 className={css({ textStyle: 'headlineSmall', mb: 'md' })}>
            Overview
          </h2>
          <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
            Welcome to your dashboard. Here you'll find a summary of your account activity.
          </p>
        </Card>
      </Tabs.Content>

      <Tabs.Content value="activity">
        <Card variant="elevated" className={css({ p: 'xl' })}>
          <h2 className={css({ textStyle: 'headlineSmall', mb: 'md' })}>
            Recent Activity
          </h2>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
            <div className={css({ textStyle: 'bodyMedium' })}>
              Project updated - 2 hours ago
            </div>
            <div className={css({ textStyle: 'bodyMedium' })}>
              Comment added - 5 hours ago
            </div>
          </div>
        </Card>
      </Tabs.Content>

      <Tabs.Content value="settings">
        <Card variant="elevated" className={css({ p: 'xl' })}>
          <h2 className={css({ textStyle: 'headlineSmall', mb: 'md' })}>
            Settings
          </h2>
          <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
            Configure your account preferences.
          </p>
        </Card>
      </Tabs.Content>
    </Tabs.Root>
  );
}
```

**Best practices:**

- Use for 3-6 related content sections
- Keep tab labels short and clear
- Load content lazily if expensive
- Indicate active tab clearly

**Accessibility:**

- Tabs follow WAI-ARIA pattern
- Arrow keys navigate between tabs
- Active tab is indicated to screen readers

---

### Breadcrumb Navigation

**When to use:** Deep hierarchical navigation to show user's location and allow easy backtracking.

**Components used:** Button (text variant)

**Example:**

```typescript
import { Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { ChevronRightIcon } from 'your-icon-library';

function BreadcrumbNavigation() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops', href: '/products/electronics/laptops' }
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'xs',
        py: 'md',
        px: { base: 'md', lg: 'xl' }
      })}
    >
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className={css({ display: 'flex', alignItems: 'center', gap: 'xs' })}>
          {index === breadcrumbs.length - 1 ? (
            // Current page - not clickable
            <span className={css({
              textStyle: 'labelMedium',
              color: 'onSurface',
              fontWeight: 'medium'
            })}>
              {crumb.label}
            </span>
          ) : (
            <>
              <Button
                variant="text"
                size="sm"
                onClick={() => window.location.href = crumb.href}
                className={css({ minWidth: 'auto' })}
              >
                {crumb.label}
              </Button>
              <ChevronRightIcon className={css({ color: 'onSurfaceVariant' })} />
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
```

**Best practices:**

- Show full path to current page
- Make all items except current clickable
- Use chevron or slash as separator
- Truncate on mobile if too long

**Accessibility:**

- Use `nav` with `aria-label="Breadcrumb"`
- Current page is not a link
- Screen readers understand hierarchy

---

## Feedback Patterns

### Success Flow

**When to use:** Confirming successful completion of user actions with visual feedback.

**Components used:** Toast, Progress, Button

**Example:**

```typescript
import { Button, toaster } from '@discourser/design-system';
import * as Progress from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function SuccessFlow() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    setUploading(true);
    setProgress(0);

    // Show loading toast
    const toastId = toaster.create({
      title: 'Uploading file...',
      description: 'Please wait while we process your file.',
      type: 'loading'
    });

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Wait for completion
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Update to success
    toaster.update(toastId, {
      title: 'Upload complete!',
      description: 'Your file has been processed successfully.',
      type: 'success',
      duration: 3000
    });

    setUploading(false);
    setProgress(0);
  };

  return (
    <div className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: 'lg',
      maxWidth: '400px',
      mx: 'auto',
      p: 'xl'
    })}>
      <Button
        variant="filled"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </Button>

      {uploading && (
        <div>
          <Progress.Root value={progress}>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
          <div className={css({
            textStyle: 'labelMedium',
            color: 'onSurfaceVariant',
            mt: 'xs'
          })}>
            {progress}% complete
          </div>
        </div>
      )}
    </div>
  );
}
```

**Best practices:**

- Show loading state during async operations
- Update with progress if available
- Transition from loading to success smoothly
- Provide clear success confirmation
- Auto-dismiss success messages

**Accessibility:**

- Progress is announced to screen readers
- Loading state is clearly communicated
- Success message is announced

---

### Error Handling

**When to use:** Gracefully handling and communicating errors to users.

**Components used:** Input, Toast, Dialog

**Example:**

```typescript
import { Input, Button, toaster } from '@discourser/design-system';
import * as Dialog from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function ErrorHandling() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [criticalError, setCriticalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await submitEmail(email);

      // Show success
      toaster.create({
        title: 'Email sent!',
        description: 'Check your inbox for the confirmation link.',
        type: 'success'
      });
    } catch (err) {
      if (err.code === 'NETWORK_ERROR') {
        // Critical error - show dialog
        setCriticalError('Unable to connect to the server. Please check your internet connection and try again.');
      } else if (err.code === 'INVALID_EMAIL') {
        // Field-level error
        setError('This email address is not valid.');
      } else {
        // General error - show toast
        toaster.create({
          title: 'Something went wrong',
          description: 'Please try again later.',
          type: 'error',
          duration: 5000
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'lg',
        maxWidth: '400px',
        mx: 'auto',
        p: 'xl'
      })}>
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(''); // Clear error on change
          }}
          errorText={error}
          required
        />

        <Button type="submit" variant="filled">
          Submit
        </Button>
      </form>

      {/* Critical error dialog */}
      <Dialog.Root open={!!criticalError} onOpenChange={() => setCriticalError(null)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Connection Error</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>
                {criticalError}
              </Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer className={css({ display: 'flex', gap: 'sm', justifyContent: 'flex-end' })}>
              <Button variant="filled" onClick={() => setCriticalError(null)}>
                OK
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
```

**Best practices:**

- Use inline errors for field validation
- Use toasts for non-critical errors
- Use dialogs for critical errors requiring action
- Provide clear, actionable error messages
- Allow retry when appropriate

**Accessibility:**

- Errors are announced to screen readers
- Focus moves to error when critical
- Error messages are associated with inputs

---

### Confirmation Dialogs

**When to use:** Destructive actions or important decisions that require explicit confirmation.

**Components used:** Dialog, Button

**Example:**

```typescript
import { Button, toaster } from '@discourser/design-system';
import * as Dialog from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function ConfirmationDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteItem();

      setOpen(false);
      toaster.create({
        title: 'Item deleted',
        description: 'The item has been permanently deleted.',
        type: 'success'
      });
    } catch (error) {
      toaster.create({
        title: 'Delete failed',
        description: 'Unable to delete the item. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="filled" onClick={() => setOpen(true)}>
        Delete Item
      </Button>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Confirm Deletion</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.Description>
                Are you sure you want to delete this item? This action cannot be undone.
              </Dialog.Description>
            </Dialog.Body>

            <Dialog.Footer className={css({
              display: 'flex',
              gap: 'sm',
              justifyContent: 'flex-end'
            })}>
              <Button
                variant="text"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                onClick={handleDelete}
                disabled={loading}
                className={css({ bg: 'error', color: 'onError' })}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
```

**Best practices:**

- Use clear, specific titles
- Explain consequences of action
- Use warning colors for destructive actions
- Provide both cancel and confirm options
- Disable buttons during processing

**Accessibility:**

- Dialog traps focus
- Escape key cancels
- Focus returns to trigger after close

---

### Inline Notifications

**When to use:** Contextual feedback that needs to stay visible near related content.

**Components used:** Badge, Toast

**Example:**

```typescript
import { Badge, Button, toaster } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function InlineNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New comment on your post', read: false },
    { id: 2, message: 'Your profile was viewed 10 times', read: false },
    { id: 3, message: 'New follower: John Doe', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));

    toaster.create({
      title: 'Marked as read',
      type: 'success',
      duration: 2000
    });
  };

  return (
    <div className={css({ maxWidth: '500px', mx: 'auto', p: 'xl' })}>
      <div className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
        mb: 'lg'
      })}>
        <h2 className={css({ textStyle: 'headlineSmall' })}>
          Notifications
        </h2>
        {unreadCount > 0 && (
          <Badge variant="solid">
            {unreadCount} new
          </Badge>
        )}
      </div>

      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'sm'
      })}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={css({
              p: 'md',
              bg: notification.read ? 'surface' : 'secondaryContainer',
              borderRadius: 'l2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'md'
            })}
          >
            <div className={css({
              flex: 1,
              textStyle: 'bodyMedium',
              color: 'onSurface'
            })}>
              {notification.message}
            </div>

            {!notification.read && (
              <Button
                variant="text"
                size="sm"
                onClick={() => markAsRead(notification.id)}
              >
                Mark read
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Best practices:**

- Use badges to show count
- Visually distinguish read/unread
- Provide action buttons in context
- Group related notifications
- Keep messages concise

**Accessibility:**

- Unread count is announced
- List structure is semantic
- Actions have clear labels

---

## Loading States

### Page Load

**When to use:** Initial page load when fetching primary content.

**Components used:** Skeleton

**Example:**

```typescript
import { Card } from '@discourser/design-system';
import * as Skeleton from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState, useEffect } from 'react';

function PageLoad() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setData({ title: 'Article Title', content: 'Article content...' });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className={css({ maxWidth: '800px', mx: 'auto', p: 'xl' })}>
        <Card variant="elevated" className={css({ p: 'xl' })}>
          <Skeleton.Root>
            {/* Title skeleton */}
            <Skeleton.Item height="32px" width="70%" className={css({ mb: 'md' })} />

            {/* Content skeleton */}
            <Skeleton.Item height="16px" width="100%" className={css({ mb: 'sm' })} />
            <Skeleton.Item height="16px" width="95%" className={css({ mb: 'sm' })} />
            <Skeleton.Item height="16px" width="90%" className={css({ mb: 'sm' })} />
            <Skeleton.Item height="16px" width="85%" />
          </Skeleton.Root>
        </Card>
      </div>
    );
  }

  return (
    <div className={css({ maxWidth: '800px', mx: 'auto', p: 'xl' })}>
      <Card variant="elevated" className={css({ p: 'xl' })}>
        <h1 className={css({ textStyle: 'headlineLarge', mb: 'md' })}>
          {data.title}
        </h1>
        <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
          {data.content}
        </p>
      </Card>
    </div>
  );
}
```

**Best practices:**

- Match skeleton to actual content structure
- Use appropriate widths for text lines
- Animate skeletons for better UX
- Show skeleton for minimum 300ms

**Accessibility:**

- Loading state is announced
- Content structure is predictable

---

### Partial Load (Section)

**When to use:** Loading specific sections while keeping rest of page interactive.

**Components used:** Spinner, Card

**Example:**

```typescript
import { Card, Spinner, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function PartialLoad() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const loadMore = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setData([...data, `Item ${data.length + 1}`, `Item ${data.length + 2}`]);
    setLoading(false);
  };

  return (
    <div className={css({ maxWidth: '600px', mx: 'auto', p: 'xl' })}>
      <Card variant="elevated" className={css({ p: 'xl' })}>
        <h2 className={css({ textStyle: 'headlineSmall', mb: 'lg' })}>
          Content List
        </h2>

        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 'md',
          mb: 'lg'
        })}>
          {data.map((item, index) => (
            <div
              key={index}
              className={css({
                p: 'md',
                bg: 'surfaceContainerHighest',
                borderRadius: 'l2',
                textStyle: 'bodyMedium'
              })}
            >
              {item}
            </div>
          ))}
        </div>

        {loading ? (
          <div className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'sm',
            py: 'lg'
          })}>
            <Spinner size="md" />
            <span className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
              Loading more...
            </span>
          </div>
        ) : (
          <Button variant="outlined" onClick={loadMore} className={css({ width: '100%' })}>
            Load More
          </Button>
        )}
      </Card>
    </div>
  );
}
```

**Best practices:**

- Show spinner in loading area only
- Keep rest of page interactive
- Provide loading text with spinner
- Disable trigger while loading

**Accessibility:**

- Loading state is announced
- Focus remains on page
- Loading area is marked with ARIA

---

### Button Loading State

**When to use:** Async actions triggered by buttons.

**Components used:** Button, Spinner

**Example:**

```typescript
import { Button, Spinner, toaster } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function ButtonLoadingState() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toaster.create({
        title: 'Success!',
        description: 'Your changes have been saved.',
        type: 'success'
      });
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to save changes.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: 'md',
      maxWidth: '400px',
      mx: 'auto',
      p: 'xl'
    })}>
      {/* Button with inline spinner */}
      <Button
        variant="filled"
        onClick={handleSubmit}
        disabled={loading}
        leftIcon={loading ? <Spinner size="sm" /> : undefined}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>

      {/* Alternative: Spinner replaces text */}
      <Button
        variant="outlined"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <div className={css({ display: 'flex', alignItems: 'center', gap: 'xs' })}>
            <Spinner size="sm" />
            <span>Processing</span>
          </div>
        ) : (
          'Submit'
        )}
      </Button>

      {/* Alternative: Just text change */}
      <Button
        variant="text"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Click Me'}
      </Button>
    </div>
  );
}
```

**Best practices:**

- Disable button during loading
- Show spinner or loading text
- Keep button width stable
- Use aria-busy attribute

**Accessibility:**

- Loading state is announced
- Button is disabled and marked busy
- Screen readers know action is in progress

---

### Infinite Scroll

**When to use:** Long lists that load more content as user scrolls.

**Components used:** Spinner, Card

**Example:**

```typescript
import { Card, Spinner } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState, useEffect, useRef } from 'react';

function InfiniteScroll() {
  const [items, setItems] = useState<number[]>(Array.from({ length: 10 }, (_, i) => i));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const loadMore = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newItems = Array.from({ length: 10 }, (_, i) => items.length + i);
    setItems([...items, ...newItems]);

    // Stop after 50 items (demo)
    if (items.length >= 40) {
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <div className={css({ maxWidth: '600px', mx: 'auto', p: 'xl' })}>
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md'
      })}>
        {items.map((item) => (
          <Card key={item} variant="elevated" className={css({ p: 'md' })}>
            <div className={css({ textStyle: 'bodyMedium' })}>
              Item #{item + 1}
            </div>
          </Card>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'sm',
          py: 'lg'
        })}>
          <Spinner size="md" />
          <span className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
            Loading more items...
          </span>
        </div>
      )}

      {/* End message */}
      {!hasMore && (
        <div className={css({
          textAlign: 'center',
          py: 'lg',
          textStyle: 'bodyMedium',
          color: 'onSurfaceVariant'
        })}>
          No more items to load
        </div>
      )}

      {/* Intersection observer target */}
      <div ref={observerRef} className={css({ height: '1px' })} />
    </div>
  );
}
```

**Best practices:**

- Use IntersectionObserver for performance
- Show loading indicator while fetching
- Indicate when no more items
- Handle errors gracefully

**Accessibility:**

- Loading is announced
- New content is accessible
- End of list is communicated

---

## Data Display Patterns

### Card Grid

**When to use:** Displaying multiple items of equal importance in a grid layout.

**Components used:** Card, Badge, Button

**Example:**

```typescript
import { Card, Badge, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function CardGrid() {
  const products = [
    { id: 1, name: 'Product A', price: '$29.99', status: 'new', image: '/product-a.jpg' },
    { id: 2, name: 'Product B', price: '$39.99', status: 'sale', image: '/product-b.jpg' },
    { id: 3, name: 'Product C', price: '$49.99', status: null, image: '/product-c.jpg' }
  ];

  return (
    <div className={css({
      display: 'grid',
      gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
      gap: 'lg',
      p: { base: 'md', lg: 'xl' }
    })}>
      {products.map((product) => (
        <Card key={product.id} variant="elevated">
          <div className={css({
            p: 'lg',
            display: 'flex',
            flexDirection: 'column',
            gap: 'md'
          })}>
            {/* Image */}
            <div className={css({
              aspectRatio: '16/9',
              bg: 'surfaceContainerHighest',
              borderRadius: 'l2',
              overflow: 'hidden'
            })}>
              <img
                src={product.image}
                alt={product.name}
                className={css({ width: '100%', height: '100%', objectFit: 'cover' })}
              />
            </div>

            {/* Content */}
            <div className={css({ flex: 1 })}>
              <div className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 'xs',
                mb: 'xs'
              })}>
                <h3 className={css({ textStyle: 'titleMedium', color: 'onSurface' })}>
                  {product.name}
                </h3>
                {product.status && (
                  <Badge variant={product.status === 'new' ? 'solid' : 'subtle'}>
                    {product.status}
                  </Badge>
                )}
              </div>

              <p className={css({ textStyle: 'titleLarge', color: 'primary', mb: 'md' })}>
                {product.price}
              </p>
            </div>

            {/* Action */}
            <Button variant="filled" className={css({ width: '100%' })}>
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

**Best practices:**

- Use responsive grid columns
- Keep card heights consistent
- Use appropriate gap spacing
- Include clear call-to-action
- Optimize images for performance

**Accessibility:**

- Images have alt text
- Cards are keyboard navigable
- Interactive elements are focusable

---

### List with Actions

**When to use:** Lists where each item has associated actions (edit, delete, etc.).

**Components used:** Card, IconButton, Badge

**Example:**

```typescript
import { Card, Badge } from '@discourser/design-system';
import * as IconButton from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { EditIcon, DeleteIcon, MoreIcon } from 'your-icon-library';

function ListWithActions() {
  const items = [
    { id: 1, title: 'Project Alpha', status: 'active', updated: '2 hours ago' },
    { id: 2, title: 'Project Beta', status: 'pending', updated: '1 day ago' },
    { id: 3, title: 'Project Gamma', status: 'completed', updated: '3 days ago' }
  ];

  const statusVariant = {
    active: 'solid',
    pending: 'subtle',
    completed: 'outline'
  };

  return (
    <div className={css({ maxWidth: '800px', mx: 'auto', p: 'xl' })}>
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md'
      })}>
        {items.map((item) => (
          <Card key={item.id} variant="elevated">
            <div className={css({
              p: 'md',
              display: 'flex',
              alignItems: 'center',
              gap: 'md'
            })}>
              {/* Content */}
              <div className={css({ flex: 1 })}>
                <div className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'sm',
                  mb: 'xs'
                })}>
                  <h3 className={css({ textStyle: 'titleMedium', color: 'onSurface' })}>
                    {item.title}
                  </h3>
                  <Badge variant={statusVariant[item.status]}>
                    {item.status}
                  </Badge>
                </div>
                <p className={css({ textStyle: 'bodySmall', color: 'onSurfaceVariant' })}>
                  Updated {item.updated}
                </p>
              </div>

              {/* Actions */}
              <div className={css({ display: 'flex', gap: 'xs' })}>
                <IconButton.Root variant="standard" size="sm">
                  <IconButton.Icon>
                    <EditIcon />
                  </IconButton.Icon>
                </IconButton.Root>

                <IconButton.Root variant="standard" size="sm">
                  <IconButton.Icon>
                    <DeleteIcon />
                  </IconButton.Icon>
                </IconButton.Root>

                <IconButton.Root variant="standard" size="sm">
                  <IconButton.Icon>
                    <MoreIcon />
                  </IconButton.Icon>
                </IconButton.Root>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

**Best practices:**

- Place actions on right side
- Use icon buttons for space efficiency
- Show actions on hover (desktop)
- Always show on mobile
- Confirm destructive actions

**Accessibility:**

- Icon buttons have aria-labels
- Actions are keyboard accessible
- Focus order is logical

---

### List with Avatar

**When to use:** Lists representing people or entities with profile images.

**Components used:** Avatar, Badge, Card

**Example:**

```typescript
import { Card, Badge } from '@discourser/design-system';
import * as Avatar from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function ListWithAvatar() {
  const users = [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', status: 'online', avatar: '/jane.jpg' },
    { id: 2, name: 'John Smith', email: 'john@example.com', status: 'offline', avatar: null },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'away', avatar: '/alice.jpg' }
  ];

  const statusColor = {
    online: 'success',
    offline: 'onSurfaceVariant',
    away: 'warning'
  };

  return (
    <div className={css({ maxWidth: '600px', mx: 'auto', p: 'xl' })}>
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'sm'
      })}>
        {users.map((user) => (
          <Card key={user.id} variant="elevated">
            <div className={css({
              p: 'md',
              display: 'flex',
              alignItems: 'center',
              gap: 'md'
            })}>
              {/* Avatar with status */}
              <div className={css({ position: 'relative' })}>
                <Avatar.Root size="md">
                  {user.avatar ? (
                    <Avatar.Image src={user.avatar} alt={user.name} />
                  ) : (
                    <Avatar.Fallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>

                {/* Status indicator */}
                <div className={css({
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '12px',
                  height: '12px',
                  borderRadius: 'full',
                  bg: statusColor[user.status],
                  border: '2px solid',
                  borderColor: 'surface'
                })} />
              </div>

              {/* User info */}
              <div className={css({ flex: 1 })}>
                <h3 className={css({ textStyle: 'titleMedium', color: 'onSurface', mb: 'xxs' })}>
                  {user.name}
                </h3>
                <p className={css({ textStyle: 'bodySmall', color: 'onSurfaceVariant' })}>
                  {user.email}
                </p>
              </div>

              {/* Status badge */}
              <Badge variant="subtle">
                {user.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

**Best practices:**

- Use appropriate avatar size
- Show status indicator when relevant
- Include fallback for missing images
- Keep information hierarchy clear
- Add hover states for interactivity

**Accessibility:**

- Avatar images have alt text
- Status is communicated via badge
- Information is properly structured

---

### Expandable/Collapsible List

**When to use:** Long lists with detailed information that can be expanded on demand.

**Components used:** Accordion

**Example:**

```typescript
import * as Accordion from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function ExpandableList() {
  const faqs = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'Click on the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to reset your password.'
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.'
    },
    {
      id: '3',
      question: 'How can I contact support?',
      answer: 'You can reach our support team via email at support@example.com, through our live chat feature, or by phone at 1-800-123-4567 during business hours.'
    }
  ];

  return (
    <div className={css({ maxWidth: '800px', mx: 'auto', p: 'xl' })}>
      <h2 className={css({ textStyle: 'headlineMedium', mb: 'lg' })}>
        Frequently Asked Questions
      </h2>

      <Accordion.Root multiple>
        {faqs.map((faq) => (
          <Accordion.Item key={faq.id} value={faq.id}>
            <Accordion.ItemTrigger className={css({
              py: 'md',
              px: 'lg',
              textStyle: 'titleMedium',
              color: 'onSurface',
              cursor: 'pointer',
              _hover: { bg: 'surfaceContainerHighest' },
              borderRadius: 'l2'
            })}>
              {faq.question}
              <Accordion.ItemIndicator>▼</Accordion.ItemIndicator>
            </Accordion.ItemTrigger>

            <Accordion.ItemContent className={css({
              px: 'lg',
              pb: 'md'
            })}>
              <p className={css({
                textStyle: 'bodyMedium',
                color: 'onSurfaceVariant'
              })}>
                {faq.answer}
              </p>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
```

**Best practices:**

- Use clear, descriptive titles
- Support multiple open items for FAQs
- Animate expand/collapse smoothly
- Include visual indicator (arrow)
- Keep content concise

**Accessibility:**

- Follows WAI-ARIA accordion pattern
- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen readers announce expanded state

---

## Search & Filter Patterns

### Search Bar (Simple)

**When to use:** Basic keyword search without complex filtering needs.

**Components used:** InputGroup, Input, Button

**Example:**

```typescript
import { Input, Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';
import { SearchIcon } from 'your-icon-library';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Perform search
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className={css({ maxWidth: '600px', mx: 'auto', p: 'xl' })}>
      <div className={css({ display: 'flex', gap: 'sm' })}>
        <div className={css({ flex: 1, position: 'relative' })}>
          <Input
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, articles, or docs..."
            className={css({ pr: query ? 'xxxl' : 'md' })}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className={css({
                position: 'absolute',
                right: 'xs',
                top: '50%',
                transform: 'translateY(-50%)',
                p: 'xs',
                color: 'onSurfaceVariant',
                cursor: 'pointer',
                borderRadius: 'full',
                _hover: { bg: 'surfaceContainerHighest' }
              })}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <Button
          type="submit"
          variant="filled"
          leftIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>
    </form>
  );
}
```

**Best practices:**

- Include clear button when text present
- Use search icon for recognition
- Submit on Enter key
- Provide placeholder text
- Show recent searches (optional)

**Accessibility:**

- Label is present
- Clear button has aria-label
- Keyboard shortcuts work
- Search icon is decorative

---

### Search with Filters

**When to use:** Search that needs additional filtering criteria (category, price range, etc.).

**Components used:** Input, Select, Checkbox, Button

**Example:**

```typescript
import { Input, Button } from '@discourser/design-system';
import * as Select from '@discourser/design-system';
import * as Checkbox from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';
import { createListCollection } from '@ark-ui/react';

function SearchWithFilters() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);

  const categories = createListCollection({
    items: [
      { label: 'All Categories', value: 'all' },
      { label: 'Electronics', value: 'electronics' },
      { label: 'Clothing', value: 'clothing' },
      { label: 'Books', value: 'books' }
    ]
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ query, category, inStock, onSale });
    // Perform filtered search
  };

  return (
    <form onSubmit={handleSearch} className={css({
      maxWidth: '800px',
      mx: 'auto',
      p: 'xl'
    })}>
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'md'
      })}>
        {/* Search input */}
        <Input
          label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
        />

        {/* Filters */}
        <div className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
          gap: 'md'
        })}>
          {/* Category filter */}
          <Select.Root
            collection={categories}
            value={[category]}
            onValueChange={(details) => setCategory(details.value[0])}
          >
            <Select.Label>Category</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select category" />
              </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {categories.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>

          {/* Checkbox filters */}
          <div className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'sm',
            justifyContent: 'center'
          })}>
            <Checkbox.Root
              checked={inStock}
              onCheckedChange={(details) => setInStock(details.checked === true)}
            >
              <Checkbox.Control>
                <Checkbox.Indicator>✓</Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label>In Stock Only</Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              checked={onSale}
              onCheckedChange={(details) => setOnSale(details.checked === true)}
            >
              <Checkbox.Control>
                <Checkbox.Indicator>✓</Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label>On Sale</Checkbox.Label>
            </Checkbox.Root>
          </div>

          {/* Search button */}
          <div className={css({ display: 'flex', alignItems: 'flex-end' })}>
            <Button type="submit" variant="filled" className={css({ width: '100%' })}>
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
```

**Best practices:**

- Group related filters together
- Use appropriate filter types
- Apply filters immediately or on submit
- Show active filter count
- Allow clearing all filters

**Accessibility:**

- All filters are labeled
- Keyboard navigation works
- Screen readers understand filter relationships

---

### Search with Results

**When to use:** Showing search results with loading and empty states.

**Components used:** Input, Card, Skeleton, Button

**Example:**

```typescript
import { Input, Card, Button } from '@discourser/design-system';
import * as Skeleton from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function SearchWithResults() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock results
    const mockResults = query.length > 0
      ? [
          { id: 1, title: `Result for "${query}" #1`, description: 'This is a relevant result...' },
          { id: 2, title: `Result for "${query}" #2`, description: 'Another matching result...' }
        ]
      : [];

    setResults(mockResults);
    setLoading(false);
  };

  return (
    <div className={css({ maxWidth: '800px', mx: 'auto', p: 'xl' })}>
      {/* Search form */}
      <form onSubmit={handleSearch} className={css({ mb: 'xl' })}>
        <div className={css({ display: 'flex', gap: 'sm' })}>
          <div className={css({ flex: 1 })}>
            <Input
              label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search term..."
            />
          </div>
          <Button type="submit" variant="filled" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      {/* Loading state */}
      {loading && (
        <div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
          {[1, 2, 3].map((i) => (
            <Card key={i} variant="elevated" className={css({ p: 'lg' })}>
              <Skeleton.Root>
                <Skeleton.Item height="24px" width="60%" className={css({ mb: 'sm' })} />
                <Skeleton.Item height="16px" width="100%" className={css({ mb: 'xs' })} />
                <Skeleton.Item height="16px" width="80%" />
              </Skeleton.Root>
            </Card>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          {results.length > 0 ? (
            <>
              <div className={css({
                textStyle: 'bodyMedium',
                color: 'onSurfaceVariant',
                mb: 'md'
              })}>
                Found {results.length} results for "{query}"
              </div>

              <div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
                {results.map((result) => (
                  <Card key={result.id} variant="elevated" className={css({ p: 'lg' })}>
                    <h3 className={css({ textStyle: 'titleMedium', color: 'primary', mb: 'xs' })}>
                      {result.title}
                    </h3>
                    <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
                      {result.description}
                    </p>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            // Empty state
            <div className={css({
              textAlign: 'center',
              py: 'xxxl'
            })}>
              <div className={css({
                textStyle: 'headlineSmall',
                color: 'onSurface',
                mb: 'md'
              })}>
                No results found
              </div>
              <p className={css({
                textStyle: 'bodyMedium',
                color: 'onSurfaceVariant',
                mb: 'lg'
              })}>
                Try different keywords or check your spelling
              </p>
              <Button variant="outlined" onClick={() => setQuery('')}>
                Clear Search
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

**Best practices:**

- Show loading skeleton while searching
- Display result count
- Provide empty state with guidance
- Highlight search terms in results
- Add pagination for many results

**Accessibility:**

- Results are announced to screen readers
- Empty state provides clear guidance
- Keyboard navigation works throughout

---

## Authentication Patterns

### Login Form

**When to use:** User authentication for accessing protected areas.

**Components used:** Input, Button, Switch, Toast

**Example:**

```typescript
import { Input, Button, toaster } from '@discourser/design-system';
import * as Switch from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(formData.email, formData.password, formData.rememberMe);

      toaster.create({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
        type: 'success'
      });

      // Redirect to dashboard
    } catch (error) {
      toaster.create({
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({
      maxWidth: '400px',
      mx: 'auto',
      p: 'xl',
      mt: 'xxxl'
    })}>
      <div className={css({ textAlign: 'center', mb: 'xl' })}>
        <h1 className={css({ textStyle: 'headlineLarge', color: 'onSurface', mb: 'xs' })}>
          Welcome Back
        </h1>
        <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'lg'
      })}>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          required
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <div className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        })}>
          <Switch.Root
            checked={formData.rememberMe}
            onCheckedChange={(details) => setFormData({ ...formData, rememberMe: details.checked })}
          >
            <Switch.Label>Remember me</Switch.Label>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>

          <Button variant="text" size="sm">
            Forgot password?
          </Button>
        </div>

        <Button type="submit" variant="filled" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className={css({
          textAlign: 'center',
          textStyle: 'bodyMedium',
          color: 'onSurfaceVariant'
        })}>
          Don't have an account?{' '}
          <Button variant="text" size="sm">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
```

**Best practices:**

- Use email/username and password fields
- Include "Remember me" option
- Provide "Forgot password" link
- Show loading state during authentication
- Link to sign up for new users
- Use password type for security

**Accessibility:**

- All inputs are labeled
- Form can be submitted with Enter
- Error messages are clear
- Focus management is correct

---

### Sign Up Form

**When to use:** New user registration with account creation.

**Components used:** Input, Checkbox, Button, Toast

**Example:**

```typescript
import { Input, Button, toaster } from '@discourser/design-system';
import * as Checkbox from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toaster.create({
        title: 'Validation error',
        description: 'Please check the form for errors.',
        type: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      await registerUser(formData);

      toaster.create({
        title: 'Account created!',
        description: 'Welcome! Please check your email to verify your account.',
        type: 'success'
      });

      // Redirect to email verification
    } catch (error) {
      toaster.create({
        title: 'Registration failed',
        description: 'Email already exists or server error.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({
      maxWidth: '450px',
      mx: 'auto',
      p: 'xl',
      mt: 'xxl'
    })}>
      <div className={css({ textAlign: 'center', mb: 'xl' })}>
        <h1 className={css({ textStyle: 'headlineLarge', color: 'onSurface', mb: 'xs' })}>
          Create Account
        </h1>
        <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
          Join us today and get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'lg'
      })}>
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          errorText={errors.name}
          required
        />

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

        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          errorText={errors.confirmPassword}
          required
        />

        <div>
          <Checkbox.Root
            checked={formData.agreeToTerms}
            onCheckedChange={(details) => setFormData({ ...formData, agreeToTerms: details.checked === true })}
          >
            <Checkbox.Control>
              <Checkbox.Indicator>✓</Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label className={css({ textStyle: 'bodySmall' })}>
              I agree to the{' '}
              <Button variant="text" size="sm" className={css({ display: 'inline', p: 0 })}>
                Terms of Service
              </Button>
              {' '}and{' '}
              <Button variant="text" size="sm" className={css({ display: 'inline', p: 0 })}>
                Privacy Policy
              </Button>
            </Checkbox.Label>
          </Checkbox.Root>
          {errors.terms && (
            <p className={css({ textStyle: 'bodySmall', color: 'error', mt: 'xs' })}>
              {errors.terms}
            </p>
          )}
        </div>

        <Button type="submit" variant="filled" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>

        <div className={css({
          textAlign: 'center',
          textStyle: 'bodyMedium',
          color: 'onSurfaceVariant'
        })}>
          Already have an account?{' '}
          <Button variant="text" size="sm">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
```

**Best practices:**

- Collect minimal required information
- Validate password strength
- Require password confirmation
- Include terms acceptance checkbox
- Show validation errors inline
- Link to existing account login

**Accessibility:**

- All inputs labeled
- Errors associated with inputs
- Terms links are accessible
- Form validates before submission

---

### Password Reset Flow

**When to use:** Allowing users to recover account access via email verification.

**Components used:** Input, Button, Toast

**Example:**

```typescript
import { Input, Button, toaster } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function PasswordResetFlow() {
  const [step, setStep] = useState<'request' | 'sent' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestPasswordReset(email);

      toaster.create({
        title: 'Reset email sent',
        description: 'Check your inbox for password reset instructions.',
        type: 'success'
      });

      setStep('sent');
    } catch (error) {
      toaster.create({
        title: 'Failed to send email',
        description: 'Please check your email address and try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toaster.create({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are identical.',
        type: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      await resetPassword(newPassword);

      toaster.create({
        title: 'Password reset successful',
        description: 'You can now log in with your new password.',
        type: 'success'
      });

      // Redirect to login
    } catch (error) {
      toaster.create({
        title: 'Reset failed',
        description: 'Your reset link may have expired.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({
      maxWidth: '400px',
      mx: 'auto',
      p: 'xl',
      mt: 'xxxl'
    })}>
      {step === 'request' && (
        <>
          <div className={css({ textAlign: 'center', mb: 'xl' })}>
            <h1 className={css({ textStyle: 'headlineLarge', color: 'onSurface', mb: 'xs' })}>
              Reset Password
            </h1>
            <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
              Enter your email to receive reset instructions
            </p>
          </div>

          <form onSubmit={handleRequestReset} className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'lg'
          })}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Button type="submit" variant="filled" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Button variant="text" onClick={() => window.location.href = '/login'}>
              Back to Login
            </Button>
          </form>
        </>
      )}

      {step === 'sent' && (
        <div className={css({ textAlign: 'center' })}>
          <div className={css({
            width: '64px',
            height: '64px',
            bg: 'primaryContainer',
            borderRadius: 'full',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 'lg',
            textStyle: 'headlineLarge',
            color: 'onPrimaryContainer'
          })}>
            ✓
          </div>

          <h1 className={css({ textStyle: 'headlineMedium', color: 'onSurface', mb: 'md' })}>
            Check Your Email
          </h1>

          <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant', mb: 'lg' })}>
            We've sent password reset instructions to <strong>{email}</strong>
          </p>

          <Button variant="outlined" onClick={() => setStep('request')}>
            Didn't receive email?
          </Button>
        </div>
      )}

      {step === 'reset' && (
        <>
          <div className={css({ textAlign: 'center', mb: 'xl' })}>
            <h1 className={css({ textStyle: 'headlineLarge', color: 'onSurface', mb: 'xs' })}>
              Create New Password
            </h1>
            <p className={css({ textStyle: 'bodyMedium', color: 'onSurfaceVariant' })}>
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleResetPassword} className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'lg'
          })}>
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              helperText="Must be at least 8 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="filled" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
```

**Best practices:**

- Use multi-step flow
- Send reset link to email
- Show confirmation after email sent
- Validate new password strength
- Expire reset links after time
- Confirm password match

**Accessibility:**

- Each step is clearly labeled
- Status changes are announced
- All inputs are accessible
- Navigation is logical

---

## Settings Patterns

### Settings Panel

**When to use:** User preferences and configuration options.

**Components used:** Card, Switch, Select, Button

**Example:**

```typescript
import { Card, Button, toaster } from '@discourser/design-system';
import * as Switch from '@discourser/design-system';
import * as Select from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';
import { createListCollection } from '@ark-ui/react';

function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    autoSave: true
  });

  const languages = createListCollection({
    items: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' }
    ]
  });

  const handleSave = () => {
    toaster.create({
      title: 'Settings saved',
      description: 'Your preferences have been updated.',
      type: 'success'
    });
  };

  return (
    <div className={css({ maxWidth: '700px', mx: 'auto', p: 'xl' })}>
      <h1 className={css({ textStyle: 'headlineMedium', mb: 'xl' })}>
        Settings
      </h1>

      <div className={css({ display: 'flex', flexDirection: 'column', gap: 'lg' })}>
        {/* Notifications section */}
        <Card variant="elevated" className={css({ p: 'lg' })}>
          <h2 className={css({ textStyle: 'titleLarge', mb: 'md' })}>
            Notifications
          </h2>

          <div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
            <div className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            })}>
              <div>
                <div className={css({ textStyle: 'titleMedium', mb: 'xs' })}>
                  Push Notifications
                </div>
                <div className={css({ textStyle: 'bodySmall', color: 'onSurfaceVariant' })}>
                  Receive notifications about activity
                </div>
              </div>
              <Switch.Root
                checked={settings.notifications}
                onCheckedChange={(details) => setSettings({ ...settings, notifications: details.checked })}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            </div>
          </div>
        </Card>

        {/* Appearance section */}
        <Card variant="elevated" className={css({ p: 'lg' })}>
          <h2 className={css({ textStyle: 'titleLarge', mb: 'md' })}>
            Appearance
          </h2>

          <div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
            <div className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            })}>
              <div>
                <div className={css({ textStyle: 'titleMedium', mb: 'xs' })}>
                  Dark Mode
                </div>
                <div className={css({ textStyle: 'bodySmall', color: 'onSurfaceVariant' })}>
                  Use dark theme throughout the app
                </div>
              </div>
              <Switch.Root
                checked={settings.darkMode}
                onCheckedChange={(details) => setSettings({ ...settings, darkMode: details.checked })}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            </div>

            <Select.Root
              collection={languages}
              value={[settings.language]}
              onValueChange={(details) => setSettings({ ...settings, language: details.value[0] })}
            >
              <Select.Label>Language</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select language" />
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {languages.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </div>
        </Card>

        {/* Editor section */}
        <Card variant="elevated" className={css({ p: 'lg' })}>
          <h2 className={css({ textStyle: 'titleLarge', mb: 'md' })}>
            Editor
          </h2>

          <div className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          })}>
            <div>
              <div className={css({ textStyle: 'titleMedium', mb: 'xs' })}>
                Auto-save
              </div>
              <div className={css({ textStyle: 'bodySmall', color: 'onSurfaceVariant' })}>
                Automatically save your work
              </div>
            </div>
            <Switch.Root
              checked={settings.autoSave}
              onCheckedChange={(details) => setSettings({ ...settings, autoSave: details.checked })}
            >
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Root>
          </div>
        </Card>

        {/* Save button */}
        <Button variant="filled" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
```

**Best practices:**

- Group related settings
- Use cards for visual separation
- Provide descriptions for clarity
- Show save confirmation
- Consider auto-save for better UX

**Accessibility:**

- Settings are clearly labeled
- Toggle states are announced
- Keyboard navigation works
- Changes can be undone

---

### Profile Settings

**When to use:** User profile information editing.

**Components used:** Avatar, Input, Textarea, Button

**Example:**

```typescript
import { Input, Textarea, Button, toaster } from '@discourser/design-system';
import * as Avatar from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';
import { useState } from 'react';

function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    bio: 'Product designer passionate about user experience',
    avatar: '/avatar.jpg'
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      await updateProfile(profile);

      toaster.create({
        title: 'Profile updated',
        description: 'Your changes have been saved.',
        type: 'success'
      });
    } catch (error) {
      toaster.create({
        title: 'Update failed',
        description: 'Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css({ maxWidth: '600px', mx: 'auto', p: 'xl' })}>
      <h1 className={css({ textStyle: 'headlineMedium', mb: 'xl' })}>
        Profile Settings
      </h1>

      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'xl'
      })}>
        {/* Avatar section */}
        <div className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'lg'
        })}>
          <Avatar.Root size="2xl">
            <Avatar.Image src={profile.avatar} alt={profile.name} />
            <Avatar.Fallback>
              {profile.name.split(' ').map(n => n[0]).join('')}
            </Avatar.Fallback>
          </Avatar.Root>

          <div>
            <Button variant="outlined" size="sm">
              Change Photo
            </Button>
            <p className={css({
              textStyle: 'bodySmall',
              color: 'onSurfaceVariant',
              mt: 'xs'
            })}>
              JPG, PNG or GIF (max 2MB)
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 'lg'
        })}>
          <Input
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            helperText="We'll send updates to this email"
            required
          />

          <Textarea
            label="Bio"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            helperText="Tell us about yourself in a few words"
          />
        </div>

        {/* Actions */}
        <div className={css({
          display: 'flex',
          gap: 'sm',
          justifyContent: 'flex-end',
          pt: 'md',
          borderTopWidth: '1px',
          borderTopColor: 'outlineVariant'
        })}>
          <Button variant="outlined" disabled={loading}>
            Cancel
          </Button>
          <Button variant="filled" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Best practices:**

- Show current profile info
- Allow avatar upload
- Validate email format
- Provide cancel option
- Show save confirmation

**Accessibility:**

- All inputs labeled
- Avatar upload is accessible
- Form submits properly
- Changes are confirmed

---

## Empty States

### No Data

**When to use:** When a section has no content yet but users can add items.

**Components used:** Button

**Example:**

```typescript
import { Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function NoData() {
  return (
    <div className={css({
      textAlign: 'center',
      py: 'xxxl',
      px: 'xl'
    })}>
      {/* Illustration or icon */}
      <div className={css({
        width: '120px',
        height: '120px',
        bg: 'surfaceContainerHighest',
        borderRadius: 'full',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        mb: 'lg',
        textStyle: 'displaySmall',
        color: 'onSurfaceVariant'
      })}>
        📂
      </div>

      {/* Message */}
      <h2 className={css({
        textStyle: 'headlineSmall',
        color: 'onSurface',
        mb: 'md'
      })}>
        No projects yet
      </h2>

      <p className={css({
        textStyle: 'bodyMedium',
        color: 'onSurfaceVariant',
        mb: 'lg',
        maxWidth: '400px',
        mx: 'auto'
      })}>
        Get started by creating your first project. Projects help you organize your work and collaborate with your team.
      </p>

      {/* Action */}
      <Button variant="filled">
        Create Project
      </Button>
    </div>
  );
}
```

**Best practices:**

- Use friendly illustration or icon
- Explain why it's empty
- Provide clear call-to-action
- Keep message concise
- Center content vertically

**Accessibility:**

- Message is clear and helpful
- Action button is prominent
- Works with screen readers

---

### No Search Results

**When to use:** Search returned no matches.

**Components used:** Button

**Example:**

```typescript
import { Button } from '@discourser/design-system';
import { css } from '@discourser/design-system/styled-system/css';

function NoSearchResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className={css({
      textAlign: 'center',
      py: 'xxxl',
      px: 'xl'
    })}>
      {/* Icon */}
      <div className={css({
        width: '80px',
        height: '80px',
        bg: 'surfaceContainerHighest',
        borderRadius: 'full',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        mb: 'lg',
        textStyle: 'headlineLarge',
        color: 'onSurfaceVariant'
      })}>
        🔍
      </div>

      {/* Message */}
      <h2 className={css({
        textStyle: 'headlineSmall',
        color: 'onSurface',
        mb: 'md'
      })}>
        No results for "{query}"
      </h2>

      <p className={css({
        textStyle: 'bodyMedium',
        color: 'onSurfaceVariant',
        mb: 'lg'
      })}>
        Try different keywords or check your spelling
      </p>

      {/* Suggestions */}
      <div className={css({ mb: 'lg' })}>
        <p className={css({
          textStyle: 'labelMedium',
          color: 'onSurfaceVariant',
          mb: 'sm'
        })}>
          Suggestions:
        </p>
        <ul className={css({
          textStyle: 'bodySmall',
          color: 'onSurfaceVariant',
          listStyle: 'none',
          p: 0
        })}>
          <li>Check spelling and try again</li>
          <li>Try more general keywords</li>
          <li>Try different keywords</li>
        </ul>
      </div>

      {/* Action */}
      <Button variant="outlined" onClick={onClear}>
        Clear Search
      </Button>
    </div>
  );
}
```

**Best practices:**

- Show the search query
- Provide helpful suggestions
- Allow clearing search
- Keep tone friendly
- Consider showing related results

**Accessibility:**

- Clear messaging
- Suggestions are readable
- Action is accessible

---

## Summary

This guide covers 25+ common UI patterns using the Discourser Design System. Each pattern demonstrates:

- **When to use**: Clear use cases and scenarios
- **Components used**: Which design system components to combine
- **Complete code examples**: Production-ready TypeScript/JSX
- **Best practices**: Implementation guidelines
- **Accessibility**: Inclusive design considerations

### Pattern Categories

1. **Forms (5 patterns)**: Vertical, horizontal, multi-step, validation, dependencies
2. **Navigation (4 patterns)**: Sidebar, top nav, tabs, breadcrumbs
3. **Feedback (4 patterns)**: Success, errors, confirmations, notifications
4. **Loading (4 patterns)**: Page load, partial load, button loading, infinite scroll
5. **Data Display (4 patterns)**: Card grids, lists with actions, avatars, accordions
6. **Search & Filter (3 patterns)**: Simple search, filtered search, search results
7. **Authentication (3 patterns)**: Login, signup, password reset
8. **Settings (2 patterns)**: Settings panel, profile settings
9. **Empty States (2 patterns)**: No data, no results

### Using These Patterns

1. **Identify your use case**: Find the pattern that matches your needs
2. **Review the example**: Understand the component structure
3. **Customize as needed**: Adapt the pattern to your specific requirements
4. **Follow best practices**: Apply the recommended guidelines
5. **Test accessibility**: Ensure your implementation is inclusive

### Additional Resources

- **Component Guidelines**: See `guidelines/components/` for detailed component documentation
- **Design Tokens**: See `guidelines/design-tokens/` for colors, spacing, typography
- **Component Overview**: See `overview-components.md` for available components

For questions or contributions, visit the [Discourser Design System repository](https://github.com/Tasty-Maker-Studio/Discourser-Design-System).
