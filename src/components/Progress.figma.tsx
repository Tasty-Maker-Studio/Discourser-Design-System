import figma from '@figma/code-connect'
import * as Progress from './Progress'

figma.connect(Progress.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary', Error: 'error',
    }),
  },
  example: ({ colorPalette }) => (
    <Progress.Root value={50} colorPalette={colorPalette}>
      <Progress.Label>Label</Progress.Label>
      <Progress.ValueText />
      <Progress.Track><Progress.Range /></Progress.Track>
    </Progress.Root>
  ),
})
