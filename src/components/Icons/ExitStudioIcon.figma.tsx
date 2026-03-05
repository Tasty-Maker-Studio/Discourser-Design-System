import figma from '@figma/code-connect';
import { ExitStudioIcon } from './ExitStudioIcon';

figma.connect(
  ExitStudioIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9853',
  {
    example: () => <ExitStudioIcon />,
  },
);
