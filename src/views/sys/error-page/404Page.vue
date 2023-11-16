<script setup lang="ts">
import { Result } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useI18n } from '@/hooks/useI18n.ts'

const router = useRouter()

const { t } = useI18n()

const backHome = () => {
  router.push('/')
}
</script>

<template>
  <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="backHome">{{ t('sys.exception.backHome') }}</a-button>
    </template>
  </Result>
</template>

<style scoped lang="less"></style>
