<template>
  <Teleport v-if="headerRef" :to="headerRef">
    <slot />
  </Teleport>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const headerRef = inject('header')
</script>
