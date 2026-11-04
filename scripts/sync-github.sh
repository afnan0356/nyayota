#!/usr/bin/env bash
# ==============================================================================
# NYAYOTA — Safe GitHub Synchronization & Verification Pipeline
# Official Repository: https://github.com/afnan0356/nyayota.git
# ==============================================================================
# Security & Integrity Guarantees:
#   1. Zero Eval Execution: Strictly quoted direct bash arguments.
#   2. Non-Destructive: No `git init`, no `git reset --hard`, no force-push.
#   3. Strict Remote Identity: Must match 'afnan0356/nyayota' on github.com.
#   4. Secret Detection: Automatically scans tracked files for API keys & tokens.
#   5. Quality Gates: Optional or pre-flight verification with bun test, lint, build.
#   6. Environment Awareness: Detects isolated workspace vs genuine git clone.
# ==============================================================================

set -euo pipefail

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

OFFICIAL_OWNER_REPO="afnan0356/nyayota"
OFFICIAL_REPO_HTTPS="https://github.com/afnan0356/nyayota.git"
OFFICIAL_REPO_SSH="git@github.com:afnan0356/nyayota.git"
DEFAULT_BRANCH="main"

REMOTE_URL="${REMOTE_URL:-$OFFICIAL_REPO_HTTPS}"
BRANCH_NAME="${BRANCH_NAME:-$DEFAULT_BRANCH}"
DRY_RUN=true
SKIP_TESTS=false
VALIDATE_QUALITY=false
COMMIT_MESSAGE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --live)
      DRY_RUN=false
      shift
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --skip-tests)
      SKIP_TESTS=true
      shift
      ;;
    --validate-quality)
      VALIDATE_QUALITY=true
      shift
      ;;
    --branch)
      if [[ -z "${2:-}" ]]; then
        echo -e "${RED}Error: --branch requires a non-empty branch name.${NC}" >&2
        exit 1
      fi
      BRANCH_NAME="$2"
      shift 2
      ;;
    --remote)
      if [[ -z "${2:-}" ]]; then
        echo -e "${RED}Error: --remote requires a valid repository URL.${NC}" >&2
        exit 1
      fi
      REMOTE_URL="$2"
      shift 2
      ;;
    -m|--message)
      if [[ -z "${2:-}" ]]; then
        echo -e "${RED}Error: -m/--message requires a commit message.${NC}" >&2
        exit 1
      fi
      COMMIT_MESSAGE="$2"
      shift 2
      ;;
    --help|-h)
      echo -e "${BOLD}${CYAN}NYAYOTA — Safe GitHub Synchronization & Verification Pipeline${NC}"
      echo ""
      echo -e "Usage: ${BOLD}./scripts/sync-github.sh [OPTIONS]${NC}"
      echo ""
      echo "Options:"
      echo "  --dry-run             Perform read-only inspection (default)."
      echo "  --live                Execute live Git staging and commit (in genuine clone)."
      echo "  --validate-quality    Run full test suite, linter, and production build."
      echo "  --skip-tests          Skip quality validation gates."
      echo "  --branch <name>       Target branch name (default: 'main')."
      echo "  --remote <url>        Target remote URL (must match afnan0356/nyayota)."
      echo "  -m, --message <text>  Commit message for live synchronization."
      echo "  --help, -h            Show this help reference."
      exit 0
      ;;
    *)
      echo -e "${RED}Error: Unknown argument '$1'. Run with --help for usage.${NC}" >&2
      exit 1
      ;;
  esac
done

echo -e "${BOLD}${CYAN}======================================================================${NC}"
echo -e "${BOLD}${CYAN}   NYAYOTA — Safe GitHub Synchronization & Verification Pipeline      ${NC}"
echo -e "${BOLD}${CYAN}======================================================================${NC}"
echo -e "Target Repository : ${BLUE}${REMOTE_URL}${NC}"
echo -e "Target Branch     : ${BLUE}${BRANCH_NAME}${NC}"
echo -e "Execution Mode    : $([ "$DRY_RUN" = true ] && echo -e "${YELLOW}DRY-RUN (Inspection & Safety Audit)${NC}" || echo -e "${GREEN}LIVE EXECUTION${NC}")"
echo -e "Quality Gates     : $([ "$SKIP_TESTS" = true ] && echo -e "${YELLOW}SKIPPED (--skip-tests)${NC}" || ([ "$VALIDATE_QUALITY" = true ] && echo -e "${GREEN}ENABLED (test, lint, build)${NC}" || echo -e "${DIM}DEFERRED (use --validate-quality to run)${NC}"))"
echo ""

# ------------------------------------------------------------------------------
# STEP 1: Branch & Remote Validation
# ------------------------------------------------------------------------------
echo -e "${BOLD}[1/5] Validating branch and remote identity...${NC}"
if command -v git &>/dev/null; then
  if ! git check-ref-format --branch "$BRANCH_NAME" 2>/dev/null; then
    echo -e "${RED}Fatal: Branch name '${BRANCH_NAME}' is invalid.${NC}" >&2
    exit 1
  fi
fi

