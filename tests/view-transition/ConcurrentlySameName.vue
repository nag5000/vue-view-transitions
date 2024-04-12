<template>
  <button @click="toggle">Toggle</button>

  <div>
    <span>[</span>

    <span>
      <ViewTransition name="a">
        <span v-if="flag">A</span>
      </ViewTransition>
    </span>

    <span>:</span>

    <span>
      <ViewTransition name="a">
        <span v-if="!flag">A</span>
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
