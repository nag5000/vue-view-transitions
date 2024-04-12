---
aside: false
---

::: tip It works with `<RouterView>` too!

Check out the [Suspense: Combining with other components](https://vuejs.org/guide/built-ins/suspense.html#combining-with-other-components) section in the Vue documentation.

Just replace `<Transition>` with `<ViewTransition>` and here you go!
:::

<script setup>
import DemoContainer from '@demo/DemoContainer.vue'
import DemoViewTransitionSwitchAsyncComponentsSuspense from '@demo/view-transition/SwitchAsyncComponentsSuspense.vue'
</script>

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionSwitchAsyncComponentsSuspense />
  <template #code>

  <<< ../../../src/demo/view-transition/SwitchAsyncComponentsSuspense.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->
