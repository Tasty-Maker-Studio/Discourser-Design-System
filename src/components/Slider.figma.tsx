/**
 * @dds-tokens
 * recipe: slider
 * variantProps: orientation, size, variant
 * figmaPropToRecipeProp:
 *   Orientation: orientation
 *   Size: size
 */
import figma from '@figma/code-connect';
import * as Slider from './Slider';

// Original designer-built component — Discourser AI Slider (38:7988)
// This is the component used in production Discourser.AI page designs.
//
// Import as namespace: import * as Slider from '@discourser/design-system/Slider'
//
// Anatomy:
//   <Slider.Root defaultValue={[number]} min={number} max={number} step={number}>
//     <Slider.Label>Label text</Slider.Label>
//     <Slider.Control>
//       <Slider.Track>
//         <Slider.Range />
//       </Slider.Track>
//       <Slider.Thumbs />     ← convenience component, renders one Thumb per value
//     </Slider.Control>
//     <Slider.ValueText />    ← optional, displays current value
//   </Slider.Root>
//
// Key props on Root:
//   defaultValue  — uncontrolled initial value array, e.g. [50]
//   value         — controlled value array, e.g. [50]
//   onValueChange — callback ({ value }: { value: number[] }) => void
//   min           — number (default: 0)
//   max           — number (default: 100)
//   step          — number (default: 1)
//   orientation   — 'horizontal' | 'vertical' (default: 'horizontal')
//   disabled      — boolean
//   colorPalette  — 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'error'
//
// Convenience components:
//   <Slider.Thumbs />    — renders one Thumb per value entry (use instead of
//                          manually mapping Slider.Thumb with index props)
//   <Slider.Marks marks={[0, 25, 50, 75, 100]} /> — renders a MarkerGroup
figma.connect(
  Slider.Root,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-7988',
  {
    props: {
      orientation: figma.enum('Orientation', {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      }),
    },
    example: ({ orientation }) => (
      <Slider.Root defaultValue={[50]} orientation={orientation}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    ),
  },
);
