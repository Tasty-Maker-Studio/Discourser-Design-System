import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from '@ark-ui/react';
import * as Drawer from '../src/components/Drawer';
import { Button } from '../src/components/Button';

// Simple close icon SVG
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const meta: Meta = {
  title: 'Components/Layout/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="solid" colorPalette="primary">Open Drawer</Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
              <button
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <Drawer.Description>
                This is a drawer description
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Drawer content goes here. This is a sample paragraph to
                demonstrate the drawer layout.
              </p>
            </Drawer.Body>
            <Drawer.Footer gap="3">
              <Button variant="outline" colorPalette="neutral">Cancel</Button>
              <Button variant="solid" colorPalette="primary">Confirm</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  ),
};

export const FromLeft: Story = {
  render: () => (
    <Drawer.Root placement="start">
      <Drawer.Trigger asChild>
        <Button variant="outline" colorPalette="neutral">Open Left Drawer</Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
              <button
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Drawer.Title>Left Drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer opens from the left side.</p>
            </Drawer.Body>
            <Drawer.Footer gap="3">
              <Button variant="outline" colorPalette="neutral">Cancel</Button>
              <Button variant="solid" colorPalette="primary">Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  ),
};

export const FromTop: Story = {
  render: () => (
    <Drawer.Root placement="top">
      <Drawer.Trigger asChild>
        <Button variant="outline" colorPalette="neutral">Open Top Drawer</Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
              <button
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Drawer.Title>Top Drawer</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer opens from the top.</p>
            </Drawer.Body>
            <Drawer.Footer gap="3">
              <Button variant="outline" colorPalette="neutral">Cancel</Button>
              <Button variant="solid" colorPalette="primary">Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  ),
};

export const WithoutBackdrop: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" colorPalette="neutral">Open Without Backdrop</Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
              <button
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Drawer.Title>No Backdrop</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer has no backdrop overlay.</p>
            </Drawer.Body>
            <Drawer.Footer gap="3">
              <Button variant="outline" colorPalette="neutral">Cancel</Button>
              <Button variant="solid" colorPalette="primary">Save</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  ),
};
