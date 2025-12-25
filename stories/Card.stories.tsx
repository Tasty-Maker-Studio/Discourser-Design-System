import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/components/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a card component with some content inside.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This is a card component with a title and some content inside.',
  },
};

export const RichContent: Story = {
  args: {
    title: 'User Profile',
    children: (
      <div>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Name:</strong> John Doe
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>Role:</strong> Developer
        </p>
      </div>
    ),
  },
};
