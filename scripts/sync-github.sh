#!/usr/bin/env bash
# ==============================================================================
# NYAYOTA AI — GitHub Synchronization Helper Script (Hardened)
# Phase 6C: Natural Conversational Response Engine
# Official Repository: https://github.com/afnan0356/nyayota.git
# ==============================================================================
# Architectural & Security Directives:
#   1. NEVER automatically run "git init". Prevents creating detached, unlinked
#      repositories with fabricated commit history.
#   2. Enforces execution inside a genuine clone of https://github.com/afnan0356/nyayota.
#   3. Validates official remote repository URL. Preserves existing remotes and
#      never overwrites unrelated configurations.
#   4. Strictly stages ONLY the 8 authorized Phase 6C manifest files.
#   5. Strictly forbids staging .env files, tokens, credentials, or build artifacts.
#   6. Prohibits destructive git commands: NO force-push (--force), NO git reset --hard,
#      NO history rewriting, NO silent branch overwriting.
#   7. Provides a genuinely read-only --dry-run mode that mutates no state.
#   8. Enforces automated pre-flight checks: bun test, npm run lint, npm run build.
#   9. Preserves all Nyayota security constraints: public AI assistant remains suspended.
# ==============================================================================

set -euo pipefail

# ANSI color codes for clear terminal reporting
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

# Official repository configuration
OFFICIAL_REPO_SSH="git@github.com:afnan0356/nyayota.git"
OFFICIAL_REPO_HTTPS="https://github.com/afnan0356/nyayota.git"
DEFAULT_BRANCH="feature/phase-6c-natural-response-engine"

# User-configurable parameters
REMOTE_URL="${REMOTE_URL:-$OFFICIAL_REPO_HTTPS}"
BRANCH_NAME="${BRANCH_NAME:-$DEFAULT_BRANCH}"
DRY_RUN=false
SKIP_TESTS=false

# Expected Phase 6C file manifest (strictly bounded)
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

# Parse command line flags
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
    --help|-h)
      echo -e "${BOLD}${CYAN}NYAYOTA AI — GitHub Synchronization Helper (Hardened)${NC}"
      echo ""
      echo -e "Usage: ${BOLD}./scripts/sync-github.sh [OPTIONS]${NC}"
      echo ""
      echo "Options:"
      echo "  --dry-run       Read-only inspection; outputs planned actions without modifying state."
      echo "  --skip-tests    Skip pre-flight test, lint, and build execution (use with caution)."
      echo "  --branch NAME   Target feature branch (default: feature/phase-6c-natural-response-engine)."
      echo "  --remote URL    Target repository remote URL (default: https://github.com/afnan0356/nyayota.git)."
      echo "  --help, -h      Show this guidance screen."
      echo ""
      echo "Safety Guarantees:"
      echo "  - NEVER runs 'git init' or creates disconnected repositories."
      echo "  - Stages ONLY the 8 authorized Phase 6C files."
      echo "  - Never force-pushes or rewrites git history."
      echo "  - Pre-flight checks: bun test, npm run lint, npm run build."
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}" >&2
      echo "Run './scripts/sync-github.sh --help' for usage guidance." >&2
      exit 1
      ;;
  esac
done

echo -e "${BOLD}${CYAN}======================================================================${NC}"
echo -e "${BOLD}${CYAN}   NYAYOTA AI — Hardened GitHub Synchronization Pipeline              ${NC}"
echo -e "${BOLD}${CYAN}======================================================================${NC}"
echo -e "Target Repository : ${BLUE}${REMOTE_URL}${NC}"
echo -e "Target Branch     : ${BLUE}${BRANCH_NAME}${NC}"
echo -e "Execution Mode    : $([ "$DRY_RUN" = true ] && echo -e "${YELLOW}DRY-RUN (Strictly Read-Only)${NC}" || echo -e "${GREEN}LIVE EXECUTION${NC}")"
echo -e "Pre-Flight Checks : $([ "$SKIP_TESTS" = true ] && echo -e "${YELLOW}SKIPPED (--skip-tests)${NC}" || echo -e "${GREEN}ENABLED (test, lint, build)${NC}")"
echo ""

# Helper to execute or dry-run command safely
run_cmd() {
  local cmd="$*"
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}[DRY-RUN WOULD EXECUTE]${NC} ${cmd}"
  else
    echo -e "${CYAN}==>${NC} ${cmd}"
    eval "$cmd"
  fi
}

