<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global.ts'
useGlobalStore()
</script>
<template>
  <div class="h-full">
    <router-view></router-view>
  </div>
</template>
