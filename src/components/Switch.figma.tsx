import figma from '@figma/code-connect'
import * as Switch from './Switch'

figma.connect(Switch.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    disabled: figma.boolean('Disabled'),
    label: figma.string('Label'),
  },
  example: ({ colorPalette, disabled, label }) => (
    <Switch.Root colorPalette={colorPalette} disabled={disabled}>
      <Switch.Control><Switch.Thumb /></Switch.Control>
      <Switch.Label>{label}</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  ),
})
