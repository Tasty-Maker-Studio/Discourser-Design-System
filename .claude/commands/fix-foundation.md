---
description: Fix foundation dependencies and configuration (Phase 1)
---

# Fix the Foundation - Phase 1

## Context

Read the full PRD: `docs/design-system-setup-prompt.md`
Read the M3 theme: `docs/material-theme.json`

## Tasks

### 1. Update package.json

Replace with the dependencies from the PRD:
- Add `@ark-ui/react` ^4.4.0
- Add `@pandacss/dev` ^0.52.0
- Add React 19 as peer + dev dependency
- Add all Storybook 8.5 dependencies
- Add proper scripts

### 2. Update .gitignore

Add:
```
styled-system/
storybook-static/
```

### 3. Update tsconfig.json

Add path aliases:
```json
"paths": {
  "@/*": ["./src/*"],
  "styled-system/*": ["./styled-system/*"]
}
```

### 4. Update .npmrc

```
auto-install-peers=true
strict-peer-dependencies=false
```

## Validation

After changes:
```bash
pnpm install
pnpm build:panda
pnpm dev
```

All three commands must succeed.
