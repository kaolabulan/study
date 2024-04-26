import httpInstance from "@/utiles/http.js";

export function getTest(){
  return httpInstance({
    url:'home/category/head'
  })
}