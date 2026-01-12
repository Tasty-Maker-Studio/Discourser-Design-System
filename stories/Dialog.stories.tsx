import type { Meta, StoryObj } from '@storybook/react';
import * as Dialog from '../src/components/Dialog';
import { Button } from '../src/components/Button';
import { VStack } from '../styled-system/jsx';

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components / Dialog',
  component: Dialog.Root,
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
type Story = StoryObj<typeof Dialog.Root>;

// Simple close icon SVG
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="solid" colorPalette="primary">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>
              This is a description that provides additional context about the dialog.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <p>
              This is the dialog content. You can place any content here, including forms,
              text, images, or other components.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline" colorPalette="neutral">Cancel</Button>
            </Dialog.CloseTrigger>
            <Dialog.CloseTrigger asChild>
              <Button variant="solid" colorPalette="primary">Confirm</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
          <Dialog.CloseTrigger
            asChild
            position="absolute"
            top="2"
            right="2"
          >
            <Button variant="ghost" colorPalette="neutral" size="sm" aria-label="Close">
              <XIcon />
            </Button>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Dialog.Root size="sm">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorPalette="neutral">Small Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Small Dialog (max-width: sm)</Dialog.Title>
              <Dialog.Description>
                This dialog demonstrates the small size variant with a maximum width constraint.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p>This is a small dialog with limited width. The content will wrap within the constrained space to demonstrate the size difference between variants.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline" colorPalette="neutral">Close</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      <Dialog.Root size="md">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorPalette="neutral">Medium Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Medium Dialog (max-width: md)</Dialog.Title>
              <Dialog.Description>
                This dialog demonstrates the medium size variant with a moderate maximum width constraint that provides more space than small.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p>This is a medium dialog with moderate width constraints. The content has more horizontal space to work with compared to the small variant, allowing for more comfortable reading and form layouts.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline" colorPalette="neutral">Close</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      <Dialog.Root size="lg">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorPalette="neutral">Large Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Large Dialog (max-width: lg)</Dialog.Title>
              <Dialog.Description>
                This dialog demonstrates the large size variant with an expansive maximum width constraint that provides the most horizontal space.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p>This is a large dialog with generous width constraints. The content has significantly more horizontal space compared to both small and medium variants, making it ideal for complex forms, detailed information, or multi-column layouts that require ample room to breathe.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline" colorPalette="neutral">Close</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </VStack>
  ),
};

export const Placement: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <Dialog.Root placement="top">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorPalette="neutral">Top Placement</Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Top Placement</Dialog.Title>
              <Dialog.Description>
                This dialog appears at the top of the screen
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p>Content aligned to top</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline" colorPalette="neutral">Close</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      <Dialog.Root placement="center">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorPalette="neutral">Center Placement (Default)</Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Center Placement</Dialog.Title>
              <Dialog.Description>
                This dialog appears in the center (default)
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p>Content centered vertically and horizontally</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline" colorPalette="neutral">Close</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      <Dialog.Root placement="bottom">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorPalette="neutral">Bottom Placement</Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Bottom Placement</Dialog.Title>
              <Dialog.Description>
                This dialog appears at the bottom of the screen
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <p>Content aligned to bottom</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline" colorPalette="neutral">Close</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </VStack>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="solid" colorPalette="primary">Open Dialog with Long Content</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content scrollBehavior="inside">
          <Dialog.Header>
            <Dialog.Title>Terms and Conditions</Dialog.Title>
            <Dialog.Description>
              Please read and accept the terms and conditions
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <VStack gap="4" alignItems="start">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
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
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                aliquam quaerat voluptatem.
              </p>
              <p>
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
                nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
                ea voluptate velit esse quam nihil molestiae consequatur.
              </p>
            </VStack>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline" colorPalette="neutral">Decline</Button>
            </Dialog.CloseTrigger>
            <Dialog.CloseTrigger asChild>
              <Button variant="solid" colorPalette="primary">Accept</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
};
