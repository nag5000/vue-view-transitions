<template>
  <button @click="toggle">Toggle</button>

  <div>
    <span v-if="flag">AAA</span>
    <span v-else>BBB</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useViewTransition } from '@nag5000/vue-view-transitions'

const { startViewTransition } = useViewTransition()
const flag = ref(true)

function toggle() {
  startViewTransition(() => {
    flag.value = !flag.value
  })
}
</script>

<style scoped>
span {
  view-transition-name: ab;
}
</style>
