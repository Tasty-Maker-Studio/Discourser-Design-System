import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/Badge';
import { HStack, VStack } from '../styled-system/jsx';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'surface', 'subtle', 'outline'],
      description: 'Badge variant style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Badge size',
    },
    colorPalette: {
      control: 'select',
      options: ['primary', 'neutral', 'error'],
      description: 'Color palette (M3 colors)',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge with medium size and subtle variant
 */
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'subtle',
    size: 'md',
    colorPalette: 'primary',
  },
};

/**
 * All badge variants displayed together
 */
export const Variants: Story = {
  render: () => (
    <HStack gap="4">
      <Badge variant="solid" colorPalette="primary">
        Solid
      </Badge>
      <Badge variant="surface" colorPalette="primary">
        Surface
      </Badge>
      <Badge variant="subtle" colorPalette="primary">
        Subtle
      </Badge>
      <Badge variant="outline" colorPalette="primary">
        Outline
      </Badge>
    </HStack>
  ),
};

/**
 * Different badge sizes from small to 2xl
 */
export const Sizes: Story = {
  render: () => (
    <HStack gap="4" alignItems="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">XLarge</Badge>
      <Badge size="2xl">2XLarge</Badge>
    </HStack>
  ),
};

/**
 * Badge color palettes using Material Design 3 colors
 */
export const ColorPalettes: Story = {
  render: () => (
    <VStack gap="4" alignItems="flex-start">
      <HStack gap="4">
        <Badge variant="solid" colorPalette="primary">
          Primary
        </Badge>
        <Badge variant="surface" colorPalette="primary">
          Primary
        </Badge>
        <Badge variant="subtle" colorPalette="primary">
          Primary
        </Badge>
        <Badge variant="outline" colorPalette="primary">
          Primary
        </Badge>
      </HStack>
      <HStack gap="4">
        <Badge variant="solid" colorPalette="neutral">
          Neutral
        </Badge>
        <Badge variant="surface" colorPalette="neutral">
          Neutral
        </Badge>
        <Badge variant="subtle" colorPalette="neutral">
          Neutral
        </Badge>
        <Badge variant="outline" colorPalette="neutral">
          Neutral
        </Badge>
      </HStack>
      <HStack gap="4">
        <Badge variant="solid" colorPalette="error">
          Error
        </Badge>
        <Badge variant="surface" colorPalette="error">
          Error
        </Badge>
        <Badge variant="subtle" colorPalette="error">
          Error
        </Badge>
        <Badge variant="outline" colorPalette="error">
          Error
        </Badge>
      </HStack>
    </VStack>
  ),
};

/**
 * Badges with numeric content for counts and notifications
 */
export const WithNumbers: Story = {
  render: () => (
    <HStack gap="4">
      <Badge variant="solid" colorPalette="primary">
        42
      </Badge>
      <Badge variant="solid" colorPalette="error">
        99+
      </Badge>
      <Badge variant="subtle" colorPalette="neutral">
        12
      </Badge>
      <Badge variant="outline" colorPalette="primary">
        New
      </Badge>
    </HStack>
  ),
};

/**
 * Status badges for different states
 */
export const StatusBadges: Story = {
  render: () => (
    <VStack gap="4" alignItems="flex-start">
      <HStack gap="2">
        <Badge variant="solid" colorPalette="primary">
          Active
        </Badge>
        <Badge variant="surface" colorPalette="neutral">
          Pending
        </Badge>
        <Badge variant="subtle" colorPalette="error">
          Inactive
        </Badge>
      </HStack>
      <HStack gap="2">
        <Badge variant="outline" colorPalette="primary" size="sm">
          Published
        </Badge>
        <Badge variant="outline" colorPalette="neutral" size="sm">
          Draft
        </Badge>
        <Badge variant="outline" colorPalette="error" size="sm">
          Archived
        </Badge>
      </HStack>
    </VStack>
  ),
};
