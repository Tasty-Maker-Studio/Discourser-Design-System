import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Visual style variant of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorText: {
      control: 'text',
      description: 'Error message (sets error state)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    variant: 'outlined',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    variant: 'outlined',
    label: 'Email',
    placeholder: 'email@example.com',
    errorText: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Input variant="outlined" label="Outlined" placeholder="Outlined variant" />
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <Input
        variant="outlined"
        label="Full Name"
        placeholder="John Doe"
        required
      />
      <Input
        variant="outlined"
        label="Email"
        type="email"
        placeholder="john@example.com"
        helperText="We'll never share your email"
        required
      />
      <Input
        variant="outlined"
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
      />
      <Input
        variant="outlined"
        label="Message"
        placeholder="Your message here..."
      />
      <button
        type="submit"
        style={{
          padding: '12px 24px',
          background: '#4C662B',
          color: 'white',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  ),
};

export const DifferentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="123" />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
    </div>
  ),
};
