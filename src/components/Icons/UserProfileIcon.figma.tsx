import figma from '@figma/code-connect';
import { UserProfileIcon } from './UserProfileIcon';

figma.connect(
  UserProfileIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3774',
  {
    example: () => <UserProfileIcon />,
  },
);
