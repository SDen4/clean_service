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

npx lint-staged
npx eslint "src/**/*.ts{,x}"
npx steiger src || true
