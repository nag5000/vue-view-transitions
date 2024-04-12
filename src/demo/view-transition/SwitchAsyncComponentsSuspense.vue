<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>

    <label>
      Suspense Timeout:
      <select v-model="suspenseTimeout">
        <option value="0">0</option>
        <option value="500">500</option>
        <option value="2000">2000</option>
      </select>
    </label>
  </Header>

  <div
    :key="suspenseTimeout"
    class="grid h-36 w-64 text-base *:border *:border-solid *:p-3"
  >
    <ViewTransition name="slide">
      <Suspense :timeout="suspenseTimeout">
        <Component :is="component" />

        <template #fallback>
          <div class="bg-green-100">Loading...</div>
        </template>
      </Suspense>
    </ViewTransition>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  ref,
} from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const flag = ref(true)
const suspenseTimeout = ref(0)

const component = computed(() => (flag.value ? Comp1 : Comp2))

function toggle() {
  flag.value = !flag.value
}

const Comp1 = defineAsyncComponent(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return defineComponent({
    async setup() {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
    render() {
      return h('div', { class: 'bg-orange-100' }, [
        h('h1', 'Component 1'),
        h('p', 'Some text'),
      ])
    },
  })
})

const Comp2 = defineAsyncComponent(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return defineComponent({
    async setup() {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
    render() {
      return h('div', { class: 'bg-blue-100' }, [
        h('h1', 'Component 2'),
        h('p', 'Lorem ipsum dolor sit amet'),
      ])
    },
  })
})
</script>

<style>
html::view-transition-new(slide) {
  animation-name: -ua-view-transition-fade-in, slide-in;
}

html::view-transition-old(slide) {
  animation-name: -ua-view-transition-fade-out, slide-out;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
}

@keyframes slide-out {
  to {
    transform: translateX(-100%);
  }
}
</style>
