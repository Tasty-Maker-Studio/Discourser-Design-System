import { forwardRef } from 'react';
import { Switch as ArkSwitch } from '@ark-ui/react/switch';
import { switchControl } from 'styled-system/recipes';

export interface SwitchProps {
  /**
   * Label text for the switch
   */
  label?: string;
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (details: { checked: boolean }) => void;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Name attribute for form submission
   */
  name?: string;
  /**
   * Value attribute for form submission
   */
  value?: string;
  /**
   * Whether the switch is required
   */
  required?: boolean;
  /**
   * Size variant
   * @default "md"
   */
  size?: 'sm' | 'md';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      name,
      value,
      required,
      size,
    },
    ref
  ) => {
    const classes = switchControl({ size });

    return (
      <ArkSwitch.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        value={value}
        required={required}
        className={classes.root}
      >
        <ArkSwitch.Control className={classes.control}>
          <ArkSwitch.Thumb className={classes.thumb} />
        </ArkSwitch.Control>
        <ArkSwitch.HiddenInput ref={ref} />
        {label && <ArkSwitch.Label className={classes.label}>{label}</ArkSwitch.Label>}
      </ArkSwitch.Root>
    );
  }
);

Switch.displayName = 'Switch';
