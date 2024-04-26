//引入初始化样式
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//测试接口函数
import {getTest} from "@/api/testAPI.js";
getTest().then(result=>{
  console.log(result)
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