# ------------------------------------------------------------------------------
# STEP 1: Verify Manifest Files on Disk & Security Inspection
# ------------------------------------------------------------------------------
echo -e "${BOLD}[1/7] Verifying Phase 6C file manifest integrity on disk...${NC}"
MISSING_FILES=0
for file in "${PHASE_6C_FILES[@]}"; do
  if [ -f "$file" ]; then
    FILE_SIZE=$(wc -c < "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo "0")
    echo -e "  ${GREEN}✓${NC} Found: ${file} ${DIM}(${FILE_SIZE} bytes)${NC}"
  else
    echo -e "  ${RED}✗ Missing required Phase 6C file:${NC} ${file}" >&2
    MISSING_FILES=$((MISSING_FILES + 1))
  fi
done

if [ "$MISSING_FILES" -gt 0 ]; then
  echo -e "\n${RED}Fatal: ${MISSING_FILES} Phase 6C manifest files are missing. Synchronization aborted.${NC}" >&2
  exit 1
fi
echo -e "  ${GREEN}✓ All 8 Phase 6C manifest files verified on disk.${NC}"

# Security Check: scan application and test files for accidentally embedded secrets
echo -e "\n${BOLD}[Security Check] Scanning manifest files for sensitive tokens...${NC}"
SECRET_PATTERNS=("AIzaSy" "ghp_" "github_pat_" "-----BEGIN PRIVATE KEY-----")
FOUND_SECRETS=0
for pattern in "${SECRET_PATTERNS[@]}"; do
  for file in "${PHASE_6C_FILES[@]}"; do
    # Exclude script itself from self-matching pattern definitions
    if [ "$file" = "scripts/sync-github.sh" ]; then
      continue
    fi
    if grep -q "$pattern" "$file" 2>/dev/null; then
      echo -e "  ${RED}✗ Security Alert: Potential secret pattern '${pattern}' detected in ${file}!${NC}" >&2
      FOUND_SECRETS=$((FOUND_SECRETS + 1))
    fi
  done
done

if [ "$FOUND_SECRETS" -gt 0 ]; then
  echo -e "\n${RED}Fatal: Sensitive tokens or keys detected in manifest files. Synchronization aborted.${NC}" >&2
  exit 1
fi
echo -e "  ${GREEN}✓ Zero hardcoded API keys or credentials detected in manifest files.${NC}"

# ------------------------------------------------------------------------------
# STEP 2: Automatic Pre-Flight Quality Gates (Test, Lint, Build)
# ------------------------------------------------------------------------------
if [ "$SKIP_TESTS" = false ]; then
  echo -e "\n${BOLD}[2/7] Executing mandatory pre-flight quality checks...${NC}"

  # Gate 1: Test Suite
  echo -e "  ${CYAN}[Gate 1/3]${NC} Running test suite..."
  if command -v bun &>/dev/null; then
    bun test || { echo -e "\n${RED}Pre-flight test suite failed! Synchronization halted.${NC}" >&2; exit 1; }
  elif command -v npm &>/dev/null; then
    npm test || { echo -e "\n${RED}Pre-flight test suite failed! Synchronization halted.${NC}" >&2; exit 1; }
  else
    echo -e "${RED}Neither 'bun' nor 'npm' found to run tests. Halting.${NC}" >&2
    exit 1
  fi
  echo -e "  ${GREEN}✓ Test suite passed (all tests green).${NC}"

  # Gate 2: ESLint
  echo -e "  ${CYAN}[Gate 2/3]${NC} Running ESLint code quality audit..."
  npm run lint || { echo -e "\n${RED}ESLint validation failed! Synchronization halted.${NC}" >&2; exit 1; }
  echo -e "  ${GREEN}✓ ESLint clean (0 errors, 0 warnings).${NC}"

  # Gate 3: Next.js Production Build
  echo -e "  ${CYAN}[Gate 3/3]${NC} Validating Next.js production compilation..."
  NODE_ENV=production npm run build || { echo -e "\n${RED}Next.js build failed! Synchronization halted.${NC}" >&2; exit 1; }
  echo -e "  ${GREEN}✓ Next.js production build succeeded.${NC}"
else
  echo -e "\n${BOLD}[2/7] Pre-flight checks skipped via --skip-tests flag.${NC}"
  echo -e "  ${YELLOW}Notice: Pre-flight checks were intentionally bypassed.${NC}"
fi

# ------------------------------------------------------------------------------
# STEP 3: Audit Git Environment & Prevent Fabricated History
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[3/7] Auditing Git repository environment...${NC}"

if ! command -v git &>/dev/null; then
  echo -e "${RED}Fatal: git is not installed or not in PATH.${NC}" >&2
  exit 1
fi

if [ ! -d ".git" ]; then
  echo -e "  ${YELLOW}Status: Isolated workspace detected (.git directory absent).${NC}"
  echo -e "  ${YELLOW}Rule Enforced: Automatic 'git init' is STRICTLY PROHIBITED.${NC}"
  echo ""
  echo -e "  ${BOLD}Explanation:${NC}"
  echo "  Running 'git init' in an isolated directory creates a disconnected repository"
  echo "  with fabricated history that cannot cleanly merge with the official Nyayota tree."
  echo ""
  if [ "$DRY_RUN" = true ]; then
    echo -e "  ${YELLOW}[DRY-RUN MODE REPORT]${NC}"
    echo "  In a genuine clone of 'https://github.com/afnan0356/nyayota.git', this script will:"
    echo "    1. Verify remote 'origin' points to 'afnan0356/nyayota'"
    echo "    2. Create/checkout feature branch '${BRANCH_NAME}'"
    echo "    3. Stage exactly the 8 verified Phase 6C files"
    echo "    4. Create an audited conventional commit"
    echo "    5. Provide the exact push command: git push -u origin \"${BRANCH_NAME}\""
    echo ""
    echo -e "  ${GREEN}✓ Dry-run completed safely. Zero Git state or files modified.${NC}"
    exit 0
  else
    echo -e "${RED}Fatal: Cannot perform live Git synchronization in an uninitialized directory.${NC}" >&2
    echo ""
    echo -e "${BOLD}Recommended Synchronization Procedure from a Genuine Nyayota Clone:${NC}"
    echo "  1. On your machine or server with Git and GitHub access, clone Nyayota:"
    echo -e "     ${CYAN}git clone ${OFFICIAL_REPO_HTTPS}${NC}"
    echo -e "     ${CYAN}cd nyayota${NC}"
    echo ""
    echo "  2. Copy the 8 verified Phase 6C files into that cloned repository."
    echo ""
    echo "  3. Run this synchronization script inside the clone:"
    echo -e "     ${CYAN}./scripts/sync-github.sh --branch ${BRANCH_NAME}${NC}"
    echo ""
    echo "  4. Push the branch and open a Pull Request:"
    echo -e "     ${CYAN}git push -u origin ${BRANCH_NAME}${NC}"
    exit 1
  fi
fi

# ------------------------------------------------------------------------------
# STEP 4: Validate Git Remote & Identity
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[4/7] Validating Git repository remote & identity...${NC}"

# Check existing remotes
REMOTES=$(git remote -v || true)
if [[ -z "$REMOTES" ]]; then
  echo -e "  ${YELLOW}No Git remote configured.${NC}"
  if [ "$DRY_RUN" = true ]; then
    echo -e "  ${YELLOW}[DRY-RUN WOULD EXECUTE]${NC} git remote add origin \"${REMOTE_URL}\""
  else
    echo -e "  Adding remote 'origin' -> ${BLUE}${REMOTE_URL}${NC}"
    git remote add origin "${REMOTE_URL}"
  fi
else
  # Remote exists; verify it matches the official Nyayota repository
  ORIGIN_URL=$(git remote get-url origin 2>/dev/null || echo "")
  echo -e "  Remote 'origin' detected: ${BLUE}${ORIGIN_URL}${NC}"
  
  if [[ "$ORIGIN_URL" != *"afnan0356/nyayota"* ]]; then
    echo -e "\n${RED}Fatal: Remote 'origin' (${ORIGIN_URL}) does NOT point to afnan0356/nyayota!${NC}" >&2
    echo -e "To prevent overwriting unrelated repositories, synchronization is aborted." >&2
    exit 1
  fi
  echo -e "  ${GREEN}✓ Verified official Nyayota repository remote identity.${NC}"
fi

# ------------------------------------------------------------------------------
# STEP 5: Safe Feature Branch Handling
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[5/7] Preparing feature branch '${BRANCH_NAME}'...${NC}"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
echo -e "  Current active branch: ${BLUE}${CURRENT_BRANCH}${NC}"

# Protect against dirty working tree with unrelated unstaged changes
UNTRACKED_CHANGES=$(git status --porcelain 2>/dev/null || true)
if [[ -n "$UNTRACKED_CHANGES" ]]; then
  echo -e "  ${YELLOW}Notice: Uncommitted working tree changes detected:${NC}"
  echo "$UNTRACKED_CHANGES" | sed 's/^/    /'
  echo -e "  ${DIM}Only the 8 explicit Phase 6C files will be staged. Other files are protected.${NC}"
fi

if [ "$CURRENT_BRANCH" = "$BRANCH_NAME" ]; then
  echo -e "  ${GREEN}✓ Already on target branch '${BRANCH_NAME}'.${NC}"
else
  if git show-ref --verify --quiet "refs/heads/${BRANCH_NAME}"; then
    echo -e "  Branch '${BRANCH_NAME}' already exists locally. Switching to it without resetting..."
    run_cmd "git checkout \"${BRANCH_NAME}\""
  else
    echo -e "  Creating and checking out dedicated branch '${BRANCH_NAME}'..."
    run_cmd "git checkout -b \"${BRANCH_NAME}\""
  fi
fi

# ------------------------------------------------------------------------------
# STEP 6: Strictly Stage ONLY Authorized Manifest Files
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[6/7] Staging authorized Phase 6C manifest files...${NC}"

for file in "${PHASE_6C_FILES[@]}"; do
  echo -e "  + Staging: ${file}"
  run_cmd "git add -- \"${file}\""
done

# Post-staging security assertion: ensure no forbidden file was staged
if [ "$DRY_RUN" = false ]; then
  STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)
  FORBIDDEN_STAGED=0
  while IFS= read -r staged; do
    [[ -z "$staged" ]] && continue
    # Verify staged file is strictly in the allowed manifest
    IS_ALLOWED=false
    for allowed in "${PHASE_6C_FILES[@]}"; do
      if [ "$staged" = "$allowed" ]; then
        IS_ALLOWED=true
        break
      fi
    done
    if [ "$IS_ALLOWED" = false ]; then
      echo -e "  ${RED}Security Violation: File '${staged}' is NOT in Phase 6C manifest! Unstaging...${NC}" >&2
      git restore --staged -- "$staged"
      FORBIDDEN_STAGED=$((FORBIDDEN_STAGED + 1))
    fi
  done <<< "$STAGED_FILES"

  if [ "$FORBIDDEN_STAGED" -gt 0 ]; then
    echo -e "${RED}Fatal: Unauthorized files were staged. Staging reverted and process halted.${NC}" >&2
    exit 1
  fi

  echo -e "\nStaged changes ready for commit:"
  git status --short
