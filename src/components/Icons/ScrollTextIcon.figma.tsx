import figma from '@figma/code-connect';
import { ScrollTextIcon } from './ScrollTextIcon';

figma.connect(
  ScrollTextIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3773',
  {
    example: () => <ScrollTextIcon />,
  },
);
