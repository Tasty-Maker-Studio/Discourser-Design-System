import figma from '@figma/code-connect';
import { SpeechIcon } from './SpeechIcon';

figma.connect(
  SpeechIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3768',
  {
    example: () => <SpeechIcon />,
  },
);
