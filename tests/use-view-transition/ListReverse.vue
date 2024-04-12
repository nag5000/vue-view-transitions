<template>
  <button @click="reverse">Reverse</button>

  <ul>
    <li
      v-for="item in list"
      :key="item"
      :style="{ 'view-transition-name': 'i' + item }"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useViewTransition } from '@nag5000/vue-view-transitions'

const { startViewTransition } = useViewTransition()

const list = ref([1, 2, 3, 4, 5, 6])

function reverse() {
  startViewTransition(() => {
    list.value = [...list.value].reverse()
  })
}
</script>
