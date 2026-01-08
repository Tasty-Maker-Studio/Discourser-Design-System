# Release Process Documentation

## Overview
This project uses an automated release workflow with **Changesets** for versioning and **npm Trusted Publishing (OIDC)** for publishing packages. **No NPM tokens are required.**

## How It Works

### 1. Making Changes
When working on components and stories, you should:
- Create feature branches
- Make your changes to components in `src/`
- Add/update Storybook stories
- Add a changeset if your changes should trigger a release

### 2. Adding a Changeset
When you want your changes to be included in the next release:

```bash
pnpm changeset
```

This will prompt you to:
- Select the type of change (major, minor, patch)
- Write a description of the change

This creates a `.md` file in `.changeset/` directory.

### 3. Automated Release Workflow

When changes are merged to `main`:

1. **GitHub Actions checks for changesets**
   - If changesets exist, it runs `pnpm exec changeset version`
   - This updates `package.json` version and `CHANGELOG.md`
   - Creates a PR with the version changes to `changeset-release/main` branch

2. **When version PR is merged to main**
   - Builds the package
   - Publishes to npm using OIDC (no token needed!)
   - Creates a git tag (e.g., `v0.2.1`)

## Critical Files - DO NOT MODIFY

The following files control the release process and should **NEVER** be modified when working on components:

### Protected Files
- `.github/workflows/release.yml` - GitHub Actions workflow
- `package.json` - Package configuration (version is auto-managed)
- `.changeset/config.json` - Changeset configuration
- `tsconfig.json` - TypeScript build configuration
- `tsup.config.ts` - Build bundler configuration

### Protections in Place

1. **CODEOWNERS** - Requires admin approval for changes to critical files
2. **Pre-commit hook** - Interactive warning if you try to commit changes to critical files
3. **Lint-staged** - Automatically runs linting and formatting on staged files
4. **Type checking** - Runs `tsc --noEmit` before every commit
5. **Warning comments** - Critical files have clear warnings at the top

## Pre-commit Checks

Every commit triggers:
1. **Critical file check** - Warns if modifying protected files
2. **ESLint** - Auto-fixes linting issues in `.ts` and `.tsx` files
3. **Prettier** - Auto-formats code
4. **Type checking** - Ensures no TypeScript errors

## Why We Don't Use changesets/action

This workflow previously used `changesets/action@v1` but it caused persistent PATH resolution issues after `node_modules` was removed from git tracking (commit 9035f305).

**Current approach:**
- Run `pnpm exec changeset version` directly via bash
- Avoids PATH resolution issues
- Simpler and more reliable

## Troubleshooting

### If the workflow fails:

1. **Check the GitHub Actions logs** to see the specific error
2. **Review recent changes** to critical files:
   ```bash
   git log --oneline .github/workflows/release.yml
   git log --oneline package.json
   ```
3. **Do NOT modify workflow files** without understanding the full context
4. **Consult this document** and the commit history before making changes

### Common Issues

- **"changeset: not found"** - This was solved by running `pnpm exec changeset version` directly
- **OIDC errors** - Ensure Node 24+ and npm 11.5+ are being used
- **Publishing fails** - Check that `id-token: write` permission is set
- **Pre-commit hook fails** - Fix linting/type errors before committing

### Bypassing Pre-commit Hooks

In rare cases where you need to bypass hooks (NOT recommended):
```bash
git commit --no-verify -m "your message"
```

**WARNING:** Only use this if you know what you're doing. You're bypassing important safety checks.

## Important Notes

- ✅ Publishing uses OIDC (Trusted Publishing) - **NO NPM tokens required**
- ✅ Node 24+ is required for OIDC support
- ✅ Do NOT set `registry-url` in setup-node (conflicts with OIDC)
- ✅ Changesets are run directly via bash, not through the action
- ✅ Pre-commit hooks run linting, formatting, and type checking automatically

## When Working on Components

You should **ONLY** be modifying:
- `src/` - Component source code
- `*.stories.tsx` - Storybook stories
- `scripts/` - Utility scripts (for tokens, etc.)
- Documentation files (README.md, component docs)

You should **NEVER** need to touch:
- `.github/workflows/` - CI/CD workflows
- Core build configuration files
- Package management files

**If you find yourself needing to modify these files while working on components, STOP and ask why.**

## Development Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/my-component
   ```

2. Make your changes
   - Add components to `src/`
   - Create stories in `*.stories.tsx`
   - Update documentation as needed

3. Add a changeset (if needed)
   ```bash
   pnpm changeset
   ```

4. Commit your changes
   - Pre-commit hooks will run automatically
   - Fix any linting or type errors
   - Respond to critical file warnings (if any)

5. Push and create PR
   ```bash
   git push -u origin feature/my-component
   ```

6. After PR is merged
   - Version PR is created automatically
   - Merge version PR to publish to npm

---

Last updated: 2025-01-07
After 3 hours of debugging, please don't modify the workflow files unnecessarily! 😅
