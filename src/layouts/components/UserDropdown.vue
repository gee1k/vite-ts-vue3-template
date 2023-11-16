<script setup lang="ts">
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user.ts'
import { computed } from 'vue'
import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type MenuEvent = 'logout' | 'lock'

const userStore = useUserStore()
const getUserInfo = computed(() => userStore.userInfo)

//  login out
function handleLoginOut() {
  userStore.confirmLoginOut()
}

function handleMenuClick(e: MenuInfo) {
  switch (e.key as MenuEvent) {
    case 'logout':
      handleLoginOut()
      break
    case 'lock':
      break
  }
}
</script>
<template>
  <Dropdown placement="bottomLeft" overlayClassName="app-dropdown-overlay">
    <span class="app-header-user-dropdown flex">
      <img
        v-if="getUserInfo?.avatar"
        class="app-header-user-dropdown__header"
        :src="getUserInfo?.avatar"
        alt="user-avatar"
      />
      <img
        v-else
        class="app-header-user-dropdown__header"
        src="../../assets/images/header-user.jpeg"
        alt="user-avatar"
      />
      <span class="app-header-user-dropdown__info hidden md:block">
        <span class="app-header-user-dropdown__name truncate">
          {{ getUserInfo?.realName }}
        </span>
      </span>
    </span>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem key="logout">
          <span class="flex items-center">
            <ArrowLeftOnRectangleIcon class="w-4 h-4 mr-1" />
            <span>{{ t('layout.header.dropdownItemLoginOut') }}</span>
          </span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<style lang="less">
@prefix-cls: ~'app-header-user-dropdown';

.@{prefix-cls} {
  align-items: center;
  height: 100%;
  padding: 0 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &__header {
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
  }

  &:hover {
    background-color: #f6f6f6;
  }

  .@{prefix-cls}__name {
    color: rgba(0 0 0 85%);
  }

  .@{prefix-cls}__desc {
    color: #7c8087;
  }

  &-dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
}
</style>
