# Adding Guidelines

This guide walks you through copying all guideline files from your repository into your Figma Make template.

## Overview

**Time Required:** 30-45 minutes

**What You'll Do:**
1. Access the guidelines folder in Figma Make
2. Create the folder structure
3. Copy each guideline file
4. Verify all files are accessible

## Step 1: Access Guidelines Folder

### 1.1 Open Code Panel

1. In your Figma Make file, click **Code** in the left sidebar
2. You should see the file explorer

### 1.2 Locate Guidelines Folder

1. Look for the **guidelines/** folder in the file explorer
2. Click to expand it

**If the folder doesn't exist:**
1. Right-click in the file explorer root
2. Select **Create new folder**
3. Name it exactly: `guidelines`

### 1.3 Check Existing Contents

The folder may already have a default `Guidelines.md` file. We'll replace it with ours.

## Step 2: Create Folder Structure

Before copying files, create the nested folder structure:

### 2.1 Create design-tokens Folder

1. Right-click on **guidelines/**
2. Select **Create new folder**
3. Name it exactly: `design-tokens`

### 2.2 Create components Folder

1. Right-click on **guidelines/**
2. Select **Create new folder**
3. Name it exactly: `components`

### 2.3 Verify Structure

Your file tree should now look like:
```
guidelines/
├── design-tokens/
└── components/
```

## Step 3: Copy Main Guidelines File

### 3.1 Open Source File

On your local computer:
1. Navigate to your repository
2. Open: `guidelines/Guidelines.md`
3. Select all content (Cmd+A / Ctrl+A)
4. Copy to clipboard (Cmd+C / Ctrl+C)

### 3.2 Create/Replace in Figma Make

In Figma Make:
1. If **Guidelines.md** exists in **guidelines/**, click to open it
2. If it doesn't exist:
   - Right-click **guidelines/**
   - Select **Create new file**
   - Name it: `Guidelines.md`
3. Delete all existing content
4. Paste your copied content (Cmd+V / Ctrl+V)
5. Save (Cmd+S / Ctrl+S)

### 3.3 Verify Content

Check that the file includes:
- ✅ "Discourser Design System Guidelines" heading
- ✅ "IMPORTANT: Always Read These First" section
- ✅ Core Principles section
- ✅ Package Imports examples
- ✅ Quick Reference table

## Step 4: Copy Overview File

### 4.1 Copy overview-components.md

**From your repository:**
1. Open: `guidelines/overview-components.md`
2. Select all (Cmd+A / Ctrl+A)
3. Copy (Cmd+C / Ctrl+C)

**In Figma Make:**
1. Right-click **guidelines/**
2. **Create new file**
3. Name it: `overview-components.md`
4. Paste content (Cmd+V / Ctrl+V)
5. Save (Cmd+S / Ctrl+S)

### 4.2 Verify Content

Check that the file includes:
- ✅ "Components Overview" heading
- ✅ Available Components table
- ✅ Styling Guidelines section
- ✅ DO/DO NOT examples

## Step 5: Copy Design Token Files

You need to copy 4 files into the `design-tokens/` folder.

### 5.1 Copy colors.md

**From repository:** `guidelines/design-tokens/colors.md`

**In Figma Make:**
1. Right-click **guidelines/design-tokens/**
2. **Create new file**
3. Name it: `colors.md`
4. Paste content
5. Save

**Verify it contains:**
- ✅ "Color Tokens" heading
- ✅ Semantic Colors Reference tables
- ✅ Usage examples
- ✅ Light/Dark mode values

### 5.2 Copy typography.md

**From repository:** `guidelines/design-tokens/typography.md`

**In Figma Make:**
1. Right-click **guidelines/design-tokens/**
2. **Create new file**
3. Name it: `typography.md`
4. Paste content
5. Save

**Verify it contains:**
- ✅ "Typography Tokens" heading
- ✅ Font Families table
- ✅ Type Scale tables (Display, Headline, Title, Body, Label)
- ✅ Usage examples

### 5.3 Copy spacing.md

**From repository:** `guidelines/design-tokens/spacing.md`

**In Figma Make:**
1. Right-click **guidelines/design-tokens/**
2. **Create new file**
3. Name it: `spacing.md`
4. Paste content
5. Save

**Verify it contains:**
- ✅ "Spacing Tokens" heading
- ✅ Spacing Scale table (none, xxs, xs, sm, md, lg, xl, xxl, xxxl)
- ✅ Usage patterns
- ✅ Common use cases

### 5.4 Copy elevation.md

**From repository:** `guidelines/design-tokens/elevation.md`

**In Figma Make:**
1. Right-click **guidelines/design-tokens/**
2. **Create new file**
3. Name it: `elevation.md`
4. Paste content
5. Save

**Verify it contains:**
- ✅ "Elevation Tokens" heading
- ✅ Elevation Levels table (level0-level5)
- ✅ M3 elevation strategy
- ✅ Component elevation mapping

## Step 6: Copy Component Files

You need to copy 6 component guideline files.

### 6.1 Copy button.md

**From repository:** `guidelines/components/button.md`

**In Figma Make:**
1. Right-click **guidelines/components/**
2. **Create new file**
3. Name it: `button.md`
4. Paste content
5. Save

**Verify it contains:**
- ✅ "Button" heading
- ✅ Variants table (filled, outlined, text, elevated, tonal)
- ✅ Props table
- ✅ Examples section
- ✅ DO NOT section

### 6.2 Copy card.md

**From repository:** `guidelines/components/card.md`

**In Figma Make:**
1. Right-click **guidelines/components/**
2. **Create new file**
3. Name it: `card.md`
4. Paste content
5. Save

### 6.3 Copy dialog.md

**From repository:** `guidelines/components/dialog.md`

**In Figma Make:**
1. Right-click **guidelines/components/**
2. **Create new file**
3. Name it: `dialog.md`
4. Paste content
5. Save

### 6.4 Copy icon-button.md

**From repository:** `guidelines/components/icon-button.md`

**In Figma Make:**
1. Right-click **guidelines/components/**
2. **Create new file**
3. Name it: `icon-button.md`
4. Paste content
5. Save

### 6.5 Copy input.md

**From repository:** `guidelines/components/input.md`

**In Figma Make:**
1. Right-click **guidelines/components/**
2. **Create new file**
3. Name it: `input.md`
4. Paste content
5. Save

### 6.6 Copy switch.md

**From repository:** `guidelines/components/switch.md`

**In Figma Make:**
1. Right-click **guidelines/components/**
2. **Create new file**
3. Name it: `switch.md`
4. Paste content
5. Save

## Step 7: Verify Complete Structure

### 7.1 Check File Tree

Your **guidelines/** folder should now look exactly like this:

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

**Total files:** 12

### 7.2 Checklist

Verify each file exists:

**Root level:**
- [ ] Guidelines.md
- [ ] overview-components.md

**design-tokens/ folder:**
- [ ] colors.md
- [ ] typography.md
- [ ] spacing.md
- [ ] elevation.md

**components/ folder:**
- [ ] button.md
- [ ] card.md
- [ ] dialog.md
- [ ] icon-button.md
- [ ] input.md
- [ ] switch.md

**All 12 files present?** ✅ Proceed to testing!

## Step 8: Test Guidelines with AI

Now let's verify Figma Make's AI can read and use the guidelines.

### 8.1 Test Component Knowledge

1. Click **Chat** in the left sidebar
2. Type: `What components are available in the Discourser Design System?`
3. Send the message

**Expected response:**
The AI should list: Button, Card, Dialog, IconButton, Input, Switch

**If AI doesn't know:**
- Check that Guidelines.md and overview-components.md are properly saved
- Verify file names match exactly (case-sensitive)
- Try refreshing the Figma Make file

### 8.2 Test Component Details

1. Ask: `How do I use the Button component?`
2. The AI should reference:
   - 5 variants (filled, outlined, text, elevated, tonal)
   - 3 sizes (sm, md, lg)
   - Import statement
   - Example usage

**If AI gives generic React button info:**
- Check that components/button.md exists and has content
- Verify the file is saved
- Try being more specific: "What Button variants are available?"

### 8.3 Test Design Tokens

1. Ask: `What semantic color tokens should I use?`
2. The AI should reference:
   - primary, onPrimary, primaryContainer
   - surface, onSurface
   - error, errorContainer
   - Mention using semantic tokens instead of raw colors

**If AI doesn't know about tokens:**
- Check that design-tokens/colors.md exists
- Verify the content is pasted correctly
- Try refreshing

## Common Issues

### Files Not Appearing

**Symptom:** Created files don't show in file explorer

**Solution:**
- Wait 5-10 seconds for sync
- Refresh the Figma Make file
- Click away and back to **Code** panel
- Check you created them in the correct folder

### AI Not Using Guidelines

**Symptom:** AI gives generic answers, not design-system-specific

**Solutions:**
- Verify all files are saved (no unsaved indicators)
- Check file names match exactly (case-sensitive)
- Ensure files have content (not empty)
- Try asking more specific questions
- Refresh the Figma Make file
- Wait 1-2 minutes for AI to index new guidelines

### Copy/Paste Not Working

**Symptom:** Can't paste content into files

**Solutions:**
- Try typing a character first, then pasting
- Use keyboard shortcuts instead of right-click menu
- Check clipboard has content (paste into notepad first to verify)
- Try a different browser
- Reload the Figma Make file

### File Names Incorrect

**Symptom:** Files created with wrong extension or name

**Solution:**
- Right-click file → Rename
- Ensure exact names including:
  - Correct case (lowercase)
  - Correct extension (.md)
  - No extra spaces
- Delete and recreate if needed

## Tips for Faster Copying

### Batch Preparation

Before starting, open all source files in tabs on your local computer. This makes copying faster.

### Use Dual Monitors

If you have two monitors:
- Local files on one monitor
- Figma Make on the other
- Copy/paste between them easily

### Keyboard Shortcuts

Master these for speed:
- **Cmd/Ctrl + A** - Select all
- **Cmd/Ctrl + C** - Copy
- **Cmd/Ctrl + V** - Paste
- **Cmd/Ctrl + S** - Save
- **Right-click** - Context menu

## Checkpoint

Before proceeding, verify:

- [x] All 12 guideline files copied
- [x] Folder structure is correct
- [x] Files contain proper content
- [x] AI can access and use guidelines
- [x] No typos in file/folder names

**All verified?** ✅ Ready for next step!

## What's Next?

With guidelines in place, the AI now knows how to use your design system. Next, we'll add example starter code that demonstrates best practices.

**Next:** [Example Starter Code](./05-example-starter-code.md) →

**Previous:** [Creating Your Template File](./03-creating-template.md) ←
