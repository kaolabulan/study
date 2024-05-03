import {defineStore} from "pinia";
import {ref,computed} from "vue";

export const useCartStore = defineStore('cart',()=>{
  //1.定义state -- cartList 购物车列表存储数据
  const cartList = ref([])
  //2.定义action -- addCart
  const addCart = (goods)=>{
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
  //删除购物车
  const delCart = (skuId)=>{
    //1.splice 改变原数组  2.filter 不改变原数组
    // cartList.value = cartList.value.filter((item)=>item.skuId!==skuId)
    const delIndex = cartList.value.findIndex((item)=>item.skuId===skuId)
    cartList.value.splice(delIndex,1)
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
    return cartList.value.filter(item=>item.seleted).reduce((sum,item)=>sum+item.price,0)
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