import figma from '@figma/code-connect'
import { Tooltip } from './Tooltip'

figma.connect(Tooltip, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    content: figma.string('Content'),
  },
  example: ({ content }) => (
    <Tooltip content={content} showArrow>
      <button>Trigger</button>
    </Tooltip>
  ),
})
