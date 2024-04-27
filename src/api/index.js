import httpInstance from "@/utiles/http.js";

export const reqGetCategory = ()=> httpInstance.get('/home/category/head')
//首页轮播图 /home/banner
export const reqGetBannerInfo = ()=> httpInstance.get('/home/banner')
//获取-新鲜好物  /home/new
export const reqGetNewGoods = ()=> httpInstance.get('/home/new')
//获取-人气推荐 /home/hot
export const reqGetHotGoods = ()=> httpInstance.get('/home/hot')