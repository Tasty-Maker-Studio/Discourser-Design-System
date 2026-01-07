# Publishing Your Template

This guide walks you through publishing your Figma Make template so your team can use it.

## Overview

**Time Required:** 15-30 minutes

**What You'll Do:**
1. Final testing and verification
2. Configure template settings
3. Write template description
4. Set template thumbnail
5. Configure user permissions
6. Publish the template

## Step 1: Final Testing

Before publishing, thoroughly test your template.

### 1.1 Test All Functionality

**Components:**
- [ ] All buttons render and are clickable
- [ ] All input fields accept text
- [ ] Switches toggle properly
- [ ] Cards display correctly
- [ ] Dialogs open and close

**Navigation:**
- [ ] Tab switching works
- [ ] All tabs load content
- [ ] No console errors

**Responsiveness:**
- [ ] Layout adapts to different screen sizes
- [ ] Mobile view is usable
- [ ] No horizontal scrolling issues

### 1.2 Test with AI

Ask the AI to generate some code:

1. Open **Chat**
2. Try: `Create a simple contact form`
3. Verify the AI:
   - ✅ Uses design system components
   - ✅ Applies correct variants
   - ✅ Includes proper labels
   - ✅ Follows guidelines

**If AI doesn't use design system:**
- Review guidelines files
- Ensure all files are saved
- Check file names are correct

### 1.3 Check Console for Errors

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Verify:
   - ✅ No red errors
   - ✅ No TypeScript errors
   - ⚠️ Warnings are okay

**If there are errors:**
- Fix them before publishing
- Most common: Missing imports or typos

## Step 2: Prepare Template Metadata

### 2.1 Choose Template Name

**Good names:**
- ✅ "Discourser Design System Starter"
- ✅ "Discourser DS - Full Template"
- ✅ "Material Design 3 Starter (Discourser)"

**Avoid:**
- ❌ "Template"
- ❌ "Test"
- ❌ Generic names without context

### 2.2 Write Template Description

Prepare a clear, concise description:

**Example:**
```
Start building with the Discourser Design System

This template includes:
• Material Design 3 components (Button, Card, Input, Dialog, Switch)
• Complete design system guidelines for Figma Make AI
• Interactive examples and starter code
• TypeScript + Vite configuration
• Responsive layouts and best practices

Perfect for prototyping new features or building production-ready applications with consistent design.
```

**Guidelines:**
- ✅ Explain what's included
- ✅ List key components
- ✅ Mention use cases
- ✅ Keep it concise (2-3 short paragraphs max)

### 2.3 Decide on Scope

**Team Template:**
- Available to specific Figma team
- Good for smaller organizations
- Easier to manage and update

**Organization Template:**
- Available to entire organization
- Good for large companies
- Wider distribution

**Which to choose?**
- Start with **Team** template
- Can expand to Organization later
- Easier to test and iterate

## Step 3: Create Custom Thumbnail (Optional)

A custom thumbnail makes your template more recognizable.

### 3.1 Auto-Generated Thumbnail

Figma Make automatically creates a thumbnail from your app's current state.

**To optimize auto-thumbnail:**
1. Navigate to a good-looking view in preview
2. Choose a view that showcases the design system
3. Make sure it's visually appealing

**Recommended view:**
- Button Examples tab (shows variety of components)
- Or a balanced view with multiple component types

### 3.2 Custom Thumbnail (Advanced)

If you want a custom thumbnail:
1. Create a graphic showing key components
2. Include "Discourser Design System" branding
3. Use M3 colors and styling
4. Size: 1600×1200px recommended

**Note:** Custom thumbnails are more complex and optional for first version.

## Step 4: Publish the Template

### 4.1 Access Share Menu

1. In your Figma Make file, click **Share** (top-right corner)
2. Look below the "Share this file" modal
3. Click **Publish template**

**If you don't see "Publish template":**
- Verify you have Full seat access
- Check you're on a paid plan
- Ensure you have edit access to the file

### 4.2 Move File Out of Drafts (If Needed)

If prompted to move the file:
1. Click **Move file**
2. Select a team/project location
3. Choose appropriate folder
4. Click **Move**

**Recommendation:** Create a "Design System" folder/project for organization.

### 4.3 Step 1 - Write Description

You'll see a 3-step wizard.

**Step 1: Write a description**

1. **Template name:** "Discourser Design System Starter"
2. **Description:** Paste your prepared description
3. **Publish to:**
   - Select "Team" or "Organization"
   - Choose the specific team if multiple options

4. Click **Continue**

### 4.4 Step 2 - Fine-tune Preview

**Step 2: Fine-tune the preview**

1. Review the auto-generated thumbnail
2. Options:
   - **Use current thumbnail** - If it looks good
   - **Generate new snapshot** - Take new screenshot
   - **Upload custom thumbnail** - Use your own image

