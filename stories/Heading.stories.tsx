import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../src';

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading size="xs">Extra Small Heading</Heading>
      <Heading size="sm">Small Heading</Heading>
      <Heading size="md">Medium Heading</Heading>
      <Heading size="lg">Large Heading</Heading>
      <Heading size="xl">Extra Large Heading (Default)</Heading>
      <Heading size="2xl">2XL Heading</Heading>
      <Heading size="3xl">3XL Heading</Heading>
      <Heading size="4xl">4XL Heading</Heading>
      <Heading size="5xl">5XL Heading</Heading>
      <Heading size="6xl">6XL Heading</Heading>
      <Heading size="7xl">7XL Heading</Heading>
    </div>
  ),
};

export const SemanticLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading as="h1" size="5xl">
        H1 Heading
      </Heading>
      <Heading as="h2" size="4xl">
        H2 Heading
      </Heading>
      <Heading as="h3" size="3xl">
        H3 Heading
      </Heading>
      <Heading as="h4" size="2xl">
        H4 Heading
      </Heading>
      <Heading as="h5" size="xl">
        H5 Heading
      </Heading>
      <Heading as="h6" size="lg">
        H6 Heading
      </Heading>
    </div>
  ),
};

export const WithCustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading size="3xl" style={{ color: 'var(--colors-primary)' }}>
        Primary Color Heading
      </Heading>
      <Heading size="3xl" style={{ color: 'var(--colors-secondary)' }}>
        Secondary Color Heading
      </Heading>
      <Heading size="3xl" style={{ color: 'var(--colors-tertiary)' }}>
        Tertiary Color Heading
      </Heading>
    </div>
  ),
};
