import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../src';

const meta: Meta = {
  title: 'Components/Layout/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    value: 'item-1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.',
  },
  {
    value: 'item-2',
    title: 'What is TypeScript?',
    content:
      'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
  },
  {
    value: 'item-3',
    title: 'What is Panda CSS?',
    content:
      'Panda CSS is a zero-runtime CSS-in-JS framework with type-safe styling.',
  },
];

export const Default: Story = {
  render: () => (
    <Accordion.Root defaultValue={['item-1']} style={{ width: '400px' }}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.ItemTrigger>
            {item.title}
            <Accordion.ItemIndicator>▼</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};

export const Single: Story = {
  render: () => (
    <Accordion.Root collapsible style={{ width: '400px' }}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.ItemTrigger>
            {item.title}
            <Accordion.ItemIndicator>▼</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion.Root
      multiple
      defaultValue={['item-1', 'item-2']}
      style={{ width: '400px' }}
    >
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.ItemTrigger>
            {item.title}
            <Accordion.ItemIndicator>▼</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Accordion.Root style={{ width: '400px' }}>
      {items.map((item, index) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          disabled={index === 1}
        >
          <Accordion.ItemTrigger>
            {item.title} {index === 1 && '(disabled)'}
            <Accordion.ItemIndicator>▼</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};
