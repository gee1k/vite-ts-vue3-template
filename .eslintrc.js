module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
  ],
  globals: {
    defineProps: 'readonly',
  },
}
