import figma from '@figma/code-connect';
import { NotebookPenIcon } from './NotebookPenIcon';

figma.connect(
  NotebookPenIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3771',
  {
    example: () => <NotebookPenIcon />,
  },
);
