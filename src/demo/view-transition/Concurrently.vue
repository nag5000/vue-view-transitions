<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>
  </Header>

  <ViewTransition name="slide">
    <span v-if="flag">🦄</span>
    <span v-else>🌸</span>
  </ViewTransition>

  <ViewTransition name="slide-opposite">
    <span v-if="!flag">🦄</span>
    <span v-else>🌸</span>
  </ViewTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const flag = ref(false)

function toggle() {
  flag.value = !flag.value
}
</script>

<style>
html::view-transition-new(slide) {
  animation-name: -ua-view-transition-fade-in, slide-in;
}

html::view-transition-old(slide) {
  animation-name: -ua-view-transition-fade-out, slide-out;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
}

@keyframes slide-out {
  to {
    transform: translateX(100%);
  }
}

html::view-transition-new(slide-opposite) {
  animation-name: -ua-view-transition-fade-in, slide-in-opposite;
}

html::view-transition-old(slide-opposite) {
  animation-name: -ua-view-transition-fade-out, slide-out-opposite;
}

@keyframes slide-in-opposite {
  from {
    transform: translateX(100%);
  }
}

@keyframes slide-out-opposite {
  to {
    transform: translateX(-100%);
  }
}
</style>
