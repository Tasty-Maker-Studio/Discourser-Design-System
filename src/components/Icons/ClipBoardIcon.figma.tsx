import figma from '@figma/code-connect';
import { ClipBoardIcon } from './ClipBoardIcon';

figma.connect(
  ClipBoardIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9804',
  {
    example: () => <ClipBoardIcon />,
  },
);
