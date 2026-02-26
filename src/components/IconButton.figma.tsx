import figma from '@figma/code-connect'
import { IconButton } from './IconButton'

figma.connect(IconButton, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', {
      Solid: 'solid', Elevated: 'elevated', Surface: 'surface',
      Subtle: 'subtle', Outline: 'outline', Plain: 'plain',
    }),
    colorPalette: figma.enum('Color Palette', {
      Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary',
      Neutral: 'neutral', Error: 'error',
    }),
    size: figma.enum('Size', {
      '2xs': '2xs', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl',
    }),
  },
  example: ({ variant, colorPalette, size }) => (
    <IconButton variant={variant} colorPalette={colorPalette} size={size} aria-label="Action">
      {/* icon */}
    </IconButton>
  ),
})
