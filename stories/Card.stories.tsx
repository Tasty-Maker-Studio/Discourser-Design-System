import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { Box, VStack, HStack } from '../styled-system/jsx';

const meta: Meta<typeof Card.Root> = {
  title: 'Components / Card',
  component: Card.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card.Root>;

export const Basic: Story = {
  render: () => (
    <Card.Root width={{ base: 'full', md: '400px' }}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>This is a card description providing additional context.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Box bg="neutral.subtle.bg" minH="48" borderRadius="l2" />
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" colorPalette="neutral">Cancel</Button>
        <Button variant="solid" colorPalette="primary">Confirm</Button>
      </Card.Footer>
    </Card.Root>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <VStack gap="6" alignItems="stretch" maxW="600px">
      <Card.Root variant="outline">
        <Card.Header>
          <Card.Title>Outline Variant</Card.Title>
          <Card.Description>Card with border outline</Card.Description>
        </Card.Header>
        <Card.Body>
          <Box bg="neutral.subtle.bg" h="24" borderRadius="l2" />
        </Card.Body>
      </Card.Root>

      <Card.Root variant="elevated">
        <Card.Header>
          <Card.Title>Elevated Variant</Card.Title>
          <Card.Description>Card with shadow elevation</Card.Description>
        </Card.Header>
        <Card.Body>
          <Box bg="neutral.subtle.bg" h="24" borderRadius="l2" />
        </Card.Body>
      </Card.Root>

      <Card.Root variant="subtle">
        <Card.Header>
          <Card.Title>Subtle Variant</Card.Title>
          <Card.Description>Card with subtle background</Card.Description>
        </Card.Header>
        <Card.Body>
          <Box bg="neutral.surface.bg" h="24" borderRadius="l2" />
        </Card.Body>
      </Card.Root>
    </VStack>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card.Root maxW="400px">
      <Box
        bg="primary.subtle.bg"
        h="200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="primary.solid.fg"
        fontWeight="semibold"
      >
        Image Placeholder
      </Box>
      <Card.Header>
        <Card.Title>Product Name</Card.Title>
        <Card.Description>Brief product description goes here</Card.Description>
      </Card.Header>
      <Card.Body>
        <VStack gap="2" alignItems="start">
          <HStack gap="2">
            <Box fontWeight="bold" fontSize="2xl">$99.99</Box>
            <Box color="fg.muted" textDecoration="line-through">$129.99</Box>
          </HStack>
        </VStack>
      </Card.Body>
      <Card.Footer>
        <Button variant="solid" colorPalette="primary" width="full">Add to Cart</Button>
      </Card.Footer>
    </Card.Root>
  ),
};
