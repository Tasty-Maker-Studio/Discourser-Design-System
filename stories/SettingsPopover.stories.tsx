import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsPopover } from '../src/components/SettingsPopover';
import { LogoutIcon } from '../src/components/Icons/LogoutIcon';
import { css } from '../styled-system/css';

const meta = {
  title: 'Components/Overlay/SettingsPopover',
  component: SettingsPopover,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          minH: '400px',
          w: '280px',
        })}
      >
        <div className={css({ w: 'full' })}>
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default SettingsPopover with the Discourser leaf avatar and a Logout action.
 */
export const Default: Story = {
  args: {
    userName: 'Will Streeter',
    userTier: 'Free Trial',
    userEmail: 'w.streeter+002@tastymakers.io',
    actions: [
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutIcon w="5" h="5" />,
        onClick: () => console.log('Logout clicked'),
      },
    ],
  },
};

/**
 * Multiple actions in the popover card.
 */
export const MultipleActions: Story = {
  args: {
    userName: 'Will Streeter',
    userTier: 'Pro Plan',
    userEmail: 'will@discourser.ai',
    actions: [
      {
        key: 'settings',
        label: 'Settings',
        onClick: () => console.log('Settings clicked'),
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutIcon w="5" h="5" />,
        onClick: () => console.log('Logout clicked'),
      },
    ],
  },
};

/**
 * With a custom avatar fallback (initials instead of the LoginIcon).
 */
export const WithInitials: Story = {
  args: {
    userName: 'Jane Doe',
    userTier: 'Enterprise',
    userEmail: 'jane.doe@company.com',
    avatarFallback: undefined, // Will fall back to default LoginIcon
    actions: [
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutIcon w="5" h="5" />,
        onClick: () => console.log('Logout clicked'),
      },
    ],
  },
};

/**
 * Simulating sidebar positioning — full-width trigger in a narrow container.
 */
export const SidebarContext: Story = {
  decorators: [
    (Story) => (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          w: '260px',
          h: '600px',
          bg: 'surface.default',
          borderRadius: 'l3',
          p: '3',
        })}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    userName: 'Will Streeter',
    userTier: 'Free Trial',
    userEmail: 'w.streeter+002@tastymakers.io',
    actions: [
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutIcon w="5" h="5" />,
        onClick: () => console.log('Logout clicked'),
      },
    ],
  },
};
