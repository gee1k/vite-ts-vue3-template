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
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CountButton from './CountButton.vue'
import { useRuleFormItem } from '@/hooks/useFormItem'

const props = {
  value: { type: String },
  size: { type: String, validator: (v: string) => ['default', 'large', 'small'].includes(v) },
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
}

export default defineComponent({
  name: 'CountDownInput',
  components: { CountButton },
  inheritAttrs: false,
  props,
  setup(props) {
    const [state] = useRuleFormItem(props)

    return { state }
  },
})
</script>
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
