<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>
  </Header>

  <div>
    <span v-if="flag" class="[view-transition-name:vt1]">🦄</span>
    <span class="[view-transition-name:vt2]">🟡</span>
    <span v-if="!flag" class="rotate-90 [view-transition-name:vt1]">
      🌸
    </span>
  </div>
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
