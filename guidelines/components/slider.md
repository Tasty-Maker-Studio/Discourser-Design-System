# Slider

**Purpose:** Range selection control for choosing numeric values or ranges along a continuous scale following Material Design 3 patterns.

## When to Use This Component

Use Slider when you need users to **select a value or range from a continuous spectrum** (volume, brightness, price ranges, ratings).

**Decision Tree:**

| Scenario                                                     | Use This                       | Why                               |
| ------------------------------------------------------------ | ------------------------------ | --------------------------------- |
| Select value from continuous range (0-100, 1-10)             | Slider ✅                      | Visual, intuitive for ranges      |
| Adjust settings with immediate feedback (volume, brightness) | Slider ✅                      | Visual representation of value    |
| Filter by range (price: $0-$1000, dates)                     | Slider with multiple thumbs ✅ | Dual-ended range selection        |
| Precise numeric input (age, quantity)                        | Input with type="number"       | Keyboard entry is more precise    |
| Select from discrete options (1, 2, 3, 4, 5)                 | RadioGroup or Select           | Explicit, distinct choices        |
| Binary choice (on/off, yes/no)                               | Switch                         | Visual metaphor for state         |
| Large range with precision needed (thousands)                | Input with type="number"       | Slider imprecise for large ranges |

**Component Comparison:**

```typescript
// ✅ Use Slider for continuous ranges
<Slider.Root min={0} max={100} defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>

// ✅ Use Slider for range selection (price filter)
<Slider.Root min={0} max={1000} defaultValue={[100, 500]}>
  <Slider.Label>Price Range</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumbs>
      {({ thumbs }) => thumbs.map((thumb) => (
        <Slider.Thumb key={thumb} index={thumb} />
      ))}
    </Slider.Thumbs>
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>

// ❌ Don't use Slider for precise numeric input
<Slider.Root min={0} max={9999} defaultValue={[5432]}>
  <Slider.Label>Enter exact amount</Slider.Label>
  {/* ... */}
</Slider.Root>  // Wrong - hard to select precise values

<Input label="Enter exact amount" type="number" />  // Correct

// ❌ Don't use Slider for discrete options
<Slider.Root min={1} max={5} step={1}>
  <Slider.Label>Rating</Slider.Label>
  {/* ... */}
</Slider.Root>  // Wrong - use discrete selector

<RadioGroup.Root>
  <RadioGroup.Label>Rating</RadioGroup.Label>
  <RadioGroup.Item value="1"><RadioGroup.ItemText>1 Star</RadioGroup.ItemText></RadioGroup.Item>
  <RadioGroup.Item value="2"><RadioGroup.ItemText>2 Stars</RadioGroup.ItemText></RadioGroup.Item>
  {/* ... */}
</RadioGroup.Root>  // Correct

// ❌ Don't use Slider for binary choices
<Slider.Root min={0} max={1} defaultValue={[1]}>
  <Slider.Label>Enable notifications</Slider.Label>
  {/* ... */}
</Slider.Root>  // Wrong - binary state

<Switch.Root>
  <Switch.Label>Enable notifications</Switch.Label>
  <Switch.Control><Switch.Thumb /></Switch.Control>
</Switch.Root>  // Correct
```

## Import

```typescript
import * as Slider from '@discourser/design-system';
```

## Component Structure

Slider uses a compound component pattern from Ark UI with these parts:

- `Slider.Root` - Container with value and range configuration
- `Slider.Label` - Label for the slider
- `Slider.Control` - Interactive control area
- `Slider.Track` - Background track
- `Slider.Range` - Highlighted active range
- `Slider.Thumb` - Draggable handle (single thumb)
- `Slider.Thumbs` - Container for multiple thumbs (range slider)
- `Slider.ValueText` - Display of current value(s)
- `Slider.Marker` - Individual marker indicator
- `Slider.MarkerGroup` - Container for markers

## Variants

