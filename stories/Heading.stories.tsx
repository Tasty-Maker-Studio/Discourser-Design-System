import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from '../src';

const meta: Meta<typeof Header> = {
  title: 'Components/Typography/Header',
  component: Header,
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
      <Header size="xs">Extra Small Heading</Header>
      <Header size="sm">Small Heading</Header>
      <Header size="md">Medium Heading</Header>
      <Header size="lg">Large Heading</Header>
      <Header size="xl">Extra Large Heading (Default)</Header>
      <Header size="2xl">2XL Heading</Header>
      <Header size="3xl">3XL Heading</Header>
      <Header size="4xl">4XL Heading</Header>
      <Header size="5xl">5XL Heading</Header>
      <Header size="6xl">6XL Heading</Header>
      <Header size="7xl">7XL Heading</Header>
    </div>
  ),
};

export const SemanticLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Header as="h1" size="5xl">
        H1 Heading
      </Header>
      <Header as="h2" size="4xl">
        H2 Heading
      </Header>
      <Header as="h3" size="3xl">
        H3 Heading
      </Header>
      <Header as="h4" size="2xl">
        H4 Heading
      </Header>
      <Header as="h5" size="xl">
        H5 Heading
      </Header>
      <Header as="h6" size="lg">
        H6 Heading
      </Header>
    </div>
  ),
};

export const WithCustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Header size="3xl" style={{ color: 'var(--colors-primary)' }}>
        Primary Color Heading
      </Header>
      <Header size="3xl" style={{ color: 'var(--colors-secondary)' }}>
        Secondary Color Heading
      </Header>
      <Header size="3xl" style={{ color: 'var(--colors-tertiary)' }}>
        Tertiary Color Heading
      </Header>
    </div>
  ),
};
