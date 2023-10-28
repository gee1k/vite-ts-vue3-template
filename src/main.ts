import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { store } from './store'

const bootstrap = async () => {
  const app = createApp(App)
  app.use(router)
  app.use(store)
  app.mount('#app')
}

bootstrap()
