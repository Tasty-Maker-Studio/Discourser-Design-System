import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Button } from '../src';

const meta: Meta = {
  title: 'Components/Overlay/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button.Root>Open Popover</Button.Root>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Title>Popover Title</Popover.Title>
          <Popover.Description>
            This is a popover description with additional information.
          </Popover.Description>
          <Popover.CloseTrigger>×</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button.Root>No Arrow</Button.Root>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>No Arrow Popover</Popover.Title>
          <Popover.Description>
            This popover doesn&apos;t have an arrow pointing to the trigger.
          </Popover.Description>
          <Popover.CloseTrigger>×</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <Popover.Root key={placement} positioning={{ placement }}>
          <Popover.Trigger asChild>
            <Button.Root>{placement}</Button.Root>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Arrow>
                <Popover.ArrowTip />
              </Popover.Arrow>
              <Popover.Title>{placement} placement</Popover.Title>
              <Popover.Description>
                This popover appears on the {placement} side.
              </Popover.Description>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button.Root>Settings</Button.Root>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content style={{ minWidth: '300px' }}>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Title>User Settings</Popover.Title>
          <Popover.Description>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginTop: '1rem',
              }}
            >
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <input type="checkbox" defaultChecked />
                Enable notifications
              </label>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <input type="checkbox" />
                Dark mode
              </label>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <input type="checkbox" defaultChecked />
                Auto-save
              </label>
            </div>
          </Popover.Description>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1rem',
              justifyContent: 'flex-end',
            }}
          >
            <Popover.CloseTrigger asChild>
              <Button.Root size="sm">Save</Button.Root>
            </Popover.CloseTrigger>
          </div>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};
