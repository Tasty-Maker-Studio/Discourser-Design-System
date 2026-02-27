import figma from '@figma/code-connect';
import * as CompoundComponent from './CompoundComponent/index';

figma.connect(
  CompoundComponent.Root,
  'https://www.figma.com/design/ABC123/TestFile?node-id=5-10',
  {
    example: () => (
      <CompoundComponent.Root>
        <CompoundComponent.Header>Title</CompoundComponent.Header>
      </CompoundComponent.Root>
    ),
  },
);
