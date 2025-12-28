# Example Starter Code

This guide provides example components and starter code to include in your Figma Make template.

## Overview

**Purpose:** Showcase the design system and provide starting points for users

**Time Required:** 30-45 minutes

**What You'll Create:**
1. Enhanced App.tsx with multiple examples
2. Example components demonstrating patterns
3. README file for users

## Why Include Examples?

**Benefits of starter code:**
- ✅ Shows best practices
- ✅ Demonstrates correct component usage
- ✅ Provides copy/paste starting points
- ✅ Reduces learning curve
- ✅ Ensures consistency

**Users can:**
- See components in action
- Copy patterns for their own code
- Learn by example
- Get started faster

## Step 1: Create Examples Folder

### 1.1 Create Folder Structure

In Figma Make (**Code** panel):
1. Right-click **src/**
2. Select **Create new folder**
3. Name it: `examples`

### 1.2 Folder Purpose

This folder will contain example components that users can reference or delete:
```
src/
├── App.tsx           # Main app with examples
├── main.tsx          # Entry point (don't modify)
└── examples/         # Example components
    ├── ButtonExamples.tsx
    ├── FormExamples.tsx
    └── LayoutExamples.tsx
```

## Step 2: Create Enhanced App.tsx

Replace the test code with a comprehensive example.

### 2.1 Open App.tsx

1. Click **Code** → **src/** → **App.tsx**
2. Select all existing content
3. Replace with the code below

### 2.2 App.tsx Complete Code

```tsx
import { useState } from 'react';
import { Button, Card } from '@discourser/design-system';
import { ButtonExamples } from './examples/ButtonExamples';
import { FormExamples } from './examples/FormExamples';
import { LayoutExamples } from './examples/LayoutExamples';

export default function App() {
  const [activeTab, setActiveTab] = useState<'buttons' | 'forms' | 'layouts'>('buttons');

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAEF', padding: '2rem' }}>
      {/* Header */}
      <Card variant="elevated" style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '2rem' }}>
          <h1 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '2rem' }}>
            Discourser Design System
          </h1>
          <p style={{ margin: 0, color: '#5E5F59' }}>
            Material Design 3 components with Panda CSS and Ark UI
          </p>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <Button
          variant={activeTab === 'buttons' ? 'filled' : 'outlined'}
          onClick={() => setActiveTab('buttons')}
        >
          Button Examples
        </Button>
        <Button
          variant={activeTab === 'forms' ? 'filled' : 'outlined'}
          onClick={() => setActiveTab('forms')}
        >
          Form Examples
        </Button>
        <Button
          variant={activeTab === 'layouts' ? 'filled' : 'outlined'}
          onClick={() => setActiveTab('layouts')}
        >
          Layout Examples
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'buttons' && <ButtonExamples />}
      {activeTab === 'forms' && <FormExamples />}
      {activeTab === 'layouts' && <LayoutExamples />}

      {/* Footer */}
      <Card variant="outlined" style={{ marginTop: '2rem' }}>
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#777771' }}>
            Built with @discourser/design-system • Material Design 3
          </p>
        </div>
      </Card>
    </div>
  );
}
```

### 2.3 Save

Press **Cmd+S / Ctrl+S** to save.

## Step 3: Create ButtonExamples.tsx

### 3.1 Create File

1. Right-click **src/examples/**
2. **Create new file**
3. Name it: `ButtonExamples.tsx`

### 3.2 Add Content

```tsx
import { Button, Card, IconButton } from '@discourser/design-system';

