#!/usr/bin/env bash

# Branch Strategy Validator
# Helps developers check if their current branch setup follows the branching strategy

set -e

echo "🔍 Checking branch strategy compliance..."
echo ""

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $CURRENT_BRANCH"

# Check if on main or dev
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "dev" ]; then
  echo "⚠️  WARNING: You are on the '$CURRENT_BRANCH' branch."
  echo "   Direct commits to this branch are not allowed."
  echo "   Create a feature branch instead:"
  echo ""
  if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "   git checkout dev"
    echo "   git pull origin dev"
  fi
  echo "   git checkout -b feature/my-feature"
  echo ""
  exit 1
fi

# Check branch naming convention
if [[ "$CURRENT_BRANCH" =~ ^(feature|fix|docs|chore|hotfix|release)/ ]]; then
  PREFIX=$(echo "$CURRENT_BRANCH" | cut -d'/' -f1)
  echo "✅ Branch naming: Valid ($PREFIX)"
else
  echo "⚠️  Branch naming: Doesn't follow convention"
  echo "   Recommended prefixes: feature/, fix/, docs/, chore/, hotfix/, release/"
  echo "   Example: feature/add-tooltip"
fi

# Check which branch this was created from
MERGE_BASE_MAIN=$(git merge-base HEAD origin/main 2>/dev/null || echo "")
MERGE_BASE_DEV=$(git merge-base HEAD origin/dev 2>/dev/null || echo "")

if [ -n "$MERGE_BASE_DEV" ]; then
  # Check if this branch is closer to dev
  COMMITS_BEHIND_DEV=$(git rev-list --count HEAD.."origin/dev" 2>/dev/null || echo "0")
  COMMITS_AHEAD_DEV=$(git rev-list --count "origin/dev"..HEAD 2>/dev/null || echo "0")
  
  if [ "$COMMITS_BEHIND_DEV" = "0" ] && [ "$COMMITS_AHEAD_DEV" != "0" ]; then
    echo "✅ Base branch: Created from 'dev' (recommended)"
  else
    echo "⚠️  Base branch: May need rebasing on 'dev'"
    echo "   Run: git fetch && git rebase origin/dev"
  fi
elif [ -n "$MERGE_BASE_MAIN" ]; then
  echo "❌ Base branch: Created from 'main'"
  echo "   Feature branches should be created from 'dev'"
  echo ""
  echo "   To fix this:"
  echo "   1. git fetch origin"
  echo "   2. git rebase origin/dev"
  echo "   or create a new branch from dev and cherry-pick changes"
else
  echo "⚠️  Cannot determine base branch"
fi

echo ""

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo "📝 Uncommitted changes detected"
  git status --short
else
  echo "✅ No uncommitted changes"
fi

echo ""

# Suggest next steps
echo "📋 Next steps:"
echo ""

if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "dev" ]; then
  echo "1. Make your changes and commit"
  echo "2. Run: pnpm changeset (if code changes)"
  echo "3. Push: git push -u origin $CURRENT_BRANCH"
  echo "4. Open PR to 'dev' branch (NOT main)"
  echo ""
  echo "See BRANCHING_STRATEGY.md for complete workflow"
fi

exit 0
