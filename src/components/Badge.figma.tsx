import figma from '@figma/code-connect'
import { Badge } from './Badge'

figma.connect(Badge, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', { Solid: 'solid', Subtle: 'subtle', Outline: 'outline' }),
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    size: figma.enum('Size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    label: figma.string('Label'),
  },
  example: ({ variant, colorPalette, size, label }) => (
    <Badge variant={variant} colorPalette={colorPalette} size={size}>{label}</Badge>
  ),
})
