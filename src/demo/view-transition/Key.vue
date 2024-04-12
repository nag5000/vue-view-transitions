<template>
  <Header>
    <StartButton @click="increment">Increment</StartButton>
  </Header>

  <ViewTransition name="count">
    <samp :key="count">{{ count }}</samp>
  </ViewTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<style>
html::view-transition-new(count) {
  animation-name: -ua-view-transition-fade-in, count-slide-in;
}

html::view-transition-old(count) {
  animation-name: -ua-view-transition-fade-out, count-slide-out;
}

@keyframes count-slide-in {
  from {
    transform: translateY(-100%);
  }
}

@keyframes count-slide-out {
  to {
    transform: translateY(100%);
  }
}
</style>
