import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Avatar from '../src/components/Avatar';
import { VStack, HStack } from '../styled-system/jsx';

const meta: Meta<typeof Avatar.Root> = {
  title: 'Components / Avatar',
  component: Avatar.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar.Root>;

export const Default: Story = {
  render: () => (
    <Avatar.Root colorPalette="primary">
      <Avatar.Fallback name="John Doe" />
      <Avatar.Image
        src="https://i.pravatar.cc/150?img=3"
        alt="John Doe"
      />
    </Avatar.Root>
  ),
};

export const WithInitials: Story = {
  render: () => (
    <HStack gap="4">
      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="Sarah Williams" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="Michael Chen" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="Emily Rodriguez" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="David Kim" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="Lisa" />
      </Avatar.Root>
    </HStack>
  ),
};

export const WithImages: Story = {
  render: () => (
    <HStack gap="4">
      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="User 1" />
        <Avatar.Image src="https://i.pravatar.cc/150?img=1" alt="User 1" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="User 2" />
        <Avatar.Image src="https://i.pravatar.cc/150?img=5" alt="User 2" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="User 3" />
        <Avatar.Image src="https://i.pravatar.cc/150?img=8" alt="User 3" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="User 4" />
        <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="User 4" />
      </Avatar.Root>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap="4" alignItems="center">
      <Avatar.Root colorPalette="primary" size="xs">
        <Avatar.Fallback name="XS" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary" size="sm">
        <Avatar.Fallback name="SM" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary" size="md">
        <Avatar.Fallback name="MD" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary" size="lg">
        <Avatar.Fallback name="LG" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary" size="xl">
        <Avatar.Fallback name="XL" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary" size="2xl">
        <Avatar.Fallback name="2XL" />
      </Avatar.Root>
    </HStack>
  ),
};

export const ColorPalettes: Story = {
  render: () => (
    <HStack gap="4">
      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="Primary" />
      </Avatar.Root>

      <Avatar.Root colorPalette="neutral">
        <Avatar.Fallback name="Neutral" />
      </Avatar.Root>

      <Avatar.Root colorPalette="error">
        <Avatar.Fallback name="Error" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="Green" />
      </Avatar.Root>
    </HStack>
  ),
};

export const FallbackVariants: Story = {
  render: () => (
    <HStack gap="4">
      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="With Name" />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback />
      </Avatar.Root>

      <Avatar.Root colorPalette="primary">
        <Avatar.Fallback name="Failed Image" />
        <Avatar.Image src="invalid-url.jpg" alt="Failed" />
      </Avatar.Root>
    </HStack>
  ),
};

export const Group: Story = {
  render: () => (
    <VStack gap="6" alignItems="start">
      <div>
        <h4>User Group</h4>
        <HStack gap="-3">
          <Avatar.Root colorPalette="primary" size="md">
            <Avatar.Fallback name="Alice Johnson" />
            <Avatar.Image src="https://i.pravatar.cc/150?img=1" alt="Alice" />
          </Avatar.Root>

          <Avatar.Root colorPalette="primary" size="md">
            <Avatar.Fallback name="Bob Smith" />
            <Avatar.Image src="https://i.pravatar.cc/150?img=2" alt="Bob" />
          </Avatar.Root>

          <Avatar.Root colorPalette="primary" size="md">
            <Avatar.Fallback name="Carol White" />
            <Avatar.Image src="https://i.pravatar.cc/150?img=3" alt="Carol" />
          </Avatar.Root>

          <Avatar.Root colorPalette="primary" size="md">
            <Avatar.Fallback name="David Brown" />
            <Avatar.Image src="https://i.pravatar.cc/150?img=4" alt="David" />
          </Avatar.Root>

          <Avatar.Root colorPalette="neutral" size="md">
            <Avatar.Fallback>+5</Avatar.Fallback>
          </Avatar.Root>
        </HStack>
      </div>

      <div>
        <h4>Small Group</h4>
        <HStack gap="-2">
          <Avatar.Root colorPalette="primary" size="sm">
            <Avatar.Fallback name="User 1" />
          </Avatar.Root>

          <Avatar.Root colorPalette="primary" size="sm">
            <Avatar.Fallback name="User 2" />
          </Avatar.Root>

          <Avatar.Root colorPalette="primary" size="sm">
            <Avatar.Fallback name="User 3" />
          </Avatar.Root>

          <Avatar.Root colorPalette="neutral" size="sm">
            <Avatar.Fallback>+12</Avatar.Fallback>
          </Avatar.Root>
        </HStack>
      </div>
    </VStack>
  ),
};