export function ButtonExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Button Variants */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Button Variants</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="filled">Filled</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="tonal">Tonal</Button>
          </div>
        </div>
      </Card>

      {/* Button Sizes */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Button Sizes</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </Card>

      {/* Button States */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Button States</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="filled">Default</Button>
            <Button variant="filled" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </Card>

      {/* Icon Buttons */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Icon Buttons</h2>
          <p style={{ margin: '0 0 1rem 0', color: '#5E5F59', fontSize: '0.875rem' }}>
            Note: Replace with your icon library
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <IconButton variant="standard" aria-label="Menu">
              ☰
            </IconButton>
            <IconButton variant="filled" aria-label="Close">
              ✕
            </IconButton>
            <IconButton variant="tonal" aria-label="Settings">
              ⚙
            </IconButton>
            <IconButton variant="outlined" aria-label="Info">
              ⓘ
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

## Step 4: Create FormExamples.tsx

### 4.1 Create File

1. Right-click **src/examples/**
2. **Create new file**
3. Name it: `FormExamples.tsx`

### 4.2 Add Content

```tsx
import { useState } from 'react';
import { Button, Card, Input, Switch } from '@discourser/design-system';

export function FormExamples() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    notifications: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Login Form */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Login Form Example</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              helperText="Must be at least 8 characters"
              required
            />
            <Switch
              label="Enable notifications"
              checked={formData.notifications}
              onCheckedChange={({ checked }) => setFormData({ ...formData, notifications: checked })}
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Button type="button" variant="text">
                Forgot Password?
              </Button>
              <Button type="submit" variant="filled">
                Log In
              </Button>
            </div>
            {submitted && (
              <p style={{ margin: 0, color: '#4C662B', fontSize: '0.875rem' }}>
                ✓ Form submitted successfully!
              </p>
            )}
          </form>
        </div>
      </Card>

      {/* Input Variants */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Input Variants</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input label="Outlined (default)" variant="outlined" placeholder="Enter text..." />
            <Input label="Filled" variant="filled" placeholder="Enter text..." />
            <Input label="With Error" errorText="This field is required" />
            <Input label="Disabled" disabled value="Cannot edit" />
          </div>
        </div>
      </Card>

      {/* Switch Examples */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Switch Examples</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Switch label="Email notifications" defaultChecked />
            <Switch label="Dark mode" />
            <Switch label="Auto-save" defaultChecked />
            <Switch label="Disabled (on)" disabled defaultChecked />
            <Switch label="Disabled (off)" disabled />
          </div>
        </div>
      </Card>
    </div>
  );
}
```

## Step 5: Create LayoutExamples.tsx

### 5.1 Create File

1. Right-click **src/examples/**
2. **Create new file**
3. Name it: `LayoutExamples.tsx`

### 5.2 Add Content

```tsx
import { useState } from 'react';
import { Button, Card, Dialog } from '@discourser/design-system';

export function LayoutExamples() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Card Variants */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <Card variant="elevated">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Elevated Card</h3>
            <p style={{ margin: 0, color: '#5E5F59', fontSize: '0.875rem' }}>
              Default variant with shadow
            </p>
          </div>
        </Card>
        <Card variant="filled">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Filled Card</h3>
            <p style={{ margin: 0, color: '#5E5F59', fontSize: '0.875rem' }}>
              Solid background variant
            </p>
          </div>
        </Card>
        <Card variant="outlined">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Outlined Card</h3>
            <p style={{ margin: 0, color: '#5E5F59', fontSize: '0.875rem' }}>
              Border-only variant
            </p>
          </div>
        </Card>
      </div>

      {/* Dialog Example */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Dialog Example</h2>
          <Button variant="filled" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>

          <Dialog
            open={dialogOpen}
            onOpenChange={({ open }) => setDialogOpen(open)}
            title="Example Dialog"
            size="md"
          >
            <div style={{ padding: '1.5rem' }}>
              <p style={{ marginTop: 0, color: '#5E5F59' }}>
                This is an example dialog using the Dialog component from the design system.
              </p>
              <p style={{ marginBottom: 0, color: '#5E5F59' }}>
                Click the X button or press Escape to close.
              </p>
            </div>
          </Dialog>
        </div>
      </Card>

      {/* Grid Layout */}
      <Card variant="elevated">
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Responsive Grid Layout</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                style={{
                  padding: '2rem 1rem',
                  background: '#EEEFE3',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                Item {num}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
```

## Step 6: Test All Examples

### 6.1 Preview the App

1. Click **Preview** button (top-right)
2. Wait for compilation
3. Verify all tabs work:
   - Button Examples tab
   - Form Examples tab
   - Layout Examples tab

### 6.2 Test Interactivity

**Button Examples Tab:**
- ✅ All button variants display correctly
- ✅ All button sizes display correctly
- ✅ Disabled state shows properly
- ✅ Icon buttons render

**Form Examples Tab:**
- ✅ Login form accepts input
- ✅ Form submits and shows success message
- ✅ Input variants all display
- ✅ Switches toggle on/off

**Layout Examples Tab:**
- ✅ Card variants all render
- ✅ Dialog opens and closes
- ✅ Grid layout is responsive

### 6.3 Check Responsive Behavior

1. In preview, resize the browser window
2. Verify:
   - ✅ Buttons wrap on small screens
   - ✅ Grid adjusts column count
   - ✅ Forms remain usable on mobile

## Step 7: Add README for Users

### 7.1 Create README.md

1. Right-click **src/**
2. **Create new file**
3. Name it: `README.md`

### 7.2 Add Content

```markdown
# Discourser Design System Template

This template provides a starting point for building applications with the Discourser Design System.

## What's Included

- ✅ `@discourser/design-system` pre-installed
- ✅ Complete design system guidelines in `guidelines/`
- ✅ Example components in `src/examples/`
- ✅ TypeScript + Vite configuration
- ✅ Material Design 3 components

## Getting Started

### 1. Explore the Examples

The app includes three tabs of examples:
- **Button Examples** - All button variants and sizes
- **Form Examples** - Form components and patterns
- **Layout Examples** - Card layouts and dialogs

### 2. Read the Guidelines

Access design system documentation in the `guidelines/` folder:
- Start with `Guidelines.md`
- Check `overview-components.md` for available components
- Read component-specific guides before using

### 3. Start Building

You can:
- Modify the existing examples
- Delete `src/examples/` and start fresh
- Keep examples as reference

## Using Figma Make AI

The AI is trained on the design system guidelines. Try asking:
- "Create a login form"
- "Add a card with a button"
- "Create a settings page with switches"

The AI will use the correct components and patterns automatically.

## Components Available

- **Button** - 5 variants, 3 sizes
- **Card** - 3 variants
- **Dialog** - Modal overlays
- **IconButton** - Icon-only buttons
- **Input** - Text input fields
- **Switch** - Toggle controls

## Design Tokens

Use semantic tokens instead of raw values:
- Colors: `primary`, `onPrimary`, `surface`, etc.
- Typography: `headlineLarge`, `bodyMedium`, etc.
- Spacing: `sm`, `md`, `lg`, etc.

## Learn More

- Package: https://www.npmjs.com/package/@discourser/design-system
- Guidelines: Check the `guidelines/` folder
- Material Design 3: https://m3.material.io/

## Need Help?

Ask Figma Make AI questions about:
- How to use components
- When to use which variant
- Best practices and patterns

The AI has access to all the design system guidelines!
```

## Tips for Effective Examples

### Keep It Simple
- ✅ Show common use cases
- ✅ Use clear labels and descriptions
- ❌ Don't add complex business logic
- ❌ Don't overcomplicate examples

### Make It Interactive
- ✅ Include working forms
- ✅ Add clickable buttons
- ✅ Show state changes
- ✅ Demonstrate dialogs/modals

### Provide Context
- ✅ Add comments explaining patterns
- ✅ Include helpful descriptions
- ✅ Show DO and DON'T examples
- ✅ Label each example clearly

## Checkpoint

Before moving to publication, verify:

- [x] App.tsx has tabbed examples
- [x] ButtonExamples.tsx created and working
- [x] FormExamples.tsx created and working
- [x] LayoutExamples.tsx created and working
- [x] All examples render in preview
- [x] Interactivity works (forms, dialogs, switches)
- [x] README.md created for users

**All complete?** ✅ Ready to publish!

## What's Next?

With examples in place, your template is feature-complete. Now it's time to publish it so your team can use it!

**Next:** [Publishing Your Template](./06-publishing-template.md) →

**Previous:** [Adding Guidelines](./04-adding-guidelines.md) ←
