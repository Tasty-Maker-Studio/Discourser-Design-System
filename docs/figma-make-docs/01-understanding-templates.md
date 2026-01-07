# Understanding Figma Make Templates

## What is Figma Make?

Figma Make is an AI-powered code generation tool built into Figma that allows you to:
- Build interactive prototypes using real React code
- Generate UI components based on text prompts
- Use your production design system in prototypes
- Export working code for development

## What is a Figma Make Template?

A **Figma Make Template** is a pre-configured Figma Make file that serves as a starting point for new projects. Think of it as a "starter kit" that includes:

- Pre-installed npm packages (like your design system)
- Design system guidelines
- Example/starter code
- Configuration files (Vite, TypeScript, etc.)
- Best practices and patterns

### Template vs. Regular File

| Regular Figma Make File | Figma Make Template |
|------------------------|---------------------|
| User starts from scratch | User starts with everything configured |
| Must install packages manually | Packages pre-installed |
| Must add guidelines manually | Guidelines already included |
| No example code | Includes starter examples |
| Private to creator | Shared with team/organization |

## The Three-Part System

Understanding how the pieces fit together is crucial:

```
┌─────────────────────────────────────────────────────┐
│  1. NPM Package (@discourser/design-system)         │
│     • React components (Button, Card, Input, etc.)  │
│     • Panda CSS styled-system                       │
│     • TypeScript definitions                        │
│     • Published to npm registry                     │
│     • Installed via: npm install                    │
└─────────────────────────────────────────────────────┘
                       ↓ Used by
┌─────────────────────────────────────────────────────┐
│  2. Guidelines (Markdown Documentation)             │
│     • How to use components                         │
│     • Design token reference                        │
│     • Best practices and patterns                   │
│     • DO/DON'T examples                             │
│     • Lives in guidelines/ folder                   │
└─────────────────────────────────────────────────────┘
                       ↓ Combined in
┌─────────────────────────────────────────────────────┐
│  3. Figma Make Template (Pre-configured File)       │
│     • Package installed in package.json             │
│     • Guidelines copied to guidelines/ folder       │
│     • Example code in src/                          │
│     • Ready-to-use configuration                    │
│     • Published as shareable template               │
└─────────────────────────────────────────────────────┘
```

## How Guidelines Work in Figma Make

### The AI Learning Process

Figma Make's AI reads guidelines to understand your design system:

1. **User asks:** "Create a login form"
2. **AI reads:** `guidelines/Guidelines.md` → "Read these in order..."
3. **AI reads:** `guidelines/overview-components.md` → "Available components: Button, Input..."
4. **AI reads:** `guidelines/components/button.md` → "Button has 5 variants..."
5. **AI reads:** `guidelines/components/input.md` → "Input requires label prop..."
6. **AI generates:**
   ```tsx
   <form>
     <Input label="Email" type="email" />
     <Input label="Password" type="password" />
     <Button variant="filled">Log In</Button>
   </form>
   ```

### Why Guidelines Are Essential

Without guidelines, the AI will:
❌ Use native HTML elements instead of design system components
❌ Use raw color values instead of semantic tokens
❌ Create inconsistent component usage
❌ Miss accessibility requirements
❌ Not follow your design patterns

With guidelines, the AI will:
✅ Use design system components correctly
✅ Apply semantic tokens (primary, onPrimary, etc.)
✅ Follow M3 patterns and best practices
✅ Include proper accessibility attributes
✅ Generate production-ready code

## Where Everything Lives

### NPM Package (Published to npm)
```
@discourser/design-system/
├── dist/                    # Compiled components
├── styled-system/           # Panda CSS output
├── package.json
└── README.md
```

**Lives:** npm registry (`registry.npmjs.org`)
**Accessed:** Via `npm install @discourser/design-system`

### Guidelines (In Your Repository)
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

**Lives:** Your repository (`/guidelines` folder)
**Accessed:** Manually copied into Figma Make files

### Figma Make Template (In Figma Cloud)
```
Figma Make File (template)
├── src/
│   ├── App.tsx              # Example app
│   └── components/          # Example components
├── guidelines/              # Copied from repository
│   ├── Guidelines.md
│   └── ...
├── package.json             # Lists @discourser/design-system
├── node_modules/            # Installed packages
└── vite.config.ts
```

**Lives:** Figma's cloud (figma.com)
**Accessed:** Via Figma's Resources panel

## The User Journey

### Without a Template
1. User creates new Figma Make file
2. User installs package: `npm install @discourser/design-system`
3. User manually copies all guidelines files
4. User creates starter code from scratch
5. User configures build settings
6. **Total time:** 1-2 hours of setup

### With a Template
1. User clicks "Use template" in Resources
2. New file created with everything pre-configured
3. User can immediately start building
4. **Total time:** 0 minutes of setup

## Key Concepts

### Template Publishing
- Templates are created **inside Figma Make**
- Templates are published **from Figma Make** to your team/organization
- Templates **cannot be created outside** Figma Make and imported

### Template Scope
- **Team template:** Available to specific Figma team
- **Organization template:** Available to entire organization
- **Public template:** Not available for Make (unlike Figma Community designs)

### Template Independence
- Each user gets their **own copy** of the template
- Changes to the template **don't affect** existing copies
- Users can modify their copy however they want

### Template Updates
- You can **update** published templates
- Updates **don't affect** users who already used the template
- Users must **create a new file** from the updated template

## Why Create a Template?

### For Users
✅ Zero setup time
✅ Everything pre-configured
✅ Clear examples to learn from
✅ Best practices built-in
✅ Consistent starting point

### For Your Team
✅ Consistency across projects
✅ Reduced onboarding time
✅ Design system adoption
✅ Quality control
✅ Faster prototyping

### For Figma Make AI
✅ Immediate access to guidelines
✅ Better code generation
✅ Proper component usage
✅ Adherence to design patterns
✅ Accessibility compliance

## What You Cannot Do

❌ **Create a template outside Figma Make**
Templates must be created inside the Figma Make interface.

❌ **Include templates in the npm package**
The npm package contains components, not templates.

❌ **Auto-install templates when package is installed**
Templates must be manually selected/used.

❌ **Update user's existing files**
Once a user creates a file from a template, it's independent.

❌ **Publish templates to npm**
Templates are published within Figma's ecosystem only.

## What's Next?

Now that you understand what templates are and how they work, let's check if you have everything needed to create one.

**Next:** [Prerequisites](./02-prerequisites.md) →
