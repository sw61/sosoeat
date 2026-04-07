import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import featureSliced from '@conarti/eslint-plugin-feature-sliced';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  // 1. 글로벌 무시 설정
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'public/**',
      'coverage/**',
      'src/types/generated-client/**',
    ],
  },

  // 2. 기본 JS/TS 공통 설정
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      '@next/next': pluginNext,
      import: pluginImport,
      'simple-import-sort': simpleImportSort,
      'feature-sliced': featureSliced,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...pluginImport.configs.recommended.rules,
      ...pluginImport.configs.typescript.rules,

      // FSD (Feature-Sliced Design) 규칙
      'feature-sliced/layers-slices': 'error',
      'feature-sliced/absolute-relative': 'error',
      'feature-sliced/public-api': 'error',

      // 사용자 정의 규칙 최적화
      'no-undef': 'off', // TypeScript에서 이미 처리함
      'react/react-in-jsx-scope': 'off', // Next.js 17+ 불필요
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Import 순서 정렬 규칙 (simple-import-sort)
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Side effect imports (e.g., import "./style.css";)
            ['^\\u0000'],
            // 2. React related packages
            ['^react', '^react-dom'],
            // 3. Next.js related packages
            ['^next'],
            // 4. Other external packages
            ['^@?\\w'],
            // 5. Internal aliases (@/*)
            ['^@/'],
            // 6. Parent imports (../)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // 7. Other relative imports (./)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 8. Style imports
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/order': 'off', // 기존 규칙과 충돌 방지
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },

  // 3. 테스트 파일 전용 설정 (Jest/Vitest 전역 변수)
  {
    files: ['**/*.{test,spec}.{ts,tsx,js,jsx}', '**/tests/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
        vi: 'readonly',
      },
    },
  },

  // 4. Storybook 설정
  ...storybook.configs['flat/recommended'],

  // 5. Prettier 설정 (항상 마지막에 위치해야 함)
  eslintConfigPrettier,
];

export default eslintConfig;
