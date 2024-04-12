<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>
  </Header>

  <div class="grid grid-cols-5 justify-items-center">
    <span>[</span>

    <span>
      <ViewTransition name="a">
        <span v-if="flag">🦄</span>
      </ViewTransition>
    </span>

    <span>:</span>

    <span>
      <ViewTransition name="a">
        <span v-if="!flag">🦄</span>
      </ViewTransition>
    </span>

    <span>]</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const flag = ref(true)

function toggle() {
  flag.value = !flag.value
}
</script>
