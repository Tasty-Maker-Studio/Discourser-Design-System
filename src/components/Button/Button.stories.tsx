import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side of the button',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side of the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    children: 'Filled Button',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const Elevated: Story = {
  args: {
    children: 'Elevated Button',
    variant: 'elevated',
  },
};

export const Tonal: Story = {
  args: {
    children: 'Tonal Button',
    variant: 'tonal',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Download',
    variant: 'filled',
    leftIcon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3v10m0 0l-4-4m4 4l4-4M3 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    variant: 'filled',
    rightIcon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 3l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
