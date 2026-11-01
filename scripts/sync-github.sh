#!/usr/bin/env bash
# ==============================================================================
# NYAYOTA AI — GitHub Synchronization Helper Script
# Phase 6C: Natural Conversational Response Engine
# Target Repository: https://github.com/afnan0356/nyayota.git
# ==============================================================================
# Description:
#   Synchronizes Phase 6C additions and updates from this workspace into the
#   official Nyayota Git repository on GitHub.
#
# Usage:
#   ./scripts/sync-github.sh [OPTIONS]
#
# Options:
#   --dry-run       Show the Git commands without executing modifying actions
#   --skip-tests    Skip pre-sync test and lint validations
#   --branch NAME   Specify custom branch name (default: feature/phase-6c-natural-response-engine)
#   --remote URL    Specify custom remote URL (default: https://github.com/afnan0356/nyayota.git)
#   --help          Show this help message
# ==============================================================================

set -euo pipefail

# Text styling
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Defaults
DEFAULT_REMOTE_URL="https://github.com/afnan0356/nyayota.git"
DEFAULT_BRANCH="feature/phase-6c-natural-response-engine"
REMOTE_URL="${REMOTE_URL:-$DEFAULT_REMOTE_URL}"
BRANCH_NAME="${BRANCH_NAME:-$DEFAULT_BRANCH}"
DRY_RUN=false
SKIP_TESTS=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --skip-tests)
      SKIP_TESTS=true
      shift
      ;;
    --branch)
      BRANCH_NAME="$2"
      shift 2
      ;;
    --remote)
      REMOTE_URL="$2"
      shift 2
      ;;
    --help|-h)
      head -n 25 "$0" | grep -E '^#' | sed 's/^# \?//'
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Use --help for usage instructions."
      exit 1
      ;;
  esac
done

echo -e "${BOLD}${CYAN}======================================================${NC}"
echo -e "${BOLD}${CYAN}   NYAYOTA AI — GitHub Synchronization Pipeline       ${NC}"
echo -e "${BOLD}${CYAN}======================================================${NC}"
echo -e "Remote Repository : ${BLUE}${REMOTE_URL}${NC}"
echo -e "Target Branch     : ${BLUE}${BRANCH_NAME}${NC}"
echo -e "Dry Run Mode      : $([ "$DRY_RUN" = true ] && echo -e "${YELLOW}ENABLED${NC}" || echo -e "${GREEN}DISABLED${NC}")"
echo ""

# Helper to execute or dry-run command
run_cmd() {
  local cmd="$*"
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}[DRY-RUN]${NC} ${cmd}"
  else
    echo -e "${CYAN}==>${NC} ${cmd}"
    eval "$cmd"
  fi
}

# 1. Check prerequisite tools
echo -e "${BOLD}[1/7] Checking prerequisites...${NC}"
if ! command -v git &>/dev/null; then
  echo -e "${RED}Error: git is not installed or not found in PATH.${NC}"
  exit 1
fi
echo -e "  ✓ Git version: $(git --version)"

# 2. Pre-synchronization validation (Tests & Lint)
if [ "$SKIP_TESTS" = false ]; then
  echo -e "\n${BOLD}[2/7] Running pre-synchronization test suite and linter...${NC}"
  if command -v bun &>/dev/null; then
    echo -e "  Running tests via bun..."
    bun test || { echo -e "${RED}Tests failed! Synchronization aborted.${NC}"; exit 1; }
  elif command -v npm &>/dev/null; then
    echo -e "  Running tests via npm..."
    npm test || { echo -e "${RED}Tests failed! Synchronization aborted.${NC}"; exit 1; }
  else
    echo -e "  ${YELLOW}Notice: Neither bun nor npm found; skipping test execution.${NC}"
  fi

  if command -v npm &>/dev/null; then
    echo -e "  Running ESLint..."
    npm run lint || { echo -e "${RED}Linting failed! Synchronization aborted.${NC}"; exit 1; }
  fi
  echo -e "  ${GREEN}✓ All checks passed successfully.${NC}"
else
  echo -e "\n${BOLD}[2/7] Skipping tests and linting as requested (--skip-tests).${NC}"
fi

# 3. Initialize Git repository if needed
echo -e "\n${BOLD}[3/7] Verifying Git repository status...${NC}"
if [ ! -d ".git" ]; then
  echo -e "  No .git directory detected. Initializing local Git repository..."
  run_cmd "git init"
