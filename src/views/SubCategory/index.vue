<script setup>
  import {reqGetCategoryFilterAPI,getSubCategoryAPI} from "@/api/index.js";
  import {onMounted, ref} from "vue";
  import {useRoute} from "vue-router";
  import GoodsItem from "@/views/Home/components/GoodsItem.vue";

  const route = useRoute()
  const categoryFilter = ref({})
  const getCategoryFilter =async ()=>{
    let res = await reqGetCategoryFilterAPI(route.params.id)
    categoryFilter.value = res.result
  }
  onMounted(()=>getCategoryFilter())

  // 获取基础列表数据渲染
  const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
  })
  const goodList = ref([])

  const getGoodList = async ()=>{
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = res.result.items
  }
  onMounted(()=>getGoodList())
  const tebChange = ()=>{
    console.log(reqData.value.sortField)
    reqData.value.page=1
    getGoodList()
  }

  //无限滚动
  const disabled = ref(false)
  const load =async ()=>{
    reqData.value.page++
    //获得下一页数据
    const res = await getSubCategoryAPI(reqData.value)
    //拼接数组
    // 1.var newArr = arr1.concat(arr2);
    // 2.使用 es6 中的 ‘点语法’ 扩展运算符（推荐）arr1.push(...arr2);
    // 3.展开运算符
    goodList.value = [...goodList.value,...res.result.items]
    //加载完毕 停止监听
    if (res.result.items.length===0){
      disabled.value=true
    }

  }

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryFilter.parentId}` }">{{ categoryFilter.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilter.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tebChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem  v-for="good in goodList" :good="good" :key="good.id"/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>