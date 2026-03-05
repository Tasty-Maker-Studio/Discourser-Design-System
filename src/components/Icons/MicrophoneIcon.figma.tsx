import figma from '@figma/code-connect';
import { MicrophoneIcon } from './MicrophoneIcon';

figma.connect(
  MicrophoneIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9820',
  {
    example: () => <MicrophoneIcon />,
  },
);
