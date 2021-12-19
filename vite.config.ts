import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
        charset: false,
        additionalData: '@import "./src/styles/global.less";',
      },
    },
  },
})
