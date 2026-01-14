// Simple Components (directly usable)
// Button - export directly, Group available via separate ButtonGroup export
export {
  Button,
  ButtonGroup,
  type ButtonProps,
  type ButtonGroupProps,
} from './Button';

// IconButton (simple component)
export { IconButton, type IconButtonProps } from './IconButton';

// Form Components (simple)
export { Input, type InputProps } from './Input';
export { InputAddon, type InputAddonProps } from './InputAddon';
export { InputGroup, type InputGroupProps } from './InputGroup';
export { Textarea, type TextareaProps } from './Textarea';

// Typography Components (simple)
export { Heading, type HeadingProps } from './Heading';

// Feedback & Status Components (simple)
export { Badge, type BadgeProps } from './Badge';
export { Spinner, type SpinnerProps } from './Spinner';
export { Toaster, toaster } from './Toast';

// Compound Components (namespace pattern)
export * as Card from './Card';
export * as Dialog from './Dialog';
export * as Switch from './Switch';
export * as Accordion from './Accordion';
export * as Drawer from './Drawer';
export * as Tabs from './Tabs';
export * as Checkbox from './Checkbox';
export * as RadioGroup from './RadioGroup';
export * as Select from './Select';
export * as Slider from './Slider';
export * as Avatar from './Avatar';
export * as Progress from './Progress';
export * as Skeleton from './Skeleton';
export * as Popover from './Popover';
export * as Tooltip from './Tooltip';

// Utility Components (namespace pattern - may have multiple exports)
export * as CloseButton from './CloseButton';
export * as Icon from './Icon';
export * as AbsoluteCenter from './AbsoluteCenter';
export * as Group from './Group';
