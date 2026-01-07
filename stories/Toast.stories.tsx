import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toaster } from '../src/components/Toast';
import { Button } from '../src/components/Button';
import { VStack, HStack } from '../styled-system/jsx';

const meta: Meta<typeof Toaster> = {
  title: 'Components / Toast',
  component: Toaster,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <>
      <Button
        colorPalette="primary"
        onClick={() =>
          toaster.create({
            title: 'Welcome!',
            description: 'This is a default toast notification.',
            type: 'info',
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  ),
};

export const Types: Story = {
  render: () => (
    <>
      <VStack gap="4" alignItems="start">
        <Button
          colorPalette="primary"
          onClick={() =>
            toaster.success({
              title: 'Success!',
              description: 'Your changes have been saved successfully.',
            })
          }
        >
          Success Toast
        </Button>

        <Button
          colorPalette="error"
          onClick={() =>
            toaster.error({
              title: 'Error',
              description: 'Something went wrong. Please try again.',
            })
          }
        >
          Error Toast
        </Button>

        <Button
          colorPalette="neutral"
          onClick={() =>
            toaster.warning({
              title: 'Warning',
              description: 'This action cannot be undone.',
            })
          }
        >
          Warning Toast
        </Button>

        <Button
          colorPalette="primary"
          onClick={() =>
            toaster.loading({
              title: 'Loading...',
              description: 'Please wait while we process your request.',
            })
          }
        >
          Loading Toast
        </Button>
      </VStack>
      <Toaster />
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <Button
        colorPalette="primary"
        onClick={() =>
          toaster.create({
            title: 'Update Available',
            description: 'A new version of the app is available.',
            type: 'info',
            action: {
              label: 'Update Now',
              onClick: () => console.log('Update clicked'),
            },
          })
        }
      >
        Show Toast with Action
      </Button>
      <Toaster />
    </>
  ),
};

export const Closable: Story = {
  render: () => (
    <>
      <Button
        colorPalette="primary"
        onClick={() =>
          toaster.create({
            title: 'Closable Toast',
            description: 'Click the X button to dismiss this notification.',
            type: 'info',
            closable: true,
          })
        }
      >
        Show Closable Toast
      </Button>
      <Toaster />
    </>
  ),
};

export const Duration: Story = {
  render: () => (
    <>
      <VStack gap="4" alignItems="start">
        <Button
          colorPalette="primary"
          onClick={() =>
            toaster.create({
              title: 'Quick Toast',
              description: 'This will disappear in 2 seconds.',
              type: 'info',
              duration: 2000,
            })
          }
        >
          2 Second Toast
        </Button>

        <Button
          colorPalette="primary"
          onClick={() =>
            toaster.create({
              title: 'Long Toast',
              description: 'This will stay for 10 seconds.',
              type: 'info',
              duration: 10000,
            })
          }
        >
          10 Second Toast
        </Button>

        <Button
          colorPalette="primary"
          onClick={() =>
            toaster.create({
              title: 'Persistent Toast',
              description: 'This will stay until manually closed.',
              type: 'info',
              duration: Infinity,
              closable: true,
            })
          }
        >
          Persistent Toast
        </Button>
      </VStack>
      <Toaster />
    </>
  ),
};

export const Multiple: Story = {
  render: () => (
    <>
      <HStack gap="4">
        <Button
          colorPalette="primary"
          onClick={() => {
            toaster.success({ title: 'Toast 1', description: 'First notification' });
            setTimeout(() => {
              toaster.success({ title: 'Toast 2', description: 'Second notification' });
            }, 500);
            setTimeout(() => {
              toaster.success({ title: 'Toast 3', description: 'Third notification' });
            }, 1000);
          }}
        >
          Show Multiple Toasts
        </Button>

        <Button
          variant="outline"
          colorPalette="neutral"
          onClick={() => toaster.dismiss()}
        >
          Dismiss All
        </Button>
      </HStack>
      <Toaster />
    </>
  ),
};

export const Promise: Story = {
  render: () => {
    const simulateAsyncOperation = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve('Success!') : reject('Failed!');
        }, 2000);
      });
    };

    return (
      <>
        <Button
          colorPalette="primary"
          onClick={() =>
            toaster.promise(simulateAsyncOperation(), {
              loading: {
                title: 'Processing...',
                description: 'Please wait',
              },
              success: {
                title: 'Complete!',
                description: 'Operation completed successfully',
              },
              error: {
                title: 'Failed',
                description: 'Operation failed',
              },
            })
          }
        >
          Trigger Async Operation
        </Button>
        <Toaster />
      </>
    );
  },
};
