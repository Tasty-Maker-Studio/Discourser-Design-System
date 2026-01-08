import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button, IconButton } from '../src';

const meta: Meta = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button.Root>Hover me</Button.Root>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          This is a helpful tooltip
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button.Root>No arrow tooltip</Button.Root>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>This tooltip has no arrow</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
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
        <Tooltip.Root key={placement} positioning={{ placement }}>
          <Tooltip.Trigger asChild>
            <Button.Root>{placement}</Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Positioner>
            <Tooltip.Content>
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              Tooltip on {placement}
            </Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
      ))}
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <IconButton.Root>
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
        </IconButton.Root>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          Click for more information
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button.Root>Long tooltip</Button.Root>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content style={{ maxWidth: '250px' }}>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          This is a longer tooltip with more detailed information that wraps
          across multiple lines to provide comprehensive context to the user.
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};

export const InstantOpen: Story = {
  render: () => (
    <Tooltip.Root openDelay={0}>
      <Tooltip.Trigger asChild>
        <Button.Root>Instant tooltip</Button.Root>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          Opens immediately on hover
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ),
};
