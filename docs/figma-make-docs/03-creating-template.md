# Creating Your Template File

This guide walks you through creating a Figma Make template step-by-step.

## Overview

**Time Required:** 1-2 hours (first time)

**Steps:**
1. Create a new Figma Make file
2. Install the design system package
3. Verify installation
4. Add guidelines (covered in next document)
5. Add example code (covered in separate document)
6. Test the setup
7. Publish as template (covered in separate document)

## Step 1: Create a New Figma Make File

### 1.1 Access Figma Make

1. Go to https://figma.com/
2. Log in with your Figma account
3. You should see your files dashboard

### 1.2 Create New File

**Option A: From Dashboard**
1. Click **Create new** (top-left or center)
2. Select **Figma Make file**
3. Wait for the file to load (may take 10-30 seconds)

**Option B: Direct URL**
1. Navigate to: https://figma.com/make
2. Click **New file** or **Create new**

### 1.3 Name Your File

1. Click on the file name at the top (default: "Untitled")
2. Rename to: `Discourser Design System Template`
3. Press Enter to save

**💡 Tip:** Use a clear, descriptive name. This will be visible when published as a template.

## Step 2: Understand the Figma Make Interface

Before proceeding, familiarize yourself with the interface:

```
┌─────────────────────────────────────────────────────┐
│  Figma Make Interface                               │
├─────────────────────────────────────────────────────┤
│  Top Bar                                            │
│  ├── File name                                      │
│  ├── Share button (for publishing template)         │
│  └── Preview button (test your app)                │
├─────────────────────────────────────────────────────┤
│  Left Sidebar                                       │
│  ├── Chat (AI assistant)                           │
│  ├── Code (file explorer)                          │
│  └── Assets (design assets)                        │
├─────────────────────────────────────────────────────┤
│  Main Area                                          │
│  ├── Code editor (top/left)                        │
│  └── Preview (bottom/right)                        │
└─────────────────────────────────────────────────────┘
```

**Key Sections:**
- **Chat:** Where you talk to the AI
- **Code:** Where you view/edit files
- **Preview:** Where you see the running app

## Step 3: Install the Design System Package

You have two methods to install the package. Choose one:

### Method A: Using AI Chat (Recommended)

1. Click **Chat** in the left sidebar
2. Type the following message:
   ```
   install @discourser/design-system
   ```
3. Press Enter
4. Wait for the AI to install the package (10-30 seconds)
5. Check for confirmation message

**Expected response:**
> "I've installed @discourser/design-system for you."

### Method B: Manual Installation

1. Click **Code** in the left sidebar
2. Find and click **package.json**
3. Locate the `"dependencies"` section
4. Add the package:
   ```json
   {
     "dependencies": {
       "react": "^19.0.0",
       "react-dom": "^19.0.0",
       "@discourser/design-system": "^0.1.7"
     }
   }
   ```
5. Save the file (Cmd+S / Ctrl+S)
6. Wait for automatic installation

**💡 Tip:** Method A (AI Chat) is easier and less error-prone.

## Step 4: Verify Package Installation

### 4.1 Check package.json

1. Click **Code** → **package.json**
2. Verify `@discourser/design-system` appears in dependencies:
   ```json
   "@discourser/design-system": "^0.1.7"
   ```

### 4.2 Check node_modules