| Variant   | Visual Style                    | Usage            | When to Use             |
| --------- | ------------------------------- | ---------------- | ----------------------- |
| `outline` | Track with border, filled range | Standard sliders | Default, most use cases |

**Note:** Currently only `outline` variant is implemented. Additional variants can be added as needed.

## Sizes

| Size | Thumb Size | Track Height | Usage                       |
| ---- | ---------- | ------------ | --------------------------- |
| `sm` | 20px       | 8px          | Compact UI, dense layouts   |
| `md` | 20px       | 8px          | Default, most use cases     |
| `lg` | 20px       | 8px          | Touch targets, mobile-first |

**Recommendation:** Use `md` for most cases. Sizes are consistent to maintain usability.

## Props

### Root Props

| Prop               | Type                         | Default        | Description                   |
| ------------------ | ---------------------------- | -------------- | ----------------------------- |
| `min`              | `number`                     | `0`            | Minimum value                 |
| `max`              | `number`                     | `100`          | Maximum value                 |
| `step`             | `number`                     | `1`            | Increment step                |
| `value`            | `number[]`                   | -              | Controlled value(s)           |
| `defaultValue`     | `number[]`                   | -              | Uncontrolled default value(s) |
| `onValueChange`    | `(details) => void`          | -              | Callback when value changes   |
| `onValueChangeEnd` | `(details) => void`          | -              | Callback when dragging ends   |
| `disabled`         | `boolean`                    | `false`        | Disable slider interaction    |
| `orientation`      | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation            |
| `name`             | `string`                     | -              | Form field name               |
| `colorPalette`     | `string`                     | -              | Color palette for theming     |

### Style Props

| Prop      | Type                   | Default     | Description          |
| --------- | ---------------------- | ----------- | -------------------- |
| `size`    | `'sm' \| 'md' \| 'lg'` | `'md'`      | Slider size          |
| `variant` | `'outline'`            | `'outline'` | Visual style variant |

## Examples

### Basic Single Slider

```typescript
import * as Slider from '@discourser/design-system';

// Simple slider with default range (0-100)
<Slider.Root defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>
```

### Controlled Slider

```typescript
const [volume, setVolume] = useState([50]);

<Slider.Root
  value={volume}
  onValueChange={(details) => setVolume(details.value)}
>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>

// Display value elsewhere
<p>Current volume: {volume[0]}%</p>
```

### Custom Range and Step

```typescript
// Temperature slider (0-30°C, step 0.5)
<Slider.Root min={0} max={30} step={0.5} defaultValue={[21]}>
  <Slider.Label>Temperature (°C)</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>

// Rating slider (1-10, whole numbers)
<Slider.Root min={1} max={10} step={1} defaultValue={[7]}>
  <Slider.Label>Rating</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>
```

### Range Slider (Dual Thumbs)

```typescript
// Price range filter
const [priceRange, setPriceRange] = useState([100, 500]);

<Slider.Root
  min={0}
  max={1000}
  value={priceRange}
  onValueChange={(details) => setPriceRange(details.value)}
>
  <Slider.Label>Price Range</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumbs>
      {({ thumbs }) => thumbs.map((thumb) => (
        <Slider.Thumb key={thumb} index={thumb} />
      ))}
    </Slider.Thumbs>
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>

// Display formatted range
<p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
```

### With Custom Value Display

```typescript
const [brightness, setBrightness] = useState([75]);

<Slider.Root
  min={0}
  max={100}
  value={brightness}
  onValueChange={(details) => setBrightness(details.value)}
>
  <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 'xs' })}>
    <Slider.Label>Brightness</Slider.Label>
    <span className={css({ fontWeight: 'semibold' })}>{brightness[0]}%</span>
  </div>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>
```

### Different Sizes

```typescript
// Small
<Slider.Root size="sm" defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// Medium (default)
<Slider.Root size="md" defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// Large
<Slider.Root size="lg" defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>
```

### Vertical Orientation

```typescript
<Slider.Root
  orientation="vertical"
  min={0}
  max={100}
  defaultValue={[50]}
  className={css({ height: '200px' })}
>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>
```

