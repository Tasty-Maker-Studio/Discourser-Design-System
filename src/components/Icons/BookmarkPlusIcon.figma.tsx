import figma from '@figma/code-connect';
import { BookmarkPlusIcon } from './BookmarkPlusIcon';

figma.connect(
  BookmarkPlusIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3770',
  {
    example: () => <BookmarkPlusIcon />,
  },
);
