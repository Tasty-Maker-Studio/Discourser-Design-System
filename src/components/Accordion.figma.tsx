import figma from '@figma/code-connect'
import * as Accordion from './Accordion'

figma.connect(Accordion.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Accordion.Root collapsible>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger>
          <span>Trigger</span>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>Content</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  ),
})
