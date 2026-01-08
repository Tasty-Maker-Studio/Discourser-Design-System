import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer, Button } from '../src';

const meta: Meta = {
  title: 'Components/Layout/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button.Root onClick={() => setOpen(true)}>Open Drawer</Button.Root>
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
                <Drawer.Description>
                  This is a drawer description
                </Drawer.Description>
                <Drawer.CloseTrigger>×</Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <p>
                  Drawer content goes here. This is a sample paragraph to
                  demonstrate the drawer layout.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button.Root onClick={() => setOpen(false)}>Close</Button.Root>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </>
    );
  },
};

export const FromLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button.Root onClick={() => setOpen(true)}>
          Open Left Drawer
        </Button.Root>
        <Drawer.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          placement="left"
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Left Drawer</Drawer.Title>
                <Drawer.CloseTrigger>×</Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <p>This drawer opens from the left side.</p>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </>
    );
  },
};

export const FromTop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button.Root onClick={() => setOpen(true)}>Open Top Drawer</Button.Root>
        <Drawer.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          placement="top"
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Top Drawer</Drawer.Title>
                <Drawer.CloseTrigger>×</Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <p>This drawer opens from the top.</p>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </>
    );
  },
};

export const WithoutBackdrop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button.Root onClick={() => setOpen(true)}>
          Open Without Backdrop
        </Button.Root>
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>No Backdrop</Drawer.Title>
                <Drawer.CloseTrigger>×</Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <p>This drawer has no backdrop overlay.</p>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </>
    );
  },
};
