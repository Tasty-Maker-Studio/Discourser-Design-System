import figma from '@figma/code-connect'
import { Spinner } from './Spinner'

figma.connect(Spinner, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    size: figma.enum('Size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
  },
  example: ({ size, colorPalette }) => <Spinner size={size} colorPalette={colorPalette} />,
})
