module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['**/graphql.ts'],
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: false, typedefs: true },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    semi: 'off',
    eqeqeq: 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    'prefer-arrow-callback': 1,
    // 'no-use-before-define': 0,
    'max-len': [
      'off',
      {
        code: 100,
        ignoreComments: true,
        ignorePattern: '^import .*',
      },
    ],
    'new-parens': 'error',
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-console': ['warn', { allow: ['warn', 'info', 'error'] }],
    'no-caller': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
    'quote-props': ['error', 'as-needed'],
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'no-irregular-whitespace': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-constant-binary-expression': 'error',
  },
  plugins: ['sort-imports-es6-autofix'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
