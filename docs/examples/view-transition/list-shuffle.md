---
aside: false
---

::: info
`<ViewTransitionGroup>` is likely to be implemented in the future.

I am waiting for the `view-transition-class` to land as part of the CSS View Transitions Module Level 2 (https://www.w3.org/TR/css-view-transitions-2/).
:::

<script setup>
import DemoContainer from '@demo/DemoContainer.vue'
import DemoViewTransitionListShuffle from '@demo/view-transition/ListShuffle.vue'
</script>

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoViewTransitionListShuffle />
  <template #code>

  <<< ../../../src/demo/view-transition/ListShuffle.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->
