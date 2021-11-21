<script setup lang="ts">
import { ref } from 'vue'
const msg = ref<string>('test')
</script>
<template>
  <div class="app-container">{{ msg }}</div>
</template>
<style lang="less" scoped></style>
