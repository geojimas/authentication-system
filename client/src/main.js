import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles.scss'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Toast, {
    transition: 'Vue-Toastification__fade',
    maxToasts: 7,
    newestOnTop: true,
  })
  .mount('#app')
