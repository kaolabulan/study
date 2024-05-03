//管理用户数据
import {defineStore} from "pinia";
import {ref} from "vue";
import {reqLoginAPI,mergeCartAPI} from "@/api/index.js";
import {useCartStore} from "@/stores/cart.js";



export const useUserStore = defineStore('user', ()=>{

  const cartStore = useCartStore()
  //1.定义管理用户数据store
  const userInfo = ref({})
  //2.定义获取用户数据接口action
  const getUserInfo =async ({account ,password})=>{
    let res = await reqLoginAPI({account ,password})
    userInfo.value = res.result
    //加载用户登录数据 合并购物车的操作
    await mergeCartAPI(cartStore.cartList.map((item)=>{
      return{
        skuId:item.skuId,
        selected:item.selected,
        count:item.count,
      }
    }))
    await cartStore.updateCart()
  }
  //退出清除用户信息
  const clearUserInfo = ()=>{
    userInfo.value={}
    cartStore.clearCart()
    // 持久化存储清空 localStorage
    // localStorage.removeItem('user')
    // localStorage.removeItem('cart')

    //清空localStorage所有缓存
    // localStorage.clear()
    // window.localStorage.clear()

    //刷新导致跳转默认主页路由 无法更改
    // location.reload()

  }
  //3.return出 state和action
  return{
    userInfo,
    getUserInfo,
    clearUserInfo,
  }
},{
  persist: true,
})