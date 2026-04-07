# Component Catalog

> **Status:** Generated — auto-produced by `scripts/generate-component-catalog.ts`
> **Source:** `stories/ComponentCatalog.stories.tsx` + `src/components/index.ts`
> **Design System Version:** 0.28.0
> **Generated:** 2026-04-07
> **Do not hand-edit** — this file is overwritten on every build

---

## Overview

38 components in the Discourser Design System.
Run `pnpm catalog:generate` to regenerate after changes.

---

## AbsoluteCenter

**Type:** Compound
**Import:** `import { AbsoluteCenter } from '@discourser/design-system'`

**Usage:**
```tsx
<AbsoluteCenterNS.AbsoluteCenter>
```

---

## Accordion

**Type:** Compound
**Import:** `import { Accordion } from '@discourser/design-system'`

**Usage:**
```tsx
<Accordion.Root defaultValue={['item-1']} collapsible>
```

---

## Avatar

**Type:** Compound
**Import:** `import { Avatar } from '@discourser/design-system'`

**Usage:**
```tsx
<Avatar.Root size={s}>
```

---

## Badge

**Type:** Simple
**Import:** `import { Badge } from '@discourser/design-system'`

**Usage:**
```tsx
<Badge key={cp} variant={bv} colorPalette={cp}>
```

---

## Breadcrumb

**Type:** Compound
**Import:** `import { Breadcrumb } from '@discourser/design-system'`

**Usage:**
```tsx
<Breadcrumb.Root>
```

---

## Button

**Type:** Simple
**Import:** `import { Button } from '@discourser/design-system'`

**Usage:**
```tsx
<Button variant={v} colorPalette="primary">
```

---

## Card

**Type:** Compound
**Import:** `import { Card } from '@discourser/design-system'`

**Usage:**
```tsx
<Card.Root key={v} variant={v} w="60">
```

---

## Checkbox

**Type:** Compound
**Import:** `import { Checkbox } from '@discourser/design-system'`

**Usage:**
```tsx
<Checkbox.Root colorPalette="primary" checked={checked} disabled={disabled} >
```

---

## CloseButton

**Type:** Compound
**Import:** `import { CloseButton } from '@discourser/design-system'`

**Usage:**
```tsx
<CloseButtonNS.CloseButton />
```

---

## ContentCard

**Type:** Compound
**Import:** `import { ContentCard } from '@discourser/design-system'`

**Usage:**
```tsx
<ContentCard.Root key={v} variant={v} size="md" css={{w: '72'}}>
```

---

## Dialog

**Type:** Compound
**Import:** `import { Dialog } from '@discourser/design-system'`

**Usage:**
```tsx
<Dialog.Root>
```

---

## Divider

**Type:** Simple
**Import:** `import { Divider } from '@discourser/design-system'`

**Usage:**
```tsx
<Divider />
```

---

## Drawer

**Type:** Compound
**Import:** `import { Drawer } from '@discourser/design-system'`

**Usage:**
```tsx
<Drawer.Root>
```

---

## Group

**Type:** Compound
**Import:** `import { Group } from '@discourser/design-system'`

**Usage:**
```tsx
<GroupNS.Group>
```

---

## Header

**Type:** Simple
**Import:** `import { Header } from '@discourser/design-system'`

**Usage:**
```tsx
<Header size="4xl" css={{color: 'onSurface'}}>
```

---

## Icon

**Type:** Compound
**Import:** `import { Icon } from '@discourser/design-system'`

**Usage:**
```tsx
<IconButton variant={v} colorPalette="primary" aria-label={v}>
```

---

## IconButton

**Type:** Simple
**Import:** `import { IconButton } from '@discourser/design-system'`

**Usage:**
```tsx
<IconButton variant={v} colorPalette="primary" aria-label={v}>
```

---

## Input

**Type:** Simple
**Import:** `import { Input } from '@discourser/design-system'`

**Usage:**
```tsx
<Input size={s} placeholder={`Input size ${s}`} />
```

---

## InputAddon

**Type:** Simple
**Import:** `import { InputAddon } from '@discourser/design-system'`

**Usage:**
```tsx
<InputAddon>
```

