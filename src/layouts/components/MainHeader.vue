<script setup lang="ts">
import { useAppStore } from '../../store/stores/app'
import { storeToRefs } from 'pinia'
import { LayoutHeader } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

const store = useAppStore()
const { collapsed } = storeToRefs(store)
const { toggleCollapsed } = store
</script>
<template>
  <LayoutHeader class="main-layout-header">
    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapsed" />
    <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
  </LayoutHeader>
</template>
<style lang="less" scoped>
.main-layout-header {
  background-color: #fff;
  padding: 0;

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
