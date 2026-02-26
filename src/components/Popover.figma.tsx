import figma from '@figma/code-connect'
import * as Popover from './Popover'

figma.connect(Popover.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Popover.Root>
      <Popover.Trigger asChild><button>Trigger</button></Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow><Popover.ArrowTip /></Popover.Arrow>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
})
