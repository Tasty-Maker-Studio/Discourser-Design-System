import figma from '@figma/code-connect';
import { StopPlayIcon } from './StopPlayIcon';

figma.connect(
  StopPlayIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9857',
  {
    example: () => <StopPlayIcon />,
  },
);
