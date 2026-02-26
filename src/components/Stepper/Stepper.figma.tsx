import figma from '@figma/code-connect'
import { Stepper } from './index'

figma.connect(Stepper, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    colorPalette: figma.enum('Color Palette', { Primary: 'primary', Secondary: 'secondary' }),
  },
  example: ({ colorPalette }) => (
    <Stepper
      steps={steps}
      defaultStep={0}
      colorPalette={colorPalette}
      showContent
      showActions
    />
  ),
})
