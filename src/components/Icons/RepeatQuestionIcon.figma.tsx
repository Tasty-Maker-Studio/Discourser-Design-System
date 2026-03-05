import figma from '@figma/code-connect';
import { RepeatQuestionIcon } from './RepeatQuestionIcon';

figma.connect(
  RepeatQuestionIcon,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=622-3767',
  {
    example: () => <RepeatQuestionIcon />,
  },
);
