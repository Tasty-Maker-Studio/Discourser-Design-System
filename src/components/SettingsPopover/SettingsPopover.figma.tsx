import figma from '@figma/code-connect';
import { SettingsPopover } from './SettingsPopover';

figma.connect(
  SettingsPopover,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=810-5398',
  {
    example: () => (
      <SettingsPopover
        userName={'value'}
        userTier={'value'}
        userEmail={'value'}
        actions={[]}
      />
    ),
  },
);
