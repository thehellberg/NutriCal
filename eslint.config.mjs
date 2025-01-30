import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import _import from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: [
      '**/.eslintrc.js',
      'src/__generated__/',
      'src/graphql/types.ts',
      '**/*.generated.ts',
      '.expo',
      'android',
      'ios',
      'modules',
      '**/node_modules/**/*',
      '**/.expo/**/*',
      '**/.next/**/*',
      '**/dist/**/*',
      '**/__generated__/**/*',
      '**/build/**/*',
      'react-native-lab/react-native/**/*',
      '**/android/**/*',
      '**/assets/**/*',
      '**/bin/**/*',
      '**/fastlane/**/*',
      '**/ios/**/*',
      '**/kotlin/providers/**/*',
      '**/vendored/**/*',
      'docs/public/static/**/*'
    ]
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended'
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      'react-hooks': fixupPluginRules(reactHooks)
    },

    languageOptions: {
      globals: {
        fetch: 'readonly',
        process: 'readonly',
        require: 'readonly'
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/no-unescaped-entities': 'off',
      'no-console': 'warn',
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    }
  }
]
