import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuickStartPage } from '../src/components/QuickStartPage';

const meta: Meta<typeof QuickStartPage> = {
  title: 'Pages/Quick Start',
  component: QuickStartPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof QuickStartPage>;

/**
 * Default view matching the Figma design — beginner user, UX Interview scenario.
 */
export const Default: Story = {
  args: {
    userName: 'Devang',
    firstScenario: {
      title: 'UX Interview Practice',
      level: 'beginner',
      duration: '~15-20 minutes',
    },
    activeHref: '/dashboard/quick-start',
  },
};

/**
 * Intermediate user with a different scenario queued.
 */
export const IntermediateUser: Story = {
  args: {
    userName: 'Alex',
    firstScenario: {
      title: 'Sales Negotiation Roleplay',
      level: 'intermediate',
      duration: '~20-25 minutes',
    },
    activeHref: '/dashboard/quick-start',
  },
};

/**
 * Advanced user ready for a complex scenario.
 */
export const AdvancedUser: Story = {
  args: {
    userName: 'Jordan',
    firstScenario: {
      title: 'Executive Stakeholder Management',
      level: 'advanced',
      duration: '~30-40 minutes',
    },
    activeHref: '/dashboard/quick-start',
  },
};
