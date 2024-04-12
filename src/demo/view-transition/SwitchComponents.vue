<template>
  <Header>
    <StartButton @click="toggle">Toggle</StartButton>
  </Header>

  <ViewTransition name="slide">
    <Component
      :is="component"
      class="w-64 border border-solid p-3 text-base"
    />
  </ViewTransition>
</template>

<script lang="ts" setup>
import { computed, defineComponent, h, ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const flag = ref(true)

const component = computed(() => (flag.value ? Comp1 : Comp2))

function toggle() {
  flag.value = !flag.value
}

const Comp1 = defineComponent(() => {
  return () => {
    return h('div', { class: 'bg-orange-100' }, [
      h('h1', 'Component 1'),
      h('p', 'Some text'),
    ])
  }
})

const Comp2 = defineComponent(() => {
  return () => {
    return h('div', { class: 'bg-blue-100' }, [
      h('h1', 'Component 2'),
      h('p', 'Lorem ipsum dolor sit amet'),
    ])
  }
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
