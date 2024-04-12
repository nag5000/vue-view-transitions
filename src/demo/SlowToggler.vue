<template>
  <label>
    <input v-model="slow" type="checkbox" />
    Slow
  </label>
</template>

<script lang="ts" setup>
import { slow } from './global-state'
</script>
