# Component Quick Reference

## Component Type Lookup

| Component  | Type         | Usage                                                         |
| ---------- | ------------ | ------------------------------------------------------------- |
| Button     | Simple       | `<Button variant="solid" colorPalette="primary">`             |
| Heading    | Simple       | `<Heading as="h1" size="2xl">`                                |
| Input      | Simple       | `<Input label="..." />`                                       |
| Textarea   | Simple       | `<Textarea label="..." />`                                    |
| Badge      | Simple       | `<Badge>`                                                     |
| Spinner    | Simple       | `<Spinner />`                                                 |
| Card       | **Compound** | `<Card.Root>` → `.Header`, `.Title`, `.Body`, `.Footer`       |
| Dialog     | **Compound** | `<Dialog.Root>` → `.Trigger`, `.Content`, `.Title`            |
| Drawer     | **Compound** | `<Drawer.Root>` → `.Trigger`, `.Content`                      |
| Switch     | **Compound** | `<Switch.Root>` → `.Control`, `.Thumb`, `.Label`              |
| Checkbox   | **Compound** | `<Checkbox.Root>` → `.Control`, `.Label`                      |
| RadioGroup | **Compound** | `<RadioGroup.Root>` → `.Item`, `.ItemControl`, `.ItemText`    |
| Select     | **Compound** | `<Select.Root>` → `.Control`, `.Trigger`, `.Content`, `.Item` |
| Tabs       | **Compound** | `<Tabs.Root>` → `.List`, `.Trigger`, `.Content`               |
| Accordion  | **Compound** | `<Accordion.Root>` → `.Item`, `.Trigger`, `.Content`          |
| Avatar     | **Compound** | `<Avatar.Root>` → `.Image`, `.Fallback`                       |
| Tooltip    | **Compound** | `<Tooltip.Root>` → `.Trigger`, `.Content`                     |
| Popover    | **Compound** | `<Popover.Root>` → `.Trigger`, `.Content`                     |
| IconButton | **Compound** | `<IconButton.Root aria-label="...">`                          |
| Progress   | **Compound** | `<Progress.Root>` → `.Track`, `.Range`                        |
| Skeleton   | **Compound** | `<Skeleton.Root>` → `.Item`                                   |
| Slider     | **Compound** | `<Slider.Root>` → `.Control`, `.Track`, `.Thumb`              |

---

## Button Variants

| Variant   | colorPalette | Use Case                 |
| --------- | ------------ | ------------------------ |
| `solid`   | `primary`    | Primary CTA, form submit |
| `solid`   | `error`      | Destructive actions      |
| `outline` | `neutral`    | Secondary action, cancel |
| `outline` | `primary`    | Alternative primary      |
| `plain`   | `primary`    | Text link, tertiary      |
| `subtle`  | `neutral`    | Low emphasis             |
| `surface` | `primary`    | Elevated button          |

**⚠️ ALWAYS include `colorPalette`**

```tsx
// ✅ Correct
<Button variant="solid" colorPalette="primary">Submit</Button>

// ❌ Wrong (missing colorPalette)
<Button variant="solid">Submit</Button>
```

---

## Heading Sizes

| Size        | Usage                |
| ----------- | -------------------- |
| `3xl`-`7xl` | Page hero, marketing |
| `2xl`       | Page title (h1)      |
| `xl`        | Section title (h2)   |
| `lg`        | Subsection (h3)      |
| `md`-`sm`   | Minor headings       |

```tsx
<Heading as="h1" size="2xl">Page Title</Heading>
<Heading as="h2" size="xl">Section</Heading>
```

---

## Card Structure

```tsx
<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Body>{/* Main content */}</Card.Body>
  <Card.Footer>
    <Button variant="outline" colorPalette="neutral">
      Cancel
    </Button>
    <Button variant="solid" colorPalette="primary">
      Save
    </Button>
  </Card.Footer>
</Card.Root>
```

Card variants: `elevated`, `outline`, `filled`

---

## Dialog Structure

```tsx
<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button variant="solid" colorPalette="primary">
      Open
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Title</Dialog.Title>
    <Dialog.Description>Description</Dialog.Description>
    {/* Content */}
    <Button variant="outline" colorPalette="neutral">
      Cancel
    </Button>
    <Button variant="solid" colorPalette="primary">
      Confirm
    </Button>
  </Dialog.Content>
</Dialog.Root>
```

---

## Switch Structure

```tsx
<Switch.Root checked={value} onCheckedChange={setValue}>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label>Enable feature</Switch.Label>
</Switch.Root>
```

---

## Select Structure

```tsx
<Select.Root items={items} value={value} onValueChange={setValue}>
  <Select.Label>Choose option</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select..." />
    </Select.Trigger>
  </Select.Control>
  <Select.Content>
    {items.map((item) => (
      <Select.Item key={item.value} item={item}>
        <Select.ItemText>{item.label}</Select.ItemText>
      </Select.Item>
    ))}
  </Select.Content>
</Select.Root>
```

---

## Semantic Tokens

### Colors

| Token              | Usage                        |
| ------------------ | ---------------------------- |
| `primary`          | Brand color, primary actions |
| `onPrimary`        | Text on primary bg           |
| `surface`          | Default background           |
| `onSurface`        | Default text                 |
| `surfaceContainer` | Card/panel backgrounds       |
| `error`            | Error states                 |
| `outline`          | Borders                      |

### Spacing

`xs` (4px) → `sm` (8px) → `md` (16px) → `lg` (24px) → `xl` (32px)

### Border Radius

`l1` (4px) → `l2` (8px) → `l3` (12px) → `l4` (16px) → `full`

---

## Common Patterns

### Form with Card

```tsx
<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>
      <Heading as="h2" size="xl">
        Sign In
      </Heading>
    </Card.Title>
  </Card.Header>
  <Card.Body
    className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}
  >
    <Input label="Email" type="email" />
    <Input label="Password" type="password" />
  </Card.Body>
  <Card.Footer>
    <Button variant="solid" colorPalette="primary" type="submit">
      Sign In
    </Button>
  </Card.Footer>
</Card.Root>
```

### Button Group

```tsx
<div className={css({ display: 'flex', gap: 'sm' })}>
  <Button variant="outline" colorPalette="neutral">
    Cancel
  </Button>
  <Button variant="solid" colorPalette="primary">
    Confirm
  </Button>
</div>
```

### Page Layout

```tsx
<div className={css({ p: 'xl', bg: 'surface', minHeight: '100vh' })}>
  <Heading as="h1" size="2xl" className={css({ mb: 'lg', color: 'onSurface' })}>
    Dashboard
  </Heading>
  {/* Content */}
</div>
```
