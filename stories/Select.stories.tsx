import type { Meta, StoryObj } from '@storybook/react';
import * as Select from '../src/components/Select';
import { VStack } from '../styled-system/jsx';

const meta: Meta<typeof Select.Root> = {
  title: 'Components / Select',
  component: Select.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

const scenarios = [
  { label: 'Chat', value: 'chat' },
  { label: 'Analysis', value: 'analysis' },
  { label: 'Research', value: 'research' },
  { label: 'Writing', value: 'writing' },
  { label: 'Coding', value: 'coding' },
];

export const Default: Story = {
  render: () => (
    <Select.Root colorPalette="primary" items={scenarios} positioning={{ sameWidth: true }}>
      <Select.Label>Select Scenario</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a scenario..." />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.List>
            {scenarios.map((scenario) => (
              <Select.Item key={scenario.value} item={scenario}>
                <Select.ItemText>{scenario.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="6" alignItems="start" width="300px">
      <Select.Root colorPalette="primary" items={scenarios} size="sm" positioning={{ sameWidth: true }}>
        <Select.Label>Small</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select..." />
            <Select.Indicator />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.List>
              {scenarios.map((scenario) => (
                <Select.Item key={scenario.value} item={scenario}>
                  <Select.ItemText>{scenario.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>

      <Select.Root colorPalette="primary" items={scenarios} size="md" positioning={{ sameWidth: true }}>
        <Select.Label>Medium (Default)</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select..." />
            <Select.Indicator />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.List>
              {scenarios.map((scenario) => (
                <Select.Item key={scenario.value} item={scenario}>
                  <Select.ItemText>{scenario.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>

      <Select.Root colorPalette="primary" items={scenarios} size="lg" positioning={{ sameWidth: true }}>
        <Select.Label>Large</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select..." />
            <Select.Indicator />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.List>
              {scenarios.map((scenario) => (
                <Select.Item key={scenario.value} item={scenario}>
                  <Select.ItemText>{scenario.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>
    </VStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select.Root colorPalette="primary" items={scenarios} disabled positioning={{ sameWidth: true }}>
      <Select.Label>Disabled Select</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Cannot select..." />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.List>
            {scenarios.map((scenario) => (
              <Select.Item key={scenario.value} item={scenario}>
                <Select.ItemText>{scenario.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  ),
};

export const WithGroups: Story = {
  render: () => {
    const groupedItems = [
      { label: 'Common', items: [
        { label: 'Chat', value: 'chat' },
        { label: 'Analysis', value: 'analysis' },
      ]},
      { label: 'Advanced', items: [
        { label: 'Research', value: 'research' },
        { label: 'Writing', value: 'writing' },
        { label: 'Coding', value: 'coding' },
      ]},
    ];

    return (
      <Select.Root colorPalette="primary" items={scenarios} positioning={{ sameWidth: true }}>
        <Select.Label>Grouped Options</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a scenario..." />
            <Select.Indicator />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.List>
              {groupedItems.map((group) => (
                <Select.ItemGroup key={group.label}>
                  <Select.ItemGroupLabel>{group.label}</Select.ItemGroupLabel>
                  {group.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              ))}
            </Select.List>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
      </Select.Root>
    );
  },
};
