import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../src';

const meta: Meta = {
  title: 'Components/Form/Textarea',
  component: Textarea.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Textarea.Root>
      <Textarea.Label>Comment</Textarea.Label>
      <Textarea.Textarea placeholder="Enter your comment..." />
    </Textarea.Root>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Textarea.Root>
      <Textarea.Label>Bio</Textarea.Label>
      <Textarea.Textarea
        defaultValue="I am a software developer passionate about creating great user experiences."
        placeholder="Tell us about yourself..."
      />
    </Textarea.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Textarea.Root disabled>
      <Textarea.Label>Comment (disabled)</Textarea.Label>
      <Textarea.Textarea placeholder="This field is disabled" />
    </Textarea.Root>
  ),
};

export const WithMaxLength: Story = {
  render: () => (
    <Textarea.Root>
      <Textarea.Label>Tweet</Textarea.Label>
      <Textarea.Textarea placeholder="What's happening?" maxLength={280} />
    </Textarea.Root>
  ),
};
