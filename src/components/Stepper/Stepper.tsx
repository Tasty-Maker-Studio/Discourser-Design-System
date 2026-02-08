import React, { forwardRef } from 'react';
import { Steps, useStepsContext } from '@ark-ui/react/steps';
import {
  stepper,
  type StepperVariantProps,
  button,
} from 'styled-system/recipes';
import { css, cx } from 'styled-system/css';

/**
 * Step item configuration
 */
export interface StepItem {
  /** Unique identifier for the step */
  value: string;
  /** Step title/label */
  title: string;
  /** Optional step description */
  description?: string;
}

export interface StepperRootProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof Steps.Root>,
      'count' | 'size' | 'orientation' | 'step' | 'defaultStep'
    >,
    Omit<StepperVariantProps, 'colorPalette'> {
  /** Array of step configurations */
  steps: StepItem[];
  /** Color palette for theming (default: "primary") */
  colorPalette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral';
  /** Show step content below the indicators */
  showContent?: boolean;
  /** Show navigation actions (Back/Next buttons) */
  showActions?: boolean;
  /** Previous button label */
  prevLabel?: string;
  /** Next button label */
  nextLabel?: string;
  /** Current step (controlled mode) */
  step?: number;
  /** Default step (uncontrolled mode) */
  defaultStep?: number;
  /** Custom class name */
  className?: string;
}

/**
 * Custom separator that fixes the completion state logic.
 *
 * Ark UI marks separator as complete when the PRECEDING step is complete.
 * We need it complete only when the FOLLOWING step is complete (not just current).
 *
 * Logic: separator at index N connects step N to step N+1
 * - Complete when: step N+1 is COMPLETE (currentStep > N+1, i.e., currentStep >= N+2)
 * - Gray when: step N+1 is CURRENT or INCOMPLETE
 */
interface CustomSeparatorProps {
  index: number;
  className?: string;
}

const CustomSeparator = ({ index, className }: CustomSeparatorProps) => {
  const stepsContext = useStepsContext();
  const currentStepIndex = stepsContext.value;

  // Separator N should be complete only if we've PASSED step N+1
  // currentStepIndex is 0-based, so:
  // - Separator 0 (between step 1 and 2): complete when currentStep > 1 (index > 1)
  // - Separator 1 (between step 2 and 3): complete when currentStep > 2 (index > 2)
  // - Separator 2 (between step 3 and 4): complete when currentStep > 3 (index > 3)
  //
  // In other words: complete when currentStepIndex > index + 1
  // Which simplifies to: currentStepIndex >= index + 2
  const isComplete = currentStepIndex >= index + 2;

  return (
    <Steps.Separator
      className={className}
      // Override Ark UI's data-complete with our corrected logic
      {...(isComplete ? { 'data-complete': '' } : {})}
    />
  );
};

/**
 * Stepper component for multi-step workflows
 *
 * Based on Ark UI Steps primitive with Material Design 3 styling.
 * Supports linear and non-linear navigation, with three visual states:
 * - Current: Active step (primary color)
 * - Completed: Previous steps (secondary color)
 * - Upcoming: Future steps (outlined)
 *
 * @example
 * ```tsx
 * const steps = [
 *   { value: 'step1', title: 'Contact Info' },
 *   { value: 'step2', title: 'Date & Time' },
 *   { value: 'step3', title: 'Review' },
 * ];
 *
 * <Stepper steps={steps} defaultStep={0} />
 * ```
 */
export const StepperRoot = forwardRef<HTMLDivElement, StepperRootProps>(
  (
    {
      steps,
      size,
      orientation,
      colorPalette = 'primary',
      showContent = true,
      showActions = false,
      prevLabel = 'Back',
      nextLabel = 'Next',
      className,
      children,
      step,
      defaultStep,
      ...props
    },
    ref,
  ) => {
    const classes = stepper({ size, orientation, colorPalette });
    const stepOrientation = orientation || 'horizontal';

    return (
      <Steps.Root
        ref={ref}
        count={steps.length}
        orientation={stepOrientation as 'horizontal' | 'vertical'}
        className={cx(classes.root, css({ colorPalette }), className)}
        step={step}
        defaultStep={defaultStep}
        {...props}
      >
        <Steps.List className={classes.list}>
          {steps.map((step, index) => (
            <Steps.Item key={step.value} index={index} className={classes.item}>
              <Steps.Trigger className={classes.trigger}>
                <Steps.Indicator className={classes.indicator}>
                  {index + 1}
                </Steps.Indicator>
                {step.title && (
                  <span className={classes.label}>{step.title}</span>
                )}
              </Steps.Trigger>
              {index < steps.length - 1 && (
                <CustomSeparator index={index} className={classes.separator} />
              )}
            </Steps.Item>
          ))}
        </Steps.List>

        {showContent && (
          <>
            {steps.map((step, index) => (
              <Steps.Content
                key={step.value}
                index={index}
                className={classes.content}
              >
                {step.description || children}
              </Steps.Content>
            ))}

            <Steps.Progress className={classes.progress}>
              All steps completed!
            </Steps.Progress>
          </>
        )}

        {showActions && (
          <div className={css({ display: 'flex', gap: 'md', mt: 'lg' })}>
            <Steps.PrevTrigger asChild>
              <button className={button({ variant: 'outline' })}>
                {prevLabel}
              </button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <button className={button({ variant: 'solid' })}>
                {nextLabel}
              </button>
            </Steps.NextTrigger>
          </div>
        )}

        {children}
      </Steps.Root>
    );
  },
);

StepperRoot.displayName = 'Stepper';

// Compound component exports
export const Stepper = Object.assign(StepperRoot, {
  Root: Steps.Root,
  List: Steps.List,
  Item: Steps.Item,
  Trigger: Steps.Trigger,
  Indicator: Steps.Indicator,
  Separator: Steps.Separator,
  Content: Steps.Content,
  Progress: Steps.Progress,
  PrevTrigger: Steps.PrevTrigger,
  NextTrigger: Steps.NextTrigger,
});
