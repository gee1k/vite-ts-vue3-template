<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useGlobalStore } from '@/store/modules/global.ts'
useGlobalStore()
</script>
<template>
  <div class="h-full">
    <RouterView></RouterView>
  </div>
</template>
