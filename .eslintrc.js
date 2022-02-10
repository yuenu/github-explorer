module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    camelcase: 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    indent: [
      'error',
      2,
      {
        offsetTernaryExpressions: true,
        SwitchCase: 1,
      },
    ],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', 'tsx'] },
    ],
  },
  settings: {
    react: {
      version: 'lastest',
    },
  },
}
