//管理用户数据
import {defineStore} from "pinia";
import {ref} from "vue";
import {reqLoginAPI} from "@/api/index.js";

export const useUserStore = defineStore('user', ()=>{
  //1.定义管理用户数据store
  const userInfo = ref({})
  //2.定义获取用户数据接口action
  const getUserInfo =async ({account ,password})=>{
    let res = await reqLoginAPI({account ,password})
    userInfo.value = res.result
  }
  //3.return出 state和action
  return{
    userInfo,
    getUserInfo
  }
},{
  persist: true,
})