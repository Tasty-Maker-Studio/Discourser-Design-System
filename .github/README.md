# GitHub Workflows

This directory contains automated workflows for continuous integration and deployment.

## Workflows

### CI (`ci.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**What it does:**
1. Runs on Node.js 20.x
2. Installs dependencies with pnpm
3. Runs linting (continues on error)
4. Runs TypeScript type checking
5. Runs all tests
6. Builds Panda CSS styled-system
7. Builds the library (dist/)
8. Builds Storybook documentation
9. Uploads build artifacts (retained for 7 days)

**Status:** Automatically runs on every PR and push to main.

---

### Publish (`publish.yml`)

**Triggers:**
- GitHub Release creation
- Manual workflow dispatch

**What it does:**

#### Job 1: Publish to npm
1. Runs tests and type checking
2. Builds the complete package
3. Publishes to npm registry with public access

#### Job 2: Deploy Storybook
1. Builds Storybook documentation
2. Deploys to GitHub Pages

**Requirements:**

#### NPM Publishing
You need to configure an NPM access token:

1. Create an npm access token at https://www.npmjs.com/settings/[username]/tokens
2. Add it to GitHub repository secrets as `NPM_TOKEN`:
   - Go to: Repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token (starts with `npm_`)

#### GitHub Pages
Enable GitHub Pages in repository settings:

1. Go to: Repository Settings → Pages
2. Source: GitHub Actions
3. The workflow will automatically deploy to `https://[username].github.io/[repo-name]/`

---

## How to Publish a New Version

### Option 1: GitHub Release (Recommended)

1. **Update version in package.json**:
   ```bash
   npm version patch  # or minor, or major
   ```

2. **Commit and push**:
   ```bash
   git add package.json
   git commit -m "Bump version to x.x.x"
   git push
   ```

3. **Create a GitHub Release**:
   - Go to: Repository → Releases → Draft a new release
   - Click "Choose a tag" and create a new tag (e.g., `v0.1.1`)
   - Title: `v0.1.1`
   - Description: Release notes (what changed)
   - Click "Publish release"

4. **Workflow runs automatically**:
   - Publishes package to npm
   - Deploys Storybook to GitHub Pages

### Option 2: Manual Dispatch

1. Go to: Repository → Actions → Publish workflow
2. Click "Run workflow"
3. Select branch (usually `main`)
4. Click "Run workflow"

---

## Local Testing

Test the workflows locally before pushing:

### Test CI Steps
```bash
# Lint
pnpm lint

# Type check
pnpm typecheck

# Run tests
pnpm test --run

# Build everything
pnpm build
pnpm build:storybook
```

### Test Publish Steps
```bash
# Dry run publish (doesn't actually publish)
pnpm publish --dry-run

# Check what files will be included
pnpm pack
tar -tzf tastymakers-design-system-*.tgz
rm tastymakers-design-system-*.tgz
```

---

## Troubleshooting

### CI Workflow Failing

**Linting errors:**
- Run `pnpm lint` locally to see errors
- Lint is set to `continue-on-error: true`, so it won't block the build

**Type errors:**
- Run `pnpm typecheck` locally
- Fix TypeScript errors before pushing

**Test failures:**
- Run `pnpm test --run` locally
- All tests must pass for CI to succeed

**Build failures:**
- Run `pnpm build` locally
- Check that styled-system is generated correctly

### Publish Workflow Failing

**NPM_TOKEN not set:**
- Verify token is added to repository secrets
- Token must have "Automation" access level

**Version already published:**
- You can't republish the same version to npm
- Bump version in package.json first

**GitHub Pages not deploying:**
- Check Pages is enabled in repository settings
- Source should be "GitHub Actions"
- Wait a few minutes for DNS propagation

---

## Security Notes

- Never commit npm tokens to the repository
- Tokens are stored securely in GitHub Secrets
- Publishing uses OIDC (OpenID Connect) for enhanced security
- Workflows run in isolated environments

---

## Workflow Badges

Add these to your README.md to show workflow status:

```markdown
[![CI](https://github.com/tastymakers/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/tastymakers/design-system/actions/workflows/ci.yml)
[![Publish](https://github.com/tastymakers/design-system/actions/workflows/publish.yml/badge.svg)](https://github.com/tastymakers/design-system/actions/workflows/publish.yml)
```
