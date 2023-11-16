<script setup lang="ts">
import { computed, ref } from 'vue'
import { LayoutSider, Menu } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { useAppStore } from '@/store/modules/app.ts'
import { formatMenus } from '@/router/meun.ts'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission.ts'

const store = useAppStore()
const permissionStore = usePermissionStore()
const menus = computed(() => {
  return formatMenus(permissionStore.routes)
})

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
