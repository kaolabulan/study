import {onMounted, ref} from "vue";
import {reqGetBannerInfo} from "@/api/index.js";


export function useGetBannerInfo(){
  //获取banner
  const bannerList = ref([])
  const getBannerInfo =async ()=>{
    let res = await reqGetBannerInfo({distributionSite:2})
    bannerList.value = res.result
  }
  onMounted(()=>getBannerInfo())
  return{
    bannerList
  }
}