import figma from '@figma/code-connect'
import * as ContentCard from './index'

figma.connect(ContentCard.Root, 'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=478-5957', {
  example: () => (
    <ContentCard.Root>
      <ContentCard.Header>
        <ContentCard.Title>Title</ContentCard.Title>
        <ContentCard.BadgeBar>badges</ContentCard.BadgeBar>
      </ContentCard.Header>
      <ContentCard.Body>Content</ContentCard.Body>
      <ContentCard.Separator />
      <ContentCard.Section>
        <ContentCard.SectionTitle>Section</ContentCard.SectionTitle>
        <ContentCard.List>
          <ContentCard.ListItem>Item</ContentCard.ListItem>
        </ContentCard.List>
      </ContentCard.Section>
    </ContentCard.Root>
  ),
})
