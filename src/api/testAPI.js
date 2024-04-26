import httpInstance from "@/utiles/http.js";

export const getTest = ()=>httpInstance({url:'home/category/head',method:'get'})
