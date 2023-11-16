<script lang="ts" setup>
import MainSider from './MainSider.vue'
import MainHeader from './MainHeader.vue'
import { Layout, LayoutContent } from 'ant-design-vue'
</script>
<template>
  <Layout class="main-layout-container">
    <MainSider />
    <Layout>
      <MainHeader />
      <LayoutContent class="main-layout-content">
        <router-view />
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<style lang="less" scoped>
.main-layout-container {
  height: 100vh;

  .main-layout-content {
    margin: 24px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}
</style>