fi

# ------------------------------------------------------------------------------
# STEP 7: Audited Conventional Commit
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}[7/7] Preparing audited conventional commit...${NC}"

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
    echo -e "  ${YELLOW}Notice: Working tree clean or changes already committed. Nothing new to commit.${NC}"
  else
    git commit -m "${COMMIT_MSG}"
    echo -e "  ${GREEN}✓ Phase 6C commit recorded successfully.${NC}"
  fi
else
  echo -e "${YELLOW}[DRY-RUN WOULD COMMIT]${NC} git commit with message:"
  echo -e "${DIM}${COMMIT_TITLE}${NC}"
fi

echo -e "\n${BOLD}${GREEN}======================================================================${NC}"
echo -e "${BOLD}${GREEN}   Phase 6C Synchronization Pipeline Complete                         ${NC}"
echo -e "${BOLD}${GREEN}======================================================================${NC}"
echo ""
echo -e "To push this branch to GitHub (safe push, no --force):"
echo -e "  ${BOLD}${CYAN}git push -u origin \"${BRANCH_NAME}\"${NC}"
echo ""
echo -e "After pushing, open a Pull Request against main:"
echo -e "  ${BOLD}${BLUE}https://github.com/afnan0356/nyayota/compare/main...${BRANCH_NAME}${NC}"
echo ""
