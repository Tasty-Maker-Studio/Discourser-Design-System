import figma from '@figma/code-connect';
import { PlayIcon } from './PlayIcon';

figma.connect(
  PlayIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3766',
  {
    example: () => <PlayIcon />,
  },
);
