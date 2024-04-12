<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>
  </Header>

  <div>
    [
    <ViewTransition name="a">
      <span v-if="flag">🦄</span>
      <span v-else class="rotate-90 scale-150">🌸</span>
    </ViewTransition>
    :
    <ViewTransition name="b">
      <span v-if="!flag">🦄</span>
      <span v-else class="rotate-90 scale-150">🌸</span>
    </ViewTransition>
    ]
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const flag = ref(false)

function toggle() {
  flag.value = !flag.value
}
</script>
