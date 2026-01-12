# Figma Make Setup Guide

This guide walks you through integrating the Discourser Design System with Figma Make for AI-powered design generation.

## Overview

Figma Make allows AI to generate designs using your design system package and guidelines. This integration enables you to:

- Generate UI components following your design system patterns
- Ensure AI-generated designs use proper tokens and components
- Test design variations quickly
- Maintain consistency across AI-generated designs

## Prerequisites

- Figma account with access to Figma Make
- Node.js 18+ and npm/pnpm installed
- Design system published to npm (v0.3.1+)

## Step 1: Publish Updated Package

The guidelines folder must be included in the npm package for Figma Make to access them.

### 1.1 Verify Changes

```bash
cd /Users/willstreeter/WebstormProjects/vibe-coding/shifu-project/Discourser-Design-System

# Verify guidelines are in package.json files array
cat package.json | grep -A 3 '"files"'
# Should show: "dist", "styled-system", "guidelines"

# Verify changeset exists
ls .changeset/*.md
```

### 1.2 Create Pull Request

```bash
# Stage changes
git add package.json .changeset/add-guidelines-to-package.md

# Commit changes
git commit -m "$(cat <<'EOF'
feat: add guidelines to npm package for Figma Make

- Include guidelines folder in published package
- Enable Figma Make integration with AI guidelines
- Support AI-powered design generation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"

# Push to branch
git push origin feat/figma-make-integration
```

### 1.3 Merge and Publish

1. Create PR on GitHub
2. Merge PR to main
3. Release workflow will create version bump PR
4. Merge version bump PR to trigger npm publish
5. Verify package published with guidelines:
   ```bash
   npm view @discourser/design-system
   # Check "files" list includes "guidelines"
   ```

## Step 2: Set Up in Figma Make

### 2.1 Access Figma Make

1. Open Figma Desktop or Web App
2. Navigate to **File → Make**
3. Select **Bring your design system**

### 2.2 Connect NPM Package

1. In the Figma Make interface:
   - Click **Add npm package**
   - Enter package name: `@discourser/design-system`
   - Select version: `latest` (should be 0.3.1+)
   - Click **Install**

2. Wait for package installation (may take 1-2 minutes)

3. Figma Make will automatically detect:
   - `guidelines/Guidelines.md` as entry point
   - Component documentation in `guidelines/components/`
   - Token documentation in `guidelines/design-tokens/`

### 2.3 Verify Installation

Check that Figma Make shows:

- ✅ Package installed: `@discourser/design-system@0.3.1`
- ✅ Guidelines detected: `guidelines/Guidelines.md`
- ✅ Components found: Button, Card, Dialog, Input, IconButton, Switch
- ✅ Tokens found: Colors, Typography, Spacing, Elevation

## Step 3: Test AI Generation

### 3.1 Create Test File

1. In Figma Make, create a new file
2. The AI should now have access to your design system

### 3.2 Test Prompts

Try these prompts to test the integration:

#### Basic Component Test

```
Create a login form using the Discourser design system with:
- Email input field
- Password input field
- Submit button (filled variant)
- "Forgot password?" link button (text variant)
```

Expected result:

- Uses `<Input>` component with proper labels
- Uses `<Button>` components with correct variants
- Follows spacing guidelines
- Uses semantic color tokens

#### Color Token Test

```
Create a Card component with:
- Primary color header
- Surface container background
- Elevated variant
```

Expected result:

- Uses `<Card variant="elevated">`
- Header uses `bg: 'primary'` and `color: 'onPrimary'`
- Proper surface container elevation

#### Complex Layout Test

```
Create a settings page with:
- Page heading
- Three sections using Cards
- Each section has switches for toggle options
- Save and Cancel buttons at bottom
```

Expected result:

- Uses proper component hierarchy
- Consistent spacing throughout
- Correct button hierarchy (filled for Save, outlined for Cancel)
- Switch components with proper labels

### 3.3 Validation Checklist

After each generation, verify:

- [ ] Components imported from `@discourser/design-system`
- [ ] No native HTML elements used (no `<button>`, `<input>`, etc.)
- [ ] Color tokens are semantic (no hex values)
- [ ] Proper variant selection (filled for primary, outlined for secondary)
- [ ] Labels provided for all inputs
- [ ] Spacing uses design tokens
- [ ] Theme support works (data-theme attribute)

