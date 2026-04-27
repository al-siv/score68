import { createApp } from 'vue'
import App from './App.vue'
import { initI18n } from './i18n'
import './assets/styles/main.css'

const i18n = initI18n()

createApp(App).use(i18n).mount('#app')
