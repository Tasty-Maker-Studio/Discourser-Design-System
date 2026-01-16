# Maintainer Checklist: Enable Branching Strategy

This checklist guides maintainers through activating the branching strategy enforcement.

## Prerequisites

- [ ] You have maintainer/admin access to the repository
- [ ] You have reviewed BRANCHING_STRATEGY.md
- [ ] You have reviewed docs/BRANCH_PROTECTION_SETUP.md

## Steps to Enable

### 1. Create `dev` Branch

- [ ] Checkout and pull latest `main` branch
      ```bash
      git checkout main
      git pull origin main
      ```

- [ ] Create and push `dev` branch
      ```bash
      git checkout -b dev
      git push -u origin dev
      ```

- [ ] Verify `dev` branch exists on GitHub
      - Go to repository → Code → Branch dropdown
      - Should see both `main` and `dev`

### 2. Configure Branch Protection: `main`

Go to: **Settings → Branches → Add rule**

- [ ] Branch name pattern: `main`

#### Pull Request Settings
- [ ] ✅ Require a pull request before merging
- [ ] ✅ Require approvals: `1` (or more)
- [ ] ✅ Dismiss stale pull request approvals when new commits are pushed
- [ ] ✅ Require review from Code Owners (if using CODEOWNERS)

#### Status Check Settings
- [ ] ✅ Require status checks to pass before merging
- [ ] ✅ Require branches to be up to date before merging
- [ ] Add status checks (search and select):
  - [ ] `Test & Build`
  - [ ] `Validate Branching Strategy`

#### Additional Protection
- [ ] ✅ Require conversation resolution before merging
- [ ] ✅ Do not allow bypassing the above settings
- [ ] ✅ Restrict who can push to matching branches
  - [ ] Add: Maintainers team or specific users

#### Optional (Recommended)
- [ ] ✅ Require signed commits
- [ ] ✅ Require linear history

- [ ] Click **Create** or **Save changes**

### 3. Configure Branch Protection: `dev`

Go to: **Settings → Branches → Add rule**

- [ ] Branch name pattern: `dev`

#### Pull Request Settings
- [ ] ✅ Require a pull request before merging
- [ ] ✅ Require approvals: `1` (recommended)

#### Status Check Settings
- [ ] ✅ Require status checks to pass before merging
- [ ] ✅ Require branches to be up to date before merging
- [ ] Add status check:
  - [ ] `Test & Build`

#### Additional Protection
- [ ] ✅ Require conversation resolution before merging

- [ ] Click **Create** or **Save changes**

### 4. Configure GitHub Actions Permissions

Go to: **Settings → Actions → General**

#### Workflow permissions
- [ ] ✅ Read and write permissions

#### Pull Requests
- [ ] ✅ Allow GitHub Actions to create and approve pull requests

- [ ] Click **Save**

### 5. Optional: Set Default Branch

Consider whether `dev` should be the default branch:

**Pros of `dev` as default:**
- New PRs default to `dev` (correct target)
- Clone defaults to `dev` (where work happens)

**Pros of `main` as default:**
- External users expect `main`
- Releases/docs typically reference `main`
- GitHub Pages may use `main`

To change default:
- [ ] Go to **Settings → Branches**
- [ ] Under "Default branch", click switch icon
- [ ] Select `dev` or keep `main`
- [ ] Click **Update**

**Recommendation:** Keep `main` as default for external visibility.

### 6. Test the Configuration

#### Test 1: Feature → Dev (should work)
- [ ] Create test branch from dev
      ```bash
      git checkout dev
      git pull origin dev
      git checkout -b feature/test-workflow
      echo "test" >> test.txt
      git add test.txt
      git commit -m "test: verify workflow"
      git push -u origin feature/test-workflow
      ```
- [ ] Open PR: `feature/test-workflow` → `dev`
- [ ] Verify status check `Test & Build` runs
- [ ] Verify PR can be merged (if approvals configured, get approval first)
- [ ] Merge PR or close without merging

