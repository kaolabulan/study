<script setup>
  import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
  import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
  import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
  import LayoutFixed from "@/views/Layout/components/LayoutFixed.vue";

  import {useCategoryStore} from "@/stores/category.js";
  import {onMounted} from "vue";

  const categoryStore = useCategoryStore()
  onMounted(()=>categoryStore.getCategory())
</script>

<template>
  <LayoutFixed/>
  <LayoutNav/>
  <LayoutHeader/>
<!--  <router-view :key="$route.fullPath"/>-->
  <router-view/>
  <LayoutFooter/>
</template>

<style scoped>

</style>