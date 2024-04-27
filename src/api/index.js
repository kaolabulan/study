import httpInstance from "@/utiles/http.js";

export const reqGetCategory = ()=> httpInstance.get('/home/category/head')
//首页轮播图 /home/banner
export const reqGetBannerInfo = ()=> httpInstance.get('/home/banner')