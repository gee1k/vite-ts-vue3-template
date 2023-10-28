<script setup lang="ts">
import { ref } from 'vue'
import { LayoutSider, Menu } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { useAppStore } from '../../store/stores/app'
import { getMenus } from '@/router/meun'
import { RouteLocationNormalized, useRouter } from 'vue-router'

const store = useAppStore()
const menus = getMenus()

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

const router = useRouter()

const selectedKeysByRoute = (to: RouteLocationNormalized) => {
  const matchedRoutes = to.matched.map((route) => route.name).filter(Boolean)
  selectedKeys.value = [matchedRoutes[matchedRoutes.length - 1] as string]
  openKeys.value = matchedRoutes.slice(0, matchedRoutes.length - 1) as string[]
}

selectedKeysByRoute(router.currentRoute.value)
router.afterEach(selectedKeysByRoute)

const handleClick: MenuProps['onClick'] = (e) => {
  router.push({ name: e.key as string })
}
</script>
<template>
  <LayoutSider
    class="main-layout-sider"
    v-model:collapsed="store.collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo" />
    <Menu
      :selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      :items="menus"
      theme="dark"
      mode="inline"
      @click="handleClick"
    ></Menu>
  </LayoutSider>
</template>
<style lang="less" scoped>
.main-layout-sider {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
