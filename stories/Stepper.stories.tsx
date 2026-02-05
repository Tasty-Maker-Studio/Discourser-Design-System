import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stepper } from '../src/components/Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of step indicators',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    colorPalette: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'error', 'neutral'],
      description: 'Color palette for the stepper',
    },
    linear: {
      control: 'boolean',
      description: 'Require steps to be completed in order',
    },
    showContent: {
      control: 'boolean',
      description: 'Show step content below indicators',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  {
    value: 'step1',
    title: 'Contact Info',
    description: 'Enter your contact details',
  },
  {
    value: 'step2',
    title: 'Date & Time',
    description: 'Select your preferred date and time',
  },
  {
    value: 'step3',
    title: 'Select Rooms',
    description: 'Choose your room preferences',
  },
  {
    value: 'step4',
    title: 'Review',
    description: 'Review and confirm your booking',
  },
];

/**
 * Default stepper with 4 steps
 */
export const Default: Story = {
  args: {
    steps: defaultSteps,
    defaultStep: 0,
    showContent: true,
    colorPalette: 'primary',
  },
};

/**
 * All visual states demonstrated by showing different step positions
 */
export const AllStates: Story = {
  name: 'All Visual States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Step 1 - Current (Active)
        </h3>
        <Stepper steps={defaultSteps} defaultStep={0} showContent={false} />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Step 2 - Shows Completed + Current
        </h3>
        <Stepper steps={defaultSteps} defaultStep={1} showContent={false} />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Step 3 - Multiple Completed
        </h3>
        <Stepper steps={defaultSteps} defaultStep={2} showContent={false} />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Step 4 - All Steps
        </h3>
        <Stepper steps={defaultSteps} defaultStep={3} showContent={false} />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Completed - All Done
        </h3>
        <Stepper steps={defaultSteps} defaultStep={4} showContent />
      </div>
    </div>
  ),
};

/**
 * Size variants: sm, md, lg
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Small</h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          size="sm"
          showContent={false}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Medium (Default)
        </h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          size="md"
          showContent={false}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Large</h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          size="lg"
          showContent={false}
        />
      </div>
    </div>
  ),
};

/**
 * Color palette variants
 */
export const ColorPalettes: Story = {
  name: 'Color Palettes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>
          Primary (Default)
        </h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          colorPalette="primary"
          showContent={false}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Secondary</h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          colorPalette="secondary"
          showContent={false}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Tertiary</h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          colorPalette="tertiary"
          showContent={false}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Error</h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          colorPalette="error"
          showContent={false}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Neutral</h3>
        <Stepper
          steps={defaultSteps}
          defaultStep={1}
          colorPalette="neutral"
          showContent={false}
        />
      </div>
    </div>
  ),
};

/**
 * Interactive stepper with navigation controls
 */
export const Interactive: Story = {
  name: 'Interactive Demo',
  render: () => {
    const [step, setStep] = useState(0);

    return (
      <div style={{ maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '2rem' }}>Book Your Stay</h2>

        <Stepper
          steps={defaultSteps}
          step={step}
          onStepChange={(details) => setStep(details.step)}
          colorPalette="primary"
          showContent
          showActions
          prevLabel="Back"
          nextLabel="Next"
        />

        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <p>
            <strong>Current Step:</strong> {step + 1} of {defaultSteps.length}
          </p>
          <p>
            <strong>Step Title:</strong>{' '}
            {defaultSteps[step]?.title || 'Completed'}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Linear mode - steps must be completed in order
 */
export const LinearMode: Story = {
  name: 'Linear Navigation',
  render: () => {
    const [step, setStep] = useState(0);

    return (
      <div style={{ maxWidth: '800px' }}>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          In linear mode, you must complete steps in order. Try clicking on step
          3 - it won&apos;t work!
        </p>

        <Stepper
          steps={defaultSteps}
          step={step}
          onStepChange={(details) => setStep(details.step)}
          colorPalette="primary"
          linear
          showContent
          showActions
        />
      </div>
    );
  },
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Stepper
        steps={defaultSteps}
        defaultStep={1}
        colorPalette="primary"
        orientation="vertical"
        showContent={false}
      />
    </div>
  ),
};

/**
 * Without step titles - just numbered indicators
 */
export const NumbersOnly: Story = {
  name: 'Numbers Only',
  render: () => {
    const steps = [
      { value: 'step1', title: '' },
      { value: 'step2', title: '' },
      { value: 'step3', title: '' },
      { value: 'step4', title: '' },
    ];

    return <Stepper steps={steps} defaultStep={1} showContent={false} />;
  },
};

/**
 * Custom navigation buttons
 */
export const CustomActions: Story = {
  name: 'Custom Navigation Labels',
  render: () => {
    const [step, setStep] = useState(0);

    return (
      <div style={{ maxWidth: '800px' }}>
        <Stepper
          steps={defaultSteps}
          step={step}
          onStepChange={(details) => setStep(details.step)}
          colorPalette="primary"
          showContent
          showActions
          prevLabel="← Previous"
          nextLabel="Continue →"
        />
      </div>
    );
  },
};

/**
 * Three-step process
 */
export const ThreeSteps: Story = {
  name: 'Three Steps',
  args: {
    steps: [
      {
        value: 'step1',
        title: 'Choose Plan',
        description: 'Select your subscription plan',
      },
      {
        value: 'step2',
        title: 'Payment',
        description: 'Enter payment information',
      },
      { value: 'step3', title: 'Confirm', description: 'Review and confirm' },
    ],
    defaultStep: 0,
    showContent: true,
    colorPalette: 'primary',
  },
};

/**
 * Responsive behavior
 */
export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div style={{ padding: '1rem' }}>
      <Stepper steps={defaultSteps} defaultStep={1} size="sm" showContent />
    </div>
  ),
};

/**
 * Figma comparison - matches the design export
 */
export const FigmaComparison: Story = {
  name: 'Figma Reference Match',
  parameters: {
    docs: {
      description: {
        story:
          'This story matches the Figma design exports from docs/ux/Stepper/',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <div>
        <p
          style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}
        >
          Step 1 Active - Matches Stepper.jpg row 1
        </p>
        <Stepper steps={defaultSteps} defaultStep={0} showContent={false} />
      </div>

      <div>
        <p
          style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}
        >
          Step 2 Active - Matches Stepper.jpg row 2
        </p>
        <Stepper steps={defaultSteps} defaultStep={1} showContent={false} />
      </div>

      <div>
        <p
          style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}
        >
          Step 3 Active - Matches Stepper.jpg row 3
        </p>
        <Stepper steps={defaultSteps} defaultStep={2} showContent={false} />
      </div>

      <div>
        <p
          style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}
        >
          Step 4 Active - Matches Stepper.jpg row 4
        </p>
        <Stepper steps={defaultSteps} defaultStep={3} showContent={false} />
      </div>
    </div>
  ),
};

/**
 * With completion callback
 */
export const WithCallbacks: Story = {
  name: 'Event Callbacks',
  render: () => {
    const [step, setStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    return (
      <div style={{ maxWidth: '800px' }}>
        <Stepper
          steps={defaultSteps}
          step={step}
          onStepChange={(details) => {
            console.log('Step changed:', details);
            setStep(details.step);
          }}
          onStepComplete={() => {
            console.log('Step completed!');
            setCompleted(true);
          }}
          colorPalette="primary"
          showContent
          showActions
        />

        {completed && (
          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#d4edda',
              color: '#155724',
              borderRadius: '8px',
            }}
          >
            ✓ All steps completed! Check the console for event logs.
          </div>
        )}
      </div>
    );
  },
};
