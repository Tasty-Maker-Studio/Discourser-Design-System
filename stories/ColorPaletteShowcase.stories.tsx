import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../src/components/Button';
import { Badge } from '../src/components/Badge';
import * as Checkbox from '../src/components/Checkbox';
import { HStack, VStack } from '../styled-system/jsx';

const meta = {
  title: 'Foundations/Color Palette Showcase',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Comprehensive showcase of all 5 M3 color palettes across multiple components.
 * This serves as a visual QA page to verify bridge file implementation.
 */
export const AllPalettes: Story = {
  render: () => (
    <VStack gap="8" alignItems="start">
      <div>
        <h2 style={{ marginBottom: '1rem' }}>Color Palette Showcase</h2>
        <p style={{ color: 'var(--colors-neutral-11)', marginBottom: '2rem' }}>
          Visual demonstration of all 5 M3 color palettes (Primary, Secondary, Tertiary, Neutral, Error)
          across Button, Badge, and Checkbox components.
        </p>
      </div>

      {/* Primary Palette */}
      <VStack gap="4" alignItems="start" style={{ width: '100%' }}>
        <h3>Primary (M3 Green)</h3>

        <VStack gap="3" alignItems="start">
          <h4>Button Variants</h4>
          <HStack gap="3">
            <Button variant="solid" colorPalette="primary">Solid</Button>
            <Button variant="elevated" colorPalette="primary">Elevated</Button>
            <Button variant="surface" colorPalette="primary">Surface</Button>
            <Button variant="subtle" colorPalette="primary">Subtle</Button>
            <Button variant="outline" colorPalette="primary">Outline</Button>
            <Button variant="plain" colorPalette="primary">Plain</Button>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Badge Variants</h4>
          <HStack gap="3">
            <Badge variant="solid" colorPalette="primary">Solid</Badge>
            <Badge variant="subtle" colorPalette="primary">Subtle</Badge>
            <Badge variant="outline" colorPalette="primary">Outline</Badge>
            <Badge variant="plain" colorPalette="primary">Plain</Badge>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Checkbox</h4>
          <HStack gap="3">
            <Checkbox.Root colorPalette="primary" defaultChecked>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Primary Checkbox</Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </VStack>
      </VStack>

      {/* Secondary Palette */}
      <VStack gap="4" alignItems="start" style={{ width: '100%' }}>
        <h3>Secondary (Olive-Green)</h3>

        <VStack gap="3" alignItems="start">
          <h4>Button Variants</h4>
          <HStack gap="3">
            <Button variant="solid" colorPalette="secondary">Solid</Button>
            <Button variant="elevated" colorPalette="secondary">Elevated</Button>
            <Button variant="surface" colorPalette="secondary">Surface</Button>
            <Button variant="subtle" colorPalette="secondary">Subtle</Button>
            <Button variant="outline" colorPalette="secondary">Outline</Button>
            <Button variant="plain" colorPalette="secondary">Plain</Button>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Badge Variants</h4>
          <HStack gap="3">
            <Badge variant="solid" colorPalette="secondary">Solid</Badge>
            <Badge variant="subtle" colorPalette="secondary">Subtle</Badge>
            <Badge variant="outline" colorPalette="secondary">Outline</Badge>
            <Badge variant="plain" colorPalette="secondary">Plain</Badge>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Checkbox</h4>
          <HStack gap="3">
            <Checkbox.Root colorPalette="secondary" defaultChecked>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Secondary Checkbox</Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </VStack>
      </VStack>

      {/* Tertiary Palette */}
      <VStack gap="4" alignItems="start" style={{ width: '100%' }}>
        <h3>Tertiary (Teal)</h3>

        <VStack gap="3" alignItems="start">
          <h4>Button Variants</h4>
          <HStack gap="3">
            <Button variant="solid" colorPalette="tertiary">Solid</Button>
            <Button variant="elevated" colorPalette="tertiary">Elevated</Button>
            <Button variant="surface" colorPalette="tertiary">Surface</Button>
            <Button variant="subtle" colorPalette="tertiary">Subtle</Button>
            <Button variant="outline" colorPalette="tertiary">Outline</Button>
            <Button variant="plain" colorPalette="tertiary">Plain</Button>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Badge Variants</h4>
          <HStack gap="3">
            <Badge variant="solid" colorPalette="tertiary">Solid</Badge>
            <Badge variant="subtle" colorPalette="tertiary">Subtle</Badge>
            <Badge variant="outline" colorPalette="tertiary">Outline</Badge>
            <Badge variant="plain" colorPalette="tertiary">Plain</Badge>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Checkbox</h4>
          <HStack gap="3">
            <Checkbox.Root colorPalette="tertiary" defaultChecked>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Tertiary Checkbox</Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </VStack>
      </VStack>

      {/* Neutral Palette */}
      <VStack gap="4" alignItems="start" style={{ width: '100%' }}>
        <h3>Neutral (Gray)</h3>

        <VStack gap="3" alignItems="start">
          <h4>Button Variants</h4>
          <HStack gap="3">
            <Button variant="solid" colorPalette="neutral">Solid</Button>
            <Button variant="elevated" colorPalette="neutral">Elevated</Button>
            <Button variant="surface" colorPalette="neutral">Surface</Button>
            <Button variant="subtle" colorPalette="neutral">Subtle</Button>
            <Button variant="outline" colorPalette="neutral">Outline</Button>
            <Button variant="plain" colorPalette="neutral">Plain</Button>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Badge Variants</h4>
          <HStack gap="3">
            <Badge variant="solid" colorPalette="neutral">Solid</Badge>
            <Badge variant="subtle" colorPalette="neutral">Subtle</Badge>
            <Badge variant="outline" colorPalette="neutral">Outline</Badge>
            <Badge variant="plain" colorPalette="neutral">Plain</Badge>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Checkbox</h4>
          <HStack gap="3">
            <Checkbox.Root colorPalette="neutral" defaultChecked>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Neutral Checkbox</Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </VStack>
      </VStack>

      {/* Error Palette */}
      <VStack gap="4" alignItems="start" style={{ width: '100%' }}>
        <h3>Error (Red)</h3>

        <VStack gap="3" alignItems="start">
          <h4>Button Variants</h4>
          <HStack gap="3">
            <Button variant="solid" colorPalette="error">Solid</Button>
            <Button variant="elevated" colorPalette="error">Elevated</Button>
            <Button variant="surface" colorPalette="error">Surface</Button>
            <Button variant="subtle" colorPalette="error">Subtle</Button>
            <Button variant="outline" colorPalette="error">Outline</Button>
            <Button variant="plain" colorPalette="error">Plain</Button>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Badge Variants</h4>
          <HStack gap="3">
            <Badge variant="solid" colorPalette="error">Solid</Badge>
            <Badge variant="subtle" colorPalette="error">Subtle</Badge>
            <Badge variant="outline" colorPalette="error">Outline</Badge>
            <Badge variant="plain" colorPalette="error">Plain</Badge>
          </HStack>
        </VStack>

        <VStack gap="3" alignItems="start">
          <h4>Checkbox</h4>
          <HStack gap="3">
            <Checkbox.Root colorPalette="error" defaultChecked>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Error Checkbox</Checkbox.Label>
            </Checkbox.Root>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  ),
};

/**
 * Compact comparison showing all palettes side-by-side with solid buttons only
 */
export const CompactComparison: Story = {
  render: () => (
    <VStack gap="4" alignItems="start">
      <h3>Solid Button Comparison</h3>
      <HStack gap="3">
        <Button variant="solid" colorPalette="primary">Primary</Button>
        <Button variant="solid" colorPalette="secondary">Secondary</Button>
        <Button variant="solid" colorPalette="tertiary">Tertiary</Button>
        <Button variant="solid" colorPalette="neutral">Neutral</Button>
        <Button variant="solid" colorPalette="error">Error</Button>
      </HStack>

      <h3>Badge Comparison</h3>
      <HStack gap="3">
        <Badge variant="solid" colorPalette="primary">Primary</Badge>
        <Badge variant="solid" colorPalette="secondary">Secondary</Badge>
        <Badge variant="solid" colorPalette="tertiary">Tertiary</Badge>
        <Badge variant="solid" colorPalette="neutral">Neutral</Badge>
        <Badge variant="solid" colorPalette="error">Error</Badge>
      </HStack>

      <h3>Checkbox Comparison</h3>
      <HStack gap="4">
        <Checkbox.Root colorPalette="primary" defaultChecked>
          <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
          <Checkbox.Label>Primary</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root colorPalette="secondary" defaultChecked>
          <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
          <Checkbox.Label>Secondary</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root colorPalette="tertiary" defaultChecked>
          <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
          <Checkbox.Label>Tertiary</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root colorPalette="neutral" defaultChecked>
          <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
          <Checkbox.Label>Neutral</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root colorPalette="error" defaultChecked>
          <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
          <Checkbox.Label>Error</Checkbox.Label>
        </Checkbox.Root>
      </HStack>
    </VStack>
  ),
};
