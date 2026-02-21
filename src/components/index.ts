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

// Icons (individual icon components)
export {
  GripDotsVerticalIcon,
  type GripDotsVerticalIconProps,
} from './Icons/GripDotsVerticalIcon';
export { ClockIcon, type ClockIconProps } from './Icons/ClockIcon';
export { DashboardIcon, type DashboardIconProps } from './Icons/DashboardIcon';
export { NotebookIcon, type NotebookIconProps } from './Icons/NotebookIcon';
export { ScenarioIcon, type ScenarioIconProps } from './Icons/ScenarioIcon';
export { HelpIcon, type HelpIconProps } from './Icons/HelpIcon';
export { AccountIcon, type AccountIconProps } from './Icons/AccountIcon';
export {
  RightArrowIcon,
  type RightArrowIconProps,
} from './Icons/RightArrowIcon';
export { ChevronUpIcon, type ChevronUpIconProps } from './Icons/ChevronUpIcon';
export * as AbsoluteCenter from './AbsoluteCenter';
export * as Group from './Group';

// Navigation & Progress Components
export * as Breadcrumb from './Breadcrumb';
export { Stepper, type StepperRootProps, type StepItem } from './Stepper';

// Composite / Feature Components
export {
  NavigationMenu,
  type NavigationMenuProps,
  type NavSection,
  type NavItem,
} from './NavigationMenu';

export {
  ScenarioQueue,
  ScenarioCard,
  AddScenarioDialog,
  difficultyColorMap,
  difficultyLabel,
  type ScenarioQueueProps,
  type ScenarioCardProps,
  type Scenario,
  type Difficulty,
  type ScenarioStatus,
} from './ScenarioQueue';
