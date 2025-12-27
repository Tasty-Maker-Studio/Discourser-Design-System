import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'filled', 'outlined'],
      description: 'Visual style variant of the card',
    },
    interactive: {
      control: 'boolean',
      description: 'Makes the card clickable with hover/active states',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <>
    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.5rem' }}>
      Card Title
    </h3>
    <p style={{ color: '#5E5F59', lineHeight: '1.5' }}>
      This is a card component with Material Design 3 styling. Cards contain content and
      actions about a single subject.
    </p>
  </>
);

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: <SampleContent />,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: <SampleContent />,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: <SampleContent />,
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards have a pointer cursor and respond to hover/active states.',
      },
    },
  },
};

export const InteractiveFilled: Story = {
  args: {
    variant: 'filled',
    interactive: true,
    children: <SampleContent />,
  },
};

export const InteractiveOutlined: Story = {
  args: {
    variant: 'outlined',
    interactive: true,
    children: <SampleContent />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', maxWidth: '900px' }}>
      <Card variant="elevated" style={{ width: '280px', padding: '24px' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
          Elevated
        </h4>
        <p style={{ color: '#5E5F59', fontSize: '0.875rem' }}>
          Uses shadow for depth
        </p>
      </Card>
      <Card variant="filled" style={{ width: '280px', padding: '24px' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
          Filled
        </h4>
        <p style={{ color: '#5E5F59', fontSize: '0.875rem' }}>
          Uses surface color
        </p>
      </Card>
      <Card variant="outlined" style={{ width: '280px', padding: '24px' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
          Outlined
        </h4>
        <p style={{ color: '#5E5F59', fontSize: '0.875rem' }}>
          Uses border for definition
        </p>
      </Card>
    </div>
  ),
};

export const WithCustomContent: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #64A104 0%, #97D945 100%)',
            }}
          />
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '500', margin: 0 }}>
              TastyMakers
            </h4>
            <p style={{ color: '#5E5F59', fontSize: '0.875rem', margin: 0 }}>
              Design System
            </p>
          </div>
        </div>
        <p style={{ color: '#5E5F59', lineHeight: '1.5', margin: 0 }}>
          An aesthetic-agnostic design system built with Panda CSS and Ark UI. Swap design
          languages by changing a single import.
        </p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
          Click Me
        </h4>
        <p style={{ color: '#5E5F59', fontSize: '0.875rem' }}>
          This card is interactive and clickable
        </p>
      </div>
    ),
  },
};
