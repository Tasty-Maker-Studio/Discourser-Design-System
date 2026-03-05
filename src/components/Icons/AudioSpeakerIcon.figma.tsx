import figma from '@figma/code-connect';
import { AudioSpeakerIcon } from './AudioSpeakerIcon';

figma.connect(
  AudioSpeakerIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9811',
  {
    example: () => <AudioSpeakerIcon />,
  },
);
