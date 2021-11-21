# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


## 安装 `ant-design-vue`

```bash
pnpm add ant-design-vue@next
```

### 配置按需加载

```bash
pnpm add unplugin-vue-components -D
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      dts: true, // enabled by default if `typescript` is installed
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});
```

### 创建组件加载器
> 在 `src/plugins` 下创建 `UILoader.ts`

```js
import { App } from 'vue'
import { Button } from 'ant-design-vue'

export default {
  install(app: App) {
    app.use(Button)
  },
}

```

> 修改 `main,ts` 引入 `UILoader.ts`

```js
import UILoader from '@/plugins/UILoader'

createApp(App).use(router).use(store).use(UILoader).mount('#app')
```


### 自定义主题颜色（可选）

```bash
# 如果没有安装 less
pnpm add -D less
```


```js
// vite.config.js
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      dts: true, // enabled by default if `typescript` is installed
      resolvers: [
        AntDesignVueResolver({
          // 开启引入 less 样式
          importLess: true,
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 修改变量。参考https://next.antdv.com/docs/vue/customize-theme-cn
        modifyVars: {
          'primary-color': '#FF0000',
        },
        javascriptEnabled: true,
      },
    },
  },
});
```



## 配置 ESLint、Prettier

### 安装eslint

```bash
pnpm install --save-dev eslint eslint-plugin-vue
```

### 安装prettier

```bash
pnpm install --save-dev prettier eslint-plugin-prettier @vue/eslint-config-prettier
```

### 安装typescript支持

```bash
pnpm install --save-dev @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 创建 `.eslintrc.js`

```js
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

```

### 创建 `.eslintignore`

```
/node_modules/
/public/
.vscode
.idea

```
