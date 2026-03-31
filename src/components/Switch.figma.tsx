/**
 * @dds-tokens
 * recipe: switchComponent
 * variantProps: variant, size
 * figmaPropToRecipeProp:
 *   Toggled: checked
 *   State: state
 */
import figma from '@figma/code-connect';
import * as Switch from './Switch';

// Original designer-built component — Discourser AI Switch Toggle (38:8121)
// Variants: Toggled(False/True) × State(Default/Focus/Disabled)
// This is the component used in production Discourser.AI page designs.
//
// Import as namespace: import * as Switch from '@discourser/design-system/Switch'
//
// Anatomy:
//   <Switch.Root defaultChecked={bool}>
//     <Switch.Control />   ← renders the track + thumb internally
//     <Switch.Label>Label text</Switch.Label>
//   </Switch.Root>
//
// Key props on Root:
//   defaultChecked  — uncontrolled initial state (boolean)
//   checked         — controlled state (boolean)
//   onCheckedChange — callback ({ checked }: { checked: boolean }) => void
//   disabled        — boolean
//
// Note: Switch.Control includes Switch.Thumb by default via defaultProps.
// Do NOT add <Switch.Thumb> manually inside <Switch.Control>.
figma.connect(
  Switch.Root,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8121',
  {
    props: {
      checked: figma.enum('Toggled', {
        False: false,
        True: true,
      }),
    },
    example: ({ checked }) => (
      <Switch.Root defaultChecked={checked}>
        <Switch.Control />
        <Switch.Label>Toggle</Switch.Label>
      </Switch.Root>
    ),
  },
);
