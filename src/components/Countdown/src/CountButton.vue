<script lang="ts" setup>
import { ref, watchEffect, computed, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { useCountdown } from './useCountdown'
import { isFunction } from '@/utils/is'
import { useI18n } from 'vue-i18n'

export interface Props {
  value?: object | string | number
  count?: number
  beforeStartFunc?: () => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  count: 60,
})

const loading = ref(false)

const { currentCount, isStart, start, reset } = useCountdown(props.count)
const { t } = useI18n()

const getButtonText = computed(() => {
  return !unref(isStart)
    ? t('component.countdown.normalText')
    : t('component.countdown.sendText', [unref(currentCount)])
})

watchEffect(() => {
  if (props.value === undefined) reset()
})

/**
 * @description: Judge whether there is an external function before execution, and decide whether to start after execution
 */
async function handleStart() {
  const { beforeStartFunc } = props
  if (beforeStartFunc && isFunction(beforeStartFunc)) {
    loading.value = true
    try {
      const canStart = await beforeStartFunc()
      canStart && start()
    } finally {
      loading.value = false
    }
  } else {
    start()
  }
}
</script>

<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </Button>
</template>
