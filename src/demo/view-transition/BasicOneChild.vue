<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>
  </Header>

  <div class="min-h-24">
    <ViewTransition>
      <span v-if="!flag">🦄</span>
    </ViewTransition>
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
