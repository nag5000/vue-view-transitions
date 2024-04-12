<template>
  <button @click="increment">Increment</button>

  <ViewTransition>
    <samp :key="count">{{ count }}</samp>
  </ViewTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const count = ref(130)

function increment() {
  count.value++
}
</script>