#### Test 2: Feature → Main (should fail)
- [ ] Open PR: `feature/test-workflow` → `main`
- [ ] Verify status check `Validate Branching Strategy` appears
- [ ] Verify it fails with error message about requiring dev branch
- [ ] Read the error message - should be clear and helpful
- [ ] Close the PR

#### Test 3: Dev → Main (should work)
- [ ] Open PR: `dev` → `main`
- [ ] Verify status check `Validate Branching Strategy` passes
- [ ] Verify status check `Test & Build` runs
- [ ] Verify PR can be merged
- [ ] Close the PR (don't merge unless you want to)

#### Test 4: Clean up
- [ ] Delete test branch
      ```bash
      git checkout dev
      git branch -d feature/test-workflow
      git push origin --delete feature/test-workflow
      ```
- [ ] Remove test.txt if it was merged
      ```bash
      git rm test.txt
      git commit -m "chore: remove test file"
      git push origin dev
      ```

### 7. Communicate Changes

- [ ] Announce branching strategy to team
      - Share link to BRANCHING_STRATEGY.md
      - Share link to docs/BRANCHING_QUICK_REFERENCE.md
      - Explain the change in workflow (dev-first)

- [ ] Update any existing documentation
      - Project wikis
      - Onboarding guides
      - Team documentation

- [ ] Handle existing open PRs
      - Review open PRs targeting `main`
      - Ask authors to retarget to `dev` if needed
      - Or merge/close if appropriate

### 8. Monitor and Adjust

First few weeks:
- [ ] Watch for confusion or questions
- [ ] Help developers adjust to new workflow
- [ ] Update documentation based on feedback
- [ ] Consider adjusting approval requirements if needed

## Troubleshooting

### Status checks not appearing

**Issue:** Required status checks don't show up in PR

**Solution:**
1. The checks must run at least once before they can be added as required
2. Open a test PR to trigger the workflows
3. After checks appear, go back to branch protection settings
4. Search for the exact check name and add it
5. Save the rule

### Can't find status check names

**Issue:** Don't know exact name to require

**Solution:**
1. Open any recent PR
2. Scroll to bottom where checks appear
3. Note the exact names (case-sensitive)
4. Use those names in branch protection settings

### Developers can't push to dev

**Issue:** Even with PR merged, can't push to dev

**Solution:**
1. This is expected - dev is protected too
2. All changes go through PRs
3. If direct push is needed (rare), temporarily disable protection
4. Make push, then re-enable protection

### Changesets bot issues

**Issue:** Changesets bot can't create PRs

**Solution:**
1. Verify Actions permissions: Settings → Actions → General
2. Enable "Allow GitHub Actions to create and approve pull requests"
3. Check that release.yml has correct permissions:
   ```yaml
   permissions:
     contents: write
     pull-requests: write
     id-token: write
   ```

## Verification

After completing all steps:

- [ ] ✅ `dev` branch exists
- [ ] ✅ `main` branch is protected
- [ ] ✅ `dev` branch is protected
- [ ] ✅ GitHub Actions permissions configured
- [ ] ✅ Test 1 passed (feature → dev works)
- [ ] ✅ Test 2 passed (feature → main fails)
- [ ] ✅ Test 3 passed (dev → main works)
- [ ] ✅ Team has been notified
- [ ] ✅ Documentation is updated

## Success!

If all checkboxes are checked, the branching strategy is now active! 🎉

## Resources

- [BRANCHING_STRATEGY.md](../BRANCHING_STRATEGY.md) - Strategy documentation
- [docs/BRANCH_PROTECTION_SETUP.md](../docs/BRANCH_PROTECTION_SETUP.md) - Detailed setup
- [docs/BRANCHING_QUICK_REFERENCE.md](../docs/BRANCHING_QUICK_REFERENCE.md) - Quick guide
- [docs/BRANCHING_IMPLEMENTATION_SUMMARY.md](../docs/BRANCHING_IMPLEMENTATION_SUMMARY.md) - What was implemented

## Questions?

If you encounter issues not covered here:
1. Check docs/BRANCH_PROTECTION_SETUP.md
2. Review GitHub Actions workflow logs
3. Open an issue or discussion
