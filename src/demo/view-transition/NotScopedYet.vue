<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>

    <label>
      <input v-model="disableRootTransition" type="checkbox" />
      Disable <code>root</code>'s transition animation
    </label>
  </Header>

  <code class="!text-xl">&lt;ViewTransition&gt;</code>
  <ViewTransition :name="disableRootTransition ? 'no-root-transition' : ''">
    <span v-if="flag">🦄</span>
    <span v-else class="rotate-90">🌸</span>
  </ViewTransition>
  <code class="!text-xl">&lt;/ViewTransition&gt;</code>

  <span
    class="absolute bottom-0 right-24 animate-[ball-bounce_500ms_infinite]"
  >
    🏀
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const flag = ref(false)
const disableRootTransition = ref(false)

function toggle() {
  flag.value = !flag.value
}
</script>

<style>
html.view-transition-no-root-transition {
  &::view-transition-old(root) {
    display: none;
  }

  &::view-transition-new(root) {
    animation: none;
  }
}
</style>
