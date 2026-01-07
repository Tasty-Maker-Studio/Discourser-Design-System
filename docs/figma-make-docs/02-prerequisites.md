# Prerequisites

Before creating a Figma Make template, ensure you have the necessary access, tools, and prepared materials.

## Required: Figma Account Access

### Account Type Requirements

✅ **Required:**
- Figma account with a **Full seat** on a **paid plan**
- Cannot be an "Editor" or "Viewer" seat
- Cannot be on a free plan

❌ **Not Supported:**
- Free Figma accounts
- Viewer-only seats
- Editor seats (unless on certain plans)

### How to Check Your Access

1. Go to https://figma.com
2. Click on your profile (bottom-left)
3. Go to **Settings** → **Account**
4. Check your plan type

### Need Access?

If you don't have the required access:
- Contact your team admin to upgrade your seat
- Upgrade your plan to a paid tier
- Request Full seat access from your organization

## Required: Published npm Package

✅ **Completed in Phase 6:**
The `@discourser/design-system` package must be published to npm.

**Verify it's published:**
```bash
npm view @discourser/design-system
```

**Expected output:**
```
@discourser/design-system@0.1.7
```

If not published:
- Review Phase 6 documentation
- Run: `pnpm build && pnpm changeset publish`

## Required: Complete Guidelines

✅ **Completed in Phase 7:**
All guideline markdown files must be ready.

**Verify guidelines exist:**
```bash
ls -R guidelines/
```

**Expected structure:**
```
guidelines/
├── Guidelines.md
├── overview-components.md
├── design-tokens/
│   ├── colors.md
│   ├── typography.md
│   ├── spacing.md
│   └── elevation.md
└── components/
    ├── button.md
    ├── card.md
    ├── dialog.md
    ├── icon-button.md
    ├── input.md
    └── switch.md
```

If guidelines are missing:
- Review Phase 7 documentation
- Ensure all files are in the `/guidelines` folder

## Required: Example/Starter Code

⚠️ **To Be Created:**
You'll need example components to showcase the design system.

**What to prepare:**
- Example login form
- Example dashboard layout
- Example component showcase
- Example card grid

**We'll create these in:** [Example Starter Code](./05-example-starter-code.md)

## Optional but Recommended

### Team/Organization Setup

**Recommended:**
- Have team or organization set up in Figma
- Know who should have access to the template
- Determine if template should be team-wide or org-wide

### Communication Plan

**Recommended:**
- Prepare announcement for template launch
- Create internal documentation/tutorial
- Plan training session if needed

### Testing Plan

**Recommended:**
- Identify beta testers for the template
- Create feedback collection process
- Plan iteration based on feedback

## Tools and Environment

### Browser Requirements

✅ **Supported Browsers:**
- Google Chrome (recommended)
- Microsoft Edge
- Safari
- Firefox

✅ **Recommended:**
- Latest browser version
- Stable internet connection
- Screen resolution: 1280x720 minimum

### Local Development Environment

While not strictly required for creating the template, having a local development environment helps with:
- Testing components before adding to template
- Verifying package installation works
- Creating and testing example code

**Recommended setup:**
```bash
# Node.js version
node --version  # Should be v18 or higher

# Package manager
pnpm --version  # Or npm/yarn

# Code editor
code --version  # VS Code recommended
```

## Knowledge Requirements

### Must Know
- ✅ Basic React concepts (components, props, JSX)
- ✅ How to use npm packages
- ✅ Basic Markdown formatting
- ✅ How to navigate Figma interface

### Helpful to Know
- TypeScript basics
- Vite build tool
- Panda CSS (if customizing styles)
- Git/GitHub (for version control)

### Don't Need to Know
- ❌ How to build a design system from scratch
- ❌ Advanced React patterns
- ❌ Complex build configurations
- ❌ AI/LLM internals

## Pre-Creation Checklist

Before starting template creation, verify:

### Access
- [ ] Figma account with Full seat on paid plan
- [ ] Ability to create Figma Make files
- [ ] Permissions to publish templates to team/org

### Materials
- [ ] `@discourser/design-system` published to npm
- [ ] All guidelines files completed and reviewed
- [ ] Example code prepared (or ready to create)
- [ ] Documentation reviewed

### Planning
- [ ] Decided on template scope (team or organization)
- [ ] Chosen template name: e.g., "Discourser Design System Starter"
- [ ] Written template description
- [ ] Identified target users

### Time
- [ ] Allocated 2-3 hours for initial creation
- [ ] Additional 30-60 minutes for testing
- [ ] Time for iterations based on feedback

## Verification Commands

Run these commands to verify your setup:

```bash
# Check npm package is published
npm view @discourser/design-system

# Verify guidelines exist
ls -R guidelines/

# Check you can install the package locally
cd /tmp && mkdir test-install && cd test-install
npm init -y
npm install @discourser/design-system
cd - && rm -rf /tmp/test-install

# Verify package contents
npm pack @discourser/design-system
tar -tzf discourser-design-system-*.tgz
rm discourser-design-system-*.tgz
```

All commands should complete without errors.

## Common Issues

### "I don't have Figma Make access"

**Solution:**
- Figma Make requires a paid plan
- Contact your workspace admin
- Upgrade your Figma plan if needed
- Request Full seat access

### "Package not found on npm"

**Solution:**
- Verify package is published: `npm view @discourser/design-system`
- Check package name spelling
- Ensure you completed Phase 6 (publishing)
- Verify you have npm access

### "Guidelines folder is empty"

**Solution:**
- Verify you completed Phase 7
- Check the `/guidelines` directory in your repository
- Ensure all markdown files were created
- Review Phase 7 documentation

### "Can't create Figma Make file"

**Solution:**
- Verify you have Full seat (not Viewer/Editor)
- Check your Figma plan type
- Try accessing https://figma.com/make directly
- Contact Figma support if issues persist

## What's Next?

Once you've verified all prerequisites are met, you're ready to create your template!

**Next:** [Creating Your Template File](./03-creating-template.md) →

**Previous:** [Understanding Templates](./01-understanding-templates.md) ←
