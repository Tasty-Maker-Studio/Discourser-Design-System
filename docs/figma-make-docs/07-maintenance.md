# Maintaining Templates

This guide covers how to update and maintain your Figma Make template over time.

## Overview

**Why Maintenance Matters:**
- Keep template up-to-date with package updates
- Fix bugs discovered by users
- Add new components as they're released
- Improve based on user feedback
- Maintain consistency with design system evolution

## Understanding Template Updates

### Key Principle: Independence

**Important:** Updating a template **does NOT** update existing files created from it.

```
Template (v1.0)
  ↓ Creates
User File A (snapshot of v1.0)

Template Updated → (v1.1)
  ↓ Creates new
User File B (snapshot of v1.1)

User File A remains at v1.0
```

**Implications:**
- ✅ Users' files are stable and won't break
- ✅ Users can continue working without disruption
- ❌ Users don't automatically get updates
- ❌ Users must create new files to get updates

## When to Update Your Template

### Always Update For:

**Critical Fixes:**
- Security vulnerabilities
- Breaking bugs in examples
- Incorrect guidelines
- Broken imports or dependencies

**Package Updates:**
- New design system version published
- New components added
- Bug fixes in components
- Breaking changes that need documentation

**Guideline Improvements:**
- Better examples discovered
- Clearer documentation needed
- New best practices established
- User confusion about usage

### Consider Updating For:

**Minor Improvements:**
- Better example code
- Additional examples
- Enhanced documentation
- Visual polish

**New Features:**
- New components released
- Additional utility functions
- Advanced patterns

### Don't Update For:

**User-Specific Needs:**
- One user's specific request
- Project-specific customizations
- Experimental features

**Frequent Minor Tweaks:**
- Small wording changes
- Cosmetic adjustments
- Personal preferences

**Recommendation:** Batch minor updates together, release major updates when significant.

## How to Update Your Template

### Step 1: Update the Source File

#### 1.1 Find Your Source File

1. Go to Figma dashboard
2. Find the original file used to create the template
3. **This is the file you'll edit**
4. NOT a file created from the template

**How to identify source file:**
- It has the template name (e.g., "Discourser Design System Template")
- It's in the location where you first created it
- Opening it shows your original work

#### 1.2 Make Your Changes

Common updates:

**Package Version:**
```json
// package.json
{
  "dependencies": {
    "@discourser/design-system": "^0.2.0"  // Updated version
  }
}
```

**Guidelines:**
- Edit files in `guidelines/` folder
- Add new component docs for new components
- Update existing docs for API changes
- Improve examples based on feedback

**Example Code:**
- Fix bugs in examples
- Add new example components
- Improve existing examples
- Remove outdated patterns

#### 1.3 Test Changes

Before publishing update:
- [ ] Preview works correctly
- [ ] All examples function
- [ ] No console errors
- [ ] Guidelines are accurate
- [ ] AI uses components correctly

### Step 2: Update Template Metadata

#### 2.1 Update Description (If Needed)

If you've added significant features:
1. Prepare updated description
2. Mention what's new
3. Update component list if changed

**Example:**
```
Start building with the Discourser Design System v2

This template includes:
• Material Design 3 components (NEW: Checkbox, Radio)
• Complete design system guidelines
• Enhanced examples with more patterns
• TypeScript + Vite configuration
• Responsive layouts and best practices

🆕 New in this version:
- Added Checkbox and Radio components
- Improved form examples
- Updated to design system v0.2.0
```

#### 2.2 Prepare Version Notes

Keep track of changes:
```markdown
# Template Version History

## v1.1 (2025-01-15)
- Updated @discourser/design-system to v0.2.0
- Added Checkbox and Radio component guidelines
- Improved form examples
- Fixed dialog example bug

## v1.0 (2025-01-01)
- Initial release
- Button, Card, Dialog, IconButton, Input, Switch
- Complete guidelines
- Three example tabs
```

### Step 3: Publish Update

#### 3.1 Access Update Option

1. Open the source Figma Make file
2. Click **Share** (top-right)
3. Below the Share modal, click **Update template**

**If you don't see "Update template":**
- Verify you're in the source file (not a copy)
- Check you have edit access
- Ensure template was previously published

#### 3.2 Follow Update Wizard

The process is similar to publishing:

**Step 1: Write a description**
- Review and update template name (if needed)
- Update description
- Keep same publication scope (Team/Organization)

**Step 2: Fine-tune the preview**
- Update thumbnail if needed
- Generate new snapshot if UI changed
- Preview how it looks

**Step 3: Add the final details**
- Update template guidelines if needed
- Review modification permissions
- Update instructions for users

**Click "Update"**

#### 3.3 Verify Update

1. Go to Resources panel
2. Find your template
3. Create a new file from it
4. Verify new features/fixes are present

### Step 4: Communicate Update

#### 4.1 Announce to Team

**Example announcement:**
```
📢 Design System Template Updated (v1.1)

The Discourser Design System Template has been updated!

What's new:
• Updated to @discourser/design-system v0.2.0
• Added Checkbox and Radio component guidelines
• Improved form examples with more patterns
• Fixed dialog example bug

To use the update:
- Create a new file from the template in Resources
- Existing files are NOT affected

Questions? Let me know!
```

#### 4.2 Update Documentation

If you maintain internal docs:
- Update template documentation
- Note version changes
- Explain migration if needed

#### 4.3 Provide Migration Guidance (If Needed)

For breaking changes:
```markdown
# Migrating from v1.0 to v1.1

## Breaking Changes
None - fully backward compatible

## New Features
- Checkbox and Radio components now available
- Import: `import { Checkbox, Radio } from '@discourser/design-system'`

## Updated Guidelines
- Check guidelines/components/checkbox.md
- Check guidelines/components/radio.md

## Recommended Actions
- Review new examples in Form Examples tab
- Update forms to use Checkbox instead of custom implementations
```

