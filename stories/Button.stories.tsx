import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../src/components/Button';
import { HStack, VStack } from '../styled-system/jsx';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'elevated', 'surface', 'subtle', 'outline', 'plain'],
      description: 'Button variant style',
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Button size',
    },
    colorPalette: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'neutral', 'error'],
      description: 'Color palette (M3 colors)',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with M3 primary color
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    colorPalette: 'primary',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <HStack gap="3">
        <Button variant="solid" colorPalette="primary">Solid</Button>
        <Button variant="elevated" colorPalette="primary">Elevated</Button>
        <Button variant="surface" colorPalette="primary">Surface</Button>
        <Button variant="subtle" colorPalette="primary">Subtle</Button>
        <Button variant="outline" colorPalette="primary">Outline</Button>
        <Button variant="plain" colorPalette="primary">Plain</Button>
      </HStack>
    </VStack>
  ),
};

// M3 Color Palettes
export const ColorPalettes: Story = {
  render: () => (
    <VStack gap="6" alignItems="start">
      <VStack gap="2" alignItems="start">
        <h4>Primary (M3 Green)</h4>
        <HStack gap="3">
          <Button variant="solid" colorPalette="primary">Solid</Button>
          <Button variant="elevated" colorPalette="primary">Elevated</Button>
          <Button variant="surface" colorPalette="primary">Surface</Button>
          <Button variant="subtle" colorPalette="primary">Subtle</Button>
          <Button variant="outline" colorPalette="primary">Outline</Button>
        </HStack>
      </VStack>

      <VStack gap="2" alignItems="start">
        <h4>Neutral (Gray)</h4>
        <HStack gap="3">
          <Button variant="solid" colorPalette="neutral">Solid</Button>
          <Button variant="elevated" colorPalette="neutral">Elevated</Button>
          <Button variant="surface" colorPalette="neutral">Surface</Button>
          <Button variant="subtle" colorPalette="neutral">Subtle</Button>
          <Button variant="outline" colorPalette="neutral">Outline</Button>
        </HStack>
      </VStack>

      <VStack gap="2" alignItems="start">
        <h4>Secondary (Olive-Green)</h4>
        <HStack gap="3">
          <Button variant="solid" colorPalette="secondary">Solid</Button>
          <Button variant="elevated" colorPalette="secondary">Elevated</Button>
          <Button variant="surface" colorPalette="secondary">Surface</Button>
          <Button variant="subtle" colorPalette="secondary">Subtle</Button>
          <Button variant="outline" colorPalette="secondary">Outline</Button>
        </HStack>
      </VStack>

      <VStack gap="2" alignItems="start">
        <h4>Tertiary (Teal)</h4>
        <HStack gap="3">
          <Button variant="solid" colorPalette="tertiary">Solid</Button>
          <Button variant="elevated" colorPalette="tertiary">Elevated</Button>
          <Button variant="surface" colorPalette="tertiary">Surface</Button>
          <Button variant="subtle" colorPalette="tertiary">Subtle</Button>
          <Button variant="outline" colorPalette="tertiary">Outline</Button>
        </HStack>
      </VStack>

      <VStack gap="2" alignItems="start">
        <h4>Error (Red)</h4>
        <HStack gap="3">
          <Button variant="solid" colorPalette="error">Solid</Button>
          <Button variant="elevated" colorPalette="error">Elevated</Button>
          <Button variant="surface" colorPalette="error">Surface</Button>
          <Button variant="subtle" colorPalette="error">Subtle</Button>
          <Button variant="outline" colorPalette="error">Outline</Button>
        </HStack>
      </VStack>
    </VStack>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <HStack gap="3" alignItems="center">
      <Button size="2xs" colorPalette="primary">2XS</Button>
      <Button size="xs" colorPalette="primary">XS</Button>
      <Button size="sm" colorPalette="primary">SM</Button>
      <Button size="md" colorPalette="primary">MD</Button>
      <Button size="lg" colorPalette="primary">LG</Button>
      <Button size="xl" colorPalette="primary">XL</Button>
      <Button size="2xl" colorPalette="primary">2XL</Button>
    </HStack>
  ),
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <HStack gap="3">
      <Button loading colorPalette="primary">Loading</Button>
      <Button loading loadingText="Please wait..." colorPalette="primary">Button</Button>
      <Button loading spinnerPlacement="end" loadingText="Processing" colorPalette="primary">
        Button
      </Button>
    </HStack>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <HStack gap="3">
      <Button disabled variant="solid" colorPalette="primary">Solid</Button>
      <Button disabled variant="surface" colorPalette="primary">Surface</Button>
      <Button disabled variant="subtle" colorPalette="primary">Subtle</Button>
      <Button disabled variant="outline" colorPalette="primary">Outline</Button>
    </HStack>
  ),
};