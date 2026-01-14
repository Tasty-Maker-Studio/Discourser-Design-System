---
"@discourser/design-system": minor
---

fix: improve component export pattern for better developer experience

**Breaking Change:** Simple components are now directly usable without double-naming.

**Before:**
```tsx
import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

// Confusing double-naming required
<Button.Button variant="filled">Click</Button.Button>
<Badge.Badge>New</Badge.Badge>
<Spinner.Spinner />
<IconButton.IconButton aria-label="Close" />
```

**After:**
```tsx
import { Button, Badge, Spinner, IconButton } from '@discourser/design-system';

// Direct, intuitive usage
<Button variant="filled">Click</Button>
<Badge>New</Badge>
<Spinner />
<IconButton aria-label="Close" />

// Sub-components still accessible
<Button.Group>
  <Button>One</Button>
  <Button>Two</Button>
</Button.Group>
```

**Changes:**
- Simple components (Button, Badge, Spinner, IconButton, Input, Textarea, Heading, InputAddon, InputGroup) are now directly usable
- Button.Group is accessible via the Button namespace for sub-components
- Compound components (Card, Dialog, Switch, Accordion, etc.) retain their namespace pattern as expected

**Benefits:**
- Intuitive API that follows React conventions
- Enables Figma Make AI to correctly use components
- Fixes runtime errors: "React.jsx: type is invalid -- expected a string but got: object"
- Maintains access to sub-components via namespace (e.g., Button.Group)

**Migration:**
If you were using the namespace pattern for simple components, update your imports:
```tsx
// Old (no longer works)
<Button.Button variant="filled">Click</Button.Button>

// New (correct)
<Button variant="filled">Click</Button>
```

Compound components (Card, Dialog, etc.) are unchanged:
```tsx
// Still correct
<Card.Root>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
</Card.Root>
```
