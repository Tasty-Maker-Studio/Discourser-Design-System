#!/usr/bin/env bash

set -e  # Exit on error

echo ""
echo "🔍 Running verification checks before push..."
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track if any step fails
FAILED=0

run_step() {
  local step_name=$1
  local command=$2

  echo -e "${BLUE}▶ ${step_name}...${NC}"

  if eval "$command"; then
    echo -e "${GREEN}✓ ${step_name} passed${NC}"
    echo ""
  else
    echo -e "${RED}✗ ${step_name} failed${NC}"
    echo ""
    FAILED=1
    return 1
  fi
}

# Step 1: Check for uncommitted changes
echo -e "${YELLOW}Checking working directory...${NC}"
if [[ -n $(git status -s) ]]; then
  echo -e "${YELLOW}⚠ You have uncommitted changes${NC}"
  git status -s
  echo ""
else
  echo -e "${GREEN}✓ Working directory clean${NC}"
  echo ""
fi

# Step 2: Regenerate Panda CSS types (only if preset changed)
if git diff --name-only HEAD 2>/dev/null | grep -q "src/preset/"; then
  run_step "Regenerating Panda types" "pnpm build:panda" || true
else
  echo -e "${GREEN}✓ No preset changes — skipping Panda regen${NC}"
  echo ""
fi

# Step 3: Type checking
run_step "Type checking" "pnpm typecheck" || true

# Step 4: Linting
run_step "Linting" "pnpm lint" || true

# Step 5: Tests
run_step "Running tests" "pnpm test run" || true

# NOTE: Build is intentionally NOT run here.
# Full build (pnpm build) runs in GitHub Actions CI on every PR.
# Typecheck catches all build-breaking issues locally.
# Running build locally on every push adds ~2 minutes with no quality benefit.

# Summary
echo "=============================================="
if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All verification checks passed!${NC}"
  echo -e "${GREEN}✓ Safe to push${NC}"
  exit 0
else
  echo -e "${RED}✗ Some verification checks failed${NC}"
  echo -e "${RED}✗ Please fix errors before pushing${NC}"
  exit 1
fi
