<template>
  <Dropdown>
    <span class="cursor-pointer flex items-center">
      <LanguageIcon class="h-5 w-5" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
    <template #overlay>
      <Menu v-model:selected-keys="selectedKeys" @click="handleMenuEvent">
        <MenuItem v-for="item in localeList" :key="item.event">
          <a href="javascript:;">{{ item.text }}</a>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts" setup>
import { ref, watchEffect, unref, computed } from 'vue'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { LanguageIcon } from '@heroicons/vue/24/solid'
import type { LocaleType } from '#/config'
import type { MenuProps } from 'ant-design-vue'
import { useLocale } from '@/locales/useLocale.ts'
import { localeList } from '@/settings/localeSetting.ts'

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: true },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean },
})

const selectedKeys = ref<string[]>([])

const { changeLocale, getLocale } = useLocale()

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}

const handleMenuEvent: MenuProps['onClick'] = ({ key }) => {
  if (unref(getLocale) === key) {
    return
  }
  toggleLocale(key as string)
}
</script>

<style lang="less">
.app-locale-picker-overlay {
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
