import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog, type DialogProps } from './Dialog';
import { Button } from '../Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'fullscreen'],
      description: 'Size of the dialog',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    description: {
      control: 'text',
      description: 'Dialog description',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    closeLabel: {
      control: 'text',
      description: 'Accessible label for close button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DialogTemplate = (args: DialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog {...args} open={open} onOpenChange={({ open }) => setOpen(open)} />
    </>
  );
};

export const Small: Story = {
  render: DialogTemplate,
  args: {
    size: 'sm',
    title: 'Small Dialog',
    description: 'This is a small dialog with minimal content.',
  },
};

export const Medium: Story = {
  render: DialogTemplate,
  args: {
    size: 'md',
    title: 'Medium Dialog',
    description:
      'This is a medium-sized dialog. It can contain more content and is the default size for most use cases.',
  },
};

export const Large: Story = {
  render: DialogTemplate,
  args: {
    size: 'lg',
    title: 'Large Dialog',
    description:
      'This is a large dialog that can accommodate more extensive content. Use this when you need to display forms, tables, or other complex content.',
  },
};

export const Fullscreen: Story = {
  render: DialogTemplate,
  args: {
    size: 'fullscreen',
    title: 'Fullscreen Dialog',
    description:
      'This dialog takes up the entire viewport. Use this for immersive experiences or when you need maximum space for content.',
  },
};

export const WithoutCloseButton: Story = {
  render: DialogTemplate,
  args: {
    size: 'md',
    title: 'No Close Button',
    description: 'This dialog has no close button. The user must interact with the content to dismiss it.',
    showCloseButton: false,
  },
};

export const CustomContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Custom Dialog</Button>
        <Dialog
          size="md"
          title="Delete Account"
          open={open}
          onOpenChange={({ open }) => setOpen(open)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ margin: 0 }}>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="filled" onClick={() => setOpen(false)}>
                Delete Account
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
        <Dialog
          size="md"
          title="Create New Project"
          open={open}
          onOpenChange={({ open }) => setOpen(open)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <label
                htmlFor="project-name"
                style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}
              >
                Project Name
              </label>
              <input
                id="project-name"
                type="text"
                placeholder="Enter project name"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div>
              <label
                htmlFor="project-description"
                style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}
              >
                Description
              </label>
              <textarea
                id="project-description"
                placeholder="Enter project description"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button type="button" variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="filled">
                Create Project
              </Button>
            </div>
          </form>
        </Dialog>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Long Content Dialog</Button>
        <Dialog
          size="md"
          title="Terms and Conditions"
          open={open}
          onOpenChange={({ open }) => setOpen(open)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="text" onClick={() => setOpen(false)}>
                Decline
              </Button>
              <Button variant="filled" onClick={() => setOpen(false)}>
                Accept
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button onClick={() => setOpenSm(true)}>Small</Button>
        <Button onClick={() => setOpenMd(true)}>Medium</Button>
        <Button onClick={() => setOpenLg(true)}>Large</Button>

        <Dialog
          size="sm"
          title="Small"
          description="Small dialog"
          open={openSm}
          onOpenChange={({ open }) => setOpenSm(open)}
        />
        <Dialog
          size="md"
          title="Medium"
          description="Medium dialog"
          open={openMd}
          onOpenChange={({ open }) => setOpenMd(open)}
        />
        <Dialog
          size="lg"
          title="Large"
          description="Large dialog"
          open={openLg}
          onOpenChange={({ open }) => setOpenLg(open)}
        />
      </div>
    );
  },
};
