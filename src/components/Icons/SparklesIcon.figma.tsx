import figma from '@figma/code-connect';
import { SparklesIcon } from './SparklesIcon';

figma.connect(
  SparklesIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3772',
  {
    example: () => <SparklesIcon />,
  },
);
