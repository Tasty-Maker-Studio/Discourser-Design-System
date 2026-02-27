import figma from '@figma/code-connect';
import { DiscourserLogo } from './DiscourserLogo';

figma.connect(
  DiscourserLogo,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=491-4933',
  {
    example: () => <DiscourserLogo />,
  },
);
