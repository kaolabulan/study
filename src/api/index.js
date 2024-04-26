import httpInstance from "@/utiles/http.js";

export const reqGetCategory = ()=> httpInstance.get('/home/category/head')