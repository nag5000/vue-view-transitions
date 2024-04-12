<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>
  </Header>

  <span v-if="flag">🦄</span>
  <span v-else class="rotate-90 scale-150">🌸</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useViewTransition } from '@nag5000/vue-view-transitions'

const { startViewTransition } = useViewTransition()
const flag = ref(false)

function toggle() {
  startViewTransition(() => {
    flag.value = !flag.value
  })
}
</script>

<style scoped>
span {
  view-transition-name: 🦄🌸;
}
</style>
