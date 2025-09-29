import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'
import router from './routes/router'
import './assets/css/global.css';
import api from './plugins/api'

const app=createApp(App)

app.config.globalProperties.$api1=api
app.use(vuetify).use(router).mount('#app')
