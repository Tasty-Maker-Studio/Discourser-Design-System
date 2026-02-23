import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  InputAddon,
  InputGroup,
  Textarea,
  Heading,
  Badge,
  Spinner,
  Toaster,
  toaster,
  Stepper,
  ScenarioSettings,
  Card,
  Dialog,
  Switch,
  Accordion,
  Drawer,
  Tabs,
  Checkbox,
  RadioGroup,
  Select,
  Slider,
  Avatar,
  Progress,
  Skeleton,
  Popover,
  Tooltip,
  CloseButton as CloseButtonNS,
  ContentCard,
  Breadcrumb,
  NavigationMenu,
  DashboardIcon,
  NotebookIcon,
  ScenarioIcon,
  HelpIcon,
  AccountIcon,
  ClockIcon,
  GripDotsVerticalIcon,
  RightArrowIcon,
  ChevronUpIcon,
  type NavSection,
} from '../src';
import { HStack, VStack, Box, Grid } from '../styled-system/jsx';
import { css } from '../styled-system/css';
import { createListCollection } from '@ark-ui/react';

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Component Catalog',
  parameters: { layout: 'fullscreen' },
};

export default meta;

// ── Layout helpers ────────────────────────────────────────────────────────────

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <VStack alignItems="start" gap="1" w="full" mb="2">
    <Heading size="4xl" css={{ color: 'onSurface' }}>
      {title}
    </Heading>
    {description && (
      <p className={css({ color: 'fg.muted', fontSize: 'sm' })}>
        {description}
      </p>
    )}
    <Box w="full" h="2px" bg="border" mt="2" />
  </VStack>
);

const SubLabel = ({ children }: { children: string }) => (
  <Heading
    size="sm"
    css={{
      color: 'fg.muted',
      fontWeight: 'medium',
      mb: '1',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
    }}
  >
    {children}
  </Heading>
);

const MonoLabel = ({ children }: { children: string }) => (
  <span
    className={css({ fontSize: 'xs', color: 'fg.muted', fontFamily: 'mono' })}
  >
    {children}
  </span>
);

// ── Inline icons ──────────────────────────────────────────────────────────────

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

// ── Constants ─────────────────────────────────────────────────────────────────

const BUTTON_VARIANTS = [
  'solid',
  'elevated',
  'surface',
  'subtle',
  'outline',
  'plain',
] as const;
const BUTTON_SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const COLOR_PALETTES = [
  'primary',
  'secondary',
  'tertiary',
  'neutral',
  'error',
] as const;
const BADGE_VARIANTS = ['solid', 'subtle', 'outline'] as const;
const BADGE_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
const HEADING_SIZES = [
  '7xl',
  '6xl',
  '5xl',
  '4xl',
  '3xl',
  '2xl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
] as const;
const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const frameworkCollection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
  ],
});

const stepperSteps = [
  { value: 'details', title: 'Contact Details' },
  { value: 'schedule', title: 'Schedule' },
  { value: 'review', title: 'Review' },
  { value: 'confirm', title: 'Confirm' },
];

const NAV_SECTIONS: NavSection[] = [
  {
    value: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    items: [
      { label: 'Quick Start', href: '/dashboard/quick-start' },
      { label: 'Resume Session', href: '/dashboard/resume-session' },
      { label: 'Progress', href: '/dashboard/progress' },
      { label: 'Momentum', href: '/dashboard/momentum' },
      { label: 'Recent Session', href: '/dashboard/recent-session' },
    ],
  },
  {
    value: 'my-notebook',
    title: 'MyNotebook',
    icon: <NotebookIcon />,
    items: [
      { label: 'Knowledge Base', href: '/notebook/knowledge-base' },
      { label: 'Session Library', href: '/notebook/session-library' },
      { label: 'Decision Patterns', href: '/notebook/decision-patterns' },
      { label: 'Personal Insights', href: '/notebook/personal-insights' },
    ],
  },
  {
    value: 'scenarios',
    title: 'Scenarios',
    icon: <ScenarioIcon />,
    items: [
      { label: 'MyQueue', href: '/scenarios/my-queue' },
      { label: 'Conversation Studio', href: '/scenarios/conversation-studio' },
      { label: 'Studio Setup', href: '/scenarios/studio-setup' },
      { label: 'By Level', href: '/scenarios/by-level' },
      { label: 'By Skill', href: '/scenarios/by-skill' },
    ],
  },
  {
    value: 'help',
    title: 'Help',
    icon: <HelpIcon />,
    items: [
      { label: 'How it Works', href: '/help/how-it-works' },
      { label: 'Practice Tips', href: '/help/practice-tips' },
      { label: 'Technical Support', href: '/help/technical-support' },
      { label: 'Context', href: '/help/context' },
      { label: 'Contact Support', href: '/help/contact-support' },
    ],
  },
  {
    value: 'account',
    title: 'Account',
    icon: <AccountIcon />,
    items: [
      { label: 'Profile', href: '/account/profile' },
      { label: 'User Preferences', href: '/account/preferences' },
    ],
  },
];

