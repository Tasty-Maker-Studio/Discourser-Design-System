import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src';

const meta: Meta = {
  title: 'Components/Form/Checkbox',
  component: Checkbox.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator></Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Checkbox.Root disabled>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator></Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Accept terms (disabled)</Checkbox.Label>
    </Checkbox.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Checkbox.Root>
      <Checkbox.Control>
        <Checkbox.Indicator></Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Marketing emails</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  ),
};
