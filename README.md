# View Transitions API primitives for Vue.js

## Installation

```sh
npm i @nag5000/vue-view-transition
```

## Usage

### `useViewTransition` composable

```vue
<template>
  <button @click="toggle">Toggle</button>

  <span v-if="flag">🦄</span>
  <span v-else class="rotate-90 scale-150">🌸</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useViewTransition } from '@nag5000/vue-view-transitions'

const { startViewTransition } = useViewTransition()
const flag = ref(false)

function toggle() {
  startViewTransition(() => {
    flag.value = !flag.value
  })
}
</script>

<style scoped>
span {
  view-transition-name: 🦄🌸;
}
</style>
```

### `<ViewTransition>` component

```vue
<template>
  <button @click="toggle">Toggle</button>

  <ViewTransition>
    <span v-if="flag">🦄</span>
    <span v-else class="rotate-90 scale-150">🌸</span>
  </ViewTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ViewTransition } from '@nag5000/vue-view-transitions'

const flag = ref(false)

function toggle() {
  flag.value = !flag.value
}
</script>
```

## Documentation and Demos

Check them out on the website: https://vue-view-transitions.vercel.app/
