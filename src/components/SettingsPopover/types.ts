import type React from 'react';

export interface SettingsPopoverAction {
  /** Unique key for the action */
  key: string;
  /** Display label for the action */
  label: string;
  /** Icon component to render before the label */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: () => void;
}

export interface SettingsPopoverProps {
  /** User's display name (shown on the trigger) */
  userName: string;
  /** User's subscription tier label (shown below the name, e.g. "Free Trial") */
  userTier: string;
  /** User's email address (shown inside the popover card) */
  userEmail: string;
  /** Avatar fallback content — defaults to LoginIcon if not provided */
  avatarFallback?: React.ReactNode;
  /** Avatar image src — if provided, shows photo instead of fallback */
  avatarSrc?: string;
  /** List of action items to display in the popover card */
  actions: SettingsPopoverAction[];
  /** Popover placement relative to trigger (default: 'top') */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  /** Optional aria-label for the trigger button (default: 'User settings') */
  ariaLabel?: string;
}
