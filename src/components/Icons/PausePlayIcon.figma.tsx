import figma from '@figma/code-connect';
import { PausePlayIcon } from './PausePlayIcon';

figma.connect(
  PausePlayIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9849',
  {
    example: () => <PausePlayIcon />,
  },
);
