import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp({});
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app');