## Step 4: Common Issues and Solutions

### Issue: Guidelines Not Found

**Symptom:** Figma Make shows "No guidelines detected"

**Solutions:**

1. Verify package version is 0.3.1+
2. Check npm package contents:
   ```bash
   npm pack @discourser/design-system --dry-run
   ```
3. Reinstall package in Figma Make
4. Try manually specifying guidelines path: `guidelines/Guidelines.md`

### Issue: AI Not Following Guidelines

**Symptom:** AI generates code with wrong patterns (native HTML, hex colors, etc.)

**Solutions:**

1. Be more explicit in prompts: "Use the Discourser design system components"
2. Add constraints: "Do not use native HTML elements"
3. Reference specific guideline sections: "Follow the button guidelines for variant selection"
4. Check if Guidelines.md is being read by AI (ask it to summarize the guidelines)

### Issue: Components Not Importing

**Symptom:** Generated code has import errors

**Solutions:**

1. Verify React peer dependencies: `react>=19.0.0`, `react-dom>=19.0.0`
2. Check package exports in package.json
3. Ensure generated imports match export structure:
   ```typescript
   // Correct
   import { Button } from '@discourser/design-system';
   import { css } from '@discourser/design-system/styled-system/css';
   ```

### Issue: Wrong Semantic Tokens

**Symptom:** AI uses wrong token names or hex values

**Solutions:**

1. Reference color guidelines: "Follow the color token guidelines"
2. Be specific: "Use primary and onPrimary semantic tokens"
3. Check if `design-tokens/colors.md` is accessible

## Step 5: Advanced Usage

### Creating Templates

Once your design system works in Figma Make, create reusable templates:

1. Generate a well-structured component
2. Save as template in Figma Make
3. Name clearly: "Login Form - Discourser DS"
4. Add description with key patterns used
5. Share with team

### Iterating on Designs

Use Figma Make's iteration features:

1. Generate initial design
2. Request variations: "Make it more compact"
3. Refine: "Use tonal variant for secondary action"
4. Export final code

### Team Onboarding

Use Figma Make as teaching tool:

1. New team members can explore design system through AI
2. Generate examples to understand patterns
3. Learn proper component usage through generated code
4. Build familiarity with token system

## Guidelines Structure Reference

Your guidelines are already optimally structured for Figma Make:

```
guidelines/
├── Guidelines.md                    # Entry point (REQUIRED)
├── overview-components.md           # Component overview
├── design-tokens/                   # Token documentation
│   ├── colors.md                   # Semantic color tokens
│   ├── typography.md               # Text styles
│   ├── spacing.md                  # Space scale
│   └── elevation.md                # Elevation system
└── components/                      # Component documentation
    ├── button.md                   # Button component
    ├── card.md                     # Card component
    ├── dialog.md                   # Dialog component
    ├── icon-button.md              # IconButton component
    ├── input.md                    # Input component
    └── switch.md                   # Switch component
```

## Best Practices

### Writing Effective Prompts

✅ **Good Prompts:**

```
Create a user profile card using Discourser design system:
- Card with elevated variant
- Avatar image (use placeholder)
- Name as heading size md
- Bio text with onSurfaceVariant color
- Edit button with outlined variant
```

❌ **Poor Prompts:**

```
Make a profile card
```

### Monitoring AI Behavior

Track how well AI follows guidelines:

- Document patterns AI handles well
- Note areas where AI deviates
- Update guidelines to address gaps
- Share findings with team

### Continuous Improvement

Improve integration over time:

1. Collect examples of good/bad AI generations
2. Identify guideline gaps
3. Enhance component documentation
4. Add more DO/DON'T examples
5. Republish package with improvements

## Resources

- Figma Make Documentation: https://developers.figma.com/docs/code
- Package on npm: https://www.npmjs.com/package/@discourser/design-system
- Repository: https://github.com/Tasty-Maker-Studio/Discourser-Design-System
- Storybook: https://discourser-design-system.netlify.app/

## Support

For issues or questions:

1. Check guidelines in `/guidelines` directory
2. Review Figma Make documentation
3. Open issue on GitHub
4. Contact maintainers

---

**Last Updated:** 2026-01-12
**Package Version:** 0.3.1
**Figma Make Support:** Yes
