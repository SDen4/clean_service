import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      'react-hooks': reactHooks,
      prettier,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'sort-imports': 'off',
      'no-shadow': 'off',
      'no-plusplus': 'off',
      'no-confusing-arrow': 'off',
      'react/jsx-curly-newline': 'off',
      'implicit-arrow-linebreak': 'off',
      'react/display-name': 'off',
      'operator-linebreak': 'off',
      'no-param-reassign': 'off',
      'arrow-body-style': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'no-unneeded-ternary': 'off',
      'object-curly-newline': 'off',
      'consistent-return': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-did-update-set-state': 'off',
      'react/jsx-closing-tag-location': 'off',
      'function-paren-newline': 'off',
      'react/state-in-constructor': 'off',
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.tsx'] },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],
      'import/no-duplicates': 'error',
      'max-classes-per-file': 'off',
      'prefer-const': 'off',
      'arrow-parens': 'off',
      'react/prop-types': 'off',
      'react/prefer-stateless-function': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-wrap-multilines': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      curly: [0, 'multi'],
      'no-mixed-operators': 'error',
      camelcase: 'off',
      'no-console': 'warn',
      'max-len': 'warn',
      'dot-notation': 'warn',
      'no-continue': 'warn',
      'unicode-bom': 'off',
      'no-process-exit': 'error',
      'import/order': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'prettier/prettier': ['error', { printWidth: 80 }],
      ...prettierConfig.rules,
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^react',
              '^lucide-react',
              '^(@company|@ui|config|vendored-lib)(/.*|$)',
              'class-variance-authority',
              '@base-ui',
            ],
            ['^@/app'],
            ['^@/pages'],
            ['^@/widgets'],
            ['^@/features'],
            ['^@/entities'],
            ['^@/shared/'],
            ['^@/components'],
            ['^@/lib'],
            [
              '^\\$+',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
            ],
            ['ui', 'components', 'view'],
            ['api', 'utils'],
            ['model'],
            ['hooks'],
            ['utils'],
            ['constants'],
            ['app'],
            ['shared'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
]);
