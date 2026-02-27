import figma from '@figma/code-connect';
import { NavigationMenu } from './NavigationMenu';

figma.connect(
  NavigationMenu,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8485',
  {
    example: () => (
      <NavigationMenu
        sections={[
          {
            value: 'dashboard',
            title: 'Dashboard',
            icon: null,
            items: [
              { label: 'Quick Start', href: '/dashboard/quick-start' },
              { label: 'Progress', href: '/dashboard/progress' },
            ],
          },
        ]}
        defaultOpenSections={['dashboard']}
        activeHref="/dashboard/quick-start"
      />
    ),
  },
);
