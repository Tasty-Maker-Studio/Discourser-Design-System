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
