<script setup lang="ts">
import { useAppStore } from '@/store/modules/app.ts'
import { storeToRefs } from 'pinia'
import { LayoutHeader } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import UserDropdown from '@/layouts/components/UserDropdown.vue'

const store = useAppStore()
const { collapsed } = storeToRefs(store)
const { toggleCollapsed } = store
</script>
<template>
  <LayoutHeader class="main-layout-header">
    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapsed" />
    <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />

    <div class="flex-1 h-full flex justify-end align-middle">
      <UserDropdown />
    </div>
  </LayoutHeader>
</template>
<style lang="less" scoped>
.main-layout-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 0;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
