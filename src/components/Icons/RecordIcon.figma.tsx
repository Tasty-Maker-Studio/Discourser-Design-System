import figma from '@figma/code-connect';
import { RecordIcon } from './RecordIcon';

figma.connect(
  RecordIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9843',
  {
    example: () => <RecordIcon />,
  },
);
