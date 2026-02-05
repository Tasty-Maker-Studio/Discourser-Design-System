# Merge Protocol

## Critical: Prevent Version Conflicts

### Problem

Merging `dev→main` before the automated version PR causes conflicts and version mismatches.

### Timeline Issue

```
❌ WRONG:
1. Merge feature → dev
2. Immediately merge dev → main (conflict!)
3. Version PR merges to dev (too late)
4. dev and main are now out of sync

✅ CORRECT:
1. Merge feature → dev
2. Wait 1-2 minutes for CI
3. Automated version PR appears on dev
4. Merge version PR → dev
5. NOW merge dev → main
6. CI publishes to npm
```

### How to Check Before Merging dev→main

Before creating a dev→main PR:

```bash
# 1. Check if there are pending changeset PRs
gh pr list --base dev --label "changeset"

# 2. If you see "chore: version packages", WAIT and merge that first
# 3. Only after version PR is merged, create dev→main PR
```

### GitHub Protection (Recommended)

To prevent this automatically, add to dev branch protection:

- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Wait 2 minutes after last push before allowing merge

### Manual Versioning - DON'T DO IT

❌ Never run `pnpm changeset version` manually
✅ Only create changeset files: `pnpm changeset` (without "version")

The CI workflow handles versioning automatically.
