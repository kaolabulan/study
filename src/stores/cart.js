import {defineStore} from "pinia";
import {ref,computed} from "vue";
import {useUserStore} from "@/stores/user.js";
import {insertCartAPI,findNewCartListAPI,delCartAPI} from "@/api/index.js";


export const useCartStore = defineStore('cart',()=>{
  const userStore = useUserStore()
  const isLogin = computed(()=>userStore.userInfo.token)
  //1.定义state -- cartList 购物车列表存储数据
  const cartList = ref([])

  const updateCart =async ()=>{
    //获取最新的购物车列表
    const res = await findNewCartListAPI()
    //覆盖本地的购物车列表
    cartList.value = res.result
  }
  //2.定义action -- addCart
  const addCart =async (goods)=>{
    const {skuId,count} = goods
    if (isLogin.value){
      //登录加入购物车逻辑
      //加入购物车接口调用
      await insertCartAPI({skuId,count})
      await updateCart()
    }else {
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item)=>goods.skuId === item.skuId)
      if (item){
        item.count+=goods.count
      }else {
        cartList.value.push(goods)
      }
    }

  }
  //删除购物车
  const delCart =async (skuId)=>{
    if (isLogin.value){
      //登录调用删除接口
      await delCartAPI([skuId])
      await updateCart()

    }else {
      //1.splice 改变原数组  2.filter 不改变原数组
      // cartList.value = cartList.value.filter((item)=>item.skuId!==skuId)
      const delIndex = cartList.value.findIndex((item)=>item.skuId===skuId)
      cartList.value.splice(delIndex,1)
    }

  }

  //计算属性
  const allCount = computed(()=>cartList.value.reduce((sum,item)=>sum+item.count,0))
  const allPrice = computed(()=>{
    return cartList.value.reduce((sum,item)=>sum+item.count*item.price,0)
  })

  //已选择属性
  const selectedCount = computed(()=>{
    return cartList.value.filter(item=>item.selected).reduce((sum,item)=>sum+item.count,0)
  })
  const selectedPrice = computed(()=>{
    return cartList.value.filter(item=>item.selected).reduce((sum,item)=>sum+item.price*item.count,0)
  })

  //单、全选
  const isAll = computed(()=>cartList.value.every(item=>item.selected))

  return{
    cartList,
    allPrice,
    allCount,
    selectedCount,
    selectedPrice,
    isAll,
    addCart,
    delCart,
  }
},{
  persist:true
})