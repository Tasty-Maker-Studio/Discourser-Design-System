# Branch Protection Setup Guide

This guide is for **repository maintainers** to configure GitHub branch protection rules.

## Overview

The Discourser Design System uses a Git Flow-inspired branching strategy with automated enforcement via GitHub Actions. However, some settings must be configured manually in GitHub.

## Required GitHub Settings

### 1. Create the `dev` Branch

If the `dev` branch doesn't exist yet:

1. Go to the repository on GitHub
2. Click the branch dropdown (currently shows "main")
3. Type "dev" in the search box
4. Click "Create branch: dev from main"

Or via command line:
```bash
git checkout main
git pull origin main
git checkout -b dev
git push -u origin dev
```

### 2. Configure Branch Protection for `main`

1. Go to **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Configure the following settings:

#### Require pull request reviews
- [x] **Require a pull request before merging**
- [x] Require approvals: `1` (or more, as preferred)
- [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require review from Code Owners (if using CODEOWNERS)

#### Require status checks
- [x] **Require status checks to pass before merging**
- [x] Require branches to be up to date before merging
- Add required status checks:
  - `Test & Build` (from CI workflow)
  - `Validate Branching Strategy` (from branch-protection workflow)

#### Additional settings
- [x] **Require conversation resolution before merging**
- [x] **Do not allow bypassing the above settings**
- [x] **Restrict who can push to matching branches**
  - Add: Maintainers only (or specific team)

#### Optional but recommended
- [x] Require signed commits (for extra security)
- [x] Require linear history (prevents merge commits)

4. Click **Create** or **Save changes**

### 3. Configure Branch Protection for `dev`

1. Go to **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `dev`
3. Configure the following settings:

#### Require pull request reviews
- [x] **Require a pull request before merging**
- [x] Require approvals: `1` (recommended)
- [ ] Dismiss stale approvals (optional - allows faster iteration)

#### Require status checks
- [x] **Require status checks to pass before merging**
- [x] Require branches to be up to date before merging
- Add required status checks:
  - `Test & Build` (from CI workflow)

#### Additional settings
- [x] **Require conversation resolution before merging**
- [ ] Do not allow bypassing (optional - maintainers may need flexibility)

4. Click **Create** or **Save changes**

### 4. Set Default Branch (Optional)

For a Git Flow strategy, you may want `dev` as the default branch:

1. Go to **Settings** → **Branches**
2. Under "Default branch", click the switch icon
3. Select `dev`
4. Click **Update**

**Consideration:** Keeping `main` as default may be better for:
- External contributors (they expect `main`)
- Releases (main = production)
- GitHub Pages (if deployed from main)

Choose based on your team's workflow preference.

### 5. Configure GitHub Actions Permissions

Ensure workflows have the necessary permissions:

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions":
   - [x] Read and write permissions (for creating version PRs)
3. Under "Allow GitHub Actions to create and approve pull requests":
   - [x] Enable (for Changesets bot)

## Verification

After setup, test the configuration:

### Test 1: Feature branch to `dev` (should work)
```bash
git checkout dev
git pull origin dev
git checkout -b feature/test-workflow
echo "test" >> test.txt
git add test.txt
git commit -m "test: verify workflow"
git push -u origin feature/test-workflow
# Open PR: feature/test-workflow → dev
# Should pass CI and be mergeable
```

### Test 2: Feature branch to `main` (should fail)
```bash
# Using the same feature branch
# Open PR: feature/test-workflow → main
# Should fail with "Branch Protection" check
# Error: "PRs to 'main' must come from 'dev' branch only"
```

### Test 3: `dev` to `main` (should work)
```bash
# Open PR: dev → main
# Should pass Branch Protection check
# Should pass CI
# Should be mergeable (after approval if required)
```

## Troubleshooting

### "Branch Protection" check not appearing

**Cause:** The workflow only runs on PRs to `main`.

**Solution:** The branch-protection.yml workflow is correctly configured. Make sure you're creating a PR to `main` (not just pushing).

### Status checks not required

**Cause:** Branch protection rule not saved or status check names don't match.

**Solution:** 
1. Check the exact status check names in a recent PR
2. Go to branch protection settings
3. Re-add the status checks with exact names
4. Save the rule

### Maintainers can't push to `dev`

**Cause:** Branch protection is too strict.

**Solution:** 
1. Go to `dev` branch protection settings
2. Under "Restrict who can push":
   - Add maintainers team
   - Or disable this restriction for `dev`

### Changesets bot can't create PRs

**Cause:** GitHub Actions permissions are insufficient.

**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Enable "Allow GitHub Actions to create and approve pull requests"
3. Ensure workflow has `contents: write` and `pull-requests: write` permissions

## Maintenance

### Updating Status Check Names

If you rename workflows or jobs:

1. Update branch protection rules to use new status check names
2. Check a recent PR to see exact status check names
3. Update both `main` and `dev` branch protection rules

### Adding New Required Checks

When adding new CI checks:

1. Run the check on at least one PR first
2. Note the exact status check name
3. Add it to branch protection rules
4. Document in this guide

### Reviewing Rules

Periodically review and update rules:

- Are approval requirements still appropriate?
- Are status checks still relevant?
- Is the branching strategy working for the team?

## Additional Resources

- [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)
- [BRANCHING_STRATEGY.md](../BRANCHING_STRATEGY.md) - Developer guide
- [.github/workflows/branch-protection.yml](../.github/workflows/branch-protection.yml) - Workflow definition

## Questions?

For questions about:
- **Branching strategy**: See [BRANCHING_STRATEGY.md](../BRANCHING_STRATEGY.md)
- **Workflows**: See [.github/README.md](../.github/README.md)
- **This setup**: Open a maintainer discussion or issue