## Version Management

### Semantic Versioning for Templates

While templates don't have formal versions, you can track them:

**Naming Convention:**
- v1.0 - Initial release
- v1.1 - Minor updates (new examples, fixes)
- v2.0 - Major updates (breaking changes, redesign)

**In Description:**
```
Discourser Design System Starter (v1.1)
```

### Tracking Changes

**Maintain a changelog:**
```markdown
# Changelog

## [1.2.0] - 2025-02-01
### Added
- New DatePicker component
- Calendar component guidelines
- Date formatting examples

### Changed
- Updated Button examples
- Improved Input validation examples

### Fixed
- Dialog close button positioning
- Switch label alignment

## [1.1.0] - 2025-01-15
...
```

### When to Create New Template

Instead of updating, create a new template when:
- **Major redesign** - Completely different structure
- **Different purpose** - E.g., "Mobile Template" vs "Desktop Template"
- **Breaking changes** - Users need to choose between versions
- **Different tech stack** - E.g., different build tool

## Handling User Feedback

### Collecting Feedback

**Channels:**
- Slack/Discord channel for questions
- GitHub issues for bugs
- Regular check-ins with users
- Analytics (if available)

**Questions to ask:**
- What components do you use most?
- What examples were most helpful?
- What was confusing?
- What's missing?

### Prioritizing Updates

**High Priority:**
- Fixes for broken functionality
- Corrections for wrong guidelines
- Security updates
- Frequently requested features

**Medium Priority:**
- Improved examples
- Better documentation
- Additional components

**Low Priority:**
- Nice-to-have examples
- Advanced use cases
- Cosmetic improvements

### Implementing Feedback

1. **Collect** feedback over time (1-2 weeks)
2. **Group** similar requests
3. **Prioritize** by impact and effort
4. **Plan** update with selected items
5. **Implement** and test
6. **Release** update
7. **Communicate** changes

## Deprecation Strategy

When removing or changing features:

### Announce Early

**Timeline:**
```
Week 0: Announce upcoming deprecation
Week 2: Reminder about deprecation
Week 4: Release update with deprecation
Week 8: Remove deprecated feature
```

### Provide Migration Path

**Example:**
```markdown
## Deprecation Notice

The `OldButton` component will be removed in v2.0.

### What to do:
1. Replace `<OldButton>` with `<Button variant="filled">`
2. Update prop names:
   - `primary` → `variant="filled"`
   - `secondary` → `variant="outlined"`

### Timeline:
- v1.8 (now): OldButton still works, shows warning
- v2.0 (Feb 1): OldButton removed

### Need help?
Ask in #design-system channel
```

### Support Both Temporarily

If possible, support old and new simultaneously during transition.

## Common Maintenance Scenarios

### Scenario 1: New Component Added

**Steps:**
1. Update `package.json` to new version
2. Add component guideline to `guidelines/components/`
3. Update `overview-components.md` to list new component
4. Add new component to examples
5. Test thoroughly
6. Publish update
7. Announce new component

### Scenario 2: Breaking Change in Package

**Steps:**
1. Review breaking changes in package
2. Update all affected examples
3. Update guidelines with new API
4. Add migration guide
5. Test extensively
6. Consider version bump (v1.x → v2.0)
7. Announce with clear migration path

### Scenario 3: Bug in Example Code

**Steps:**
1. Verify bug exists
2. Fix in source file
3. Test fix works
4. Publish update quickly
5. Brief announcement about fix

### Scenario 4: User Confusion About Guidelines

**Steps:**
1. Identify confusing section
2. Rewrite for clarity
3. Add examples if needed
4. Add DO/DON'T section
5. Get feedback on new version
6. Publish update

## Best Practices

### Update Frequency

**Recommended:**
- **Critical fixes:** Immediately (same day)
- **Minor updates:** Monthly or bi-monthly
- **Major updates:** Quarterly
- **Package updates:** When new design system version releases

### Testing Before Release

Always test:
- [ ] Create new file from template
- [ ] Preview loads without errors
- [ ] All examples work
- [ ] AI generates correct code
- [ ] Guidelines are accurate
- [ ] No TypeScript errors

### Communication

**Always communicate:**
- What changed
- Why it changed
- How to use new features
- Migration path if needed

### Documentation

**Maintain:**
- Version history/changelog
- Known issues list
- Roadmap for future updates
- FAQ based on user questions

## Unpublishing a Template

If you need to remove a template:

### Steps

1. Open source Figma Make file
2. Click **Share** → **Update template**
3. Click **Unpublish**
4. Confirm unpublishing

### Implications

- Template removed from Resources panel
- Users can't create new files from it
- **Existing files** created from template are unaffected
- You can republish later if needed

### When to Unpublish

**Good reasons:**
- Template is outdated and shouldn't be used
- Replaced by better template
- Design system deprecated
- Major breaking changes coming

**Bad reasons:**
- Temporary issues (fix and update instead)
- One user had a problem
- Minor updates needed

## Checkpoint

For maintaining your template effectively:

- [x] Understand update process
- [x] Know when to update vs. when to wait
- [x] Can publish template updates
- [x] Communicate changes to users
- [x] Maintain version history
- [x] Handle user feedback
- [x] Plan for deprecations

## What's Next?

You now know how to maintain your template! Check the FAQ for answers to common questions.

**Next:** [FAQ](./08-faq.md) →

**Previous:** [Publishing Your Template](./06-publishing-template.md) ←
