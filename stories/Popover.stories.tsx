import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from '../src';
import { Button } from '../src/components/Button';

const meta: Meta = {
  title: 'Components/Overlay/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Header>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              This is a popover description with additional information.
            </Popover.Description>
          </Popover.Header>
          <Popover.CloseTrigger>×</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Header>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              This is a popover description with additional information.
            </Popover.Description>
          </Popover.Header>
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
        <Button>No Arrow</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>No Arrow Popover</Popover.Title>
            <Popover.Description>
              This popover doesn&apos;t have an arrow pointing to the trigger.
            </Popover.Description>
          </Popover.Header>
          <Popover.CloseTrigger>×</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <Popover.Root key={placement} positioning={{ placement }}>
          <Popover.Trigger asChild>
            <Button>{placement}</Button>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Arrow>
                <Popover.ArrowTip />
              </Popover.Arrow>
              <Popover.Header>
                <Popover.Title>{placement} placement</Popover.Title>
                <Popover.Description>
                  This popover appears on the {placement} side.
                </Popover.Description>
              </Popover.Header>
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
        <Button>Settings</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content style={{ minWidth: '300px' }}>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Header>
            <Popover.Title>User Settings</Popover.Title>
            <Popover.Description>
              Configure your user preferences
            </Popover.Description>
          </Popover.Header>
          <Popover.Body>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
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
          </Popover.Body>
          <Popover.Footer>
            <Popover.CloseTrigger asChild>
              <Button size="sm">Save</Button>
            </Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
};
