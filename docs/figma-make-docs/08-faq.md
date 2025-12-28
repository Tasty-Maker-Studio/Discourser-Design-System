# Frequently Asked Questions

Common questions about creating and using Figma Make templates for the Discourser Design System.

## General Questions

### What is Figma Make?

Figma Make is an AI-powered code generation tool built into Figma that allows you to build interactive React prototypes using real code. It's designed to bridge the gap between design and development.

### Do I need a Figma Make template?

**No, but it's highly recommended.**

Without a template:
- Users must manually install the package
- Users must manually copy all guidelines
- Setup takes 1-2 hours
- Inconsistent starting points

With a template:
- Zero setup time for users
- Instant access to all features
- Consistent experience
- Faster adoption

### Can I use the template for production code?

**Partially.** Figma Make is designed for prototyping, but the code it generates can be production-ready if:
- You use the actual design system package (✅ we do)
- You follow best practices (✅ template does)
- You review and test the AI-generated code
- You handle edge cases and error states

The template provides a strong foundation, but always review code before production deployment.

## Technical Questions

### Why can't I create a template outside Figma Make?

Templates are **Figma-specific artifacts** that live in Figma's cloud. They're not npm packages or standalone files. Think of them like Figma design templates - they must be created and published within Figma's ecosystem.

### What's the difference between the npm package and the template?

**npm Package (`@discourser/design-system`):**
- React components (Button, Card, etc.)
- Styles and themes
- TypeScript definitions
- Installed via `npm install`
- Lives on npm registry

**Figma Make Template:**
- Pre-configured Figma Make file
- Has the npm package already installed
- Includes guidelines for AI
- Includes example code
- Lives in Figma cloud
- Used via "Create from template"

**Analogy:**
- Package = IKEA furniture parts
- Template = Pre-assembled room with furniture already set up

### How does Figma Make's AI use the guidelines?

When you ask the AI to generate code:
1. AI reads `Guidelines.md` to understand structure
2. AI reads overview files to learn available components
3. AI reads token files to understand colors, typography, etc.
4. AI reads component-specific docs to learn usage
5. AI generates code following these patterns

The more detailed your guidelines, the better the AI's output.

### Can I have multiple templates?

**Yes!** You can create different templates for different purposes:
- Basic template (minimal examples)
- Full template (all examples)
- Mobile template (mobile-focused)
- Desktop template (desktop-focused)
- Specific use case templates (e-commerce, dashboards, etc.)

### Do templates update automatically?

**No.** When you update a template:
- New files created from it get the updates
- Existing files remain unchanged
- Users must create new files to get updates

This is by design - it prevents breaking users' work.

## Access and Permissions

### What Figma plan do I need?

**Required:**
- Paid Figma plan (Professional, Organization, or Enterprise)
- Full seat (not Viewer or Editor-only)

**Not supported:**
- Free Figma plan
- Viewer seats
- Editor seats (unless on specific plans)

### Can I share templates publicly?

**No.** Figma Make templates can only be shared within:
- Your Figma team
- Your Figma organization

Unlike Figma Community designs, Make templates are not publicly shareable. This is intentional - they're meant for internal team use.

### Who can use my template?

**Team template:**
- Members of the specific Figma team
- Must have Full seats
- Must have Figma Make access

**Organization template:**
- All members of your Figma organization
- Same seat/access requirements

### Can external clients use the template?

**Only if:**
- They have Full seats in your Figma organization
- They have Figma Make access
- Template is published to organization (not just team)

**Alternative for clients:**
- Share the guidelines separately (as docs)
- They install the npm package manually
- They reference guidelines without the template

## Publishing Questions

### How long does publishing take?

**Initial publishing:**
- Preparation: 1-2 hours (creating content)
- Actual publishing: 2-5 minutes
- Verification: 5-10 minutes

**Updates:**
- Making changes: Varies
- Publishing update: 2-5 minutes

### Can I unpublish a template?

**Yes.** Go to the source file → Share → Update template → Unpublish.

**Effects:**
- Removed from Resources panel
- New files can't be created from it
- Existing files unaffected

**Note:** You can republish later if needed.

### What happens if I delete the source file?

**Effects:**
- Template continues to exist
- Template can still be used
- You **cannot update** the template anymore
- You cannot unpublish it

**Recommendation:** Never delete source files of published templates. Archive them instead.

## Maintenance Questions

### How often should I update the template?

**Recommended frequency:**
- Critical bugs: Immediately
- Package updates: When new versions release
- Minor improvements: Monthly or quarterly
- New components: When they're production-ready

**Balance:**
- Too frequent: Annoying for users
- Too rare: Template gets outdated

### Do I need to notify users about updates?

**Best practice: Yes, always notify for:**
- New component additions
- Breaking changes
- Significant improvements
- Bug fixes

**Communication channels:**
- Team Slack/Discord
- Email updates
- Internal docs
- Team meetings

### Can I see who's using the template?

**No.** Figma doesn't provide analytics for template usage. You'll need to track adoption through:
- Team surveys
- Manual counts
- Asking in team channels
- Observing Figma Make usage

## Troubleshooting

### The AI isn't using my design system components

**Possible causes:**
1. Guidelines not properly saved
2. File names incorrect (case-sensitive)
3. Guidelines folder empty
4. AI cache needs refresh

**Solutions:**
1. Verify all guideline files exist and have content
2. Check exact file names (lowercase, .md extension)
3. Refresh the Figma Make file
4. Wait 1-2 minutes for indexing
5. Ask more specific questions

**Test:** Ask "What Button component variants are available?" - AI should list all 5 variants.