3. Preview how it will look in Resources panel
4. Click **Continue**

### 4.5 Step 3 - Add Final Details

**Step 3: Add the final details**

This step controls what users can modify.

**Template Guidelines:**
- These are separate from design system guidelines
- They control how users can customize the template
- Default guidelines are usually fine

**Options:**
- **Locked elements** - What users cannot change
- **Modifiable elements** - What users can change
- **Instructions** - How users should modify it

**Recommended settings:**
- ✅ Allow all modifications (users can change anything)
- ✅ Include basic instructions
- ❌ Don't lock elements (users need flexibility)

**Example instructions:**
```
Feel free to modify or delete the example components in src/examples/.
Keep the guidelines/ folder intact so Figma Make AI can help you.
```

4. Review all settings
5. Click **Publish**

## Step 5: Verify Publication

### 5.1 Check Resources Panel

1. Open a new Figma file or tab
2. Go to your files dashboard
3. Click **Resources** (left sidebar or bottom)
4. Look for **Make** section
5. Find your template: "Discourser Design System Starter"

**If you see it:** ✅ Successfully published!

### 5.2 Test Creating from Template

1. Click on your template in Resources
2. A preview should appear
3. Click **Use template** or **Create from template**
4. A new Figma Make file should be created
5. Verify it has:
   - ✅ Design system package installed
   - ✅ Guidelines folder populated
   - ✅ Example code working

### 5.3 Verify for Other Users

Ask a teammate to test:
1. Open Figma
2. Go to Resources
3. Look for the template
4. Create a file from it
5. Verify everything works

**If they can't see it:**
- Check publication scope (Team vs Organization)
- Verify they have access to the same team
- Ensure they have Figma Make access (Full seat)

## Step 6: Announce to Team

### 6.1 Prepare Announcement

**Example announcement:**
```
🎉 New Design System Template Available!

I've published a Figma Make template for the Discourser Design System.

What's included:
• All M3 components (Button, Card, Input, Dialog, Switch, IconButton)
• Complete guidelines for Figma Make AI
• Interactive examples and starter code
• Ready-to-use configuration

How to use:
1. Go to Resources in Figma
2. Find "Discourser Design System Starter"
3. Click "Use template"
4. Start building!

The AI will automatically use the correct components and patterns.

Questions? Check the README in the template or ask me!
```

### 6.2 Communication Channels

Share through:
- Team Slack/Discord channel
- Email to design/development team
- Team meeting announcement
- Internal documentation/wiki

### 6.3 Provide Support

Be prepared to:
- Answer questions about usage
- Help with first-time setup
- Gather feedback
- Fix issues discovered by users

## Common Publishing Issues

### Can't Find "Publish Template" Option

**Symptoms:**
- No "Publish template" button in Share menu

**Solutions:**
- Verify Full seat on paid plan
- Check file ownership/edit access
- Try reloading the Figma Make file
- Contact Figma support if persistent

### Template Not Appearing in Resources

**Symptoms:**
- Published successfully but can't find template

**Solutions:**
- Check correct team/organization selected
- Reload Figma dashboard
- Search by template name
- Verify publication scope matches your team membership

### Other Users Can't Access Template

**Symptoms:**
- You see template, but teammates don't

**Solutions:**
- Verify published to correct team/organization
- Check teammates have Figma Make access
- Ensure teammates are in the same team
- Verify teammates have Full seats (Viewers can't use Make)

### Template Preview Looks Wrong

**Symptoms:**
- Thumbnail doesn't match app appearance

**Solutions:**
- Navigate to better view before publishing
- Use "Generate new snapshot" option
- Create custom thumbnail
- Update template to fix preview

## Best Practices

### Naming

✅ **DO:**
- Use clear, descriptive names
- Include "Design System" or "Starter"
- Add version if maintaining multiple

❌ **DON'T:**
- Use generic names
- Include "test" or "draft"
- Use only acronyms

### Description

✅ **DO:**
- List what's included
- Explain use cases
- Keep it concise
- Use bullet points

❌ **DON'T:**
- Write long paragraphs
- Skip important details
- Use jargon without explanation
- Forget to mention AI features

### Permissions

✅ **DO:**
- Allow full customization
- Provide helpful instructions
- Trust users to modify as needed

❌ **DON'T:**
- Lock everything
- Restrict unnecessarily
- Make it hard to customize

## Checkpoint

After publishing, verify:

- [x] Template appears in your Resources
- [x] You can create a new file from it
- [x] New file has all features working
- [x] Teammates can see and use the template
- [x] Template description is clear
- [x] Thumbnail is appropriate

**All verified?** ✅ Publication complete!

## What's Next?

Your template is published and ready to use! Now learn how to maintain and update it over time.

**Next:** [Maintaining Templates](./07-maintenance.md) →

**Previous:** [Example Starter Code](./05-example-starter-code.md) ←
