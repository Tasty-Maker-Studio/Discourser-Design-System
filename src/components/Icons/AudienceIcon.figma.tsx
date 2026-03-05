import figma from '@figma/code-connect';
import { AudienceIcon } from './AudienceIcon';

figma.connect(
  AudienceIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-9825',
  {
    example: () => <AudienceIcon />,
  },
);
