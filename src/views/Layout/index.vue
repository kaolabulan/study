<script>
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
export default {
  name: "layout",
  components: {LayoutFooter, LayoutHeader, LayoutNav}
}
</script>

<template>
  <LayoutNav/>
  <LayoutHeader/>
  <router-view/>
  <LayoutFooter/>
</template>

<style scoped>

</style>