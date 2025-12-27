import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

// Sample icons for stories
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
    <path
      d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" />
    <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="8" strokeWidth="2" />
    <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'tonal', 'outlined'],
      description: 'Visual style variant of the icon button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    variant: 'standard',
    'aria-label': 'Like',
    children: <HeartIcon />,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    'aria-label': 'Settings',
    children: <SettingsIcon />,
  },
};

export const Tonal: Story = {
  args: {
    variant: 'tonal',
    'aria-label': 'Add',
    children: <PlusIcon />,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    'aria-label': 'Search',
    children: <SearchIcon />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton size="sm" aria-label="Small">
        <HeartIcon />
      </IconButton>
      <IconButton size="md" aria-label="Medium">
        <HeartIcon />
      </IconButton>
      <IconButton size="lg" aria-label="Large">
        <HeartIcon />
      </IconButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <IconButton variant="standard" aria-label="Standard">
        <HeartIcon />
      </IconButton>
      <IconButton variant="filled" aria-label="Filled">
        <HeartIcon />
      </IconButton>
      <IconButton variant="tonal" aria-label="Tonal">
        <HeartIcon />
      </IconButton>
      <IconButton variant="outlined" aria-label="Outlined">
        <HeartIcon />
      </IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'filled',
    disabled: true,
    'aria-label': 'Disabled',
    children: <HeartIcon />,
  },
};

export const VariantShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>Standard</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <IconButton variant="standard" size="sm" aria-label="Like">
            <HeartIcon />
          </IconButton>
          <IconButton variant="standard" size="md" aria-label="Settings">
            <SettingsIcon />
          </IconButton>
          <IconButton variant="standard" size="lg" aria-label="Add">
            <PlusIcon />
          </IconButton>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>Filled</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <IconButton variant="filled" size="sm" aria-label="Like">
            <HeartIcon />
          </IconButton>
          <IconButton variant="filled" size="md" aria-label="Settings">
            <SettingsIcon />
          </IconButton>
          <IconButton variant="filled" size="lg" aria-label="Add">
            <PlusIcon />
          </IconButton>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>Tonal</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <IconButton variant="tonal" size="sm" aria-label="Like">
            <HeartIcon />
          </IconButton>
          <IconButton variant="tonal" size="md" aria-label="Settings">
            <SettingsIcon />
          </IconButton>
          <IconButton variant="tonal" size="lg" aria-label="Add">
            <PlusIcon />
          </IconButton>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>Outlined</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <IconButton variant="outlined" size="sm" aria-label="Like">
            <HeartIcon />
          </IconButton>
          <IconButton variant="outlined" size="md" aria-label="Settings">
            <SettingsIcon />
          </IconButton>
          <IconButton variant="outlined" size="lg" aria-label="Add">
            <PlusIcon />
          </IconButton>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const handleClick = () => alert('Icon button clicked!');
    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <IconButton variant="filled" aria-label="Like" onClick={handleClick}>
          <HeartIcon />
        </IconButton>
        <IconButton variant="tonal" aria-label="Settings" onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
        <IconButton variant="outlined" aria-label="Add" onClick={handleClick}>
          <PlusIcon />
        </IconButton>
      </div>
    );
  },
};
