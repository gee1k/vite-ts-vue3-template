<script setup lang="ts">
import { ref, watch } from 'vue'
import { LayoutSider, Menu } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { useAppStore } from '../../store/stores/app'
import { getMenus } from '@/router/meun'
import { useRoute, useRouter } from 'vue-router'

const store = useAppStore()
const menus = getMenus()

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

const router = useRouter()
const route = useRoute()

watch(
  () => route.fullPath,
  async (fullPath) => {
    const paths = fullPath.split('/').filter(Boolean)
    selectedKeys.value = paths.length ? paths : ['/']
    openKeys.value = paths.length > 1 ? paths.slice(0, paths.length - 1) : []
  },
  {
    immediate: true,
  },
)

const handleClick: MenuProps['onClick'] = (e) => {
  if (!e.keyPath) {
    return
  }
  let path = e.keyPath.join('/')
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  router.push(path)
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