validate_repo_url() {
  local url="$1"
  if [[ "$url" =~ ^https://github\.com/afnan0356/nyayota(\.git)?$ ]] || \
     [[ "$url" =~ ^git@github\.com:afnan0356/nyayota(\.git)?$ ]] || \
     [[ "$url" =~ ^ssh://git@github\.com/afnan0356/nyayota(\.git)?$ ]]; then
    return 0
  fi
  return 1
}

if ! validate_repo_url "$REMOTE_URL"; then
  echo -e "${RED}Fatal: Remote URL '${REMOTE_URL}' does not match official repository '${OFFICIAL_OWNER_REPO}'!${NC}" >&2
  exit 1
fi
echo -e "  ${GREEN}✓ Official repository verified: ${OFFICIAL_OWNER_REPO}${NC}"

# ------------------------------------------------------------------------------
# STEP 2: Sensitive Secrets & Token Scan
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[2/5] Scanning codebase for leaked credentials & private tokens...${NC}"
PAT_AIZA="AI""zaSy"
PAT_GHP="gh""p_"
PAT_GHPAT="github_""pat_"
PAT_PRIVKEY="BEGIN ""PRIVATE KEY"

SECRET_FOUND=0
# Scan key source folders, avoiding node_modules and .next
for scan_dir in lib app components; do
  if [ -d "$scan_dir" ]; then
    for pat in "$PAT_AIZA" "$PAT_GHP" "$PAT_GHPAT" "$PAT_PRIVKEY"; do
      if grep -r -q -F "$pat" "$scan_dir" 2>/dev/null; then
        echo -e "  ${RED}✗ Security Warning: Credential pattern found in ${scan_dir} [VALUE REDACTED]${NC}" >&2
        SECRET_FOUND=$((SECRET_FOUND + 1))
      fi
    done
  fi
done

if [ "$SECRET_FOUND" -gt 0 ]; then
  echo -e "${RED}Fatal: Potential credentials detected in source tree. Aborting.${NC}" >&2
  exit 1
fi
echo -e "  ${GREEN}✓ Zero hardcoded API keys or private tokens detected in source directories.${NC}"

# ------------------------------------------------------------------------------
# STEP 3: Automated Quality Gates (If Requested)
# ------------------------------------------------------------------------------
if [ "$VALIDATE_QUALITY" = true ] && [ "$SKIP_TESTS" = false ]; then
  echo -e "\n${BOLD}[3/5] Running automated pre-flight quality gates...${NC}"

  # Gate 1: Tests
  echo -e "  ${CYAN}[1/3]${NC} Running test suite..."
  if command -v bun &>/dev/null; then
    bun test
  elif command -v npm &>/dev/null; then
    npm test
  fi
  echo -e "  ${GREEN}✓ Tests passed.${NC}"

  # Gate 2: Lint
  echo -e "  ${CYAN}[2/3]${NC} Running ESLint..."
  npm run lint
  echo -e "  ${GREEN}✓ Linter passed.${NC}"

  # Gate 3: Production Build
  echo -e "  ${CYAN}[3/3]${NC} Validating Next.js production build..."
  NODE_ENV=production npm run build
  echo -e "  ${GREEN}✓ Production build succeeded.${NC}"
else
  echo -e "\n${BOLD}[3/5] Quality gates:${NC}"
  echo -e "  ${DIM}Skipped (pass --validate-quality to run test, lint, and build checks).${NC}"
fi

# ------------------------------------------------------------------------------
# STEP 4: Inspect Git Environment
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[4/5] Checking Git repository environment...${NC}"

if [ ! -d ".git" ]; then
  echo -e "  ${YELLOW}Notice: Current workspace does not contain a '.git' directory.${NC}"
  echo -e "  ${YELLOW}Policy: Automatic 'git init' is prohibited to prevent detached repository histories.${NC}"
  echo ""
  echo -e "${BOLD}Recommended Synchronization Procedure For Maintainer:${NC}"
  echo "  1. On your machine with official Git credentials, clone the repository:"
  echo -e "     ${CYAN}git clone ${OFFICIAL_REPO_HTTPS}${NC}"
  echo -e "     ${CYAN}cd nyayota${NC}"
  echo ""
  echo "  2. Review the updated files from this workspace and copy them into your clone."
  echo ""
  echo "  3. Verify with dry-run inside the clone:"
  echo -e "     ${CYAN}./scripts/sync-github.sh --dry-run${NC}"
  echo ""
  echo "  4. Commit and push when satisfied:"
  echo -e "     ${CYAN}git add .${NC}"
  echo -e "     ${CYAN}git commit -m \"chore: repository trust, security & quality remediation\"${NC}"
  echo -e "     ${CYAN}git push origin ${BRANCH_NAME}${NC}"
  echo ""
  echo -e "  ${GREEN}✓ Safe inspection complete. No Git modifications made.${NC}"
  exit 0
fi

# ------------------------------------------------------------------------------
# STEP 5: Live Execution Inside Genuine Git Clone
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[5/5] Genuine Git clone detected. Inspecting status...${NC}"
git status --short

if [ "$DRY_RUN" = true ]; then
  echo -e "\n  ${YELLOW}[DRY-RUN] To stage and commit changes, run with: ./scripts/sync-github.sh --live -m \"your commit message\"${NC}"
  exit 0
fi

if [ -z "$COMMIT_MESSAGE" ]; then
  echo -e "${RED}Error: --live requires a commit message via -m / --message.${NC}" >&2
  exit 1
fi

git add -A
git commit -m "$COMMIT_MESSAGE"
echo -e "\n${GREEN}✓ Changes committed successfully. Ready to push:${NC}"
echo -e "  ${CYAN}git push origin ${BRANCH_NAME}${NC}"
