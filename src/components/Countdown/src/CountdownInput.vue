<script lang="ts" setup>
import CountButton from './CountButton.vue'
import { useRuleFormItem } from '@/hooks/useFormItem'

export interface Props {
  value: string
  size?: 'default' | 'large' | 'small'
  count?: number
  sendCodeApi?: () => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  count: 60,
})

defineOptions({
  inheritAttrs: false,
})
const [state] = useRuleFormItem(props)
</script>
<template>
  <a-input v-bind="$attrs" class="app-countdown-input" :size="size" :value="state">
    <template #addonAfter>
      <CountButton :size="size" :count="count" :value="state" :beforeStartFunc="sendCodeApi" />
    </template>
    <template #[item]="data" v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </a-input>
</template>
<style lang="less">
.app-countdown-input {
  .ant-input-group-addon {
    padding-right: 0;
    border: none;
    background-color: transparent;

    button {
      font-size: 14px;
    }
  }
}
</style>
