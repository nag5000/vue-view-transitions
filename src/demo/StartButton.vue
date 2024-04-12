<template>
  <button @click="onClick(false)"><slot /></button>
  <button @click="onClick(true)"><slot /> (slow)</button>
</template>

<script lang="ts" setup>
import { slow } from './global-state'

const emit = defineEmits(['click'])

function onClick(_slow: boolean) {
  slow.value = _slow
  emit('click')
}
</script>

<style>
html.slow::view-transition-group(*),
html.slow::view-transition-old(*),
html.slow::view-transition-new(*) {
  animation-duration: 5s;
}
</style>
