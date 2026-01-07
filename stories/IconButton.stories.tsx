import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../src/components/IconButton';
import { HStack, VStack } from '../styled-system/jsx';

const meta: Meta<typeof IconButton> = {
  title: 'Components / IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Simple SVG icons
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

export const Default: Story = {
  args: {
    'aria-label': 'Search',
    children: <SearchIcon />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <div>
        <h4 style={{ marginBottom: '8px' }}>Solid</h4>
        <HStack gap="3">
          <IconButton variant="solid" colorPalette="primary" aria-label="Add">
            <PlusIcon />
          </IconButton>
          <IconButton variant="solid" colorPalette="neutral" aria-label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton variant="solid" colorPalette="error" aria-label="Delete">
            <TrashIcon />
          </IconButton>
        </HStack>
      </div>

      <div>
        <h4 style={{ marginBottom: '8px' }}>Outline</h4>
        <HStack gap="3">
          <IconButton variant="outline" colorPalette="primary" aria-label="Add">
            <PlusIcon />
          </IconButton>
          <IconButton variant="outline" colorPalette="neutral" aria-label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton variant="outline" colorPalette="error" aria-label="Delete">
            <TrashIcon />
          </IconButton>
        </HStack>
      </div>

      <div>
        <h4 style={{ marginBottom: '8px' }}>Subtle</h4>
        <HStack gap="3">
          <IconButton variant="subtle" colorPalette="primary" aria-label="Add">
            <PlusIcon />
          </IconButton>
          <IconButton variant="subtle" colorPalette="neutral" aria-label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton variant="subtle" colorPalette="error" aria-label="Delete">
            <TrashIcon />
          </IconButton>
        </HStack>
      </div>
    </VStack>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <HStack gap="3" alignItems="center">
      <IconButton size="xs" aria-label="Heart">
        <HeartIcon />
      </IconButton>
      <IconButton size="sm" aria-label="Heart">
        <HeartIcon />
      </IconButton>
      <IconButton size="md" aria-label="Heart">
        <HeartIcon />
      </IconButton>
      <IconButton size="lg" aria-label="Heart">
        <HeartIcon />
      </IconButton>
      <IconButton size="xl" aria-label="Heart">
        <HeartIcon />
      </IconButton>
    </HStack>
  ),
};
