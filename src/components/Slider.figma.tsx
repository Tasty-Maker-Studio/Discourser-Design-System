import figma from '@figma/code-connect'
import * as Slider from './Slider'

figma.connect(Slider.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
  },
  example: ({ colorPalette }) => (
    <Slider.Root colorPalette={colorPalette}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track><Slider.Range /></Slider.Track>
        <Slider.Thumb index={0}><Slider.HiddenInput /></Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  ),
})
