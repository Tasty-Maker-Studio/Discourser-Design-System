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
//
// Anatomy:
//   <RadioGroup.Root value={string} onValueChange={fn}>
//     <RadioGroup.Item value="x">
//       <RadioGroup.ItemControl />
//       <RadioGroup.ItemText>Label</RadioGroup.ItemText>
//     </RadioGroup.Item>
//   </RadioGroup.Root>
//
// Key props on Root:
//   value         — controlled selected value (string)
//   defaultValue  — uncontrolled initial value (string)
//   onValueChange — callback ({ value }: { value: string }) => void
//   disabled      — boolean, disables all items
//   orientation   — 'horizontal' | 'vertical' (default: 'vertical')
//
// Key props on Item:
//   value         — required unique string for this option
//   disabled      — boolean, disables this item only
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
      <RadioGroup.Root defaultValue="option-1">
        <RadioGroup.Item value="option-1">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="option-2">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="option-3">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Option 3</RadioGroup.ItemText>
        </RadioGroup.Item>
      </RadioGroup.Root>
    ),
  },
);
