import httpInstance from "@/utiles/http.js";

export const reqGetCategory = ()=> httpInstance.get('/home/category/head')
//首页轮播图 /home/banner
export const reqGetBannerInfo = (params={})=> {
  const {distributionSite = 1} = params
  return httpInstance({url:'/home/banner',method:'get',params:{distributionSite}})
}
//获取-新鲜好物  /home/new
export const reqGetNewGoods = ()=> httpInstance.get('/home/new')
//获取-人气推荐 /home/hot
export const reqGetHotGoods = ()=> httpInstance.get('/home/hot')

export const reqGetGoodsAPI = () => httpInstance( '/home/goods')
//获取-二级分类列表 /category  Query 参数 id
export const reqGetCategoryInfo = (id)=> httpInstance({url:'/category',method:'get',params:{id}})