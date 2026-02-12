import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../src';

const meta: Meta = {
  title: 'Components/Form/Textarea',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Textarea placeholder="Enter your comment..." />,
};

export const WithDefaultValue: Story = {
  render: () => (
    <Textarea
      defaultValue="I am a software developer passionate about creating great user experiences."
      placeholder="Tell us about yourself..."
    />
  ),
};

export const Disabled: Story = {
  render: () => <Textarea disabled placeholder="This field is disabled" />,
};

export const WithMaxLength: Story = {
  render: () => <Textarea placeholder="What's happening?" maxLength={280} />,
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '400px',
      }}
    >
      <Textarea size="xs" placeholder="Extra small textarea" />
      <Textarea size="sm" placeholder="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea (default)" />
      <Textarea size="lg" placeholder="Large textarea" />
      <Textarea size="xl" placeholder="Extra large textarea" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '400px',
      }}
    >
      <Textarea variant="outline" placeholder="Outline variant" />
      <Textarea variant="surface" placeholder="Surface variant" />
      <Textarea variant="subtle" placeholder="Subtle variant" />
      <Textarea variant="flushed" placeholder="Flushed variant" />
    </div>
  ),
};
