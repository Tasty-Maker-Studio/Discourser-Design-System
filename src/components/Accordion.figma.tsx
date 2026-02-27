import figma from '@figma/code-connect';
import * as Accordion from './Accordion';

figma.connect(
  Accordion.Root,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8232',
  {
    example: () => (
      <Accordion.Root collapsible>
        <Accordion.Item value="item-1">
          <Accordion.ItemTrigger>
            <span>Trigger</span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>Content</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    ),
  },
);
