<template>
  <button @click="toggle">Toggle</button>

  <div>
    <ViewTransition>
      <span v-if="flag">AAA</span>
      <span v-else>BBB</span>
    </ViewTransition>
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
