import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Switch from '../src/components/Switch';
import { VStack, HStack } from '../styled-system/jsx';

const meta: Meta<typeof Switch.Root> = {
  title: 'Components / Switch',
  component: Switch.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch.Root>;

export const Default: Story = {
  render: () => (
    <Switch.Root colorPalette="primary">
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  ),
};

export const ColorPalettes: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Switch.Root colorPalette="primary">
        <Switch.Control />
        <Switch.Label>Primary (Green)</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>

      <Switch.Root colorPalette="neutral" defaultChecked>
        <Switch.Control />
        <Switch.Label>Neutral (Gray)</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>

      <Switch.Root colorPalette="error">
        <Switch.Control />
        <Switch.Label>Error (Red)</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Switch.Root size="sm">
        <Switch.Control />
        <Switch.Label>Small</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>

      <Switch.Root size="md">
        <Switch.Control />
        <Switch.Label>Medium (Default)</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>

      <Switch.Root size="lg">
        <Switch.Control />
        <Switch.Label>Large</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </VStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Switch.Root disabled>
        <Switch.Control />
        <Switch.Label>Disabled (Unchecked)</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>

      <Switch.Root disabled defaultChecked>
        <Switch.Control />
        <Switch.Label>Disabled (Checked)</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </VStack>
  ),
};
