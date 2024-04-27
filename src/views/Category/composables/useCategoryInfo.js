  import {reqGetCategoryInfo,} from "@/api/index.js";
  import {onMounted, ref} from "vue";
  import {useRoute} from "vue-router";

  //组件内路由守卫 解决路由缓存问题
  import {onBeforeRouteUpdate} from "vue-router";
  export function useCategoryInfo(){
    //组件内路由守卫
    onBeforeRouteUpdate((to)=>{
      getCategoryInfo(to.params.id)
    })

    const route = useRoute()
    const categoryInfo = ref({})
    const getCategoryInfo =async (id=route.params.id)=>{
      let res = await reqGetCategoryInfo(id)
      categoryInfo.value=res.result
    }
    onMounted(()=>getCategoryInfo())
    return{
      categoryInfo
    }
  }