1. In the Code panel, expand **node_modules/**
2. Look for **@discourser/** folder
3. Expand it to find **design-system/**

**If you see the folder:** ✅ Installation successful!
**If you don't see it:** ⚠️ Try reinstalling or check the console for errors.

### 4.3 Test Import

1. Click **Code** → **src/** → **App.tsx**
2. At the top of the file, add:
   ```tsx
   import { Button } from '@discourser/design-system';
   ```
3. Check for TypeScript errors
4. If no red squiggles appear: ✅ Package accessible!

## Step 5: Create Basic Test Component

Let's verify the design system works by creating a simple test:

### 5.1 Edit App.tsx

1. Click **Code** → **src/** → **App.tsx**
2. Replace the entire contents with:
   ```tsx
   import { Button, Card } from '@discourser/design-system';

   export default function App() {
     return (
       <div style={{ padding: '2rem' }}>
         <Card variant="elevated">
           <div style={{ padding: '1.5rem' }}>
             <h1>Discourser Design System</h1>
             <p>Template is working!</p>
             <Button variant="filled">Test Button</Button>
           </div>
         </Card>
       </div>
     );
   }
   ```
3. Save the file (Cmd+S / Ctrl+S)

### 5.2 Preview the App

1. Click **Preview** button (top-right)
2. Wait for the app to compile and load
3. You should see:
   - A white page with padding
   - An elevated card
   - "Discourser Design System" heading
   - "Template is working!" text
   - A blue filled button labeled "Test Button"

**If you see this:** ✅ Design system is working!
**If you see errors:** ⚠️ See troubleshooting below.

## Step 6: Verify Styles are Loading

### 6.1 Check Button Styling

The Button component should have:
- ✅ Blue/green primary color background
- ✅ White text
- ✅ Rounded corners (fully rounded pill shape)
- ✅ Padding on left and right

**If button looks like plain HTML:**
⚠️ Styles may not be loading. See troubleshooting.

### 6.2 Check Card Styling

The Card component should have:
- ✅ White or light background
- ✅ Subtle shadow (elevated variant)
- ✅ Rounded corners
- ✅ Proper spacing

## Step 7: Set Up Project Structure

Before adding guidelines, let's ensure proper structure:

### 7.1 Verify Required Folders Exist

Check the Code panel for these folders:
- ✅ `src/` - Source code
- ✅ `public/` - Static assets
- ✅ `guidelines/` - **This is where we'll add documentation**

**If `guidelines/` doesn't exist:**
1. Right-click in the file explorer
2. Select **Create new folder**
3. Name it: `guidelines`

### 7.2 Check Configuration Files

These should exist automatically:
- ✅ `package.json` - Dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `vite.config.ts` - Build config
- ✅ `index.html` - Entry point

## Troubleshooting

### Package Installation Failed

**Symptoms:**
- Package not in package.json
- node_modules/@discourser doesn't exist
- Import errors

**Solutions:**
1. Try the other installation method (AI chat vs manual)
2. Check your internet connection
3. Verify the package exists on npm: `npm view @discourser/design-system`
4. Try reloading the Figma Make file
5. Create a new file and try again

### Styles Not Loading

**Symptoms:**
- Components look like plain HTML
- No colors or styling
- Button is unstyled

**Solutions:**
1. Check that the import is correct: `import { Button } from '@discourser/design-system'`
2. Reload the preview
3. Clear cache and reload
4. Check browser console for CSS errors (F12 → Console)
5. Verify package version is latest: Update package.json to `^0.1.7`

### TypeScript Errors

**Symptoms:**
- Red squiggly lines under imports
- "Cannot find module" errors

**Solutions:**
1. Wait 10-20 seconds for TypeScript to update
2. Reload the Figma Make file
3. Check package.json has the package listed
4. Verify node_modules/@discourser/design-system exists
5. Restart TypeScript server (if option available)

### Preview Not Loading

**Symptoms:**
- Preview shows blank screen
- Preview shows error message
- Preview won't compile

**Solutions:**
1. Check browser console for errors (F12)
2. Check terminal/output panel for build errors
3. Verify App.tsx syntax is correct
4. Try removing recent changes
5. Reload preview

## Checkpoint: What You Should Have Now

Before proceeding to add guidelines, verify:

- [x] Figma Make file created and named
- [x] `@discourser/design-system` installed in package.json
- [x] Package visible in node_modules/
- [x] Test component renders correctly
- [x] Styles are loading properly
- [x] Preview shows working app
- [x] `guidelines/` folder exists

**If all checkboxes are checked:** ✅ Proceed to next step!

**If any are missing:** ⚠️ Review the relevant section above.

## What's Next?

Now that your Figma Make file is set up with the design system package, it's time to add the guidelines that will teach Figma Make's AI how to use it.

**Next:** [Adding Guidelines](./04-adding-guidelines.md) →

**Previous:** [Prerequisites](./02-prerequisites.md) ←
