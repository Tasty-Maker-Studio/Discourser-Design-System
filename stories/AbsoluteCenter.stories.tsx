import type { Meta, StoryObj } from '@storybook/react-vite';
import { AbsoluteCenter } from '../src/components/AbsoluteCenter';
import { Box } from '../styled-system/jsx';

const meta: Meta<typeof AbsoluteCenter> = {
  title: 'Components/Layout/AbsoluteCenter',
  component: AbsoluteCenter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AbsoluteCenter>;

export const Default: Story = {
  render: () => (
    <Box
      position="relative"
      w="48"
      h="32"
      borderWidth="1px"
      borderColor="border"
      borderRadius="l2"
    >
      <AbsoluteCenter>Centered content</AbsoluteCenter>
    </Box>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Box
      position="relative"
      w="48"
      h="32"
      bg="surface.container"
      borderRadius="l2"
    >
      <AbsoluteCenter>
        <Box fontSize="2xl">⭐</Box>
      </AbsoluteCenter>
    </Box>
  ),
};