---

## InputGroup

**Type:** Simple
**Import:** `import { InputGroup } from '@discourser/design-system'`

**Usage:**
```tsx
<InputGroup w="full">
```

---

## NavigationMenu

**Type:** Simple
**Import:** `import { NavigationMenu } from '@discourser/design-system'`

**Usage:**
```tsx
<NavigationMenu sections={NAV_SECTIONS} defaultOpenSections={['dashboard', 'scenarios']} activeHref="/dashboard/progress" />
```

---

## Popover

**Type:** Compound
**Import:** `import { Popover } from '@discourser/design-system'`

**Usage:**
```tsx
<Popover.Root open>
```

---

## Progress

**Type:** Compound
**Import:** `import { Progress } from '@discourser/design-system'`

**Usage:**
```tsx
<Progress.Root key={cp} value={value} colorPalette={cp} w="full">
```

---

## RadioGroup

**Type:** Compound
**Import:** `import { RadioGroup } from '@discourser/design-system'`

**Usage:**
```tsx
<RadioGroup.Root defaultValue="b" colorPalette={cp}>
```

---

## ScenarioQueue

**Type:** Simple
**Import:** `import { ScenarioQueue } from '@discourser/design-system'`

**Usage:**
```tsx
<ScenarioQueue scenarios={MOCK_SCENARIOS} onReorder={(ids) =>
```

---

## ScenarioSettings

**Type:** Simple
**Import:** `import { ScenarioSettings } from '@discourser/design-system'`

**Usage:**
```tsx
<ScenarioSettings />
```

---

## Select

**Type:** Compound
**Import:** `import { Select } from '@discourser/design-system'`

**Usage:**
```tsx
<Select.Root collection={frameworkCollection}>
```

---

## SettingsPopover

**Type:** Simple
**Import:** `import { SettingsPopover } from '@discourser/design-system'`

**Usage:** *(see ComponentCatalog.stories.tsx)*

---

## Skeleton

**Type:** Compound
**Import:** `import { Skeleton } from '@discourser/design-system'`

**Usage:**
```tsx
<Skeleton.SkeletonText noOfLines={3} w="48" />
```

---

## Slider

**Type:** Compound
**Import:** `import { Slider } from '@discourser/design-system'`

**Usage:**
```tsx
<Slider.Root key={cp} defaultValue={[20 + i * 15]} colorPalette={cp} w="full" >
```

---

## Spinner

**Type:** Simple
**Import:** `import { Spinner } from '@discourser/design-system'`

**Usage:**
```tsx
<Spinner size={s} colorPalette="primary" />
```

---

## Stepper

**Type:** Simple
**Import:** `import { Stepper } from '@discourser/design-system'`

**Usage:**
```tsx
<Stepper steps={stepperSteps} defaultStep={step} showContent={false} colorPalette="primary" />
```

---

## StudioControls

**Type:** Simple
**Import:** `import { StudioControls } from '@discourser/design-system'`

**Usage:**
```tsx
<StudioControls scenarioName="UX Interview Practice" scenarioFocus="Technical Communication" scenarioLevel="beginner" />
```

---

## Switch

**Type:** Compound
**Import:** `import { Switch } from '@discourser/design-system'`

**Usage:**
```tsx
<Switch.Root colorPalette="primary" defaultChecked={defaultChecked} disabled={disabled} >
```

---

## Tabs

**Type:** Compound
**Import:** `import { Tabs } from '@discourser/design-system'`

**Usage:**
```tsx
<Tabs.Root defaultValue="overview">
```

---

## Textarea

**Type:** Simple
**Import:** `import { Textarea } from '@discourser/design-system'`

**Usage:**
```tsx
<Textarea placeholder="Enter your message…" rows={3} />
```

---

## Toast

**Type:** Simple
**Import:** `import { Toast } from '@discourser/design-system'`

**Usage:**
```tsx
<Toaster />
```

---

## Tooltip

**Type:** Compound
**Import:** `import { Tooltip } from '@discourser/design-system'`

**Usage:**
```tsx
<Tooltip.Tooltip content="Helpful contextual tooltip text" showArrow portalled={false} open >
```

---
