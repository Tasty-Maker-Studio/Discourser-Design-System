import figma from '@figma/code-connect'
import * as Card from './Card'

figma.connect(Card.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    variant: figma.enum('Variant', { Elevated: 'elevated', Outline: 'outline', Subtle: 'subtle' }),
  },
  example: ({ variant }) => (
    <Card.Root variant={variant}>
      <Card.Header>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
      </Card.Header>
      <Card.Body>Content</Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card.Root>
  ),
})
