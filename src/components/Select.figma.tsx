import figma from '@figma/code-connect'
import * as Select from './Select'

figma.connect(Select.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => (
    <Select.Root collection={collection}>
      <Select.Label>Label</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select..." />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.Item item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  ),
})
