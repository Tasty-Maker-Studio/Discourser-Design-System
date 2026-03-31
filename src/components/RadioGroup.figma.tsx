/**
 * @dds-tokens
 * recipe: radioGroup
 * variantProps: variant, size
 * figmaPropToRecipeProp:
 *   Checked: checked
 *   State: state
 */
import figma from '@figma/code-connect';
import * as RadioGroup from './RadioGroup';

// Original designer-built component — .Radio Group Radio Toggle (38:8893)
// Variants: Checked(False/True) × State(Default/Focus/Disabled)
// This is the component used in production Discourser.AI page designs.
figma.connect(
  RadioGroup.Root,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8893',
  {
    props: {
      checked: figma.enum('Checked', {
        False: false,
        True: true,
      }),
    },
    example: ({ checked: _checked }) => (
      <RadioGroup.Root>
        <RadioGroup.Item value="item-1">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="item-2">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
        </RadioGroup.Item>
      </RadioGroup.Root>
    ),
  },
);
