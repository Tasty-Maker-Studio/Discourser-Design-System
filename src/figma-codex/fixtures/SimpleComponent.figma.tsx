import figma from '@figma/code-connect';
import { SimpleComponent } from './SimpleComponent';

figma.connect(
  SimpleComponent,
  'https://www.figma.com/design/ABC123/TestFile?node-id=1-2',
  {
    example: () => <SimpleComponent label="Hello" />,
  },
);
