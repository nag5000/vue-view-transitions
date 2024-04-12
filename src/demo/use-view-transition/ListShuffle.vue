<template>
  <Header>
    <StartButton @click="shuffle">Shuffle</StartButton>
  </Header>

  <ul class="m-0 list-none p-0">
    <li
      v-for="item in list"
      :key="item"
      class="m-3 inline-block border-2 border-solid bg-zinc-100 p-4"
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

function shuffle() {
  startViewTransition(() => {
    list.value = [...list.value].sort(() => Math.random() - 0.5)
  })
}
</script>
