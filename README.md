# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 集成其他插件及第三方库

* [安装 Ant-design-vue](https://github.com/gee1k/vite-ts-vue3-template/wiki/安装-ant-design-vue)
* [配置 ESLint、Prettier](https://github.com/gee1k/vite-ts-vue3-template/wiki/配置-ESLint、Prettier)
* [Vite 结合 postcss-plugin-px2rem 实现自适应](https://github.com/gee1k/vite-ts-vue3-template/wiki/Vite-结合-postcss-plugin-px2rem-实现自适应)
