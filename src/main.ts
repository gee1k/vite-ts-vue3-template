import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import plugins from '@/plugins'
import 'virtual:svg-icons-register'
import components from '@/components'

import '@/styles/index.less'

createApp(App).use(router).use(store).use(plugins).use(components).mount('#app')
