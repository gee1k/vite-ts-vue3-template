<script lang="ts" setup>
import { Input } from 'ant-design-vue'
import CountButton from './CountButton.vue'
import { useRuleFormItem } from '@/hooks/useFormItem'

export interface Props {
  value: string
  size?: 'middle' | 'large' | 'small'
  count?: number
  sendCodeApi?: () => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  size: 'middle',
  count: 10,
})

defineOptions({
  inheritAttrs: false,
})
const [state] = useRuleFormItem(props, 'value', 'change')
</script>
<template>
  <Input v-bind="$attrs" class="app-countdown-input" :size="props.size" :value="state">
    <template #addonAfter>
      <CountButton
        :size="props.size"
        :count="props.count"
        :value="state"
        :beforeStartFunc="props.sendCodeApi"
      />
    </template>
    <template #[item]="data" v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Input>
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