### Users can't see my template

**Possible causes:**
1. Published to wrong team/organization
2. Users don't have Figma Make access
3. Users are in different team
4. Template not published yet

**Solutions:**
1. Verify publication scope matches user's team
2. Check users have Full seats
3. Verify users have Figma Make enabled
4. Check publication completed successfully

### Package installation fails in template

**Possible causes:**
1. Package not published to npm
2. Typo in package name
3. Version doesn't exist
4. Network issues

**Solutions:**
1. Verify: `npm view @discourser/design-system`
2. Check package name spelling exactly
3. Use valid version or `latest`
4. Try reinstalling

### Examples show errors in preview

**Possible causes:**
1. Syntax errors in code
2. Missing imports
3. Package not installed
4. TypeScript configuration issues

**Solutions:**
1. Check browser console (F12) for specific errors
2. Verify all imports are correct
3. Check package.json has the package
4. Reload preview
5. Test in fresh file from template

## Best Practices

### What makes a good template?

**Essential elements:**
- ✅ Clear, comprehensive guidelines
- ✅ Working example code
- ✅ Proper package installation
- ✅ Good documentation (README)
- ✅ No errors in preview

**Nice to have:**
- Multiple example patterns
- Responsive layouts
- Accessibility examples
- Comments explaining code
- Helpful error messages

### Should I include all components in examples?

**Recommendation: No.**

Include:
- ✅ Most common components (Button, Input, Card)
- ✅ Components that show patterns (Forms, Dialogs)
- ✅ Components users will use frequently

Exclude:
- ❌ Rarely used components
- ❌ Complex/advanced patterns
- ❌ Experimental components

**Reasoning:** Too many examples overwhelm users. Provide reference, not exhaustive coverage.

### How detailed should guidelines be?

**Balance:**
- Too brief: AI doesn't understand usage
- Too detailed: Confuses AI (LLM overload)

**Recommended detail level:**
- Purpose of component ✅
- Variant options ✅
- Common props ✅
- Usage examples ✅
- DO/DON'T examples ✅
- Edge cases ❌ (too detailed)
- Internal implementation ❌ (irrelevant)

**Rule of thumb:** Write guidelines like you're explaining to a junior developer, not an expert or a novice.

### Should I version my templates?

**Recommended: Yes, informally.**

Track versions:
- In template description
- In changelog
- In announcements

Don't:
- Create multiple published templates for versions
- Force users to migrate
- Make versioning complex

**Simple approach:**
```
Discourser Design System Starter (v1.2)
```

## Advanced Questions

### Can I customize the AI's behavior?

**Yes, through guidelines.**

The `Guidelines.md` file can include:
- General coding preferences
- Specific patterns to follow
- Things to avoid
- Naming conventions

**Example:**
```markdown
## General Guidelines

- Always use arrow functions for components
- Prefer const over let
- Use template literals for strings with variables
- Always add TypeScript types
```

The AI will try to follow these preferences.

### Can I use multiple design systems in one template?

**Possible but not recommended.**

Issues:
- Confusing for AI
- Harder to maintain guidelines
- User confusion about which components to use
- Potential style conflicts

**If you must:**
- Clearly separate guidelines by system
- Use clear naming conventions
- Explain when to use each system

**Better approach:**
- Create separate templates for each system
- Allow users to choose the appropriate one

### Can I include custom utilities in the template?

**Yes!**

You can include:
- Custom hooks
- Utility functions
- Helper components
- Constants/config files

**Add guidelines for them:**
```markdown
## Custom Utilities

### useForm Hook

Custom form handling hook.

Usage:
\`\`\`tsx
import { useForm } from './utils/useForm';

const { values, handleChange } = useForm({ name: '', email: '' });
\`\`\`
```

### How do I handle breaking changes in the design system?

**Steps:**
1. **Announce early** - Give users warning
2. **Document migration** - Clear upgrade path
3. **Update template** - Implement new patterns
4. **Support period** - Keep old version available temporarily
5. **Deprecation** - Remove old patterns after transition

**Communication example:**
```markdown
## Breaking Change in v2.0

Button API has changed:

Old (v1.x):
<Button primary>Submit</Button>

New (v2.x):
<Button variant="filled">Submit</Button>

Update your code before Feb 1, 2025.
```

## Getting Help

### Where can I get help with templates?

**Resources:**
- Figma Help Center: https://help.figma.com
- Figma Community Forum: https://forum.figma.com
- Figma Make documentation: https://developers.figma.com/docs/code
- Your organization's #figma or #design-system channel

### How do I report bugs?

**In the design system:**
- Create issue on GitHub repository
- Tag with "bug" label
- Include repro steps

**In Figma Make:**
- Use Figma's built-in feedback tool
- Or contact Figma support
- Or post in Figma Community forum

### Can I get help creating my first template?

**Yes! Ask:**
- Your team's Figma expert
- Design system maintainer
- Developer relations team
- Figma support (for technical issues)

**This documentation:**
- Follow step-by-step guides
- Check troubleshooting sections
- Review examples

## Still Have Questions?

If your question isn't answered here:
1. Review the other documentation pages
2. Search Figma Help Center
3. Ask in your team's channel
4. Contact the design system maintainer
5. Post in Figma Community forum

**For package-specific questions:**
- Check package documentation
- Review component guidelines
- Test in standalone React app first

**For Figma Make questions:**
- Check Figma's official docs
- Search Figma Community
- Contact Figma support

---

**Previous:** [Maintaining Templates](./07-maintenance.md) ←

**Back to:** [Overview](./README.md)
