# Branching Quick Reference

## TL;DR

```bash
# Start new work
git checkout dev
git pull origin dev
git checkout -b feature/my-feature

# Make changes, then
pnpm changeset  # if code changes
git add .
git commit -m "feat: my feature"
git push -u origin feature/my-feature

# Open PR to 'dev' (NOT main!)
```

## Branch Flow

```
feature/add-button ──→ dev ──→ main ──→ npm publish
       ↑               ↑        ↑
    create PR      merge PR  release
    from dev       to dev     from dev
```

## Commands

| Task | Command |
|------|---------|
| **Check current branch** | `pnpm check-branch` |
| **Start feature** | `git checkout dev && git pull && git checkout -b feature/name` |
| **Start fix** | `git checkout dev && git pull && git checkout -b fix/name` |
| **Add changeset** | `pnpm changeset` |
| **Test locally** | `pnpm test && pnpm build` |
| **Check types** | `pnpm typecheck` |
| **Lint** | `pnpm lint` |

## Branch Naming

| Prefix | Use Case | Example |
|--------|----------|---------|
| `feature/` | New features | `feature/add-tooltip` |
| `fix/` | Bug fixes | `fix/button-hover` |
| `docs/` | Documentation | `docs/update-readme` |
| `chore/` | Maintenance | `chore/update-deps` |
| `hotfix/` | Urgent fixes | `hotfix/security-patch` |

## Rules

✅ **DO:**
- Create branches from `dev`
- Open PRs to `dev`
- Use conventional commit messages
- Add changeset for code changes
- Wait for CI to pass

❌ **DON'T:**
- Create branches from `main`
- Open PRs to `main` (unless you're merging `dev`)
- Push directly to `main` or `dev`
- Skip CI checks
- Forget changesets

## Common Scenarios

### Starting a new feature
```bash
git checkout dev
git pull origin dev
git checkout -b feature/my-feature
# ... work ...
pnpm changeset
git push -u origin feature/my-feature
# Open PR: feature/my-feature → dev
```

### Fixing a bug
```bash
git checkout dev
git pull origin dev
git checkout -b fix/bug-description
# ... fix ...
pnpm changeset
git push -u origin fix/bug-description
# Open PR: fix/bug-description → dev
```

### Updating documentation
```bash
git checkout dev
git pull origin dev
git checkout -b docs/update-readme
# ... edit docs ...
# No changeset needed for docs-only
git push -u origin docs/update-readme
# Open PR: docs/update-readme → dev
```

### Hotfix (urgent production fix)
```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue
# ... fix ...
pnpm changeset
git push -u origin hotfix/critical-issue
# Open TWO PRs:
# 1. hotfix/critical-issue → main
# 2. hotfix/critical-issue → dev
```

## PR Checklist

Before opening a PR:

- [ ] Branch created from `dev`
- [ ] PR targets `dev` branch (not `main`)
- [ ] Tests pass locally (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Types check (`pnpm typecheck`)
- [ ] Changeset added (if code changes)
- [ ] Meaningful commit messages

## Help

| Issue | Solution |
|-------|----------|
| Can't open PR to main | Good! Open to `dev` instead |
| CI failing | Run `pnpm test && pnpm build` locally |
| Wrong base branch | Create new branch from `dev` |
| Forgot changeset | Run `pnpm changeset` and commit |
| Branch name warning | Not critical, but consider renaming |

## Full Documentation

- [BRANCHING_STRATEGY.md](../BRANCHING_STRATEGY.md) - Complete guide
- [README.md](../README.md) - Contributing section
- [.github/README.md](../.github/README.md) - CI/CD workflows

---

**Remember:** `dev` is your friend! Always branch from `dev`, always PR to `dev`.
