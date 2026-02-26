import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

figma.connect(Textarea, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    disabled: figma.boolean('Disabled'),
    placeholder: figma.string('Placeholder'),
  },
  example: ({ disabled, placeholder }) => (
    <Textarea disabled={disabled} placeholder={placeholder} rows={3} />
  ),
})
