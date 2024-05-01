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
//获取二级分类列表数据 /category/sub/filter
export const reqGetCategoryFilterAPI = (id)=> httpInstance({url:'/category/sub/filter',method:'get',params:{id}})
//获取导航数据
export const getSubCategoryAPI = (data) => httpInstance({
  url:'/category/goods/temporary',
  method:'POST',
  data
})
//获取详情页数据
export const reqGetDetail = (id) => httpInstance({
  url: '/goods',
  method:'get',
  params: {id},
})
//获取热榜商品
export const reqHotGoodsAPI = ({ id, type, limit = 3 }) => httpInstance({
  url:'/goods/hot',
  method:'get',
  params:{id, type, limit},
})
//验证登录-用户名密码
export const reqLoginAPI = ({account,password})=> httpInstance({url:'/login',method:'post',data:{account,password}})