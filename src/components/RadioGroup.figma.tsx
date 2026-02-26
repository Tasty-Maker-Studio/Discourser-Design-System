import figma from '@figma/code-connect'
import * as RadioGroup from './RadioGroup'

figma.connect(RadioGroup.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
  },
  example: ({ colorPalette }) => (
    <RadioGroup.Root colorPalette={colorPalette}>
      <RadioGroup.Item value="option">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>Option</RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Root>
  ),
})
