import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, ContentCard } from '../src'

const meta: Meta<typeof ContentCard.Root> = {
  title: 'Components/Content Card',
  component: ContentCard.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'elevated', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Shared mock content (Figma: UX Research & Design Interview) ───────────────

const UXResearchCard = ({
  size,
  variant,
}: {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'elevated' | 'flat'
}) => (
  <ContentCard.Root size={size} variant={variant}>
    <ContentCard.Header>
      <ContentCard.Title>UX Research &amp; Design Interview</ContentCard.Title>
      <ContentCard.BadgeBar>
        <Badge colorPalette="primary" variant="subtle" size="xl">
          Beginner
        </Badge>
        <Badge colorPalette="neutral" variant="subtle" size="xl">
          Professional
        </Badge>
        <Badge colorPalette="neutral" variant="subtle" size="xl">
          Visual Design
        </Badge>
        <Badge colorPalette="neutral" variant="subtle" size="xl">
          Interview
        </Badge>
      </ContentCard.BadgeBar>
    </ContentCard.Header>

    <ContentCard.Body>
      <p>
        Practice explaining your UX research process and design decisions in a simulated interview
        setting. This scenario helps you articulate your methodology clearly.
      </p>
      <p>
        Ideal for building communication skills around your design portfolio and research-backed
        decision making.
      </p>
    </ContentCard.Body>

    <ContentCard.Separator />

    <ContentCard.Section>
      <ContentCard.SectionTitle>Sample Questions:</ContentCard.SectionTitle>
      <ContentCard.List>
        <ContentCard.ListItem>Walk me through your research methodology.</ContentCard.ListItem>
        <ContentCard.ListItem>
          How did you validate that this was actually a problem worth solving?
        </ContentCard.ListItem>
        <ContentCard.ListItem>
          Describe a challenging project you worked on.
        </ContentCard.ListItem>
      </ContentCard.List>
    </ContentCard.Section>

    <ContentCard.Section>
      <ContentCard.SectionTitle>Topics Covered:</ContentCard.SectionTitle>
      <ContentCard.BadgeBar>
        <Badge colorPalette="neutral" variant="subtle" size="xl">
          User Research
        </Badge>
        <Badge colorPalette="neutral" variant="subtle" size="xl">
          Design Problem Definition
        </Badge>
        <Badge colorPalette="neutral" variant="subtle" size="xl">
          Portfolio Review
        </Badge>
      </ContentCard.BadgeBar>
    </ContentCard.Section>
  </ContentCard.Root>
)

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (Figma match)',
  render: () => <UXResearchCard />,
}

export const SmallSize: Story = {
  name: 'Size: sm',
  render: () => <UXResearchCard size="sm" />,
}

export const LargeSize: Story = {
  name: 'Size: lg',
  render: () => <UXResearchCard size="lg" />,
}

export const Elevated: Story = {
  name: 'Variant: elevated',
  render: () => <UXResearchCard variant="elevated" />,
}

export const Flat: Story = {
  name: 'Variant: flat',
  render: () => <UXResearchCard variant="flat" />,
}

export const MinimalContent: Story = {
  name: 'Minimal (title + badges + body)',
  render: () => (
    <ContentCard.Root>
      <ContentCard.Title>Stakeholder Management</ContentCard.Title>
      <ContentCard.BadgeBar>
        <Badge colorPalette="secondary" variant="subtle" size="xl">
          Intermediate
        </Badge>
        <Badge colorPalette="neutral" variant="subtle" size="xl">
          Leadership
        </Badge>
      </ContentCard.BadgeBar>
      <ContentCard.Body>
        <p>
          Practice navigating complex stakeholder relationships and communicating project status
          effectively across different levels of an organization.
        </p>
      </ContentCard.Body>
    </ContentCard.Root>
  ),
}

export const Empty: Story = {
  name: 'Empty shell',
  render: () => (
    <ContentCard.Root>
      <ContentCard.Title>Card Title</ContentCard.Title>
    </ContentCard.Root>
  ),
}
