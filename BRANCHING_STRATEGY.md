# Branching Strategy

This document describes the branching strategy for the Discourser Design System.

## Overview

We use a **Git Flow-inspired** branching strategy with two main branches:

- **`main`** - Production-ready code. Only accepts PRs from `dev`.
- **`dev`** - Integration branch for features. Base branch for all feature development.

## Branch Types

### Main Branches

#### `main`
- **Purpose**: Contains production-ready, stable code
- **Protection**: 
  - ✅ Only accepts pull requests from `dev` branch
  - ✅ Requires CI to pass
  - ✅ Triggers automated releases
- **Never commit directly to this branch**

#### `dev`
- **Purpose**: Integration branch for ongoing development
- **Protection**: 
  - ✅ Accepts PRs from feature branches
  - ✅ Requires CI to pass
- **All feature development starts here**

### Supporting Branches

Create these branches from `dev`:

#### Feature Branches
- **Naming**: `feature/<description>`
- **Purpose**: New features or enhancements
- **Example**: `feature/add-tooltip-component`
- **Lifecycle**: 
  ```bash
  git checkout dev
  git pull
  git checkout -b feature/my-feature
  # ... make changes ...
  git push -u origin feature/my-feature
  # Open PR to dev
  ```

#### Fix Branches
- **Naming**: `fix/<description>`
- **Purpose**: Bug fixes
- **Example**: `fix/button-hover-state`

#### Documentation Branches
- **Naming**: `docs/<description>`
- **Purpose**: Documentation updates
- **Example**: `docs/update-readme`

#### Chore Branches
- **Naming**: `chore/<description>`
- **Purpose**: Maintenance tasks, dependencies, tooling
- **Example**: `chore/update-dependencies`

#### Hotfix Branches
- **Naming**: `hotfix/<description>`
- **Purpose**: Urgent fixes for production issues
- **Example**: `hotfix/critical-security-patch`
- **Special**: Can branch from `main` in emergencies, but merge to both `main` and `dev`

## Workflow

### For Feature Development

1. **Start from `dev`:**
   ```bash
   git checkout dev
   git pull origin dev
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/my-feature
   ```

3. **Develop and commit:**
   ```bash
   # Make changes
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Create changeset** (required for code changes):
   ```bash
   pnpm changeset
   ```

5. **Push and open PR to `dev`:**
   ```bash
   git push -u origin feature/my-feature
   # Open PR on GitHub: feature/my-feature → dev
   ```

6. **After PR is merged:**
   ```bash
   git checkout dev
   git pull origin dev
   git branch -d feature/my-feature  # Clean up local branch
   ```

### For Releases

1. **Merge `dev` to `main`:**
   ```bash
   # Create PR: dev → main
   # This triggers the release workflow
   ```

2. **Automated release process:**
   - Changesets bot creates/updates "Version Packages" PR
   - Review changelog
   - Merge "Version Packages" PR
   - Package publishes to npm automatically

## Rules and Enforcement

### Automated Checks

Our CI enforces these rules via GitHub Actions:

✅ **PRs to `main` must come from `dev`**
- Any PR to `main` from a branch other than `dev` will fail CI
- Error message guides you to the correct workflow

✅ **Branch naming conventions (warning only)**
- PRs to `dev` should follow naming conventions
- Shows a warning but doesn't block the PR

### GitHub Settings

Repository maintainers should configure these branch protection rules:

#### For `main` branch:
- [x] Require pull request reviews before merging
- [x] Require status checks to pass (CI, Branch Protection)
- [x] Require branches to be up to date before merging
- [x] Do not allow bypassing the above settings
- [x] Restrict who can push to matching branches

#### For `dev` branch:
- [x] Require status checks to pass (CI)
- [x] Require branches to be up to date before merging

## Examples

### ✅ Correct Workflow

```
feature/add-button → dev → main
fix/hover-bug      → dev → main
docs/update-readme → dev → main
```

### ❌ Incorrect Workflow

```
feature/add-button → main  ❌ (feature branches can't go directly to main)
dev → feature/something    ❌ (wrong direction)
hotfix/bug → dev only      ❌ (hotfixes should also merge to main)
```

## Special Cases

### Hotfixes

For critical production issues:

1. **Branch from `main`:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-fix
   ```

2. **Fix and test:**
   ```bash
   # Make urgent fix
   pnpm changeset
   git commit -m "hotfix: fix critical issue"
   ```

3. **Merge to BOTH branches:**
   ```bash
   # PR 1: hotfix/critical-fix → main
   # PR 2: hotfix/critical-fix → dev
   ```

### Documentation-Only Changes

For pure documentation updates with no code changes:

```bash
git checkout dev
git checkout -b docs/update-guidelines
# Make documentation changes (no changeset needed)
git push -u origin docs/update-guidelines
# PR to dev
```

## Migration Guide

### Setting Up `dev` Branch (First Time)

If your repository doesn't have a `dev` branch yet:

```bash
# From main branch
git checkout main
git pull origin main

# Create dev branch
git checkout -b dev
git push -u origin dev
```

### Updating Existing Feature Branches

If you have feature branches created from `main`:

```bash
# Option 1: Rebase onto dev
git checkout feature/my-feature
git fetch origin
git rebase origin/dev

# Option 2: Create new branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/my-feature-v2
# Cherry-pick or manually apply changes
```

## FAQs

**Q: Why can't I merge my feature branch directly to `main`?**

A: We use `dev` as an integration branch to ensure stability. Features are tested together in `dev` before being released to `main`.

**Q: What if I already created a PR to `main` from a feature branch?**

A: Close the PR and create a new one to `dev` instead:
```bash
# Update your branch to target dev
git checkout feature/my-feature
git push origin feature/my-feature
# Open new PR: feature/my-feature → dev
```

**Q: Can I commit directly to `dev`?**

A: No. Always use pull requests, even for small changes. This ensures CI runs and maintains code quality.

**Q: What happens if I try to violate the branching strategy?**

A: The Branch Protection workflow will fail your PR with a helpful error message explaining the correct process.

**Q: Do I need a changeset for every PR?**

A: Required for code changes. Not needed for:
- Documentation-only updates
- Internal tooling changes that don't affect the published package
- README updates

## Resources

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) - Original branching model
- [GitHub Flow](https://guides.github.com/introduction/flow/) - Simplified alternative
- [Changesets Documentation](https://github.com/changesets/changesets) - Version management

## Questions?

- Check [README.md](./README.md) for contribution guidelines
- See [.github/README.md](./.github/README.md) for workflow documentation
- Open a Discussion for branching questions
