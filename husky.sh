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

echo "=============== START LINT STAGED =============="
npx lint-staged
echo "================= START ESLINT ================="
npx eslint "src/**/*.ts{,x}"
echo "=============== START UNIT TESTS ==============="
npm run test
echo "================= START STEIGER ================"
npx steiger src || true
echo "============ END OF PRECOMMIT CHECKS ==========="
