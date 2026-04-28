import { createApp } from 'vue'
import App from './App.vue'
import { initI18n } from './i18n'
import './assets/styles/main.css'

const i18n = initI18n()

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('[vue] Unhandled error:', err, info, instance)
}

window.addEventListener('error', (event) => {
  console.error('[window] Unhandled error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('[window] Unhandled promise rejection:', event.reason)
})

app.use(i18n).mount('#app')
