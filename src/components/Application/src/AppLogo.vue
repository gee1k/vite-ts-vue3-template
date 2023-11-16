<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img src="../../../assets/images/logo.png" alt="app-logo" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app.ts'
import { getAppEnvConfig } from '@/utils/env.ts'
import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },
  /**
   * The title is also displayed when the menu is collapsed
   */
  alwaysShowTitle: { type: Boolean },
})

const title = getAppEnvConfig().VITE_APP_TITLE

const appStore = useAppStore()
const router = useRouter()

const getAppLogoClass = computed(() => [
  'app-logo',
  { 'collapsed-show-title': unref(appStore.collapsed) },
])

const getTitleClass = computed(() => [
  `app-logo__title`,
  {
    'xs:opacity-0': !props.alwaysShowTitle,
  },
])

function goHome() {
  router.push('/')
}
</script>
<style lang="less" scoped>
@prefix-cls: ~'app-logo';

.@{prefix-cls} {
  display: flex;
  align-items: center;
  padding-left: 7px;
  transition: all 0.2s ease;
  cursor: pointer;

  &.collapsed-show-title {
    padding-left: 20px;
  }

  &__title {
    transition: all 0.5s;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    color: #fff;
  }
}
</style>
