---
outline: deep
---

<script setup>
import DemoContainer from '@demo/DemoContainer.vue'
import DemoUseViewTransitionBasic from '@demo/use-view-transition/Basic.vue'
</script>

# `useViewTransition` composable

`useViewTransition()` is a composable that provides View Transitions API for use in Vue components.

It's a simple wrapper around the original `document.startViewTransition` API, and based on the [nextTick](https://vuejs.org/api/general.html#nexttick) behaviour, which fulfills once the DOM has been updated.

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoUseViewTransitionBasic />

  <template #code>

  <<< ../src/demo/use-view-transition/Basic.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->

## Not supported?

If the browser is not supporting View Transitions API yet, `startViewTransition()` will call given `updateCallback` callback immediately and return stubbed `ViewTransition` object.

## More examples

Please refer to the Examples section for more examples of using `useViewTransition()`.

## API

### `useViewTransition`

A composable that provides View Transitions API for use in Vue components.

```ts
export function useViewTransition(): ViewTransitionComposable
```

Example:

```ts
import { ref } from 'vue'
import { useViewTransition } from '@nag5000/vue-view-transitions'

const { startViewTransition } = useViewTransition()
const flag = ref(false)

function toggle() {
  startViewTransition(() => {
    flag.value = !flag.value
  })
}
```

#### Returns

```ts
type ViewTransitionComposable = {
  startViewTransition: (
    updateCallback: () => void | Promise<void>
  ) => ViewTransition
}
```

### `startViewTransition`

Starts a new view transition. Mimics the original `document.startViewTransition` API.

#### Parameters

- **updateCallback**: `() => void | Promise<void>` - The callback that updates the app state or the DOM. If the browser does not support view transitions, the callback will be called immediately.

#### Returns

- **ViewTransition**: A `ViewTransition` object instance. If the browser does not support view transitions, this returns a stubbed `ViewTransition` object, where `updateCallbackDone` and `finished` are resolved immediately, and `ready` is rejected.

#### External Resources

- [MDN Documentation on `Document.startViewTransition`](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition)
