import figma from '@figma/code-connect';
import * as Breadcrumb from './Breadcrumb';

// Basic breadcrumb — standard navigation trail
figma.connect(
  Breadcrumb.Root,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-7978',
  {
    example: () => (
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/home">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Current Page</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    ),
  },
);

// Two-row wizard breadcrumb — used for multi-step flows (e.g. Conversation Studio)
// Pattern: TwoRowProgressiveDisclosureStep2
// - ParentRow shows the static parent context (hidden on first step)
// - Inner Breadcrumb.Root shows the current wizard progress
// - Protected steps (conversation, results) render as disabled spans, not links
figma.connect(
  Breadcrumb.TwoRowRoot,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-7978',
  {
    example: () => (
      <Breadcrumb.TwoRowRoot aria-label="Conversation Studio steps">
        <Breadcrumb.ParentRow show={true}>
          <Breadcrumb.ParentItem href="/scenarios">
            Scenarios
          </Breadcrumb.ParentItem>
          <Breadcrumb.ParentSeparator />
          <Breadcrumb.ParentItem>Conversation Studio</Breadcrumb.ParentItem>
        </Breadcrumb.ParentRow>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/scenarios/conversation-studio/settings">
                Level Setting
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>Lobby</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              {/* Protected step — renders as disabled span, not a link */}
              <Breadcrumb.Link disabled>In Conversation</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              {/* Protected step — renders as disabled span, not a link */}
              <Breadcrumb.Link disabled>Results</Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Breadcrumb.TwoRowRoot>
    ),
  },
);