### With Markers

```typescript
<Slider.Root min={0} max={100} step={25} defaultValue={[50]}>
  <Slider.Label>Progress</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
    <Slider.MarkerGroup>
      <Slider.Marker value={0}>0%</Slider.Marker>
      <Slider.Marker value={25}>25%</Slider.Marker>
      <Slider.Marker value={50}>50%</Slider.Marker>
      <Slider.Marker value={75}>75%</Slider.Marker>
      <Slider.Marker value={100}>100%</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Control>
</Slider.Root>
```

### With Color Palette

```typescript
// Primary color
<Slider.Root defaultValue={[50]} colorPalette="primary">
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// Success color
<Slider.Root defaultValue={[75]} colorPalette="success">
  <Slider.Label>Progress</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// Error color
<Slider.Root defaultValue={[25]} colorPalette="error">
  <Slider.Label>Risk Level</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>
```

### Disabled State

```typescript
<Slider.Root defaultValue={[50]} disabled>
  <Slider.Label>Volume (Disabled)</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>
```

### With onChange Callback

```typescript
const [volume, setVolume] = useState([50]);

<Slider.Root
  value={volume}
  onValueChange={(details) => {
    setVolume(details.value);
    console.log('Value changed:', details.value);
  }}
  onValueChangeEnd={(details) => {
    console.log('Final value:', details.value);
    // Save to backend or apply changes
  }}
>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>
```

## Common Patterns

### Volume Control

```typescript
const [volume, setVolume] = useState([70]);
const [isMuted, setIsMuted] = useState(false);

<div className={css({ display: 'flex', alignItems: 'center', gap: 'md' })}>
  <IconButton
    variant="ghost"
    size="sm"
    aria-label={isMuted ? 'Unmute' : 'Mute'}
    onClick={() => setIsMuted(!isMuted)}
  >
    {isMuted ? <VolumeOffIcon /> : <VolumeIcon />}
  </IconButton>

  <Slider.Root
    className={css({ flex: 1 })}
    value={isMuted ? [0] : volume}
    onValueChange={(details) => {
      setVolume(details.value);
      if (details.value[0] > 0) setIsMuted(false);
    }}
    disabled={isMuted}
  >
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb />
    </Slider.Control>
  </Slider.Root>

  <span className={css({ minW: '12', textAlign: 'right' })}>
    {isMuted ? '0' : volume[0]}%
  </span>
</div>
```

### Price Range Filter

```typescript
const [priceRange, setPriceRange] = useState([50, 500]);

<div className={css({ display: 'flex', flexDirection: 'column', gap: 'md' })}>
  <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
    <span className={css({ fontWeight: 'medium' })}>Price Range</span>
    <span className={css({ color: 'fg.muted' })}>
      ${priceRange[0]} - ${priceRange[1]}
    </span>
  </div>

  <Slider.Root
    min={0}
    max={1000}
    step={10}
    value={priceRange}
    onValueChange={(details) => setPriceRange(details.value)}
  >
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumbs>
        {({ thumbs }) => thumbs.map((thumb) => (
          <Slider.Thumb key={thumb} index={thumb} />
        ))}
      </Slider.Thumbs>
    </Slider.Control>
  </Slider.Root>

  <div className={css({ display: 'flex', gap: 'md' })}>
    <Input
      type="number"
      value={priceRange[0]}
      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
      prefix="$"
      size="sm"
    />
    <span className={css({ alignSelf: 'center' })}>to</span>
    <Input
      type="number"
      value={priceRange[1]}
      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
      prefix="$"
      size="sm"
    />
  </div>
</div>
```

### Zoom Control

