import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
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
    disabled: figma.boolean('Disabled'),
    loading: figma.boolean('Loading'),
    label: figma.string('Label'),
  },
  example: ({ variant, colorPalette, size, disabled, loading, label }) => (
    <Button variant={variant} colorPalette={colorPalette} size={size} disabled={disabled} loading={loading}>
      {label}
    </Button>
  ),
})
