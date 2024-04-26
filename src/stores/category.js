import {defineStore} from "pinia";
import {ref} from "vue";
import {reqGetCategory} from "@/api/index.js";

export const useCategoryStore = defineStore('category',()=>{
  const categoryList = ref([])
  const getCategory =async ()=>{
    let res = await reqGetCategory()
    categoryList.value = res.result
  }
  return{
    categoryList,
    getCategory
  }
})