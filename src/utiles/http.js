//axios基础的封装
import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from "@/stores/user.js";
import router from "@/router/index.js";

const httpInstance = axios.create({
  baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout:5000,
})

//拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //1. 从pinia获取token
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  //2. 按后端要求拼接token数据
  if (token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //统一错误提示
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })
  //401token失效处理
  if (e.response.status===401){
    //1.清除本地登录数据
    const userStore = useUserStore()
    userStore.userInfo = {}
    //2.跳转登录页
    // const router = useRouter()  只有在setup语法糖中才能使用useRouter
    router.push('/login')
  }

  return Promise.reject(e)
})

export default httpInstance