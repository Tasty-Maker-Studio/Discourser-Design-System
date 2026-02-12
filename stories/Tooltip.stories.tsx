import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../src';
import { Button } from '../src/components/Button';
import { IconButton } from '../src/components/IconButton';

const meta: Meta<typeof Tooltip.Tooltip> = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip.Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip.Tooltip content="This is a helpful tooltip" showArrow>
      <Button>Hover me</Button>
    </Tooltip.Tooltip>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <Tooltip.Tooltip content="This tooltip has no arrow">
      <Button>No arrow tooltip</Button>
    </Tooltip.Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem',
      }}
    >
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <Tooltip.Tooltip key={placement} positioning={{ placement }} content={`Tooltip on ${placement}`} showArrow>
          <Button>{placement}</Button>
        </Tooltip.Tooltip>
      ))}
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <Tooltip.Tooltip content="Click for more information" showArrow>
      <IconButton>
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </IconButton>
    </Tooltip.Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip.Tooltip
      content="This is a longer tooltip with more detailed information that wraps across multiple lines to provide comprehensive context to the user."
      showArrow
      contentProps={{ style: { maxWidth: '250px' } }}
    >
      <Button>Long tooltip</Button>
    </Tooltip.Tooltip>
  ),
};

export const InstantOpen: Story = {
  render: () => (
    <Tooltip.Tooltip openDelay={0} content="Opens immediately on hover" showArrow>
      <Button>Instant tooltip</Button>
    </Tooltip.Tooltip>
  ),
};
