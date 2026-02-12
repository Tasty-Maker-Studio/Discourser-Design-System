import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from '../src';

const meta: Meta = {
  title: 'Components/Form/RadioGroup',
  component: RadioGroup.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

export const Default: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="md" colorPalette="primary">
      <RadioGroup.Label>Size</RadioGroup.Label>
      {options.map((option) => (
        <RadioGroup.Item key={option.value} value={option.value}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup.Root disabled colorPalette="primary">
      <RadioGroup.Label>Size (disabled)</RadioGroup.Label>
      {options.map((option) => (
        <RadioGroup.Item key={option.value} value={option.value}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="md" orientation="horizontal" colorPalette="primary">
      <RadioGroup.Label>Size</RadioGroup.Label>
      {options.map((option) => (
        <RadioGroup.Item key={option.value} value={option.value}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  ),
};
