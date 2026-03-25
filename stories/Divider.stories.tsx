import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from '../src/components/divider';
import { css } from '../styled-system/css';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Optional center label text',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (no label)',
  args: {},
  decorators: [
    (Story) => (
      <div className={css({ width: '400px' })}>
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  name: 'With Label ("OR")',
  args: {
    label: 'OR',
  },
  decorators: [
    (Story) => (
      <div className={css({ width: '400px' })}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  name: 'Vertical',
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className={css({ height: '120px', display: 'flex' })}>
        <Story />
      </div>
    ),
  ],
};

export const VerticalWithLabel: Story = {
  name: 'Vertical with Label',
  args: {
    orientation: 'vertical',
    label: 'OR',
  },
  decorators: [
    (Story) => (
      <div className={css({ height: '160px', display: 'flex' })}>
        <Story />
      </div>
    ),
  ],
};
