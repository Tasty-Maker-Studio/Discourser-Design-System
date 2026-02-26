import figma from '@figma/code-connect'
import * as Checkbox from './Checkbox'

figma.connect(Checkbox.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    disabled: figma.boolean('Disabled'),
    label: figma.string('Label'),
  },
  example: ({ colorPalette, disabled, label }) => (
    <Checkbox.Root colorPalette={colorPalette} disabled={disabled}>
      <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
      <Checkbox.Label>{label}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  ),
})
