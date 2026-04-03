import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../src/components/Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Utility/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Icon>;

const CircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <Icon w="6" h="6" color="primary.9">
      <CircleIcon />
    </Icon>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {(['4', '6', '8', '10', '12'] as const).map((size) => (
        <Icon key={size} w={size} h={size} color="primary.9">
          <CircleIcon />
        </Icon>
      ))}
    </div>
  ),
};