// ── Single Unified Story ──────────────────────────────────────────────────────

export const FullCatalog: StoryObj = {
  render: () => (
    <VStack
      alignItems="start"
      gap="16"
      p="12"
      bg="surface"
      w="full"
      minH="100vh"
    >
      <Toaster />

      {/* ── 1. Typography ─────────────────────────────────────────────────── */}
      <VStack alignItems="start" gap="6" w="full">
        <SectionTitle
          title="Typography"
          description="Heading — 11 sizes using the DDS type scale"
        />
        <VStack alignItems="start" gap="5" w="full">
          {HEADING_SIZES.map((size) => (
            <HStack key={size} gap="6" alignItems="baseline" w="full">
              <Box w="10" flexShrink={0}>
                <MonoLabel>{size}</MonoLabel>
              </Box>
              <Heading size={size}>
                The quick brown fox jumps over the lazy dog
              </Heading>
            </HStack>
          ))}
        </VStack>
      </VStack>

      {/* ── 2. Buttons & IconButton ───────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Button & IconButton"
          description="6 variants × 7 sizes × 5 color palettes + states"
        />

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Variants (primary)</SubLabel>
          <HStack gap="3" flexWrap="wrap" alignItems="end">
            {BUTTON_VARIANTS.map((v) => (
              <VStack key={v} gap="1" alignItems="center">
                <Button variant={v} colorPalette="primary">
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
                <MonoLabel>{v}</MonoLabel>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Color Palettes (solid)</SubLabel>
          <HStack gap="3" flexWrap="wrap" alignItems="end">
            {COLOR_PALETTES.map((cp) => (
              <VStack key={cp} gap="1" alignItems="center">
                <Button variant="solid" colorPalette={cp}>
                  {cp.charAt(0).toUpperCase() + cp.slice(1)}
                </Button>
                <MonoLabel>{cp}</MonoLabel>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>All Variants × All Color Palettes</SubLabel>
          <VStack gap="3" alignItems="start">
            {BUTTON_VARIANTS.map((v) => (
              <HStack key={v} gap="2" alignItems="center">
                <Box w="16" flexShrink={0}>
                  <MonoLabel>{v}</MonoLabel>
                </Box>
                {COLOR_PALETTES.map((cp) => (
                  <Button key={cp} variant={v} colorPalette={cp} size="sm">
                    {cp.charAt(0).toUpperCase() + cp.slice(1)}
                  </Button>
                ))}
              </HStack>
            ))}
          </VStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Sizes (solid, primary)</SubLabel>
          <HStack gap="3" flexWrap="wrap" alignItems="end">
            {BUTTON_SIZES.map((s) => (
              <VStack key={s} gap="1" alignItems="center">
                <Button variant="solid" colorPalette="primary" size={s}>
                  Button
                </Button>
                <MonoLabel>{s}</MonoLabel>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>States</SubLabel>
          <HStack gap="4" flexWrap="wrap" alignItems="end">
            <VStack gap="1" alignItems="center">
              <Button variant="solid" colorPalette="primary">
                Default
              </Button>
              <MonoLabel>default</MonoLabel>
            </VStack>
            <VStack gap="1" alignItems="center">
              <Button variant="solid" colorPalette="primary" disabled>
                Disabled
              </Button>
              <MonoLabel>disabled</MonoLabel>
            </VStack>
            <VStack gap="1" alignItems="center">
              <Button variant="solid" colorPalette="primary" loading>
                Loading
              </Button>
              <MonoLabel>loading</MonoLabel>
            </VStack>
            <VStack gap="1" alignItems="center">
              <Button
                variant="solid"
                colorPalette="primary"
                loading
                loadingText="Saving…"
              >
                Save
              </Button>
              <MonoLabel>loading + text</MonoLabel>
            </VStack>
            <VStack gap="1" alignItems="center">
              <Button variant="solid" colorPalette="primary">
                <PlusIcon />
                Add Item
              </Button>
              <MonoLabel>with icon</MonoLabel>
            </VStack>
            <VStack gap="1" alignItems="center">
              <Button variant="outline" colorPalette="primary">
                <SearchIcon />
                Search
              </Button>
              <MonoLabel>outline + icon</MonoLabel>
            </VStack>
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>IconButton — Variants (primary)</SubLabel>
          <HStack gap="3" flexWrap="wrap" alignItems="end">
            {BUTTON_VARIANTS.map((v) => (
              <VStack key={v} gap="1" alignItems="center">
                <IconButton variant={v} colorPalette="primary" aria-label={v}>
                  <StarIcon />
                </IconButton>
                <MonoLabel>{v}</MonoLabel>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>IconButton — Sizes (solid, primary)</SubLabel>
          <HStack gap="3" flexWrap="wrap" alignItems="end">
            {BUTTON_SIZES.map((s) => (
              <VStack key={s} gap="1" alignItems="center">
                <IconButton
                  variant="solid"
                  colorPalette="primary"
                  size={s}
                  aria-label={`size ${s}`}
                >
                  <BellIcon />
                </IconButton>
                <MonoLabel>{s}</MonoLabel>
              </VStack>
            ))}
          </HStack>
        </VStack>
        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>ButtonGroup</SubLabel>
          <HStack gap="6" flexWrap="wrap" alignItems="start">
            <VStack gap="1" alignItems="center">
              <ButtonGroup variant="solid" colorPalette="primary" attached>
                <Button>Left</Button>
                <Button>Center</Button>
                <Button>Right</Button>
              </ButtonGroup>
              <MonoLabel>attached, solid</MonoLabel>
            </VStack>
            <VStack gap="1" alignItems="center">
              <ButtonGroup variant="outline" colorPalette="primary" attached>
                <Button>Left</Button>
                <Button>Center</Button>
                <Button>Right</Button>
              </ButtonGroup>
              <MonoLabel>attached, outline</MonoLabel>
            </VStack>
            <VStack gap="1" alignItems="center">
              <ButtonGroup variant="solid" colorPalette="primary">
                <Button>Save</Button>
                <Button variant="outline">Cancel</Button>
              </ButtonGroup>
              <MonoLabel>spaced group</MonoLabel>
            </VStack>
          </HStack>
        </VStack>
      </VStack>

      {/* ── 3. Form Inputs ────────────────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Form Inputs"
          description="Input, InputGroup, Textarea"
        />

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Input — Sizes</SubLabel>
          <VStack gap="3" w="80">
            {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
              <HStack key={s} alignItems="center" gap="4" w="full">
                <Box w="8" flexShrink={0}>
                  <MonoLabel>{s}</MonoLabel>
                </Box>
                <Input size={s} placeholder={`Input size ${s}`} />
              </HStack>
            ))}
          </VStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Input — States</SubLabel>
          <VStack gap="3" w="80">
            <Input placeholder="Placeholder text" />
            <Input defaultValue="With a default value" />
            <Input disabled placeholder="Disabled input" />
          </VStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>InputGroup — Addons</SubLabel>
          <VStack gap="3" w="96">
            <VStack alignItems="start" gap="1" w="full">
              <MonoLabel>left addon</MonoLabel>
              <InputGroup w="full">
                <InputAddon>$</InputAddon>
                <Input placeholder="0.00" />
              </InputGroup>
            </VStack>
            <VStack alignItems="start" gap="1" w="full">
              <MonoLabel>right addon</MonoLabel>
              <InputGroup w="full">
                <Input placeholder="username" />
                <InputAddon>@example.com</InputAddon>
              </InputGroup>
            </VStack>
            <VStack alignItems="start" gap="1" w="full">
              <MonoLabel>both addons</MonoLabel>
              <InputGroup w="full">
                <InputAddon>https://</InputAddon>
                <Input placeholder="yoursite" />
                <InputAddon>.com</InputAddon>
              </InputGroup>
            </VStack>
          </VStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Textarea</SubLabel>
          <VStack gap="3" w="96">
            <Textarea placeholder="Enter your message…" rows={3} />
            <Textarea
              defaultValue="With content already entered in the text area."
              rows={3}
            />
            <Textarea disabled placeholder="Disabled textarea" rows={3} />
          </VStack>
        </VStack>
      </VStack>

      {/* ── 4. Form Controls ─────────────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Form Controls"
          description="RadioGroup, Checkbox, Switch, Select, Slider"
        />

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>RadioGroup — Color Palettes</SubLabel>
          <HStack gap="10" alignItems="start" flexWrap="wrap">
            {COLOR_PALETTES.map((cp) => (
              <VStack key={cp} alignItems="start" gap="2">
                <MonoLabel>{cp}</MonoLabel>
                <RadioGroup.Root defaultValue="b" colorPalette={cp}>
                  {['Option A', 'Option B', 'Option C'].map((opt, i) => (
                    <RadioGroup.Item key={opt} value={['a', 'b', 'c'][i]}>
                      <RadioGroup.ItemControl />
                      <RadioGroup.ItemText>{opt}</RadioGroup.ItemText>
                      <RadioGroup.ItemHiddenInput />
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Checkbox — States & Colors</SubLabel>
          <HStack gap="8" flexWrap="wrap" alignItems="start">
            {[
              { label: 'Unchecked', checked: false },
              { label: 'Checked', checked: true },
              { label: 'Indeterminate', checked: 'indeterminate' as const },
              { label: 'Disabled', checked: false, disabled: true },
              { label: 'Disabled + Checked', checked: true, disabled: true },
            ].map(({ label, checked, disabled }) => (
              <VStack key={label} alignItems="start" gap="1">
                <MonoLabel>{label.toLowerCase()}</MonoLabel>
                <Checkbox.Root
                  colorPalette="primary"
                  checked={checked}
                  disabled={disabled}
                >
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>{label}</Checkbox.Label>
                  <Checkbox.HiddenInput />
                </Checkbox.Root>
              </VStack>
            ))}
          </HStack>
          <HStack gap="6" flexWrap="wrap" mt="2">
            {COLOR_PALETTES.map((cp) => (
              <VStack key={cp} alignItems="start" gap="1">
                <MonoLabel>{cp}</MonoLabel>
                <Checkbox.Root colorPalette={cp} defaultChecked>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label>
                    {cp.charAt(0).toUpperCase() + cp.slice(1)}
                  </Checkbox.Label>
                  <Checkbox.HiddenInput />
                </Checkbox.Root>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Switch — States & Color Palettes</SubLabel>
          <HStack gap="8" flexWrap="wrap" alignItems="start">
            {[
              { label: 'Off', checked: false },
              { label: 'On', defaultChecked: true },
              { label: 'Disabled', disabled: true },
            ].map(({ label, defaultChecked, disabled }) => (
              <VStack key={label} alignItems="start" gap="2">
                <MonoLabel>{label.toLowerCase()}</MonoLabel>
                <Switch.Root
                  colorPalette="primary"
                  defaultChecked={defaultChecked}
                  disabled={disabled}
                >
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>{label}</Switch.Label>
                  <Switch.HiddenInput />
                </Switch.Root>
              </VStack>
            ))}
          </HStack>
          <HStack gap="6" flexWrap="wrap" mt="2">
            {COLOR_PALETTES.map((cp) => (
              <VStack key={cp} alignItems="start" gap="1">
                <MonoLabel>{cp}</MonoLabel>
                <Switch.Root colorPalette={cp} defaultChecked>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>
                    {cp.charAt(0).toUpperCase() + cp.slice(1)}
                  </Switch.Label>
                  <Switch.HiddenInput />
                </Switch.Root>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Select</SubLabel>
          <Box w="64">
            <Select.Root collection={frameworkCollection}>
              <Select.Label>Framework</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select a framework" />
                  <Select.Indicator />
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  <Select.ItemGroup>
                    {frameworkCollection.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.ItemGroup>
                </Select.Content>
              </Select.Positioner>
              <Select.HiddenSelect />
            </Select.Root>
          </Box>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Slider — Color Palettes</SubLabel>
          <VStack gap="5" w="96">
            {COLOR_PALETTES.map((cp, i) => (
              <Slider.Root
                key={cp}
                defaultValue={[20 + i * 15]}
                colorPalette={cp}
                w="full"
              >
                <HStack justifyContent="space-between">
                  <Slider.Label css={{ fontSize: 'sm' }}>
                    {cp.charAt(0).toUpperCase() + cp.slice(1)}
                  </Slider.Label>
                  <Slider.ValueText css={{ fontSize: 'sm' }} />
                </HStack>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0}>
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                </Slider.Control>
              </Slider.Root>
            ))}
          </VStack>
        </VStack>
      </VStack>

      {/* ── 5. Data Display ───────────────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Data Display"
          description="Card, Badge, Avatar, Progress, Skeleton"
        />

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Card — Variants</SubLabel>
          <HStack gap="4" flexWrap="wrap" alignItems="start">
            {(['elevated', 'outline', 'subtle'] as const).map((v) => (
              <Card.Root key={v} variant={v} w="60">
                <Card.Header>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Description>Card description text</Card.Description>
                </Card.Header>
                <Card.Body>
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    Card body — use for grouping related information.
                  </p>
                </Card.Body>
                <Card.Footer>
                  <HStack gap="2">
                    <Button size="sm" variant="solid" colorPalette="primary">
                      Action
                    </Button>
                    <Button size="sm" variant="outline" colorPalette="neutral">
                      Cancel
                    </Button>
                  </HStack>
                </Card.Footer>
              </Card.Root>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Badge — Variants × Color Palettes</SubLabel>
          <VStack gap="3" alignItems="start">
            {BADGE_VARIANTS.map((bv) => (
              <HStack key={bv} gap="2" alignItems="center">
                <Box w="16" flexShrink={0}>
                  <MonoLabel>{bv}</MonoLabel>
                </Box>
                {COLOR_PALETTES.map((cp) => (
                  <Badge key={cp} variant={bv} colorPalette={cp}>
                    {cp.charAt(0).toUpperCase() + cp.slice(1)}
                  </Badge>
                ))}
              </HStack>
            ))}
          </VStack>
          <HStack gap="3" alignItems="center" mt="2">
            <MonoLabel>sizes</MonoLabel>
            {BADGE_SIZES.map((bs) => (
              <Badge key={bs} size={bs} variant="solid" colorPalette="primary">
                Badge {bs}
              </Badge>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Avatar — Sizes & Fallback</SubLabel>
          <HStack gap="4" flexWrap="wrap" alignItems="end">
            {AVATAR_SIZES.map((s) => (
              <VStack key={s} gap="1" alignItems="center">
                <Avatar.Root size={s}>
                  <Avatar.Fallback name="Jane Doe" />
                </Avatar.Root>
                <MonoLabel>{s}</MonoLabel>
              </VStack>
            ))}
            <VStack gap="1" alignItems="center">
              <Avatar.Root size="xl">
                <Avatar.Image
                  src="https://i.pravatar.cc/150?img=47"
                  alt="User avatar"
                />
                <Avatar.Fallback name="User" />
              </Avatar.Root>
              <MonoLabel>with image</MonoLabel>
            </VStack>
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Progress — Values & Color Palettes</SubLabel>
          <VStack gap="4" w="96">
            {[
              { value: 20, cp: 'primary' as const },
              { value: 50, cp: 'secondary' as const },
              { value: 80, cp: 'tertiary' as const },
              { value: 100, cp: 'error' as const },
            ].map(({ value, cp }) => (
              <Progress.Root key={cp} value={value} colorPalette={cp} w="full">
                <HStack justifyContent="space-between" mb="1">
                  <Progress.Label css={{ fontSize: 'sm' }}>
                    {cp.charAt(0).toUpperCase() + cp.slice(1)}
                  </Progress.Label>
                  <Progress.ValueText css={{ fontSize: 'sm' }} />
                </HStack>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            ))}
          </VStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Skeleton — Loading States</SubLabel>
          <HStack gap="10" alignItems="start">
            <VStack alignItems="start" gap="3">
              <MonoLabel>text lines (SkeletonText)</MonoLabel>
              <Skeleton.SkeletonText noOfLines={3} w="48" />
            </VStack>
            <VStack alignItems="start" gap="3">
              <MonoLabel>individual (Skeleton)</MonoLabel>
              <Skeleton.Skeleton
                css={{ h: '4', w: '40', borderRadius: 'md' }}
              />
              <Skeleton.Skeleton
                css={{ h: '4', w: '56', borderRadius: 'md' }}
              />
              <Skeleton.Skeleton
                css={{ h: '4', w: '48', borderRadius: 'md' }}
              />
            </VStack>
            <VStack alignItems="start" gap="3">
              <MonoLabel>card skeleton</MonoLabel>
              <VStack
                gap="3"
                p="4"
                borderRadius="l2"
                borderWidth="1px"
                borderColor="border"
                w="48"
              >
                <Skeleton.Skeleton
                  css={{ h: '32', w: 'full', borderRadius: 'l1' }}
                />
                <Skeleton.Skeleton
                  css={{ h: '4', w: '36', borderRadius: 'md' }}
                />
                <Skeleton.Skeleton
                  css={{ h: '4', w: '28', borderRadius: 'md' }}
                />
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>

      {/* ── 6. Feedback ──────────────────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Feedback"
          description="Spinner — sizes and color palettes"
        />

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Spinner — Sizes</SubLabel>
          <HStack gap="8" alignItems="center">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <VStack key={s} gap="2" alignItems="center">
                <Spinner size={s} colorPalette="primary" />
                <MonoLabel>{s}</MonoLabel>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Spinner — Color Palettes (md)</SubLabel>
          <HStack gap="8" alignItems="center">
            {COLOR_PALETTES.map((cp) => (
              <VStack key={cp} gap="2" alignItems="center">
                <Spinner size="md" colorPalette={cp} />
                <MonoLabel>{cp}</MonoLabel>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Button Loading States</SubLabel>
          <HStack gap="4" flexWrap="wrap">
            {COLOR_PALETTES.map((cp) => (
              <Button key={cp} variant="solid" colorPalette={cp} loading>
                {cp.charAt(0).toUpperCase() + cp.slice(1)}
              </Button>
            ))}
          </HStack>
          <HStack gap="4" flexWrap="wrap">
            {COLOR_PALETTES.map((cp) => (
              <Button
                key={cp}
                variant="outline"
                colorPalette={cp}
                loading
                loadingText="Processing…"
              >
                {cp.charAt(0).toUpperCase() + cp.slice(1)}
              </Button>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>CloseButton</SubLabel>
          <HStack gap="6" flexWrap="wrap" alignItems="end">
            <VStack gap="1" alignItems="center">
              <CloseButtonNS.CloseButton />
              <MonoLabel>default</MonoLabel>
            </VStack>
            {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
              <VStack key={s} gap="1" alignItems="center">
                <CloseButtonNS.CloseButton size={s} />
                <MonoLabel>{s}</MonoLabel>
              </VStack>
            ))}
            <VStack gap="1" alignItems="center">
              <CloseButtonNS.CloseButton
                variant="outline"
                colorPalette="neutral"
              />
              <MonoLabel>outline</MonoLabel>
            </VStack>
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Toast — Interactive Triggers</SubLabel>
          <p className={css({ fontSize: 'sm', color: 'fg.muted', mb: '2' })}>
            Click to trigger live toast notifications
          </p>
          <HStack gap="3" flexWrap="wrap">
            <Button
              variant="solid"
              colorPalette="primary"
              size="sm"
              onClick={() =>
                toaster.create({
                  title: 'Success',
                  description: 'Your changes have been saved.',
                  type: 'success',
                })
              }
            >
              Success Toast
            </Button>
            <Button
              variant="solid"
              colorPalette="error"
              size="sm"
              onClick={() =>
                toaster.create({
                  title: 'Error',
                  description: 'Something went wrong. Please try again.',
                  type: 'error',
                })
              }
            >
              Error Toast
            </Button>
            <Button
              variant="solid"
              colorPalette="secondary"
              size="sm"
              onClick={() =>
                toaster.create({
                  title: 'Warning',
                  description: 'Your session is about to expire.',
                  type: 'warning',
                })
              }
            >
              Warning Toast
            </Button>
            <Button
              variant="solid"
              colorPalette="neutral"
              size="sm"
              onClick={() =>
                toaster.create({
                  title: 'Loading',
                  description: 'Processing your request…',
                  type: 'loading',
                })
              }
            >
              Loading Toast
            </Button>
            <Button
              variant="outline"
              colorPalette="primary"
              size="sm"
              onClick={() =>
                toaster.create({
                  title: 'Action Toast',
                  description: 'New update available.',
                  type: 'info',
                  action: { label: 'Update Now', onClick: () => {} },
                })
              }
            >
              With Action
            </Button>
          </HStack>
        </VStack>
      </VStack>

      {/* ── 7. Overlays ──────────────────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Overlays"
          description="Dialog, Drawer, Popover, Tooltip"
        />

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Dialog — Static Preview</SubLabel>
          <Box
            w="96"
            borderRadius="l3"
            borderWidth="1px"
            borderColor="border"
            bg="surface"
            shadow="lg"
            overflow="hidden"
          >
            <Box p="6" borderBottomWidth="1px" borderColor="border">
              <HStack justifyContent="space-between" alignItems="center">
                <Heading size="lg">Dialog Title</Heading>
                <IconButton
                  size="sm"
                  variant="ghost"
                  colorPalette="neutral"
                  aria-label="Close"
                >
                  ✕
                </IconButton>
              </HStack>
            </Box>
            <Box p="6">
              <p
                className={css({ fontSize: 'sm', color: 'fg.muted', mb: '5' })}
              >
                Dialogs require user attention before continuing. They block the
                page until dismissed.
              </p>
              <HStack gap="3" justifyContent="end">
                <Button variant="outline" colorPalette="neutral" size="sm">
                  Cancel
                </Button>
                <Button variant="solid" colorPalette="primary" size="sm">
                  Confirm
                </Button>
              </HStack>
            </Box>
          </Box>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="outline" colorPalette="primary">
                Open Dialog (interactive)
              </Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Interactive Dialog</Dialog.Title>
                  <Dialog.CloseTrigger asChild>
                    <Button size="sm" variant="plain" aria-label="Close">
                      ✕
                    </Button>
                  </Dialog.CloseTrigger>
                </Dialog.Header>
                <Dialog.Body>
                  <p className={css({ fontSize: 'sm' })}>
                    This dialog is fully interactive. Click outside or close to
                    dismiss.
                  </p>
                </Dialog.Body>
                <Box p="4" display="flex" justifyContent="flex-end" gap="3">
                  <Dialog.CloseTrigger asChild>
                    <Button variant="outline" colorPalette="neutral" size="sm">
                      Cancel
                    </Button>
                  </Dialog.CloseTrigger>
                  <Dialog.CloseTrigger asChild>
                    <Button variant="solid" colorPalette="primary" size="sm">
                      Confirm
                    </Button>
                  </Dialog.CloseTrigger>
                </Box>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Drawer</SubLabel>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <Button variant="outline" colorPalette="primary">
                Open Drawer
              </Button>
            </Drawer.Trigger>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Drawer Panel</Drawer.Title>
                  <Drawer.CloseTrigger asChild>
                    <Button size="sm" variant="plain" aria-label="Close">
                      ✕
                    </Button>
                  </Drawer.CloseTrigger>
                </Drawer.Header>
                <Drawer.Body>
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    Drawers slide in as panel overlays, built on the Dialog
                    primitive. Click outside or the close button to dismiss.
                  </p>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Popover — Open State</SubLabel>
          <Box pt="4" pb="36">
            <Popover.Root open>
              <Popover.Trigger asChild>
                <Button variant="solid" colorPalette="primary">
                  Popover Trigger
                </Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content css={{ w: '72' }}>
                  <Popover.Arrow>
                    <Popover.ArrowTip />
                  </Popover.Arrow>
                  <Popover.Title>Popover Title</Popover.Title>
                  <Popover.Description>
                    Popovers appear near the trigger and can be dismissed by
                    clicking outside.
                  </Popover.Description>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </Box>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Tooltip — Open State</SubLabel>
          <Box pt="2" pb="16">
            <Tooltip.Tooltip
              content="Helpful contextual tooltip text"
              showArrow
              portalled={false}
              open
            >
              <Button variant="outline" colorPalette="neutral">
                Hover for Tooltip
              </Button>
            </Tooltip.Tooltip>
          </Box>
        </VStack>
      </VStack>

      {/* ── 8. Navigation & Layout ────────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Navigation & Layout"
          description="Breadcrumb, Accordion, Tabs, Stepper"
        />

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Breadcrumb</SubLabel>
          <VStack gap="4" alignItems="start">
            <VStack alignItems="start" gap="1">
              <MonoLabel>basic</MonoLabel>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Scenarios</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.CurrentLink>
                      Studio Setup
                    </Breadcrumb.CurrentLink>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </VStack>
            <VStack alignItems="start" gap="1">
              <MonoLabel>with ellipsis</MonoLabel>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Ellipsis />
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Scenarios</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.CurrentLink>
                      Studio Setup
                    </Breadcrumb.CurrentLink>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </VStack>
          </VStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Accordion</SubLabel>
          <Box w="xl">
            <Accordion.Root defaultValue={['item-1']} collapsible>
              {[
                {
                  value: 'item-1',
                  trigger: 'What is Discourser?',
                  content:
                    'Discourser is an AI-powered conversation platform designed to help users practice and improve their communication skills through structured dialogue.',
                },
                {
                  value: 'item-2',
                  trigger: 'How does it work?',
                  content:
                    'The system pairs you with an AI conversational partner that adapts to your skill level, learning goals, and preferred communication style.',
                },
                {
                  value: 'item-3',
                  trigger: 'Who is it for?',
                  content:
                    'Designed for professionals, students, and anyone looking to improve their conversational abilities in high-stakes or technical contexts.',
                },
              ].map(({ value, trigger, content }) => (
                <Accordion.Item key={value} value={value}>
                  <Accordion.ItemTrigger>
                    <span>{trigger}</span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Box px="5" py="3">
                      <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                        {content}
                      </p>
                    </Box>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Box>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Tabs</SubLabel>
          <Box w="xl">
            <Tabs.Root defaultValue="overview">
              <Tabs.List>
                {[
                  { value: 'overview', label: 'Overview' },
                  { value: 'history', label: 'History' },
                  { value: 'settings', label: 'Settings' },
                  { value: 'reports', label: 'Reports' },
                ].map(({ value, label }) => (
                  <Tabs.Trigger key={value} value={value}>
                    {label}
                  </Tabs.Trigger>
                ))}
                <Tabs.Indicator />
              </Tabs.List>
              <Tabs.Content value="overview">
                <Box p="4">
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    Overview — dashboard summary and key metrics.
                  </p>
                </Box>
              </Tabs.Content>
              <Tabs.Content value="history">
                <Box p="4">
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    History — past session logs and performance recordings.
                  </p>
                </Box>
              </Tabs.Content>
              <Tabs.Content value="settings">
                <Box p="4">
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    Settings — configure preferences and account options.
                  </p>
                </Box>
              </Tabs.Content>
              <Tabs.Content value="reports">
                <Box p="4">
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    Reports — download and review performance analytics.
                  </p>
                </Box>
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Stepper — Progress States</SubLabel>
          <VStack gap="8" w="full">
            {[0, 1, 2, 3].map((step) => (
              <VStack key={step} alignItems="start" gap="2" w="full">
                <MonoLabel>
                  step {step} —{' '}
                  {
                    ['Start', 'Step 2 active', 'Step 3 active', 'Complete'][
                      step
                    ]
                  }
                </MonoLabel>
                <Stepper
                  steps={stepperSteps}
                  defaultStep={step}
                  showContent={false}
                  colorPalette="primary"
                />
              </VStack>
            ))}
          </VStack>
        </VStack>
      </VStack>

      {/* ── 9. Custom Components ─────────────────────────────────────────── */}
      <VStack alignItems="start" gap="8" w="full">
        <SectionTitle
          title="Custom Components"
          description="ContentCard, NavigationMenu, ScenarioSettings, Stepper with content"
        />

        {/* ContentCard */}
        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>ContentCard — Variants (outline, elevated, flat)</SubLabel>
          <HStack gap="6" flexWrap="wrap" alignItems="start">
            {(['outline', 'elevated', 'flat'] as const).map((v) => (
              <ContentCard.Root key={v} variant={v} size="md" css={{ w: '72' }}>
                <ContentCard.Header>
                  <ContentCard.Title>UX Research & Design</ContentCard.Title>
                  <ContentCard.BadgeBar>
                    <Badge colorPalette="primary" variant="subtle" size="xl">
                      Beginner
                    </Badge>
                    <Badge colorPalette="neutral" variant="subtle" size="xl">
                      Professional
                    </Badge>
                  </ContentCard.BadgeBar>
                </ContentCard.Header>
                <ContentCard.Body>
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    Practice explaining your UX research process and design
                    decisions to stakeholders.
                  </p>
                </ContentCard.Body>
                <ContentCard.Separator />
                <ContentCard.Section>
                  <ContentCard.SectionTitle>
                    Sample Questions:
                  </ContentCard.SectionTitle>
                  <ContentCard.List>
                    <ContentCard.ListItem>
                      Walk me through your research methodology.
                    </ContentCard.ListItem>
                    <ContentCard.ListItem>
                      How did you validate the problem worth solving?
                    </ContentCard.ListItem>
                  </ContentCard.List>
                </ContentCard.Section>
              </ContentCard.Root>
            ))}
          </HStack>
        </VStack>

        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>ContentCard — Sizes (outline)</SubLabel>
          <HStack gap="6" flexWrap="wrap" alignItems="start">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <ContentCard.Root
                key={s}
                variant="outline"
                size={s}
                css={{ w: '64' }}
              >
                <ContentCard.Header>
                  <ContentCard.Title>Scenario Title</ContentCard.Title>
                  <ContentCard.BadgeBar>
                    <Badge colorPalette="secondary" variant="subtle" size="sm">
                      Intermediate
                    </Badge>
                  </ContentCard.BadgeBar>
                </ContentCard.Header>
                <ContentCard.Body>
                  <p className={css({ fontSize: 'sm', color: 'fg.muted' })}>
                    Card body content at size <strong>{s}</strong>.
                  </p>
                </ContentCard.Body>
              </ContentCard.Root>
            ))}
          </HStack>
        </VStack>

        {/* NavigationMenu */}
        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>NavigationMenu — All sections, active item</SubLabel>
          <Box
            w="60"
            borderWidth="1px"
            borderColor="border"
            borderRadius="l3"
            overflow="hidden"
          >
            <NavigationMenu
              sections={NAV_SECTIONS}
              defaultOpenSections={['dashboard', 'scenarios']}
              activeHref="/dashboard/progress"
            />
          </Box>
        </VStack>

        {/* ScenarioSettings */}
        <VStack alignItems="start" gap="6" w="full">
          <SubLabel>ScenarioSettings — Variants</SubLabel>
          <HStack gap="8" flexWrap="wrap" alignItems="start">
            <VStack alignItems="start" gap="2">
              <MonoLabel>all expanded (default)</MonoLabel>
              <Box w="343px">
                <ScenarioSettings />
              </Box>
            </VStack>
            <VStack alignItems="start" gap="2">
              <MonoLabel>radio sections + selections</MonoLabel>
              <Box w="343px">
                <ScenarioSettings
                  defaultValue={['duration', 'number-of-questions']}
                  defaultDuration="standard"
                  defaultQuestionCount="standard"
                />
              </Box>
            </VStack>
            <VStack alignItems="start" gap="2">
              <MonoLabel>all collapsed</MonoLabel>
              <Box w="343px">
                <ScenarioSettings defaultValue={[]} />
              </Box>
            </VStack>
          </HStack>
        </VStack>

        {/* Stepper with content */}
        <VStack alignItems="start" gap="3" w="full">
          <SubLabel>Stepper — With Step Content & Navigation</SubLabel>
          <Box w="xl">
            <Stepper
              steps={[
                {
                  value: 'profile',
                  title: 'Profile Setup',
                  description: 'Configure your learner profile and goals',
                },
                {
                  value: 'scenario',
                  title: 'Choose Scenario',
                  description: 'Select a conversation scenario type',
                },
                {
                  value: 'settings',
                  title: 'Adjust Settings',
                  description: 'Fine-tune difficulty and parameters',
                },
                {
                  value: 'launch',
                  title: 'Launch Session',
                  description: 'Review and start your session',
                },
              ]}
              defaultStep={1}
              colorPalette="primary"
              showContent
              showActions
            />
          </Box>
        </VStack>
      </VStack>

      {/* ── 10. Icon Library ─────────────────────────────────────────────── */}
      <VStack alignItems="start" gap="6" w="full">
        <SectionTitle
          title="Icon Library"
          description="All custom DDS SVG icons"
        />
        <Grid columns={5} gap="6">
          {[
            { name: 'DashboardIcon', Icon: DashboardIcon },
            { name: 'NotebookIcon', Icon: NotebookIcon },
            { name: 'ScenarioIcon', Icon: ScenarioIcon },
            { name: 'HelpIcon', Icon: HelpIcon },
            { name: 'AccountIcon', Icon: AccountIcon },
            { name: 'ClockIcon', Icon: ClockIcon },
            { name: 'GripDotsVerticalIcon', Icon: GripDotsVerticalIcon },
            { name: 'RightArrowIcon', Icon: RightArrowIcon },
            { name: 'ChevronUpIcon', Icon: ChevronUpIcon },
          ].map(({ name, Icon: IconComponent }) => (
            <VStack
              key={name}
              alignItems="center"
              gap="2"
              p="4"
              borderWidth="1px"
              borderColor="border"
              borderRadius="l2"
            >
              <Box color="onSurface" css={{ '& svg': { w: '6', h: '6' } }}>
                <IconComponent />
              </Box>
              <MonoLabel>{name.replace('Icon', '')}</MonoLabel>
            </VStack>
          ))}
        </Grid>
      </VStack>
    </VStack>
  ),
};
