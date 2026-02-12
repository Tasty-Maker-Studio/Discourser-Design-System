import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, InputGroup } from '../src';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/Form/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithStartElement: Story = {
  render: () => (
    <InputGroup startElement={<span>$</span>} style={{ width: '300px' }}>
      <Input placeholder="0.00" type="number" />
    </InputGroup>
  ),
};

export const WithEndElement: Story = {
  render: () => (
    <InputGroup endElement={<span>.com</span>} style={{ width: '300px' }}>
      <Input placeholder="mysite" />
    </InputGroup>
  ),
};

export const WithBothElements: Story = {
  render: () => (
    <InputGroup
      startElement={<span>https://</span>}
      endElement={<span>.com</span>}
      style={{ width: '400px' }}
    >
      <Input placeholder="example" />
    </InputGroup>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <InputGroup
      startElement={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      }
      style={{ width: '300px' }}
    >
      <Input placeholder="Search..." />
    </InputGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <InputGroup size="xs" startElement={<span>$</span>}>
        <Input size="xs" placeholder="Extra small" />
      </InputGroup>
      <InputGroup size="sm" startElement={<span>$</span>}>
        <Input size="sm" placeholder="Small" />
      </InputGroup>
      <InputGroup size="md" startElement={<span>$</span>}>
        <Input size="md" placeholder="Medium" />
      </InputGroup>
      <InputGroup size="lg" startElement={<span>$</span>}>
        <Input size="lg" placeholder="Large" />
      </InputGroup>
      <InputGroup size="xl" startElement={<span>$</span>}>
        <Input size="xl" placeholder="Extra large" />
      </InputGroup>
    </div>
  ),
};
