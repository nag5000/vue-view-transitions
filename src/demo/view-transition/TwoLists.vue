<template>
  <Header>
    <SlowToggler />
  </Header>

  <ViewTransition>
    <div
      :key="JSON.stringify([list1, list2])"
      class="flex w-full items-start justify-around"
    >
      <ul
        v-for="(list, listIndex) in [list1, list2]"
        :key="listIndex"
        class="!m-0 w-32 !list-none !p-2 text-5xl odd:bg-blue-300 even:bg-orange-300"
      >
        <li
          v-for="item in list"
          :key="item"
          class="m-3 cursor-pointer border-2 border-solid bg-zinc-100 text-center"
          :style="{ 'view-transition-name': 'i' + item }"
          @click="moveItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </ViewTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const list1 = ref([1, 2, 3, 4, 5])
const list2 = ref([6, 7, 8, 9, 10])

function moveItem(item: number) {
  const fromList = list1.value.includes(item) ? list1 : list2
  const toList = fromList.value === list1.value ? list2 : list1

  // Remove the item from the fromList
  fromList.value = fromList.value.filter((i) => i !== item)

  // Add the item to the toList at a random position
  toList.value = toList.value.toSpliced(
    Math.floor(Math.random() * toList.value.length),
    0,
    item
  )
}
</script>