```typescript
const [zoom, setZoom] = useState([100]);
const zoomLevels = [50, 75, 100, 125, 150, 200];

<div className={css({ display: 'flex', alignItems: 'center', gap: 'md' })}>
  <IconButton
    variant="ghost"
    size="sm"
    aria-label="Zoom out"
    onClick={() => setZoom([Math.max(50, zoom[0] - 25)])}
  >
    <MinusIcon />
  </IconButton>

  <Slider.Root
    className={css({ flex: 1 })}
    min={50}
    max={200}
    step={25}
    value={zoom}
    onValueChange={(details) => setZoom(details.value)}
  >
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb />
      <Slider.MarkerGroup>
        {zoomLevels.map((level) => (
          <Slider.Marker key={level} value={level} />
        ))}
      </Slider.MarkerGroup>
    </Slider.Control>
  </Slider.Root>

  <IconButton
    variant="ghost"
    size="sm"
    aria-label="Zoom in"
    onClick={() => setZoom([Math.min(200, zoom[0] + 25)])}
  >
    <PlusIcon />
  </IconButton>

  <span className={css({ minW: '16', textAlign: 'right' })}>{zoom[0]}%</span>
</div>
```

### Settings Panel

```typescript
const [settings, setSettings] = useState({
  brightness: [75],
  contrast: [50],
  saturation: [60],
});

<div className={css({ display: 'flex', flexDirection: 'column', gap: 'lg' })}>
  <div>
    <Slider.Root
      value={settings.brightness}
      onValueChange={(details) =>
        setSettings({ ...settings, brightness: details.value })
      }
    >
      <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 'xs' })}>
        <Slider.Label>Brightness</Slider.Label>
        <span>{settings.brightness[0]}%</span>
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  </div>

  <div>
    <Slider.Root
      value={settings.contrast}
      onValueChange={(details) =>
        setSettings({ ...settings, contrast: details.value })
      }
    >
      <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 'xs' })}>
        <Slider.Label>Contrast</Slider.Label>
        <span>{settings.contrast[0]}%</span>
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  </div>

  <div>
    <Slider.Root
      value={settings.saturation}
      onValueChange={(details) =>
        setSettings({ ...settings, saturation: details.value })
      }
    >
      <div className={css({ display: 'flex', justifyContent: 'space-between', mb: 'xs' })}>
        <Slider.Label>Saturation</Slider.Label>
        <span>{settings.saturation[0]}%</span>
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  </div>

  <Button variant="filled" onClick={() => console.log('Save settings:', settings)}>
    Apply Changes
  </Button>
</div>
```

## DO NOT

```typescript
// ❌ Don't use Slider for precise numeric input
<Slider.Root min={0} max={999999} defaultValue={[12345]}>
  <Slider.Label>Account Number</Slider.Label>
  {/* ... */}
</Slider.Root>  // Wrong - impossible to select precise value

// ✅ Use Input for precise values
<Input label="Account Number" type="number" />

// ❌ Don't omit Track and Range
<Slider.Root defaultValue={[50]}>
  <Slider.Control>
    <Slider.Thumb />  // Wrong - missing Track/Range
  </Slider.Control>
</Slider.Root>

// ✅ Include Track and Range
<Slider.Root defaultValue={[50]}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// ❌ Don't use single thumb for range selection
<Slider.Root min={0} max={1000} defaultValue={[500]}>
  <Slider.Label>Price Range</Slider.Label>
  {/* ... */}
</Slider.Root>  // Wrong - need two thumbs for range

// ✅ Use Thumbs component for ranges
<Slider.Root min={0} max={1000} defaultValue={[100, 500]}>
  <Slider.Label>Price Range</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumbs>
      {({ thumbs }) => thumbs.map((thumb) => (
        <Slider.Thumb key={thumb} index={thumb} />
      ))}
    </Slider.Thumbs>
  </Slider.Control>
</Slider.Root>

// ❌ Don't override thumb positioning with inline styles
<Slider.Thumb style={{ left: '50%' }} />  // Wrong - breaks functionality

// ❌ Don't use for binary choices
<Slider.Root min={0} max={1} defaultValue={[1]}>
  <Slider.Label>Enable feature</Slider.Label>
  {/* ... */}
</Slider.Root>  // Wrong - use Switch instead

// ✅ Use Switch for on/off
<Switch.Root>
  <Switch.Label>Enable feature</Switch.Label>
  <Switch.Control><Switch.Thumb /></Switch.Control>
</Switch.Root>
```

