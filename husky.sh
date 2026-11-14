#!/bin/bash

set -e

HUSKY_PATH="$(pwd)/.husky"
HUSKY_PRE_COMMIT_PATH="$(pwd)/.husky/pre-commit"

echo "================================================"
echo "|             INSTALL HUSKY CONFIG             |"
echo "================================================"

npx husky init

cat > "$HUSKY_PRE_COMMIT_PATH" << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo
echo "================== LINT STAGED ================="
echo
npx lint-staged
echo
echo "==================== ESLINT ===================="
echo
npx eslint "src/**/*.{ts,tsx}"
echo
echo "================== UNIT TESTS =================="
echo
npm run test
echo
echo "==================== STEIGER ==================="
echo
npx steiger src || true
echo
echo "============ END OF PRECOMMIT CHECKS ==========="
echo
