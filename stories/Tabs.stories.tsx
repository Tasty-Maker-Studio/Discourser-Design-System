import type { Meta, StoryObj } from '@storybook/react';
import * as Tabs from '../src/components/Tabs';
import { Box, VStack } from '../styled-system/jsx';

const meta: Meta<typeof Tabs.Root> = {
  title: 'Components / Tabs',
  component: Tabs.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Default: Story = {
  render: () => (
    <Tabs.Root colorPalette="primary" defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="details">Details</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="overview">
        <Box p="4">
          <h3>Overview</h3>
          <p>This is the overview tab content. Here you can see a summary of all information.</p>
        </Box>
      </Tabs.Content>
      <Tabs.Content value="details">
        <Box p="4">
          <h3>Details</h3>
          <p>This tab shows detailed information about the selected item.</p>
        </Box>
      </Tabs.Content>
      <Tabs.Content value="settings">
        <Box p="4">
          <h3>Settings</h3>
          <p>Configure your preferences and settings here.</p>
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack gap="8" alignItems="start">
      <Box width="100%">
        <h4>Line Variant (Default)</h4>
        <Tabs.Root colorPalette="primary" variant="line" defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="tab1"><Box p="4">Content 1</Box></Tabs.Content>
          <Tabs.Content value="tab2"><Box p="4">Content 2</Box></Tabs.Content>
          <Tabs.Content value="tab3"><Box p="4">Content 3</Box></Tabs.Content>
        </Tabs.Root>
      </Box>

      <Box width="100%">
        <h4>Enclosed Variant</h4>
        <Tabs.Root colorPalette="primary" variant="enclosed" defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1"><Box p="4">Content 1</Box></Tabs.Content>
          <Tabs.Content value="tab2"><Box p="4">Content 2</Box></Tabs.Content>
          <Tabs.Content value="tab3"><Box p="4">Content 3</Box></Tabs.Content>
        </Tabs.Root>
      </Box>

      <Box width="100%">
        <h4>Outline Variant</h4>
        <Tabs.Root colorPalette="primary" variant="outline" defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1"><Box p="4">Content 1</Box></Tabs.Content>
          <Tabs.Content value="tab2"><Box p="4">Content 2</Box></Tabs.Content>
          <Tabs.Content value="tab3"><Box p="4">Content 3</Box></Tabs.Content>
        </Tabs.Root>
      </Box>
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="8" alignItems="start">
      <Box width="100%">
        <h4>Small</h4>
        <Tabs.Root colorPalette="primary" size="sm" defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="tab1"><Box p="3">Small content</Box></Tabs.Content>
          <Tabs.Content value="tab2"><Box p="3">Small content</Box></Tabs.Content>
          <Tabs.Content value="tab3"><Box p="3">Small content</Box></Tabs.Content>
        </Tabs.Root>
      </Box>

      <Box width="100%">
        <h4>Medium (Default)</h4>
        <Tabs.Root colorPalette="primary" size="md" defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="tab1"><Box p="4">Medium content</Box></Tabs.Content>
          <Tabs.Content value="tab2"><Box p="4">Medium content</Box></Tabs.Content>
          <Tabs.Content value="tab3"><Box p="4">Medium content</Box></Tabs.Content>
        </Tabs.Root>
      </Box>

      <Box width="100%">
        <h4>Large</h4>
        <Tabs.Root colorPalette="primary" size="lg" defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="tab1"><Box p="5">Large content</Box></Tabs.Content>
          <Tabs.Content value="tab2"><Box p="5">Large content</Box></Tabs.Content>
          <Tabs.Content value="tab3"><Box p="5">Large content</Box></Tabs.Content>
        </Tabs.Root>
      </Box>
    </VStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs.Root colorPalette="primary" defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Active Tab</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>Disabled Tab</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Another Active</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab1">
        <Box p="4">Active tab content is accessible</Box>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <Box p="4">This content cannot be accessed</Box>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <Box p="4">Another active tab content</Box>
      </Tabs.Content>
    </Tabs.Root>
  ),
};