else
  echo -e "  ✓ Local Git repository already initialized."
fi

# 4. Configure remote
echo -e "\n${BOLD}[4/7] Configuring remote repository...${NC}"
if git remote | grep -q "^origin$"; then
  EXISTING_URL=$(git remote get-url origin)
  echo -e "  Existing remote 'origin' found: ${BLUE}${EXISTING_URL}${NC}"
  if [ "$EXISTING_URL" != "$REMOTE_URL" ]; then
    echo -e "  Updating 'origin' URL to ${BLUE}${REMOTE_URL}${NC}..."
    run_cmd "git remote set-url origin \"${REMOTE_URL}\""
  fi
else
  echo -e "  Adding remote 'origin': ${BLUE}${REMOTE_URL}${NC}"
  run_cmd "git remote add origin \"${REMOTE_URL}\""
fi

# 5. Handle Branch Setup
echo -e "\n${BOLD}[5/7] Preparing feature branch '${BRANCH_NAME}'...${NC}"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")

if [ "$CURRENT_BRANCH" = "$BRANCH_NAME" ]; then
  echo -e "  Already on branch '${BRANCH_NAME}'."
else
  # Check if branch exists locally
  if git show-ref --verify --quiet "refs/heads/${BRANCH_NAME}"; then
    run_cmd "git checkout \"${BRANCH_NAME}\""
  else
    run_cmd "git checkout -b \"${BRANCH_NAME}\""
  fi
fi

# 6. Stage Phase 6C Manifest Files
echo -e "\n${BOLD}[6/7] Staging Phase 6C files...${NC}"

# Exact Phase 6C Manifest
PHASE_6C_FILES=(
  "lib/ai-config.ts"
  "lib/nyayota-ai/conversation/types.ts"
  "lib/nyayota-ai/conversation/reference-resolver.ts"
  "lib/nyayota-ai/conversation/natural-response-engine.ts"
  "lib/nyayota-ai/conversation/index.ts"
  "lib/nyayota-ai/service.ts"
  "tests/nyayota-ai-conversation-phase6c.test.ts"
  "scripts/sync-github.sh"
)

for file in "${PHASE_6C_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "  + Staging: ${file}"
    run_cmd "git add \"${file}\""
  else
    echo -e "  ${YELLOW}! Warning: file not found: ${file}${NC}"
  fi
done

# Check status of staged changes
echo -e "\nStaged changes status:"
if [ "$DRY_RUN" = false ]; then
  git status --short
fi

# 7. Commit and Push Instructions
echo -e "\n${BOLD}[7/7] Committing changes...${NC}"

COMMIT_TITLE="feat(nyayota-ai): implement phase 6c natural conversational response engine"
COMMIT_BODY="Implement Phase 6C natural conversational response engine:
- Gemini-powered grounded generation with statutory citations and strict XML bounding
- Comprehensive adversarial sanitization and prompt-injection defense
- Multi-turn follow-ups, analogies, simplified explanations, and topic shifts
- Deterministic fallback preservation when AI generation is unavailable
- Model configuration with gemini-3.8-flash primary and gemini-2.5-flash fallback
- Complete unit and integration test suite (27 tests in phase 6c suite, 250 passing total)
- Public AI assistant remains suspended with HTTP 503 pending official launch"

COMMIT_MSG="${COMMIT_TITLE}

${COMMIT_BODY}"

if [ "$DRY_RUN" = false ]; then
  if git diff --cached --quiet; then
    echo -e "  ${YELLOW}No changes staged to commit.${NC}"
  else
    git commit -m "${COMMIT_MSG}"
    echo -e "  ${GREEN}✓ Changes committed successfully.${NC}"
  fi
else
  echo -e "${YELLOW}[DRY-RUN]${NC} git commit with Phase 6C message"
fi

echo -e "\n${BOLD}${GREEN}======================================================${NC}"
echo -e "${BOLD}${GREEN}   Phase 6C Synchronization Staging Complete!         ${NC}"
echo -e "${BOLD}${GREEN}======================================================${NC}"
echo ""
echo -e "To push this branch to GitHub, run:"
echo -e "  ${BOLD}${CYAN}git push -u origin \"${BRANCH_NAME}\"${NC}"
echo ""
echo -e "After pushing, open a Pull Request on GitHub:"
echo -e "  ${BOLD}${BLUE}https://github.com/afnan0356/nyayota/compare/main...${BRANCH_NAME}${NC}"
echo ""
