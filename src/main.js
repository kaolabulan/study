//引入初始化样式
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入全局插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

//引入懒加载指令插件并且注册
import {lazyPlugin} from "@/directives/index.js";

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')