## Accessibility

The Slider component follows WCAG 2.1 Level AA standards:

- **Keyboard Navigation**: Arrow keys to adjust value, Home/End for min/max
- **Focus Indicator**: Clear focus ring on thumb
- **ARIA Attributes**: Proper `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **Labels**: Associated labels for screen readers
- **Touch Targets**: Minimum 44x44px touch area for thumbs
- **Value Announcements**: Value changes announced to screen readers

### Accessibility Best Practices

```typescript
// ✅ Always provide a label
<Slider.Root defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// ✅ Provide value context
<Slider.Root min={0} max={100} defaultValue={[50]}>
  <Slider.Label>Volume (%)</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>

// ✅ Use appropriate step values
<Slider.Root min={0} max={100} step={5} defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// ✅ Provide visual feedback for ranges
<Slider.Root min={0} max={1000} defaultValue={[100, 500]}>
  <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
    <Slider.Label>Price Range</Slider.Label>
    <span aria-live="polite">${priceRange[0]} - ${priceRange[1]}</span>
  </div>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumbs>
      {({ thumbs }) => thumbs.map((thumb) => (
        <Slider.Thumb key={thumb} index={thumb} />
      ))}
    </Slider.Thumbs>
  </Slider.Control>
</Slider.Root>
```

## State Behaviors

| State        | Visual Change                   | Behavior                   |
| ------------ | ------------------------------- | -------------------------- |
| **Default**  | Track with thumb at position    | Ready for interaction      |
| **Hover**    | Thumb shows hover state         | Visual feedback            |
| **Focus**    | Focus ring on thumb             | Keyboard navigation active |
| **Dragging** | Thumb follows cursor/touch      | Value updates in real-time |
| **Disabled** | Reduced opacity, no interaction | Cannot be adjusted         |

## Responsive Considerations

```typescript
// Mobile-first: Horizontal slider with larger touch targets
<Slider.Root size={{ base: 'lg', md: 'md' }} defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

// Responsive width
<div className={css({ width: { base: 'full', md: '400px' } })}>
  <Slider.Root defaultValue={[50]}>
    <Slider.Label>Brightness</Slider.Label>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb />
    </Slider.Control>
  </Slider.Root>
</div>

// Vertical on desktop, horizontal on mobile
<Slider.Root
  orientation={{ base: 'horizontal', md: 'vertical' }}
  defaultValue={[50]}
  className={css({ height: { md: '200px' } })}
>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>
```

## Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('slider updates value on interaction', async () => {
  const handleChange = vi.fn();

  render(
    <Slider.Root defaultValue={[50]} onValueChange={handleChange}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  );

  const slider = screen.getByRole('slider', { name: 'Volume' });

  // Simulate keyboard interaction
  slider.focus();
  await userEvent.keyboard('{ArrowRight}');

  expect(handleChange).toHaveBeenCalled();
});

test('disabled slider cannot be adjusted', () => {
  render(
    <Slider.Root defaultValue={[50]} disabled>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Control>
    </Slider.Root>
  );

  const slider = screen.getByRole('slider');
  expect(slider).toHaveAttribute('aria-disabled', 'true');
});

test('range slider has multiple thumbs', () => {
  render(
    <Slider.Root defaultValue={[25, 75]}>
      <Slider.Label>Range</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs>
          {({ thumbs }) => thumbs.map((thumb) => (
            <Slider.Thumb key={thumb} index={thumb} />
          ))}
        </Slider.Thumbs>
      </Slider.Control>
    </Slider.Root>
  );

  const sliders = screen.getAllByRole('slider');
  expect(sliders).toHaveLength(2);
});
```

## Related Components

- **Input** - For precise numeric entry
- **Switch** - For binary on/off states
- **RadioGroup** - For discrete option selection
- **Select** - For choosing from predefined options
