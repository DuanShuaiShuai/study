import './assets/main.css'
import 'virtual:windi.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

let doms = document.getElementsByClassName('.tt')
for (const iterator of doms) {
}
app.use(createPinia())
app.use(router)

app.mount('#app')
