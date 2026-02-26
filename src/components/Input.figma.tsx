import figma from '@figma/code-connect'
import { Input } from './Input'

figma.connect(Input, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    size: figma.enum('Size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }),
    disabled: figma.boolean('Disabled'),
    placeholder: figma.string('Placeholder'),
  },
  example: ({ size, disabled, placeholder }) => (
    <Input size={size} disabled={disabled} placeholder={placeholder} />
  ),
})
