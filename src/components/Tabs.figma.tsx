import figma from '@figma/code-connect'
import * as Tabs from './Tabs'

figma.connect(Tabs.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>
  ),
})
