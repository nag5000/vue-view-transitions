<template>
  <Header>
    <StartButton @click="shuffle">Shuffle</StartButton>
  </Header>

  <ViewTransition>
    <ul :key="JSON.stringify(list)" class="m-0 list-none p-0">
      <li
        v-for="item in list"
        :key="item"
        class="m-3 inline-block border-2 border-solid bg-zinc-100 p-4"
        :style="{ 'view-transition-name': 'i' + item }"
      >
        {{ item }}
      </li>
    </ul>
  </ViewTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const list = ref([1, 2, 3, 4, 5, 6])

function shuffle() {
  list.value = [...list.value].sort(() => Math.random() - 0.5)
}
</script>
