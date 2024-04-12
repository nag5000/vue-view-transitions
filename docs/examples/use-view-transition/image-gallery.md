---
aside: false
---

::: details For this demo, if you have DevTools open, make sure that "Disable cache" is unchecked in the Network tab

This is because a duplicate image is used for the overlay. Normally this is not an issue because the browser will always take an image from the memory cache, as it has already loaded it. However, if DevTools is open and "Disable cache" is checked, the browser will load the image again from the network.
This will result in glitchy animation if it happens during the transition.
:::

<script setup>
import DemoContainer from '@demo/DemoContainer.vue'
import DemoUseViewTransitionImageGallery from '@demo/use-view-transition/ImageGallery.vue'
</script>

<!-- prettier-ignore-start -->
<DemoContainer>
  <DemoUseViewTransitionImageGallery />

  <template #code>

  <<< ../../../src/demo/use-view-transition/ImageGallery.vue
  </template>
</DemoContainer>
<!-- prettier-ignore-end -->
