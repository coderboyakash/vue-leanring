import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'

const app = createApp(App);
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app');