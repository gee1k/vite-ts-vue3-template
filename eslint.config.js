import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import autoImportConfig from '.eslintrc-auto-import.json'

export default [
  {
    ignores: ['.vscode/', '**/node_modules', 'dist/', 'public/', '*.cjs'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  eslintPluginPrettierRecommended,
  {
    ...autoImportConfig,
    rules: {
      '@typescript-eslint/no-explicit-any': [0],
    },
  },
]
