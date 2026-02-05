/* global describe, it, expect, vi */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper } from './Stepper';

const mockSteps = [
  {
    value: 'step1',
    title: 'Contact Info',
    description: 'Enter your contact details',
  },
  {
    value: 'step2',
    title: 'Date & Time',
    description: 'Select a date and time',
  },
  { value: 'step3', title: 'Review', description: 'Review your information' },
];

describe('Stepper', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Stepper steps={mockSteps} />);

      // Should render all step titles
      expect(screen.getByText('Contact Info')).toBeInTheDocument();
      expect(screen.getByText('Date & Time')).toBeInTheDocument();
      expect(screen.getByText('Review')).toBeInTheDocument();
    });

    it('renders all step indicators with numbers', () => {
      render(<Stepper steps={mockSteps} />);

      // Should show step numbers (1, 2, 3)
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders step content when showContent is true', () => {
      render(<Stepper steps={mockSteps} defaultStep={0} showContent />);

      // Should show first step's description
      expect(
        screen.getByText('Enter your contact details'),
      ).toBeInTheDocument();
    });

    it('hides step content when showContent is false', () => {
      render(<Stepper steps={mockSteps} defaultStep={0} showContent={false} />);

      // Should not show step descriptions
      expect(
        screen.queryByText('Enter your contact details'),
      ).not.toBeInTheDocument();
    });

    it('renders separators between steps', () => {
      const { container } = render(<Stepper steps={mockSteps} />);

      // Should have n-1 separators for n steps
      const separators = container.querySelectorAll('[class*="separator"]');
      expect(separators).toHaveLength(2);
    });
  });

  describe('Visual States', () => {
    it('applies current state styling to active step', () => {
      const { container } = render(
        <Stepper steps={mockSteps} defaultStep={0} />,
      );

      const indicators = container.querySelectorAll('[data-part="indicator"]');
      // First indicator should have data-current attribute
      expect(indicators[0]).toHaveAttribute('data-current');
    });

    it('applies completed state styling to previous steps', async () => {
      const { container } = render(
        <Stepper steps={mockSteps} defaultStep={1} />,
      );

      const indicators = container.querySelectorAll('[data-part="indicator"]');
      // First indicator should be completed when on step 2
      expect(indicators[0]).toHaveAttribute('data-complete');
    });

    it('applies upcoming state styling to future steps', () => {
      const { container } = render(
        <Stepper steps={mockSteps} defaultStep={0} />,
      );

      const indicators = container.querySelectorAll('[data-part="indicator"]');
      // Second and third should have incomplete state
      expect(indicators[1]).toHaveAttribute('data-incomplete');
      expect(indicators[2]).toHaveAttribute('data-incomplete');
    });

    it('styles separators based on completion', () => {
      const { container } = render(
        <Stepper steps={mockSteps} defaultStep={1} />,
      );

      const separators = container.querySelectorAll('[data-part="separator"]');
      // First separator should be completed
      expect(separators[0]).toHaveAttribute('data-complete');
    });
  });

  describe('Interaction', () => {
    it('handles step change events', async () => {
      const onStepChange = vi.fn();
      render(
        <Stepper
          steps={mockSteps}
          defaultStep={0}
          onStepChange={onStepChange}
        />,
      );

      const user = userEvent.setup();
      const triggers = document.querySelectorAll('[data-part="trigger"]');

      await user.click(triggers[1]);

      expect(onStepChange).toHaveBeenCalled();
    });

    it('supports keyboard navigation', async () => {
      const { container } = render(
        <Stepper steps={mockSteps} defaultStep={0} />,
      );

      const triggers = container.querySelectorAll('[data-part="trigger"]');

      // Triggers should be tabbable
      expect(triggers[0]).toHaveAttribute('tabindex');
      expect(triggers[1]).toHaveAttribute('tabindex');
    });

    it('respects linear mode', () => {
      const { container } = render(
        <Stepper steps={mockSteps} defaultStep={0} linear />,
      );

      const triggers = container.querySelectorAll('[data-part="trigger"]');

      // In linear mode, step 1 (index 1) should not be clickable since step 0 is current
      // Step 3 (index 2) should have incomplete/disabled state
      const secondTrigger = triggers[1];
      const thirdTrigger = triggers[2];

      // Future steps should have data-incomplete
      expect(secondTrigger).toHaveAttribute('data-incomplete');
      expect(thirdTrigger).toHaveAttribute('data-incomplete');
    });
  });

  describe('Variants', () => {
    it('applies size variants correctly', () => {
      const { container, rerender } = render(
        <Stepper steps={mockSteps} size="sm" />,
      );

      let root = container.querySelector('[data-part="root"]');
      expect(root).toHaveClass('stepper__root--size_sm');

      rerender(<Stepper steps={mockSteps} size="lg" />);
      root = container.querySelector('[data-part="root"]');
      expect(root).toHaveClass('stepper__root--size_lg');
    });

    it('supports horizontal orientation', () => {
      const { container } = render(
        <Stepper steps={mockSteps} orientation="horizontal" />,
      );

      const root = container.querySelector('[data-part="root"]');
      expect(root).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('supports vertical orientation', () => {
      const { container } = render(
        <Stepper steps={mockSteps} orientation="vertical" />,
      );

      const root = container.querySelector('[data-part="root"]');
      expect(root).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = render(
        <Stepper steps={mockSteps} defaultStep={0} />,
      );

      const triggers = container.querySelectorAll('[role="tab"]');

      // Step triggers should have tab role
      expect(triggers.length).toBe(mockSteps.length);

      // Should have accessible names
      expect(screen.getByText('Contact Info')).toBeInTheDocument();
    });

    it('supports screen readers', () => {
      render(<Stepper steps={mockSteps} defaultStep={0} />);

      const currentContent = screen.getByText('Enter your contact details');

      // Current step content should be visible for screen readers
      expect(currentContent).toBeVisible();
    });

    it('has focus indicators', () => {
      const { container } = render(<Stepper steps={mockSteps} />);

      const triggers = container.querySelectorAll('[data-part="trigger"]');

      // Triggers should be focusable
      expect(triggers[0]).toHaveAttribute('tabindex', '0');
    });
  });

  describe('StepperActions', () => {
    it('renders navigation buttons', () => {
      render(<Stepper steps={mockSteps} defaultStep={0} showActions />);

      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('allows custom button labels', () => {
      render(
        <Stepper
          steps={mockSteps}
          defaultStep={0}
          showActions
          prevLabel="Previous"
          nextLabel="Continue"
        />,
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('navigates steps when clicked', async () => {
      render(
        <Stepper steps={mockSteps} defaultStep={0} showContent showActions />,
      );

      const user = userEvent.setup();
      const nextButton = screen.getByText('Next');

      await user.click(nextButton);

      // Should show second step content
      expect(
        await screen.findByText('Select a date and time'),
      ).toBeInTheDocument();
    });
  });

  describe('Completed State', () => {
    it('shows completed content when all steps done', () => {
      render(<Stepper steps={mockSteps} defaultStep={mockSteps.length} />);

      expect(screen.getByText('All steps completed!')).toBeInTheDocument();
    });

    it('hides step content when completed', () => {
      render(<Stepper steps={mockSteps} defaultStep={mockSteps.length} />);

      // Content exists in DOM but should be hidden
      const content = screen.getByText('Enter your contact details');
      expect(content).not.toBeVisible();
    });
  });
});
